// Feature flags — all NEW features ship gated behind a flag here so they can
// be play-tested ONLY in the Dev World before release.
//
// Workflow:
//  1. Set `devOnly: true` (default for unreleased features).
//  2. The feature is enabled when running in a Dev World (isDevWorld is true).
//  3. To release it to all worlds, flip `devOnly` to false.
//
// Add every new feature to this central list so nothing leaks to players
// before you've had a chance to test it yourself.

// Central registry of feature flags. `isEnabled` is the single source of
// truth used everywhere; gates must call feature('dims') / feature('x')
// rather than re-checking world type inline, so the release toggle works.
const FEATURES = {
  // New Dimension (to be implemented)
  dimension: { devOnly: true },

  // Reserved slots for future work — set devOnly as you add them.
  // example_feature: { devOnly: true },
};

// Returns whether the feature is currently enabled in the current context.
// - In a Dev World: enabled if the flag exists (stage features here).
// - In any other world: enabled only if the feature is no longer devOnly
//   (i.e. released).
export function featureEnabled(name, isDevWorld) {
  const f = FEATURES[name];
  if (!f) return false;
  return isDevWorld || !f.devOnly;
}