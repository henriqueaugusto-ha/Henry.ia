// preencher-formulario-amc.js
// Preenche o formulário AMC aplicando o CTM correto do PDF:
//   CTM: 0.75 0 0 -0.75 0 841.92
//   x_pdf = 0.75 * x_stream
//   y_pdf = -0.75 * y_stream + 841.92
// Uso: node preencher-formulario-amc.js dados.json saida.pdf

const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');

// Converte coordenadas do stream para pdf-lib
const H = 841.92;
const cx = (xs) => 0.75 * xs;
const cy = (ys) => -0.75 * ys + H;

async function preencherFormulario(dadosPath, outputPath) {
  const dados = JSON.parse(fs.readFileSync(dadosPath, 'utf8'));

  const templatePath = '/home/node/.openclaw/media/inbound/Formulário_de_defesa_de_autuação---4a9f7156-7c27-4863-9ecf-8d68f694d717.pdf';
  const pdfBytes = fs.readFileSync(templatePath);
  const pdfDoc = await PDFDocument.load(pdfBytes);

  const font  = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontB = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const black = rgb(0, 0, 0);
  const sz = 9; // tamanho base (equivale a ~12pt no espaço do stream)

  const p1 = pdfDoc.getPages()[0];
  const p2 = pdfDoc.getPages()[1];

  const draw = (page, text, xs, ys, size, bold) => {
    page.drawText(String(text || ''), {
      x: cx(xs) + 1,
      y: cy(ys) + 1,
      font: bold ? fontB : font,
      size: size || sz,
      color: black,
    });
  };

  // ============================================================
  // PÁGINA 1 — Campos do formulário
  // Posições stream → convertidas via CTM
  // ============================================================

  // Nome (y_stream=258.56, campo F3 em x_stream=148.48)
  draw(p1, dados.nome_cliente, 150, 258.56);

  // Endereço (y_stream=286.24, campo F3 em x_stream=176.96)
  draw(p1, dados.endereco_rua + ', ' + dados.endereco_numero, 178, 286.24);

  // Bairro (y_stream=313.76, F3 em x_stream=380.16)
  draw(p1, dados.bairro, 382, 313.76);

  // CEP (y_stream=313.76, F3 em x_stream=599.84)
  draw(p1, dados.cep, 601, 313.76);

  // Município (y_stream=341.44, F3 em x_stream=178.72)
  draw(p1, dados.municipio, 180, 341.44);

  // Estado (y_stream=341.44, F3 em x_stream=525.76)
  draw(p1, dados.estado, 527, 341.44);

  // Telefone: não preencher (conforme instrução)

  // Placa (y_stream=368.80, primeiro campo da linha — x_stream=235)
  draw(p1, dados.placa, 235, 368.80);

  // AIT (y_stream=368.80, segundo campo da linha — x_stream=549)
  draw(p1, dados.numero_ait, 549, 368.80);

  // Nº do documento de Identificação / CNH (y_stream=396.80, logo após label)
  draw(p1, dados.numero_habilitacao, 135, 396.80);

  // CPF (y_stream=424.32 — movido para início da linha)
  draw(p1, dados.cpf, 200, 424.32);

  // Corpo do ofício: "Defesa Prévia em Anexo" após "Exmº. Sr. Superintendente da AMC"
  // y_stream=454.08 = linha do "Exmº", corpo fica logo abaixo em y≈468
  draw(p1, 'Defesa Prévia em Anexo', 115, 468.00);

  // ============================================================
  // PÁGINA 2 — Data e assinatura
  // Stream 48, date line y_stream=732
  // F3 em x=392.16 / F4 em x=476.96 / F3 em x=682.56
  // ============================================================

  // Data: "Fortaleza, ___ de _____________ de 20___"
  // Dia: x_stream≈392, Mês: x_stream≈477, Ano: x_stream≈683
  draw(p2, dados.dia_assinatura  || '12',    393, 732.00);
  draw(p2, dados.mes_assinatura  || 'março', 478, 732.00);
  draw(p2, dados.ano_assinatura  || '2026',  684, 732.00);

  // Assinante — área de assinatura (y_stream ≈ 795–818)
  draw(p2, dados.nome_advogado,  115, 795.20);
  draw(p2, 'Advogado',           115, 818.56);
  draw(p2, dados.oab_advogado,   115, 840.00);

  // ============================================================
  const pdfOut = await pdfDoc.save();
  fs.writeFileSync(outputPath, pdfOut);

  console.log(`✅ Formulário preenchido: ${outputPath}`);
  console.log(`   Cliente: ${dados.nome_cliente}`);
  console.log(`   AIT: ${dados.numero_ait} | Placa: ${dados.placa}`);
}

const dadosPath = process.argv[2];
const outputPath = process.argv[3] || 'formulario_preenchido.pdf';
if (!dadosPath) { console.error('Uso: node preencher-formulario-amc.js dados.json saida.pdf'); process.exit(1); }

preencherFormulario(dadosPath, outputPath).catch(e => { console.error('Erro:', e.message); process.exit(1); });
