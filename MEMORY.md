# MEMORY.md — Memória de Longo Prazo
> Compactado em 20/03/2026. Detalhes históricos → `memory/diario/`. Lições → `memory/lessons.md`.

---

## 🔴 REGRAS OPERACIONAIS — CLICKUP / CRM
- **Busca de leads por data:** SEMPRE pelo campo `Data de Entrada` (ID: `dff8ca4a-8cbb-468f-92de-064ca8a950d3`) — NUNCA por `date_created`
- **Implementação:** iterar TODAS as páginas da lista + filtrar client-side pelo campo customizado. Incluir `include_closed=true`
- **Token atual (⚠️ temporário — remover após recuperar 1Password):** `pk_60972410_18YZ08VGC8Q1W14SYJ7XYRJ20VH1RZ4W`
- **Após recuperar 1Password:** token em "ClickUp API Token" (UUID: `mth7e2mb6nkrsk2bbty3e4iuli`) → campo `password`
- **Terminologia:** nunca "Q1" (→ T1) | nunca "pipeline" (→ funil) | nunca "desconto" (→ repescagem)
- Detalhes completos: `memory/lessons.md` → "Regra — Campo Correto para Contagem de Leads"

## 🔴 REGRAS OPERACIONAIS — ASAAS
- **GET** (consultar, extrato, clientes, cobranças): autônomo ✅
- **POST / PUT / DELETE / estorno:** exige frase exata **"CONFIRMO A EXECUÇÃO"** — nenhuma outra aceita
- "sim", "ok", "pode fazer" = insuficiente → responder: *"Preciso da confirmação: CONFIRMO A EXECUÇÃO"*
- Violação = FALHA CRÍTICA → registrar em `memory/lessons.md` imediatamente
- Credencial: 1Password "Asaas Pagamentos" (UUID: `nr3hshfgglth6qd3yo3ddayuxa`)
- Detalhes completos: `memory/gestao/decisions.md` → "Asaas — Protocolo de Confirmação Dupla"

## 🔴 REGRAS OPERACIONAIS — SLACK COMERCIAL
- **Somente leitura** em todos os canais — nunca postar automaticamente, nunca responder equipe sem autorização
- Antes de qualquer post: Dr. Henrique autorizou? Canal confirmado? Destinatário confirmado?
- Crons: ⛔ proibido postar no Slack — resultado só via Telegram para Dr. Henrique
- Nunca contar reunião em andamento como contrato. Sempre separar: Contratos | Pagamentos | Reuniões realizadas | Em andamento
- Canal Comercial: `C076WL3MY15`
- Formato obrigatório: `memory/comercial/slack-padrao-comercial.md`

## 🔴 REGRAS OPERACIONAIS — GOOGLE AGENDA
- Acesso: somente leitura via ICS (não cria/edita eventos)
- Não tem tempo real — fazer novo `web_fetch` a cada consulta
- 4 feeds: ADM H.A. | Henrique-Closer | Lucas-Closer | Walisom-SDR
- URLs completas e padrão de título dos eventos: `memory/comercial/google-agenda.md`
- Padrão título: `[STATUS -] NOME - TIPO - CIDADE - ESTADO - ORIGEM` | Status: `REALIZADA`, `FECHOU`, ou sem prefixo

## 🔴 REGRAS OPERACIONAIS — N8N
- `fetch()` não funciona em Code nodes → usar `this.helpers.httpRequest()`
- Ao inserir nó novo: re-verificar conexões downstream antes de ativar
- Workflows criados via API pós-restart não registram webhook sem novo restart no N8N
- **Nunca ativar/editar workflow em produção sem autorização** — nível 4 ("CONFIRMO A EXECUÇÃO")
- URL N8N: `https://n8n.srv1380728.hstgr.cloud` | API key: 1Password "N8N API - Henry.Ia" (UUID: `vv6rbyo6rhpauyurzc3jvopqwe`)

