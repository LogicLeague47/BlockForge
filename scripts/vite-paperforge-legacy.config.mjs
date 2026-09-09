import { defineConfig } from 'vite';
export default defineConfig({
  build: {
    lib: { entry: 'src/paperforge/main.js', formats: ['iife'], name: 'PaperForge' },
    outDir: 'dist-pf-legacy',
    rollupOptions: {
      output: { entryFileNames: 'assets/paperforge.js', assetFileNames: 'assets/[name][extname]' },
    },
    target: 'es2015',
    minify: false,
    sourcemap: false,
  },
});
