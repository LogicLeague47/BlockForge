// STARFALL VANGUARD — a LogicLeague game.
// Top-down arena roguelite: steer, auto-weapons, vacuum cores, stack mods.
(function() {
'use strict';

// ---------- BlockForge offshoot identity (same-origin localStorage) ----------
var BF_HERO = '';
try {
  BF_HERO = localStorage.getItem('bf_player_name')
    || localStorage.getItem('bf_login_user')
    || localStorage.getItem('bf_cg_username') || '';
} catch (e) {}
var BF_DEV = (BF_HERO || '').trim().toLowerCase() === 'logicleague';

// ---------- tiny helpers ----------
function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
function dist2(ax, ay, bx, by) { var dx = ax - bx, dy = ay - by; return dx * dx + dy * dy; }
function hash2(x, y) {
  var h = (x * 374761393 + y * 668265263) | 0;
  h = (h ^ (h >> 13)) * 1274126177;
  return ((h ^ (h >> 16)) >>> 0) / 4294967295;
}
function fmtTime(t) {
  var m = Math.floor(t / 60), s = Math.floor(t % 60);
  return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
}

// ---------- canvas ----------
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var DPR = 1, W = 0, H = 0;
function resize() {
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  W = window.innerWidth; H = window.innerHeight;
  canvas.width = Math.floor(W * DPR);
  canvas.height = Math.floor(H * DPR);
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
}
window.addEventListener('resize', resize);
resize();

// ---------- input ----------
var keys = {};
window.addEventListener('keydown', function(e) {
  keys[e.code] = true;
  if (e.code === 'Escape' || e.code === 'KeyP') togglePause();
  if (e.code === 'KeyM') toggleMute();
  if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].indexOf(e.code) >= 0) e.preventDefault();
});
window.addEventListener('keyup', function(e) { keys[e.code] = false; });
document.addEventListener('contextmenu', function(e) { e.preventDefault(); });

var touch = { active: false, ox: 0, oy: 0, dx: 0, dy: 0, id: null };
var stickEl = document.createElement('div');
stickEl.id = 'touch-stick';
stickEl.innerHTML = '<div id="touch-knob"></div>';
document.body.appendChild(stickEl);
canvas.addEventListener('touchstart', function(e) {
  e.preventDefault();
  STAR_Audio.unlock();
  var t = e.changedTouches[0];
  touch.active = true; touch.id = t.identifier;
  touch.ox = t.clientX; touch.oy = t.clientY; touch.dx = 0; touch.dy = 0;
  stickEl.style.display = 'block';
  stickEl.style.left = (t.clientX - 55) + 'px';
  stickEl.style.top = (t.clientY - 55) + 'px';
}, { passive: false });
canvas.addEventListener('touchmove', function(e) {
  e.preventDefault();
  for (var i = 0; i < e.changedTouches.length; i++) {
    var t = e.changedTouches[i];
    if (t.identifier !== touch.id) continue;
    var dx = t.clientX - touch.ox, dy = t.clientY - touch.oy;
    var d = Math.hypot(dx, dy), max = 60;
    if (d > max) { dx = dx / d * max; dy = dy / d * max; }
    touch.dx = dx / max; touch.dy = dy / max;
    var knob = document.getElementById('touch-knob');
    if (knob) knob.style.transform = 'translate(' + dx * 0.6 + 'px,' + dy * 0.6 + 'px)';
  }
}, { passive: false });
function touchEnd(e) {
  for (var i = 0; i < e.changedTouches.length; i++) {
    if (e.changedTouches[i].identifier === touch.id) {
      touch.active = false; touch.dx = 0; touch.dy = 0;
      stickEl.style.display = 'none';
      var knob = document.getElementById('touch-knob');
      if (knob) knob.style.transform = '';
    }
  }
}
canvas.addEventListener('touchend', touchEnd);
canvas.addEventListener('touchcancel', touchEnd);

function inputVec() {
  var mx = 0, my = 0;
  if (keys.KeyW || keys.ArrowUp) my -= 1;
  if (keys.KeyS || keys.ArrowDown) my += 1;
  if (keys.KeyA || keys.ArrowLeft) mx -= 1;
  if (keys.KeyD || keys.ArrowRight) mx += 1;
  if (touch.active && (touch.dx || touch.dy)) { mx = touch.dx; my = touch.dy; }
  var l = Math.hypot(mx, my);
  if (l > 1) { mx /= l; my /= l; }
  return { x: mx, y: my };
}

// ---------- game state ----------
var state = 'menu'; // menu | play | levelup | pause | over
var player, enemies, bolts, missiles, cores, parts, floats, rings, shooters, ebullets, zaps;
var camX = 0, camY = 0, shake = 0, shootT = 3, hurtT = 0;
var lastBossLv = 0, activeBoss = null;
var elapsed = 0, kills = 0, spawnT = 0, eliteT = 45;
var pendingLevels = 0;

var BEST_KEY = 'starfall_best';
function loadBest() {
  try { return JSON.parse(localStorage.getItem(BEST_KEY) || 'null'); } catch (e) { return null; }
}
function saveBest(b) {
  try { localStorage.setItem(BEST_KEY, JSON.stringify(b)); } catch (e) {}
}

function newRun() {
  player = {
    x: 0, y: 0, vx: 0, vy: 0, face: -Math.PI / 2,
    hp: 100, maxhp: 100, level: 1, xp: 0, xpNext: xpFor(1),
    speed: 175, magnet: 90, armor: 0, regen: 0, might: 1,
    crit: 0, leech: 0, cdr: 0,
    iframes: 0,
    weapons: { blaster: 1, orbit: BF_DEV ? 1 : 0, missiles: 0, tesla: 0 },
    orbitA: 0, fireT: 0, misT: 0, tesT: 0,
  };
  enemies = []; bolts = []; missiles = []; cores = []; parts = []; floats = []; rings = []; shooters = []; ebullets = []; zaps = [];
  lastBossLv = 0; activeBoss = null;
  camX = 0; camY = 0; shake = 0;
  elapsed = 0; kills = 0; spawnT = 1.2; eliteT = 45; pendingLevels = 0;
}
function xpFor(lv) { return Math.floor(5 + lv * 3.6 + lv * lv * 0.55); }

// ---------- enemy types ----------
var ETYPES = {
  drifter:  { hp: 4,  spd: 55, r: 12, dmg: 8,  xp: 1, col: '#8a8f9a' },
  dart:     { hp: 3,  spd: 120, r: 9, dmg: 10, xp: 1, col: '#f08018' },
  splitter: { hp: 14, spd: 45, r: 16, dmg: 12, xp: 3, col: '#3ec850' },
  mite:     { hp: 2,  spd: 95, r: 7,  dmg: 6,  xp: 1, col: '#7fe880' },
  brute:    { hp: 90, spd: 38, r: 26, dmg: 22, xp: 8, col: '#a04ae0' },
  // ---- bosses (scheduled every 5 levels, to 150) ----
  matriarch:{ hp: 160, spd: 34, r: 24, dmg: 18, xp: 15, col: '#27b84e', boss: 'Matriarch' },
  voltwing: { hp: 130, spd: 95, r: 15, dmg: 16, xp: 15, col: '#ffd23d', boss: 'Voltwing' },
  aegis:    { hp: 260, spd: 30, r: 24, dmg: 20, xp: 18, col: '#3aa8e8', boss: 'Aegis' },
  hex:      { hp: 90,  spd: 105, r: 13, dmg: 14, xp: 12, col: '#e84aa0', boss: 'Hex' },
  voidlord: { hp: 420, spd: 36, r: 30, dmg: 26, xp: 25, col: '#8a2be2', boss: 'Voidlord' },
};
var BOSS_ORDER = ['brute', 'matriarch', 'voltwing', 'aegis', 'hex', 'voidlord'];
var BOSS_NAMES = { brute: 'BRUTE', matriarch: 'THE MATRIARCH', voltwing: 'VOLTWING', aegis: 'AEGIS', hex: 'HEX PAIR', voidlord: 'THE VOIDLORD' };
function difficulty() { return 1 + elapsed / 85; }

function spawnEnemy(forceType) {
  if (enemies.length > 140) return;
  var a = Math.random() * Math.PI * 2;
  var d = Math.max(W, H) * 0.62 + Math.random() * 120;
  var x = player.x + Math.cos(a) * d, y = player.y + Math.sin(a) * d;
  var type = forceType;
  if (!type) {
    var r = Math.random(), t = elapsed;
    if (t > 110 && r < 0.16) type = 'splitter';
    else if (t > 40 && r < 0.38) type = 'dart';
    else type = 'drifter';
  }
  var base = ETYPES[type];
  var mult = difficulty() * (type === 'brute' ? (1 + elapsed / 300) : 1);
  enemies.push({
    type: type, x: x, y: y, vx: 0, vy: 0,
    hp: base.hp * mult, maxhp: base.hp * mult,
    spd: base.spd * (0.9 + Math.random() * 0.2),
    r: base.r, dmg: base.dmg, xp: base.xp,
    wob: Math.random() * 6.28, flash: 0,
    rot: Math.random() * 6.28, rotSpd: (Math.random() - 0.5) * 1.6,
    seed: Math.random(), spawnT: 0.7,
    mode: 'chase', modeT: 1 + Math.random(), summonT: 3, shield: false,
    strafeDir: Math.random() < 0.5 ? 1 : -1, dashA: 0,
  });
}

