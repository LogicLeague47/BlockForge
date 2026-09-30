// Seeds the InfiniteCraft dataset into R2 (run once after `wrangler login`):
//   1. by-key.tsv + by-name.tsv → R2_IC bucket
//   2. .offs line-offset indexes (little-endian Uint32) → R2_IC bucket
// Usage: node scripts/seed-ic.mjs  (run from worker/)
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

function buildOffs(text) {
  const offs = [0];
  for (let i = 0; i < text.length; i++) {
    if (text.charCodeAt(i) === 10) offs.push(i + 1);
  }
  let n = offs.length;
  while (n > 0 && offs[n - 1] >= text.length) n--;
  return { offs: offs.slice(0, n), count: n };
}

function putFile(local, remote) {
  console.log('uploading', remote, '...');
  execFileSync('npx', ['wrangler', 'r2', 'object', 'put', `blockforge-ic/${remote}`, '--file', local], { stdio: 'inherit' });
}

function putBuffer(buf, remote) {
  console.log('uploading', remote, `(${(buf.length / 1048576).toFixed(1)}MB) ...`);
  execFileSync('npx', ['wrangler', 'r2', 'object', 'put', `blockforge-ic/${remote}`, '--pipe'], { input: buf, stdio: ['pipe', 'inherit', 'inherit'] });
}

for (const base of ['by-key', 'by-name']) {
  const local = `../dist/ic/${base}.tsv`;
  const text = readFileSync(local, 'utf8');
  const { offs, count } = buildOffs(text);
  console.log(base, 'lines:', count);
  const buf = Buffer.alloc(offs.length * 4);
  for (let i = 0; i < offs.length; i++) buf.writeUInt32LE(offs[i], i * 4);
  putBuffer(buf, `${base}.offs`);
  putFile(local, `${base}.tsv`);
}
console.log('done.');
