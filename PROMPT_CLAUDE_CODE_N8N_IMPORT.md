# PROMPT — Claude Code: Reimportar Workflows N8N via UI (Fix Webhook 404)

---

## Função da IA
Você é um agente de automação com acesso ao browser do computador. Sua missão é resolver um bug técnico no N8N: 7 workflows têm webhooks que retornam 404 porque foram criados via API e o N8N não registrou os webhooks no cache de memória. A solução é deletar cada workflow via API e reimportá-los via UI do N8N usando os JSONs fornecidos neste prompt.

---

## Objetivo Principal
Fazer com que os seguintes webhooks retornem HTTP 200 ao receber um POST:

| Webhook Path | Workflow |
|---|---|
| `wf-com-contract-mf01` | MF01 CONTRACT |
| `wf-com-contract-mf02` | MF02 CONTRACT |
| `wf-com-contract-mf03` | MF03 CONTRACT |
| `wf-com-contract-mf04` | MF04 CONTRACT |
| `wf-com-contract-mf05` | MF05 CONTRACT |
| `wf-com-ads-mf03-fechamento` | MF03 ADS |
| `wf-ponte-mf03-to-f1f5` | WF PONTE |

---

## Contexto Operacional
- N8N URL: `https://n8n.srv1380728.hstgr.cloud`
- N8N API Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjMjI5YjA2Ni03NmE5LTQ1OGUtOWY4Ny1jZmUyZTJhMGQ1NjEiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiM2MzYzAxNmItMTgyMy00NzQ2LTk4ZjMtYTg4M2Y5ZjFiNTAzIiwiaWF0IjoxNzcyNDIyNjgxLCJleHAiOjE3NzQ5OTQ0MDB9.MM8pt3acXnYEHFaAyPuaA_WCWr9HznKKJcD0afgqeOM`
- Todos os workflows estão ativos mas com webhook 404
- Não existe credencial de login/senha do N8N (o painel está aberto sem login, ou você pode precisar verificar)

---

## Escopo Exato
Você vai:
1. Deletar os 7 workflows antigos via API N8N
2. Para cada um, criar um arquivo JSON temporário em `/tmp/`
3. Abrir o N8N no browser
4. Importar cada JSON via `Workflows → Add Workflow → Import from File`
5. Ativar cada workflow pelo toggle superior direito
6. Testar todos os webhooks ao final
7. Reportar o resultado com status de cada webhook (200 ou erro)

---

## Regras Críticas
❌ NÃO altere nenhum campo dentro dos JSONs (nodes, connections, credenciais, paths de webhook)
❌ NÃO ative workflows pela API após importar (ativar SEMPRE pela UI do N8N — esse é o ponto do fix)
❌ NÃO pule o passo de deletar o antigo antes de importar o novo (IDs conflitam)
❌ NÃO tente fazer toggle off/on nos workflows existentes — isso NÃO resolve, já foi testado
✅ Após importar e ativar cada workflow, aguarde 2 segundos antes de testar o webhook
✅ Se ao abrir o N8N aparecer uma tela de login, informe o usuário e aguarde credenciais

---

## IDs para Deletar (via API antes de importar)

```
KjBqA3MSkAx6OlZK  →  MF01 CONTRACT
ZQVUosq3fw6qpRdU  →  MF02 CONTRACT
NRgbqr07lbtLlU0h  →  MF03 CONTRACT
a6IaDHiluCP5XS3V  →  MF04 CONTRACT
aF8qpx10N2Pqb3u5  →  MF05 CONTRACT
XIHxz7u2KxHryLwN  →  MF03 ADS
yOCjYLU981R6ioWg  →  WF PONTE
```

**Comando para deletar cada um:**
```bash
curl -s -X DELETE "https://n8n.srv1380728.hstgr.cloud/api/v1/workflows/{ID}" \
  -H "X-N8N-API-KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjMjI5YjA2Ni03NmE5LTQ1OGUtOWY4Ny1jZmUyZTJhMGQ1NjEiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiM2MzYzAxNmItMTgyMy00NzQ2LTk4ZjMtYTg4M2Y5ZjFiNTAzIiwiaWF0IjoxNzcyNDIyNjgxLCJleHAiOjE3NzQ5OTQ0MDB9.MM8pt3acXnYEHFaAyPuaA_WCWr9HznKKJcD0afgqeOM"
```

---

## Passo a Passo Obrigatório

### FASE 1 — Salvar JSONs em disco

Crie os seguintes arquivos em `/tmp/`:

**`/tmp/n8n_mf01.json`** — conteúdo:
```json
INSERIR_JSON_MF01
```

**`/tmp/n8n_mf02.json`** — conteúdo:
```json
INSERIR_JSON_MF02
```

**`/tmp/n8n_mf03_contract.json`** — conteúdo:
```json
INSERIR_JSON_MF03
```

**`/tmp/n8n_mf04.json`** — conteúdo:
```json
INSERIR_JSON_MF04
```

**`/tmp/n8n_mf05.json`** — conteúdo:
```json
INSERIR_JSON_MF05
```

**`/tmp/n8n_mf03_ads.json`** — conteúdo:
```json
INSERIR_JSON_MF03_ADS
```

**`/tmp/n8n_wf_ponte.json`** — conteúdo:
```json
INSERIR_JSON_WF_PONTE
```

### FASE 2 — Deletar workflows antigos via API

Execute via terminal (substitua `{ID}` por cada ID da lista acima):
```bash
for ID in KjBqA3MSkAx6OlZK ZQVUosq3fw6qpRdU NRgbqr07lbtLlU0h a6IaDHiluCP5XS3V aF8qpx10N2Pqb3u5 XIHxz7u2KxHryLwN yOCjYLU981R6ioWg; do
  echo "Deletando $ID..."
  curl -s -X DELETE "https://n8n.srv1380728.hstgr.cloud/api/v1/workflows/$ID" \
    -H "X-N8N-API-KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjMjI5YjA2Ni03NmE5LTQ1OGUtOWY4Ny1jZmUyZTJhMGQ1NjEiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiM2MzYzAxNmItMTgyMy00NzQ2LTk4ZjMtYTg4M2Y5ZjFiNTAzIiwiaWF0IjoxNzcyNDIyNjgxLCJleHAiOjE3NzQ5OTQ0MDB9.MM8pt3acXnYEHFaAyPuaA_WCWr9HznKKJcD0afgqeOM"
  echo " ✓"
done
```

### FASE 3 — Importar via UI do N8N (CRÍTICO — fazer pela UI, não API)

Para cada arquivo JSON (em qualquer ordem):

1. Abrir `https://n8n.srv1380728.hstgr.cloud`
2. Clicar em **"Add Workflow"** (botão `+` no canto superior ou menu lateral)
3. No workflow vazio que abrir, clicar no menu `...` (três pontos) → **"Import from File"**
   - Alternativa: usar atalho `Ctrl+O` ou `Cmd+O`
4. Selecionar o arquivo `/tmp/n8n_mf01.json` (ou o arquivo correspondente)
5. Confirmar que o nome do workflow apareceu corretamente no topo
6. Clicar no **toggle "Inactive → Active"** no canto superior direito
7. Aguardar confirmação de ativação
8. Repetir para os próximos 6 arquivos

### FASE 4 — Testar todos os webhooks

Após ativar todos, aguardar 3 segundos e executar:

```bash
for PATH in wf-com-contract-mf01 wf-com-contract-mf02 wf-com-contract-mf03 wf-com-contract-mf04 wf-com-contract-mf05 wf-com-ads-mf03-fechamento wf-ponte-mf03-to-f1f5; do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "https://n8n.srv1380728.hstgr.cloud/webhook/$PATH" \
    -H "Content-Type: application/json" -d '{"test":true}')
  echo "$CODE | $PATH"
done
```

**Resultado esperado:** todos retornando `200`.

---

## Critérios de Sucesso
- Todos os 7 webhooks retornam `200` no teste final
- Os workflows aparecem como `Active` na lista do N8N
- Nenhum workflow antigo com os mesmos nomes coexiste (duplicatas)

---

## Formato de Resposta
Ao final, reportar:
```
✅ CONCLUÍDO — Resultado dos webhooks:
200 | wf-com-contract-mf01
200 | wf-com-contract-mf02
200 | wf-com-contract-mf03
200 | wf-com-contract-mf04
200 | wf-com-contract-mf05
200 | wf-com-ads-mf03-fechamento
200 | wf-ponte-mf03-to-f1f5
```

Se algum falhar, informar o erro e o passo onde ocorreu.

---

## Trava Final
❌ NÃO declare sucesso se qualquer webhook ainda retornar 404.
❌ NÃO altere lógica, nomes de nós, credenciais ou paths dentro dos JSONs.
✅ Se encontrar tela de login no N8N, parar e informar o usuário.
✅ Se o DELETE retornar erro (workflow não encontrado), continuar para o próximo — é aceitável.

---

## JSONs dos Workflows (copiar exatamente)


### WF-COM | CONTRACT | MF01 → `/tmp/n8n_mf01.json`