function pDmg(base) {
  // player damage roll with crit (yellow CRIT floats on crits)
  if (player.crit > 0 && Math.random() < player.crit) {
    return { v: base * 2, crit: true };
  }
  return { v: base, crit: false };
}
function spawnBoss(tier) {
  var type = BOSS_ORDER[(tier - 1) % BOSS_ORDER.length];
  var count = type === 'hex' ? 2 : 1;
  for (var i = 0; i < count; i++) {
    var a = Math.random() * Math.PI * 2;
    var d = Math.max(W, H) * 0.62 + 60 + i * 90;
    var x = player.x + Math.cos(a) * d, y = player.y + Math.sin(a) * d;
    var base = ETYPES[type];
    var mult = (1 + tier * 0.85) * difficulty();
    var e = {
      type: type, x: x, y: y, vx: 0, vy: 0,
      hp: base.hp * mult, maxhp: base.hp * mult,
      spd: base.spd, r: base.r, dmg: base.dmg * (1 + tier * 0.12), xp: base.xp + tier,
      wob: Math.random() * 6.28, flash: 0,
      rot: Math.random() * 6.28, rotSpd: 0.8, seed: Math.random(), spawnT: 1.2,
      mode: 'chase', modeT: 2, summonT: 2.5, shield: false,
      strafeDir: i === 0 ? 1 : -1, dashA: 0,
      isBoss: true, bossTier: tier,
    };
    enemies.push(e);
    if (!activeBoss) activeBoss = e;
  }
  ring(player.x, player.y, 200, '#ff5566', 4);
  addFloat(player.x, player.y - 52, '⚠ ' + (BOSS_NAMES[type] || type.toUpperCase()) + ' — TIER ' + tier, '#f88');
  STAR_Audio.hurt();
}
function damageEnemy(e, dmg, kx, ky) {
  if (e.shield) {
    // aegis shield: sparks, no damage
    burst(e.x + (Math.random() - 0.5) * 20, e.y + (Math.random() - 0.5) * 20, '#7df', 2);
    return;
  }
  e.hp -= dmg;
  e.flash = 0.08;
  if (kx || ky) { e.x += kx; e.y += ky; }
  if (e.hp <= 0 && !e.dead) {
    e.dead = true;
    kills++;
    dropCores(e.x, e.y, e.xp);
    burst(e.x, e.y, e.type === 'brute' ? '#c080ff' : '#8899aa', e.type === 'brute' ? 26 : 8);
    ring(e.x, e.y, e.type === 'brute' ? 120 : 34, e.type === 'brute' ? '#c080ff' : 'rgba(160,180,220,0.8)', e.type === 'brute' ? 5 : 2);
    if (player.leech > 0) player.hp = Math.min(player.maxhp, player.hp + player.leech);
    if (e.type === 'splitter') {
      for (var i = 0; i < 2; i++) {
        var base = ETYPES.mite, mult = difficulty();
        enemies.push({ type: 'mite', x: e.x + (i ? 10 : -10), y: e.y, vx: 0, vy: 0,
          hp: base.hp * mult, maxhp: base.hp * mult, spd: base.spd, r: base.r,
          dmg: base.dmg, xp: base.xp, wob: Math.random() * 6.28, flash: 0,
          rot: Math.random() * 6.28, rotSpd: (Math.random() - 0.5) * 3, seed: Math.random(), spawnT: 0,
          mode: 'chase', modeT: 0, summonT: 0, shield: false, strafeDir: 1, dashA: 0 });
      }
    }
    if (e.type === 'matriarch') {
      // brood burst: 3 mites scatter
      for (var mi2 = 0; mi2 < 3; mi2++) {
        var mb = ETYPES.mite, mm = difficulty() * 1.2;
        var ma = mi2 * 2.094;
        enemies.push({ type: 'mite', x: e.x + Math.cos(ma) * 18, y: e.y + Math.sin(ma) * 18, vx: 0, vy: 0,
          hp: mb.hp * mm, maxhp: mb.hp * mm, spd: mb.spd * 1.1, r: mb.r,
          dmg: mb.dmg, xp: mb.xp, wob: Math.random() * 6.28, flash: 0,
          rot: Math.random() * 6.28, rotSpd: 2, seed: Math.random(), spawnT: 0,
          mode: 'chase', modeT: 0, summonT: 0, shield: false, strafeDir: 1, dashA: 0 });
      }
    }
    if (e.type === 'brute') {
      player.hp = Math.min(player.maxhp, player.hp + 10);
      addFloat(player.x, player.y, '+10 HULL', '#7dff8a');
    }
    if (e === activeBoss) {
      activeBoss = null;
      ring(e.x, e.y, 160, '#ffe98a', 5);
      addFloat(e.x, e.y - 30, 'BOSS DOWN', '#ffe98a');
    }
  }
}

function dropCores(x, y, n) {
  for (var i = 0; i < n; i++) {
    if (cores.length > 300) cores.shift();
    var a = Math.random() * 6.28, d = 4 + Math.random() * 18;
    cores.push({ x: x + Math.cos(a) * d, y: y + Math.sin(a) * d, vx: Math.cos(a) * 40, vy: Math.sin(a) * 40, v: 1 });
  }
}
function burst(x, y, col, n) {
  for (var i = 0; i < n; i++) {
    if (parts.length > 220) parts.shift();
    var a = Math.random() * 6.28, sp = 40 + Math.random() * 140;
    parts.push({ x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0.4 + Math.random() * 0.3, col: col });
  }
}
function addFloat(x, y, txt, col) {
  if (floats.length > 24) floats.shift();
  floats.push({ x: x, y: y, txt: txt, col: col, life: 1 });
}
function ring(x, y, r1, col, lw) {
  if (rings.length > 24) rings.shift();
  rings.push({ x: x, y: y, r: 6, r1: r1, life: 0.45, max: 0.45, col: col, lw: lw || 3 });
}
function fireRadial(x, y, n, spd, dmg) {
  for (var i = 0; i < n; i++) {
    if (ebullets.length > 130) ebullets.shift();
    var a = i * 6.283 / n + elapsed * 0.7;
    ebullets.push({ x: x, y: y, vx: Math.cos(a) * spd, vy: Math.sin(a) * spd, r: 4, dmg: dmg, life: 5 });
  }
  STAR_Audio.hit();
}
function summonMinion(type, x, y) {
  if (enemies.length > 150) return;
  var base = ETYPES[type], mult = difficulty();
  var a = Math.random() * 6.28;
  enemies.push({ type: type, x: x + Math.cos(a) * 24, y: y + Math.sin(a) * 24, vx: 0, vy: 0,
    hp: base.hp * mult, maxhp: base.hp * mult, spd: base.spd, r: base.r,
    dmg: base.dmg, xp: base.xp, wob: Math.random() * 6.28, flash: 0,
    rot: Math.random() * 6.28, rotSpd: 1.5, seed: Math.random(), spawnT: 0.4,
    mode: 'chase', modeT: 0, summonT: 0, shield: false, strafeDir: 1, dashA: 0 });
  burst(x, y, '#3ec850', 5);
}

// ---------- level-up cards ----------
function weaponIcon(w) { return w === 'blaster' ? '🔫' : (w === 'missiles' ? '🚀' : (w === 'tesla' ? '⚡' : '⚙️')); }
function buildChoices() {
  var pool = [];
  var ws = player.weapons;
  ['blaster', 'orbit', 'missiles', 'tesla'].forEach(function(w) {
    var lv = ws[w] || 0;
    if (lv === 0) pool.push({ kind: 'wnew', w: w });
    else if (lv < 5) pool.push({ kind: 'wup', w: w });
  });
  pool.push({ kind: 'stat', s: 'hull' });
  pool.push({ kind: 'stat', s: 'speed' });
  pool.push({ kind: 'stat', s: 'magnet' });
  pool.push({ kind: 'stat', s: 'armor' });
  if (player.might < 1.4) pool.push({ kind: 'stat', s: 'might' });
  if (player.crit < 0.4) pool.push({ kind: 'stat', s: 'crit' });
  if (player.leech < 3) pool.push({ kind: 'stat', s: 'leech' });
  if (player.cdr < 0.4) pool.push({ kind: 'stat', s: 'overclock' });
  if (player.hp < player.maxhp * 0.7) pool.push({ kind: 'stat', s: 'repair' });
  if (player.regen < 3) pool.push({ kind: 'stat', s: 'regen' });
  var out = [], used = {};
  while (out.length < 3 && pool.length) {
    var i = (Math.random() * pool.length) | 0;
    var c = pool.splice(i, 1)[0];
    var k = c.kind + (c.w || c.s);
    if (used[k]) continue;
    used[k] = 1;
    out.push(c);
  }
  return out;
}
function wName(w) {
  return w === 'blaster' ? 'Pulse Blaster' : (w === 'orbit' ? 'Orbit Blades' : (w === 'tesla' ? 'Tesla Arc' : 'Seeker Missiles'));
}
function wDesc(w) {
  return w === 'blaster' ? 'Auto-fires bolts at the nearest foe.'
    : (w === 'orbit' ? 'Blades circle your hull, shredding contact.'
    : (w === 'tesla' ? 'Chain lightning zaps packed groups.' : 'Homing missiles with splash damage.'));
}
function cardInfo(c) {
  var ws = player.weapons;
  if (c.kind === 'wnew') {
    return { emoji: weaponIcon(c.w), name: 'NEW: ' + wName(c.w), desc: wDesc(c.w), lv: '' };
  }
  if (c.kind === 'wup') {
    return { emoji: weaponIcon(c.w), name: wName(c.w) + ' +', desc: 'More damage, faster, meaner.', lv: 'Lv ' + ws[c.w] + ' → ' + (ws[c.w] + 1) };
  }
  var map = {
    hull:   { emoji: '🛡️', name: '+25 Max Hull', desc: 'Reinforced plating. Heals 25 now.' },
    speed:  { emoji: '⚡', name: 'Ion Thrusters', desc: '+12% flight speed.' },
    magnet: { emoji: '🧲', name: 'Tractor Web', desc: '+40% pickup range.' },
    armor:  { emoji: '🔩', name: 'Ablative Armor', desc: 'Block +2 damage per hit.' },
    repair: { emoji: '🔧', name: 'Field Repairs', desc: 'Restore 30 hull now.' },
    regen:  { emoji: '💚', name: 'Nanobots', desc: 'Regenerate 0.8 hull/sec.' },
    might:  { emoji: '💥', name: 'Overcharged Rounds', desc: '+8% ALL damage.' },
    crit:   { emoji: '🎯', name: 'Crit Matrix', desc: '+8% chance to deal double damage.' },
    leech:  { emoji: '🩸', name: 'Vampiric Plating', desc: 'Heal +1 hull per kill.' },
    overclock: { emoji: '⏩', name: 'Overclock', desc: 'Weapons recharge 8% faster.' },
  };
  return map[c.s];
}
function applyCard(c) {
  if (c.kind === 'wnew') player.weapons[c.w] = 1;
  else if (c.kind === 'wup') player.weapons[c.w] = Math.min(5, player.weapons[c.w] + 1);
  else if (c.s === 'hull') { player.maxhp += 25; player.hp = Math.min(player.maxhp, player.hp + 25); }
  else if (c.s === 'speed') player.speed *= 1.12;
  else if (c.s === 'magnet') player.magnet *= 1.4;
  else if (c.s === 'armor') player.armor += 2;
  else if (c.s === 'repair') player.hp = Math.min(player.maxhp, player.hp + 30);
  else if (c.s === 'regen') player.regen += 0.8;
  else if (c.s === 'might') player.might = Math.min(2, player.might + 0.08);
  else if (c.s === 'crit') player.crit = Math.min(0.5, player.crit + 0.08);
  else if (c.s === 'leech') player.leech = Math.min(4, player.leech + 1);
  else if (c.s === 'overclock') player.cdr = Math.min(0.4, player.cdr + 0.08);
  refreshWeaponHUD();
}

