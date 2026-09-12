/* BlockLife engine (ES5). Pure logic, no DOM — sim-testable in node. */
var Life = {};

Life.rnd = function() { return Math.random(); };
Life.chance = function(p) { return Math.random() < p; };
Life.ri = function(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); };
Life.pick = function(arr) { return arr[Math.floor(Math.random() * arr.length)]; };
Life.get = function(s, k) { return s.stats[k]; };
Life.clamp = function(s) {
  var keys = ['hap', 'hea', 'sma', 'loo'];
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    if (s.stats[k] == null) s.stats[k] = 50;
    s.stats[k] = Math.max(0, Math.min(100, Math.round(s.stats[k])));
  }
  return s;
};
Life.bump = function(s, k, n) { s.stats[k] = Math.max(0, Math.min(100, (s.stats[k] || 50) + n)); return s; };
Life.cash = function(s, n) { s.money += n; if (n > 0) s.maxMoney = Math.max(s.maxMoney || 0, s.money); return s; };
Life.money = function(s, n) {
  if (n === undefined) { n = s; s = null; }
  var cur = (s && s.cur) || '$';
  var neg = n < 0;
  var str = String(Math.abs(Math.round(n))).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return (neg ? '-' : '') + cur + str;
};
Life.hs = function(s) { return s.gender === 'F' ? 'her' : 'his'; };
Life.fill = function(s, str) {
  return String(str).replace(/\{hs\}/g, Life.hs(s)).replace(/\{name\}/g, s.name.split(' ')[0]);
};

Life.newGame = function(opts) {
  opts = opts || {};
  var c = opts.country != null ? BLD.countries[opts.country] : Life.pick(BLD.countries);
  var gender = opts.gender || (Life.chance(0.5) ? 'M' : 'F');
  var first = opts.name || Life.pick(gender === 'M' ? c.male : c.female);
  var last = Life.pick(c.last);
  var s = {
    v: 1, name: first + ' ' + last, gender: gender,
    country: c.name, cur: c.cur, city: Life.pick(c.cities),
    age: 0, alive: true,
    stats: { hap: Life.ri(40, 80), hea: Life.ri(50, 90), sma: Life.ri(20, 80), loo: Life.ri(20, 90) },
    money: 0, maxMoney: 0, karma: 0, fame: 0,
    parents: [
      { name: Life.pick(c.male) + ' ' + last, alive: true, age: Life.ri(20, 35) },
      { name: Life.pick(c.female) + ' ' + last, alive: true, age: Life.ri(20, 35) }
    ],
    siblings: [], partner: null, children: [], exes: 0, record: 0,
    edu: { level: 0, dropped: false, grades: 0 },
    job: null, jobsEver: 0, promotions: 0, retired: false,
    assets: { houses: [], cars: [], jewelry: [] }, pets: [], will: false,
    prison: { inmate: false, sentence: 0, served: 0, good: 50, escapes: 0 },
    partners: 0, murders: 0, jailYears: 0, marriages: 0,
    log: []
  };
  var nsib = Life.chance(0.55) ? Life.ri(1, 2) : 0;
  for (var i = 0; i < nsib; i++) Life.sib(s, true);
  return s;
};

