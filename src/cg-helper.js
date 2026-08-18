// CrazyGames SDK Helper Functions

export function cgGameplayStart() {
  try {
    if (window.CrazyGames && window.CrazyGames.SDK && window.CrazyGames.SDK.game) {
      window.CrazyGames.SDK.game.gameplayStart();
    }
  } catch (_) {}
}

export function cgGameplayStop() {
  try {
    if (window.CrazyGames && window.CrazyGames.SDK && window.CrazyGames.SDK.game) {
      window.CrazyGames.SDK.game.gameplayStop();
    }
  } catch (_) {}
}

export function cgLoadingStart() {
  try {
    if (window.CrazyGames && window.CrazyGames.SDK && window.CrazyGames.SDK.game) {
      window.CrazyGames.SDK.game.loadingStart();
    }
  } catch (_) {}
}

export function cgLoadingStop() {
  try {
    if (window.CrazyGames && window.CrazyGames.SDK && window.CrazyGames.SDK.game) {
      window.CrazyGames.SDK.game.loadingStop();
    }
  } catch (_) {}
}

export function cgHappyTime() {
  try {
    if (window.CrazyGames && window.CrazyGames.SDK && window.CrazyGames.SDK.game) {
      window.CrazyGames.SDK.game.happyTime();
    }
  } catch (_) {}
}

export function cgMidgameAd({ adStarted, adFinished, adError } = {}) {
  try {
    if (window.CrazyGames && window.CrazyGames.SDK && window.CrazyGames.SDK.ad) {
      window.CrazyGames.SDK.ad.requestAd('midgame', {
        adStarted: () => { if (adStarted) adStarted(); },
        adFinished: () => { if (adFinished) adFinished(); },
        adError: (error) => { if (adError) adError(error); },
      });
    } else if (adFinished) {
      adFinished();
    }
  } catch (_) {
    if (adError) adError(new Error('cgMidgameAd failed'));
  }
}
