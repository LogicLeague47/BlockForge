import * as THREE from 'three';
import { towerStats, troopStats, waveComp, TH_LEVELS, HERO, HERO_LEVELS, ascMult } from './balance.js';
import { gridToWorld } from './world.js';
import { makeSwarm, makeTroop } from './models.js';
import { sfx } from './audio.js';

function dist2(a, b) { const dx = a.x - b.x, dz = a.z - b.z; return Math.sqrt(dx * dx + dz * dz); }

export class Battle {
  constructor(scene, baseView) {
    this.scene = scene; this.view = baseView;
    this.active = false; this.mode = null;
    this.defs = [];   // defensive buildings {x,z,hp,max,type,level,cd,mesh,side}
    this.atk = [];    // attackers {mesh,x,z,hp,max,dmg,speed,cd,slowT,side,type}
    this.projs = [];
    this.spawnQueue = []; this.spawnT = 0;
    this.onEnd = null; this.th = null;
    this.destroyed = 0; this.totalDefs = 1;
    this.projGeo = new THREE.SphereGeometry(0.16, 8, 6);
  }
  clearField() {
    for (const a of this.atk) this.scene.remove(a.mesh);
    for (const p of this.projs) this.scene.remove(p.mesh);
    this.atk = []; this.projs = []; this.spawnQueue = []; this.defs = [];
  }
  _gw(gx, gz) { return gridToWorld(gx, gz); }

  startDefend(state, waveN) {
    this.clearField(); this.view.render(state);
    this.active = true; this.mode = 'defend';
    const comp = waveComp(waveN);
    // TH hp scales with TH level; heal to full at battle start
    const thHp = (TH_LEVELS[state.thLevel || 1] || TH_LEVELS[1]).hp;
    state.th.hp = thHp;
    // defenses from player state
    this.defs = this._defsFromState(state);
    this.th = { ref: state.th };
    // queue swarm (boss flag preserved)
    for (let i = 0; i < comp.count; i++) {
      this.spawnQueue.push({ hp: Math.round(55 * comp.hpMul), dmg: Math.round(10 * comp.dmgMul), speed: comp.speed, delay: i * 0.7, boss: comp.boss && i === 0 });
    }
    this.totalDefs = this.defs.length + 1;
    this.destroyed = 0;
    this.time = 0;
  }

  startRaid(ghost) {
    this.clearField();
    // render ghost base (TH hp scales with ghost tier)
    const gTh = 1200 + (ghost.towers.reduce((a, t) => a + t.level, 0) || 0) * 150;
    const fake = { th: { x: 7, z: 7, hp: gTh }, thLevel: 2, towers: ghost.towers.map((t, i) => ({ ...t, id: 'g' + i })), walls: (ghost.walls || []).map((w, i) => ({ ...w, type: 'wall', level: 1, id: 'gw' + i })) };
    this.view.render(fake);
    this.active = true; this.mode = 'raid';
    this.defs = this._defsFromState(fake);
    this.ghost = ghost;
    this.totalDefs = this.defs.length + 1;
    this.destroyed = 0; this.deployed = 0; this.maxDeploy = 14;
    this.time = 0;
  }

  _defsFromState(state) {
    const mult = ascMult(state.shards);
    const list = [];
    const mk = (b, isTH = false) => {
      const p = this._gw(b.x, b.z);
      let st = isTH ? { dmg: Math.round(10 * mult), range: 6, rate: 1, hp: Math.round((state.th.hp ?? 1200) * mult), slow: 0 } : towerStats(b.type, b.level);
      if (!isTH) { st = { ...st, dmg: Math.round(st.dmg * mult), hp: Math.round(st.hp * mult) }; }
      // find mesh placed by view
      const mesh = isTH ? this.view.thMesh : this.view.meshes.get(b.id);
      return { id: b.id || 'th', type: b.type || 'th', level: b.level || 1, gx: b.x, gz: b.z, x: p.x, z: p.z, hp: st.hp, max: st.hp, ...st, cd: 0, mesh, dead: false, isTH };
    };
    for (const t of state.towers) list.push(mk(t));
    for (const w of state.walls) {
      const p = this._gw(w.x, w.z);
      const hp = Math.round(220 * w.level * mult);
      const mesh = this.view.meshes.get(w.id);
      list.push({ id: w.id, type: 'wall', level: w.level, gx: w.x, gz: w.z, x: p.x, z: p.z, hp, max: hp, dmg: 0, range: 0, rate: 0, cd: 0, mesh, dead: false });
    }
    const tp = this._gw(state.th.x, state.th.z);
    const thHp = Math.round((state.th.hp ?? 1200) * mult);
    list.push({ id: 'th', type: 'th', level: 2, gx: state.th.x, gz: state.th.z, x: tp.x, z: tp.z, hp: thHp, max: thHp, dmg: Math.round(12 * mult), range: 6.5, rate: 1, cd: 0, mesh: this.view.thMesh, dead: false, isTH: true });
    return list;
  }

