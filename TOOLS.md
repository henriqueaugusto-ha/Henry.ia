---
summary: "Workspace template for TOOLS.md"
read_when:
  - Bootstrapping a workspace manually
---

# TOOLS.md - Local Notes

## ⚠️ REGRA OBRIGATÓRIA — SEGURANÇA

> **TODA senha, credencial, API key ou informação sensível DEVE ser salva no 1Password.**
> Jamais hardcode em arquivos de config, código, scripts ou mensagens.
> Sem exceção. Sempre.

- Gerenciador: **1Password CLI** (`op`)
- VPS: `srv1427194` (72.60.49.222)
- Referência no código: `op read "op://Vault/Item/field"`

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.

---

## Skills Ativas

### 🎙️ ElevenLabs TTS — Voz padrão: George
- **Voice ID:** JBFqnCBsd6RMkjVDRZzb
- **Modelo:** eleven_multilingual_v2
- **Perfil:** warm, captivating, mature storyteller
- **Script:** `workspace/scripts/elevenlabs-tts.sh "texto" /caminho/saida.mp3`
- **Chave:** 1Password "API ElevenLabs" → ELEVENLABS_API_KEY no .env
- **Plano:** Free (10k chars/mês) — upgrade pra $5 para clonagem de voz

### 🔐 1password (built-in)
- **O que faz:** Lê/cria/atualiza credenciais no 1Password via CLI
- **Dependência:** `op` binary — disponível em `/data/op` (v2.30.3)
- **Token:** `OP_SERVICE_ACCOUNT_TOKEN` em `/data/.openclaw/.env`
- **Cofre:** IA-OPERACIONAL (Vault ID: mzeqvatyexb7yplnl6o6ajq7bu)
- **Uso:** sempre via tmux session (requisito da skill)

### 🛡️ healthcheck (built-in)
- **O que faz:** Auditoria de segurança da VPS, hardening, monitoramento de exposição
- **Dependência:** nenhuma
- **Comando:** `openclaw security audit [--deep]`
- **Último audit:** 2026-03-01 — 3 critical (controlUi flags + groupPolicy open), 3 warn
- **Itens críticos conhecidos:**
  - `dangerouslyDisableDeviceAuth=true` — manter até acesso externo garantido
  - `groupPolicy=open` no Telegram e Slack — risco de prompt injection
  - 3 flags controlUi ativas — aguardando Nginx/Cloudflare Tunnel

### ⬜ gog / Google Workspace (built-in — PENDENTE)
- **O que faz:** Gmail, Calendar, Drive, Sheets, Docs
- **Por que instalar:** acesso ao Drive, henry.ia.assistant@gmail.com, Sheets de relatórios
- **Bloqueador:** precisa instalar `gog` CLI + OAuth Google Cloud Console (client_secret.json)
- **Próximo passo:** Dr. Henrique autoriza e cria projeto no Google Cloud Console

## Skills NÃO Instaladas (e por quê)

| Skill | Motivo |
|---|---|
| `n8n-monitor` (ClawHub) | ❌ Stub — código não faz nada, só retorna string vazia |
| `slack-admin` (ClawHub) | ❌ Redundante — `slack` built-in já cobre |
| `notion-db` | ❌ Usa ClickUp, não Notion |
| `stripe-api` | ❌ Usa Asaas, não Stripe |
| `remind-me` | ❌ Cron nativo já resolve |
| `weather` | ❌ Não crítico para o perfil |
| Skills WhatsApp | ❌ Usa ChatGuru/Waspeed — conflito de arquitetura |