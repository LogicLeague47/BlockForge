#!/bin/bash
# BlockForge auto-launch: starts the game server + public Cloudflare tunnel, keeps them alive.
# Run from Terminal:  ./start-blockforge.sh
# The public URL is saved to ~/blockforge-url.txt and printed at the end.

DIR="/Users/wiggillton/Documents/Minecraft clone"
NODE="/Users/wiggillton/.local/bin/node"
CF="/opt/homebrew/bin/cloudflared"
LOG="$DIR/.blockforge.log"

echo "[$(date)] BlockForge launch starting" >> "$LOG"

# Keep the Mac awake so the server + tunnel never die from sleep
caffeinate -ims &

# Kill any previous instances
pkill -f "node server.js" 2>/dev/null
pkill -f "cloudflared tunnel" 2>/dev/null
sleep 2

# Start the game server (serves the site + WebSocket multiplayer on :4000)
cd "$DIR"
nohup "$NODE" "$DIR/server.js" >> "$DIR/.server.log" 2>&1 &
echo "[$(date)] server started (pid $!)" >> "$LOG"

sleep 3

# Start the public Cloudflare quick tunnel (no account / domain needed)
nohup "$CF" tunnel --url http://localhost:4000 --no-autoupdate >> "$DIR/.tunnel.log" 2>&1 &
echo "[$(date)] tunnel started (pid $!)" >> "$LOG"

# Capture the public URL so it's easy to find / share
URL=""
for i in $(seq 1 20); do
  URL=$(grep -oE "https://[a-z0-9-]+\.trycloudflare\.com" "$DIR/.tunnel.log" | tail -1)
  if [ -n "$URL" ]; then
    echo "$URL" > "$HOME/blockforge-url.txt"
    echo "[$(date)] PUBLIC URL: $URL" >> "$LOG"
    break
  fi
  sleep 2
done

echo ""
echo "==============================================="
echo " BlockForge is LIVE"
echo " Share this URL with friends:"
echo "   $URL"
echo " (saved to ~/blockforge-url.txt)"
echo "==============================================="
echo ""
echo "Leave this Mac awake & online. Stop with: pkill -f cloudflared; pkill -f 'node server.js'"
