// Achievement system — tracks and unlocks Minecraft-style achievements.
// Each achievement has an id, name, description, icon (block/item id), and
// a check function that receives a stats snapshot and returns true if earned.

import { BLOCK } from './blocks.js';
import { ITEM } from './items.js';

export const ACHIEVEMENTS = [
  // ── Tool & Tech Progression ──
  {
    id: 'getting_wood',
    name: 'Getting Wood',
    desc: 'Punch a tree until a block of wood pops out',
    icon: BLOCK.WOOD,
    category: 'story',
    check: s => s.blocksBroken[`${BLOCK.WOOD}`] >= 1,
  },
  {
    id: 'benchmarking',
    name: 'Benchmarking',
    desc: 'Craft a Workbench',
    icon: BLOCK.CRAFTING,
    category: 'story',
    check: s => s.crafted[`${BLOCK.CRAFTING}`] >= 1,
  },
  {
    id: 'time_to_mine',
    name: 'Time to Mine!',
    desc: 'Craft your first wooden pickaxe',
    icon: ITEM.WOOD_PICKAXE,
    category: 'story',
    check: s => s.crafted[`${ITEM.WOOD_PICKAXE}`] >= 1,
  },
  {
    id: 'stone_age',
    name: 'Stone Age',
    desc: 'Mine stone with a wooden pickaxe',
    icon: BLOCK.COBBLESTONE,
    category: 'story',
    check: s => s.blocksBroken[`${BLOCK.COBBLESTONE}`] >= 1 || s.blocksBroken[`${BLOCK.STONE}`] >= 1,
  },
  {
    id: 'getting_upgrade',
    name: 'Getting an Upgrade',
    desc: 'Craft a stone pickaxe',
    icon: ITEM.STONE_PICKAXE,
    category: 'story',
    check: s => s.crafted[`${ITEM.STONE_PICKAXE}`] >= 1,
  },
  {
    id: 'acquire_hardware',
    name: 'Acquire Hardware',
    desc: 'Smelt iron ore into an iron ingot',
    icon: ITEM.IRON_INGOT,
    category: 'story',
    check: s => s.smelted[`${BLOCK.IRON_ORE}`] >= 1,
  },
  {
    id: 'suit_up',
    name: 'Suit Up',
    desc: 'Craft any piece of iron armor',
    icon: ITEM.IRON_INGOT,
    category: 'story',
    check: s => s.craftedAnyIronArmor >= 1,
  },
  {
    id: 'isnt_it_iron_pick',
    name: "Isn't It Iron Pick",
    desc: 'Craft an iron pickaxe',
    icon: ITEM.IRON_PICKAXE,
    category: 'story',
    check: s => s.crafted[`${ITEM.IRON_PICKAXE}`] >= 1,
  },
  // ── Diamond Milestones ──
  {
    id: 'diamonds',
    name: 'Diamonds!',
    desc: 'Harvest your first diamond ore',
    icon: BLOCK.DIAMOND_ORE,
    category: 'story',
    check: s => s.blocksBroken[`${BLOCK.DIAMOND_ORE}`] >= 1,
  },
  {
    id: 'cover_me_in_diamonds',
    name: 'Cover Me in Diamonds',
    desc: 'Craft a full set of diamond armor',
    icon: ITEM.DIAMOND,
    category: 'story',
    check: s => s.craftedAllDiamondArmor >= 4,
  },
  {
    id: 'ice_bucket',
    name: 'Ice Bucket Challenge',
    desc: 'Obtain a block of obsidian',
    icon: BLOCK.OBSIDIAN,
    category: 'story',
    check: s => s.inventoryHas[`${BLOCK.OBSIDIAN}`] >= 1 || s.blocksPlaced[`${BLOCK.OBSIDIAN}`] >= 1,
  },
  // ── Farming & Food ──
  {
    id: 'time_to_farm',
    name: 'Time to Farm',
    desc: 'Craft a hoe to till soil',
    icon: BLOCK.GRASS,
    category: 'husbandry',
    check: s => s.craftedHoe >= 1,
  },
  {
    id: 'bake_bread',
    name: 'Bake Bread',
    desc: 'Turn wheat into bread',
    icon: ITEM.BREAD,
    category: 'husbandry',
    check: s => s.crafted[`${ITEM.BREAD}`] >= 1,
  },
  {
    id: 'cow_tipper',
    name: 'Cow Tipper',
    desc: 'Kill a cow',
    icon: ITEM.LEATHER,
    category: 'husbandry',
    check: s => s.mobKillsCow >= 1,
  },
  {
    id: 'eat_food',
    name: 'Back to the Table',
    desc: 'Eat something to restore hunger',
    icon: ITEM.APPLE,
    category: 'husbandry',
    check: s => s.foodEaten >= 1,
  },
  // ── Combat ──
  {
    id: 'time_to_strike',
    name: 'Time to Strike!',
    desc: 'Kill a mob using a sword',
    icon: ITEM.WOOD_SWORD,
    category: 'challenge',
    check: s => s.mobKillsSword >= 1,
  },
  {
    id: 'monster_hunter',
    name: 'Monster Hunter',
    desc: 'Defeat a Zombie',
    icon: ITEM.ROTTEN_FLESH,
    category: 'challenge',
    check: s => s.mobKillsZombie >= 1,
  },
  {
    id: 'bone_collector',
    name: 'Bone Collector',
    desc: 'Defeat a Skeleton',
    icon: ITEM.BONE,
    category: 'challenge',
    check: s => s.mobKillsSkeleton >= 1,
  },
  // ── Building ──
  {
    id: 'light_up',
    name: 'Light Up the Night',
    desc: 'Place your first torch',
    icon: BLOCK.TORCH,
    category: 'tutorial',
    check: s => s.torchesPlaced >= 1,
  },
  {
    id: 'refined',
    name: 'Refined',
    desc: 'Craft a storage block (iron/gold/diamond)',
    icon: BLOCK.IRON_BLOCK,
    category: 'challenge',
    check: s => s.storageBlocksCrafted >= 1,
  },
  {
    id: 'diamond_hoarder',
    name: 'Diamond Hoarder',
    desc: 'Craft a Block of Diamond',
    icon: BLOCK.DIAMOND_BLOCK,
    category: 'challenge',
    check: s => (s.crafted[BLOCK.DIAMOND_BLOCK] || 0) >= 1,
  },
  // ── Exploration ──
  {
    id: 'multiplayer_joiner',
    name: 'Social Butterfly',
    desc: 'Join a multiplayer server',
    icon: BLOCK.PLANKS,
    category: 'tutorial',
    check: s => s.multiplayerJoined >= 1,
  },
  {
    id: 'open_inventory',
    name: 'Taking Inventory',
    desc: 'Open your inventory',
    icon: BLOCK.PLANKS,
    category: 'tutorial',
    check: s => s.inventoryOpened >= 1,
  },
  {
    id: 'craft_item',
    name: 'Crafty',
    desc: 'Craft any item on a crafting table',
    icon: BLOCK.PLANKS,
    category: 'tutorial',
    check: s => s.craftedAny >= 1,
  },
  {
    id: 'place_block',
    name: 'Builder',
    desc: 'Place your first block',
    icon: BLOCK.GRASS,
    category: 'tutorial',
    check: s => s.blocksPlacedAny >= 1,
  },
  {
    id: 'deep_digger',
    name: 'Deep Digger',
    desc: 'Mine 100 blocks',
    icon: BLOCK.STONE,
    category: 'challenge',
    check: s => s.totalBlocksBroken >= 100,
  },
  {
    id: 'miner',
    name: 'Miner',
    desc: 'Mine 500 blocks',
    icon: BLOCK.IRON_ORE,
    category: 'challenge',
    check: s => s.totalBlocksBroken >= 500,
  },
  {
    id: 'hot_stuff',
    name: 'Hot Stuff',
    desc: 'Fill a bucket with lava',
    icon: ITEM.BUCKET,
    category: 'story',
    check: s => s.bucketLava >= 1,
  },
  {
    id: 'smelt_iron',
    name: 'Iron Man',
    desc: 'Smelt 10 iron ore',
    icon: ITEM.IRON_INGOT,
    category: 'challenge',
    check: s => s.smelted[`${BLOCK.IRON_ORE}`] >= 10,
  },
  {
    id: 'hostile_slayer',
    name: 'Hostile Slayer',
    desc: 'Kill any hostile mob',
    icon: ITEM.BONE,
    category: 'challenge',
    check: s => s.mobKillsAny >= 1,
  },
  {
    id: 'frequent_crafter',
    name: 'Frequent Crafter',
    desc: 'Craft 50 items total',
    icon: BLOCK.CRAFTING,
    category: 'challenge',
    check: s => s.craftedAny >= 50,
  },
  // ── New achievements ──
  {
    id: 'craft_wood_pickaxe',
    name: 'Getting an Upgrade',
    desc: 'Craft a wooden pickaxe',
    icon: ITEM.WOOD_PICKAXE,
    category: 'story',
    check: s => s.crafted[`${ITEM.WOOD_PICKAXE}`] >= 1,
  },
  {
    id: 'hot_topic',
    name: 'Hot Topic',
    desc: 'Craft a furnace',
    icon: BLOCK.FURNACE,
    category: 'story',
    check: s => s.crafted[`${BLOCK.FURNACE}`] >= 1,
  },
  {
    id: 'on_a_rail',
    name: 'On a Rail',
    desc: 'Travel 100 blocks',
    icon: BLOCK.IRON_ORE,
    category: 'challenge',
    check: s => s.distanceTraveled >= 100,
  },
  {
    id: 'pork_chop',
    name: 'Pork Chop',
    desc: 'Eat a cooked porkchop',
    icon: ITEM.PORKCHOP_COOKED,
    category: 'husbandry',
    check: s => s.foodEatenPorkchop >= 1,
  },
  {
    id: 'sniper_duel',
    name: 'Sniper Duel',
    desc: 'Kill a mob from 50+ blocks away',
    icon: ITEM.ARROW,
    category: 'challenge',
    check: s => s.mobKillsLongRange >= 1,
  },
  {
    id: 'explorer',
    name: 'Explorer',
    desc: 'Travel 1,000 blocks from spawn',
    icon: BLOCK.GRASS,
    category: 'challenge',
    check: s => s.distanceTraveled >= 1000,
  },
  {
    id: 'globetrotter',
    name: 'Globetrotter',
    desc: 'Travel 10,000 blocks from spawn',
    icon: BLOCK.STONE,
    category: 'challenge',
    check: s => s.distanceTraveled >= 10000,
  },
  {
    id: 'skin_customizer',
    name: 'Artiste',
    desc: 'Create a custom skin',
    icon: BLOCK.CRAFTING,
    category: 'tutorial',
    check: s => s.customSkinCreated >= 1,
  },
  {
    id: 'determined',
    name: 'Determined',
    desc: 'Respawn after death',
    icon: BLOCK.PLANKS,
    category: 'challenge',
    check: s => s.deaths >= 1,
  },
];

