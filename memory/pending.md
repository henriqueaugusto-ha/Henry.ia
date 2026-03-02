# pending.md — Pendências e Bloqueadores

> Itens abertos que precisam de ação. Atualizar sempre que resolver ou surgir novo item.
> Prioridade: 🔴 Urgente | 🟡 Importante | ⬜ Backlog

---

## 🔴 URGENTE

### OAuth Google Ads — Vence AMANHÃ (03/03/2026) 🔴
- Status: vence em 24h
- Impacto: WF-ROAS para de reportar, campanhas ficam cegas
- Ação: renovar OAuth via console Google Ads

### Crons Falhando — 4/6 Quebrados 🔴
- Daily Briefing 7h: "cron announce delivery failed"
- Heartbeat 10h/14h: 2 erros consecutivos
- Watchdog 8h: delivery failure
- Git Backup 2h: "model not allowed: anthropic/claude-haiku-3-5"
- Impacto: monitoramento automático cego
- Causa provável: modo "announce" delivery + modelo Haiku string inválido

### API Brasil — DeviceToken JWT Não Localizado 🔴
- Plano ativo ✅ (confirmado 02/03)
- Dispositivo criado ✅ (henryia-veiculos, 17h05)
- Secretkey correto ✅ (`fd247893-bc08-11ef-bacf-000c298680d9`)
- Item 1Password criado ✅ ("API - Henryia-Veiculos")
- Valores salvos no 1Password:
  - `username`: henryia-veiculos ✅
  - `password`: 28051 (senha de 5 dígitos - não é JWT)
  - `notesPlain`: 6838ac15-cb03-48cf-93d9-279520d46336 (UUID - não é JWT)
- ❌ Nenhum JWT longo encontrado (API espera formato `eyJ0eXAiOi...` com 200+ chars)
- Erro ao testar: "Bearer Token informado é inválido"
- **Tentativa 1 (17h08):** UUID salvo em novo item "API - Henryia-Veiculos" → rejeitado
- **Tentativa 2 (17h13):** Item consultado, confirmado UUID incorreto
- **Tentativa 3 (17h15):** Dr. Henrique disse "troquei", verificamos → UUID copiado novamente no item "API Brasil - Consultas" → rejeitado
- **Padrão:** 3 tentativas, todas salvaram UUID (38 chars) ao invés de JWT (200+ chars)
- **Print recebido (17h17):** Painel API Brasil chama UUID de "DEVICE TOKEN" (nomenclatura confusa)
- **DESCOBERTA CRÍTICA:** API precisa de 2 tokens simultâneos:
  - DeviceToken UUID: `6838ac15-cb03-48cf-93d9-279520d46336` ✅ (temos)
  - Authorization Bearer JWT: `eyJ0eXAiOiJKV1Q...` ❌ (PERDIDO - foi sobrescrito no 1Password)
- **Erro fatal:** Instrução minha causou sobrescrita do JWT pelo UUID no campo password
- **Opções de recuperação:**
  1. Restaurar JWT via histórico de versões do 1Password
  2. Gerar novo JWT fazendo login novamente em gateway.apibrasil.io
- **BREAKTHROUGH (17h19):** Dr. Henrique localizou "token principal bem grande" no painel
- **Print recebido (17h20):** Bearer Token visível (420 chars, começa com `eyJ0eS01cG1JK...`)
- **Status:** Solicitado copiar e colar token completo na conversa
- **Próximo passo:** Teste em 30 segundos após receber Bearer JWT
- Bloqueio: skill veículos a literalmente 1 mensagem de funcionar - Bearer JWT identificado, aguardando cola
- **✅ RESOLVIDO (17h21):** Bearer JWT salvo no 1Password campo notesPlain, API testada com sucesso (placa ABC1234 retornou dados completos VW SANTANA CG 1986)
- **Status final:** Integração API Brasil 100% funcional - DeviceToken + Bearer JWT + SecretKey configurados corretamente

### GitHub PAT — Push do workspace travado 🔴
- git init ✅, commit inicial ✅ (38 arquivos), push ❌ (sem token)
- Repo: `henriqueaugusto-ha/Henry.ia` (privado)
- Ação: github.com → Settings → Developer settings → Personal access tokens (classic) → permissão `repo` → salvar no 1Password item "GitHub Henry.IA" campo `token`

### Haiku model string — Validar às 10h
- Heartbeat configurado com `anthropic/claude-haiku-3-5`
- Se falhar: ajustar para modelo disponível (ex: Gemini Flash)

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
