# BlockForge Server

Host your **own** BlockForge multiplayer world for free. You run it, your friends
join by typing your IP — just like a Minecraft Java server.

The official "Official SMP" world is run by the BlockForge team. Every other
server in the list is hosted by a player like you.

## Requirements
- [Node.js](https://nodejs.org) 18 or newer
- A network connection (and, to let friends outside your home join, a port forward
  or a tunneling tool — see below)

## Quick start
```bash
npm install
cp .env.example .env      # optional, but recommended
node server.js
```
The server prints its address. By default it listens on port `4000`.

## Let friends join (Minecraft-Java style)
1. Find your **public IP** — e.g. visit https://api.ipify.org
2. Forward port `4000` (UDP/TCP) on your router to this machine
   (or use a tunnel such as `cloudflared`, `ngrok`, or `playit.gg`)
3. In BlockForge, open **Multiplayer → Direct Connect** and have friends type:
   ```
   ws://YOUR_PUBLIC_IP:4000
   ```
   (Use `wss://` if you put it behind TLS.)

Your server shows up automatically in the **Live Servers** list on the portal and
in the game once `DIRECTORY_URL` is set in `.env`.

## Configuration (.env)
| Variable          | Meaning                                                                 |
|-------------------|-------------------------------------------------------------------------|
| `PORT`            | Port the server listens on (default `4000`).                            |
| `PUBLIC_WS_URL`   | The `ws://`/`wss://` address players type. Should be your public IP.    |
| `SERVER_NAME`     | Name shown in the server list.                                          |
| `SERVER_ID`       | Unique id for the directory (any string).                               |
| `DIRECTORY_URL`   | Dev directory to register with, e.g. `https://your-domain/api/servers`.|
| `IS_OFFICIAL`     | `true` only for the official team server.                               |

## Notes
- Your server only relays multiplayer; players load the BlockForge client from
  the main site and connect to you over WebSocket. You do **not** need to host
  the game files.
- Worlds are saved next to the server (`server-data.json`). Stop the server
  cleanly (Ctrl-C) to save.
- This is the same server the game uses, trimmed to just host your world.
