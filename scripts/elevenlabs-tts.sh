#!/bin/bash
# ElevenLabs TTS — Voz: George (JBFqnCBsd6RMkjVDRZzb)
# Uso: ./elevenlabs-tts.sh "texto aqui" /caminho/saida.mp3

TEXT="$1"
OUTPUT="${2:-/tmp/henry_tts.mp3}"
VOICE_ID="JBFqnCBsd6RMkjVDRZzb"  # George — warm, captivating, mature
MODEL="eleven_multilingual_v2"

# Ler chave do .env
if [ -z "$ELEVENLABS_API_KEY" ]; then
  ELEVENLABS_API_KEY=$(grep ELEVENLABS_API_KEY /data/.openclaw/.env | cut -d= -f2-)
fi

curl -s -X POST "https://api.elevenlabs.io/v1/text-to-speech/$VOICE_ID" \
  -H "xi-api-key: $ELEVENLABS_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"text\": \"$TEXT\",
    \"model_id\": \"$MODEL\",
    \"voice_settings\": {
      \"stability\": 0.5,
      \"similarity_boost\": 0.8,
      \"style\": 0.2,
      \"use_speaker_boost\": true
    }
  }" \
  --output "$OUTPUT"

echo "$OUTPUT"
