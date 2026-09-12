/* BlockLife UI (ES5, DOM only). Depends on BLD + Life. */
var BLUI = { state: null, god: false, tab: 'act', evQueue: [] };

function $(id) { return document.getElementById(id); }

BLUI.toast = function(msg) {
  $('toast').textContent = msg || '';
  if (msg) setTimeout(function() { $('toast').textContent = ''; }, 2600);
};

BLUI.popup = function(title, text, buttons) {
  $('pp-title').textContent = title || '';
  $('pp-text').textContent = text || '';
  var box = $('pp-btns');
  box.innerHTML = '';
  for (var i = 0; i < buttons.length; i++) {
    (function(b) {
      var btn = document.createElement('button');
      btn.textContent = b.t;
      btn.addEventListener('click', function() {
        var keep = false;
        try { keep = b.fn ? b.fn() : false; } catch (e) { keep = false; }
        if (!keep) BLUI.hidePopup();
      });
      box.appendChild(btn);
    })(buttons[i]);
  }
  $('popup-wrap').className = 'open';
};
BLUI.hidePopup = function() { $('popup-wrap').className = ''; };

BLUI.log = function(html, cls) {
  var log = $('bl-log');
  var d = document.createElement('div');
  d.className = cls || 'log-ev';
  d.textContent = html;
  log.appendChild(d);
  while (log.children.length > 300) log.removeChild(log.firstChild);
  log.scrollTop = log.scrollHeight;
};

BLUI.render = function() {
  var s = BLUI.state;
  if (!s) return;
  $('bl-name').textContent = s.name + ', ' + s.age;
  $('bl-sub').textContent = s.city + ', ' + s.country + ' · ' +
    (s.job ? s.job.title : (s.age < 18 ? 'Student' : (s.retired ? 'Retired' : 'Unemployed'))) +
    (s.prison.inmate ? ' · IN PRISON' : '');
  var m = $('bl-money');
  m.textContent = Life.money(s, s.money) + '  (net ' + Life.money(s, Life.netWorth(s)) + ')';
  m.style.color = s.money < 0 ? '#f66' : '#8f8';
  var bars = [['hap', 'bar-hap', 'val-hap'], ['hea', 'bar-hea', 'val-hea'], ['sma', 'bar-sma', 'val-sma'], ['loo', 'bar-loo', 'val-loo']];
  for (var i = 0; i < bars.length; i++) {
    var v = Life.get(s, bars[i][0]);
    var fill = $(bars[i][1]);
    fill.style.width = v + '%';
    fill.className = 'bar-fill' + (v < 30 ? ' low' : (v < 60 ? ' mid' : ''));
    $(bars[i][2]).textContent = v;
  }
  $('btn-age').disabled = !s.alive;
  BLUI.renderSheet();
};

BLUI.newLifeFlow = function() {
  var countries = '';
  for (var i = 0; i < BLD.countries.length; i++) countries += (i + 1) + '. ' + BLD.countries[i].name + '\n';
  var name = null, gender = null, ci = 0;
  try {
    var n = window.prompt('First name? (blank = random)', '');
    if (n === null) return;
    if (n) name = n;
    var g = window.prompt('Gender? M / F (blank = random)', '');
    if (g === null) return;
    if (/^f/i.test(g)) gender = 'F'; else if (/^m/i.test(g)) gender = 'M';
    var c = window.prompt('Country:\n' + countries, '1');
    if (c === null) return;
    ci = Math.max(0, Math.min(BLD.countries.length - 1, (parseInt(c, 10) || 1) - 1));
  } catch (e) { return; }
  BLUI.state = Life.newGame({ name: name, gender: gender, country: ci });
  $('start-screen').style.display = 'none';
  $('game-screen').style.display = 'block';
  $('bl-log').innerHTML = '';
  var s = BLUI.state;
  BLUI.log('You were born in ' + s.city + ', ' + s.country + '.', 'log-age');
  BLUI.log(s.name + ' enters the world screaming. Classic entrance.', '');
  Life.save(s);
  BLUI.render();
};

