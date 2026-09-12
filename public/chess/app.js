/* BlockChess game flow (ES5). Chess engine + ChessAI + Chess3D glue. */
var ChessApp = (function() {

var IS_LEGACY = (function() {
  try {
    var ua = navigator.userAgent || '';
    var m = ua.match(/OS (\d+)_/);
    if (/iPhone|iPad|iPod/.test(ua) && m && parseInt(m[1], 10) <= 10) return true;
    var v = ua.match(/Version\/(\d+)\./);
    if (/Safari/.test(ua) && !/Chrome|CriOS/.test(ua) && v && parseInt(v[1], 10) <= 10) return true;
  } catch (e) {}
  return false;
})();

function $(id) { return document.getElementById(id); }
function el(tag, cls, text) {
  var d = document.createElement(tag);
  if (cls) d.className = cls;
  if (text != null) d.textContent = text;
  return d;
}

var S = {
  game: null, view3d: null,
  playerColor: 'w', level: 3,
  selected: null, hints: [],
  clocks: null, clockMs: 0, clockTimer: null, clockOn: false,
  busy: false, over: false
};

var SAVE_KEY = 'blockchess_save';

function toast(msg) {
  var t = $('status');
  t.textContent = msg;
  clearTimeout(t._tm);
  if (msg) t._tm = setTimeout(function() { if (!S.over) renderStatus(); }, 3200);
}

function pieceLetter(t) { return { p: 'P', n: 'N', b: 'B', r: 'R', q: 'Q', k: 'K' }[t] || '?'; }

function materialDiff() {
  var start = { p: 8, n: 2, b: 2, r: 2, q: 1 };
  var val = { p: 1, n: 3, b: 3, r: 5, q: 9 };
  var count = { w: { p: 0, n: 0, b: 0, r: 0, q: 0 }, b: { p: 0, n: 0, b: 0, r: 0, q: 0 } };
  var board = S.game.board();
  for (var r = 0; r < 8; r++) for (var f = 0; f < 8; f++) {
    var p = board[r][f];
    if (p && count[p.color][p.type] !== undefined) count[p.color][p.type]++;
  }
  var score = 0, capW = [], capB = [];
  for (var t in start) {
    var lw = start[t] - count.w[t], lb = start[t] - count.b[t];
    score += (lb - lw) * val[t];
    for (var i = 0; i < lw; i++) capB.push(pieceLetter(t));
    for (var j = 0; j < lb; j++) capW.push(pieceLetter(t));
  }
  return { score: score, capW: capW, capB: capB };
}

function renderStatus(extra) {
  if (S.over) return;
  var t;
  if (S.game.in_check()) t = (S.game.turn() === S.playerColor ? 'Check! Your move.' : 'Check! Bot thinking…');
  else t = S.game.turn() === S.playerColor ? 'Your move.' : 'Bot thinking…';
  $('status').textContent = extra || t;
}

function renderMoves() {
  var h = S.game.history();
  var box = $('movelist');
  box.innerHTML = '';
  for (var i = 0; i < h.length; i += 2) {
    var row = el('div', 'mv-row', (i / 2 + 1) + '. ' + h[i] + (h[i + 1] ? '  ' + h[i + 1] : ''));
    box.appendChild(row);
  }
  box.scrollTop = box.scrollHeight;
}

function renderCaptured() {
  var md = materialDiff();
  var you = S.playerColor === 'w' ? md.capW : md.capB;
  var bot = S.playerColor === 'w' ? md.capB : md.capW;
  var diff = S.playerColor === 'w' ? md.score : -md.score;
  $('captured').textContent = 'You took: ' + (you.join(' ') || '—') + '   Bot took: ' + (bot.join(' ') || '—')
    + (diff !== 0 ? '   (' + (diff > 0 ? '+' : '') + diff + ')' : '   (even)');
}

function fmtClock(ms) {
  var s = Math.max(0, Math.ceil(ms / 1000));
  var m = Math.floor(s / 60);
  return m + ':' + ('0' + (s % 60)).slice(-2);
}

function renderClocks() {
  if (!S.clocks) { $('clocks').style.display = 'none'; return; }
  $('clocks').style.display = 'flex';
  $('clock-you').textContent = 'YOU ' + fmtClock(S.clocks[S.playerColor]);
  $('clock-bot').textContent = 'BOT ' + fmtClock(S.clocks[S.playerColor === 'w' ? 'b' : 'w']);
}

function stopClock() {
  S.clockOn = false;
  if (S.clockTimer) { clearInterval(S.clockTimer); S.clockTimer = null; }
}

function startClock() {
  stopClock();
  if (!S.clocks || S.over) return;
  S.clockOn = true;
  var last = Date.now();
  S.clockTimer = setInterval(function() {
    if (!S.clockOn || S.over) return;
    var now = Date.now();
    var dt = now - last;
    last = now;
    var side = S.game.turn();
    S.clocks[side] -= dt;
    if (S.clocks[side] <= 0) {
      S.clocks[side] = 0;
      renderClocks();
      endGame(side === S.playerColor ? '0-1' : '1-0', 'won on time', side === S.playerColor ? 'Flag fall — you ran out of time.' : 'Flag fall — the bot ran out of time.');
      return;
    }
    renderClocks();
  }, 250);
}

function saveGame() {
  try {
    if (!window.localStorage) return;
    localStorage.setItem(SAVE_KEY, JSON.stringify({
      history: S.game.history({ verbose: true }).map(function(m) { return { from: m.from, to: m.to, promotion: m.promotion }; }),
      playerColor: S.playerColor, level: S.level, clockMs: S.clockMs, clocks: S.clocks
    }));
  } catch (e) {}
}

function loadSave() {
  try {
    if (!window.localStorage) return null;
    var raw = localStorage.getItem(SAVE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}

function refresh3D() {
  S.view3d.setPosition(S.game.board());
  S.view3d.clearHL();
  var hist = S.game.history({ verbose: true });
  if (hist.length) {
    var last = hist[hist.length - 1];
    S.view3d.markLastMove(last.from, last.to);
  }
  updateCheckHL();
}

function kingSquare(color) {
  var board = S.game.board();
  var files = 'abcdefgh';
  for (var r = 0; r < 8; r++) for (var f = 0; f < 8; f++) {
    var p = board[r][f];
    if (p && p.type === 'k' && p.color === color) return files.charAt(f) + (8 - r);
  }
  return null;
}

function updateCheckHL() {
  if (!S.game.in_check()) return;
  var ks = kingSquare(S.game.turn());
  if (ks) S.view3d.markCheck(ks);
}

function legalFrom(sq) {
  return S.game.moves({ square: sq, verbose: true });
}

function illegalReason(sq) {
  if (S.game.in_check()) return 'Illegal — your king is in check. Block, capture, or move it.';
  return 'Illegal move for that piece.';
}

function onPick(sq) {
  if (S.busy || S.over || S.game.turn() !== S.playerColor) return;
  var piece = S.game.get(sq);
  if (S.selected && sq !== S.selected) {
    var moves = legalFrom(S.selected);
    var promos = [];
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].to === sq) {
        if (moves[i].promotion) promos.push(moves[i].promotion);
      }
    }
    if (promos.length) { showPromo(S.selected, sq); return; }
    var ok = false;
    for (var j = 0; j < moves.length; j++) if (moves[j].to === sq) ok = true;
    if (ok) { doPlayerMove(S.selected, sq, undefined); return; }
  }
  if (piece && piece.color === S.playerColor) {
    S.selected = sq;
    var ms = legalFrom(sq);
    var dests = [];
    for (var k = 0; k < ms.length; k++) dests.push(ms[k].to);
    S.view3d.clearHL();
    var hist = S.game.history({ verbose: true });
    if (hist.length) S.view3d.markLastMove(hist[hist.length - 1].from, hist[hist.length - 1].to);
    updateCheckHL();
    S.view3d.showHints(dests);
    S.view3d.markSelected(sq);
    renderStatus();
    return;
  }
  S.selected = null;
  S.view3d.clearHL();
  refresh3D();
  if (piece && piece.color !== S.playerColor) toast('That is the bot\u2019s piece. Capture it legally instead.');
  else toast(illegalReason(sq));
}

function showPromo(from, to) {
  var wrap = $('promo');
  wrap.style.display = 'flex';
  var btns = wrap.querySelectorAll('button');
  function pick(p) {
    wrap.style.display = 'none';
    for (var i = 0; i < btns.length; i++) btns[i].onclick = null;
    doPlayerMove(from, to, p);
  }
  var opts = ['q', 'r', 'b', 'n'];
  for (var i = 0; i < btns.length; i++) {
    (function(idx) { btns[idx].onclick = function() { pick(opts[idx]); }; })(i);
  }
}

function doPlayerMove(from, to, promotion) {
  var mv = S.game.move({ from: from, to: to, promotion: promotion });
  if (!mv) { toast(illegalReason(to)); return; }
  S.selected = null;
  afterMove(mv, true);
}

function afterMove(mv, byPlayer) {
  var captured = !!mv.captured;
  S.view3d.movePiece(mv.from, mv.to, captured);
  setTimeout(function() {
    S.view3d.markLastMove(mv.from, mv.to);
    updateCheckHL();
  }, 300);
  renderMoves();
  renderCaptured();
  saveGame();
  if (checkEnd()) return;
  startClock();
  if (byPlayer) {
    S.busy = true;
    renderStatus();
    setTimeout(botMove, 420);
  } else {
    S.busy = false;
    renderStatus();
  }
}

function botMove() {
  if (S.over || S.game.turn() === S.playerColor) { S.busy = false; return; }
  renderStatus('Bot thinking…');
  setTimeout(function() {
    var opts = IS_LEGACY ? { maxDepth: 3, timeScale: 0.7 } : null;
    var m = null;
    try { m = ChessAI.bestMove(S.game, S.level, opts); } catch (e) { m = null; }
    S.busy = false;
    if (!m) { checkEnd(); renderStatus(); return; }
    var mv = S.game.move({ from: m.from, to: m.to, promotion: m.promotion || 'q' });
    if (!mv) { checkEnd(); return; }
    afterMove(mv, false);
  }, 60);
}

function causeText() {
  var g = S.game;
  if (g.in_checkmate()) return 'checkmate';
  if (g.in_stalemate()) return 'stalemate';
  if (g.in_threefold_repetition()) return 'threefold repetition';
  if (g.insufficient_material()) return 'insufficient mating material';
  if (g.in_draw()) return 'fifty-move rule';
  return 'draw';
}

function endGame(result, cause, detail) {
  S.over = true;
  stopClock();
  try { if (window.localStorage) localStorage.removeItem(SAVE_KEY); } catch (e) {}
  var md = materialDiff();
  var diff = S.playerColor === 'w' ? md.score : -md.score;
  var moves = S.game.history().length;
  var title;
  if (result === '1/2') title = 'Draw.';
  else if ((result === '1-0' && S.playerColor === 'w') || (result === '0-1' && S.playerColor === 'b')) title = 'You win!';
  else title = 'You lose.';
  var sub = 'How: ' + cause + (detail ? ' — ' + detail : '');
  sub += '\nMoves: ' + moves + '   Material: ' + (diff > 0 ? '+' + diff + ' for you' : (diff < 0 ? diff + ' (down)' : 'even'));
  $('res-title').textContent = title;
  $('res-sub').textContent = sub;
  $('result').style.display = 'flex';
  renderStatus(title);
}

function checkEnd() {
  var g = S.game;
  if (!g.game_over()) return false;
  var cause = causeText(), detail = '';
  if (g.in_checkmate()) {
    var winner = g.turn() === 'w' ? 'b' : 'w';
    detail = winner === S.playerColor ? 'You mated the bot\u2019s king.' : 'Your king got mated.';
    endGame(winner === 'w' ? '1-0' : '0-1', cause, detail);
  } else if (g.in_stalemate()) {
    endGame('1/2', cause, 'No legal moves, but not in check. Nobody wins.');
  } else if (g.in_threefold_repetition()) {
    endGame('1/2', cause, 'Same position three times.');
  } else if (g.insufficient_material()) {
    endGame('1/2', cause, 'Neither side can force mate.');
  } else {
    endGame('1/2', cause, 'Fifty moves with no pawn move or capture.');
  }
  return true;
}

function newGame() {
  stopClock();
  S.game = new Chess();
  S.selected = null;
  S.over = false;
  S.busy = false;
  S.clocks = S.clockMs > 0 ? { w: S.clockMs, b: S.clockMs } : null;
  try { if (window.localStorage) localStorage.removeItem(SAVE_KEY); } catch (e) {}
  $('result').style.display = 'none';
  $('promo').style.display = 'none';
  S.whiteBottom = (S.playerColor === 'w');
  S.view3d.setPosition(S.game.board());
  S.view3d.flip(S.whiteBottom);
  renderMoves();
  renderCaptured();
  renderClocks();
  renderStatus();
  startClock();
  if (S.game.turn() !== S.playerColor) {
    S.busy = true;
    setTimeout(botMove, 500);
  }
}

function continueGame(sv) {
  S.game = new Chess();
  S.playerColor = sv.playerColor || 'w';
  S.level = typeof sv.level === 'number' ? sv.level : 3;
  S.clockMs = sv.clockMs || 0;
  S.clocks = sv.clocks || (S.clockMs > 0 ? { w: S.clockMs, b: S.clockMs } : null);
  var hist = sv.history || [];
  for (var i = 0; i < hist.length; i++) {
    try { S.game.move({ from: hist[i].from, to: hist[i].to, promotion: hist[i].promotion }); }
    catch (e) { break; }
  }
  S.selected = null;
  S.over = false;
  S.busy = false;
  $('result').style.display = 'none';
  S.whiteBottom = (S.playerColor === 'w');
  S.view3d.setPosition(S.game.board());
  S.view3d.flip(S.whiteBottom);
  syncControls();
  renderMoves();
  renderCaptured();
  renderClocks();
  renderStatus();
  startClock();
  checkEnd();
  if (!S.over && S.game.turn() !== S.playerColor) {
    S.busy = true;
    setTimeout(botMove, 500);
  }
}

function syncControls() {
  $('level').value = String(S.level);
  $('color').value = S.playerColor;
  $('clocksel').value = String(S.clockMs);
  var lv = ChessAI.LEVELS[S.level];
  $('leveldesc').textContent = lv ? (lv.name + ' — ' + lv.sub) : '';
}

function undo() {
  if (S.busy) return;
  var h = S.game.history();
  if (!h.length) { toast('Nothing to undo.'); return; }
  S.game.undo();
  if (S.game.history().length && S.game.turn() !== S.playerColor) S.game.undo();
  S.selected = null;
  S.over = false;
  $('result').style.display = 'none';
  refresh3D();
  renderMoves();
  renderCaptured();
  saveGame();
  renderStatus('Undone. The bot pretends not to remember.');
}

function hint() {
  if (S.busy || S.over || S.game.turn() !== S.playerColor) return;
  toast('Thinking of a hint…');
  setTimeout(function() {
    var m = null;
    try { m = ChessAI.bestMove(S.game, Math.min(S.level, 5), IS_LEGACY ? { maxDepth: 2 } : null); } catch (e) {}
    if (!m) { toast('No hint found.'); return; }
    S.view3d.clearHL();
    var hist = S.game.history({ verbose: true });
    if (hist.length) S.view3d.markLastMove(hist[hist.length - 1].from, hist[hist.length - 1].to);
    updateCheckHL();
    S.view3d.showHints([m.to]);
    S.view3d.markSelected(m.from);
    var san = '';
    try {
      var g2 = new Chess(S.game.fen());
      var mv = g2.move({ from: m.from, to: m.to, promotion: m.promotion });
      san = mv ? mv.san : (m.from + '-' + m.to);
    } catch (e) { san = m.from + '-' + m.to; }
    toast('Hint: ' + san);
  }, 60);
}

function boot() {
  var box = $('board');
  S.view3d = Chess3D.create(box, { lowQ: IS_LEGACY });
  if (!S.view3d) {
    $('status').textContent = '3D failed to start on this device.';
    return;
  }
  var lvSel = $('level');
  for (var i = 0; i < ChessAI.LEVELS.length; i++) {
    var o = document.createElement('option');
    o.value = String(i);
    o.textContent = (i + 1) + '. ' + ChessAI.LEVELS[i].name;
    lvSel.appendChild(o);
  }
  S.view3d.onPick(onPick);
  $('btn-new').addEventListener('click', function() { newGame(); });
  lvSel.addEventListener('change', function() {
    S.level = parseInt(lvSel.value, 10) || 0;
    syncControls();
    toast('Bot: ' + ChessAI.LEVELS[S.level].name + '. Applies from its next move.');
  });
  $('color').addEventListener('change', function() {
    S.playerColor = $('color').value === 'b' ? 'b' : 'w';
    newGame();
  });
  $('clocksel').addEventListener('change', function() {
    S.clockMs = parseInt($('clocksel').value, 10) || 0;
    newGame();
  });
  S.whiteBottom = true;
  $('btn-flip').addEventListener('click', function() {
    S.whiteBottom = !S.whiteBottom;
    S.view3d.flip(S.whiteBottom);
  });
  $('btn-undo').addEventListener('click', undo);
  $('btn-hint').addEventListener('click', hint);
  $('btn-resign').addEventListener('click', function() {
    if (S.over) return;
    endGame(S.playerColor === 'w' ? '0-1' : '1-0', 'resignation', 'You tipped your king over.');
  });
  $('btn-again').addEventListener('click', function() { newGame(); });
  window.addEventListener('resize', function() { S.view3d.resize(); });

  var sv = loadSave();
  if (sv && sv.history && sv.history.length) {
    S.level = 3;
    S.playerColor = 'w';
    S.clockMs = 0;
    syncControls();
    continueGame(sv);
    toast('Restored your saved game.');
  } else {
    S.level = 3;
    S.playerColor = 'w';
    S.clockMs = 0;
    syncControls();
    newGame();
  }
}

return { boot: boot };
})();
