# Estratégia de Segurança — H.A. Advocacia VPS

> Documento criado em 2026-02-26. Aprovado por Henrique Augusto.

---

## Lição do Incidente

Segurança aplicada sem plano de contingência gera auto-bloqueio.
- Nunca aplicar múltiplas mudanças estruturais ao mesmo tempo
- Cada alteração: Backup → Aplicar → Testar → Avançar

---

## Regra Operacional Permanente

Antes de QUALQUER alteração estrutural:
1. Confirmar SSH funcional
2. Confirmar painel funcional
3. Confirmar Telegram funcional
4. Gerar backup do openclaw.json
5. Nunca aplicar firewall + gateway + auth no mesmo ciclo

---

## Modelo Final Desejado

```
Internet
  ↓
UFW (22 + 443)
  ↓
Nginx HTTPS
  ↓
OpenClaw (bind local only — 127.0.0.1)
  ↓
Telegram allowlist (só Henrique)
```

---

## Etapas de Implementação

### ✅ Etapa 1 — Auditoria de exposição atual (CONCLUÍDA 2026-02-26)
- [x] Confirmar portas expostas via `docker ps` → 0.0.0.0:62585
- [x] Confirmar bind do gateway → era 0.0.0.0, corrigido para 127.0.0.1
- [x] Testar externamente → exposição confirmada e eliminada

### ✅ Etapa 1B — Blindagem Docker (CONCLUÍDA 2026-02-26)
- [x] Arquivo: `/docker/openclaw-ulim/docker-compose.yml`
- [x] Alterado: `"${PORT}:${PORT}"` → `"127.0.0.1:62585:${PORT}"`
- [x] Container recriado via `docker compose up -d`
- [x] Verificado: `ss -lntp | grep 62585` → bind em 127.0.0.1 apenas
- [x] Regras UFW para 62585 removidas (desnecessárias)
- [x] SSH (22) intacto
> Porta 62585 não está mais exposta externamente. Acesso apenas local na VPS.

### ⬜ Etapa 2 — Acesso externo seguro (próxima)
Escolher e implementar UMA das opções:
- **Opção A (simples):** Cloudflare Tunnel — zero portas, zero IP exposto
- **Opção B (profissional):** Nginx + Certbot HTTPS na 443

### ⬜ Etapa 3 — Endurecimento gradual do UFW
- [ ] Manter apenas 22 liberada (443 se optar por Nginx)
- [ ] Confirmar funcionamento completo

### ⬜ Etapa 4 — Desligar flags perigosas (uma por vez)
- [ ] `allowInsecureAuth` → false + teste
- [ ] `dangerouslyAllowHostHeaderOriginFallback` → false + teste
- [ ] `dangerouslyDisableDeviceAuth` → avaliar + teste
> Aplicar uma flag por vez. Testar após cada alteração.

### ⬜ Etapa 5 — Gestão de credenciais
- [ ] Instalar 1Password CLI na VPS
- [ ] Migrar credenciais (BotToken, gateway token, etc.)
- [ ] Remover secrets hardcoded
