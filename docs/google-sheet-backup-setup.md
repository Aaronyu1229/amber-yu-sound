# Contact form backup → Google Sheet

The `/api/contact` route POSTs every submission to `BACKUP_WEBHOOK_URL`
(if set) in parallel with Resend delivery. If Resend fails or the
inbox gets overlooked, the Sheet remains as a permanent record.

This guide wires that hook to a Google Sheet via Apps Script.

---

## Step 1 — Create the Sheet

1. Go to https://sheets.new
2. Name the file e.g. **"Dolce & Forte — Contact Submissions"**
3. In row 1, paste this header row (Tab-separated, paste into A1):

   ```
   Received At	Name	Company	Email	Platform	Game Type	Audio Needs	Deadline	Details	Locale	Source
   ```

4. Freeze the header row: **View → Freeze → 1 row**

---

## Step 2 — Open Apps Script and paste the code

1. **Extensions → Apps Script**
2. Delete the default `function myFunction() { ... }` content
3. Paste this entire block:

```javascript
/**
 * Webhook endpoint for Dolce & Forte contact form.
 * Receives JSON from /api/contact and appends a row to the bound sheet.
 *
 * Returns JSON to ack the receive. The contact API does not block on
 * the response, so latency here is non-critical.
 */
function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    sheet.appendRow([
      payload.receivedAt || new Date().toISOString(),
      payload.name || '',
      payload.company || '',
      payload.email || '',
      payload.platform || '',
      payload.gameType || '',
      Array.isArray(payload.audioNeeds) ? payload.audioNeeds.join(', ') : (payload.audioNeeds || ''),
      payload.deadline || '',
      payload.details || '',
      payload.locale || '',
      payload.source || 'dolcenforte.com/contact',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    // Even on error, return 200 so the contact API doesn't retry-storm.
    // The full payload is logged for manual recovery.
    console.error('Webhook error:', err, e.postData && e.postData.contents);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/** Optional health check via GET. */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'dolce-forte-contact-backup' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Click the disk icon to **Save**. Name the project e.g. *Contact Backup*.

---

## Step 3 — Deploy as Web App

1. Top right → **Deploy → New deployment**
2. ⚙️ Gear icon → **Web app**
3. Settings:
   - **Description**: `Dolce & Forte contact backup v1`
   - **Execute as**: `Me (your@email.com)`
   - **Who has access**: `Anyone` ← important; otherwise our server can't POST
4. Click **Deploy**
5. First time only: Google asks to authorise — click **Authorize access** → pick your account → **Advanced** → **Go to (project name) (unsafe)** → **Allow**. (It's safe because you wrote the script.)
6. After deployment Google shows a **Web app URL** like:
   ```
   https://script.google.com/macros/s/AKfycbX.../exec
   ```
7. Copy that URL.

---

## Step 4 — Paste the URL back so it gets wired into Vercel

Send the `/exec` URL back to the agent (or set it yourself):

```bash
echo -n "PASTE_YOUR_EXEC_URL_HERE" | vercel env add BACKUP_WEBHOOK_URL production
vercel --prod --yes
```

After redeploy, every contact form submission writes to the Sheet
within ~1 second of the user clicking Submit.

---

## Step 5 — Verify it works

1. Submit a test on https://dolcenforte.com/contact
2. Open the Sheet → row 2 should populate within a few seconds

Or fire one from the terminal:

```bash
curl -X POST https://dolcenforte.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Webhook Test","company":"Internal","email":"test@example.com","details":"Sheet backup smoke test"}'
```

---

## Maintenance

- The Sheet is permanent storage — never delete it without exporting first.
- To rotate the webhook URL: create a new deployment in Apps Script
  (Deploy → Manage deployments → ✏️ Edit → New version) — old `/exec`
  URL stops accepting traffic.
- If the Sheet ever fills up, archive into a second tab and keep the
  webhook pointed at the first.
