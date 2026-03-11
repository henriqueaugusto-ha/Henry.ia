# DOCXTEMPLATER — Guia Completo para Contratos e Procurações H.A. Advocacia

**Registrado:** 03/03/2026 11h15  
**Contexto:** Dr. Henrique quer padronizar contratos + procurações via workflow automatizado  
**Problema atual:** WF-CONTRACT não vingou porque sai fora do padrão do escritório

---

## O QUE É DOCXTEMPLATER

**Não é site. Não é cadastro online.**

É uma **biblioteca JavaScript** que você instala no servidor N8N. Funciona 100% local. Zero dependência externa.

**O que faz:**
- Abre arquivo Word (.docx)
- Substitui placeholders `{nome}` por dados reais
- Salva novo arquivo
- **Preserva 100% da formatação original**

**Documentação oficial:** https://docxtemplater.com/

---

## COMO CRIAR O MODELO WORD PADRÃO

### Passo 1 — Criar Contrato Perfeito no Word

Abra o Microsoft Word no computador. Crie o contrato **exatamente como você quer que saia sempre:**

**Cabeçalho:**
```
[LOGO H.A. ADVOCACIA]
CONTRATO DE PRESTAÇÃO DE SERVIÇOS JURÍDICOS
Nº {numero_contrato}
```

**Corpo do contrato (exemplo):**
```
CONTRATO DE PRESTAÇÃO DE SERVIÇOS JURÍDICOS

Pelo presente instrumento particular, de um lado:

CONTRATANTE: {nome_cliente}, brasileiro(a), {estado_civil}, {profissao}, 
portador(a) do CPF nº {cpf} e RG nº {rg}, residente e domiciliado(a) à 
{endereco_completo}, CEP {cep}, {cidade}/{estado}.

E de outro lado:

CONTRATADA: H.A. ADVOCACIA ESPECIALIZADA EM TRÂNSITO, inscrita no CNPJ 
sob o nº XX.XXX.XXX/0001-XX, com sede à [endereço do escritório], 
representada neste ato pelo Dr. Henrique Augusto Felix Linhares, 
inscrito na OAB/CE sob o nº XXXXX.

CLÁUSULA PRIMEIRA – DO OBJETO
A CONTRATADA prestará serviços jurídicos relativos a: {tipo_servico}

Auto de Infração nº: {auto_infracao}
CNH nº: {numero_cnh}
Órgão Autuador: {orgao_autuador}

CLÁUSULA SEGUNDA – DO VALOR E FORMA DE PAGAMENTO
O valor total dos serviços é de R$ {valor_contrato} ({valor_extenso}), 
a ser pago da seguinte forma: {forma_pagamento}.

[... demais cláusulas padrão ...]

Data: {data_assinatura}

____________________________          ____________________________
     CONTRATANTE                           CONTRATADA
   {nome_cliente}                  Dr. Henrique Augusto F. Linhares
                                          OAB/CE XXXXX
```

**Rodapé:**
```
H.A. Advocacia Especializada em Trânsito
[endereço] | [telefone] | [email] | [site]
OAB/CE XXXXX
```

**Formatação:**
- Fonte: Arial 12pt
- Espaçamento: 1,5 linhas
- Margens: 2,5cm superior/inferior, 3cm esquerda/direita
- Cabeçalho: logo centralizado, fonte Arial 14pt negrito
- Rodapé: fonte Arial 10pt cinza
- Cláusulas: negrito, caixa alta
- Parágrafos: justificado

**Salvar como:** `contrato-padrao.docx`

---

### Passo 2 — Criar Procuração Padrão

Mesmo processo. Abra Word, crie procuração perfeita:

```
[LOGO H.A. ADVOCACIA]
PROCURAÇÃO

OUTORGANTE: {nome_cliente}, brasileiro(a), {estado_civil}, {profissao}, 
portador(a) do CPF nº {cpf} e RG nº {rg}, residente e domiciliado(a) à 
{endereco_completo}.

OUTORGADO: Dr. Henrique Augusto Felix Linhares, brasileiro, advogado, 
inscrito na OAB/CE sob o nº XXXXX, com escritório à [endereço].

PODERES: Para representar o OUTORGANTE perante {orgao_competente} 
no processo/procedimento administrativo nº {numero_processo}, podendo:

• Apresentar defesas, recursos e petições
• Requerer, alegar e produzir provas
• Interpor recursos em todas as instâncias
• [... demais poderes ...]

Data: {data_assinatura}

____________________________
      OUTORGANTE
    {nome_cliente}
     CPF: {cpf}
```

**Salvar como:** `procuracao-padrao.docx`

---

## PLACEHOLDERS COMPLETOS

### Dados do Cliente
```
{nome_cliente}
{cpf}
{rg}
{orgao_expedidor}
{endereco_completo}
{endereco_rua}
{endereco_numero}
{endereco_complemento}
{endereco_bairro}
{cidade}
{estado}
{cep}
{telefone}
{email}
{profissao}
{estado_civil}
{nacionalidade}
```

