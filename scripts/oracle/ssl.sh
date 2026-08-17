#!/usr/bin/env bash
# ─── BlockForge Oracle: enable HTTPS/WSS with Let's Encrypt ───────────────
# Run AFTER you pick a domain (e.g. free DuckDNS subdomain) and add an A record
# pointing at this instance's public IP.
#
#   Usage: ./ssl.sh your-subdomain.duckdns.org   (or whatever your domain is)
#   Requires: a real FQDN that resolves to this instance's public IP.
#
set -euo pipefail

DOMAIN="${1:?Usage: ./ssl.sh <your-domain-or-subdomain>}"

echo "[1/4] Installing certbot..."
sudo apt-get update -y
sudo apt-get install -y certbot python3-certbot-nginx

echo "[2/4] Inject domain into the nginx server block..."
sudo sed -i "s/server_name _;/server_name $DOMAIN;/" /etc/nginx/sites-available/blockforge
sudo nginx -t && sudo systemctl reload nginx

echo "[3/4] Obtaining + installing the certificate..."
sudo certbot --nginx --redirect -d "$DOMAIN" --non-interactive --agree-tos --register-unsafely-without-email

echo "[4/4] Persist auto-renewal (cron already added by certbot). Test renew..."
sudo certbot renew --dry-run || true

echo ""
echo "═══════════════════════════════════════════════════════════"
echo " HTTPS ready: https://$DOMAIN/  (auto-redirects from :80)"
echo " WSS endpooint: wss://$DOMAIN/  (nginx upgrades WS to :4000)"
echo ""
echo " NEXT: set BACKEND_URL = 'wss://$DOMAIN' in src/config.js,"
echo " rebuild + push, then level up: no more Render backend."
echo "═══════════════════════════════════════════════════════════"