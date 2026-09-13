// P2P Network adapter — WebRTC data channels replace the WebSocket server.
// Host creates a room, joiners connect directly. No backend needed.
// Implements the same callback API as network.js so main.js can swap freely.

const ICE_SERVERS = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
  { urls: 'stun:stun2.l.google.com:19302' },
  { urls: 'stun:stun3.l.google.com:19302' },
  { urls: 'stun:stun4.l.google.com:19302' },
];

function encode(obj) {
  try { return btoa(JSON.stringify(obj)); } catch (e) { return ''; }
}
function decode(str) {
  try { return JSON.parse(atob(str)); } catch (e) { return null; }
}

export class P2PNetwork {
  constructor() {
    this.connected = false;
    this.roomName = null;
    this.isHost = false;
    this.playerName = '';

    // Text encoder/decoder (reuse across messages)
    this._textEncoder = new TextEncoder();
    this._textDecoder = new TextDecoder();
    // Pre-allocated position send buffer
    this._posBuf = new ArrayBuffer(1 + 1 + 32 + 16 + 1);
    this._posView = new DataView(this._posBuf);

    // WebRTC state
    this._pc = null;               // RTCPeerConnection (joiner) or map (host)
    this._peers = new Map();       // host: name -> { pc, dc }
    this._dc = null;               // joiner: data channel
    this._roomCode = null;

    // Callbacks (same interface as Network)
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

  // ── Host: create room and generate shareable code ──────────────────────
  createRoomOnP2P(playerName, seed, gameMode) {
    this.isHost = true;
    this.playerName = playerName;
    this.roomName = 'p2p_' + playerName;
    this._lastJoinInfo = { playerName, seed, gameMode };

    // We don't use a single RTCPeerConnection for host — each peer gets one.
    // Signal "ready" to let main.js know we're listening.
    console.log('[P2P] Hosting as', playerName, 'seed:', seed);

    if (this.onConnected) { const cb = this.onConnected; this.onConnected = null; cb(); }
    while (this._connectedCallbacks.length) this._connectedCallbacks.shift()();

    // Return the room code (host needs to share this)
    this._roomCode = this._generateRoomCode();
    return this._roomCode;
  }

  _generateRoomCode() {
    const data = {
      t: 'p2p',
      n: this.playerName,
      s: this._lastJoinInfo?.seed || 42,
      m: this._lastJoinInfo?.gameMode || 'survival',
    };
    return encode(data);
  }

  // ── Joiner: connect to host via room code ──────────────────────────────
  joinRoomByCode(code, playerName) {
    const data = decode(code);
    if (!data || data.t !== 'p2p') {
      if (this.onError) this.onError('Invalid room code.');
      return;
    }

    this.isHost = false;
    this.playerName = playerName;
    const hostName = data.n;
    const seed = data.s;
    const gameMode = data.m;

    console.log('[P2P] Joining', hostName, 'seed:', seed);

    const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
    this._pc = pc;

    pc.onicecandidate = (e) => {
      if (e.candidate && this._dc && this._dc.readyState === 'open') {
        this._dc.send(JSON.stringify({ _t: '_ice', c: e.candidate }));
      }
    };

    pc.oniceconnectionstatechange = () => {
      if (pc.iceConnectionState === 'failed' || pc.iceConnectionState === 'disconnected') {
        console.log('[P2P] Connection lost');
        this.connected = false;
        this.roomName = null;
        if (this.onDisconnect) this.onDisconnect();
      }
    };

    const dc = pc.createDataChannel('game', { ordered: true });
    this._dc = dc;
    dc.binaryType = 'arraybuffer';
    this._setupDC(dc, 'host');

    // Send a handshake with our name
    dc.onopen = () => {
      this.connected = true;
      this.roomName = 'p2p_' + hostName;
      dc.send(JSON.stringify({ _t: 'handshake', name: playerName }));

      // Trigger onConnected + onJoined like the server flow
      if (this.onConnected) { const cb = this.onConnected; this.onConnected = null; cb(); }
      while (this._connectedCallbacks.length) this._connectedCallbacks.shift()();

      // Simulate the server's "joined" message
      if (this.onJoined) {
        this.onJoined(
          'p2p_' + hostName,   // room
          seed,                 // seed
          gameMode,            // gameMode
          [hostName, playerName], // players
          'player'             // role
        );
      }
      if (this.onPlayerJoin) this.onPlayerJoin(hostName, 'player', 0);
    };

    // Create offer
    pc.createOffer().then((offer) => pc.setLocalDescription(offer)).then(() => {
      // Encode the offer for sharing — host will decode it
      const offerData = { s: pc.localDescription.sdp, n: playerName };
      const offerCode = encode(offerData);
      // Send offer to host via the room code's signal channel
      // In practice, this goes through the QR/copy-paste flow
      window._p2pOfferCode = offerCode;
      window._p2pOfferReady = true;
      console.log('[P2P] Offer ready. Share this code:', offerCode);
    }).catch((e) => console.error('[P2P] Offer error:', e));
  }

  // ── Host: accept an incoming joiner's offer ────────────────────────────
  _acceptOffer(offerCode, peerName) {
    const data = decode(offerCode);
    if (!data || !data.s) return null;

    const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        const peer = this._peers.get(peerName);
        if (peer && peer.dc && peer.dc.readyState === 'open') {
          peer.dc.send(JSON.stringify({ _t: '_ice', c: e.candidate }));
        }
      }
    };

