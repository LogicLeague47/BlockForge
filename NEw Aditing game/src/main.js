import * as THREE from 'three';
import { GRID, load, save, uid } from './save.js';
import { TOWERS, TROOPS, MAX_LVL, RAID_BASES, towerStats } from './balance.js';
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
    if (occ === 'th') { toast('🏰 Town Core — defend it!'); return; }
    selId = occ.id || null;
    toast(occ.type === 'wall' ? `🧱 Wall Lv${occ.level} — click another Wall Lv${occ.level} to merge` : `🗼 ${TOWERS[occ.type].name} Lv${occ.level} — click same tower to MERGE, empty tile to move`);
    renderDock(); return;
  }
  if (!tool) { toast('Pick a tower below, or click your towers to merge/move'); return; }
  // place new
  if (tool === 'wall') {
    if (state.gold < 25) return toast('Need 25 gold');
    state.gold -= 25;
    state.walls.push({ id: uid('w'), type: 'wall', level: 1, x: gx, z: gz });
  } else {
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
    btn(c, '🏳️ Retreat', () => { battle.stop(); battling = false; view.render(state); setWaveLabel('Base'); renderDock(); });
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
    const c = mk('🔨 Build (click tile)');
    for (const [k, v] of Object.entries(TOWERS)) {
      const pay = k === 'frost' ? `${v.cost}🧪` : `${v.cost}🪙`;
      btn(c, `${v.name} ${pay}`, () => { tool = k; selId = null; renderDock(); sfx.place(); }, { sel: tool === k });
    }
    btn(c, `🧱 Wall 25🪙`, () => { tool = 'wall'; selId = null; renderDock(); }, { sel: tool === 'wall' });
    const m = mk(selId ? 'Selected — merge / move' : 'Merge towers');
    btn(m, '✨ Auto-merge (M)', autoMergeTowers);
    btn(m, '🗑 Clear tool', () => { tool = null; selId = null; renderDock(); });
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

// ---------- battles ----------
function startDefend(n) {
  battling = true; renderDock();
  setWaveLabel(`Wave ${n}`);
  battle.startDefend(state, n);
  toast(`🌙 Wave ${n} — defend the Core!`);
  battle.onEnd = ({ win }) => {
    battling = false;
    if (win) {
      const gold = 120 + n * 45, tr = 8 + n * 2;
      state.gold += gold; state.elixir += 40 + n * 12; state.trophies += tr;
      state.wave = Math.max(state.wave, n);
      // heal base
      state.th.hp = 1200;
      sfx.star(); toast(`✅ Wave ${n} cleared! +${gold}🪙 +${tr}🏆`);
    } else {
      state.gold += 40; state.th.hp = 1200;
      sfx.lose(); toast('💀 Core fell — +40🪙 consolation. Merge & retry!');
    }
    view.render(state); setWaveLabel('Base'); persist();
  };
}

function startRaid(i) {
  const g = RAID_BASES[i];
  battling = true; renderDock();
  setWaveLabel(`Raid: ${g.name}`);
  battle.startRaid(g);
  toast(`⚔️ ${g.name} — click the map EDGE to drop ${raidTroop}s! (${battle.maxDeploy} max)`);
  battle.onEnd = ({ win, stars }) => {
    battling = false;
    if (win) {
      const tr = Math.round(g.trophies * (stars / 3));
      const gold = 150 + stars * 60;
      state.gold += gold; state.elixir += 60; state.trophies += tr; state.raidWins++;
      sfx.star(); toast(`🏆 ${'★'.repeat(stars)} Victory! +${gold}🪙 +${tr}🏆`);
    } else {
      state.gold += 30; sfx.lose(); toast('Lost the raid — +30🪙. Merge troops higher!');
    }
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
});

function persist() { save(state); setTopbar(state); view.render(state); renderDock(); }

// passive income + flag wave
setInterval(() => {
  if (!battling) { state.gold += 6; state.elixir += 3; setTopbar(state); save(state); }
}, 5000);

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
