// P2P Network adapter — WebRTC data channels, zero backend.
// Star topology: host relays all messages between peers.
// Signaling via copy-paste/QR (no server needed for signaling).
//
// Flow per joiner:
//   1. Host creates offer → generates ANSWER CODE (joiner enters this)
//   2. Joiner enters code → creates answer → generates CONFIRM CODE
//   3. Host enters confirm code → connection established
//
// For max players: host bandwidth is the bottleneck.
// Position: binary 30B frames at 20Hz. All other: JSON.

const ICE_SERVERS = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
  { urls: 'stun:stun2.l.google.com:19302' },
  { urls: 'stun:stun3.l.google.com:19302' },
  { urls: 'stun:stun4.l.google.com:19302' },
];

const MAX_PLAYERS = 1000;

function b64(o) { try { return btoa(JSON.stringify(o)); } catch (e) { return ''; } }
function unb64(s) { try { return JSON.parse(atob(s)); } catch (e) { return null; } }

function waitICE(pc) {
  return new Promise((resolve) => {
    if (pc.iceGatheringState === 'complete') { resolve(); return; }
    pc.onicegatheringstatechange = () => {
      if (pc.iceGatheringState === 'complete') resolve();
    };
    setTimeout(resolve, 3000); // timeout — don't block forever
  });
}