  spawnSwarm(s) {
    // edge spawn (boss = 2.2x scale brute)
    const side = Math.floor(Math.random() * 4);
    const G = 16, j = () => Math.floor(Math.random() * G);
    let gx = side === 0 ? 0 : side === 1 ? G - 1 : j();
    let gz = side === 2 ? 0 : side === 3 ? G - 1 : j();
    const p = this._gw(gx, gz);
    const m = makeSwarm();
    if (s.boss) m.scale.setScalar(2.1);
    m.position.set(p.x, 0.3, p.z);
    this.scene.add(m);
    this.atk.push({ mesh: m, x: p.x, z: p.z, hp: s.hp, max: s.hp, dmg: s.dmg, speed: s.speed, cd: 0, slowT: 0, range: 1.4, boss: !!s.boss });
  }

  deployTroop(type, level) {
    if (this.mode !== 'raid' || !this.active) return 'Start a raid first';
    if (this.deployed >= this.maxDeploy) return 'Army empty — attack!';
    // deploy at random edge near click handled by caller via deployAt
    return 'select-edge';
  }

  deployAt(type, level, gx, gz, ascShards = 0) {
    // must be edge ring
    const edge = gx <= 1 || gz <= 1 || gx >= 14 || gz >= 14;
    if (!edge) return false;
    const st = troopStats(type, level);
    const mult = ascMult(ascShards);
    const p = this._gw(gx, gz);
    const m = makeTroop(type, level);
    m.position.set(p.x, 0.3, p.z);
    this.scene.add(m);
    this.atk.push({ mesh: m, x: p.x, z: p.z, hp: Math.round(st.hp * mult), max: Math.round(st.hp * mult), dmg: Math.round(st.dmg * mult), speed: st.speed, range: st.range, heal: st.heal ? Math.round(st.heal * mult) : 0, wallMult: st.wallMult || 1, cd: 0, slowT: 0, type });
    this.deployed++;
    sfx.place();
    return true;
  }