    pc.oniceconnectionstatechange = () => {
      if (pc.iceConnectionState === 'failed' || pc.iceConnectionState === 'disconnected') {
        console.log('[P2P] Peer disconnected:', peerName);
        this._peers.delete(peerName);
        if (this.onPlayerLeave) this.onPlayerLeave(peerName);
        this._broadcastPlayerList();
      }
    };

    const dc = pc.createDataChannel('game', { ordered: true });
    dc.binaryType = 'arraybuffer';

    const peerObj = { pc, dc, name: peerName };
    this._peers.set(peerName, peerObj);
    this._setupDC(dc, peerName);

    pc.setRemoteDescription({ type: 'offer', sdp: data.s }).then(() => pc.createAnswer()).then((answer) => pc.setLocalDescription(answer)).then(() => {
      const answerCode = encode({ s: pc.localDescription.sdp });
      window._p2pAnswerCode = answerCode;
      window._p2pAnswerReady = true;

      dc.onopen = () => {
        console.log('[P2P] Peer connected:', peerName);
        // Send initial game state
        this._sendToPeer(peerName, {
          _t: 'joined',
          room: 'p2p_' + this.playerName,
          seed: this._lastJoinInfo?.seed || 42,
          gameMode: this._lastJoinInfo?.gameMode || 'survival',
          players: [this.playerName, ...this._peers.keys()],
          role: 'player'
        });
        // Notify others
        if (this.onPlayerJoin) this.onPlayerJoin(peerName, 'player', 0);
        this._broadcastPlayerList();
      };
    }).catch((e) => console.error('[P2P] Answer error:', e));

