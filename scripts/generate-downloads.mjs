import { execSync } from 'child_process';
import { existsSync, mkdirSync, statSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');

if (!existsSync(DIST)) { console.warn('[Downloads] dist/ not found'); process.exit(0); }

const DL = join(DIST, 'downloads');
mkdirSync(DL, { recursive: true });

let useZip = false;
try { execSync('which zip', { stdio: 'ignore' }); useZip = true; } catch {}

const ext = useZip ? 'zip' : 'tgz';
const platforms = ['mac-arm64', 'mac-x64', 'windows', 'android', 'iphone-ipa'];

for (const f of platforms) {
  const out = join(DL, `${f}.${ext}`);
  if (existsSync(out)) continue;
  try {
    if (useZip) {
      execSync(`cd "${DIST}" && zip -r "${out}" . -x "downloads/*" ".DS_Store" "*__MACOSX*"`, { stdio: 'pipe' });
    } else {
      execSync(`cd "${DIST}" && tar -czf "${out}" --exclude='downloads' --exclude='.DS_Store' --exclude='__MACOSX' .`, { stdio: 'pipe' });
    }
    console.log(`[Downloads] ${f}.${ext}`);
  } catch (e) { console.warn(`[Downloads] Failed ${f}: ${e.message}`); }
}

writeFileSync(join(DL, 'manifest.json'), JSON.stringify({ ext, platforms }, null, 2));
console.log(`[Downloads] Done (${ext} format)`);
