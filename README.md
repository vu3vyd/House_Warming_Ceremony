# Griha Pravesam invitation: setup guide

A single-page housewarming invitation in Tamil and English, hosted free on GitHub Pages. RSVPs and blessings are saved to your own Google Sheet.

```
index.html          page structure
style.css           look and feel
app.js              behaviour (no need to edit)
config.js           ← YOUR DETAILS: the only file you edit
apps-script/Code.gs backend: paste into Google Apps Script
photos/             put your photos here (optional)
.nojekyll           tells GitHub Pages to serve files as-is
```

---

## Step 1: Fill in `config.js`

Replace every `[placeholder]`: names, house name, date and times, address, landmark.

- **Times** use the format `2026-12-10T06:30:00+05:30`. Take the real muhurtham from your priest or panchangam. The countdown counts down to the first event.
- **Directions button:** in Google Maps, long-press exactly on your gate and copy the coordinates (e.g. `11.01234, 76.95678`) into `venue.mapsQuery`. If left empty, the button searches for the address instead. Coordinates work better than an address because new houses often aren't on Maps yet.
- **Photos (optional):** copy images into `photos/`, then set `heroPhoto: "photos/house.jpg"` and add `gallery` entries. Resize them to about 1600 px wide first so the page loads fast on mobile data.
- **Music (optional):** only use audio you have the right to use. Put the file in a `music/` folder and set `music: "music/yourfile.mp3"`.

## Step 2: Create the backend (Google Sheet + Apps Script)

1. Create a new **Google Sheet** and name it, for example, "Housewarming RSVPs".
2. Open **Extensions → Apps Script**.
3. Delete the sample code, paste in all of `apps-script/Code.gs`, and save.
4. Optional: in `CONFIG`, set `NOTIFY_EMAIL` to get an email for every RSVP, and `AUTO_APPROVE_BLESSINGS` to choose whether blessings appear straight away or wait for your approval.
5. Choose the `setup` function in the toolbar dropdown and click **Run**. Approve the permission prompt.
   - Google will show "Google hasn't verified this app". Click **Advanced → Go to (project name)**. This is normal for your own scripts.
   - Running `setup` creates three tabs: **RSVP**, **Blessings**, and **Summary**, which shows a live headcount and a food estimate.
6. Click **Deploy → New deployment**, choose the gear icon → **Web app**, then set:
   - **Execute as:** Me
   - **Who has access:** Anyone. This means guests can submit without logging in; it does not make your Sheet public.
7. Click **Deploy** and copy the **Web app URL** (it ends in `/exec`).
8. Paste that URL into `config.js` → `backendUrl`.

> **If you change `Code.gs` later:** go to **Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy**. This keeps the same URL. If you choose "New deployment" instead, you get a new URL and the page stops working until you update `config.js`.

## Step 3: Publish on GitHub Pages

1. On GitHub, create a new repository, for example `housewarming`.
2. Click **Add file → Upload files**, drag in everything from this folder (including `.nojekyll`), and commit.
3. Go to **Settings → Pages → Build and deployment**, set **Source: Deploy from a branch**, **Branch: main / (root)**, then Save.
4. After about a minute the site is live at `https://<username>.github.io/housewarming/`. Put that address into `config.js` → `siteUrl` and upload `config.js` again.

## Step 4: Test before sending to guests

- Open the page on your phone and switch between Tamil and English.
- Send a test RSVP and check that a row appears in the **RSVP** tab.
- Send the same RSVP again with the same phone number. The row should update, not duplicate.
- Send a test blessing and check it appears on the page.
- Delete your test rows from the Sheet before sharing the link.

---

## Privacy and security notes

- **The page is public.** Anyone with the link can see your address and date. The page asks search engines not to index it (`noindex`), but the link itself is not secret, so share it only in family and friends groups.
- **The repository is public too.** On a free GitHub account, a Pages site needs a public repo, so `config.js`, and every earlier version of it, can be read on GitHub. Don't put anything in it that isn't already on the page.
- **Guests' phone numbers and headcounts stay in your Sheet.** The backend never sends RSVP data back to the page. Only blessings (name and message) are public.
- **Anyone who finds the backend URL can submit to it**, because it is visible in `config.js`. To limit abuse, the backend has:
  - a hidden honeypot field that traps bots
  - length limits on every field
  - a cap on how many guests one reply can claim
  - a site-wide limit on submissions per minute
  - protection against spreadsheet formula injection
  
  If spam gets through anyway, set `AUTO_APPROVE_BLESSINGS: false` and approve blessings by hand.
- After the event, you can turn the backend off at **Deploy → Manage deployments → Archive**.