// ---------- HUD / screens ----------
var el = function(id) { return document.getElementById(id); };
function show(id) { el(id).classList.remove('hidden'); }
function hide(id) { el(id).classList.add('hidden'); }
function refreshWeaponHUD() {
  var w = el('hud-weapons');
  w.innerHTML = '';
  ['blaster', 'orbit', 'missiles', 'tesla'].forEach(function(k) {
    var lv = player.weapons[k] || 0;
    if (!lv) return;
    var d = document.createElement('div');
    d.className = 'wicon';
    d.textContent = weaponIcon(k);
    d.title = k + ' Lv' + lv;
    w.appendChild(d);
  });
}
function openLevelUp() {
  state = 'levelup';
  var box = el('level-cards');
  box.innerHTML = '';
  buildChoices().forEach(function(c) {
    var info = cardInfo(c);
    var d = document.createElement('div');
    d.className = 'lcard';
    d.innerHTML = '<div class="emoji">' + info.emoji + '</div><div class="nm">' + info.name + '</div><div class="ds">' + info.desc + '</div>' + (info.lv ? '<div class="lv">' + info.lv + '</div>' : '');
    d.onclick = function() { STAR_Audio.click(); applyCard(c); hide('screen-levelup'); pendingLevels--; if (pendingLevels > 0) openLevelUp(); else { state = 'play'; } };
    box.appendChild(d);
  });
  show('screen-levelup');
}
function gameOver() {
  state = 'over';
  STAR_Audio.over();
  STAR_Audio.musicMenu();
  var b = loadBest();
  var rec = { time: Math.floor(elapsed), level: player.level, kills: kills };
  var isBest = !b || rec.time > b.time;
  if (isBest) { saveBest(rec); b = rec; }
  el('over-stats').innerHTML = 'Survived <b>' + fmtTime(elapsed) + '</b> · Level <b>' + player.level + '</b> · <b>' + kills + '</b> kills';
  el('over-best').textContent = 'BEST — ' + fmtTime(b.time) + ' · Lv' + b.level + ' · ' + b.kills + ' kills' + (isBest ? '  ★ NEW!' : '');
  hide('hud');
  show('screen-over');
}
function togglePause() {
  if (state === 'play') {
    state = 'pause';
    STAR_Audio.musicDuck(true);
    el('pause-stats').innerHTML = fmtTime(elapsed) + ' · Lv' + player.level + ' · ' + kills + ' kills';
    show('screen-pause');
  } else if (state === 'pause') {
    hide('screen-pause');
    state = 'play';
    STAR_Audio.musicDuck(false);
  }
}
function startRun() {
  newRun();
  refreshWeaponHUD();
  updateMuteBtn();
  ['screen-menu', 'screen-how', 'screen-over', 'screen-pause', 'screen-levelup'].forEach(hide);
  show('hud');
  state = 'play';
  STAR_Audio.unlock();
  STAR_Audio.musicGame();
  STAR_Audio.musicDuck(false);
}

