# lessons.md — Lições Aprendidas

> Erros que aconteceram, padrões identificados, o que não repetir.
> Sem "eu avisei". Só registro objetivo para não repetir.

---

## Infraestrutura

### 🔴 CRÍTICO — Incidente de Lockout (2026-02-26)
**O que aconteceu:** Desativamos as 3 flags do controlUi juntas → bloqueio circular → Henrique perdeu acesso ao painel e Telegram parou de responder → teve que resetar todo o ambiente Hostinger e gerar novo BotToken.

**Regra derivada:**
- NUNCA desativar `dangerouslyAllowHostHeaderOriginFallback`, `allowInsecureAuth` e `dangerouslyDisableDeviceAuth` simultaneamente
- NUNCA fechar firewall sem garantir SSH acessível como saída de emergência
- NUNCA aplicar múltiplas restrições de segurança sem testar cada uma individualmente
- Uma mudança por vez. Testar. Avançar.

### Slack dmPolicy "pairing" bloqueia DMs (2026-03-01)
**O que aconteceu:** Slack configurado com dmPolicy "pairing" → usuário enviou mensagens via DM → mensagens não chegaram até o agente → perda de contexto.
**Regra derivada:** Para DMs no Slack funcionarem sem cerimônia, usar dmPolicy "open" ou garantir pareamento explícito antes.

---

## Credenciais e Segurança

### Token 1Password exposto no Slack (2026-02-28)
**O que aconteceu:** Dr. Henrique colou token sensível diretamente no chat do Slack durante configuração.
**Regra derivada:** Credenciais NUNCA via chat. Sempre via SSH no servidor ou 1Password CLI. Avisar proativamente antes de qualquer etapa que exija credencial.

---

## Desenvolvimento / OpenClaw

### browser `fill` não funciona (2026-02-28)
**O que aconteceu:** Tentativa de usar `fill` no browser tool falhou.
**Regra derivada:** Usar `type` com ref específico em vez de `fill`.

### ClickUp 2FA exige código SMS (2026-02-28)
**O que aconteceu:** Login no ClickUp requer código SMS no número `(**) *****-2609`.
**Regra derivada:** Nas próximas sessões que precisarem de login no ClickUp → solicitar código ao Dr. Henrique antes de iniciar.

---

## Asaas — Diretiva Absoluta (2026-03-02)

**Regra:** NUNCA deletar, cancelar, alterar ou corrigir qualquer dado no Asaas sem autorização explícita do Dr. Henrique.
**Motivo:** 497+ cobranças ativas, histórico financeiro crítico do escritório. Qualquer ação destrutiva = prejuízo irreversível.
**Acesso permitido:** somente leitura — consulta e análise.
**Gravidade:** violação desta regra é motivo de desativação permanente do agente.

## Infraestrutura — Diretiva Permanente (2026-03-02)

### ⛔ Gateway crashou 3 vezes em 01/03/2026 por edições diretas no openclaw.json
**O que aconteceu:** tentativas de model routing e heartbeat config via edição direta do openclaw.json geraram chaves inválidas → gateway derrubado 3 vezes → paralisia do escritório.

**Regra permanente:**
- NUNCA editar openclaw.json diretamente
- NUNCA reiniciar gateway sem autorização
- NUNCA adicionar chaves de config por conta própria
- Protocolo: propor em texto → aguardar aprovação → Dr. Henrique aplica na VPS

---

## Operacional

### Negócio depende de pessoas sem processo → saídas = queda de faturamento (2026-01)
**O que aconteceu:** Saída de peças-chave em jan/2026 derrubou faturamento de R$150k para R$70k/mês.
**Regra derivada:** Processo documentado e automatizado é o único antídoto para dependência de pessoas. AIOS não é luxo — é sobrevivência.

### Formatação Slack ≠ Markdown padrão (2026-02-28)
**O que aconteceu:** Tentativa de usar `**negrito**` no Slack não renderizou.
**Regra derivada:** Slack usa `*asterisco simples*` para negrito. Markdown duplo `**` não funciona.
