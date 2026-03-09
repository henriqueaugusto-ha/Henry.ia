# MEMORY.md — Henry IA
_Memória de longo prazo. Atualizada em 06/03/2026._

---

## Quem sou eu / Quem é o Dr. Henrique

- Assistente IA do **Dr. Henrique Augusto** — advogado, escritório H. A. Advocacia
- Acesso: Telegram, N8N, ClickUp, ADVbox, Google Drive, 1Password
- Vault 1Password principal: `mzeqvatyexb7yplnl6o6ajq7bu` (IA – OPERACIONAL)
- Henrique trabalha no horário de Fortaleza (UTC-3) — "meia-noite" para mim é 21h para ele

---

## Projeto Principal: Automação ADVbox (F1→F5) — COMPLETO

### Fluxo completo (todos operacionais)
```
PDF contrato → F1 (ADVbox cliente) → F2 (ADVbox processo) 
             → F3 (Drive + ClickUp docs_url)
             → F4 (ADVbox tarefas)
             → F5 (ClickUp campos: tipo, órgão, infração, prazos, status)
```

### Webhooks N8N
| WF | Webhook path | ID N8N | Status |
|---|---|---|---|
| F1 | `advbox-cadastrar-cliente` | `imtGbPavAHjLZ6Nf` | ✅ |
| F2 | `advbox-cadastrar-processo` | `d8LugSfOKgAP3mn6` | ✅ |
| F3 | `advbox-organizar-docs` | `IsS96sv2ISIHEyZi` | ✅ |
| F4 | `advbox-criar-tarefa` | `MdLy9VX5YVAywxqU` | ✅ (suporte a JARI) |
| F5 | `advbox-atualizar-clickup` | `0dKe3KQhkOB6ovVB` | ✅ |

**N8N URL**: `https://n8n.srv1380728.hstgr.cloud`
**N8N API key env var**: `$N8N_API_KEY`
**ADVbox Bearer token**: `xz33X9sHtnVKWAG10ofpIFoDtK7u8JkLZYhczatxxaki7U7ZfOr9L7bq3kXE`
**ADVbox base URL**: `https://app.advbox.com.br/api/v1/`

### Payloads dos workflows
**F1**: `nome`, `cpf`, `rg`, `data_nascimento` (YYYY-MM-DD), `profissao`, `celular`, `email`, `cep`, `cidade`, `estado`, `observacoes`, `origem_id` (padrão: 200072 INDICAÇÃO)

**F2**: `customers_id` (int), `orgao` ("DETRAN-CE"/"PRF-CE"/"PRF-RN"/"AMC"/"DETRAN-RN"/etc), `notes`

**F3**: `nome`, `mes` ("1.Janeiro"), `processoLabel`, `pasta1`, `pasta2`, `cu_list_id` (ex: "901113203395")

**F4**: `lawsuits_id`, `prazo_na` (YYYY-MM-DD), `orgao`, `task_type` ("JARI" = Protocolar Recurso à JARI em vez de Defesa Prévia)

**F5**: `clickup_task_id`, `tipo_processo`, `orgao`, `infracao`, `data_fato`, `prazo_na`, `prazo_critico`, `desc_prazo`, `numero_processo`

---

## IDs críticos ADVbox

| Campo | ID |
|---|---|
| Henrique Augusto `users_id` | 63789 |
| Ingrid Montenegro `users_id` | 120343 |
| Origem INDICAÇÃO | 200072 |
| Task: PROTOCOLAR CÓPIA AIT | 3634195 |
| Task: PROTOCOLAR DEFESA PRÉVIA | 4009251 |
| Task: PRODUZIR DEFESA PRÉVIA | 3623703 |
| Task: PRODUZIR RECURSO JARI | 3623702 |
| Task: PROTOCOLAR RECURSO JARI | 4010325 |

**Regra ADVbox**: GET /lawsuits filtrar por `customer_id` (singular, não `customers_id`). POST /posts para criar tarefas/notas.

**ADVbox bloqueado por Cloudflare** — nunca chamar direto, sempre via N8N existente.

**CPF bloqueado no ADVbox**: se retornar "The given data was invalid" para o CPF, cadastrar sem CPF e adicionar manualmente. Clientes afetados: Raimundo William (CID 14210755), possivelmente outros.

---

## Google Drive

