# MEMORY.md — Memória de Longo Prazo
> Reestruturado em 20/03/2026. Detalhes históricos → `memory/diario/`. Lições → `memory/lessons.md`.
> Critério de entrada aqui: erro repetido 2x no mesmo ponto. Detalhe técnico/código → apenas lessons.md.

---

## 🕐 HORÁRIO — REGRA PERMANENTE
TODA referência de horário usa **BRT (UTC-3 / Fortaleza / São Paulo)**. Nunca UTC nas respostas.
Conversão: hora UTC - 3 = BRT. Janela de silêncio: 23h–07h BRT. Fins de semana: só GUT ≥ 75 ou sistema caído.

---

## 🗂️ BOOT DE GRUPO — OBRIGATÓRIO AO INICIAR SESSÃO EM GRUPO
Carregar o arquivo do grupo ANTES de qualquer resposta:

| Grupo | Chat ID | Arquivo obrigatório |
|---|---|---|
| Comercial | -5146692074 | `memory/comercial/grupo-comercial.md` |
| Jurídico | -5001797443 | `memory/juridico/clickup-estrutura.md` |
| Automações | -5138173805 | `memory/automacoes/PROTOCOLS.md` |
| Gestão & Estratégia | -5240379406 | `memory/gestao/plano-marco-2026.md` |
| Vida Pessoal | -5145538226 | `memory/gestao/decisions.md` |
| Financeiro | -5220749274 | `memory/gestao/decisions.md` |

---

## ⛔ DIRETIVAS DE SEGURANÇA — REGRAS MAIS IMPORTANTES

### Níveis de Operação (universal — todas as ferramentas)
- **Nível 2** (autônomo): GET, consultar, ler, registrar em memória
- **Nível 3** (ok simples): criar tarefas ClickUp, mensagens Slack internas, rascunhos
- **Nível 4** (frase exata **"CONFIRMO A EXECUÇÃO"**): financeiro, deletar, N8N produção, ações irreversíveis
- **Nível 5** (PROIBIDO): transferir dinheiro, deletar workspaces, alterar senhas
- Em dúvida → tratar como nível 4. Regra completa: `memory/gestao/decisions.md`

### Regras Absolutas
- **NUNCA** editar `openclaw.json` diretamente (derrubou gateway 3x em 01/03)
- **NUNCA** reiniciar gateway sem autorização explícita
- **TODA** credencial → 1Password. Acesso: `/tmp/op` | Token: `.env` → `OP_SERVICE_ACCOUNT_TOKEN`
- **Slack Comercial** = somente leitura — nunca postar automaticamente
- **openclaw.json** alterações: propor → aguardar aprovação → Dr. Henrique aplica na VPS
- NUNCA desativar 3 flags controlUi simultaneamente → lockout (incidente 26/02)

---

## 🔴 REGRAS OPERACIONAIS — CLICKUP / CRM

- **Leads por data:** usar campo `Data de Entrada` (ID: `dff8ca4a-8cbb-468f-92de-064ca8a950d3`) — nunca `date_created`
- **Implementação:** iterar TODAS as páginas da lista + filtrar client-side + `include_closed=true`
- **Fonte de volume:** leads = CRM ClickUp; nunca contar execuções N8N como proxy de leads
- **Confirmar fonte:** antes de buscar número mencionado, confirmar se é CRM, Central ou outra lista
- **MF02:** sempre texto com labels (`CPF: / Valor Total: / Vencimento:`) — jamais JSON estruturado
- **Token:** ao renovar, atualizar 1Password antes de encerrar a sessão — token fora do cofre = bloqueio
- **Terminologia:** nunca "Q1" (→ T1) | nunca "pipeline" (→ funil) | nunca "desconto" (→ repescagem)
- Detalhes: `memory/lessons.md` → "Regra — Campo Correto para Contagem de Leads"