```json
{
  "name": "WF-COM | CONTRACT | MF01 | Consolidar Dados do Contrato",
  "nodes": [
    {
      "id": "wh1",
      "name": "ClickUp Webhook",
      "position": [
        240,
        300
      ],
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "parameters": {
        "path": "wf-com-contract-mf01",
        "httpMethod": "POST",
        "responseMode": "onReceived",
        "responseCode": 200
      }
    },
    {
      "id": "code1",
      "name": "Verificar Status",
      "position": [
        460,
        300
      ],
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "parameters": {
        "jsCode": "\nconst body = $input.first().json.body || $input.first().json;\nconst newStatus = (\n  body.history_items?.[0]?.after?.status ||\n  body.task?.status?.status || ''\n).toLowerCase().trim();\n\nconst taskId = body.task_id || body.task?.id || '';\nconst isAguardando = newStatus === 'aguardando assinatura';\n\nreturn [{ json: { prosseguir: isAguardando && taskId !== '', taskId, newStatus } }];\n"
      }
    },
    {
      "id": "if1",
      "name": "É Aguardando Assinatura?",
      "position": [
        680,
        300
      ],
      "type": "n8n-nodes-base.if",
      "typeVersion": 2,
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": false,
            "leftValue": "",
            "typeValidation": "loose"
          },
          "conditions": [
            {
              "leftValue": "={{ $json.prosseguir }}",
              "rightValue": true,
              "operator": {
                "type": "boolean",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        }
      }
    },
    {
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "parameters": {
        "method": "GET",
        "url": "=https://api.clickup.com/api/v2/task/{{ $json.taskId }}?custom_fields=true",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "clickUpApi",
        "options": {}
      },
      "credentials": {
        "clickUpApi": {
          "id": "KZp4O2fXwvdyQsC8",
          "name": "ClickUp account"
        }
      },
      "name": "GET Task Completa",
      "id": "http1",
      "position": [
        900,
        200
      ]
    },
    {
      "id": "code2",
      "name": "Consolidar Dados",
      "position": [
        1120,
        200
      ],
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "parameters": {
        "jsCode": "\nconst task = $input.first().json;\nconst cf = task.custom_fields || [];\n\nfunction getVal(id) {\n  const f = cf.find(x => x.id === id);\n  if (!f || f.value == null) return '';\n  if (f.type_config?.options) {\n    const opt = f.type_config.options.find(o => o.orderindex === f.value || o.id === f.value);\n    return opt?.name || String(f.value);\n  }\n  if (f.type === 'date') return f.value ? new Date(parseInt(f.value)).toLocaleDateString('pt-BR') : '';\n  if (f.type === 'currency') return 'R$ ' + (parseFloat(f.value)/100).toLocaleString('pt-BR',{minimumFractionDigits:2});\n  return String(f.value).trim();\n}\n\nconst now = new Date();\nconst brt = new Date(now.getTime() - 3*3600000);\nconst dtBRT = brt.toLocaleString('pt-BR', {timeZone:'UTC'});\n\nconst dados = {\n  nome: task.name,\n  cpf: getVal('26b4ecd6-6963-4160-a554-30cd4f36a70c'),\n  rg: getVal('f36e9cb0-f9d2-4cb8-91ea-e5014a2566c7'),\n  cnh_numero: getVal('cbefb914-0e29-4611-b992-b689d0b0fbb1'),\n  cnh_categoria: getVal('eda497ef-b8aa-4c1a-a512-3de5b7245aa3'),\n  endereco: getVal('7eae45ba-94b4-4cb4-bd1b-927ef11b8107'),\n  numero_ait: getVal('e220c08f-03dd-487a-a8a2-6cf25e5bf9d3'),\n  orgao: getVal('6b771374-ef1b-42dd-af5a-ffb231e29112'),\n  uf: getVal('20fe659f-9eef-4aa4-b170-a7e00cd687e8'),\n  tipo_infracao: getVal('e104c668-ccc4-4a91-9dcb-6f52c6f823c5'),\n  data_infracao: getVal('ad630128-2859-40e7-a45a-a7639dfbce34'),\n  valor: getVal('b8647ffd-7a76-4790-90cf-8e6314e5e469'),\n  forma_pag: getVal('be4fac1c-4178-4a0c-8315-69747e2af05f'),\n  telefone: getVal('dd097c3b-5647-4535-9847-1026f6ea70c0'),\n  objeto: getVal('02b1dd48-1adf-4c70-b277-553ff8681b45'),\n};\n\nconst comentario = `📋 MF01 — BASE CONTRATUAL CONSOLIDADA\nData: ${dtBRT} (BRT)\n—\nCliente: ${dados.nome}\nCPF: ${dados.cpf || 'não preenchido'}\nRG: ${dados.rg || 'não preenchido'}\nCNH: ${dados.cnh_numero || 'não preenchido'} / Cat: ${dados.cnh_categoria || 'não preenchido'}\nEndereço: ${dados.endereco || 'não preenchido'}\n—\nAIT: ${dados.numero_ait || 'não preenchido'}\nÓrgão: ${dados.orgao || 'não preenchido'} / UF: ${dados.uf || 'não preenchido'}\nInfração: ${dados.tipo_infracao || 'não preenchido'}\nData da infração: ${dados.data_infracao || 'não preenchido'}\n—\nValor do contrato: ${dados.valor || 'não preenchido'}\nForma de pagamento: ${dados.forma_pag || 'não preenchido'}\n—\n✅ Dados consolidados. Pronto para MF02 — Gerar Minuta.`;\n\nreturn [{ json: { taskId: task.id, taskName: task.name, comentario, dados } }];\n"
      }
    },
    {
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "parameters": {
        "method": "POST",
        "url": "=https://api.clickup.com/api/v2/task/{{ $json.taskId }}/comment",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "clickUpApi",
        "options": {},
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\"comment_text\": {{ JSON.stringify($json.comentario) }}, \"notify_all\": false}"
      },
      "credentials": {
        "clickUpApi": {
          "id": "KZp4O2fXwvdyQsC8",
          "name": "ClickUp account"
        }
      },
      "name": "Postar Comentário MF01",
      "id": "http2",
      "position": [
        1340,
        200
      ]
    },
    {
      "id": "noop1",
      "name": "Encerrar",
      "position": [
        680,
        480
      ],
      "type": "n8n-nodes-base.noOp",
      "typeVersion": 1,
      "parameters": {}
    }
  ],
  "connections": {
    "ClickUp Webhook": {
      "main": [
        [
          {
            "node": "Verificar Status",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Verificar Status": {
      "main": [
        [
          {
            "node": "É Aguardando Assinatura?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "É Aguardando Assinatura?": {
      "main": [
        [
          {
            "node": "GET Task Completa",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Encerrar",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "GET Task Completa": {
      "main": [
        [
          {
            "node": "Consolidar Dados",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Consolidar Dados": {
      "main": [
        [
          {
            "node": "Postar Comentário MF01",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "settings": {
    "executionOrder": "v1",
    "callerPolicy": "workflowsFromSameOwner",
    "availableInMCP": false
  },
  "staticData": null
}
```

### WF-COM | CONTRACT | MF02 → `/tmp/n8n_mf02.json`

