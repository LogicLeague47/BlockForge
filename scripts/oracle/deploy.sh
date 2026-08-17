#!/usr/bin/env bash
# ─── BlockForge Oracle: deploy from your Mac over SSH ─────────────────────
# Builds locally, updates the instance, and restarts the service.
#
#   Usage: ./deploy.sh <PUBLIC_IP>
#
set -euo pipefail

IP="${1:?Usage: ./deploy.sh <PUBLIC_IP>}"
KEY="$(dirname "$0")/id_ed25519"
SSH_OPTS=(-i "$KEY" -o StrictHostKeyChecking=accept-new -o ConnectTimeout=15)

echo "[1/4] Building locally (dry, fast)..."
npm run build >/dev/null 2>&1 || true
echo "     build done"

echo "[2/4] Syncing source to instance (excluding bulky dirs)..."
rsync -az --delete \
  -e "ssh $(printf '%s ' "${SSH_OPTS[@]}")" \
  --exclude node_modules --exclude dist --exclude .git --exclude downloads \
  --exclude community-mods --exclude *.log \
  ./ ubuntu@"$IP":/opt/blockforge/

echo "[3/4] Installing deps + building on instance..."
ssh "${SSH_OPTS[@]}" ubuntu@"$IP" 'bash -s' <<'REMOTE'
set -euo pipefail
cd /opt/blockforge
npm ci --omit=dev || npm install --omit=dev
npm run build
REMOTE

echo "[4/4] Restarting service..."
ssh "${SSH_OPTS[@]}" ubuntu@"$IP" 'sudo systemctl restart blockforge && sleep 1 && curl -s http://localhost:4000/health && echo'

echo ""
echo "📦 Deployed. Backend health:"
ssh "${SSH_OPTS[@]}" ubuntu@"$IP" "curl -s http://localhost:4000/health; echo; curl -s http://127.0.0.1/health; echo"