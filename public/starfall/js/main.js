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
var player, enemies, bolts, missiles, cores, parts, floats;
var camX = 0, camY = 0, shake = 0;
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
    iframes: 0,
    weapons: { blaster: 1, orbit: BF_DEV ? 1 : 0, missiles: 0 },
    orbitA: 0, fireT: 0, misT: 0,
  };
  enemies = []; bolts = []; missiles = []; cores = []; parts = []; floats = [];
  camX = 0; camY = 0; shake = 0;
  elapsed = 0; kills = 0; spawnT = 1.2; eliteT = 45; pendingLevels = 0;
}
function xpFor(lv) { return Math.floor(5 + lv * 3 + lv * lv * 0.45); }

// ---------- enemy types ----------
var ETYPES = {
  drifter:  { hp: 4,  spd: 55, r: 12, dmg: 8,  xp: 1, col: '#8a8f9a' },
  dart:     { hp: 3,  spd: 120, r: 9, dmg: 10, xp: 1, col: '#f08018' },
  splitter: { hp: 14, spd: 45, r: 16, dmg: 12, xp: 3, col: '#3ec850' },
  mite:     { hp: 2,  spd: 95, r: 7,  dmg: 6,  xp: 1, col: '#7fe880' },
  brute:    { hp: 90, spd: 38, r: 26, dmg: 22, xp: 8, col: '#a04ae0' },
};
function difficulty() { return 1 + elapsed / 150; }

function spawnEnemy(forceType) {
  if (enemies.length > 140) return;
  var a = Math.random() * Math.PI * 2;
  var d = Math.max(W, H) * 0.62 + Math.random() * 120;
  var x = player.x + Math.cos(a) * d, y = player.y + Math.sin(a) * d;
  var type = forceType;
  if (!type) {
    var r = Math.random(), t = elapsed;
    if (t > 150 && r < 0.14) type = 'splitter';
    else if (t > 60 && r < 0.34) type = 'dart';
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
  });
}

