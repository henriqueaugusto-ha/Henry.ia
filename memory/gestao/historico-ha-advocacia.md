# Histórico Completo — H.A. Advocacia Especializada em Trânsito
> Compilado em 18/03/2026 | Fontes: Google Sheets + Asaas API + ClickUp + Looker Studio
> Atualizar sempre que novos dados históricos forem confirmados por Dr. Henrique

---

## 1. LINHA DO TEMPO DO NEGÓCIO

### Fase 1 — Home Office (até Mai/2024)
- **Equipe:** Dr. Henrique (SDR + Closer + gestão) + 1 secretária + 1 jurídico
- **CRM:** Google Sheets manual + Looker Studio (nunca automatizado — dependia de atualização técnica)
- **Característica:** Operação solo no comercial. Volume limitado pelo gargalo físico de uma pessoa fazendo tudo.
- **Ticket médio:** ~R$1.500–R$2.000 (era mais baixo nesse período)

### Fase 2 — Virada Presencial (Jun/2024)
- **Decisão:** Migração do home office para escritório presencial em junho de 2024
- **Impacto imediato:** Expansão de equipe → leads explodiram → volume de contratos saltou
- **Resultado:** Jul/24 = 628 leads / 57 contratos | Ago/24 = 663 leads / 67 contratos (pico histórico de volume)

### Fase 3 — Crescimento e Maturação (Set/2024 – Jun/2025)
- Equipe de até 10 pessoas funcionando
- CRM no Google Sheets + Looker Studio (dois painéis separados)
- Ticket médio subindo gradualmente (R$1.750 → R$2.500+)
- Volume oscilou mas faturamento cresceu por conta do ticket maior
- Faturamento passou a superar R$100k/mês consistentemente

### Fase 4 — Pico Financeiro + Migração ClickUp (Jul/2025)
- **Melhor mês financeiro da história:** R$164.691 faturados
- 49 contratos | Ticket médio R$2.561
- Migração do CRM: Google Sheets → ClickUp + N8N (automações)
- Google Sheets parou de ser alimentado → Looker Studio ficou sem dados

### Fase 5 — Ruptura (Ago/2025)
- Saídas de equipe em cascata
- Queda de R$164k → R$123k em um único mês (-25%)
- Faturamento mantido acima de R$100k até Dez/25 apenas por inércia de parcelas antigas
- Novos contratos em queda livre

### Fase 6 — Vale e Reconstrução AIOS (Jan/2026 em diante)
- Equipe enxuta: 5 pessoas
- Mínima histórica de contratos (26 em Fev/26) e faturamento (R$84k)
- Decisão estratégica: construir AIOS antes de recompor time
- Instagram Stories/Reels abandonados → retorno ao Google Ads (Feed)
- Mar/26: conversão 9,5% (melhor taxa recente) — sinal de recuperação de qualidade

---

## 2. SISTEMAS DE GESTÃO — EVOLUÇÃO

### Google Sheets + Looker Studio (Mai/2024 – Jun/2025)
- CRM manual alimentado pela equipe após cada atendimento
- **Dashboard Comercial (equipe):** Funil + KPIs + CRM — SEM valores financeiros
- **Dashboard Financeiro (Dr. Henrique):** Tudo + faturamento + ranking SDRs
- **Problema:** Pipeline de dados frágil — sem automação real, dependia de técnico disponível
- Links das cópias públicas:
  - Comercial: https://lookerstudio.google.com/reporting/fbcb37da-a2e8-4e54-829f-a6230e0e1e17
  - Financeiro: https://lookerstudio.google.com/reporting/9ded7c14-8bf8-4089-bb78-4eb84a976c52
- Links originais (requerem login Google):
  - Original 1: https://lookerstudio.google.com/embed/u/0/reporting/5bef39f9-0026-4292-99db-b9f033e6d906/page/p_o4rwzqt1ld
  - Original 2: https://lookerstudio.google.com/embed/u/0/reporting/f6a4d574-981a-4ed4-984a-019f9a97504e/page/p_o4rwzqt1ld

