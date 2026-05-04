// =============================================
// NOVAN — GOOGLE APPS SCRIPT BACKEND
// =============================================
// PASOS PARA DEPLOYAR:
// 1. Ir a script.google.com > Nuevo proyecto > Pegar este código
// 2. Reemplazar SHEET_ID con el ID de tu Google Sheet (está en la URL de la hoja)
// 3. Clic en "Implementar" > "Nueva implementación"
// 4. Tipo: "Aplicación web"
// 5. Ejecutar como: "Yo"
// 6. Quién tiene acceso: "Cualquiera"
// 7. Copiar la URL del endpoint y reemplazar APPS_SCRIPT_URL en el JS de la landing
// =============================================

const SHEET_ID = 'REEMPLAZAR_CON_ID_DE_TU_SHEET';
const SHEET_NAME = 'Aplicaciones';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Nombre',
        'Carrera / Profesión',
        'Años de experiencia',
        'Contacto (IG / LinkedIn / WhatsApp)',
        'Email'
      ]);
    }

    sheet.appendRow([
      new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }),
      data.nombre || '',
      data.carrera || '',
      data.anios || '',
      data.contacto || '',
      data.email || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
