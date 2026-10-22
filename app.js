/* House-warming Function invitation — front end logic. You normally don't need to edit this file. */
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
      celebrate: 'Celebrate',
      footerThanks: 'Your presence is our greatest blessing.',
      share: 'Share on WhatsApp',
      shareText: 'You are warmly invited to our House-warming Function on {date}. Timings & location:',
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
      celebrate: 'கொண்டாடுவோம்',
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
    document.title = (lang === 'ta' ? 'புதுமனை புகுவிழா' : 'House-warming Function') + (isPlaceholder(hosts) ? '' : ' · ' + hosts);
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
  function eventTitle(ev) { return pick(ev.title) + ' — ' + (lang === 'ta' ? 'புதுமனை புகுவிழா' : 'House-warming Function'); }

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
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Housewarming//Invite//EN', 'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'UID:' + utcStamp(ev.start) + '-' + Math.random().toString(36).slice(2) + '@housewarming',
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
    a.download = 'housewarming.ics';
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
    if (phone) {
      var call = $('#callBtn');
      call.href = 'tel:' + phone;
      $('#callNumber').textContent = C.contactPhone.trim();
      call.hidden = false;
    }
  }

  function setupPhotos() {
    if (C.heroPhoto) {
      var media = $('#heroMedia');
      var art = media.innerHTML;
      var restore = function () { media.innerHTML = art; };
      media.textContent = '';
      if (/\.(mp4|webm|mov)$/i.test(C.heroPhoto)) {
        // Silent looping video: far smaller than a GIF. The poster still shows
        // instantly and stays if the phone won't autoplay (e.g. Low Power Mode).
        var v = document.createElement('video');
        v.muted = true; v.loop = true; v.autoplay = true; v.playsInline = true;
        v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('webkit-playsinline', '');
        v.setAttribute('preload', 'auto');
        v.setAttribute('aria-label', 'Our family at the entrance of our new home');
        if (C.heroPoster) v.poster = C.heroPoster;
        v.onerror = function () {
          if (!C.heroPoster) { restore(); return; }
          var still = new Image(); still.alt = ''; still.onerror = restore; still.src = C.heroPoster;
          media.textContent = ''; media.appendChild(still);
        };
        v.src = C.heroPhoto;
        media.appendChild(v);
        var tryPlay = function () { var p = v.play(); if (p && p.catch) p.catch(function () {}); };
        tryPlay();
        v.addEventListener('click', tryPlay); // tap to start if autoplay was blocked
      } else {
        // Show the photo straight away so a large GIF appears while it downloads;
        // if it fails to load, put the illustration back.
        var img = new Image();
        img.alt = '';
        img.onerror = restore;
        img.addEventListener('click', function () { openLightbox(C.heroPhoto, ''); });
        img.src = C.heroPhoto;
        media.appendChild(img);
      }
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

  // Effects only run when a guest taps, so they still play with "Reduce Motion"
  // turned on, just lighter.
  function reducedMotion() { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }

  // Flower shower: hibiscus, cherry blossom, yellow blossom, rosette and white flower.
  function petals() {
    var flowers = ['🌺', '🌷', '🌼', '🏵️', '💐', '🌼', '🌺', '🌸', '🌹', '🌸'];
    var box = el('div', 'petals');
    box.setAttribute('aria-hidden', 'true');
    for (var i = 0, n = reducedMotion() ? 16 : 40; i < n; i++) {
      var p = el('span', 'petal', flowers[i % flowers.length]);
      p.style.left = (Math.random() * 96) + 'vw';
      p.style.fontSize = (16 + Math.random() * 16) + 'px';
      p.style.animationDuration = 3.5 + Math.random() * 3 + 's';
      p.style.animationDelay = Math.random() * 1.8 + 's';
      p.style.setProperty('--drift', (Math.random() * 160 - 80) + 'px');
      p.style.setProperty('--spin', (Math.random() * 720 - 360) + 'deg');
      box.appendChild(p);
    }
    document.body.appendChild(box);
    setTimeout(function () { box.remove(); }, 8000);
  }

  /* Fireworks: bursts of glowing sparks on a canvas over the whole screen. */
  var fw = null;
  function fireworks() {
    if (!fw) {
      var c = el('canvas', 'fireworks');
      c.setAttribute('aria-hidden', 'true');
      document.body.appendChild(c);
      fw = { c: c, ctx: c.getContext('2d'), sparks: [], until: 0, running: false };
    }
    var colors = ['#ffd45e', '#f08c1a', '#ff5a5f', '#ff7ad9', '#9ef0ff', '#fff4d6', '#7dff9a'];
    var W = window.innerWidth, H = window.innerHeight;
    var bursts = reducedMotion() ? 3 : 9;
    for (var b = 0; b < bursts; b++) {
      setTimeout(function () {
        var x = W * (0.12 + Math.random() * 0.76), y = H * (0.12 + Math.random() * 0.5);
        var col = colors[Math.floor(Math.random() * colors.length)];
        for (var i = 0, n = 46 + Math.floor(Math.random() * 20); i < n; i++) {
          var a = Math.PI * 2 * i / n, v = 2.2 + Math.random() * 2.8;
          fw.sparks.push({ x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1,
            decay: 0.012 + Math.random() * 0.01, col: Math.random() < 0.15 ? '#fff4d6' : col });
        }
      }, b * 330 + Math.random() * 200);
    }
    fw.until = Date.now() + bursts * 330 + 2500;
    fw.c.classList.add('on');
    if (!fw.running) { fw.running = true; requestAnimationFrame(frame); }
  }
  function frame() {
    var c = fw.c, ctx = fw.ctx, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = window.innerWidth, h = window.innerHeight;
    if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) {
      c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    // Time-based steps, so 60 Hz and 120 Hz (ProMotion iPhone) screens look the same.
    var now = performance.now(), k = Math.min(3, (now - (fw.last || now - 16.7)) / 16.7);
    fw.last = now;
    var drag = Math.pow(0.985, k);
    fw.sparks = fw.sparks.filter(function (s) {
      s.vx *= drag; s.vy = s.vy * drag + 0.045 * k; s.x += s.vx * k; s.y += s.vy * k; s.life -= s.decay * k;
      if (s.life <= 0) return false;
      ctx.globalAlpha = s.life * 0.55;
      ctx.fillStyle = s.col;
      ctx.beginPath(); ctx.arc(s.x, s.y, 3.5 * s.life + 1.5, 0, Math.PI * 2); ctx.fill(); // glow
      ctx.globalAlpha = Math.min(1, s.life * 1.4);
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(s.x, s.y, 1.3, 0, Math.PI * 2); ctx.fill();           // hot core
      return true;
    });
    ctx.globalAlpha = 1;
    if (fw.sparks.length || Date.now() < fw.until) { requestAnimationFrame(frame); return; }
    fw.running = false;
    fw.last = 0;
    fw.c.classList.remove('on');
  }

  function celebrate() {
    petals();
    fireworks();
  }

  // Twinkling stars scattered over the cover title, each on its own timing.
  function addSparkles() {
    var title = $('.cover-title');
    for (var i = 0; i < 10; i++) {
      var s = el('span', 'sparkle', '✦');
      s.setAttribute('aria-hidden', 'true');
      s.style.left = (4 + Math.random() * 88) + '%';
      s.style.top = (Math.random() * 90) + '%';
      s.style.fontSize = (10 + Math.random() * 12) + 'px';
      s.style.animationDelay = (Math.random() * 2.4).toFixed(2) + 's';
      s.style.animationDuration = (1.8 + Math.random() * 1.4).toFixed(2) + 's';
      title.appendChild(s);
    }
  }

  function setupCover() {
    clearTimeout(window.coverFallback);
    addSparkles();
    var root = document.documentElement;
    var cover = $('#cover');
    function open() {
      if (!root.classList.contains('cover-open')) return;
      petals();
      playMusic();
      window.scrollTo(0, 0);
      cover.classList.add('leaving');
      root.classList.remove('cover-open');
      setTimeout(function () { cover.classList.remove('leaving'); }, 700);
    }
    // The whole cover is tappable, not just the button.
    cover.addEventListener('click', function (e) { if (!e.target.closest('.lang-toggle')) open(); });
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
  $('#celebrateBtn').addEventListener('click', celebrate);
  setupShare();
  setupLang();
  tick();
  setInterval(tick, 1000);
})();
