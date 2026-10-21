/**
 * Griha Pravesam invitation — backend (Google Apps Script, bound to a Google Sheet).
 *
 * What it does
 *   POST {type:"rsvp", ...}      → saves/updates a row in the "RSVP" tab
 *   POST {type:"blessing", ...}  → saves a row in the "Blessings" tab
 *   GET  ?action=blessings       → returns approved blessings (name + message only)
 *
 * Privacy: RSVP rows (names, phone numbers, headcount) are NEVER returned to the
 * public page. Only you, in the Sheet, can see them.
 *
 * Setup: see README.md. In short — paste this file, run setup() once,
 * then Deploy → New deployment → Web app → Execute as: Me, Who has access: Anyone.
 */

const CONFIG = {
  RSVP_SHEET: 'RSVP',
  BLESSINGS_SHEET: 'Blessings',
  // true  = blessings appear on the page immediately (you can untick "Approved" to hide one)
  // false = blessings stay hidden until you tick "Approved" in the Sheet
  AUTO_APPROVE_BLESSINGS: true,
  // Put your email here to get a mail for every RSVP. Leave '' to turn off.
  NOTIFY_EMAIL: '',
  // Crude flood protection for the whole site.
  MAX_SUBMISSIONS_PER_MINUTE: 30,
  MAX_BLESSINGS_RETURNED: 150,
  MAX_GUESTS: 20,
};

const RSVP_HEADERS = ['Timestamp', 'Name', 'Phone', 'Attending', 'Guests', 'Note', 'Language', 'Last updated'];
const BLESS_HEADERS = ['Timestamp', 'Name', 'Message', 'Language', 'Approved'];

/** Run once from the editor to create the tabs and grant permissions. */
function setup() {
  sheet_(CONFIG.RSVP_SHEET, RSVP_HEADERS);
  const b = sheet_(CONFIG.BLESSINGS_SHEET, BLESS_HEADERS);
  b.getRange('E2:E').insertCheckboxes();
  addSummary_();
}

/* ------------------------------------------------------------------ */
/* HTTP handlers                                                       */
/* ------------------------------------------------------------------ */

function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || '';
  if (action === 'blessings') {
    return json_({ ok: true, blessings: readBlessings_() });
  }
  return json_({ ok: true, service: 'griha-pravesam' });
}

function doPost(e) {
  let data;
  try {
    data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
  } catch (err) {
    return json_({ ok: false, error: 'bad_request' });
  }
  // Honeypot: real people never fill this hidden field. Pretend success.
  if (data.website) return json_({ ok: true });

  if (!rateOk_()) return json_({ ok: false, error: 'busy' });

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return json_({ ok: false, error: 'busy' });
  try {
    if (data.type === 'rsvp') return json_(saveRsvp_(data));
    if (data.type === 'blessing') return json_(saveBlessing_(data));
    return json_({ ok: false, error: 'unknown_type' });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'server_error' });
  } finally {
    lock.releaseLock();
  }
}

/* ------------------------------------------------------------------ */
/* RSVP                                                                */
/* ------------------------------------------------------------------ */

function saveRsvp_(d) {
  const name = text_(d.name, 60);
  const phone = phone_(d.phone);
  const attending = ['yes', 'no', 'maybe'].indexOf(d.attending) >= 0 ? d.attending : '';
  if (!name || !attending) return { ok: false, error: 'missing_fields' };

  let guests = parseInt(d.guests, 10);
  if (attending === 'no') guests = 0;
  else if (!(guests >= 1 && guests <= CONFIG.MAX_GUESTS)) guests = 1;

  const note = text_(d.note, 300);
  const lang = d.lang === 'en' ? 'en' : 'ta';
  const sh = sheet_(CONFIG.RSVP_SHEET, RSVP_HEADERS);
  const now = new Date();

  // Same phone number replies again → update that row instead of adding a duplicate.
  if (phone) {
    const last = sh.getLastRow();
    if (last > 1) {
      const phones = sh.getRange(2, 3, last - 1, 1).getDisplayValues();
      for (let i = phones.length - 1; i >= 0; i--) {
        if (normPhone_(phones[i][0]) === normPhone_(phone)) {
          sh.getRange(i + 2, 2, 1, 7).setValues([[name, "'" + phone, attending, guests, note, lang, now]]);
          notify_(name, attending, guests, note, true);
          return { ok: true, updated: true };
        }
      }
    }
  }

  sh.appendRow([now, name, phone ? "'" + phone : '', attending, guests, note, lang, '']);
  notify_(name, attending, guests, note, false);
  return { ok: true, updated: false };
}

