// Builds the WebGL1-compatible bundle (three.js r162) used by old devices
// (old iPhones etc.). three is temporarily swapped, then restored, so the
// modern build is unaffected. Non-fatal: if anything fails the modern bundle
// still deploys.
import { execSync } from 'node:child_process';
import { existsSync, copyFileSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { transformFileSync } from '@babel/core';

const root = resolve('.');

function run(cmd, env) {
  execSync(cmd, { cwd: root, stdio: 'inherit', env: env ? { ...process.env, ...env } : undefined });
}

try {
  console.log('[build-legacy] installing three@0.162.0 ...');
  run('npm install three@0.162.0 --no-save --no-audit --no-fund');
  console.log('[build-legacy] building legacy bundle (LEGACY_BUILD=1) ...');
  run('npx vite build --outDir dist-legacy', { LEGACY_BUILD: '1' });
  mkdirSync('dist/assets', { recursive: true });
  const out = 'dist-legacy/assets/main-legacy.js';
  if (existsSync(out)) {
    copyFileSync(out, 'dist/assets/main-legacy.js');
    console.log('[build-legacy] ✓ wrote dist/assets/main-legacy.js (es2015)');
    // Vite's esbuild transform (and standalone esbuild) cannot lower const /
    // for-of / class / template literals to ES5. So we post-process the
    // finished IIFE bundle with Babel (@babel/preset-env, ie:11) which fully
    // transpiles every ES2015+ feature down to ES5 — the syntax old Safari
    // (< iOS 9.3) chokes on ("unexpected ;" parse error). No core-js polyfills
    // are injected (useBuiltIns defaults to off), so runtime globals (Map/Set/
    // Promise) are left as-is — fine on iOS 9/10 where they exist.
    const babeled = transformFileSync('dist/assets/main-legacy.js', {
      // modules:'commonjs' ALSO rewrites dynamic import() (used by the Mods
      // feature in src/mods.js) into a require()-based expression. Dynamic
      // import() is illegal syntax inside a classic <script>, so leaving it in
      // makes the whole legacy bundle fail to parse on old Safari ("unexpected
      // keyword 'import'"). With commonjs it becomes valid classic-script
      // syntax; mod loading just rejects at runtime on ancient devices (caught
      // by the surrounding try/catch) instead of taking down the whole game.
      presets: [['@babel/preset-env', { targets: { ie: '11' }, modules: 'commonjs' }]],
      compact: true,
      babelrc: false,
      configFile: false,
    });
    writeFileSync('dist/assets/main-legacy.js', babeled.code);
    console.log('[build-legacy] ✓ downleveled to es5 (old-Safari safe)');
  } else {
    console.warn('[build-legacy] ✗ main-legacy.js not found in dist-legacy');
  }
} catch (e) {
  console.warn('[build-legacy] legacy build failed (non-fatal):', e.message);
} finally {
  try {
    console.log('[build-legacy] restoring three@0.169.0 ...');
    run('npm install three@0.169.0 --no-save --no-audit --no-fund');
  } catch (_) { /* ignore */ }
  try { rmSync('dist-legacy', { recursive: true, force: true }); } catch (_) { /* ignore */ }
}
