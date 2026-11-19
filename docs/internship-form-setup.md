# Internship form: send applications to Google Sheets + Drive

The form on `/connect` works straight away: until this is set up, it opens the applicant's
email app with their details and asks them to attach their CV.

To collect applications automatically (one row per applicant in a Sheet, CVs saved in a Drive folder):

1. **Make a Drive folder** for CVs, e.g. `SML internship CVs`. Open it and copy the ID from the
   address bar (the part after `/folders/`).
2. **Make a Google Sheet**, e.g. `SML internship applications`.
3. In the Sheet: **Extensions → Apps Script**. Delete what's there and paste the script below.
   Put your folder ID in `FOLDER_ID`.
4. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   Authorise when asked, then copy the **Web app URL** (ends in `/exec`).
5. Paste that URL into `content/connect.ts`:
   ```ts
   export const APPLICATION_ENDPOINT = 'https://script.google.com/macros/s/XXXX/exec'
   ```
6. Commit and push. Send yourself a test application.

To get an email for every new application, set `NOTIFY` in the script to your address.

```javascript
const FOLDER_ID = 'PASTE_DRIVE_FOLDER_ID_HERE';
const NOTIFY = ''; // e.g. 'npunjabi@iitb.ac.in' — leave empty for no emails

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Submitted', 'Name', 'Email', 'Phone', 'Institution', 'Programme', 'Year',
      'Project', 'Start date', 'Duration', 'Mode', 'Links', 'Statement', 'CV']);
  }

  let cvUrl = '';
  if (d.cv && d.cv.data) {
    const blob = Utilities.newBlob(Utilities.base64Decode(d.cv.data), d.cv.type || 'application/pdf',
      `${d.name} - ${d.cv.name}`);
    cvUrl = DriveApp.getFolderById(FOLDER_ID).createFile(blob).getUrl();
  }

  sheet.appendRow([new Date(d.submittedAt || Date.now()), d.name, d.email, d.phone, d.institution,
    d.programme, d.year, d.position, d.startDate, d.duration, d.mode, d.links, d.statement, cvUrl]);

  if (NOTIFY) {
    MailApp.sendEmail(NOTIFY, `New internship application: ${d.name} (${d.position})`,
      `${d.name} <${d.email}>\n${d.institution}\nProject: ${d.position}\nStart: ${d.startDate}, ${d.duration}\n\n${d.statement}\n\nCV: ${cvUrl}`);
  }
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
```

If you change the script later, use **Deploy → Manage deployments → Edit → New version** so the
same URL keeps working.
