# projects.md — Projetos em Andamento

> Estado atual dos projetos do AIOS e do negócio.
> Atualizar sempre que houver mudança de status.

---

## AIOS — AI Operating System

### Módulos em Produção ✅

| Módulo | Função | Status |
|---|---|---|
| WF-CAPTURE | Leads ChatGuru + Waspeed → ClickUp automático | ✅ Ativo |
| WF-ROAS | Relatório diário Google/Meta Ads → Slack | ✅ Ativo |
| WF-CONTRACT | Ciclo completo: briefing → contrato → assinatura → financeiro → jurídico | ✅ 8/8 microfluxos |
| WF-ASAAS | Pagamento recebido → baixa no ClickUp | ✅ Ativo |
| WF-BAIXA-PENDENTE | Alerta diário de cobranças pendentes (09h) | ✅ Ativo |
| WF-ASSINATURA-PENDENTE | Lembrete 24h/48h de contratos sem assinatura | ✅ Ativo |
| CRM 2026 | 58 campos, 13 status, 6 views, formulários SDR/Closer | ✅ Ativo |

### Módulos Pendentes

| Prioridade | Módulo | Descrição | Status |
|---|---|---|---|
| ✅ RESOLVIDO | OAuth Google Ads | Token renovado 08/03 | ✅ Ativo — gap dados 25/02–07/03 |
| 🔴 URGENTE | F11 Pipeline Financeiro | Unificar pipeline pós-assinatura | ❌ NÃO EXISTE — criar |
| 🔴 URGENTE | F19 Atualizar ClickUp Jurídico | Atualizar campos ClickUp com dados ADVbox | ❌ NÃO EXISTE — criar |
| 🔴 ALTA | WF-SDR-AI | Agente IA para Walisom qualificar leads | Planejado |
| 🔴 ALTA | WF-LEGAL | IA para produção jurídica / petições | 🔄 Iniciado — template DP Art.165-A v2 criado 13/03 |
| 🟡 MÉDIA | Docxtemplater Jurídico | Procuração + Defesa Prévia automatizadas | ⏳ Aguarda templates Word Dr. Henrique |
| 🟡 MÉDIA | WF-SUPPORT | IA no suporte ao cliente (Ana Laura) | Planejado |
| 🟡 MÉDIA | Advbox API Updates | PATCH/PUT não suportado via API token | ⚠️ Bloqueado — workaround: web scraping |

### Automação Jurídica — Plano de Fases (definido 12/03/2026)

| Fase | Módulo | Status |
|---|---|---|
| Fase 1 | Contrato (MF02 / F4) | ✅ Existente |
| Fase 2 | Procuração — gatilho: contrato assinado → ZapSign → Drive | ⬜ Aguarda template Word |
| Fase 3 | Defesa Prévia — IA por tipo de caso → revisão humana | 🔄 Template v2 criado 13/03 (Art.165-A) |
| Fase 4 | Recurso — usa resultado anterior → revisão obrigatória | ⬜ Futuro |

---

## Infraestrutura

### Estado Atual (2026-03-01)
| Item | Status |
|---|---|
| VPS Hostinger (srv1427194, 72.60.49.222) | ✅ Online |
| Docker + OpenClaw | ✅ Rodando |
| UFW Firewall | ✅ Ativo (portas 22, 80, 443) |
| Fail2ban | ✅ Ativo |
| N8N self-hosted | ✅ Ativo |
| Telegram bot | ✅ Funcionando |
| Slack bot | ✅ Configurado (dmPolicy: open desde 01/03) |
| 1Password CLI | ✅ /data/op v2.30.3 |
| Acesso externo ao painel | ⬜ Pendente (Cloudflare Tunnel ou Nginx+HTTPS) |

### Hardening Pendente
- Migrar tokens hardcoded do openclaw.json para .env
- Desligar flags controlUi uma a uma (após acesso externo garantido)

---

## Comercial — Plano Março 2026

**Meta:** R$100k

| Frente | Ação | Status |
|---|---|---|
| Trânsito core | Mais vídeos, leads, condições de pagamento | Em andamento |
| ANPP (prioritário) | Campanha Google+Meta — R$4-5k/caso | ⬜ Não iniciado |
| Recaptação | Inadimplentes + processos trabalhistas (15-20 casos) | ⬜ Não iniciado |
| Previdenciário | Servidor público | ⬜ Exploração inicial |
| IPVA isenção | Pessoa física PcD | ⬜ Exploração inicial |

---

## ClickUp — Estrutura

- **Workspace ID:** 9011774778
- **Login:** henry.ia.assistant@gmail.com (visitante — somente consulta)
- **6 Espaços:** Vida Pessoal, Gestão/Estratégia, Setor Comercial, Central do Cliente, Setor Jurídico, Setor Financeiro
- **CRM ativo:** CRM_2026 (janeiro + fevereiro)
- **GUT ativo:** Gerenciamento de Objetivos (17 itens, escala 1-125)

---

## Projetos Ativos — Março 2026

