# pending.md — Pendências e Bloqueadores

> Itens abertos que precisam de ação. Atualizar sempre que resolver ou surgir novo item.
> Prioridade: 🔴 Urgente | 🟡 Importante | ⬜ Backlog

---

## ATUALIZAÇÃO 19/03 17h22 UTC

### 🔴 ANA KARINE — Onboarding manual PENDENTE
- Contrato assinado 19/03 16h12 UTC — F10 NÃO disparou automaticamente
- **Nome:** Ana Karine da Silva Sousa Pinto | **Tel:** (85) 99639-0769
- **Email:** karinedivamatematica@gmail.com
- **CPF:** DESCONHECIDO — precisa confirmar com Dr. Henrique ou ClickUp
- **ZapSign token:** `261d175a-aa0e-4fd1-934a-4a3c1b6d3f17`
- Pendente: ADVbox (F14→F15→F16), Asaas (MF01-MF06)

### 🔴 ClickUp API Token — INVÁLIDO (401)
- 1Password UUID: `mth7e2mb6nkrsk2bbty3e4iuli`
- Dr. Henrique precisa gerar novo token: ClickUp > Settings > Apps > API Token
- Salvar no 1Password substituindo o atual
- Impacto: Henry não consegue acessar CRM, tasks, dados de clientes

### 🟡 F10 ZapSign — Investigar falha de disparo
- Nenhuma execução de ppws3IRJo8K6QQJd após assinatura de Ana Karine (16:12 UTC)
- Hipótese: busca da task ClickUp dentro do F10 falha porque token está inválido

---

## ATUALIZAÇÃO 19/03 02h40 UTC

### ✅ WF-SUPPORT — CONFIGURADO E ATIVO (19/03/2026 02h38 UTC)
- Workflow ID: `wXPbGYVJb7pbiaSn` | ATIVO em Shadow + Whitelist
- Credenciais: Evolution API Key (`yVC6Uaky50m5Fy3N`) + OpenAI (`2ZZ3V3iGHzah9mBm`)
- Whitelist: 5585991436886 + 5585994502609
- ⚠️ PENDENTE: Dr. Henrique testar do número pessoal → confirmar simulação no Slack
- ⚠️ PENDENTE: Número da Dra. Ingrid para adicionar à whitelist

---

## ATUALIZAÇÃO 18/03 09h22 UTC (flush pré-nova-sessão)

### 🔴 REBECA — HOJE antes das 12h ⏰
- Notificar Walissom no Slack para disparar notificação formal à REBECA
- Valor: R$3.138,00 | prazo dela = hoje 18/03
- Mensagem sugerida: "Walison, hoje é o prazo da Rebeca. Dispara notificação formal agora. Valor: R$3.138,00+."
- Após disparo → negociar à noite

### 🚨 ANA LAURA — Demissão (17/03)
- Suporte ao cliente sem cobertura
- Verificar se Luciana assume sozinha
- WF-SUPPORT = prioridade imediata

### 🔴 ADVbox Credenciais — Dr. Henrique salvar no 1Password
- 1Password → cofre `IA – OPERACIONAL` → item novo: `ADVbox - Login Web`
- Campo `email`: `adv.henriqueaugusto@gmail.com`
- Campo `password`: `28051oabcebrasil` (todo minúsculo — versão anterior estava ERRADA)
- Sem isso: F14/F19 continuam quebrados

### ✅ ClickUp Token — RENOVADO (18/03/2026)
- Token: `pk_60972410_18YZ08VGC8Q1W14SYJ7XYRJ20VH1RZ4W`
- Atualizado em 1Password "ClickUp API Token" ✅

### 🔴 GCP Production Mode — OAuth Drive expira em ~7 dias
- Google Cloud Console → OAuth consent screen → Publicar app
- Sem isso F4 para de funcionar e todas as pastas Drive novas quebram

## ATUALIZAÇÃO 18/03 01h20 UTC

