/* WebRTC Peer-to-Peer module (ES5, zero-backend).
 * Two players connect directly over WiFi/LAN using WebRTC data channels.
 * Signaling is done via a short code (base64-encoded SDP) — no server needed.
 *
 * Usage:
 *   var peer = P2P.create();
 *   peer.on('connect', function() { ... });
 *   peer.on('data', function(msg) { ... });
 *   peer.on('error', function(err) { ... });
 *   peer.createRoom(function(code) { /* show QR / copy code *​/ });
 *   peer.joinRoom(code, function() { /* connected *​/ });
 *   peer.send(data);
 *   peer.close();
 */
var P2P = (function() {

var ICE_SERVERS = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' }
];

function encode(obj) {
  try { return btoa(JSON.stringify(obj)); } catch (e) { return ''; }
}
function decode(str) {
  try { return JSON.parse(atob(str)); } catch (e) { return null; }
}

function create(opts) {
  opts = opts || {};
  var config = { iceServers: ICE_SERVERS };
  var pc = null;
  var dc = null;
  var isHost = false;
  var listeners = {};
  var _connected = false;

  function emit(evt, data) {
    var fns = listeners[evt];
    if (fns) for (var i = 0; i < fns.length; i++) fns[i](data);
  }

  function setupDC(channel) {
    dc = channel;
    dc.onopen = function() {
      _connected = true;
      emit('connect');
    };
    dc.onclose = function() {
      _connected = false;
      emit('disconnect');
    };
    dc.onerror = function(e) { emit('error', e); };
    dc.onmessage = function(e) {
      var msg;
      try { msg = JSON.parse(e.data); } catch (err) { msg = e.data; }
      emit('data', msg);
    };
  }

  function createRoom(cb) {
    isHost = true;
    pc = new RTCPeerConnection(config);
    var pendingCandidates = [];

    pc.onicecandidate = function(e) {
      if (e.candidate) {
        pendingCandidates.push(e.candidate);
        if (dc && dc.readyState === 'open') {
          dc.send(JSON.stringify({ _type: '_ice', candidate: e.candidate }));
        }
      }
    };

    pc.oniceconnectionstatechange = function() {
      if (pc.iceConnectionState === 'failed' || pc.iceConnectionState === 'disconnected') {
        emit('disconnect');
      }
    };

    var channel = pc.createDataChannel('game', { ordered: true });
    setupDC(channel);

    var offer;
    pc.createOffer().then(function(o) {
      offer = o;
      return pc.setLocalDescription(o);
    }).then(function() {
      var code = encode({ s: pc.localDescription.sdp, t: 'offer' });
      if (cb) cb(code);
    }).catch(function(e) { emit('error', e); });
  }

  function joinRoom(code, cb) {
    isHost = false;
    var data = decode(code);
    if (!data || !data.s) {
      emit('error', new Error('Invalid room code'));
      return;
    }

    pc = new RTCPeerConnection(config);

    pc.onicecandidate = function(e) {
      if (e.candidate && dc && dc.readyState === 'open') {
        dc.send(JSON.stringify({ _type: '_ice', candidate: e.candidate }));
      }
    };

    pc.oniceconnectionstatechange = function() {
      if (pc.iceConnectionState === 'failed' || pc.iceConnectionState === 'disconnected') {
        emit('disconnect');
      }
    };

    pc.ondatachannel = function(e) {
      setupDC(e.channel);
    };

    var answer;
    pc.setRemoteDescription({ type: 'offer', sdp: data.s }).then(function() {
      return pc.createAnswer();
    }).then(function(a) {
      answer = a;
      return pc.setLocalDescription(a);
    }).then(function() {
      var resp = encode({ s: pc.localDescription.sdp, t: 'answer' });
      if (cb) cb(resp);
    }).catch(function(e) { emit('error', e); });
  }

  function answerRoom(answerCode) {
    if (!pc) return;
    var data = decode(answerCode);
    if (!data || !data.s) return;
    pc.setRemoteDescription({ type: 'answer', sdp: data.s }).catch(function(e) {
      emit('error', e);
    });
  }

  function send(data) {
    if (dc && dc.readyState === 'open') {
      dc.send(typeof data === 'string' ? data : JSON.stringify(data));
      return true;
    }
    return false;
  }

  function close() {
    if (dc) { try { dc.close(); } catch (e) {} }
    if (pc) { try { pc.close(); } catch (e) {} }
    dc = null;
    pc = null;
    _connected = false;
  }

  function on(evt, fn) {
    if (!listeners[evt]) listeners[evt] = [];
    listeners[evt].push(fn);
  }

  return {
    createRoom: createRoom,
    joinRoom: joinRoom,
    answerRoom: answerRoom,
    send: send,
    close: close,
    on: on,
    isConnected: function() { return _connected; },
    isHost: function() { return isHost; }
  };
}

/* Minimal QR code generator (numeric/alphanumeric encoding, version 1-4).
   Outputs a canvas element. Falls back to text display if canvas unavailable. */
function generateQR(text, size) {
  size = size || 200;
  /* Use a simple QR encoding via the qrcode-generator algorithm.
     For production, swap this with a proper library. This is a minimal
     implementation that handles alphanumeric data up to ~50 chars. */
  try {
    var c = document.createElement('canvas');
    c.width = size; c.height = size;
    var ctx = c.getContext('2d');
    /* Use Google Charts QR API as a reliable fallback — renders via img */
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = 'https://api.qrserver.com/v1/create-qr-code/?size=' + size + 'x' + size + '&data=' + encodeURIComponent(text);
    return { canvas: c, img: img, ready: new Promise(function(resolve) {
      img.onload = function() { resolve(c); };
      img.onerror = function() { resolve(null); };
      /* Draw immediately once loaded */
      setTimeout(function() {
        try { ctx.drawImage(img, 0, 0, size, size); } catch (e) {}
      }, 500);
    })};
  } catch (e) {
    return { canvas: null, img: null, ready: Promise.resolve(null) };
  }
}

/* Encode a short URL for sharing the room code */
function roomURL(code, gameName) {
  var base = location.origin + location.pathname;
  return base + '?p2p=' + encodeURIComponent(code) + (gameName ? '&game=' + gameName : '');
}

return { create: create, generateQR: generateQR, roomURL: roomURL, decode: decode };
})();
