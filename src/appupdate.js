// App self-update checker for the sideloaded Capacitor builds (Android APK /
// iOS IPA). Compares the build timestamp baked into this bundle
// (process.env.BF_BUILD_TS, see vite.config.js) against the GitHub
// `binaries` release asset's updated_at. When a newer binary exists a small
// ⬆ pill button appears at the top of the screen; tapping it opens the
// download in the SYSTEM browser (Chrome/Safari handle big-file download +
// install natively — the in-app WebView cannot), which updates the sideloaded
// app. After a real update the new bundle's timestamp is >= the asset's, so
// the pill never re-nags; ✕ snoozes that version.
import { Browser } from '@capacitor/browser';

const REPO = 'LogicLeague47/BlockForge';
const SEEN_KEY = 'bf_upd_seen';
const SKEW_MS = 120000; // asset upload lands ~1-2 min after the build ran

function nativePlatform() {
  try {
    if (window.Capacitor && typeof window.Capacitor.getPlatform === 'function') {
      const p = window.Capacitor.getPlatform();
      if (p === 'android' || p === 'ios') return p;
    }
  } catch (_) {}
  if (/android/i.test(navigator.userAgent || '')) return 'android-web';
  return 'other';
}

function buildTS() {
  try {
    const t = parseInt(process.env.BF_BUILD_TS || '0', 10);
    return Number.isFinite(t) ? t : 0;
  } catch (_) { return 0; }
}

function pickAsset(assets, plat) {
  if (!Array.isArray(assets) || !assets.length) return null;
  // Exact official binaries only — never fall back to CI debug artifacts
  // (releases/latest is usually an android-build tag carrying app-debug.apk).
  if (plat === 'android' || plat === 'android-web') {
    return assets.find((a) => /^BlockForge-android\.apk$/i.test(a.name || '')) || null;
  }
  if (plat === 'ios') {
    return assets.find((a) => /blockforge-iphone-ipa\.ipa$/i.test(a.name || '')) || null;
  }
  return null;
}

function isNewer(asset) {
  if (!asset || !asset.updated_at || !asset.browser_download_url) return false;
  const remote = Date.parse(asset.updated_at);
  if (!Number.isFinite(remote)) return false;
  const local = buildTS();
  // Dev/unknown builds have no stamp — fall back to seen-state only.
  if (local > 0 && remote <= local + SKEW_MS) return false;
  return true;
}

function markSeen(asset) {
  try { localStorage.setItem(SEEN_KEY, asset.updated_at); } catch (_) {}
}

async function openDownload(url) {
  try {
    await Browser.open({ url, windowName: '_system' });
    return;
  } catch (_) { /* fall through to in-page navigation */ }
  try { window.location.href = url; } catch (_) {}
}

function showPill(asset, plat) {
  if (document.getElementById('bf-update-pill')) return;
  const pill = document.createElement('div');
  pill.id = 'bf-update-pill';
  // int32-max z-index: the main-menu overlay sits above normal UI layers and
  // would otherwise swallow taps on the pill ("tap does nothing").
  // Below the notch/status area: top-center pills under the status bar are
  // unreachable on notched phones ("too high to tap").
  pill.style.cssText = 'position:fixed;top:max(52px, env(safe-area-inset-top, 0px) + 12px);left:50%;transform:translateX(-50%);z-index:2147483647;display:flex;align-items:center;gap:8px;background:linear-gradient(180deg,#1a4a2a,#0d2818);border:1px solid #3a8a5a;border-radius:999px;padding:6px 8px 6px 14px;font:bold 12px monospace;color:#7f7;box-shadow:0 2px 12px rgba(0,0,0,.5);';
  const isIOS = plat === 'ios';
  // iOS can't install an IPA from inside the app — open the release page so
  // the file can be saved for AltStore/Sideloadly. Android gets the direct
  // APK (Custom Tabs auto-downloads it).
  const url = isIOS ? 'https://github.com/' + REPO + '/releases/tag/binaries' : asset.browser_download_url;
  const btn = document.createElement('button');
  btn.textContent = '⬆ UPDATE';
  btn.title = isIOS
    ? 'New build available — opens the release page so you can re-sideload it'
    : 'New build available — downloads the APK so you can install the update';
  btn.style.cssText = 'background:#3a8a5a;color:#fff;border:none;padding:4px 12px;border-radius:999px;font:bold 12px monospace;cursor:pointer;';
  btn.onclick = () => {
    btn.textContent = 'OPENING…';
    btn.disabled = true;
    markSeen(asset);
    openDownload(url).then(() => {
      btn.textContent = '⬆ UPDATE';
      btn.disabled = false;
    });
  };
  const x = document.createElement('button');
  x.textContent = '✕';
  x.title = 'Dismiss this update';
  x.style.cssText = 'background:none;color:#7f7;border:1px solid #3a8a5a;padding:2px 7px;border-radius:999px;font:11px monospace;cursor:pointer;';
  x.onclick = () => { markSeen(asset); pill.remove(); };
  pill.appendChild(btn);
  pill.appendChild(x);
  document.body.appendChild(pill);
}

