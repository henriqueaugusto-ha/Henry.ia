const { PDFDocument, StandardFonts, rgb } = require('./node_modules/pdf-lib/cjs/index.js');
const { readFileSync, writeFileSync } = require('fs');

async function main() {
  // Use the original PDF (not the already filled one, to avoid font issues)
  const pdfPath = '/home/node/.openclaw/media/inbound/RECURSO_A_JARI_1---d5485175-5123-47c1-9101-0688785a51b7.pdf';
  const pdfBytes = readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });

  const sigPath = '/home/node/.openclaw/media/inbound/file_601---96b83ae0-d301-4115-81ba-7922eb7040a8.jpg';
  const sigBytes = readFileSync(sigPath);
  const sigImage = await pdfDoc.embedJpg(sigBytes);

  const form = pdfDoc.getForm();
  const pages = pdfDoc.getPages();
  const page1 = pages[0];
  const page2 = pages[1];

  // Embed a standard font for overlaid text
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // === FILL FORM FIELDS ===
  function fill(name, value) {
    try {
      // Handle duplicate field names (UF appears twice)
      const fields = form.getFields().filter(f => f.getName() === name);
      for (const f of fields) {
        if (f.constructor.name === 'PDFTextField') {
          f.setText(value || '');
        }
      }
      console.log(`  ✓ ${name} = "${value}"`);
    } catch(e) {
      console.log(`  ✗ ${name}: ${e.message}`);
    }
  }

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
  fill('UF',              'CE');   // fills both UF fields (CNH + endereco)
  fill('TELEFONE',        '(85) 91524493');
  fill('PLACA',           'PUZ4049');
  fill('UF VEIC',         'CE');
  fill('AUTO DE INFRAÇÃO','N002385718');
  fill('NOTIFICAÇÃO',     '10374519781');
  fill('E-MAIL',          '');
  fill('LIMITE',          '11/03/2026');
  // Texto2 = campo grande na Folha 2 (OBSERVAÇÕES)
  fill('Texto2',          'Recurso Administrativo em 1ª Instância à JARI/CE — documentos de comprovação em anexo.');

  // === ASSINATURA — PÁGINA 1 ===
  // Área de assinatura fica abaixo do campo E-MAIL (y=265) — aprox y=100-230
  // Posição: canto inferior direito da folha 1
  const sigDims1 = sigImage.scaleToFit(160, 45);
  const sigX1 = 340;  // x position (right side)
  const sigY1 = 165;  // y position
  page1.drawImage(sigImage, {
    x: sigX1,
    y: sigY1,
    width: sigDims1.width,
    height: sigDims1.height,
  });
  // Nome e OAB abaixo da assinatura
  page1.drawText('Henrique Augusto Félix Linhares', {
    x: sigX1,
    y: sigY1 - 14,
    size: 7,
    font,
    color: rgb(0, 0, 0),
  });
  page1.drawText('OAB/CE 28.051 - Advogado', {
    x: sigX1,
    y: sigY1 - 24,
    size: 7,
    font,
    color: rgb(0, 0, 0),
  });

  // === ASSINATURA — PÁGINA 2 ===
  // Folha 2 tem observações no topo e assinatura na parte inferior
  // Posição similar à página 1
  const sigDims2 = sigImage.scaleToFit(160, 45);
  const sigX2 = 340;
  const sigY2 = 80;
  page2.drawImage(sigImage, {
    x: sigX2,
    y: sigY2,
    width: sigDims2.width,
    height: sigDims2.height,
  });
  page2.drawText('Henrique Augusto Félix Linhares', {
    x: sigX2,
    y: sigY2 - 14,
    size: 7,
    font,
    color: rgb(0, 0, 0),
  });
  page2.drawText('OAB/CE 28.051 - Advogado', {
    x: sigX2,
    y: sigY2 - 24,
    size: 7,
    font,
    color: rgb(0, 0, 0),
  });

  // Flatten form to fix font rendering
  form.flatten();

  const outputBytes = await pdfDoc.save();
  const outPath = '/home/node/.openclaw/workspace/RECURSO_JARI_EDICLEUDO_FINAL.pdf';
  writeFileSync(outPath, outputBytes);
  console.log('\nPDF salvo:', outPath);
  console.log('Tamanho:', (outputBytes.length / 1024).toFixed(1), 'KB');
}

main().catch(console.error);
