# PROJETO — Agentes para Produção Jurídica Automatizada

**Registrado:** 03/03/2026 11h07  
**Prioridade:** Alta (setor jurídico é gargalo operacional)  
**Objetivo:** Substituir produção manual repetitiva por fluxo automatizado de 4 agentes

---

## PROBLEMA ATUAL

Produção jurídica repetitiva consome tempo humano:
- Defesa prévia (recusa bafômetro, velocidade, etc.)
- Recurso JARI (1ª instância)
- Recurso CETRAN (2ª instância)
- Todos usam **mesmas argumentações** para mesma infração
- Só muda: dados do cliente, nº auto de infração, qualificação

**Processo manual hoje:**
1. Dr. Henrique usa prompts no Google Cloud
2. Cloud gera texto
3. **Problema:** perde formatação do Word
4. Humano precisa reformatar manualmente (negrito, espaçamento, padrão visual)

**Gargalo:** Encontrar pessoas para fazer. Com padrão automatizado, não precisa.

---

## SOLUÇÃO PROPOSTA — FLUXO 4 AGENTES

### Agente 1 — Extração de Dados
**Entrada:** Contrato + Procuração do cliente (PDF ou digitalizados)  
**Ação:** Extrair:
- Nome completo do cliente
- CPF / RG
- Endereço completo
- Qualificação (profissão, estado civil)
- Nº Auto de Infração
- Data da infração
- Local da infração
- Tipo de infração (recusa bafômetro, velocidade, etc.)

**Saída:** JSON estruturado com todos os dados

---

### Agente 2 — Estruturação e Validação
**Entrada:** JSON do Agente 1  
**Ação:**
- Recebe dados extraídos
- Valida se todos os campos obrigatórios estão preenchidos
- Identifica tipo de defesa necessária (prévia, JARI, CETRAN)
- Identifica tipo de infração (para pegar modelo correto)
- Estrutura dados no formato esperado pelo Agente 3

**Saída:** JSON validado + identificação do modelo a usar

---

### Agente 3 — Produção do Documento
**Entrada:** JSON validado + modelo Word correto  
**Ação:**
- Abre modelo Word com argumentação padrão
- **Substitui placeholders** mantendo formatação:
  - `{{NOME_CLIENTE}}` → Nome completo
  - `{{CPF}}` → CPF formatado
  - `{{AUTO_INFRACAO}}` → Número do auto
  - `{{DATA_INFRACAO}}` → Data formatada
  - (e todos os demais campos)
- **Preserva formatação:** negrito, itálico, espaçamento, fonte, margens

**Saída:** Documento Word (.docx) pronto, formatado, revisável

---

### Agente 4 — Revisão e Controle de Qualidade
**Entrada:** Documento gerado pelo Agente 3  
**Ação:**
- Verifica se todos os placeholders foram substituídos
- Detecta campos vazios ou com valor padrão
- Valida se formatação foi preservada
- Gera relatório de qualidade

**Saída:**
- ✅ Aprovado → envia para humano apenas para conferência final
- ❌ Reprovado → lista erros encontrados, volta para Agente 3

---

## ENTRAVE ATUAL — FORMATAÇÃO WORD

**Problema:**
Quando usa N8N ou automação comum, o documento perde:
- Negrito, itálico
- Espaçamento entre parágrafos
- Fonte e tamanho específicos
- Margens e alinhamento
- Cabeçalho e rodapé
- Numeração de parágrafos

**Por que isso acontece:**
Muitas ferramentas de automação tratam Word como "texto puro" e re-criam o documento do zero, perdendo a formatação original.

---

## SOLUÇÕES TÉCNICAS — PRESERVAR FORMATAÇÃO

### ✅ OPÇÃO 1 — Docxtemplater (RECOMENDADA)
**O que é:** Biblioteca JavaScript que substitui placeholders em .docx **sem destruir formatação**

**Como funciona:**
1. Você cria modelo Word normal com placeholders: `{nome}`, `{cpf}`, `{auto}`
2. Docxtemplater abre o .docx, substitui os placeholders, salva
3. **Formatação original é 100% preservada**

