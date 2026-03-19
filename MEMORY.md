# MEMORY.md — Memória de Longo Prazo

## ⛔ DIRETIVA GERAL DE SEGURANÇA — REGRA MAIS IMPORTANTE (02/03/2026)

Padrão universal para TODAS as ferramentas = **SOMENTE LEITURA**.
- Nível 2 (autônomo): GET, consultar, monitorar, registrar em memória
- Nível 3 (confirmação simples): criar tarefas ClickUp, mensagens Slack internas, rascunhos, status
- Nível 4 (frase exata **"CONFIRMO A EXECUÇÃO"**): financeiro, deletar, segurança, N8N produção, ações irreversíveis
- Nível 5 (PROIBIDO): transferir dinheiro, deletar workspaces, alterar senhas, compartilhar credenciais
- Em dúvida → tratar como nível 4
- Nova ferramenta → somente leitura até Dr. Henrique definir níveis
- Regra completa: decisions.md (primeira entrada)

## ⛔ REGRA ABSOLUTA — SLACK COMERCIAL (17/03/2026 — PERMANENTE)

NUNCA postar no Slack Comercial de forma automática.
- Autorização explícita do Dr. Henrique OU cron agendado = única forma válida
- Antes de qualquer postagem: autorizado? formato 6 blocos? horário Fortaleza?
- Regra completa: `memory/comercial/slack-padrao-comercial.md`
- Incidente origem: 17/03 — Henry respondeu Walissom automaticamente → mensagem deletada

## Padrão Visual Slack Comercial (17/03/2026 — PERMANENTE)

- Toda mensagem ao Slack Comercial segue o padrão de 6 blocos com separadores ━━━
- Prefixos: 📊 Relatório / 🔴 Urgente / 🟡 Acompanhamento / 🟢 Concluído
- Cabeçalho sempre em *negrito*, emoji fora do asterisco (ex: `📊 *TÍTULO*`)
- Horário sempre fuso Fortaleza (UTC-3) — nunca UTC
- Regra completa: `memory/comercial/slack-padrao-comercial.md`

## Relatório Comercial Diário — Formato Aprovado (17/03/2026)

- 7 seções: Contexto → Resumo → Reuniões → Financeiro → Ação → Alertas → Conclusão + Painel de Metas
- Cores metas (Contexto e Painel): 🟢 contratos | 🟡 condição especial | 💰 recuperação
- Cores reuniões: 🟢 fechou | 🔵 realizada/não fechou | 🟡 condição especial ofertada | 🟣 em andamento
- Barra de progresso: `▓▓▓░░░░░░░░░░░░░░` (17 chars, proporcional ao %)
- Status global: 🔴 <50% | 🟡 50-80% | 🟢 >80% | 🏆 100%
- Script: `/home/node/.openclaw/workspace/scripts/relatorio-comercial-slack.py`
- Cron: 23h UTC (20h Fortaleza) — pendente Dr. Henrique ativar no painel
- Formato completo: `memory/comercial/relatorio-comercial-formato.md`

## Slack Token — Localização (17/03/2026)

- Token Slack NÃO está no 1Password (item "Slack Bot Token" não existe no cofre)
- Token está em: `openclaw.json` → `channels.slack.botToken`
- Para uso em scripts: `json.load(open("/home/node/.openclaw/openclaw.json"))["channels"]["slack"]["botToken"]`
- Envio sempre via Python com UTF-8 (shell corrompe emojis/acentos)

## Google Agenda ICS — 4 Feeds Ativos (17/03/2026)

- ADM H.A.: `https://calendar.google.com/calendar/ical/adv.henriqueaugusto%40gmail.com/private-276abc1fb7f333f6ba972bff521611aa/basic.ics`
- Henrique-Closer: `https://calendar.google.com/calendar/ical/e50e3cabb583ec22c6f1189eeb0b0ada0bb058abd208a0d05577c739bc405118%40group.calendar.google.com/private-e094cdd8f55577c5412392991d999366/basic.ics`
- Lucas-Closer: `https://calendar.google.com/calendar/ical/6c8ed9278f1271811c39ea28fd268d5048cce40b7222ce1edfdf888a15fa1a48%40group.calendar.google.com/private-983bfd48dbab59b798799f39905a9719/basic.ics`
- Walissom-SDR: `https://calendar.google.com/calendar/ical/ha.advocacia.walisonlima%40gmail.com/private-067644b5b8c5f1594977a0cbade98d6f/basic.ics`
- Padrão título: `[STATUS -] NOME - TIPO - CIDADE - ESTADO - ORIGEM`
- Todos confirmados 200 OK | Config completa: `memory/comercial/google-agenda.md`

## Regras Obrigatórias (impostas por Henrique)

### ⚠️ Alertas de Segurança — PROATIVO
- Sempre avisar ANTES de executar comandos que pedem credenciais
- Explicar explicitamente que dados sensíveis NUNCA devem ser colados no terminal
- Avisar tanto no chat quanto orientar no terminal quando houver risco de exposição
- Henrique pediu: "me avise aqui e ali" (chat + terminal simultaneamente)

### 🔐 1Password — REGRA ABSOLUTA
- **TODA** senha, credencial, API key ou informação sensível **DEVE** ser salva no 1Password
- **JAMAIS** hardcode em arquivos de config, código, scripts, mensagens ou qualquer lugar
- Sem exceção. Sempre. Zero tolerância.
- Ferramenta: 1Password CLI (`op`)
- Referência no código: `op read "op://Vault/Item/field"`

---

## Infraestrutura

- **VPS:** Hostinger Ubuntu, IP `72.60.49.222`, hostname `srv1427194`
- **Container:** OpenClaw rodando em Docker no host
- **Firewall:** UFW ativo — portas 22, 80, 443 liberadas
- **Fail2ban:** Ativo — 5 tentativas SSH → ban 1h
- **Kernel:** `6.8.0-101-generic` (atualizado em 2026-02-26)

## Canal Telegram

- Bot configurado e rodando
- dmPolicy: `allowlist` — apenas Henrique (`7630266660`) autorizado

## Incidente de Lockout (2026-02-26) — LIÇÃO CRÍTICA

**O que aconteceu:** Desativamos as 3 flags do controlUi juntas → bloqueio circular → Henrique perdeu acesso ao painel e Telegram parou de responder → teve que resetar todo o ambiente Hostinger e gerar novo BotToken.

**NUNCA FAZER:**
- Não desativar `dangerouslyAllowHostHeaderOriginFallback`, `allowInsecureAuth` e `dangerouslyDisableDeviceAuth` simultaneamente
- Não fechar firewall sem garantir SSH acessível como saída de emergência
- Não aplicar múltiplas restrições de segurança sem testar cada uma individualmente

**Arquitetura de segurança planejada (sem lockout):**
```
[UFW: 443 aberta, 18789 FECHADA externamente]
  → [Nginx HTTPS proxy reverso]
    → [OpenClaw Gateway token auth]
      → [Telegram allowlist só Henrique]
```

## Telegram

- BotToken anterior foi **descontinuado** após incidente de lockout
- Novo BotToken configurado em 2026-02-26 (valor não armazenado aqui — está no openclaw.json)
- AllowList: só `tg:7630266660` (Henrique)

## Segurança — Estado Atual (2026-02-26)

- ✅ SSH (porta 22) — funcional externamente
- ✅ UFW ativo — só porta 22 liberada
- ✅ Docker bind corrigido: `127.0.0.1:62585` (não mais `0.0.0.0`)
- ✅ Porta 62585 não exposta externamente
- ✅ Telegram funcionando via loopback
- ⬜ Acesso externo ao painel: decidir Cloudflare Tunnel vs Nginx+HTTPS
- ⬜ Flags perigosas do controlUi ainda ativas (desligar após acesso externo garantido)

## Como Tratar o Dr. Henrique

- *Contexto profissional/empresarial:* Dr. Henrique ou Dr. Henrique Augusto
- *Vida pessoal:* Henrique — somente quando ele autorizar expressamente

## Formatação por Canal

- *Telegram:* sem tabelas. Bullets simples. Escaneável. Sem markdown pesado.
- *Slack:* tabelas permitidas. CAPS para títulos. `*asterisco simples*` para negrito. Emojis estratégicos.

## Identidade Digital (2026-02-28)

- *E-mail:* henry.ia.assistant@gmail.com (cadastros técnicos + APIs — nunca comunicação com clientes)
- *Cofre 1Password:* IA-OPERACIONAL (grupo IA-TECNICO)
- *Vault ID:* mzeqvatyexb7yplnl6o6ajq7bu
- *Credenciais no cofre:* Slack Bot Token, Telegram Bot Token, Claude API Key, n8n Painel, OpenClaw Gateway, VPS SSH, ClickUp API Token
- *Cofres proibidos:* ADMIN, TRIBUNAIS, FINANCEIRO
- *Regra:* se precisar de credencial não listada → pedir ao Dr. Henrique

