# MEMORY.md — Henry IA
_Memória de longo prazo. Atualizada em 05/03/2026._

---

## Quem sou eu / Quem é o Dr. Henrique

- Assistente IA do **Dr. Henrique Augusto** — advogado, escritório H. A. Advocacia
- Acesso: Telegram, N8N, ClickUp, ADVbox, Google Drive, 1Password
- Vault 1Password principal: `mzeqvatyexb7yplnl6o6ajq7bu` (IA – OPERACIONAL)

---

## Projeto Principal: Automação ADVbox (iniciado ~04/03/2026)

### Objetivo
Automatizar abertura de processos de trânsito (bafômetro / AIT) via N8N:
recebe pacote de documentos → cadastra cliente → processo → organiza Drive → cria tarefa.

### Fluxo completo (F1 → F4)
```
[Recebe docs] → F1 (Cadastrar Cliente ADVbox) 
             → F2 (Cadastrar Processo ADVbox)
             → F3 (Organizar Docs Drive + ClickUp)
             → F4 (Criar Tarefa ADVbox) ← A CONSTRUIR
```

---

## Workflows N8N — IDs e Status

| WF | Nome | ID N8N | Webhook | Status |
|---|---|---|---|---|
| F1 | Cadastrar Cliente ADVbox | `imtGbPavAHjLZ6Nf` | `advbox-cadastrar-cliente` | ✅ Funcionando |
| F2 | Cadastrar Processo ADVbox | `d8LugSfOKgAP3mn6` | `advbox-cadastrar-processo` | ✅ Funcionando |
| F3 | Organizar Docs Drive + ClickUp | `IsS96sv2ISIHEyZi` | `advbox-organizar-docs` | ✅ Funcionando |
| F4 | Criar Tarefa ADVbox | — | `advbox-criar-tarefa` | ⏳ A construir |

**N8N URL**: `https://n8n.srv1380728.hstgr.cloud`
**N8N API key**: item `n8n Painel` no vault 1Password

---

## IDs críticos ADVbox

| Campo | ID | Observação |
|---|---|---|
| Henrique Augusto | 63789 | `users_id` |
| Ingrid Montenegro | 120343 | `users_id` |
| **Ingrid Priscila** | ❌ DESCONSIDERAR | Não usar — só Ingrid Montenegro |
| Origem INDICAÇÃO | 200072 | `customers_origins_id` padrão |
| Origem GOOGLE | 200070 | |
| Grupo Trânsito | 226691 | `group_id` |
| Tipo Art. 165-A Bafômetro | 577852 | `type_lawsuits_id` |
| Fase ADMINISTRATIVO | 2 | `steps_id` |
| Etapa inicial bafômetro | 2713209 | `stages_id` — "PRODUZIR CÓPIA AIT/PSDD" |

**ADVbox API base**: `https://app.softwareadvbox.com.br/api/v1`
**ADVbox API key**: item `Advbox - Dados de integração API` no vault

---

## Google Drive

| Campo | Valor |
|---|---|
| Raiz (Gmail Drive) | `1fKlJjtDGOeQ11jRX6rb4NTRQr-XxNASp` |
| Credencial N8N | `MXwK2XnNndg0AdQQ` (tipo: googleSheetsOAuth2Api — funciona para Drive também) |
| Conta autorizada | `adv.henriqueaugusto@gmail.com` |
| Estrutura | `CLIENTES/[ANO]/[MÊS]/[NOME]/[PROCESSO]/1-Docs + 2-Defesa` |

**Pastas criadas no teste Danyllo:**
- CLIENTES: `1zwB7LCohOFr4WH0givoaoIOKzOqX4fwU`
- 2026: `1zzzvwdmFnxO2GmPsNIKvpRFYPpwQjtJv`
- 3.Março: `1gDWNuWRnCFaEpgeGE-BaV6C9gE2nteK2`
- DANYLLO: `1pWkWcLxHreJGc8pEbYVF-ml_K3K9NTkS`
- PROCESSO 01 (AIT SC01166197): `1aETZdHBmZN1MSrPAgu5fHECkHJ4JBkhm`

---

## ClickUp

| Campo | Valor |
|---|---|
| Team | `9011774778` — H. A. Advocacia |
| API Token | item `mth7e2mb6nkrsk2bbty3e4iuli` no vault |
| Setor Comercial space | `90112829304` |
| CRM_2026 folder | `90117445648` |
| Lista Março 2026 | `901113249319` |
| Campo docs_url | `662278d5-214d-4ae3-a5e3-749652bfd57b` |
| Danyllo task ID | `868hq9kmu` (contrato fechado) |

---

## F4 — Próxima construção

**O que fazer:**
- Criar tarefa no ADVbox vinculada ao processo (`lawsuits_id`)
- Responsáveis: Henrique (63789) + Ingrid Montenegro (120343) — **Ingrid Priscila FORA**
- Título: "Produzir defesa prévia de multa"
- Data: prazo N.A. − 2 dias às 08:30
- Endpoint provável: `POST /api/v1/tasks` (confirmar na documentação ADVbox)

**Dados do processo teste (Danyllo):**
- Cliente ADVbox ID: `14196480`
- Processo ADVbox ID: `13526450` (teste — verificar se deve deletar)
- N.A. prazo: 06/04/2026 → tarefa: 04/04/2026 às 08:30
- AIT: SC01166197 | Art. 165-A CTB | DETRAN-CE

---

## Lições aprendidas (técnicas)

1. **N8N Code node NÃO suporta multi-branch output** → usar IF nodes para ramificação
2. **ClickUp `include_closed=true`** necessário para buscar tasks com status fechado
3. **ClickUp API token** ≠ senha do usuário — usar item `mth7e2mb6nkrsk2bbty3e4iuli`
4. **googleSheetsOAuth2Api** credencial funciona para HTTP Request com Drive API também
5. **ADVbox campos POST vs GET divergem**: `type_lawsuits_id` (com 's') no POST, `type_lawsuit_id` no GET
6. **CPF no ADVbox**: campo `identification` (validado), não `document` (texto livre)
7. **Shared Drive Google**: requer `supportsAllDrives=true` + `corpora=drive` + `driveId`