Life.sib = function(s, silent) {
  var c = null;
  for (var i = 0; i < BLD.countries.length; i++) if (BLD.countries[i].name === s.country) c = BLD.countries[i];
  if (!c) c = BLD.countries[0];
  var g = Life.chance(0.5) ? 'M' : 'F';
  s.siblings.push({ name: Life.pick(g === 'M' ? c.male : c.female) + ' ' + s.name.split(' ')[1], alive: true, age: 0 });
  return s;
};
Life.grade = function(s, g) { s.edu.grades = Math.max(0, Math.min(100, Math.round(g))); return s; };
Life.fame = function(s, n) { s.fame = Math.max(0, (s.fame || 0) + n); return s; };
Life.pet = function(s, kind) {
  var names = ['Buddy', 'Rex', 'Luna', 'Coco', 'Rocky', 'Bella', 'Max', 'Daisy', 'Oreo', 'Pepper'];
  s.pets.push({ kind: kind, name: Life.pick(names), age: 0 });
  return s;
};
Life.petDie = function(s) { s.pets.shift(); return s; };
Life.killParent = function(s) {
  for (var i = 0; i < s.parents.length; i++) if (s.parents[i].alive) { s.parents[i].alive = false; return s; }
  return s;
};
Life.newPartner = function(s) {
  var c = null;
  for (var i = 0; i < BLD.countries.length; i++) if (BLD.countries[i].name === s.country) c = BLD.countries[i];
  if (!c) c = BLD.countries[0];
  var g = s.gender === 'M' ? 'F' : 'M';
  if (Life.chance(0.12)) g = s.gender;
  s.partner = {
    name: Life.pick(g === 'M' ? c.male : c.female) + ' ' + Life.pick(c.last),
    age: Math.max(16, s.age + Life.ri(-4, 4)),
    loo: Life.ri(20, 100), sma: Life.ri(20, 100),
    married: false, years: 0
  };
  s.partners++;
  return s;
};
Life.dumpPartner = function(s) { if (s.partner) { s.exes++; s.partner = null; } return s; };
Life.baby = function(s) {
  var c = null;
  for (var i = 0; i < BLD.countries.length; i++) if (BLD.countries[i].name === s.country) c = BLD.countries[i];
  if (!c) c = BLD.countries[0];
  var g = Life.chance(0.5) ? 'M' : 'F';
  s.children.push({ name: Life.pick(g === 'M' ? c.male : c.female) + ' ' + s.name.split(' ')[1], alive: true, born: s.age });
  return s;
};

Life.jobById = function(id) {
  for (var i = 0; i < BLD.jobs.length; i++) if (BLD.jobs[i].id === id) return BLD.jobs[i];
  return null;
};
Life.jobOpen = function(s, j) {
  var r = j.req || {};
  if ((r.edu || 0) > s.edu.level) return false;
  if ((r.sma || 0) > Life.get(s, 'sma')) return false;
  if ((r.loo || 0) > Life.get(s, 'loo')) return false;
  if ((r.hea || 0) > Life.get(s, 'hea')) return false;
  return true;
};
Life.setJob = function(s, id) {
  var j = Life.jobById(id);
  if (!j || !Life.jobOpen(s, j)) return null;
  s.job = { id: j.id, title: j.title, track: j.track, salary: j.salary, perf: 50, years: 0, fame: j.fame || 0 };
  if (j.fame) Life.fame(s, j.fame);
  s.jobsEver++;
  return s.job;
};
Life.raise = function(s, pct) {
  if (!s.job) return s;
  s.job.salary = Math.round(s.job.salary * (1 + (pct || (0.03 + Life.rnd() * 0.08))));
  s.job.perf = Math.min(100, (s.job.perf || 50) + 8);
  s.promotions++;
  return s;
};
Life.fire = function(s) { s.job = null; Life.bump(s, 'hap', -10); return s; };
Life.retire = function(s) { s.job = null; s.retired = true; Life.bump(s, 'hap', 8); return s; };
Life.quit = function(s) { s.job = null; return s; };

Life.buyAsset = function(s, kind, id) {
  var list = BLD[kind];
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      if (s.money < list[i].price) return null;
      Life.cash(s, -list[i].price);
      s.assets[kind].push({ id: id, name: list[i].name, price: list[i].price });
      Life.bump(s, 'hap', kind === 'houses' ? 12 : 8);
      return s.assets[kind][s.assets[kind].length - 1];
    }
  }
  return null;
};
Life.sellAsset = function(s, kind, idx) {
  var a = s.assets[kind][idx];
  if (!a) return null;
  var val = Math.round(a.price * (0.7 + Life.rnd() * 0.5));
  Life.cash(s, val);
  s.assets[kind].splice(idx, 1);
  return val;
};
Life.netWorth = function(s) {
  var n = s.money;
  var kinds = ['houses', 'cars', 'jewelry'];
  for (var k = 0; k < kinds.length; k++) {
    var arr = s.assets[kinds[k]];
    for (var i = 0; i < arr.length; i++) n += Math.round(arr[i].price * 0.9);
  }
  return n;
};