### Dados do Contrato
```
{numero_contrato}
{data_assinatura}
{data_assinatura_extenso}
{tipo_servico}
{descricao_servico}
{valor_contrato}
{valor_extenso}
{forma_pagamento}
{numero_parcelas}
{valor_parcela}
{data_vencimento}
```

### Dados do Processo
```
{auto_infracao}
{numero_processo}
{numero_cnh}
{categoria_cnh}
{orgao_autuador}
{orgao_competente}
{tipo_infracao}
{data_infracao}
{local_infracao}
{pontuacao}
{valor_multa}
```

---

## INSTALAÇÃO NO SERVIDOR N8N

### Passo 1 — Acessar VPS via SSH
```bash
ssh root@72.60.49.222
```

### Passo 2 — Entrar no container N8N
```bash
docker exec -it n8n /bin/sh
```

### Passo 3 — Instalar Docxtemplater
```bash
npm install docxtemplater pizzip
```

### Passo 4 — Criar pasta de modelos
```bash
mkdir -p /data/modelos
```

### Passo 5 — Upload dos modelos Word
Via SCP do computador local:
```bash
scp contrato-padrao.docx root@72.60.49.222:/caminho/modelos/
scp procuracao-padrao.docx root@72.60.49.222:/caminho/modelos/
```

---

## SCRIPT NODE.JS PARA N8N

Crie arquivo `/data/scripts/gerar-documento.js`:

```javascript
const Docxtemplater = require('docxtemplater');
const PizZip = require('pizzip');
const fs = require('fs');
const path = require('path');

/**
 * Gera documento Word a partir de template + dados
 * @param {string} templatePath - Caminho do modelo .docx
 * @param {object} data - Dados para preencher placeholders
 * @param {string} outputPath - Caminho de saída do documento gerado
 */
function gerarDocumento(templatePath, data, outputPath) {
  try {
    // Ler template
    const content = fs.readFileSync(templatePath, 'binary');
    
    // Criar instância PizZip
    const zip = new PizZip(content);
    
    // Criar instância Docxtemplater
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });
    
    // Preencher dados
    doc.render(data);
    
    // Gerar buffer do documento
    const buf = doc.getZip().generate({
      type: 'nodebuffer',
      compression: 'DEFLATE',
    });
    
    // Salvar arquivo
    fs.writeFileSync(outputPath, buf);
    
    console.log(`✅ Documento gerado: ${outputPath}`);
    return outputPath;
    
  } catch (error) {
    console.error('❌ Erro ao gerar documento:', error);
    throw error;
  }
}

// Exportar função
module.exports = { gerarDocumento };

// Se executado diretamente (teste)
if (require.main === module) {
  const dadosTeste = {
    nome_cliente: 'JOÃO DA SILVA SANTOS',
    cpf: '123.456.789-00',
    rg: '1234567',
    endereco_completo: 'Rua Exemplo, 123, Bairro Centro, Fortaleza/CE, CEP 60000-000',
    profissao: 'Empresário',
    estado_civil: 'Casado',
    tipo_servico: 'Defesa Prévia - Recusa ao Teste do Bafômetro',
    auto_infracao: '123456789',
    numero_cnh: '987654321',
    valor_contrato: '1.500,00',
    valor_extenso: 'mil e quinhentos reais',
    forma_pagamento: 'PIX',
    data_assinatura: '03/03/2026',
  };
  
  gerarDocumento(
    '/data/modelos/contrato-padrao.docx',
    dadosTeste,
    '/tmp/contrato-teste.docx'
  );
}
```

---

## INTEGRAÇÃO NO WORKFLOW N8N

### Node 1 — Webhook (entrada de dados do ClickUp)
Recebe dados do contrato criado no ClickUp.

### Node 2 — Processar Dados
Formata dados para estrutura esperada pelo script:
```json
{
  "nome_cliente": "{{ $json.nome }}",
  "cpf": "{{ $json.cpf }}",
  "rg": "{{ $json.rg }}",
  "endereco_completo": "{{ $json.endereco }}",
  "profissao": "{{ $json.profissao }}",
  "estado_civil": "{{ $json.estado_civil }}",
  "tipo_servico": "{{ $json.tipo_servico }}",
  "auto_infracao": "{{ $json.auto_infracao }}",
  "numero_cnh": "{{ $json.numero_cnh }}",
  "valor_contrato": "{{ $json.valor }}",
  "valor_extenso": "{{ $json.valor_extenso }}",
  "forma_pagamento": "{{ $json.forma_pagamento }}",
  "data_assinatura": "{{ $now().format('DD/MM/YYYY') }}"
}
```

### Node 3 — Execute Command (gerar contrato)
```javascript
const { gerarDocumento } = require('/data/scripts/gerar-documento.js');

const dados = $input.first().json;
const outputPath = `/tmp/contrato-${dados.nome_cliente.replace(/\s/g, '-')}-${Date.now()}.docx`;

gerarDocumento(
  '/data/modelos/contrato-padrao.docx',
  dados,
  outputPath
);

return [{ json: { path: outputPath } }];
```

