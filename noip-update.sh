#!/bin/bash
# Updates No-IP DDNS with current public IP. Called by start-blockforge.sh.
DIR="/Users/wiggillton/Documents/Minecraft clone"
source "$DIR/noip.conf"
if [ "$NOIP_PASSWORD" = "PASTE_NOIP_PASSWORD_HERE" ]; then
  echo "[$(date)] No-IP not configured (edit noip.conf)" >> "$DIR/.blockforge.log"
  exit 1
fi
IP=$(curl -s --max-time 10 https://api.ipify.org)
RESULT=$(curl -s --max-time 10 -u "$NOIP_USERNAME:$NOIP_PASSWORD" \
  "https://dynupdate.no-ip.com/nic/update?hostname=$NOIP_HOSTNAME&myip=$IP")
echo "[$(date)] No-IP update $NOIP_HOSTNAME -> $IP : $RESULT" >> "$DIR/.blockforge.log"