### ClickUp + N8N (Jul/2025 – hoje)
- CRM automatizado via WF-CAPTURE (ChatGuru + Waspeed → ClickUp)
- Pipeline de contrato: WF-CONTRACT (8 microfluxos)
- Pipeline financeiro: WF-ASAAS
- Fonte de dados confiável — sem dependência de preenchimento manual
- **Lacuna atual:** Dashboard visual equivalente ao Looker Studio ainda não reconstruído para 2026

---

## 3. ARQUITETURA DOS DASHBOARDS LOOKER STUDIO

### Dashboard Comercial (equipe vê — sem dados financeiros)

**Metas configuradas:**
| Horizonte | Meta |
|-----------|------|
| Contratos/Dia | 4 |
| Contratos/Semana | 16 |
| Contratos/Mês | 76 |

**Funil de Vendas (5 fases):**
1. Leads → Desqualificados / Qualificados
2. Agendamentos → Agendamentos Qualificados
3. Reuniões Realizadas → Agendou e compareceu
4. Contratos Mês → Reuniões em contratos
5. Base → Leads em contratos

**6 KPIs de topo:**
- Contratos | Repescagem | Leads Qualificados | Conversão | Tempo Conversão | Indecisos Pós Reunião (destaque vermelho = indicador crítico)

**6 Estágios CRM:**
1. Lead quente
2. Aguardando Envio dos Documentos
3. Aguardando Assinatura do Contrato
4. Pós Reunião não respondeu mais
5. Pós Reunião Não Quis Fechar
6. Pós Reunião Pagamento Atrasado

**Painéis analíticos:**
- Origem do Lead Qualificado (gráfico de barras)
- Objeções dos Leads Qualificados
- Serviço Vendido

### Dashboard Financeiro (só Dr. Henrique)

**Metas configuradas:**
| Indicador | Meta |
|-----------|------|
| Contratos/Mês | 100 |
| Faturamento/Mês | R$200.000 |

**KPIs adicionais (sobre o dashboard comercial):**
- Valor Pago | Valor Médio por contrato | Faturado vs Meta
- Ranking de SDRs (Atendimento × Contratos)
- Contratos Concluídos (Nome | Cliente)
- Pós Reunião (Cliente | Objeção)
- Principais Objeções | Serviço Vendido (com escala gráfica)

**Lógica da meta dual (76 equipe vs 100 Dr. Henrique):**
A equipe corre para 76 contratos. Dr. Henrique controla para 100. A diferença de 24 contratos é margem de segurança planejada — prática saudável de gestão de metas em cascata.

---

## 4. HISTÓRICO COMPLETO DE DADOS

| Mês | Fase | Leads | Contratos | Ticket Médio | Faturado | Caixa Recebido | % Pago |
|-----|------|-------|-----------|-------------|----------|----------------|--------|
| Mai/24 | 🏠 Home Office | 233 | 37 | ~R$1.700 | — | — | — |
| Jun/24 | 🔄 Virada Presencial | 281 | 36 | ~R$1.700 | — | — | — |
| Jul/24 | 🏢 Presencial | 628 | 57 | ~R$1.750 | — | — | — |
| **Ago/24** | 🏢 Presencial | **663** | **67** ← pico contratos | ~R$1.750 | — | — | — |
| Set/24 | 🏢 Presencial | 594 | 35 | — | — | — | — |
| Out/24 | 🏢 Presencial | — | — | — | — | — | — |
| Nov/24 | 🏢 Presencial | — | — | — | — | — | — |
| Dez/24 | 🏢 Presencial | 79* | 11* | — | — | — | — |
| Jan/25 | 🏢 Presencial | 293 | ~42 | — | R$150.629 | R$137.791 | 91,5% |
| Fev/25 | 🏢 Presencial | 480 | ~34 | — | R$122.889 | R$113.321 | 92,2% |
| Mar/25 | 🏢 Presencial | 477 | ~24 | — | R$121.742 | R$110.174 | 90,5% |
| Abr/25 | 🏢 Presencial | — | — | — | R$131.080 | R$114.118 | 87,1% |
| Mai/25 | 🏢 Presencial | — | — | — | R$117.440 | R$102.931 | 87,6% |
| Jun/25 | 🏢 Presencial | 478 | ~25 | R$2.564 | R$141.403 | R$126.741 | 89,6% |
| **Jul/25** | 🏢 Presencial | **512** | **49** | **R$2.561** | **R$164.691** | **R$143.931** | 87,4% ← pico financeiro |
| Ago/25 | 📉 Ruptura | 58* | ~3* | R$2.615 | R$123.818 | R$104.057 | 84,0% |
| Set/25 | 📉 Queda | — | ~68† | — | R$102.938 | R$91.054 | 88,5% |
| Out/25 | 📉 Queda | — | ~60† | — | R$99.992 | R$95.060 | 95,1% |
| Nov/25 | 📉 Queda | — | ~62† | — | R$106.735 | R$99.837 | 93,5% |
| Dez/25 | 🔧 ClickUp | ~91 | 42 ✓ | R$2.830 | R$117.388 | R$100.169 | 85,3% |
| Jan/26 | 🔧 ClickUp | ~72 | 34 ✓ | R$2.758 | R$91.233 | R$76.955 | 84,4% |
| Fev/26 | 🔧 ClickUp | ~67 | 26 ✓ | R$2.607 | R$84.142 | R$65.286 | 77,6% |
| Mar/26* | 🔧 ClickUp | ~61 | 13+ ✓ | — | R$73.545* | R$43.093 | 58,6%* |