BLUI.esc = function(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};

BLUI.boot = function() {
  var saved = Life.load();
  var start = $('start-screen');
  if (saved && saved.alive) {
    start.innerHTML = '<div class="act-grid">'
      + '<button class="wide" id="st-continue">Continue: ' + BLUI.esc(saved.name) + ', ' + saved.age + '</button>'
      + '<button class="wide" id="st-new">Start New Life</button></div>';
    $('game-screen').style.display = 'none';
    $('st-continue').addEventListener('click', function() {
      BLUI.state = saved;
      start.style.display = 'none';
      $('game-screen').style.display = 'block';
      BLUI.render();
    });
    $('st-new').addEventListener('click', function() { BLUI.newLifeFlow(); });
  } else {
    start.innerHTML = '<div class="act-grid"><button class="wide" id="st-new">Start New Life</button></div>';
    $('st-new').addEventListener('click', function() { BLUI.newLifeFlow(); });
  }
  if (BLUI._booted) return;
  BLUI._booted = true;
  var tabs = $('tabs').querySelectorAll('button');
  for (var i = 0; i < tabs.length; i++) {
    (function(btn) {
      btn.addEventListener('click', function() {
        BLUI.tab = btn.getAttribute('data-tab');
        for (var j = 0; j < tabs.length; j++) tabs[j].className = '';
        btn.className = 'on';
        BLUI.renderSheet();
      });
    })(tabs[i]);
  }
  $('btn-age').addEventListener('click', function() { BLUI.doAge(); });
  $('btn-grave').addEventListener('click', function() { BLUI.showGraves(); });
  $('btn-god').addEventListener('click', function() {
    BLUI.god = !BLUI.god;
    BLUI.toast(BLUI.god ? 'God mode ON. Naughty.' : 'God mode off.');
    BLUI.renderSheet();
  });
};

BLUI.showGraves = function() {
  var g = Life.graves();
  if (!g.length) { BLUI.toast('No one has died yet. Get to work.'); return; }
  var txt = '';
  for (var i = 0; i < g.length; i++) {
    txt += g[i].name + ', ' + g[i].age + ' — ' + g[i].ribbon + '\n' + g[i].cause + '\n\n';
  }
  BLUI.popup('Graveyard', txt, [{ t: 'Close', fn: function() {} }]);
};

BLUI.doAge = function() {
  var s = BLUI.state;
  if (!s || !s.alive) return;
  var r = Life.ageUp(s);
  BLUI.log('— Age ' + s.age + ' —', 'log-age');
  for (var i = 0; i < r.log.length; i++) {
    var item = r.log[i];
    if (typeof item === 'string') BLUI.log(item, '');
    else if (item.ev) BLUI.evQueue.push(item.ev);
    else if (item.death) BLUI.log('DIED: ' + item.death, 'log-bad');
  }
  if (r.died) {
    Life.bury(s);
    Life.wipe();
    BLUI.render();
    var worth = Life.money(s, Life.netWorth(s));
    BLUI.popup('RIP ' + s.name,
      s.name + ', aged ' + s.age + ', ' + s.cause + '\n\nNet worth: ' + worth + '\nRibbon earned: ' + s.ribbon +
      (s.will ? '\nYour will passed everything to your most disappointing child.' : '\nNo will. The state took a cut and your family took the rest.'),
      [{ t: 'Start New Life', fn: function() { BLUI.state = null; BLUI.evQueue = []; $('game-screen').style.display = 'none'; $('start-screen').style.display = 'block'; BLUI.boot(); } }]);
    return;
  }
  Life.save(s);
  BLUI.render();
  BLUI.nextEvent();
};

