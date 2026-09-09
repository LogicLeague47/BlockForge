# Backend split (Render + Fly.io + HidenCloud)

One codebase (`server.js`), three deployments, selected by the `BF_ROLE`
env var. The game client keeps a **single** WebSocket — traffic is split
server-side via the relay chain:

```
game client ──WS──▶ HidenCloud (BF_ROLE=ws)
                        │ game messages: handled locally (rooms, positions…)
                        │ social + account: relayed ──WS──▶ Fly.io (BF_ROLE=social)
                                                              │ DMs/friends/community/stats/news: local
                                                              │ account/dev-admin: relayed ──WS──▶ Render (BF_ROLE=main)
                                                              │                              (accounts/auth source of truth)
```

Offbranch HTTP APIs (`/api/yt-search`, `/api/yt-channel`, `/api/yt-proxy`,
`/api/ic-lookup`, `/api/ic-emojis`) are served by Fly (always-on, no cold
starts). Everything else HTTP stays on Render. Static game files stay on the
Render static host.

## Roles

| Role | Host | Env | Serves |
|------|------|-----|--------|
| `main` (default) | Render `blockforge-server` | _(none — default)_ | Everything (unchanged behavior) |
| `ws` | HidenCloud | `BF_ROLE=ws`, `RELAY=true`, `UPSTREAM_BACKEND_URL=wss://blockforge-social.fly.dev`, `BAN_SYNC_URL=https://blockforge-server.onrender.com/api/global-bans`, `BAN_SYNC_SECRET=<same as Render>`, `PORT=<panel port>` | Game WS only. HTTP: `/health` only. Polls Render for global bans every 60s (join enforcement + proactive kick). |
| `social` | Fly `blockforge-social` | `BF_ROLE=social`, `DATA_DIR=/data`, `UPSTREAM_BACKEND_URL=wss://blockforge-server.onrender.com`, `GEMINI_API_KEY`, `UPSTASH_*` (optional) | Social WS (DMs/friends/community/stats/news), offbranch HTTP APIs, `/health`. Ignores game traffic. |

`UPSTREAM_TYPES` (auth, account linking, dev account/ban commands) are always
relayed toward Render, the source of truth. Everything else in `SOCIAL_TYPES`
is handled wherever it lands.

## Deploying Fly (done once, repeat for updates)

```sh
fly deploy --remote-only            # from repo root (uses Dockerfile.fly)
fly secrets set KEY=VALUE -a blockforge-social
fly logs -a blockforge-social
```

Image contents: `server.js` + `src/profanity.js` + `server-data/ic-patch.tsv` +
prebuilt `dist/ic/*` index. No git submodules, no combos.js (53MB stays out).

## Deploying HidenCloud (manual — their panel)

1. Create a Node.js service from this repo (branch `main`).
2. Start command: `node server.js`. Set env:
   - `BF_ROLE=ws`
   - `RELAY=true`
   - `UPSTREAM_BACKEND_URL=wss://blockforge-social.fly.dev`
   - `BAN_SYNC_URL=https://blockforge-server.onrender.com/api/global-bans`
   - `BAN_SYNC_SECRET=<generate with: openssl rand -hex 32>`
   - `PORT=<whatever the panel assigns>`
3. Set the **same** `BAN_SYNC_SECRET` on Render (`blockforge-server` env).
   Without it, global bans are NOT enforced on HidenCloud (loud warning at boot).
4. Send the public HidenCloud URL back — client + docs get rewired to it.

## Render main setup

- Set `BAN_SYNC_SECRET` (same value as HidenCloud). No code change needed:
  `BF_ROLE` unset = `main` = current behavior.
- Keep the service as the relay target + auth/accounts/HTTP APIs/directory.

## Client wiring (after HidenCloud URL is known)

- `src/config.js` `BACKEND_URL` (build env `BF_BACKEND_WS`) → HidenCloud WS URL.
- Offbranch API hosts → Fly: `public/youtube/index.html` (`yt-search`),
  `public/infinitecraft/js/game.js` (`/api/ic-*`).
- `public/portal.html` `SRV_WS` → HidenCloud.

Until then everything still points at Render and works exactly as before —
the split ships dark.

## Data

- Fly owns DMs/friends/community/stats/news from deploy time on (**fresh
  start**; Render's files stay untouched as archive). Fly persists them on
  its `bf_social_data` volume via `DATA_DIR=/data`.
- Accounts/auth stay on Render. Always.
- AI-combo cache is shared if both hosts get the same Upstash env
  (otherwise each host keeps a process-memory cache).

## Known limitations (v1)

- Global bans are enforced on HidenCloud via 60s poll (join block +
  proactive kick). Bans issued from a client connected to HidenCloud are
  relayed to Render (source of truth), so issue bans normally — they work.
- Player-hosted relay servers still point upstream at Render by default;
  flip `UPSTREAM_BACKEND_URL` to Fly to centralize their social traffic.
- On player-hosted servers, dev account/ban commands now relay upstream
  instead of running locally (previously near-useless against local files).
- Render free still sleeps: first auth after idle takes 30–50s (relayed).
  Keep a free UptimeRobot ping on `/health` to avoid it.
- Fly free allowances: watch Trial Status; 1× shared 512MB machine +
  1GB volume is the current footprint.
