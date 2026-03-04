# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## ElevenLabs TTS

### Estratégia de Vozes (definida 04/03/2026)

- **Voz padrão (conversas, briefings, tarefas)**: Voz do Dr. Henrique (clonada)
  - ID: `Z2KjMO9X85ad9ZpRy8ZM`
  - Uso: dia a dia, respostas operacionais, relatórios de tarefas

- **Voz racional (análises, estratégia, conteúdo sério)**:  Voz 1
  - ID: `EkK5I93UQWFDigLMpZcX`
  - Uso: análises estratégicas, conteúdo formal, momentos que pedem tom mais neutro/racional

- **Fallback**: OpenAI TTS onyx (pt-BR) — quando créditos ElevenLabs esgotados
- **Vozes descartadas**: `aU2vcrnwi348Gnc2Y1si` | George `JBFqnCBsd6RMkjVDRZzb`
- **Model**: `eleven_multilingual_v2`
- **Settings padrão**: stability 0.5, similarity_boost 0.91, speaker_boost true
- **API Key**: item `vbtga64hlqwkjktptrxabr757q` no vault 1Password IA-OPERACIONAL
- **Nota**: chave atual sem permissão `user_read` — só TTS funciona

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
