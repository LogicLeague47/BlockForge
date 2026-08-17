import { existsSync, mkdirSync, copyFileSync, writeFileSync, readdirSync, readFileSync } from 'fs';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');
const COMMITTED = join(ROOT, 'downloads');

if (!existsSync(DIST)) { console.warn('[Downloads] dist/ not found'); process.exit(0); }

const DL = join(DIST, 'downloads');
mkdirSync(DL, { recursive: true });

// ── Community mods → dist/mods/community (for the static client) ─────
// Any .bfmod files committed under community-mods/ (or mirroring the official
// public/mods pack) are copied so /mods/community/ works on the static host.
const COMMUNITY_SRC = join(ROOT, 'community-mods');
const COMMUNITY_DIST = join(DIST, 'mods', 'community');
const MODS_SRC = join(ROOT, 'public', 'mods');
const MODS_DIST = join(DIST, 'mods');
if (existsSync(MODS_SRC)) {
  mkdirSync(MODS_DIST, { recursive: true });
  for (const f of readdirSync(MODS_SRC)) {
    if (extname(f) === '.bfmod') copyFileSync(join(MODS_SRC, f), join(MODS_DIST, f));
  }
}

if (existsSync(COMMUNITY_SRC)) {
  mkdirSync(COMMUNITY_DIST, { recursive: true });
  for (const f of readdirSync(COMMUNITY_SRC)) {
    if (extname(f) === '.bfmod') copyFileSync(join(COMMUNITY_SRC, f), join(COMMUNITY_DIST, f));
  }
  // Merge an index.json for the static host too.
  const idxSrc = join(COMMUNITY_SRC, 'index.json');
  if (existsSync(idxSrc)) {
    let list = JSON.parse(readFileSync(idxSrc, 'utf8') || '[]');
    list = list.map((m) => {
      const { path, ...pub } = m;
      return pub;
    }).filter((m) => m && m.file);
    writeFileSync(join(COMMUNITY_DIST, 'index.json'), JSON.stringify(list, null, 2));
  }
}

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