    return window._p2pAnswerReady ? window._p2pAnswerCode : null;
  }

  // ── Data channel handler ──────────────────────────────────────────────
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

    // ── Host receives messages from joiners ──
    if (this.isHost) {
      if (t === 'handshake') {
        console.log('[P2P] Handshake from', msg.name);
        if (this.onPlayerJoin) this.onPlayerJoin(msg.name, 'player', 0);
        this._broadcastPlayerList();
      } else if (t === 'position') {
        // Relay to all other peers
        this._broadcastExcept(peerName, msg);
        if (this.onPlayerPosition) this.onPlayerPosition(peerName, msg.x, msg.y, msg.z, msg.y, msg.cr, null);
      } else if (t === 'block_update') {
        this._broadcastExcept(peerName, msg);
        if (this.onBlockUpdate) this.onBlockUpdate(msg.x, msg.y, msg.z, msg.block);
      } else if (t === 'chat') {
        this._broadcastExcept(peerName, { _t: 'chat', name: peerName, text: msg.text, role: 'player' });
        if (this.onChat) this.onChat(peerName, 'player', msg.text);
      } else if (t === 'chest_update') {
        this._broadcastExcept(peerName, msg);
      } else if (t === 'mob_spawn' || t === 'mob_position' || t === 'mob_damage' || t === 'mob_death') {
        this._broadcastExcept(peerName, msg);
      } else if (t === 'armor_update') {
        this._broadcastExcept(peerName, { _t: 'armor', name: peerName, armor: msg.armor });
      } else if (t === 'bed_spawn_point') {
        this._broadcastExcept(peerName, msg);
      } else if (t === 'player_damage') {
        // PvP damage — relay to target
        const target = this._peers.get(msg.target);
        if (target && target.dc && target.dc.readyState === 'open') {
          target.dc.send(JSON.stringify({ _t: 'player_damage', from: peerName, damage: msg.damage }));
        }
      }
      return;
    }

    // ── Joiner receives messages from host ──
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
    } else if (t === 'chest_update') {
      if (this.onBlockUpdate) this.onBlockUpdate(msg.x, msg.y, msg.z, msg.block);
    } else if (t === 'kick') {
      if (this.onKicked) this.onKicked(msg.reason);
    } else if (t === 'error') {
      if (this.onError) this.onError(msg.text);
    }
  }

  _handleBinaryMessage(buf, peerName) {
    const view = new DataView(buf);
    const type = view.getUint8(0);
    if (type === 0x02) {
      // Position update
      let off = 1;
      const nameLen = view.getUint8(off); off += 1;
      const name = this._textDecoder.decode(new Uint8Array(buf, off, nameLen)); off += nameLen;
      const x = view.getFloat32(off); off += 4;
      const y = view.getFloat32(off); off += 4;
      const z = view.getFloat32(off); off += 4;
      const yaw = view.getFloat32(off); off += 4;
      const crouching = view.getUint8(off) === 1;

      if (this.isHost) {
        // Relay to all other peers
        this._broadcastExceptRaw(peerName, buf);
        if (this.onPlayerPosition) this.onPlayerPosition(name, x, y, z, yaw, crouching, null);
      } else {
        if (this.onPlayerPosition) this.onPlayerPosition(name, x, y, z, yaw, crouching, null);
      }
    } else if (type === 0x03) {
      // Armor sync
      let off = 1;
      const nameLen = view.getUint8(off); off += 1;
      const name = this._textDecoder.decode(new Uint8Array(buf, off, nameLen)); off += nameLen;
      const armorLen = view.getUint8(off); off += 1;
      const armor = armorLen > 0 ? this._textDecoder.decode(new Uint8Array(buf, off, armorLen)) : null;
      if (this.isHost) {
        this._broadcastExcept(peerName, { _t: 'armor', name, armor });
      }
      if (this.onPlayerArmor) this.onPlayerArmor(name, armor);
    }
  }

  // ── Public API (mirrors Network) ──────────────────────────────────────

  connect() {
    // No-op for P2P — connection is established via createRoomOnP2P / joinRoomByCode
    console.log('[P2P] connect() called — use createRoomOnP2P() or joinRoomByCode() instead');
  }

  disconnect() {
    this.connected = false;
    this.roomName = null;
    if (this._pc) { try { this._pc.close(); } catch (e) {} this._pc = null; }
    if (this._dc) { try { this._dc.close(); } catch (e) {} this._dc = null; }
    this._peers.forEach((p) => { try { p.pc.close(); } catch (e) {} });
    this._peers.clear();
  }

  leaveRoom() {
    this.disconnect();
  }

  isInRoom() {
    return this.connected && this.roomName !== null;
  }

  onConnectedOnce(cb) {
    if (this.connected) { cb(); return; }
    this._connectedCallbacks.push(cb);
  }

  // ── Send methods ──────────────────────────────────────────────────────

  sendPosition(x, y, z, yaw, crouching) {
    if (!this.connected) return;
    const pname = this.playerName;
    const nameBytes = this._textEncoder.encodeInto(pname, new Uint8Array(this._posBuf, 2));
    const nameLen = nameBytes.written || pname.length;
    const buf = this._posBuf;
    const view = this._posView;
    let off = 0;
    view.setUint8(off, 0x02); off += 1;
    view.setUint8(off, nameLen); off += 1;
    off += nameLen;
    view.setFloat32(off, x); off += 4;
    view.setFloat32(off, y); off += 4;
    view.setFloat32(off, z); off += 4;
    view.setFloat32(off, yaw); off += 4;
    view.setUint8(off, crouching ? 1 : 0);
    const data = new Uint8Array(buf, 0, off + 1);

    if (this.isHost) {
      this._broadcastRaw(data);
    } else if (this._dc && this._dc.readyState === 'open') {
      this._dc.send(data);
    }
  }

  sendBlockUpdate(x, y, z, block) {
    const msg = { _t: 'block_update', x: x | 0, y: y | 0, z: z | 0, block: block | 0 };
    if (this.isHost) {
      this._broadcast(msg);
    } else if (this._dc && this._dc.readyState === 'open') {
      this._dc.send(JSON.stringify(msg));
    }
  }

  sendChestUpdate(x, y, z, slots) {
    const msg = { _t: 'chest_update', x: x | 0, y: y | 0, z: z | 0, slots: slots ? slots.map(s => s ? { item: s.item, count: s.count, ...(s.durability != null ? { durability: s.durability } : {}) } : null) : [] };
    if (this.isHost) {
      this._broadcast(msg);
    } else if (this._dc && this._dc.readyState === 'open') {
      this._dc.send(JSON.stringify(msg));
    }
  }

  sendChat(text) {
    const msg = { _t: 'chat', text };
    if (this.isHost) {
      this._broadcast(msg);
    } else if (this._dc && this._dc.readyState === 'open') {
      this._dc.send(JSON.stringify(msg));
    }
  }

  sendCommand(text) {
    // Commands are local-only in P2P mode (no server to process them)
    if (this.onChat) this.onChat('P2P', 'server', 'Commands are not available in P2P mode.');
  }

  sendArmor(armor) {
    const msg = { _t: 'armor_update', armor: armor || null };
    if (this.isHost) {
      this._broadcast(msg);
    } else if (this._dc && this._dc.readyState === 'open') {
      this._dc.send(JSON.stringify(msg));
    }
  }

  sendBedSpawn(x, y, z) {
    const msg = { _t: 'bed_spawn_point', x, y, z };
    if (this.isHost) {
      this._broadcast(msg);
    } else if (this._dc && this._dc.readyState === 'open') {
      this._dc.send(JSON.stringify(msg));
    }
  }

  sendMobSpawn(id, type, x, y, z) {
    const msg = { _t: 'mob_spawn', id, type, x, y, z };
    if (this.isHost) {
      this._broadcast(msg);
    } else if (this._dc && this._dc.readyState === 'open') {
      this._dc.send(JSON.stringify(msg));
    }
  }

  sendMobPosition(id, x, y, z, yaw) {
    const msg = { _t: 'mob_position', id, x, y, z, yaw };
    if (this.isHost) {
      this._broadcast(msg);
    } else if (this._dc && this._dc.readyState === 'open') {
      this._dc.send(JSON.stringify(msg));
    }
  }

  sendMobDamage(id, hp) {
    const msg = { _t: 'mob_damage', id, hp };
    if (this.isHost) {
      this._broadcast(msg);
    } else if (this._dc && this._dc.readyState === 'open') {
      this._dc.send(JSON.stringify(msg));
    }
  }

  sendMobDeath(id) {
    const msg = { _t: 'mob_death', id };
    if (this.isHost) {
      this._broadcast(msg);
    } else if (this._dc && this._dc.readyState === 'open') {
      this._dc.send(JSON.stringify(msg));
    }
  }

  // No-op stubs for server-only features
  sendAuth() {}
  sendIdentityAuth() {}
  linkIdentity() {}
  startOAuthLink() {}
  getOwnAccount() {}
  linkAccount() {}
  unlinkIdentity() {}
  friendList() {}
  friendRequest() {}
  friendAccept() {}
  friendDecline() {}
  friendRemove() {}
  sendDm() {}
  sendDmRead() {}
  sendDmSyncPush() {}
  registerRoom() {}
  listRooms() { if (this.onRoomList) this.onRoomList([]); }
  createRoom() {}
  joinRoom() {}
  devListAccounts() {}
  devGetAccount() {}
  devSetTag() {}
  devSetRole() {}
  devDeleteAccount() {}
  devGetStats() {}
  devTimedBan() {}
  devUnban() {}
  devGlobalBans() {}

  // ── Host helpers ──────────────────────────────────────────────────────

  _broadcast(msg) {
    const data = JSON.stringify(msg);
    this._peers.forEach((peer) => {
      if (peer.dc && peer.dc.readyState === 'open') peer.dc.send(data);
    });
  }

  _broadcastRaw(data) {
    this._peers.forEach((peer) => {
      if (peer.dc && peer.dc.readyState === 'open') peer.dc.send(data);
    });
  }

  _broadcastExcept(excludeName, msg) {
    const data = JSON.stringify(msg);
    this._peers.forEach((peer, name) => {
      if (name !== excludeName && peer.dc && peer.dc.readyState === 'open') peer.dc.send(data);
    });
  }

  _broadcastExceptRaw(excludeName, data) {
    this._peers.forEach((peer, name) => {
      if (name !== excludeName && peer.dc && peer.dc.readyState === 'open') peer.dc.send(data);
    });
  }

  _sendToPeer(peerName, msg) {
    const peer = this._peers.get(peerName);
    if (peer && peer.dc && peer.dc.readyState === 'open') {
      peer.dc.send(JSON.stringify(msg));
    }
  }

  _broadcastPlayerList() {
    const players = [this.playerName];
    this._peers.forEach((_, name) => players.push(name));
    this._broadcast({ _t: 'player_list', players });
  }

  getPeers() { return this._peers; }
  getRoomCode() { return this._roomCode; }
}

// Singleton
export const p2pNetwork = new P2PNetwork();
