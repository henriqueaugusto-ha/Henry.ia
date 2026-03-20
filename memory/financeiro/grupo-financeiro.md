# grupo-financeiro.md — Setor Financeiro
> Chat ID: -5220749274 | Criado: 20/03/2026
> Contexto: cobrança, fluxo financeiro, Asaas, contratos, pagamentos

---

## 🚨 CARREGAR ESTE ARQUIVO PRIMEIRO ao abrir sessão neste grupo

---

## ⚙️ REGRAS OPERACIONAIS — ASAAS

- **GET** (consultar, extrato, clientes, cobranças): autônomo ✅
- **POST / PUT / DELETE / estorno**: exige frase exata **"CONFIRMO A EXECUÇÃO"** — nenhuma outra aceita
- "sim", "ok", "pode fazer" = insuficiente → responder: *"Preciso da confirmação: CONFIRMO A EXECUÇÃO"*
- Violação = FALHA CRÍTICA → registrar em `memory/lessons.md` imediatamente
- Credencial: 1Password "Asaas Pagamentos" (UUID: `nr3hshfgglth6qd3yo3ddayuxa`)
- Forma de pagamento padrão: **sempre PIX** — nunca boleto (mesmo que contrato diga cartão)
- Antes de qualquer cadastro financeiro: confirmar valor no Slack Comercial (fonte dos valores finais)

---

## ⚙️ REGRAS OPERACIONAIS — CLICKUP/CRM (contexto financeiro)

- Campo correto para leads por data: **Data de Entrada** (ID: `dff8ca4a-8cbb-468f-92de-064ca8a950d3`)
- MF02 no ClickUp = texto plano com labels — **NUNCA JSON**
  - Formato: `CPF: 000.000.000-00\nValor Total: R$X.XXX\nVencimento: DD/MM/YYYY`
  - Motivo: pipeline Asaas (`OwXrNkgiCqRykq7O`) usa regex para leitura
- Token atual: `pk_60972410_18YZ08VGC8Q1W14SYJ7XYRJ20VH1RZ4W`

---

## ⚙️ REGRAS OPERACIONAIS — PIPELINE ASAAS N8N

- Workflow: `OwXrNkgiCqRykq7O`
- ⚠️ **Token ClickUp hardcoded desatualizado** nos nós:
  - "MF01 | Identificar Contrato Correto"
  - "MF01 | Extrair Dados do Contrato"
- Token antigo hardcoded: `pk_60972410_2NEHDF941LOLSWCO14C4Q0L5MRMBEOYL`
- **Pipeline quebrado** para todos os clientes até Dr. Henrique corrigir no painel N8N
- Workaround: cadastro direto via API Asaas v3 com token do 1Password

---

## 📋 CLIENTES COM PENDÊNCIA FINANCEIRA (atualizado 20/03/2026)

| Cliente | Task CU | Situação | Valor | Aguardando |
|---|---|---|---|---|
| ADAILDO | 868hwkm07 | 🔴 1ª parcela VENCIDA 16/03 | 3x R$1.299 | "CONFIRMO A EXECUÇÃO" |
| MARCIO LINO | 868hwjwbj | 🔴 Parcela 17/03 VENCIDA | R$1k/R$1k/R$500 | "CONFIRMO A EXECUÇÃO" |
| NAIRTON | 868hwt0tm | 🟡 Aguarda decisão plano | À vista R$2.499 ou 3x R$1.099 | Decisão + "CONFIRMO A EXECUÇÃO" |

---

## 📊 CONTEXTO FINANCEIRO GERAL

- **497 cobranças vencidas** no Asaas (~R$473k em aberto)
- Potencial de recuperação: ~R$95k com 20% de retorno
- Análise detalhada aguarda autorização do Dr. Henrique
- Meta março 2026: R$160k | Já recebido até 16/03: R$42.897

---

## ⚠️ PROTOCOLO ATIVO — REESTRUTURAÇÃO DE MEMÓRIA (20/03/2026)

Dr. Henrique iniciou protocolo de 4 passos neste grupo:
- **Passo 1:** executado ✅ (estado atual da memória apresentado)
- **Passo 2:** aguardando confirmação do Dr. Henrique ⏳
- **Passo 3:** reestruturação MEMORY.md (aguarda Passo 2)
- **Passo 4:** protocolo permanente de boot (aguarda Passo 2)

Ao retomar: verificar se Dr. Henrique confirmou o Passo 1 antes de avançar.

---

## 🔑 CREDENCIAIS FINANCEIRO

| Sistema | 1Password Item | UUID |
|---|---|---|
| Asaas | "Asaas Pagamentos" | `nr3hshfgglth6qd3yo3ddayuxa` |
| ClickUp API | "ClickUp API Token" → campo `password` | `mth7e2mb6nkrsk2bbty3e4iuli` |

---

## 📝 REGRAS DE VALIDAÇÃO ANTES DE CADASTRAR NO ASAAS

1. Confirmar valor no **Slack Comercial** (não usar comprovante de Walisom como fonte única)
2. Verificar se MF02 no ClickUp está em formato texto com labels
3. Aguardar "CONFIRMO A EXECUÇÃO" do Dr. Henrique
4. Usar **PIX** como forma de pagamento
5. Registrar confirmação e dados da cobrança em pending.md após execução

---

*Última atualização: 20/03/2026 (sessão 4)*