  update(dt, state) {
    if (!this.active) return;
    this.time += dt;
    // spawns
    if (this.spawnQueue.length && this.spawnT <= 0) {
      const s = this.spawnQueue.shift();
      this.spawnSwarm(s);
      this.spawnT = s.delay > 2 ? 0.4 : 0.7;
    } else this.spawnT -= dt;

    // attackers move + melee (healers heal allies instead)
    for (const a of this.atk) {
      if (a.hp <= 0) continue;
      if (a.slowT > 0) { a.slowT -= dt; }
      if (a.type === 'healer' && a.heal) {
        a.cd -= dt;
        if (a.cd <= 0) {
          let ally = null, bd = 1e9;
          for (const o of this.atk) {
            if (o === a || o.hp <= 0 || o.hp >= o.max) continue;
            const dd = dist2(a, o);
            if (dd <= (a.range || 5) * 2 && dd < bd) { bd = dd; ally = o; }
          }
          if (ally) { ally.hp = Math.min(ally.max, ally.hp + a.heal); this._healFx(ally); }
          a.cd = 1.2;
        }
        // drift toward army centroid
        let cx = 0, cz = 0, n = 0;
        for (const o of this.atk) { if (o !== a && o.hp > 0) { cx += o.x; cz += o.z; n++; } }
        if (n) { const d = Math.hypot(cx / n - a.x, cz / n - a.z) || 1; a.x += (cx / n - a.x) / d * a.speed * 0.5 * dt; a.z += (cz / n - a.z) / d * a.speed * 0.5 * dt; a.mesh.position.set(a.x, 0.3, a.z); }
        continue;
      }
      const sp = a.speed * (a.slowT > 0 ? 0.55 : 1);
      const tgt = this._pickTarget(a);
      if (!tgt) continue;
      const d = dist2(a, tgt);
      const reach = (a.range || 1.6) + 0.6;
      if (d <= reach) {
        a.cd -= dt;
        if (a.cd <= 0) { this._melee(a, tgt); a.cd = 1.0; }
      } else {
        const dx = (tgt.x - a.x) / (d || 1), dz = (tgt.z - a.z) / (d || 1);
        a.x += dx * sp * dt; a.z += dz * sp * dt;
        a.mesh.position.set(a.x, 0.3 + Math.abs(Math.sin(this.time * 8)) * 0.12, a.z);
        a.mesh.rotation.y = Math.atan2(dx, dz);
      }
    }
    // defenses shoot
    for (const d of this.defs) {
      if (d.dead || !d.range) continue;
      d.cd -= dt;
      if (d.cd > 0) continue;
      let best = null, bd = 1e9;
      for (const a of this.atk) {
        if (a.hp <= 0) continue;
        const dd = dist2(d, a);
        if (dd <= d.range * 2 && dd < bd) { bd = dd; best = a; }
      }
      if (best) {
        d.cd = 1 / d.rate;
        // face + muzzle
        if (d.mesh) d.mesh.rotation.y = Math.atan2(best.x - d.x, best.z - d.z);
        this._fire(d, best);
        if (Math.random() < 0.3) sfx.shoot();
      }
    }
    // projectiles (+ meteor fx)
    for (const p of this.projs) {
      if (p.dead) continue;
      p.life -= dt;
      if (p.meteor) {
        p.mesh.position.y -= 22 * dt;
        if (p.fx) { p.fx.scale.multiplyScalar(1 + dt * 3); p.fx.material.opacity = Math.max(0, p.life * 1.6); }
        if (p.life <= 0 || p.mesh.position.y <= 0.6) {
          p.dead = true; this.scene.remove(p.mesh);
          if (p.fx) this.scene.remove(p.fx);
        }
        continue;
      }
      const dx = p.tx - p.mesh.position.x, dy = 1.6 - p.mesh.position.y, dz = p.tz - p.mesh.position.z;
      const dd = Math.sqrt(dx * dx + dz * dz);
      if (dd < 0.5 || p.life <= 0) {
        this._splash(p);
        p.dead = true; this.scene.remove(p.mesh);
        continue;
      }
      const v = 16 * dt;
      p.mesh.position.x += dx / (dd || 1) * v;
      p.mesh.position.z += dz / (dd || 1) * v;
      p.mesh.position.y += dy * dt * 3;
    }
    this.projs = this.projs.filter(p => !p.dead);
    // cleanup dead attackers
    for (const a of [...this.atk]) {
      if (a.hp <= 0 && !a.gone) {
        a.gone = true; this.scene.remove(a.mesh);
        // pop scale
        sfx.boom();
      }
    }
    this.atk = this.atk.filter(a => !a.gone);
    // end conditions
    const thDef = this.defs.find(d => d.isTH);
    if (thDef && thDef.hp <= 0 && !thDef.dead) {
      thDef.dead = true;
      if (this.view.thMesh) this.view.thMesh.rotation.z = 0.5;
      this.destroyed++;
    }
    const aliveAtk = this.atk.length;
    const defsAlive = this.defs.filter(d => !d.dead && d.type !== 'wall').length;
    if (this.mode === 'defend') {
      if (thDef.dead) return this._finish(false, 0);
      if (!this.spawnQueue.length && aliveAtk === 0) return this._finish(true, 3);
    } else {
      if (thDef.dead && defsAlive === 0) return this._finish(true, 3);
      // raid timer 120s + out of troops
      if (this.time > 150) {
        const stars = this._stars();
        return this._finish(stars > 0, stars);
      }
      if (this.deployed >= this.maxDeploy && aliveAtk === 0) {
        const stars = this._stars();
        return this._finish(stars > 0, stars);
      }
    }
  }

  _pickTarget(a) {
    // nearest alive non-wall def, else TH, else nearest wall
    let best = null, bd = 1e9;
    for (const d of this.defs) {
      if (d.dead || d.type === 'wall') continue;
      const dd = dist2(a, d);
      if (dd < bd) { bd = dd; best = d; }
    }
    // wall body-block: if wall very close, chew it
    for (const d of this.defs) {
      if (d.dead || d.type !== 'wall') continue;
      if (dist2(a, d) < 1.8) return d;
    }
    return best || this.defs.find(d => d.isTH && !d.dead);
  }