## ClickUp — Estrutura Completa (confirmada em 2026-02-28)

*Acesso ativo:* henry.ia.assistant@gmail.com — visitante (somente consulta)
*Workspace ID:* 9011774778

### Espaços de Trabalho

*1. Vida Pessoal*
- Planejamento Estratégico (pasta)
  - Gerenciamento de Objetivos (lista) → Status: Resolvido / Em Resolução / Identificado
  - Ex: "Renovação de passaporte americano do Enrico" = Em Resolução

*2. Gestão e Estratégia*
- Planejamento Estratégico (pasta)
  - Gerenciamento de Objetivos (17 itens) — lista principal de problemas GUT
    - Campos: Tópico / Descrição do Problema / Setor / Gravidade (1-5) / Urgência (1-5) / Tendência (1-5) / Pontuação GUT / Prioridade / Ação Estratégica / Justificativa / Responsável
    - Views: Lista de Problemas, Mind Map, Fluxo de Problemas, Painéis, Progresso
  - Execuções _ 2026 (2 itens)
  - Mapa da Equipe (9 itens)
  - Automações (3 itens)
  - Execuções Diárias (14 itens)
- Execuções Mensais (pasta) — *usada diariamente*
  - Janeiro (5) / Fevereiro (4) / Março (5)
  - Estrutura: Mês → Semana → Dia → Setor → O que foi feito

*3. Setor Comercial*
- CRM_2025 🔒 (pasta): Julho (início), Agosto (398), Outubro (434), Nov, Dez
  - Campos: Nome do contrato / Status / Data de entrada
- CRM_2026 (pasta): Janeiro / Fevereiro
  - Comparativo ano a ano

*4. Central do Cliente*
- Pastas 2026: Calendário 2026, Jan/Fev/Mar 2026
- Suporte ao Cliente (subseção)

*5. Setor Jurídico*
- Procedimento do Setor Jurídico (pasta) → Instruções (lista)
- Produção Jurídica (pasta)

*6. Setor Financeiro*
- Despesas_2025: Fev / Out / Nov / Dez
- Despesas_2026: Jan / Fev
- Faturamento Média Comercial: Nov / Dez
- Faturamento Comercial 2026: Janeiro

### Padrão GUT (Gerenciamento de Objetivos)
- G × U × T (1–5 cada), máximo 125 = atenção imediata
- Combinado com Matriz de Eisenhower na vida pessoal
- Tarefa com 5×5×5 = prioridade máxima, execução imediata

## 1Password CLI — Status (atualizado 2026-03-16)

- ✅ CLI instalado em `/tmp/op` (⚠️ migrou de `/data/op` — atualizado 16/03)
- ✅ OP_SERVICE_ACCOUNT_TOKEN configurado em `/data/.openclaw/.env` (permissões 600)
- ✅ Conexão testada — cofre IA-OPERACIONAL acessível
- Acesso via: `export OP_SERVICE_ACCOUNT_TOKEN=$(grep OP_SERVICE_ACCOUNT_TOKEN /data/.openclaw/.env | cut -d= -f2-) && /tmp/op item get "Nome" --vault "IA – OPERACIONAL"`
- ⚠️ Sempre verificar caminho real com `which op` antes de usar

## Compaction / MemoryFlush (2026-03-01)

- Configurado em `openclaw.json` → `agents.defaults.compaction.memoryFlush`
- Salva automaticamente decisões, mudanças, lições e pendências antes de compactar contexto

## Plano de Março 2026

- Meta: R$100k (Q1 total: Jan ~80k + Fev ~60k + Mar)
- Produto prioritário: *ANPP* (Acordo Não Persecução Penal) — R$4-5k, campanha Google+Meta
- Frentes: Trânsito core / ANPP / Recaptação / Novas áreas direito / Produtos digitais
- Processos trabalhistas antigos: 15-20 casos com honorários a receber
- Histórico queda: Ago-Dez/2025 (R$140-160k → R$80k), Jan-Fev26 mínima histórica

## ClickUp — Acesso Ativo

- Login: henry.ia.assistant@gmail.com | Senha: 1Password "Click-Up - Henry.IA"
- 2FA: (**) *****-2609 (solicitar código ao Dr. Henrique quando necessário)
- Workspace ID: 9011774778

## Meta T1 — Revisada em 02/03

- T1 = Jan R$80k + Fev R$60k + Mar R$160k = R$300k
- Meta março: **R$160k** (não R$100k)
- Vocabulário: T1 / Trimestre 1 — nunca Q1

## Asaas API — Diretiva de Segurança Financeira (02/03 — PERMANENTE)

- Chave: 1Password "Asaas Pagamentos" (UUID: nr3hshfgglth6qd3yo3ddayuxa)
- GET → permitido de forma autônoma (consulta, resumo, extrato, clientes)
- POST/PUT/DELETE/estorno → **PROIBIDO** sem Protocolo de Confirmação Dupla
- Confirmação válida = frase exata **"CONFIRMO A EXECUÇÃO"** — nenhuma outra aceita
- Violação = FALHA CRÍTICA → registrar em lessons.md imediatamente
- Regra completa em decisions.md (primeira entrada)
- Saldo: R$15.634,61 (02/03)
- ⚠️ 497 cobranças vencidas — estimativa ~R$473k em aberto
- 20% recuperação = ~R$95k → alavanca imediata para meta de março

## N8N API — Conectada (02/03)

- Chave: 1Password "N8N API - Henry.Ia" (UUID: vv6rbyo6rhpauyurzc3jvopqwe)
- URL: `https://n8n.srv1380728.hstgr.cloud`
- Total: 24 workflows | 20 ativos | 4 inativos
- ⚠️ GCLID workflows inativos — atribuição Google Ads possivelmente quebrada
- ⚠️ ZapSign Análise Contratos inativo — processo pós-contrato ainda manual

## ZapSign API — Conectada (02/03)

- Chave: 1Password "ZapSign" (UUID: mauxhgx5unbr7dzanovqzdvu2i) → campo `password`
- Endpoint: `GET https://api.zapsign.com.br/api/v1/docs/`
- Auth: `Authorization: Bearer {token}`
- Retorna telefone do signatário diretamente — não precisa extrair do PDF
- Total: 2.825 docs | 2.272 assinados

## Diretiva de Segurança Operacional — PERMANENTE (02/03)

- NUNCA editar openclaw.json diretamente
- NUNCA reiniciar gateway sem autorização do Dr. Henrique
- Protocolo: propor em texto → aguardar aprovação → ele aplica na VPS
- Motivo: 3 crashes do gateway em 01/03 por edições diretas

## Hardening Completo — Score 8.8/10 (02/03/2026)

- Etapa 1 ✅ Nginx + HTTPS — henry.henriqueaugusto.adv.br
- Etapa 2 ✅ 3 flags controlUi → false (uma por vez)
- Etapa 3 ✅ groupPolicy allowlist — Telegram, Slack, WhatsApp
- Etapa 4 ✅ Tokens gateway rotacionados (3 únicos) | Pendente: Nexos apiKey no 1Password (Dr. Henrique)
- Etapa 5 ✅ chmod 700 elevenlabs-tts.sh | IPv6: sem bind detectado
- Etapa 6 ✅ UFW ok | Fail2ban: 127 bans, 6 ativos, 0 falhas | auth.log: zero acessos não autorizados
- Score → 9.0/10 após Nexos apiKey salvo no 1Password

## Sistema Imunológico — Ativo (02/03/2026)

- Watchdog de crons: 8h diário (ID: 20dd0668) — Haiku
- Heartbeat: 10h/14h/18h diário — Haiku
- Revisão Semanal: sexta 18h — Sonnet
- Security Audit: domingo 6h (ID: ea726fe8) — Sonnet
- Feedback loops: memory/feedback/ (comercial, automacao, operacional)
- ROLLBACK.md + scripts/backup.sh ativos
- Primeiro audit rodou 02/03: 3 críticos (flags controlUi), 4 atenções

## ClickUp API — Conectada (02/03 03h50)

- Token: 1Password "ClickUp API Token" (ID: mth7e2mb6nkrsk2bbty3e4iuli) → campo `password`
- Workspace: 9011774778 | User: adv.henriqueaugusto@gmail.com
- Execuções Mensais: pasta 90117567885 | Março: lista 901113249320
- SEMANA 01 Dia 01/03 Gestão: task 868hpabn8 | Configurações OpenClaw: 868hpabpv
- Acesso: nível 3 (ok simples para criar) — mínimo privilégio — não acessar fora do autorizado

## Hardening — Score Real: 8.0/10

- Flags 2+3 revertidas por SIGUSR1 — re-aplicar via docker restart (sem SIGUSR1)
- Comando de correção em memory/2026-03-02.md seção "SESSÃO FINAL"