/* ------------------------------------------------------------------ */
/* Blessings                                                           */
/* ------------------------------------------------------------------ */

function saveBlessing_(d) {
  const name = text_(d.name, 60);
  const message = text_(d.message, 500, true);
  if (!name || !message) return { ok: false, error: 'missing_fields' };
  const lang = d.lang === 'en' ? 'en' : 'ta';
  const sh = sheet_(CONFIG.BLESSINGS_SHEET, BLESS_HEADERS);
  sh.appendRow([new Date(), name, message, lang, CONFIG.AUTO_APPROVE_BLESSINGS]);
  sh.getRange(sh.getLastRow(), 5).insertCheckboxes();
  return { ok: true, visible: CONFIG.AUTO_APPROVE_BLESSINGS };
}

function readBlessings_() {
  const sh = sheet_(CONFIG.BLESSINGS_SHEET, BLESS_HEADERS);
  const last = sh.getLastRow();
  if (last < 2) return [];
  const rows = sh.getRange(2, 1, last - 1, 5).getValues();
  const out = [];
  for (let i = rows.length - 1; i >= 0 && out.length < CONFIG.MAX_BLESSINGS_RETURNED; i--) {
    const r = rows[i];
    if (r[4] === true && r[1] && r[2]) {
      out.push({ name: unguard_(r[1]), message: unguard_(r[2]) });
    }
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function sheet_(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(headers);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#f6ead0');
  }
  return sh;
}

/** Trim, strip control characters, cap length, and block spreadsheet formula injection. */
function text_(v, max, keepNewlines) {
  let s = String(v == null ? '' : v);
  s = keepNewlines ? s.replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, ' ') : s.replace(/[\u0000-\u001F\u007F]/g, ' ');
  s = s.trim().slice(0, max);
  if (/^[=+\-@]/.test(s)) s = "'" + s; // stored as text, never evaluated as a formula
  return s;
}
function unguard_(v) { return String(v); } // Sheets already drops the leading apostrophe on read

function phone_(v) {
  const s = String(v == null ? '' : v).replace(/[^\d+ ]/g, '').trim().slice(0, 20);
  return /\d{6,}/.test(s.replace(/\s/g, '')) ? s : '';
}
function normPhone_(v) {
  const d = String(v || '').replace(/\D/g, '');
  return d.length > 10 ? d.slice(-10) : d; // treat +91 98xxx and 98xxx as the same number
}

function rateOk_() {
  const cache = CacheService.getScriptCache();
  const key = 'rate_' + Math.floor(Date.now() / 60000);
  const n = parseInt(cache.get(key) || '0', 10) + 1;
  cache.put(key, String(n), 120);
  return n <= CONFIG.MAX_SUBMISSIONS_PER_MINUTE;
}

function notify_(name, attending, guests, note, updated) {
  if (!CONFIG.NOTIFY_EMAIL) return;
  try {
    MailApp.sendEmail(
      CONFIG.NOTIFY_EMAIL,
      'Housewarming RSVP' + (updated ? ' (updated)' : '') + ': ' + name + ' — ' + attending + ' (' + guests + ')',
      'Name: ' + name + '\nAttending: ' + attending + '\nGuests: ' + guests + (note ? '\nNote: ' + note : '')
    );
  } catch (err) {
    console.error('Mail failed', err);
  }
}

/** Adds a "Summary" tab with live headcount formulas. */
function addSummary_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (ss.getSheetByName('Summary')) return;
  const s = ss.insertSheet('Summary');
  const r = CONFIG.RSVP_SHEET;
  s.getRange('A1:B6').setValues([
    ['Item', 'Count'],
    ['Replies', "=COUNTA('" + r + "'!B2:B)"],
    ['Families coming (yes)', "=COUNTIF('" + r + "'!D2:D,\"yes\")"],
    ['Guests coming (yes)', "=SUMIF('" + r + "'!D2:D,\"yes\",'" + r + "'!E2:E)"],
    ['Guests maybe', "=SUMIF('" + r + "'!D2:D,\"maybe\",'" + r + "'!E2:E)"],
    ['Plan food for (yes + half of maybe)', '=B4+ROUNDUP(B5/2)'],
  ]);
  s.getRange('A1:B1').setFontWeight('bold').setBackground('#f6ead0');
  s.autoResizeColumns(1, 2);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
