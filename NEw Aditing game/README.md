# Merge Keep 3D — P0 (standalone)

No voxel. No BlockForge imports. Own Vite + Three project.

## Run
```bash
npm install
npm run dev    # http://localhost:5174
npm run build
```

## P0 scope
- 16x16 cartoon diorama, orbit camera, Town Core + 3 tower types + walls
- Click tower → click same tower to MERGE (3x logic simplified to 2x for P0 feel, auto-merge with M)
- Barracks: recruit + merge troops (3x L → L+1), higher level = higher raid rank
- Defend: 8 swarm waves, win = gold/trophies
- Raid: 3 ghost bases, YOU deploy troops by clicking edge ring, stars → trophies
- Local save `mergekeep_p0_v1`, passive mine income

## Models / CC0
All models are procedural cartoonish placeholders built in `src/models.js`.
To swap to free CC0 packs later (no licensing risk):
- Quaternius Ultimate Pack (CC0): https://quaternius.com
- Kenney Tower Defense / Creature packs (CC0): https://kenney.nl/assets
Replace the `makeTower/makeTroop/makeSwarm` builders with GLTF loads — game logic stays untouched.
