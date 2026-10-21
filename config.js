/* ==========================================================================
   YOUR DETAILS GO HERE — this is the only file you need to edit.
   Each text has an English (en) and Tamil (ta) version.
   ========================================================================== */
window.INVITE = {
  // Language shown first: "ta" (Tamil) or "en" (English). Guests can switch.
  defaultLang: "ta",
  timeZone: "Asia/Kolkata",

  // ---- Who is inviting -----------------------------------------------------
  hosts: {
    en: "Vivekanantha, Sindhu, Maithraye and Thigalvi",
    ta: "விவேகானந்தா, சிந்து, மைத்ரேயி, திகழ்வி",
  },
  // Line shown under the names (e.g. "and family"). Leave "" to hide.
  hostsLine: {
    en: "and family",
    ta: "மற்றும் குடும்பத்தினர்",
  },
  // Name of the house, if it has one. Leave both "" to hide.
  houseName: {
    en: "F28, Kubhera Vistas",
    ta: "F28, குபேரா விஸ்டாஸ்",
  },

  // ---- Invitation message ---------------------------------------------------
  message: {
    en: "To bless our new home, And to blend your happiness with ours, We lovingly invite your gracious presence, Heartfelt blessings, and good wishes To partake in our feast and grace our House-warming🏡 ceremony! Your presence is the true grace of our home! 🙏🙏🙏",
    ta: "எங்கள் இல்லம் சிறக்க, எங்கள் மகிழ்வில் உங்கள் மகிழ்வும் கலக்க, அன்பும் ஆசியும் மனமார வழங்கி, இனிய விருந்தினை ஏற்று, இந்த இனிய புதுமனை புகுவிழாவை🏡 சிறப்பிக்க, அன்பான உ(ள்ள)ங்களை உளமார அழைக்கின்றோம்! தங்கள் வருகையே எங்கள் இல்லத்தின் சிறப்பு! 🙏🙏🙏",
  },

  // ---- Ceremonies -----------------------------------------------------------
  // Format: "YYYY-MM-DDTHH:MM:00+05:30". The countdown uses the first event.
  events: [
    {
      start: "2026-11-13T04:00:00+05:30",
      end:   "2026-11-13T06:00:00+05:30",
      title: { en: "Ganapathi Homam", ta: "கணபதி ஹோமம்" },
      desc:  { en: "Prayers to Lord Ganesha to begin the day auspiciously.",
               ta: "விழா இனிதே தொடங்க விநாயகப் பெருமானுக்கு வழிபாடு." },
    },
    {
      start: "2026-11-13T07:30:00+05:30",
      end:   "2026-11-13T10:00:00+05:30",
      title: { en: "Virundhu (Breakfast)", ta: "காலை விருந்து" },
      desc:  { en: "Please stay and join us for a traditional breakfast.",
               ta: "பாரம்பரிய காலை விருந்தில் கலந்து கொள்ள அன்புடன் அழைக்கிறோம்." },
    },
  ],

  // ---- Venue (your new home) -----------------------------------------------
  venue: {
    name:    { en: "🏡F28, Kubhera Vistas", ta: "🏡F28, குபேரா விஸ்டாஸ்" },
    address: { en: "College Road, Saravanampatti, Coimbatore – 641035",
               ta: "காலேஜ் ரோடு, சரவணம்பட்டி, கோயம்புத்தூர் – 641035" },
    // Best: exact coordinates, because new houses are often not on Google Maps yet.
    // In Google Maps, long-press your gate → copy the "11.0xxx, 76.9xxx" numbers here.
    mapsQuery: "11.088343849533162, 76.98926556779746",
    landmark: { en: "Landmark — Near Sankara Polytechnic College",
                ta: "அடையாளம் — சங்கர பாலிடெக்னிக் கல்லூரிக்கு அருகில்" },
  },

  // ---- Photos ---------------------------------------------------------------
  // Top picture of the invite. To change it, put a new file (.gif, .jpg, .png
  // or .webp) in the "photos" folder and put its path here, e.g.
  // "photos/house-front.jpg". Leave "" to show the built-in house illustration.
  heroPhoto: "photos/family.gif",
  gallery: [
    // { src: "photos/house-front.jpg", caption: { en: "Our new home", ta: "எங்கள் புதிய இல்லம்" } },
  ],

  // ---- Optional background music -------------------------------------------
  // Use only audio you have the right to use, e.g. "music/nadaswaram.mp3".
  // Leave "" to hide the music button.
  music: "",

  // ---- Contact (optional) ---------------------------------------------------
  // Shown as a "Call us" button. Leave "" to hide.
  contactPhone: "+91-9952242291",

  // Public address of this page (used in the WhatsApp share message).
  siteUrl: "https://vu3vyd.github.io/House_Warming_Ceremony/",

};
