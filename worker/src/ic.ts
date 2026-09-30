// InfiniteCraft dataset search over R2-hosted sorted TSVs.
// by-key.tsv (key\tname\temoji, UTF-16 sorted) and by-name.tsv
// (name\temoji, sorted) mirror the server's icSearch binary search, but over
// HTTP Range reads: an offsets index (.offs, little-endian Uint32 per line,
// built by scripts/seed-ic.mjs) is cached per isolate, then each probe reads
// exactly one line's byte range — ~20 small sequential reads per lookup.

interface IcEnv {
  R2_IC: R2Bucket;
}

const memCache = new Map<string, { name: string; emoji: string } | null>();
const offsCache = new Map<string, { offs: Uint32Array; size: number }>();

async function loadOffs(env: IcEnv, base: string): Promise<{ offs: Uint32Array; size: number } | null> {
  const cached = offsCache.get(base);
  if (cached) return cached;
  const obj = await env.R2_IC.get(base + '.offs');
  if (!obj) return null;
  const buf = await obj.arrayBuffer();
  const offs = new Uint32Array(buf);
  const sizeObj = await env.R2_IC.head(base + '.tsv');
  const entry = { offs, size: Number(sizeObj?.size || 0) };
  offsCache.set(base, entry);
  return entry;
}

async function readLine(env: IcEnv, base: string, idx: { offs: Uint32Array; size: number }, line: number): Promise<string | null> {
  const start = idx.offs[line];
  const end = line + 1 < idx.offs.length ? idx.offs[line + 1] : idx.size;
  if (!(end > start) || end - start > 65536) return null;
  const obj = await env.R2_IC.get(base + '.tsv', { range: { offset: start, length: end - start } });
  if (!obj) return null;
  let t = await obj.text();
  if (t.endsWith('\n')) t = t.slice(0, -1);
  if (t.endsWith('\r')) t = t.slice(0, -1);
  return t;
}

// Binary search field 0 with JS `<` (UTF-16 order — matches file generation).
export async function icSearchLine(env: IcEnv, base: string, target: string): Promise<string | null> {
  const idx = await loadOffs(env, base);
  if (!idx || !idx.offs.length) return null;
  let lo = 0, hi = idx.offs.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const line = await readLine(env, base, idx, mid);
    if (line === null) return null;
    let f1 = line.indexOf('\t');
    if (f1 < 0) f1 = line.length;
    const f = line.substring(0, f1);
    if (f === target) return line;
    if (f < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return null;
}

export async function icLookupKey(env: IcEnv, sk: string): Promise<{ name: string; emoji: string } | null> {
  const ck = 'k:' + sk;
  if (memCache.has(ck)) return memCache.get(ck) || null;
  const line = await icSearchLine(env, 'by-key', sk);
  if (!line) { memCache.set(ck, null); return null; }
  const p1 = line.indexOf('\t');
  const p2 = line.indexOf('\t', p1 + 1);
  if (p1 < 0 || p2 < 0) { memCache.set(ck, null); return null; }
  const out = { name: line.substring(p1 + 1, p2), emoji: line.substring(p2 + 1) };
  if (memCache.size > 2000) memCache.clear();
  memCache.set(ck, out);
  return out;
}

export async function icEmojiFor(env: IcEnv, n: string): Promise<string | null> {
  const line = await icSearchLine(env, 'by-name', n);
  if (!line) return null;
  const p = line.indexOf('\t');
  if (p < 0) return null;
  return line.substring(p + 1) || null;
}
