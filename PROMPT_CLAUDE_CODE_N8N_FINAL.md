
# PROMPT PARA CLAUDE CODE — Fix Webhooks N8N (404 → 200)

## Contexto do problema
7 workflows no N8N têm webhooks que retornam 404. Causa: foram criados via API do N8N, e essa versão do N8N não registra webhooks no cache de memória ao ativar via API — só registra quando o workflow é importado/ativado pela UI. Solução: exportar os JSONs via API → deletar via API → reimportar via UI → ativar via UI.

---

## Credenciais

```
N8N_BASE_URL = https://n8n.srv1380728.hstgr.cloud
N8N_API_KEY  = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjMjI5YjA2Ni03NmE5LTQ1OGUtOWY4Ny1jZmUyZTJhMGQ1NjEiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiM2MzYzAxNmItMTgyMy00NzQ2LTk4ZjMtYTg4M2Y5ZjFiNTAzIiwiaWF0IjoxNzcyNDIyNjgxLCJleHAiOjE3NzQ5OTQ0MDB9.MM8pt3acXnYEHFaAyPuaA_WCWr9HznKKJcD0afgqeOM
```

---

## Workflows a corrigir

| ID atual (deletar) | Nome | Arquivo destino | Webhook path esperado |
|---|---|---|---|
| KjBqA3MSkAx6OlZK | WF-COM &#124; CONTRACT &#124; MF01 | /tmp/n8n_mf01.json | wf-com-contract-mf01 |
| ZQVUosq3fw6qpRdU | WF-COM &#124; CONTRACT &#124; MF02 | /tmp/n8n_mf02.json | wf-com-contract-mf02 |
| NRgbqr07lbtLlU0h | WF-COM &#124; CONTRACT &#124; MF03 | /tmp/n8n_mf03.json | wf-com-contract-mf03 |
| a6IaDHiluCP5XS3V | WF-COM &#124; CONTRACT &#124; MF04 | /tmp/n8n_mf04.json | wf-com-contract-mf04 |
| aF8qpx10N2Pqb3u5 | WF-COM &#124; CONTRACT &#124; MF05 | /tmp/n8n_mf05.json | wf-com-contract-mf05 |
| XIHxz7u2KxHryLwN | WF-COM &#124; ADS &#124; MF03 | /tmp/n8n_mf03_ads.json | wf-com-ads-mf03-fechamento |
| yOCjYLU981R6ioWg | WF PONTE | /tmp/n8n_wfponte.json | wf-ponte-mf03-to-f1f5 |

---

## PASSO 1 — Exportar os JSONs (via API)

Execute via terminal. Para cada workflow, baixar o JSON limpo e salvar em /tmp/:

```bash
N8N_BASE="https://n8n.srv1380728.hstgr.cloud"
N8N_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjMjI5YjA2Ni03NmE5LTQ1OGUtOWY4Ny1jZmUyZTJhMGQ1NjEiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiM2MzYzAxNmItMTgyMy00NzQ2LTk4ZjMtYTg4M2Y5ZjFiNTAzIiwiaWF0IjoxNzcyNDIyNjgxLCJleHAiOjE3NzQ5OTQ0MDB9.MM8pt3acXnYEHFaAyPuaA_WCWr9HznKKJcD0afgqeOM"

declare -A WFS=(
  ["KjBqA3MSkAx6OlZK"]="/tmp/n8n_mf01.json"
  ["ZQVUosq3fw6qpRdU"]="/tmp/n8n_mf02.json"
  ["NRgbqr07lbtLlU0h"]="/tmp/n8n_mf03.json"
  ["a6IaDHiluCP5XS3V"]="/tmp/n8n_mf04.json"
  ["aF8qpx10N2Pqb3u5"]="/tmp/n8n_mf05.json"
  ["XIHxz7u2KxHryLwN"]="/tmp/n8n_mf03_ads.json"
  ["yOCjYLU981R6ioWg"]="/tmp/n8n_wfponte.json"
)

for ID in "${!WFS[@]}"; do
  FILE="${WFS[$ID]}"
  echo "Exportando $ID → $FILE"
  curl -s "$N8N_BASE/api/v1/workflows/$ID" \
    -H "X-N8N-API-KEY: $N8N_KEY" | \
  python3 -c "
import json,sys
d=json.load(sys.stdin)
out={k:d[k] for k in ['name','nodes','connections','settings','staticData','pinData'] if k in d}
print(json.dumps(out,ensure_ascii=False,indent=2))
" > "$FILE"
  echo "  Salvo: $(wc -c < $FILE) bytes"
done

echo "Exportação concluída."
ls -lh /tmp/n8n_*.json
```

---

## PASSO 2 — Deletar os workflows antigos (via API)

❌ ATENÇÃO: este passo é irreversível. Os JSONs JÁ DEVEM ESTAR SALVOS em /tmp/ (passo 1 concluído) antes de executar.