## GitHub Backup

- Repo: `henriqueaugusto-ha/Henry.ia` (privado)
- Git init + commit inicial: ✅ (584c714, 38 arquivos)
- Push: ❌ aguardando PAT em 1Password item "GitHub Henry.IA" campo `token`

## Crons Ativos (5 total)

1. Daily Briefing 7h — ID: b220a99c (Sonnet)
2. Watchdog 8h — ID: 20dd0668 (Haiku)
3. Heartbeat 10h/14h/18h — (Haiku) — validar 03/03 10h
4. Revisão Semanal sexta 18h — (Sonnet)
5. Security Audit domingo 6h — ID: ea726fe8 (Sonnet)

## Advbox API — Bloqueada

- Endpoint retorna 403 (Cloudflare bloqueia VPS)
- Para resolver: documentação oficial ou whitelist do IP 72.60.49.222

## API Brasil — ✅ INTEGRAÇÃO CONCLUÍDA (02/03 17h21)

**Status:** 100% funcional, teste com placa ABC1234 bem-sucedido

**Configuração final:**
```
POST https://cluster.apigratis.com/api/v2/vehicles/dados
Headers:
  DeviceToken: 6838ac15-cb03-48cf-93d9-279520d46336
  Authorization: Bearer eyJ0eXAiOiJKV1Q... (420 chars)
  SecretKey: fd247893-bc08-11ef-bacf-000c298680d9
```

**Credenciais 1Password "API Brasil - Consultas":**
- `password`: DeviceToken UUID (36 chars)
- `notesPlain`: Bearer JWT (420 chars)

**Teste realizado:** Placa ABC1234 → VW SANTANA CG 1986, Vermelha, Álcool, PR
**Tempo de integração:** 1h15min (4 tentativas até sucesso)
**Próximos passos:** Script workspace ou integração N8N

## Auditoria Contratos Q4 2025 + Q1 2026 (02/03)

**Total:** 103 contratos (Dez 42, Jan 35, Fev 26)
- Com ZapSign: 56 (54%)
- Sem ZapSign: 54 (52%) 🔴 **GAP CRÍTICO**
- Com deadline: 10 (10%) — apenas Fevereiro
- Sem deadline Jan+Fev: 51/61 (84%) 🔴 **RISCO OPERACIONAL**

**Causa raiz WF-CONTRACT:**
- Contratos marcados "assinados" no ClickUp
- Campo "PDF Master URL" vazio
- Nenhum documento no ZapSign
- 9/10 clientes fevereiro nesse padrão

**Prazos vencidos confirmados:**
- HUMBERTO DE AGUIAR (ANPP) — 04/02/2026
- HERICKLEPTON (Velocidade) — 24/02/2026

**Arquivos salvos:** `/data/.openclaw/workspace/memory/2026-03-02.md` e `2026-03-02-janeiro.md`

## Crons — 4/6 Falhando (02/03)

- Daily Briefing 7h: "cron announce delivery failed"
- Heartbeat 10h/14h: 2 erros consecutivos
- Watchdog 8h: delivery failure
- Git Backup 2h: "model not allowed: anthropic/claude-haiku-3-5"
- Causa provável: modo "announce" delivery + modelo Haiku string inválido

## API Brasil — Integração Concluída ✅ (02/03/2026 17h21)

- Item 1Password: "API Brasil - Consultas" (UUID: pxqiqpv6s5qr3t66kzx5vkblme)
- DeviceToken: `6838ac15-cb03-48cf-93d9-279520d46336` (campo password)
- Bearer JWT: 420 chars (campo notesPlain)
- SecretKey: `fd247893-bc08-11ef-bacf-000c298680d9`
- Endpoint: POST `https://cluster.apigratis.com/api/v2/vehicles/dados`
- Teste validado: placa ABC1234 → VW SANTANA CG 1986
- Status: 100% operacional

## Auditoria Contratos Q4 2025 + Q1 2026 ✅ (02/03/2026)

- Total: 103 contratos (Dez 42, Jan 35, Fev 26)
- Gap crítico: 54 sem ZapSign (52%), 51 sem deadline (84% Jan+Fev)
- Prazos vencidos: 2 (HUMBERTO ANPP 04/02, HERICKLEPTON 24/02)
- Causa raiz: WF-CONTRACT quebrado (PDF Master URL vazio)

## Evolution API — Instalada e Ativa (17/03/2026)

