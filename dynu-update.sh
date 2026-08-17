#!/bin/bash
# Updates Dynu DDNS with current public IP. Called by start-blockforge.sh.
DIR="/Users/wiggillton/Documents/Minecraft clone"
source "$DIR/dynu.conf"
if [ "$DYNU_PASSWORD" = "PASTE_IP_UPDATE_PASSWORD_HERE" ]; then
  echo "[$(date)] Dynu not configured (edit dynu.conf)" >> "$DIR/.blockforge.log"
  exit 1
fi
IP=$(curl -s --max-time 10 https://api.ipify.org)
RESULT=$(curl -s --max-time 10 -u "$DYNU_USERNAME:$DYNU_PASSWORD" \
  "https://api.dynu.com/nic/update?hostname=$DYNU_HOSTNAME&myip=$IP")
echo "[$(date)] Dynu update $DYNU_HOSTNAME -> $IP : $RESULT" >> "$DIR/.blockforge.log"