```json
{
  "name": "WF-COM | CONTRACT | MF02 | Gerar Minuta em Word Padrão",
  "nodes": [
    {
      "id": "wh1",
      "name": "Webhook MF02",
      "position": [
        240,
        300
      ],
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "parameters": {
        "path": "wf-com-contract-mf02",
        "httpMethod": "POST",
        "responseMode": "onReceived",
        "responseCode": 200
      }
    },
    {
      "id": "code1",
      "name": "Extrair TaskId",
      "position": [
        460,
        300
      ],
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "parameters": {
        "jsCode": "\nconst body = $input.first().json.body || $input.first().json;\nconst taskId = body.taskId || body.task_id || body.task?.id || '';\nreturn [{ json: { taskId, prosseguir: taskId !== '' } }];\n"
      }
    },
    {
      "id": "if1",
      "name": "Tem TaskId?",
      "position": [
        680,
        300
      ],
      "type": "n8n-nodes-base.if",
      "typeVersion": 2,
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": false,
            "leftValue": "",
            "typeValidation": "loose"
          },
          "conditions": [
            {
              "leftValue": "={{ $json.prosseguir }}",
              "rightValue": true,
              "operator": {
                "type": "boolean",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        }
      }
    },
    {
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "parameters": {
        "method": "GET",
        "url": "=https://api.clickup.com/api/v2/task/{{ $json.taskId }}?custom_fields=true",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "clickUpApi",
        "options": {}
      },
      "credentials": {
        "clickUpApi": {
          "id": "KZp4O2fXwvdyQsC8",
          "name": "ClickUp account"
        }
      },
      "name": "GET Task Completa",
      "id": "http1",
      "position": [
        900,
        200
      ]
    },
    {
      "id": "code2",
      "name": "Montar Placeholders",
      "position": [
        1120,
        200
      ],
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "parameters": {
        "jsCode": "\nconst task = $input.first().json;\nconst cf = task.custom_fields || [];\nconst cfMap = {};\nfor (const f of cf) cfMap[f.id] = f;\n\nconst getVal = (id) => {\n  const f = cfMap[id];\n  if (!f) return '';\n  if (f.type_config?.options) {\n    const opt = f.type_config.options.find(o => o.orderindex === f.value || o.id === f.value);\n    return opt?.name || String(f.value || '');\n  }\n  if (f.type === 'date') return f.value ? new Date(parseInt(f.value)).toLocaleDateString('pt-BR') : '';\n  if (f.type === 'currency') {\n    const v = f.value ? parseFloat(f.value)/100 : 0;\n    return 'R$ ' + v.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});\n  }\n  return f.value != null ? String(f.value).trim() : '';\n};\nconst getNum = (id) => {\n  const f = cfMap[id];\n  if (!f || !f.value) return 0;\n  if (f.type === 'currency') return parseFloat(f.value)/100;\n  return parseFloat(f.value)||0;\n};\n\nconst UF_NOME = {AC:'Acre',AL:'Alagoas',AM:'Amazonas',AP:'Amapá',BA:'Bahia',CE:'Ceará',DF:'Distrito Federal',\n  ES:'Espírito Santo',GO:'Goiás',MA:'Maranhão',MG:'Minas Gerais',MS:'Mato Grosso do Sul',MT:'Mato Grosso',\n  PA:'Pará',PB:'Paraíba',PE:'Pernambuco',PI:'Piauí',PR:'Paraná',RJ:'Rio de Janeiro',RN:'Rio Grande do Norte',\n  RO:'Rondônia',RR:'Roraima',RS:'Rio Grande do Sul',SC:'Santa Catarina',SE:'Sergipe',SP:'São Paulo',TO:'Tocantins'};\nconst COMARCA_MAP = {CE:'Fortaleza',PI:'Teresina',MA:'São Luís',BA:'Salvador',PE:'Recife',PB:'João Pessoa',\n  RN:'Natal',AL:'Maceió',SE:'Aracaju',PA:'Belém',AM:'Manaus',RJ:'Rio de Janeiro',SP:'São Paulo',\n  MG:'Belo Horizonte',PR:'Curitiba',SC:'Florianópolis',RS:'Porto Alegre',GO:'Goiânia',DF:'Brasília',\n  MT:'Cuiabá',MS:'Campo Grande',RO:'Porto Velho',AC:'Rio Branco',AP:'Macapá',RR:'Boa Vista',TO:'Palmas',ES:'Vitória'};\n\nconst uf = getVal('20fe659f-9eef-4aa4-b170-a7e00cd687e8');\nconst estadoNome = UF_NOME[uf] || uf;\nconst orgaoAut = getVal('6b771374-ef1b-42dd-af5a-ffb231e29112');\nconst orgaoPrefix = orgaoAut.split('/')[0] || 'DETRAN';\n\nlet orgaoCab = '';\nif (orgaoPrefix === 'DETRAN') orgaoCab = 'DIRETOR/SUPERINTENDENTE DO DEPARTAMENTO ESTADUAL DE TRÂNSITO DO ' + estadoNome.toUpperCase() + ' – DETRAN/' + uf;\nelse if (orgaoPrefix === 'DNIT') orgaoCab = 'SUPERINTENDENTE DO DEPARTAMENTO NACIONAL DE INFRAESTRUTURA DE TRANSPORTES – DNIT';\nelse if (orgaoPrefix === 'PRF') orgaoCab = 'SUPERINTENDENTE DA POLÍCIA RODOVIÁRIA FEDERAL – PRF';\nelse orgaoCab = 'AUTORIDADE COMPETENTE – ' + orgaoAut;\n\nlet orgaoExtenso = '';\nif (orgaoPrefix === 'DETRAN') orgaoExtenso = 'Departamento Estadual de Trânsito do ' + estadoNome + ' (DETRAN/' + uf + ')';\nelse if (orgaoPrefix === 'DNIT') orgaoExtenso = 'Departamento Nacional de Infraestrutura de Transportes (DNIT)';\nelse if (orgaoPrefix === 'PRF') orgaoExtenso = 'Polícia Rodoviária Federal (PRF)';\nelse orgaoExtenso = orgaoAut;\n\nconst MESES = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];\nconst now = new Date();\nconst brt = new Date(now.getTime() - 3*3600000);\nconst dataExtenso = brt.getUTCDate() + ' de ' + MESES[brt.getUTCMonth()] + ' de ' + brt.getUTCFullYear();\nconst dtBRT = brt.toLocaleString('pt-BR',{timeZone:'UTC'});\n\nconst valorTotal = getNum('b8647ffd-7a76-4790-90cf-8e6314e5e469');\nconst valorTotalFmt = 'R$ ' + valorTotal.toLocaleString('pt-BR',{minimumFractionDigits:2});\nconst parcelas = getNum('1abdab74-70ed-41c4-96af-7a791c8b9e23');\nconst valorParcela = getNum('f1b84911-ea3d-4e78-a03a-03cc866c6b83');\nconst valorParcelaFmt = 'R$ ' + valorParcela.toLocaleString('pt-BR',{minimumFractionDigits:2});\nconst op1 = getVal('4b52ce26-707e-480c-8bb5-471d38a5fc9a');\nconst op2 = getVal('7bcf3b5b-1403-40e3-a77d-28f08b0c6208');\nconst dataVenc = getVal('2232c1e7-4087-4245-8405-ca5e4735c594');\nconst fp = getVal('be4fac1c-4178-4a0c-8315-69747e2af05f');\n\nlet opcaoPag = '';\nif (op1 && op2) { opcaoPag = op1 + '\\n' + op2; }\nelse if (op1) { opcaoPag = op1; }\nelse if (fp.includes('PIX')) { opcaoPag = 'Pagamento à vista – valor total de ' + valorTotalFmt + ', via PIX, até ' + dataVenc + '.'; }\nelse if (fp.includes('Cartão')) { opcaoPag = 'Cartão de Crédito – ' + valorTotalFmt + ' em ' + parcelas + 'x de ' + valorParcelaFmt + ', 1ª parcela até ' + dataVenc + '.'; }\nelse if (fp.includes('Boleto')) { opcaoPag = 'Boleto Bancário – ' + valorTotalFmt + ' em ' + parcelas + 'x de ' + valorParcelaFmt + ', vencimento em ' + dataVenc + '.'; }\nelse { opcaoPag = fp + ' – Total: ' + valorTotalFmt; }\n\nconst placeholders = {\n  '{{NOME_COMPLETO}}': task.name.toUpperCase(),\n  '{{NACIONALIDADE}}': getVal('8fc07513-38ca-4ba8-861d-3cc22d52e91f') || 'brasileiro(a)',\n  '{{CPF}}': getVal('26b4ecd6-6963-4160-a554-30cd4f36a70c'),\n  '{{RG}}': getVal('f36e9cb0-f9d2-4cb8-91ea-e5014a2566c7'),\n  '{{UF_ORGAO}}': uf,\n  '{{CNH_NUMERO}}': getVal('cbefb914-0e29-4611-b992-b689d0b0fbb1'),\n  '{{CNH_CATEGORIA}}': getVal('eda497ef-b8aa-4c1a-a512-3de5b7245aa3'),\n  '{{ENDERECO_COMPLETO}}': getVal('7eae45ba-94b4-4cb4-bd1b-927ef11b8107'),\n  '{{NUMERO_AIT}}': getVal('e220c08f-03dd-487a-a8a2-6cf25e5bf9d3'),\n  '{{ORGAO_DESTINO_CABECALHO}}': orgaoCab,\n  '{{ORGAO_SIGLA}}': orgaoAut,\n  '{{ORGAO_AUTUADOR_EXTENSO}}': orgaoExtenso,\n  '{{ORGAO_ESTADO}}': estadoNome,\n  '{{CIDADE_UF}}': 'Fortaleza/CE',\n  '{{DATA_CONTRATO_EXTENSO}}': dataExtenso,\n  '{{OBJETO_CONTRATO}}': getVal('02b1dd48-1adf-4c70-b277-553ff8681b45'),\n  '{{OPCAO_PAGAMENTO}}': opcaoPag,\n  '{{COMARCA}}': COMARCA_MAP[uf] || 'Fortaleza',\n  '{{VALOR_TOTAL}}': valorTotalFmt,\n};\n\nconst nomeArquivo = task.name.replace(/[^a-zA-Z0-9 ]/g,'').replace(/\\s+/g,'_').toUpperCase();\nconst dataArq = brt.toISOString().slice(0,10).replace(/-/g,'');\n\nreturn [{ json: {\n  taskId: task.id, taskName: task.name, taskUrl: task.url,\n  placeholders, nomeArquivo, dataArq, dtBRT,\n  templates: [\n    { tipo: 'requerimento', templateId: '1ywVcGwnsRmVlwnJB0Xp3yi2zJLB1uXp-Gxv0un2a7LE' },\n    { tipo: 'procuracao',   templateId: '1WOKxYpTpOYCby-az6wXz-DkI55u3Jd3kdoDv7GYZiHA' },\n    { tipo: 'contrato',     templateId: '1hQ0FDA6x9BM29Y2KyH3XGcnEbX5Wh_YFf8lbxf2tPxU' },\n  ]\n} }];\n"
      }
    },
    {
      "id": "gd1",
      "name": "Criar Pasta Cliente",
      "position": [
        1340,
        200
      ],
      "type": "n8n-nodes-base.googleDrive",
      "typeVersion": 3,
      "parameters": {
        "operation": "createFolder",
        "folderName": "={{ $('Montar Placeholders').first().json.taskName.toUpperCase() + ' — ' + $('Montar Placeholders').first().json.dataArq }}",
        "options": {}
      },
      "credentials": {
        "googleDriveOAuth2Api": {
          "id": "oRp4hBuwhcDDNu2p",
          "name": "Google Drive OAuth2"
        }
      }
    },
    {
      "id": "split1",
      "name": "Loop Templates",
      "position": [
        1560,
        200
      ],
      "type": "n8n-nodes-base.splitInBatches",
      "typeVersion": 3,
      "parameters": {
        "batchSize": 1,
        "options": {}
      }
    },
    {
      "id": "code3",
      "name": "Preparar Cópia",
      "position": [
        1780,
        200
      ],
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "parameters": {
        "jsCode": "\nconst dados = $('Montar Placeholders').first().json;\nconst folderId = $('Criar Pasta Cliente').first().json.id;\nconst tpl = $input.first().json;\nreturn [{ json: { ...tpl, folderId,\n  novoNome: dados.nomeArquivo + '_' + tpl.tipo.toUpperCase() + '_' + dados.dataArq,\n  taskId: dados.taskId, taskName: dados.taskName, taskUrl: dados.taskUrl,\n  nomeArquivo: dados.nomeArquivo, dataArq: dados.dataArq, dtBRT: dados.dtBRT,\n  placeholders: dados.placeholders\n} }];\n"
      }
    },
    {
      "id": "http2",
      "name": "Copiar Templates",
      "position": [
        2000,
        200
      ],
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "parameters": {
        "method": "POST",
        "url": "=https://www.googleapis.com/drive/v3/files/{{ $json.templateId }}/copy",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "googleDriveOAuth2Api",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\"name\": \"{{ $json.novoNome }}\", \"parents\": [\"{{ $json.folderId }}\"]}",
        "options": {}
      },
      "credentials": {
        "googleDriveOAuth2Api": {
          "id": "oRp4hBuwhcDDNu2p",
          "name": "Google Drive OAuth2"
        }
      }
    },
    {
      "id": "code4",
      "name": "Adicionar Tipo ao Resultado",
      "position": [
        2220,
        200
      ],
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "parameters": {
        "jsCode": "\nconst copy = $input.first().json;\nconst prep = $('Preparar Cópia').first().json;\nreturn [{ json: { ...copy, tipo: prep.tipo, taskId: prep.taskId, taskName: prep.taskName,\n  taskUrl: prep.taskUrl, nomeArquivo: prep.nomeArquivo, dataArq: prep.dataArq,\n  dtBRT: prep.dtBRT, placeholders: prep.placeholders, folderId: prep.folderId } }];\n"
      }
    },
    {
      "id": "http3",
      "name": "Substituir Placeholders",
      "position": [
        2440,
        200
      ],
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "parameters": {
        "method": "POST",
        "url": "=https://docs.googleapis.com/v1/documents/{{ $json.id }}:batchUpdate",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "googleDriveOAuth2Api",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={{ JSON.stringify({ requests: Object.entries($json.placeholders).map(([k,v]) => ({ replaceAllText: { containsText: { text: k, matchCase: false }, replaceText: v || '' } })) }) }}",
        "options": {}
      },
      "credentials": {
        "googleDriveOAuth2Api": {
          "id": "oRp4hBuwhcDDNu2p",
          "name": "Google Drive OAuth2"
        }
      }
    },
    {
      "id": "http4",
      "name": "Verificar Loop",
      "position": [
        2440,
        400
      ],
      "type": "n8n-nodes-base.noOp",
      "typeVersion": 1,
      "parameters": {}
    },
    {
      "id": "code5",
      "name": "Preparar Resultado Final",
      "position": [
        2660,
        200
      ],
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "parameters": {
        "jsCode": "\nconst dados = $('Montar Placeholders').first().json;\nconst contratoId = $('Copiar Templates').all().find(i => i.json.tipo === 'contrato')?.json?.id || '';\nconst reqId = $('Copiar Templates').all().find(i => i.json.tipo === 'requerimento')?.json?.id || '';\nconst procId = $('Copiar Templates').all().find(i => i.json.tipo === 'procuracao')?.json?.id || '';\n\nconst linkBase = 'https://docs.google.com/document/d/';\nconst contratoLink = contratoId ? linkBase + contratoId + '/edit' : 'não gerado';\nconst reqLink = reqId ? linkBase + reqId + '/edit' : 'não gerado';\nconst procLink = procId ? linkBase + procId + '/edit' : 'não gerado';\n\nconst comentario = `📄 MF02 — MINUTA GERADA\nData: ${dados.dtBRT} (BRT)\n—\n📝 Contrato Editável: ${contratoLink}\n📝 Requerimento: ${reqLink}\n📝 Procuração: ${procLink}\n—\nCampo \"Contrato Editável URL\" atualizado no ClickUp.\n⏳ Aguardando conferência da equipe → altere o campo \"Contrato Revisado Manual\" para Validado ou Corrigir Minuta.`;\n\nreturn [{ json: { taskId: dados.taskId, comentario, contratoLink, contratoId } }];\n"
      }
    },
    {
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "parameters": {
        "method": "POST",
        "url": "=https://api.clickup.com/api/v2/task/{{ $json.taskId }}/field/0de83118-e5c2-429f-82f7-e2e83ee4119f",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "clickUpApi",
        "options": {},
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\"value\": {{ JSON.stringify($json.contratoLink) }}}"
      },
      "credentials": {
        "clickUpApi": {
          "id": "KZp4O2fXwvdyQsC8",
          "name": "ClickUp account"
        }
      },
      "name": "CU Salvar Editável",
      "id": "http5",
      "position": [
        2880,
        200
      ]
    },
    {
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "parameters": {
        "method": "POST",
        "url": "=https://api.clickup.com/api/v2/task/{{ $('Preparar Resultado Final').first().json.taskId }}/field/c7dd2213-1294-4753-94b5-045f5511e4d2",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "clickUpApi",
        "options": {},
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "{\"value\": 1}"
      },
      "credentials": {
        "clickUpApi": {
          "id": "KZp4O2fXwvdyQsC8",
          "name": "ClickUp account"
        }
      },
      "name": "CU Salvar Versão",
      "id": "http6",
      "position": [
        3100,
        200
      ]
    },
    {
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "parameters": {
        "method": "POST",
        "url": "=https://api.clickup.com/api/v2/task/{{ $('Preparar Resultado Final').first().json.taskId }}/comment",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "clickUpApi",
        "options": {},
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\"comment_text\": {{ JSON.stringify($(\"Preparar Resultado Final\").first().json.comentario) }}, \"notify_all\": false}"
      },
      "credentials": {
        "clickUpApi": {
          "id": "KZp4O2fXwvdyQsC8",
          "name": "ClickUp account"
        }
      },
      "name": "Comentário MF02",
      "id": "http7",
      "position": [
        3320,
        200
      ]
    },
    {
      "id": "slk1",
      "name": "Slack MF02",
      "position": [
        3540,
        200
      ],
      "type": "n8n-nodes-base.slack",
      "typeVersion": 2.3,
      "parameters": {
        "operation": "post",
        "select": "channel",
        "channelId": {
          "__rl": true,
          "value": "C0AG6K4G35W",
          "mode": "id"
        },
        "text": "=📄 *MF02 — MINUTA GERADA*\n\n*Cliente:* {{ $('Preparar Resultado Final').first().json.taskId }}\n*Contrato editável:* {{ $('Preparar Resultado Final').first().json.contratoLink }}\n\n⏳ Equipe: valide o contrato e altere o campo *Contrato Revisado Manual* para Validado.",
        "otherOptions": {}
      },
      "credentials": {
        "slackApi": {
          "id": "cA4S7M9UeAR9zajC",
          "name": "Slack account"
        }
      }
    },
    {
      "id": "noop1",
      "name": "Encerrar",
      "position": [
        680,
        480
      ],
      "type": "n8n-nodes-base.noOp",
      "typeVersion": 1,
      "parameters": {}
    }
  ],
  "connections": {
    "Webhook MF02": {
      "main": [
        [
          {
            "node": "Extrair TaskId",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Extrair TaskId": {
      "main": [
        [
          {
            "node": "Tem TaskId?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Tem TaskId?": {
      "main": [
        [
          {
            "node": "GET Task Completa",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Encerrar",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "GET Task Completa": {
      "main": [
        [
          {
            "node": "Montar Placeholders",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Montar Placeholders": {
      "main": [
        [
          {
            "node": "Criar Pasta Cliente",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Criar Pasta Cliente": {
      "main": [
        [
          {
            "node": "Loop Templates",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Loop Templates": {
      "main": [
        [
          {
            "node": "Preparar Cópia",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Preparar Resultado Final",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Preparar Cópia": {
      "main": [
        [
          {
            "node": "Copiar Templates",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Copiar Templates": {
      "main": [
        [
          {
            "node": "Adicionar Tipo ao Resultado",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Adicionar Tipo ao Resultado": {
      "main": [
        [
          {
            "node": "Substituir Placeholders",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Substituir Placeholders": {
      "main": [
        [
          {
            "node": "Loop Templates",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Preparar Resultado Final": {
      "main": [
        [
          {
            "node": "CU Salvar Editável",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "CU Salvar Editável": {
      "main": [
        [
          {
            "node": "CU Salvar Versão",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "CU Salvar Versão": {
      "main": [
        [
          {
            "node": "Comentário MF02",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Comentário MF02": {
      "main": [
        [
          {
            "node": "Slack MF02",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "settings": {
    "executionOrder": "v1",
    "callerPolicy": "workflowsFromSameOwner",
    "availableInMCP": false
  },
  "staticData": null
}
```

### WF-COM | CONTRACT | MF03 → `/tmp/n8n_mf03_contract.json`

```json
{
  "name": "WF-COM | CONTRACT | MF03 | Conferência da Equipe",
  "nodes": [
    {
      "id": "wh1",
      "name": "Webhook MF03",
      "position": [
        240,
        300
      ],
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "parameters": {
        "path": "wf-com-contract-mf03",
        "httpMethod": "POST",
        "responseMode": "onReceived",
        "responseCode": 200
      }
    },
    {
      "id": "code1",
      "name": "Extrair Evento",
      "position": [
        460,
        300
      ],
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "parameters": {
        "jsCode": "\nconst body = $input.first().json.body || $input.first().json;\n\n// Pegar field_id e novo valor\nconst fieldId = body.field_id || (body.history_items?.[0]?.field?.id) || '';\nconst newValue = body.history_items?.[0]?.after?.value || body.value || '';\nconst taskId = body.task_id || body.task?.id || '';\n\n// Só processar se for o campo contrato_revisado_manual\nconst isOurField = fieldId === '37bf7603-08ed-4bed-bafd-75a828fa251f' || fieldId === '';\n\nreturn [{ json: { prosseguir: isOurField && taskId !== '', taskId, newValue: String(newValue) } }];\n"
      }
    },
    {
      "id": "if1",
      "name": "Prosseguir?",
      "position": [
        680,
        300
      ],
      "type": "n8n-nodes-base.if",
      "typeVersion": 2,
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": false,
            "leftValue": "",
            "typeValidation": "loose"
          },
          "conditions": [
            {
              "leftValue": "={{ $json.prosseguir }}",
              "rightValue": true,
              "operator": {
                "type": "boolean",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        }
      }
    },
    {
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "parameters": {
        "method": "GET",
        "url": "=https://api.clickup.com/api/v2/task/{{ $json.taskId }}?custom_fields=true",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "clickUpApi",
        "options": {}
      },
      "credentials": {
        "clickUpApi": {
          "id": "KZp4O2fXwvdyQsC8",
          "name": "ClickUp account"
        }
      },
      "name": "GET Task MF03",
      "id": "http1",
      "position": [
        900,
        200
      ]
    },
    {
      "id": "code2",
      "name": "Interpretar Estado",
      "position": [
        1120,
        200
      ],
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "parameters": {
        "jsCode": "\nconst dados = $input.first().json;\nconst task = $('GET Task MF03').first().json;\nconst cf = task.custom_fields || [];\n\n// Pegar valor atual do campo contrato_revisado_manual\nconst campoRevisado = cf.find(f => f.id === '37bf7603-08ed-4bed-bafd-75a828fa251f');\nlet estadoAtual = '';\nif (campoRevisado) {\n  if (campoRevisado.type_config?.options) {\n    const opt = campoRevisado.type_config.options.find(o =>\n      o.orderindex === campoRevisado.value || o.id === campoRevisado.value);\n    estadoAtual = opt?.name || String(campoRevisado.value || '');\n  } else {\n    estadoAtual = String(campoRevisado.value || '');\n  }\n}\nconst estadoNorm = estadoAtual.toLowerCase().trim();\n\n// Pegar pendências\nconst campoPend = cf.find(f => f.id === 'db59580c-c1be-45c9-8af6-ef0e25ad1cef');\nconst pendencias = campoPend?.value || 'não especificado';\n\nconst now = new Date();\nconst brt = new Date(now.getTime() - 3*3600000);\nconst dtBRT = brt.toLocaleString('pt-BR', {timeZone:'UTC'});\n\nlet acao = 'pendente';\nlet comentario = '';\n\nif (estadoNorm.includes('validado')) {\n  acao = 'validado';\n  comentario = `✅ MF03 — CONFERÊNCIA VALIDADA\nData: ${dtBRT} (BRT)\n—\nMinuta aprovada pela equipe.\n✅ Pronto para MF04 — Gerar PDF Final.\n(Dispare MF04 manualmente ou via automação do ClickUp)`;\n} else if (estadoNorm.includes('corrigir') || estadoNorm.includes('correc')) {\n  acao = 'corrigir';\n  comentario = `⚠️ MF03 — CORREÇÃO NECESSÁRIA\nData: ${dtBRT} (BRT)\n—\nPendências: ${pendencias}\n—\n❌ MF04 bloqueado até nova validação.\nApós corrigir a minuta, altere o campo para \"Validado\".`;\n} else {\n  acao = 'pendente';\n  comentario = `⏳ MF03 — CONFERÊNCIA PENDENTE\nData: ${dtBRT} (BRT)\n—\nAguardando revisão da equipe.`;\n}\n\nreturn [{ json: { taskId: task.id, taskName: task.name, acao, comentario, pendencias, dtBRT } }];\n"
      }
    },
    {
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "parameters": {
        "method": "POST",
        "url": "=https://api.clickup.com/api/v2/task/{{ $json.taskId }}/comment",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "clickUpApi",
        "options": {},
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\"comment_text\": {{ JSON.stringify($json.comentario) }}, \"notify_all\": false}"
      },
      "credentials": {
        "clickUpApi": {
          "id": "KZp4O2fXwvdyQsC8",
          "name": "ClickUp account"
        }
      },
      "name": "Comentário MF03",
      "id": "http2",
      "position": [
        1340,
        200
      ]
    },
    {
      "id": "slk1",
      "name": "Slack MF03",
      "position": [
        1560,
        200
      ],
      "type": "n8n-nodes-base.slack",
      "typeVersion": 2.3,
      "parameters": {
        "operation": "post",
        "select": "channel",
        "channelId": {
          "__rl": true,
          "value": "C0AG6K4G35W",
          "mode": "id"
        },
        "text": "=🔍 *MF03 — CONFERÊNCIA: {{ $('Interpretar Estado').first().json.acao.toUpperCase() }}*\n*Cliente:* {{ $('Interpretar Estado').first().json.taskName }}\n*Status:* {{ $('Interpretar Estado').first().json.acao }}\n{{ $('Interpretar Estado').first().json.acao === 'corrigir' ? '*Pendências:* ' + $('Interpretar Estado').first().json.pendencias : '' }}",
        "otherOptions": {}
      },
      "credentials": {
        "slackApi": {
          "id": "cA4S7M9UeAR9zajC",
          "name": "Slack account"
        }
      }
    },
    {
      "id": "noop1",
      "name": "Encerrar",
      "position": [
        680,
        480
      ],
      "type": "n8n-nodes-base.noOp",
      "typeVersion": 1,
      "parameters": {}
    }
  ],
  "connections": {
    "Webhook MF03": {
      "main": [
        [
          {
            "node": "Extrair Evento",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Extrair Evento": {
      "main": [
        [
          {
            "node": "Prosseguir?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Prosseguir?": {
      "main": [
        [
          {
            "node": "GET Task MF03",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Encerrar",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "GET Task MF03": {
      "main": [
        [
          {
            "node": "Interpretar Estado",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Interpretar Estado": {
      "main": [
        [
          {
            "node": "Comentário MF03",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Comentário MF03": {
      "main": [
        [
          {
            "node": "Slack MF03",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "settings": {
    "executionOrder": "v1",
    "callerPolicy": "workflowsFromSameOwner",
    "availableInMCP": false
  },
  "staticData": null
}
```

### WF-COM | CONTRACT | MF04 → `/tmp/n8n_mf04.json`

```json
{
  "name": "WF-COM | CONTRACT | MF04 | Gerar PDF Final e Preparar Assinatura",
  "nodes": [
    {
      "id": "wh1",
      "name": "Webhook MF04",
      "position": [
        240,
        300
      ],
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "parameters": {
        "path": "wf-com-contract-mf04",
        "httpMethod": "POST",
        "responseMode": "onReceived",
        "responseCode": 200
      }
    },
    {
      "id": "code1",
      "name": "Extrair TaskId MF04",
      "position": [
        460,
        300
      ],
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "parameters": {
        "jsCode": "\nconst body = $input.first().json.body || $input.first().json;\nconst taskId = body.taskId || body.task_id || body.task?.id || '';\nreturn [{ json: { taskId, prosseguir: taskId !== '' } }];\n"
      }
    },
    {
      "id": "if1",
      "name": "Tem TaskId MF04?",
      "position": [
        680,
        300
      ],
      "type": "n8n-nodes-base.if",
      "typeVersion": 2,
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": false,
            "leftValue": "",
            "typeValidation": "loose"
          },
          "conditions": [
            {
              "leftValue": "={{ $json.prosseguir }}",
              "rightValue": true,
              "operator": {
                "type": "boolean",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        }
      }
    },
    {
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "parameters": {
        "method": "GET",
        "url": "=https://api.clickup.com/api/v2/task/{{ $json.taskId }}?custom_fields=true",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "clickUpApi",
        "options": {}
      },
      "credentials": {
        "clickUpApi": {
          "id": "KZp4O2fXwvdyQsC8",
          "name": "ClickUp account"
        }
      },
      "name": "GET Task MF04",
      "id": "http1",
      "position": [
        900,
        200
      ]
    },
    {
      "id": "code2",
      "name": "Verificar Guards MF04",
      "position": [
        1120,
        200
      ],
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "parameters": {
        "jsCode": "\nconst task = $input.first().json;\nconst cf = task.custom_fields || [];\n\nfunction getVal(id) {\n  const f = cf.find(x => x.id === id);\n  if (!f) return '';\n  if (f.type_config?.options) {\n    const opt = f.type_config.options.find(o => o.orderindex === f.value || o.id === f.value);\n    return opt?.name || String(f.value||'');\n  }\n  return String(f.value||'').trim();\n}\n\nconst revisado = getVal('37bf7603-08ed-4bed-bafd-75a828fa251f').toLowerCase();\nconst contratoEditavel = getVal('0de83118-e5c2-429f-82f7-e2e83ee4119f');\n\n// Extrair fileId do Google Docs URL\nlet fileId = '';\nconst match = contratoEditavel.match(/\\/d\\/([a-zA-Z0-9_-]{10,})/);\nif (match) fileId = match[1];\n\nconst validado = revisado.includes('validado');\nconst temEditavel = fileId !== '';\n\nconst now = new Date();\nconst brt = new Date(now.getTime() - 3*3600000);\nconst dtBRT = brt.toLocaleString('pt-BR',{timeZone:'UTC'});\n\nreturn [{ json: {\n  prosseguir: validado && temEditavel,\n  bloqueio: !validado ? 'MF03 não está Validado' : (!temEditavel ? 'contrato_editavel_url vazio' : ''),\n  taskId: task.id, taskName: task.name, taskUrl: task.url,\n  fileId, contratoEditavel, revisado, dtBRT\n} }];\n"
      }
    },
    {
      "id": "if2",
      "name": "Guards OK?",
      "position": [
        1340,
        200
      ],
      "type": "n8n-nodes-base.if",
      "typeVersion": 2,
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": false,
            "leftValue": "",
            "typeValidation": "loose"
          },
          "conditions": [
            {
              "leftValue": "={{ $json.prosseguir }}",
              "rightValue": true,
              "operator": {
                "type": "boolean",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        }
      }
    },
    {
      "id": "http2",
      "name": "Exportar PDF do Docs",
      "position": [
        1560,
        100
      ],
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "parameters": {
        "method": "GET",
        "url": "=https://www.googleapis.com/drive/v3/files/{{ $json.fileId }}/export?mimeType=application%2Fpdf",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "googleDriveOAuth2Api",
        "options": {
          "response": {
            "response": {
              "responseFormat": "file",
              "outputPropertyName": "data"
            }
          }
        }
      },
      "credentials": {
        "googleDriveOAuth2Api": {
          "id": "oRp4hBuwhcDDNu2p",
          "name": "Google Drive OAuth2"
        }
      }
    },
    {
      "id": "gd1",
      "name": "Upload PDF Drive",
      "position": [
        1780,
        100
      ],
      "type": "n8n-nodes-base.googleDrive",
      "typeVersion": 3,
      "parameters": {
        "operation": "upload",
        "name": "={{ $('Verificar Guards MF04').first().json.taskName.replace(/[^a-zA-Z0-9 ]/g,'').replace(/\\s+/g,'_').toUpperCase() + '_CONTRATO_FINAL.pdf' }}",
        "inputDataFieldName": "data",
        "options": {
          "mimeType": "application/pdf"
        }
      },
      "credentials": {
        "googleDriveOAuth2Api": {
          "id": "oRp4hBuwhcDDNu2p",
          "name": "Google Drive OAuth2"
        }
      }
    },
    {
      "id": "http3",
      "name": "Compartilhar PDF",
      "position": [
        2000,
        100
      ],
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "parameters": {
        "method": "POST",
        "url": "=https://www.googleapis.com/drive/v3/files/{{ $json.id }}/permissions",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "googleDriveOAuth2Api",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "{\"role\":\"reader\",\"type\":\"anyone\"}",
        "options": {}
      },
      "credentials": {
        "googleDriveOAuth2Api": {
          "id": "oRp4hBuwhcDDNu2p",
          "name": "Google Drive OAuth2"
        }
      }
    },
    {
      "id": "code3",
      "name": "Preparar Comentário MF04",
      "position": [
        2220,
        100
      ],
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "parameters": {
        "jsCode": "\nconst dados = $('Verificar Guards MF04').first().json;\nconst uploadResult = $input.first().json;\nconst pdfUrl = 'https://drive.google.com/file/d/' + uploadResult.id + '/view';\n\nconst comentario = `📎 MF04 — PDF FINAL GERADO\nData: ${dados.dtBRT} (BRT)\n—\nPDF do contrato: ${pdfUrl}\n—\n✅ Pronto para MF05 — Enviar para Assinatura via ZapSign.`;\n\nreturn [{ json: { taskId: dados.taskId, taskName: dados.taskName, comentario, pdfUrl, pdfFileId: uploadResult.id } }];\n"
      }
    },
    {
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "parameters": {
        "method": "POST",
        "url": "=https://api.clickup.com/api/v2/task/{{ $json.taskId }}/field/3a0df1f2-f38d-4020-bb94-e2c51d56e130",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "clickUpApi",
        "options": {},
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\"value\": {{ JSON.stringify($json.pdfUrl) }}}"
      },
      "credentials": {
        "clickUpApi": {
          "id": "KZp4O2fXwvdyQsC8",
          "name": "ClickUp account"
        }
      },
      "name": "CU Salvar PDF URL",
      "id": "http4",
      "position": [
        2440,
        100
      ]
    },
    {
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "parameters": {
        "method": "POST",
        "url": "=https://api.clickup.com/api/v2/task/{{ $('Preparar Comentário MF04').first().json.taskId }}/comment",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "clickUpApi",
        "options": {},
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\"comment_text\": {{ JSON.stringify($(\"Preparar Comentário MF04\").first().json.comentario) }}, \"notify_all\": false}"
      },
      "credentials": {
        "clickUpApi": {
          "id": "KZp4O2fXwvdyQsC8",
          "name": "ClickUp account"
        }
      },
      "name": "Comentário MF04",
      "id": "http5",
      "position": [
        2660,
        100
      ]
    },
    {
      "id": "slk1",
      "name": "Slack MF04",
      "position": [
        2880,
        100
      ],
      "type": "n8n-nodes-base.slack",
      "typeVersion": 2.3,
      "parameters": {
        "operation": "post",
        "select": "channel",
        "channelId": {
          "__rl": true,
          "value": "C0AG6K4G35W",
          "mode": "id"
        },
        "text": "=📎 *MF04 — PDF FINAL GERADO*\n*Cliente:* {{ $('Preparar Comentário MF04').first().json.taskName }}\n*PDF:* {{ $('Preparar Comentário MF04').first().json.pdfUrl }}\n\n✅ Pronto para MF05 — dispare via webhook ou automação ClickUp.",
        "otherOptions": {}
      },
      "credentials": {
        "slackApi": {
          "id": "cA4S7M9UeAR9zajC",
          "name": "Slack account"
        }
      }
    },
    {
      "id": "noop1",
      "name": "Encerrar MF04",
      "position": [
        680,
        480
      ],
      "type": "n8n-nodes-base.noOp",
      "typeVersion": 1,
      "parameters": {}
    },
    {
      "id": "noop2",
      "name": "Bloqueado MF03",
      "position": [
        1340,
        380
      ],
      "type": "n8n-nodes-base.noOp",
      "typeVersion": 1,
      "parameters": {}
    }
  ],
  "connections": {
    "Webhook MF04": {
      "main": [
        [
          {
            "node": "Extrair TaskId MF04",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Extrair TaskId MF04": {
      "main": [
        [
          {
            "node": "Tem TaskId MF04?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Tem TaskId MF04?": {
      "main": [
        [
          {
            "node": "GET Task MF04",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Encerrar MF04",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "GET Task MF04": {
      "main": [
        [
          {
            "node": "Verificar Guards MF04",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Verificar Guards MF04": {
      "main": [
        [
          {
            "node": "Guards OK?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Guards OK?": {
      "main": [
        [
          {
            "node": "Exportar PDF do Docs",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Bloqueado MF03",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Exportar PDF do Docs": {
      "main": [
        [
          {
            "node": "Upload PDF Drive",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Upload PDF Drive": {
      "main": [
        [
          {
            "node": "Compartilhar PDF",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Compartilhar PDF": {
      "main": [
        [
          {
            "node": "Preparar Comentário MF04",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Preparar Comentário MF04": {
      "main": [
        [
          {
            "node": "CU Salvar PDF URL",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "CU Salvar PDF URL": {
      "main": [
        [
          {
            "node": "Comentário MF04",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Comentário MF04": {
      "main": [
        [
          {
            "node": "Slack MF04",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "settings": {
    "executionOrder": "v1",
    "callerPolicy": "workflowsFromSameOwner",
    "availableInMCP": false
  },
  "staticData": null
}
```

### WF-COM | CONTRACT | MF05 → `/tmp/n8n_mf05.json`

```json
{
  "name": "WF-COM | CONTRACT | MF05 | Enviar para Assinatura e Registrar Cronologia",
  "nodes": [
    {
      "id": "wh1",
      "name": "Webhook MF05",
      "position": [
        240,
        300
      ],
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "parameters": {
        "path": "wf-com-contract-mf05",
        "httpMethod": "POST",
        "responseMode": "onReceived",
        "responseCode": 200
      }
    },
    {
      "id": "code1",
      "name": "Extrair TaskId MF05",
      "position": [
        460,
        300
      ],
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "parameters": {
        "jsCode": "\nconst body = $input.first().json.body || $input.first().json;\nconst taskId = body.taskId || body.task_id || body.task?.id || '';\nreturn [{ json: { taskId, prosseguir: taskId !== '' } }];\n"
      }
    },
    {
      "id": "if1",
      "name": "Tem TaskId MF05?",
      "position": [
        680,
        300
      ],
      "type": "n8n-nodes-base.if",
      "typeVersion": 2,
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": false,
            "leftValue": "",
            "typeValidation": "loose"
          },
          "conditions": [
            {
              "leftValue": "={{ $json.prosseguir }}",
              "rightValue": true,
              "operator": {
                "type": "boolean",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        }
      }
    },
    {
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "parameters": {
        "method": "GET",
        "url": "=https://api.clickup.com/api/v2/task/{{ $json.taskId }}?custom_fields=true",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "clickUpApi",
        "options": {}
      },
      "credentials": {
        "clickUpApi": {
          "id": "KZp4O2fXwvdyQsC8",
          "name": "ClickUp account"
        }
      },
      "name": "GET Task MF05",
      "id": "http1",
      "position": [
        900,
        200
      ]
    },
    {
      "id": "code2",
      "name": "Verificar Guards MF05",
      "position": [
        1120,
        200
      ],
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "parameters": {
        "jsCode": "\nconst task = $input.first().json;\nconst cf = task.custom_fields || [];\n\nfunction getVal(id) {\n  const f = cf.find(x => x.id === id);\n  if (!f) return '';\n  if (f.type_config?.options) {\n    const opt = f.type_config.options.find(o => o.orderindex === f.value || o.id === f.value);\n    return opt?.name || String(f.value||'');\n  }\n  if (f.type === 'phone' && f.value && typeof f.value === 'object') return f.value.phone || '';\n  return String(f.value||'').trim();\n}\n\nconst contratoPdfUrl = getVal('3a0df1f2-f38d-4020-bb94-e2c51d56e130');\nconst zapDocId = getVal('7cda2ebe-5b03-4724-95c6-f551ad4637b1');\nconst telefone = getVal('dd097c3b-5647-4535-9847-1026f6ea70c0');\n\n// PDF deve estar preenchido, zapsign deve estar vazio (idempotência)\nconst temPdf = contratoPdfUrl !== '' && !contratoPdfUrl.includes('undefined');\nconst semZap = zapDocId === '';\n\n// Converter Drive view URL para download direto\nlet downloadUrl = '';\nconst match = contratoPdfUrl.match(/\\/d\\/([a-zA-Z0-9_-]{10,})/);\nif (match) downloadUrl = 'https://drive.google.com/uc?export=download&id=' + match[1];\n\n// Formatar telefone para ZapSign (E.164)\nlet tel = telefone.replace(/\\D/g,'');\nif (tel.length === 11 && !tel.startsWith('55')) tel = '55' + tel;\nif (tel.length === 10 && !tel.startsWith('55')) tel = '55' + tel;\n\nconst now = new Date();\nconst brt = new Date(now.getTime() - 3*3600000);\nconst dtBRT = brt.toLocaleString('pt-BR',{timeZone:'UTC'});\n\nreturn [{ json: {\n  prosseguir: temPdf && semZap,\n  bloqueio: !temPdf ? 'contrato_pdf_url vazio' : (!semZap ? 'ZapSign já enviado (idempotência)' : ''),\n  taskId: task.id, taskName: task.name, taskUrl: task.url,\n  contratoPdfUrl, downloadUrl, telefone: tel, dtBRT\n} }];\n"
      }
    },
    {
      "id": "if2",
      "name": "Guards MF05 OK?",
      "position": [
        1340,
        200
      ],
      "type": "n8n-nodes-base.if",
      "typeVersion": 2,
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": false,
            "leftValue": "",
            "typeValidation": "loose"
          },
          "conditions": [
            {
              "leftValue": "={{ $json.prosseguir }}",
              "rightValue": true,
              "operator": {
                "type": "boolean",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        }
      }
    },
    {
      "id": "http2",
      "name": "ZapSign Criar Doc",
      "position": [
        1560,
        100
      ],
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "parameters": {
        "method": "POST",
        "url": "https://api.zapsign.com.br/api/v1/docs/",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Authorization",
              "value": "Bearer 30a3e64e-1faf-4392-bbab-bf0ebdd12ee021caa197-b702-4b23-9809-d2082c56c461"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\"sandbox\": false, \"name\": \"{{ $json.taskName }} — Contrato\", \"url_pdf\": \"{{ $json.downloadUrl }}\", \"lang\": \"pt-br\", \"external_id\": \"{{ $json.taskId }}\", \"webhook_url\": \"https://n8n.srv1380728.hstgr.cloud/webhook/wf-fin-zapsign-assinado\", \"signers\": [{\"name\": \"{{ $json.taskName }}\", \"auth_mode\": \"assinaturaTela\", \"send_automatic_email\": false, \"send_automatic_whatsapp\": false, \"position_type\": \"auto\", \"auto_position_text\": \"{{ASSINATURA_CLIENTE}}\"}]}",
        "options": {}
      }
    },
    {
      "id": "code3",
      "name": "Preparar Comentário MF05",
      "position": [
        1780,
        100
      ],
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "parameters": {
        "jsCode": "\nconst guard = $('Verificar Guards MF05').first().json;\nconst zap = $input.first().json;\n\nconst docId = zap.token || zap.id || '';\nconst signUrl = zap.signers?.[0]?.sign_url || zap.sign_url || '';\n// Campo sign_url field ID: c88fbf50-84a2-4c7e-ab59-ede658906ec2\n\nconst comentario = `📨 MF05 — CONTRATO ENVIADO PARA ASSINATURA\nData: ${guard.dtBRT} (BRT)\n—\nZapSign Doc ID: ${docId}\nLink de assinatura: ${signUrl}\nEnviado para: ${guard.telefone}\n—\n⏳ Aguardando assinatura do cliente.\n📌 Após assinatura → pipeline pós-assinatura (WF-FIN) é acionado automaticamente via webhook ZapSign.`;\n\nreturn [{ json: {\n  taskId: guard.taskId, taskName: guard.taskName, comentario,\n  docId, signUrl, telefone: guard.telefone\n} }];\n"
      }
    },
    {
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "parameters": {
        "method": "POST",
        "url": "=https://api.clickup.com/api/v2/task/{{ $json.taskId }}/field/7cda2ebe-5b03-4724-95c6-f551ad4637b1",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "clickUpApi",
        "options": {},
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\"value\": {{ JSON.stringify($json.docId) }}}"
      },
      "credentials": {
        "clickUpApi": {
          "id": "KZp4O2fXwvdyQsC8",
          "name": "ClickUp account"
        }
      },
      "name": "CU Salvar ZapSign ID",
      "id": "http3",
      "position": [
        2000,
        100
      ]
    },
    {
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "parameters": {
        "method": "POST",
        "url": "=https://api.clickup.com/api/v2/task/{{ $('Preparar Comentário MF05').first().json.taskId }}/comment",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "clickUpApi",
        "options": {},
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\"comment_text\": {{ JSON.stringify($(\"Preparar Comentário MF05\").first().json.comentario) }}, \"notify_all\": false}"
      },
      "credentials": {
        "clickUpApi": {
          "id": "KZp4O2fXwvdyQsC8",
          "name": "ClickUp account"
        }
      },
      "name": "Comentário MF05",
      "id": "http4",
      "position": [
        2220,
        100
      ]
    },
    {
      "id": "slk1",
      "name": "Slack MF05",
      "position": [
        2440,
        100
      ],
      "type": "n8n-nodes-base.slack",
      "typeVersion": 2.3,
      "parameters": {
        "operation": "post",
        "select": "channel",
        "channelId": {
          "__rl": true,
          "value": "C0AG6K4G35W",
          "mode": "id"
        },
        "text": "=📨 *MF05 — CONTRATO ENVIADO PARA ASSINATURA*\n*Cliente:* {{ $('Preparar Comentário MF05').first().json.taskName }}\n*ZapSign ID:* {{ $('Preparar Comentário MF05').first().json.docId }}\n*Link:* {{ $('Preparar Comentário MF05').first().json.signUrl }}\n\n⏳ Aguardando assinatura. WF-FIN disparará automaticamente após assinatura.",
        "otherOptions": {}
      },
      "credentials": {
        "slackApi": {
          "id": "cA4S7M9UeAR9zajC",
          "name": "Slack account"
        }
      }
    },
    {
      "id": "noop1",
      "name": "Encerrar MF05",
      "position": [
        680,
        480
      ],
      "type": "n8n-nodes-base.noOp",
      "typeVersion": 1,
      "parameters": {}
    },
    {
      "id": "noop2",
      "name": "Bloqueado Idempotência",
      "position": [
        1340,
        380
      ],
      "type": "n8n-nodes-base.noOp",
      "typeVersion": 1,
      "parameters": {}
    }
  ],
  "connections": {
    "Webhook MF05": {
      "main": [
        [
          {
            "node": "Extrair TaskId MF05",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Extrair TaskId MF05": {
      "main": [
        [
          {
            "node": "Tem TaskId MF05?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Tem TaskId MF05?": {
      "main": [
        [
          {
            "node": "GET Task MF05",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Encerrar MF05",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "GET Task MF05": {
      "main": [
        [
          {
            "node": "Verificar Guards MF05",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Verificar Guards MF05": {
      "main": [
        [
          {
            "node": "Guards MF05 OK?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Guards MF05 OK?": {
      "main": [
        [
          {
            "node": "ZapSign Criar Doc",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Bloqueado Idempotência",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "ZapSign Criar Doc": {
      "main": [
        [
          {
            "node": "Preparar Comentário MF05",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Preparar Comentário MF05": {
      "main": [
        [
          {
            "node": "CU Salvar ZapSign ID",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "CU Salvar ZapSign ID": {
      "main": [
        [
          {
            "node": "Comentário MF05",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Comentário MF05": {
      "main": [
        [
          {
            "node": "Slack MF05",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "settings": {
    "executionOrder": "v1",
    "callerPolicy": "workflowsFromSameOwner",
    "availableInMCP": false
  },
  "staticData": null
}
```

### WF-COM | ADS | MF03 → `/tmp/n8n_mf03_ads.json`

```json
{
  "name": "WF-COM | ADS | MF03 | Alerta de Conversão Manual Google",
  "nodes": [
    {
      "id": "wh1",
      "name": "ClickUp — Status Fechado",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "position": [
        240,
        300
      ],
      "parameters": {
        "path": "wf-com-ads-mf03-fechamento",
        "httpMethod": "POST",
        "responseMode": "onReceived",
        "responseCode": 200
      }
    },
    {
      "id": "code1",
      "name": "Verificar Fechamento",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        460,
        300
      ],
      "parameters": {
        "jsCode": "const body = $input.first().json.body || $input.first().json;\nconst newStatus = (body.history_items?.[0]?.after?.status || body.status?.status || '').toLowerCase().trim();\nconst folderId = (body.task?.folder?.id || '').toString();\nconst taskId = body.task_id || body.task?.id || '';\nconst eFechamento = newStatus === 'contrato fechado';\nconst eCRM = folderId === '90117445648' || folderId === '';\nreturn [{ json: { prosseguir: eFechamento && eCRM && taskId !== '', taskId, newStatus } }];"
      }
    },
    {
      "id": "if1",
      "name": "É Fechamento CRM?",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2,
      "position": [
        680,
        300
      ],
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": false,
            "leftValue": "",
            "typeValidation": "loose"
          },
          "conditions": [
            {
              "leftValue": "={{ $json.prosseguir }}",
              "rightValue": true,
              "operator": {
                "type": "boolean",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        }
      }
    },
    {
      "id": "http1",
      "name": "Buscar Task Completa",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        900,
        200
      ],
      "parameters": {
        "method": "GET",
        "url": "=https://api.clickup.com/api/v2/task/{{ $json.taskId }}?custom_fields=true",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "clickUpApi",
        "options": {}
      },
      "credentials": {
        "clickUpApi": {
          "id": "KZp4O2fXwvdyQsC8",
          "name": "ClickUp account"
        }
      }
    },
    {
      "id": "code2",
      "name": "Extrair e Consolidar",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        1120,
        200
      ],
      "parameters": {
        "jsCode": "const task = $input.first().json;\nconst cf = task.custom_fields || [];\nfunction getField(id) {\n  const f = cf.find(x => x.id === id);\n  if (!f) return '';\n  if (f.type_config?.options) {\n    const opt = f.type_config.options.find(o => o.orderindex === f.value || o.id === f.value);\n    return opt?.name || f.value || '';\n  }\n  return (f.value || '').toString();\n}\nfunction getByName(frag) {\n  const f = cf.find(x => (x.name||'').toLowerCase().includes(frag.toLowerCase()) && x.value);\n  if (!f) return '';\n  if (f.type_config?.options) {\n    const opt = f.type_config.options.find(o => o.orderindex === f.value || o.id === f.value);\n    return opt?.name || f.value || '';\n  }\n  return (f.value || '').toString();\n}\nconst origem = getField('2cf330fd-8a82-4378-81de-27b83e6375d3') || getByName('origem');\nconst gclid = getField('7768805a-8c36-4201-90c7-d9ee3f2eb6c3') || getByName('gclid');\nconst campanha = getField('b236bc57-b08b-44bc-9b3b-7f88950c4c91') || getByName('campanha');\nconst eGoogle = origem.toLowerCase().includes('google') || origem.toLowerCase().includes('ads') || gclid !== '';\nconst closer = task.assignees?.[0]?.username || task.assignees?.[0]?.email || 'não informado';\nconst dataFechamento = task.date_done ? new Date(parseInt(task.date_done)).toLocaleDateString('pt-BR',{timeZone:'America/Sao_Paulo'}) : new Date().toLocaleDateString('pt-BR',{timeZone:'America/Sao_Paulo'});\nreturn [{ json: { eGoogle, taskId: task.id, nome: task.name, taskUrl: task.url, telefone: getField('dd097c3b-5647-4535-9847-1026f6ea70c0') || 'não informado', email: getByName('email') || getByName('e-mail') || 'não informado', origem: origem || 'não informado', canal: getByName('canal') || 'não informado', closer, dataFechamento, valorContrato: getByName('valor') || getByName('honorário') || 'não informado', gclid: gclid || 'não informado', utmSource: getByName('utm_source') || (gclid ? 'google' : 'não informado'), utmCampaign: campanha || 'não informado' } }];"
      }
    },
    {
      "id": "if2",
      "name": "Origem Google?",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2,
      "position": [
        1340,
        200
      ],
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": false,
            "leftValue": "",
            "typeValidation": "loose"
          },
          "conditions": [
            {
              "leftValue": "={{ $json.eGoogle }}",
              "rightValue": true,
              "operator": {
                "type": "boolean",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        }
      }
    },
    {
      "id": "slack1",
      "name": "Slack — Alerta Conversão Google",
      "type": "n8n-nodes-base.slack",
      "typeVersion": 2.3,
      "position": [
        1560,
        100
      ],
      "parameters": {
        "operation": "post",
        "select": "channel",
        "channelId": {
          "__rl": true,
          "value": "C0AG6K4G35W",
          "mode": "id"
        },
        "text": "=🚨 *FECHAMENTO DE CONTRATO — ORIGEM GOOGLE*\n\n*Cliente:* {{ $json.nome }}\n*Telefone:* {{ $json.telefone }}\n*E-mail:* {{ $json.email }}\n*Origem:* {{ $json.origem }}\n*Canal:* {{ $json.canal }}\n*Closer:* {{ $json.closer }}\n*Data do fechamento:* {{ $json.dataFechamento }}\n*Valor do contrato:* {{ $json.valorContrato }}\n\n*GCLID:* {{ $json.gclid }}\n*UTM Source:* {{ $json.utmSource }}\n*UTM Campaign:* {{ $json.utmCampaign }}\n\n🔗 *Task ClickUp:* {{ $json.taskUrl }}\n\n⚠️ *Ação necessária:*\nRealizar cadastro manual da conversão no Google Ads.",
        "otherOptions": {}
      },
      "credentials": {
        "slackApi": {
          "id": "cA4S7M9UeAR9zajC",
          "name": "Slack account"
        }
      }
    },
    {
      "id": "noop1",
      "name": "Encerrar Limpo",
      "type": "n8n-nodes-base.noOp",
      "typeVersion": 1,
      "position": [
        1560,
        380
      ],
      "parameters": {}
    }
  ],
  "connections": {
    "ClickUp — Status Fechado": {
      "main": [
        [
          {
            "node": "Verificar Fechamento",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Verificar Fechamento": {
      "main": [
        [
          {
            "node": "É Fechamento CRM?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "É Fechamento CRM?": {
      "main": [
        [
          {
            "node": "Buscar Task Completa",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Encerrar Limpo",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Buscar Task Completa": {
      "main": [
        [
          {
            "node": "Extrair e Consolidar",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Extrair e Consolidar": {
      "main": [
        [
          {
            "node": "Origem Google?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Origem Google?": {
      "main": [
        [
          {
            "node": "Slack — Alerta Conversão Google",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Encerrar Limpo",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "settings": {
    "executionOrder": "v1",
    "callerPolicy": "workflowsFromSameOwner",
    "availableInMCP": false
  },
  "staticData": null
}
```

### WF PONTE → `/tmp/n8n_wf_ponte.json`

```json
{
  "name": "WF PONTE | MF03 Validado → F1→F2→F4 (Onboarding Jurídico Automático)",
  "nodes": [
    {
      "id": "n01",
      "name": "Webhook MF03 Validado",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "position": [
        0,
        0
      ],
      "parameters": {
        "path": "wf-ponte-mf03-to-f1f5",
        "responseMode": "responseNode"
      }
    },
    {
      "id": "n02",
      "name": "GET Task ClickUp",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        220,
        0
      ],
      "credentials": {
        "clickUpApi": {
          "id": "KZp4O2fXwvdyQsC8",
          "name": "ClickUp account"
        }
      },
      "parameters": {
        "method": "GET",
        "url": "={{ 'https://api.clickup.com/api/v2/task/' + ($json.body.task_id // $json.query.task_id // $json.task_id) }}",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "clickUpApi",
        "options": {}
      }
    },
    {
      "id": "n03",
      "name": "Parse MF02 e Preparar Payloads",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        440,
        0
      ],
      "parameters": {
        "jsCode": "\nconst task = $input.first().json;\nconst taskId = task.id;\n\n// Anti-double: verificar se bridge já rodou (buscamos no description)\nconst desc = task.description || '';\nconst alreadyProcessed = desc.includes('[WF PONTE | Concluído]');\n\n// Extrair custom fields\nconst cf = task.custom_fields || [];\nconst getField = (id) => { const f = cf.find(x => x.id === id); return f ? f.value : null; };\n\n// MF02 texto\nconst mf02 = getField('44d936fc-62fb-4703-8c14-d49e5d8b4159') || '';\n\n// Parser de campo do MF02\nconst parse = (text, label) => {\n  const re = new RegExp(label + '[:\\\\s]+(.+?)(?=\\\\n|$)', 'im');\n  const m = text.match(re);\n  return m ? m[1].trim() : '';\n};\n\nconst nome    = parse(mf02, 'Cliente')  || task.name;\nconst cpf     = parse(mf02, 'CPF');\nconst celular = parse(mf02, 'Telefone');\nconst cidade  = parse(mf02, 'Cidade')   || 'Fortaleza';\nconst ait     = parse(mf02, 'AIT');\nconst valorStr = parse(mf02, 'Valor total');\n\n// Órgão da task (campo a0ffe748)\nconst orgaoField = cf.find(f => f.id === 'a0ffe748-deac-46a7-828f-d1d0a86393f3');\nconst orgaoOption = orgaoField && Array.isArray(orgaoField.value) && orgaoField.value.length > 0\n  ? orgaoField.value[0].name || '' : '';\nconst orgaoOpts = {'DETRAN-CE':'DETRAN-CE','PRF-CE':'PRF-CE','AMC':'AMC',\n  'DETRAN-RN':'DETRAN-RN','PRF-RN':'PRF-RN','PRF-BA':'PRF-BA','DNIT':'DNIT',\n  'DETRAN-PE':'DETRAN-PE','DETRAN-PI':'DETRAN-PI','DETRAN-SP':'DETRAN-SP'};\nconst orgao = orgaoOpts[orgaoOption] || orgaoOption || 'DETRAN-CE';\n\n// Estado derivado do órgão\nconst estado = orgao.includes('-CE') || orgao === 'AMC' ? 'CE'\n  : orgao.includes('-RN') ? 'RN'\n  : orgao.includes('-PE') ? 'PE'\n  : orgao.includes('-PI') ? 'PI'\n  : orgao.includes('-SP') ? 'SP'\n  : orgao.includes('-BA') ? 'BA' : 'CE';\n\n// Prazo NA (campo 4d56b475)\nconst prazoTs = getField('4d56b475-4a6a-43bc-a913-c5453e76e0af');\nlet prazoNa = '';\nif (prazoTs) {\n  const d = new Date(parseInt(prazoTs));\n  prazoNa = d.toISOString().split('T')[0];\n}\n\n// Tipo processo (campo d82b4898)\nconst tipoField = cf.find(f => f.id === 'd82b4898-5e57-4ff8-b60a-fe9accedfa7d');\nconst tipoLabel = tipoField && Array.isArray(tipoField.value) && tipoField.value.length > 0\n  ? tipoField.value[0].name || '' : 'PAMT';\nconst taskType = tipoLabel.includes('JARI') ? 'JARI' : '';\n\n// Payload F1\nconst payloadF1 = {\n  nome, cpf: cpf||'', rg:'', data_nascimento:'',\n  profissao:'Não informado', celular: celular||'', email:'',\n  cep:'', cidade, estado, origem_id: 200072,\n  observacoes: ait ? 'AIT: ' + ait : ''\n};\n\n// Payload F4 base (precisa de lawsuits_id depois)\nconst payloadF4Base = { prazo_na: prazoNa, orgao, task_type: taskType };\n\nreturn [{ json: {\n  taskId, alreadyProcessed, mf02, nome, cpf, celular, cidade, ait, orgao,\n  estado, prazoNa, tipoLabel, taskType, payloadF1, payloadF4Base\n}}];\n"
      }
    },
    {
      "id": "n04",
      "name": "IF Já Processado",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2,
      "position": [
        660,
        0
      ],
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": false,
            "leftValue": "",
            "typeValidation": "strict"
          },
          "conditions": [
            {
              "id": "c1",
              "leftValue": "={{ $json.alreadyProcessed }}",
              "rightValue": true,
              "operator": {
                "type": "boolean",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        }
      }
    },
    {
      "id": "n05",
      "name": "Respond Já Processado",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [
        880,
        200
      ],
      "parameters": {
        "respondWith": "json",
        "responseBody": "={\"status\":\"skipped\",\"msg\":\"WF PONTE já executado para esta task\"}"
      }
    },
    {
      "id": "n06",
      "name": "F1 — Cadastrar Cliente ADVbox",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        880,
        -80
      ],
      "parameters": {
        "method": "POST",
        "url": "https://n8n.srv1380728.hstgr.cloud/webhook/advbox-cadastrar-cliente",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={{ JSON.stringify($json.payloadF1) }}",
        "options": {
          "response": {
            "response": {
              "neverError": true
            }
          }
        }
      }
    },
    {
      "id": "n07",
      "name": "IF F1 Sucesso",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2,
      "position": [
        1100,
        -80
      ],
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": false,
            "leftValue": "",
            "typeValidation": "strict"
          },
          "conditions": [
            {
              "id": "c2",
              "leftValue": "={{ $json.success }}",
              "rightValue": true,
              "operator": {
                "type": "boolean",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        }
      }
    },
    {
      "id": "n08",
      "name": "Comment Erro F1",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        1320,
        80
      ],
      "credentials": {
        "clickUpApi": {
          "id": "KZp4O2fXwvdyQsC8",
          "name": "ClickUp account"
        }
      },
      "parameters": {
        "method": "POST",
        "url": "={{ 'https://api.clickup.com/api/v2/task/' + $('Parse MF02 e Preparar Payloads').first().json.taskId + '/comment' }}",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "clickUpApi",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={{ JSON.stringify({comment_text: '[WF PONTE | ❌ Erro F1 — Cadastro Cliente ADVbox]\\n\\nNão foi possível cadastrar o cliente no ADVbox.\\n\\nMotivo: ' + JSON.stringify($json) + '\\n\\nAção necessária: verificar CPF, nome ou disponibilidade do ADVbox e reprocessar manualmente.'}) }}",
        "options": {}
      }
    },
    {
      "id": "n09",
      "name": "Respond Erro F1",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [
        1540,
        80
      ],
      "parameters": {
        "respondWith": "json",
        "responseCode": 500,
        "responseBody": "{\"status\":\"error\",\"step\":\"F1\",\"msg\":\"Falha ao cadastrar cliente no ADVbox\"}"
      }
    },
    {
      "id": "n10",
      "name": "Extrair customer_id e Preparar F2",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        1320,
        -80
      ],
      "parameters": {
        "jsCode": "\nconst f1Resp = $input.first().json;\nconst prevData = $('Parse MF02 e Preparar Payloads').first().json;\nconst customerId = f1Resp.customer_id;\nconst payloadF2 = {\n  customers_id: customerId,\n  orgao: prevData.orgao,\n  notes: prevData.ait ? 'AIT: ' + prevData.ait : ''\n};\nreturn [{ json: { ...prevData, customerId, payloadF2, f1Resp } }];\n"
      }
    },
    {
      "id": "n11",
      "name": "F2 — Cadastrar Processo ADVbox",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        1540,
        -80
      ],
      "parameters": {
        "method": "POST",
        "url": "https://n8n.srv1380728.hstgr.cloud/webhook/advbox-cadastrar-processo",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={{ JSON.stringify($json.payloadF2) }}",
        "options": {
          "response": {
            "response": {
              "neverError": true
            }
          }
        }
      }
    },
    {
      "id": "n12",
      "name": "IF F2 Sucesso",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2,
      "position": [
        1760,
        -80
      ],
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": false,
            "leftValue": "",
            "typeValidation": "strict"
          },
          "conditions": [
            {
              "id": "c3",
              "leftValue": "={{ $json.success }}",
              "rightValue": true,
              "operator": {
                "type": "boolean",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        }
      }
    },
    {
      "id": "n13",
      "name": "Comment Erro F2",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        1980,
        80
      ],
      "credentials": {
        "clickUpApi": {
          "id": "KZp4O2fXwvdyQsC8",
          "name": "ClickUp account"
        }
      },
      "parameters": {
        "method": "POST",
        "url": "={{ 'https://api.clickup.com/api/v2/task/' + $('Extrair customer_id e Preparar F2').first().json.taskId + '/comment' }}",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "clickUpApi",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={{ JSON.stringify({comment_text: '[WF PONTE | ❌ Erro F2 — Cadastro Processo ADVbox]\\n\\nCliente cadastrado (ID: ' + $('Extrair customer_id e Preparar F2').first().json.customerId + ') mas falhou ao criar o processo.\\n\\nMotivo: ' + JSON.stringify($json) + '\\n\\nAção necessária: criar processo manualmente no ADVbox.'}) }}",
        "options": {}
      }
    },
    {
      "id": "n14",
      "name": "Respond Erro F2",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [
        2200,
        80
      ],
      "parameters": {
        "respondWith": "json",
        "responseCode": 500,
        "responseBody": "{\"status\":\"error\",\"step\":\"F2\",\"msg\":\"Falha ao cadastrar processo no ADVbox\"}"
      }
    },
    {
      "id": "n15",
      "name": "Extrair lawsuit_id e Preparar F4",
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        1980,
        -80
      ],
      "parameters": {
        "jsCode": "\nconst f2Resp = $input.first().json;\nconst prevData = $('Extrair customer_id e Preparar F2').first().json;\nconst lawsuitId = f2Resp.lawsuit_id || (f2Resp.dados && f2Resp.dados.id);\nconst payloadF4 = {\n  lawsuits_id: lawsuitId,\n  prazo_na: prevData.prazoNa,\n  orgao: prevData.orgao,\n  task_type: prevData.taskType\n};\nreturn [{ json: { ...prevData, lawsuitId, payloadF4, f2Resp } }];\n"
      }
    },
    {
      "id": "n16",
      "name": "F4 — Criar Tarefas ADVbox",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        2200,
        -80
      ],
      "parameters": {
        "method": "POST",
        "url": "https://n8n.srv1380728.hstgr.cloud/webhook/advbox-criar-tarefa",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={{ JSON.stringify($json.payloadF4) }}",
        "options": {
          "response": {
            "response": {
              "neverError": true
            }
          }
        }
      }
    },
    {
      "id": "n17",
      "name": "IF F4 Sucesso",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2,
      "position": [
        2420,
        -80
      ],
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": false,
            "leftValue": "",
            "typeValidation": "strict"
          },
          "conditions": [
            {
              "id": "c4",
              "leftValue": "={{ $json.success }}",
              "rightValue": true,
              "operator": {
                "type": "boolean",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        }
      }
    },
    {
      "id": "n18",
      "name": "Comment Erro F4",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        2640,
        80
      ],
      "credentials": {
        "clickUpApi": {
          "id": "KZp4O2fXwvdyQsC8",
          "name": "ClickUp account"
        }
      },
      "parameters": {
        "method": "POST",
        "url": "={{ 'https://api.clickup.com/api/v2/task/' + $('Extrair lawsuit_id e Preparar F4').first().json.taskId + '/comment' }}",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "clickUpApi",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={{ JSON.stringify({comment_text: '[WF PONTE | ❌ Erro F4 — Criação de Tarefas ADVbox]\\n\\nCliente (ID: ' + $('Extrair lawsuit_id e Preparar F4').first().json.customerId + ') e processo (LID: ' + $('Extrair lawsuit_id e Preparar F4').first().json.lawsuitId + ') criados, mas falhou ao criar tarefas.\\n\\nMotivo: ' + JSON.stringify($json) + '\\n\\nAção necessária: criar tarefas manualmente no ADVbox.'}) }}",
        "options": {}
      }
    },
    {
      "id": "n19",
      "name": "Respond Erro F4",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [
        2860,
        80
      ],
      "parameters": {
        "respondWith": "json",
        "responseCode": 500,
        "responseBody": "{\"status\":\"error\",\"step\":\"F4\",\"msg\":\"Falha ao criar tarefas no ADVbox\"}"
      }
    },
    {
      "id": "n20",
      "name": "Comment Sucesso Final",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        2640,
        -80
      ],
      "credentials": {
        "clickUpApi": {
          "id": "KZp4O2fXwvdyQsC8",
          "name": "ClickUp account"
        }
      },
      "parameters": {
        "method": "POST",
        "url": "={{ 'https://api.clickup.com/api/v2/task/' + $('Extrair lawsuit_id e Preparar F4').first().json.taskId + '/comment' }}",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "clickUpApi",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={{ JSON.stringify({comment_text:\n  '[WF PONTE | ✅ Onboarding Jurídico Concluído]\\n\\n' +\n  '✅ F1 — Cliente cadastrado no ADVbox\\n' +\n  '   → customers_id: ' + $('Extrair lawsuit_id e Preparar F4').first().json.customerId + '\\n\\n' +\n  '✅ F2 — Processo cadastrado no ADVbox\\n' +\n  '   → lawsuits_id: ' + $('Extrair lawsuit_id e Preparar F4').first().json.lawsuitId + '\\n\\n' +\n  '✅ F4 — Tarefas ADVbox criadas (Defesa Prévia)\\n\\n' +\n  '⚠️ F3 (Drive) e F5 (campos jurídicos CU) — verifique se necessário completar manualmente.\\n\\n' +\n  'Executado automaticamente pelo WF PONTE em ' + new Date().toLocaleString('pt-BR', {timeZone:'America/Fortaleza'})\n}) }}",
        "options": {}
      }
    },
    {
      "id": "n21",
      "name": "Respond Sucesso",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [
        2860,
        -80
      ],
      "parameters": {
        "respondWith": "json",
        "responseBody": "={{ JSON.stringify({status:'ok', customer_id: $('Extrair lawsuit_id e Preparar F4').first().json.customerId, lawsuit_id: $('Extrair lawsuit_id e Preparar F4').first().json.lawsuitId}) }}"
      }
    }
  ],
  "connections": {
    "Webhook MF03 Validado": {
      "main": [
        [
          {
            "node": "GET Task ClickUp",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "GET Task ClickUp": {
      "main": [
        [
          {
            "node": "Parse MF02 e Preparar Payloads",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Parse MF02 e Preparar Payloads": {
      "main": [
        [
          {
            "node": "IF Já Processado",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "IF Já Processado": {
      "main": [
        [
          {
            "node": "Respond Já Processado",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "F1 — Cadastrar Cliente ADVbox",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "F1 — Cadastrar Cliente ADVbox": {
      "main": [
        [
          {
            "node": "IF F1 Sucesso",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "IF F1 Sucesso": {
      "main": [
        [
          {
            "node": "Comment Erro F1",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Extrair customer_id e Preparar F2",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Comment Erro F1": {
      "main": [
        [
          {
            "node": "Respond Erro F1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Extrair customer_id e Preparar F2": {
      "main": [
        [
          {
            "node": "F2 — Cadastrar Processo ADVbox",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "F2 — Cadastrar Processo ADVbox": {
      "main": [
        [
          {
            "node": "IF F2 Sucesso",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "IF F2 Sucesso": {
      "main": [
        [
          {
            "node": "Comment Erro F2",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Extrair lawsuit_id e Preparar F4",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Comment Erro F2": {
      "main": [
        [
          {
            "node": "Respond Erro F2",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Extrair lawsuit_id e Preparar F4": {
      "main": [
        [
          {
            "node": "F4 — Criar Tarefas ADVbox",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "F4 — Criar Tarefas ADVbox": {
      "main": [
        [
          {
            "node": "IF F4 Sucesso",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "IF F4 Sucesso": {
      "main": [
        [
          {
            "node": "Comment Erro F4",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Comment Sucesso Final",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Comment Erro F4": {
      "main": [
        [
          {
            "node": "Respond Erro F4",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Comment Sucesso Final": {
      "main": [
        [
          {
            "node": "Respond Sucesso",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "settings": {
    "callerPolicy": "workflowsFromSameOwner",
    "availableInMCP": false
  },
  "staticData": null,
  "pinData": null
}
```
