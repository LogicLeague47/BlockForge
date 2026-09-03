// CrazyGames SDK Helper Functions
//
// Per the CrazyGames v3 SDK, the SDK must be initialised (await SDK.init())
// before any module method is called. These helpers lazy-init once and then
// no-op safely off-platform (the SDK script is only injected on crazygames.com,
// see index.html) so the self-hosted build is completely unaffected.

let _initPromise = null;
let _ready = false;

function _onCrazyGames() {
  try {
    return /crazygames/i.test(location.hostname) || new URLSearchParams(location.search).has('cg');
  } catch (_) { return false; }
}

function _waitFor(cond, timeout) {
  return new Promise((resolve) => {
    const start = Date.now();
    const tick = () => {
      if (cond()) return resolve(true);
      if (Date.now() - start > timeout) return resolve(false);
      setTimeout(tick, 100);
    };
    tick();
  });
}

export function cgInit() {
  if (_initPromise) return _initPromise;
  _initPromise = (async () => {
    // Off-platform the SDK script is never injected, so don't hang waiting.
    if (!_onCrazyGames()) { _ready = false; return false; }
    try {
      // The SDK script is injected asynchronously — wait for it to appear.
      await _waitFor(() => !!(window.CrazyGames && window.CrazyGames.SDK), 12000);
      const CG = window.CrazyGames;
      if (CG && CG.SDK && typeof CG.SDK.init === 'function') {
        await CG.SDK.init();
        _ready = true;
      }
    } catch (_) {
      _ready = false;
    }
    return _ready;
  })();
  return _initPromise;
}

// ── SDK module accessors ────────────────────────────────────────────────
function sdkGame() {
  return _ready && window.CrazyGames && window.CrazyGames.SDK ? window.CrazyGames.SDK.game : null;
}
function sdkAd() {
  return _ready && window.CrazyGames && window.CrazyGames.SDK ? window.CrazyGames.SDK.ad : null;
}
function sdkUser() {
  return _ready && window.CrazyGames && window.CrazyGames.SDK ? window.CrazyGames.SDK.user : null;
}
function sdkBanner() {
  return _ready && window.CrazyGames && window.CrazyGames.SDK ? window.CrazyGames.SDK.banner : null;
}

// ── game module ─────────────────────────────────────────────────────────

export function cgGameplayStart() {
  const g = sdkGame();
  if (g) { try { g.gameplayStart(); } catch (_) {} }
}

export function cgGameplayStop() {
  const g = sdkGame();
  if (g) { try { g.gameplayStop(); } catch (_) {} }
}

export function cgLoadingStart() {
  const g = sdkGame();
  if (g) { try { g.loadingStart(); } catch (_) {} }
}

export function cgLoadingStop() {
  const g = sdkGame();
  if (g) { try { g.loadingStop(); } catch (_) {} }
}

export function cgHappyTime() {
  const g = sdkGame();
  if (g) { try { g.happyTime(); } catch (_) {} }
}

// Report player progression milestones (0-100). Auto-available, no CG review.
export function cgReportProgress(percent) {
  const g = sdkGame();
  if (g && typeof g.reportGameCompletedPercentage === 'function') {
    try { g.reportGameCompletedPercentage(Math.max(0, Math.min(100, percent))); } catch (_) {}
  }
}

// Attach in-game context to user feedback reports (better bug reproduction).
export function cgSetGameContext(data) {
  const g = sdkGame();
  if (g && typeof g.setGameContext === 'function') {
    try { g.setGameContext(data); } catch (_) {}
  }
}

export function cgClearGameContext() {
  const g = sdkGame();
  if (g && typeof g.clearGameContext === 'function') {
    try { g.clearGameContext(); } catch (_) {}
  }
}

// Read the current game settings from the SDK (disableChat, muteAudio).
export function cgGetSettings() {
  const g = sdkGame();
  if (!g) return null;
  try {
    // settings may be a property or returned by a method
    const s = g.settings;
    if (s && typeof s === 'object') return s;
  } catch (_) {}
  return null;
}

