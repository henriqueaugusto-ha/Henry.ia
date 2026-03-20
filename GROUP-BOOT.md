# GROUP-BOOT.md — Contexto por Grupo de Telegram
> Leia ao iniciar qualquer sessão em grupo. Identificar o grupo → carregar arquivo correspondente → só então responder.
> Última atualização: 20/03/2026

---

## ⚠️ REGRA OBRIGATÓRIA — Início de qualquer sessão em grupo

Antes de responder qualquer mensagem em grupo:
1. Identificar em qual grupo está (pelo chat_id ou nome do grupo)
2. Carregar o arquivo de memória correspondente abaixo
3. Só então processar e responder

Ignorar esta regra = começar sem contexto = repetir erros da semana 12-20/03/2026.

---

## 📋 Mapeamento de Grupos

### 💼 Grupo COMERCIAL
- **Chat ID:** -5146692074
- **Arquivo obrigatório:** `memory/comercial/grupo-comercial.md`
- **Resumo rápido:**
  - Fonte de leads = CRM ClickUp (não N8N executions)
  - Campo correto: Data de Entrada (`dff8ca4a-8cbb-468f-92de-064ca8a950d3`)
  - Slack Comercial > rascunho para valores financeiros
  - Terminologia: "repescagem" ≠ "desconto"
  - Formato Slack: divisores ━━━, emojis de setor, seções numeradas
  - Meta março 2026: R$160k

### ⚖️ Grupo JURÍDICO
- **Chat ID:** -5001797443
- **Arquivo obrigatório:** `memory/juridico/clickup-estrutura.md`
- **Resumo rápido:**
  - Central do Cliente: tarefa principal = ação judicial, subtarefa = AIT
  - Múltiplos AITs = múltiplas subtarefas separadas
  - Extração de PDF → ferramenta `pdf` nativa primeiro
  - Pipeline: ADVbox F14+F15+F16 antes de Asaas
  - MF02 = texto com labels (CPF: / Valor Total: / Vencimento:) — nunca JSON
  - Asaas = somente após "CONFIRMO A EXECUÇÃO"
  - Orgãos: DETRAN-CE=14204088, PRF-CE=14204089, AMC=14204092

### ⚙️ Grupo AUTOMAÇÕES
- **Chat ID:** -5138173805
- **Arquivo obrigatório:** `memory/automacoes/automacao.json` + `memory/automacoes/PROTOCOLS.md`
- **Resumo rápido:**
  - fetch() e $helpers.httpRequest() NÃO funcionam em Code nodes N8N Community
  - Usar: `this.helpers.httpRequest()` ou HTTP Request node dedicado
  - $input sempre referencia nó anterior imediato (usar `$('Nome Nó').first()` para nó específico)
  - $input.first() em múltiplos itens = colapsa tudo (verificar cardinalidade)
  - Inserir nó intermediário = re-verificar TODOS os nós downstream
  - Emoji em JSON interpolado quebra Slack webhook
  - Commit incremental a cada bloco de trabalho significativo

### 🎯 Grupo GESTÃO & ESTRATÉGIA
- **Chat ID:** -5240379406
- **Arquivo obrigatório:** `memory/gestao/plano-marco-2026.md` + `memory/gestao/decisions.md`
- **Resumo rápido:**
  - Meta T1: R$300k (Jan R$80k + Fev R$60k + Mar R$160k)
  - Produto prioritário: ANPP (R$4-5k)
  - Matriz GUT ativa — priorizar por G×U×T
  - Todo caso delicado sai da reunião com responsável explícito + prazo
  - Fonte de verdade para negócio: ClickUp CRM

### 🏠 Grupo VIDA PESSOAL
- **Chat ID:** -5145538226
- **Resumo rápido:**
  - Assuntos pessoais/familiares: perguntar antes de aprofundar
  - Semana Santa: decisão Noronha vs RJ pendente (verificar a partir de 22/03)
  - Tom: mais leve que DM, mas ainda direto e sem bajulação

### 💰 Grupo SETOR FINANCEIRO
- **Chat ID:** -5220749274
- **Arquivo obrigatório:** `memory/financeiro/grupo-financeiro.md` ← **CRIAR** (ainda não existe)
- **Resumo rápido:**
  - Contexto: cobrança, fluxo financeiro, Asaas, contratos e pagamentos
  - Asaas: GET autônomo | POST/PUT/DELETE = "CONFIRMO A EXECUÇÃO" obrigatório
  - Forma de pagamento padrão: PIX — nunca boleto
  - Valores: sempre confirmar no Slack Comercial antes de cadastrar no Asaas
  - MF02 = texto plano com labels (nunca JSON)
  - Pipeline Asaas (`OwXrNkgiCqRykq7O`) com token hardcoded desatualizado — aguarda correção Dr. Henrique
  - 497 cobranças vencidas (~R$473k) — análise aguarda autorização
  - ⚠️ Protocolo de reestruturação de memória iniciado em 20/03 — aguarda Passo 2 (confirmação Dr. Henrique)

---

## 🕐 Horário — REGRA PERMANENTE

TODA referência de horário usa **BRT (UTC-3 / Fortaleza / São Paulo)**.
- Nunca mencionar UTC ao Dr. Henrique
- Conversão: horário UTC - 3h = BRT
- Janela de silêncio: 23h00 BRT a 07h00 BRT (não enviar alertas)
- Fins de semana: só críticos (GUT ≥ 75, sistema caído, OAuth vencido)

---

## 🔑 Regras Universais (todos os grupos)

- Nunca enviar mensagem para canal/contato sem destino confirmado explicitamente
- Crons e sessões automáticas NUNCA postam em Slack/WhatsApp — resultado só via Telegram ao Dr. Henrique
- Verificação de acesso = somente leitura (não postar "teste")
- Analisa → Propõe → Confirma → Executa (nunca pular etapas)
- Antes de qualquer correção: apresentar O QUE muda e O QUE PODE ser afetado
- Asaas: GET = autônomo | POST/PUT/DELETE = exige "CONFIRMO A EXECUÇÃO"
- NUNCA editar openclaw.json diretamente
