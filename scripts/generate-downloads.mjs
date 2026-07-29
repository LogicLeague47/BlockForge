import { execSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');

if (!existsSync(DIST)) { console.warn('[Downloads] dist/ not found'); process.exit(0); }

const DL = join(DIST, 'downloads');
mkdirSync(DL, { recursive: true });

const platforms = ['mac-arm64', 'mac-x64', 'windows', 'android', 'iphone-ipa'];

for (const f of platforms) {
  const tgz = join(DL, `${f}.tgz`);
  if (existsSync(tgz)) continue;
  try {
    execSync(`cd "${DIST}" && tar -czf "${tgz}" --exclude='downloads' --exclude='.DS_Store' --exclude='__MACOSX' .`, { stdio: 'pipe' });
    console.log(`[Downloads] ${f}.tgz`);
  } catch (e) { console.warn(`[Downloads] Failed ${f}: ${e.message}`); }
}

writeFileSync(join(DL, 'manifest.json'), JSON.stringify({ ext: 'tgz', platforms }, null, 2));
console.log('[Downloads] Done');