## 🔴 REGRAS OPERACIONAIS — ADVBOX
- **Acesso direto bloqueado:** API retorna 403 (Cloudflare bloqueia VPS) — sem chamada direta possível
- **F14 usa Bearer hardcoded** — ⚠️ PENDENTE: salvar credencial no 1Password + atualizar workflow
- **Credencial:** email `adv.henriqueaugusto@gmail.com` | senha `28051oabcebrasil` → 1Password item "ADVbox - Login Web" (cofre IA – OPERACIONAL) — **PENDENTE CRIAÇÃO**
- **Estrutura Central do Cliente:** tarefa = ação judicial | subtarefa = AIT (ação administrativa) | múltiplos AITs = múltiplas subtarefas separadas
- **Sequência obrigatória de onboarding:** F14 → F15 → F16 antes de qualquer cadastro no Asaas
- Detalhes: `memory/juridico/clickup-estrutura.md`

---

## 🕐 HORÁRIO — REGRA PERMANENTE (20/03/2026)
TODA referência de horário usa **BRT (UTC-3 / Fortaleza / São Paulo)**.
Nunca usar UTC nas respostas ao Dr. Henrique. Conversão: hora UTC - 3 = BRT.
Janela de silêncio: 23h00–07h00 BRT. Fins de semana: só GUT ≥ 75 ou sistema caído.

---

## 🗂️ BOOT DE GRUPO — OBRIGATÓRIO AO INICIAR SESSÃO EM GRUPO

Ao iniciar qualquer sessão em grupo Telegram, identificar e carregar o arquivo ANTES de responder:

| Grupo | Chat ID | Arquivo obrigatório |
|---|---|---|
| Comercial | -5146692074 | `memory/comercial/grupo-comercial.md` |
| Jurídico | -5001797443 | `memory/juridico/clickup-estrutura.md` |
| Automações | -5138173805 | `memory/automacoes/PROTOCOLS.md` |
| Gestão & Estratégia | -5240379406 | `memory/gestao/plano-marco-2026.md` |
| Vida Pessoal | -5145538226 | `memory/gestao/decisions.md` |
| Financeiro | -5220749274 | `memory/financeiro/grupo-financeiro.md` ← **CRIAR** |

**Regras rápidas por grupo:**
- *Comercial:* leads = CRM (não N8N); Slack Comercial > rascunho para valores; "repescagem" ≠ "desconto"
- *Jurídico:* pdf nativa primeiro; MF02 = texto com labels (nunca JSON); tarefa = ação judicial; subtarefa = AIT
- *Automações:* fetch() não funciona em Code nodes → `this.helpers.httpRequest()`; re-verificar downstream ao inserir nó; ADVbox API 403 (sem acesso direto); F14→F15→F16 antes do Asaas
- *Gestão:* meta março R$160k; ANPP prioritário; caso delicado → sair da reunião com responsável explícito
- *Todos:* nunca postar no Slack sem destino confirmado; crons nunca postam em canais de equipe

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
- **TODA** credencial → 1Password. Referência: `op read "op://IA – OPERACIONAL/Item/field"`
- **Asaas** POST/PUT/DELETE → exige "CONFIRMO A EXECUÇÃO" — GET é autônomo
- **Slack Comercial** = somente leitura — nunca postar automaticamente
- **openclaw.json** alterações: propor → aguardar aprovação → Dr. Henrique aplica na VPS

### Segurança Operacional — Estado Atual
- VPS: Hostinger Ubuntu `72.60.49.222` (srv1427194) | Docker | UFW ativo (22/80/443)
- Nginx + HTTPS: `henry.henriqueaugusto.adv.br` ✅ | Fail2ban ativo ✅
- Hardening score: 9.0/10 ✅ | 1Password CLI: `/tmp/op` ✅
- NUNCA desativar 3 flags controlUi simultaneamente → lockout (lição 26/02)

---

## 🔑 Credenciais — Referência Rápida (1Password cofre IA – OPERACIONAL)

