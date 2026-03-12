const { PDFDocument } = require('./node_modules/pdf-lib/cjs/index.js');
const { readFileSync } = require('fs');

async function main() {
  const pdfPath = '/home/node/.openclaw/workspace/RECURSO_JARI_EDICLEUDO_PREENCHIDO.pdf';
  const pdfBytes = readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });

  const pages = pdfDoc.getPages();
  console.log('Total páginas:', pages.length);
  for (let i = 0; i < Math.min(3, pages.length); i++) {
    const p = pages[i];
    const { width, height } = p.getSize();
    console.log(`\nPágina ${i+1}: ${width.toFixed(0)} x ${height.toFixed(0)} pts`);
  }

  // Inspecionar anotações de campo para achar coordenadas
  const form = pdfDoc.getForm();
  const fields = form.getFields();

  for (const field of fields) {
    const widgets = field.acroField.getWidgets();
    for (const widget of widgets) {
      const rect = widget.getRectangle();
      const page = widget.P(); // page ref
      console.log(`\nField: ${field.getName()}`);
      console.log(`  Rect: x=${rect.x.toFixed(1)}, y=${rect.y.toFixed(1)}, w=${rect.width.toFixed(1)}, h=${rect.height.toFixed(1)}`);
    }
  }
}

main().catch(console.error);
