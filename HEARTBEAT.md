# HEARTBEAT.md — Henry IA

## Checklist (a cada heartbeat)

- Verificar /home/node/ha-operations/memory/pending.md — há itens 🔴 urgentes?
- Crons rodando? (openclaw cron list)
- Algum alerta financeiro (Asaas, cobranças)?

## Regras

- Se nada urgente → HEARTBEAT_OK (não envia nada)
- Se há item crítico → alerta imediato com detalhes
- Horário de silêncio: 23h → 7h (exceto colapso de sistema)
- Fins de semana: só alertas críticos

## Semanal (sexta)

- Revisão de projetos ativos (cron automático às 18h já faz isso)
- Atualizar MEMORY.md no ha-operations com aprendizados da semana

## Nota técnica

- Crons principais: Daily Briefing 7h (sonnet), Watchdog 8h (haiku), Heartbeat 14h (haiku), Revisão Sexta 18h (sonnet)
- Modelo heartbeat nativo: sonnet (não alterar — haiku nativo não configurado)
- Repo memória: /home/node/ha-operations (git push semanal)
