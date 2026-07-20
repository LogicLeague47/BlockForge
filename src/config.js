// Shared config: multiplayer endpoint + runtime asset base.
//
// CrazyGames only hosts the client bundle (capped at 250MB total / 20MB
// initial download). The heavy assets (Music, Sounds, parkour chunks) are
// stripped from the CG build and streamed at runtime from our own always-on
// Render server, which serves the full `dist/` statically. This keeps the
// uploaded zip tiny while the real game data lives on our infrastructure
// (the same "bloxd.io" trick: only the load->gameplaystart window is
// measured against the size limits).
//
// `IS_CG_BUILD` is injected at build time via Vite's `define` (see
// vite.config.js, mode === 'cg'). It is true ONLY for the CG build, so
// every other deployment (Render, GitHub Pages, localhost, tunnel) keeps
// using relative asset paths and the correct multiplayer endpoint.

export const BACKEND_URL = 'wss://blockforge-server.onrender.com';

export const IS_CG_BUILD =
  (typeof __CG__ !== 'undefined') && __CG__;

// Where to fetch static assets (audio, chunks) from.
export function assetBase() {
  if (IS_CG_BUILD) {
    // Point at our Render server (serves the full dist/).
    return BACKEND_URL.replace(/^wss?:\/\//, 'https://') + '/';
  }
  // Relative to the current page — works at the site root or any subpath.
  return (location.pathname || '/').replace(/[^/]*$/, '');
}