### ❌ F19 ADVbox Upload — Webhook não registra (BLOQUEADO)
- F19 (`VtzjQ0StPV8iJcWd`) criado via API, ativo no DB, mas webhook NÃO registra em memória N8N
- Toggle UI feito por Dr. Henrique → ainda 404
- Causa: workflows criados via API pós-restart não registram webhook sem novo restart
- Dr. Henrique optou por NÃO reiniciar N8N
- **Bloqueador adicional**: senha ADVbox hardcoded no workflow está errada (mudou)
- Credenciais testadas: 4 combinações diferentes, todas falham no login web
- **Ação pendente**: Dr. Henrique salvar credenciais corretas ADVbox no 1Password:
  item `ADVbox - Login Web` | campos `email` + `password` | cofre `IA – OPERACIONAL`
- Assim que credenciais salvas: upload funciona sem restart (mecanismo curl testado ✅)

### ADVbox upload manual temporariamente
- Documentos = arrastar manualmente no site ADVbox
- Contratos já estão no ClickUp (Central do Cliente) e Google Drive

---

## ATUALIZAÇÃO 18/03 00h30 UTC

### ✅ ADALBERTO e FRANCISCO — Central do Cliente + Drive (18/03)
- Tasks Central do Cliente Março 2026 criadas: `868hxnvbn` (ADALBERTO) + `868hxnvbq` (FRANCISCO) ✅
- PDFs dos contratos assinados anexados nas tasks ✅
- Pastas Google Drive criadas via F4 ✅
- **PENDENTE**: Upload PDF dentro da pasta Drive — F6 é esqueleto, ADVbox sem API de upload
- **PENDENTE**: Tipo ADVbox FRANCISCO `13735725` = `577852` (BAFÔMETRO) está ERRADO — corrigir

### 🔴 Google Drive OAuth — Reconectado por Dr. Henrique (18/03 00h15)
- F4 voltou a funcionar após reconexão da credencial Google Drive no N8N
- Causa: GCP Testing mode, token expira em 7 dias — expirou após 6 dias
- **Ação**: migrar GCP para Production mode (URGENTE — vai expirar de novo em ~7 dias)

### 🔴 F6 Upload Drive — Implementar
- F6 (`QULGGmXizKkgdwnm`) é esqueleto (só Webhook + Resposta)
- Implementar: Webhook → Download ZapSign PDF → Upload Google Drive
- Credencial: `MXwK2XnNndg0AdQQ` (Google Sheets OAuth, mesmos escopos Drive)
- Fazer no painel N8N (API rejeita criação de workflows via POST/PUT)

## ATUALIZAÇÃO 17/03 19h59 UTC
- ✅ Relatório Comercial Diário: formato aprovado + postado no Slack Comercial
- ✅ Script Python pronto: `scripts/relatorio-comercial-slack.py`
- ✅ Padrão visual 6 blocos Slack Comercial: salvo e ativo
- ✅ Google Agenda integrada: 4 feeds ICS funcionando
- 🔴 **AMANHÃ 18/03 — Ativar cron relatório comercial 20h no painel:**
  1. Acessar `henry.henriqueaugusto.adv.br` → Crons → Novo
  2. Nome: `Relatório Comercial Diário — 20h`
  3. Schedule: `0 23 * * *`
  4. Tipo: Agent Turn | Modelo: sonnet
  5. Mensagem: `Executar: python3 /home/node/.openclaw/workspace/scripts/relatorio-comercial-slack.py`

---

## 🔴 URGENTE

### ⚠️ F10 QUEBRADO — Contratos sem pipeline desde 12/03 (17/03/2026)
- F10 (`ppws3IRJo8K6QQJd`) — última execução: 12/03 — todas com ERRO
- Bug: `//` → `??` em "Buscar Task no ClickUp por Signer"
- Impacto: todos contratos assinados desde 12/03 sem ADVbox + Asaas automático
- AFETADOS HOJE (17/03): FRANCISCO DOS SANTOS COELHO FILHO (868hx7fkp) + ADALBERTO SARAIVA LEAO (868hxd9pw)
- Ação necessária: fix F10 + executar onboarding manual dos contratos acumulados

### ⚠️ FRANCISCO COELHO FILHO — Asaas Pendente (17/03)
- Task: 868hx7fkp | ADVbox: ✅ 14393401 | Processo: ✅ 13735725
- R$4.396 total | entrada R$1.099 paga 17/03 | 3x R$1.099 mensais venc. dia 17
- **Aguarda "CONFIRMO A EXECUÇÃO" para criar cobranças Asaas**