BLUI.nextEvent = function() {
  var s = BLUI.state;
  if (!BLUI.evQueue.length) return;
  var e = BLUI.evQueue.shift();
  var text = '';
  try { text = Life.fill(s, e.t(s)); } catch (err) { text = 'Something happened.'; }
  var btns = [];
  for (var i = 0; i < e.ch.length; i++) {
    (function(ch) {
      btns.push({ t: ch.t, fn: function() {
        var out = null;
        // Re-check conditions: an earlier event this year may have
        // changed everything (fired, dumped, jailed).
        try {
          if (e.if && !e.if(s)) { out = '(That moment passed.)'; }
          else out = ch.fx(s);
        } catch (err) { out = 'Nothing happened.'; }
        if (out && typeof out === 'object') {
          if (out.log) {
            if (out.log instanceof Array) { for (var k = 0; k < out.log.length; k++) BLUI.log(out.log[k], ''); }
            else BLUI.log(out.log, '');
          }
        } else if (out) { BLUI.log(out, ''); }
        Life.clamp(s);
        Life.save(s);
        BLUI.render();
        BLUI.nextEvent();
      } });
    })(e.ch[i]);
  }
  BLUI.popup('Age ' + s.age, text, btns);
};

/* ---- action sheets ---- */
BLUI.actBtn = function(label, fn, wide) {
  return { t: label, fn: fn, wide: !!wide };
};

BLUI.renderSheet = function() {
  var s = BLUI.state;
  var box = $('sheet');
  if (!s || !s.alive) { box.innerHTML = ''; return; }
  var acts = [];
  if (BLUI.tab === 'act') acts = BLUI.actList(s);
  else if (BLUI.tab === 'love') acts = BLUI.loveList(s);
  else if (BLUI.tab === 'job') acts = BLUI.jobList(s);
  else acts = BLUI.assetList(s);
  var html = '<div class="act-grid">';
  for (var i = 0; i < acts.length; i++) {
    html += '<button data-ai="' + i + '"' + (acts[i].wide ? ' class="wide"' : '') + '>' + acts[i].t + '</button>';
  }
  box.innerHTML = html + '</div>';
  var btns = box.querySelectorAll('button');
  for (var j = 0; j < btns.length; j++) {
    (function(idx) {
      btns[idx].addEventListener('click', function() {
        try { acts[idx].fn(); } catch (e) { BLUI.toast('Nothing happened.'); }
        Life.clamp(BLUI.state);
        Life.save(BLUI.state);
        BLUI.render();
      });
    })(j);
  }
  BLUI._acts = acts;
};

BLUI.afterAction = function(msg) {
  if (msg) BLUI.log(msg, '');
  Life.save(BLUI.state);
  BLUI.render();
};