### Node 4 — Execute Command (gerar procuração)
```javascript
const { gerarDocumento } = require('/data/scripts/gerar-documento.js');

const dados = $input.first().json;
const outputPath = `/tmp/procuracao-${dados.nome_cliente.replace(/\s/g, '-')}-${Date.now()}.docx`;

gerarDocumento(
  '/data/modelos/procuracao-padrao.docx',
  dados,
  outputPath
);

return [{ json: { path: outputPath } }];
```

### Node 5 — Upload ZapSign
Envia documentos gerados para ZapSign via API.

### Node 6 — Atualizar ClickUp
Salva URLs dos documentos no campo "PDF Master URL".

### Node 7 — Notificar Slack
Avisa que contrato + procuração foram gerados e enviados para assinatura.

---

## VANTAGENS PARA H.A. ADVOCACIA

### ✅ Padrão Absoluto
- Todos os contratos idênticos visualmente
- Logo, cabeçalho, rodapé sempre corretos
- Fonte, espaçamento, margens uniformes
- Zero variação entre documentos

### ✅ Zero Trabalho Manual
- Equipe não formata mais nada
- Sistema preenche automático
- Revisão só do conteúdo, não da formatação

### ✅ Velocidade
- Gera contrato + procuração em < 5 segundos
- Direto para ZapSign
- Cliente recebe link de assinatura automático

### ✅ Escala
- 1 pessoa revisa 10x mais contratos
- Não depende de habilidade Word da equipe
- Processo padronizado, auditável

### ✅ Resolve Gargalo Identificado
- WF-CONTRACT não vingou por formatação fora do padrão
- Com Docxtemplater: padrão 100% garantido
- Workflow volta a funcionar perfeitamente

---

## PRÓXIMOS PASSOS (IMPLEMENTAÇÃO)

### Fase 1 — Preparação (2h)
1. Dr. Henrique cria modelo Word perfeito (contrato + procuração)
2. Envia modelos para Henry
3. Henry instala Docxtemplater no N8N
4. Henry faz upload dos modelos para `/data/modelos/`

### Fase 2 — Script (1h)
1. Henry cria script `gerar-documento.js`
2. Testa com dados fictícios
3. Valida formatação preservada

### Fase 3 — Workflow N8N (3h)
1. Criar novo workflow `WF-CONTRATO-V2`
2. Integrar com ClickUp (entrada de dados)
3. Chamar script Docxtemplater (contrato + procuração)
4. Upload automático para ZapSign
5. Atualizar ClickUp com URLs
6. Notificar Slack

### Fase 4 — Testes (2h)
1. Testar com 3 contratos reais
2. Validar formatação, dados, assinatura
3. Ajustes finais

### Fase 5 — Produção (1h)
1. Ativar workflow
2. Documentar procedimento
3. Treinar equipe (se necessário)

**Tempo total estimado: 9 horas (1 dia de trabalho focado)**

---

## CUSTO

**Zero.**

- Docxtemplater: open source (licença MIT)
- PizZip: open source
- N8N: já instalado
- VPS: já disponível
- Modelos Word: criados internamente

**Não precisa de:**
- Microsoft 365 pago
- Google Workspace pago
- Assinatura de serviço externo
- API de terceiros

---

## MANUTENÇÃO

### Atualizar Modelo
1. Abrir `contrato-padrao.docx` no Word
2. Fazer alterações desejadas (nova cláusula, ajuste visual)
3. Salvar
4. Fazer upload para VPS (substitui arquivo antigo)
5. Próximos contratos já saem com novo padrão

**Zero código. Zero redeployment. Zero downtime.**

---

## EXEMPLO REAL — FLUXO COMPLETO

**1. Cliente fecha contrato (ClickUp)**
- Nome: Maria Silva Santos
- CPF: 123.456.789-00
- Serviço: Defesa Prévia - Recusa Bafômetro
- Valor: R$ 1.200,00
- Pagamento: PIX

**2. Webhook dispara workflow N8N**

**3. Script gera contrato + procuração**
- Abre `contrato-padrao.docx`
- Substitui `{nome_cliente}` → "MARIA SILVA SANTOS"
- Substitui `{cpf}` → "123.456.789-00"
- Substitui `{tipo_servico}` → "Defesa Prévia - Recusa ao Teste do Bafômetro"
- Substitui `{valor_contrato}` → "1.200,00"
- Salva `contrato-maria-silva-santos-1234567890.docx`
- Repete para procuração

**4. Upload para ZapSign**
- Contrato → signatário: Maria Silva Santos
- Procuração → signatário: Maria Silva Santos
- Link de assinatura gerado

**5. Atualiza ClickUp**
- Campo "PDF Master URL" preenchido com URLs ZapSign

**6. Notifica Slack**
- "✅ Contrato + Procuração gerados para Maria Silva Santos. Enviado para assinatura."

**7. Cliente assina via celular**
- Recebe SMS/email com link ZapSign
- Assina eletronicamente

**8. Webhook ZapSign → N8N**
- Atualiza status ClickUp → "Contrato Assinado"
- Notifica jurídico → "Cliente pronto para produção"

**Tempo total: < 1 minuto do fechamento até assinatura disponível.**

---

**Aguardando confirmação do Dr. Henrique para iniciar implementação.**
