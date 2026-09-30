// Microsoft → Xbox → Minecraft verification chain for the Java Bridge mod.
// Ports the sisu-auth sidecar (REAL open-source Sisu protocol) to Worker-
// native HTTPS: live.com Sisu device flow → XBL user/authenticate (RPS) →
// XSTS (Minecraft RP) → Mojang login/entitlements/profile.
//
// Worker-native design (no background goroutines): the browser already polls
// /api/mc-poll every 5s, so each poll performs ONE token-exchange attempt.
// Pending → {done:false}; approved → the full chain runs inline.

const LIVE_DEVICE = 'https://login.live.com/oauth20_connect.srf';
const LIVE_TOKEN = 'https://login.live.com/oauth20_token.srf';
const SCOPE = 'service::user.auth.xboxlive.com::MBI_SSL';
const UA = 'XAL Android 2025.04.20250326.000';

function form(params: Record<string, string>): { body: string; headers: Record<string, string> } {
  return {
    body: new URLSearchParams(params).toString(),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': UA },
  };
}

async function postForm(url: string, params: Record<string, string>, timeoutMs = 15000): Promise<any> {
  const { body, headers } = form(params);
  const r = await fetch(url, {
    method: 'POST', headers, body,
    signal: AbortSignal.timeout(timeoutMs),
  });
  const t = await r.text();
  try { return JSON.parse(t); } catch { return { _raw: t.slice(0, 300), _status: r.status }; }
}

async function postJson(url: string, payload: any, timeoutMs = 20000): Promise<{ status: number; json: any }> {
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(timeoutMs),
  });
  const t = await r.text();
  let json: any = null;
  try { json = JSON.parse(t); } catch { /* non-JSON (XErr comes as JSON though) */ }
  return { status: r.status, json };
}

// POST /api/mc-device {} → device codes for microsoft.com/link
export async function mcDevice(clientId: string) {
  const d = await postForm(LIVE_DEVICE, {
    client_id: clientId,
    response_type: 'device_code',
    scope: SCOPE,
    redirect_uri: `ms-xal-${clientId}://auth`,
  });
  if (!d || !d.device_code || !d.user_code) {
    return { ok: false as const, reason: 'Microsoft said no. Try again.' };
  }
  return {
    ok: true as const,
    user_code: d.user_code,
    verification_uri: d.verification_uri || 'https://www.microsoft.com/link',
    device_code: d.device_code,
    expires_in: d.expires_in || 900,
    interval: d.interval || 5,
  };
}

type PollResult =
  | { pending: true }
  | { failed: true; reason: string }
  | { token: true; access: string; refresh: string };

// ONE token-exchange attempt (called per browser poll).
export async function mcPollOnce(clientId: string, deviceCode: string): Promise<PollResult> {
  const d = await postForm(LIVE_TOKEN, {
    grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
    device_code: deviceCode,
    client_id: clientId,
  });
  if (d && d.access_token) {
    return { token: true, access: d.access_token, refresh: d.refresh_token || '' };
  }
  const err = String((d && d.error) || '');
  if (err === 'authorization_pending' || err === 'slow_down') return { pending: true };
  if (err === 'expired_token' || err === 'authorization_declined' || err === 'bad_verification_code') {
    return { failed: true, reason: 'Code expired — start over.' };
  }
  return { pending: true };
}

export async function mcRefreshToken(clientId: string, refreshToken: string): Promise<PollResult> {
  const d = await postForm(LIVE_TOKEN, {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    scope: SCOPE,
    client_id: clientId,
  });
  if (d && d.access_token) {
    return { token: true, access: d.access_token, refresh: d.refresh_token || refreshToken };
  }
  return { failed: true, reason: 'Session expired — verify again.' };
}

function xboxError(xerr: string): string {
  if (String(xerr).includes('2148916233')) return 'No Xbox profile on this Microsoft account yet — create one in the Xbox app, then retry.';
  if (String(xerr).includes('2148916235')) return 'Xbox Live is not available in this region.';
  if (String(xerr).includes('2148916238')) return 'Child account — ask a parent to approve Xbox sign-in, then retry.';
  return 'Xbox sign-in failed. Retry.';
}

// Full chain from an MSA access token → certified-account result.
// Failures carry {step, status, xerr} so we can see exactly which hop
// rejects us (surfaced to the client for bug reports; never any tokens).
//
// Xbox probe: several RPS shapes are tried in ONE call (ticket prefix and
// contract-version header variants) so a single user approval tests them all.
const XBL_HEADERS: Record<string, string> = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'x-xbl-contract-version': '1',
};

