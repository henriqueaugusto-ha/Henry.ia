# Grupo Comercial — Regras e Contexto Específico

> Grupo Telegram: `-5146692074`
> Carregar ANTES das regras gerais quando a mensagem vier deste grupo.
> Última atualização: 18/03/2026

---

## Contexto do Grupo

Este é o grupo operacional comercial da H.A. Advocacia.
Participantes: Dr. Henrique, Lucas (Closer), Walissom (SDR) e outros da equipe comercial.

---

## Regras Específicas do Grupo Comercial

### 1. Prioridade de memória
Ao receber mensagem do grupo `-5146692074`:
1. Carregar este arquivo (`memory/comercial/grupo-comercial.md`) PRIMEIRO
2. Carregar `memory/comercial/relatorio-comercial-formato.md` (formato padrão de relatório)
3. Depois carregar memória geral (MEMORY.md, lessons.md, pending.md)

### 2. Foco exclusivo
No grupo Comercial, responder APENAS sobre:
- Leads, funil, CRM ClickUp
- Contratos, fechamentos, repescagem
- Reuniões, metas do dia
- Relatórios de suporte ao cliente
- Cobranças e inadimplentes

Assuntos de infraestrutura, N8N, ADVbox → redirecionar para sessão DM.

### 3. Formato obrigatório no grupo
- Sem tabelas (Telegram não renderiza)
- Bullets simples e escaneáveis
- Números em destaque com *asterisco*
- Máximo 5 segundos para escanear
- Emojis estratégicos (máx 2 por bloco)

### 4. Relatório comercial — padrão
Ver formato completo em `memory/comercial/relatorio-comercial-formato.md`
- Resultado do dia anterior primeiro
- Metas do dia em seguida
- Atualização de hoje (leads, reuniões)
- Foco do dia no final

### 5. Meta diária atual (18/03/2026)
- 3 contratos novos/dia
- 1 repescagem/dia (base meses anteriores — R$1.900–R$2.000)
- 5 reuniões/dia (1 consultor) | 10/dia (2 consultores)
- R$2.000/dia cobrança inadimplentes

---

## Regras Obsoletas — ARQUIVO LIXO

> Observações e regras que foram substituídas ou não se aplicam mais.
> Mantidas aqui para referência, mas NÃO devem ser seguidas.

*(Vazio por enquanto — mover aqui qualquer regra descontinuada)*

---

## ⚠️ ERROS CRÍTICOS — Semana 12-20/03 (NÃO REPETIR)

### ERRO 1 — Formato Slack errado (17/03)
- Postei relatório sem divisores ━━━, sem seções numeradas, sem emojis de setor
- Regra: seguir EXATAMENTE o formato em `memory/comercial/slack-padrao-comercial.md`
- Ler o arquivo de formato antes de qualquer relatório no Slack

### ERRO 2 — Terminologia errada: "desconto" em vez de "repescagem" (17/03)
- "Repescagem" = cliente anterior que voltou a negociar. NUNCA chamar de desconto.
- Repescagem tem ticket próprio (R$1.900–R$2.000) — não é redução de preço

### ERRO 3 — Token ClickUp inválido usado em consultas (17/03)
- Token antigo `pk_60972410_2NEHDF941LOLSWCO14C4Q0L5MRMBEOYL` estava sendo usado
- Token correto: `pk_60972410_18YZ08VGC8Q1W14SYJ7XYRJ20VH1RZ4W`
- Buscar sempre do 1Password — nunca hardcoded

### ERRO 4 — Slack botToken no lugar errado (17/03)
- Slack botToken está no `openclaw.json` — NÃO no 1Password
- Não buscar no 1Password para autenticação do Slack

### ERRO 5 — Valor de contrato errado no Asaas (18/03)
- Caso Francisco: usei rascunho do contrato (R$1.099 entrada) em vez do Slack Comercial (R$1.199)
- **Regra permanente:** Slack Comercial > rascunho para valores financeiros. Sempre confirmar no Slack antes de cadastrar no Asaas.

### ERRO 6 — Contagem de leads com fonte errada (18/03)
- Apresentei 33 leads via execuções N8N — correto eram 28 (CRM)
- F1 executa múltiplas vezes por contato (duplicatas, reenvios)
- **Regra permanente:** fonte de leads = ClickUp CRM, campo "Data de Entrada" (`dff8ca4a-8cbb-468f-92de-064ca8a950d3`)
- NUNCA usar contagem de execuções N8N como dado de negócio

### ERRO 7 — Postagem não autorizada no Slack Comercial (17/03)
- Postei áudio pessoal no canal Comercial (toda equipe viu)
- **Regra absoluta:** NUNCA enviar mensagem para canal sem destino confirmado explicitamente
- Slack Comercial = somente leitura para Henry, sem exceção

---

## Regras de Terminologia

| ❌ Errado | ✅ Correto |
|---|---|
| Desconto | Repescagem |
| Q1 | T1 |
| Pipeline | Funil |

---

## IDs Críticos CRM 2026

- Lista Janeiro: `901112824742`
- Lista Fevereiro: `901113201405`
- Lista Março: `901113249319`
- Campo Data de Entrada: `dff8ca4a-8cbb-468f-92de-064ca8a950d3`

---

## Histórico de Atualizações

| Data | Mudança |
|------|---------|
| 18/03/2026 | Arquivo criado — regras iniciais do grupo Comercial |
| 20/03/2026 | Adicionados erros críticos da semana 12-20/03 + IDs CRM + terminologia |