### ⚠️ ADALBERTO SARAIVA LEAO — Asaas + Decisão Plano (17/03)
- Task: 868hxd9pw | ADVbox: ✅ 14393421 | Processo: ✅ 13735744
- R$2.399 total | 1ª vence 18/03 (AMANHÃ)
- Decidir: à vista R$2.399 OU entrada R$1.099 + 2x R$1.099 (venc 18/04 e 18/05)
- **Aguarda decisão do plano + "CONFIRMO A EXECUÇÃO"**

### ⚠️ ANA LAURA — PEDIU DEMISSÃO (17/03/2026)
- Faltou 16/03 e 17/03 sem comunicação prévia; não retorna esta semana
- Suporte ao cliente sem cobertura — risco: Dr. Henrique / Ingrid absorvem operação
- Verificar: Luciana consegue assumir parte do suporte sozinha?
- Solução urgente: priorizar WF-SUPPORT (automação suporte WhatsApp via N8N + IA)

### ⚠️ MARCIO LINO — Asaas URGENTE (parcela R$1.000 vence 17/03)
- ADVbox: ✅ cliente 14369225 | processo 13711485
- Asaas: NÃO criado — aguarda "CONFIRMO A EXECUÇÃO"
- Plano: R$2.500 total, 3x (16/03 R$1k pago, 17/03 R$1k, 18/03 R$500)

### ⚠️ ADAILDO — Asaas URGENTE (1ª parcela R$1.299 VENCIDA 16/03)
- ADVbox: ✅ cliente 14351422 | processo 13690343
- Duplicado a deletar: customer 14351397
- Asaas: NÃO criado — aguarda "CONFIRMO A EXECUÇÃO"

### ⚠️ NAIRTON — Asaas Pendente
- ADVbox: ✅ cliente 14369227 | processo 13711487
- ⚠️ DETRAN-PB inserido como DETRAN-CE placeholder — corrigir manualmente no ADVbox
- Asaas: aguarda decisão plano (à vista R$2.499 ou 3x R$1.099) + "CONFIRMO A EXECUÇÃO"

### ✅ OAuth Google Ads — RESOLVIDO (08/03/2026) ← confirmado semana 09-13/03
- Token renovado em 08/03/2026 — sem data de expiração fixa
- Status atual: funcionando ✅
- **Gap de dados:** 25/02 a 07/03 = 11 dias sem dados de investimento Google Ads
  - Token anterior (renovado 24/02) parou com ERRO 401: NOT_ADS_USER entre 04-07/03
  - Dias afetados: 25-28/02 + 01-07/03
- Impacto: dados de ROAS/atribuição desse período são inválidos ou ausentes
- Ação pendente: decidir se vale reconstituir dados manuais do período ou ignorar o gap

### Crons Falhando — 4/6 (delivery silencioso) 🔴 — atualizado 13/03
- Diagnóstico real: crons EXECUTAM mas não entregam (delivery mode "announce" sem `to` configurado)
- Daily Briefing 7h, Heartbeat, Watchdog, Git Backup: sem entrega ao Dr. Henrique
- Fix preparado: `scripts/fix-cron-delivery.py` — aguarda Dr. Henrique aplicar 2 comandos na VPS
- Git Backup: modelo `anthropic/claude-haiku-3-5` inválido — fix junto com delivery

### ✅ API Brasil — RESOLVIDO (02/03/2026 17h21)
- Integração 100% funcional
- Configuração: DeviceToken UUID + Bearer JWT (420 chars) + SecretKey
- Credenciais salvas: 1Password "API Brasil - Consultas" (password=UUID, notesPlain=Bearer JWT)
- Teste validado: placa ABC1234 retornou dados completos
- Próximo: testar com placa real de cliente

### ✅ GitHub PAT — RESOLVIDO (12/03/2026)
- PAT: 1Password "GitHub - GitHub Personal Access Token (Henry IA)" (ID: 7rmwyq2laxxzoavgcyi5hcxfvq)
- Push via HTTPS funcionando — workspace sincronizado
- op binary correto: `/tmp/op` (não `/data/op`)