**Integração N8N:**
- N8N tem node "Execute Command" ou "Function"
- Roda script Node.js com Docxtemplater
- Entrada: JSON de dados + modelo .docx
- Saída: .docx preenchido e formatado

**Vantagens:**
- ✅ Preserva formatação complexa
- ✅ Funciona com qualquer modelo Word
- ✅ Rápido e confiável
- ✅ Open source

**Desvantagens:**
- ⚠️ Precisa instalar biblioteca no servidor (N8N)

**Documentação:** https://docxtemplater.com/

---

### ✅ OPÇÃO 2 — Microsoft Word API (Office 365)
**O que é:** API oficial Microsoft para manipular documentos Word programaticamente

**Como funciona:**
1. Modelo Word no OneDrive/SharePoint
2. API abre documento, substitui placeholders via comandos nativos
3. Salva documento formatado

**Integração N8N:**
- N8N tem node "Microsoft OneDrive" / "Microsoft Graph"
- Chama API Word para preencher template
- Formatação preservada porque usa motor nativo Word

**Vantagens:**
- ✅ Formatação 100% preservada (é o próprio Word)
- ✅ Suporta recursos avançados (tabelas, imagens, cabeçalhos)
- ✅ Integração nativa com Microsoft 365

**Desvantagens:**
- ⚠️ Precisa conta Microsoft 365 Business (pago)
- ⚠️ Modelos ficam no OneDrive (não local)
- ⚠️ Latência de API (requisições HTTP)

**Documentação:** https://learn.microsoft.com/graph/api/resources/word

---

### ✅ OPÇÃO 3 — Google Docs API
**O que é:** Criar documentos Google Docs programaticamente com formatação

**Como funciona:**
1. Modelo Google Docs com placeholders
2. API substitui placeholders mantendo estilos
3. Exporta como .docx se necessário

**Integração N8N:**
- N8N tem node "Google Docs"
- Chama API para preencher template
- Exporta como PDF ou .docx

**Vantagens:**
- ✅ Gratuito (Google Workspace básico)
- ✅ Formatação preservada
- ✅ Colaboração em tempo real

**Desvantagens:**
- ⚠️ Não é .docx nativo (pode ter pequenas diferenças ao exportar)
- ⚠️ Precisa converter para Word se necessário

---

### ⚠️ OPÇÃO 4 — Python-docx (menos recomendada)
**O que é:** Biblioteca Python para criar/editar .docx

**Por que não é ideal:**
- Formatação precisa ser aplicada programaticamente (linha por linha)
- Muito mais trabalhoso que usar template pronto
- Bom para criar docs do zero, ruim para templates

---

## RECOMENDAÇÃO FINAL

**Para o caso do Dr. Henrique: DOCXTEMPLATER**

**Por quê:**
1. Modelo Word fica local (não precisa OneDrive)
2. Formatação 100% preservada
3. Rápido (não depende de API externa)
4. Funciona offline
5. Zero custo adicional (open source)
6. Integra direto com N8N

**Próximos passos:**
1. Instalar `docxtemplater` no servidor N8N
2. Criar modelos Word com placeholders (`{nome}`, `{cpf}`, etc.)
3. Construir workflow N8N:
   - Input: dados do cliente (via ClickUp ou formulário)
   - Node 1: Chamar Agente 1 (extração)
   - Node 2: Chamar Agente 2 (validação)
   - Node 3: Docxtemplater (preencher modelo)
   - Node 4: Chamar Agente 4 (revisão)
   - Output: .docx pronto + notificação Slack
4. Testar com 1 modelo (defesa prévia recusa bafômetro)
5. Replicar para outros modelos (JARI, CETRAN, outras infrações)

---

**Impacto esperado:**
- Produção jurídica: de 30-40 min/documento → 2-3 min automatizado
- Qualidade: padronização total, zero erro de digitação
- Escala: 1 pessoa revisa 10x mais documentos
- Gargalo eliminado: não precisa contratar para produção repetitiva

---

*Aguardando autorização do Dr. Henrique para iniciar implementação.*
