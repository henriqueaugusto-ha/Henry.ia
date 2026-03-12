const { PDFDocument, StandardFonts, rgb } = require('./node_modules/pdf-lib/cjs/index.js');
const { readFileSync, writeFileSync } = require('fs');

async function main() {
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
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // === PREENCHER CAMPOS ===
  function fill(name, value) {
    const fields = form.getFields().filter(f => f.getName() === name);
    for (const f of fields) {
      try { f.setText(value || ''); } catch(e) {}
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
  fill('UF',              'CE');
  fill('TELEFONE',        '(85) 91524493');
  fill('PLACA',           'PUZ4049');
  fill('UF VEIC',         'CE');
  fill('AUTO DE INFRAÇÃO','N002385718');
  fill('NOTIFICAÇÃO',     '10374519781');
  fill('E-MAIL',          '');
  fill('LIMITE',          '11/03/2026');
  fill('Texto2', 'Recurso Administrativo em 1ª Instância à JARI/CE — documentos de comprovação em anexo.');

  // ================================================================
  // ASSINATURA PÁGINA 1
  // Posição CORRETA: lado ESQUERDO, abaixo do campo E-MAIL (y=265)
  // "Assinatura do Requerente" fica na linha ~y=220, lado esquerdo x=63
  // Colocar assinatura acima dessa linha, maior
  // ================================================================
  const sigDims1 = sigImage.scaleToFit(220, 65);  // maior que antes
  const sigX1 = 63;    // lado esquerdo (alinhado com os demais campos)
  const sigY1 = 215;   // acima da linha de assinatura
  page1.drawImage(sigImage, {
    x: sigX1,
    y: sigY1,
    width: sigDims1.width,
    height: sigDims1.height,
  });
  // Nome e OAB logo abaixo da imagem
  page1.drawText('Henrique Augusto Félix Linhares', {
    x: sigX1,
    y: sigY1 - 12,
    size: 8,
    font,
    color: rgb(0, 0, 0),
  });
  page1.drawText('OAB/CE 28.051 - Advogado', {
    x: sigX1,
    y: sigY1 - 22,
    size: 8,
    font,
    color: rgb(0, 0, 0),
  });

  // ================================================================
  // ASSINATURA PÁGINA 2
  // Texto2 field: y=202.1 (bottom) height=457.2 → topo em y=659.3
  // Assinatura abaixo do Texto2, lado esquerdo
  // ================================================================
  const sigDims2 = sigImage.scaleToFit(220, 65);
  const sigX2 = 63;
  const sigY2 = 130;   // abaixo do campo de observações
  page2.drawImage(sigImage, {
    x: sigX2,
    y: sigY2,
    width: sigDims2.width,
    height: sigDims2.height,
  });
  page2.drawText('Henrique Augusto Félix Linhares', {
    x: sigX2,
    y: sigY2 - 12,
    size: 8,
    font,
    color: rgb(0, 0, 0),
  });
  page2.drawText('OAB/CE 28.051 - Advogado', {
    x: sigX2,
    y: sigY2 - 22,
    size: 8,
    font,
    color: rgb(0, 0, 0),
  });

  form.flatten();

  const outputBytes = await pdfDoc.save();
  const outPath = '/home/node/.openclaw/workspace/RECURSO_JARI_EDICLEUDO_v3.pdf';
  writeFileSync(outPath, outputBytes);
  console.log('Salvo:', outPath, '|', (outputBytes.length/1024).toFixed(0), 'KB');
}

main().catch(console.error);
