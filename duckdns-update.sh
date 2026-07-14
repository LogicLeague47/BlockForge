#!/bin/bash
# Updates DuckDNS with current public IP. Called by start-blockforge.sh.
DIR="/Users/wiggillton/Documents/Minecraft clone"
source "$DIR/duckdns.conf"
if [ "$DUCKDNS_TOKEN" = "PASTE_YOUR_TOKEN_HERE" ]; then
  echo "[$(date)] DuckDNS not configured (edit duckdns.conf)" >> "$DIR/.blockforge.log"
  exit 1
fi
IP=$(curl -s --max-time 10 https://api.ipify.org)
RESULT=$(curl -s --max-time 10 "https://www.duckdns.org/update?domains=$DUCKDNS_DOMAINS&token=$DUCKDNS_TOKEN&ip=$IP")
echo "[$(date)] DuckDNS update $DUCKDNS_DOMAINS -> $IP : $RESULT" >> "$DIR/.blockforge.log"