### Haiku model string — Validar às 10h
- Heartbeat configurado com `anthropic/claude-haiku-3-5`
- Se falhar: ajustar para modelo disponível (ex: Gemini Flash)

### 🔴 F10 Bug Crítico — GABRIEL LINHARES sem onboarding (confirmado 13/03)
- F10 (`ppws3IRJo8K6QQJd`) bug `//` → `??` em "Buscar Task no ClickUp por Signer"
- GABRIEL LINHARES BARBOSA (task 868hvjr0v): contrato 12/03, NÃO cadastrado ADVbox
- Ação: fix F10 + disparar F13→F14→F15→F16 manualmente para Gabriel
- Aguarda: ok do Dr. Henrique

### 🔴 Clientes ADVbox — Onboarding Incompleto (semana 09-13/03)
- DARLAN (868huwt25): AITs PS00202880 e PS00202881 sem processo no ADVbox
- ALAN QUESTER: deletar customer duplicado 14311233 + processo 13651174 + 3 tarefas erradas (manual no painel)
- JOAO VICTOR, DARLAN, CRISTIANO: verificar tipo de processo ADVbox (pode estar com tipo Bafômetro errado)
- JOAO VICTOR, DARLAN, CRISTIANO: Asaas pipeline pendente (aguarda "CONFIRMO A EXECUÇÃO")
- ADVbox: email + RG + endereço detalhado não atualizados (API não suporta PATCH — manual ou scraping)

### 🔴 Defesas Prévia — Pacotes Incompletos (13/03)
- IOMAR: aguarda formulário AMC + docs pessoais + procuração correta do ZapSign
- AMARILIO: aguarda AIT completo do Dr. Henrique para regenerar defesa

### 🔴 CRISTIANO SANTOS SOUSA — Prazo PSDD: 02/04/2026 ⚠️
- 20 dias a partir de 13/03 — monitorar ativamente

### ⚠️ 497 Cobranças Vencidas no Asaas (~R$473k)
- Encontrado em 02/03 via API
- Cobranças desde nov/2025 sem recebimento
- Oportunidade: recuperação de 20% = ~R$95k (meta março sem novos contratos)
- Próximo passo: Dr. Henrique autoriza análise detalhada por mês/valor/tipo
- Henry NÃO toca — só analisa e reporta

### N8N GCLID Workflows — Inativos (atribuição Google Ads)
- WF-TRACKING-GCLID e WF-UPLOAD-CONVERSAO inativos
- Impacto: conversões do Google Ads podem não estar sendo atribuídas corretamente
- Aguardando decisão do Dr. Henrique para reativar

### N8N ZapSign Análise Contratos — Inativo
- Fluxo que deveria automatizar o processo manual do PDF (pós-assinatura)
- Estava inativo — pode ser o WF incompleto aguardando finalização

### N8N API Key — ✅ RESOLVIDO
- Nova chave salva como "N8N API - Henry.Ia" (UUID: vv6rbyo6rhpauyurzc3jvopqwe)
- API conectada e funcionando

### Asaas API Key — Adicionar ao 1Password
- Status: chave não está no cofre
- Impacto: bloqueia automação completa do fluxo pós-contrato
- Ação: Dr. Henrique salva chave no 1Password → Henry testa integração

### OAuth Google Ads — Vence ~03/03/2026 (MOVIDO ACIMA)
- Status: token expirando em dias
- Ação: renovar OAuth antes de 03/03
- Impacto: campanhas Google Ads param de reportar dados → ROAS cego

---

---

## 🔴 SEGURANÇA — 6 ETAPAS ORDENADAS (doc 02/03/2026 — Score 5.5→9/10)

⚠️ Executar NA ORDEM. Não pular. Não agrupar. Uma mudança por vez.

### ✅ Etapa 1 — Nginx + Certbot (HTTPS) — CONCLUÍDA 02/03/2026
- henry.henriqueaugusto.adv.br → 72.60.49.222 via HTTPS

