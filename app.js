/* Griha Pravesam invitation — front end logic. You normally don't need to edit this file. */
(function () {
  'use strict';

  var C = window.INVITE || {};

  /* ------------------------------------------------------------------ */
  /* UI text                                                             */
  /* ------------------------------------------------------------------ */
  var T = {
    en: {
      withBlessings: 'With the blessings of the Almighty',
      coverInvite: 'cordially invite you to',
      tapToOpen: 'TAP TO OPEN',
      days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds',
      today: 'The celebration is today — we are waiting to welcome you!',
      over: 'Thank you for celebrating with us!',
      events: 'Ceremonies',
      muhurtham: 'MUHURTHAM',
      addGoogle: 'Google Calendar',
      addIcs: 'Add to phone calendar',
      venue: 'Venue',
      directions: 'Get directions',
      callUs: 'Call us',
      mapPending: 'The map will appear here once the location is added.',
      photos: 'Photos',
      rsvp: 'Kindly RSVP',
      rsvpBy: 'Please reply by {date}',
      name: 'Your name',
      phone: 'Mobile number (optional)',
      phoneHint: 'If you reply again with the same number, your answer is updated.',
      attending: 'Will you be joining us?',
      yes: 'Yes, joyfully',
      maybe: 'Not sure yet',
      no: "Sorry, can't make it",
      guests: 'Number of guests (including you)',
      note: 'Note (optional)',
      submit: 'Send reply',
      sending: 'Sending…',
      rsvpThanksYes: 'Thank you! We look forward to welcoming you.',
      rsvpThanksNo: 'Thank you for letting us know. You will be missed!',
      rsvpUpdated: 'Your reply has been updated. Thank you!',
      needName: 'Please enter your name.',
      needAttending: 'Please choose whether you can come.',
      needMessage: 'Please write a blessing.',
      blessings: 'Blessings',
      blessingMsg: 'Your blessing',
      sendBlessing: 'Send blessing',
      blessThanks: 'Thank you for your blessing!',
      noBlessings: 'Be the first to bless our new home.',
      notConnected: 'Replies are not connected yet. Please contact the family directly.',
      errorGeneric: 'Something went wrong. Please try again.',
      errorBusy: 'Too many replies at once. Please try again in a minute.',
      footerThanks: 'Your presence is our greatest blessing.',
      share: 'Share on WhatsApp',
      shareText: 'You are warmly invited to our Griha Pravesam (housewarming) on {date}. Timings, location & RSVP:',
    },
    ta: {
      withBlessings: 'இறையருளுடன்',
      coverInvite: 'அன்புடன் அழைக்கிறோம்',
      tapToOpen: 'திறக்க தொடவும்',
      days: 'நாட்கள்', hours: 'மணி', minutes: 'நிமிடம்', seconds: 'விநாடி',
      today: 'இன்று விழா நாள் — உங்களை வரவேற்கக் காத்திருக்கிறோம்!',
      over: 'எங்களுடன் கொண்டாடியதற்கு நன்றி!',
      events: 'நிகழ்ச்சிகள்',
      muhurtham: 'முகூர்த்தம்',
      addGoogle: 'Google நாட்காட்டி',
      addIcs: 'கைபேசி நாட்காட்டியில் சேர்க்க',
      venue: 'விழா நடைபெறும் இடம்',
      directions: 'வழி காட்டு',
      callUs: 'அழைக்க',
      mapPending: 'இடம் சேர்க்கப்பட்டதும் வரைபடம் இங்கே தோன்றும்.',
      photos: 'புகைப்படங்கள்',
      rsvp: 'வருகையை உறுதிசெய்க',
      rsvpBy: '{date}க்குள் பதில் அளிக்கவும்',
      name: 'உங்கள் பெயர்',
      phone: 'கைபேசி எண் (விருப்பம்)',
      phoneHint: 'அதே எண்ணுடன் மீண்டும் அனுப்பினால் உங்கள் பதில் புதுப்பிக்கப்படும்.',
      attending: 'நீங்கள் வருகிறீர்களா?',
      yes: 'ஆம், மகிழ்ச்சியுடன்',
      maybe: 'இன்னும் உறுதியில்லை',
      no: 'வர இயலவில்லை',
      guests: 'வருபவர்களின் எண்ணிக்கை (உங்களையும் சேர்த்து)',
      note: 'குறிப்பு (விருப்பம்)',
      submit: 'பதில் அனுப்பு',
      sending: 'அனுப்புகிறது…',
      rsvpThanksYes: 'நன்றி! உங்களை வரவேற்க ஆவலுடன் காத்திருக்கிறோம்.',
      rsvpThanksNo: 'தெரிவித்ததற்கு நன்றி. உங்களை நினைவுகூர்வோம்!',
      rsvpUpdated: 'உங்கள் பதில் புதுப்பிக்கப்பட்டது. நன்றி!',
      needName: 'உங்கள் பெயரை உள்ளிடவும்.',
      needAttending: 'வருகிறீர்களா என்பதைத் தேர்ந்தெடுக்கவும்.',
      needMessage: 'உங்கள் வாழ்த்தை எழுதவும்.',
      blessings: 'வாழ்த்துகள்',
      blessingMsg: 'உங்கள் வாழ்த்து',
      sendBlessing: 'வாழ்த்து அனுப்பு',
      blessThanks: 'உங்கள் வாழ்த்துக்கு நன்றி!',
      noBlessings: 'எங்கள் புதிய இல்லத்தை முதலில் வாழ்த்துங்கள்.',
      notConnected: 'பதிவு இன்னும் இணைக்கப்படவில்லை. குடும்பத்தினரை நேரடியாகத் தொடர்பு கொள்ளவும்.',
      errorGeneric: 'ஏதோ தவறு நடந்தது. மீண்டும் முயற்சிக்கவும்.',
      errorBusy: 'ஒரே நேரத்தில் பல பதில்கள். ஒரு நிமிடம் கழித்து முயற்சிக்கவும்.',
      footerThanks: 'உங்கள் வருகையே எங்களுக்குப் பெரும் ஆசீர்வாதம்.',
      share: 'வாட்ஸ்அப்பில் பகிர',
      shareText: '{date} அன்று நடைபெறும் எங்கள் புதுமனை புகுவிழாவிற்கு உங்களை அன்புடன் அழைக்கிறோம். நேரம், இடம் மற்றும் வருகை உறுதி:',
    },
  };

  /* ------------------------------------------------------------------ */
  /* Helpers                                                             */
  /* ------------------------------------------------------------------ */
  var lang = loadLang() || C.defaultLang || 'ta';
  var tz = C.timeZone || 'Asia/Kolkata';
  var events = (C.events || []).slice().sort(function (a, b) { return new Date(a.start) - new Date(b.start); });

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function t(k) { return (T[lang] && T[lang][k]) || T.en[k] || k; }
  function pick(v) {
    if (v && typeof v === 'object') return v[lang] || v.en || v.ta || '';
    return v || '';
  }
  function isPlaceholder(s) { return !s || /^\s*\[.*\]\s*$/.test(s); }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function loc() { return lang === 'ta' ? 'ta-IN' : 'en-IN'; }
  function fmt(iso, opts) {
    try { return new Intl.DateTimeFormat(loc(), Object.assign({ timeZone: tz }, opts)).format(new Date(iso)); }
    catch (e) { return new Date(iso).toLocaleString(); }
  }
  function fmtLongDate(iso) { return fmt(iso, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }); }
  function fmtTime(iso) { return fmt(iso, { hour: 'numeric', minute: '2-digit', hour12: true }); }
  function loadLang() { try { return localStorage.getItem('gp-lang'); } catch (e) { return null; } }
  function saveLang(l) { try { localStorage.setItem('gp-lang', l); } catch (e) { /* ignore */ } }
  function backendReady() { return /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(C.backendUrl || ''); }

  /* ------------------------------------------------------------------ */
  /* Rendering                                                           */
  /* ------------------------------------------------------------------ */
  function render() {
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(function (n) { n.textContent = t(n.getAttribute('data-i18n')); });

    var first = events[0];
    var hosts = pick(C.hosts);
    var line = pick(C.hostsLine);
    var content = {
      hosts: hosts,
      hostsWithLine: line ? hosts + ' ' + line : hosts,
      mainDate: first ? fmtLongDate(first.start) : '',
      houseName: pick(C.houseName),
      message: pick(C.message),
      venueName: pick(C.venue && C.venue.name),
      venueAddress: pick(C.venue && C.venue.address),
      venueLandmark: pick(C.venue && C.venue.landmark),
      hashtag: C.hashtag || '',
    };
    $$('[data-c]').forEach(function (n) {
      var v = content[n.getAttribute('data-c')] || '';
      n.textContent = v;
      n.hidden = !v;
    });

    var rsvpBy = $('#rsvpBy');
    if (C.rsvpBy) {
      rsvpBy.textContent = t('rsvpBy').replace('{date}', fmt(C.rsvpBy + 'T12:00:00+05:30', { day: 'numeric', month: 'long' }));
      rsvpBy.hidden = false;
    } else rsvpBy.hidden = true;

    renderEvents();
    renderWallEmpty();
    document.title = (lang === 'ta' ? 'புதுமனை புகுவிழா' : 'Griha Pravesam') + (isPlaceholder(hosts) ? '' : ' · ' + hosts);
  }

  function renderEvents() {
    var list = $('#events');
    list.textContent = '';
    events.forEach(function (ev, i) {
      var li = el('li', 'card event');
      var day = (i === 0 || fmt(ev.start, { dateStyle: 'medium' }) !== fmt(events[i - 1].start, { dateStyle: 'medium' }))
        ? fmt(ev.start, { weekday: 'short', day: 'numeric', month: 'short' }) + ' · ' : '';
      li.appendChild(el('p', 'event-time', day + fmtTime(ev.start) + ' – ' + fmtTime(ev.end)));
      var h = el('h3', 'event-title', pick(ev.title));
      if (ev.muhurtham) h.appendChild(el('span', 'badge', t('muhurtham')));
      li.appendChild(h);
      if (pick(ev.desc)) li.appendChild(el('p', 'event-desc', pick(ev.desc)));

      var row = el('div', 'btn-row');
      var g = el('a', 'btn', '📅 ' + t('addGoogle'));
      g.href = googleCalUrl(ev);
      g.target = '_blank'; g.rel = 'noopener';
      var ics = el('button', 'btn', t('addIcs'));
      ics.type = 'button';
      ics.addEventListener('click', function () { downloadIcs(ev); });
      row.appendChild(g); row.appendChild(ics);
      li.appendChild(row);
      list.appendChild(li);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Calendar                                                            */
  /* ------------------------------------------------------------------ */
  function utcStamp(iso) { return new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''); }
  function venueText() { return [pick(C.venue && C.venue.name), pick(C.venue && C.venue.address)].filter(Boolean).join(', '); }
  function eventTitle(ev) { return pick(ev.title) + ' — ' + (lang === 'ta' ? 'புதுமனை புகுவிழா' : 'Griha Pravesam'); }

  function googleCalUrl(ev) {
    var p = new URLSearchParams({
      action: 'TEMPLATE',
      text: eventTitle(ev),
      dates: utcStamp(ev.start) + '/' + utcStamp(ev.end),
      details: pick(ev.desc) + (C.siteUrl ? '\n' + C.siteUrl : ''),
      location: venueText(),
    });
    return 'https://calendar.google.com/calendar/render?' + p.toString();
  }

  function icsEscape(s) { return String(s || '').replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/([,;])/g, '\\$1'); }
  function downloadIcs(ev) {
    var lines = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//GrihaPravesam//Invite//EN', 'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'UID:' + utcStamp(ev.start) + '-' + Math.random().toString(36).slice(2) + '@griha-pravesam',
      'DTSTAMP:' + utcStamp(new Date().toISOString()),
      'DTSTART:' + utcStamp(ev.start),
      'DTEND:' + utcStamp(ev.end),
      'SUMMARY:' + icsEscape(eventTitle(ev)),
      'DESCRIPTION:' + icsEscape(pick(ev.desc)),
      'LOCATION:' + icsEscape(venueText()),
      'BEGIN:VALARM', 'TRIGGER:-PT2H', 'ACTION:DISPLAY', 'DESCRIPTION:' + icsEscape(eventTitle(ev)), 'END:VALARM',
      'END:VEVENT', 'END:VCALENDAR',
    ];
    var blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'griha-pravesam.ics';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
  }

  /* ------------------------------------------------------------------ */
  /* Countdown                                                           */
  /* ------------------------------------------------------------------ */
  function tick() {
    if (!events.length) { $('#countdown').hidden = true; return; }
    var start = new Date(events[0].start).getTime();
    var end = new Date(events[events.length - 1].end).getTime();
    var now = Date.now();
    var box = $('#countdown'), done = $('#countdownDone');
    if (now < start) {
      var s = Math.floor((start - now) / 1000);
      $('#cdD').textContent = Math.floor(s / 86400);
      $('#cdH').textContent = Math.floor(s % 86400 / 3600);
      $('#cdM').textContent = Math.floor(s % 3600 / 60);
      $('#cdS').textContent = s % 60;
      box.hidden = false; done.hidden = true;
    } else {
      box.hidden = true; done.hidden = false;
      done.textContent = now <= end ? t('today') : t('over');
    }
  }

  /* ------------------------------------------------------------------ */
  /* Venue, photos, contact                                              */
  /* ------------------------------------------------------------------ */
  function setupVenue() {
    var q = (C.venue && C.venue.mapsQuery || '').trim();
    var map = $('#map');
    var dir = $('#directionsBtn');
    if (q) {
      var f = document.createElement('iframe');
      f.src = 'https://maps.google.com/maps?q=' + encodeURIComponent(q) + '&z=16&output=embed';
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.title = 'Map';
      map.appendChild(f);
      dir.href = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(q);
    } else {
      var p = el('p', '', '');
      p.setAttribute('data-i18n', 'mapPending');
      map.appendChild(p);
      dir.hidden = true;
    }
    var phone = (C.contactPhone || '').replace(/[^\d+]/g, '');
    if (phone) { var call = $('#callBtn'); call.href = 'tel:' + phone; call.hidden = false; }
  }

  function setupPhotos() {
    if (C.heroPhoto) {
      var img = new Image();
      img.alt = '';
      img.onload = function () {
        var media = $('#heroMedia');
        media.textContent = '';
        media.appendChild(img);
        img.addEventListener('click', function () { openLightbox(C.heroPhoto, ''); });
      };
      img.src = C.heroPhoto; // if it fails to load, the illustration stays
    }
    var g = C.gallery || [];
    if (!g.length) return;
    var wrap = $('#gallery');
    g.forEach(function (ph) {
      var b = el('button');
      b.type = 'button';
      var im = el('img');
      im.src = ph.src; im.loading = 'lazy'; im.alt = pick(ph.caption);
      b.appendChild(im);
      b.addEventListener('click', function () { openLightbox(ph.src, pick(ph.caption)); });
      wrap.appendChild(b);
    });
    $('#gallerySection').hidden = false;
  }

  function openLightbox(src, cap) {
    var lb = $('#lightbox');
    $('img', lb).src = src;
    $('img', lb).alt = cap || '';
    $('.lb-cap', lb).textContent = cap || '';
    lb.hidden = false;
  }
  function setupLightbox() {
    var lb = $('#lightbox');
    lb.addEventListener('click', function (e) { if (e.target !== $('img', lb)) lb.hidden = true; });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.hidden = true; });
  }

  /* ------------------------------------------------------------------ */
  /* Cover, petals, music, share                                         */
  /* ------------------------------------------------------------------ */
  var audio = null;
  function setupMusic() {
    if (!C.music) return;
    audio = new Audio(C.music);
    audio.loop = true;
    audio.preload = 'none';
    var btn = $('#musicBtn');
    btn.hidden = false;
    btn.addEventListener('click', function () { audio.paused ? playMusic() : pauseMusic(); });
  }
  function playMusic() {
    if (!audio) return;
    audio.play().then(function () { $('#musicBtn').setAttribute('aria-pressed', 'true'); }).catch(function () {});
  }
  function pauseMusic() { if (audio) { audio.pause(); $('#musicBtn').setAttribute('aria-pressed', 'false'); } }

  function petals() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var colors = ['#f08c1a', '#f6b71b', '#e3a81b', '#d9442b', '#fff1c4', '#c2185b'];
    var box = el('div', 'petals');
    for (var i = 0; i < 42; i++) {
      var p = el('span', 'petal');
      var size = 10 + Math.random() * 10;
      p.style.left = Math.random() * 100 + 'vw';
      p.style.width = size + 'px';
      p.style.height = size * 1.3 + 'px';
      p.style.background = colors[i % colors.length];
      p.style.animationDuration = 3.5 + Math.random() * 3 + 's';
      p.style.animationDelay = Math.random() * 1.8 + 's';
      p.style.setProperty('--drift', (Math.random() * 160 - 80) + 'px');
      p.style.setProperty('--spin', (Math.random() * 720 - 360) + 'deg');
      box.appendChild(p);
    }
    document.body.appendChild(box);
    setTimeout(function () { box.remove(); }, 8000);
  }

  function setupCover() {
    function open() {
      petals();
      playMusic();
      $('#main').scrollIntoView({ behavior: 'smooth' });
    }
    $('#openBtn').addEventListener('click', open);
  }

  function setupShare() {
    $('#shareBtn').addEventListener('click', function () {
      var date = events[0] ? fmtLongDate(events[0].start) : '';
      var text = '🪔 ' + t('shareText').replace('{date}', date) + '\n' + (C.siteUrl || location.href);
      window.open('https://api.whatsapp.com/send?text=' + encodeURIComponent(text), '_blank', 'noopener');
    });
  }

  function setupLang() {
    $('#langToggle').addEventListener('click', function () {
      lang = lang === 'ta' ? 'en' : 'ta';
      saveLang(lang);
      render();
      loadBlessings();
    });
  }

  /* ------------------------------------------------------------------ */
  /* Backend calls                                                       */
  /* ------------------------------------------------------------------ */
  function post(payload) {
    if (!backendReady()) return Promise.reject(new Error('not_connected'));
    // text/plain avoids a CORS preflight, which Apps Script does not answer.
    return fetch(C.backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    }).then(function (r) { return r.json(); }).then(function (j) {
      if (!j || !j.ok) throw new Error((j && j.error) || 'error');
      return j;
    });
  }

  function errText(e) {
    if (e && e.message === 'not_connected') return t('notConnected');
    if (e && e.message === 'busy') return t('errorBusy');
    return t('errorGeneric');
  }
  function setStatus(form, cls, msg) {
    var s = $('.status', form);
    s.className = 'status ' + (cls || '');
    s.textContent = msg || '';
  }

  function setupRsvp() {
    var form = $('#rsvpForm');
    var guests = $('#guestsField');
    form.addEventListener('change', function () {
      var a = form.elements.attending.value;
      guests.hidden = a === 'no';
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.name.value.trim();
      var attending = form.elements.attending.value;
      if (!name) { setStatus(form, 'err', t('needName')); form.elements.name.focus(); return; }
      if (!attending) { setStatus(form, 'err', t('needAttending')); return; }
      var btn = $('button[type=submit]', form);
      btn.disabled = true;
      setStatus(form, '', t('sending'));
      post({
        type: 'rsvp',
        name: name,
        phone: form.elements.phone.value.trim(),
        attending: attending,
        guests: attending === 'no' ? 0 : parseInt(form.elements.guests.value, 10) || 1,
        note: form.elements.note.value.trim(),
        lang: lang,
        website: form.elements.website.value,
      }).then(function (res) {
        setStatus(form, 'ok', res.updated ? t('rsvpUpdated') : (attending === 'no' ? t('rsvpThanksNo') : t('rsvpThanksYes')));
        if (attending !== 'no') petals();
      }).catch(function (err) {
        setStatus(form, 'err', errText(err));
      }).then(function () { btn.disabled = false; });
    });
  }

  var blessings = [];
  function renderWall() {
    var wall = $('#wall');
    wall.textContent = '';
    if (!blessings.length) { renderWallEmpty(); return; }
    blessings.forEach(function (b) {
      var li = el('li');
      li.appendChild(el('p', 'w-msg', b.message));
      li.appendChild(el('p', 'w-name', '— ' + b.name));
      wall.appendChild(li);
    });
  }
  function renderWallEmpty() {
    if (blessings.length) return;
    var wall = $('#wall');
    wall.textContent = '';
    wall.appendChild(el('li', 'empty', t('noBlessings')));
  }
  function loadBlessings() {
    if (!backendReady()) { renderWallEmpty(); return; }
    fetch(C.backendUrl + '?action=blessings')
      .then(function (r) { return r.json(); })
      .then(function (j) { if (j && j.ok && Array.isArray(j.blessings)) { blessings = j.blessings; renderWall(); } })
      .catch(function () { renderWallEmpty(); });
  }

  function setupBlessings() {
    var form = $('#blessForm');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.name.value.trim();
      var message = form.elements.message.value.trim();
      if (!name) { setStatus(form, 'err', t('needName')); form.elements.name.focus(); return; }
      if (!message) { setStatus(form, 'err', t('needMessage')); form.elements.message.focus(); return; }
      var btn = $('button[type=submit]', form);
      btn.disabled = true;
      setStatus(form, '', t('sending'));
      post({ type: 'blessing', name: name, message: message, lang: lang, website: form.elements.website.value })
        .then(function (res) {
          setStatus(form, 'ok', t('blessThanks'));
          if (res.visible !== false) { blessings.unshift({ name: name, message: message }); renderWall(); }
          form.elements.message.value = '';
        })
        .catch(function (err) { setStatus(form, 'err', errText(err)); })
        .then(function () { btn.disabled = false; });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Start                                                               */
  /* ------------------------------------------------------------------ */
  setupVenue();
  render();
  setupPhotos();
  setupLightbox();
  setupMusic();
  setupCover();
  setupShare();
  setupLang();
  setupRsvp();
  setupBlessings();
  loadBlessings();
  tick();
  setInterval(tick, 1000);

  if (!backendReady()) console.warn('[invite] backendUrl is not set in config.js — RSVP and blessings are disabled.');
})();
