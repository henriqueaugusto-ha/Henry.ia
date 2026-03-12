# PROMPT — Recriar Dashboard "Painéis" no CRM Março 2026
> Gerado por Henry em 12/03/2026 — H.A. Advocacia

---

## CONTEXTO

Você é um agente com acesso ao navegador. Sua missão é recriar o dashboard "Painéis" do CRM 2025 / Novembro dentro da lista **CRM_2026 / Março**, no ClickUp do escritório H.A. Advocacia.

O dashboard já existe na lista de Março — você só precisa **configurar os widgets**.

---

## CREDENCIAIS E ACESSO

- Acesse: https://app.clickup.com
- Faça login com: **adv.henriqueaugusto@gmail.com**
- Após login, navegue até: **Setor Comercial → CRM_2026 → Março**
- Dentro da lista Março, clique na view chamada **"Painéis"** (ícone de dashboard)

---

## REFERÊNCIA — O QUE ESTAVA NO PAINEL DE NOVEMBRO/2025

O painel original tinha **15 widgets** organizados em **4 linhas**. Recrie exatamente na mesma estrutura abaixo.

---

## LINHA 1 — Visão Geral do Mês

### Widget 1: KPI Numérico — "Total de Leads Ativos - Mês"
- **Tipo:** Card de número / KPI (Calculation widget)
- **O que conta:** Todas as tarefas da lista (todos os status ativos)
- **Filtro de data:** Mês atual (March 2026)
- **Configuração:** Count of tasks — sem filtro de status (todos)
- **Tamanho sugerido:** pequeno (1/4 da largura)

### Widget 2: KPI Numérico — "Leads Novos - Mês"
- **Tipo:** Card de número / KPI
- **O que conta:** Tarefas onde campo **"Origem"** NÃO é "REPESCAGEM"
- **Filtro de data:** Mês atual
- **Configuração:** Count of tasks com filtro Origem ≠ Repescagem
- **Tamanho sugerido:** pequeno (1/4 da largura)

### Widget 3: KPI Numérico — "Leads Repescagem"
- **Tipo:** Card de número / KPI
- **O que conta:** Tarefas com status **"oportunidade - repescagem"** OU campo Origem = "Repescagem"
- **Filtro de data:** Mês atual
- **Configuração:** Count of tasks com status = "oportunidade - repescagem"
- **Tamanho sugerido:** pequeno (1/4 da largura)

### Widget 4: Gráfico de Barras — "Leads do Mês (Dia a Dia)"
- **Tipo:** Bar Chart (Stacked / Empilhado)
- **Eixo X:** Data de criação da tarefa (agrupado por dia)
- **Eixo Y:** Quantidade de tarefas
- **Segmentação (cores das barras):** por campo **"Origem"** (canal de captação)
- **Filtro de data:** Mês atual (março 2026)
- **Tamanho sugerido:** largo (3/4 da largura ou largura total)

---

## LINHA 2 — Qualificação de Leads

### Widget 5: Donut — "Qualificados / Mês"
- **Tipo:** Pie/Donut Chart
- **O que mede:** Distribuição de leads que avançaram no funil, por status
- **Filtros de status incluídos (esses são os "qualificados"):**
  - aquecendo para reunião
  - reunião marcada
  - faltou reunião
  - pós - reunião
  - aguardando assinatura
  - contrato fechado
- **Segmentação (fatias):** por Status
- **Filtro de data:** Mês atual

### Widget 6: Donut — "Por Canal de Captação"
- **Tipo:** Pie/Donut Chart
- **O que mede:** Todos os leads do mês distribuídos por origem
- **Segmentação (fatias):** por campo **"Origem"** (drop_down)
- **Filtro de data:** Mês atual
- **Inclui todos os status**

### Widget 7: Donut — "Desqualificados / Mês"
- **Tipo:** Pie/Donut Chart
- **O que mede:** Leads que foram desqualificados, por motivo
- **Filtros de status:**
  - desqualificado – filtro 1
  - desqualificado – filtro 2
  - desqualificado - filtro 3
- **Segmentação (fatias):** por campo **"Motivo de Desqualificação"**
- **Filtro de data:** Mês atual

---

## LINHA 3 — Reuniões Agendadas + Funil

### Widget 8: Donut — "Reuniões Agendadas / Origem de Leads"
- **Tipo:** Pie/Donut Chart
- **O que mede:** Reuniões agendadas no mês, distribuídas por canal de origem
- **Filtros de status:**
  - reunião marcada
  - faltou reunião
  - pós - reunião
  - aguardando assinatura
  - contrato fechado