- Container: `evolution-api` | Imagem: `atendai/evolution-api:v1.8.7`
- Acesso OpenClaw: `http://evolution-api:8080` | API Key: `henry-evolution-2026`
- Acesso N8N (host): `http://127.0.0.1:8080`
- Instância: `suporte-ha` | Status: `open` (WhatsApp suporte conectado)
- Webhook → N8N: `https://n8n.srv1380728.hstgr.cloud/webhook/evolution-support-monitor`
- Rede Docker: `openclaw-ulim_openclaw` (acesso interno garantido)
- N8N Workflow ID: `lahexgzvNT2f3WRU` | Status: ATIVO ✅
- Canal Slack suporte: `C0AM6CY5CV8` (#suporte-monitoramento)
- Pendente: validar com mensagem real no número de suporte

## Slack — Canais Monitorados (17/03/2026) — ORDEM PERMANENTE

*Regra absoluta: SOMENTE LEITURA em todos os canais Slack de equipe.*
*Só reporto ao Dr. Henrique quando ele perguntar ou criticidade máxima.*
*Nunca respondo ninguém nos canais sem autorização explícita do Dr. Henrique.*

Canais configurados (`allowFrom: []`):
- `C076WL3MY15` — Comercial ✅
- `C07LJA7KW1Y` — Jurídico ✅
- `C07LBN4KWT0` — CC Geral HA Advocacia ✅
- `C08LMJLDMK9` — Suporte ao Cliente ✅
- `C0ACVJ8NTD4` — Agenda Jurídico Lara ✅
- `C09KPCB0ZM1` — Agenda Jurídico Flora ✅
- `C0AHFESNW9X` — Alertas/Sistema ✅

Membros Comercial: Walison Lima, Lucas Furtado, Dra. Ingrid (= "M."), Dr. Henrique
Container VPS: `openclaw-ulim-openclaw-1` | Config host: `/docker/openclaw-ulim/data/.openclaw/`
Reload sem queda: `docker kill --signal=SIGUSR1 openclaw-ulim-openclaw-1`

## Slack Comercial — Configurado (17/03/2026)

- Canal: `C076WL3MY15` | `requireMention: false` | modo SOMENTE LEITURA
- Container VPS: `openclaw-ulim-openclaw-1` (não `openclaw`)
- Volume host: `/docker/openclaw-ulim/data/.openclaw/`
- Editar config sempre no HOST (python3 direto) — permission denied dentro do container
- Reload sem queda: `docker kill --signal=USUSR1 openclaw-ulim-openclaw-1`
- Henry NÃO responde ninguém no canal — só lê e reporta ao Dr. Henrique via Telegram
- ⚠️ Timestamps Slack = UTC → sempre converter para BRT (UTC-3) antes de exibir
- Config somente leitura: `allowFrom: []` no canal — nunca mudar isso sem autorização
- ⚠️ `requireMention: false` + `allowFrom: ['*']` = bot responde todos — NUNCA usar assim em canais de equipe

## Grupos Telegram — Configuração em Andamento (11/03/2026)

- Config openclaw.json com wildcard `*` aplicada — aceita qualquer grupo
- Backup: `openclaw.json.bak-groups-20260311022146`
- Falta: `docker restart openclaw` → testar nos grupos restantes → capturar IDs → config final
- Grupo "Automações" → chat_id: `telegram:-5138173805` ✅ (capturado 11/03 12h49)
- Grupo "Setor Financeiro" → chat_id: `telegram:-5220749274` ✅ (capturado 11/03 18h39) — **uso exclusivo para questões financeiras** (decisão Dr. Henrique 11/03)
- Todos os 6 grupos mapeados: Vida Pessoal (-5145538226), Comercial (-5146692074), Jurídico (-5001797443), Automações (-5138173805), Gestão & Estratégia (-5240379406), Setor Financeiro (-5220749274)

## Sessão 12/03/2026 — Encerrada 04h59 UTC

### Destaques do dia
- MF01 corrigido (10 dias morto) + WF-PONTE corrigido
- Plano automação jurídica: 4 fases definidas (Contrato→Procuração→DP→Recurso)
- Dashboard CRM mapeado: 15 widgets → prompt gerado em `prompts/clickup-paineis-marco2026.md`
- GitHub backup funcionando via HTTPS com PAT do 1Password
- op binary path correto: `/tmp/op` (não `/data/op`)
- Equipe real: 4 pessoas (não 5) — Ingrid migrando para Previdenciário

### Pendentes críticos para próxima sessão
- Leads perdidos 02-12/03 (10 dias sem captura MF01) → recriar manualmente
- ROAS Backfill Fev 25-28 (jsCode com `\n` literais bugado)
- Automação jurídica: aguarda templates Word + decisão Fase 2 vs 3
- F2 + F4 + Asaas para 3 clientes Advbox (JOAO VICTOR, DARLAN, CRISTIANO)
- Dashboard Painéis Março → Claude Navegador executar prompt

## Sessão 12/03/2026 — Encerrada 04h59 UTC

### ✅ Resolvidos
- MF01 captura de leads: corrigido (LIKE → =)
- WF-PONTE: corrigido (// → ??)
- WF-01 ROAS: expandido com 11 colunas por canal
- Workflows renomeados F0-F9
- GitHub push via HTTPS com PAT funcionando
- 3 clientes Advbox cadastrados (JOAO VICTOR, DARLAN, CRISTIANO)
- Dashboard CRM Nov/2025 mapeado + prompt gerado (`prompts/clickup-paineis-marco2026.md`)
- Plano automação jurídica: Procuração → Defesa Prévia → Recurso (incremental)

### 🔴 Crítico para próxima sessão
1. Leads perdidos 02-12/03 (10 dias sem captura) → recriar manualmente
2. ROAS Backfill Fev 25-28 — TEMP `ydx0dYp8auEwN2tJ` com jsCode bugado
3. Crons falhando (4/6) — delivery failure + modelo Haiku inválido
4. OAuth Google Ads — token provavelmente expirado

### ⬜ Aguardando Dr. Henrique
- Templates Word: procuração ou defesa prévia (Fase 2 vs 3)
- F2 + F4 + Pipeline Asaas para os 3 clientes
- Nexos apiKey no 1Password

## Sessão 12/03/2026 — Jurídico (atualizado 05h00 UTC)

- **JOAO VICTOR** (task 868hua52t) → Advbox 14303030 | AIT SC01175794 Lei Seca DETRAN-CE | Prazo DP 22/04/2026
- **DARLAN** (task 868huwt25) → Advbox 14303031 | 🔴 3 AITs: PS00202879 (Lei Seca) + PS00202880 + PS00202881 | Prazo DP 23/04/2026
- **CRISTIANO** (task 868ht3fzr) → Advbox 14303032 | AIT SC01064019 Capacete | dados completos pendentes
- Pastas Drive criadas para os 3 ✅ (workflow F4 executado)
- Contratos assinados localizados no ZapSign página 114
- ZapSign: page_size fixo 25 — última página = 114 (não 57!)
- Advbox API: usar sempre via N8N (curl direto → 403 Cloudflare)
- Convenção pastas Advbox: `1 - Documentação` / `2 - DP.[nº AIT]`
- Detalhes completos: `memory/2026-03-12.md`

## Tarefa Pendente — 16/03/2026

*Extração leads CRM_2026 para disparo vídeo vitória (Dr. Henrique, grupo Comercial):*
- Lista "12/03" → filtrar 13/03 a 16/03 → status: Oportunidade / Aquecente reunião / Reunião marcada / Pós-reunião
- Exportar: Nome + Data entrada + Telefone → CSV para disparo em massa
- Status: ❌ incompleto — bloqueado por caminho errado do op CLI (`/data/op` → `/tmp/op`)
- Retomar assim que Dr. Henrique solicitar

## Pendente — Atualizado 12/03/2026

### 🔴 CRÍTICO
- [ ] Leads perdidos 02-12/03 — MF01 morto 10 dias → recriar manualmente via ChatGuru/Waspeed
- [ ] ROAS Backfill Fev 25-28 — TEMP workflow `ydx0dYp8auEwN2tJ` com jsCode bugado (`\n` literais) → reescrever via UI N8N
- [ ] Crons falhando (4/6) — Daily Briefing, Heartbeat, Watchdog, Git Backup com delivery failure / model inválido
- [ ] Lembrete GCLID 9h 13/03 — cron falhou "pairing required" → reconfigurar

### 🟡 IMPORTANTE
- [ ] Documentar workflows restantes no padrão Prompt Mestre (prioridade após blockers)
- [ ] Docxtemplater automação jurídica — aguarda templates Word do Dr. Henrique
- [ ] F2 + F4 + Pipeline Asaas → JOAO VICTOR, DARLAN, CRISTIANO
- [ ] Salvar Nexos apiKey no 1Password (Dr. Henrique)
- [ ] Campanha ANPP Google+Meta (aguarda briefing)
- [ ] Régua cobrança Asaas (497 vencidas ~R$473k)
- [ ] GCP Production mode — fix permanente OAuth (tokens expiram 7 dias em Testing)

### ✅ Resolvidos
- [x] OAuth Google Ads ✅ 08/03/2026 — token renovado
- [x] MF01 Captura de Leads ✅ 12/03/2026 — operador LIKE → = (morto desde 02/03)
- [x] WF-PONTE ✅ 12/03/2026 — operador // → ??
- [x] WF-01 ROAS ✅ 12/03/2026 — expandido com 11 colunas por canal
- [x] GitHub PAT ✅ 12/03/2026 — push via HTTPS funcionando
- [x] Workflows renomeados F0-F9 ✅ 12/03/2026
- [x] API Brasil integração ✅ 02/03/2026
- [x] Security hardening 9.0/10 ✅ 02/03/2026
- [x] N8N API Key ✅ 02/03/2026
- [x] 1Password CLI ✅ 02/02/2026

## Mapeamento Completo F10–F22 (12/03/2026 — 16h)

### Arquivados com prefixo [ARQUIVO]
- rKMGK7ETZKIAu4JJ → [ARQUIVO] WF-CONTRACT - AG-01 Briefing
- vj8WSQWsE4fgPePm → [ARQUIVO] WF-CONTRACT — MF-04 ZapSign
- nf6OPZ9PxLbHWErs → [ARQUIVO] WF-ADVBOX F6 Test
- ny26c1eLf9pUgF15 → [ARQUIVO] TEMP — Ler Tracking GCLID

### F10–F22 Mapeados e Renomeados
- ppws3IRJo8K6QQJd → WF-FIN | F10 | ZapSign Assinado → Disparar Pipeline ✅
- F11 — PÓS-ASSINATURA | Pipeline Financeiro Unificado → ⬜ NÃO EXISTE (criar)
- waHjYonLSnWTMYkD → WF-FIN | F12 | Verificação de Pagamentos e Orquestração ✅ (inativo)
- wxP9YXDz4t5JSiJ6 → WF-JUR | F13 | PONTE — Onboarding Automático ✅
- imtGbPavAHjLZ6Nf → WF-JUR | F14 | ADVbox — Cadastro do Cliente ✅
- d8LugSfOKgAP3mn6 → WF-JUR | F15 | ADVbox — Cadastro do Processo ✅
- haR02rfUyP43LkYD → WF-JUR | F16 | ADVbox — Cadastro de Tarefas ✅
- l92kHCXK38YZOc6C → WF-JUR | F17 | ADVbox — Criar Tarefa ✅
- xbYmfV0ptyu1KUsK → WF-JUR | F18 | ADVbox — Organizar Docs Drive + ClickUp ✅ (inativo)
- F19 — JURÍDICO | ADVbox — Atualizar Campos ClickUp → ⬜ NÃO EXISTE (criar)
- F20 — ROAS | Painel Diário Completo → ⬜ localizar ou criar
- F21 — ROAS | Scan Retroativo → vp02pRAs1GaBZb00 (TEMP — confirmar com Dr. Henrique)
- lJrZZwctS1tXWcZv → WF-ADS | F22 | Tracking Google Ads (Captura GCLID) ✅

## Workflows Comerciais — Nomenclatura Atualizada (12/03/2026)

Padrão: `WF-COM | F[n] | Descrição` (renomeado de MF para F em 12/03)

- BgcnSId0gMyGsFLg → WF-COM | F0 | Entrada Automática de Leads via WhatsApp
- 7h43EOcN7eZL0dov → WF-COM | F1 | Classificação Inicial do Lead
- eGs22NeplPH8ILf2 → WF-COM | F2 | Gerar Briefing da Reunião
- VGyNOb0hYaZVQaTX → WF-COM | F3 | Consolidar Dados do Contrato
- cncPGeyHW1cWaokv  → WF-COM | F4 | Gerar Minuta em Word Padrão
- 4RuMRxttDpOaxDTu → WF-COM | F5 | Conferência da Equipe
- 4iRquwGEMm7wonvj → WF-COM | F6 | Gerar PDF Final e Preparar Assinatura
- TqsSrUem3qdA07OX → WF-COM | F7 | Enviar para Assinatura e Registrar Cronologia
- uH26VqCHCC6YkUzu → WF-COM | F8 — ADS | Alerta de Conversão Google
- l0gHVcqbvaPLSpA3 → WF-COM | F9 — ADS | Envio Automático de Conversões

## Documentação — Padrão Prompt Mestre (12/03/2026)

- URL: https://docs.google.com/document/d/18R4rycqxlPhXGBDwXGWOw8UZHm-OQQnU6WMvUw5Vmhk/edit
- Task referência (feita pelo Dr. Henrique): 868hvcq41 — NÃO MODIFICAR
- Padrão: 12 seções com visual premium (╔═.✵.═══╗, CSS blocks, fluxo com setas)
- Próximos workflows a documentar: F0-F9 + ROAS + PONTE + ADVBOX

## GCLID — Diagnóstico (12/03/2026)

- Tracking sheet: só dados TEST — webhook nunca conectado à landing page real
- 11 contratos março: TODOS com GCLID vazio
- Google Ads refresh token expirado (kaywkiowy3lojymxnqndot5s7y)
- Próximo passo: URL landing page → script captura GCLID → reconectar webhook
- Lembrete 13/03 9h: enviar prompt ao agente do Dr. Henrique sobre GTM

## CRM Março — Campo Origem (IDs decodificados)

0=Google | 1=INSTA-TP-API | 2=Indicação | 3=Parceria | 4=TikTok | 5=Cliente da Base
6=Google Meu Negocio | 7=Origem Desconhecida | 8=Youtube | 9=REPESCAGEM
10=INST-ORGÂNICO | 11=DISPARO API | 12=INSTA-TP-WAPP2
Campo ID: 2cf330fd-8a82-4378-81de-27b83e6375d3

## Sessão 18/03/2026 — Central do Cliente + Drive (00h30 UTC)

- **ADALBERTO** (868hxd9pw) → Central Cliente task `868hxnvbn` ✅ | Drive: https://drive.google.com/drive/folders/1-_4s4w5oY0rmmDweyn1lzsZqWgYBiT9D ✅ | PDF anexado ✅ | Asaas ❌ aguarda plano + "CONFIRMO A EXECUÇÃO"
- **FRANCISCO** (868hx7fkp) → Central Cliente task `868hxnvbq` ✅ | Drive: https://drive.google.com/drive/folders/1SbxVou2YP-vU5ZZi2228sSiFuJd5Q6l6 ✅ | PDF anexado ✅ | Asaas ❌ | tipo ADVbox ERRADO (`577852`=bafômetro) ❌
- **Google OAuth Drive** reconectado por Dr. Henrique 00h15 → F4 voltou a funcionar
- **F6** = esqueleto vazio — implementar no painel N8N (não via API)
- **ADVbox** não tem endpoint de upload de arquivo (405) — somente interface web
- **Central do Cliente Março 2026** (ClickUp lista): `901113203399`
- Detalhes completos: `memory/diario/2026-03-18.md`

## Sessão 17-18/03/2026 — Onboarding FRANCISCO + ADALBERTO

### ADVbox concluídos
- FRANCISCO DOS SANTOS COELHO FILHO (868hx7fkp) → cliente 14393401 | processo 13735725 ⚠️ tipo ERRADO (577852 Bafômetro — Renúncia de Propriedade desconhecido)
- ADALBERTO SARAIVA LEAO (868hxd9pw) → cliente 14393421 | processo 13735744 ✅ tipo corrigido para 577848 AÇÃO JUDICIAL

### Pagamentos (fonte: Slack Comercial)
- ADALBERTO: R$2.399 PIX à vista — **JÁ QUITADO** ✅ (pagou 17/03 antes das 16h30)
- FRANCISCO: entrada R$1.199 paga 17/03 + 3x R$1.099 venc. 17/04, 17/05, 17/06/2026

### Asaas — 6 clientes pendentes (aguardam "CONFIRMO A EXECUÇÃO")
GABRIEL LINHARES, ADAILDO (vencida 16/03), MARCIO LINO (venceu 17/03), NAIRTON (decidir plano), FRANCISCO (3 parcelas criar), ADALBERTO (à vista quitado — registrar retroativo?)

### ADVbox credenciais corretas (DESCOBERTAS 17/03)
- Email: `adv.henriqueaugusto@gmail.com` | Senha: `28051oabcebrasil` (todo minúsculo)
- Token antigo (`28051OABcebrasil`) estava ERRADO — causa dos bugs F14
- Dr. Henrique deve salvar no 1Password: item `ADVbox - Login Web` | cofre `IA – OPERACIONAL`

### Infraestrutura 18/03
- Google Drive OAuth reconectado por Dr. Henrique (00h15) — F4 funcional ✅
- GCP em Testing mode — OAuth expira em ~7 dias — migrar para Production URGENTE
- ClickUp token `pk_60972410_2NEHDF941LOLSWCO14C4Q0L5MRMBEOYL` INVÁLIDO — renovar
- Ana Laura PEDIU DEMISSÃO 17/03 — suporte sem cobertura
- Cron relatório comercial 20h (Fortaleza) = `0 23 * * *` — aguarda ativação no painel
- F10 bug ainda ativo | F14 token expirado | F19 webhook não registra (aguarda restart N8N)

### ADVbox S3 Upload (mecanismo descoberto)
- POST /s3 multipart com cookies HttpOnly extraídos manualmente
- Bloqueado do OpenClaw (Cloudflare WAF) — N8N da VPS é único caminho automático
- F19 (`VtzjQ0StPV8iJcWd`) ativo no DB mas webhook não registra — requer restart ou toggle UI

## REGRA PERMANENTE — Documentos em Pastas ADVbox/Drive (13/03/2026)

Antes de inserir qualquer documento na pasta de um cliente:
1. Abrir e verificar o documento
2. Confirmar nome + CPF dentro do documento
3. Comparar com o cliente da pasta de destino
4. Só inserir se os dados baterem 100%
5. Divergência → reportar ao Dr. Henrique antes de agir
Origem: equipe reportou 3 casos de docs inseridos em pastas erradas (já corrigidos em 13/03)

## Onboarding Manual ADVbox — Método Confirmado (17/03/2026)

Quando F13 falha (IF invertido) ou F10 quebrado, usar diretamente:
- F14: `POST /webhook/advbox-cadastrar-cliente` → `{nome, cpf, rg, celular, email, cep, estado, cidade}`
- F15: `POST /webhook/advbox-cadastrar-processo` → `{customers_id, orgao, notes}`
- F16: `POST /webhook/advbox-cadastrar-tarefas` → `{lawsuits_id, orgao, prazo_defesa, cadastro_date}`
- BUG F13: IF TRUE/FALSE invertido — F14 retorna success mas F13 reporta erro. Workaround: F14→F15→F16 direto.

## ZapSign Paginação — Workaround Confirmado (17/03/2026)

Docs recentes NÃO estão na última página calculada pelo count. Solução:
- Busca binária nas páginas 100-120 com page_size=10
- page=110: Jan 2026 | page=114: Mar 2026 (contratos mais recentes)
- Briefing incompleto → extrair CPF/dados do PDF do contrato assinado (ferramenta `pdf`)
- ZapSign token correto (N8N): `30a3e64e-1faf-4392-bbab-bf0ebdd12ee021caa197-b702-4b23-9809-d2082c56c461`

## Contratos 17/03/2026 — ADVbox Concluídos

- FRANCISCO DOS SANTOS COELHO FILHO (868hx7fkp): cliente 14393401 | processo 13735725 | tarefas 203461547 + 203461549
  - CPF: 729.591.263-00 | email: vickitordossantos@gmail.com | Asaas: PENDENTE
- ADALBERTO SARAIVA LEAO (868hxd9pw): cliente 14393421 | processo 13735744 | tarefas 203461972 + 203461974
  - CPF: 485.874.943-68 | email: adalberto634@gmail.com | 4 AITs Art.208 CTB vencidos Dez/25 | Asaas: PENDENTE

## ADVbox Upload — Bloqueado (18/03/2026 01h UTC)

- F19 (`VtzjQ0StPV8iJcWd`) criado via API = webhook não registra sem restart N8N
- Dr. Henrique optou por NÃO reiniciar N8N (risco de interrupção de 25s)
- Senha ADVbox hardcoded no TEMP-Search-v3 (`henriqueaugusto.fl@gmail.com` / `28051OABcebrasil`) está ERRADA
- 4 combinações testadas → todas redirecionam para /login (falha de auth)
- Credenciais corretas ADVbox NÃO estão no 1Password nem na memória
- **Ação**: Dr. Henrique deve salvar em 1Password cofre IA–OPERACIONAL: item `ADVbox - Login Web`, campos `email` e `password`
- Upload de documentos ADVbox = MANUAL por enquanto

## N8N Webhook — Lição Crítica (18/03/2026)

- Workflows criados/ativados via API NÃO registram webhook na memória do N8N
- O banco de dados fica `active: true` mas o handler em memória não existe
- Resultado: 404 em qualquer chamada ao webhook
- Toggle ON→OFF→ON no painel UI NÃO resolve para workflows criados pós-restart
- ÚNICO caminho: reiniciar o container N8N (docker restart)
- Para workflows de produção: SEMPRE criar no painel N8N, não via API

## ADVbox Credenciais Web — NÃO armazenadas (18/03)

- 1Password cofre IA–OPERACIONAL: 26 itens, nenhum com login web ADVbox
- Item `kvwv6ocrhgtwvvcvg2224cticm` = só Bearer token API REST
- Item `ybuchmxmhp3ccygey2f7bu3qre` = WordPress hotmail, não ADVbox
- Hardcoded N8N TEMP-Search-v3: `henriqueaugusto.fl@gmail.com` / `28051OABcebrasil` = INVÁLIDAS
- Ação necessária: Dr. Henrique salvar credenciais no 1Password

## F10 — Bug Crítico + GABRIEL LINHARES (13/03/2026)

- **F10** (`ppws3IRJo8K6QQJd`) tem bug `//` → `??` em "Buscar Task no ClickUp por Signer"
- Falhou 6x em 12/03 (17h47–18h05 UTC) para contrato do GABRIEL LINHARES BARBOSA
- GABRIEL: task 868hvjr0v | contrato 12/03 16h43 | **NÃO cadastrado no ADVbox** ✅ confirmado
- Fix pendente: editar F10 + disparar F13→F14→F15→F16 manualmente → aguarda ok Dr. Henrique
- ⚠️ Verificar se há outros clientes afetados pós-12/03 (F10 estava quebrado)
- Último ADVbox ID ativo: ALAN QUESTER = 14308394 (12/03 13h36)

## Sessão 16/03/2026 — JOSÉ ADAILDO PEREIRA (cadastro incompleto)

- Task ClickUp: `868hwkm07` | Status: contrato fechado
- CPF: 442.200.573-15 | Tel: (85) 99152-6116 | Email: adaildop6@gmail.com
- ZapSign token: `b1d2c2e3-0f94-4597-b98f-230eb1f2aafa` → salvo no ClickUp ✅
- MF02 + Órgão Responsável → atualizados no ClickUp ✅
- ADVbox: NÃO cadastrado ❌ — F13→F1 falha em ambas as tentativas
- Causa provável: Bearer token ADVbox expirado no F14 (`imtGbPavAHjLZ6Nf`)
- Bearer hardcoded: `xz33X9sHtnVKWAG10ofpIFoDtK7u8JkLZYhczatxxaki7U7ZfOr9L7bq3kXE`
- Asaas: NÃO cadastrado ❌ — aguarda Advbox + "CONFIRMO A EXECUÇÃO"
- ⚠️ 1ª parcela R$1.299 vence HOJE 16/03/2026
- Detalhes completos: memory/2026-03-16.md

## Novo Bug — F14 ADVbox Cadastro (16/03/2026)

- Sintoma: `{"status":"error","step":"F1","msg":"Falha ao cadastrar cliente no ADVbox"}`
- Workflow: F14 (`imtGbPavAHjLZ6Nf`) → `POST /api/v1/customers` no Advbox
- Bearer token hardcoded pode ter expirado
- ADVbox 1Password UUID: `kvwv6ocrhgtwvvcvg2224cticm`
- Passo a passo para resolver: memory/2026-03-16.md seção 4
- Afeta todos os cadastros automáticos desde a última falha

## Reunião Comercial PPD — 19/03/2026

- Ata completa: `memory/2026-03-19.md`
- Pipeline T1: 42 leads | 8 fechados | 13 pós-reunião | 18 aquecidos | 3 no-show
- Taxa conversão atual: ~20% — gargalo é lead aquecido resistente ao agendamento (não no-show)
- Precificação PPD: abertura R$2.500 → intermediário R$2.100 → piso R$1.900
- Inadimplente Cauã Cardoso: R$1.124,89 em atraso | 4 propostas definidas | prazo venceu 19/03 | ajuizamento no fim de semana se não houver acordo
- Campanhas PPD por estado: CE, PE, PI, RN, ES — disparo madrugada 19→20/03
- Wirespeed: testar antes de comprar (R$800 por 2 licenças)
- ⚠️ Caso Antônio: delicado, sem responsável definido na reunião
- ⚠️ Lead sem capacete/PPD provisória: Wallace deve retomar com abordagem revisada

## Pendente — Atualizado 19/03/2026

### 🔴 URGENTE
- [ ] **Caso Antônio** — designar responsável urgente (saiu da reunião sem dono)
- [ ] **Cauã Cardoso** — monitorar retorno às propostas; ajuizar 21–22/03 se sem acordo
- [ ] ADAILDO — diagnosticar/corrigir F14 (token ADVbox) → cadastrar Advbox
- [ ] ADAILDO — Asaas: cadastro + 3 cobranças (aguarda "CONFIRMO A EXECUÇÃO") — 1ª parcela VENCIDA
- [ ] Fix F10 (`ppws3IRJo8K6QQJd`) — trocar `//` por `??` → aguarda autorização Dr. Henrique
- [ ] GABRIEL LINHARES (868hvjr0v) — onboarding Advbox manual (dependente fix F14/token)

### 🟡 PENDENTE CONTÍNUO
- [ ] ALAN QUESTER — limpeza ADVbox: deletar customer 14311233 + processo 13651174 + 3 tarefas PROTOCOLAR
- [ ] DARLAN — AITs PS00202880 e PS00202881 no ADVbox + Asaas pipeline
- [ ] CRISTIANO — Asaas pipeline (prazo processo: 02/04/2026)
- [ ] Leads perdidos 02-12/03 → recriar manualmente
- [ ] Crons delivery fix — 4/6 não entregam
- [ ] ROAS Backfill Fev 25-28
- [ ] GCP Production mode (OAuth expira 7 dias em Testing)

## Sessão 18/03/2026 — Estado Atual (09h23 UTC)

### ADVbox — Concluídos 17-18/03
- FRANCISCO DOS SANTOS COELHO FILHO (868hx7fkp) → ADVbox 14393401 | Processo 13735725 ✅ | tipo errado (Bafômetro) — corrigir
- ADALBERTO SARAIVA LEAO (868hxd9pw) → ADVbox 14393421 | Processo 13735744 ✅ | tipo corrigido para AÇÃO JUDICIAL (577848)
- Central do Cliente Março: tasks 868hxnvbn (ADALBERTO) + 868hxnvbq (FRANCISCO) com PDFs ✅

### Asaas — AGUARDA "CONFIRMO A EXECUÇÃO" (6 clientes)
1. ADALBERTO — PIX à vista R$2.399 já pago; confirmar se cria retroativa ou só registra
2. FRANCISCO — 3x R$1.099 venc. 17/04, 17/05, 17/06 | entrada R$1.199 já paga
3. ADAILDO — 1ª parcela R$1.299 VENCIDA desde 16/03
4. MARCIO LINO — parcela R$1.000 venceu 17/03
5. NAIRTON — à vista R$2.499 ou 3x R$1.099?
6. GABRIEL LINHARES (868hvjr0v) — ADVbox + Asaas NADA feito

### Infraestrutura Crítica
- Ana Laura pediu demissão 17/03 — WF-SUPPORT urgente
- ClickUp token inválido — renovar `pk_60972410_2NEHDF941LOLSWCO14C4Q0L5MRMBEOYL`
- F10 quebrado (`ppws3IRJo8K6QQJd`) — `//`→`??` — aguarda autorização
- F14 bearer token ADVbox expirado — todos cadastros automáticos quebrados
- F19 webhook não registra — requer restart N8N (Dr. Henrique optou por não reiniciar)
- ADVbox credenciais corretas: `adv.henriqueaugusto@gmail.com` / `28051oabcebrasil`
- GCP Testing mode — OAuth Drive expira em ~7 dias — migrar para Production
- Cron Relatório Comercial 20h — aguarda ativação manual no painel
- ADALBERTO duplicado ADVbox: deletar cliente 14351397
- NAIRTON ADVbox cadastrado como DETRAN-CE (correto: DETRAN-PB)

### Pagamentos Confirmados (Slack Comercial — fonte oficial)
- ADALBERTO: R$2.399 PIX à vista, pago 17/03 ✅
- FRANCISCO: entrada R$1.199 paga 17/03 ✅ | saldo 3x R$1.099

### Lições 18/03
- Slack Comercial = fonte confiável de pagamentos (values difere do rascunho inicial)
- ADVbox web upload bloqueado por Cloudflare WAF (200 body vazio = silencioso)
- N8N webhooks precisam toggle UI ou restart — API insuficiente
- HttpOnly cookies: extrair manualmente (curl não envia prefixo #HttpOnly_)

## ClickUp API Token — INVÁLIDO (19/03/2026)

- Token em 1Password (UUID: mth7e2mb6nkrsk2bbty3e4iuli) retorna HTTP 401
- Impacta: busca de dados de clientes, CPF, tasks do CRM
- **Ação necessária:** Dr. Henrique gerar novo token em ClickUp Settings > Apps > API Token
- CRM List ID (conforme 1Password notes): `901112572305`

## Ana Karine — Onboarding PENDENTE (19/03/2026)

- Contrato assinado 19/03 às 16h12 UTC via ZapSign
- **Nome:** Ana Karine da Silva Sousa Pinto
- **Email:** karinedivamatematica@gmail.com | **Tel:** (85) 99639-0769
- **CPF:** DESCONHECIDO (não está no ZapSign, ClickUp inacessível)
- **ZapSign doc token:** `261d175a-aa0e-4fd1-934a-4a3c1b6d3f17`
- **Pasta ZapSign:** /Ana Karine da Silva Sousa/
- Contrato criado por: Lucas Furtado
- F10 NÃO disparou automaticamente → onboarding manual pendente
- Bloqueador: CPF + ClickUp token inválido
- Detalhes completos: memory/diario/2026-03-19.md

## Sessão 16/03/2026 — ADVbox 3 clientes concluídos (22h36 UTC)

- **ADAILDO** (868hwkm07) → ADVbox cliente `14351422` | processo `13690343` ✅ | ⚠️ duplicado 14351397 a deletar
- **MARCIO LINO** (868hwjwbj) → ADVbox cliente `14369225` | processo `13711485` ✅ | Asaas: R$2.500 PIX em 3x (16/03 R$1k pago, 17/03 R$1k, 18/03 R$500)
- **NAIRTON** (868hwt0tm) → ADVbox cliente `14369227` | processo `13711487` ✅ | ⚠️ DETRAN-PB como DETRAN-CE placeholder — corrigir manualmente
- Bug descoberto: IF F1 Sucesso no F13 tem conexões TRUE/FALSE **invertidas** — workaround via F15/F16 diretos ✅

## Sessão 17-18/03/2026 — Flush Completo (09h22 UTC 18/03)

### ADVbox — Credenciais Web Descobertas (18/03)
- Email correto: `adv.henriqueaugusto@gmail.com` | Senha: `28051oabcebrasil` (todo minúsculo)
- Senha antiga hardcoded no TEMP workflow (`28051OABcebrasil`) estava ERRADA — nunca funcionou
- **Ação pendente**: Dr. Henrique salvar em 1Password cofre `IA – OPERACIONAL`: item `ADVbox - Login Web`

### ADVbox Upload — Bloqueado por Cloudflare WAF
- F19 (`VtzjQ0StPV8iJcWd`): webhook ativo no DB mas sem handler em memória N8N (criado pós-restart via API)
- POST /s3 de fora da VPS retorna 200 com body vazio mas arquivo não salva (Cloudflare bloqueia)
- N8N (mesmo IP da VPS = whitelistado) é único caminho automático confiável
- Dr. Henrique optou por NÃO reiniciar N8N → upload = manual por enquanto
- Resolução: Dr. Henrique salva credenciais ADVbox no 1Password → upload via curl funciona

### Ana Laura — Pediu Demissão (17/03/2026) 🚨
- Faltou 16/03 e 17/03 sem comunicação prévia
- Suporte ao cliente sem cobertura — verificar se Luciana aguenta sozinha
- WF-SUPPORT (automação IA suporte WhatsApp) = **PRIORIDADE URGENTE**

### Evolution API — Instalada (17/03/2026)
- Container: `evolution-api` | Imagem: `atendai/evolution-api:v1.8.7`
- Instância: `suporte-ha` | Status: `open` | Webhook → N8N workflow `lahexgzvNT2f3WRU` ATIVO
- Acesso OpenClaw: `http://evolution-api:8080` | API Key: `henry-evolution-2026`

### ClickUp Token — INVÁLIDO (detectado ~18/03)
- `pk_60972410_2NEHDF941LOLSWCO14C4Q0L5MRMBEOYL` retornou "Token invalid"
- Renovar token urgente (bloqueia automações que dependem do ClickUp)

### Pipeline de Clientes — Estado em 18/03 09h22 UTC

| Cliente | Task | ADVbox Cliente | ADVbox Processo | Tipo ADVbox | Asaas | Central Cliente |
|---|---|---|---|---|---|---|
| GABRIEL LINHARES | 868hvjr0v | ❌ | ❌ | ❌ | ❌ | ❓ |
| ADAILDO | 868hwkm07 | 14351422 ✅ | 13690343 ✅ | ⚠️ verificar | ❌ VENCIDO 16/03 | ✅ |
| MARCIO LINO | 868hwjwbj | 14369225 ✅ | 13711485 ✅ | ⚠️ verificar | ❌ VENCIDO 17/03 | ✅ |
| NAIRTON | 868hwt0tm | 14369227 ✅ | 13711487 ✅ | ⚠️ DETRAN-CE errado | ❌ aguarda plano | ✅ |
| FRANCISCO COELHO | 868hx7fkp | 14393401 ✅ | 13735725 ⚠️ | BAFÔMETRO errado | ❌ 3 parcelas criar | ✅ |
| ADALBERTO LEÃO | 868hxd9pw | 14393421 ✅ | 13735744 ✅ | JUDICIAL ✅ | ❌ JÁ QUITADO (registrar) | ✅ |

### REBECA — Notificação Formal (18/03 antes das 12h)
- R$3.138,00 em aberto | prazo dado pela cliente = hoje 18/03
- Notificar Walissom via Slack → ele dispara para REBECA → negociação à noite
- Detalhes: pending.md seção lembrete 18/03

### Dados Pagamento (fonte oficial = Slack)
- ADALBERTO: R$2.399 PIX à vista — **JÁ QUITADO** antes 16h30 de 17/03
- FRANCISCO: entrada R$1.199 paga 17/03 | saldo 3x R$1.099 venc. 17/04, 17/05, 17/06

### IDs Críticos Adicionais (18/03)
| Item | ID |
|---|---|
| F19 ADVbox Upload | `VtzjQ0StPV8iJcWd` |
| TEMP-ADVbox-Search-v3 | `2bX6HDL4k8mpIgI1` |
| Central do Cliente Março | `901113203399` |
| CRM Março 2026 | `901113249319` |
| ADALBERTO Central | `868hxnvbn` |
| FRANCISCO Central | `868hxnvbq` |

### ADVbox type_lawsuits_ids Confirmados
- `577848` = AÇÃO JUDICIAL | `577852` = BAFÔMETRO (default errado F15) | `579789` = DEFESA PRÉVIA | `577851` = DEFESA INICIAL
- Renúncia de Propriedade (FRANCISCO) = **DESCONHECIDO** — identificar

### Detalhes completos: `memory/diario/2026-03-18.md`
- **Asaas PENDENTE todos 3** — aguarda "CONFIRMO A EXECUÇÃO" + opção NAIRTON (à vista R$2.499 ou 3x R$1.099)
- ADAILDO 1ª parcela R$1.299 VENCIDA (16/03) | MARCIO parcela R$1.000 vence AMANHÃ 17/03
- Detalhes completos + dados todos clientes: memory/2026-03-16.md

## Sessão 17/03/2026 — 2 Contratos Assinados + F10 ainda quebrado

- **FRANCISCO DOS SANTOS COELHO FILHO** (868hx7fkp) → fechado 14:24 Fortaleza | Renúncia de Propriedade | Google | +55 85 97674-860 | Sem ADVbox/Asaas ❌
- **ADALBERTO SARAIVA LEAO** (868hxd9pw) → fechado 16:05 Fortaleza | Acúmulo de Pontos | Google | +55 85 82108-651 | Honorários Pagos | Sem ADVbox/Asaas ❌
- F10 continua com erros desde 12/03 — nenhum contrato pós-12/03 passou pelo pipeline automático
- ZapSign API `/docs/` NÃO retorna contratos recentes (N8N) — usar ClickUp como fonte de verdade
- Detalhes completos: memory/diario/2026-03-17.md

## ANA LAURA — Pediu Demissão (17/03/2026)

- Faltou 16/03 e 17/03 sem comunicação prévia
- Suporte ao cliente descoberto — risco Ingrid/Henrique absorverem
- Pendência: priorizar WF-SUPPORT + decisão de reposição

## FRANCISCO DOS SANTOS COELHO (negociação Slack) — 17/03

- Contrato via Lucas, entrada R$1.099 paga (comprovante BB confirmado)
- Total proposto: R$4.396 em 4x R$1.099 — aguarda confirmação Dr. Henrique
- ClickUp: tarefa NÃO criada | ADVbox: NÃO | Asaas: NÃO — aguarda "CONFIRMO A EXECUÇÃO"

## Números Comerciais — Confirmados (17/03/2026)

- **ChatGuru:** (85) 99143-6886 — API oficial | vídeos + campanhas Google/Meta
- **WhatsApp Business:** (85) 99246-3891 — comercial 2 (Waspeed)

Verificação de leads (2 critérios obrigatórios):
1. ClickUp → CRM_2026 → Março → filtro *"data de entrada" = hoje* + tarefas arquivadas
2. Fonte: ChatGuru webhook + WA Business webhook + execuções WF-CAPTURE no N8N

## Encerramento de Sessão — 18/03/2026 09h23 UTC

Dr. Henrique solicitou atualização de memória + push Git para início de nova sessão.

Estado consolidado no encerramento:
- Pipeline Asaas: 6 clientes pendentes (ADALBERTO, FRANCISCO, ADAILDO, MARCIO, NAIRTON, GABRIEL)
- ADVbox: 5 clientes cadastrados (pendente: GABRIEL LINHARES) — bugs F10, F13, F14, F19 ativos
- Ana Laura demitida — suporte descoberto → WF-SUPPORT ✅ ATIVO (19/03)
- ClickUp token inválido — renovar antes da próxima sessão
- GCP OAuth Drive em Testing — ~7 dias para expirar
- Cron Relatório Comercial 20h Fortaleza — aguarda ativação manual

## WF-SUPPORT — Agente Suporte IA ATIVO (19/03/2026)

- ID N8N: `wXPbGYVJb7pbiaSn` | Status: ATIVO ✅ Shadow + Whitelist
- Creds N8N: Evolution `yVC6Uaky50m5Fy3N` | OpenAI `2ZZ3V3iGHzah9mBm`
- Whitelist: `5585991436886` (principal) + `5585994502609` (pessoal)
- Arquitetura: Evolution → monitoramento → forward → agente (paralelo, fire-and-forget)
- Controles: MODO_SHADOW=true | MODO_TESTE=true | IA_ATIVA=true
- Modelo: gpt-4o-mini | temp 0.3 | /v1/chat/completions
- Slack: chat.postMessage → C0AM6CY5CV8 (#suporte-monitoramento)
- ⚠️ Pendente: teste Dr. Henrique + número Ingrid para whitelist
- Detalhes completos: memory/2026-03-19.md

Referência para próxima sessão:
- Diário completo: `memory/diario/2026-03-18.md`
- ADVbox credenciais: `adv.henriqueaugusto@gmail.com` / `28051oabcebrasil`
- REBECA: notificar Walisom (R$3.138 em aberto) — urgente 18/03

## Histórico Completo H.A. Advocacia — Criado 18/03/2026

Arquivo master: `memory/gestao/historico-ha-advocacia.md`
Contém: linha do tempo 10 fases (Mai/24–Mar/26), arquitetura dashboards Looker Studio, tabela histórica completa, ticket médio, metas, funil reverso para R$200k, inadimplência, canais de marketing.

Fatos-chave gravados:
- Escritório presencial: Jun/2024
- Pico contratos: 67 (Ago/24) | Pico financeiro: R$164.691 (Jul/25)
- Meta configurada nos dashboards: 100 contratos | R$200k/mês (nunca atingida — 82% foi o máximo)
- Ticket atual: R$2.250–R$2.600 (criminal/duplo = ticket alto)
- Dashboard Looker Studio tinha 2 painéis: equipe (sem financeiro, meta 76/mês) e Dr. Henrique (meta 100/mês, R$200k)
- Total inadimplente Jan/25–Mar/26: R$188.946
- Gargalo atual: agendamentos e presença nas reuniões (não volume de leads)

## PROTOCOLS.md — Protocolo de Confiança de Dados (PCD) v1.0 (18/03/2026)

Arquivo: `PROTOCOLS.md` (raiz do workspace)
Vigência: PERMANENTE — obrigatório antes de qualquer consulta a dados operacionais

6 Regras:
- R1: Classificar confiança da fonte (🟢 ALTA / 🟡 MÉDIA / 🔴 BAIXA) antes de apresentar qualquer dado
- R2: Sanity Check — 4 perguntas internas (compatibilidade, completude, impacto, precedente)
- R3: Cruzamento obrigatório — NUNCA confirmar dados operacionais com fonte única. Matriz: Supabase+Slack / Supabase+ClickUp / ClickUp+ADVbox
- R4: Declarar limitação da fonte antes de consultar (Evolution API = cache ~1h, Slack = só msgs do workflow, ClickUp = manual)
- R5: Autoauditoria — checklist de 7 itens antes de entregar qualquer dado ao Dr. Henrique
- R6: Registrar todo erro em agent_errors (Supabase) imediatamente

Origem: Evolution API retornou 6 clientes (cache parcial) quando histórico indica 30+ → erro de confirmação sem sanity check

## ANA KARINE — Onboarding Completo (19/03/2026 20h50 UTC)

- Task ClickUp: `868hy9mdz` | CPF: 71455906387
- Caso: AIT AS01772142 — Art. 165-A CTB (recusa bafômetro) — 28/02/2026 Av. Humberto Monte
- ADVbox: cliente `14421551` | processo `13767202`
- ADVbox tarefas: T1 req. AIT `204289976` (26/03) | T2 defesa `204289982` (27/04)
- Asaas: customer `cus_000166848854` | payment `pay_6inmnw7bdxalijtr`
- R$ 2.499,00 PIX à vista | Vencimento: 02/04/2026
- Invoice: https://www.asaas.com/i/6inmnw7bdxalijtr
- Pipeline N8N Asaas (OwXrNkgiCqRykq7O) falhou — executado diretamente via API ✅
- Causa falha pipeline: token CU hardcoded antigo em 2 nós do workflow

## ClickUp Token — Estado (19/03/2026)

- Token válido (sessão): `pk_60972410_18YZ08VGC8Q1W14SYJ7XYRJ20VH1RZ4W`
- 1Password UUID: `mth7e2mb6nkrsk2bbty3e4iuli` → ⚠️ ainda com token antigo (Dr. Henrique atualizar)
- Pipeline Asaas usa token CU hardcoded antigo: `pk_60972410_2NEHDF941LOLSWCO14C4Q0L5MRMBEOYL` → corrigir no N8N

## Webhooks F14/F15/F16 ADVbox (confirmados funcionais 19/03)

- F14 ADVbox cliente: `POST /webhook/advbox-cadastrar-cliente` → `{nome, cpf, rg, celular, email, profissao, cep, estado, cidade, observacoes}`
- F15 ADVbox processo: `POST /webhook/advbox-cadastrar-processo` → `{customers_id, orgao, notes}`
- F16 ADVbox tarefas: `POST /webhook/advbox-cadastrar-tarefas` → `{lawsuits_id, prazo_defesa, orgao, cadastro_date}`
- ADVbox Bearer (hardcoded nos workflows): `xz33X9sHtnVKWAG10ofpIFoDtK7u8JkLZYhczatxxaki7U7ZfOr9L7bq3kXE` ✅ válido em 19/03
- orgaoMap: DETRAN-CE=14204088 | PRF-CE=14204089 | AMC=14204092 | DETRAN-RN=14204093 | PRF-RN=14206420

## Ferramenta pdf nativa OpenClaw — Funcional para PDFs complexos

- Testada em 19/03 com contrato ZapSign image-based / fonte custom
- Extrai texto com sucesso quando pdftotext, pypdf, Stirling PDF falham
- Usar como solução definitiva para extração de CPF/dados de contratos

## Agente Suporte IA — Diagnóstico 19/03/2026

Dois bugs identificados e fixes propostos (aguardam CONFIRMO A EXECUÇÃO):

**Bug 1 — Shadow Mode ativo:**
- Workflow: `HA Advocacia — Agente Suporte IA v1.0` (ID: `wXPbGYVJb7pbiaSn`)
- Nó 03: `MODO_SHADOW = true` → IA gera resposta mas nunca envia ao cliente
- Fix: `MODO_SHADOW = false`, manter `MODO_TESTE = true` (whitelist: 5585991436886, 5585994502609)

**Bug 2 — Triplicação Slack:**
- Workflow: `Monitoramento Suporte Evolution + IA + Slack` (ID: `lahexgzvNT2f3WRU`)
- Filtro aceita MESSAGES_UPDATE + CHATS_UPDATE + SEND_MESSAGE → 3+ eventos por mensagem
- Fix: manter apenas `['MESSAGES_UPSERT', 'MESSAGES_SET']` no array `allowed`
- Agravante: Monitoramento chama agente via nó HTTP → duplo disparo (Evolution + Monitoramento)

Detalhes completos + arquitetura + inventário workflows: `memory/diario/2026-03-19.md`
Lições aprendidas: `memory/lessons.md` (entrada 19/03/2026)
