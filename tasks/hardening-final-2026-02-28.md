# Tarefa: Hardening Final — Meta 9,5/10
**Data:** Sábado, 28/02/2026
**Status:** PENDENTE

---

## Objetivo
Migrar todas as credenciais hardcoded do `openclaw.json` para variáveis de ambiente via `${VAR}` usando `/data/.openclaw/.env`.

---

## Escopo autorizado

### ✅ Criar
- Backup versionado: `/data/.openclaw/openclaw.json.bak.YYYYMMDD_HHMMSS`
- Novo arquivo: `/data/.openclaw/.env` com permissões `600`

### ✅ Modificar (somente estes 5 campos)
| Campo | Variável |
|---|---|
| `channels.telegram.botToken` | `${TELEGRAM_BOT_TOKEN}` |
| `hooks.token` | `${OPENCLAW_GATEWAY_TOKEN}` |
| `gateway.auth.token` | `${OPENCLAW_GATEWAY_TOKEN}` |
| `gateway.remote.token` | `${OPENCLAW_GATEWAY_TOKEN}` |
| `models.providers.nexos.apiKey` | `${NEXOS_API_KEY}` |

### ❌ NÃO tocar
- UFW
- docker-compose
- Portas / bindAddr
- RestartPolicy
- Fail2ban

---

## Passos de execução

**Passo 1 — Backup**
```bash
cp /data/.openclaw/openclaw.json \
   /data/.openclaw/openclaw.json.bak.$(date +%Y%m%d_%H%M%S)
```

**Passo 2 — Criar .env**
```bash
cat > /data/.openclaw/.env << 'EOF'
TELEGRAM_BOT_TOKEN=<valor_atual>
OPENCLAW_GATEWAY_TOKEN=<valor_atual>
NEXOS_API_KEY=<valor_atual>
EOF
chmod 600 /data/.openclaw/.env
```

**Passo 3 — Atualizar openclaw.json**
Substituir os 5 campos acima pelos `${VAR}` correspondentes.

---

## Validação pós-migração
- [ ] Gateway recarregou sem erros
- [ ] Telegram responde normalmente
- [ ] Sem erro de auth nos logs (`openclaw logs`)

---

## Rollback (se qualquer erro)
```bash
cp /data/.openclaw/openclaw.json.bak.TIMESTAMP \
   /data/.openclaw/openclaw.json
rm /data/.openclaw/.env
```

---

## Resultado esperado
Nota de hardening: **9,5 / 10** ✅