- **Segmentação (fatias):** por campo **"Origem"**
- **Filtro de data:** Mês atual

### Widget 9: KPI Numérico — "Reuniões Agendadas / Semana"
- **Tipo:** Card de número / KPI
- **O que conta:** Tarefas com status "reunião marcada" criadas ou com data de reunião na semana atual
- **Filtro de data:** Semana atual (this week)
- **Campo de data usado:** campo "Data da Reunião"
- **Tamanho sugerido:** pequeno

### Widget 10: KPI Numérico — "Reuniões Agendadas / Dia"
- **Tipo:** Card de número / KPI
- **O que conta:** Mesmo que Widget 9 mas filtro = Hoje (today)
- **Campo de data usado:** campo "Data da Reunião"
- **Tamanho sugerido:** pequeno

### Widget 11: Gráfico de Barras — "Funil - CRM - Mês"
- **Tipo:** Bar Chart (barras verticais simples, não empilhadas)
- **O que mede:** Quantidade de leads em cada etapa do funil
- **Eixo X:** Status do lead (cada barra = 1 status)
- **Eixo Y:** Quantidade de tarefas
- **Status a incluir (ordem do funil):**
  1. não interagiu
  2. oportunidade - mês
  3. oportunidade - repescagem
  4. aquecendo para reunião
  5. faltou reunião
  6. pós - reunião
  7. aguardando assinatura
- **Filtro de data:** Mês atual
- **Cores:** usar as cores de status padrão do ClickUp

---

## LINHA 4 — Reuniões Realizadas

### Widget 12: Donut — "Reuniões Realizadas / Origem de Leads"
- **Tipo:** Pie/Donut Chart
- **O que mede:** Reuniões que efetivamente aconteceram, por origem do lead
- **Filtro:** campo **"Presença"** = valores que indicam presença confirmada (ex: "Compareceu", "Sim", ou equivalente)
- **Alternativa se não tiver campo Presença:** filtrar por status "pós - reunião" + "aguardando assinatura" + "contrato fechado"
- **Segmentação (fatias):** por campo "Origem"
- **Filtro de data:** Mês atual

### Widget 13: KPI Numérico — "Reuniões Realizadas / Semana"
- **Tipo:** Card de número / KPI
- **O que conta:** Reuniões com presença confirmada na semana atual
- **Filtro de data:** Semana atual (this week) — usar campo "Data da Reunião"
- **Tamanho sugerido:** pequeno

### Widget 14: KPI Numérico — "Reuniões Realizadas / Hoje"
- **Tipo:** Card de número / KPI
- **O que conta:** Reuniões com presença confirmada hoje
- **Filtro de data:** Hoje (today) — usar campo "Data da Reunião"
- **Tamanho sugerido:** pequeno

### Widget 15: Gráfico de Barras — "Reuniões Realizadas por Dia"
- **Tipo:** Bar Chart (Stacked / Empilhado)
- **O que mede:** Quantidade de reuniões realizadas por dia no mês
- **Eixo X:** Data da reunião (agrupado por dia)
- **Eixo Y:** Quantidade de tarefas
- **Segmentação (cores):** por campo "Origem"
- **Filtro:** campo "Presença" = confirmada (ou status pós-reunião em diante)
- **Filtro de data:** Mês atual

---

## INSTRUÇÕES DE EXECUÇÃO

1. Acesse o ClickUp e navegue até a view "Painéis" da lista Março (CRM_2026)
2. Se o painel estiver vazio, clique em **"+ Add Widget"** ou **"Add a card"**
3. Adicione os widgets na ordem das linhas acima (1 a 15)
4. Para cada widget:
   - Selecione o tipo correto (number/KPI, bar chart, pie/donut)
   - Configure o nome exato como indicado
   - Aplique os filtros de status e campos conforme descrito
   - Ajuste o período para "This Month" em todos
5. Organize os widgets em 4 linhas conforme a estrutura acima
6. Salve a view

---

## OBSERVAÇÕES IMPORTANTES

- A lista de destino é: **CRM_2026 → Março** (ID: 901113249319)
- O campo "Origem" é o canal de captação (Google, Meta, Instagram, Indicação, etc.)
- Os status de desqualificação têm 3 filtros: filtro 1, filtro 2, filtro 3
- Use "Data de Entrada" como campo de data padrão quando não especificado
- Use "Data da Reunião" para widgets de reunião
- Se algum widget não permitir o filtro exato descrito, use a aproximação mais próxima e anote o que foi diferente

---

*Prompt gerado por Henry — H.A. Advocacia — 12/03/2026*
