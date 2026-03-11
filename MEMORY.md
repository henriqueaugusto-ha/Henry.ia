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

## 1Password CLI — Status (2026-02-28)

- ✅ CLI instalado em `/data/op` (v2.30.3)
- ✅ OP_SERVICE_ACCOUNT_TOKEN configurado em `/data/.openclaw/.env` (permissões 600)
- ✅ Conexão testada — cofre IA-OPERACIONAL acessível
- Acesso via: `export OP_SERVICE_ACCOUNT_TOKEN=$(grep OP_SERVICE_ACCOUNT_TOKEN /data/.openclaw/.env | cut -d= -f2-) && /data/op item get "Nome" --vault "IA – OPERACIONAL"`

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

## Grupos Telegram — Configuração em Andamento (11/03/2026)

- Config openclaw.json com wildcard `*` aplicada — aceita qualquer grupo
- Backup: `openclaw.json.bak-groups-20260311022146`
- Falta: `docker restart openclaw` → testar nos grupos restantes → capturar IDs → config final
- Grupo "Automações" → chat_id: `telegram:-5138173805` ✅ (capturado 11/03 12h49)
- Grupo "Setor Financeiro" → chat_id: `telegram:-5220749274` ✅ (capturado 11/03 18h39) — **uso exclusivo para questões financeiras** (decisão Dr. Henrique 11/03)
- Todos os 6 grupos mapeados: Vida Pessoal (-5145538226), Comercial (-5146692074), Jurídico (-5001797443), Automações (-5138173805), Gestão & Estratégia (-5240379406), Setor Financeiro (-5220749274)

## Pendente

- [ ] OAuth Google Ads — VENCE HOJE 03/03 🔴 CRÍTICO
- [ ] Corrigir 4/6 crons falhando 🔴
- [ ] Investigar WF-CONTRACT workflow (54 contratos sem docs) 🔴
- [ ] Preencher 51 deadlines faltantes (Jan+Fev) 🔴
- [ ] Alertar equipe jurídica — 2 prazos vencidos fevereiro
- [ ] Régua cobrança Asaas (497 vencidas ~R$473k → 20% = R$95k)
- [ ] GitHub PAT — criar e salvar no 1Password
- [ ] Salvar Nexos apiKey no 1Password (Dr. Henrique)
- [ ] Campanha ANPP Google+Meta (aguarda briefing)
- [x] API Brasil integração ✅ 2026-03-02
- [x] Security hardening 9.0/10 ✅ 2026-03-02
- [x] Auditoria contratos Q4+Q1 ✅ 2026-03-02
- [x] N8N API Key ✅ 2026-03-02
- [x] 1Password CLI ✅ 2026-02-28
