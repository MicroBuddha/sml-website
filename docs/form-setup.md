# Saving form submissions (internships, enquiries, CVs)

**Until this is set up, nothing from the Connect form is saved.** The form only opens the
visitor's own email app and asks them to attach their CV themselves.

After setup, every submission is saved automatically:

| What | Where it goes |
| --- | --- |
| Internship applications (every field) | Google Sheet, tab **Internship** |
| PhD / Masters, Collaboration, Workshop, Other | Same Sheet, one tab per type |
| CVs and attachments | Google Drive folder, in a sub-folder per type, linked from the Sheet row |
| A heads-up for each submission | Email to the address in `NOTIFY` |

It's free and uses the lab's own Google account. Setup takes about 10 minutes.

## Steps

1. **Pick the Google account** that should own the data, e.g. the lab or PI account.
   Everything is saved in that account's Drive.
2. **Make a Drive folder** called `SML website uploads`. Open it and copy the ID from the
   address bar (the long part after `/folders/`).
3. **Make a Google Sheet** called `SML website submissions`.
4. In the Sheet, open **Extensions → Apps Script**. Delete what's there, paste the script
   below, and fill in `FOLDER_ID` and `NOTIFY`. Click **Save**.
5. Click **Deploy → New deployment**. Click the gear icon and choose **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
   Click **Deploy**, allow the permissions it asks for, and copy the **Web app URL**
   (it ends in `/exec`).
6. Paste the URL into `content/connect.ts`:
   ```ts
   export const FORM_ENDPOINT = 'https://script.google.com/macros/s/XXXX/exec'
   ```
7. Run `git add -A && git commit -m "Connect form endpoint" && git push`.
   Then send a test application with a small PDF. A row should appear in the Sheet, the
   PDF should appear in Drive, and you should get an email.

**If you change the script later:** use **Deploy → Manage deployments → ✎ Edit →
Version: New version → Deploy**. That keeps the same URL.

## The script

```javascript
// ── SETTINGS ────────────────────────────────────────────────
const FOLDER_ID = 'PASTE_DRIVE_FOLDER_ID_HERE';
const NOTIFY = 'npunjabi@iitb.ac.in';   // who gets an email per submission ('' for none)
// ────────────────────────────────────────────────────────────

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const d = JSON.parse(e.postData.contents);
    const type = String(d.formType || 'Other').slice(0, 40);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(type) || ss.insertSheet(type);

    // Save the uploaded file (CV / attachment) to Drive, in a sub-folder per form type.
    let fileUrl = '';
    if (d.attachment && d.attachment.data) {
      const root = DriveApp.getFolderById(FOLDER_ID);
      const sub = root.getFoldersByName(type);
      const folder = sub.hasNext() ? sub.next() : root.createFolder(type);
      const blob = Utilities.newBlob(
        Utilities.base64Decode(d.attachment.data),
        d.attachment.type || 'application/octet-stream',
        `${d.name || 'unknown'} - ${d.attachment.name}`
      );
      fileUrl = folder.createFile(blob).getUrl();
    }
    delete d.attachment;
    d.file = fileUrl;

    // Columns are created automatically from whatever fields the form sends.
    let headers = sheet.getLastRow() ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : [];
    Object.keys(d).forEach(k => { if (!headers.includes(k)) headers.push(k); });
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.appendRow(headers.map(h => h === 'submittedAt' ? new Date(d[h] || Date.now()) : (d[h] ?? '')));

    if (NOTIFY) {
      const lines = Object.keys(d).map(k => `${k}: ${d[k]}`).join('\n');
      MailApp.sendEmail({
        to: NOTIFY,
        replyTo: d.email || NOTIFY,
        subject: `[SML website] ${type}: ${d.name || ''}${d.project ? ' — ' + d.project : d.subject ? ' — ' + d.subject : ''}`,
        body: `${lines}\n\nAll submissions: ${ss.getUrl()}`,
      });
    }
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

## Good to know

- Pressing **reply** on a notification email replies straight to the applicant.
- To see all applications, open the Sheet. You can sort or filter it by project, programme
  or year.
- Uploaded files go to the folder owner's Drive and count against that account's storage.
