// Shared config: multiplayer endpoint + runtime asset base.
//
// All host URLs are driven by build-time environment variables so switching
// providers (Render → Oracle Cloud, etc.) requires zero code changes — just
// set the env vars and rebuild.
//
// `IS_CG_BUILD` is injected at build time via esbuild's `define`.

export const BACKEND_URL = process.env.BF_BACKEND_WS || 'wss://blockforge-server.onrender.com';

// Game socket host (ROLE=ws). Everything real-time-game goes here;
// HTTP APIs, auth and directory stay on BACKEND_URL (ROLE=main).
export const GAME_WS_URL = process.env.BF_GAME_WS || 'wss://blockforge-server.onrender.com';

// Official SMP is the one server we (the dev) host.
export const OFFICIAL_SMP_URL = GAME_WS_URL;

// Live-server directory: the portal + client fetch this to list every server.
export const DIRECTORY_URL = BACKEND_URL.replace(/^wss?:\/\//, 'https://') + '/api/servers';

export const IS_CG_BUILD =
  (typeof __CG__ !== 'undefined') && __CG__;

// Where to fetch static assets (audio, chunks) from.
export function assetBase() {
  if (IS_CG_BUILD) {
    return BACKEND_URL.replace(/^wss?:\/\//, 'https://') + '/';
  }
  return (location.pathname || '/').replace(/[^/]*$/, '');
}
