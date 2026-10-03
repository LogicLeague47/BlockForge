import * as THREE from 'three';
import { GRID, load, save, uid } from './save.js';
import { TOWERS, TROOPS, MAX_LVL, RAID_BASES, towerStats, TH_LEVELS, MAX_TH, MINE_LEVELS, MAX_MINE, rollChestRarity, chestLoot, HERO } from './balance.js';
import { makeCamera, lights } from './camera.js';
import { BaseView } from './world.js';
import { Battle } from './battle.js';
import { toast, setTopbar, setWaveLabel } from './ui.js';
import { sfx } from './audio.js';

let state = load();
let mode = 'build';
let tool = null;          // build tool: tower type or 'wall'
let selId = null;         // selected building id (build merge/move)
let raidTroop = 'grunt';  // raid deploy selection
let battling = false;
let heroReadyAt = 0;      // timestamp ms when hero off cooldown

// offline income (capped 8h)
(function offline() {
  const now = Date.now();
  const elapsed = Math.min(8 * 3600, Math.max(0, (now - (state.lastSeen || now)) / 1000));
  if (elapsed > 60) {
    const rate = MINE_LEVELS[state.mineLevel || 1] || MINE_LEVELS[1];
    const ticks = Math.floor(elapsed / 5);
    const g = ticks * rate.gold, e = ticks * rate.elixir;
    if (g > 0) {
      state.gold += g; state.elixir += e;
      setTimeout(() => toast(`🎁 Welcome back! Mines earned +${g}🪙 +${e}🧪`), 1200);
    }
  }
  state.lastSeen = now;
})();

const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0e1420);
lights(scene);
const { camera, ctl } = makeCamera(renderer, GRID);
const view = new BaseView(scene);
const battle = new Battle(scene, view);
view.render(state);

const ray = new THREE.Raycaster();
const ptr = new THREE.Vector2();
let downPos = null;
canvas.addEventListener('pointerdown', e => { downPos = [e.clientX, e.clientY]; });
canvas.addEventListener('pointerup', e => {
  if (!downPos) return;
  const dx = e.clientX - downPos[0], dy = e.clientY - downPos[1];
  downPos = null;
  if (dx * dx + dy * dy > 36) return; // was orbit drag
  if (e.button === 2) return;
  handleClick(e);
});
canvas.addEventListener('contextmenu', e => e.preventDefault());
canvas.addEventListener('pointermove', e => {
  ptr.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
  ray.setFromCamera(ptr, camera);
  const c = view.pickCell(ray);
  view.highlight(c?.gx, c?.gz);
});

function occupied(gx, gz) {
  if (state.th.x === gx && state.th.z === gz) return 'th';
  return state.towers.find(t => t.x === gx && t.z === gz) || state.walls.find(w => w.x === gx && w.z === gz);
}

function handleClick(e) {
  ptr.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
  ray.setFromCamera(ptr, camera);
  const c = view.pickCell(ray);
  if (!c) return;
  if (battling && mode === 'raid') { tryDeploy(c); return; }
  if (battling) return;
  if (mode === 'build') buildClick(c);
}

