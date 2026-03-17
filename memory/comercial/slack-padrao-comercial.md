# Padrão Visual Slack Comercial — Regra Permanente

> Estabelecido por Dr. Henrique em 17/03/2026
> Aplicável a TODA mensagem enviada ao Slack do canal Comercial

---

## REGRA GERAL

Nunca enviar mensagem "solta", corrida ou confusa no Slack.
Toda mensagem deve vir estruturada, com blocos visuais claros, separadores e títulos.

---

## PADRÃO OBRIGATÓRIO

```
━━━━━━━━━━━━━━━━━━━━
[TÍTULO PRINCIPAL]
Data: dd/mm/aaaa | Hora: hh:mm
Setor: Comercial
Origem: [Telegram / Agenda / ClickUp / Slack / CRM / Asaas / ZapSign / Manual]
━━━━━━━━━━━━━━━━━━━━

1. CONTEXTO
[2 a 5 linhas explicando o que está acontecendo]

2. RESUMO EXECUTIVO
• ponto 1
• ponto 2
• ponto 3

3. DETALHAMENTO
• Lead/Cliente: [nome]
• Situação: [explicar]
• Origem: [google/meta/indicação/etc.]
• Reunião: [agendada / realizada / não realizada / remarcada]
• Contrato: [sim/não/em andamento]
• Pagamento: [sim/não/pendente]
• Observação importante: [se houver]

4. AÇÃO NECESSÁRIA
Responsável: [nome]
Ação: [o que deve ser feito]
Prazo: [horário/data]
Status esperado: [resultado esperado]

5. ALERTAS
🔴 [risco crítico]
🟡 [atenção]
🟢 [ponto positivo, se houver]

6. CONCLUSÃO
[1 a 3 linhas com direcionamento claro]
```

---

## MODELOS DE TÍTULO

- `📊 RELATÓRIO COMERCIAL — [assunto]`
- `🔴 URGENTE — [assunto]`
- `🟡 ACOMPANHAMENTO — [assunto]`
- `🟢 CONCLUÍDO — [assunto]`

---

## PADRÃO DE PRIORIDADE

| Situação | Prefixo |
|---|---|
| Urgência operacional | `🔴 URGENTE` |
| Acompanhamento importante | `🟡 ACOMPANHAMENTO` |
| Fechamento/conclusão | `🟢 CONCLUÍDO` |
| Relatório | `📊 RELATÓRIO` |

---

## REGRAS DE ESTILO

- Linguagem objetiva, profissional e limpa
- Não escrever blocos enormes
- Sempre separar por seções
- Sempre identificar responsável e prazo quando houver ação
- Sempre destacar risco ou pendência
- Relatório diário: trazer números
- Ocorrência pontual: foco em clareza e ação
- Informação faltante: escrever "não identificado" — nunca inventar
- Nunca misturar assuntos diferentes sem separar em blocos
- Meta sempre com progresso: `Meta: 3 contratos | Realizado: 1 | Faltam: 2`

---

## ⛔ REGRA DE VERIFICAÇÃO — CONTRATOS × REUNIÕES (17/03/2026)

> Erro cometido: relatório contabilizou reunião em andamento como contrato fechado.

**Regra permanente antes de qualquer relatório comercial:**

Contrato só conta quando:
1. Reunião realizada ✅
2. Assinatura confirmada ✅
3. Entrada recebida ou cobrança criada no Asaas ✅ (confirmação via Upside/Asaas)

**Verificação obrigatória por fonte:**
- Contratos assinados → checar na API do Upside / ZapSign (não apenas no Telegram da equipe)
- Pagamentos recebidos → checar no Asaas (não apenas comprovante enviado)
- Reunião em andamento → **nunca contabilizar** até haver confirmação de fechamento

**Nunca contar reunião em andamento como contrato — nem como "provável".**
**Separar sempre: Contratos | Pagamentos | Reuniões realizadas | Em andamento**

---

## ⛔ REGRA ABSOLUTA — NUNCA POSTAR DE FORMA AUTOMÁTICA (17/03/2026)

> "Nunca de forma automática." — Dr. Henrique Augusto, 17/03/2026 19h32 UTC

**Antes de qualquer postagem no Slack Comercial, verificar obrigatoriamente:**
1. Dr. Henrique autorizou explicitamente esta postagem?
2. O conteúdo está no padrão de 6 blocos?
3. O horário está em fuso Fortaleza (UTC-3)?

**Se qualquer resposta for NÃO → não postar.**

Não existe exceção. Nem urgência. Nem "óbvio que ele ia querer".
Autorização explícita do Dr. Henrique é condição necessária e suficiente.

---

## FLUXO OBRIGATÓRIO

Quando Dr. Henrique mandar informação no Telegram:
1. Verificar se está autorizado a postar
2. Interpretar
3. Organizar
4. Limpar
5. Transformar no padrão dos 6 blocos
6. Apresentar para Dr. Henrique revisar (se ele não tiver visto)
7. Só então publicar no Slack Comercial

---

## CANAL SLACK

- Canal: Comercial (`C076WL3MY15`)
- Toda mensagem para o Slack Comercial segue este padrão sem exceção