BLUI.actList = function(s) {
  var L = [];
  function A(t, fn, wide) { L.push(BLUI.actBtn(t, fn, wide)); }
  if (s.prison.inmate) {
    A('Break Out', function() { BLUI.afterAction(Life.escape(s)); }, true);
    A('Behave (+parole)', function() { s.prison.good = Math.min(100, s.prison.good + 10); BLUI.afterAction('Model prisoner. The warden noticed.'); });
    A('Riot', function() { s.prison.good = Math.max(0, s.prison.good - 20); Life.bump(s, 'hea', -12); BLUI.afterAction('Riot! Guards, gas, regrets.'); });
    A('Lift Weights', function() { Life.bump(s, 'hea', 6); Life.bump(s, 'hap', -2); BLUI.afterAction('Prison swole incoming.'); });
    return L;
  }
  A('Doctor $1k', function() {
    if (s.money < 1000) return BLUI.toast('Need $1,000.');
    Life.cash(s, -1000); Life.bump(s, 'hea', 12); BLUI.afterAction('Checkup complete. Suspiciously healthy.'); });
  A('Gym (free)', function() { Life.bump(s, 'hea', 6); Life.bump(s, 'hap', 2); Life.bump(s, 'loo', 1); BLUI.afterAction('Swole patrol.'); });
  A('Library', function() { Life.bump(s, 'sma', 4); BLUI.afterAction('You read a whole book. Smug +4.'); });
  A('Salon $500', function() {
    if (s.money < 500) return BLUI.toast('Need $500.');
    Life.cash(s, -500); Life.bump(s, 'loo', 8); Life.bump(s, 'hap', 4); BLUI.afterAction('Snatched. Mirror approved.'); });
  A('Surgery $20k', function() {
    if (s.money < 20000) return BLUI.toast('Need $20,000.');
    Life.cash(s, -20000);
    if (Life.chance(0.85)) { Life.bump(s, 'loo', 20); BLUI.afterAction('Botched? No — flawless. Suspiciously flawless.'); }
    else { Life.bump(s, 'loo', -15); Life.bump(s, 'hea', -10); BLUI.afterAction('Botched. You now look like a cautionary tale.'); } });
  A('Meditate', function() { Life.bump(s, 'hap', 5); Life.bump(s, 'hea', 2); BLUI.afterAction('Ommmm. Bills still exist.'); });
  A('Walk', function() { Life.bump(s, 'hea', 3); Life.bump(s, 'hap', 2); BLUI.afterAction('Touched grass.'); });
  A('Lottery $50', function() {
    if (s.money < 50) return BLUI.toast('Need $50.');
    Life.cash(s, -50);
    if (Life.chance(0.02)) { Life.cash(s, 2000000); Life.bump(s, 'hap', 30); BLUI.afterAction('JACKPOT! Two million! Scream now.'); }
    else BLUI.afterAction('Won $4. Kept the ticket as a bookmark of shame.'); });
  A('Blackjack $500', function() { BLUI.blackjack(500); });
  A('Horse Bet $500', function() {
    if (s.money < 500) return BLUI.toast('Need $500.');
    Life.cash(s, -500);
    if (Life.chance(0.3)) { Life.cash(s, 2500); Life.bump(s, 'hap', 8); BLUI.afterAction('Your horse won! Neigh! (That means yes.)'); }
    else BLUI.afterAction('Your horse stopped for snacks mid-race.'); });
  A('Vacation $2k', function() {
    if (s.money < 2000) return BLUI.toast('Need $2,000.');
    Life.cash(s, -2000); Life.bump(s, 'hap', 14); BLUI.afterAction('Beach acquired. Inbox ignored.'); });
  A('Emigrate $5k', function() {
    if (s.money < 5000) return BLUI.toast('Need $5,000.');
    var opts = '';
    for (var i = 0; i < BLD.countries.length; i++) {
      if (BLD.countries[i].name !== s.country) opts += BLD.countries[i].name + '  ';
    }
    var pick = null;
    try { pick = window.prompt('Move where?\n' + opts, ''); } catch (e) {}
    if (!pick) return;
    for (var j = 0; j < BLD.countries.length; j++) {
      if (BLD.countries[j].name.toLowerCase() === String(pick).toLowerCase().trim()) {
        Life.cash(s, -5000);
        if (s.job) Life.quit(s);
        s.country = BLD.countries[j].name; s.cur = BLD.countries[j].cur; s.city = Life.pick(BLD.countries[j].cities);
        BLUI.afterAction('New country, new you. Same baggage.');
        return;
      }
    }
    BLUI.toast('No such country. Stay put.');
  });
  A('Buy Pet', function() { BLUI.shopMenu('pets', 'Adopt a Pet'); });
  A('Write Will', function() {
    if (s.will) return BLUI.toast('Will already written.');
    s.will = true; BLUI.afterAction('Will written. Your goldfish inherits everything.'); });
  if (BLUI.god) {
    A('GOD: +$1M', function() { Life.cash(s, 1000000); BLUI.afterAction('Divine stimulus check.'); });
    A('GOD: Max stats', function() {
      s.stats.hap = 100; s.stats.hea = 100; s.stats.sma = 100; s.stats.loo = 100;
      BLUI.afterAction('Perfection. Boring, but perfect.'); });
    A('GOD: Clear record', function() { s.record = 0; s.murders = 0; BLUI.afterAction('Sins: deleted.'); });
  }
  return L;
};

