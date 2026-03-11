# ClickUp — Estrutura e Padrões H.A. Advocacia

**Registrado:** 03/03/2026 13h15

---

## VISUALIZAÇÃO PADRÃO

**Dr. Henrique usa MAPA MENTAL**

Sempre criar tarefas pensando nessa visualização.

---

## HIERARQUIA CORRETA

```
Workspace: H. A. Advocacia (9011774778)
└── Espaço: Gestão e Estratégia (90113182196)
    └── Pasta: Execuções Mensais (90117567885)
        └── Lista: Março (901113249320)
            └── SEMANA 01 (01/03 - 07/03) [ID: 868hp456r]
                ├── Dia 01/03
                ├── Dia 02/03
                ├── Dia 03/03 ← AQUI
                │   ├── Setor Comercial
                │   ├── Setor Jurídico
                │   ├── Setor Financeiro
                │   ├── Suporte
                │   ├── Pessoal
                │   └── Gestão/Infraestrutura
                ├── Dia 04/03
                ├── Dia 05/03
                ├── Dia 06/03
                └── Dia 07/03
```

---

## PROTOCOLO DE CRIAÇÃO

### Passo 1 — Identificar Semana
Buscar tarefa SEMANA correta pelo nome ou data:
```bash
curl -X GET "https://api.clickup.com/api/v2/list/901113249320/task" \
  -H "Authorization: $CLICKUP_TOKEN" \
  | jq '.tasks[] | select(.name | contains("SEMANA"))'
```

### Passo 2 — Identificar Dia
Buscar sub-tarefa do Dia dentro da Semana:
```bash
curl -X GET "https://api.clickup.com/api/v2/task/{SEMANA_ID}" \
  -H "Authorization: $CLICKUP_TOKEN" \
  | jq '.subtasks[] | select(.name | contains("Dia 03/03"))'
```

### Passo 3 — Criar Tarefa do Dia (se não existir)
**NOME OBRIGATÓRIO: "Dia XX/XX"** (simples, sem dia da semana, sem ano)

```json
{
  "name": "Dia 03/03",
  "parent": "{SEMANA_ID}",
  "priority": 2
}
```

❌ **ERRADO:** "03/03/2026 — Terça-feira"  
❌ **ERRADO:** "Terça-feira 03/03"  
✅ **CORRETO:** "Dia 03/03"

### Passo 4 — Criar Sub-tarefas por Setor
Dentro do Dia, criar:
- 🔴 Setor Comercial (Urgente)
- 🟡 Setor Jurídico (Alta/Urgente)
- 🟢 Suporte ao Cliente (Normal)
- 🟡 Setor Financeiro (Alta)
- 🏋️ Pessoal (Alta)
- ⚙️ Gestão e Estratégia (Alta)
- 🚨 Crítico — Infraestrutura (Urgente, quando aplicável)

```json
{
  "name": "🔴 SETOR COMERCIAL",
  "parent": "{DIA_ID}",
  "description": "Tarefas detalhadas...",
  "priority": 1
}
```

---

## EMOJIS PADRÃO

- 🔴 Comercial (urgente)
- 🟡 Jurídico (urgente/alta)
- 🟢 Suporte (normal)
- 🟡 Financeiro (alta)
- 🏋️ Pessoal (alta)
- ⚙️ Gestão/Estratégia (alta)
- 🚨 Crítico/Infraestrutura (urgente)

---

## PRIORIDADES CLICKUP

- **1 = Urgent** (🔴 vermelho)
- **2 = High** (🟡 amarelo)
- **3 = Normal** (🔵 azul)
- **4 = Low** (⚪ cinza)

**Regra:**
- Comercial (meta diária) = Urgent
- Jurídico (produções) = Urgent ou High
- Crítico/Infraestrutura = Urgent
- Pessoal (saúde) = High
- Restante = High ou Normal

---

## CAMPOS OBRIGATÓRIOS

Toda tarefa deve ter:
- ✅ **name** — claro, objetivo, com emoji
- ✅ **parent** — ID da tarefa pai (Dia ou Semana)
- ✅ **description** — contexto completo, bullets organizados
- ✅ **priority** — 1 a 4
- ⚠️ **status** — default "to do" (não alterar sem autorização)

---

## ERROS A EVITAR

❌ **Criar tarefa diretamente na Lista** (sem parent)  
✅ Sempre criar dentro de SEMANA → Dia

❌ **Parent errado** (ex: parent = null)  
✅ Buscar ID correto da SEMANA ou Dia

❌ **Visualização diferente** (Lista, Board)  
✅ Pensar sempre em Mapa Mental

❌ **Emojis inconsistentes**  
✅ Seguir padrão definido acima

❌ **Descrição vazia ou genérica**  
✅ Detalhar tarefas, subtarefas, contexto

---

## EXEMPLO COMPLETO

**Criar tarefas do dia 05/03/2026:**

```bash
# 1. Buscar SEMANA 01
SEMANA_ID="868hp456r"

# 2. Buscar ou criar Dia 05/03
DIA_ID=$(curl -X POST "https://api.clickup.com/api/v2/list/901113249320/task" \
  -H "Authorization: $CLICKUP_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dia 05/03",
    "parent": "'$SEMANA_ID'",
    "priority": 2
  }' | jq -r '.id')

# 3. Criar sub-tarefa Comercial
curl -X POST "https://api.clickup.com/api/v2/list/901113249320/task" \
  -H "Authorization: $CLICKUP_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "🔴 SETOR COMERCIAL",
    "parent": "'$DIA_ID'",
    "description": "Meta: 3 contratos\n- Ação 1\n- Ação 2",
    "priority": 1
  }'

# Repetir para demais setores...
```

---

**Última atualização:** 03/03/2026 13h15  
**Regra estabelecida:** Sempre criar dentro da hierarquia SEMANA → Dia  
**Visualização:** Mapa Mental (padrão Dr. Henrique)
