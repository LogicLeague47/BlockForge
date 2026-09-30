// Seeds the InfiniteCraft dataset into KV line-chunks via REST (run once):
//   ick:<n> / icn:<n> — 2000-line TSV chunks, ick:count / icn:count totals.
// Usage (from worker/): CLOUDFLARE_API_TOKEN=... node scripts/seed-ic.mjs
import { readFileSync } from 'node:fs';

const TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const ACCOUNT = '1eaeadeaddaf9a61085e2dbca7d243cd';
const NS = '3055ea19d70547b48f99834fa1c51c18';
const CHUNK = 2000;
if (!TOKEN) { console.error('CLOUDFLARE_API_TOKEN required'); process.exit(1); }

async function put(key, value) {
  const r = await fetch(`https://api.cloudflare.com/client/v4/accounts/${ACCOUNT}/storage/kv/namespaces/${NS}/values/${encodeURIComponent(key)}`, {
    method: 'PUT',
    headers: { Authorization: 'Bearer ' + TOKEN, 'Content-Type': 'text/plain' },
    body: value,
  });
  if (!r.ok) throw new Error(`PUT ${key}: ${r.status} ${(await r.text()).slice(0, 120)}`);
}

for (const [base, prefix] of [['by-key', 'ick'], ['by-name', 'icn']]) {
  const text = readFileSync(`../dist/ic/${base}.tsv`, 'utf8');
  const lines = text.split('\n');
  if (lines.length && lines[lines.length - 1] === '') lines.pop();
  console.log(base, 'lines:', lines.length);
  await put(`${prefix}:count`, String(lines.length));
  const n = Math.ceil(lines.length / CHUNK);
  // 25 parallel uploads at a time.
  for (let s = 0; s < n; s += 25) {
    const batch = [];
    for (let i = s; i < Math.min(s + 25, n); i++) {
      batch.push(put(`${prefix}:${i}`, lines.slice(i * CHUNK, (i + 1) * CHUNK).join('\n')));
    }
    await Promise.all(batch);
    console.log(`  ${prefix} ${Math.min(s + 25, n)}/${n}`);
  }
}
console.log('done.');
