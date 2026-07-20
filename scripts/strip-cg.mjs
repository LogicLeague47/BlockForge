// Strips the heavy assets out of the freshly-built `dist/` so the
// CrazyGames upload stays tiny (<20MB initial / <250MB total).
// The game streams these from the Render server at runtime instead
// (see src/config.js assetBase()). Run after `vite build`:
//   node scripts/strip-cg.mjs
import { existsSync, rmSync, statSync, readdirSync } from 'fs';
import { join } from 'path';

// Recursive size (statSync on a directory only reports the inode, not its
// contents — so compute it properly for an accurate "freed" print).
function dirSize(p) {
  let total = 0;
  for (const e of readdirSync(p)) {
    const full = join(p, e);
    const st = statSync(full);
    total += st.isDirectory() ? dirSize(full) : st.size;
  }
  return total;
}

const DIST = join(process.cwd(), 'dist');

// Large assets that live on the Render server, NOT in the CG bundle.
const STRIP = [
  'Music',          // ~38MB
  'Sounds',        // ~13MB
  'parkour-chunks.bin.gz', // ~0.5MB (kept tiny, but strip for consistency)
];

if (!existsSync(DIST)) {
  console.error('dist/ not found — run `vite build` first.');
  process.exit(1);
}

let freed = 0;
for (const name of STRIP) {
  const p = join(DIST, name);
  if (existsSync(p)) {
    const size = statSync(p).isDirectory() ? dirSize(p) : statSync(p).size;
    rmSync(p, { recursive: true, force: true });
    freed += size;
    console.log(`  removed dist/${name} (${(size / 1048576).toFixed(1)} MB)`);
  }
}

console.log(`CG dist stripped: freed ${(freed / 1048576).toFixed(1)} MB.`);
console.log('Upload this dist/ to CrazyGames; deploy the FULL dist/ to Render.');