// ---------- update ----------
function update(dt) {
  elapsed += dt;
  var iv = inputVec();
  var sp = player.speed * (keys.ShiftLeft || keys.ShiftRight ? 1.35 : 1);
  player.vx += ((iv.x * sp) - player.vx) * Math.min(1, dt * 8);
  player.vy += ((iv.y * sp) - player.vy) * Math.min(1, dt * 8);
  player.x += player.vx * dt;
  player.y += player.vy * dt;
  if (iv.x || iv.y) player.face = Math.atan2(iv.y, iv.x);
  // banking tilt from turn rate
  var turn = angDiff(player.face, player.facePrev === undefined ? player.face : player.facePrev);
  player.facePrev = player.face;
  player.bank = (player.bank || 0) + (clamp(turn * 5, -0.65, 0.65) - (player.bank || 0)) * Math.min(1, dt * 9);
  if (player.iframes > 0) player.iframes -= dt;
  if (hurtT > 0) hurtT -= dt;
  if (player.regen > 0) player.hp = Math.min(player.maxhp, player.hp + player.regen * dt);
  // engine trail
  var pspd = Math.hypot(player.vx, player.vy);
  if (pspd > 50 && parts.length < 220) {
    var tx = player.x - Math.cos(player.face) * 14, ty = player.y - Math.sin(player.face) * 14;
    parts.push({ x: tx + (Math.random() - 0.5) * 5, y: ty + (Math.random() - 0.5) * 5,
      vx: -player.vx * 0.25 + (Math.random() - 0.5) * 30, vy: -player.vy * 0.25 + (Math.random() - 0.5) * 30,
      life: 0.25 + Math.random() * 0.2, col: Math.random() < 0.5 ? '#ff9a30' : '#ffd050' });
  }

  // spawn director
  spawnT -= dt;
  if (spawnT <= 0) {
    spawnT = Math.max(0.32, 1.15 - elapsed / 100);
    var batch = 1 + Math.floor(elapsed / 70);
    for (var i = 0; i < batch; i++) spawnEnemy();
  }
  eliteT -= dt;
  if (eliteT <= 0) {
    eliteT = 45;
    spawnEnemy('brute');
    if (elapsed > 300) spawnEnemy('brute');
    addFloat(player.x, player.y - 40, '⚠ BRUTE INBOUND', '#f88');
  }
  // Boss schedule: every 5 player levels, tiers 1..30 (to level 150)
  var tier = Math.floor(player.level / 5);
  if (tier > lastBossLv && tier >= 1 && tier <= 30) {
    lastBossLv = tier;
    spawnBoss(tier);
  }

  // weapons
  var W = player.weapons, might = player.might;
  if (W.blaster) {
    player.fireT -= dt;
    if (player.fireT <= 0) {
      player.fireT = Math.max(0.18, 0.55 - W.blaster * 0.07) * (1 - player.cdr);
      var tgt = nearestEnemy(player.x, player.y, 520);
      if (tgt) {
        var n = 1 + Math.floor((W.blaster - 1) / 2);
        var fa = Math.atan2(tgt.y - player.y, tgt.x - player.x);
        for (var b = 0; b < n; b++) {
          var a = fa + (b - (n - 1) / 2) * 0.12;
          bolts.push({ x: player.x, y: player.y, vx: Math.cos(a) * 460, vy: Math.sin(a) * 460, dmg: (6 + W.blaster * 3) * might, pierce: 1 + Math.floor(W.blaster / 3), life: 1.1 });
        }
        // muzzle flash
        burst(player.x + Math.cos(fa) * 16, player.y + Math.sin(fa) * 16, '#ffe98a', 3);
        STAR_Audio.shoot();
      }
    }
  }
  if (W.orbit) {
    player.orbitA += dt * (2.2 + W.orbit * 0.35);
    var blades = 1 + W.orbit, rr = 52 + W.orbit * 6;
    for (var k = 0; k < blades; k++) {
      var ba = player.orbitA + k * 6.283 / blades;
      var bx = player.x + Math.cos(ba) * rr, by = player.y + Math.sin(ba) * rr;
      for (var ei = 0; ei < enemies.length; ei++) {
        var e = enemies[ei];
        if (e.dead || e.spawnT > 0) continue;
        var dd = (e.x - bx) * (e.x - bx) + (e.y - by) * (e.y - by);
        if (dd < (e.r + 10) * (e.r + 10)) {
          if (!e._orbT || elapsed - e._orbT > 0.45) {
            e._orbT = elapsed;
            var opr = pDmg((7 + W.orbit * 4) * might);
            damageEnemy(e, opr.v, (e.x - player.x) * 0.02, (e.y - player.y) * 0.02);
            if (opr.crit) addFloat(e.x, e.y - 12, 'CRIT', '#ffe14d');
          }
        }
      }
    }
  }
  if (W.missiles) {
    player.misT -= dt;
    if (player.misT <= 0) {
      player.misT = Math.max(0.7, 2.2 - W.missiles * 0.28) * (1 - player.cdr);
      var mt = nearestEnemy(player.x, player.y, 620);
      if (mt) {
        var cnt = 1 + Math.floor(W.missiles / 2);
        for (var m = 0; m < cnt; m++) {
          missiles.push({ x: player.x, y: player.y - 6, vx: (Math.random() - 0.5) * 120, vy: -120 - Math.random() * 60, tgt: mt, dmg: (14 + W.missiles * 8) * might, life: 3 });
        }
        STAR_Audio.shoot();
      }
    }
  }
  if (W.tesla) {
    player.tesT -= dt;
    if (player.tesT <= 0) {
      player.tesT = Math.max(0.5, 1.7 - W.tesla * 0.22) * (1 - player.cdr);
      var t0 = nearestEnemy(player.x, player.y, 380 + W.tesla * 30);
      if (t0) {
        var pts = [{ x: player.x, y: player.y }];
        var hitSet = [];
        var cur = t0, chains = 1 + Math.floor(W.tesla / 2);
        var tdmg = (10 + W.tesla * 7) * might;
        for (var tc = 0; tc < chains && cur && hitSet.indexOf(cur) === -1; tc++) {
          hitSet.push(cur);
          pts.push({ x: cur.x, y: cur.y });
          var pr = pDmg(tdmg);
          damageEnemy(cur, pr.v, 0, 0);
          if (pr.crit) addFloat(cur.x, cur.y - 12, 'CRIT', '#ffe14d');
          cur = nearestChain(cur.x, cur.y, 170, hitSet);
        }
        zaps.push({ pts: pts, life: 0.2 });
        ring(player.x, player.y, 40, 'rgba(140,220,255,0.7)', 2);
        STAR_Audio.shoot();
      }
    }
  }

  // bolts
  for (var bi = bolts.length - 1; bi >= 0; bi--) {
    var bl = bolts[bi];
    bl.x += bl.vx * dt; bl.y += bl.vy * dt; bl.life -= dt;
    var dead = bl.life <= 0;
    if (!dead) {
      for (var q = 0; q < enemies.length; q++) {
        var be = enemies[q];
        if (be.dead || be.spawnT > 0) continue;
        if (dist2(bl.x, bl.y, be.x, be.y) < (be.r + 5) * (be.r + 5)) {
          var bpr = pDmg(bl.dmg);
          damageEnemy(be, bpr.v, bl.vx * 0.0004, bl.vy * 0.0004);
          if (bpr.crit) addFloat(be.x, be.y - 12, 'CRIT', '#ffe14d');
          STAR_Audio.hit();
          if (bl.pierce > 0) bl.pierce--;
          else { dead = true; break; }
        }
      }
    }
    if (dead) { bolts.splice(bi, 1); }
  }
  // missiles (homing + splash)
  for (var mi = missiles.length - 1; mi >= 0; mi--) {
    var ms = missiles[mi];
    ms.life -= dt;
    var tt = (ms.tgt && !ms.tgt.dead) ? ms.tgt : nearestEnemy(ms.x, ms.y, 700);
    ms.tgt = tt;
    if (tt) {
      var ta = Math.atan2(tt.y - ms.y, tt.x - ms.x);
      var ca = Math.atan2(ms.vy, ms.vx), na = ca + clamp(angDiff(ta, ca), -3.2 * dt, 3.2 * dt);
      var spd = Math.min(420, Math.hypot(ms.vx, ms.vy) + 500 * dt);
      ms.vx = Math.cos(na) * spd; ms.vy = Math.sin(na) * spd;
    }
    ms.x += ms.vx * dt; ms.y += ms.vy * dt;
    burst(ms.x, ms.y, '#ffb060', 1);
    var boom = ms.life <= 0;
    if (!boom && tt && !tt.dead && dist2(ms.x, ms.y, tt.x, tt.y) < (tt.r + 8) * (tt.r + 8)) boom = true;
    if (boom) {
      burst(ms.x, ms.y, '#ff9040', 14);
      ring(ms.x, ms.y, 64, '#ffb060', 3);
      for (var z = enemies.length - 1; z >= 0; z--) {
        var ze = enemies[z];
        if (!ze.dead && !ze.spawnT && dist2(ms.x, ms.y, ze.x, ze.y) < 70 * 70) {
          var mpr = pDmg(ms.dmg);
          damageEnemy(ze, mpr.v, 0, 0);
          if (mpr.crit) addFloat(ze.x, ze.y - 12, 'CRIT', '#ffe14d');
        }
      }
      missiles.splice(mi, 1);
    }
  }
  // enemy bullets
  for (var bi2 = ebullets.length - 1; bi2 >= 0; bi2--) {
    var eb = ebullets[bi2];
    eb.x += eb.vx * dt; eb.y += eb.vy * dt; eb.life -= dt;
    var gone = eb.life <= 0 || dist2(eb.x, eb.y, player.x, player.y) > 950 * 950;
    if (!gone && player.iframes <= 0 && dist2(eb.x, eb.y, player.x, player.y) < (eb.r + 10) * (eb.r + 10)) {
      var dealt2 = Math.max(1, Math.round(eb.dmg * difficulty() - player.armor));
      player.hp -= dealt2;
      player.iframes = 0.6;
      hurtT = 0.45;
      shake = 5;
      burst(player.x, player.y, '#ff44ff', 8);
      addFloat(player.x, player.y - 18, '-' + dealt2, '#f6f');
      STAR_Audio.hurt();
      gone = true;
      if (player.hp <= 0) { player.hp = 0; gameOver(); return; }
    }
    if (gone) ebullets.splice(bi2, 1);
  }
  // enemies: seek + separate + contact
  for (var i = enemies.length - 1; i >= 0; i--) {
    var en = enemies[i];
    if (en.dead) { enemies.splice(i, 1); continue; }
    if (en.flash > 0) en.flash -= dt;
    en.wob += dt * 3;
    if (en.rotSpd) en.rot += en.rotSpd * dt;
    if (en.spawnT > 0) { en.spawnT -= dt; continue; }
    var dx = player.x - en.x, dy = player.y - en.y;
    var dl = Math.hypot(dx, dy) || 1;
    var mvx = dx / dl * en.spd, mvy = dy / dl * en.spd;
    // --- boss behaviors ---
    if (en.type === 'voltwing') {
      en.modeT -= dt;
      if (en.mode === 'chase' && en.modeT <= 0) { en.mode = 'tele'; en.modeT = 0.6; en.dashA = Math.atan2(dy, dx); }
      else if (en.mode === 'tele' && en.modeT <= 0) { en.mode = 'dash'; en.modeT = 0.45; STAR_Audio.hit(); }
      else if (en.mode === 'dash' && en.modeT <= 0) { en.mode = 'chase'; en.modeT = 2.2; }
      if (en.mode === 'tele') { mvx = dx / dl * en.spd * 0.25; mvy = dy / dl * en.spd * 0.25; en.dashA = Math.atan2(dy, dx); }
      else if (en.mode === 'dash') { mvx = Math.cos(en.dashA) * en.spd * 4.2; mvy = Math.sin(en.dashA) * en.spd * 4.2; }
    } else if (en.type === 'hex') {
      // strafing hunter: circle the player while closing in
      var sa = Math.atan2(dy, dx) + en.strafeDir * 1.1;
      mvx = Math.cos(sa) * en.spd + dx / dl * en.spd * 0.35;
      mvy = Math.sin(sa) * en.spd + dy / dl * en.spd * 0.35;
    } else if (en.type === 'aegis') {
      // shield cycles 3s on / 3s off; radial burst while shielded
      en.modeT -= dt;
      if (en.modeT <= 0) {
        en.modeT = 3;
        en.shield = !en.shield;
        if (en.shield) { ring(en.x, en.y, 60, '#7df', 3); fireRadial(en.x, en.y, 8 + Math.min(8, en.bossTier || 0), 130, en.dmg * 0.6); }
      }
    } else if (en.type === 'voidlord') {
      // slow march + radial volleys + dart summons
      en.modeT -= dt; en.summonT -= dt;
      if (en.modeT <= 0) { en.modeT = 4; fireRadial(en.x, en.y, 10 + Math.min(10, en.bossTier || 0), 120, en.dmg * 0.55); ring(en.x, en.y, 90, '#b060ff', 3); }
      if (en.summonT <= 0) { en.summonT = 6; summonMinion('dart', en.x, en.y); summonMinion('dart', en.x, en.y); }
    } else if (en.type === 'matriarch') {
      en.summonT -= dt;
      if (en.summonT <= 0) { en.summonT = 5; summonMinion('mite', en.x, en.y); summonMinion('mite', en.x, en.y); }
    }
    var wobx = 0, woby = 0;
    if (en.type === 'dart') { wobx = -dy / dl * Math.sin(en.wob) * 30; woby = dx / dl * Math.sin(en.wob) * 30; }
    en.x += (mvx + wobx) * dt;
    en.y += (mvy + woby) * dt;
    // separation
    for (var j = i - 1; j >= 0; j--) {
      var o = enemies[j];
      if (o.dead) continue;
      var sx = en.x - o.x, sy = en.y - o.y;
      var rr2 = en.r + o.r;
      var d2 = sx * sx + sy * sy;
      if (d2 > 0.01 && d2 < rr2 * rr2) {
        var dd = Math.sqrt(d2), push = (rr2 - dd) * 0.5;
        sx /= dd; sy /= dd;
        en.x += sx * push * 0.5; en.y += sy * push * 0.5;
        o.x -= sx * push * 0.5; o.y -= sy * push * 0.5;
      }
    }
    // contact damage
    if (player.iframes <= 0 && dist2(en.x, en.y, player.x, player.y) < (en.r + 11) * (en.r + 11)) {
      var raw = en.dmg * difficulty();
      var dealt = Math.max(1, Math.round(raw - player.armor));
      player.hp -= dealt;
      player.iframes = 0.6;
      hurtT = 0.45;
      shake = 6;
      burst(player.x, player.y, '#ff4444', 10);
      addFloat(player.x, player.y - 18, '-' + dealt, '#f66');
      STAR_Audio.hurt();
      if (player.hp <= 0) { player.hp = 0; gameOver(); return; }
    }
  }
  // cores: drift + magnet + collect
  var mr2 = player.magnet * player.magnet;
  for (var ci = cores.length - 1; ci >= 0; ci--) {
    var co = cores[ci];
    co.x += co.vx * dt; co.y += co.vy * dt;
    co.vx *= (1 - 3 * dt); co.vy *= (1 - 3 * dt);
    var cdx = player.x - co.x, cdy = player.y - co.y;
    var cd2 = cdx * cdx + cdy * cdy;
    if (cd2 < mr2) {
      var cl = Math.sqrt(cd2) || 1, pull = 620;
      co.vx += cdx / cl * pull * dt; co.vy += cdy / cl * pull * dt;
    }
    if (cd2 < 20 * 20) {
      cores.splice(ci, 1);
      player.xp += co.v;
      STAR_Audio.pickup();
      while (player.xp >= player.xpNext) {
        player.xp -= player.xpNext;
        player.level++;
        player.xpNext = xpFor(player.level);
        pendingLevels++;
        ring(player.x, player.y, 90, '#ffe98a', 4);
        addFloat(player.x, player.y - 26, 'LEVEL UP!', '#ffe98a');
      }
      if (pendingLevels > 0 && state === 'play') openLevelUp();
    }
  }
  // particles / floats
  for (var pi = parts.length - 1; pi >= 0; pi--) {
    var pt = parts[pi];
    pt.x += pt.vx * dt; pt.y += pt.vy * dt;
    pt.vx *= (1 - 2.5 * dt); pt.vy *= (1 - 2.5 * dt);
    pt.life -= dt;
    if (pt.life <= 0) parts.splice(pi, 1);
  }
  for (var fi = floats.length - 1; fi >= 0; fi--) {
    var fl = floats[fi];
    fl.y -= 28 * dt; fl.life -= dt;
    if (fl.life <= 0) floats.splice(fi, 1);
  }
  // shockwave rings
  for (var gi = rings.length - 1; gi >= 0; gi--) {
    var gr = rings[gi];
    gr.life -= dt;
    gr.r += (gr.r1 - gr.r) * Math.min(1, dt * 10);
    if (gr.life <= 0) rings.splice(gi, 1);
  }
  // tesla zaps
  for (var zi = zaps.length - 1; zi >= 0; zi--) {
    zaps[zi].life -= dt;
    if (zaps[zi].life <= 0) zaps.splice(zi, 1);
  }
  // shooting stars
  shootT -= dt;
  if (shootT <= 0) {
    shootT = 3 + Math.random() * 6;
    var sa = Math.PI * (0.15 + Math.random() * 0.2);
    shooters.push({
      x: camX + (Math.random() - 0.5) * W * 1.4,
      y: camY - H * 0.7,
      vx: Math.cos(sa) * -500, vy: -Math.sin(sa) * -500,
      life: 0.9,
    });
  }
  for (var si = shooters.length - 1; si >= 0; si--) {
    var sh = shooters[si];
    sh.x += sh.vx * dt; sh.y += sh.vy * dt; sh.life -= dt;
    if (sh.life <= 0) shooters.splice(si, 1);
  }
  if (shake > 0) shake = Math.max(0, shake - dt * 30);

  // camera follows
  camX += (player.x - camX) * Math.min(1, dt * 5);
  camY += (player.y - camY) * Math.min(1, dt * 5);

  // HUD
  el('hud-timer').textContent = fmtTime(elapsed);
  el('hud-levelbar').style.width = clamp(player.xp / player.xpNext * 100, 0, 100) + '%';
  el('hud-leveltext').textContent = 'LV ' + player.level;
  el('hud-kills').textContent = '☠ ' + kills;
  el('hud-hpbar').style.width = clamp(player.hp / player.maxhp * 100, 0, 100) + '%';
}
function nearestChain(x, y, maxD, skip) {
  var best = null, bd = maxD * maxD;
  for (var i = 0; i < enemies.length; i++) {
    var e = enemies[i];
    if (e.dead || e.spawnT > 0 || skip.indexOf(e) !== -1) continue;
    var d = dist2(x, y, e.x, e.y);
    if (d < bd) { bd = d; best = e; }
  }
  return best;
}
function nearestEnemy(x, y, maxD) {
  var best = null, bd = maxD * maxD;
  for (var i = 0; i < enemies.length; i++) {
    var e = enemies[i];
    if (e.dead || e.spawnT > 0) continue;
    var d = dist2(x, y, e.x, e.y);
    if (d < bd) { bd = d; best = e; }
  }
  return best;
}
function angDiff(a, b) {
  var d = a - b;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return d;
}