*Dado parcial ou incompleto | †Estimativa Asaas | ✓ Confirmado ClickUp

---

## 5. TICKET MÉDIO — ESTRUTURA REAL

**Faixa atual (trânsito core):** R$2.250 a R$2.600
**Ponto médio adotado para cálculos:** R$2.425
**Ticket alto:** Criminal (ex: ANPP = R$6.000) OU duplo serviço (dois casos no mesmo cliente)
**Duplo serviço:** Ex. bafômetro + suspensão de pontos = dois contratos na mesma reunião

---

## 6. METAS — HISTÓRICO E OBJETIVOS

**Metas configuradas nos dashboards (período áureo):**
- Equipe: 4 contratos/dia | 16/semana | 76/mês
- Dr. Henrique: 100 contratos/mês | R$200.000/mês

**Melhor resultado real atingido:**
- Contratos: 67/mês (Ago/24) = 67% da meta de 100
- Faturamento: R$164.691 (Jul/25) = 82% da meta de R$200k
- Conclusão: meta nunca foi atingida — existe espaço de crescimento dentro do modelo atual

**Meta atual (Mar/26):** R$159.802 (revisada de R$160k)
- Recebido até 18/03: R$43.093
- Restante: R$116.905 em 13 dias úteis

---

## 7. MATEMÁTICA PARA R$200K/MÊS

### Cenário trânsito puro (ticket R$2.425)
R$200.000 ÷ R$2.425 = **83 contratos/mês**

### Cenário ticket otimista (R$2.600)
R$200.000 ÷ R$2.600 = **77 contratos/mês**

### Cenário com mix criminal/duplo (10% dos contratos a R$6.000)
Ticket médio ponderado = R$2.783 → R$200k com **72 contratos/mês**

### Funil reverso para 83 contratos/mês
- 83 contratos fechados
- Closer a 50% → 166 reuniões necessárias
- Comparecimento 60% → 277 agendamentos
- Qualificação 30% → 923 leads/mês → **31 leads qualificados/dia**

**Gargalo identificado:** não é volume de leads (Mar/26 já tem ~61 leads/dia) — é a taxa de agendamento e presença nas reuniões.

### Alavanca do duplo serviço
Se 15% dos fechamentos forem duplos: mesmo número de clientes atendidos, +15% de faturamento sem precisar de mais leads.

---

## 8. DIAGNÓSTICO DA INADIMPLÊNCIA

**Evolução da taxa de pagamento:**
- Jan/25: 91,5% pago
- Jul/25: 87,4% pago (pico financeiro mas já com queda de adimplência)
- Fev/26: 77,6% pago ← mínima histórica

