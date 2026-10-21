/* ==========================================================================
   YOUR DETAILS GO HERE — this is the only file you need to edit.
   Every value in [square brackets] is a placeholder. Replace it.
   Each text has an English (en) and Tamil (ta) version.
   ========================================================================== */
window.INVITE = {
  // Language shown first: "ta" (Tamil) or "en" (English). Guests can switch.
  defaultLang: "ta",
  timeZone: "Asia/Kolkata",

  // ---- Who is inviting -----------------------------------------------------
  hosts: {
    en: "[Your Names]",
    ta: "[உங்கள் பெயர்கள்]",
  },
  // Line shown under the names (e.g. "and family"). Leave "" to hide.
  hostsLine: {
    en: "and family",
    ta: "மற்றும் குடும்பத்தினர்",
  },
  // Name of the house, if it has one. Leave both "" to hide.
  houseName: {
    en: "[House name — optional]",
    ta: "[இல்லத்தின் பெயர் — விருப்பம்]",
  },

  // ---- Invitation message ---------------------------------------------------
  message: {
    en: "By the grace of God and with the blessings of our elders, we warmly invite you and your family to the housewarming of our new home. Your presence will make the day complete.",
    ta: "இறைவனின் திருவருளாலும் பெரியோர்களின் ஆசியுடனும், எங்கள் புதிய இல்லத்தின் புதுமனை புகுவிழாவிற்கு உங்களைக் குடும்பத்துடன் அன்புடன் அழைக்கிறோம். தாங்கள் வருகை தந்து விழாவைச் சிறப்பிக்க வேண்டுகிறோம்.",
  },

  // ---- Ceremonies -----------------------------------------------------------
  // PLACEHOLDER DATE/TIMES — set the real muhurtham from your priest/panchangam.
  // Format: "YYYY-MM-DDTHH:MM:00+05:30". The countdown uses the first event.
  events: [
    {
      start: "2026-12-10T05:30:00+05:30",
      end:   "2026-12-10T06:30:00+05:30",
      title: { en: "Ganapathi Homam", ta: "கணபதி ஹோமம்" },
      desc:  { en: "Prayers to Lord Ganesha to begin the day auspiciously.",
               ta: "விழா இனிதே தொடங்க விநாயகப் பெருமானுக்கு வழிபாடு." },
    },
    {
      start: "2026-12-10T06:30:00+05:30",
      end:   "2026-12-10T07:30:00+05:30",
      title: { en: "Griha Pravesam & Paal Kaachchudhal", ta: "கிரகப்பிரவேசம் & பால் காய்ச்சுதல்" },
      desc:  { en: "Entering the new home at the auspicious muhurtham, followed by boiling milk.",
               ta: "நல்ல நேரத்தில் புது இல்லத்தில் நுழைந்து, பால் காய்ச்சுதல்." },
      muhurtham: true,
    },
    {
      start: "2026-12-10T11:30:00+05:30",
      end:   "2026-12-10T14:30:00+05:30",
      title: { en: "Virundhu (Lunch)", ta: "மதிய விருந்து" },
      desc:  { en: "Please stay and join us for a traditional lunch.",
               ta: "பாரம்பரிய மதிய விருந்தில் கலந்து கொள்ள அன்புடன் அழைக்கிறோம்." },
    },
  ],

  // ---- Venue (your new home) -----------------------------------------------
  venue: {
    name:    { en: "[Our New Home]", ta: "[எங்கள் புதிய இல்லம்]" },
    address: { en: "[Door No, Street, Area, City – PIN]",
               ta: "[கதவு எண், தெரு, பகுதி, ஊர் – அஞ்சல் குறியீடு]" },
    // Best: exact coordinates, because new houses are often not on Google Maps yet.
    // In Google Maps, long-press your gate → copy the "11.0xxx, 76.9xxx" numbers here.
    mapsQuery: "",
    landmark: { en: "[Landmark — e.g. near the temple / bus stop]",
                ta: "[அடையாளம் — எ.கா. கோயில் / பேருந்து நிறுத்தம் அருகில்]" },
  },

  // ---- Photos ---------------------------------------------------------------
  // Put image files in the "photos" folder. Leave heroPhoto "" to show the
  // built-in house illustration instead.
  heroPhoto: "",
  gallery: [
    // { src: "photos/house-front.jpg", caption: { en: "Our new home", ta: "எங்கள் புதிய இல்லம்" } },
  ],

  // ---- Optional background music -------------------------------------------
  // Use only audio you have the right to use, e.g. "music/nadaswaram.mp3".
  // Leave "" to hide the music button.
  music: "",

  // ---- Contact (optional) ---------------------------------------------------
  // Shown as a "Call us" button. Leave "" to hide.
  contactPhone: "",

  // ---- Backend --------------------------------------------------------------
  // Paste your Google Apps Script Web App URL (ends with /exec). See README.md.
  backendUrl: "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE",

  // Public address of this page (used in the WhatsApp share message).
  siteUrl: "https://[your-github-username].github.io/[repo-name]/",

  // Last date to reply (shown on the RSVP form). Leave "" to hide.
  rsvpBy: "2026-12-03",

  hashtag: "#[OurNewHome]",
};