**Token atual:** `pk_60972410_18YZ08VGC8Q1W14SYJ7XYRJ20VH1RZ4W` (⚠️ 1Password UUID `mth7e2mb6nkrsk2bbty3e4iuli` desatualizado — pendente)

---

## 🔴 REGRAS OPERACIONAIS — ASAAS

- **GET** (consultar, extrato, clientes, cobranças): autônomo ✅
- **POST / PUT / DELETE / estorno:** exige frase exata **"CONFIRMO A EXECUÇÃO"** — "sim/ok" não é suficiente
- **Forma de pagamento:** sempre PIX — nunca boleto, mesmo que contrato diga "cartão"
- **Valores:** confirmar no Slack Comercial ANTES de cadastrar — rascunho do contrato ≠ valor final
- **Violação = FALHA CRÍTICA** → registrar em `memory/lessons.md` imediatamente
- Credencial: 1Password "Asaas Pagamentos" (UUID: `nr3hshfgglth6qd3yo3ddayuxa`)
- Detalhes: `memory/gestao/decisions.md` → "Asaas — Protocolo de Confirmação Dupla"

---

## 🔴 REGRAS OPERACIONAIS — N8N

- **HTTP em Code nodes:** `fetch()` e `$helpers.httpRequest()` não funcionam → usar HTTP Request node dedicado
- **`$input` referencia nó anterior imediato** — para nó específico: `$('Nome Exato do Nó').first().json.campo`
- **`$input.first()` em múltiplos itens** colapsa pipeline downstream (cardinalidade N→1 quebra tudo)
- **Inserir nó intermediário:** re-verificar TODOS os nós downstream antes de salvar
- **Lookup após filtragem:** primeiro filtrar/confirmar relevância do evento, depois buscar dados externos
- **`$env` bloqueado** em expressões — usar credenciais N8N ou HTTP Request node headers
- **PUT /api/v1/workflows:** aceita apenas `executionOrder` em `settings` — campos extras = rejeição silenciosa
- **Emoji em `{{ }}`:** interpolar com emoji/caracteres especiais corrompe JSON Slack → usar JSON Builder node
- **Paginação:** sempre verificar `nextCursor` ao listar workflows — retorna 50 por página, pode ter mais
- **Ativar/editar workflow em produção:** nível 4 — exige "CONFIRMO A EXECUÇÃO"
- **⚠️ Bug ativo:** pipeline Asaas `OwXrNkgiCqRykq7O` com token CU hardcoded desatualizado — quebrado
- URL N8N: `https://n8n.srv1380728.hstgr.cloud` | API key: 1Password "N8N API - Henry.Ia" (UUID: `vv6rbyo6rhpauyurzc3jvopqwe`)
- Detalhes: `memory/lessons.md` → "N8N Community — fetch() e $helpers.httpRequest()"

---

## 🔴 REGRAS OPERACIONAIS — ADVBOX

- **API bloqueada:** retorna 403 (Cloudflare bloqueia VPS) — acesso direto impossível
- **Estrutura Central do Cliente:** tarefa = ação judicial | subtarefa = AIT | múltiplos AITs = múltiplas subtarefas
- **Ordem obrigatória:** F14 (cadastro cliente) → F15 (processo) → F16 (tarefa) antes de qualquer outra ação
- **Credencial:** ⚠️ PENDENTE salvar no 1Password item `ADVbox - Login Web` (email: `adv.henriqueaugusto@gmail.com` | senha: `28051oabcebrasil`)
- Detalhes: `memory/juridico/clickup-estrutura.md`

---

## 🔴 REGRAS OPERACIONAIS — SLACK

