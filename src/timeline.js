// The Long Now — timeline database: 6000 BC to 2020 AD.
//
// Design: most of the 8,020 years are quiet (same farms, slow drift), so the
// timeline implements three densities:
//   ERAS (14 bands)      — settlement style, tool tier, sky tint per band.
//   EVENTS (~40 beats)   — dense where history is dense (biblical arc +
//                          1700 AD onward); visitable moments with sites.
//   TESTIMONIES (12)     — the biblical quest arc, paraphrase-only,
//                          kid-safe, traditional dates marked circa.
// Quiet centuries need no hand content: settlement size, palettes and tool
// tiers drift slowly with the year (see stageOf()).

export const YEAR_MIN = -6000;
export const YEAR_MAX = 2020;

export function formatYear(y) {
  if (y < 0) return `${Math.abs(y)} BC`;
  if (y === 0) return '1 BC'; // no year zero; keep it simple
  return `${y} AD`;
}

// Era bands. `settle` keys a settlement generator style, `tier` gates loot:
// 0 stone/copper, 1 bronze, 2 iron, 3 steel, 4 industrial, 5 modern.
export const ERAS = [
  { id: 'dawn',     from: -6000, to: -4000, name: 'First Furrows',  settle: 'hamlet',  tier: 0, sky: 0x9fd0ff, note: 'Mud-brick hamlets, first copper, aurochs herds.' },
  { id: 'cities',   from: -4000, to: -3000, name: 'First Cities',   settle: 'uruk',    tier: 1, sky: 0x9fc8f8, note: 'Uruk rises. Writing begins. Bronze dawns.' },
  { id: 'giants',   from: -3000, to: -2000, name: 'Stone Giants',   settle: 'nile',    tier: 1, sky: 0xa5cdf5, note: 'Pyramids, ziggurats, standing stones.' },
  { id: 'promises', from: -2000, to: -1000, name: 'Promises',       settle: 'tents',   tier: 1, sky: 0x9fd0ff, note: 'Tents and altars under huge skies.' },
  { id: 'kingdoms', from: -1000, to: -500,  name: 'Kingdoms & Exile', settle: 'walled', tier: 2, sky: 0x98c8f5, note: 'Temples, city walls, cedar and gold.' },
  { id: 'empires',  from: -500,  to: 1,     name: 'Empires',        settle: 'forum',   tier: 2, sky: 0x93c4f2, note: 'Marble forums, straight roads.' },
  { id: 'grace',    from: 1,     to: 500,   name: 'The Turning',    settle: 'village', tier: 2, sky: 0x9fd0ff, note: 'Small towns, oil lamps, garden tombs.' },
  { id: 'crowns',   from: 500,   to: 1000,  name: 'Crowns & Voyagers', settle: 'keep', tier: 2, sky: 0x9cc8f2, note: 'Castles, longships, minarets.' },
  { id: 'bells',    from: 1000,  to: 1400,  name: 'Bells & Towers', settle: 'walled',  tier: 3, sky: 0x98c6ee, note: 'Cathedrals, markets, early cannons.' },
  { id: 'sails',    from: 1400,  to: 1700,  name: 'Sails & Stars',  settle: 'port',    tier: 3, sky: 0x9ccdf5, note: 'Caravels, observatories, printing presses.' },
  { id: 'steam',    from: 1700,  to: 1850,  name: 'Steam & Revolution', settle: 'mill', tier: 4, sky: 0x9ec4e8, note: 'Chimneys, rail lines, gaslight.' },
  { id: 'wings',    from: 1850,  to: 1920,  name: 'Wings & Wires',  settle: 'town',    tier: 4, sky: 0x9cc8ec, note: 'Bulbs, wires, airfields.' },
  { id: 'moon',     from: 1920,  to: 2000,  name: 'Moon & Machine', settle: 'suburb',  tier: 5, sky: 0x9ed2f2, note: 'Towers, dishes, highways.' },
  { id: 'now',      from: 2000,  to: 2020,  name: 'The Present',    settle: 'city',    tier: 5, sky: 0xa0d4f5, note: 'Glass, neon, rovers. The timeline is yours.' },
];

