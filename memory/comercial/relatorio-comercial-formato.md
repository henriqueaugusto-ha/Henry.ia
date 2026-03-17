# Relatório Comercial Diário — Formato Aprovado

> Aprovado por Dr. Henrique em 17/03/2026
> Versão final — não alterar sem autorização

---

## REGRAS GERAIS

- Horário: sempre fuso *Fortaleza (UTC-3)* — nunca UTC
- Canal: Slack Comercial (`C076WL3MY15`)
- Frequência: diário às *20h Fortaleza* (23h UTC)
- Envio: Python com UTF-8 correto — nunca via variável shell (corrompe emojis)
- Nunca responder a ninguém no Slack após postar — apenas observar
- Só postar quando Dr. Henrique autorizar ou via cron agendado

---

## ESTRUTURA DO RELATÓRIO (7 seções obrigatórias)

```
━━━━━━━━━━━━━━━━━━━━
📊 *RELATÓRIO COMERCIAL — FECHAMENTO DO DIA*
*Data: DD/MM/AAAA | Hora: HH:MM*
*Setor: Comercial*
*Origem: Agenda Google + Slack + ClickUp CRM*
━━━━━━━━━━━━━━━━━━━━

*1. CONTEXTO*

🎯 *Meta do dia (Dr. Henrique):*
→ 🟢 X contratos novos
→ 🟡 X condição especial / desconto
→ 💰 Recuperação de R$X em inadimplência

📅 *DD/MM/AAAA — Equipe em campo*
Foco: [resumo do foco do dia]

━━━━━━━━━━━━━━━━━━━━

*2. RESUMO EXECUTIVO*
• [ponto 1]
• [ponto 2]
• [ponto 3]

━━━━━━━━━━━━━━━━━━━━

*3. DETALHAMENTO DAS REUNIÕES*

🟢 *NOME DO CLIENTE* (fechou)
• Reunião: realizada ✅
• Contrato: FECHADO ✅
• Valor total: R$X | Entrada R$X paga hoje
• Parcelas: R$X em DD/MM, DD/MM, DD/MM

🔵 *NOME DO CLIENTE* (reunião realizada, não fechou)
• Reunião: realizada ✅
• Contrato: não fechou ainda — aguarda follow-up

🟡 *NOME DO CLIENTE* (condição especial ofertada)
• Condição especial: ofertada — aguardando resposta
• Responsável: [nome] ← confirmar aqui no Slack

🟣 *NOME DO CLIENTE* (reunião em andamento)
• Reunião: em andamento às HH:MM
• Resultado: aguardando

━━━━━━━━━━━━━━━━━━━━

*4. FINANCEIRO DO DIA*
✅ NOME — parcela R$X recebida (forma de pagamento)
→ Saldo restante: R$X | Vence DD/MM

━━━━━━━━━━━━━━━━━━━━

*5. AÇÃO NECESSÁRIA*

👤 Responsável: [nome]
📌 Ação: [o que fazer]
⏰ Prazo: [quando]

━━━━━━━━━━━━━━━━━━━━

*6. ALERTAS*
🔴 [risco crítico]
🟡 [atenção]
🟢 [ponto positivo]

━━━━━━━━━━━━━━━━━━━━
🎯 *PAINEL DE METAS — DD/MM/AAAA*
━━━━━━━━━━━━━━━━━━━━

🟢 *CONTRATOS NOVOS*
`▓▓▓▓▓▓▓░░░░░░░░░░` X de Y → *ZZ%*
✅ Nome  ✅ Nome  🔄 Nome (em andamento)

🟡 *CONDIÇÃO ESPECIAL / DESCONTO*
`░░░░░░░░░░░░░░░░░` 0 de 1 → *0%*
🟡 Nome — ofertado, aguardando resposta

💰 *RECUPERAÇÃO DE INADIMPLÊNCIA*
`▓▓▓░░░░░░░░░░░░░░` R$X de R$Y → *ZZ%*
✅ Nome R$X  |  ❌ R$X sem norte

━━━━━━━━━━━━━━━━━━━━
🏆 *META GERAL: ~ZZ%* [emoji status]
`[barra proporcional]`
━━━━━━━━━━━━━━━━━━━━

*7. CONCLUSÃO*

✅ [conquistas do dia]
🔄 [em andamento]
🎯 [perspectiva / meta ao alcance]
🟡 [o que precisa de ação]
⚠️ [pendências críticas]

━━━━━━━━━━━━━━━━━━━━
```

---

## SISTEMA DE CORES — REUNIÕES

| Cor | Significado |
|-----|-------------|
| 🟢 Verde | Reunião realizada + contrato *fechado* |
| 🔵 Azul | Reunião realizada, *não fechou* ainda |
| 🟡 Amarelo | Condição especial *ofertada*, aguardando resposta |
| 🟣 Roxo/Manjericão | Reunião *em andamento agora* |

---

## SISTEMA DE CORES — META (CONTEXTO e PAINEL)

| Emoji | Meta |
|-------|------|
| 🟢 | Contratos novos |
| 🟡 | Condição especial / desconto |
| 💰 | Recuperação de inadimplência |

---

## BARRA DE PROGRESSO

- 17 caracteres totais: `▓` (preenchido) + `░` (vazio)
- Proporcional ao percentual atingido
- Exemplos:
  - 0%: `` `░░░░░░░░░░░░░░░░░` ``
  - 25%: `` `▓▓▓▓░░░░░░░░░░░░░` ``
  - 67%: `` `▓▓▓▓▓▓▓▓▓▓▓░░░░░` ``
  - 100%: `` `▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓` ``

---

## EMOJI DE STATUS GLOBAL

| % | Emoji |
|---|-------|
| < 50% | 🔴 |
| 50–80% | 🟡 |
| > 80% | 🟢 |
| 100% | 🏆 |

---

## FONTES DE DADOS

| Dado | Fonte |
|------|-------|
| Reuniões do dia | Google Agenda ICS (4 feeds) |
| Contratos fechados | Slack Comercial + Agenda |
| Pagamentos | Slack Comercial |
| Leads novos | Slack Comercial |
| Valores de contrato | ClickUp CRM |
| Meta do dia | Slack Comercial (mensagem Dr. Henrique) |

---

## CRON — CONFIGURAÇÃO

- **Horário:** 23:00 UTC = 20:00 Fortaleza
- **Schedule:** `0 23 * * *`
- **Modelo:** `anthropic/claude-sonnet-4-6` (nunca Opus em cron)
- **Script:** `/home/node/.openclaw/workspace/scripts/relatorio-comercial-slack.py`
- **Status:** script pronto ✅ | cron pendente configuração pelo Dr. Henrique no painel

---

## COMO ADICIONAR O CRON (Dr. Henrique)

1. Acessar `henry.henriqueaugusto.adv.br`
2. Crons → Novo
3. Nome: `Relatório Comercial Diário — 20h`
4. Schedule: `0 23 * * *`
5. Tipo: Agent Turn | Modelo: sonnet
6. Mensagem: `Executar: python3 /home/node/.openclaw/workspace/scripts/relatorio-comercial-slack.py`

---

## REGRAS DE FORMATAÇÃO SLACK

- Cabeçalho completo em *negrito* (`*texto*`)
- Todos os títulos de seção em negrito
- Emoji sempre *fora* do `*asterisco*` (ex: `📊 *TÍTULO*`)
- Nunca tabelas (Slack não renderiza bem)
- Separadores `━━━━━━━━━━━━━━━━━━━━` entre seções
- Informação faltante: escrever `não identificado` — nunca inventar

*Última atualização: 17/03/2026*
