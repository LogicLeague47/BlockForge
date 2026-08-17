// CrazyGames SDK Helper Functions

export function cgGameplayStart() {
  try {
    if (window.CrazyGames && window.CrazyGames.SDK && window.CrazyGames.SDK.game) {
      window.CrazyGames.SDK.game.gameplayStart();
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