BLUI.loveList = function(s) {
  var L = [];
  function A(t, fn, wide) { L.push(BLUI.actBtn(t, fn, wide)); }
  if (!s.partner) {
    A('Find Partner', function() {
      if (s.age < 16) return BLUI.toast('Jail says no. (You are a child.)');
      if (Life.chance(0.4 + Life.get(s, 'loo') / 250)) { Life.newPartner(s); BLUI.afterAction('New flame: ' + s.partner.name + '.'); }
      else { Life.bump(s, 'hap', -4); BLUI.afterAction('Rejected at the bar. The stool felt your pain.'); } }, true);
    A('Hook Up', function() {
      if (s.age < 18) return BLUI.toast('Nope.');
      if (Life.chance(0.5 + Life.get(s, 'loo') / 300)) { Life.bump(s, 'hap', 10); BLUI.afterAction('No names. No regrets. Maybe a story.'); }
      else { Life.bump(s, 'hap', -5); BLUI.afterAction('Laughed out of the club.'); } });
  } else {
    var p = s.partner;
    A('Compliment (' + p.name.split(' ')[0] + ')', function() {
      Life.bump(s, 'hap', 4); BLUI.afterAction('They blushed. Cute. Disgusting. Cute.'); });
    A('Propose', function() {
      if (p.married) return BLUI.toast('Already married. Bigamist.');
      if (Life.chance(0.6 + Life.get(s, 'loo') / 500)) { p.married = true; s.marriages = (s.marriages || 0) + 1; Life.bump(s, 'hap', 20); BLUI.afterAction('Married! Hope you like in-laws.'); }
      else { Life.dumpPartner(s); Life.bump(s, 'hap', -15); BLUI.afterAction('Rejected at the altar of a food court.'); } });
    if (!p.married) A('Break Up', function() { Life.dumpPartner(s); Life.bump(s, 'hap', -8); BLUI.afterAction('Dumped. Their loss. Probably.'); });
    else A('Divorce', function() {
      var cut = Math.floor(s.money * 0.4);
      Life.cash(s, -cut); Life.dumpPartner(s); Life.bump(s, 'hap', -20);
      BLUI.afterAction('Divorced. The lawyers send their thanks (and bill).'); });
  }
  if (s.age >= 18) {
    A('Have Baby', function() {
      if (!s.partner) return BLUI.toast('Need a partner. Biology 101.');
      if (s.children.length >= 8) return BLUI.toast('The house is full. Stop.');
      if (Life.chance(0.7)) { Life.baby(s); Life.bump(s, 'hap', 12); BLUI.afterAction('A baby! It looks like an angry potato. You love it.'); }
      else BLUI.afterAction('Not this year. Practice was fun.'); });
    A('Adopt ($5k)', function() {
      if (s.money < 5000) return BLUI.toast('Need $5,000.');
      if (s.children.length >= 8) return BLUI.toast('The house is full. Stop.');
      Life.cash(s, -5000); Life.baby(s); Life.bump(s, 'hap', 10); BLUI.afterAction('Adopted! Instant family, just add love.'); });
  }
  return L;
};

