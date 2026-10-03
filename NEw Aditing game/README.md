# Merge Keep 3D — P0 (standalone)

No voxel. No BlockForge imports. Own Vite + Three project.

## Run
```bash
npm install
npm run dev    # http://localhost:5174
npm run build
```

## P1 scope (this build)
- Town Hall 1-5: HP/tower caps/unlocks, upgrade cost + builder timer, finish-now with 🧪
- Builder queue: 1 slot, progress bar top-center, tap to speed up
- Mine 1-4: passive income scaling + offline welcome-back chest (8h cap)
- War chests: earned on wave/raid wins, Common→Legendary with pity (Epic every 10, Legendary every 25), loot = gold/elixir + leveled troops
- Hero Starfall: big button + H key, 40s cooldown, meteors nuke swarm (defend) or defenses (raid)

## P3 scope — FULL GAME (this build)
- 6 towers (Arrow/Cannon/Frost/Mortar/Tesla/Hive) + 6 troops (Grunt/Archer/Giant/Bomber/Healer/Drake), all mergeable L1-5, TH-gated unlocks
- TH 1-10 + Mine 1-6, tower cap 24, prestige-ready economy
- Endless waves past 8 with boss every 5 (2.1x brute), best-wave tracked, double chest at 8+
- Prestige Ascension: needs TH5+Wave8, resets to TH1, +1-12 Star Shards (+6% all power each, forever), keeps collection/season/builders
- 28-day seasons: XP from every win, 20 tiers, gold/elixir/chest rewards, claimable in Build
- Hero Starfall Lv1-5 (up to x3.5 dmg), bomber wall-bonus, healer sustain AI

## Models / CC0
All models are procedural cartoonish placeholders built in `src/models.js`.
To swap to free CC0 packs later (no licensing risk):
- Quaternius Ultimate Pack (CC0): https://quaternius.com
- Kenney Tower Defense / Creature packs (CC0): https://kenney.nl/assets
Replace the `makeTower/makeTroop/makeSwarm` builders with GLTF loads — game logic stays untouched.