- **Somente leitura** em todos os canais — nunca responder equipe sem autorização explícita do Dr. Henrique
- **Nunca postar sem destino confirmado:** propor → aguardar confirmação de canal/contato → executar
- **Crons:** ⛔ proibido postar no Slack — resultado só via `message` tool ao Telegram do Dr. Henrique
- **botToken:** está em `openclaw.json` → `channels.slack.botToken` (não no 1Password — erro repetido 2x)
- **allowFrom:** `["U04NV2X954P"]` em todos os canais — só Dr. Henrique ativa o bot
- **Formato:** `*asterisco simples*` para negrito | `**duplo**` não renderiza no Slack
- **Timestamps Slack = UTC** → sempre converter para BRT antes de exibir
- Canal Comercial: `C076WL3MY15` | Detalhes de formato: `memory/comercial/slack-padrao-comercial.md`
- Detalhes: `memory/lessons.md` → "⛔ CONSOLIDADO 17/03/2026 — Erros críticos do dia"

---

## 🔴 REGRAS OPERACIONAIS — GERAL

- **PDF:** ferramenta nativa `pdf` do OpenClaw = primeira tentativa (não última) — pdftotext/pypdf falham com fontes embutidas
- **Token ao renovar:** atualizar 1Password **antes de encerrar a sessão** — token novo fora do cofre = bloqueio
- **Credencial ambígua (UUID vs JWT):** pedir print da tela quando instrução textual falhar 2x
- **Commit:** em sessão > 1h ou após bloco significativo → commit imediato, sem esperar solicitação
- **Lição repetida em sessão subsequente:** investigar arquitetura de boot, não apenas re-registrar
- **Caso delicado em reunião:** sair com responsável explícito + prazo + próxima ação
- **OpenAI Responses API:** retorna JSON em markdown fences — strip antes de `JSON.parse()`
- **Evolution API v1.8.7:** events em lowercase+ponto (`messages.upsert`) → `event.replace(/\./g,'_').toUpperCase()`
- **ASAAS pagamento padrão:** PIX (nunca boleto — nem se contrato disser cartão)

---

## 🔑 Credenciais — Referência Rápida (1Password cofre IA – OPERACIONAL)

| Sistema | Item 1Password | UUID |
|---|---|---|
| Asaas | "Asaas Pagamentos" | `nr3hshfgglth6qd3yo3ddayuxa` |
| N8N API | "N8N API - Henry.Ia" | `vv6rbyo6rhpauyurzc3jvopqwe` |
| ZapSign | "ZapSign" → campo `password` | `mauxhgx5unbr7dzanovqzdvu2i` |
| ClickUp API | "ClickUp API Token" → `password` | `mth7e2mb6nkrsk2bbty3e4iuli` |
| API Brasil | "API Brasil - Consultas" | `pxqiqpv6s5qr3t66kzx5vkblme` |
| OpenAI | "OpenAI API Key" → `password` | — |
| ADVbox | ⚠️ PENDENTE — Dr. Henrique deve criar no 1Password | — |

- **Slack botToken:** em `openclaw.json` → `channels.slack.botToken` (não no 1Password)
- **1Password CLI:** `/tmp/op` | Token: `grep OP_SERVICE_ACCOUNT_TOKEN /home/node/.openclaw/.env | cut -d= -f2-`
- **Vault:** `mzeqvatyexb7yplnl6o6ajq7bu` (IA – OPERACIONAL)

---

## 🏗️ Infraestrutura e Sistemas

### VPS / Infraestrutura
- VPS: Hostinger Ubuntu `72.60.49.222` (srv1427194) | Docker | UFW ativo (22/80/443)
- Nginx + HTTPS: `henry.henriqueaugusto.adv.br` ✅ | Fail2ban ativo ✅ | Hardening score: 9.0/10

### N8N
- URL: `https://n8n.srv1380728.hstgr.cloud`
- ⚠️ Pipeline Asaas (`OwXrNkgiCqRykq7O`): token CU hardcoded desatualizado → Dr. Henrique corrigir no N8N UI
- ⚠️ GCLID workflows inativos → atribuição Google Ads possivelmente quebrada
- F10 (`ppws3IRJo8K6QQJd`): corrigido 20/03 ✅

