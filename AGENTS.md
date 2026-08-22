# AGENTS.md

## Git workflow

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

## Infrastructure roadmap

- **Planned: migrate hosting from Render → Oracle Cloud** for better
  performance/software. When we switch, update these hardcoded hosts:
  - Game backend WS: `blockforge-server.onrender.com` → new Oracle host
    - `src/config.js` (`BACKEND_URL`, drives `OFFICIAL_SMP_URL`/`DIRECTORY_URL`)
    - `server.js` + `server-package/server.js` `UPSTREAM_URL` default and
      `UPSTREAM_BACKEND_URL` env; `server-package/.env.example` `DIRECTORY_URL`
    - `public/portal.html` `SRV_WS`
  - Game web host: `blockforge-1.onrender.com` → new Oracle host
    - `public/portal.html` (hero-play, dev panel, cards, playUrl, closeUrl, link,
      skin equip, heroPlay) and `src/main.js` (`isOnCrazyGames()` onrender URL)
  - Prefer making hosts env-driven at build time to avoid future hardcodes.