// ---------- render ----------
function draw() {
  var sx = 0, sy = 0;
  if (shake > 0) { sx = (Math.random() - 0.5) * shake; sy = (Math.random() - 0.5) * shake; }
  var ox = W / 2 - camX + sx, oy = H / 2 - camY + sy;
  // bg
  var g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#070716');
  g.addColorStop(0.6, '#04040c');
  g.addColorStop(1, '#0a0618');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  // distant gas giant (near-zero parallax, slow drift)
  (function() {
    var span = W + 800;
    var ppx = (((W * 0.78 - camX * 0.05) % span) + span) % span - 400;
    var ppy = H * 0.24 - ((camY * 0.05) % 300);
    var pr = 110;
    var pg = ctx.createRadialGradient(ppx - 30, ppy - 30, 10, ppx, ppy, pr);
    pg.addColorStop(0, '#3a6a9a');
    pg.addColorStop(0.55, '#24406a');
    pg.addColorStop(1, '#101a34');
    ctx.fillStyle = pg;
    ctx.beginPath(); ctx.arc(ppx, ppy, pr, 0, 6.283); ctx.fill();
    ctx.fillStyle = 'rgba(120,200,230,0.20)';
    ctx.fillRect(ppx - pr, ppy - 22, pr * 2, 10);
    ctx.fillRect(ppx - pr, ppy + 6, pr * 2, 6);
    ctx.fillStyle = 'rgba(200,140,220,0.14)';
    ctx.fillRect(ppx - pr, ppy - 44, pr * 2, 7);
    // ring
    ctx.strokeStyle = 'rgba(170,200,235,0.35)';
    ctx.lineWidth = 9;
    ctx.beginPath(); ctx.ellipse(ppx, ppy, pr + 42, (pr + 42) * 0.32, -0.25, 0, 6.283); ctx.stroke();
    ctx.strokeStyle = 'rgba(170,200,235,0.18)';
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.ellipse(ppx, ppy, pr + 58, (pr + 58) * 0.32, -0.25, 0, 6.283); ctx.stroke();
  })();
  // nebulae (hash-anchored, huge soft blobs)
  var ncx = Math.floor(camX / 900), ncy = Math.floor(camY / 900);
  for (var gx = ncx - 1; gx <= ncx + 1; gx++) for (var gy = ncy - 1; gy <= ncy + 1; gy++) {
    var h = hash2(gx, gy);
    if (h < 0.45) continue;
    var nx = gx * 900 + h * 400, ny = gy * 900 + hash2(gy, gx) * 400;
    var cols = ['rgba(80,40,160,0.16)', 'rgba(20,90,160,0.15)', 'rgba(160,40,90,0.13)'];
    var rg = ctx.createRadialGradient(nx + ox, ny + oy, 0, nx + ox, ny + oy, 320);
    rg.addColorStop(0, cols[Math.floor(h * 3) % 3]);
    rg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = rg;
    ctx.fillRect(nx + ox - 320, ny + oy - 320, 640, 640);
  }
  // star layers (parallax)
  drawStars(0.2, 1, 90);
  drawStars(0.5, 1.6, 60);
  drawStars(0.8, 2.4, 34);
  // shooting stars
  if (state !== 'menu') {
    for (var shi = 0; shi < shooters.length; shi++) {
      var so = shooters[shi], sp = [so.x + ox, so.y + oy];
      var tl = clamp(so.life * 2, 0, 1);
      ctx.strokeStyle = 'rgba(200,230,255,' + (tl * 0.8).toFixed(2) + ')';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sp[0], sp[1]);
      ctx.lineTo(sp[0] - so.vx * 0.12 * tl, sp[1] - so.vy * 0.12 * tl);
      ctx.stroke();
    }
  }
  if (state === 'menu') return;

  function P(x, y) { return [x + ox, y + oy]; }

  // cores (pulsing diamonds with halo)
  for (var i = 0; i < cores.length; i++) {
    var c = cores[i], p = P(c.x, c.y);
    if (p[0] < -20 || p[1] < -20 || p[0] > W + 20 || p[1] > H + 20) continue;
    var cp = 1 + Math.sin(elapsed * 5 + c.x) * 0.15;
    ctx.fillStyle = 'rgba(40,255,140,0.18)';
    ctx.beginPath(); ctx.arc(p[0], p[1], 8 * cp, 0, 6.283); ctx.fill();
    ctx.fillStyle = '#0a5a30';
    ctx.beginPath();
    ctx.moveTo(p[0], p[1] - 6 * cp); ctx.lineTo(p[0] + 5 * cp, p[1]); ctx.lineTo(p[0], p[1] + 6 * cp); ctx.lineTo(p[0] - 5 * cp, p[1]);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#2ff88a';
    ctx.beginPath();
    ctx.moveTo(p[0], p[1] - 4 * cp); ctx.lineTo(p[0] + 3 * cp, p[1]); ctx.lineTo(p[0], p[1] + 4 * cp); ctx.lineTo(p[0] - 3 * cp, p[1]);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#dfffe8';
    ctx.fillRect(p[0] - 1, p[1] - 3 * cp, 2, 2);
  }
  // enemies
  for (var ei = 0; ei < enemies.length; ei++) {
    var e = enemies[ei];
    if (e.dead) continue;
    var ep = P(e.x, e.y);
    if (ep[0] < -60 || ep[1] < -60 || ep[0] > W + 60 || ep[1] > H + 60) continue;
    // warp-in portal: flashing ring, silhouette fades in, harmless until open
    if (e.spawnT > 0) {
      var pt = 1 - e.spawnT / 0.7;
      ctx.strokeStyle = 'rgba(200,120,255,' + (0.35 + pt * 0.6).toFixed(2) + ')';
      ctx.lineWidth = 2 + pt * 2;
      ctx.beginPath(); ctx.arc(ep[0], ep[1], e.r + 14 - pt * 10, elapsed * 6, elapsed * 6 + 4.4); ctx.stroke();
      ctx.strokeStyle = 'rgba(120,240,255,' + (pt * 0.7).toFixed(2) + ')';
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(ep[0], ep[1], e.r + 20 - pt * 14, -elapsed * 4, -elapsed * 4 + 4.4); ctx.stroke();
      ctx.globalAlpha = pt * 0.85;
    }
    var flash = e.flash > 0;
    if (e.type === 'drifter') {
      // tumbling cratered rock
      ctx.fillStyle = flash ? '#fff' : '#7d828e';
      rockPoly(ep[0], ep[1], e.r, e.seed, e.rot);
      ctx.fillStyle = flash ? '#fff' : '#565b66';
      ctx.beginPath(); ctx.arc(ep[0] - e.r * 0.25, ep[1] - e.r * 0.15, e.r * 0.22, 0, 6.283); ctx.fill();
      ctx.beginPath(); ctx.arc(ep[0] + e.r * 0.3, ep[1] + e.r * 0.25, e.r * 0.15, 0, 6.283); ctx.fill();
      ctx.fillStyle = flash ? '#fff' : '#a8adb8';
      ctx.beginPath(); ctx.arc(ep[0] - e.r * 0.28, ep[1] - e.r * 0.32, e.r * 0.12, 0, 6.283); ctx.fill();
    } else if (e.type === 'dart') {
      // sleek arrow interceptor with engine glow + trail
      var da = Math.atan2(player.y - e.y, player.x - e.x);
      ctx.fillStyle = flash ? '#fff' : '#ff8c1a';
      tri(ep[0], ep[1], e.r + 6, da);
      ctx.fillStyle = flash ? '#fff' : '#c22e10';
      tri(ep[0] - Math.cos(da) * 4, ep[1] - Math.sin(da) * 4, e.r * 0.62, da);
      ctx.fillStyle = flash ? '#fff' : '#ffd080';
      tri(ep[0] + Math.cos(da) * 2, ep[1] + Math.sin(da) * 2, e.r * 0.34, da);
      ctx.fillStyle = 'rgba(255,150,40,0.8)';
      ctx.beginPath(); ctx.arc(ep[0] - Math.cos(da) * (e.r + 2), ep[1] - Math.sin(da) * (e.r + 2), 3 + Math.random() * 2, 0, 6.283); ctx.fill();
      // swept fins
      ctx.fillStyle = flash ? '#fff' : '#a83c08';
      var fa = da + 2.6, fa2 = da - 2.6;
      tri(ep[0] + Math.cos(fa) * e.r * 0.7, ep[1] + Math.sin(fa) * e.r * 0.7, 6, fa);
      tri(ep[0] + Math.cos(fa2) * e.r * 0.7, ep[1] + Math.sin(fa2) * e.r * 0.7, 6, fa2);
      // sensor eye
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(ep[0] + Math.cos(da) * 3, ep[1] + Math.sin(da) * 3, 2.6, 0, 6.283); ctx.fill();
      ctx.fillStyle = '#e02020';
      ctx.beginPath(); ctx.arc(ep[0] + Math.cos(da) * 3, ep[1] + Math.sin(da) * 3, 1.3, 0, 6.283); ctx.fill();
    } else if (e.type === 'splitter' || e.type === 'mite') {
      // pulsing bio-blob with nucleus
      var pulse = 1 + Math.sin(e.wob * 2) * 0.07;
      var rr = e.r * pulse;
      ctx.fillStyle = flash ? '#fff' : (e.type === 'splitter' ? '#1f7a34' : '#3fa858');
      ctx.beginPath(); ctx.arc(ep[0], ep[1], rr, 0, 6.283); ctx.fill();
      ctx.fillStyle = flash ? '#fff' : (e.type === 'splitter' ? '#37c858' : '#6fe888');
      ctx.beginPath(); ctx.arc(ep[0], ep[1], rr * 0.68, 0, 6.283); ctx.fill();
      // nucleus
      ctx.fillStyle = flash ? '#fff' : '#0e3a1a';
      ctx.beginPath(); ctx.arc(ep[0] + Math.cos(e.wob) * 2, ep[1] + Math.sin(e.wob) * 2, rr * 0.3, 0, 6.283); ctx.fill();
      ctx.fillStyle = 'rgba(230,255,230,0.75)';
      ctx.beginPath(); ctx.arc(ep[0] - rr * 0.3, ep[1] - rr * 0.35, rr * 0.2, 0, 6.283); ctx.fill();
      // beady eyes track the player
      var bea = Math.atan2(player.y - e.y, player.x - e.x);
      ctx.fillStyle = '#0e2a12';
      ctx.beginPath(); ctx.arc(ep[0] + Math.cos(bea - 0.3) * rr * 0.4, ep[1] + Math.sin(bea - 0.3) * rr * 0.4, rr * 0.14, 0, 6.283); ctx.fill();
      ctx.beginPath(); ctx.arc(ep[0] + Math.cos(bea + 0.3) * rr * 0.4, ep[1] + Math.sin(bea + 0.3) * rr * 0.4, rr * 0.14, 0, 6.283); ctx.fill();
      if (e.type === 'splitter') {
        // volatile spots that hint the split
        ctx.fillStyle = '#e8ff70';
        ctx.fillRect(ep[0] - rr - 1, ep[1] - 2, 4, 4);
        ctx.fillRect(ep[0] + rr - 3, ep[1] - 2, 4, 4);
      }
    } else if (e.type === 'matriarch') {
      // broodmother blob: veined sac, egg spots, pulsing crown
      var mp = 1 + Math.sin(e.wob * 2.4) * 0.06;
      ctx.fillStyle = flash ? '#fff' : '#14602a';
      ctx.beginPath(); ctx.arc(ep[0], ep[1], e.r * mp, 0, 6.283); ctx.fill();
      ctx.fillStyle = flash ? '#fff' : '#2fae4e';
      ctx.beginPath(); ctx.arc(ep[0], ep[1], e.r * 0.74 * mp, 0, 6.283); ctx.fill();
      // egg spots
      ctx.fillStyle = flash ? '#fff' : '#d8ff9a';
      for (var eg = 0; eg < 6; eg++) {
        var ea = e.rot + eg * 6.283 / 6;
        ctx.beginPath(); ctx.arc(ep[0] + Math.cos(ea) * e.r * 0.5, ep[1] + Math.sin(ea) * e.r * 0.5, 3.4, 0, 6.283); ctx.fill();
      }
      // crown spikes
      ctx.fillStyle = flash ? '#fff' : '#0e3a1a';
      for (var cs = 0; cs < 8; cs++) {
        var ca2 = e.wob * 0.4 + cs * 6.283 / 8;
        tri(ep[0] + Math.cos(ca2) * e.r * 1.02, ep[1] + Math.sin(ca2) * e.r * 1.02, 7, ca2);
      }
      // furious eyes
      var mea = Math.atan2(player.y - e.y, player.x - e.x);
      ctx.fillStyle = '#ffe14d';
      ctx.beginPath(); ctx.arc(ep[0] + Math.cos(mea - 0.35) * 9, ep[1] + Math.sin(mea - 0.35) * 9, 3.4, 0, 6.283); ctx.fill();
      ctx.beginPath(); ctx.arc(ep[0] + Math.cos(mea + 0.35) * 9, ep[1] + Math.sin(mea + 0.35) * 9, 3.4, 0, 6.283); ctx.fill();
      bossHpBar(ep[0], ep[1], e);
    } else if (e.type === 'voltwing') {
      // golden falcon: swept wings, lightning crest, telegraphs dashes
      var va = (e.mode === 'dash') ? e.dashA : Math.atan2(player.y - e.y, player.x - e.x);
      if (e.mode === 'tele') {
        // telegraph beam
        ctx.strokeStyle = 'rgba(255,60,60,' + (0.4 + 0.4 * Math.sin(elapsed * 30)).toFixed(2) + ')';
        ctx.lineWidth = 3;
        ctx.setLineDash([8, 6]);
        ctx.beginPath(); ctx.moveTo(ep[0], ep[1]);
        ctx.lineTo(ep[0] + Math.cos(e.dashA) * 220, ep[1] + Math.sin(e.dashA) * 220); ctx.stroke();
        ctx.setLineDash([]);
      }
      ctx.fillStyle = flash ? '#fff' : '#c8920a';
      tri(ep[0], ep[1], e.r + 8, va);
      ctx.fillStyle = flash ? '#fff' : '#ffe14d';
      tri(ep[0], ep[1], e.r + 1, va);
      // crest fins
      ctx.fillStyle = flash ? '#fff' : '#8a5f06';
      tri(ep[0] - Math.cos(va) * 6 + Math.cos(va + 2.2) * 10, ep[1] - Math.sin(va) * 6 + Math.sin(va + 2.2) * 10, 8, va + 2.2);
      tri(ep[0] - Math.cos(va) * 6 + Math.cos(va - 2.2) * 10, ep[1] - Math.sin(va) * 6 + Math.sin(va - 2.2) * 10, 8, va - 2.2);
      // visor eye
      ctx.fillStyle = '#401a00';
      ctx.fillRect(ep[0] + Math.cos(va) * 6 - 4, ep[1] + Math.sin(va) * 6 - 2, 8, 4);
      ctx.fillStyle = '#ff4040';
      ctx.fillRect(ep[0] + Math.cos(va) * 6 - 3, ep[1] + Math.sin(va) * 6 - 1, 6, 2);
      bossHpBar(ep[0], ep[1], e);
    } else if (e.type === 'aegis') {
      // warden shell: armored hex dome, portholes, shield bubble
      ctx.fillStyle = flash ? '#fff' : '#1e5a80';
      poly(ep[0], ep[1], e.r, 8, e.rot * 0.2);
      ctx.fillStyle = flash ? '#fff' : '#3aa8e8';
      poly(ep[0], ep[1], e.r * 0.72, 8, e.rot * 0.2 + 0.4);
      ctx.fillStyle = flash ? '#fff' : '#0e2a3e';
      for (var ph = 0; ph < 6; ph++) {
        var pa = e.rot * 0.2 + ph * 6.283 / 6;
        ctx.beginPath(); ctx.arc(ep[0] + Math.cos(pa) * e.r * 0.45, ep[1] + Math.sin(pa) * e.r * 0.45, 3.2, 0, 6.283); ctx.fill();
      }
      ctx.fillStyle = '#dff4ff';
      ctx.beginPath(); ctx.arc(ep[0], ep[1], e.r * 0.2, 0, 6.283); ctx.fill();
      if (e.shield) {
        ctx.strokeStyle = 'rgba(125,223,255,' + (0.55 + 0.3 * Math.sin(elapsed * 8)).toFixed(2) + ')';
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(ep[0], ep[1], e.r + 8, 0, 6.283); ctx.stroke();
      }
      bossHpBar(ep[0], ep[1], e);
    } else if (e.type === 'hex') {
      // blade hunter: magenta kite with sensor eye + ion trail
      var ha = Math.atan2(player.y - e.y, player.x - e.x);
      ctx.fillStyle = flash ? '#fff' : '#a02868';
      ctx.save();
      ctx.translate(ep[0], ep[1]); ctx.rotate(ha);
      ctx.fillRect(-e.r - 4, -4, (e.r + 4) * 2, 8);
      ctx.fillRect(-3, -e.r - 2, 6, (e.r + 2) * 2);
      ctx.fillStyle = flash ? '#fff' : '#ff6ab8';
      ctx.fillRect(-e.r + 2, -2, (e.r - 2) * 2, 4);
      ctx.restore();
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(ep[0] + Math.cos(ha) * 4, ep[1] + Math.sin(ha) * 4, 3, 0, 6.283); ctx.fill();
      ctx.fillStyle = '#ff0848';
      ctx.beginPath(); ctx.arc(ep[0] + Math.cos(ha) * 4, ep[1] + Math.sin(ha) * 4, 1.6, 0, 6.283); ctx.fill();
      bossHpBar(ep[0], ep[1], e);
    } else if (e.type === 'voidlord') {
      // abyssal sovereign: dark halo, rune ring, devouring core
      ctx.fillStyle = 'rgba(60,10,110,0.5)';
      ctx.beginPath(); ctx.arc(ep[0], ep[1], e.r + 14 + Math.sin(elapsed * 3) * 4, 0, 6.283); ctx.fill();
      ctx.fillStyle = flash ? '#fff' : '#3a1068';
      poly(ep[0], ep[1], e.r, 8, e.rot * 0.25);
      ctx.fillStyle = flash ? '#fff' : '#6a20b8';
      poly(ep[0], ep[1], e.r * 0.7, 8, -e.rot * 0.25);
      // rune ring
      ctx.fillStyle = '#c870ff';
      for (var rn = 0; rn < 8; rn++) {
        var ra = -e.rot * 0.6 + rn * 6.283 / 8;
        ctx.fillRect(ep[0] + Math.cos(ra) * e.r * 0.85 - 2, ep[1] + Math.sin(ra) * e.r * 0.85 - 2, 4, 4);
      }
      // devouring core
      ctx.fillStyle = flash ? '#fff' : '#12041f';
      ctx.beginPath(); ctx.arc(ep[0], ep[1], e.r * 0.34, 0, 6.283); ctx.fill();
      ctx.fillStyle = '#e080ff';
      ctx.beginPath(); ctx.arc(ep[0], ep[1], e.r * 0.2 * (1 + 0.2 * Math.sin(elapsed * 7)), 0, 6.283); ctx.fill();
      // triple eyes
      var vea = Math.atan2(player.y - e.y, player.x - e.x);
      [-0.5, 0, 0.5].forEach(function(off) {
        ctx.fillStyle = '#ff3050';
        ctx.beginPath(); ctx.arc(ep[0] + Math.cos(vea + off) * e.r * 0.55, ep[1] + Math.sin(vea + off) * e.r * 0.55, 2.6, 0, 6.283); ctx.fill();
      });
      bossHpBar(ep[0], ep[1], e);
    } else if (e.type === 'brute') {
      // dreadnought: hex hull, rotating gun ring, burning core
      ctx.fillStyle = flash ? '#fff' : '#5a2088';
      poly(ep[0], ep[1], e.r, 6, e.rot * 0.3);
      ctx.fillStyle = flash ? '#fff' : '#7a30c8';
      poly(ep[0], ep[1], e.r * 0.78, 6, e.rot * 0.3 + 0.5);
      // rotating gun ring
      for (var gs = 0; gs < 6; gs++) {
        var ga = e.rot + gs * 6.283 / 6;
        ctx.fillStyle = flash ? '#fff' : '#3a1060';
        ctx.fillRect(ep[0] + Math.cos(ga) * e.r * 0.95 - 3, ep[1] + Math.sin(ga) * e.r * 0.95 - 3, 6, 6);
      }
      // burning core (pulse speeds up as it weakens)
      var coreP = 0.5 + 0.5 * Math.sin(elapsed * (4 + (1 - clamp(e.hp / e.maxhp, 0, 1)) * 10));
      ctx.fillStyle = flash ? '#fff' : '#e040f0';
      ctx.beginPath(); ctx.arc(ep[0], ep[1], e.r * 0.34 * (1 + coreP * 0.15), 0, 6.283); ctx.fill();
      ctx.fillStyle = '#ffd0ff';
      ctx.beginPath(); ctx.arc(ep[0], ep[1], e.r * 0.14, 0, 6.283); ctx.fill();
      ctx.fillStyle = '#ffd83d';
      for (var s = 0; s < 5; s++) {
        var sa = -Math.PI / 2 + s * 6.283 / 5;
        ctx.fillRect(ep[0] + Math.cos(sa) * (e.r + 2) - 2, ep[1] + Math.sin(sa) * (e.r + 2) - 2, 4, 4);
      }
      // hp bar
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(ep[0] - 20, ep[1] - e.r - 12, 40, 5);
      ctx.fillStyle = '#c080ff';
      ctx.fillRect(ep[0] - 20, ep[1] - e.r - 12, 40 * clamp(e.hp / e.maxhp, 0, 1), 5);
    }
    if (e.spawnT > 0) ctx.globalAlpha = 1;
  }
  // bolts (glowing plasma slugs)
  for (var bi = 0; bi < bolts.length; bi++) {
    var bl = bolts[bi], bp = P(bl.x, bl.y);
    var ba = Math.atan2(bl.vy, bl.vx);
    ctx.save();
    ctx.translate(bp[0], bp[1]); ctx.rotate(ba);
    ctx.fillStyle = 'rgba(90,180,255,0.35)';
    ctx.fillRect(-9, -4, 18, 8);
    ctx.fillStyle = '#58b6ff';
    ctx.fillRect(-8, -2.5, 16, 5);
    ctx.fillStyle = '#fff';
    ctx.fillRect(-8, -1, 16, 2);
    ctx.restore();
  }
  // missiles (armored darts with fat flames)
  for (var mi = 0; mi < missiles.length; mi++) {
    var ms = missiles[mi], mp = P(ms.x, ms.y);
    var ma = Math.atan2(ms.vy, ms.vx);
    ctx.save();
    ctx.translate(mp[0], mp[1]); ctx.rotate(ma);
    ctx.fillStyle = 'rgba(255,140,40,0.55)';
    ctx.beginPath(); ctx.arc(-9, 0, 5 + Math.random() * 2, 0, 6.283); ctx.fill();
    ctx.fillStyle = '#c8ccd8';
    ctx.fillRect(-7, -3.5, 13, 7);
    ctx.fillStyle = '#5a5f6a';
    ctx.fillRect(-7, -3.5, 4, 7);
    ctx.fillStyle = '#ff5020';
    ctx.beginPath(); ctx.arc(5, 0, 3.4, 0, 6.283); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.fillRect(4, -1, 3, 2);
    ctx.restore();
  }
  // tesla arcs (jagged flickering polylines)
  for (var zai = 0; zai < zaps.length; zai++) {
    var zp = zaps[zai].pts;
    if (zp.length < 2) continue;
    ctx.strokeStyle = 'rgba(140,220,255,' + clamp(zaps[zai].life * 5, 0, 0.9).toFixed(2) + ')';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(zp[0].x + ox, zp[0].y + oy);
    for (var zs = 1; zs < zp.length; zs++) {
      var za = zp[zs - 1], zb = zp[zs];
      var mx = (za.x + zb.x) / 2 + (Math.random() - 0.5) * 26;
      var my = (za.y + zb.y) / 2 + (Math.random() - 0.5) * 26;
      ctx.lineTo(mx + ox, my + oy);
      ctx.lineTo(zb.x + ox, zb.y + oy);
    }
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.9)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  // enemy bullets (magenta plasma orbs with trails)
  for (var ebi = 0; ebi < ebullets.length; ebi++) {
    var ebo = ebullets[ebi], eq = P(ebo.x, ebo.y);
    if (eq[0] < -20 || eq[1] < -20 || eq[0] > W + 20 || eq[1] > H + 20) continue;
    ctx.fillStyle = 'rgba(255,60,220,0.35)';
    ctx.beginPath(); ctx.arc(eq[0], eq[1], 8, 0, 6.283); ctx.fill();
    ctx.fillStyle = '#ff44dd';
    ctx.beginPath(); ctx.arc(eq[0], eq[1], 4, 0, 6.283); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(eq[0], eq[1], 1.6, 0, 6.283); ctx.fill();
  }
  // orbit blades (spinning energy shurikens)
  if (player.weapons.orbit) {
    var n = 1 + player.weapons.orbit, rr = 52 + player.weapons.orbit * 6;
    for (var k = 0; k < n; k++) {
      var oa = player.orbitA + k * 6.283 / n;
      var oxp = player.x + Math.cos(oa) * rr + ox, oyp = player.y + Math.sin(oa) * rr + oy;
      ctx.save();
      ctx.translate(oxp, oyp); ctx.rotate(oa * 2.2);
      ctx.fillStyle = 'rgba(140,200,255,0.3)';
      ctx.fillRect(-11, -11, 22, 22);
      ctx.fillStyle = '#9fd0ff';
      ctx.fillRect(-10, -2.5, 20, 5);
      ctx.fillRect(-2.5, -10, 5, 20);
      ctx.fillStyle = '#fff';
      ctx.fillRect(-3, -3, 6, 6);
      ctx.restore();
    }
  }
  // player ship — layered interceptor, banks into turns
  var pp = P(player.x, player.y);
  var blink = player.iframes > 0 && Math.floor(elapsed * 14) % 2 === 0;
  if (!blink) {
    var bank = player.bank || 0;
    // engine flame (twin nozzles)
    var fl = 9 + Math.random() * 7 + Math.hypot(player.vx, player.vy) * 0.035;
    var bx = pp[0] - Math.cos(player.face) * 13, by = pp[1] - Math.sin(player.face) * 13;
    var pxa = player.face + Math.PI / 2;
    [-5, 5].forEach(function(off) {
      var nx = bx + Math.cos(pxa) * off, ny = by + Math.sin(pxa) * off;
      ctx.fillStyle = 'rgba(255,120,20,0.85)';
      tri(nx, ny, fl * 0.8, player.face + Math.PI);
      ctx.fillStyle = '#ffe080';
      tri(nx, ny, fl * 0.4, player.face + Math.PI);
    });
    ctx.save();
    ctx.translate(pp[0], pp[1]);
    ctx.rotate(player.face + bank * 0.45);
    // shadow layer (dark hull base, slightly bigger)
    ctx.fillStyle = '#101c3a';
    ctx.beginPath();
    ctx.moveTo(19, 0); ctx.lineTo(-10, -13); ctx.lineTo(-6, 0); ctx.lineTo(-10, 13);
    ctx.closePath(); ctx.fill();
    // wing fins
    ctx.fillStyle = '#24407c';
    ctx.beginPath();
    ctx.moveTo(2, 0); ctx.lineTo(-12, -16); ctx.lineTo(-8, -2); ctx.closePath(); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(2, 0); ctx.lineTo(-12, 16); ctx.lineTo(-8, 2); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#3a6ac8';
    ctx.beginPath();
    ctx.moveTo(2, 0); ctx.lineTo(-12, -16); ctx.lineTo(-9, -4); ctx.closePath(); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(2, 0); ctx.lineTo(-12, 16); ctx.lineTo(-9, 4); ctx.closePath(); ctx.fill();
    // main hull
    ctx.fillStyle = '#2a4a8a';
    ctx.beginPath();
    ctx.moveTo(18, 0); ctx.lineTo(-8, -8); ctx.lineTo(-4, 0); ctx.lineTo(-8, 8);
    ctx.closePath(); ctx.fill();
    // nose + spine highlight
    ctx.fillStyle = '#6aa0e8';
    ctx.beginPath();
    ctx.moveTo(18, 0); ctx.lineTo(8, -3); ctx.lineTo(8, 3);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#9dc8ff';
    ctx.fillRect(-4, -1, 14, 2);
    // cockpit bubble
    ctx.fillStyle = '#0a2038';
    ctx.beginPath(); ctx.arc(4, 0, 5.5, 0, 6.283); ctx.fill();
    ctx.fillStyle = '#bfe4ff';
    ctx.beginPath(); ctx.arc(4, 0, 3.6, 0, 6.283); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(3, -1, 1.4, 0, 6.283); ctx.fill();
    // wingtip lights
    ctx.fillStyle = (Math.floor(elapsed * 4) % 2) ? '#ff4040' : '#40ff70';
    ctx.fillRect(-12, -16, 3, 3);
    ctx.fillStyle = (Math.floor(elapsed * 4) % 2) ? '#40ff70' : '#ff4040';
    ctx.fillRect(-12, 13, 3, 3);
    ctx.restore();
    if (player.armor > 0) {
      ctx.strokeStyle = 'rgba(140,220,255,' + (0.4 + 0.2 * Math.sin(elapsed * 5)).toFixed(2) + ')';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(pp[0], pp[1], 22, 0, 6.283); ctx.stroke();
    }
  }
  // particles
  for (var pi = 0; pi < parts.length; pi++) {
    var pt = parts[pi], pp2 = P(pt.x, pt.y);
    ctx.globalAlpha = clamp(pt.life * 2.5, 0, 1);
    ctx.fillStyle = pt.col;
    ctx.fillRect(pp2[0] - 2, pp2[1] - 2, 4, 4);
  }
  ctx.globalAlpha = 1;
  // floats
  ctx.textAlign = 'center';
  ctx.font = 'bold 12px monospace';
  for (var fi = 0; fi < floats.length; fi++) {
    var fl2 = floats[fi], fp = P(fl2.x, fl2.y);
    ctx.globalAlpha = clamp(fl2.life, 0, 1);
    ctx.fillStyle = fl2.col;
    ctx.fillText(fl2.txt, fp[0], fp[1]);
  }
  ctx.globalAlpha = 1;
  // shockwave rings
  for (var ri = 0; ri < rings.length; ri++) {
    var rg2 = rings[ri], rp = P(rg2.x, rg2.y);
    var ra = clamp(rg2.life / rg2.max, 0, 1);
    ctx.globalAlpha = ra;
    ctx.strokeStyle = rg2.col;
    ctx.lineWidth = rg2.lw;
    ctx.beginPath(); ctx.arc(rp[0], rp[1], rg2.r, 0, 6.283); ctx.stroke();
    ctx.globalAlpha = ra * 0.5;
    ctx.lineWidth = rg2.lw * 2.5;
    ctx.beginPath(); ctx.arc(rp[0], rp[1], rg2.r * 0.85, 0, 6.283); ctx.stroke();
  }
  ctx.globalAlpha = 1;
  // hurt vignette
  if (hurtT > 0) {
    var va = clamp(hurtT * 1.6, 0, 0.55);
    var vg = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.32, W / 2, H / 2, Math.max(W, H) * 0.72);
    vg.addColorStop(0, 'rgba(255,0,0,0)');
    vg.addColorStop(1, 'rgba(255,30,20,' + va.toFixed(2) + ')');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, W, H);
  }
}
function drawStars(par, size, cell) {
  var ox = W / 2 - camX * par, oy = H / 2 - camY * par;
  var x0 = Math.floor((camX * par - W / 2) / cell) - 1;
  var x1 = Math.floor((camX * par + W / 2) / cell) + 1;
  var y0 = Math.floor((camY * par - H / 2) / cell) - 1;
  var y1 = Math.floor((camY * par + H / 2) / cell) + 1;
  for (var gx = x0; gx <= x1; gx++) for (var gy = y0; gy <= y1; gy++) {
    var h = hash2(gx, gy);
    if (h < 0.55) continue;
    var sx = gx * cell + hash2(gy, gx * 7 + 1) * cell;
    var sy = gy * cell + hash2(gx * 3 + 2, gy) * cell;
    var px = sx - camX * par + W / 2, py = sy - camY * par + H / 2;
    var tw = 0.6 + 0.4 * Math.sin(elapsed * 2 + h * 20);
    ctx.globalAlpha = tw * (0.35 + par * 0.5);
    ctx.fillStyle = h > 0.93 ? '#9df' : (h > 0.88 ? '#fda' : '#fff');
    var s2 = size * (h > 0.93 ? 1.6 : 1);
    ctx.fillRect(px, py, s2, s2);
  }
  ctx.globalAlpha = 1;
}
function poly(x, y, r, n, rot) {
  ctx.beginPath();
  for (var i = 0; i < n; i++) {
    var a = rot + i * 6.283 / n;
    var px = x + Math.cos(a) * r, py = y + Math.sin(a) * r;
    if (i) ctx.lineTo(px, py); else ctx.moveTo(px, py);
  }
  ctx.closePath(); ctx.fill();
}
function rockPoly(x, y, r, seed, rot) {
  ctx.beginPath();
  for (var i = 0; i < 9; i++) {
    var a = rot + i * 6.283 / 9;
    var rr = r * (0.78 + hash2(i * 13 + Math.floor(seed * 97), 7) * 0.4);
    var px = x + Math.cos(a) * rr, py = y + Math.sin(a) * rr;
    if (i) ctx.lineTo(px, py); else ctx.moveTo(px, py);
  }
  ctx.closePath(); ctx.fill();
}
function bossHpBar(x, y, e) {
  if (!e.isBoss) return;
  var w = 84;
  ctx.fillStyle = 'rgba(0,0,0,0.65)';
  ctx.fillRect(x - w / 2, y - e.r - 18, w, 7);
  ctx.fillStyle = '#ff5577';
  ctx.fillRect(x - w / 2, y - e.r - 18, w * clamp(e.hp / e.maxhp, 0, 1), 7);
  ctx.fillStyle = '#ffd83d';
  ctx.font = 'bold 9px monospace';
  ctx.textAlign = 'center';
  ctx.fillText((BOSS_NAMES[e.type] || 'BOSS') + ' · T' + (e.bossTier || 1), x, y - e.r - 22);
}
function tri(x, y, r, dir) {
  ctx.beginPath();
  ctx.moveTo(x + Math.cos(dir) * r, y + Math.sin(dir) * r);
  ctx.lineTo(x + Math.cos(dir + 2.5) * r * 0.8, y + Math.sin(dir + 2.5) * r * 0.8);
  ctx.lineTo(x + Math.cos(dir - 2.5) * r * 0.8, y + Math.sin(dir - 2.5) * r * 0.8);
  ctx.closePath(); ctx.fill();
}

