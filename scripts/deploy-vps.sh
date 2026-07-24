#!/bin/bash
set -e

APP_DIR="/opt/mrpet-store"
DOMAIN="mr-petofficial.ru"

mkdir -p "$APP_DIR"
cd "$APP_DIR"

if [ ! -f "$APP_DIR/.env" ]; then
  ADMIN_PASS=$(openssl rand -base64 24 2>/dev/null || tr -dc A-Za-z0-9 </dev/urandom | head -c 32)
  cat > "$APP_DIR/.env" <<EOF
NEXT_PUBLIC_SITE_URL=https://$DOMAIN
NEXT_PUBLIC_SITE_NAME=Mr.Pet
NEXT_PUBLIC_OZON_URL=https://ozon.ru/t/D4yNPF1
NEXT_PUBLIC_BASE_PATH=
DATABASE_URL=file:./data/dev.db
YOOKASSA_SHOP_ID=
YOOKASSA_SECRET_KEY=
YOOKASSA_RETURN_URL=https://$DOMAIN/order/success
ADMIN_PASSWORD=$ADMIN_PASS
TAX_SYSTEM_CODE=1
VAT_CODE=1
COMPANY_FULL_NAME="ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ «МИСТЕР ПЕТ»"
COMPANY_NAME="ООО «МИСТЕР ПЕТ»"
COMPANY_ADDRESS="Улица Свободы, 29"
COMPANY_INN=5047268242
COMPANY_KPP=773301001
BANK_NAME='ООО "Банк Точка"'
BANK_ACCOUNT=40702810301500152619
BANK_BIK=044525104
BANK_CORR=30101810745374525104
EOF
  echo "Created .env with generated ADMIN_PASSWORD=$ADMIN_PASS"
fi

if [ -f "$APP_DIR/mrpet-store.tar.gz" ]; then
  docker load -i "$APP_DIR/mrpet-store.tar.gz"
fi

docker stop mrpet-store 2>/dev/null || true
docker rm mrpet-store 2>/dev/null || true

docker run -d \
  --name mrpet-store \
  -p 127.0.0.1:3000:3000 \
  --env-file "$APP_DIR/.env" \
  -v mrpet-data:/app/data \
  --restart unless-stopped \
  mrpet-store:latest

cp "$APP_DIR/scripts/nginx-mrpet.conf" /etc/nginx/sites-available/mr-petofficial.ru
ln -sf /etc/nginx/sites-available/mr-petofficial.ru /etc/nginx/sites-enabled/mr-petofficial.ru

nginx -t && systemctl reload nginx

if [ -d "/etc/letsencrypt/live/$DOMAIN" ]; then
  certbot renew --quiet
else
  certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos -m "admin@$DOMAIN" || true
fi

echo "Mr.Pet deployed. Check: curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3000"