async function xblAuthenticate(msaAccess: string): Promise<{ status: number; json: any; variant: string }> {
  const variants = [
    { name: 'd+cv1', ticket: 'd=' + msaAccess, headers: XBL_HEADERS },
    { name: 't+cv1', ticket: 't=' + msaAccess, headers: XBL_HEADERS },
    { name: 'd+plain', ticket: 'd=' + msaAccess, headers: { 'Content-Type': 'application/json', Accept: 'application/json' } },
    { name: 'd+cv2', ticket: 'd=' + msaAccess, headers: { ...XBL_HEADERS, 'x-xbl-contract-version': '2' } },
  ];
  let last: { status: number; json: any; variant: string } = { status: 0, json: null, variant: 'none' };
  for (const v of variants) {
    try {
      const r = await fetch('https://user.auth.xboxlive.com/user/authenticate', {
        method: 'POST',
        headers: v.headers,
        body: JSON.stringify({
          RelyingParty: 'http://auth.xboxlive.com',
          TokenType: 'JWT',
          Properties: { AuthMethod: 'RPS', SiteName: 'user.auth.xboxlive.com', RpsTicket: v.ticket },
        }),
        signal: AbortSignal.timeout(15000),
      });
      const t = await r.text();
      let json: any = null;
      try { json = JSON.parse(t); } catch { /* keep null */ }
      last = { status: r.status, json, variant: v.name };
      try { console.log('[mc] xbl variant', v.name, r.status, t.slice(0, 160)); } catch { /* ignore */ }
      const tok = json && json.Token;
      const u = json && json.DisplayClaims && json.DisplayClaims.xui && json.DisplayClaims.xui[0] && json.DisplayClaims.xui[0].uhs;
      if (r.status === 200 && tok && u) return last;
    } catch (e: any) {
      last = { status: -1, json: { error: String((e && e.message) || e) }, variant: v.name };
    }
  }
  return last;
}

export async function runChain(msaAccess: string): Promise<{ data?: any; reason?: string; diag?: any }> {
  const diag: any = {};
  // 1. Xbox Live user token (RPS probe).
  const xbl = await xblAuthenticate(msaAccess);
  const xblToken = xbl.json && xbl.json.Token;
  const uhs = xbl.json && xbl.json.DisplayClaims && xbl.json.DisplayClaims.xui && xbl.json.DisplayClaims.xui[0] && xbl.json.DisplayClaims.xui[0].uhs;
  diag.xblStatus = xbl.status;
  if (xbl.status !== 200 || !xblToken || !uhs) {
    const xerr = (xbl.json && (xbl.json.XErr || xbl.json.Xerr)) || '';
    diag.xblXerr = String(xerr);
    try { console.log('[mc] xbl fail', xbl.status, String(xerr), JSON.stringify(xbl.json).slice(0, 200)); } catch { /* ignore */ }
    return { reason: xerr ? xboxError(String(xerr)) : 'Xbox sign-in failed. Retry.', diag };
  }
  // 2. XSTS for the Minecraft RP.
  const xsts = await postJson('https://xsts.auth.xboxlive.com/xsts/authorize', {
    RelyingParty: 'rp://api.minecraftservices.com/',
    TokenType: 'JWT',
    Properties: { SandboxId: 'RETAIL', UserTokens: [xblToken] },
  });
  const xstsToken = xsts.json && xsts.json.Token;
  diag.xstsStatus = xsts.status;
  if (xsts.status !== 200 || !xstsToken) {
    const xerr = (xsts.json && (xsts.json.XErr || xsts.json.Xerr)) || '';
    diag.xstsXerr = String(xerr);
    try { console.log('[mc] xsts fail', xsts.status, String(xerr), JSON.stringify(xsts.json).slice(0, 200)); } catch { /* ignore */ }
    return { reason: xerr ? xboxError(String(xerr)) : 'Xbox sign-in failed. Retry.', diag };
  }
  // 3. Minecraft login_with_xbox.
  const login = await postJson('https://api.minecraftservices.com/authentication/login_with_xbox', {
    identityToken: `XBL3.0 x=${uhs};${xstsToken}`,
  });
  const mcAccess = login.json && login.json.access_token;
  diag.mcStatus = login.status;
  if (login.status !== 200 || !mcAccess) {
    try { console.log('[mc] login_with_xbox fail', login.status, JSON.stringify(login.json).slice(0, 200)); } catch { /* ignore */ }
    return { reason: 'Minecraft login failed. Retry.', diag };
  }
  // 4. Ownership = the actual "certified account" check.
  let ownsJava = false;
  try {
    const r = await fetch('https://api.minecraftservices.com/entitlements/mcstore', {
      headers: { Authorization: 'Bearer ' + mcAccess },
      signal: AbortSignal.timeout(15000),
    });
    if (r.ok) {
      const e: any = await r.json();
      const items = (e && e.items) || [];
      ownsJava = items.some((it: any) => it && (it.name === 'game_minecraft' || it.name === 'product_minecraft'));
    }
  } catch { /* ownership unknown → false */ }
  // 5. Profile (name + uuid).
  let name = '', uuid = '';
  try {
    const r = await fetch('https://api.minecraftservices.com/minecraft/profile', {
      headers: { Authorization: 'Bearer ' + mcAccess },
      signal: AbortSignal.timeout(15000),
    });
    if (r.ok) {
      const p: any = await r.json();
      name = (p && p.name) || '';
      uuid = (p && p.id) || '';
    }
  } catch { /* nameless account */ }
  return {
    data: {
      ownsJava, name, uuid,
      mcToken: mcAccess,
      expiresIn: (login.json && login.json.expires_in) || 86400,
    },
  };
}
