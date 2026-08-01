import { execSync } from 'child_process';
import { existsSync, mkdirSync, copyFileSync, statSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');
const COMMITTED = join(ROOT, 'downloads');

if (!existsSync(DIST)) { console.warn('[Downloads] dist/ not found'); process.exit(0); }

const DL = join(DIST, 'downloads');
mkdirSync(DL, { recursive: true });

let useZip = false;
try { execSync('which zip', { stdio: 'ignore' }); useZip = true; } catch {}

const platforms = {
  'mac-arm64': 'dmg',
  'mac-x64': 'dmg',
  'windows': 'zip',
  'android': 'zip',
  'iphone-ipa': 'zip',
};
const created = {};

for (const [f, ext] of Object.entries(platforms)) {
  const name = `BlockForge-${f}.${ext}`;
  const out = join(DL, name);

  if (ext === 'dmg') {
    const src = join(COMMITTED, name);
    if (existsSync(src)) {
      copyFileSync(src, out);
      created[f] = ext;
      console.log(`[Downloads] copied ${name}`);
    } else {
      console.warn(`[Downloads] ${name} not committed — skipping (run scripts/build-dmg.sh)`);
    }
    continue;
  }

  if (existsSync(out)) { created[f] = ext; continue; }
  try {
    if (useZip) {
      execSync(`cd "${DIST}" && zip -r "${out}" . -x "downloads/*" ".DS_Store" "*__MACOSX*"`, { stdio: 'pipe' });
    } else {
      execSync(`cd "${DIST}" && tar -czf "${out}" --exclude='downloads' --exclude='.DS_Store' --exclude='__MACOSX' .`, { stdio: 'pipe' });
    }
    created[f] = ext;
    console.log(`[Downloads] created ${name}`);
  } catch (e) { console.warn(`[Downloads] Failed ${f}: ${e.message}`); }
}

writeFileSync(join(DL, 'manifest.json'), JSON.stringify({ ext: created }, null, 2));
console.log('[Downloads] Done');