| Sistema | Item 1Password | UUID |
|---|---|---|
| Asaas | "Asaas Pagamentos" | nr3hshfgglth6qd3yo3ddayuxa |
| N8N API | "N8N API - Henry.Ia" | vv6rbyo6rhpauyurzc3jvopqwe |
| ZapSign | "ZapSign" → campo `password` | mauxhgx5unbr7dzanovqzdvu2i |
| ClickUp API | "ClickUp API Token" → `password` | mth7e2mb6nkrsk2bbty3e4iuli |
| API Brasil | "API Brasil - Consultas" | pxqiqpv6s5qr3t66kzx5vkblme |
| OpenAI | "OpenAI API Key" → `password` | — |
| ADVbox | "ADVbox - Login Web" (⚠️ PENDENTE CRIAÇÃO) → email + password | — |

- Slack botToken: **não está no 1Password** — está em `openclaw.json` → `channels.slack.botToken`
- 1Password acesso: `export OP_SERVICE_ACCOUNT_TOKEN=$(grep OP_SERVICE_ACCOUNT_TOKEN /home/node/.openclaw/.env | cut -d= -f2-)`

---

## 🏗️ Infraestrutura e Sistemas

### N8N
- URL: `https://n8n.srv1380728.hstgr.cloud`
- 24 workflows | 20 ativos | 4 inativos
- ⚠️ Pipeline Asaas (`OwXrNkgiCqRykq7O`): token CU hardcoded desatualizado → Dr. Henrique corrigir no N8N UI
- ⚠️ GCLID workflows inativos → atribuição Google Ads possivelmente quebrada
- F10 (`ppws3IRJo8K6QQJd`): corrigido 20/03 ✅ (token + fetch→this.helpers)

### Evolution API
- Container: `evolution-api` | Imagem: `atendai/evolution-api:v1.8.7`
- Acesso OpenClaw: `http://evolution-api:8080` | API Key: `henry-evolution-2026`
- Instância: `suporte-ha` | Status: `open` ✅
- Event names: lowercase com ponto (`messages.upsert`) — conversão: `event.replace(/\./g,'_').toUpperCase()`

### ADVbox
- API retorna 403 (Cloudflare bloqueia VPS) — acesso direto bloqueado
- F14 usa Bearer hardcoded → ⚠️ PENDENTE: criar "ADVbox - Login Web" no 1Password (email: `adv.henriqueaugusto@gmail.com` | senha: `28051oabcebrasil`)
- Estrutura: tarefa = ação judicial | subtarefa = AIT | múltiplos AITs = múltiplas subtarefas
- Ver regras completas: bloco `## 🔴 REGRAS OPERACIONAIS — ADVBOX`

### ZapSign
- Total: 2.825 docs | 2.272 assinados
- Retorna telefone do signatário diretamente (não precisa extrair do PDF)

### API Brasil (Veículos)
- Endpoint: `POST https://cluster.apigratis.com/api/v2/vehicles/dados`
- Credenciais: 1Password "API Brasil - Consultas" (DeviceToken + Bearer JWT)
- Status: 100% operacional ✅

---

## 📊 ClickUp — IDs Críticos

- Workspace: `9011774778`
- Lista CRM Janeiro 2026: `901112824742`
- Lista CRM Fevereiro 2026: `901113201405`
- Lista CRM Março 2026: `901113249319`
- Execuções Mensais pasta: `90117567885` | Lista Março execuções: `901113249320`
- Campo *Data de Entrada* (leads): `dff8ca4a-8cbb-468f-92de-064ca8a950d3` — usar para contagem (não date_created)
- Campo *MF02*: texto com labels (CPF: / Valor Total: / Vencimento:) — nunca JSON
- Campo *Origem* valores: 1=Google Ads | 2=Facebook | 3=Instagram | 4=Indicação | 5=Orgânico Site | 6=WhatsApp Direto | 7=Origem Desconhecida | 8=Youtube | 9=REPESCAGEM | 10=INST-ORGÂNICO | 11=DISPARO API | 12=INSTA-TP-WAPP2
- Campo Origem ID: `2cf330fd-8a82-4378-81de-27b83e6375d3`
- Login: henry.ia.assistant@gmail.com | Senha: 1Password "Click-Up - Henry.IA"