// Categories for display ordering
export const CATEGORIES = {
  tutorial:  { name: 'Tutorial',       icon: '📘' },
  story:     { name: 'Story',          icon: '📖' },
  husbandry: { name: 'Husbandry',      icon: '🌾' },
  challenge: { name: 'Challenge',      icon: '⚔️' },
};

// ── Stats tracker ───────────────────────────────────────────────────────
// Stats accumulate during gameplay. Achievement check functions receive this.

export function createStats() {
  return {
    blocksBroken: {},       // blockId -> count
    blocksPlaced: {},       // blockId -> count
    blocksPlacedAny: 0,
    crafted: {},            // itemId -> count
    craftedAny: 0,
    smelted: {},            // blockId -> count
    pickedUp: {},           // itemId -> count
    totalBlocksBroken: 0,
    inventoryOpened: 0,
    foodEaten: 0,
    mobKillsSword: 0,
    mobKillsAny: 0,
    craftedHoe: 0,
    craftedAnyIronArmor: 0,
    craftedAllDiamondArmor: 0,
    inventoryHas: {},       // itemId -> count seen in inventory
    bucketLava: 0,
    distanceTraveled: 0,
    mobKillsCow: 0,
    foodEatenPorkchop: 0,
    mobKillsLongRange: 0,
    multiplayerJoined: 0,
    customSkinCreated: 0,
    playTime: 0,
    itemsCrafted: 0,
    deaths: 0,
    level: 0,
    mobKillsZombie: 0,
    mobKillsSkeleton: 0,
    torchesPlaced: 0,
    storageBlocksCrafted: 0,
  };
}

