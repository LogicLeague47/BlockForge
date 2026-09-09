// Builds ES5 legacy bundles for PaperForge and Mold Kingdom.
// PaperForge: transpiles both Vite chunks (paperforge.js + ui.js) to ES5.
// Mold Kingdom: concatenates all 10 JS files → single file → Babel ES5.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { transformSync } from '@babel/core';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const babelOpts = {
  presets: [['@babel/preset-env', { targets: { ie: '11' }, modules: false }]],
  compact: true,
  babelrc: false,
  configFile: false,
};

function transpile(srcPath) {
  return transformSync(readFileSync(resolve(root, srcPath), 'utf8'), babelOpts).code;
}

const outDir = resolve(root, 'dist/assets');
mkdirSync(outDir, { recursive: true });

// ── PaperForge ──────────────────────────────────────────────────────────────
// The Vite build produces dist/assets/paperforge.js and dist/assets/ui-*.js.
// Both must be transpiled to ES5 so the import chain works on old Safari.
try {
  console.log('[minigame-legacy] PaperForge: transpiling chunks ...');
  const distAssets = resolve(root, 'dist/assets');
  const files = readdirSync(distAssets);
  const uiFile = files.find(f => /^ui-.*\.js$/.test(f));
  const pfFile = files.find(f => /^paperforge.*\.js$/.test(f));
  if (pfFile) {
    writeFileSync(resolve(outDir, 'paperforge-legacy.js'), transpile(`dist/assets/${pfFile}`));
    console.log(`  ✓ ${pfFile} → paperforge-legacy.js`);
  }
  if (uiFile) {
    // Rename ui chunk to a stable name for the nomodule fallback
    writeFileSync(resolve(outDir, 'ui-legacy.js'), transpile(`dist/assets/${uiFile}`));
    console.log(`  ✓ ${uiFile} → ui-legacy.js`);
  }
} catch (e) {
  console.warn('[minigame-legacy] PaperForge failed (non-fatal):', e.message);
}

// ── Mold Kingdom ────────────────────────────────────────────────────────────
// Concatenate all 10 source files → single file → Babel ES5.
try {
  console.log('[minigame-legacy] Mold Kingdom: concatenating + transpiling ...');
  const mkDir = resolve(root, 'public/mold-kingdom/js');
  const files = [
    'settings.js', 'audio.js', 'leaderboard.js', 'levels.js',
    'player.js', 'paint.js', 'enemies.js', 'render.js',
    'cutscene.js', 'main.js',
  ];
  let combined = '';
  for (const f of files) {
    const fp = resolve(mkDir, f);
    if (fp) combined += readFileSync(fp, 'utf8') + '\n;\n';
  }
  const result = transformSync(combined, { ...babelOpts, filename: 'mold-kingdom-legacy.js' });
  writeFileSync(resolve(outDir, 'mold-kingdom-legacy.js'), result.code);
  console.log('  ✓ 10 files → mold-kingdom-legacy.js');
} catch (e) {
  console.warn('[minigame-legacy] Mold Kingdom failed (non-fatal):', e.message);
}

// ── InfiniteCraft ─────────────────────────────────────────────────────────
// Concatenates state.js + game.js + app.js → single file → Babel ES5.
// combos.js is NOT transpiled (53MB) — it only contains one `var` and a
// giant data literal, both parseable on old Safari as-is.
try {
  console.log('[minigame-legacy] InfiniteCraft: concatenating + transpiling ...');
  const icDir = resolve(root, 'public/infinitecraft/js');
  const files = ['state.js', 'game.js', 'app.js'];
  let combined = '';
  for (const f of files) {
    combined += readFileSync(resolve(icDir, f), 'utf8') + '\n;\n';
  }
  const result = transformSync(combined, { ...babelOpts, filename: 'infinitecraft-legacy.js' });
  writeFileSync(resolve(outDir, 'infinitecraft-legacy.js'), result.code);
  console.log('  ✓ 3 files → infinitecraft-legacy.js');
} catch (e) {
  console.warn('[minigame-legacy] InfiniteCraft failed (non-fatal):', e.message);
}

console.log('[minigame-legacy] done');
