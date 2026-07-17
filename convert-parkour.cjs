#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const MC_TO_BF = {
  // AIR
  'minecraft:air': 0, 'minecraft:cave_air': 0, 'minecraft:void_air': 0,
  // Core terrain
  'minecraft:grass_block': 1, 'minecraft:dirt': 2, 'minecraft:stone': 3,
  'minecraft:cobblestone': 4,
  // WOOD = oak log (ID 5), LEAVES = 6
  'minecraft:oak_log': 5, 'minecraft:spruce_log': 5, 'minecraft:birch_log': 5,
  'minecraft:jungle_log': 5, 'minecraft:acacia_log': 5, 'minecraft:dark_oak_log': 5,
  'minecraft:mangrove_log': 5, 'minecraft:cherry_log': 5, 'minecraft:bamboo_block': 5,
  'minecraft:crimson_stem': 5, 'minecraft:warped_stem': 5,
  'minecraft:mangrove_roots': 5,
  'minecraft:stripped_oak_log': 5, 'minecraft:stripped_spruce_log': 5,
  'minecraft:stripped_birch_log': 5, 'minecraft:stripped_jungle_log': 5,
  'minecraft:stripped_acacia_log': 5, 'minecraft:stripped_dark_oak_log': 5,
  'minecraft:oak_leaves': 6, 'minecraft:spruce_leaves': 6, 'minecraft:birch_leaves': 6,
  'minecraft:jungle_leaves': 6, 'minecraft:acacia_leaves': 6, 'minecraft:dark_oak_leaves': 6,
  'minecraft:mangrove_leaves': 6, 'minecraft:cherry_leaves': 6,
  'minecraft:azalea_leaves': 6, 'minecraft:flowering_azalea_leaves': 6,
  'minecraft:glow_lichen': 6, 'minecraft:warped_wart_block': 6, 'minecraft:nether_wart_block': 6,
  'minecraft:twisting_vines': 6, 'minecraft:weeping_vines': 6,
  'minecraft:big_dripleaf': 6,
  // SAND = 7
  'minecraft:sand': 7, 'minecraft:red_sand': 7,
  // WATER = 8
  'minecraft:water': 8,
  // BEDROCK = 9
  'minecraft:bedrock': 9,
  // PLANKS = 10
  'minecraft:oak_planks': 10, 'minecraft:spruce_planks': 10, 'minecraft:birch_planks': 10,
  'minecraft:jungle_planks': 10, 'minecraft:acacia_planks': 10, 'minecraft:dark_oak_planks': 10,
  'minecraft:mangrove_planks': 10, 'minecraft:cherry_planks': 10, 'minecraft:bamboo_planks': 10,
  'minecraft:crimson_planks': 10, 'minecraft:warped_planks': 10,
  // ORES
  'minecraft:coal_ore': 11, 'minecraft:iron_ore': 12, 'minecraft:gold_ore': 13,
  'minecraft:diamond_ore': 14,
  // SNOW = 15
  'minecraft:snow': 15,
  // GLASS = 16
  'minecraft:glass': 16,
  'minecraft:white_stained_glass': 16, 'minecraft:red_stained_glass': 16,
  'minecraft:blue_stained_glass': 16, 'minecraft:yellow_stained_glass': 16,
  'minecraft:green_stained_glass': 16, 'minecraft:black_stained_glass': 16,
  'minecraft:cyan_stained_glass': 16, 'minecraft:magenta_stained_glass': 16,
  'minecraft:orange_stained_glass': 16, 'minecraft:light_blue_stained_glass': 16,
  'minecraft:lime_stained_glass': 16, 'minecraft:pink_stained_glass': 16,
  'minecraft:purple_stained_glass': 16, 'minecraft:gray_stained_glass': 16,
  'minecraft:light_gray_stained_glass': 16, 'minecraft:brown_stained_glass': 16,
  // BRICK = 17
  'minecraft:brick_block': 17, 'minecraft:bricks': 17,
  // GRAVEL = 18
  'minecraft:gravel': 18,
  // CLAY = 19
  'minecraft:clay': 19,
  // PUMPKIN = 20
  'minecraft:pumpkin': 20, 'minecraft:melon': 20, 'minecraft:jack_o_lantern': 20,
  'minecraft:brown_mushroom_block': 20, 'minecraft:red_mushroom_block': 20,
  'minecraft:bee_nest': 20, 'minecraft:beehive': 20,
  // CACTUS = 21
  'minecraft:cactus': 21,
  // FLOWER_RED = 22
  'minecraft:poppy': 22, 'minecraft:dandelion': 22, 'minecraft:blue_orchid': 22,
  'minecraft:allium': 22, 'minecraft:azure_bluet': 22,
  'minecraft:red_tulip': 22, 'minecraft:orange_tulip': 22,
  'minecraft:white_tulip': 22, 'minecraft:pink_tulip': 22,
  'minecraft:oxeye_daisy': 22, 'minecraft:cornflower': 22, 'minecraft:lily_of_the_valley': 22,
  'minecraft:dead_bush': 22, 'minecraft:crimson_roots': 22, 'minecraft:warped_roots': 22,
  'minecraft:nether_sprouts': 22, 'minecraft:small_dripleaf': 22,
  'minecraft:azalea': 22, 'minecraft:flowering_azalea': 22,
  'minecraft:sea_pickle': 22, 'minecraft:turtle_egg': 22,
  // FLOWER_YELLOW = 23
  'minecraft:brown_mushroom': 23, 'minecraft:red_mushroom': 23,
  // BOOKSHELF = 24
  'minecraft:bookshelf': 24,
  // OBSIDIAN = 25
  'minecraft:obsidian': 25, 'minecraft:crying_obsidian': 25,
  // TNT = 26
  'minecraft:tnt': 26,
  // CRAFTING = 27
  'minecraft:crafting_table': 27,
  // NETHERRACK = 28
  'minecraft:netherrack': 28,
  // RED_SAND = 29
  // TERRACOTTA = 30
  'minecraft:terracotta': 30,
  'minecraft:white_terracotta': 30, 'minecraft:orange_terracotta': 30,
  'minecraft:magenta_terracotta': 30, 'minecraft:light_blue_terracotta': 30,
  'minecraft:yellow_terracotta': 30, 'minecraft:lime_terracotta': 30,
  'minecraft:pink_terracotta': 30, 'minecraft:gray_terracotta': 30,
  'minecraft:light_gray_terracotta': 30, 'minecraft:cyan_terracotta': 30,
  'minecraft:purple_terracotta': 30, 'minecraft:blue_terracotta': 30,
  'minecraft:brown_terracotta': 30, 'minecraft:green_terracotta': 30,
  'minecraft:red_terracotta': 30, 'minecraft:black_terracotta': 30,
  // MYCELIUM = 34
  'minecraft:mycelium': 34, 'minecraft:podzol': 34,
  'minecraft:moss_carpet': 34,
  // FURNACE = 32
  'minecraft:furnace': 32, 'minecraft:glowstone': 32, 'minecraft:sea_lantern': 32,
  'minecraft:shroomlight': 32, 'minecraft:lantern': 32, 'minecraft:soul_lantern': 32,
  'minecraft:ochre_froglight': 32, 'minecraft:verdant_froglight': 32,
  'minecraft:pearlescent_froglight': 32, 'minecraft:end_rod': 32,
  'minecraft:campfire': 32, 'minecraft:soul_campfire': 32,
  'minecraft:smoker': 32, 'minecraft:blast_furnace': 32,
  // TORCH = 41
  'minecraft:torch': 41, 'minecraft:redstone_torch': 41, 'minecraft:soul_torch': 41,
  // SANDSTONE = 42
  'minecraft:sandstone': 42, 'minecraft:chiseled_sandstone': 42,
  'minecraft:cut_sandstone': 42, 'minecraft:red_sandstone': 42,
  // MOSSY_COBBLESTONE = 43
  'minecraft:mossy_cobblestone': 43,
  // NETHER_BRICK = 45
  'minecraft:nether_bricks': 45, 'minecraft:red_nether_bricks': 45,
  'minecraft:blue_nether_bricks': 45,
  // GLASS_PANE = 46
  'minecraft:glass_pane': 46,
  'minecraft:white_stained_glass_pane': 46, 'minecraft:red_stained_glass_pane': 46,
  'minecraft:blue_stained_glass_pane': 46, 'minecraft:yellow_stained_glass_pane': 46,
  // HAY_BLOCK = 47
  'minecraft:hay_block': 47,
  // COAL_BLOCK = 49
  'minecraft:coal_block': 49,
  // IRON_BLOCK = 50
  'minecraft:iron_block': 50, 'minecraft:iron_bars': 50,
  // GOLD_BLOCK = 51
  'minecraft:gold_block': 51,
  // DIAMOND_BLOCK = 52
  'minecraft:diamond_block': 52,
  // END_STONE = 53
  'minecraft:end_stone': 53, 'minecraft:end_stone_bricks': 53,
  // QUARTZ_BLOCK = 54
  'minecraft:quartz_block': 54, 'minecraft:quartz_pillar': 54,
  'minecraft:chiseled_quartz_block': 54, 'minecraft:quartz_bricks': 54,
  'minecraft:smooth_quartz': 54,
  // COPPER_ORE = 63
  'minecraft:copper_ore': 63,
  // EMERALD_ORE = 64
  'minecraft:emerald_ore': 64,
  // IRON_BARS = 81 (separate from iron_block)
  // LAVA = 80
  'minecraft:lava': 80,
  // SNOW_BLOCK = 37
  'minecraft:snow_block': 37,
  // Additional blocks mapped to closest match
  'minecraft:deepslate': 3, 'minecraft:cobbled_deepslate': 4,
  'minecraft:polished_deepslate': 30, 'minecraft:deepslate_bricks': 30,
  'minecraft:deepslate_tiles': 30,
  'minecraft:smooth_basalt': 3, 'minecraft:basalt': 3,
  'minecraft:calcite': 3, 'minecraft:tuff': 3, 'minecraft:dripstone_block': 3,
  'minecraft:stone_bricks': 3, 'minecraft:chiseled_stone_bricks': 3,
  'minecraft:cracked_stone_bricks': 3, 'minecraft:mossy_stone_bricks': 43,
  'minecraft:smooth_stone': 3,
  'minecraft:prismarine': 30, 'minecraft:dark_prismarine': 30, 'minecraft:prismarine_bricks': 30,
  'minecraft:purpur_block': 30, 'minecraft:purpur_pillar': 30,
  'minecraft:packed_ice': 15, 'minecraft:blue_ice': 15, 'minecraft:ice': 15,
  'minecraft:slime_block': 30, 'minecraft:honey_block': 30,
  'minecraft:honeycomb_block': 30, 'minecraft:bone_block': 30,
  'minecraft:target': 30, 'minecraft:barrier': 3,
  'minecraft:command_block': 30, 'minecraft:spawner': 30,
  'minecraft:infested_stone': 3, 'minecraft:infested_cobblestone': 4,
  'minecraft:anvil': 50, 'minecraft:chipped_anvil': 50, 'minecraft:damaged_anvil': 50,
  'minecraft:lodestone': 50, 'minecraft:lightning_rod': 50,
  'minecraft:conduit': 52,
  'minecraft:packed_mud': 30, 'minecraft:mud_bricks': 30,
  'minecraft:mud': 2, 'minecraft:rooted_dirt': 2, 'minecraft:coarse_dirt': 2,
  'minecraft:dried_kelp_block': 30, 'minecraft:sponge': 30,
  'minecraft:observer': 30, 'minecraft:dispenser': 30, 'minecraft:dropper': 30,
  'minecraft:note_block': 30, 'minecraft:enchanting_table': 30,
  'minecraft:brewing_stand': 30, 'minecraft:cauldron': 30,
  'minecraft:grindstone': 30, 'minecraft:stonecutter': 30,
  'minecraft:cartography_table': 10, 'minecraft:loom': 10,
  'minecraft:fletching_table': 10, 'minecraft:smithing_table': 10,
  'minecraft:composter': 10, 'minecraft:lectern': 10,
  'minecraft:blackstone': 3, 'minecraft:polished_blackstone': 30,
  'minecraft:polished_blackstone_bricks': 30,
  'minecraft:soul_sand': 3, 'minecraft:soul_soil': 3,
  'minecraft:ancient_debris': 3, 'minecraft:reinforced_deepslate': 3,
  'minecraft:respawn_anchor': 25,
  'minecraft:sculk': 3, 'minecraft:sculk_sensor': 30,
  'minecraft:white_concrete': 30, 'minecraft:orange_concrete': 30,
  'minecraft:magenta_concrete': 30, 'minecraft:light_blue_concrete': 30,
  'minecraft:yellow_concrete': 30, 'minecraft:lime_concrete': 30,
  'minecraft:pink_concrete': 30, 'minecraft:gray_concrete': 30,
  'minecraft:light_gray_concrete': 30, 'minecraft:cyan_concrete': 30,
  'minecraft:purple_concrete': 30, 'minecraft:blue_concrete': 30,
  'minecraft:brown_concrete': 30, 'minecraft:green_concrete': 30,
  'minecraft:red_concrete': 30, 'minecraft:black_concrete': 30,
  'minecraft:white_wool': 30, 'minecraft:red_wool': 30, 'minecraft:blue_wool': 30,
  'minecraft:chain': 50,
  'minecraft:lapis_ore': 12, 'minecraft:redstone_ore': 12,
  'minecraft:nether_gold_ore': 13, 'minecraft:nether_quartz_ore': 13,
  'minecraft:emerald_block': 52, 'minecraft:lapis_block': 30,
  'minecraft:amethyst_block': 30,
  'minecraft:flower_pot': 27,
  'minecraft:crimson_nylium': 1, 'minecraft:warped_nylium': 1,
};

