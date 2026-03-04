# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## ElevenLabs TTS

### Estratégia de Vozes — ESQUEMA HÍBRIDO (definido 04/03/2026)

Objetivo: economizar créditos ElevenLabs usando cada voz no contexto certo.

| Prioridade | Voz | ID | Quando usar |
|---|---|---|---|
| 1ª (maioria) | OpenAI onyx (pt-BR) | — | Respostas rápidas, confirmações, dia a dia |
| 2ª (especial) | Henrique Augusto (clonada) | `Z2KjMO9X85ad9ZpRy8ZM` | Briefings, alertas importantes, momentos que pedem sua voz |
| 3ª (estratégico) | Voz Racional | `EkK5I93UQWFDigLMpZcX` | Análises críticas, decisões estratégicas, tom formal |

**Regra de decisão:**
- Resposta rotineira → OpenAI onyx
- Briefing matinal, alerta crítico, reunião importante → Voz Henrique
- Análise estratégica, relatório de alto impacto → Voz Racional

**Detalhes técnicos ElevenLabs:**
- Model: `eleven_multilingual_v2`
- Settings padrão: stability 0.5, similarity_boost 0.91, speaker_boost true
- API Key: item `vbtga64hlqwkjktptrxabr757q` no vault 1Password IA-OPERACIONAL
- Nota: chave sem permissão `user_read` — apenas TTS funciona
- Vozes descartadas: `aU2vcrnwi348Gnc2Y1si` | George `JBFqnCBsd6RMkjVDRZzb`

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
