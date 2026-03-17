# Projeto: Suporte ao Cliente via WhatsApp — Automação N8N

> Criado: 17/03/2026
> Motivação: Ana Laura (suporte) pediu demissão → gargalo operacional imediato
> Prioridade: 🔴 ALTA — Dr. Henrique volta pra operação sem isso

---

## DECISÕES DO DR. HENRIQUE (17/03/2026)

1. ✅ 80% das perguntas = status do processo + procedimentos → agente resolve sozinho
2. ✅ 20% = situações específicas → escala pro humano (Dr. Henrique / Dra. Ingrid / futuro contratado)
3. ✅ Base de conhecimento já existe: ~50 perguntas e respostas + fluxo de atendimento (GPT já montado)
4. ✅ Consulta ao ClickUp: Central do Cliente com status do processo
5. ✅ Quando agente não souber: "Vou encaminhar, retornamos em até 72h"
6. ✅ Botão liga/desliga: quando tiver humano → desliga agente; sem humano → liga agente
7. ✅ Canal Slack "Suporte ao Cliente" para alertas e escalonamento
8. ✅ Report diário automático: atendimentos, resolvidos, pendentes, fila

## ARQUITETURA PROPOSTA

```
WhatsApp Business API
  ↓ (webhook)
N8N — Recepção
  ├── Identifica cliente (telefone → ClickUp lookup)
  ├── Consulta status do processo (ClickUp API)
  ├── Verifica base de conhecimento (~50 Q&A)
  │
  ├── [80%] Resposta automática → WhatsApp
  │
  ├── [20%] Não sabe → "Encaminhando, retorno em 72h"
  │   └── Alerta no Slack #suporte-cliente
  │   └── Marca como pendente no ClickUp
  │
  └── [Report] Fim do dia → resumo no Slack
      - Total atendimentos
      - Resolvidos pelo agente
      - Pendentes (humano)
      - Quem não foi respondido

Switch liga/desliga:
  - Flag no N8N ou ClickUp
  - Quando OFF: mensagens vão direto pro humano (notifica no Slack)
  - Quando ON: agente ativo
```

## STACK TÉCNICO

- **N8N** (self-hosted, já rodando)
- **WhatsApp Business API** (número já é API oficial)
- **ClickUp API** (já conectada, token ativo)
- **Modelo IA**: OpenAI GPT (prompt específico com base de conhecimento)
- **Slack API** (já conectada)
- **ChatGuru**: avaliar se pode coexistir ou se precisa migrar

## QUESTÕES A RESOLVER

- [ ] ChatGuru e automação externa podem coexistir no mesmo número?
- [ ] Credenciais do WhatsApp Business API — Dr. Henrique tem acesso ao Meta Business Manager?
- [ ] Node N8N para WhatsApp: nativo vs Evolution API vs Z-API vs outro
- [ ] Base de conhecimento das 50 Q&A — onde está? (GPT, doc, planilha?)
- [ ] Estrutura do ClickUp "Central do Cliente" — quais campos e status?

## ORDEM DE EXECUÇÃO

1. **Report diário comercial no Slack** (mais simples, resultado imediato)
2. **Suporte WhatsApp automatizado** (mais complexo, resolve gargalo estrutural)

---

## PROGRESSO FASE 1 — MONITORAMENTO (17/03/2026)

### Setup completo ✅
- Evolution API v1.8.7 instalada na VPS (container `evolution-api`)
- Instância `suporte-ha` conectada ao WhatsApp suporte (estado: open)
- Webhook → N8N workflow `lahexgzvNT2f3WRU` (15 nodes)
- Canal Slack #suporte-monitoramento (C0AM6CY5CV8)
- Proxy Nginx HTTPS: `https://henry.henriqueaugusto.adv.br/evolution/`

### 6 fixes aplicados no workflow
1. Event name normalization (lowercase→uppercase)
2. $env references removidas (modelo + API keys)
3. Channel Slack adicionado no body
4. Markdown strip no parser de JSON da OpenAI
5. Filtro fromMe + grupos + eventos vazios
6. Download Media URL → proxy HTTPS público

### Funcionando
- ✅ Mensagens de texto de clientes → IA analisa → Slack
- ✅ Filtro inteligente: só clientes, ignora equipe e ruído
- ⏳ Mídia: proxy configurado, aguardando teste real

### Pendente Fase 1
- [ ] Teste real de download de mídia (áudio/imagem/doc)
- [ ] Resumo diário 12h/18h (endpoint de query não existe ainda)
- [ ] OpenAI API key → mover de hardcode pra N8N Credentials
- [ ] Prompt IA: melhorar classificação de urgência e tema

### Dados técnicos
- Evolution API: `http://127.0.0.1:8080` (bind localhost) / proxy `https://henry.henriqueaugusto.adv.br/evolution/`
- API key Evolution: `henry-evolution-2026`
- N8N workflow: `lahexgzvNT2f3WRU`
- Slack channel: `C0AM6CY5CV8`
- Webhook path: `/webhook/evolution-support-monitor`
- 556 conversas no WhatsApp suporte, 40 ativas últimas 24h
- Acesso total a mensagens via Evolution API (findChats + findMessages)
