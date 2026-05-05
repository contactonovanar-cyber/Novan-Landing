function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Aplicaciones");
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Aplicaciones");
    sheet.appendRow(["Fecha", "Nombre", "Carrera", "Antigüedad", "Contacto", "Email", "Página"]);
  }
  
  try {
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date(),
      data.nombre || "",
      data.carrera || "",
      data.anios || "",
      data.contacto || "",
      data.email || "",
      data.pagina || "index"
    ]);
    
    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService.createTextOutput("Error: " + err.message).setMimeType(ContentService.MimeType.TEXT);
  }
}