export class P2PNetwork {
  constructor() {
    this.connected = false;
    this.roomName = null;
    this.isHost = false;
    this.playerName = '';

    this._textEncoder = new TextEncoder();
    this._textDecoder = new TextDecoder();
    this._posBuf = new ArrayBuffer(1 + 1 + 32 + 16 + 1);
    this._posView = new DataView(this._posBuf);

    this._peers = new Map();        // name -> { pc, dc, name }
    this._pc = null;                // joiner: single RTCPeerConnection
    this._dc = null;                // joiner: single data channel
    this._hostDC = null;            // joiner: data channel from host
    this._roomCode = null;
    this._pendingOffers = new Map(); // peerName -> RTCPeerConnection (host awaiting answer)
    this._maxPlayers = MAX_PLAYERS;

    this.onConnected = null;
    this.onJoined = null;
    this.onPlayerJoin = null;
    this.onPlayerLeave = null;
    this.onPlayerPosition = null;
    this.onPlayerArmor = null;
    this.onChat = null;
    this.onRoomList = null;
    this.onError = null;
    this.onKicked = null;
    this.onPlayerList = null;
    this.onGameMode = null;
    this.onDisconnect = null;
    this.onPlayerDamage = null;
    this.onAuthResult = null;
    this.onBlockUpdate = null;
    this.onBlockBatch = null;
    this.onMobSpawn = null;
    this.onMobPosition = null;
    this.onMobDamage = null;
    this.onMobDeath = null;
    this.onRoleChanged = null;
    this.onFriendState = null;
    this.onFriendMsg = null;
    this.onDm = null;
    this.onDmOfflineCount = null;
    this.onDmStatus = null;
    this.onDmSyncPull = null;
    this.onLinkIdentityResult = null;
    this.onStartOAuthLinkResult = null;
    this.onOwnAccountDetail = null;
    this.onLinkAccountResult = null;
    this.onUnlinkIdentityResult = null;

    this._lastJoinInfo = null;
    this._connectedCallbacks = [];
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  HOST — create room
  // ═══════════════════════════════════════════════════════════════════════

  createRoomOnP2P(playerName, seed, gameMode) {
    this.isHost = true;
    this.playerName = playerName;
    this.roomName = 'p2p_' + playerName;
    this._lastJoinInfo = { playerName, seed, gameMode };
    this._peers.clear();
    this._pendingOffers.clear();

    console.log('[P2P] Hosting as', playerName, 'seed:', seed);

    if (this.onConnected) { const cb = this.onConnected; this.onConnected = null; cb(); }
    while (this._connectedCallbacks.length) this._connectedCallbacks.shift()();

    this._roomCode = b64({
      t: 'p2p', n: playerName,
      s: seed || 42, m: gameMode || 'survival', v: 2,
    });
    return this._roomCode;
  }

  // Host: create offer for a specific joiner → returns promise of offer code
  createOfferForJoiner(joinerName) {
    const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
    const dc = pc.createDataChannel('game', { ordered: true, maxRetransmits: 2 });
    dc.binaryType = 'arraybuffer';

    const peerObj = { pc, dc, name: joinerName, ready: false };
    this._pendingOffers.set(joinerName, peerObj);

    dc.onopen = () => {
      console.log('[P2P] Peer connected:', joinerName);
      this._peers.set(joinerName, peerObj);
      this._pendingOffers.delete(joinerName);
      peerObj.ready = true;

      this._sendToPeer(joinerName, {
        _t: 'joined',
        room: this.roomName,
        seed: this._lastJoinInfo?.seed || 42,
        gameMode: this._lastJoinInfo?.gameMode || 'survival',
        players: this._getplayerList(),
        role: 'player',
        maxPlayers: this._maxPlayers,
      });

      if (this.onPlayerJoin) this.onPlayerJoin(joinerName, 'player', 0);
      this._broadcastPlayerList();
    };

    dc.onclose = () => {
      console.log('[P2P] Peer disconnected:', joinerName);
      this._peers.delete(joinerName);
      this._pendingOffers.delete(joinerName);
      if (this.onPlayerLeave) this.onPlayerLeave(joinerName);
      this._broadcastPlayerList();
    };

    dc.onerror = (e) => console.error('[P2P] DC error:', joinerName, e);

    this._setupDC(dc, joinerName);

    return pc.createOffer().then((offer) => pc.setLocalDescription(offer)).then(() => waitICE(pc)).then(() => {
      const offerCode = b64({
        o: pc.localDescription.sdp,
        n: joinerName,
        h: this.playerName,
        s: this._lastJoinInfo?.seed || 42,
        m: this._lastJoinInfo?.gameMode || 'survival',
        v: 2,
      });
      return offerCode;
    });
  }

  // Host: accept joiner's answer → completes signaling
  acceptAnswer(answerCode) {
    const data = unb64(answerCode);
    if (!data || !data.a || !data.n) {
      if (this.onError) this.onError('Invalid answer code.');
      return false;
    }
    const joinerName = data.n;
    const peerObj = this._pendingOffers.get(joinerName);
    if (!peerObj) {
      if (this.onError) this.onError('No pending connection for ' + joinerName + '. Create an offer first.');
      return false;
    }
    peerObj.pc.setRemoteDescription({ type: 'answer', sdp: data.a }).catch((e) => {
      console.error('[P2P] setRemoteDescription error:', e);
      if (this.onError) this.onError('Failed to connect to ' + joinerName);
    });
    return true;
  }

  _getplayerList() {
    const list = [this.playerName];
    this._peers.forEach((_, name) => list.push(name));
    return list;
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  JOINER — connect to host
  // ═══════════════════════════════════════════════════════════════════════

  joinRoomByCode(code, playerName) {
    const data = unb64(code);
    if (!data || data.t !== 'p2p') {
      if (this.onError) this.onError('Invalid room code.');
      return;
    }
    this.isHost = false;
    this.playerName = playerName;
    console.log('[P2P] Joining', data.n, 'seed:', data.s);
    // Store room metadata — the actual connection happens when acceptOfferCode is called
    this._lastJoinInfo = { hostName: data.n, seed: data.s, gameMode: data.m };
  }

  // Joiner: enter the host's offer code → creates answer → returns answer code
  acceptOfferCode(offerCode) {
    const data = unb64(offerCode);
    if (!data || !data.o) {
      if (this.onError) this.onError('Invalid offer code.');
      return Promise.reject(new Error('Invalid offer code'));
    }

    const hostName = data.h;
    const seed = data.s;
    const gameMode = data.m;

    const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
    this._pc = pc;

    pc.oniceconnectionstatechange = () => {
      const state = pc.iceConnectionState;
      if (state === 'failed' || state === 'disconnected' || state === 'closed') {
        console.log('[P2P] Connection lost:', state);
        this.connected = false;
        this.roomName = null;
        if (this.onDisconnect) this.onDisconnect();
      }
    };

    // Receive host's data channel
    pc.ondatachannel = (e) => {
      const dc = e.channel;
      dc.binaryType = 'arraybuffer';
      this._hostDC = dc;
      this._setupDC(dc, 'host');

      dc.onopen = () => {
        console.log('[P2P] Connected to host');
        this.connected = true;
        this.roomName = 'p2p_' + hostName;

        dc.send(JSON.stringify({ _t: 'handshake', name: this.playerName }));

        if (this.onConnected) { const cb = this.onConnected; this.onConnected = null; cb(); }
        while (this._connectedCallbacks.length) this._connectedCallbacks.shift()();
      };

      dc.onclose = () => {
        this.connected = false;
        this.roomName = null;
        if (this.onDisconnect) this.onDisconnect();
      };
    };

    return pc.setRemoteDescription({ type: 'offer', sdp: data.o }).then(() => pc.createAnswer()).then((answer) => pc.setLocalDescription(answer)).then(() => waitICE(pc)).then(() => {
      const answerCode = b64({
        a: pc.localDescription.sdp,
        n: this.playerName,
      });
      return answerCode;
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  Data channel message handling
  // ═══════════════════════════════════════════════════════════════════════

  _setupDC(dc, peerName) {
    dc.onmessage = (e) => {
      if (e.data instanceof ArrayBuffer) {
        this._handleBinaryMessage(e.data, peerName);
        return;
      }
      let msg;
      try { msg = JSON.parse(e.data); } catch { return; }
      this._handleMessage(msg, peerName);
    };
  }

  _handleMessage(msg, peerName) {
    if (!msg || !msg._t) return;
    const t = msg._t;

    // ── HOST receives from joiners ──
    if (this.isHost) {
      if (t === 'handshake') {
        console.log('[P2P] Handshake from', msg.name);
        if (msg.name !== peerName) {
          const peerObj = this._peers.get(peerName) || this._pendingOffers.get(peerName);
          if (peerObj) {
            this._peers.delete(peerName);
            this._pendingOffers.delete(peerName);
            peerObj.name = msg.name;
            this._peers.set(msg.name, peerObj);
          }
        }
        if (this.onPlayerJoin) this.onPlayerJoin(msg.name, 'player', 0);
        this._broadcastPlayerList();
      } else if (t === 'position') {
        this._broadcastExceptRaw(peerName, this._encodePos(msg.name || peerName, msg.x, msg.y, msg.z, msg.yaw, msg.flags || (msg.cr ? 1 : 0)));
        if (this.onPlayerPosition) this.onPlayerPosition(msg.name || peerName, msg.x, msg.y, msg.z, msg.yaw, msg.flags || (msg.cr ? 1 : 0), null);
      } else if (t === 'block_update') {
        this._broadcastExcept(peerName, msg);
        if (this.onBlockUpdate) this.onBlockUpdate(msg.x, msg.y, msg.z, msg.block);
      } else if (t === 'chat') {
        this._broadcastExcept(peerName, { _t: 'chat', name: peerName, text: msg.text, role: 'player' });
        if (this.onChat) this.onChat(peerName, 'player', msg.text);
      } else if (t === 'chest_update' || t === 'bed_spawn_point') {
        this._broadcastExcept(peerName, msg);
      } else if (t === 'mob_spawn' || t === 'mob_position' || t === 'mob_damage' || t === 'mob_death') {
        this._broadcastExcept(peerName, msg);
      } else if (t === 'armor_update') {
        this._broadcastExcept(peerName, { _t: 'armor', name: peerName, armor: msg.armor });
      } else if (t === 'player_damage') {
        const target = this._peers.get(msg.target);
        if (target && target.dc && target.dc.readyState === 'open') {
          target.dc.send(JSON.stringify({ _t: 'player_damage', from: peerName, damage: msg.damage }));
        }
      }
      return;
    }

    // ── JOINER receives from host ──
    if (t === 'joined') {
      this.connected = true;
      this.roomName = msg.room;
      if (this.onJoined) this.onJoined(msg.room, msg.seed, msg.gameMode, msg.players, msg.role);
    } else if (t === 'chat') {
      if (this.onChat) this.onChat(msg.name, msg.role || 'player', msg.text);
    } else if (t === 'position') {
      if (this.onPlayerPosition) this.onPlayerPosition(msg.name, msg.x, msg.y, msg.z, msg.yaw, msg.cr, null);
    } else if (t === 'block_update') {
      if (this.onBlockUpdate) this.onBlockUpdate(msg.x, msg.y, msg.z, msg.block);
    } else if (t === 'block_batch') {
      if (this.onBlockBatch) this.onBlockBatch(msg.edits);
    } else if (t === 'player_list') {
      if (this.onPlayerList) this.onPlayerList(msg.players);
    } else if (t === 'player_join') {
      if (this.onPlayerJoin) this.onPlayerJoin(msg.name, msg.role, msg.skinIndex);
    } else if (t === 'player_leave') {
      if (this.onPlayerLeave) this.onPlayerLeave(msg.name);
    } else if (t === 'player_damage') {
      if (this.onPlayerDamage) this.onPlayerDamage(msg.from, msg.damage);
    } else if (t === 'armor') {
      if (this.onPlayerArmor) this.onPlayerArmor(msg.name, msg.armor);
    } else if (t === 'mob_spawn') {
      if (this.onMobSpawn) this.onMobSpawn(msg.id, msg.type, msg.x, msg.y, msg.z);
    } else if (t === 'mob_position') {
      if (this.onMobPosition) this.onMobPosition(msg.id, msg.x, msg.y, msg.z, msg.yaw);
    } else if (t === 'mob_damage') {
      if (this.onMobDamage) this.onMobDamage(msg.id, msg.hp);
    } else if (t === 'mob_death') {
      if (this.onMobDeath) this.onMobDeath(msg.id);
    } else if (t === 'kick') {
      if (this.onKicked) this.onKicked(msg.reason);
    } else if (t === 'error') {
      if (this.onError) this.onError(msg.text);
    }
  }

  _handleBinaryMessage(buf, peerName) {
    try {
      const view = new DataView(buf);
      const type = view.getUint8(0);
      if (type === 0x02) {
        let off = 1;
        const nameLen = view.getUint8(off); off += 1;
        if (off + nameLen + 17 > buf.byteLength) return;
        const name = this._textDecoder.decode(new Uint8Array(buf, off, nameLen)); off += nameLen;
        const x = view.getFloat32(off); off += 4;
        const y = view.getFloat32(off); off += 4;
        const z = view.getFloat32(off); off += 4;
        const yaw = view.getFloat32(off); off += 4;
        const flags = view.getUint8(off);

        if (this.isHost) {
          // Area of Interest: only relay to peers within 96 blocks
          var _pos = this._playerPositions || (this._playerPositions = {});
          _pos[peerName] = { x: x, y: y, z: z };
          this._broadcastExceptFiltered(peerName, buf, x, y, z);
          if (this.onPlayerPosition) this.onPlayerPosition(name, x, y, z, yaw, flags, null);
        } else {
          if (this.onPlayerPosition) this.onPlayerPosition(name, x, y, z, yaw, flags, null);
        }
      } else if (type === 0x03) {
        let off = 1;
        const nameLen = view.getUint8(off); off += 1;
        if (off + nameLen + 1 > buf.byteLength) return;
        const name = this._textDecoder.decode(new Uint8Array(buf, off, nameLen)); off += nameLen;
        const armorLen = view.getUint8(off); off += 1;
        if (off + armorLen > buf.byteLength) return;
        const armor = armorLen > 0 ? this._textDecoder.decode(new Uint8Array(buf, off, armorLen)) : null;
        if (this.isHost) this._broadcastExcept(peerName, { _t: 'armor', name, armor });
        if (this.onPlayerArmor) this.onPlayerArmor(name, armor);
      }
    } catch (_) {}
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  Public API
  // ═══════════════════════════════════════════════════════════════════════

  connect() { console.log('[P2P] Use createRoomOnP2P() or joinRoomByCode()'); }

  disconnect() {
    this.connected = false;
    this.roomName = null;
    if (this._pc) { try { this._pc.close(); } catch (e) {} this._pc = null; }
    if (this._dc) { try { this._dc.close(); } catch (e) {} this._dc = null; }
    if (this._hostDC) { try { this._hostDC.close(); } catch (e) {} this._hostDC = null; }
    this._peers.forEach((p) => { try { p.pc.close(); } catch (e) {} });
    this._peers.clear();
    this._pendingOffers.forEach((p) => { try { p.pc.close(); } catch (e) {} });
    this._pendingOffers.clear();
  }

  leaveRoom() { this.disconnect(); }
  isInRoom() { return this.connected && this.roomName !== null; }
  onConnectedOnce(cb) { if (this.connected) { cb(); return; } this._connectedCallbacks.push(cb); }
  getPlayerCount() { return this._peers.size + (this.isHost ? 1 : 0); }
  getMaxPlayers() { return this._maxPlayers; }

  // ═══════════════════════════════════════════════════════════════════════
  //  Send methods
  // ═══════════════════════════════════════════════════════════════════════

  _encodePos(name, x, y, z, yaw, flags) {
    const nb = this._textEncoder.encodeInto(name, new Uint8Array(this._posBuf, 2));
    const nl = nb.written || name.length;
    const v = this._posView;
    let o = 0;
    v.setUint8(o, 0x02); o += 1;
    v.setUint8(o, nl); o += 1;
    o += nl;
    v.setFloat32(o, x); o += 4;
    v.setFloat32(o, y); o += 4;
    v.setFloat32(o, z); o += 4;
    v.setFloat32(o, yaw); o += 4;
    v.setUint8(o, (typeof flags === 'number' ? flags : (flags ? 1 : 0)) & 0x0F);
    return new Uint8Array(this._posBuf, 0, o + 1);
  }

  sendPosition(x, y, z, yaw, flags) {
    if (!this.connected) return;
    const data = this._encodePos(this.playerName, x, y, z, yaw, flags);
    if (this.isHost) this._broadcastRaw(data);
    else this._sendToHostRaw(data);
  }

  // Block update batching
  _blockBatch = [];
  sendBlockUpdate(x, y, z, block) {
    this._blockBatch.push({ x: x | 0, y: y | 0, z: z | 0, block: block | 0 });
  }
  flushBlockBatch() {
    if (!this._blockBatch.length) return;
    var msg;
    if (this._blockBatch.length === 1) {
      var b = this._blockBatch[0];
      msg = { _t: 'block_update', x: b.x, y: b.y, z: b.z, block: b.block };
    } else {
      msg = { _t: 'block_batch', edits: this._blockBatch };
    }
    if (this.isHost) this._broadcast(msg);
    else this._sendToHost(msg);
    this._blockBatch = [];
  }

  sendChestUpdate(x, y, z, slots) {
    const msg = { _t: 'chest_update', x: x | 0, y: y | 0, z: z | 0, slots: slots ? slots.map(s => s ? { item: s.item, count: s.count, ...(s.durability != null ? { durability: s.durability } : {}) } : null) : [] };
    if (this.isHost) this._broadcast(msg);
    else this._sendToHost(msg);
  }

  sendChat(text) {
    const msg = { _t: 'chat', text };
    if (this.isHost) {
      this._broadcast(msg);
      if (this.onChat) this.onChat(this.playerName, 'player', text);
    } else {
      this._sendToHost(msg);
    }
  }

  sendCommand(text) {
    if (this.onChat) this.onChat('P2P', 'server', 'Commands unavailable in P2P mode.');
  }

  sendArmor(armor) {
    const msg = { _t: 'armor_update', armor: armor || null };
    if (this.isHost) this._broadcast(msg);
    else this._sendToHost(msg);
  }

  sendBedSpawn(x, y, z) {
    const msg = { _t: 'bed_spawn_point', x, y, z };
    if (this.isHost) this._broadcast(msg);
    else this._sendToHost(msg);
  }

  sendMobSpawn(id, type, x, y, z) { const m = { _t: 'mob_spawn', id, type, x, y, z }; this.isHost ? this._broadcast(m) : this._sendToHost(m); }
  sendMobPosition(id, x, y, z, yaw) { const m = { _t: 'mob_position', id, x, y, z, yaw }; this.isHost ? this._broadcast(m) : this._sendToHost(m); }
  sendMobDamage(id, hp) { const m = { _t: 'mob_damage', id, hp }; this.isHost ? this._broadcast(m) : this._sendToHost(m); }
  sendMobDeath(id) { const m = { _t: 'mob_death', id }; this.isHost ? this._broadcast(m) : this._sendToHost(m); }

  // No-op stubs for server-only features
  sendAuth() {} sendIdentityAuth() {} linkIdentity() {} startOAuthLink() {}
  getOwnAccount() {} linkAccount() {} unlinkIdentity() {}
  friendList() {} friendRequest() {} friendAccept() {} friendDecline() {} friendRemove() {}
  sendDm() {} sendDmRead() {} sendDmSyncPush() {}
  registerRoom() {} listRooms() { if (this.onRoomList) this.onRoomList([]); }
  createRoom() {} joinRoom() {}
  devListAccounts() {} devGetAccount() {} devSetTag() {} devSetRole() {}
  devDeleteAccount() {} devGetStats() {} devTimedBan() {} devUnban() {} devGlobalBans() {}

  // ═══════════════════════════════════════════════════════════════════════
  //  Internal helpers
  // ═══════════════════════════════════════════════════════════════════════

  _sendToHost(msg) {
    const dc = this._hostDC;
    if (dc && dc.readyState === 'open') dc.send(JSON.stringify(msg));
  }

  _sendToHostRaw(data) {
    const dc = this._hostDC;
    if (dc && dc.readyState === 'open') dc.send(data);
  }

  _broadcast(msg) {
    const data = JSON.stringify(msg);
    this._peers.forEach((p) => { if (p.dc && p.dc.readyState === 'open') p.dc.send(data); });
  }

  _broadcastRaw(data) {
    this._peers.forEach((p) => { if (p.dc && p.dc.readyState === 'open') p.dc.send(data); });
  }

  _broadcastExcept(exclude, msg) {
    const data = JSON.stringify(msg);
    this._peers.forEach((p, n) => { if (n !== exclude && p.dc && p.dc.readyState === 'open') p.dc.send(data); });
  }

  _broadcastExceptRaw(exclude, data) {
    this._peers.forEach((p, n) => { if (n !== exclude && p.dc && p.dc.readyState === 'open') p.dc.send(data); });
  }

  // Area of Interest: only relay position to peers within 96 blocks
  _broadcastExceptFiltered(exclude, data, srcX, srcY, srcZ) {
    var self = this;
    var _MAX_DIST2 = 96 * 96;
    this._peers.forEach(function(p, n) {
      if (n === exclude || !p.dc || p.dc.readyState !== 'open') return;
      var theirPos = self._playerPositions && self._playerPositions[n];
      if (theirPos) {
        var dx = theirPos.x - srcX, dy = theirPos.y - srcY, dz = theirPos.z - srcZ;
        if (dx * dx + dy * dy + dz * dz > _MAX_DIST2) return;
      }
      p.dc.send(data);
    });
  }

  _sendToPeer(name, msg) {
    const p = this._peers.get(name);
    if (p && p.dc && p.dc.readyState === 'open') p.dc.send(JSON.stringify(msg));
  }

  _broadcastPlayerList() {
    this._broadcast({ _t: 'player_list', players: this._getplayerList() });
  }

  getPeers() { return this._peers; }
  getRoomCode() { return this._roomCode; }
}

export const p2pNetwork = new P2PNetwork();

// ═══════════════════════════════════════════════════════════════════════════
//  Firebase Room Directory — replaces server room listing (offloads Render)
// ═══════════════════════════════════════════════════════════════════════════

export class P2PDirectory {
  constructor() {
    this._db = null;
    this._roomsRef = null;
    this._myRoomRef = null;
    this._listeners = [];
  }

  _getDB() {
    if (this._db) return this._db;
    if (!window.FIREBASE_CONFIG || !window.FIREBASE_CONFIG.apiKey) return null;
    if (typeof firebase === 'undefined') return null;
    if (!firebase.apps.length) firebase.initializeApp(window.FIREBASE_CONFIG);
    this._db = firebase.database();
    this._roomsRef = this._db.ref('p2p_rooms');
    return this._db;
  }

  // Host: register a room in the directory
  registerRoom(hostName, seed, gameMode, maxPlayers, playerCount) {
    const db = this._getDB();
    if (!db) return;
    const roomData = {
      host: hostName,
      seed: seed || 42,
      gameMode: gameMode || 'survival',
      maxPlayers: maxPlayers || MAX_PLAYERS,
      playerCount: playerCount || 1,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    };
    this._myRoomRef = this._roomsRef.child(hostName);
    this._myRoomRef.set(roomData);
    // Auto-remove on disconnect
    this._myRoomRef.onDisconnect().remove();
    // Heartbeat every 30s
    this._heartbeat = setInterval(() => {
      if (this._myRoomRef) this._myRoomRef.child('timestamp').set(firebase.database.ServerValue.TIMESTAMP);
    }, 30000);
  }

  // Host: update player count
  updatePlayerCount(count) {
    if (this._myRoomRef) this._myRoomRef.child('playerCount').set(count);
  }

  // Host: remove room from directory
  unregisterRoom() {
    if (this._heartbeat) { clearInterval(this._heartbeat); this._heartbeat = null; }
    if (this._myRoomRef) { this._myRoomRef.remove(); this._myRoomRef = null; }
  }

  // Joiner: list available rooms (returns promise of room array)
  listRooms() {
    return new Promise((resolve) => {
      const db = this._getDB();
      if (!db) { resolve([]); return; }
      // Only show rooms from the last 60 seconds
      const cutoff = Date.now() - 60000;
      this._roomsRef.orderByChild('timestamp').startAt(cutoff).once('value', (snap) => {
        const rooms = [];
        snap.forEach((child) => {
          const r = child.val();
          if (r && r.host) rooms.push(r);
        });
        resolve(rooms);
      }).catch(() => resolve([]));
    });
  }

  // Joiner: watch for room changes in real-time
  onRoomsChanged(callback) {
    const db = this._getDB();
    if (!db) return;
    const listener = this._roomsRef.on('value', (snap) => {
      const rooms = [];
      snap.forEach((child) => {
        const r = child.val();
        if (r && r.host) rooms.push(r);
      });
      callback(rooms);
    });
    this._listeners.push(listener);
  }

  // Stop watching
  stopListening() {
    if (this._roomsRef) this._roomsRef.off();
    this._listeners = [];
  }

  destroy() {
    this.unregisterRoom();
    this.stopListening();
    this._db = null;
  }
}

export const p2pDirectory = new P2PDirectory();

// ═══════════════════════════════════════════════════════════════════════════
//  Firebase Voice Signaling — replaces WS relay for voice chat (offloads Render)
// ═══════════════════════════════════════════════════════════════════════════

export class P2PVoiceSignaling {
  constructor() {
    this._db = null;
    this._channelRef = null;
    this._listeners = [];
  }

  _getDB() {
    if (this._db) return this._db;
    if (!window.FIREBASE_CONFIG || !window.FIREBASE_CONFIG.apiKey) return null;
    if (typeof firebase === 'undefined') return null;
    if (!firebase.apps.length) firebase.initializeApp(window.FIREBASE_CONFIG);
    this._db = firebase.database();
    return this._db;
  }

  // Send a voice signaling message (SDP offer/answer/ICE) to a specific peer
  sendSignal(roomName, fromName, toName, type, data) {
    const db = this._getDB();
    if (!db) return;
    const signalRef = db.ref('voice_signals').child(roomName).child(toName).push();
    signalRef.set({ from: fromName, type, data, timestamp: firebase.database.ServerValue.TIMESTAMP });
    // Auto-cleanup after 30s
    signalRef.onDisconnect().remove();
    setTimeout(() => signalRef.remove(), 30000);
  }

  // Listen for incoming voice signals
  onSignal(roomName, myName, callback) {
    const db = this._getDB();
    if (!db) return;
    const ref = db.ref('voice_signals').child(roomName).child(myName);
    const listener = ref.on('child_added', (snap) => {
      const val = snap.val();
      if (val) callback(val.from, val.type, val.data);
      snap.ref.remove(); // consume the signal
    });
    this._listeners.push(listener);
  }

  // Cleanup
  clearSignals(roomName, myName) {
    const db = this._getDB();
    if (db) db.ref('voice_signals').child(roomName).child(myName).remove();
    this._listeners = [];
  }

  destroy() {
    this._listeners = [];
    this._db = null;
  }
}

export const p2pVoiceSignaling = new P2PVoiceSignaling();
