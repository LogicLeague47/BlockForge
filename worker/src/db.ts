// KV-backed storage (accounts, gallery, community mods). The deploy token
// has no D1/R2 scope and R2 isn't enabled on the account, so everything
// persistent lives in KV (25MB/value cap respected: gallery items and mod
// files are stored under individual keys, only small indexes are inlined).

interface KvEnv {
  KV: KVNamespace;
}

export async function kvJson(env: KvEnv, key: string): Promise<any | null> {
  try {
    const t = await env.KV.get(key);
    return t ? JSON.parse(t) : null;
  } catch { return null; }
}

// ─── accounts ────────────────────────────────────────────────────────
export async function getAccount(env: KvEnv, username: string): Promise<any | null> {
  if (!username) return null;
  return kvJson(env, 'acct:' + username);
}

export async function putAccount(env: KvEnv, acc: any): Promise<void> {
  await env.KV.put('acct:' + acc.username, JSON.stringify(acc));
}

export async function findByIdentity(env: KvEnv, provider: string, providerId: string): Promise<string | null> {
  if (!provider || !providerId) return null;
  try {
    let cursor: string | undefined = undefined;
    for (let page = 0; page < 10; page++) {
      const list = await env.KV.list({ prefix: 'acct:', cursor });
      for (const k of list.keys) {
        const a = await kvJson(env, k.name);
        try {
          const ids = (a && a.identities) || (a && JSON.parse(a.identitiesStr || '{}')) || {};
          if (ids && ids[provider] === providerId) return a.username;
        } catch { /* skip */ }
      }
      if (list.list_complete) break;
      cursor = list.cursor;
    }
  } catch { /* miss */ }
  return null;
}

// ─── gallery (index + one key per item) ──────────────────────────────
export async function galleryList(env: KvEnv, type: string): Promise<any[]> {
  const idx: string[] = (await kvJson(env, `gal:${type}:index`)) || [];
  const out: any[] = [];
  for (const id of idx.slice(0, 50)) {
    const it = await kvJson(env, `gal:${type}:${id}`);
    if (it) out.push({ name: it.name, data: it.data, uploader: it.uploader, date: it.date });
  }
  return out;
}

function randId(): string {
  const a = new Uint8Array(8);
  crypto.getRandomValues(a);
  return Date.now().toString(36) + [...a].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function galleryPush(env: KvEnv, type: string, item: any): Promise<void> {
  const id = randId();
  await env.KV.put(`gal:${type}:${id}`, JSON.stringify({ ...item, id }));
  let idx: string[] = (await kvJson(env, `gal:${type}:index`)) || [];
  idx = [id, ...idx.filter((x) => x !== id)].slice(0, 100);
  await env.KV.put(`gal:${type}:index`, JSON.stringify(idx));
  // Prune anything beyond the cap (best effort).
  try {
    const extra: string[] = ((await kvJson(env, `gal:${type}:index`)) || []).slice(100);
    await Promise.all(extra.map((x) => env.KV.delete(`gal:${type}:${x}`)));
  } catch { /* ignore */ }
}

// ─── community mods (index + one key per file) ───────────────────────
export async function modsList(env: KvEnv): Promise<any[]> {
  return (await kvJson(env, 'mods:index')) || [];
}

export async function modsPut(env: KvEnv, meta: any, code: string): Promise<void> {
  await env.KV.put('modfile:' + meta.id, code);
  let idx: any[] = (await kvJson(env, 'mods:index')) || [];
  idx = [meta, ...idx.filter((m: any) => m && m.id !== meta.id)].slice(0, 500);
  await env.KV.put('mods:index', JSON.stringify(idx));
}

export async function modsGetFile(env: KvEnv, id: string): Promise<string | null> {
  try { return await env.KV.get('modfile:' + id); } catch { return null; }
}
