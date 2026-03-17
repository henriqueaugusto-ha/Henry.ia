# Briefing: Workflow 01 — Monitoramento do Suporte

> Fonte: Documento Word do Dr. Henrique (17/03/2026)
> Prioridade: 🔴 ALTA — Fase 1 antes de qualquer automação de resposta

---

## OBJETIVO

Workflow único de monitoramento — NÃO RESPONDE o cliente. Observa, interpreta e reporta.

Transformar caos operacional em visão gerencial: quem entrou em contato, o que pediu, o que foi respondido, status da conversa.

## STACK

- **Evolution API** → conecta ao WhatsApp monitorado
- **N8N** → workflow único com blocos internos organizados
- **IA** (OpenAI) → interpretar conversas, classificar status
- **Slack** → canal de entrega executiva

## BLOCOS DO WORKFLOW

| Bloco | Função |
|-------|--------|
| Entrada | Receber eventos da Evolution API + gatilhos de horário |
| Filtro | Separar relevantes de ruído técnico |
| Normalização | Padronizar nome, número, horário, tipo, origem, IDs |
| Mídia | Identificar texto/áudio/imagem/doc, baixar e preparar |
| IA | Interpretar: o que cliente quer, o que equipe respondeu, status |
| Consolidação | Agrupar por cliente/conversa e janela do dia |
| Slack | Alertas + resumo parcial + resumo final |

## ENTREGÁVEIS

- Resumo parcial do dia (00h até horário atual)
- Resumo final 18h
- Lista clientes que interagiram
- Para cada: nome, número, horário, tema, mídias, pergunta, resposta, status
- Conversas sem resposta ou parciais identificadas
- Catalogação: FAQ, padrões de mídia, recorrência, pontos sensíveis

## FORMATO SLACK

| Momento | Conteúdo |
|---------|----------|
| Durante o dia | Alertas críticos, sem resposta, pendências sensíveis |
| Resumo parcial | Qtd clientes, respondidos vs pendentes, destaques |
| Resumo final | Panorama completo, temas recorrentes, gargalos |

## DECISÕES ARQUITETURAIS

- **1 workflow único** (não vários) — acelerar implementação, facilitar teste
- **IA só depois da normalização** — nunca receber webhook bruto
- **Não responde cliente** — apenas observa e cataloga
- **Histórico retroativo** depende da config de sync da Evolution API

## FASE 2 (futuro, após Fase 1 madura)

Agente contextual que:
- Consulta Central do Cliente no ClickUp (serviço, fase, restrições)
- Responde exatamente o que foi perguntado
- Separa assuntos por tema
- Explica desenvolvido (sem resumir demais)
- Verifica se há outro ponto pendente
- Atualiza histórico cronológico do cliente

## AÇÕES HENRY

1. [ ] Configurar Evolution API (instância WhatsApp suporte)
2. [ ] Importar template JSON no N8N e ajustar aos endpoints reais
3. [ ] Configurar sync histórico (se Dr. Henrique quiser ver passado)
4. [ ] Mapear payloads reais da Evolution (template pode exigir ajuste)
5. [ ] Configurar IA após normalização
6. [ ] Criar canal Slack específico para monitoramento
7. [ ] Período de teste → validar se resumo é fiel à operação
8. [ ] Ajustar prompt de classificação com padrão real observado

## REFERÊNCIA

- Template: `monitoramento_suporte_evolution_template_n8n.json` (mencionado no briefing — não recebido ainda)