function buildClick({ gx, gz }) {
  const occ = occupied(gx, gz);
  // merge/move with selection
  if (selId) {
    const sel = [...state.towers].find(t => t.id === selId);
    if (sel && occ && occ.id !== selId && occ.type === sel.type && occ.level === sel.level && occ.level < MAX_LVL) {
      // MERGE: keep selected, consume clicked
      state.towers = state.towers.filter(t => t.id !== occ.id);
      sel.level++; selId = null;
      state.gold = Math.max(0, state.gold - 10);
      sfx.merge(); toast(`✨ Merged to ${TOWERS[sel.type].name} Lv${sel.level}! Power x${Math.pow(2, sel.level - 1).toFixed(1)}`);
      persist(); return;
    }
    if (!occ && sel) { sel.x = gx; sel.z = gz; selId = null; sfx.place(); persist(); return; }
    selId = null;
    if (occ && occ.id) { selId = occ.id; renderDock(); return; }
    persist(); return;
  }
  if (occ) {
    if (occ === 'th') {
      const cfg = TH_LEVELS[state.thLevel || 1];
      toast(`🏰 Town Core Lv${state.thLevel} — HP ${cfg.hp}, cap ${cfg.towerCap} towers. Upgrade in Build menu!`);
      return;
    }
    selId = occ.id || null;
    toast(occ.type === 'wall' ? `🧱 Wall Lv${occ.level} — click another Wall Lv${occ.level} to merge` : `🗼 ${TOWERS[occ.type].name} Lv${occ.level} — click same tower to MERGE, empty tile to move`);
    renderDock(); return;
  }
  if (!tool) { toast('Pick a tower below, or click your towers to merge/move'); return; }
  // place new (TH caps enforced)
  const cap = (TH_LEVELS[state.thLevel || 1] || TH_LEVELS[1]).towerCap;
  const wcap = (TH_LEVELS[state.thLevel || 1] || TH_LEVELS[1]).wallCap;
  if (tool === 'wall') {
    if (state.walls.length >= wcap) return toast(`Wall cap ${wcap} — upgrade TH!`);
    if (state.gold < 25) return toast('Need 25 gold');
    state.gold -= 25;
    state.walls.push({ id: uid('w'), type: 'wall', level: 1, x: gx, z: gz });
  } else {
    if (state.towers.length >= cap) return toast(`Tower cap ${cap} — upgrade TH!`);
    const unlocked = new Set((TH_LEVELS[state.thLevel || 1] || TH_LEVELS[1]).unlocks);
    if (!unlocked.has(tool)) return toast('Upgrade Town Hall to unlock this tower!');
    const cost = TOWERS[tool].cost;
    const payElixir = tool === 'frost';
    if (payElixir && state.elixir < cost) return toast('Need elixir');
    if (!payElixir && state.gold < cost) return toast('Need gold');
    payElixir ? state.elixir -= cost : state.gold -= cost;
    state.towers.push({ id: uid('t'), type: tool, level: 1, x: gx, z: gz });
  }
  sfx.place(); persist();
}

function tryDeploy({ gx, gz }) {
  const lvl = bestTroopLevel(raidTroop);
  if (!lvl) return toast('No troops! Go to Raid menu → Recruit');
  // consume one
  if (!consumeTroop(raidTroop, lvl)) return toast('No troops left');
  const ok = battle.deployAt(raidTroop, lvl, gx, gz);
  if (!ok) { refundTroop(raidTroop, lvl); return toast('Deploy on the glowing edge ring!'); }
  persist();
}

function bestTroopLevel(type) {
  const bag = state.army[type] || {};
  for (let l = MAX_LVL; l >= 1; l--) if ((bag[l] || 0) > 0) return l;
  return 0;
}
function consumeTroop(type, lvl) {
  if ((state.army[type]?.[lvl] || 0) <= 0) return false;
  state.army[type][lvl]--;
  return true;
}
function refundTroop(type, lvl) { state.army[type][lvl]++; }