export function yearToEra(y) {
  const c = Math.max(YEAR_MIN, Math.min(YEAR_MAX, y | 0));
  for (const e of ERAS) if (c >= e.from && (c < e.to || e.id === 'now')) return e;
  return ERAS[0];
}

// civilization level 0..1 for ambient drift (settlement size, palette wear)
export function civLevel(y) {
  const c = Math.max(YEAR_MIN, Math.min(YEAR_MAX, y | 0));
  return (c - YEAR_MIN) / (YEAR_MAX - YEAR_MIN);
}

// ── Dense beats: visitable moments. site = structure key, scroll links a
// testimony id (biblical) or null (secular anchor with a vignette note). ──
export const EVENTS = [
  // Deep BC anchors
  { y: -5000, era: 'dawn', title: 'First Copper', summary: 'Someone, somewhere, drops copper ore into a hot campfire — and metal is born.', site: 'hamlet', scroll: null },
  { y: -3800, era: 'cities', title: 'Uruk Rises', summary: 'The first true city: markets, canals, and little clay tablets that count sheep.', site: 'uruk', scroll: null },
  { y: -3400, era: 'cities', title: 'The First Words', summary: 'Pressed reeds leave wedge-marks in clay. Writing begins — mostly receipts.', site: 'uruk', scroll: null },
  { y: -2560, era: 'giants', title: 'The Great Pyramid', summary: 'Watch the capstone crew haul the last block up the Great Pyramid.', site: 'pyramid', scroll: null },
  // Biblical arc (traditional dates, circa)
  { y: -4004, era: 'dawn', title: 'The Garden', summary: 'A perfect garden, a first family, and everything made good.', site: 'garden', scroll: 'dust' },
  { y: -2350, era: 'giants', title: 'The Great Water', summary: 'Rain like the world is ending — and one big boat. Afterwards, a rainbow promise.', site: 'arkhill', scroll: 'water' },
  { y: -2200, era: 'giants', title: 'The Tall Tower', summary: 'A tower to the sky stops halfway when nobody understands anybody anymore.', site: 'ziggurat', scroll: 'tower' },
  { y: -2000, era: 'promises', title: 'Count the Stars', summary: 'An old traveler is told his family will outnumber the stars.', site: 'tent', scroll: 'stars' },
  { y: -1446, era: 'promises', title: 'Let My People Go', summary: 'The sea splits into walls of water. Walk through — quickly.', site: 'seacross', scroll: 'sea' },
  { y: -1400, era: 'promises', title: 'The Shout', summary: 'March, trumpets, one great shout — and impossible walls come down.', site: 'jericho', scroll: 'shout' },
  { y: -1025, era: 'promises', title: 'Five Smooth Stones', summary: 'A shepherd boy, a sling, and one perfect shot against a giant.', site: 'brook', scroll: 'stones' },
  { y: -966, era: 'kingdoms', title: 'The House on the Hill', summary: 'Cedar from far away, gold inside, a whole nation carrying beams uphill.', site: 'temple', scroll: 'house' },
  { y: -586, era: 'kingdoms', title: 'By the Rivers', summary: 'Exiles hang up their harps and weep — but keep singing anyway.', site: 'exilecamp', scroll: 'rivers' },
  { y: -538, era: 'kingdoms', title: 'Go Home', summary: 'A Persian king says the exiles may return and rebuild. Second chances, writ large.', site: 'ruins', scroll: 'home' },
  // Classical anchors
  { y: -753, era: 'kingdoms', title: 'Rome Founded', summary: 'A muddy Tiber village that will one day rule the known world.', site: 'huts', scroll: null },
  { y: -490, era: 'empires', title: 'Marathon', summary: 'Outnumbered runners hold the line — and one very famous run begins.', site: 'forum', scroll: null },
  { y: -221, era: 'empires', title: 'One Wall', summary: 'A emperor joins old walls into one very, very long Wall.', site: 'wall', scroll: null },
  // The Turning (dense)
  { y: -4, era: 'grace', title: 'The Manger', summary: 'No room inside, so: a stable, some animals, and a new star burning overhead.', site: 'stable', scroll: 'manger' },
  { y: 30, era: 'grace', title: 'The Morning Garden', summary: 'A borrowed tomb, a folded cloth, and the quietest, biggest morning in history.', site: 'garden_tomb', scroll: 'garden' },
  { y: 33, era: 'grace', title: 'Tongues of Fire', summary: 'Wind, light, and suddenly everyone understands everyone.', site: 'upperroom', scroll: 'fire' },
  { y: 70, era: 'grace', title: 'Stones Fall', summary: 'The great Temple comes down, stone by stone, exactly as foretold.', site: 'ruins', scroll: null },
  { y: 476, era: 'grace', title: 'An Empire Ends', summary: 'Rome hands back its crown. The lamps stay lit anyway.', site: 'forum', scroll: null },
  // Medieval anchors
  { y: 622, era: 'crowns', title: 'The Hijra', summary: 'A journey to Medina that starts a whole new calendar.', site: 'oasis', scroll: null },
  { y: 800, era: 'crowns', title: 'The New Caesar', summary: 'A Frankish king is crowned emperor on Christmas Day.', site: 'cathedral', scroll: null },
  { y: 1000, era: 'bells', title: 'Millennium Fears', summary: 'People hold their breath at midnight. Morning comes anyway.', site: 'village', scroll: null },
  { y: 1215, era: 'bells', title: 'The Great Charter', summary: 'Barons make a king sign that even kings have rules.', site: 'meadow', scroll: null },
  { y: 1347, era: 'bells', title: 'The Dark Year', summary: 'Plague ships dock. Light a lantern for the healers and keep your distance.', site: 'plaguetown', scroll: null },
  { y: 1440, era: 'sails', title: 'The Press', summary: 'Movable type clicks into place. Print a page — make a hundred copies.', site: 'press', scroll: null },
  { y: 1492, era: 'sails', title: 'Three Small Ships', summary: 'Stand on the deck as unknown coastline slides into view.', site: 'caravel', scroll: null },
  { y: 1517, era: 'sails', title: 'Nailed Up', summary: 'Ninety-five arguments on a church door. Europe argues back.', site: 'chapel', scroll: null },
  { y: 1609, era: 'sails', title: "Galileo's Moons", summary: 'Four little dots circle Jupiter through the tube. The universe just got bigger.', site: 'observatory', scroll: null },
  // Dense modern band
  { y: 1712, era: 'steam', title: 'Steam Up', summary: "Watt's kettle-engine hisses alive in the workshop.", site: 'workshop', scroll: null },
  { y: 1776, era: 'steam', title: 'We Hold These Truths', summary: 'A hot Philadelphia summer, a loud document, fireworks later.', site: 'hall', scroll: null },
  { y: 1825, era: 'steam', title: 'First Railway', summary: 'Climb aboard — the first public steam railway is leaving.', site: 'station', scroll: null },
  { y: 1848, era: 'steam', title: 'The Year of Barricades', summary: 'All across Europe, ordinary people build barricades and demand a say.', site: 'barricade', scroll: null },
  { y: 1879, era: 'wings', title: 'Let There Be Bulbs', summary: 'A carbon thread glows for thirteen hours straight. Night will never be the same.', site: 'lab', scroll: null },
  { y: 1903, era: 'wings', title: 'Twelve Seconds', summary: 'Two brothers, one beach, twelve seconds that un-invented distance.', site: 'airfield', scroll: null },
  { y: 1916, era: 'wings', title: 'The Medics', summary: 'No glory here — carry stretchers, save who you can.', site: 'fieldpost', scroll: null },
  { y: 1928, era: 'moon', title: 'The Mold That Heals', summary: 'A messy petri dish kills bacteria. The antibiotic age begins.', site: 'lab', scroll: null },
  { y: 1945, era: 'moon', title: 'The Longest Night Ends', summary: 'Help rebuild: share bread, light lamps, plant gardens in the rubble.', site: 'rubble', scroll: null },
  { y: 1969, era: 'moon', title: 'One Small Step', summary: 'A grainy TV, a ladder, and a footprint that is still there today.', site: 'dish', scroll: null },
  { y: 1989, era: 'moon', title: 'The Wall Comes Down', summary: 'Pick up a piece of painted concrete. Keep it.', site: 'wallfall', scroll: null },
  { y: 1991, era: 'moon', title: 'Hello, Web', summary: 'The first web page goes live. It is extremely plain. You will love it.', site: 'garage', scroll: null },
  { y: 2007, era: 'now', title: 'The Slab', summary: 'A phone with no buttons. Everybody laughs. Nobody is laughing a year later.', site: 'plaza', scroll: null },
  { y: 2012, era: 'now', title: 'Wheels on Mars', summary: 'Drive a six-wheeled robot across another planet by remote control.', site: 'roverpad', scroll: null },
  { y: 2020, era: 'now', title: 'The Quiet Spring', summary: 'Empty streets, full hearts: check on neighbors, share what you have.', site: 'street', scroll: null },
];