### ✅ API Brasil — Integração Veículos CONCLUÍDA (02/03 17h21)
- **Objetivo:** Consulta automática de placa → RENAVAM, marca, modelo, ano ✅
- **Status:** 100% FUNCIONAL
- **Configuração:**
  - DeviceToken: `6838ac15-cb03-48cf-93d9-279520d46336`
  - Bearer JWT: 420 chars (salvo em 1Password notesPlain)
  - SecretKey: `fd247893-bc08-11ef-bacf-000c298680d9`
- **Endpoint:** POST `https://cluster.apigratis.com/api/v2/vehicles/dados`
- **Teste realizado:** Placa ABC1234 → VW SANTANA CG 1986 (dados completos)
- **Tempo de integração:** 1h15min (16h05-17h21)
- **Próximos passos sugeridos:**
  1. Testar com placa real de cliente
  2. Criar script workspace `consulta-placa`
  3. Integrar com N8N (workflow automático)

### 🔴 Auditoria Contratos Q4 2025 + Q1 2026 (02/03)
- **Objetivo:** Cross-reference contratos ClickUp com ZapSign + extração de prazos
- **Status:** Concluído ✅
- **Resultados:**
  - Total: 103 contratos (Dez 42, Jan 35, Fev 26)
  - Com ZapSign: 56 (54%)
  - Sem ZapSign: 54 (52%) 🔴
  - Com deadline: 10 (10%)
  - Sem deadline Jan+Fev: 51/61 (84%) 🔴
- **Descobertas críticas:**
  - WF-CONTRACT quebrado: contratos "assinados" sem docs ZapSign
  - 2 prazos vencidos confirmados (HUMBERTO, HERICKLEPTON)
  - 497 cobranças Asaas vencidas (~R$473k, potencial R$95k recuperação 20%)
- **Arquivos gerados:**
  - `/data/.openclaw/workspace/memory/2026-03-02.md` (sessão completa)
  - `/data/.openclaw/workspace/memory/2026-03-02-janeiro.md` (janeiro específico)
- **Próximos passos:** Aguardando decisão Dr. Henrique sobre correção workflow + preenchimento manual

### 🔴 Correção Crons Falhando (02/03 — 8 dias parado)
- **Problema:** 4/6 crons quebrados há 8+ dias sem alerta visível
  - Daily Briefing 7h: "cron announce delivery failed"
  - Heartbeat 10h/14h: 2 erros consecutivos
  - Watchdog 8h: delivery failure
  - Git Backup 2h: "model not allowed: anthropic/claude-haiku-3-5"
- **Causa:** modo "announce" delivery + modelo Haiku string inválida
- **Impacto:** Sistema imunológico desativado (watchdog, heartbeat, briefing não chegam)
- **Status:** Script criado (`scripts/fix-cron-delivery.py`) em 03/03 — NÃO APLICADO
- **Ação:** Dr. Henrique aplicar 2 comandos no terminal VPS (2 minutos)
- **Atualizado:** 11/03/2026

### ✅ OAuth Google Ads — RESOLVIDO (08/03/2026)
- Token renovado em 08/03/2026
- Gap de dados: 25/02–07/03 (11 dias) — decisão sobre reconstituição pendente
- Causa raiz: GCP app em modo Testing → tokens expiram em ~7 dias
- Fix permanente: mover app para Production (aguarda Dr. Henrique)

### 🔴 F10 Bug + GABRIEL LINHARES (confirmado 13/03/2026)
- **Bug:** F10 (`ppws3IRJo8K6QQJd`) com operador `//` no node "Buscar Task por Signer" (mesmo bug F13)
- **Impacto:** todos os contratos assinados via ZapSign após 12/03 sem onboarding ADVbox automático
- **Caso confirmado:** GABRIEL LINHARES BARBOSA (task 868hvjr0v) — contrato 12/03 não cadastrado
- **Fix:** substituir `//` por `??` + disparar F13→F14→F15→F16 para Gabriel manualmente
- **Aguarda:** ok do Dr. Henrique para executar

### 🔴 Base Lookalike Meta Ads — CEP Histórico em Andamento (11/03)
- CSV: 1.117 clientes | 21% com CEP | 79% sem CEP
- ZapSign index construído: 613 matches de 868 sem CEP
- Batches processados: B1-B14 (133 CEPs coletados)
- **Parado:** B15-B62 (480 PDFs) — sessão interrompida por compactação
- **Bloqueado:** arquivos temporários em /tmp (perdem-se entre sessões)

### 🔄 Sistema de Defesa Prévia Art.165-A (iniciado 13/03/2026)
- Template v2 criado: `juridico/defesa-previa-165a/template_defesa_previa_165a_v2.docx`
- Script: `gerar-defesa.js` com 26 placeholders
- Casos gerados: IOMAR LIMA DIAS ✅ | AMARILIO LINO JUNIOR (aguarda AIT completo)
- Pacote de protocolo: Formulário AMC + Defesa + Procuração + Docs pessoais
