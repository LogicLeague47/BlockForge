// Timeline quest engine: era lock-in with guaranteed way home.
//
// Rule: arriving in a year with an unclaimed quest LOCKS departures until
// that quest completes. Completion always pays Time Cells, so the way home
// is guaranteed. Years with no quest: leave freely (jumps still cost cells).
//
// Quest state lives in the world save blob (see main.js save/load).

import { QUESTS, questForYear, testimonyById, formatYear } from './timeline.js';

function mapDelta(now, base) {
  let d = 0;
  const seen = new Set([...Object.keys(now || {}), ...Object.keys(base || {})]);
  for (const k of seen) d += Math.max(0, (now[k] || 0) - (base[k] || 0));
  return d;
}

export class QuestLog {
  constructor() {
    this.reset();
  }

  reset() {
    // active: {qid, baseCrafted, baseKills, basePlaced, jumpX, jumpZ} | null
    this.active = null;
    this.done = [];       // quest ids completed (this world)
    this.testimonies = []; // testimony ids witnessed (this world)
  }

  serialize() {
    return {
      active: this.active,
      done: [...this.done],
      testimonies: [...this.testimonies],
    };
  }

  load(data) {
    this.reset();
    if (!data) return;
    if (data.active) this.active = data.active;
    if (Array.isArray(data.done)) this.done = [...data.done];
    if (Array.isArray(data.testimonies)) this.testimonies = [...data.testimonies];
  }

  questById(qid) {
    return QUESTS.find(q => q.id === qid) || null;
  }

  // Called on arrival in a year. Returns the assigned quest, or null (free).
  onArrive(year, stats, jumpX, jumpZ) {
    // Stale lock from a previous visit can never strand the player: if the
    // active quest belongs to a different year, keep tracking it but do not
    // block — only the CURRENT year's unclaimed quest locks departures.
    const q = questForYear(year);
    if (!q || this.done.includes(q.id)) return null;
    const s = stats || {};
    this.active = {
      qid: q.id,
      baseCrafted: { ...(s.crafted || {}) },
      baseKills: s.mobKillsAny || 0,
      basePlaced: { ...(s.blocksPlaced || {}) },
      jumpX, jumpZ,
    };
    return q;
  }

  activeQuest() {
    if (!this.active) return null;
    return this.questById(this.active.qid);
  }

  // True while the CURRENT year holds an unclaimed quest.
  // (Foreign active quests never block — see onArrive.)
  lockedFor(year) {
    const q = questForYear(year);
    return !!(q && !this.done.includes(q.id));
  }

  // Per-objective live progress. api: {invCount(item)->n}
  progress(q, api) {
    return q.objectives.map(o => this._objective(q, o, api, false));
  }

  // Check completion; on success marks done, unlocks testimony, returns
  // {quest, testimony} for reward handling, else null.
  checkDone(q, api) {
    if (!q || this.done.includes(q.id)) return null;
    const all = q.objectives.every(o => this._objective(q, o, api, true).done);
    if (!all) return null;
    this.done.push(q.id);
    let testimony = null;
    if (q.testimony) {
      testimony = testimonyById(q.testimony);
      if (testimony && !this.testimonies.includes(testimony.id)) {
        this.testimonies.push(testimony.id);
      }
    }
    if (this.active && this.active.qid === q.id) this.active = null;
    return { quest: q, testimony };
  }

  _objective(q, o, api, forDone) {
    const base = this.active && this.active.qid === q.id ? this.active : null;
    switch (o.t) {
      case 'collect': {
        const have = api.invCount(o.item);
        return { ...o, have, done: have >= o.n };
      }
      case 'craft': {
        const have = mapDelta(api.stats().crafted, base ? base.baseCrafted : {});
        return { ...o, have: Math.min(have, o.n), done: have >= o.n };
      }
      case 'kill': {
        const s = api.stats();
        const baseK = base ? base.baseKills : 0;
        const have = Math.max(0, (s.mobKillsAny || 0) - baseK);
        return { ...o, have: Math.min(have, o.n), done: have >= o.n };
      }
      case 'place': {
        // NOTE: place objectives count a single block id, not the whole map.
        const one = Math.max(0, ((api.stats().blocksPlaced || {})[o.block] || 0) - ((base ? base.basePlaced : {})[o.block] || 0));
        return { ...o, have: Math.min(one, o.n), done: one >= o.n };
      }
      case 'biome': {
        const at = api.biomeAt();
        return { ...o, have: at, done: at === o.biome };
      }
      case 'travel': {
        const d = api.distFromJump();
        return { ...o, have: Math.floor(Math.min(d, o.dist)), done: d >= o.dist };
      }
      default:
        return { ...o, have: 0, done: false };
    }
  }
}

export function questGreeting(q, year) {
  if (!q) return null;
  return `📜 ${q.title} — ${formatYear(year)}. ${q.brief}`;
}