**Causa identificada:** Mix de canal poluído com Instagram Stories/Reels (2025) trouxe leads sem urgência real → contrataram mas não pagaram → adimplência caiu 14 pontos percentuais

**Correção em andamento:** Retorno ao Google Ads (Feed) como canal principal → leads com urgência real → Mar/26 já mostra conversão de 9,5% (melhor recente) e adimplência deve se recuperar nos próximos meses.

**Total inadimplente acumulado (Jan/25–Mar/26):** R$188.946

---

## 9. CANAIS DE MARKETING — HISTÓRICO

| Período | Canal Principal | Impacto |
|---------|----------------|---------|
| 2024 | Google Ads + Instagram + TikTok | Volume alto, ticket menor |
| 2025 (1º sem) | Instagram Stories/Reels dominando | Desqualificação 50-54%, adimplência caindo |
| Ago–Set/2025 | OAuth Google expirou (11 dias sem dados) | Google degradou + Stories piorou tudo |
| Out/2025–hoje | Retorno ao Google Ads Feed | Conversão 9,5% em Mar/26, qualidade voltando |

---

## 10. FONTES E METODOLOGIA DE COLETA

| Fonte | Período | O que contém | Como acessar |
|-------|---------|-------------|-------------|
| Google Sheets CRM | Mai/2024–Jun/2025 | Leads, contratos, origem, closer, valor | gviz/tq?tqx=out:csv (público) |
| Looker Studio | Mai/2024–Jun/2025 | Dashboard visual (agora sem dados) | Links acima (login Google) |
| Asaas API | Jan/2025–Mar/2026 | Faturamento, pagamentos, inadimplência | GET /v3/payments |
| ClickUp CRM | Jul/2025–hoje | Contratos confirmados, status, valor | API ClickUp (token 1Password) |

---

*Arquivo criado em: 18/03/2026*
*Próxima atualização: quando novos dados históricos forem confirmados*

---

## 11. PLANO ANUAL 2026 — META R$2,5 MILHÕES

> Confirmado por Dr. Henrique em 18/03/2026

### Números reais de 2025
| Métrica | Valor |
|---------|-------|
| Total faturado 2025 | R$1.500.745 |
| Total recebido 2025 | **R$1.339.184** |
| Média mensal recebida 2025 | R$111.598/mês |

### Meta 2026
- **Meta total recebido:** R$2.500.000
- **Crescimento necessário:** +R$1.160.816 (+86,7% sobre 2025)
- **Média mensal necessária:** R$208.333/mês

### Situação atual (18/03/2026)
- Já recebido Jan-Mar/26: R$185.334
- Falta para atingir a meta: R$2.314.666
- Meses restantes (Abr-Dez): 9 meses
- **Média mensal necessária Abr-Dez para fechar a meta: R$257.185/mês**

### Estratégia declarada para atingir R$2,5M
Dr. Henrique confirmou que a meta não será atingida apenas com trânsito. Novos braços incluem:
- Trânsito (core) — base do negócio
- Criminal / ANPP — ticket alto (R$6.000+)
- Cobrança — novo braço
- Outras áreas a definir

> "Não discutimos sobre isso ainda em detalhes" — tópico a aprofundar

### Ramp-up necessário (cenário Abr–Dez/26)
Para sair do vale atual (~R$65-84k) e chegar à média de R$257k:

| Mês | Meta Recebimento |
|-----|-----------------|
| Abr/26 | R$130.000 |
| Mai/26 | R$160.000 |
| Jun/26 | R$190.000 |
| Jul/26 | R$220.000 |
| Ago/26 | R$250.000 |
| Set/26 | R$270.000 |
| Out/26 | R$280.000 |
| Nov/26 | R$290.000 |
| Dez/26 | R$300.000 |
| **Total Abr-Dez** | **~R$2.090.000** |
| + Jan-Mar recebido | R$185.334 |
| **Total 2026 projetado** | **~R$2.275.000** |

> Observação: mesmo com ramp-up agressivo (R$130k em Abr chegando a R$300k em Dez), a meta de R$2,5M exige que os novos braços (criminal, cobrança, outras áreas) contribuam com ~R$225k ao longo do ano para fechar o gap.

