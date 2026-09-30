// InfiniteCraft dataset search over KV line-chunks.
// by-key.tsv (793K lines, key\tname\temoji, UTF-16 sorted) and by-name.tsv
// are split into 2000-line chunks (`ick:<n>`, `icn:<n>`) by scripts/seed-ic.
// Binary search fetches one small chunk per probe (~20 KV reads per lookup,
// each ~80KB — fast, and hot chunks stay in the isolate cache).

interface IcEnv {
  KV: KVNamespace;
}

const CHUNK = 2000;
const chunkCache = new Map<string, string[]>();
const countCache = new Map<string, number>();

async function getCount(env: IcEnv, prefix: string): Promise<number> {
  const ck = prefix + ':count';
  if (countCache.has(ck)) return countCache.get(ck)!;
  const n = Number((await env.KV.get(ck)) || 0);
  countCache.set(ck, n);
  return n;
}

async function getChunk(env: IcEnv, prefix: string, n: number): Promise<string[] | null> {
  const ck = `${prefix}:${n}`;
  const hit = chunkCache.get(ck);
  if (hit) return hit;
  let t: string | null = null;
  try { t = await env.KV.get(ck); } catch { t = null; }
  if (t === null) return null;
  const lines = t.split('\n');
  if (chunkCache.size > 60) chunkCache.clear();
  chunkCache.set(ck, lines);
  return lines;
}

function field0(line: string): string {
  const f1 = line.indexOf('\t');
  return f1 < 0 ? line.replace(/\r$/, '') : line.substring(0, f1);
}

async function searchLines(env: IcEnv, prefix: string, target: string): Promise<string | null> {
  const count = await getCount(env, prefix);
  if (!count) return null;
  let lo = 0, hi = count - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const lines = await getChunk(env, prefix, Math.floor(mid / CHUNK));
    if (!lines) return null;
    const raw = lines[mid % CHUNK];
    if (raw === undefined) return null;
    const line = raw.endsWith('\r') ? raw.slice(0, -1) : raw;
    const f = field0(line);
    if (f === target) return line;
    if (f < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return null;
}

const memCache = new Map<string, { name: string; emoji: string } | null>();

export async function icLookupKey(env: IcEnv, sk: string): Promise<{ name: string; emoji: string } | null> {
  const ck = 'k:' + sk;
  if (memCache.has(ck)) return memCache.get(ck) || null;
  const line = await searchLines(env, 'ick', sk);
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
  const line = await searchLines(env, 'icn', n);
  if (!line) return null;
  const p = line.indexOf('\t');
  if (p < 0) return null;
  return line.substring(p + 1) || null;
}