BLUI.jobList = function(s) {
  var L = [];
  function A(t, fn, wide) { L.push(BLUI.actBtn(t, fn, wide)); }
  if (s.age >= 6 && s.age <= 18 && s.edu.level < 1) {
    A('Study Hard', function() { Life.bump(s, 'sma', 5); BLUI.afterAction('Knowledge crammed. Brain at 98% capacity.'); });
    return L;
  }
  if (s.age < 23 && s.edu.level === 1 && !s.edu.dropped) {
    A('Study Hard', function() { Life.bump(s, 'sma', 4); Life.grade(s, Math.min(100, s.edu.grades + 6)); BLUI.afterAction('Grades: ' + s.edu.grades + '%. Mom is watching.'); });
    A('Drop Out', function() { s.edu.dropped = true; Life.bump(s, 'hap', 5); BLUI.afterAction('School is for suckers. (You, specifically.)'); });
  }
  if (s.age >= 18 && s.edu.level === 1 && !s.edu.dropped) {
    A('University ($40k)', function() {
      if (s.money < 40000 && s.edu.grades < 50) return BLUI.toast('Need $40k or grades 50+ (scholarship).');
      if (s.edu.grades >= 50) { s.edu.level = 2; BLUI.afterAction('Scholarship! Free degree. Nerd victory.'); }
      else { Life.cash(s, -40000); s.edu.level = 2; BLUI.afterAction('Degree purchased. Worth every debt.'); } });
  }
  if (s.edu.level === 2) {
    A('Grad School ($60k)', function() {
      if (s.money < 60000) return BLUI.toast('Need $60,000.');
      Life.cash(s, -60000); s.edu.level = 3; Life.bump(s, 'sma', 10); BLUI.afterAction('DOCTORATE. Call yourself doctor at parties.'); });
  }
  if (!s.job && !s.prison.inmate && !s.retired && s.age >= 14) {
    var open = [];
    for (var i = 0; i < BLD.jobs.length; i++) {
      if (Life.jobOpen(s, BLD.jobs[i])) open.push(BLD.jobs[i]);
    }
    open = open.slice(0, 8);
    for (var j = 0; j < open.length; j++) {
      (function(job) {
        A(job.title + ' (' + Life.money(s, job.salary) + ')', function() {
          Life.setJob(s, job.id);
          BLUI.afterAction('Hired as ' + job.title + '! Donuts on you.');
        });
      })(open[j]);
    }
    if (!open.length) A('No jobs qualify', function() { BLUI.toast('Raise stats or get educated.'); });
  }
  if (s.job) {
    A('Work Hard', function() {
      s.job.perf = Math.min(100, (s.job.perf || 50) + 10);
      Life.bump(s, 'hap', -3);
      if (Life.chance(0.25)) { Life.raise(s); BLUI.afterAction('Promotion track! Raise to ' + Life.money(s, s.job.salary) + '.'); }
      else BLUI.afterAction('Grinded. Boss noticed. Probably.'); });
    A('Ask for Raise', function() {
      if (Life.chance(0.35 + (s.job.perf || 0) / 250)) { Life.raise(s); BLUI.afterAction('Raise! ' + Life.money(s, s.job.salary) + '/yr now.'); }
      else { Life.bump(s, 'hap', -5); BLUI.afterAction('Denied. The printer gets a raise before you.'); } });
    A('Quit', function() { Life.quit(s); BLUI.afterAction('Quitter! Freedom tastes like ramen.'); });
    if (s.age >= 60) A('Retire', function() { Life.retire(s); BLUI.afterAction('Retired. Matlock marathon begins.'); });
  }
  return L;
};

BLUI.assetList = function(s) {
  var L = [];
  function A(t, fn, wide) { L.push(BLUI.actBtn(t, fn, wide)); }
  A('Buy House', function() { BLUI.shopMenu('houses', 'Buy House'); });
  A('Buy Car', function() { BLUI.shopMenu('cars', 'Buy Vehicle'); });
  A('Buy Jewelry', function() { BLUI.shopMenu('jewelry', 'Buy Bling'); });
  A('Buy Pet', function() { BLUI.shopMenu('pets', 'Adopt Pet'); });
  var kinds = [['houses', 'House'], ['cars', 'Vehicle'], ['jewelry', 'Bling']];
  for (var k = 0; k < kinds.length; k++) {
    var arr = s.assets[kinds[k][0]];
    for (var i = 0; i < arr.length; i++) {
      (function(kind, idx, name) {
        A('Sell ' + name, function() {
          var v = Life.sellAsset(s, kind, idx);
          BLUI.afterAction('Sold for ' + Life.money(s, v) + '. Capitalism!'); });
      })(kinds[k][0], i, arr[i].name);
    }
  }
  if (s.pets.length) {
    A('Pet the pets', function() { Life.bump(s, 'hap', 6); BLUI.afterAction('Pets petted. Hearts full.'); });
  }
  return L;
};

