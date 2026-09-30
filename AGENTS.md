# AGENTS.md

## Deploy (Cloudflare backend + GitHub Pages client — Render is RETIRED)

- **Render is scrapped.** `render.yaml` is deleted, the deploy-hook step is
  gone from `.github/workflows/deploy.yml`, and no Render pipeline may be
  fired for any reason. The old hosts (`blockforge-server.onrender.com`,
  `blockforge-1.onrender.com`) are stale references only.
- **Backend = Cloudflare Worker** (`worker/`, Hono + D1 + KV + R2, name
  `blockforge-api`). Deploy with `wrangler deploy` from `worker/` (needs
  `wrangler login` once per machine). Secrets via `wrangler secret put`
  (`ELEVENLABS_API_KEY`, `GEMINI_API_KEY`, `BAN_SYNC_SECRET`,
  `GITHUB_CLIENT_ID/SECRET`, `GOOGLE_CLIENT_ID/SECRET`). D1 schema in
  `worker/schema.sql` (`npm run db:migrate`); R2 buckets `blockforge-uploads`
  + `blockforge-ic`; IC dataset seeded with `npm run seed:ic`.
- **Multiplayer WS still runs on the legacy host** until Durable Object rooms
  land: `src/config.js` `GAME_WS_URL` stays `wss://blockforge-server.onrender.com`
  (stale but live). HTTP APIs (`BACKEND_URL`) point at the Worker. Do NOT move
  WS until DO rooms are implemented + tested.
- **Client ships to GitHub Pages** (`.github/workflows/pages.yml`, free
  Actions quota) — pushing `main` is the whole client deploy.
- Content-only changes need no backend deploy at all; Worker deploys are
  instant and free, so no batching rules.

## App builds (auto — do not break)

- Every push to `main` auto-builds installable apps via GitHub Actions
  (free quota): `Build Android APK` → `android-build-N` tags, and the
  android/ios jobs in `Auto Deploy` → the `binaries` release
  (`BlockForge-android.apk`, `BlockForge-iphone-ipa.ipa`).
- The in-app ⬆ updater and the portal download button depend on FRESH
  `binaries` assets. Never disable, skip, or gate these jobs; if `binaries`
  goes stale the updater lies and sideloaded apps rot on dead backends.
- Pre-existing `build-mac-dmg` / `build-windows-exe` failures are known and
  unrelated — leave them alone, they don't block APK/IPA/Pages.

- **Always auto-commit and auto-push after completing any work.** Do not wait
  to be asked. Stage the relevant files, write a concise commit message
  (repo uses conventional prefixes like `feat:`, `fix:`, `perf:`), push to
  `main`, and confirm the push succeeded.

## Portal updates (Updates button)

- **Every commit that ships a user-visible change must also update the portal's
  Updates button.** Keep `UPDATE_SECTIONS` in `public/portal.html` current:
  the newest entry goes at the top of the array (index 0) with the commit
  `hash`, a short `heading`, a `desc`, the `date`, and `bugs`/`updates`/
  `features` arrays describing what changed. Never ship a commit that changes
  game or portal behavior without a matching Updates entry — do it in the same
  commit, not a follow-up.

## Infrastructure (post-Render)

- Game HTTP APIs: Worker URL (`https://blockforge-api.<account>.workers.dev`)
  - `src/config.js` (`BACKEND_URL`, drives `OFFICIAL_SMP_URL`/`DIRECTORY_URL`)
  - `public/mods/java-bridge.bfmod` (`DEFAULT_BACKEND`, overridable in-mod)
  - `server-package/server.js` `UPSTREAM_URL` default, `server-package/.env.example` `DIRECTORY_URL`
- Game web client: `https://logicleague47.github.io/BlockForge` (GitHub Pages)
  - `public/portal.html` `window.BF_WEB`
- Game WS multiplayer: legacy host until DO rooms (`GAME_WS_URL`, portal `SRV_WS`)
- Prefer env-driven hosts at build time to avoid future hardcodes.
