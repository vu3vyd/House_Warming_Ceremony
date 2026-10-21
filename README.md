# House-warming invitation: setup guide

A single-page housewarming invitation in Tamil and English, hosted free on GitHub Pages.

```
index.html   page structure
style.css    look and feel
app.js       behaviour (no need to edit)
config.js    ← YOUR DETAILS: the only file you edit
photos/      pictures used on the page
.nojekyll    tells GitHub Pages to serve files as-is
```

---

## Step 1: Fill in `config.js`

- **Names, message, house name, venue:** each text has an English (`en`) and a Tamil (`ta`) version.
- **Times** use the format `2026-12-10T06:30:00+05:30`. The countdown counts down to the first event. Add `muhurtham: true` to an event to show a MUHURTHAM badge on it.
- **Directions button:** in Google Maps, long-press exactly on your gate and copy the coordinates (e.g. `11.01234, 76.95678`) into `venue.mapsQuery`. If left empty, the button searches for the address instead. Coordinates work better than an address because new houses often aren't on Maps yet.
- **Top picture:** `heroPhoto` is set to `photos/family.gif`. To use a different picture, copy it into `photos/` and change `heroPhoto` to its path (e.g. `"photos/house.jpg"`), or set it to `""` for the built-in house illustration. File names are case-sensitive on GitHub Pages.
- **Link preview picture:** the image shown when the link is shared (WhatsApp etc.) is `photos/preview.jpg`, set in the `og:image` lines of `index.html`. It must be a still JPG or PNG under about 300 KB. To replace it, overwrite that file; WhatsApp may keep showing the old preview for links it has already seen.
- **Photo gallery (optional):** copy images into `photos/` and add `gallery` entries. Resize them to about 1600 px wide first so the page loads fast on mobile data.
- **Music (optional):** only use audio you have the right to use. Put the file in a `music/` folder and set `music: "music/yourfile.mp3"`.
- **Call button (optional):** set `contactPhone`, or leave it `""` to hide the button.

## Step 2: Publish on GitHub Pages

1. Commit and push: `git add -A && git commit -m "Update invite" && git push`.
2. First time only: on GitHub, go to **Settings → Pages → Build and deployment**, set **Source: Deploy from a branch**, **Branch: main / (root)**, then Save.
3. After about a minute the site is live at `https://vu3vyd.github.io/House_Warming_Ceremony/`. This address is also set in `config.js` → `siteUrl`, which the WhatsApp share button uses.

Browsers may keep the old version for up to 10 minutes. To check a change straight away, open the address with `?v=2` (any new number) on the end.

## Step 3: Check before sending to guests

- Open the page on your phone and switch between Tamil and English.
- Tap **Directions** and check that Google Maps lands on your gate.
- Try **Add to phone calendar** and **Share on WhatsApp**.

---

## Privacy notes

- **The page is public.** Anyone with the link can see your address and date. The page asks search engines not to index it (`noindex`), but the link itself is not secret, so share it only in family and friends groups.
- **The repository is public too.** On a free GitHub account, a Pages site needs a public repo, so `config.js`, and every earlier version of it, can be read on GitHub. Don't put anything in it that you wouldn't put on the page.
