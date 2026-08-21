# BlockForge Server

Host your **own** BlockForge multiplayer world for free. You run it, your friends
join by typing your IP — just like a Minecraft Java server.

The official "Official SMP" world is run by the BlockForge team. Every other
server is hosted by a player like you.

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

The server answers a **status ping** (like Minecraft's Server List Ping):
it replies with its name, description (MOTD), player count, and version
*without* anyone joining — so clients can show a live server list.

## Let friends join (Minecraft-Java style)
1. Find your **public IP** — e.g. visit https://api.ipify.org
2. Forward port `4000` (TCP) on your router to this machine
   (or use a tunnel such as `cloudflared`, `ngrok`, or `playit.gg`)
3. In BlockForge, open **Multiplayer → "+ Add Server"**, give it a name, and type:
   ```
   ws://YOUR_PUBLIC_IP:4000
   ```
   The game pings it directly and shows live players / MOTD — just like
   Minecraft's multiplayer menu. You can also use **Direct Connect** to join
   instantly without saving.

> **HTTPS note:** if the game is opened over `https://`, browsers block `ws://`
> connections (mixed content). Self-hosted servers must then be reachable over
> **`wss://`** — a tunnel such as `playit.gg` or `cloudflared` gives you a
> `wss://` address automatically. The official server already uses `wss://`.

## Configuration (.env)
| Variable          | Meaning                                                                 |
|-------------------|-------------------------------------------------------------------------|
| `PORT`            | Port the server listens on (default `4000`).                            |
| `PUBLIC_WS_URL`   | The `ws://`/`wss://` address players type. Should be your public IP.    |
| `SERVER_NAME`     | Name shown in the server list.                                          |
| `SERVER_DESC`     | MOTD / description shown under the name in the list.                    |
| `SERVER_MAX_PLAYERS` | Max players reported in the status ping (default `50`).             |
| `SERVER_ID`       | Unique id for the optional directory (any string).                      |
| `DIRECTORY_URL`   | *(Optional)* broadcast to the portal's Community Servers list.          |
| `IS_OFFICIAL`     | `true` only for the official team server.                               |

## Notes
- Your server only relays multiplayer; players load the BlockForge client from
  the main site and connect to you over WebSocket. You do **not** need to host
  the game files.
- Worlds are saved next to the server (`server-data.json`). Stop the server
  cleanly (Ctrl-C) to save.
- This is the same server the game uses, trimmed to just host your world.