// ── Achievement Manager ─────────────────────────────────────────────────

export class AchievementManager {
  constructor() {
    this.unlocked = new Set();
    this.stats = createStats();
    this._listeners = [];       // callback(unlockedAchievement)
    this._load();
  }

  // Register a callback for when an achievement unlocks
  onUnlock(fn) { this._listeners.push(fn); }

  // Called from game events to update stats
  // then checks all locked achievements
  updatestat(key, value) {
    if (typeof value === 'number') {
      this.stats[key] = (this.stats[key] || 0) + value;
    } else if (typeof value === 'object') {
      for (const [k, v] of Object.entries(value)) {
        this.stats[key] = this.stats[key] || {};
        this.stats[key][k] = (this.stats[key][k] || 0) + v;
      }
    }
    this._check();
  }

  setStat(key, value) {
    this.stats[key] = value;
    this._check();
  }

  incrementStat(key) {
    this.stats[key] = (this.stats[key] || 0) + 1;
    this._check();
  }

  incrementMapStat(key, mapKey, count = 1) {
    if (!this.stats[key]) this.stats[key] = {};
    this.stats[key][mapKey] = (this.stats[key][mapKey] || 0) + count;
    this._check();
  }

  // Check all locked achievements
  _check() {
    for (const a of ACHIEVEMENTS) {
      if (this.unlocked.has(a.id)) continue;
      try {
        if (a.check(this.stats)) {
          this.unlocked.add(a.id);
          this._save();
          for (const fn of this._listeners) fn(a);
        }
      } catch (_) {}
    }
  }

  isUnlocked(id) { return this.unlocked.has(id); }

  getProgress() {
    return {
      total: ACHIEVEMENTS.length,
      unlocked: this.unlocked.size,
    };
  }

  // ── persistence ───────────────────────────────────────────────────────

  _save() {
    try {
      const json = JSON.stringify({
        unlocked: Array.from(this.unlocked),
        stats: this.stats,
      });
      localStorage.setItem('mc-clone-achievements', json);
      // Cloud sync via CrazyGames SDK
      if (window.CrazyGames && window.CrazyGames.SDK && window.CrazyGames.SDK.data) {
        window.CrazyGames.SDK.data.setItem('mc-clone-achievements', json).catch(() => {});
      }
    } catch (_) {}
  }

  _load() {
    try {
      const raw = localStorage.getItem('mc-clone-achievements');
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.unlocked) this.unlocked = new Set(data.unlocked);
      if (data.stats) Object.assign(this.stats, data.stats);
    } catch (_) {}
  }

  addPlayTime(dt) {
    this.stats.playTime += dt;
  }

  addItemsCrafted(count = 1) {
    this.stats.itemsCrafted += count;
    this._check();
  }

  reset() {
    this.unlocked = new Set();
    this.stats = createStats();
    this._save();
  }
}
