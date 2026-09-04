import { defineConfig } from 'vite';
import { resolve } from 'path';

// `vite build --mode cg` injects `__CG__ = true` so config.js routes
// heavy assets (Music/Sounds/chunks) to our Render server instead of
// bundling them. The full dist is still deployed to Render; only the
// CG upload is stripped of those files (see scripts/strip-cg.mjs).
//
// LEGACY_BUILD=1 produces the old-device bundle: three.js is swapped to an
// older WebGL1-capable build (r162) and the entry is emitted as
// assets/main-legacy.js so index.html can load it for WebGL1-only devices.
export default defineConfig(({ mode }) => {
  const legacy = process.env.LEGACY_BUILD === '1';
  return {
    base: '',
    server: {
      port: 5173,
      open: true,
    },
    define: {
      __CG__: JSON.stringify(mode === 'cg'),
      'process.env.BF_BACKEND_WS': JSON.stringify(process.env.BF_BACKEND_WS || ''),
      'process.env.BF_WEB_HOST': JSON.stringify(process.env.BF_WEB_HOST || ''),
    },
    build: {
      // Old devices (e.g. iPhone 5 / old Safari < iOS 11) don't support ES
      // modules at all, so the legacy bundle must be a classic IIFE script —
      // loaded via a normal <script> tag, not type="module".
      // We build at es2015 here (Vite's esbuild transform can't emit es5
      // directly) and then DOWNLEVEL the finished bundle to es5 with esbuild
      // in scripts/build-legacy.mjs. That strips every ES2015+ syntax feature
      // (template literals, arrow fns, classes, const/let, optional chaining…)
      // that old Safari (< iOS 9.3) chokes on ("unexpected ;" parse error).
      target: legacy ? 'es2015' : 'es2020',
      minify: legacy ? 'esbuild' : 'esbuild',
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        input: legacy
          ? { legacy: resolve(__dirname, 'legacy.html') }
          : {
              main: resolve(__dirname, 'index.html'),
              paperforge: resolve(__dirname, 'paperforge.html'),
              debug: resolve(__dirname, 'debug.html'),
              privacy: resolve(__dirname, 'privacy.html'),
              terms: resolve(__dirname, 'terms.html'),
            },
        output: {
          entryFileNames: legacy ? 'assets/main-legacy.js' : 'assets/[name].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
          // IIFE so it runs on browsers without module support.
          format: legacy ? 'iife' : 'es',
          name: legacy ? 'BlockForge' : undefined,
        },
      },
    },
  };
});