### Evolution API
- Container: `evolution-api` | Imagem: `atendai/evolution-api:v1.8.7`
- Acesso OpenClaw: `http://evolution-api:8080` | API Key: `henry-evolution-2026`
- Instância: `suporte-ha` | Status: `open` ✅

### ADVbox
- API retorna 403 (Cloudflare bloqueia VPS) — sem acesso direto
- F14 usa Bearer hardcoded → ⚠️ PENDENTE: salvar credencial no 1Password

### ZapSign
- Retorna telefone do signatário diretamente (não precisa extrair do PDF)

### API Brasil (Veículos)
- Endpoint: `POST https://cluster.apigratis.com/api/v2/vehicles/dados`
- Credenciais: 1Password "API Brasil - Consultas" (DeviceToken UUID + Bearer JWT + SecretKey)
- Status: 100% operacional ✅

---

## 📊 ClickUp — IDs Críticos

- Workspace: `9011774778`
- CRM Janeiro: `901112824742` | CRM Fevereiro: `901113201405` | CRM Março: `901113249319`
- Central Janeiro: `901113203395` | Central Fevereiro: `901113203396` | Central Março: `901113203399`
- Execuções Mensais pasta: `90117567885` | Lista Março execuções: `901113249320`
- Campo *Data de Entrada*: `dff8ca4a-8cbb-468f-92de-064ca8a950d3` — usar para contagem (não date_created)
- Campo *MF02*: texto com labels — nunca JSON
- Campo *Origem* ID: `2cf330fd-8a82-4378-81de-27b83e6375d3`
- Valores Origem: 1=Google Ads | 2=Facebook | 3=Instagram | 4=Indicação | 5=Orgânico Site | 6=WhatsApp Direto | 7=Desconhecida | 8=Youtube | 9=REPESCAGEM | 10=INST-ORGÂNICO | 11=DISPARO API | 12=INSTA-TP-WAPP2
- Login: henry.ia.assistant@gmail.com | Senha: 1Password "Click-Up - Henry.IA"

---

## ⚙️ Crons Ativos (9 total — delivery via `message` tool → Telegram 7630266660)

| ID | Nome | Schedule (BRT) |
|---|---|---|
| b220a99c | Daily Briefing | 7h diário |
| 20dd0668 | Watchdog | 8h diário |
| ebc04ad3 | Heartbeat | 10h / 14h / 18h |
| cf1f1b80 | Revisão Semanal | sexta 18h |
| ea726fe8 | Security Audit | domingo 6h |
| fbf579e2 | Git Backup | 2h diário |
| c792df19 | Revisão de Decisões | 1º dia do mês 12h |

- **Fix 20/03:** todos usam `delivery.mode: "none"` + agent envia via `message` tool (comportamental — payloads já corretos)
- **Silêncio = ok** para: Watchdog, Heartbeat, Git Backup — só enviam se houver alerta
- **Entrega obrigatória** para: Daily Briefing, Revisão Semanal, Security Audit, Revisão de Decisões
- Modelos: Sonnet para todos (Haiku teve erros de model string)
- jobs.json: `/data/.openclaw/cron/jobs.json`

---

## 💬 Slack — Canais

- `C076WL3MY15` — Comercial | `C07LJA7KW1Y` — Jurídico | `C0ACVJ8NTD4` — Agenda Lara
- `C07LBN4KWT0` — CC Geral | `C08LMJLDMK9` — Suporte ao Cliente | `C09KPCB0ZM1` — Agenda Flora
- `C0AM6CY5CV8` — #suporte-monitoramento | `C0AHFESNW9X` — Alertas/Sistema
- Formato: `memory/comercial/slack-padrao-comercial.md`

---

## 🗓️ Google Agenda ICS — 4 Feeds Ativos

- ADM H.A., Henrique-Closer, Lucas-Closer, Walissom-SDR: ver `memory/comercial/google-agenda.md`
- Padrão título: `[STATUS -] NOME - TIPO - CIDADE - ESTADO - ORIGEM`

