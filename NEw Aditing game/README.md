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

## P2 scope (this build)
- Daily raid seed: same base for everyone each day (seeded RNG), 1 try/day, streak 🔥 bonus (+3🏆/streak, +15🪙/streak)
- Leagues: Wood→Legend (6 tiers), loot bonus 0→50%, badge in topbar + next-league hint
- Collection: 45 entries (towers/troops/waves/raids/chests), live % + milestone claims at 25/50/75/100%
- Second builder: hire for 150🏆, true 2-slot parallel queue, all timers multi-slot

## Models / CC0
All models are procedural cartoonish placeholders built in `src/models.js`.
To swap to free CC0 packs later (no licensing risk):
- Quaternius Ultimate Pack (CC0): https://quaternius.com
- Kenney Tower Defense / Creature packs (CC0): https://kenney.nl/assets
Replace the `makeTower/makeTroop/makeSwarm` builders with GLTF loads — game logic stays untouched.