// ── The twelve Testimonies: the biblical quest arc. All text original
// (paraphrase-only policy); verse pointers are bare references, no quotes. ──
export const TESTIMONIES = [
  { id: 'dust', year: -4004, place: 'The Garden', title: 'Dust & Breath',
    refs: ['Genesis 1-2'],
    text: 'Before there were cities or kings, there was a garden, and the garden was good. Trees heavy with fruit, rivers like ribbons, animals with no fear in them. And people — made to tend it all, made to be loved. That is how the story starts: not with trouble, but with goodness.' },
  { id: 'water', year: -2350, place: 'The Ark Hill', title: 'The Great Water',
    refs: ['Genesis 6-9'],
    text: 'The rain did not stop, and the water covered everything people had built. But one family listened, built a huge boat, and filled it with animals two by two. When the water finally went down, a rainbow stretched across the sky — a promise that this would never happen again.' },
  { id: 'tower', year: -2200, place: 'The Unfinished Tower', title: 'The Tall Tower',
    refs: ['Genesis 11'],
    text: 'Everyone spoke one language, so they decided to build a tower all the way to the sky to make a name for themselves. Instead their words tangled into many languages, and they scattered across the earth. Ambition without kindness builds nothing that lasts.' },
  { id: 'stars', year: -2000, place: "The Traveler's Tent", title: 'Count the Stars',
    refs: ['Genesis 15', 'Genesis 17'],
    text: 'An old man with no children was taken outside on a clear night and told: your family will outnumber these stars. He believed it, though it seemed impossible. Nations would one day trace themselves back to his tent.' },
  { id: 'sea', year: -1446, place: 'The Sea Corridor', title: 'Let My People Go',
    refs: ['Exodus 14'],
    text: 'An army behind, an ocean ahead — and then the water stood up in walls on the left and the right, and a whole nation walked through on dry ground. When morning came, the sea closed again. Freedom has a sound, and that day it sounded like rushing water.' },
  { id: 'shout', year: -1400, place: 'The Fallen Walls', title: 'The Shout',
    refs: ['Joshua 6'],
    text: 'For six days they walked around the great walled city saying nothing. On the seventh day they walked seven times, the trumpets blew, everyone shouted — and the walls fell flat. Some victories are won by showing up, together, one more time.' },
  { id: 'stones', year: -1025, place: 'The Brook', title: 'Five Smooth Stones',
    refs: ['1 Samuel 17'],
    text: 'A giant in bronze armor laughed at armies. A shepherd boy picked up five smooth stones from the brook, fitted one to his sling, and the laugh stopped mid-echo. Being small is not the same as being weak.' },
  { id: 'house', year: -966, place: 'The House on the Hill', title: 'The House on the Hill',
    refs: ['1 Kings 6'],
    text: 'Cedar floated down from faraway forests. Stonecutters shaped blocks so perfectly no iron tool rang on the hill. And a whole nation carried beams uphill to build a house for God — the most beautiful building anyone there had ever seen.' },
  { id: 'rivers', year: -586, place: 'The River Camp', title: 'By the Rivers',
    refs: ['Psalm 137', 'Jeremiah 29'],
    text: 'They hung their harps in the willow trees and wept for home. But in the middle of exile came strange, stubborn instructions: build houses, plant gardens, pray for the city you are stuck in. Hope, it turns out, grows even in foreign soil.' },
  { id: 'manger', year: -4, place: 'The Stable', title: 'The Manger',
    refs: ['Luke 2'],
    text: 'There was no room inside, so it happened in a stable, with animals shifting in the straw and shepherds running in from the fields. A baby, of all things — small enough to hold, carrying the biggest promise in the whole long story.' },
  { id: 'garden', year: 30, place: 'The Morning Garden', title: 'The Morning Garden',
    refs: ['John 20'],
    text: 'Before sunrise, while it was still dark, friends came to a borrowed tomb expecting grief. Instead: stone rolled away, cloth folded neatly, and a gardener who knew their name. Death did not get the last word after all.' },
  { id: 'fire', year: 33, place: 'The Upper Room', title: 'Tongues of Fire',
    refs: ['Acts 2'],
    text: 'Wind filled the house like a storm with no clouds. Little flames rested over each head, and suddenly fishermen were speaking languages from a dozen countries. Everyone who heard it in their own tongue stood amazed. Carry the story forward — that part is yours.' },
];