---

## 🎯 Metas e Contexto Estratégico

- **T1 2026:** Jan R$80k + Fev R$60k + Mar R$160k = R$300k
- **Meta março:** R$160k | Produto prioritário: ANPP (R$4-5k)
- **Já recebido até 16/03:** R$42.897 | Faltam ~R$117k em ~14 dias
- **Ticket médio real:** R$2.425 (trânsito core R$2.250–R$2.600)
- Detalhes completos: `memory/gestao/plano-marco-2026.md`

---

## ⚠️ Pendências Críticas (atualizado 20/03/2026)

### 🔴 Requerem Dr. Henrique
1. **ADVbox → 1Password** — salvar credencial → desbloqueia F14/onboarding automático
2. **Pipeline Asaas N8N** — workflow `OwXrNkgiCqRykq7O` → trocar token hardcoded nos 2 nós no painel N8N
3. **GCP Production Mode** — OAuth Drive expira ~25/03 → Google Cloud Console → publicar app
4. **ClickUp token 1Password** — item `mth7e2mb6nkrsk2bbty3e4iuli` → atualizar para token atual
5. **Asaas ADAILDO** — 3x R$1.299 (1ª parcela VENCIDA 16/03) → aguarda "CONFIRMO A EXECUÇÃO"
6. **Asaas MARCIO LINO** — R$1k/R$1k/R$500 (vencida 17/03) → aguarda "CONFIRMO A EXECUÇÃO"
7. **Asaas NAIRTON** — aguarda decisão plano (à vista R$2.499 ou 3x R$1.099) + "CONFIRMO A EXECUÇÃO"
8. **GABRIEL LINHARES** (868hvjr0v) — sem ADVbox/Asaas desde 12/03 → aguarda ok para F14→F15→F16

### 🟡 Pendências técnicas
9. ALAN QUESTER — deletar customer duplicado 14311233 + processo + 3 tasks PROTOCOLAR
10. DARLAN — AITs PS00202880/81 no ADVbox + Asaas pipeline
11. CRISTIANO — Asaas pipeline (prazo processo 02/04/2026)
12. NAIRTON — DETRAN-PB placeholder → corrigir para DETRAN-CE no ADVbox
13. ADAILDO — customer duplicado 14351397 → deletar no ADVbox
14. Semana Santa — Noronha vs RJ (verificar a partir de 22/03)
15. Dashboard "Objetivos Diários" ClickUp — aguarda 2 confirmações do Dr. Henrique

---

## 🔊 Áudio — Voz Padrão Onyx (OpenAI TTS)

```bash
export OP_SERVICE_ACCOUNT_TOKEN=$(grep OP_SERVICE_ACCOUNT_TOKEN /home/node/.openclaw/.env | cut -d= -f2-)
OPENAI_KEY=$(/tmp/op item get "OpenAI API Key" --vault "IA – OPERACIONAL" --fields password --reveal 2>/dev/null)
echo '{"model":"tts-1","voice":"onyx","input":"TEXTO"}' > /tmp/tts.json
curl -s -X POST https://api.openai.com/v1/audio/speech -H "Authorization: Bearer $OPENAI_KEY" \
  -H "Content-Type: application/json" -d @/tmp/tts.json --output /home/node/.openclaw/workspace/audio.mp3
```
Enviar: `message(action="send", channel="telegram", target="7630266660", media="...audio.mp3", asVoice=true)`

---

## 📋 Tratamento do Dr. Henrique

- *Profissional/empresarial:* Dr. Henrique ou Dr. Henrique Augusto
- *Vida pessoal:* Henrique — somente quando ele autorizar
- *Formatação Telegram:* sem tabelas, bullets simples, escaneável em 5s
- *Formatação Slack:* tabelas permitidas, CAPS títulos, `*asterisco*` negrito