| Campo | Valor |
|---|---|
| Raiz drive | `1fKlJjtDGOeQ11jRX6rb4NTRQr-XxNASp` |
| CLIENTES/2026/1.Janeiro | `1gfMOTC6bQ8BzJvv37vZ6aDG0PVqNaBo7` |
| Credencial N8N | `MXwK2XnNndg0AdQQ` (googleSheetsOAuth2Api — funciona para Drive) |
| Conta autorizada | `adv.henriqueaugusto@gmail.com` |

**Estrutura**: `CLIENTES / {ano} / {mes} / {nome_cliente} / {processoLabel} / 01-Contratos / 02-Documentos`

---

## ClickUp — H. A. Advocacia

| Campo | Valor |
|---|---|
| Team | `9011774778` |
| API Token env | `→ op://IA-OPERACIONAL/ClickUp-HA-Advocacia/credential` |
| Central do Cliente — Janeiro 2026 | `901113203395` |
| Central do Cliente — Fevereiro 2026 | `901113203396` |
| Central do Cliente — Março 2026 | `901113203399` |
| Gestão/Estratégia space | `90113182196` |
| Execuções Mensais → Março | `901113249320` |

### Campos personalizados — Central do Cliente
| Campo | Field ID |
|---|---|
| docs_url | `662278d5-214d-4ae3-a5e3-749652bfd57b` |
| Nº do Processo | `1358ffb8-cf81-40a2-960f-9dd4bb7eaafd` |
| Infração de Trânsito | `0c1a7404-2ee6-4061-9471-f1fb2b1f1dec` |
| Data do Fato | `90e8f03c-1174-4a0d-9c9d-c9299f1d9462` |
| Próximo Prazo Crítico | `4d56b475-4a6a-43bc-a913-c5453e76e0af` |
| Descrição do Prazo | `f43907b1-f326-456e-b880-4e647ec9c168` |
| Status do Processo | `9fc08c6f-6bb3-45ea-bc4d-6ce22b5d3e5f` |
| Tipo de Processo | `d82b4898-5e57-4ff8-b60a-fe9accedfa7d` |
| Órgão Responsável | `a0ffe748-deac-46a7-828f-d1d0a86393f3` |

### Status do Processo — opções
| ID | Nome |
|---|---|
| `46c29b14` | 📝 01 - Defesa Prévia PAMT |
| `d210640d` | ⏳ 02 - Aguardando Julgamento DP |
| `887ddf5a` | 📄 03 - Recurso JARI |
| `64c8ad69` | ⏳ 04 - Aguardando Julgamento JARI |
| `0829a1df` | 🏛️ 05 - Recurso CETRAN |
| `52a95831` | ⏳ 06 - Aguardando Julgamento CETRAN |
| `0528e53a` | ✅ 07 - Vitória Processual |
| `03db1b47` | ❌ 08 - Arquivado/Encerrado |
| `1f0a311a` | 📝 01 - Defesa Prévia PASDD |
| `b3a06239` | 01 - Confecção P. Inicial (JUDICIAL) |

### Tipo de Processo — opções F5
| keyword | ID ClickUp |
|---|---|
| PAMT | `7abf249c-2773-4e17-9ca4-dfd950645f45` |
| PSDD | `5e914876-8ea0-4c5a-a557-a441424c9ce7` |
| PCDD | `d178f0d2-9407-4212-8b36-ba179b7f6d96` |
| JUDICIAL | `462118de-73ba-4287-b19e-269e2c045246` |

### Infração — opções F5 (keywords → ClickUp option ID)
| Keywords F5 | ID | Nome |
|---|---|---|
| `bafom`/`recus` | `87175b03` | Recusa ao Bafômetro |
| `alcool`/`álcool` | `c4113579` | Dirigir Sob Influência do Álcool |
| `velocidade` | `b9cf9a7e` | Velocidade Superior 50% |
| `transfer`/`retroat`/`ppd` | `46061dfd` | Transferência Retroativa de Veículo |
| `capacete`/`capac` | `45395291` | Condutor Sem Capacete |
| `arrancada` | `7b7761e9` | Arrancada Brusca |
| `perigosa`/`manobra` | `80ea7594` | Manobra Perigosa |
| `forcar`/`ultrapass`/`forç` | `8b4e491c` | Forçar Passagem Sentidos Opostos |
| `contramao`/`5967` | `7456af58` | Ultrapassar pela Contramão |
| `licenc`/`crlv` | `d352179e` | Licenciamento Atrasado |
| `desobedecer`/`ordens` | `2675afbc` | Desobedecer Ordens do Agente |