Life.doCrime = function(s, id) {
  var c = null;
  for (var i = 0; i < BLD.crimes.length; i++) if (BLD.crimes[i].id === id) c = BLD.crimes[i];
  if (!c) return 'Nothing happened.';
  s.record++;
  if (id === 'murder') { s.murders++; Life.bump(s, 'karma', -25); } else { Life.bump(s, 'karma', -6); }
  var heat = Math.min(0.3, s.record * 0.03);
  if (Life.chance(c.jail + heat)) {
    var yrs = Life.ri(c.years[0], Math.max(c.years[0], c.years[1]));
    return Life.jail(s, yrs, c.name);
  }
  var loot = Life.ri(c.loot[0], c.loot[1]);
  if (loot > 0) Life.cash(s, loot);
  Life.bump(s, 'hap', 6);
  return id === 'murder'
    ? 'You got away with murder. Sleep tight. Forever guilty.'
    : 'Clean getaway! Pocketed ' + Life.money(s, loot) + '.';
};
Life.jail = function(s, yrs, why) {
  if (s.job) Life.fire(s);
  if (s.partner && Life.chance(0.6)) { s.exes++; s.partner = null; }
  s.prison = { inmate: true, sentence: yrs, served: 0, good: 50, escapes: s.prison.escapes || 0 };
  Life.bump(s, 'hap', -25);
  Life.bump(s, 'karma', -10);
  return 'BUSTED' + (why ? ' (' + why + ')' : '') + '. Sentenced to ' + yrs + ' year' + (yrs === 1 ? '' : 's') + '. Your cellmate smells like soup.';
};
Life.escape = function(s) {
  if (!s.prison.inmate) return 'You are not in prison.';
  if (Life.chance(0.25 + Life.get(s, 'hea') / 500)) {
    s.prison.inmate = false;
    s.prison.sentence = 0; s.prison.served = 0;
    s.prison.escapes++;
    s.record += 2;
    Life.bump(s, 'hap', 20);
    return 'ESCAPED! You are free and extremely wanted. Lay low.';
  }
  s.prison.sentence += 2;
  s.prison.good = Math.max(0, s.prison.good - 15);
  Life.bump(s, 'hea', -10);
  return 'Escape failed. Guards added 2 years and several bruises.';
};
Life.parole = function(s) {
  s.prison.inmate = false;
  s.prison.sentence = 0; s.prison.served = 0;
  s.jailYears += 0;
  Life.bump(s, 'hap', 15);
  return s;
};

Life.die = function(s, cause) {
  s.alive = false;
  s.cause = cause;
  s.ribbon = Life.ribbon(s);
  return s;
};
Life.ribbon = function(s) {
  var nw = Life.netWorth(s);
  if (s.murders >= 5) return 'Deadly';
  if (nw >= 10000000) return 'Loaded';
  if ((s.fame || 0) >= 50) return 'Famous';
  if (nw >= 2000000) return 'Rich';
  if (s.children.length >= 4) return 'Fertile';
  if (s.edu.level >= 3 && Life.get(s, 'sma') >= 90) return 'Academic';
  if (s.jailYears >= 10 || s.record >= 8) return 'Jailbird';
  if (s.karma <= -25) return 'Rowdy';
  if (s.karma >= 40) return 'Saint';
  if (s.partners >= 8 || s.exes >= 7) return 'Scandalous';
  if (s.age >= 90) return 'Geriatric';
  if (s.age < 25) return 'Unlucky';
  if (s.jobsEver === 0 && s.age >= 30) return 'Lazy';
  if (s.murders > 0) return 'Wicked';
  if (s.marriages >= 1 && s.children.length >= 2 && s.karma > 0) return 'Family';
  return 'Ordinary';
};

