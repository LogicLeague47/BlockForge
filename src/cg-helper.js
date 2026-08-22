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

function sdkGame() {
  return _ready && window.CrazyGames && window.CrazyGames.SDK ? window.CrazyGames.SDK.game : null;
}
function sdkAd() {
  return _ready && window.CrazyGames && window.CrazyGames.SDK ? window.CrazyGames.SDK.ad : null;
}

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