### Órgão Responsável — opções F5
| Orgão | ID |
|---|---|
| DETRAN-CE | `910f3ebf` |
| PRF-CE | `ffce9a8d` |
| AMC (Fortaleza) | `70095ee3` |
| DETRAN-RN | `3eecd790` |
| PRF-RN | `ac742743` |
| PRF-BA | `a09ff3bd` |
| DNIT | `b74cdac4` |
| DETRAN-PE | `3fd4b885` |
| DETRAN-PI | `601e5ba0` |
| DETRAN-SP | `857a7ca0` |
| DEMUTRAN-ARACATI-CE | `4832819c` |
| DEMUTRAN-REDENÇÃO-CE | `90a7dd93` |
| DEMUTRAN-PAU-DOS-FERROS-RN | `f8c62bc1` |
| DER-SP | `3000be56` |
| PREF-CE | `73df7925` |

---

## Convenções importantes

- **Subtarefas ClickUp**: nome = NOME DO CLIENTE (igual à tarefa principal). Detalhes (AIT, infração, datas) nos campos personalizados.
- **Múltiplos AITs**: tarefa principal = infração mais grave; AITs adicionais = subtarefas com F5 em cada subtask_id.
- **F7 planejado**: atualizar número processo judicial no ADVbox para puxar movimentações automáticas. Pendente para construção futura.
- **N8N webhooks temporários via API NÃO funcionam** — sempre usar workflows existentes. Alternativa para busca ADVbox: modificar F1 temporariamente para GET /customers?name=..., chamar, restaurar.
- **ADVbox PATCH/PUT /lawsuits/{id} retorna 404** — campo "Número do Processo" deve ser atualizado manualmente no ADVbox pela equipe para processos judiciais.

---

## Gestão/Estratégia ClickUp — estrutura

- Espaço: Gestão / Estratégia (`90113182196`)
- Execuções Mensais → Março (`901113249320`)
- SEMANA 01 → Dia 05/03 (`868hp457q`) → Gestão (`868hr6xnd`) → "Fluxo Completo" (`868hr9jha`)
- Reportar execuções de F1→F5 como subtarefas do "Fluxo Completo" no dia correspondente

---

## Processos Judiciais com número registrado (ADVbox pendente manual)

| Cliente | Processo | Tribunal |
|---|---|---|
| Francisco Nisley Cruz Ferreira | 3004838-79.2026.8.06.0001 | 6ª Vara Fazenda Pública — Fortaleza — PJE |
| Jefferson Santos de Souza | 5005032-68.2026.8.24.0090 | TJSC — Juizado Especial Fazenda Pública — Norte da Ilha |
| Frank Santos do Nascimento | 3004788-53.2026.8.06.0001 | TJCE — 2ª Vara Fazenda Pública — Fortaleza |
| Wellington D'Amato | 1504809-72.2025.8.26.0554 | TJSP — 3ª Vara Criminal — Santo André |

---

## Pendências em aberto

1. **MARCOS ROBERTO DOS SANTOS** (`868hrbd2k`): data_fato e prazo ainda desconhecidos — aguardando DETRAN-PI responder ao LAI
2. **GABRIEL ALEXANDRE ALMEIDA** (`868hrbdcy`): PAMT (processo existente no ADVbox por Henrique, LID não mapeado) — só o JUDICIAL novo foi criado (LID 13542764)
3. **Opção ClickUp a adicionar**: 5045-0 "CNH Vencida" → Pablo sub AIT 0000270408
4. **LUIZ ROBERTO**: atualizar numero_processo após protocolo judicial
5. **F7**: construir workflow para atualizar processo judicial no ADVbox
6. **Raimundo William**: CPF 080.032.073-55 rejeitado — verificar se já existe em outro registro no ADVbox

---

## Lições aprendidas