function readTagPayload(type, buf, p) {
  switch (type) {
    case 0: return [null, p];
    case 1: return [buf[p], p + 1];
    case 2: return [buf.readInt16BE(p), p + 2];
    case 3: return [buf.readInt32BE(p), p + 4];
    case 4: return [buf.readBigInt64BE(p), p + 8];
    case 5: return [buf.readFloatBE(p), p + 4];
    case 6: return [buf.readDoubleBE(p), p + 8];
    case 7: { const len = buf.readInt32BE(p); p += 4; return [buf.slice(p, p + len), p + len]; }
    case 8: { const len = buf.readUInt16BE(p); p += 2; return [buf.slice(p, p + len).toString(), p + len]; }
    case 9: {
      const elemType = buf[p]; p++;
      const len = buf.readInt32BE(p); p += 4;
      const arr = [];
      for (let i = 0; i < len; i++) { const [val, newP] = readTagPayload(elemType, buf, p); arr.push(val); p = newP; }
      return [arr, p];
    }
    case 10: {
      const obj = {};
      while (true) {
        const t = buf[p]; p++;
        if (t === 0) break;
        const nLen = buf.readUInt16BE(p); p += 2;
        const name = buf.slice(p, p + nLen).toString(); p += nLen;
        const [val, newP] = readTagPayload(t, buf, p);
        obj[name] = val; p = newP;
      }
      return [obj, p];
    }
    case 11: { const len = buf.readInt32BE(p); p += 4; const arr = []; for (let i = 0; i < len; i++) { arr.push(buf.readInt32BE(p)); p += 4; } return [arr, p]; }
    case 12: { const len = buf.readInt32BE(p); p += 4; const arr = []; for (let i = 0; i < len; i++) { arr.push(buf.readBigInt64BE(p)); p += 8; } return [arr, p]; }
    default: throw new Error('Unknown type: ' + type);
  }
}

