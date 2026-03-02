#!/bin/bash
# backup.sh — Snapshot do workspace antes de mudanças estruturais
# Uso: bash workspace/scripts/backup.sh

TIMESTAMP=$(date +%Y-%m-%d_%H-%M)
BACKUP_DIR="/data/.openclaw/workspace/backups/$TIMESTAMP"

mkdir -p "$BACKUP_DIR"

# Config
cp /data/.openclaw/openclaw.json "$BACKUP_DIR/openclaw.json" 2>/dev/null && echo "✅ openclaw.json" || echo "⚠️ openclaw.json não acessível"

# Workspace crítico
for f in MEMORY.md AGENTS.md SOUL.md HEARTBEAT.md ROLLBACK.md; do
  cp "/data/.openclaw/workspace/$f" "$BACKUP_DIR/" 2>/dev/null && echo "✅ $f" || echo "❌ $f ausente"
done

# Memory files
cp -r /data/.openclaw/workspace/memory "$BACKUP_DIR/memory" 2>/dev/null && echo "✅ memory/" || echo "❌ memory/"

echo ""
echo "📦 Backup salvo em: $BACKUP_DIR"
echo "Para reverter: cp $BACKUP_DIR/openclaw.json /data/.openclaw/openclaw.json && openclaw gateway restart"
