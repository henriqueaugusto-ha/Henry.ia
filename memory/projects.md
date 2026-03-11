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
| 🔴 URGENTE | OAuth Google Ads | Token expira ~03/03 | ⚠️ Renovar imediatamente |
| 🔴 ALTA | WF-SDR-AI | Agente IA para Walisom qualificar leads | Planejado |
| 🔴 ALTA | WF-LEGAL | IA para produção jurídica / petições | Planejado |
| 🟡 MÉDIA | WF-SUPPORT | IA no suporte ao cliente (Ana Laura) | Planejado |
| 🟡 MÉDIA | Advbox API | Documentação (API retorna 302) | Bloqueado |

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

### 🔴 OAuth Google Ads — Status DESCONHECIDO (venceu 03/03)
- **Urgência:** CRÍTICO — venceu em 03/03, status de renovação não confirmado
- **Impacto:** WF-ROAS pode estar cego há 8 dias (sem dados de campanha)
- **Ação:** Confirmar renovação; se não renovado, renovar agora
- **Status:** Sem confirmação de renovação nos registros (atualizado 11/03)