function parseNBT(buf) {
  let p = 0;
  const tagType = buf[p]; p++;
  if (tagType === 0) return null;
  const nameLen = buf.readUInt16BE(p); p += 2;
  p += nameLen;
  const [root] = readTagPayload(tagType, buf, p);
  return root;
}

function mcToBF(mcName) {
  const id = MC_TO_BF[mcName];
  return id !== undefined ? id : 3;
}

// Coordinate bounds — capture the full spiral structure
const MIN_X = -100, MAX_X = 100;
const MIN_Z = -100, MAX_Z = 100;
const MIN_Y = 1, MAX_Y = 300;
// Filter out natural terrain filler: stone, dirt, grass, sand, bedrock, water, lava, gravel, clay
// Keep everything else (planks, logs, leaves, wool, pistons, TNT, etc.)
const TERRAIN = new Set([0, 1, 2, 3, 7, 8, 9, 18, 19, 80]);

const worldDir = process.argv[2] || '/tmp/parkour_spiral/Parkour Spiral';
const outputPath = process.argv[3] || path.join(__dirname, 'public', 'parkour-chunks.bin.gz');

console.log(`Converting: ${worldDir}`);
console.log(`Coordinate filter: X[${MIN_X}..${MAX_X}] Y[${MIN_Y}..${MAX_Y}] Z[${MIN_Z}..${MAX_Z}]`);
const regionDir = path.join(worldDir, 'region');
if (!fs.existsSync(regionDir)) { console.error('No region dir!'); process.exit(1); }