Life.deathRoll = function(s) {
  if (!s.alive) return true;
  var base = 0.001;
  if (s.age > 50) base += (s.age - 50) * 0.0022;
  if (s.age > 80) base += (s.age - 80) * 0.02;
  base += Math.max(0, (50 - Life.get(s, 'hea'))) * 0.0012;
  if (s.prison.inmate) base += 0.004;
  if (s.age < 5) base = 0.002;
  return Life.chance(Math.min(base, 0.85));
};
Life.deathCause = function(s) {
  var total = 0, i;
  for (i = 0; i < BLD.deaths.length; i++) total += BLD.deaths[i].w;
  var r = Life.rnd() * total;
  for (i = 0; i < BLD.deaths.length; i++) {
    r -= BLD.deaths[i].w;
    if (r <= 0) return Life.fill(s, BLD.deaths[i].t);
  }
  return 'died peacefully in ' + Life.hs(s) + ' sleep';
};

Life.pickEvents = function(s, n) {
  var pool = [], i, e, w, total = 0;
  for (i = 0; i < BLD.events.length; i++) {
    e = BLD.events[i];
    if (s.age < e.min || s.age > e.max) continue;
    if (e.if && !e.if(s)) continue;
    if (s._seen && s._seen[e.id]) continue;
    pool.push(e);
    total += e.w || 5;
  }
  var out = [];
  for (var k = 0; k < n && pool.length; k++) {
    var r = Life.rnd() * total, acc = 0, idx = 0;
    for (i = 0; i < pool.length; i++) {
      acc += pool[i].w || 5;
      if (r <= acc) { idx = i; break; }
    }
    out.push(pool[idx]);
    total -= pool[idx].w || 5;
    pool.splice(idx, 1);
  }
  return out;
};

