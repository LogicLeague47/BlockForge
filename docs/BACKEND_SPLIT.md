# Backend split (Render + Fly.io)

> **STATUS (Sep 2026): rolled back to Render-primary.** Fly's no-card trial
> hard-stops machines after 5 minutes of runtime (traffic or not), so the
> Fly hosts can't hold sessions. All clients point back at Render; an
> UptimeRobot ping on `/health` every 5 min defeats Render's *idle* sleep.
> The role code below stays in the repo, dormant, in case hosting changes.
> (`blockforge-social` + `blockforge-ws` apps still exist but are unused.)

One codebase (`server.js`), three deployments, selected by the `BF_ROLE`
env var. The game client keeps a **single** WebSocket — traffic is split
server-side via the relay chain:

```
game client ──WS──▶ Fly blockforge-ws (BF_ROLE=ws)
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
| `ws` | Fly `blockforge-ws` (`fly.ws.toml`) | `BF_ROLE=ws` via `[env]`, secrets `UPSTREAM_BACKEND_URL` + `BAN_SYNC_SECRET`, same Dockerfile as social | Game WS only. HTTP: `/health` only. No volume (ephemeral; bans re-sync from poll). Polls Render for global bans every 60s (join enforcement + proactive kick). |
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

## Deploying the game host (Fly `blockforge-ws`)

```sh
fly deploy --remote-only --config fly.ws.toml -a blockforge-ws
fly secrets set BAN_SYNC_SECRET=<same as Render> UPSTREAM_BACKEND_URL=wss://blockforge-social.fly.dev -a blockforge-ws
```

(HidenCloud was evaluated and dropped: free tier is Minecraft-only, BOT is
pre-made Discord bots, SOFTWARE runtimes are paid. A second Fly app replaced
it — same account/region, in-region relay, deploys from here.)

## Render main setup

- Set `BAN_SYNC_SECRET` (same value as the ws host). No code change needed:
  `BF_ROLE` unset = `main` = current behavior.
- Keep the service as the relay target + auth/accounts/HTTP APIs/directory.

## Client wiring (LIVE)

- Game socket + Official SMP + health keepalive → `wss://blockforge-ws.fly.dev`
  (`GAME_WS_URL` in `src/config.js`, `BF_WS`/`SRV_WS` in portal).
- Auth HTTP, directory, mods, uploads, assets → Render (`BACKEND_URL`).
- Offbranch APIs (`yt-search`, `/api/ic-*`) → `https://blockforge-social.fly.dev`.
- Player-hosted servers: `UPSTREAM_BACKEND_URL=wss://blockforge-social.fly.dev`
  (see `public/create-server.html`) so their social centralizes on Fly.

## Data

- Fly owns DMs/friends/community/stats/news from deploy time on (**fresh
  start**; Render's files stay untouched as archive). Fly persists them on
  its `bf_social_data` volume via `DATA_DIR=/data`.
- Accounts/auth stay on Render. Always.
- AI-combo cache is shared if both hosts get the same Upstash env
  (otherwise each host keeps a process-memory cache).

## Known limitations (v1)

- Global bans are enforced on the ws host via 60s poll (join block +
  proactive kick). Bans issued from a client connected to the ws host are
  relayed to Render (source of truth), so issue bans normally — they work.
- Player-hosted relay servers still point upstream at Render by default;
  flip `UPSTREAM_BACKEND_URL` to Fly to centralize their social traffic.
- On player-hosted servers, dev account/ban commands now relay upstream
  instead of running locally (previously near-useless against local files).
- Render free still sleeps: first auth after idle takes 30–50s (relayed).
  Keep a free UptimeRobot ping on `/health` to avoid it.
- Fly free allowances: watch Trial Status; 1× shared 512MB machine +
  1GB volume is the current footprint.