// ---------- dock ----------
const dock = document.getElementById('dock');
function renderDock() {
  dock.innerHTML = '';
  const mk = (title, parent) => {
    const d = document.createElement('div'); d.className = 'card';
    d.innerHTML = `<h4>${title}</h4>`; (parent || dock).appendChild(d); return d;
  };
  const btn = (parent, label, fn, opts = {}) => {
    const b = document.createElement('button'); b.textContent = label;
    if (opts.sel) b.classList.add('sel');
    if (opts.disabled) b.disabled = true;
    b.onclick = fn; parent.appendChild(b); return b;
  };
  if (battling) {
    const c = mk(mode === 'defend' ? '🌙 Wave running…' : `⚔️ Raid — deploy ${raidTroop} on edge`);
    btn(c, '🏳️ Retreat', () => { battle.stop(); battling = false; hideHero(); view.render(state); setWaveLabel('Base'); renderDock(); });
    btn(c, '☄️ STARFALL (H)', fireHero);
    if (mode === 'raid') {
      const t = mk('Deploy');
      for (const k of Object.keys(TROOPS)) {
        const n = Object.entries(state.army[k] || {}).reduce((a, [l, c]) => a + c, 0);
        btn(t, `${k} x${n}`, () => { raidTroop = k; renderDock(); }, { sel: raidTroop === k });
      }
    }
    return;
  }
  if (mode === 'build') {
    const thC = TH_LEVELS[state.thLevel || 1], thN = TH_LEVELS[Math.min(MAX_TH, (state.thLevel || 1) + 1)];
    const h = mk(`🏰 Town Hall Lv${state.thLevel || 1} (cap ${thC.towerCap} towers)`);
    if ((state.thLevel || 1) < MAX_TH) btn(h, `⬆ TH → Lv${(state.thLevel || 1) + 1} ${thN.costGold}🪙 ${thN.costElixir}🧪 ${thN.timeSec}s`, startTHUpgrade, { disabled: builderBusy() });
    else h.innerHTML += `<div style="font-size:12px;opacity:.8">MAXED 👑</div>`;
    const mi = MINE_LEVELS[state.mineLevel || 1];
    const mיקה = mk(`⛏️ Mine Lv${state.mineLevel || 1} (+${mi.gold}🪙/5s)`);
    if ((state.mineLevel || 1) < MAX_MINE) {
      const nx = MINE_LEVELS[(state.mineLevel || 1) + 1];
      btn(mיקה, `⬆ Mine → Lv${(state.mineLevel || 1) + 1} ${nx.costGold}🪙`, startMineUpgrade, { disabled: builderBusy() });
    }
    if (builderBusy()) {
      const b = mk('🔨 Builder');
      b.innerHTML += `<div style="font-size:12px">${builderLabel()}</div>`;
      btn(b, '⚡ Finish now (🧪)', finishBuilderNow);
    }
    const c = mk('🔨 Build (click tile)');
    const unlocked = new Set(thC.unlocks);
    for (const [k, v] of Object.entries(TOWERS)) {
      if (!unlocked.has(k)) { btn(c, `${v.name} 🔒 TH${Object.entries(TH_LEVELS).find(([, t]) => t.unlocks.includes(k))[0]}`, () => toast('Upgrade Town Hall to unlock!'), { disabled: true }); continue; }
      const pay = k === 'frost' ? `${v.cost}🧪` : `${v.cost}🪙`;
      btn(c, `${v.name} ${pay}`, () => { tool = k; selId = null; renderDock(); sfx.place(); }, { sel: tool === k });
    }
    btn(c, `🧱 Wall 25🪙`, () => { tool = 'wall'; selId = null; renderDock(); }, { sel: tool === 'wall' });
    const m = mk(selId ? 'Selected — merge / move' : 'Merge towers');
    btn(m, '✨ Auto-merge (M)', autoMergeTowers);
    btn(m, '🗑 Clear tool', () => { tool = null; selId = null; renderDock(); });
    const ch = mk(`🎁 War chests (${state.chests.length})`);
    if (!state.chests.length) ch.innerHTML += `<div style="font-size:12px;opacity:.75">Win waves/raids to earn. Pity: Epic every 10.</div>`;
    for (const chest of state.chests) btn(ch, `Open ${chest.rarity}`, () => openChest(chest.id));
    const a = mk('Barracks — merge troops');
    for (const k of Object.keys(TROOPS)) {
      const bag = state.army[k] || {};
      const txt = Object.entries(bag).map(([l, n]) => n ? `L${l}x${n}` : '').filter(Boolean).join(' ') || '—';
      btn(a, `${k}: ${txt} → merge`, () => mergeTroops(k));
    }
  } else if (mode === 'defend') {
    const next = Math.min(8, state.wave + 1);
    const c = mk(`🌙 Swarm Nights — cleared ${state.wave}/8`);
    btn(c, next > 8 ? 'All cleared! Replay N8' : `▶ Start Wave ${next}`, () => startDefend(next));
    const t = mk('Tip');
    t.innerHTML += `<div style="font-size:12px;opacity:.8">Merge towers first. Frost slows brutes. Cannons splash packs.</div>`;
  } else {
    const c = mk('⚔️ Raid ghosts (you deploy!)');
    RAID_BASES.forEach((g, i) => btn(c, `${g.name} +${g.trophies}🏆`, () => startRaid(i)));
    const a = mk('Barracks');
    for (const k of Object.keys(TROOPS)) {
      const bag = state.army[k] || {};
      const n = Object.values(bag).reduce((x, y) => x + y, 0);
      btn(a, `Recruit ${k} (${TROOPS[k].cost}🪙) x${n}`, () => recruit(k));
    }
    const m = mk('Merge troops → rank');
    for (const k of Object.keys(TROOPS)) btn(m, `✨ Merge ${k}`, () => mergeTroops(k));
  }
}

