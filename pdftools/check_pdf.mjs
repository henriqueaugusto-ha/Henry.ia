import { PDFDocument } from './node_modules/pdf-lib/es/index.js';
import { readFileSync } from 'fs';

const pdfPath = '/home/node/.openclaw/media/inbound/RECURSO_A_JARI_1---d5485175-5123-47c1-9101-0688785a51b7.pdf';
const pdfBytes = readFileSync(pdfPath);

const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });

console.log('Páginas:', pdfDoc.getPageCount());

const form = pdfDoc.getForm();
const fields = form.getFields();
console.log('Campos de formulário:', fields.length);

for (const field of fields) {
  const name = field.getName();
  const type = field.constructor.name;
  console.log(` - [${type}] ${name}`);
}

if (fields.length === 0) {
  console.log('PDF sem campos interativos (flat PDF)');
  console.log('Tamanho primeira página:');
  const page = pdfDoc.getPage(0);
  const { width, height } = page.getSize();
  console.log(`  ${width.toFixed(0)} x ${height.toFixed(0)} pts`);
}
