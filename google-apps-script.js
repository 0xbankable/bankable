// ============================================
// BANKABLE APPLICATION FORM — Google Apps Script
// ============================================
// 
// SETUP INSTRUCTIONS:
// 1. Go to https://script.google.com
// 2. Create a new project, name it "Bankable Applications"
// 3. Paste this entire script into Code.gs
// 4. Click Deploy → New deployment
// 5. Type: Web app
// 6. Execute as: Me
// 7. Who has access: Anyone
// 8. Click Deploy — copy the URL
// 9. Replace the PLACEHOLDER URL in index.html with your real URL
//    (search for "AKfycbxPLACEHOLDER" and replace the full URL)
//
// That's it. Forms will email 0xbankable@gmail.com.
// ============================================

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    
    var subject = "bankable application: " + (data.handle || "unknown");
    
    var body = "new bankable application\n\n" +
      "name: " + (data.name || "—") + "\n" +
      "handle: " + (data.handle || "—") + "\n" +
      "email: " + (data.email || "—") + "\n" +
      "type: " + (data.type || "—") + "\n" +
      "pitch: " + (data.pitch || "—") + "\n" +
      "wallet: " + (data.wallet || "n/a") + "\n\n" +
      "sent from bankable.pages.dev";
    
    MailApp.sendEmail({
      to: "0xbankable@gmail.com",
      subject: subject,
      body: body
    });
    
    // Also log to spreadsheet (optional but useful)
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (ss) {
      var sheet = ss.getActiveSheet();
      sheet.appendRow([
        new Date(),
        data.name,
        data.handle,
        data.email,
        data.type,
        data.pitch,
        data.wallet
      ]);
    }
    
    return ContentService.createTextOutput(
      JSON.stringify({ status: "ok" })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle CORS preflight
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ready" })
  ).setMimeType(ContentService.MimeType.JSON);
}