// Check if CG says to mute audio (Full Implementation requirement).
export function cgShouldMuteAudio() {
  const s = cgGetSettings();
  return !!(s && s.muteAudio);
}

// Register a settings change listener (dispose handle with returned function).
export function cgOnSettingsChange(callback) {
  const g = sdkGame();
  if (!g) return () => {};
  try {
    if (typeof g.addSettingsChangeListener === 'function') {
      const handle = g.addSettingsChangeListener(callback);
      return () => { try { g.removeSettingsChangeListener(handle); } catch (_) {} };
    }
    // Fallback: poll for changes every 2s
    let prev = JSON.stringify(cgGetSettings());
    const id = setInterval(() => {
      const cur = JSON.stringify(cgGetSettings());
      if (cur !== prev) { prev = cur; callback(cgGetSettings()); }
    }, 2000);
    return () => clearInterval(id);
  } catch (_) { return () => {}; }
}

// Is the game running in instant multiplayer mode?
export function cgIsInstantMultiplayer() {
  const g = sdkGame();
  if (!g) return false;
  try { return !!g.isInstantMultiplayer; } catch (_) { return false; }
}

// Report multiplayer room state to the CG platform.
export function cgUpdateRoom(roomData) {
  const g = sdkGame();
  if (g && typeof g.updateRoom === 'function') {
    try { g.updateRoom(roomData); } catch (_) {}
  }
}

export function cgLeftRoom() {
  const g = sdkGame();
  if (g && typeof g.leftRoom === 'function') {
    try { g.leftRoom(); } catch (_) {}
  }
}

// ── ad module ───────────────────────────────────────────────────────────

export function cgMidgameAd({ adStarted, adFinished, adError } = {}) {
  const ad = sdkAd();
  if (ad) {
    try {
      ad.requestAd('midgame', {
        adStarted: () => { if (adStarted) adStarted(); },
        adFinished: () => { if (adFinished) adFinished(); },
        adError: (error) => { if (adError) adError(error); },
      });
      return;
    } catch (_) { /* fall through to error callback */ }
  }
  if (adError) adError(new Error('cgMidgameAd unavailable'));
  else if (adFinished) adFinished();
}

// Rewarded ad — highest revenue ad type. Auto-available, no CG review.
// The reward callback fires ONLY if the user watches the full ad.
export function cgRewardedAd({ adStarted, adRewarded, adFinished, adError } = {}) {
  const ad = sdkAd();
  if (ad) {
    try {
      ad.requestAd('rewarded', {
        adStarted: () => { if (adStarted) adStarted(); },
        adFinished: () => { if (adFinished) adFinished(); },
        adError: (error) => { if (adError) adError(error); },
        // The SDK fires a separate rewarded callback when the ad completes
        // with a reward. In v3 HTML5, adFinished fires for all completions;
        // the reward is implicit in 'rewarded' type completion.
      });
      return;
    } catch (_) { /* fall through */ }
  }
  if (adError) adError(new Error('cgRewardedAd unavailable'));
  else if (adFinished) adFinished();
}

// Detect adblock presence. Auto-available.
export async function cgHasAdblock() {
  const ad = sdkAd();
  if (ad && typeof ad.hasAdblock === 'function') {
    try { return await ad.hasAdblock(); } catch (_) { return false; }
  }
  return false;
}

// ── user module ─────────────────────────────────────────────────────────

// v3: isUserAccountAvailable is a boolean PROPERTY (not a function).
// False on embeds — gate every user-module call on this.
export function cgIsAccountAvailable() {
  const u = sdkUser();
  if (!u) return false;
  try {
    const v = u.isUserAccountAvailable;
    return typeof v === 'function' ? !!v() : !!v;
  } catch (_) { return false; }
}

// Legacy alias (was checking the property as a function — always false).
export function cgIsAuthenticated() {
  return cgIsAccountAvailable();
}

// v3: getUser() is ASYNC — returns the user object or null (logged out).
export async function cgGetUser() {
  const u = sdkUser();
  if (!u || typeof u.getUser !== 'function') return null;
  try { return await u.getUser(); } catch (_) { return null; }
}

