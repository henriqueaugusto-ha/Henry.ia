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

---

## ⚠️ ERROS CRÍTICOS — Semana 12-20/03 (NÃO REPETIR)

### ERRO 1 — Extração de PDF na ordem errada (19/03)
- Tentei: ZapSign → pdftotext → pypdf → pdf-parse → Stirling PDF → pdf nativa (última)
- Perdi ~30 min. A ferramenta `pdf` nativa do OpenClaw funcionou em segundos.
- **Regra permanente:** extração de PDF = ferramenta `pdf` nativa PRIMEIRO. Só tentar outras se nativa falhar.

### ERRO 2 — Ambiguidade de fonte não resolvida (19/03)
- "20 contratos em Março" — havia ambiguidade: CRM ou Central do Cliente?
- Não perguntei antes de buscar — executei com premissa errada
- **Regra:** ambiguidade de fonte = perguntar antes de buscar. Nunca assumir.

### ERRO 3 — Correção executada sem anunciar efeitos colaterais (semana)
- Corrigi workflow diretamente sem apresentar: o que muda + o que pode ser afetado
- Dr. Henrique teve que parar e pedir diagnóstico explícito
- **Regra:** antes de qualquer correção → apresentar O QUE muda e O QUE PODE ser afetado → aguardar ok

---

## Estrutura Central do Cliente (confirmada 19/03/2026)

- Tarefa principal = ação judicial (recurso, defesa prévia, processo)
- Subtarefa = AIT individual (ação administrativa)
- Múltiplos AITs = múltiplas subtarefas separadas (uma por AIT)
- Pipeline: ADVbox F14 → F15 → F16 → Asaas (nessa ordem, sempre)

## Órgãos ADVbox (IDs confirmados)

- DETRAN-CE: `14204088`
- PRF-CE: `14204089`
- AMC Fortaleza: `14204092`

## MF02 — Formato obrigatório

**SEMPRE texto com labels — NUNCA JSON:**
```
CPF: 000.000.000-00
Valor Total: R$ 3.000,00
Vencimento: 25/03/2026
Parcelas: 3x R$ 1.000,00
```
O pipeline `OwXrNkgiCqRykq7O` usa regex para ler MF02. JSON falha silenciosamente.

## Asaas — Protocolo obrigatório

- GET (consulta): autônomo
- POST/PUT/DELETE: exige frase exata **"CONFIRMO A EXECUÇÃO"**
- Verificar ADVbox cadastrado ANTES de criar cobrança no Asaas

---

**Última atualização:** 20/03/2026  
**Regra estabelecida:** Sempre criar dentro da hierarquia SEMANA → Dia  
**Visualização:** Mapa Mental (padrão Dr. Henrique)
