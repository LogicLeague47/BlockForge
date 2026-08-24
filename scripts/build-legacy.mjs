// Builds the WebGL1-compatible bundle (three.js r162) used by old devices
// (old iPhones etc.). three is temporarily swapped, then restored, so the
// modern build is unaffected. Non-fatal: if anything fails the modern bundle
// still deploys.
import { execSync } from 'node:child_process';
import { existsSync, copyFileSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

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
    console.log('[build-legacy] ✓ wrote dist/assets/main-legacy.js');
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
