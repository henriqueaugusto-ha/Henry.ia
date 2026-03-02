#!/bin/bash
# ETAPA 1 — Nginx + Certbot HTTPS
# Domínio: henry.henriqueaugusto.adv.br → 72.60.49.222
# Executar no HOST da VPS via SSH
# Parar se qualquer comando falhar

set -e

DOMAIN="henry.henriqueaugusto.adv.br"
EMAIL="henry.ia.assistant@gmail.com"

echo "=== BACKUP openclaw.json ==="
docker exec openclaw-ulim-openclaw-1 sh -lc \
  'cp -a /data/.openclaw/openclaw.json /data/.openclaw/openclaw.json.bak.safe.$(date +%F-%H%M%S)' \
  && echo "✅ Backup feito"

echo ""
echo "=== 1.2 INSTALAR NGINX ==="
apt update -y && apt install -y nginx
systemctl enable --now nginx
echo "✅ Nginx instalado"

echo ""
echo "=== 1.3 CONFIGURAR PROXY REVERSO ==="
cat > /etc/nginx/sites-available/openclaw << 'EOF'
server {
    listen 80;
    server_name henry.henriqueaugusto.adv.br;

    location / {
        proxy_pass http://127.0.0.1:62585;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
EOF

ln -sf /etc/nginx/sites-available/openclaw /etc/nginx/sites-enabled/openclaw
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
echo "✅ Nginx configurado e recarregado"

echo ""
echo "=== 1.4 ABRIR PORTA 80 NO UFW (para Certbot) ==="
ufw allow 80/tcp
ufw allow 443/tcp
echo "✅ Portas 80 e 443 liberadas"

echo ""
echo "=== 1.5 INSTALAR CERTBOT E GERAR HTTPS ==="
apt install -y certbot python3-certbot-nginx
certbot --nginx -d "$DOMAIN" --email "$EMAIL" --agree-tos --non-interactive --redirect
echo "✅ Certificado SSL gerado"

echo ""
echo "=== VALIDAÇÃO FINAL ==="
curl -s -o /dev/null -w "HTTPS status: %{http_code}\n" https://$DOMAIN
systemctl status nginx --no-pager | grep "active"
echo ""
echo "✅ ETAPA 1 CONCLUÍDA"
echo "Acesse: https://$DOMAIN"
echo "AGUARDE autorização do Dr. Henrique antes de iniciar Etapa 2."