### ✅ Etapa 2 — 3 flags críticas desligadas — CONCLUÍDA 02/03/2026
- allowInsecureAuth: false | dangerouslyAllowHostHeaderOriginFallback: false | dangerouslyDisableDeviceAuth: false

### ✅ Etapa 3 — groupPolicy allowlist — CONCLUÍDA 02/03/2026
- Telegram, Slack e WhatsApp: groupPolicy allowlist

### 🔴 Grupos Telegram — Configuração pausada (11/03/2026)
- Status: IDs dos 5 grupos capturados, config preparado, mas NÃO aplicado
- Bloqueador: `/data/.openclaw/openclaw.json` não encontrado no host pela equipe
- O arquivo existe DENTRO do container (confirmado), mas o caminho no host é diferente
- Próximo passo: mapear o caminho real do openclaw.json no HOST antes de qualquer sobrescrita
- Config atual: wildcard `"*"` aplicado (funcional para DM e grupos existentes)
- IDs capturados:
  - Vida Pessoal: -5145538226
  - Comercial: -5146692074
  - Jurídico: -5001797443
  - Automações: -5138173805
  - Gestão & Estratégia: -5240379406
- Até resolução: operação segue pelo DM normalmente
- Config final preparado em `/tmp/openclaw_new.json` (dentro do container)

### 🔴 ClickUp — Planos/Metas (868hpad3h) — PRIMEIRA TAREFA PRÓXIMA SESSÃO
- Tarefa vazia — Dr. Henrique disse ter adicionado "pensamentos e hábitos" mas conteúdo não encontrado
- Aguardando clarificação: Opção A (construir com base na sessão) ou Opção B (localizar em outro lugar do ClickUp)

### 🔴 ClickUp — Reescrever Sub-tarefa Erros (868hpad1p) com mais detalhe
- Dr. Henrique achou superficial — quer análise profunda de cada erro

### 🔴 Re-aplicar Flags 2+3 + Rotação Tokens (SIGUSR1 reverteu) — PRÓXIMA SESSÃO
- Causa: SIGUSR1 escreveu estado em memória de volta ao disco
- Flags afetadas: dangerouslyAllowHostHeaderOriginFallback e dangerouslyDisableDeviceAuth (ambas true ainda)
- Tokens: todos iguais (rotação não persistiu)
- Comando completo salvo em memory/2026-03-02.md seção "SESSÃO FINAL"
- Usar: docker exec → python3 muda JSON → docker restart (SEM SIGUSR1)
- Score atual real: 8.0/10 (não 8.8)

### ✅ Etapa 4 — Tokens rotacionados — CONCLUÍDA 02/03/2026
- gateway.auth.token, gateway.remote.token, hooks.token → 3 valores únicos
- Telegram/Slack botTokens → já no 1Password
- ⚠️ PENDENTE: Nexos apiKey → Dr. Henrique salva manualmente no 1Password "Nexos API Key"

### ✅ Etapa 5 — CONCLUÍDA 02/03/2026
- chmod 700 elevenlabs-tts.sh ✅ | IPv6: sem bind detectado ✅

### ✅ Etapa 6 — CONCLUÍDA 02/03/2026
- UFW: deny incoming, 22/80/443 abertas ✅
- Fail2ban: 127 bans totais, 6 ativos agora, 0 falhas ✅
- auth.log: apenas brute force externo banido, zero acessos não autorizados ✅

---

## 🟡 IMPORTANTE

### Organização de Canais Telegram — Estruturar (não urgente)
- Status: registrado 03/03/2026 às 10h44
- Objetivo: criar canais separados no Telegram para organização por assunto
- Canais sugeridos:
  - 📊 Daily Briefing — relatórios matinais automáticos
  - 🚨 Alertas Críticos — OAuth, falhas de sistema, prazos vencidos
  - 📋 Projetos — updates de projetos em andamento
  - 💬 Conversas Gerais — DM atual
- Prioridade: baixa, mas fixado para não esquecer
- Próximo passo: quando tiver tempo, criar estrutura e configurar delivery dos crons

