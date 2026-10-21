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
      directions: 'Directions to Kubhera Vistas',
      callUs: 'Call us',
      photos: 'Photos',
      footerThanks: 'Your presence is our greatest blessing.',
      share: 'Share on WhatsApp',
      shareText: 'You are warmly invited to our Griha Pravesam (housewarming) on {date}. Timings & location:',
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
      directions: 'குபேரா விஸ்டாஸ் செல்லும் வழி',
      callUs: 'அழைக்க',
      photos: 'புகைப்படங்கள்',
      footerThanks: 'உங்கள் வருகையே எங்களுக்குப் பெரும் ஆசீர்வாதம்.',
      share: 'வாட்ஸ்அப்பில் பகிர',
      shareText: '{date} அன்று நடைபெறும் எங்கள் புதுமனை புகுவிழாவிற்கு உங்களை அன்புடன் அழைக்கிறோம். நேரம் மற்றும் இடம்:',
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

    renderEvents();
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
    // Exact coordinates if given; otherwise search by the venue's address.
    var q = (C.venue && C.venue.mapsQuery || '').trim() ||
      ('Kubhera Vistas, ' + (C.venue && C.venue.address && C.venue.address.en || '')).replace(/[\[\]]/g, '');
    $('#directionsBtn').href = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(q);
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
  tick();
  setInterval(tick, 1000);
})();
