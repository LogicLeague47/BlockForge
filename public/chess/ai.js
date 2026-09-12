/* ChessAI: 10-level bot for BlockChess (ES5, browser + node).
 * Negamax alpha-beta + iterative deepening + time caps + blunder model. */
(function(root) {

var VAL = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 20000 };

/* Piece-square tables, white perspective, a8..h1 order (64 entries). */
var PST = {
p: [0,0,0,0,0,0,0,0,50,50,50,50,50,50,50,50,10,10,20,30,30,20,10,10,5,5,10,25,25,10,5,5,0,0,0,20,20,0,0,0,5,-5,-10,0,0,-10,-5,5,5,10,10,-20,-20,10,10,5,0,0,0,0,0,0,0,0],
n: [-50,-40,-30,-30,-30,-30,-40,-50,-40,-20,0,0,0,0,-20,-40,-30,0,10,15,15,10,0,-30,-30,5,15,20,20,15,5,-30,-30,0,15,20,20,15,0,-30,-30,5,10,15,15,10,5,-30,-40,-20,0,5,5,0,-20,-40,-50,-40,-30,-30,-30,-30,-40,-50],
b: [-20,-10,-10,-10,-10,-10,-10,-20,-10,0,0,0,0,0,0,-10,-10,0,5,10,10,5,0,-10,-10,5,5,10,10,5,5,-10,-10,0,10,10,10,10,0,-10,-10,10,10,10,10,10,10,-10,-10,5,0,0,0,0,5,-10,-20,-10,-10,-10,-10,-10,-10,-20],
r: [0,0,0,0,0,0,0,0,5,10,10,10,10,10,10,5,-5,0,0,0,0,0,0,-5,-5,0,0,0,0,0,0,-5,-5,0,0,0,0,0,0,-5,-5,0,0,0,0,0,0,-5,-5,0,0,0,0,0,0,-5,0,0,0,5,5,0,0,0],
q: [-20,-10,-10,-5,-5,-10,-10,-20,-10,0,0,0,0,0,0,-10,-10,0,5,5,5,5,0,-10,-5,0,5,5,5,5,0,-5,0,0,5,5,5,5,0,-5,-10,5,5,5,5,5,0,-10,-10,0,5,0,0,0,0,-10,-20,-10,-10,-5,-5,-10,-10,-20],
k: [-30,-40,-40,-50,-50,-40,-40,-30,-30,-40,-40,-50,-50,-40,-40,-30,-30,-40,-40,-50,-50,-40,-40,-30,-30,-40,-40,-50,-50,-40,-40,-30,-20,-30,-30,-40,-40,-30,-30,-20,-10,-20,-20,-20,-20,-20,-20,-10,20,20,0,0,0,0,20,20,20,30,10,0,0,10,30,20]
};

function sqIndex(sq) {
  var f = 'abcdefgh'.indexOf(sq.charAt(0));
  var r = 8 - parseInt(sq.charAt(1), 10);
  return r * 8 + f;
}

function evaluate(game) {
  /* White-relative centipawns. */
  var score = 0, b = 0, w = 0;
  var board = game.board();
  for (var r = 0; r < 8; r++) {
    for (var f = 0; f < 8; f++) {
      var p = board[r][f];
      if (!p) continue;
      var idx = r * 8 + f;
      /* mirror index for black: row flip */
      var mi = p.color === 'w' ? idx : ((7 - r) * 8 + f);
      var v = VAL[p.type] + PST[p.type][mi];
      if (p.color === 'w') { score += v; if (p.type === 'b') w++; }
      else { score -= v; if (p.type === 'b') b++; }
    }
  }
  if (w >= 2) score += 30;
  if (b >= 2) score -= 30;
  return score;
}

var MATE = 100000;

function orderMoves(game, moves) {
  var scored = [];
  for (var i = 0; i < moves.length; i++) {
    var m = moves[i];
    var s = 0;
    if (m.captured) s = 10 * VAL[m.captured] - VAL[m.piece];
    if (m.promotion) s += VAL[m.promotion];
    if (m.flags && (m.flags.indexOf('k') !== -1 || m.flags.indexOf('q') !== -1)) s += 30;
    scored.push({ m: m, s: s });
  }
  scored.sort(function(a, b) { return b.s - a.s; });
  var out = [];
  for (var j = 0; j < scored.length; j++) out.push(scored[j].m);
  return out;
}

function search(game, depth, alpha, beta, ply, st) {
  if ((++st.nodes & 511) === 0 && Date.now() > st.deadline) { st.abort = true; return alpha; }
  if (st.abort) return alpha;
  var moves = game.moves({ verbose: true });
  if (!moves.length) {
    if (game.in_check()) return -MATE + ply;
    return 0;
  }
  if (depth <= 0) {
    var ev = evaluate(game);
    return game.turn() === 'w' ? ev : -ev;
  }
  moves = orderMoves(game, moves);
  var best = -Infinity;
  for (var i = 0; i < moves.length; i++) {
    game.move(moves[i]);
    var sc = -search(game, depth - 1, -beta, -alpha, ply + 1, st);
    game.undo();
    if (st.abort) return alpha;
    if (sc > best) best = sc;
    if (best > alpha) alpha = best;
    if (alpha >= beta) break;
  }
  return best === -Infinity ? 0 : best;
}

var LEVELS = [
  { name: 'Newborn', sub: 'plays random moves', depth: 1, blunder: 0.85, pick: 'any', time: 200 },
  { name: 'Beginner', sub: 'learning the pieces', depth: 1, blunder: 0.45, pick: 'any', time: 250 },
  { name: 'Casual', sub: 'plays for fun', depth: 1, blunder: 0.18, pick: 'any', time: 350 },
  { name: 'Club Player', sub: 'knows one opening', depth: 2, blunder: 0.35, pick: 'any', time: 500 },
  { name: 'Skilled', sub: 'thinks two ahead', depth: 2, blunder: 0.14, pick: 'top', time: 800 },
  { name: 'Advanced', sub: 'no free pieces', depth: 2, blunder: 0, pick: 'top', time: 1100 },
  { name: 'Expert', sub: 'sees tactics', depth: 3, blunder: 0.12, pick: 'top', time: 1300 },
  { name: 'Master', sub: 'rarely blinks', depth: 3, blunder: 0.03, pick: 'top', time: 1700 },
  { name: 'Grandmaster', sub: 'cold and precise', depth: 3, blunder: 0, pick: 'top', time: 2200 },
  { name: 'Nightmare', sub: 'good luck', depth: 4, blunder: 0, pick: 'top', time: 4200 }
];

function rootScores(game, depth, st) {
  var moves = orderMoves(game, game.moves({ verbose: true }));
  var out = [];
  var alpha = -Infinity;
  for (var i = 0; i < moves.length; i++) {
    game.move(moves[i]);
    var sc = -search(game, depth - 1, -Infinity, -alpha === -Infinity ? Infinity : -alpha, 1, st);
    game.undo();
    if (st.abort) break;
    out.push({ m: moves[i], s: sc });
    if (sc > alpha) alpha = sc;
  }
  out.sort(function(a, b) { return b.s - a.s; });
  return out;
}

function bestMove(game, levelIdx, opts) {
  opts = opts || {};
  var lv = LEVELS[Math.max(0, Math.min(9, levelIdx))];
  var maxDepth = opts.maxDepth || 99;
  var timeScale = opts.timeScale || 1;
  var moves = game.moves({ verbose: true });
  if (!moves.length) return null;
  if (lv.depth <= 1 && Math.random() < lv.blunder && lv.pick === 'any') {
    return moves[Math.floor(Math.random() * moves.length)];
  }
  var depthCap = Math.min(lv.depth, maxDepth);
  var st = { nodes: 0, abort: false, deadline: Date.now() + lv.time * timeScale };
  var scored = [];
  for (var d = 1; d <= depthCap; d++) {
    st.abort = false;
    var cur = rootScores(game, d, st);
    if (st.abort && scored.length) break;
    if (!cur.length) break;
    scored = cur;
    if (scored.length && scored[0].s > MATE - 100) break;
  }
  if (!scored.length) return moves[Math.floor(Math.random() * moves.length)];
  if (Math.random() < lv.blunder) {
    if (lv.pick === 'top' && scored.length > 1) {
      var best = scored[0].s;
      var cands = [];
      for (var i = 1; i < scored.length && i < 5; i++) {
        if (best - scored[i].s < 200) cands.push(scored[i]);
      }
      if (cands.length) return cands[Math.floor(Math.random() * cands.length)].m;
    }
    return moves[Math.floor(Math.random() * moves.length)];
  }
  return scored[0].m;
}

root.ChessAI = { LEVELS: LEVELS, bestMove: bestMove, evaluate: evaluate };
if (typeof module !== 'undefined' && module.exports) module.exports = root.ChessAI;

})(typeof self !== 'undefined' ? self : this);