```bash
N8N_BASE="https://n8n.srv1380728.hstgr.cloud"
N8N_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjMjI5YjA2Ni03NmE5LTQ1OGUtOWY4Ny1jZmUyZTJhMGQ1NjEiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiM2MzYzAxNmItMTgyMy00NzQ2LTk4ZjMtYTg4M2Y5ZjFiNTAzIiwiaWF0IjoxNzcyNDIyNjgxLCJleHAiOjE3NzQ5OTQ0MDB9.MM8pt3acXnYEHFaAyPuaA_WCWr9HznKKJcD0afgqeOM"

for ID in KjBqA3MSkAx6OlZK ZQVUosq3fw6qpRdU NRgbqr07lbtLlU0h a6IaDHiluCP5XS3V aF8qpx10N2Pqb3u5 XIHxz7u2KxHryLwN yOCjYLU981R6ioWg; do
  echo -n "Deletando $ID... "
  RESP=$(curl -s -X DELETE "$N8N_BASE/api/v1/workflows/$ID" \
    -H "X-N8N-API-KEY: $N8N_KEY")
  echo "$RESP" | python3 -c "import json,sys; d=json.load(sys.stdin); print('OK' if d.get('id') or d.get('success') else 'ERRO: ' + str(d))" 2>/dev/null || echo "OK (sem corpo)"
done

echo "Deleção concluída."
```

Verificar que sumiram:
```bash
curl -s "$N8N_BASE/api/v1/workflows?limit=100" \
  -H "X-N8N-API-KEY: $N8N_KEY" | \
  python3 -c "import json,sys; wfs=json.load(sys.stdin)['data']; print('\n'.join(f\"{w['id']} | {w['active']} | {w['name']}\" for w in wfs))"
```

---

## PASSO 3 — Importar via UI do N8N (CRÍTICO — NÃO FAZER VIA API)

**Por que obrigatoriamente pela UI:** ao importar e ativar pela UI, o N8N registra o webhook no cache de memória do processo. Via API isso não acontece — é o bug que estamos corrigindo.

### Opção A — Usar o browser (Playwright/CDP)

Abra `https://n8n.srv1380728.hstgr.cloud` no browser.

Para cada arquivo em /tmp/ (um por vez, em qualquer ordem):

1. Clicar no botão `+` (New Workflow) na barra lateral esquerda
   - Ou: menu superior → `File` → `New`
2. Um workflow vazio vai abrir
3. Clicar no ícone `...` (kebab menu) no canto superior direito do canvas
   - Ou: usar atalho `Ctrl+O` (Windows/Linux) / `Cmd+O` (Mac)
4. Selecionar `Import from File`
5. No seletor de arquivos, navegar até `/tmp/` e selecionar o arquivo correspondente (ex: `n8n_mf01.json`)
6. Confirmar que o nome do workflow apareceu corretamente no campo de nome no topo (ex: "WF-COM | CONTRACT | MF01 | Consolidar Dados do Contrato")
7. Clicar no toggle **"Inactive"** no canto superior direito → deve mudar para **"Active"** (verde)
8. Aguardar a mensagem de confirmação "Workflow activated"
9. Fechar a aba ou voltar para a lista e repetir para o próximo arquivo

### Ordem de importação (sugerida):
1. `/tmp/n8n_mf01.json`
2. `/tmp/n8n_mf02.json`
3. `/tmp/n8n_mf03.json`
4. `/tmp/n8n_mf04.json`
5. `/tmp/n8n_mf05.json`
6. `/tmp/n8n_mf03_ads.json`
7. `/tmp/n8n_wfponte.json`

### Se a UI pedir login:
Parar e informar o usuário. NÃO tentar prosseguir sem credenciais corretas.

---

## PASSO 4 — Testar todos os webhooks

Após ativar todos os 7 workflows via UI, aguardar 3 segundos e executar:

```bash
N8N_BASE="https://n8n.srv1380728.hstgr.cloud"

PATHS=(
  "wf-com-contract-mf01"
  "wf-com-contract-mf02"
  "wf-com-contract-mf03"
  "wf-com-contract-mf04"
  "wf-com-contract-mf05"
  "wf-com-ads-mf03-fechamento"
  "wf-ponte-mf03-to-f1f5"
)

ALL_OK=true
for P in "${PATHS[@]}"; do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$N8N_BASE/webhook/$P" \
    -H "Content-Type: application/json" -d '{"test":true}' --max-time 5)
  if [ "$CODE" = "200" ]; then
    echo "✅ $CODE | $P"
  else
    echo "❌ $CODE | $P"
    ALL_OK=false
  fi
done

if [ "$ALL_OK" = true ]; then
  echo ""
  echo "✅ TODOS OS WEBHOOKS FUNCIONANDO. Fix concluído."
else
  echo ""
  echo "⚠️ Alguns webhooks ainda com problema. Verificar passo 3 para os que falharam."
fi
```

---

## Critérios de sucesso
- Todos os 7 paths retornam `200`
- Na lista do N8N, os 7 workflows aparecem como `Active`
- Nenhum workflow duplicado (mesmo nome aparecendo duas vezes)

---

## Regras rígidas
❌ NÃO ativar via API após importar — SEMPRE pelo toggle da UI
❌ NÃO modificar nenhum campo dentro dos JSONs exportados
❌ NÃO pular o passo de deletar — se tentar importar com ID existente, vai conflitar
❌ NÃO declarar sucesso se qualquer webhook retornar diferente de 200
✅ Se algum DELETE retornar "not found" (404), continuar — workflow já havia sido deletado
✅ Se algum import falhar por credencial inválida dentro do JSON, reportar qual e continuar os demais