// ---------- main loop ----------
var lastT = 0;
function frame(t) {
  requestAnimationFrame(frame);
  var dt = Math.min(0.05, (t - lastT) / 1000 || 0.016);
  lastT = t;
  if (state === 'play') update(dt);
  draw();
}

// ---------- wiring ----------
el('btn-launch').onclick = function() { STAR_Audio.unlock(); STAR_Audio.click(); startRun(); };
el('btn-how').onclick = function() { STAR_Audio.click(); hide('screen-menu'); show('screen-how'); };
el('btn-how-back').onclick = function() { STAR_Audio.click(); hide('screen-how'); show('screen-menu'); };
el('btn-pause').onclick = function() { STAR_Audio.click(); togglePause(); };
el('btn-mute').onclick = function() { toggleMute(); };
el('btn-resume').onclick = function() { STAR_Audio.click(); togglePause(); };
el('btn-quit').onclick = function() { STAR_Audio.click(); hide('screen-pause'); toMenu(); };
el('btn-retry').onclick = function() { STAR_Audio.click(); startRun(); };
el('btn-menu').onclick = function() { STAR_Audio.click(); toMenu(); };
el('btn-back-bf').onclick = function() { try { window.location.href = '../games.html?v=2'; } catch (e) {} };
function toMenu() {
  state = 'menu';
  ['screen-over', 'screen-pause', 'screen-levelup', 'screen-how'].forEach(hide);
  hide('hud');
  show('screen-menu');
  refreshMenu();
  STAR_Audio.musicDuck(false);
  STAR_Audio.musicMenu();
}
function updateMuteBtn() {
  var b = el('btn-mute');
  if (b) b.textContent = STAR_Audio.isMusicOn() ? '🔊' : '🔇';
}
function toggleMute() {
  STAR_Audio.unlock();
  updateMuteBtn();
  STAR_Audio.click();
}
function refreshMenu() {
  var b = loadBest();
  el('best-line').textContent = b ? ('BEST — ' + fmtTime(b.time) + ' · Lv' + b.level + ' · ' + b.kills + ' kills') : 'No flights logged, pilot.';
  var hero = BF_HERO ? ('🔗 BlockForge hero: ' + BF_HERO.toUpperCase().slice(0, 12) + (BF_DEV ? ' 👑DEV — Orbit Blades unlocked!' : '') + ' — good hunting!') : 'Tip: set a name in BlockForge and we’ll fill in your callsign!';
  el('hero-line').textContent = hero;
}
refreshMenu();
requestAnimationFrame(frame);
})();
