/**
 * GERADOR DE DEFESA PRÉVIA — Art. 165-A CTB (Recusa ao Bafômetro)
 * H.A. Advocacia Especializada em Trânsito
 *
 * USO:
 *   node gerar-defesa.js dados-cliente.json
 *   node gerar-defesa.js dados-cliente.json output-nome.docx
 *
 * CAMPOS OBRIGATÓRIOS NO JSON:
 *   - nome_cliente, cpf, rg, tipo_doc, numero_habilitacao
 *   - placa, marca_modelo, renavam
 *   - endereco_rua, endereco_numero, cidade_cliente
 *   - numero_ait, data_infracao, hora_infracao, local_infracao
 *   - orgao_nome, orgao_sigla, orgao_estado
 *   - cidade_assinatura, data_assinatura
 *
 * CAMPOS OPCIONAIS (etilômetro — tese 2):
 *   - marca_etilometro, modelo_etilometro, serie_etilometro
 */

const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');

// ── Argumentos ────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('❌ Uso: node gerar-defesa.js dados-cliente.json [output.docx]');
  process.exit(1);
}

const inputJson = args[0];
const outputFile = args[1] || `defesa_previa_${Date.now()}.docx`;
const templatePath = path.join(__dirname, 'template_defesa_previa_165a_v2.docx');

// ── Carregar dados ─────────────────────────────────────────────────────────────
let dados;
try {
  dados = JSON.parse(fs.readFileSync(inputJson, 'utf8'));
} catch (e) {
  console.error('❌ Erro ao ler JSON:', e.message);
  process.exit(1);
}

// ── Validação de campos obrigatórios ──────────────────────────────────────────
const obrigatorios = [
  'nome_cliente', 'cpf', 'rg', 'tipo_doc', 'numero_habilitacao',
  'placa', 'marca_modelo',
  'numero_ait', 'data_infracao', 'hora_infracao', 'local_infracao',
  'orgao_nome', 'orgao_sigla', 'orgao_estado',
  'cidade_assinatura', 'data_assinatura',
  'nome_advogado', 'oab_advogado'
];

const faltando = obrigatorios.filter(k => !dados[k]);
if (faltando.length > 0) {
  console.error('❌ Campos obrigatórios faltando:', faltando.join(', '));
  process.exit(1);
}

// ── Defaults para campos opcionais ────────────────────────────────────────────
dados.nacionalidade = dados.nacionalidade || 'brasileiro';
dados.estado_civil  = dados.estado_civil  || 'solteiro';
dados.marca_etilometro  = dados.marca_etilometro  || '[MARCA NÃO INFORMADA]';
dados.modelo_etilometro = dados.modelo_etilometro || '[MODELO NÃO INFORMADO]';
dados.serie_etilometro  = dados.serie_etilometro  || '[SÉRIE NÃO INFORMADA]';
dados.endereco_rua    = dados.endereco_rua    || dados.endereco_completo || '[ENDEREÇO]';
dados.endereco_numero = dados.endereco_numero || '';
dados.cidade_cliente  = dados.cidade_cliente  || dados.cidade_assinatura || 'Fortaleza-CE';

// ── Gerar documento ───────────────────────────────────────────────────────────
try {
  const templateContent = fs.readFileSync(templatePath, 'binary');
  const zip = new PizZip(templateContent);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    // Não lança erro para tags não encontradas — substitui por string vazia
    nullGetter: () => '',
  });

  doc.render(dados);

  const buf = doc.getZip().generate({
    type: 'nodebuffer',
    compression: 'DEFLATE',
  });

  fs.writeFileSync(outputFile, buf);
  console.log(`✅ Defesa prévia gerada: ${outputFile}`);
  console.log(`   Cliente: ${dados.nome_cliente}`);
  console.log(`   AIT: ${dados.numero_ait}`);
  console.log(`   Placa: ${dados.placa}`);

} catch (err) {
  if (err.properties && err.properties.errors) {
    console.error('❌ Erros no template:');
    err.properties.errors.forEach(e => console.error(' -', e.message));
  } else {
    console.error('❌ Erro:', err.message);
  }
  process.exit(1);
}
