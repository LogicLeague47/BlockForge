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
  'minecraft:glow_lichen': 6, 'minecraft:warped_wart_block': 95, 'minecraft:nether_wart_block': 94,
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
  'minecraft:deepslate': 88, 'minecraft:cobbled_deepslate': 88,
  'minecraft:polished_deepslate': 88, 'minecraft:deepslate_bricks': 88,
  'minecraft:deepslate_tiles': 88,
  'minecraft:smooth_basalt': 88, 'minecraft:basalt': 88,
  'minecraft:calcite': 88, 'minecraft:tuff': 88, 'minecraft:dripstone_block': 88,
  'minecraft:stone_bricks': 87, 'minecraft:chiseled_stone_bricks': 87,
  'minecraft:cracked_stone_bricks': 87, 'minecraft:mossy_stone_bricks': 43,
  'minecraft:smooth_stone': 3,
  'minecraft:prismarine': 91, 'minecraft:dark_prismarine': 91, 'minecraft:prismarine_bricks': 91,
  'minecraft:purpur_block': 92, 'minecraft:purpur_pillar': 92,
  'minecraft:packed_ice': 15, 'minecraft:blue_ice': 15, 'minecraft:ice': 15,
  'minecraft:slime_block': 90, 'minecraft:honey_block': 90,
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
  'minecraft:blackstone': 3, 'minecraft:polished_blackstone': 93,
  'minecraft:polished_blackstone_bricks': 93, 'minecraft:chiseled_polished_blackstone': 93,
  'minecraft:soul_sand': 3, 'minecraft:soul_soil': 3,
  'minecraft:ancient_debris': 3, 'minecraft:reinforced_deepslate': 3,
  'minecraft:respawn_anchor': 25,
  'minecraft:sculk': 3, 'minecraft:sculk_sensor': 30,
  'minecraft:white_concrete': 89, 'minecraft:orange_concrete': 89,
  'minecraft:magenta_concrete': 89, 'minecraft:light_blue_concrete': 89,
  'minecraft:yellow_concrete': 89, 'minecraft:lime_concrete': 89,
  'minecraft:pink_concrete': 89, 'minecraft:gray_concrete': 89,
  'minecraft:light_gray_concrete': 89, 'minecraft:cyan_concrete': 89,
  'minecraft:purple_concrete': 89, 'minecraft:blue_concrete': 89,
  'minecraft:brown_concrete': 89, 'minecraft:green_concrete': 89,
  'minecraft:red_concrete': 89, 'minecraft:black_concrete': 89,
  'minecraft:white_wool': 69, 'minecraft:orange_wool': 69, 'minecraft:magenta_wool': 69,
  'minecraft:light_blue_wool': 69, 'minecraft:yellow_wool': 69, 'minecraft:lime_wool': 69,
  'minecraft:pink_wool': 69, 'minecraft:gray_wool': 69, 'minecraft:light_gray_wool': 69,
  'minecraft:cyan_wool': 69, 'minecraft:purple_wool': 69, 'minecraft:blue_wool': 69,
  'minecraft:brown_wool': 69, 'minecraft:green_wool': 69, 'minecraft:red_wool': 69,
  'minecraft:black_wool': 69,
  'minecraft:chain': 50,
  'minecraft:lapis_ore': 12, 'minecraft:redstone_ore': 12,
  'minecraft:nether_gold_ore': 13, 'minecraft:nether_quartz_ore': 13,
  'minecraft:emerald_block': 52, 'minecraft:lapis_block': 30,
  'minecraft:amethyst_block': 30,
  'minecraft:flower_pot': 27,
  'minecraft:crimson_nylium': 1, 'minecraft:warped_nylium': 1,
  // Fences → OAK_FENCE
  'minecraft:oak_fence': 57, 'minecraft:birch_fence': 57, 'minecraft:spruce_fence': 57,
  'minecraft:jungle_fence': 57, 'minecraft:acacia_fence': 57, 'minecraft:dark_oak_fence': 57,
  'minecraft:warped_fence': 57, 'minecraft:crimson_fence': 57, 'minecraft:mangrove_fence': 57,
  'minecraft:nether_brick_fence': 57,
  // Stairs → map to solid block
  'minecraft:cobblestone_stairs': 4, 'minecraft:stone_stairs': 3,
  'minecraft:oak_stairs': 10, 'minecraft:birch_stairs': 10, 'minecraft:spruce_stairs': 10,
  'minecraft:jungle_stairs': 10, 'minecraft:acacia_stairs': 10, 'minecraft:dark_oak_stairs': 10,
  'minecraft:mangrove_stairs': 10, 'minecraft:cherry_stairs': 10,
  'minecraft:nether_brick_stairs': 45, 'minecraft:red_nether_brick_stairs': 45,
  'minecraft:brick_stairs': 17, 'minecraft:quartz_stairs': 54,
  'minecraft:purpur_stairs': 92, 'minecraft:end_stone_brick_stairs': 53,
  'minecraft:sandstone_stairs': 42, 'minecraft:red_sandstone_stairs': 42,
  'minecraft:deepslate_tile_stairs': 88, 'minecraft:deepslate_brick_stairs': 88,
  'minecraft:cobbled_deepslate_stairs': 88, 'minecraft:polished_deepslate_stairs': 88,
  'minecraft:prismarine_stairs': 91, 'minecraft:dark_prismarine_stairs': 91,
  'minecraft:mossy_cobblestone_stairs': 43, 'minecraft:smooth_stone_stairs': 3,
  'minecraft:smooth_quartz_stairs': 54, 'minecraft:polished_andesite_stairs': 3,
  'minecraft:mangrove_stairs': 10,
  // Slabs → map to solid block
  'minecraft:stone_slab': 3, 'minecraft:cobblestone_slab': 4,
  'minecraft:oak_slab': 10, 'minecraft:birch_slab': 10, 'minecraft:spruce_slab': 10,
  'minecraft:jungle_slab': 10, 'minecraft:acacia_slab': 10, 'minecraft:dark_oak_slab': 10,
  'minecraft:nether_brick_slab': 45, 'minecraft:red_nether_brick_slab': 45,
  'minecraft:brick_slab': 17, 'minecraft:quartz_slab': 54,
  'minecraft:purpur_slab': 92, 'minecraft:end_stone_brick_slab': 53,
  'minecraft:sandstone_slab': 42, 'minecraft:cut_sandstone_slab': 42,
  'minecraft:red_sandstone_slab': 42, 'minecraft:cut_red_sandstone_slab': 42,
  'minecraft:deepslate_tile_slab': 88, 'minecraft:deepslate_brick_slab': 88,
  'minecraft:prismarine_slab': 91, 'minecraft:prismarine_brick_slab': 91,
  'minecraft:mossy_cobblestone_slab': 43, 'minecraft:smooth_stone_slab': 3,
  'minecraft:smooth_quartz_slab': 54, 'minecraft:stone_brick_slab': 87,
  'minecraft:dark_prismarine_slab': 91, 'minecraft:polished_deepslate_slab': 88,
  'minecraft:cut_sandstone': 42, 'minecraft:cut_red_sandstone': 42,
  // Light sources → FURNACE (32)
  'minecraft:shroomlight': 32, 'minecraft:sea_lantern': 32, 'minecraft:glowstone': 32,
  'minecraft:redstone_lamp': 32, 'minecraft:lantern': 32, 'minecraft:soul_lantern': 32,
  'minecraft:pearlescent_froglight': 32, 'minecraft:ochre_froglight': 32,
  'minecraft:verdant_froglight': 32, 'minecraft:campfire': 32, 'minecraft:soul_campfire': 32,
  // Vines/plants → LEAVES
  'minecraft:vine': 6, 'minecraft:weeping_vines': 6, 'minecraft:weeping_vines_plant': 6,
  'minecraft:twisting_vines': 6, 'minecraft:twisting_vines_plant': 6,
  'minecraft:cave_vines': 6, 'minecraft:cave_vines_plant': 6,
  // Plants/vegetation → FLOWER_RED
  'minecraft:short_grass': 22, 'minecraft:tall_grass': 22, 'minecraft:fern': 22,
  'minecraft:large_fern': 22, 'minecraft:dead_bush': 22, 'minecraft:sugar_cane': 22,
  'minecraft:bamboo': 22, 'minecraft:lily_pad': 22, 'minecraft:seagrass': 22,
  'minecraft:tall_seagrass': 22, 'minecraft:kelp': 22, 'minecraft:kelp_plant': 22,
  'minecraft:spore_blossom': 22, 'minecraft:sweet_berry_bush': 22,
  'minecraft:fire': 22, 'minecraft:soul_fire': 22,
  // Mushrooms → FLOWER_YELLOW
  'minecraft:red_mushroom': 23, 'minecraft:brown_mushroom': 23,
  // Corals → TERRACOTTA
  'minecraft:tube_coral_block': 30, 'minecraft:bubble_coral_block': 30,
  'minecraft:brain_coral_block': 30, 'minecraft:fire_coral_block': 30,
  'minecraft:horn_coral_block': 30, 'minecraft:dead_tube_coral_block': 30,
  'minecraft:dead_bubble_coral_block': 30, 'minecraft:dead_brain_coral_block': 30,
  'minecraft:dead_fire_coral_block': 30, 'minecraft:dead_horn_coral_block': 30,
  'minecraft:tube_coral': 30, 'minecraft:bubble_coral': 30,
  'minecraft:brain_coral': 30, 'minecraft:fire_coral': 30, 'minecraft:horn_coral': 30,
  'minecraft:dead_tube_coral': 30, 'minecraft:dead_bubble_coral': 30,
  'minecraft:dead_brain_coral': 30, 'minecraft:dead_fire_coral': 30,
  'minecraft:dead_horn_coral': 30,
  // Coral fans → FLOWER_RED
  'minecraft:tube_coral_fan': 22, 'minecraft:bubble_coral_fan': 22,
  'minecraft:brain_coral_fan': 22, 'minecraft:fire_coral_fan': 22,
  'minecraft:horn_coral_fan': 22,
  'minecraft:tube_coral_wall_fan': 22, 'minecraft:bubble_coral_wall_fan': 22,
  'minecraft:brain_coral_wall_fan': 22, 'minecraft:fire_coral_wall_fan': 22,
  'minecraft:horn_coral_wall_fan': 22,
  'minecraft:dead_tube_coral_wall_fan': 22, 'minecraft:dead_bubble_coral_wall_fan': 22,
  'minecraft:dead_brain_coral_wall_fan': 22, 'minecraft:dead_fire_coral_wall_fan': 22,
  'minecraft:dead_horn_coral_wall_fan': 22,
  // Sculk → STONE
  'minecraft:sculk_vein': 3, 'minecraft:sculk_catalyst': 3,
  'minecraft:sculk_shrieker': 3, 'minecraft:sculk_sensor': 3,
  // Terracotta variants → TERRACOTTA (30)
  'minecraft:white_terracotta': 30, 'minecraft:orange_terracotta': 30,
  'minecraft:magenta_terracotta': 30, 'minecraft:light_blue_terracotta': 30,
  'minecraft:yellow_terracotta': 30, 'minecraft:lime_terracotta': 30,
  'minecraft:pink_terracotta': 30, 'minecraft:gray_terracotta': 30,
  'minecraft:light_gray_terracotta': 30, 'minecraft:cyan_terracotta': 30,
  'minecraft:purple_terracotta': 30, 'minecraft:blue_terracotta': 30,
  'minecraft:brown_terracotta': 30, 'minecraft:green_terracotta': 30,
  'minecraft:red_terracotta': 30, 'minecraft:black_terracotta': 30,
  'minecraft:terracotta': 30,
  // Concrete powder → CONCRETE
  'minecraft:white_concrete_powder': 89, 'minecraft:orange_concrete_powder': 89,
  'minecraft:magenta_concrete_powder': 89, 'minecraft:light_blue_concrete_powder': 89,
  'minecraft:yellow_concrete_powder': 89, 'minecraft:lime_concrete_powder': 89,
  'minecraft:pink_concrete_powder': 89, 'minecraft:gray_concrete_powder': 89,
  'minecraft:light_gray_concrete_powder': 89, 'minecraft:cyan_concrete_powder': 89,
  'minecraft:purple_concrete_powder': 89, 'minecraft:blue_concrete_powder': 89,
  'minecraft:brown_concrete_powder': 89, 'minecraft:green_concrete_powder': 89,
  'minecraft:red_concrete_powder': 89, 'minecraft:black_concrete_powder': 89,
  // Glazed terracotta → TERRACOTTA
  'minecraft:red_glazed_terracotta': 30, 'minecraft:pink_glazed_terracotta': 30,
  'minecraft:yellow_glazed_terracotta': 30,
  // Logs/wood → WOOD (5)
  'minecraft:oak_log': 5, 'minecraft:spruce_log': 5, 'minecraft:birch_log': 5,
  'minecraft:jungle_log': 5, 'minecraft:acacia_log': 5, 'minecraft:dark_oak_log': 5,
  'minecraft:cherry_log': 5,
  'minecraft:oak_wood': 5, 'minecraft:spruce_wood': 5, 'minecraft:birch_wood': 5,
  'minecraft:jungle_wood': 5, 'minecraft:acacia_wood': 5, 'minecraft:dark_oak_wood': 5,
  'minecraft:cherry_wood': 5, 'minecraft:mangrove_wood': 5,
  'minecraft:stripped_oak_log': 5, 'minecraft:stripped_spruce_log': 5,
  'minecraft:stripped_birch_log': 5, 'minecraft:stripped_jungle_log': 5,
  'minecraft:stripped_acacia_log': 5, 'minecraft:stripped_dark_oak_log': 5,
  'minecraft:stripped_cherry_log': 5, 'minecraft:stripped_mangrove_log': 5,
  'minecraft:stripped_oak_wood': 5, 'minecraft:stripped_spruce_wood': 5,
  'minecraft:stripped_birch_wood': 5, 'minecraft:stripped_jungle_wood': 5,
  'minecraft:stripped_acacia_wood': 5, 'minecraft:stripped_dark_oak_wood': 5,
  'minecraft:stripped_cherry_wood': 5, 'minecraft:stripped_mangrove_wood': 5,
  'minecraft:warped_hyphae': 5, 'minecraft:crimson_hyphae': 5,
  'minecraft:stripped_warped_hyphae': 5, 'minecraft:stripped_crimson_hyphae': 5,
  'minecraft:stripped_crimson_stem': 5, 'minecraft:stripped_warped_stem': 5,
  'minecraft:warped_stem': 5, 'minecraft:crimson_stem': 5,
  'minecraft:stripped_bamboo_block': 5, 'minecraft:bamboo_block': 5,
  // Leaves → LEAVES (6)
  'minecraft:oak_leaves': 6, 'minecraft:spruce_leaves': 6, 'minecraft:birch_leaves': 6,
  'minecraft:jungle_leaves': 6, 'minecraft:acacia_leaves': 6, 'minecraft:dark_oak_leaves': 6,
  'minecraft:cherry_leaves': 6, 'minecraft:azalea_leaves': 6, 'minecraft:flowering_azalea_leaves': 6,
  // Planks → PLANKS (10)
  'minecraft:oak_planks': 10, 'minecraft:spruce_planks': 10, 'minecraft:birch_planks': 10,
  'minecraft:jungle_planks': 10, 'minecraft:acacia_planks': 10, 'minecraft:dark_oak_planks': 10,
  'minecraft:cherry_planks': 10, 'minecraft:mangrove_planks': 10, 'minecraft:bamboo_planks': 10,
  'minecraft:crimson_planks': 10, 'minecraft:warped_planks': 10,
  // Misc
  'minecraft:farmland': 2, 'minecraft:dirt_path': 1,
  'minecraft:moss_block': 6, 'minecraft:moss_carpet': 22,
  'minecraft:mushroom_stem': 3, 'minecraft:bone_block': 30,
  'minecraft:hay_block': 47, 'minecraft:dried_kelp_block': 30,
  'minecraft:jack_o_lantern': 20, 'minecraft:carved_pumpkin': 20,
  'minecraft:note_block': 30, 'minecraft:jukebox': 3,
  'minecraft:crafting_table': 27, 'minecraft:furnace': 32,
  'minecraft:blast_furnace': 32, 'minecraft:smoker': 32,
  'minecraft:observer': 3, 'minecraft:dispenser': 3, 'minecraft:dropper': 3,
  'minecraft:sticky_piston': 78, 'minecraft:piston_head': 78,
  'minecraft:chest': 40, 'minecraft:barrel': 10,
  'minecraft:lectern': 10, 'minecraft:loom': 10,
  'minecraft:cartography_table': 10, 'minecraft:fletching_table': 10,
  'minecraft:smithing_table': 10, 'minecraft:composter': 10,
  'minecraft:stonecutter': 3, 'minecraft:grindstone': 3,
  'minecraft:cauldron': 3, 'minecraft:brewing_stand': 3,
  'minecraft:enchanting_table': 25, 'minecraft:respawn_anchor': 25,
  'minecraft:redstone_block': 12, 'minecraft:redstone_wire': 75,
  'minecraft:redstone_torch': 76, 'minecraft:redstone_wall_torch': 76,
  'minecraft:repeater': 75, 'minecraft:lever': 60,
  'minecraft:stone_pressure_plate': 62, 'minecraft:heavy_weighted_pressure_plate': 62,
  'minecraft:light_weighted_pressure_plate': 62,
  'minecraft:tripwire_hook': 0, 'minecraft:tripwire': 0,
  'minecraft:tnt': 26, 'minecraft:redstone_lamp': 32,
  'minecraft:daylight_detector': 10,
  'minecraft:oak_wall_sign': 61, 'minecraft:oak_sign': 61,
  'minecraft:spruce_wall_sign': 61, 'minecraft:spruce_sign': 61,
  'minecraft:warped_wall_sign': 61, 'minecraft:crimson_wall_sign': 61,
  'minecraft:oak_wall_hanging_sign': 61, 'minecraft:oak_hanging_sign': 61,
  'minecraft:spruce_wall_hanging_sign': 61, 'minecraft:spruce_hanging_sign': 61,
  'minecraft:dark_oak_wall_hanging_sign': 61, 'minecraft:dark_oak_hanging_sign': 61,
  'minecraft:chain': 50, 'minecraft:iron_bars': 81,
  'minecraft:glass_pane': 46,
  'minecraft:white_stained_glass_pane': 46, 'minecraft:red_stained_glass_pane': 46,
  'minecraft:blue_stained_glass_pane': 46, 'minecraft:yellow_stained_glass_pane': 46,
  'minecraft:green_stained_glass_pane': 46, 'minecraft:orange_stained_glass_pane': 46,
  'minecraft:magenta_stained_glass_pane': 46, 'minecraft:light_blue_stained_glass_pane': 46,
  // Stained glass → GLASS
  'minecraft:white_stained_glass': 16, 'minecraft:red_stained_glass': 16,
  'minecraft:blue_stained_glass': 16, 'minecraft:yellow_stained_glass': 16,
  'minecraft:green_stained_glass': 16, 'minecraft:orange_stained_glass': 16,
  'minecraft:purple_stained_glass': 16, 'minecraft:gray_stained_glass': 16,
  // Carpet → FLOWER_RED (thin layer)
  'minecraft:white_carpet': 22, 'minecraft:orange_carpet': 22,
  'minecraft:magenta_carpet': 22, 'minecraft:light_blue_carpet': 22,
  'minecraft:yellow_carpet': 22, 'minecraft:lime_carpet': 22,
  'minecraft:pink_carpet': 22, 'minecraft:gray_carpet': 22,
  'minecraft:light_gray_carpet': 22, 'minecraft:cyan_carpet': 22,
  'minecraft:purple_carpet': 22, 'minecraft:blue_carpet': 22,
  'minecraft:brown_carpet': 22, 'minecraft:green_carpet': 22,
  'minecraft:red_carpet': 22, 'minecraft:black_carpet': 22,
  // Beds
  'minecraft:red_bed': 38, 'minecraft:white_bed': 38, 'minecraft:yellow_bed': 38,
  'minecraft:magenta_bed': 38, 'minecraft:light_blue_bed': 38,
  // Candles
  'minecraft:white_candle': 22, 'minecraft:red_candle': 22,
  // Doors/trapdoors → PLANKS
  'minecraft:oak_door': 10, 'minecraft:spruce_door': 10, 'minecraft:birch_door': 10,
  'minecraft:jungle_door': 10, 'minecraft:acacia_door': 10, 'minecraft:dark_oak_door': 10,
  'minecraft:warped_door': 10, 'minecraft:crimson_door': 10,
  'minecraft:mangrove_door': 10, 'minecraft:cherry_door': 10,
  'minecraft:oak_trapdoor': 10, 'minecraft:spruce_trapdoor': 10,
  'minecraft:birch_trapdoor': 10, 'minecraft:jungle_trapdoor': 10,
  'minecraft:acacia_trapdoor': 10, 'minecraft:dark_oak_trapdoor': 10,
  'minecraft:warped_trapdoor': 10, 'minecraft:crimson_trapdoor': 10,
  'minecraft:mangrove_trapdoor': 10, 'minecraft:cherry_trapdoor': 10,
  'minecraft:iron_door': 81, 'minecraft:iron_trapdoor': 81,
  // Saplings → FLOWER_RED
  'minecraft:oak_sapling': 22, 'minecraft:spruce_sapling': 22,
  'minecraft:birch_sapling': 22, 'minecraft:jungle_sapling': 22,
  'minecraft:acacia_sapling': 22, 'minecraft:dark_oak_sapling': 22,
  'minecraft:cherry_sapling': 22,
  // Crops/vegetables → FLOWER_RED
  'minecraft:wheat': 22, 'minecraft:carrots': 22, 'minecraft:potatoes': 22,
  'minecraft:beetroots': 22, 'minecraft:pumpkin_stem': 22,
  'minecraft:attached_pumpkin_stem': 22, 'minecraft:melon_stem': 22,
  'minecraft:attached_melon_stem': 22,
  // Misc items
  'minecraft:torch': 41, 'minecraft:wall_torch': 41,
  'minecraft:soul_torch': 41, 'minecraft:soul_wall_torch': 41,
  'minecraft:flower_pot': 27, 'minecraft:potted_red_tulip': 27,
  'minecraft:potted_poppy': 27, 'minecraft:potted_cornflower': 27,
  'minecraft:potted_blue_orchid': 27, 'minecraft:potted_allium': 27,
  'minecraft:potted_oxeye_daisy': 27, 'minecraft:potted_dandelion': 27,
  'minecraft:potted_lily_of_the_valley': 27, 'minecraft:potted_fern': 27,
  'minecraft:potted_dead_bush': 27, 'minecraft:potted_cactus': 27,
  'minecraft:potted_bamboo': 27, 'minecraft:potted_flowering_azalea_bush': 27,
  'minecraft:potted_spruce_sapling': 27, 'minecraft:potted_birch_sapling': 27,
  'minecraft:potted_jungle_sapling': 27, 'minecraft:potted_acacia_sapling': 27,
  'minecraft:potted_dark_oak_sapling': 27, 'minecraft:potted_cherry_sapling': 27,
  // Rails → COBBLESTONE
  'minecraft:rail': 4, 'minecraft:powered_rail': 4,
  'minecraft:detector_rail': 4, 'minecraft:activator_rail': 4,
  // Banners → WOOL
  'minecraft:white_banner': 69, 'minecraft:red_banner': 69,
  'minecraft:green_wall_banner': 69, 'minecraft:lime_wall_banner': 69,
  // Misc solids
  'minecraft:nether_wart_block': 94, 'minecraft:warped_wart_block': 95,
  'minecraft:shroomlight': 32, 'minecraft:magma_block': 28,
  'minecraft:target': 3, 'minecraft:lodestone': 50,
  'minecraft:sponge': 30, 'minecraft:wet_sponge': 30,
  'minecraft:smooth_stone': 3, 'minecraft:polished_blackstone': 93,
  'minecraft:polished_blackstone_bricks': 93, 'minecraft:chiseled_polished_blackstone': 93,
  'minecraft:cracked_deepslate_bricks': 88, 'minecraft:cracked_deepslate_tiles': 88,
  'minecraft:chiseled_deepslate': 88,
  'minecraft:stone_brick_stairs': 87, 'minecraft:stone_brick_slab': 87,
  'minecraft:chiseled_stone_bricks': 87,
  'minecraft:red_nether_bricks': 45, 'minecraft:chiseled_nether_bricks': 45,
  'minecraft:end_stone_bricks': 53, 'minecraft:purpur_block': 92,
  'minecraft:quartz_pillar': 54, 'minecraft:quartz_bricks': 54,
  'minecraft:chiseled_quartz_block': 54, 'minecraft:smooth_quartz': 54,
  'minecraft:red_sandstone': 42, 'minecraft:chiseled_sandstone': 42,
  'minecraft:cut_sandstone': 42, 'minecraft:smooth_sandstone': 42,
  'minecraft:smooth_red_sandstone': 42,
  'minecraft:polished_basalt': 88, 'minecraft:smooth_basalt': 88,
  // Pressure plates/buttons → COBBLESTONE
  'minecraft:oak_button': 4, 'minecraft:stone_button': 4,
  'minecraft:spruce_button': 4, 'minecraft:birch_button': 4,
  'minecraft:jungle_button': 4, 'minecraft:acacia_button': 4,
  'minecraft:dark_oak_button': 4, 'minecraft:warped_button': 4,
  'minecraft:crimson_button': 4, 'minecraft:mangrove_button': 4,
  'minecraft:cherry_button': 4, 'minecraft:bamboo_button': 4,
  'minecraft:polished_blackstone_button': 3,
  'minecraft:jungle_pressure_plate': 4, 'minecraft:warped_pressure_plate': 4,
  'minecraft:crimson_pressure_plate': 4, 'minecraft:bamboo_pressure_plate': 4,
  'minecraft:polished_blackstone_pressure_plate': 3,
  // Misc
  'minecraft:scaffolding': 10, 'minecraft:barrier': 3,
  'minecraft:light': 32, 'minecraft:structure_void': 0,
  'minecraft:command_block': 30, 'minecraft:repeating_command_block': 30,
  'minecraft:chain_command_block': 30,
  'minecraft:jigsaw': 30, 'minecraft:structure_block': 30,
  'minecraft:netherite_block': 30, 'minecraft:ancient_debris': 3,
  'minecraft:end_gateway': 25, 'minecraft:end_portal': 0,
  'minecraft:end_portal_frame': 25,
  'minecraft:infested_stone': 3, 'minecraft:infested_cobblestone': 4,
  'minecraft:infested_stone_bricks': 87, 'minecraft:infested_deepslate': 88,
  'minecraft:pearlescent_froglight': 32, 'minecraft:ochre_froglight': 32,
  'minecraft:verdant_froglight': 32,
  'minecraft:mossy_cobblestone': 43,
  // Wools all to WOOL
  'minecraft:white_wool': 69, 'minecraft:orange_wool': 69,
  'minecraft:magenta_wool': 69, 'minecraft:light_blue_wool': 69,
  'minecraft:yellow_wool': 69, 'minecraft:lime_wool': 69,
  'minecraft:pink_wool': 69, 'minecraft:gray_wool': 69,
  'minecraft:light_gray_wool': 69, 'minecraft:cyan_wool': 69,
  'minecraft:purple_wool': 69, 'minecraft:blue_wool': 69,
  'minecraft:brown_wool': 69, 'minecraft:green_wool': 69,
  'minecraft:red_wool': 69, 'minecraft:black_wool': 69,
  // Shulker boxes → TERRACOTTA
  'minecraft:red_shulker_box': 30, 'minecraft:lime_shulker_box': 30,
  'minecraft:orange_shulker_box': 30, 'minecraft:yellow_shulker_box': 30,
  'minecraft:magenta_shulker_box': 30, 'minecraft:white_shulker_box': 30,
  // Misc remaining
  'minecraft:skeleton_skull': 30, 'minecraft:flowering_azalea': 6,
  'minecraft:azalea': 6, 'minecraft:chorus_plant': 6,
  'minecraft:chorus_flower': 6,
  'minecraft:nether_sprouts': 22, 'minecraft:crimson_roots': 22,
  'minecraft:warped_roots': 22, 'minecraft:warped_fungus': 22,
  'minecraft:crimson_fungus': 22,
  'minecraft:sea_pickle': 22,
  'minecraft:polished_andesite_slab': 3, 'minecraft:polished_andesite_stairs': 3,
  'minecraft:coarse_dirt': 2,
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
  return id !== undefined ? id : 86;
}

// Coordinate bounds — spiral tower is centered at (0,0), extends Y=64..254
// Natural terrain below Y=64 and outside X/Z ±80 is NOT part of the spiral
const MIN_X = -80, MAX_X = 80;
const MIN_Z = -80, MAX_Z = 80;
const MIN_Y = 64, MAX_Y = 255;
// Keep ALL block types — stone, dirt, grass ARE the spiral structure
const TERRAIN = new Set([0, 8, 80]);

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

let spawnY = 70;
for (let y = minY; y <= maxY; y++) {
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