  _melee(a, tgt) {
    const dmg = (tgt.type === 'wall' && a.wallMult ? a.dmg * a.wallMult : a.dmg);
    tgt.hp -= dmg;
    // hit flash
    if (tgt.mesh) { tgt.mesh.position.y += 0.05; setTimeout(() => { if (tgt.mesh) tgt.mesh.position.y -= 0.05; }, 60); }
    if (tgt.hp <= 0 && !tgt.dead) {
      tgt.dead = true; this.destroyed++;
      if (tgt.mesh) { tgt.mesh.rotation.z = 1.2; tgt.mesh.position.y = 0.1; }
    }
    // attackers also chip TH state hp mirror
    if (tgt.isTH && this.mode === 'defend') this._mirrorTH(tgt);
  }

  _mirrorTH(tgt) { /* topbar reads battle defs directly */ }

  _fire(d, target) {
    const color = d.type === 'frost' ? 0x4dd0e1 : d.type === 'mortar' ? 0x424242 : d.type === 'tesla' ? 0xb39ddb : d.type === 'hive' ? 0xffee58 : d.type === 'cannon' ? 0xff5722 : 0xffe082;
    const m = new THREE.Mesh(this.projGeo, new THREE.MeshBasicMaterial({ color }));
    m.position.set(d.x, 2.4, d.z);
    this.scene.add(m);
    const splash = d.splash || (d.type === 'cannon' ? 2.2 : d.type === 'mortar' ? 3.2 : 0);
    this.projs.push({ mesh: m, tx: target.x, tz: target.z, target, dmg: d.dmg, slow: d.slow || 0, splash, life: 2 });
  }

  _healFx(a) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 6), new THREE.MeshBasicMaterial({ color: 0x69f0ae, transparent: true, opacity: 0.9 }));
    m.position.set(a.x, 1.6, a.z);
    this.scene.add(m);
    this.projs.push({ mesh: m, tx: a.x, tz: a.z, target: null, dmg: 0, life: 0.5, meteor: true });
  }

  _splash(p) {
    const hit = (a) => {
      a.hp -= p.dmg;
      if (p.slow) a.slowT = 1.5;
    };
    if (p.splash) {
      for (const a of this.atk) { if (a.hp > 0 && dist2({ x: p.tx, z: p.tz }, a) < p.splash) hit(a); }
    } else if (p.target && p.target.hp > 0) hit(p.target);
  }

  _stars() {
    const dead = this.defs.filter(d => d.dead).length;
    const pct = dead / Math.max(1, this.totalDefs);
    const thDead = this.defs.find(d => d.isTH)?.dead;
    if (thDead && pct >= 0.99) return 3;
    if (thDead) return 2;
    if (pct >= 0.5) return 1;
    return 0;
  }

  // ---- P1/P3 hero: Starfall meteor — defend nukes swarm, raid nukes defenses ----
  heroStrike(heroLevel = 1) {
    if (!this.active) return 0;
    const hMult = (HERO_LEVELS[heroLevel] || HERO_LEVELS[1]).dmgMult;
    const mult = hMult;
    let hits = 0;
    if (this.mode === 'defend') {
      const dmg = HERO.defendDmg * mult;
      for (const a of this.atk) {
        if (a.hp <= 0) continue;
        a.hp -= dmg; a.slowT = 2; hits++;
        this._meteorFx(a.x, a.z);
      }
    } else {
      const dmg = HERO.raidDmg * mult;
      for (const d of this.defs) {
        if (d.dead) continue;
        d.hp -= dmg; hits++;
        this._meteorFx(d.x, d.z);
        if (d.hp <= 0) {
          d.dead = true; this.destroyed++;
          if (d.mesh) { d.mesh.rotation.z = 1.2; d.mesh.position.y = 0.1; }
        }
      }
    }
    sfx.meteor?.();
    return hits;
  }

  _meteorFx(x, z) {
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(0.45, 10, 8),
      new THREE.MeshBasicMaterial({ color: 0xffb300 })
    );
    m.position.set(x + (Math.random() - 0.5) * 2, 9, z + (Math.random() - 0.5) * 2);
    this.scene.add(m);
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.4, 1.6, 20),
      new THREE.MeshBasicMaterial({ color: 0xffd54a, transparent: true, opacity: 0.9, side: THREE.DoubleSide })
    );
    ring.rotation.x = -Math.PI / 2; ring.position.set(x, 0.5, z);
    this.scene.add(ring);
    this.projs.push({ mesh: m, tx: x, tz: z, target: null, dmg: 0, life: 0.55, fx: ring, meteor: true });
  }

  _finish(win, stars) {
    this.active = false;
    const cb = this.onEnd; this.onEnd = null;
    if (cb) cb({ win, stars });
  }

  stop() { this.active = false; this.clearField(); }
}