// Plain-browser Android (playing on the website, no Capacitor): keep the old
// full-width banner — mobile Chrome downloads the APK file directly.
function showWebBar(asset) {
  if (document.getElementById('apk-update-bar')) return;
  const menu = document.getElementById('menu');
  if (!menu) return;
  const when = String(asset.updated_at || '').slice(0, 10);
  const mb = asset.size ? ' (' + Math.round(asset.size / 1048576) + ' MB)' : '';
  const bar = document.createElement('div');
  bar.id = 'apk-update-bar';
  bar.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:210;background:linear-gradient(90deg,#1a4a2a,#0d2818);border-bottom:1px solid #3a8a5a;color:#7f7;padding:10px 16px;display:flex;align-items:center;justify-content:space-between;font:13px monospace;gap:12px;';
  const span = document.createElement('span');
  span.textContent = '📱 New BlockForge APK — ' + when + mb;
  const dlBtn = document.createElement('button');
  dlBtn.textContent = 'DOWNLOAD';
  dlBtn.style.cssText = 'background:#3a8a5a;color:#fff;border:none;padding:6px 16px;border-radius:6px;font:bold 12px monospace;cursor:pointer;white-space:nowrap;';
  dlBtn.onclick = function() { markSeen(asset); bar.remove(); window.location.href = asset.browser_download_url; };
  const dismissBtn = document.createElement('button');
  dismissBtn.textContent = '✕';
  dismissBtn.style.cssText = 'background:none;color:#7f7;border:1px solid #3a8a5a;padding:4px 8px;border-radius:4px;font:12px monospace;cursor:pointer;';
  dismissBtn.onclick = function() { markSeen(asset); bar.remove(); };
  bar.appendChild(span);
  bar.appendChild(dlBtn);
  bar.appendChild(dismissBtn);
  document.body.appendChild(bar);
}

export function checkAppUpdate() {
  runCheck(false);
}

// Manual re-check (Settings button): bypasses the dismissed-version memory.
export function forceCheckAppUpdate() {
  try { localStorage.removeItem(SEEN_KEY); } catch (_) {}
  try { const p = document.getElementById('bf-update-pill'); if (p) p.remove(); } catch (_) {}
  runCheck(true);
}

function runCheck(manual) {
  try {
    if (/crazygames/i.test(location.hostname || '')) return;
    const plat = nativePlatform();
    if (plat === 'other') return;
    fetch('https://api.github.com/repos/' + REPO + '/releases/tags/binaries', { mode: 'cors' })
      .then((r) => r.json())
      .then((d) => {
        if (!d || !d.assets) return;
        const asset = pickAsset(d.assets, plat);
        if (!isNewer(asset)) return;
        let seen = '';
        try { seen = localStorage.getItem(SEEN_KEY) || ''; } catch (_) {}
        if (seen === asset.updated_at) return;
        if (plat === 'android-web') showWebBar(asset);
        else showPill(asset, plat);
      })
      .catch(() => {});
  } catch (_) {}
}