BLUI.shopMenu = function(kind, title) {
  var s = BLUI.state;
  var list = kind === 'pets' ? BLD.pets : BLD[kind];
  var btns = [];
  for (var i = 0; i < list.length; i++) {
    (function(item) {
      btns.push({ t: item.name + ' — ' + Life.money(s, item.price), fn: function() {
        if (kind === 'pets') {
          if (s.money < item.price) { BLUI.toast('Need ' + Life.money(s, item.price) + '.'); return true; }
          Life.cash(s, -item.price); Life.pet(s, item.id);
          var p = s.pets[s.pets.length - 1];
          BLUI.afterAction('Meet ' + p.name + ' the ' + item.name.split(' ')[0] + '!');
        } else {
          var got = Life.buyAsset(s, kind, item.id);
          if (!got) { BLUI.toast('Need ' + Life.money(s, item.price) + '.'); return true; }
          BLUI.afterAction('Bought ' + item.name + '! Flex responsibly.');
        }
      } });
    })(list[i]);
  }
  btns.push({ t: 'Cancel', fn: function() {} });
  BLUI.popup(title, 'Net worth: ' + Life.money(s, Life.netWorth(s)), btns);
};

/* blackjack: transient hand on state._bj (never saved meaningfully) */
BLUI.blackjack = function(bet) {
  var s = BLUI.state;
  if (s.money < bet) { BLUI.toast('Need ' + Life.money(s, bet) + '.'); return; }
  function draw() { var v = [2,3,4,5,6,7,8,9,10,10,10,10,11][Math.floor(Math.random() * 13)]; return v; }
  function val(h) {
    var t = 0, aces = 0, i;
    for (i = 0; i < h.length; i++) { t += h[i]; if (h[i] === 11) aces++; }
    while (t > 21 && aces > 0) { t -= 10; aces--; }
    return t;
  }
  s._bj = { bet: bet, ph: [draw(), draw()], dh: [draw(), draw()] };
  function renderBJ(msg) {
    var b = s._bj;
    var txt = (msg ? msg + '\n\n' : '') + 'You: ' + b.ph.join(', ') + ' = ' + val(b.ph) + '\nDealer shows: ' + b.dh[0] + ', ?';
    if (b.done) txt = (msg ? msg + '\n\n' : '') + 'You: ' + b.ph.join(', ') + ' = ' + val(b.ph) + '\nDealer: ' + b.dh.join(', ') + ' = ' + val(b.dh);
    var btns = [];
    if (!b.done) {
      btns.push({ t: 'Hit', fn: function() {
        b.ph.push(draw());
        if (val(b.ph) > 21) { b.done = true; Life.cash(s, -b.bet); Life.save(s); BLUI.render(); renderBJ('BUST! Dealer takes your dignity and cash.'); return true; }
        renderBJ(''); return true;
      } });
      btns.push({ t: 'Stand', fn: function() {
        b.done = true;
        while (val(b.dh) < 17) b.dh.push(draw());
        var p = val(b.ph), d = val(b.dh);
        if (d > 21 || p > d) { Life.cash(s, b.bet); Life.bump(s, 'hap', 8); renderBJ('YOU WIN ' + Life.money(s, b.bet) + '!'); }
        else if (p === d) { renderBJ('Push. Nobody wins. The house still wins emotionally.'); }
        else { Life.cash(s, -b.bet); Life.bump(s, 'hap', -5); renderBJ('Dealer wins. Your money now lives in Vegas.'); }
        Life.save(s); BLUI.render();
        return true;
      } });
    }
    btns.push({ t: 'Leave table', fn: function() { s._bj = null; } });
    BLUI.popup('Blackjack (' + Life.money(s, bet) + ' bet)', txt, btns);
  }
  renderBJ('');
};

if (typeof window !== 'undefined' && window.document) BLUI.boot();