export function testimonyById(id) {
  return TESTIMONIES.find(t => t.id === id) || null;
}

export function eventsNear(year, span = 25) {
  return EVENTS.filter(e => Math.abs(e.year - year) <= span).sort((a, b) => a.year - b.year);
}

// ── QUESTS: the lock-in rule.
// Every testimony year and every major anchor year assigns ONE quest on entry.
// While its objectives are incomplete you cannot leave that year — but
// completion always pays Time Cells, so the way home is guaranteed.
// Years with no quest listed here: free travel (cells still cost 1 to jump).
// Objective types (all tracked from existing systems):
//   collect {item,n} — hold n of item in inventory
//   craft {item,n}   — craft n since accept (achievements crafted map delta)
//   kill {n}         — hostile kills since accept (mobKillsAny delta)
//   place {block,n}  — blocks placed since accept (blocksPlaced map delta)
//   biome {biome}    — stand in biome id (name shown)
//   travel {dist}    — walk dist blocks from the jump-in point
export const QUESTS = [
  // ——— Testimonies (mandatory, biblical arc start→finish) ———
  { id: 'q-dust', testimony: 'dust', year: -4004, kind: 'testimony', title: 'Tend the Garden',
    brief: 'Plant life where there was dust.',
    objectives: [
      { t: 'collect', item: 263, n: 12, text: 'Gather 12 seeds' },
      { t: 'place', block: 201, n: 6, text: 'Plant 6 wheat' },
    ], reward: { cells: 2 } },
  { id: 'q-water', testimony: 'water', year: -2350, kind: 'testimony', title: 'Pitch and Timber',
    brief: 'Help seal the great boat before the rain.',
    objectives: [
      { t: 'collect', item: 5, n: 24, text: 'Gather 24 logs for the hull' },
      { t: 'craft', item: 10, n: 12, text: 'Craft 12 planks' },
    ], reward: { cells: 2 } },
  { id: 'q-tower', testimony: 'tower', year: -2200, kind: 'testimony', title: 'One More Course',
    brief: 'The builders need stone, whatever the languages say.',
    objectives: [
      { t: 'collect', item: 3, n: 20, text: 'Gather 20 stone' },
      { t: 'travel', dist: 250, text: 'Walk the tower perimeter (250 blocks)' },
    ], reward: { cells: 2 } },
  { id: 'q-stars', testimony: 'stars', year: -2000, kind: 'testimony', title: 'A Night Watch',
    brief: 'Keep the campfire lit till the stars wheel overhead.',
    objectives: [
      { t: 'collect', item: 5, n: 10, text: 'Gather 10 logs for the fire' },
      { t: 'kill', n: 3, text: 'Drive off 3 night beasts' },
    ], reward: { cells: 2 } },
  { id: 'q-sea', testimony: 'sea', year: -1446, kind: 'testimony', title: 'Through on Dry Ground',
    brief: 'Cross to the far shore. Do not stop.',
    objectives: [
      { t: 'travel', dist: 400, text: 'Cross the corridor (400 blocks)' },
      { t: 'biome', biome: 2, text: 'Reach the far beach' },
    ], reward: { cells: 3 } },
  { id: 'q-shout', testimony: 'shout', year: -1400, kind: 'testimony', title: 'Seven Rounds',
    brief: 'Circle the walls. Then shout.',
    objectives: [
      { t: 'travel', dist: 350, text: 'Circle the city (350 blocks)' },
      { t: 'kill', n: 4, text: 'Rout 4 guards when the walls fall' },
    ], reward: { cells: 2 } },
  { id: 'q-stones', testimony: 'stones', year: -1025, kind: 'testimony', title: 'Smooth Stones',
    brief: 'The brook gives what the armory cannot.',
    objectives: [
      { t: 'collect', item: 4, n: 5, text: 'Gather 5 smooth stones (cobble)' },
      { t: 'kill', n: 1, text: 'Fell the champion' },
    ], reward: { cells: 2 } },
  { id: 'q-house', testimony: 'house', year: -966, kind: 'testimony', title: 'Beams Uphill',
    brief: 'Cedar for the House. Carry it up.',
    objectives: [
      { t: 'collect', item: 5, n: 30, text: 'Gather 30 logs (cedar)' },
      { t: 'place', block: 10, n: 10, text: 'Lay 10 planks on the hill' },
    ], reward: { cells: 2 } },
  { id: 'q-rivers', testimony: 'rivers', year: -586, kind: 'testimony', title: 'Sing Anyway',
    brief: 'Bring bread to the exiles by the water.',
    objectives: [
      { t: 'craft', item: 264, n: 3, text: 'Bake 3 bread' },
      { t: 'biome', biome: 14, text: 'Reach the river camp' },
    ], reward: { cells: 3 } },
  { id: 'q-manger', testimony: 'manger', year: -4, kind: 'testimony', title: 'Room to Spare',
    brief: 'Warm the stable: straw, light, and something soft to lie on.',
    objectives: [
      { t: 'collect', item: 262, n: 10, text: 'Gather 10 wheat for straw' },
      { t: 'place', block: 41, n: 4, text: 'Set 4 torches against the night' },
    ], reward: { cells: 2 } },
  { id: 'q-garden', testimony: 'garden', year: 30, kind: 'testimony', title: 'Before Sunrise',
    brief: 'Reach the garden before dawn. Bring nothing. Just come.',
    objectives: [
      { t: 'travel', dist: 300, text: 'Walk to the garden (300 blocks)' },
    ], reward: { cells: 3 } },
  { id: 'q-fire', testimony: 'fire', year: 33, kind: 'testimony', title: 'Carry It On',
    brief: 'The story is yours now. Light every corner.',
    objectives: [
      { t: 'place', block: 41, n: 8, text: 'Set 8 lamps in the upper room' },
      { t: 'travel', dist: 500, text: 'Carry word 500 blocks out' },
    ], reward: { cells: 4 } },
  // ——— Anchor sides (optional flavor, same lock rule while active) ———
  { id: 'q-giza', testimony: null, year: -2560, kind: 'anchor', title: 'Capstone Crew',
    brief: 'Haul stone for the last course.',
    objectives: [
      { t: 'collect', item: 3, n: 24, text: 'Quarry 24 stone' },
      { t: 'travel', dist: 200, text: 'Climb the ramp (200 blocks)' },
    ], reward: { cells: 2 } },
  { id: 'q-marathon', testimony: null, year: -490, kind: 'anchor', title: 'Hold the Line',
    brief: 'Stand with the outnumbered.',
    objectives: [{ t: 'kill', n: 6, text: 'Rout 6 attackers' }], reward: { cells: 2 } },
  { id: 'q-press', testimony: null, year: 1440, kind: 'anchor', title: 'Ink and Paper',
    brief: 'Set the type. Pull the proof.',
    objectives: [
      { t: 'collect', item: 257, n: 8, text: 'Grind 8 coal for ink' },
      { t: 'craft', item: 10, n: 8, text: 'Frame 8 planks for the press' },
    ], reward: { cells: 2 } },
  { id: 'q-rail', testimony: null, year: 1825, kind: 'anchor', title: 'Full Steam',
    brief: 'Feed the beast. Ride the line.',
    objectives: [
      { t: 'collect', item: 257, n: 16, text: 'Shovel 16 coal' },
      { t: 'travel', dist: 800, text: 'Ride out 800 blocks' },
    ], reward: { cells: 2 } },
  { id: 'q-bulb', testimony: null, year: 1879, kind: 'anchor', title: 'Thirteen Hours',
    brief: 'Keep the filament lit till dawn.',
    objectives: [
      { t: 'place', block: 41, n: 6, text: 'Hang 6 bulbs' },
      { t: 'collect', item: 16, n: 4, text: 'Blow 4 glass shields' },
    ], reward: { cells: 2 } },
  { id: 'q-flight', testimony: null, year: 1903, kind: 'anchor', title: 'Twelve Seconds',
    brief: 'Into the wind. Hold her steady.',
    objectives: [{ t: 'travel', dist: 600, text: 'Cover 600 blocks of beach' }], reward: { cells: 2 } },
  { id: 'q-moon', testimony: null, year: 1969, kind: 'anchor', title: 'Watch Party',
    brief: 'Climb high. Do not blink.',
    objectives: [
      { t: 'travel', dist: 300, text: 'Climb 300 blocks out' },
      { t: 'place', block: 41, n: 4, text: 'Light 4 signal flares' },
    ], reward: { cells: 3 } },
  { id: 'q-rover', testimony: null, year: 2012, kind: 'anchor', title: 'Six Wheels',
    brief: 'Survey the red dust. Bring back proof.',
    objectives: [
      { t: 'collect', item: 7, n: 20, text: 'Scoop 20 red sand' },
      { t: 'travel', dist: 700, text: 'Rove 700 blocks' },
    ], reward: { cells: 2 } },
];

export function questForYear(year) {
  let best = null, bestD = 11;
  for (const q of QUESTS) {
    const d = Math.abs(q.year - year);
    if (d < bestD) { bestD = d; best = q; }
  }
  return bestD <= 10 ? best : null;
}

// Natural-spawn availability per era: [firstYear, lastYear] inclusive.
// Types not listed spawn in all years. No new mobs — this only gates the
// existing roster so deep time feels ancient and late eras feel industrial.
const MOB_ERAS = {
  witch: [-500, 2020],          // settled folk-magic, not hunter camps
  blower: [1700, 2020],         // powder age onward
  portalman: [1800, 2020],      // rift-tech leaks of the machine ages
  crystal_golem: [-6000, 500],  // mythic deep time only
};
export function mobEraOk(type, year) {
  const r = MOB_ERAS[type];
  if (!r) return true;
  return year >= r[0] && year <= r[1];
}