### 54 Contratos Sem Documentos ZapSign (52% do Q4+Q1) 🔴
- Descoberto: auditoria 02/03/2026
- Total: 103 contratos (Dez 42, Jan 35, Fev 26)
- Com docs: 56 (54%)
- Sem docs: 54 (52%)
- Causa raiz: WF-CONTRACT workflow quebrado
  - Contratos marcados com "Data assinatura" no ClickUp
  - Campo "PDF Master URL" vazio
  - Nenhum documento no ZapSign
  - 9/10 clientes fevereiro nesse padrão
- Ação: investigar workflow OU upload manual

### 51 Contratos Sem Deadline (84% Jan+Fev) 🔴
- Jan: 35/35 sem prazo (100%)
- Fev: 16/26 sem prazo (62%)
- Total: 51/61 sem deadline tracking
- Risco: prazos administrativos (15 dias úteis) vencendo sem controle
- 2 prazos vencidos confirmados em fev:
  - HUMBERTO DE AGUIAR (ANPP) — 04/02/2026
  - HERICKLEPTON (Velocidade) — 24/02/2026
- Ação: preencher manualmente OU criar workflow OCR

### Hardening final — Migrar tokens hardcoded do openclaw.json para .env
- Arquivo de tarefa: `tasks/hardening-final-2026-02-28.md`
- Status: pendente
- Tokens afetados: botToken, hooks.token, appToken Slack
- Ação: substituir por referências ao cofre 1Password

### Flags controlUi — Desligar uma a uma após acesso externo garantido
- Status: todas as 3 flags ainda ativas (necessário enquanto acesso externo não estiver garantido)
- Flags: `dangerouslyAllowHostHeaderOriginFallback`, `allowInsecureAuth`, `dangerouslyDisableDeviceAuth`
- Bloqueador: acesso externo seguro (Cloudflare Tunnel ou Nginx+HTTPS) ainda não implementado

### Acesso externo ao painel — Cloudflare Tunnel vs Nginx+HTTPS
- Status: indefinido (decisão pendente do Dr. Henrique)
- Impacto: sem acesso externo seguro, flags perigosas ficam ativas

### WF-SDR-AI — Agente IA para Walisom qualificar leads
- Status: planejado, não iniciado
- Prioridade: alta (alavanca comercial)

### WF-LEGAL — IA para produção jurídica / petições
- Status: planejado, não iniciado

### ANPP — Campanha Google+Meta
- Status: produto definido, campanha não executada
- Meta: R$4-5k por caso, urgência como gatilho

### Auditoria contratos janeiro/2026
- Status: pendente
- Contexto: clientes que assinaram em jan/2026 e ficaram sem acompanhamento após saída da equipe
- Estimativa: 15-20 processos trabalhistas com honorários a receber

---

## ⬜ BACKLOG

### BOOTSTRAP.md — Deletar (obsoleto)
- Status: arquivo ainda existe, deve ser removido
- Ação: `rm /data/.openclaw/workspace/BOOTSTRAP.md`

### Avatar henry.png — Criar
- Referenciado em IDENTITY.md como `avatars/henry.png`
- Status: arquivo não existe

### WF-SUPPORT — IA no suporte ao cliente (Ana Laura)
- Status: planejado, dependente de Ana Laura estar mais autônoma

### Advbox API — Documentar
- Status: API retorna 302 (redirect) — investigar e documentar

### Produtos digitais — Estruturar (não lançar)
- E-book trânsito, app, curso
- Status: ideia registrada, estruturar quando comercial estiver estável

### Feedback Loop — Configurar após acumular padrões (Módulo 4)
- Criar `memory/feedback/` com JSONs por domínio
- Domínios: `comercial.json`, `automacao.json`, `comunicacao.json`, `operacional.json`
- Ativar após ~20-30 registros de decisões aceitas/rejeitadas
- Status: estrutura definida, implementação adiada conscientemente

## ⏰ REBECA — NOTIFICAÇÃO URGENTE (18/03 — HOJE)

- Valor em aberto: R$ 3.138,00 | Prazo dela: hoje 18/03
- **Notificar Walisom via Slack** para disparar notificação formal na tarde → negociar à noite
- Mensagem: "Walison, lembrete: hoje é o prazo da Rebeca. Dispare a notificação formal no período da tarde para abrir negociação à noite. Valor em aberto: R$ 3.138,00+"