const regionFiles = fs.readdirSync(regionDir).filter(f => f.endsWith('.mca'));
console.log(`Found ${regionFiles.length} region files`);

const allX = [], allY = [], allZ = [], allB = [];
const seen = new Set();

for (const file of regionFiles) {
  const m = file.match(/r\.(-?\d+)\.(-?\d+)/);
  if (!m) continue;
  const rx = parseInt(m[1]), rz = parseInt(m[2]);
  // Only process regions that overlap our coordinate bounds
  if ((rx + 1) * 512 < MIN_X || rx * 512 > MAX_X) continue;
  if ((rz + 1) * 512 < MIN_Z || rz * 512 > MAX_Z) continue;

  const filePath = path.join(regionDir, file);
  if (fs.statSync(filePath).size === 0) continue;

  process.stdout.write(`  ${file}...`);
  const data = fs.readFileSync(filePath);
  let count = 0;

  for (let i = 0; i < 1024; i++) {
    const offset = (data[i * 4] << 16) | (data[i * 4 + 1] << 8) | data[i * 4 + 2];
    const sectorCount = data[i * 4 + 3];
    if (offset === 0 || sectorCount === 0) continue;

    const fileOffset = offset * 4096;
    if (fileOffset + 5 > data.length) continue;

    const chunkLen = data.readUInt32BE(fileOffset);
    const compression = data[fileOffset + 4];
    if (compression !== 2) continue;

    try {
      const compressed = data.slice(fileOffset + 5, fileOffset + 4 + chunkLen);
      const decompressed = zlib.inflateSync(compressed);
      const root = parseNBT(decompressed);
      if (!root) continue;

      const cx = root.xPos || 0;
      const cz = root.zPos || 0;

      const sections = root.sections || [];
      for (const section of sections) {
        const sectionY = section.Y;
        const sectionMinY = sectionY * 16;
        if (sectionMinY + 16 < MIN_Y || sectionMinY > MAX_Y) continue;

        const bs = section.block_states;
        if (!bs || !bs.palette || !bs.data) continue;
        const palette = bs.palette;
        const dataArr = bs.data;
        if (palette.length === 0 || dataArr.length === 0) continue;

        const bfPalette = new Int32Array(palette.length);
        for (let j = 0; j < palette.length; j++) {
          const e = palette[j];
          if (typeof e === 'string') bfPalette[j] = mcToBF(e);
          else if (e && e.Name) bfPalette[j] = mcToBF(e.Name);
          else bfPalette[j] = 0;
        }

        const bitsPerEntry = Math.max(4, Math.ceil(Math.log2(palette.length)));
        const entriesPerLong = Math.floor(64 / bitsPerEntry);
        const mask = (1n << BigInt(bitsPerEntry)) - 1n;

        const wxBase = cx * 16;
        const wzBase = cz * 16;

        for (let idx = 0; idx < 4096; idx++) {
          const longIndex = (idx / entriesPerLong) | 0;
          if (longIndex >= dataArr.length) continue;

          const bIdx = Number((dataArr[longIndex] >> BigInt((idx % entriesPerLong) * bitsPerEntry)) & mask);
          const blockId = bfPalette[bIdx];
          if (blockId === 0) continue;

          const lx = idx & 0xF;
          const lz = (idx >> 4) & 0xF;
          const ly = (idx >> 8) & 0xF;
          const wy = sectionMinY + ly;
          const wx = wxBase + lx;
          const wz = wzBase + lz;

          if (wx < MIN_X || wx > MAX_X || wz < MIN_Z || wz > MAX_Z || wy < MIN_Y || wy > MAX_Y) continue;

          // Skip pure terrain filler blocks to keep only the parkour structure
          if (TERRAIN.has(blockId)) continue;

          const key = `${wx},${wy},${wz}`;
          if (seen.has(key)) continue;
          seen.add(key);

          allX.push(wx);
          allY.push(wy);
          allZ.push(wz);
          allB.push(blockId);
          count++;
        }
      }
    } catch (e) {}
  }
  console.log(` ${count} blocks`);
}

