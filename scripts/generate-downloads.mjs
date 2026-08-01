import { existsSync, mkdirSync, copyFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');
const COMMITTED = join(ROOT, 'downloads');

if (!existsSync(DIST)) { console.warn('[Downloads] dist/ not found'); process.exit(0); }

const DL = join(DIST, 'downloads');
mkdirSync(DL, { recursive: true });

const platforms = {
  'mac-arm64': 'dmg',
  'mac-x64': 'dmg',
  'windows': 'exe',
  'android': 'apk',
  'iphone-ipa': 'ipa',
};
const created = {};

for (const [f, ext] of Object.entries(platforms)) {
  const name = `BlockForge-${f}.${ext}`;
  const src = join(COMMITTED, name);
  if (existsSync(src)) {
    copyFileSync(src, join(DL, name));
    created[f] = ext;
    console.log(`[Downloads] copied ${name}`);
  } else {
    console.warn(`[Downloads] ${name} missing — not committed yet`);
  }
}

writeFileSync(join(DL, 'manifest.json'), JSON.stringify({ ext: created }, null, 2));
console.log('[Downloads] Done');
