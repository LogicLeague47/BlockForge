import { defineConfig } from 'vite';
import { resolve } from 'path';

// `vite build --mode cg` injects `__CG__ = true` so config.js routes
// heavy assets (Music/Sounds/chunks) to our Render server instead of
// bundling them. The full dist is still deployed to Render; only the
// CG upload is stripped of those files (see scripts/strip-cg.mjs).
export default defineConfig(({ mode }) => ({
  base: '',
  server: {
    port: 5173,
    open: true,
  },
  define: {
    __CG__: JSON.stringify(mode === 'cg'),
  },
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      // Keep three.js external so the runtime import map can choose the
      // version per-device (modern r169, or an older WebGL1-capable r162 for
      // legacy devices like old iPhones). This is what lets us "move old
      // devices over to an older WebGL" without rewriting game code.
      external: ['three', /^three\/examples\//, /^three\/addons\//],
      input: {
        main: resolve(__dirname, 'index.html'),
        debug: resolve(__dirname, 'debug.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        terms: resolve(__dirname, 'terms.html'),
      },
    },
  },
}));
