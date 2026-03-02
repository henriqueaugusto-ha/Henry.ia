# ROLLBACK.md — Regras de Backup e Reversão

> Antes de qualquer mudança estrutural: backup obrigatório.
> Sem backup = sem mudança.

---

## Regra de Ouro

Antes de qualquer uma dessas ações:
- Modificar openclaw.json
- Criar/deletar crons
- Alterar workflows N8N
- Modificar arquivos críticos (AGENTS.md, SOUL.md, MEMORY.md)
- Instalar ou remover skills
- Alterar configurações de firewall/infra

**Executar:**
```bash
mkdir -p /data/.openclaw/workspace/backups/$(date +%Y-%m-%d_%H-%M)
cp /data/.openclaw/openclaw.json /data/.openclaw/workspace/backups/$(date +%Y-%m-%d_%H-%M)/openclaw.json
```

---

## Como Reverter (Rollback)

### 1. Identificar o backup
```bash
ls /data/.openclaw/workspace/backups/
```

### 2. Restaurar o arquivo
```bash
cp /data/.openclaw/workspace/backups/YYYY-MM-DD_HH-MM/openclaw.json /data/.openclaw/openclaw.json
```

### 3. Reiniciar o gateway (somente Dr. Henrique executa)
```bash
openclaw gateway restart
```

---

## Proteções que NUNCA dependem de backup

Estas regras são absolutas — backup não justifica violar:

- NUNCA editar openclaw.json sem autorização (3 crashes em 01/03)
- NUNCA desativar flags de segurança simultaneamente (lockout em 26/02)
- NUNCA alterar Asaas sem autorização explícita
- NUNCA fechar SSH sem rota alternativa garantida

---

## Histórico de Incidentes

| Data | Incidente | Causa | Impacto |
|------|-----------|-------|---------|
| 2026-02-26 | Lockout total | 3 flags controlUi desativadas juntas | Reset completo do ambiente |
| 2026-03-01 | Gateway caiu 3x | Edição direta do openclaw.json | Paralisia + perda de contexto |

---

*Última atualização: 2026-03-02*
