#!/usr/bin/env bash
# ─── BlockForge Oracle Cloud Free-Tier Provisioner ────────────────────────
# Run this ON the Oracle instance (via SSH) to install the Node backend and
# put it behind nginx on port 80 (HTTP). HTTPS/WSS is added later once a
# domain/DNS is pointed at the instance (see README.md in this folder).
#
#   ssh -i scripts/oracle/id_ed25519 ubuntu@<PUBLIC_IP> 'bash -s' < scripts/oracle/provision.sh
#
set -euo pipefail

export DEBIAN_FRONTEND=noninteractive
APP_DIR=/opt/blockforge
REPO_URL="https://github.com/LogicLeague47/BlockForge.git"
BRANCH=main

echo "[1/6] System update + base packages..."
sudo apt-get update -y
sudo apt-get install -y git curl build-essential nginx ufw

echo "[2/6] Install Node.js 20 LTS..."
if ! command -v node >/dev/null 2>&1 || node -v 2>/dev/null | grep -q '^v18'; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi
echo "  node $(node -v) / npm $(npm -v)"

echo "[3/6] Clone + build the project..."
if [ ! -d "$APP_DIR" ]; then
  sudo git clone --branch "$BRANCH" --depth 1 "$REPO_URL" "$APP_DIR"
else
  sudo git -C "$APP_DIR" fetch --depth 1 origin "$BRANCH"
  sudo git -C "$APP_DIR" reset --hard "origin/$BRANCH"
fi
sudo chown -R "$USER":"$USER" "$APP_DIR" 2>/dev/null || true
cd "$APP_DIR"
npm ci --omit=dev || npm install --omit=dev
npm run build

echo "[4/6] systemd service (blockforge)..."
sudo tee /etc/systemd/system/blockforge.service >/dev/null <<'EOF'
[Unit]
Description=BlockForge Multiplayer Server
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/blockforge
Environment=NODE_ENV=production
Environment=PORT=4000
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF
sudo systemctl daemon-reload
sudo systemctl enable blockforge
sudo systemctl restart blockforge

echo "[5/6] nginx reverse proxy (HTTP :80) -> localhost:4000..."
sudo tee /etc/nginx/sites-available/blockforge >/dev/null <<'EOF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    client_max_body_size 1m;

    # Health checks for Oracle LB / uptime monitors
    location = /health {
        proxy_pass http://127.0.0.1:4000;
        proxy_set_header Host $host;
    }

    location / {
        # For WebSocket long-poll upgrades (wss) once TLS is added leave this
        # server block in place; the WS routing is handled inside server.js.
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 86400;
    }
}
EOF
sudo ln -sf /etc/nginx/sites-available/blockforge /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

echo "[6/6] Firewall (port 80/443 open, 22 from anywhere for now)..."
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
echo "y" | sudo ufw enable >/dev/null 2>&1 || true
sudo ufw status | head -20

echo ""
echo "═══════════════════════════════════════════════════════════"
echo " Provision complete."
echo " Backend:   http://$(curl -s ifconfig.me):4000/health"
echo " Proxy:     http://$(curl -s ifconfig.me)/            -> localhost:4000"
echo ""
echo " NEXT: point a domain/subdomain A record at this public IP,"
echo " then run scripts/oracle/ssl.sh to enable free HTTPS (Let's"
echo " Encrypt). After that, update BACKEND_URL in src/config.js to"
echo " wss://<your-domain> and deploy."
echo "═══════════════════════════════════════════════════════════"