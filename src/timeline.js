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

export function questForYear(year, skip) {
  // Curated quests first (the arc is unmissable), then the library.
  // skip: done ids — nearest UNCLAIMED quest wins, so finished neighbors
  // never shadow a quest you still owe.
  const has = (arr, id) => !!arr && arr.includes(id);
  let best = null, bestD = 11;
  for (const q of QUESTS) {
    if (has(skip, q.id)) continue;
    const d = Math.abs(q.year - year);
    if (d < bestD) { bestD = d; best = q; }
  }
  if (best && bestD <= 10) return best;
  best = null; bestD = 11;
  for (const q of GEN_QUESTS) {
    if (has(skip, q.id)) continue;
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

// ── QUEST LIBRARY (1000+): every faith, every age ─────────────────────
// The 20 curated quests above LOCK their years (the spine of the story).
// Everything below is kind 'scroll' (real people and stories, paraphrased,
// kid-safe, help-and-build themed) or 'wayfarer' (era-flavored filler).
// Library quests NEVER lock: they pay Time Cells and stamp the Codex, and
// you may always travel on. All content is paraphrase-only — no verses
// quoted, no doctrine argued, reverence for every tradition.
//
// Safe numeric ids only (match the curated quests): items 263 seeds,
// 262 wheat, 5 logs, 10 planks, 3 stone, 4 cobble, 264 bread, 257 coal,
// 16 glass, 7 red sand; blocks 201 wheat-crop, 10 planks, 41 torch;
// biomes 2 shore, 14 river.
const GEN = [];
function GQ(id, year, kind, title, brief, objectives, cells) {
  GEN.push({ id, year, kind, lock: false, testimony: null, title, brief, objectives, reward: { cells: cells || 1 } });
}
const O = {
  logs: n => ({ t: 'collect', item: 5, n, text: `Gather ${n} logs` }),
  stone: n => ({ t: 'collect', item: 3, n, text: `Quarry ${n} stone` }),
  cobble: n => ({ t: 'collect', item: 4, n, text: `Gather ${n} cobblestone` }),
  seeds: n => ({ t: 'collect', item: 263, n, text: `Gather ${n} seeds` }),
  wheat: n => ({ t: 'collect', item: 262, n, text: `Gather ${n} wheat` }),
  coal: n => ({ t: 'collect', item: 257, n, text: `Gather ${n} coal` }),
  glass: n => ({ t: 'collect', item: 16, n, text: `Gather ${n} glass` }),
  sand: n => ({ t: 'collect', item: 7, n, text: `Gather ${n} red sand` }),
  bread: n => ({ t: 'craft', item: 264, n, text: `Bake ${n} bread` }),
  planks: n => ({ t: 'craft', item: 10, n, text: `Saw ${n} planks` }),
  torches: n => ({ t: 'place', block: 41, n, text: `Set ${n} torches` }),
  plant: n => ({ t: 'place', block: 201, n, text: `Plant ${n} crops` }),
  lay: n => ({ t: 'place', block: 10, n, text: `Lay ${n} planks` }),
  walk: d => ({ t: 'travel', dist: d, text: `Journey ${d} blocks` }),
  shore: () => ({ t: 'biome', biome: 2, text: 'Reach the shore' }),
  river: () => ({ t: 'biome', biome: 14, text: 'Reach the river' }),
};

// ——— Songs (Psalms 1–150, paraphrased themes, Davidic era) ———
{
  const themes = [
    ['a morning song', 'Greet the dawn with work and thanks.', [O.seeds(8), O.walk(150)]],
    ['a song of trust', 'Do the next right thing, singing.', [O.logs(10), O.torches(4)]],
    ['a cry for help', 'Carry help to someone hurting.', [O.bread(2), O.walk(200)]],
    ['a song of thanks', 'Build something worth thanking for.', [O.stone(12), O.lay(6)]],
    ['a shepherd song', 'Tend the flock and the field.', [O.wheat(10), O.plant(6)]],
    ['a song of ascent', 'Climb higher than your worries.', [O.walk(300), O.torches(2)]],
    ['a song of refuge', 'Make a safe place for travelers.', [O.planks(8), O.torches(4)]],
    ['a song of wonder', 'Walk far and look closely.', [O.walk(400), O.shore()]],
  ];
  for (let i = 1; i <= 150; i++) {
    const th = themes[(i - 1) % themes.length];
    GQ('q-ps-' + i, -1010 + i, 'scroll', 'Psalm ' + i + ': ' + th[0],
      th[1], th[2].map(o => ({ ...o })), 1);
  }
}
// ——— Patriarchs, matriarchs, exodus stations ———
{
  const rows = [
    [-1950, 'Wells of Promise', 'Dig where the herds can drink.', [O.stone(10), O.walk(200)]],
    [-1900, 'The Oak Tent', 'Raise the big tent before evening.', [O.logs(14), O.lay(6)]],
    [-1850, 'Lentil Stew', 'Feed the hungry first.', [O.bread(3), O.wheat(8)]],
    [-1800, 'Coat of Colors', 'Sew something bright for the youngest.', [O.seeds(12), O.walk(150)]],
    [-1750, 'Seven Fat Years', 'Store grain while the sun shines.', [O.wheat(16), O.planks(6)]],
    [-1446, 'Bitter Water Sweet', 'Find drink in the dry place.', [O.walk(300), O.river()]],
    [-1445, 'Elim Palms', 'Rest, then mend the tents.', [O.logs(12), O.torches(4)]],
    [-1444, 'Manna Morning', 'Gather only what the day needs.', [O.seeds(14), O.bread(2)]],
    [-1443, 'Rock Water', 'Clear the channel to the spring.', [O.stone(12), O.walk(200)]],
    [-1400, 'Twelve Stones', 'Mark the crossing so children ask.', [O.cobble(12), O.shore()]],
    [-1380, 'Deborah’s Palm', 'Settle quarrels under the tree.', [O.walk(250), O.bread(2)]],
    [-1350, 'Gideon’s Torch', 'Light the night watch.', [O.torches(6), O.walk(200)]],
    [-1300, 'Samson’s Grain', 'Bring in the harvest anyhow.', [O.wheat(14), O.plant(6)]],
    [-1280, 'Ruth’s Field', 'Glean kindly; leave extra.', [O.wheat(12), O.bread(2)]],
    [-1200, 'Tabernacle Pegs', 'Square the beams for the tent.', [O.logs(16), O.lay(8)]],
    [-1100, 'Samuel’s Lamp', 'Keep the lamp lit till morning.', [O.torches(6), O.coal(6)]],
  ];
  rows.forEach((r, i) => GQ('q-ot-' + i, r[0], 'scroll', r[1], r[2], r[3].map(o => ({ ...o })), 1));
}
// ——— Kings of Israel & Judah (regnal years, builders’ view) ———
{
  const kings = [
    ['Saul', -1050], ['David', -1010], ['Solomon', -970], ['Rehoboam', -930], ['Jeroboam', -930],
    ['Asa', -910], ['Ahab', -874], ['Jehoshaphat', -872], ['Jehu', -841], ['Joash', -835],
    ['Jeroboam II', -782], ['Uzziah', -781], ['Jotham', -750], ['Ahaz', -735], ['Hezekiah', -715],
    ['Manasseh', -697], ['Amon', -642], ['Josiah', -640], ['Jehoiakim', -609], ['Zedekiah', -597],
    ['Baasha', -908], ['Omri', -880], ['Nadab', -910], ['Elah', -886], ['Zimri', -885],
    ['Tibni', -880], ['Shallum', -752], ['Menahem', -752], ['Pekahiah', -742], ['Pekah', -740],
    ['Hoshea', -732], ['Jehoahaz', -609], ['Jehoiachin', -598], ['Athaliah', -841], ['Abijam', -913],
    ['Jehoram', -852], ['Ahaziah', -841], ['Amaziah', -796], ['Zechariah', -753], ['Amon II', -642],
  ];
  const jobs = [
    ['Quarry Crew', 'Cut stone for the city wall.', [O.stone(16), O.walk(200)]],
    ['Cedar Run', 'Haul beams from the high forest.', [O.logs(16), O.lay(8)]],
    ['Granary Watch', 'Fill the storehouse before rain.', [O.wheat(14), O.planks(6)]],
    ['Lamp Duty', 'Light the palace court.', [O.torches(6), O.coal(8)]],
  ];
  kings.forEach((k, i) => {
    const j = jobs[i % jobs.length];
    GQ('q-king-' + i, k[1], 'scroll', j[0] + ' of ' + k[0], j[1], j[2].map(o => ({ ...o })), 1);
  });
}
// ——— Prophets (paraphrased calls to justice & mercy) ———
{
  const prophets = [
    ['Elijah', -870, 'Ravens’ Bread', 'Share what the sky provides.', [O.bread(3), O.walk(250)]],
    ['Elisha', -850, 'Borrowed Axe', 'Help recover what was lost.', [O.logs(10), O.river()]],
    ['Isaiah', -740, 'Level Path', 'Clear the road for the weary.', [O.stone(12), O.walk(300)]],
    ['Micah', -735, 'Do Justice', 'Feed widows; mend fences.', [O.bread(3), O.lay(6)]],
    ['Hosea', -750, 'Steadfast Love', 'Glean the field twice for strangers.', [O.wheat(12), O.plant(6)]],
    ['Amos', -760, 'Plumb Line', 'Build one wall perfectly true.', [O.cobble(12), O.lay(4)]],
    ['Jonah', -780, 'Second Chance', 'Sail out; forgive ashore.', [O.walk(350), O.shore()]],
    ['Nahum', -650, 'Comfort the Tired', 'Bread and rest for refugees.', [O.bread(4), O.torches(4)]],
    ['Habakkuk', -605, 'Watchtower', 'Keep watch; write it plain.', [O.torches(4), O.walk(200)]],
    ['Zephaniah', -640, 'Gather Gently', 'Bring in the harvest whole.', [O.seeds(12), O.wheat(10)]],
    ['Jeremiah', -627, 'Bought Field', 'Plant as if hope were certain.', [O.plant(8), O.seeds(10)]],
    ['Ezekiel', -593, 'Valley Watch', 'Raise markers for the lost.', [O.walk(400), O.torches(4)]],
    ['Daniel', -605, 'Night Study', 'Keep the lamp lit for learning.', [O.coal(8), O.torches(6)]],
    ['Haggai', -520, 'Strong Beams', 'Finish the roof together.', [O.logs(14), O.lay(8)]],
    ['Zechariah', -520, 'Golden Lamp', 'Polish every bowl till it shines.', [O.torches(8), O.glass(4)]],
    ['Malachi', -450, 'Full Storehouse', 'Fill the barn to bursting.', [O.wheat(16), O.planks(8)]],
    ['Joel', -800, 'After the Locusts', 'Replant every eaten row.', [O.plant(10), O.seeds(12)]],
    ['Obadiah', -580, 'Brother’s Keeper', 'Send bread over the hill.', [O.bread(3), O.walk(300)]],
    ['Samuel', -1050, 'Ebenezer Stone', 'Raise one stone of help.', [O.cobble(8), O.walk(150)]],
    ['Nathan', -1000, 'Plain Word', 'Carry the hard truth kindly.', [O.walk(250), O.bread(2)]],
    ['Micaiah', -850, 'True Report', 'Walk the whole wall; report all.', [O.walk(350), O.torches(2)]],
    ['Huldah', -640, 'Read It Aloud', 'Copy the scroll for the school.', [O.walk(200), O.planks(6)]],
  ];
  prophets.forEach((p, i) => GQ('q-proph-' + i, p[1], 'scroll', p[0] + ': ' + p[2], p[3], p[4].map(o => ({ ...o })), 2));
}
// ——— Parables (stories the Teacher told, paraphrased) ———
{
  const parables = [
    'The Sower', 'The Weeds', 'The Mustard Seed', 'The Leaven', 'Hidden Treasure', 'The Pearl',
    'The Net', 'The Lost Sheep', 'The Lost Coin', 'The Lost Son', 'The Good Neighbor', 'The Unforgiving Servant',
    'The Workers', 'The Talents', 'The Ten Lamps', 'Sheep and Goats', 'The Great Banquet', 'The Friend at Midnight',
    'The Rich Fool', 'The Barren Fig', 'The Pharisee and the Tax Man', 'The Wedding Feast', 'The Two Sons',
    'The Wicked Tenants', 'The Fig Tree', 'The Pounds', 'The Dragnet', 'The House on Rock',
  ];
  const deeds = [
    ['Sow kindly', 'Scatter seed on every soil.', [O.seeds(12), O.plant(6)]],
    ['Share bread', 'No one eats alone tonight.', [O.bread(3), O.wheat(8)]],
    ['Light a lamp', 'Set lamps where it is dark.', [O.torches(6), O.coal(6)]],
    ['Build true', 'Foundations before walls.', [O.stone(12), O.lay(6)]],
    ['Go find them', 'Walk out to the wanderers.', [O.walk(350), O.bread(2)]],
    ['Forgive debts', 'Work double; give half away.', [O.wheat(12), O.bread(3)]],
  ];
  parables.forEach((t, i) => {
    const d = deeds[i % deeds.length];
    GQ('q-par-' + i, 28 + (i % 5), 'scroll', t + ': ' + d[0], d[1], d[2].map(o => ({ ...o })), 1);
  });
}
// ——— Miracles (kindnesses remembered, paraphrased) ———
{
  const miracles = [
    'Water into Wine', 'The Official’s Son', 'The Fever Lifted', 'The Leper Touched', 'The Paralytic Walks',
    'The Centurion’s Servant', 'The Widow’s Son', 'Calming the Storm', 'The Wild Man Clothed', 'Jairus’ Daughter',
    'The Bleeding Woman', 'Two Blind Men', 'Bread for Five Thousand', 'Walking on Water', 'The Canaanite’s Daughter',
    'The Deaf Man Hears', 'Bread for Four Thousand', 'Blind at Bethsaida', 'The Seizing Boy', 'The Temple Tax Fish',
    'Ten Lepers', 'Blind Bartimaeus', 'Lazarus Called Out', 'The Withered Fig', 'The Healed Ear', 'The Great Catch',
    'Peter’s Net', 'The Cripple at the Pool',
  ];
  const deeds = [
    ['Carry water', 'Haul jars for the feast.', [O.walk(250), O.shore()]],
    ['Feed them all', 'Bake till baskets overflow.', [O.bread(4), O.wheat(12)]],
    ['Sit the storm out', 'Light lamps; wait together.', [O.torches(6), O.planks(6)]],
    ['Clothe the cold', 'Weave and mend and give.', [O.seeds(10), O.bread(2)]],
    ['Open blind eyes', 'Clear every path of stones.', [O.stone(10), O.walk(300)]],
    ['Unstop deaf ears', 'Carry word to the far farm.', [O.walk(400), O.bread(2)]],
  ];
  miracles.forEach((t, i) => {
    const d = deeds[i % deeds.length];
    GQ('q-mir-' + i, 28 + (i % 5), 'scroll', t + ': ' + d[0], d[1], d[2].map(o => ({ ...o })), 1);
  });
}
// ——— The Twelve, the early church, letters (themes paraphrased) ———
{
  const folk = [
    ['Peter', 33, 'Mend the Nets', 'Rope, tar, patience.', [O.walk(200), O.shore()]],
    ['Peter', 34, 'Feed My Sheep', 'Breakfast on the beach.', [O.bread(3), O.torches(4)]],
    ['Andrew', 33, 'Bring Someone', 'Fetch one friend to the feast.', [O.bread(2), O.walk(250)]],
    ['James', 33, 'Thunder, Harnessed', 'Carry lumber, not lightning.', [O.logs(12), O.lay(6)]],
    ['John', 33, 'Beloved Work', 'Love is lumber and bread.', [O.planks(8), O.bread(2)]],
    ['John', 90, 'Write It Down', 'Copy the story for Ephesus.', [O.walk(200), O.torches(4)]],
    ['Philip', 33, 'Show the Way', 'Walk travelers to the gate.', [O.walk(300), O.shore()]],
    ['Bartholomew', 33, 'No Guile', 'Build one honest wall.', [O.cobble(10), O.lay(4)]],
    ['Matthew', 33, 'Leave the Booth', 'Feed the street instead.', [O.bread(4), O.wheat(8)]],
    ['Thomas', 33, 'Touch and See', 'Finish what you doubted.', [O.stone(10), O.walk(200)]],
    ['Thomas', 52, 'Far as India', 'Walk farther than fear.', [O.walk(500), O.torches(4)]],
    ['James the Less', 33, 'Quiet Faithfulness', 'Sweep the court daily.', [O.walk(150), O.bread(2)]],
    ['Thaddeus', 33, 'Brave Question', 'Ask; then carry the answer.', [O.walk(250), O.planks(6)]],
    ['Simon', 33, 'Zeal, Redirected', 'Dig wells, not trenches.', [O.stone(12), O.river()]],
    ['Matthias', 33, 'Take Up the Lot', 'Fill the empty place.', [O.plant(8), O.seeds(8)]],
    ['Stephen', 34, 'Serve Tables', 'Bread first, speeches later.', [O.bread(4), O.wheat(10)]],
    ['Philip', 35, 'Desert Road', 'Run beside one chariot.', [O.walk(400), O.bread(2)]],
    ['Barnabas', 45, 'Son of Comfort', 'Sell a field; fund a trip.', [O.wheat(12), O.walk(300)]],
    ['Paul', 46, 'Tentmaker', 'Stitch sails to pay the way.', [O.seeds(10), O.walk(250)]],
    ['Paul', 50, 'Letters by Lamplight', 'Write hope to four towns.', [O.coal(8), O.torches(6)]],
    ['Priscilla', 51, 'Tent Shop', 'Keep the lamps and ledgers.', [O.planks(6), O.torches(4)]],
    ['Aquila', 51, 'Fellow Worker', 'Raise the shop awning.', [O.logs(10), O.lay(6)]],
    ['Timothy', 52, 'Young and Trusted', 'Carry letters through hills.', [O.walk(350), O.bread(2)]],
    ['Luke', 60, 'Careful Account', 'Interview everyone twice.', [O.walk(300), O.torches(4)]],
    ['Mark', 55, 'Short and Urgent', 'Run the story to Rome.', [O.walk(450), O.bread(3)]],
    ['James of Jerusalem', 48, 'Pillar Prayer', 'Kneel; then feed orphans.', [O.bread(3), O.wheat(8)]],
    ['Cornelius', 40, 'Open Door', 'Set extra places.', [O.planks(8), O.bread(3)]],
    ['Lydia', 51, 'Purple and Prayer', 'Dye cloth; host the church.', [O.seeds(10), O.torches(4)]],
    ['Phoebe', 57, 'Letter Carrier', 'Guard the scroll to Rome.', [O.walk(400), O.torches(2)]],
    ['Onesimus', 60, 'No Longer Slave', 'Walk home free; bring bread.', [O.walk(300), O.bread(2)]],
  ];
  folk.forEach((f, i) => GQ('q-nt-' + i, f[1], 'scroll', f[0] + ': ' + f[2], f[3], f[4].map(o => ({ ...o })), 1));
  const letters = [
    ['Faith That Works', 'Believe it; then build it.', [O.stone(10), O.lay(6)]],
    ['The Fruit Basket', 'Grow patience like wheat.', [O.wheat(12), O.plant(6)]],
    ['Love’s Ledger', 'Keep no record of wrongs.', [O.bread(3), O.walk(200)]],
    ['Hope’s Anchor', 'Hold fast in weather.', [O.walk(250), O.shore()]],
    ['Peace Pursuit', 'Chase it; catch it; share it.', [O.bread(2), O.walk(300)]],
    ['Gentle Answer', 'Soft words, strong walls.', [O.cobble(8), O.bread(2)]],
    ['Joy in Chains', 'Sing where you are.', [O.torches(4), O.coal(6)]],
    ['Run the Race', 'Train daily; finish well.', [O.walk(500), O.bread(2)]],
    ['Armor of Light', 'Light every watch post.', [O.torches(8), O.walk(200)]],
    ['One Body', 'Every part carries weight.', [O.logs(12), O.planks(8)]],
    ['New Song', 'Teach the children the tune.', [O.seeds(8), O.walk(150)]],
    ['Hospitality', 'Strangers may be angels.', [O.bread(4), O.torches(4)]],
    ['Widows and Orphans', 'Pure work, plain bread.', [O.bread(3), O.wheat(10)]],
    ['Bridle the Tongue', 'Fewer words, better walls.', [O.stone(10), O.walk(150)]],
    ['Tame the Storm', 'Steady hands on the rope.', [O.walk(200), O.shore()]],
  ];
  letters.forEach((L, i) => GQ('q-ep-' + i, 50 + i * 3, 'scroll', L[0], L[1], L[2].map(o => ({ ...o })), 1));
}
// ——— Prophets honored in the Quran (stories retold with reverence) ———
{
  const rows = [
    ['Adam', -4000, 'First Garden', 'Tend the first field.', [O.seeds(10), O.plant(6)]],
    ['Idris', -3500, 'Pen and Cloth', 'Write and stitch honestly.', [O.seeds(8), O.walk(150)]],
    ['Nuh', -2350, 'Warn and Build', 'Help neighbors prepare.', [O.logs(14), O.planks(8)]],
    ['Hud', -2200, 'Pillars’ Pride', 'Build low; give high.', [O.stone(10), O.bread(3)]],
    ['Salih', -2100, 'The She-Camel’s Share', 'Leave water for all.', [O.walk(250), O.river()]],
    ['Ibrahim', -2000, 'Friend of All', 'Feed every traveler.', [O.bread(4), O.wheat(10)]],
    ['Lut', -1950, 'Shelter Strangers', 'Open the gate at dusk.', [O.torches(6), O.bread(2)]],
    ['Ismail', -1900, 'Zamzam Run', 'Fetch water, running.', [O.walk(300), O.river()]],
    ['Ishaq', -1850, 'Wells Again', 'Re-dig the old wells.', [O.stone(12), O.river()]],
    ['Yaqub', -1800, 'Twelve Tents', 'Pitch camp for a crowd.', [O.logs(12), O.lay(6)]],
    ['Yusuf', -1750, 'Storehouse Dream', 'Save a fifth each year.', [O.wheat(14), O.planks(6)]],
    ['Ayyub', -1700, 'Patient Field', 'Replant without complaint.', [O.plant(8), O.seeds(10)]],
    ['Shuayb', -1600, 'Honest Measure', 'Weigh everything true.', [O.wheat(10), O.walk(150)]],
    ['Musa', -1446, 'Staff and Sandals', 'Lead thirsty folk to water.', [O.walk(400), O.river()]],
    ['Harun', -1446, 'Eloquent Helper', 'Speak for the stammering.', [O.walk(250), O.bread(2)]],
    ['Dawud', -1010, 'Psalms of the Hills', 'Sing while you shepherd.', [O.wheat(10), O.walk(200)]],
    ['Sulayman', -970, 'Horses and Cedar', 'Build stables, then temple.', [O.logs(14), O.lay(8)]],
    ['Ilyas', -870, 'Drought Bread', 'Share the last jar.', [O.bread(2), O.wheat(8)]],
    ['Alyasa', -850, 'Oil for the Widow', 'Fill every jar in town.', [O.walk(200), O.bread(3)]],
    ['Yunus', -780, 'Three Dark Days', 'Sail back; forgive Nineveh.', [O.walk(350), O.shore()]],
    ['Zakariya', -20, 'Silent Prayer', 'Keep the lamp through silence.', [O.torches(6), O.coal(6)]],
    ['Yahya', 25, 'Wilderness Table', 'Eat simply; speak plainly.', [O.seeds(10), O.walk(200)]],
    ['Isa', 30, 'Healer’s Hands', 'Touch the untouchable.', [O.bread(3), O.walk(300)]],
    ['Maryam', 30, 'Palm and Stream', 'Rest; eat dates; be held.', [O.wheat(8), O.river()]],
  ];
  rows.forEach((r, i) => GQ('q-qp-' + i, r[1], 'scroll', r[0] + ': ' + r[2], r[3], r[4].map(o => ({ ...o })), 2));
}
// ——— The Seerah & companions (610–700, reverent, community-themed) ———
{
  const rows = [
    [610, 'The Cave Reading', 'Read; then teach one child.', [O.torches(4), O.walk(200)]],
    [613, 'Open Call', 'Invite neighbors to supper.', [O.bread(4), O.planks(6)]],
    [615, 'Boats to Abyssinia', 'Help families embark safely.', [O.walk(300), O.shore()]],
    [617, 'The Boycott Years', 'Share dates in the ravine.', [O.bread(3), O.wheat(8)]],
    [619, 'Year of Sorrow', 'Sit with the grieving.', [O.walk(150), O.bread(2)]],
    [620, 'Taif Garden', 'Offer water to the mocked.', [O.river(), O.bread(2)]],
    [622, 'Night of Hijra', 'Pack light; walk by stars.', [O.walk(450), O.torches(4)]],
    [622, 'Brotherhood Pairs', 'Split everything in half.', [O.planks(8), O.bread(3)]],
    [623, 'First Mosque', 'Lay palm trunks for shade.', [O.logs(12), O.lay(8)]],
    [624, 'Badr Wells', 'Guard the water kindly.', [O.walk(250), O.river()]],
    [625, 'Uhud Wounded', 'Carry the hurt downhill.', [O.walk(300), O.bread(3)]],
    [627, 'The Trench', 'Dig five days, eat little.', [O.stone(14), O.bread(2)]],
    [628, 'Treaty Tent', 'Write peace, word by word.', [O.walk(200), O.planks(6)]],
    [630, 'Open Gates', 'Forgive the whole city.', [O.bread(4), O.walk(250)]],
    [632, 'Farewell Plain', 'Hear it; carry it home.', [O.walk(400), O.torches(4)]],
    [632, 'Abu Bakr: The Cave Friend', 'Stay the night watch.', [O.torches(6), O.walk(200)]],
    [634, 'Umar: Night Patrol', 'Flour on your own back.', [O.wheat(12), O.walk(300)]],
    [644, 'Uthman: The Well Bought', 'Buy water for everyone.', [O.walk(200), O.river()]],
    [656, 'Ali: The Gate Kept', 'Hold the door for elders.', [O.stone(10), O.bread(2)]],
    [610, 'Khadija: First Believer', 'Fund the mission quietly.', [O.wheat(12), O.planks(6)]],
    [623, 'Bilal: First Call', 'Climb high; call clear.', [O.walk(250), O.torches(4)]],
    [625, 'Hamza: Shield Wall', 'Stand in front for once.', [O.stone(12), O.walk(200)]],
    [627, 'Salman: Trench Idea', 'Advise; then dig first.', [O.stone(14), O.bread(2)]],
  ];
  rows.forEach((r, i) => GQ('q-seer-' + i, r[0], 'scroll', r[1], r[2], r[3].map(o => ({ ...o })), 1));
}
// ——— The Buddha’s life & Jataka kindness tales ———
{
  const life = [
    [-563, 'Lumbini Garden', 'Plant flowers where he first breathed.', [O.plant(8), O.seeds(10)]],
    [-547, 'Four Sights', 'Walk the four gates slowly.', [O.walk(400), O.bread(2)]],
    [-534, 'Great Renunciation', 'Give away everything but resolve.', [O.bread(3), O.walk(300)]],
    [-528, 'Middle Way Bowl', 'Eat one good meal.', [O.bread(2), O.river()]],
    [-528, 'Bodhi Seat', 'Sit still till morning.', [O.torches(4), O.walk(150)]],
    [-528, 'First Sermon', 'Turn the wheel: share bread.', [O.bread(4), O.walk(250)]],
    [-520, 'Bamboo Grove', 'Raise a hall for rain retreat.', [O.logs(12), O.lay(8)]],
    [-483, 'Final Rest', 'Plant sal trees; be kind.', [O.plant(8), O.torches(4)]],
  ];
  life.forEach((L, i) => {
    for (let v = 0; v < 5; v++) {
      const jobs = [
        ['Alms Round', 'Share breakfast with monks.', [O.bread(3), O.walk(200)]],
        ['Sweep the Court', 'Clean the monastery yard.', [O.walk(150), O.seeds(8)]],
        ['Water the Fig', 'Tend the old tree daily.', [O.river(), O.plant(4)]],
        ['Mend Robes', 'Patch cloth for travelers.', [O.seeds(8), O.bread(2)]],
        ['Sit a While', 'Breathe; watch; begin again.', [O.torches(2), O.walk(150)]],
      ];
      const j = jobs[v];
      GQ('q-bud-' + i + '-' + v, L[0] + v, 'scroll', L[2] + ': ' + j[0], j[1], j[2].map(o => ({ ...o })), 1);
    }
    GQ('q-bud-life-' + i, L[0], 'scroll', L[1], L[2], L[3].map(o => ({ ...o })), 2);
  });
  const jataka = [
    'The Generous Hare', 'The Kind Elephant', 'The Patient Buffalo', 'The Wise Parrot', 'The Giving Tree',
    'The Honest Woodcutter', 'The Monkey Bridge', 'The Selfless Deer', 'The Talking Tortoise', 'The Grateful Crane',
    'The Brave Quail', 'The Loyal Mongoose', 'The Clever Crab', 'The Gentle Snake', 'The Sharing Ants',
    'The Humble Sparrow', 'The Forgiving Swan', 'The Diligent Bee', 'The Calm Lotus', 'The Warm Blanket',
    'The Empty Boat', 'The Two Pots', 'The Blind Men', 'The Mustard Seed', 'The Banyan Seed',
    'The Footprint', 'The Ferry Toll', 'The Salt Cake', 'The Drum Lesson', 'The Lantern Row',
    'The Rice Field', 'The Well Frog', 'The Caged Bird Free', 'The Millet Measure', 'The Thorn Pulled',
    'The Flood Friend', 'The Seed Kept', 'The Roof Fixed', 'The Path Swept', 'The Stranger Fed',
  ];
  jataka.forEach((t, i) => {
    const jobs = [
      ['Be kind to beasts', 'Feed every stray today.', [O.wheat(10), O.walk(200)]],
      ['Give something up', 'Share your best portion.', [O.bread(3), O.wheat(8)]],
      ['Tell the truth', 'Walk straight; speak straight.', [O.walk(300), O.torches(2)]],
      ['Help the stuck', 'Pull thorns; push carts.', [O.walk(250), O.stone(8)]],
    ];
    const j = jobs[i % jobs.length];
    GQ('q-jat-' + i, -500 + i * 2, 'scroll', t + ': ' + j[0], j[1], j[2].map(o => ({ ...o })), 1);
  });
}
// ——— Ramayana, Mahabharata & Gita themes (epics retold gently) ———
{
  const ram = [
    [-1100, 'Exile Sandals', 'Walk the forest path kindly.', [O.walk(400), O.bread(2)]],
    [-1095, 'Sita’s Garden', 'Plant ashoka trees for the waiting.', [O.plant(8), O.seeds(10)]],
    [-1090, 'Jatayu’s Rest', 'Honor the fallen helper.', [O.stone(8), O.walk(200)]],
    [-1085, 'Bridge of Stones', 'Every stone carried counts.', [O.cobble(16), O.shore()]],
    [-1080, 'Return of the King', 'Light the whole city.', [O.torches(10), O.coal(8)]],
    [-1075, 'Sarayu Farewell', 'Give everything away.', [O.bread(4), O.walk(300)]],
  ];
  ram.forEach((r, i) => GQ('q-ram-' + i, r[0], 'scroll', r[1], r[2], r[3].map(o => ({ ...o })), 2));
  const gita = [
    'Do Your Duty', 'Act Without Clutching', 'Steady the Mind', 'See All Beings', 'Offer the Work',
    'Fearless Heart', 'Controlled Senses', 'The Wise See One', 'Serve Without Pride', 'Remember and Return',
    'Detached Hands', 'Even in Storm', 'Light of Lights', 'Field and Knower', 'Three Doors Refused',
    'Sattva Breakfast', 'Yoga of Eating', 'Neighbor as Self', 'Courageous Grief', 'The Chariot Stands',
    'Krishna’s Smile', 'Arjuna Rises', 'Bow Lowered', 'No Fruit Clutched', 'Present Moment',
    'Discipline Daily', 'Study the Self', 'Chant and Walk', 'Feed the Fire Within', 'Rest in Action',
  ];
  gita.forEach((t, i) => {
    const jobs = [
      ['Work as worship', 'Sweep, saw, and share.', [O.logs(10), O.bread(2)]],
      ['Feed the students', 'Cook for the whole school.', [O.bread(4), O.wheat(10)]],
      ['Walk the field', 'Inspect every furrow.', [O.walk(300), O.plant(6)]],
      ['Light the shrine', 'Keep every lamp full.', [O.torches(6), O.coal(6)]],
    ];
    const j = jobs[i % jobs.length];
    GQ('q-gita-' + i, -900 + i * 6, 'scroll', t + ': ' + j[0], j[1], j[2].map(o => ({ ...o })), 1);
  });
  const fest = [
    [-800, 'Festival of Lights', 'Light a hundred lamps.', [O.torches(10), O.coal(10)]],
    [-795, 'Colors of Spring', 'Grind pigments; share sweets.', [O.bread(3), O.seeds(10)]],
    [-790, 'Temple Stones', 'Carve one perfect block.', [O.stone(14), O.walk(200)]],
    [-785, 'Harvest Thanks', 'First sheaf to the shrine.', [O.wheat(14), O.plant(6)]],
    [-780, 'River Bath Steps', 'Scrub the ghats clean.', [O.walk(250), O.river()]],
    [-700, 'Chariot Wheels', 'Grease axles; feed oxen.', [O.wheat(10), O.walk(300)]],
    [-600, 'University Mango Grove', 'Copy one manuscript.', [O.walk(200), O.torches(4)]],
    [-500, 'Spice Boats', 'Load pepper for the monsoon run.', [O.walk(300), O.shore()]],
    [-400, 'Stepwell Dig', 'Cut stairs to the water.', [O.stone(16), O.river()]],
    [-300, 'Pillar Decree', 'Raise a lion-topped pillar.', [O.cobble(12), O.walk(200)]],
    [-200, 'Cave Prayer Hall', 'Chisel a quiet hall.', [O.stone(16), O.torches(6)]],
    [-100, 'Grand Tank', 'Line the temple pool.', [O.walk(250), O.river()]],
    [0, 'Sangam Crowd', 'Serve tea to pilgrims.', [O.bread(4), O.walk(300)]],
    [100, 'Bronze Pour', 'Cast one small bell.', [O.coal(8), O.stone(10)]],
    [200, 'Rock Fort', 'Haul stone uphill.', [O.stone(14), O.walk(300)]],
    [300, 'Zero Garden', 'Count stars; plant rows.', [O.seeds(12), O.walk(200)]],
    [400, 'Iron Pillar', 'Forge that never rusts.', [O.coal(10), O.stone(10)]],
    [500, 'Cave Temples', 'Paint one ceiling.', [O.torches(6), O.walk(200)]],
    [600, 'Tank Cascade', 'Link three village tanks.', [O.walk(350), O.river()]],
    [700, 'Shore Temple', 'Build where waves applaud.', [O.stone(14), O.shore()]],
  ];
  fest.forEach((f, i) => GQ('q-hind-' + i, f[0], 'scroll', f[1], f[2], f[3].map(o => ({ ...o })), 1));
}
// ——— Sikh Gurus (1469–1708, service-themed, reverent) ———
{
  const gurus = [
    ['Nanak', 1469], ['Angad', 1539], ['Amar Das', 1552], ['Ram Das', 1574], ['Arjan', 1581],
    ['Hargobind', 1606], ['Har Rai', 1644], ['Harkrishan', 1661], ['Tegh Bahadur', 1664], ['Gobind Singh', 1675],
  ];
  const deeds = [
    ['Free Kitchen', 'Cook for all who come.', [O.bread(4), O.wheat(12)]],
    ['Well Dug', 'Sweet water for the village.', [O.stone(12), O.river()]],
    ['Hymn Copied', 'Write one verse beautifully.', [O.walk(150), O.torches(4)]],
  ];
  gurus.forEach((g, i) => deeds.forEach((d, v) =>
    GQ('q-sikh-' + i + '-' + v, g[1] + v * 3, 'scroll', g[0] + ': ' + d[0], d[1], d[2].map(o => ({ ...o })), 1)));
}
// ——— Jain tirthankaras & Mahavira (non-harm themed) ———
{
  const names = ['Rishabha', 'Ajita', 'Sambhava', 'Abhinandana', 'Sumati', 'Padmaprabha', 'Suparshva', 'Chandraprabha',
    'Pushpadanta', 'Shitala', 'Shreyamsa', 'Vasupujya', 'Vimala', 'Ananta', 'Dharma', 'Shanti',
    'Kunthu', 'Ara', 'Malli', 'Munisuvrata', 'Nami', 'Nemi', 'Parshva', 'Mahavira'];
  const deeds = [
    ['Sweep the Path', 'Harm nothing underfoot.', [O.walk(300), O.seeds(8)]],
    ['Strain the Water', 'Drink gently; share more.', [O.river(), O.bread(2)]],
    ['Speak Softly', 'True words, few words.', [O.walk(200), O.wheat(8)]],
  ];
  names.forEach((nm, i) => {
    const d = deeds[i % deeds.length];
    GQ('q-jain-' + i, -800 + i * 12, 'scroll', nm + ': ' + d[0], d[1], d[2].map(o => ({ ...o })), 1);
  });
  for (let v = 0; v < 10; v++) {
    const jobs = [
      ['Five Vows Garden', 'Plant without killing.', [O.plant(8), O.seeds(10)]],
      ['Alms Bowl', 'Accept little; thank much.', [O.bread(2), O.walk(200)]],
    ];
    const j = jobs[v % jobs.length];
    GQ('q-mahav-' + v, -599 + v * 7, 'scroll', 'Mahavira: ' + j[0], j[1], j[2].map(o => ({ ...o })), 1);
  }
}
// ——— Zoroaster, Confucius, Laozi, Shinto ———
{
  const zoro = [
    [-1000, 'Good Thoughts', 'Think one kind thought hourly.', [O.walk(200), O.seeds(8)]],
    [-995, 'Good Words', 'Bless every worker by name.', [O.bread(2), O.walk(250)]],
    [-990, 'Good Deeds', 'Finish a neighbor’s wall.', [O.cobble(10), O.lay(6)]],
    [-985, 'Tend the Fire', 'Keep the temple flame fed.', [O.coal(10), O.torches(6)]],
    [-980, 'Care for Cattle', 'Water every herd at noon.', [O.river(), O.wheat(10)]],
    [-975, 'Till the Earth', 'Plow one more furrow.', [O.plant(8), O.seeds(10)]],
    [-970, 'Drive Out Lies', 'Mark true measures in stone.', [O.stone(10), O.walk(200)]],
    [-965, 'Bridge of Judgment', 'Build a bridge that holds.', [O.logs(12), O.lay(8)]],
  ];
  zoro.forEach((z, i) => GQ('q-zor-' + i, z[0], 'scroll', z[1], z[2], z[3].map(o => ({ ...o })), 1));
  const conf = [
    'Learn Daily', 'Honor Parents', 'Golden Rule', 'Ritual Bowls Polished', 'The Rectified Name',
    'Filial Piety', 'Study the Odes', 'The Gentleman Walks', 'Music Tuned', 'Rites at Dawn',
    'Question Everything', 'Teach the Poor Free', 'Archery Practice', 'Chariot Dust', 'Jade Pendant',
    'Ancestral Shrine Swept', 'The Mean Held', 'Sincerity First', 'Benevolent Tax', 'Farewell Lesson',
  ];
  conf.forEach((t, i) => {
    const jobs = [
      ['Copy the classic', 'Brush one scroll neatly.', [O.walk(150), O.torches(4)]],
      ['Serve the elders', 'Carry their firewood.', [O.logs(10), O.bread(2)]],
      ['Practice courtesy', 'Bow; pour tea; listen.', [O.bread(2), O.walk(200)]],
    ];
    const j = jobs[i % jobs.length];
    GQ('q-conf-' + i, -551 + i * 4, 'scroll', t + ': ' + j[0], j[1], j[2].map(o => ({ ...o })), 1);
  });
  const lao = [
    'The Uncarved Block', 'Water Wins', 'Empty the Cup', 'Valley Spirit', 'Do Without Doing',
    'Thirty Spokes', 'Dark Mirror', 'Return to Root', 'Soft Overcomes', 'Contentment Field',
    'Long View', 'Useful Emptiness',
  ];
  lao.forEach((t, i) => {
    const jobs = [
      ['Sit by water', 'Watch the river solve it.', [O.river(), O.walk(200)]],
      ['Leave it simple', 'One room, swept clean.', [O.walk(150), O.stone(8)]],
    ];
    const j = jobs[i % jobs.length];
    GQ('q-lao-' + i, -600 + i * 5, 'scroll', t + ': ' + j[0], j[1], j[2].map(o => ({ ...o })), 1);
  });
  const shinto = [
    [-660, 'First Shrine Gate', 'Raise cedar pillars.', [O.logs(14), O.lay(6)]],
    [-600, 'Rice Blessing', 'Plant the first row.', [O.plant(8), O.seeds(10)]],
    [-500, 'Purification Font', 'Scrub the stone basin.', [O.walk(200), O.river()]],
    [-400, 'Lantern Path', 'Line the approach with light.', [O.torches(10), O.stone(8)]],
    [-300, 'Sacred Rope', 'Twist straw into shimenawa.', [O.seeds(10), O.walk(150)]],
    [-200, 'Drum Festival', 'Beat time for the dance.', [O.walk(250), O.bread(2)]],
    [-100, 'Mirror Polished', 'Polish till the sun fits.', [O.walk(150), O.glass(4)]],
    [0, 'New Year Bells', 'Ring in the year kindly.', [O.torches(6), O.bread(3)]],
    [100, 'Tea Garden', 'Rake gravel; pour tea.', [O.walk(200), O.stone(8)]],
    [200, 'Paper Cranes', 'Fold a thousand wishes.', [O.seeds(12), O.walk(150)]],
    [300, 'Firefly Watch', 'Guard the river dark.', [O.river(), O.torches(2)]],
    [400, 'Moon Viewing', 'Share dumplings upstairs.', [O.bread(3), O.walk(200)]],
    [500, 'Snow Lanterns', 'Build light from snow.', [O.torches(6), O.walk(200)]],
    [600, 'Plum Blossoms', 'Plant an orchard row.', [O.plant(8), O.seeds(10)]],
    [700, 'Kite Wind', 'Fly prayers uphill.', [O.walk(300), O.seeds(8)]],
  ];
  shinto.forEach((s, i) => GQ('q-shin-' + i, s[0], 'scroll', s[1], s[2], s[3].map(o => ({ ...o })), 1));
}
// ——— Greek philosophers & Egyptian life ———
{
  const greeks = [
    ['Pythagoras', -530], ['Heraclitus', -500], ['Parmenides', -480], ['Socrates', -470], ['Plato', -428],
    ['Aristotle', -384], ['Diogenes', -412], ['Epicurus', -341], ['Zeno', -334], ['Hypatia', 360],
    ['Thales', -624], ['Anaximander', -610], ['Democritus', -460], ['Protagoras', -490], ['Gorgias', -485],
    ['Antisthenes', -445], ['Aristippus', -435], ['Pyrrho', -360], ['Cleanthes', -330], ['Chrysippus', -279],
  ];
  const deeds = [
    ['Ask better questions', 'Walk and argue kindly.', [O.walk(300), O.bread(2)]],
    ['Sweep the Lyceum', 'Order the scroll room.', [O.walk(150), O.torches(4)]],
  ];
  greeks.forEach((g, i) => {
    const d = deeds[i % deeds.length];
    GQ('q-grk-' + i, g[1], 'scroll', g[0] + ': ' + d[0], d[1], d[2].map(o => ({ ...o })), 1);
    const d2 = deeds[(i + 1) % deeds.length];
    GQ('q-grk2-' + i, g[1] + 4, 'scroll', g[0] + ': Olive Grove Duty', 'Tend the school garden.', d2[2].map(o => ({ ...o })), 1);
  });
  const egypt = [
    [-2600, 'Pyramid Bread Line', 'Feed ten thousand builders.', [O.bread(6), O.wheat(16)]],
    [-2500, 'Scribe School', 'Copy grain tallies neatly.', [O.walk(150), O.seeds(8)]],
    [-2400, 'Nile Gauge', 'Mark the flood height.', [O.walk(250), O.river()]],
    [-2300, 'Beer for Masons', 'Brew the daily ration.', [O.wheat(12), O.bread(3)]],
    [-2200, 'Obelisk Sled', 'Grease the runners.', [O.walk(300), O.stone(10)]],
    [-2100, 'Faience Kiln', 'Fire blue beads.', [O.coal(8), O.glass(4)]],
    [-2000, 'Suez Canal (Darius’)', 'Clear the reed channel.', [O.walk(300), O.river()]],
    [-1900, 'Granary Beetles', 'Seal jars against weevils.', [O.wheat(12), O.planks(6)]],
    [-1800, 'Faience Hippo', 'Mold one lucky hippo.', [O.walk(150), O.river()]],
    [-1700, 'Hyksos Horses', 'Muck the new stables.', [O.wheat(10), O.walk(200)]],
    [-1550, 'Valley Painters', 'Grind ochre for tombs.', [O.stone(10), O.torches(4)]],
    [-1400, 'Amarna Bread', 'Bake for the new city.', [O.bread(4), O.wheat(12)]],
    [-1300, 'Abu Simbel Shift', 'Haul at dawn only.', [O.stone(14), O.walk(300)]],
    [-1200, 'Sea Peoples Watch', 'Man the delta beacons.', [O.torches(8), O.shore()]],
    [-1100, 'Papyrus Rolls', 'Press sheets for taxes.', [O.walk(200), O.river()]],
    [-1000, 'Bast Festival', 'Feed every cat in town.', [O.bread(2), O.wheat(8)]],
    [-900, 'Sais Weavers', 'Loom linen for sails.', [O.seeds(10), O.walk(150)]],
    [-700, 'Kushite Granaries', 'Double the stores.', [O.wheat(14), O.planks(8)]],
    [-500, 'Alexandria Survey', 'Stake the grid straight.', [O.walk(400), O.shore()]],
    [-300, 'Lighthouse Crew', 'Polish the great mirror.', [O.glass(6), O.torches(6)]],
  ];
  egypt.forEach((e, i) => GQ('q-egy-' + i, e[0], 'scroll', e[1], e[2], e[3].map(o => ({ ...o })), 1));
}
// ——— Norse gods & Rome (myth as neighborly chores) ———
{
  const norse = [
    ['Thor', 'Goat Cart Grease', 'Feed Tanngrisnir first.', [O.wheat(10), O.walk(200)]],
    ['Odin', 'Rune Sticks', 'Carve, then give counsel.', [O.logs(10), O.walk(250)]],
    ['Freya', 'Cat Sled Bells', 'Brush the big cats.', [O.seeds(8), O.bread(2)]],
    ['Baldr', 'Mistletoe Watch', 'Pad every sharp corner.', [O.walk(200), O.lay(6)]],
    ['Tyr', 'Oath Ring', 'Keep one hard promise.', [O.walk(300), O.stone(8)]],
    ['Heimdall', 'Bridge Watch', 'Man the rainbow till dawn.', [O.torches(6), O.walk(200)]],
    ['Frigg', 'Cloud Spinning', 'Spin while the kids nap.', [O.seeds(10), O.bread(2)]],
    ['Idun', 'Orchard Apples', 'Pick for the whole hall.', [O.wheat(10), O.plant(6)]],
    ['Bragi', 'Long Song', 'Rhyme the crew’s names.', [O.bread(2), O.walk(250)]],
    ['Skadi', 'Ski Wax', 'Wax boards; pack fish.', [O.walk(300), O.bread(2)]],
    ['Freyr', 'Boar Bristles', 'Curry Gullinbursti.', [O.wheat(8), O.walk(150)]],
    ['Loki', 'Knot Untied', 'Fix what you tangled.', [O.walk(200), O.planks(6)]],
  ];
  norse.forEach((nr, i) => {
    GQ('q-nor-' + i, 800 + i * 20, 'scroll', nr[0] + ': ' + nr[1], nr[2], nr[3].map(o => ({ ...o })), 1);
    GQ('q-nor2-' + i, 810 + i * 20, 'scroll', nr[0] + ': Longhouse Repair', 'Thatch before the storm.', [O.logs(12), O.lay(8)].map(o => ({ ...o })), 1);
  });
  const rome = [
    [-753, 'Furrow of Romulus', 'Plow the first square.', [O.plant(8), O.seeds(10)]],
    [-700, 'Cloaca Crew', 'Clear the great drain.', [O.walk(250), O.river()]],
    [-600, 'Servian Wall', 'Stack tufa all summer.', [O.stone(16), O.walk(300)]],
    [-500, 'Republic Oath', 'Pave the forum true.', [O.cobble(12), O.lay(6)]],
    [-400, 'Aqueduct Level', 'Water must run downhill.', [O.walk(400), O.river()]],
    [-300, 'Appian Stones', 'Fit basalt like teeth.', [O.stone(14), O.walk(350)]],
    [-200, 'Grain Dole', 'Bread for the poor wards.', [O.bread(5), O.wheat(14)]],
    [-100, 'Marius’ Mules', 'Pack light; march far.', [O.walk(500), O.bread(3)]],
    [-50, 'Caesar’s Bridge', 'Span the Rhine in days.', [O.logs(14), O.lay(8)]],
    [0, 'Augustan Peace', 'Mend every milestone.', [O.walk(400), O.stone(8)]],
    [50, 'Colosseum Sand', 'Rake the arena smooth.', [O.walk(250), O.stone(10)]],
    [100, 'Trajan’s Column', 'Carve the story upward.', [O.stone(12), O.walk(200)]],
    [150, 'Galen’s Rounds', 'Boil bandages; wash hands.', [O.river(), O.bread(2)]],
    [200, 'Severan Wall', 'Patrol the cold frontier.', [O.walk(400), O.torches(6)]],
    [250, 'Catacomb Lamps', 'Light the buried chapel.', [O.torches(8), O.coal(8)]],
    [300, 'Diocletian’s Cabbages', 'Retire; garden gloriously.', [O.plant(10), O.seeds(12)]],
    [350, 'Constantine’s Arch', 'Scrub old reliefs gently.', [O.walk(200), O.stone(8)]],
    [400, 'Alaric’s Guests', 'Feed the city anyway.', [O.bread(4), O.wheat(12)]],
    [450, 'Patrick’s Bell', 'Ring over Irish hills.', [O.walk(350), O.torches(4)]],
    [476, 'Last Emperor’s Garden', 'Plant where eagles stood.', [O.plant(8), O.seeds(10)]],
    [500, 'Benedict’s Rule', 'Pray, work, read, repeat.', [O.bread(3), O.walk(250)]],
    [550, 'Hagia Dome', 'Hoist the great ring.', [O.logs(12), O.stone(10)]],
    [600, 'Gregory’s Singers', 'Teach the chant row by row.', [O.walk(200), O.bread(2)]],
    [650, 'Lindisfarne Ink', 'Mix oak-gall black.', [O.coal(6), O.walk(150)]],
    [700, 'Bede’s Calendar', 'Count Easter rightly.', [O.walk(200), O.torches(4)]],
    [750, 'Boniface Oak', 'Plant oaks, fell fear.', [O.plant(8), O.logs(10)]],
    [800, 'Charlemagne School', 'Every monk reads.', [O.walk(250), O.torches(6)]],
    [850, 'Cyril’s Alphabet', 'Letters for the Slavs.', [O.walk(300), O.seeds(8)]],
    [900, 'Alfred’s Cakes', 'Watch them this time.', [O.bread(3), O.coal(6)]],
    [1000, 'Leif’s Grapes', 'Mark the new shore.', [O.walk(400), O.shore()]],
  ];
  rome.forEach((r, i) => GQ('q-rom-' + i, r[0], 'scroll', r[1], r[2], r[3].map(o => ({ ...o })), 1));
}
// ——— Saints, scholars, reformers, servants (35–2020) ———
{
  const saints = [
    ['Mary', 35], ['Peter', 40], ['Paul', 45], ['John', 90], ['Clement', 96], ['Ignatius', 107],
    ['Polycarp', 150], ['Justin', 155], ['Irenaeus', 180], ['Perpetua', 203], ['Tertullian', 200],
    ['Origen', 220], ['Cyprian', 250], ['Anthony', 270], ['Nicholas', 300], ['Athanasius', 325],
    ['Martin', 360], ['Ambrose', 374], ['Jerome', 380], ['Augustine', 386], ['Monica', 387],
    ['Patrick', 432], ['Brigid', 470], ['Benedict', 500], ['Scholastica', 500], ['Columba', 563],
    ['Gregory', 590], ['Augustine of Canterbury', 597], ['Hilda', 657], ['Bede', 700], ['Boniface', 720],
    ['John of Damascus', 730], ['Charlemagne', 800], ['Cyril', 860], ['Methodius', 860], ['Alfred', 871],
    ['Olga', 957], ['Vladimir', 988], ['Anselm', 1093], ['Bernard', 1115], ['Hildegard', 1150],
    ['Francis', 1206], ['Clare', 1212], ['Dominic', 1216], ['Anthony of Padua', 1220], ['Elizabeth', 1228],
    ['Louis', 1244], ['Thomas Aquinas', 1250], ['Bonaventure', 1257], ['Catherine of Siena', 1370], ['Bridget', 1373],
    ['Julian of Norwich', 1390], ['Joan', 1429], ['Thomas More', 1500], ['Teresa of Avila', 1535], ['John of the Cross', 1560],
    ['Francis Xavier', 1541], ['Ignatius of Loyola', 1540], ['Philip Neri', 1550], ['Charles Borromeo', 1565], ['Vincent de Paul', 1600],
    ['Francis de Sales', 1602], ['Jane de Chantal', 1610], ['John Bunyan', 1660], ['Brother Lawrence', 1666], ['Fenelon', 1680],
    ['Zinzendorf', 1727], ['Wesley', 1738], ['Whitefield', 1740], ['Seraphim', 1800], ['Cure of Ars', 1818],
    ['Newman', 1845], ['Don Bosco', 1846], ['Nightingale', 1854], ['Livingstone', 1858], ['Muller', 1836],
    ['Hudson Taylor', 1865], ['Catherine Booth', 1865], ['Therese', 1888], ['Kolbe', 1941], ['Teresa of Calcutta', 1948],
    ['Romero', 1977], ['Tutu', 1980],
  ];
  const deeds = [
    ['Feed the Poor', 'Ladles up; sleeves up.', [O.bread(4), O.wheat(10)]],
    ['Tend the Sick', 'Boil water; sit vigil.', [O.river(), O.torches(4)]],
    ['Teach the Children', 'Alphabet by lamplight.', [O.torches(6), O.walk(200)]],
    ['Shelter Travelers', 'Beds, broth, blessing.', [O.planks(8), O.bread(3)]],
    ['Visit Prisoners', 'Walk there; stay long.', [O.walk(350), O.bread(2)]],
    ['Bury the Dead', 'Dig gently; mark kindly.', [O.stone(10), O.walk(250)]],
  ];
  saints.forEach((s, i) => {
    const d = deeds[i % deeds.length];
    GQ('q-saint-' + i, s[1], 'scroll', s[0] + ': ' + d[0], d[1], d[2].map(o => ({ ...o })), 1);
  });
  const scholars = [
    [820, 'Al-Khwarizmi: Algebra Garden', 'Count rows; solve for x.', [O.seeds(12), O.walk(200)]],
    [859, 'Fatima’s Library', 'Shelve ten thousand books.', [O.walk(300), O.planks(8)]],
    [936, 'Al-Zahrawi’s Tray', 'Boil every instrument.', [O.river(), O.coal(6)]],
    [980, 'Avicenna’s Rounds', 'Pulse, urine, patience.', [O.walk(350), O.bread(2)]],
    [1020, 'Alhazen’s Dark Room', 'Pinhole the sunlight.', [O.walk(150), O.glass(4)]],
    [1080, 'Omar’s Calendar', 'Count the true year.', [O.walk(200), O.seeds(8)]],
    [1126, 'Averroes’ Margin', 'Comment every page twice.', [O.walk(250), O.torches(4)]],
    [1200, 'Fibonacci Rabbits', 'Count; the pattern grows.', [O.wheat(12), O.seeds(10)]],
    [1244, 'Rumi’s Turn', 'Spin; then serve supper.', [O.bread(3), O.walk(300)]],
    [1270, 'Nasir’s Observatory', 'Chart one planet well.', [O.torches(6), O.walk(200)]],
    [1325, 'Ibn Battuta’s Sandals', 'Walk thirty years out.', [O.walk(600), O.bread(4)]],
    [1370, 'Ibn Khaldun’s Notes', 'Ask why cities rise.', [O.walk(300), O.planks(6)]],
    [1400, 'Gutenberg’s Proof', 'Ink the fiftieth page.', [O.coal(8), O.walk(150)]],
    [1440, 'Gutenberg Bible Run', 'Pull clean impressions.', [O.coal(8), O.planks(6)]],
    [1517, 'Luther’s Hammer', 'Nail truth; feed students.', [O.bread(3), O.walk(200)]],
    [1525, 'Tyndale’s Plowboy', 'English for everyone.', [O.walk(300), O.torches(4)]],
    [1543, 'Copernicus’ Circles', 'Watch the sky all year.', [O.torches(6), O.walk(250)]],
    [1600, 'Shakespeare’s Quills', 'Sharpen forty quills.', [O.walk(150), O.seeds(8)]],
    [1620, 'Mayflower Biscuit', 'Hard tack for all.', [O.bread(4), O.shore()]],
    [1687, 'Newton’s Apple', 'Catch it; weigh it.', [O.seeds(10), O.walk(200)]],
    [1769, 'Watt’s Kettle', 'Mind the steam gauge.', [O.coal(10), O.walk(200)]],
    [1796, 'Jenner’s Milkmaids', 'Carry the good news.', [O.walk(350), O.bread(2)]],
    [1825, 'Stephenson’s Line', 'Lay rails dead level.', [O.stone(14), O.walk(500)]],
    [1844, 'Morse Dots', 'Tap the line till dusk.', [O.torches(6), O.walk(250)]],
    [1859, 'Nightingale’s Lamp', 'Rounds at midnight.', [O.torches(8), O.river()]],
    [1869, 'Suez Cut', 'Dig with ten thousand.', [O.stone(12), O.walk(400)]],
    [1876, 'Bell’s Wire', 'String the first line.', [O.walk(300), O.planks(6)]],
    [1879, 'Edison’s Filament', 'Thirteen hours burning.', [O.torches(8), O.coal(8)]],
    [1903, 'Kitty Hawk Wind', 'Hold the wings level.', [O.walk(400), O.shore()]],
    [1915, 'Relativity Chalk', 'Fill the blackboard.', [O.walk(150), O.stone(8)]],
    [1928, 'Fleming’s Dish', 'Mind the mold; save millions.', [O.bread(2), O.walk(200)]],
    [1945, 'Penicillin Vats', 'Brew deep tanks.', [O.coal(8), O.river()]],
    [1953, 'Double Helix', 'Build the ladder twisted.', [O.walk(200), O.seeds(10)]],
    [1963, 'Dream Speech', 'Wash feet; march singing.', [O.walk(500), O.bread(3)]],
    [1969, 'Eagle Landing', 'Watch; do not blink.', [O.torches(4), O.walk(300)]],
    [1978, 'First Test Tube', 'Rock the cradle gently.', [O.bread(2), O.torches(4)]],
    [1989, 'Web Threads', 'Link every library.', [O.walk(300), O.glass(4)]],
    [1997, 'Mars Pebbles', 'Drive the little rover.', [O.walk(500), O.sand(10)]],
    [2008, 'CERN Spark', 'Mind the magnets.', [O.coal(10), O.walk(300)]],
    [2015, 'Photo of Light', 'Catch the first glow.', [O.glass(6), O.torches(4)]],
  ];
  scholars.forEach((s, i) => GQ('q-schol-' + i, s[0], 'scroll', s[1], s[2], s[3].map(o => ({ ...o })), 2));
}
// ——— Wayfarer gap-filler: no decade left without a helper ———
{
  const jobs = [
    ['Field Aid', 'Help bring the harvest in.', [O.wheat(10), O.plant(6)]],
    ['Barn Raising', 'Every hand lifts.', [O.logs(12), O.lay(8)]],
    ['Well Scrub', 'Clean stones; clear weeds.', [O.stone(8), O.river()]],
    ['Night Lamps', 'Light the village edge.', [O.torches(6), O.coal(6)]],
    ['Bread Oven', 'Fire bricks; bake big.', [O.bread(4), O.coal(8)]],
    ['Seed Keeper', 'Sort next spring’s hope.', [O.seeds(14), O.walk(150)]],
    ['Fence Mender', 'Walk the line; fix gaps.', [O.walk(350), O.lay(6)]],
    ['Fisher’s Net', 'Mend mesh by the tide.', [O.walk(250), O.shore()]],
    ['Quarry Hand', 'Carry, don’t drop.', [O.stone(12), O.walk(200)]],
    ['Charcoal Burner', 'Mind the mound’s smoke.', [O.coal(10), O.logs(8)]],
    ['Glass Blower', 'One breath, steady.', [O.glass(6), O.coal(6)]],
    ['Long Walk', 'Carry letters cross-country.', [O.walk(500), O.bread(2)]],
  ];
  const taken = new Set();
  for (const q of QUESTS) taken.add(q.year);
  for (const g of GEN) for (let y = g.year - 4; y <= g.year + 4; y++) taken.add(y);
  let n = 0;
  for (let y = -6000; y <= 2020; y += 6) {
    if (taken.has(y)) continue;
    const j = jobs[(n + Math.abs(y)) % jobs.length];
    GQ('q-way-' + y, y, 'wayfarer', j[0] + ' (' + (y < 0 ? -y + ' BC' : y) + ')', j[1], j[2].map(o => ({ ...o })), 1);
    taken.add(y);
    n++;
  }
}

export const GEN_QUESTS = GEN;
export const ALL_QUESTS = [...QUESTS, ...GEN_QUESTS];
