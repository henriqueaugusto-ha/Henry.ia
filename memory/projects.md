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
