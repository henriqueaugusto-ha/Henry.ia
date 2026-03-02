# pending.md — Pendências e Bloqueadores

> Itens abertos que precisam de ação. Atualizar sempre que resolver ou surgir novo item.
> Prioridade: 🔴 Urgente | 🟡 Importante | ⬜ Backlog

---

## 🔴 URGENTE

### OAuth Google Ads — Vence 03/03/2026 🔴 HOJE
- Status: vence HOJE (03/03) — ação imediata
- Impacto: WF-ROAS para de reportar, campanhas ficam cegas

### GitHub PAT — Push do workspace travado 🔴
- git init ✅, commit inicial ✅ (38 arquivos), push ❌ (sem token)
- Repo: `henriqueaugusto-ha/Henry.ia` (privado)
- Ação: github.com → Settings → Developer settings → Personal access tokens (classic) → permissão `repo` → salvar no 1Password item "GitHub Henry.IA" campo `token`

### Haiku model string — Validar às 10h
- Heartbeat configurado com `anthropic/claude-haiku-3-5`
- Se falhar: ajustar para modelo disponível (ex: Gemini Flash)

### ⚠️ 497 Cobranças Vencidas no Asaas (~R$473k)
- Encontrado em 02/03 via API
- Cobranças desde nov/2025 sem recebimento
- Oportunidade: recuperação de 20% = ~R$95k (meta março sem novos contratos)
- Próximo passo: Dr. Henrique autoriza análise detalhada por mês/valor/tipo
- Henry NÃO toca — só analisa e reporta

### N8N GCLID Workflows — Inativos (atribuição Google Ads)
- WF-TRACKING-GCLID e WF-UPLOAD-CONVERSAO inativos
- Impacto: conversões do Google Ads podem não estar sendo atribuídas corretamente
- Aguardando decisão do Dr. Henrique para reativar

### N8N ZapSign Análise Contratos — Inativo
- Fluxo que deveria automatizar o processo manual do PDF (pós-assinatura)
- Estava inativo — pode ser o WF incompleto aguardando finalização

### N8N API Key — ✅ RESOLVIDO
- Nova chave salva como "N8N API - Henry.Ia" (UUID: vv6rbyo6rhpauyurzc3jvopqwe)
- API conectada e funcionando

### Asaas API Key — Adicionar ao 1Password
- Status: chave não está no cofre
- Impacto: bloqueia automação completa do fluxo pós-contrato
- Ação: Dr. Henrique salva chave no 1Password → Henry testa integração

### OAuth Google Ads — Vence ~03/03/2026 (MOVIDO ACIMA)
- Status: token expirando em dias
- Ação: renovar OAuth antes de 03/03
- Impacto: campanhas Google Ads param de reportar dados → ROAS cego

---

## 🟡 IMPORTANTE

### Hardening final — Migrar tokens hardcoded do openclaw.json para .env
- Arquivo de tarefa: `tasks/hardening-final-2026-02-28.md`
- Status: pendente
- Tokens afetados: botToken, hooks.token, appToken Slack
- Ação: substituir por referências ao cofre 1Password

### Flags controlUi — Desligar uma a uma após acesso externo garantido
- Status: todas as 3 flags ainda ativas (necessário enquanto acesso externo não estiver garantido)
- Flags: `dangerouslyAllowHostHeaderOriginFallback`, `allowInsecureAuth`, `dangerouslyDisableDeviceAuth`
- Bloqueador: acesso externo seguro (Cloudflare Tunnel ou Nginx+HTTPS) ainda não implementado

### Acesso externo ao painel — Cloudflare Tunnel vs Nginx+HTTPS
- Status: indefinido (decisão pendente do Dr. Henrique)
- Impacto: sem acesso externo seguro, flags perigosas ficam ativas

### WF-SDR-AI — Agente IA para Walisom qualificar leads
- Status: planejado, não iniciado
- Prioridade: alta (alavanca comercial)

### WF-LEGAL — IA para produção jurídica / petições
- Status: planejado, não iniciado

### ANPP — Campanha Google+Meta
- Status: produto definido, campanha não executada
- Meta: R$4-5k por caso, urgência como gatilho

### Auditoria contratos janeiro/2026
- Status: pendente
- Contexto: clientes que assinaram em jan/2026 e ficaram sem acompanhamento após saída da equipe
- Estimativa: 15-20 processos trabalhistas com honorários a receber

---

## ⬜ BACKLOG

### BOOTSTRAP.md — Deletar (obsoleto)
- Status: arquivo ainda existe, deve ser removido
- Ação: `rm /data/.openclaw/workspace/BOOTSTRAP.md`

### Avatar henry.png — Criar
- Referenciado em IDENTITY.md como `avatars/henry.png`
- Status: arquivo não existe

### WF-SUPPORT — IA no suporte ao cliente (Ana Laura)
- Status: planejado, dependente de Ana Laura estar mais autônoma

### Advbox API — Documentar
- Status: API retorna 302 (redirect) — investigar e documentar

### Produtos digitais — Estruturar (não lançar)
- E-book trânsito, app, curso
- Status: ideia registrada, estruturar quando comercial estiver estável

### Feedback Loop — Configurar após acumular padrões (Módulo 4)
- Criar `memory/feedback/` com JSONs por domínio
- Domínios: `comercial.json`, `automacao.json`, `comunicacao.json`, `operacional.json`
- Ativar após ~20-30 registros de decisões aceitas/rejeitadas
- Status: estrutura definida, implementação adiada conscientemente
