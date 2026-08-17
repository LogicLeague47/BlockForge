# BlockForge — Oracle Cloud Free Tier backend

This folder contains everything needed to host the BlockForge multiplayer
backend on an **Oracle Cloud Always Free** compute instance (ARM Ampere A1,
up to 4 vCPU / 24 GB RAM — more than enough for this server).

## How it works

```
                    ┌─────────────────────────────────────────────┐
  Players (browser) │  Oracle instance (Always Free, Ubuntu 22)   │
  https://game…  ──▶│  nginx :80/:443  ─▶ node server.js :4000   │
                    └─────────────────────────────────────────────┘
```

- nginx terminates TLS (Let's Encrypt, free) and proxies both HTTP API calls
  and WebSocket upgrades (`wss://`) to the Node server.
- The server runs as a `systemd` service (`blockforge`) so it auto-restarts
  and comes back up on reboot.
- Deployments are done from your Mac with the `deploy.sh` script (rsync over
  SSH). No CI needed.

## Step-by-step (do once)

### 1. Create the instance (web console — ~10 min)

1. Log in to https://cloud.oracle.com → **Create a VM instance**.
2. **Image**: Ubuntu 22.04 (canonical/arm64). **Shape**: Ampere A1 `VM.Standard.A1.Flex`,
   OCpus *4* / Memory 24 GB (Always Free).
3. **Networking**: VCN + subnet, enable **Public IPv4** and **Assign a public IPv4 address**.
4. **SSH keys**: select *Paste public keys* and paste the contents of
   **`id_ed25519.pub`** from *this* folder (so this Mac can SSH in).
5. Create → wait for **Running**, note the **Public IP address**.
6. Open the VCN **Security List** → Ingress rules → add:
   - `TCP :22`  (SSH)
   - `TCP :80`  (HTTP)
   - `TCP :443` (HTTPS — add now, needed for WSS later)

### 2. First provision (from this Mac)

```bash
ssh -i scripts/oracle/id_ed25519 ubuntu@<PUBLIC_IP> 'bash -s' < scripts/oracle/provision.sh
```

Installs Node 20 + nginx, clones & builds the repo, creates the systemd
service, opens the firewall. It prints the backend health URL when done.

> If provisioning uses Ubuntu's default user `ubuntu`. If you chose Oracle
> Linux it's `opc` — adjust the `ubuntu@` in every command accordingly.

### 3. Test the backend directly

```bash
curl http://<PUBLIC_IP>:4000/health   # → {"status":"ok",...}
```

### 4. Redeploy after code changes (any time from this Mac)

```bash
bash scripts/oracle/deploy.sh <PUBLIC_IP>
```

## Getting HTTPS/WSS (required for the game to connect)

A bare IP won't work for `wss://` connections from an HTTPS-served game.
Pick any free subdomain service (e.g. **duckdns.org**), create a subdomain,
and point an **A record** at `<PUBLIC_IP>`. Then:

```bash
bash scripts/oracle/ssl.sh mygame.duckdns.org
```

That installs a free Let's Encrypt cert. Finally update the client:

```bash
# src/config.js
export const BACKEND_URL = 'wss://mygame.duckdns.org';
export const ONLINE_SERVER_URL = 'https://mygame.duckdns.org';
```

Rebuild, push, deploy — you can now disable the Render backend.

## Useful commands

```bash
ssh -i scripts/oracle/id_ed25519 ubuntu@<PUBLIC_IP>          # shell
ssh ... 'sudo systemctl status blockforge'                   # service status
ssh ... 'sudo journalctl -u blockforge -f'                   # live logs
ssh ... 'sudo systemctl restart blockforge'                  # restart
```

## Files

| File | Purpose |
| --- | --- |
| `id_ed25519.pub` | public key (paste into Oracle console) — safe to commit |
| `id_ed25519` | **private key — git-ignored, never commit** |
| `provision.sh` | one-time server setup (Node, nginx, service, firewall) |
| `ssl.sh` | enables free HTTPS/WSS with Let's Encrypt (needs a domain) |
| `deploy.sh` | push new builds from your Mac to the instance |

> Security note: don't share your OCI username/password anywhere; the
> password only works for the web console anyway — everything here runs on
> the SSH keypair instead.