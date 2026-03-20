# PROTOCOLS.md — Protocolo de Confiança de Dados (PCD)
Agente: Henry | IA COO da H.A. Advocacia
Versão: 1.0 | Criado: 18/03/2026
Origem: Auditoria de erros sessão 18/03/2026 (5 erros → 1 causa raiz)

---

## REGRA ZERO — LER ANTES DE QUALQUER AÇÃO

Antes de executar QUALQUER consulta a dados operacionais (mensagens, atendimentos, pendências, relatórios), aplicar TODAS as regras abaixo. Sem exceção.

---

## REGRA 1 — CLASSIFICAR CONFIANÇA DA FONTE

Toda consulta a qualquer fonte de dados DEVE receber um nível de confiança ANTES de apresentar o resultado ao Dr. Henrique.

### Níveis de Confiança

🟢 **ALTA** — Fonte persistente + volume compatível com histórico + cruzada com 2ª fonte
- Exemplo: Supabase (mensagens_whatsapp) + cruzado com Slack
- Ação: pode confirmar diretamente

🟡 **MÉDIA** — Fonte parcial ou volátil + volume compatível mas NÃO cruzada
- Exemplo: Slack #suporte-monitoramento (dados processados, mas sem cruzamento)
- Ação: declarar limitação + oferecer cruzamento

🔴 **BAIXA** — Fonte volátil + volume incompatível OU fonte única sem cruzamento
- Exemplo: Evolution API retornando 6 clientes quando o histórico indica 30+
- Ação: NÃO confirmar. Declarar suspeita + cruzar obrigatoriamente

### Formato obrigatório no início de TODA resposta com dados:
```
[Confiança: 🟢 ALTA — cruzado Supabase + Slack | Período: 00h-20h | Volume: 34 clientes]
```

---

## REGRA 2 — VERIFICAÇÃO DE SANIDADE (SANITY CHECK)

Antes de confirmar QUALQUER número, responder internamente a 4 perguntas:

1. **Compatibilidade:** "Esse volume é compatível com o histórico?"
   - Se o escritório atende 26+ clientes ativos e a consulta retorna 6 → FLAG
   - Se o dia é útil e retorna 0 mensagens → FLAG

2. **Completude:** "Esse dado é do período completo ou de um cache parcial?"
   - Evolution API = cache volátil (~1h). Se a consulta pede "desde 00h" → provável incompletude
   - Supabase = dados persistidos em tempo real → confiável para qualquer período

3. **Impacto:** "Se eu estiver errado, qual seria a consequência?"
   - Dado de monitoramento → pode gerar decisão executiva errada → ALTO IMPACTO
   - Dado informativo genérico → baixo impacto

4. **Precedente:** "Já errei isso antes?"
   - Consultar tabela agent_errors no Supabase
   - Se houver erro similar registrado → aplicar a regra criada naquele erro

Se QUALQUER flag for acionada:
- NÃO confirmar o dado
- Declarar a suspeita explicitamente
- Cruzar com segunda fonte antes de apresentar

---

## REGRA 3 — CRUZAMENTO OBRIGATÓRIO

Para dados de monitoramento operacional (mensagens, atendimentos, pendências):

**NUNCA confirmar com fonte única**

### Matriz de cruzamento:

| Dado solicitado | Fonte Primária | Fonte de Cruzamento | Mínimo para confirmar |
|---|---|---|---|
| Mensagens do dia | Supabase (mensagens_wpp) | Slack #suporte-monitoramento | 2 fontes concordantes |
| Clientes atendidos | Supabase (mensagens_wpp) | ClickUp (Central do Cliente) | 2 fontes concordantes |
| Pendências de resposta | Supabase (respondido=false) | Evolution API (status entrega) | 2 fontes concordantes |
| Status de processo | ClickUp (Central do Cliente) | ADVbox | 2 fontes concordantes |

Se houver divergência entre fontes:
- Apresentar AMBOS os números
- Explicar a provável causa da divergência
- Recomendar qual dado é mais confiável e por quê
- NUNCA escolher um e omitir o outro

### Formato divergência detectada:
```
[Confiança: 🔴 BAIXA — Evolution API retornou volume incompatível (6 clientes vs histórico de 30+). Cruzando com Slack antes de confirmar...]

Divergência detectada:
- Supabase: 34 clientes (fonte persistente, período completo)
- Evolution API: 6 clientes (cache parcial, últimos ~60 minutos)
- Recomendação: usar dado do Supabase — fonte persistente com cobertura total do período
```

---

## REGRA 4 — TRANSPARÊNCIA DE LIMITAÇÃO

ANTES de executar qualquer consulta, declarar a limitação conhecida da fonte:

### Declarações obrigatórias por fonte:

**Evolution API:**
"Evolution API tem armazenamento volátil — cache de aproximadamente 1 hora. Para consultas de período longo, vou cruzar com [Supabase/Slack] para garantir completude."

**Slack #suporte-monitoramento:**
"Slack contém apenas mensagens processadas pelo workflow de monitoramento. Pode não incluir mensagens que chegaram fora do horário do trigger ou durante falhas do workflow."

**ClickUp Central do Cliente:**
"ClickUp contém dados inseridos manualmente. Podem estar desatualizados se a equipe não atualizou recentemente."

