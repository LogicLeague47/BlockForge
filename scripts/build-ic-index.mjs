// Builds compact sorted lookup files for the InfiniteCraft server API.
// combos.js (53MB) is parsed ONCE here at build time so the running server
// stays lean (~65MB flat files + offsets instead of ~300MB of live objects).
// Output: dist/ic/by-key.tsv (sortedKey\tname\temoji, last-wins dedup)
//         dist/ic/by-name.tsv (name\temoji, first-wins dedup)
// Sort order MUST be default UTF-16 (Array.prototype.sort) to match the
// server's binary-search `<` comparisons.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

console.log('[ic-index] parsing combos.js ...');
const src = readFileSync(resolve(root, 'public/infinitecraft/js/combos.js'), 'utf8');
const re = /^  "((?:[^"\\]|\\.)+)": \{ name: "((?:[^"\\]|\\.)*)", emoji: "((?:[^"\\]|\\.)*)" \},?\s*$/gm;
const byKey = new Map();  // sortedKey -> { name, emoji } (last wins)
const byName = new Map(); // name -> emoji (first wins)
let skipped = 0;
let m;
const unq = (s) => JSON.parse('"' + s + '"');
while ((m = re.exec(src)) !== null) {
  let key, name, emoji;
  try {
    key = unq(m[1]); name = unq(m[2]); emoji = unq(m[3]);
  } catch (_) { skipped++; continue; }
  if (/[\t\n\r]/.test(key) || /[\t\n\r]/.test(name) || /[\t\n\r]/.test(emoji)) { skipped++; continue; }
  const sk = key.split('+').sort().join('+');
  byKey.set(sk, { name, emoji });
  if (!byName.has(name)) byName.set(name, emoji);
}
console.log('[ic-index] combos: ' + byKey.size + ', names: ' + byName.size + ', skipped: ' + skipped);

const keyLines = [...byKey.entries()].map(([k, v]) => k + '\t' + v.name + '\t' + v.emoji);
keyLines.sort();
const nameLines = [...byName.entries()].map(([k, v]) => k + '\t' + v);
nameLines.sort();

const outDir = resolve(root, 'dist/ic');
mkdirSync(outDir, { recursive: true });
writeFileSync(resolve(outDir, 'by-key.tsv'), keyLines.join('\n') + '\n');
writeFileSync(resolve(outDir, 'by-name.tsv'), nameLines.join('\n') + '\n');
console.log('[ic-index] wrote dist/ic/by-key.tsv + dist/ic/by-name.tsv');