// Get user token for server-side auth. Auto-available.
// NEVER use for client-side identity — send it to the server, which verifies
// the RS256 signature before trusting the userId (CG ToS).
export async function cgGetUserToken() {
  const u = sdkUser();
  if (!u || typeof u.getUserToken !== 'function') return null;
  try { return await u.getUserToken(); } catch (_) { return null; }
}

// Show the CG login/register popup. MUST only run on user click — never
// auto-trigger (CG ToS). Resolves { ok, user?, code? } with raw error codes
// (showAuthPromptInProgress | userAlreadySignedIn | userCancelled).
export async function cgShowAuthPrompt() {
  const u = sdkUser();
  if (!u || typeof u.showAuthPrompt !== 'function') return { ok: false, code: 'unavailable' };
  try {
    const user = await u.showAuthPrompt();
    return { ok: true, user };
  } catch (e) {
    return { ok: false, code: (e && e.code) || 'unknown' };
  }
}

// Show the official CG account-linking modal (ToS: use this, never build your
// own link prompt). Resolves { ok, answer: 'yes'|'no'|null, code? } with raw
// codes (showAccountLinkPromptInProgress | userNotAuthenticated).
export async function cgShowAccountLinkPrompt() {
  const u = sdkUser();
  if (!u || typeof u.showAccountLinkPrompt !== 'function') return { ok: false, answer: null, code: 'unavailable' };
  try {
    const res = await u.showAccountLinkPrompt();
    const answer = res && res.response;
    return { ok: answer === 'yes', answer: answer || null };
  } catch (e) {
    return { ok: false, answer: null, code: (e && e.code) || 'unknown' };
  }
}

// Register auth state change listener. Returns a dispose function.
export function cgOnAuthChange(callback) {
  const u = sdkUser();
  if (!u) return () => {};
  try {
    if (typeof u.addAuthListener === 'function') {
      const handle = u.addAuthListener(callback);
      return () => { try { u.removeAuthListener(handle); } catch (_) {} };
    }
    // Fallback: legacy onAuthStateChange
    if (typeof u.onAuthStateChange === 'function') {
      u.onAuthStateChange(callback);
      return () => {};
    }
  } catch (_) {}
  return () => {};
}

// Get CG friends list (page 0-indexed, size max 50). Auto-available.
export async function cgListFriends(page = 0, size = 20) {
  const u = sdkUser();
  if (!u || typeof u.listFriends !== 'function') return [];
  try { return await u.listFriends({ page, size }) || []; } catch (_) { return []; }
}

// Device / browser / country info. Auto-available.
export function cgSystemInfo() {
  const u = sdkUser();
  if (!u) return null;
  try { return u.systemInfo || null; } catch (_) { return null; }
}

// ── banner module ───────────────────────────────────────────────────────

// Show a banner ad in a container. Auto-available.
export function cgShowBanner(containerId, width, height) {
  const b = sdkBanner();
  if (!b || typeof b.requestBanner !== 'function') return;
  try { b.requestBanner({ id: containerId, width, height }); } catch (_) {}
}

// Show a responsive banner that fills its container width.
export function cgShowResponsiveBanner(containerId) {
  const b = sdkBanner();
  if (!b || typeof b.requestResponsiveBanner !== 'function') return;
  try { b.requestResponsiveBanner(containerId); } catch (_) {}
}

export function cgClearBanner(containerId) {
  const b = sdkBanner();
  if (!b || typeof b.clearBanner !== 'function') return;
  try { b.clearBanner(containerId); } catch (_) {}
}

export function cgClearAllBanners() {
  const b = sdkBanner();
  if (!b || typeof b.clearAllBanners !== 'function') return;
  try { b.clearAllBanners(); } catch (_) {}
}

// ── environment ─────────────────────────────────────────────────────────

// Returns 'local', 'crazygames', or 'disabled'.
export function cgEnvironment() {
  try {
    const e = window.CrazyGames?.SDK?.environment;
    if (e) return e;
  } catch (_) {}
  return _onCrazyGames() ? 'crazygames' : 'disabled';
}