console.log(`\nTotal blocks: ${allB.length}`);

let minX = Infinity, maxX = -Infinity;
let minY = Infinity, maxY = -Infinity;
let minZ = Infinity, maxZ = -Infinity;

for (let i = 0; i < allB.length; i++) {
  const x = allX[i], y = allY[i], z = allZ[i];
  if (x < minX) minX = x; if (x > maxX) maxX = x;
  if (y < minY) minY = y; if (y > maxY) maxY = y;
  if (z < minZ) minZ = z; if (z > maxZ) maxZ = z;
}

let spawnY = 100;
for (let y = maxY; y >= minY; y--) {
  let found = false;
  for (let i = 0; i < allB.length; i++) {
    if (allX[i] === 0 && allZ[i] === 0 && allY[i] === y) { found = true; break; }
  }
  if (found) { spawnY = y + 2; break; }
}

const headerSize = 9 * 4;
const bodySize = allB.length * 4 * 4;
const buffer = Buffer.alloc(headerSize + bodySize);
let p = 0;

buffer.writeInt32BE(1, p); p += 4;
buffer.writeInt32BE(minX, p); p += 4;
buffer.writeInt32BE(maxX, p); p += 4;
buffer.writeInt32BE(minY, p); p += 4;
buffer.writeInt32BE(maxY, p); p += 4;
buffer.writeInt32BE(minZ, p); p += 4;
buffer.writeInt32BE(maxZ, p); p += 4;
buffer.writeInt32BE(spawnY, p); p += 4;
buffer.writeInt32BE(allB.length, p); p += 4;

for (let i = 0; i < allB.length; i++) {
  buffer.writeInt32LE(allX[i], p); p += 4;
  buffer.writeInt32LE(allY[i], p); p += 4;
  buffer.writeInt32LE(allZ[i], p); p += 4;
  buffer.writeInt32LE(allB[i], p); p += 4;
}

const compressed = zlib.gzipSync(buffer);
fs.writeFileSync(outputPath, compressed);
console.log(`Written to ${outputPath}`);
console.log(`Bounds: X[${minX}..${maxX}] Y[${minY}..${maxY}] Z[${minZ}..${maxZ}]`);
console.log(`Spawn Y: ${spawnY}`);
console.log(`File size: ${(compressed.length / 1024 / 1024).toFixed(2)} MB`);
console.log('Done!');