function autoMergeTowers() {
  for (const t of [...state.towers]) {
    const mate = state.towers.find(o => o.id !== t.id && o.type === t.type && o.level === t.level && t.level < MAX_LVL);
    if (mate) {
      state.towers = state.towers.filter(x => x.id !== mate.id);
      t.level++; sfx.merge();
      toast(`✨ ${TOWERS[t.type].name} → Lv${t.level}`);
      persist(); return;
    }
  }
  // walls too
  for (const w of [...state.walls]) {
    const mate = state.walls.find(o => o.id !== w.id && o.level === w.level && w.level < MAX_LVL);
    if (mate) {
      state.walls = state.walls.filter(x => x.id !== mate.id);
      w.level++; sfx.merge(); toast(`✨ Wall → Lv${w.level}`); persist(); return;
    }
  }
  toast('No mergeable pair — need 2x same type + level');
}

function mergeTroops(type) {
  const bag = state.army[type] || (state.army[type] = {});
  for (let l = 1; l < MAX_LVL; l++) {
    if ((bag[l] || 0) >= 3) {
      bag[l] -= 3; bag[l + 1] = (bag[l + 1] || 0) + 1;
      sfx.merge(); toast(`✨ ${type} L${l}x3 → L${l + 1}! Raid power up = more 🏆`);
      persist(); return;
    }
  }
  toast(`Need 3x same ${type} level to merge`);
}

function recruit(type) {
  const cost = TROOPS[type].cost;
  if (state.gold < cost) return toast('Need gold — clear a wave!');
  state.gold -= cost;
  const bag = state.army[type] || (state.army[type] = {});
  bag[1] = (bag[1] || 0) + 1;
  sfx.coin(); persist();
}

