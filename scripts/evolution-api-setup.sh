#!/bin/bash
# =============================================================
# INSTALAÇÃO EVOLUTION API v2 — H.A. Advocacia
# VPS: srv1427194 (72.60.49.222)
# Executar via SSH como root
# =============================================================

set -e

echo "🚀 Instalando Evolution API v2..."

# 1. Criar diretório
mkdir -p /opt/evolution-api
cd /opt/evolution-api

# 2. Gerar API Key segura
EVOLUTION_API_KEY=$(openssl rand -hex 32)
echo "🔑 API Key gerada: $EVOLUTION_API_KEY"
echo ""
echo "⚠️  SALVE ESSA CHAVE NO 1PASSWORD AGORA!"
echo "    Item: 'Evolution API - Suporte'"
echo "    Vault: 'IA – OPERACIONAL'"
echo "    Campo password: $EVOLUTION_API_KEY"
echo ""
read -p "Salvou no 1Password? (s/n): " saved
if [ "$saved" != "s" ]; then
    echo "❌ Salve primeiro. Abortando."
    exit 1
fi

# 3. Criar .env
cat > .env << EOF
# Evolution API v2 — H.A. Advocacia
AUTHENTICATION_API_KEY=$EVOLUTION_API_KEY

# Server
SERVER_URL=https://evolution.henriqueaugusto.adv.br
SERVER_PORT=8080

# Database (SQLite — simples, sem PostgreSQL externo)
DATABASE_PROVIDER=postgresql
DATABASE_CONNECTION_URI=

# Se quiser usar SQLite (mais simples):
# DATABASE_PROVIDER=sqlite

# Webhook global (N8N receberá os eventos)
WEBHOOK_GLOBAL_URL=https://n8n.srv1380728.hstgr.cloud/webhook/evolution-support-monitor
WEBHOOK_GLOBAL_ENABLED=true
WEBHOOK_GLOBAL_WEBHOOK_BY_EVENTS=true

# Eventos que queremos monitorar
WEBHOOK_EVENTS_MESSAGES_UPSERT=true
WEBHOOK_EVENTS_MESSAGES_UPDATE=true
WEBHOOK_EVENTS_SEND_MESSAGE=true
WEBHOOK_EVENTS_CHATS_UPDATE=true

# Log
LOG_LEVEL=WARN
EOF

# 4. Criar docker-compose.yml
cat > docker-compose.yml << 'COMPOSE'
version: '3.9'
services:
  evolution-api:
    container_name: evolution_api
    image: atendai/evolution-api:v2.2.3
    restart: always
    ports:
      - "127.0.0.1:8080:8080"
    env_file:
      - .env
    volumes:
      - evolution_instances:/evolution/instances

volumes:
  evolution_instances:
COMPOSE

# 5. Subir o container
echo ""
echo "📦 Baixando imagem e iniciando..."
docker compose up -d

# 6. Aguardar startup
echo "⏳ Aguardando 15 segundos para startup..."
sleep 15

# 7. Testar
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8080)
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "401" ]; then
    echo "✅ Evolution API rodando! HTTP $HTTP_CODE"
else
    echo "❌ Erro — HTTP $HTTP_CODE. Verificar logs: docker logs evolution_api"
    exit 1
fi

echo ""
echo "============================================"
echo "✅ EVOLUTION API INSTALADA"
echo ""
echo "Próximo passo: configurar Nginx proxy para"
echo "evolution.henriqueaugusto.adv.br"
echo ""
echo "Depois: criar instância WhatsApp via API"
echo "============================================"