Life.ageUp = function(s) {
  var log = [];
  if (!s.alive) return { log: log, died: true };
  s.age++;
  s._seen = {};
  var i;
  /* prison time */
  if (s.prison.inmate) {
    s.prison.served++;
    s.jailYears++;
    s.prison.good = Math.max(0, Math.min(100, s.prison.good + Life.ri(-5, 8)));
    Life.bump(s, 'hap', -4);
    Life.bump(s, 'hea', -3);
    if (s.prison.served >= s.prison.sentence) {
      s.prison.inmate = false; s.prison.sentence = 0; s.prison.served = 0;
      log.push('Released from prison. Freedom smells like bus exhaust.');
      Life.bump(s, 'hap', 15);
    } else {
      log.push('Year ' + s.prison.served + ' of ' + s.prison.sentence + ' behind bars.');
    }
  }
  /* income + expenses */
  if (s.job && !s.prison.inmate && !s.retired) {
    s.job.years++;
    s.job.perf = Math.max(0, Math.min(100, s.job.perf + Life.ri(-6, 8)));
    var raise = 1 + (s.job.perf > 70 ? 0.04 : 0.01);
    s.job.salary = Math.round(s.job.salary * raise);
    Life.cash(s, s.job.salary);
    log.push('Earned ' + Life.money(s, s.job.salary) + ' as ' + s.job.title + '.');
    if (s.job.perf < 15 && Life.chance(0.5)) {
      Life.fire(s);
      log.push('Fired for incompetence. The plant witnessed everything.');
    }
  } else if (s.retired) {
    Life.cash(s, 12000);
  }
  if (s.age >= 18 && !s.prison.inmate) {
    var living = 12000 + s.children.length * 3000 + s.pets.length * 500;
    Life.cash(s, -living);
  }
  /* assets drift */
  /* family ages */
  for (i = 0; i < s.parents.length; i++) {
    if (!s.parents[i].alive) continue;
    s.parents[i].age++;
    if (s.parents[i].age > 60 && Life.chance(0.02 + (s.parents[i].age - 60) * 0.008)) {
      s.parents[i].alive = false;
      var inh = 3000 + Math.floor(Life.rnd() * 25000);
      Life.cash(s, inh);
      Life.bump(s, 'hap', -15);
      log.push('Your parent passed away. You inherited ' + Life.money(s, inh) + '.');
    }
  }
  for (i = 0; i < s.siblings.length; i++) s.siblings[i].age++;
  for (i = 0; i < s.children.length; i++) {
    if (Life.chance(0.002)) { s.children[i].alive = false; Life.bump(s, 'hap', -30); log.push('Tragedy: you lost a child. Nothing else matters this year.'); }
  }
  if (s.partner) {
    s.partner.years++;
    s.partner.age++;
    if (Life.chance(0.03)) {
      Life.dumpPartner(s);
      Life.bump(s, 'hap', -12);
      log.push('Your partner left you. The note just said "lol".');
    }
  }
  for (i = s.pets.length - 1; i >= 0; i--) {
    s.pets[i].age++;
    if (s.pets[i].age > 12 && Life.chance(0.2)) {
      log.push(s.pets[i].name + ' the ' + s.pets[i].kind + ' passed away. RIP little buddy.');
      s.pets.splice(i, 1);
      Life.bump(s, 'hap', -12);
    }
  }
  /* stat drift */
  Life.bump(s, 'hea', s.age < 30 ? 1 : (s.age < 55 ? -2 : -5));
  Life.bump(s, 'hap', s.money < -10000 ? -6 : (s.money > 1000000 ? 2 : 0));
  if (s.age >= 6 && s.age <= 18 && s.edu.level >= 1 && !s.edu.dropped) {
    Life.bump(s, 'sma', 2);
  }
  Life.bump(s, 'loo', s.age > 45 ? -1 : 0);
  /* events */
  var evs = Life.pickEvents(s, s.age < 18 ? 2 : Life.chance(0.35) ? 2 : 1);
  for (i = 0; i < evs.length; i++) {
    s._seen[evs[i].id] = 1;
    log.push({ ev: evs[i] });
  }
  /* death */
  if (Life.deathRoll(s)) {
    var cause = Life.deathCause(s);
    Life.die(s, cause);
    log.push({ death: cause });
    return { log: log, died: true };
  }
  Life.clamp(s);
  return { log: log, died: false };
};

Life.save = function(s) {
  try {
    var slim = JSON.parse(JSON.stringify(s));
    delete slim._seen;
    if (window.localStorage) window.localStorage.setItem('blocklife_save', JSON.stringify(slim));
  } catch (e) {}
  return s;
};
Life.load = function() {
  try {
    if (window.localStorage) {
      var raw = window.localStorage.getItem('blocklife_save');
      if (raw) return JSON.parse(raw);
    }
  } catch (e) {}
  return null;
};
Life.wipe = function() {
  try { if (window.localStorage) window.localStorage.removeItem('blocklife_save'); } catch (e) {}
};
Life.graves = function() {
  try {
    if (window.localStorage) {
      var raw = window.localStorage.getItem('blocklife_graves');
      if (raw) return JSON.parse(raw);
    }
  } catch (e) {}
  return [];
};
Life.bury = function(s) {
  try {
    var g = Life.graves();
    g.unshift({ name: s.name, age: s.age, cause: s.cause, ribbon: s.ribbon, money: Life.netWorth(s) });
    if (g.length > 50) g.length = 50;
    if (window.localStorage) window.localStorage.setItem('blocklife_graves', JSON.stringify(g));
  } catch (e) {}
  return s;
};