function damageEnemy(e, dmg, kx, ky) {
  e.hp -= dmg;
  e.flash = 0.08;
  if (kx || ky) { e.x += kx; e.y += ky; }
  if (e.hp <= 0 && !e.dead) {
    e.dead = true;
    kills++;
    dropCores(e.x, e.y, e.xp);
    burst(e.x, e.y, e.type === 'brute' ? '#c080ff' : '#8899aa', e.type === 'brute' ? 26 : 8);
    if (e.type === 'splitter') {
      for (var i = 0; i < 2; i++) {
        var base = ETYPES.mite, mult = difficulty();
        enemies.push({ type: 'mite', x: e.x + (i ? 10 : -10), y: e.y, vx: 0, vy: 0,
          hp: base.hp * mult, maxhp: base.hp * mult, spd: base.spd, r: base.r,
          dmg: base.dmg, xp: base.xp, wob: Math.random() * 6.28, flash: 0 });
      }
    }
    if (e.type === 'brute') {
      player.hp = Math.min(player.maxhp, player.hp + 20);
      addFloat(e.x, e.y, '+20 HULL', '#7dff8a');
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

// ---------- level-up cards ----------
function weaponIcon(w) { return w === 'blaster' ? '🔫' : (w === 'missiles' ? '🚀' : '⚙️'); }
function buildChoices() {
  var pool = [];
  var ws = player.weapons;
  ['blaster', 'orbit', 'missiles'].forEach(function(w) {
    var lv = ws[w] || 0;
    if (lv === 0) pool.push({ kind: 'wnew', w: w });
    else if (lv < 5) pool.push({ kind: 'wup', w: w });
  });
  pool.push({ kind: 'stat', s: 'hull' });
  pool.push({ kind: 'stat', s: 'speed' });
  pool.push({ kind: 'stat', s: 'magnet' });
  pool.push({ kind: 'stat', s: 'armor' });
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
function cardInfo(c) {
  var ws = player.weapons;
  if (c.kind === 'wnew') {
    var nm = c.w === 'blaster' ? 'Pulse Blaster' : (c.w === 'orbit' ? 'Orbit Blades' : 'Seeker Missiles');
    var ds = c.w === 'blaster' ? 'Auto-fires bolts at the nearest foe.' : (c.w === 'orbit' ? 'Blades circle your hull, shredding contact.' : 'Homing missiles with splash damage.');
    return { emoji: weaponIcon(c.w), name: 'NEW: ' + nm, desc: ds, lv: '' };
  }
  if (c.kind === 'wup') {
    var nm2 = c.w === 'blaster' ? 'Pulse Blaster' : (c.w === 'orbit' ? 'Orbit Blades' : 'Seeker Missiles');
    return { emoji: weaponIcon(c.w), name: nm2 + ' +', desc: 'More damage, faster, meaner.', lv: 'Lv ' + ws[c.w] + ' → ' + (ws[c.w] + 1) };
  }
  var map = {
    hull:   { emoji: '🛡️', name: '+25 Max Hull', desc: 'Reinforced plating. Heals 25 now.' },
    speed:  { emoji: '⚡', name: 'Ion Thrusters', desc: '+12% flight speed.' },
    magnet: { emoji: '🧲', name: 'Tractor Web', desc: '+40% pickup range.' },
    armor:  { emoji: '🔩', name: 'Ablative Armor', desc: 'Block +2 damage per hit.' },
    repair: { emoji: '🔧', name: 'Field Repairs', desc: 'Restore 50 hull now.' },
    regen:  { emoji: '💚', name: 'Nanobots', desc: 'Regenerate 0.8 hull/sec.' },
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
  else if (c.s === 'repair') player.hp = Math.min(player.maxhp, player.hp + 50);
  else if (c.s === 'regen') player.regen += 0.8;
  refreshWeaponHUD();
}

// ---------- HUD / screens ----------
var el = function(id) { return document.getElementById(id); };
function show(id) { el(id).classList.remove('hidden'); }
function hide(id) { el(id).classList.add('hidden'); }
function refreshWeaponHUD() {
  var w = el('hud-weapons');
  w.innerHTML = '';
  ['blaster', 'orbit', 'missiles'].forEach(function(k) {
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
    el('pause-stats').innerHTML = fmtTime(elapsed) + ' · Lv' + player.level + ' · ' + kills + ' kills';
    show('screen-pause');
  } else if (state === 'pause') {
    hide('screen-pause');
    state = 'play';
  }
}
function startRun() {
  newRun();
  refreshWeaponHUD();
  ['screen-menu', 'screen-how', 'screen-over', 'screen-pause', 'screen-levelup'].forEach(hide);
  show('hud');
  state = 'play';
  STAR_Audio.unlock();
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
  if (player.iframes > 0) player.iframes -= dt;
  if (player.regen > 0) player.hp = Math.min(player.maxhp, player.hp + player.regen * dt);

  // spawn director
  spawnT -= dt;
  if (spawnT <= 0) {
    spawnT = Math.max(0.25, 1.4 - elapsed / 120);
    var batch = 1 + Math.floor(elapsed / 90);
    for (var i = 0; i < batch; i++) spawnEnemy();
  }
  eliteT -= dt;
  if (eliteT <= 0) { eliteT = 60; spawnEnemy('brute'); addFloat(player.x, player.y - 40, '⚠ BRUTE INBOUND', '#f88'); }

  // weapons
  var W = player.weapons, might = player.might;
  if (W.blaster) {
    player.fireT -= dt;
    if (player.fireT <= 0) {
      player.fireT = Math.max(0.18, 0.55 - W.blaster * 0.07);
      var tgt = nearestEnemy(player.x, player.y, 520);
      if (tgt) {
        var n = 1 + Math.floor((W.blaster - 1) / 2);
        for (var b = 0; b < n; b++) {
          var a = Math.atan2(tgt.y - player.y, tgt.x - player.x) + (b - (n - 1) / 2) * 0.12;
          bolts.push({ x: player.x, y: player.y, vx: Math.cos(a) * 460, vy: Math.sin(a) * 460, dmg: (6 + W.blaster * 3) * might, pierce: 1 + Math.floor(W.blaster / 3), life: 1.1 });
        }
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
        if (e.dead) continue;
        var dd = (e.x - bx) * (e.x - bx) + (e.y - by) * (e.y - by);
        if (dd < (e.r + 10) * (e.r + 10)) {
          if (!e._orbT || elapsed - e._orbT > 0.35) {
            e._orbT = elapsed;
            damageEnemy(e, (8 + W.orbit * 5) * might, (e.x - player.x) * 0.02, (e.y - player.y) * 0.02);
          }
        }
      }
    }
  }
  if (W.missiles) {
    player.misT -= dt;
    if (player.misT <= 0) {
      player.misT = Math.max(0.7, 2.2 - W.missiles * 0.28);
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

  // bolts
  for (var bi = bolts.length - 1; bi >= 0; bi--) {
    var bl = bolts[bi];
    bl.x += bl.vx * dt; bl.y += bl.vy * dt; bl.life -= dt;
    var dead = bl.life <= 0;
    if (!dead) {
      for (var q = 0; q < enemies.length; q++) {
        var be = enemies[q];
        if (be.dead) continue;
        if (dist2(bl.x, bl.y, be.x, be.y) < (be.r + 5) * (be.r + 5)) {
          damageEnemy(be, bl.dmg, bl.vx * 0.0004, bl.vy * 0.0004);
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
      for (var z = enemies.length - 1; z >= 0; z--) {
        var ze = enemies[z];
        if (!ze.dead && dist2(ms.x, ms.y, ze.x, ze.y) < 70 * 70) damageEnemy(ze, ms.dmg, 0, 0);
      }
      missiles.splice(mi, 1);
    }
  }
  // enemies: seek + separate + contact
  for (var i = enemies.length - 1; i >= 0; i--) {
    var en = enemies[i];
    if (en.dead) { enemies.splice(i, 1); continue; }
    if (en.flash > 0) en.flash -= dt;
    en.wob += dt * 3;
    var dx = player.x - en.x, dy = player.y - en.y;
    var dl = Math.hypot(dx, dy) || 1;
    var wobx = 0, woby = 0;
    if (en.type === 'dart') { wobx = -dy / dl * Math.sin(en.wob) * 30; woby = dx / dl * Math.sin(en.wob) * 30; }
    en.x += (dx / dl * en.spd + wobx) * dt;
    en.y += (dy / dl * en.spd + woby) * dt;
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
function nearestEnemy(x, y, maxD) {
  var best = null, bd = maxD * maxD;
  for (var i = 0; i < enemies.length; i++) {
    var e = enemies[i];
    if (e.dead) continue;
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
  if (state === 'menu') return;

  function P(x, y) { return [x + ox, y + oy]; }

  // cores
  for (var i = 0; i < cores.length; i++) {
    var c = cores[i], p = P(c.x, c.y);
    if (p[0] < -20 || p[1] < -20 || p[0] > W + 20 || p[1] > H + 20) continue;
    ctx.fillStyle = '#083';
    ctx.fillRect(p[0] - 4, p[1] - 4, 8, 8);
    ctx.fillStyle = '#2f8';
    ctx.beginPath();
    ctx.moveTo(p[0], p[1] - 5); ctx.lineTo(p[0] + 4, p[1]); ctx.lineTo(p[0], p[1] + 5); ctx.lineTo(p[0] - 4, p[1]);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#cfd';
    ctx.fillRect(p[0] - 1, p[1] - 2, 2, 2);
  }
  // enemies
  for (var ei = 0; ei < enemies.length; ei++) {
    var e = enemies[ei];
    if (e.dead) continue;
    var ep = P(e.x, e.y);
    if (ep[0] < -40 || ep[1] < -40 || ep[0] > W + 40 || ep[1] > H + 40) continue;
    var flash = e.flash > 0;
    if (e.type === 'drifter') {
      ctx.fillStyle = flash ? '#fff' : '#6a6f7a';
      poly(ep[0], ep[1], e.r, 7, e.wob * 0.2);
      ctx.fillStyle = flash ? '#fff' : '#484c56';
      poly(ep[0], ep[1], e.r * 0.55, 7, -e.wob * 0.2);
    } else if (e.type === 'dart') {
      var da = Math.atan2(player.y - e.y, player.x - e.x);
      ctx.fillStyle = flash ? '#fff' : '#f08018';
      tri(ep[0], ep[1], e.r + 4, da);
      ctx.fillStyle = flash ? '#fff' : '#ffb060';
      tri(ep[0], ep[1], e.r * 0.5, da);
    } else if (e.type === 'splitter' || e.type === 'mite') {
      ctx.fillStyle = flash ? '#fff' : (e.type === 'splitter' ? '#2fa848' : '#5ed878');
      ctx.beginPath(); ctx.arc(ep[0], ep[1], e.r, 0, 6.283); ctx.fill();
      ctx.fillStyle = flash ? '#fff' : 'rgba(220,255,220,0.5)';
      ctx.beginPath(); ctx.arc(ep[0] - e.r * 0.3, ep[1] - e.r * 0.3, e.r * 0.35, 0, 6.283); ctx.fill();
      if (e.type === 'splitter') {
        ctx.fillStyle = '#1a5a28';
        ctx.fillRect(ep[0] - 2, ep[1] - e.r - 2, 4, 4);
        ctx.fillRect(ep[0] - 2, ep[1] + e.r - 2, 4, 4);
      }
    } else if (e.type === 'brute') {
      ctx.fillStyle = flash ? '#fff' : '#7a30c8';
      poly(ep[0], ep[1], e.r, 6, e.wob * 0.1);
      ctx.fillStyle = flash ? '#fff' : '#b060f0';
      poly(ep[0], ep[1], e.r * 0.6, 6, -e.wob * 0.1);
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
  }
  // bolts
  ctx.fillStyle = '#7df';
  for (var bi = 0; bi < bolts.length; bi++) {
    var bl = bolts[bi], bp = P(bl.x, bl.y);
    var ba = Math.atan2(bl.vy, bl.vx);
    ctx.save();
    ctx.translate(bp[0], bp[1]); ctx.rotate(ba);
    ctx.fillRect(-7, -2, 14, 4);
    ctx.fillStyle = '#fff';
    ctx.fillRect(-7, -1, 14, 2);
    ctx.fillStyle = '#7df';
    ctx.restore();
  }
  // missiles
  for (var mi = 0; mi < missiles.length; mi++) {
    var ms = missiles[mi], mp = P(ms.x, ms.y);
    var ma = Math.atan2(ms.vy, ms.vx);
    ctx.save();
    ctx.translate(mp[0], mp[1]); ctx.rotate(ma);
    ctx.fillStyle = '#fa4';
    ctx.fillRect(-6, -3, 12, 6);
    ctx.fillStyle = '#ffd080';
    ctx.fillRect(0, -2, 6, 4);
    ctx.fillStyle = '#fff';
    ctx.fillRect(4, -1, 3, 2);
    ctx.restore();
  }
  // orbit blades
  if (player.weapons.orbit) {
    var n = 1 + player.weapons.orbit, rr = 52 + player.weapons.orbit * 6;
    ctx.fillStyle = '#afd8ff';
    for (var k = 0; k < n; k++) {
      var oa = player.orbitA + k * 6.283 / n;
      var oxp = player.x + Math.cos(oa) * rr + ox, oyp = player.y + Math.sin(oa) * rr + oy;
      ctx.save();
      ctx.translate(oxp, oyp); ctx.rotate(oa + 1.2);
      ctx.fillRect(-9, -3, 18, 6);
      ctx.fillStyle = '#fff';
      ctx.fillRect(-9, -3, 18, 2);
      ctx.fillStyle = '#afd8ff';
      ctx.restore();
    }
  }
  // player ship
  var pp = P(player.x, player.y);
  var blink = player.iframes > 0 && Math.floor(elapsed * 14) % 2 === 0;
  if (!blink) {
    // engine flame
    var fl = 8 + Math.random() * 8 + Math.hypot(player.vx, player.vy) * 0.03;
    ctx.fillStyle = '#f80';
    tri(pp[0] - Math.cos(player.face) * 12, pp[1] - Math.sin(player.face) * 12, fl, player.face + Math.PI);
    ctx.fillStyle = '#fd8';
    tri(pp[0] - Math.cos(player.face) * 12, pp[1] - Math.sin(player.face) * 12, fl * 0.55, player.face + Math.PI);
    // hull
    ctx.fillStyle = '#2a4a8a';
    tri(pp[0], pp[1], 16, player.face);
    ctx.fillStyle = '#4a7ad8';
    tri(pp[0], pp[1], 10, player.face);
    // cockpit
    ctx.fillStyle = '#9df';
    ctx.beginPath(); ctx.arc(pp[0] + Math.cos(player.face) * 3, pp[1] + Math.sin(player.face) * 3, 4, 0, 6.283); ctx.fill();
    // wings
    ctx.fillStyle = '#1a3260';
    var wa = player.face + Math.PI / 2;
    tri(pp[0] + Math.cos(wa) * 8 - Math.cos(player.face) * 6, pp[1] + Math.sin(wa) * 8 - Math.sin(player.face) * 6, 9, wa);
    tri(pp[0] - Math.cos(wa) * 8 - Math.cos(player.face) * 6, pp[1] - Math.sin(wa) * 8 - Math.sin(player.face) * 6, 9, wa + Math.PI);
    if (player.armor > 0) {
      ctx.strokeStyle = 'rgba(140,220,255,0.55)';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(pp[0], pp[1], 20, 0, 6.283); ctx.stroke();
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
el('btn-resume').onclick = function() { STAR_Audio.click(); togglePause(); };
el('btn-quit').onclick = function() { STAR_Audio.click(); hide('screen-pause'); toMenu(); };
el('btn-retry').onclick = function() { STAR_Audio.click(); startRun(); };
el('btn-menu').onclick = function() { STAR_Audio.click(); toMenu(); };
el('btn-back-bf').onclick = function() { try { window.location.href = '../games.html'; } catch (e) {} };
function toMenu() {
  state = 'menu';
  ['screen-over', 'screen-pause', 'screen-levelup', 'screen-how'].forEach(hide);
  hide('hud');
  show('screen-menu');
  refreshMenu();
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