---

## ⚙️ Crons Ativos (9 total — todos com delivery via message tool → Telegram 7630266660)

| ID | Nome | Schedule |
|---|---|---|
| b220a99c | Daily Briefing 7h | `0 10 * * *` UTC (7h BRT) |
| 20dd0668 | Watchdog 8h | `0 11 * * *` UTC (8h BRT) |
| ebc04ad3 | Heartbeat 10h/14h/18h | `0 13,17,21 * * *` UTC |
| cf1f1b80 | Revisão Semanal sexta 18h | `0 21 * * 5` UTC |
| ea726fe8 | Security Audit domingo 6h | `0 9 * * 0` UTC |
| fbf579e2 | Git Backup 2h | `0 5 * * *` UTC |
| c792df19 | Revisão Decisões 1º dia 12h | `0 15 1 * *` UTC |

- Delivery fix aplicado 20/03: todos usam `delivery.mode: "none"` + agent envia via `message` tool
- Modelos: Sonnet para todos (Haiku teve erros de model string)

---

## 💬 Slack — Canais e Regras

- **Regra absoluta:** SOMENTE LEITURA em todos os canais. Nunca responder equipe sem autorização.
- Reportar ao Dr. Henrique via Telegram quando ele perguntar ou criticidade máxima.
- `C076WL3MY15` — Comercial | `C07LJA7KW1Y` — Jurídico | `C0ACVJ8NTD4` — Agenda Lara
- `C07LBN4KWT0` — CC Geral | `C08LMJLDMK9` — Suporte ao Cliente | `C09KPCB0ZM1` — Agenda Flora
- `C0AM6CY5CV8` — #suporte-monitoramento | `C0AHFESNW9X` — Alertas/Sistema
- Formato Slack: divisores ━━━, seções numeradas, emojis de setor. Detalhe: `memory/comercial/slack-padrao-comercial.md`
- Timestamps Slack = UTC → sempre converter para BRT antes de exibir

---

## 🗓️ Google Agenda ICS — 4 Feeds Ativos

- ADM H.A.: `.../adv.henriqueaugusto%40gmail.com/.../basic.ics`
- Henrique-Closer, Lucas-Closer, Walissom-SDR: ver `memory/comercial/google-agenda.md`
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
1. **ADVbox → 1Password** — salvar credencial (email + senha) → desbloqueia F14/onboarding automático
2. **Pipeline Asaas token** — workflow `OwXrNkgiCqRykq7O` → 2 nós → trocar token hardcoded no N8N UI
3. **GCP Production Mode** — OAuth Drive expira ~25/03 → Google Cloud Console → publicar app
4. **ClickUp token 1Password** — item `mth7e2mb6nkrsk2bbty3e4iuli` → atualizar para token atual

### 🟡 Pendências técnicas
5. ALAN QUESTER — limpeza ADVbox: deletar customer 14311233 + processo + 3 tasks PROTOCOLAR
6. DARLAN — AITs PS00202880/81 no ADVbox + Asaas pipeline
7. CRISTIANO — Asaas pipeline (prazo processo 02/04/2026)
8. GitHub push — PAT pendente (item "GitHub Henry.IA" no 1Password)
9. ROAS Backfill Fev 25-28
10. Semana Santa — decisão Noronha vs RJ (verificar partir 22/03)
11. **Dashboard "Objetivos Diários" ClickUp** — aprovado conceitualmente em 20/03; aguarda 2 confirmações:
    - Meta 3 contratos: dia corrido ou só dias úteis?
    - Reuniões realizadas: como registrar? (tarefa / campo numérico / checklist)
12. Processar transcripts reuniões equipe (Alisson, Lucas, Dra. Índia) — ainda não lidas
13. Dra. Índia e Alisson: novos membros mencionados — detalhes a confirmar (people.md atualizado 20/03)

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