1. **N8N Code node NÃO suporta multi-branch output** → usar IF nodes
2. **ClickUp `include_closed=true`** necessário para buscar tasks fechadas
3. **ADVbox GET /lawsuits**: filtrar por `customer_id` (singular)
4. **ADVbox GET /posts**: NÃO filtra por lawsuit — retorna global
5. **N8N workflow create via API**: NÃO incluir `active` no payload; ativar com `/activate` depois
6. **N8N webhooks criados via API NÃO se registram corretamente** — usar apenas workflows existentes; alternativa: modificar F1 temporariamente para GET
7. **Cloudflare bloqueia ADVbox direto** — sempre via N8N
8. **Email @hotmail.com.br** pode ser inválido no ADVbox — cadastrar sem email se necessário
9. **googleSheetsOAuth2Api** credencial funciona para Drive API também
10. **ADVbox nome duplicado**: retorna "The given data was invalid" (não menciona duplicate) — detectar tentando sem CPF primeiro

---

## 🔐 Credenciais — Vault 1Password IA-OPERACIONAL

> Todos os tokens/chaves devem existir neste vault. Referências: `op://IA-OPERACIONAL/ITEM/credential`

| Serviço | Item 1Password | Observação |
|---|---|---|
| ClickUp | `ClickUp-HA-Advocacia` | Token API admin |
| ZapSign | `ZapSign-HA-Advocacia` | Bearer token API |
| Asaas | `Asaas-HA-Advocacia` | Token produção |
| OpenAI | `OpenAI-HA-Advocacia` | chave de API |
| ElevenLabs | `vbtga64hlqwkjktptrxabr757q` | ID item existente |
| N8N | `N8N-HA-Advocacia` | JWT API key |

> ⚠️ Nunca escrever tokens brutos nos arquivos de memória/workspace — sempre referenciar por `op://`

---

## WF PONTE — Ponte MF03 → F1→F2→F4 (criado 08/03/2026)

| Campo | Valor |
|---|---|
| ID N8N | `yOCjYLU981R6ioWg` |
| Webhook | `wf-ponte-mf03-to-f1f5` |
| Status | INATIVO — aguarda ativação manual + automação ClickUp |

**Para ativar:**
1. N8N: https://n8n.srv1380728.hstgr.cloud/workflow/yOCjYLU981R6ioWg → toggle ON
2. ClickUp automação: MF03 muda para "Validado" → POST `wf-ponte-mf03-to-f1f5` com `{"task_id": "{{task.id}}"}`

**Fluxo:** Webhook → GET task CU → Parse MF02 → Anti-double → F1 → F2 → F4 → Comment resultado
**Fix aplicado:** celular strip DDI 55 (ex: 5585999... → 85999...)
**F3 e F5:** não incluídos no WF PONTE (Drive e campos CU podem ser feitos manualmente ou em etapa futura)

---

## Formato de Prompt para Outra IA (Claude Navegador, etc.)

Quando Henrique pedir um "comando para outra IA", usar obrigatoriamente este formato:

**Blocos obrigatórios (nessa ordem):**
1. Título do Prompt
2. Função da IA
3. Objetivo Principal
4. Contexto Operacional
5. Acesso / Localização
6. Escopo Exato
7. Regras Críticas
8. Lista Exata do que Fazer
9. Passo a Passo Obrigatório
10. Critérios de Segurança
11. Formato de Resposta Obrigatório
12. Resultado Esperado
13. Trava Final

**Estilo:** cirúrgico, literal, organizado. Proibições explícitas (❌). Baixa margem para interpretação livre. Sem ambiguidade.

**Quando usar:** qualquer prompt destinado a outra IA (Claude Navegador, agente web, subagente visual, etc.) para executar ação em sistema externo (ClickUp, ADVbox, N8N, Drive, etc.)

---

## Pendências em aberto — atualizado 08/03/2026

1. **WF PONTE**: ativar no N8N + criar automação ClickUp (MF03 = Validado → webhook)
2. **MF01–MF06** (`OwXrNkgiCqRykq7O`): ainda INATIVO — faltam: webhook ZapSign UI + 3 automações ClickUp
3. **Daniel Pessoa Pereira**: campo "Valor do Contrato" CU está 3297, deveria ser 2299
4. **Danyllo Lucas**: sem cobrança Asaas (MF05 não rodou para ele)
5. **Sistema de câmeras**: aguardando SSH Hostinger + senha dispositivos câmeras
6. **Opção ClickUp "CNH Vencida"**: a criar (Pablo, AIT 0000270408)
7. **Luiz Roberto**: atualizar numero_processo após protocolo judicial
8. **REC01**: adicionar manual trigger (POST /execute não funciona para schedule triggers)