// ---------- P1: builders / TH / mine ----------
function builderBusy() { return !!(state.builder && state.builder.finishesAt > Date.now()); }
function builderLabel() {
  if (!state.builder) return null;
  const s = Math.max(0, Math.ceil((state.builder.finishesAt - Date.now()) / 1000));
  const nm = state.builder.kind === 'th' ? `TH → Lv${state.builder.toLevel}` : `Mine → Lv${state.builder.toLevel}`;
  return `🔨 ${nm} — ${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}
function tickBuilder() {
  if (state.builder && state.builder.finishesAt <= Date.now()) {
    const b = state.builder; state.builder = null;
    if (b.kind === 'th') {
      state.thLevel = b.toLevel;
      state.th.hp = (TH_LEVELS[state.thLevel] || TH_LEVELS[1]).hp;
      sfx.build(); toast(`🏰 Town Hall Lv${state.thLevel}! Unlocked: ${TH_LEVELS[state.thLevel].unlocks.join(', ')}`);
    } else if (b.kind === 'mine') {
      state.mineLevel = b.toLevel;
      sfx.build(); toast(`⛏️ Mine Lv${state.mineLevel}! Income up`);
    }
    persist();
  }
  const el = document.getElementById('builderbar');
  if (el) {
    const l = builderLabel();
    el.style.display = l ? 'block' : 'none';
    if (l) el.textContent = l + ' • finish now with 🧪';
  }
  const hb = document.getElementById('herobtn');
  if (hb && battling) {
    const left = Math.max(0, Math.ceil((heroReadyAt - Date.now()) / 1000));
    hb.disabled = left > 0;
    hb.textContent = left > 0 ? `☄️ Starfall ${left}s` : '☄️ STARFALL (H)';
  }
}
function startTHUpgrade() {
  const next = (state.thLevel || 1) + 1;
  if (next > MAX_TH) return toast('TH maxed!');
  if (builderBusy()) return toast('Builder busy — tap builder bar to finish with 🧪');
  const cfg = TH_LEVELS[next];
  if (state.gold < cfg.costGold || state.elixir < cfg.costElixir) return toast(`Need ${cfg.costGold}🪙 ${cfg.costElixir}🧪`);
  state.gold -= cfg.costGold; state.elixir -= cfg.costElixir;
  state.builder = { kind: 'th', toLevel: next, finishesAt: Date.now() + cfg.timeSec * 1000 };
  sfx.build(); toast(`🔨 TH upgrading → Lv${next} (${cfg.timeSec}s)`); persist();
}
function startMineUpgrade() {
  const next = (state.mineLevel || 1) + 1;
  if (next > MAX_MINE) return toast('Mine maxed!');
  if (builderBusy()) return toast('Builder busy');
  const cfg = MINE_LEVELS[next];
  if (state.gold < cfg.costGold || state.elixir < cfg.costElixir) return toast(`Need ${cfg.costGold}🪙 ${cfg.costElixir}🧪`);
  state.gold -= cfg.costGold; state.elixir -= cfg.costElixir;
  state.builder = { kind: 'mine', toLevel: next, finishesAt: Date.now() + cfg.timeSec * 1000 };
  sfx.build(); persist();
}
function finishBuilderNow() {
  if (!state.builder) return;
  const left = Math.max(1, Math.ceil((state.builder.finishesAt - Date.now()) / 1000));
  const cost = Math.ceil(left / 10);
  if (state.elixir < cost) return toast(`Need ${cost}🧪 to finish now`);
  state.elixir -= cost;
  state.builder.finishesAt = Date.now();
  tickBuilder();
}

// ---------- P1: war chests ----------
function earnChest() {
  const rarity = rollChestRarity(state.pity || 0);
  state.pity = rarity === 'Common' || rarity === 'Rare' ? (state.pity || 0) + 1 : 0;
  state.chests.push({ id: uid('c'), rarity });
  if (state.chests.length > 12) state.chests.shift();
  toast(`🎁 War chest earned: ${rarity}! Open it in Build → Chests`);
}
function openChest(id) {
  const i = state.chests.findIndex(c => c.id === id);
  if (i < 0) return;
  const [c] = state.chests.splice(i, 1);
  const loot = chestLoot(c.rarity);
  state.gold += loot.gold; state.elixir += loot.elixir;
  const types = Object.keys(TROOPS);
  for (let k = 0; k < loot.troops; k++) {
    const t = types[Math.floor(Math.random() * types.length)];
    const bag = state.army[t] || (state.army[t] = {});
    const lv = Math.min(MAX_LVL, loot.troopLvl);
    bag[lv] = (bag[lv] || 0) + 1;
  }
  sfx.chest();
  toast(`🎁 ${c.rarity} chest: +${loot.gold}🪙 +${loot.elixir}🧪 +${loot.troops}x L${loot.troopLvl} troops!`);
  persist();
}

// ---------- P1: hero ----------
function fireHero() {
  if (!battling) return;
  if (Date.now() < heroReadyAt) return toast('Starfall recharging…');
  const hits = battle.heroStrike(state.heroLevel || 1);
  heroReadyAt = Date.now() + HERO.cooldownSec * 1000;
  toast(`☄️ STARFALL! ${hits} targets smashed`);
  tickBuilder();
}

// ---------- battles ----------
function showHero() {
  let hb = document.getElementById('herobtn');
  if (!hb) {
    hb = document.createElement('button');
    hb.id = 'herobtn';
    document.getElementById('app').appendChild(hb);
    hb.onclick = fireHero;
  }
  hb.style.display = 'block';
  heroReadyAt = Date.now() + 3000; // 3s grace at battle start
}
function hideHero() { const hb = document.getElementById('herobtn'); if (hb) hb.style.display = 'none'; }
function fullTHHp() { return (TH_LEVELS[state.thLevel || 1] || TH_LEVELS[1]).hp; }
function startDefend(n) {
  battling = true; renderDock(); showHero();
  setWaveLabel(`Wave ${n}`);
  battle.startDefend(state, n);
  toast(`🌙 Wave ${n} — defend the Core!`);
  battle.onEnd = ({ win }) => {
    battling = false; hideHero();
    if (win) {
      const gold = 120 + n * 45, tr = 8 + n * 2;
      state.gold += gold; state.elixir += 40 + n * 12; state.trophies += tr;
      state.wave = Math.max(state.wave, n);
      // heal base to TH max
      state.th.hp = fullTHHp();
      earnChest();
      sfx.star(); toast(`✅ Wave ${n} cleared! +${gold}🪙 +${tr}🏆 +🎁 chest`);
    } else {
      state.gold += 40; state.th.hp = fullTHHp();
      sfx.lose(); toast('💀 Core fell — +40🪙 consolation. Merge & retry!');
    }
    view.render(state); setWaveLabel('Base'); persist();
  };
}

function startRaid(i) {
  const g = RAID_BASES[i];
  battling = true; renderDock(); showHero();
  setWaveLabel(`Raid: ${g.name}`);
  battle.startRaid(g);
  toast(`⚔️ ${g.name} — click the map EDGE to drop ${raidTroop}s! (${battle.maxDeploy} max)`);
  battle.onEnd = ({ win, stars }) => {
    battling = false; hideHero();
    if (win) {
      const tr = Math.round(g.trophies * (stars / 3));
      const gold = 150 + stars * 60;
      state.gold += gold; state.elixir += 60; state.trophies += tr; state.raidWins++;
      if (stars >= 1) earnChest();
      sfx.star(); toast(`🏆 ${'★'.repeat(stars)} Victory! +${gold}🪙 +${tr}🏆${stars >= 1 ? ' +🎁' : ''}`);
    } else {
      state.gold += 30; sfx.lose(); toast('Lost the raid — +30🪙. Merge troops higher!');
    }
    state.th.hp = fullTHHp();
    view.render(state); setWaveLabel('Base'); persist();
  };
}

// ---------- chrome ----------
document.querySelectorAll('#modebar button').forEach(b => {
  b.onclick = () => {
    if (battling) return toast('Finish or Retreat first');
    document.querySelectorAll('#modebar button').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    mode = b.dataset.mode;
    view.render(state);
    renderDock();
  };
});
addEventListener('keydown', e => {
  if (e.key === 'm' || e.key === 'M') { mode === 'build' && !battling ? autoMergeTowers() : mergeTroops(raidTroop); }
  if (e.key === 'h' || e.key === 'H') fireHero();
});

function persist() {
  state.lastSeen = Date.now();
  save(state); setTopbar(state); view.render(state); renderDock(); tickBuilder();
}

// builder bar element (tap to finish with elixir)
(function builderBar() {
  const el = document.createElement('div');
  el.id = 'builderbar';
  el.style.display = 'none';
  el.onclick = finishBuilderNow;
  document.getElementById('app').appendChild(el);
})();

// passive income (mine-scaled) + builder tick + hero cooldown
setInterval(() => {
  tickBuilder();
  if (!battling) {
    const rate = MINE_LEVELS[state.mineLevel || 1] || MINE_LEVELS[1];
    state.gold += rate.gold; state.elixir += rate.elixir;
    setTopbar(state); save(state);
  }
}, 5000);
setInterval(tickBuilder, 500);

const clock = new THREE.Clock();
function loop() {
  requestAnimationFrame(loop);
  const dt = Math.min(0.05, clock.getDelta());
  ctl.update();
  if (view.mine) view.mine.rotation.y += dt;
  if (view.thMesh?.userData.flag) view.thMesh.userData.flag.position.y = 3.9 + Math.sin(performance.now() / 400) * 0.06;
  if (battling) battle.update(dt, state);
  // spin frost crystals
  view.group.traverse(o => { if (o.name === 'crystal') o.rotation.y += dt * 2; });
  renderer.render(scene, camera);
}
setTopbar(state); renderDock(); persist(); loop();