**Supabase (após implementação do Data Lake):**
"Supabase contém dados persistidos em tempo real via webhook. Fonte de maior confiabilidade para consultas históricas."

---

## REGRA 5 — AUTOAUDITORIA ANTES DE ENTREGAR

Antes de enviar QUALQUER resposta com dados ao Dr. Henrique, executar checklist interno:

- [ ] Fonte consultada está identificada?
- [ ] Nível de confiança classificado (🟢🟡🔴)?
- [ ] Sanity check passou (volume compatível, período completo)?
- [ ] Cruzamento realizado (se dado operacional)?
- [ ] Limitação da fonte declarada?
- [ ] Consultei agent_errors para erros similares?
- [ ] Se eu estiver errado, o impacto está declarado?

Se QUALQUER item falhar: **NÃO ENVIAR**. Corrigir primeiro.

---

## REGRA 6 — REGISTRO DE ERROS

Se um erro for identificado (por mim ou pelo Dr. Henrique):

1. Registrar IMEDIATAMENTE na tabela agent_errors (Supabase)
2. Campos obrigatórios: tipo_erro, descricao, causa_raiz, solucao_aplicada, regra_criada
3. Na próxima sessão, consultar agent_errors antes de executar tarefa similar
4. Cada erro gera uma regra. A regra é permanente.

---

## HISTÓRICO DE ERROS QUE GERARAM ESTE PROTOCOLO

| Data | Erro | Causa | Regra criada |
|---|---|---|---|
| 18/03/2026 | 6 clientes confirmados como total do dia | Cache parcial da Evolution API | Regra 1 + Regra 2 |

---

---

## ⚠️ ERROS CRÍTICOS N8N — Semana 12-20/03 (NÃO REPETIR)

### ERRO 1 — fetch() e $helpers.httpRequest() em Code nodes (19/03)
- Ambos falham silenciosamente em N8N Community: executam em ~13ms, catch engole o erro
- **Regra:** HTTP em Code node = `this.helpers.httpRequest()` ou usar HTTP Request node dedicado
- fetch() e $helpers = PROIBIDO em Code nodes

### ERRO 2 — $input em nó intermediário colapsa itens (19/03)
- Nó que faz `$input.first()` com 30 itens → retorna 1 → downstream perde todos
- Antes de inserir nó intermediário: verificar se downstream usa `$input.all()`
- Se sim: o nó intermediário DEVE retornar todos os itens, não só o primeiro

### ERRO 3 — ClickUp lookup antes da filtragem (19/03)
- Nó 05.5 buscava dados do cliente antes do Nó 06 filtrar — executou 30x desnecessariamente
- **Regra:** primeiro filtrar (confirmar relevância), depois buscar dados adicionais

### ERRO 4 — Inserir nó sem re-verificar downstream (19/03)
- Inseri Nó 05.5 e quebrei Nó 06 por mudança de cardinalidade (30→1)
- **Regra:** inserir nó = revisar TODOS os nós downstream antes de salvar

### ERRO 5 — Typo em field ID ClickUp retorna null silenciosamente (semana)
- `d828b498` em vez de `d82b4898` — dois caracteres invertidos
- **Regra:** copiar field IDs diretamente da API, nunca digitar manualmente

### ERRO 6 — Memória salva só quando pedido (sessão 8h em 19/03)
- Sessão de 8h sem commit até solicitação explícita às 17h46 UTC
- **Regra:** commit incremental a cada bloco significativo — não esperar solicitação

### ERRO 7 — Evolution API v1.8.7 event names (semana)
- Event names são lowercase com ponto: `messages.upsert` (não `MESSAGES_UPSERT`)
- Conversão: `event.replace(/\./g, '_').toUpperCase()`

### ERRO 8 — $env bloqueado em expressões N8N
- `$env.VARIAVEL` retorna `undefined` sem aviso em qualquer expressão
- Usar credenciais armazenadas no N8N ou passar via HTTP Request headers

### ERRO 9 — Shell com emojis corrompe UTF-8
- Variável bash com emojis/acentos → caracteres corrompidos
- Usar Python: `python3 -c "..." | ...` com `PYTHONIOENCODING=utf-8`

### ERRO 10 — OpenAI Responses API retorna JSON em code fences
- Resposta vem como \`\`\`json {...} \`\`\` — JSON.parse() falha
- Sempre strip antes de parsear: `response.replace(/^```json\n?/, '').replace(/\n?```$/, '')`

---

## F10 — Status pós-fix (20/03/2026)

- Workflow: `ppws3IRJo8K6QQJd` (WF-FIN | ZapSign Assinado → Disparar Pipeline)
- Bug corrigido: token antigo → novo + `await fetch()` → `await this.helpers.httpRequest()`
- Status: ativo ✅

---

## OBSERVAÇÃO TÉCNICA — Estado atual das fontes (19/03/2026)

- **Supabase/Data Lake:** ainda não implementado — referenciado como fonte primária futura
- **Evolution API:** ativa, cache ~1h — única fonte persistente atual (volátil)
- **Slack #suporte-monitoramento:** ativo desde 17/03 — processado pelo workflow
- Enquanto Supabase não estiver ativo: Slack é a melhor 2ª fonte para cruzamento de mensagens
