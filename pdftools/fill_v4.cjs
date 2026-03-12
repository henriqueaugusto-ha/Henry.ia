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
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // === PREENCHER CAMPOS ===
  function fill(name, value) {
    form.getFields().filter(f => f.getName() === name).forEach(f => {
      try { f.setText(value || ''); } catch(e) {}
    });
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
  // HELPER: desenhar bloco de assinatura
  // Layout: [imagem] [Nome / OAB ao lado direito]
  // sigY = posição y da linha de assinatura (borda inferior da imagem fica ~5pts acima)
  // ================================================================
  async function drawSignature(page, sigY) {
    const imgW = 160;
    const imgH = 55;
    const imgX = 63;

    page.drawImage(sigImage, {
      x: imgX,
      y: sigY,
      width: imgW,
      height: imgH,
    });

    // Texto ao lado direito da imagem, verticalmente centralizado
    const textX = imgX + imgW + 8;
    const midY = sigY + imgH / 2;

    page.drawText('Henrique Augusto Félix Linhares', {
      x: textX,
      y: midY + 5,
      size: 8.5,
      font: fontBold,
      color: rgb(0, 0, 0),
    });
    page.drawText('OAB/CE 28.051 — Advogado', {
      x: textX,
      y: midY - 8,
      size: 8.5,
      font,
      color: rgb(0, 0, 0),
    });
  }

  // Página 1: linha de assinatura está logo abaixo do campo E-MAIL (y=265)
  // "Assinatura do Requerente" aparece como label de linha em ~y=155-165
  // Imagem justo acima dessa linha → sigY ≈ 165
  await drawSignature(page1, 165);

  // Página 2: linha de assinatura está no fundo da folha, abaixo do campo Texto2
  // Texto2 começa em y=202 → assinatura em ~y=100
  await drawSignature(page2, 100);

  form.flatten();

  const outputBytes = await pdfDoc.save();
  const outPath = '/home/node/.openclaw/workspace/RECURSO_JARI_EDICLEUDO_v4.pdf';
  writeFileSync(outPath, outputBytes);
  console.log('Salvo:', outPath, '|', (outputBytes.length/1024).toFixed(0), 'KB');
}

main().catch(console.error);
