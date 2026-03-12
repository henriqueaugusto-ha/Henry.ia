const { PDFDocument, StandardFonts, rgb } = require('./node_modules/pdf-lib/cjs/index.js');
const { readFileSync, writeFileSync } = require('fs');

async function main() {
  const pdfPath = '/home/node/.openclaw/media/inbound/RECURSO_A_JARI_1---d5485175-5123-47c1-9101-0688785a51b7.pdf';
  const pdfBytes = readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });

  const form = pdfDoc.getForm();

  // Log all fields before filling
  const fields = form.getFields();
  console.log('Campos disponíveis:');
  for (const f of fields) {
    console.log(' -', f.getName(), '('+f.constructor.name+')');
  }

  // Helper to fill a text field safely
  function fill(fieldName, value) {
    try {
      const field = form.getTextField(fieldName);
      field.setText(value || '');
      console.log(`  ✓ ${fieldName} = "${value}"`);
    } catch (e) {
      console.log(`  ✗ ${fieldName} ERRO: ${e.message}`);
    }
  }

  console.log('\nPreenchendo campos:');
  fill('NOME',            'EDICLEUDO FERNANDES DIAS');
  fill('IDENTIDADE',      '2002097082616 SSP/CE');
  fill('CPF',             '022.129.173-33');
  fill('REGISTRO CNH',    '06069568186');
  fill('LOGRADOURO',      'RUA FRANCISCO DAS CHAGAS LUCENA');
  fill('NUMERO',          '1176');
  fill('COMPLEMENTO',     '');
  fill('BAIRRO',          'BOM NOME');
  fill('CEP',             '62.930-000');
  fill('CIDADE',          'LIMOEIRO DO NORTE');
  fill('UF',              'CE');
  fill('TELEFONE',        '(85) 91524493');
  fill('PLACA',           'PUZ4049');
  fill('UF VEIC',         'CE');
  fill('AUTO DE INFRAÇÃO','N002385718');
  fill('NOTIFICAÇÃO',     '10374519781');
  fill('E-MAIL',          '');
  fill('LIMITE',          '11/03/2026');
  fill('Texto2',          'HENRIQUE AUGUSTO FÉLIX LINHARES - OAB/CE 28.051');

  // Flatten form so fields appear as text when printed
  // form.flatten(); // Not flattening yet — keep interactive for now

  const outputBytes = await pdfDoc.save();
  const outPath = '/home/node/.openclaw/workspace/RECURSO_JARI_EDICLEUDO_PREENCHIDO.pdf';
  writeFileSync(outPath, outputBytes);
  console.log('\nPDF salvo em:', outPath);
  console.log('Tamanho:', (outputBytes.length / 1024).toFixed(1), 'KB');
}

main().catch(console.error);
