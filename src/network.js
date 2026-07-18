// Client-side WebSocket networking for real multiplayer.
// Connects to the BlockForge server, sends/receives player data, chat, and room state.

export class Network {
  constructor() {
    this.ws = null;
    this.connected = false;
    this.roomName = null;
    this.serverUrl = null;

    // Callbacks
    this.onConnected = null;       // () => {}
    this.onJoined = null;        // (room, seed, gameMode, players, role) => {}
    this.onPlayerJoin = null;    // (name, role, skinIndex) => {}
    this.onPlayerLeave = null;   // (name) => {}
    this.onPlayerPosition = null; // (name, x, y, z, yaw, crouching) => {}
    this.onChat = null;          // (name, role, text) => {}
    this.onRoomList = null;      // (rooms) => {}
    this.onError = null;         // (text) => {}
    this.onKicked = null;        // (reason) => {}
    this.onPlayerList = null;    // (players) => {}
    this.onGameMode = null;      // (gameMode) => {}
    this.onDisconnect = null;    // () => {}
    this.onPlayerDamage = null;  // (from, damage) => {}
    this.onAuthResult = null;    // (msg) => {}
    this.onBlockUpdate = null;   // (x, y, z, block) => {}
    this.onBlockBatch = null;    // (edits[]) => {}
    this.onFriendState = null;   // ({friends, incoming, outgoing}) => {}
    this.onFriendMsg = null;     // ({text, ok}) => {}
    this.onMobSpawn = null;      // (id, type, x, y, z) => {}
    this.onMobPosition = null;   // (id, x, y, z, yaw) => {}
    this.onMobDamage = null;     // (id, hp) => {}
    this.onMobDeath = null;      // (id) => {}

    this._reconnectTimer = null;
    this._reconnectDelay = 1000;
    this._intentionalClose = false;
    this._lastJoinInfo = null; // stored for auto-rejoin after reconnect
    this._queue = [];          // messages buffered while the socket is connecting
    this._connectedCallbacks = []; // queued callbacks for onConnected
  }

  // Connect to WebSocket server
  connect(url) {
    // Detach old ws handlers so its close doesn't interfere
    if (this.ws) {
      this.ws.onopen = null;
      this.ws.onclose = null;
      this.ws.onerror = null;
      this.ws.onmessage = null;
      this.ws.close();
      this.ws = null;
    }
    this.serverUrl = url;
    this._intentionalClose = false;

    try {
      this.ws = new WebSocket(url);
    } catch (e) {
      console.error('[Net] Failed to connect:', e);
      if (this.onError) this.onError('Failed to connect to server.');
      return;
    }

    this.ws.onopen = () => {
      this.connected = true;
      this._reconnectAttempts = 0;
      this._reconnectDelay = 1000;
      console.log('[Net] Connected to', url);
      // Keepalive ping every 25s to prevent Render free-tier sleep
      if (this._pingInterval) clearInterval(this._pingInterval);
      this._pingInterval = setInterval(() => {
        if (this.ws && this.ws.readyState === 1) this.ws.send(JSON.stringify({ type: 'ping' }));
      }, 25000);
      // Auto-rejoin room after reconnect
      if (this._lastJoinInfo && !this.roomName) {
        const j = this._lastJoinInfo;
        this._send({
          type: j.isNew ? 'create_room' : 'join',
          name: j.isNew ? j.room : undefined,
          room: j.room,
          seed: j.seed,
          gameMode: j.gameMode,
          maxPlayers: j.maxPlayers,
          playerName: j.playerName,
          cgUsername: j.cgUsername,
          skinIndex: j.skinIndex,
        });
      }
      // Flush any messages buffered while we were connecting/reconnecting.
      if (this._queue.length) {
        const pending = this._queue.splice(0);
        for (const m of pending) this._send(m);
      }
      // After an auto-rejoin, refresh friend state (onConnected only fires once).
      if (this._lastJoinInfo && this.roomName) this._send({ type: 'friend_list' });
      if (this.onConnected) { const cb = this.onConnected; this.onConnected = null; cb(); }
      // Fire any queued connected callbacks
      while (this._connectedCallbacks.length) {
        this._connectedCallbacks.shift()();
      }
    };

    this.ws.onmessage = (event) => {
      let msg;
      try { msg = JSON.parse(event.data); } catch { return; }
      this._handleMessage(msg);
    };

    this.ws.onclose = () => {
      const wasConnected = this.connected;
      const hadJoinInfo = !!this._lastJoinInfo;
      this.connected = false;
      this.ws = null;
      this.roomName = null;
      if (this._pingInterval) { clearInterval(this._pingInterval); this._pingInterval = null; }
      console.log('[Net] Disconnected');

      if (wasConnected && !this._intentionalClose) {
        // Try to reconnect if we were in a room
        if (hadJoinInfo && this.serverUrl) {
          console.log('[Net] Connection lost, attempting reconnect...');
          if (this.onError) this.onError('Connection lost. Reconnecting...');
          this._scheduleReconnect();
        } else {
          if (this.onDisconnect) this.onDisconnect();
        }
      }
    };

    this.ws.onerror = (e) => {
      console.error('[Net] WebSocket error:', e);
    };
  }

  disconnect() {
    this._intentionalClose = true;
    if (this._reconnectTimer) { clearTimeout(this._reconnectTimer); this._reconnectTimer = null; }
    if (this.ws) { this.ws.close(); this.ws = null; }
    this.connected = false;
    this.roomName = null;
    this._lastJoinInfo = null;
    this._reconnectDelay = 1000;
  }

  _scheduleReconnect() {
    if (this._intentionalClose || !this.serverUrl) return;
    this._reconnectAttempts = (this._reconnectAttempts || 0) + 1;
    if (this._reconnectAttempts > 5) {
      console.log('[Net] Reconnect failed after 5 attempts');
      this._reconnectAttempts = 0;
      this._lastJoinInfo = null;
      if (this.onDisconnect) this.onDisconnect();
      return;
    }
    const delay = Math.min(1000 * Math.pow(1.5, this._reconnectAttempts - 1), 10000);
    console.log(`[Net] Reconnecting in ${Math.round(delay / 1000)}s (attempt ${this._reconnectAttempts}/5)...`);
    this._reconnectTimer = setTimeout(() => {
      this.connect(this.serverUrl);
    }, delay);
  }

  _send(msg) {
    if (this.ws && this.ws.readyState === 1) {
      this.ws.send(JSON.stringify(msg));
      return;
    }
    // Not ready yet. Buffer everything except continuous position updates
    // (those become stale instantly, so dropping them is fine).
    if (msg.type !== 'position' && this._queue.length < 100) {
      this._queue.push(msg);
    }
  }

  _handleMessage(msg) {
    switch (msg.type) {
      case 'joined':
        this.roomName = msg.room;
        if (this.onJoined) this.onJoined(msg.room, msg.seed, msg.gameMode, msg.players, msg.role, msg.maxPlayers, msg.ownerName);
        break;
      case 'player_join':
        if (this.onPlayerJoin) this.onPlayerJoin(msg.name, msg.role, msg.skinIndex, msg.cgUsername);
        break;
      case 'player_leave':
        if (this.onPlayerLeave) this.onPlayerLeave(msg.name);
        break;
      case 'player_position':
        if (this.onPlayerPosition) this.onPlayerPosition(msg.name, msg.x, msg.y, msg.z, msg.yaw, msg.crouching, msg.armor);
        break;
      case 'chat':
        if (this.onChat) this.onChat(msg.name, msg.role, msg.text);
        break;
      case 'room_list':
        if (this.onRoomList) this.onRoomList(msg.rooms);
        break;
      case 'error':
        if (this.onError) this.onError(msg.text);
        break;
      case 'kicked':
        if (this.onKicked) this.onKicked(msg.reason);
        break;
      case 'player_list':
        if (this.onPlayerList) this.onPlayerList(msg.players);
        break;
      case 'gamemode':
        if (this.onGameMode) this.onGameMode(msg.gameMode);
        break;
      case 'player_damage':
        if (this.onPlayerDamage) this.onPlayerDamage(msg.from, msg.damage);
        break;
      case 'auth_result':
        if (this.onAuthResult) this.onAuthResult(msg);
        break;
      case 'block_update':
        if (this.onBlockUpdate) this.onBlockUpdate(msg.x, msg.y, msg.z, msg.block);
        break;
      case 'block_batch':
        if (this.onBlockBatch) this.onBlockBatch(msg.edits || []);
        break;
      case 'friend_state':
        if (this.onFriendState) this.onFriendState(msg);
        break;
      case 'friend_msg':
        if (this.onFriendMsg) this.onFriendMsg(msg);
        break;
      case 'mob_spawn':
        if (this.onMobSpawn) this.onMobSpawn(msg.id, msg.type, msg.x, msg.y, msg.z);
        break;
      case 'mob_position':
        if (this.onMobPosition) this.onMobPosition(msg.id, msg.x, msg.y, msg.z, msg.yaw);
        break;
      case 'mob_damage':
        if (this.onMobDamage) this.onMobDamage(msg.id, msg.hp);
        break;
      case 'mob_death':
        if (this.onMobDeath) this.onMobDeath(msg.id);
        break;
      // Dev panel messages
      case 'dev_account_list':
      case 'dev_account_detail':
      case 'dev_set_tag_result':
      case 'dev_set_role_result':
        if (this.onDevMessage) this.onDevMessage(msg);
        break;
    }
  }

  // ── Public API ──────────────────────────────────────────────────────

  createRoom(name, seed, gameMode, maxPlayers, playerName, cgUsername, skinIndex, ownerSecret, password, isPrivate) {
    this._lastJoinInfo = { isNew: true, room: name, seed, gameMode, maxPlayers, playerName, cgUsername, skinIndex, ownerSecret, password, isPrivate };
    this._send({
      type: 'create_room',
      name, seed, gameMode, maxPlayers, playerName, cgUsername, skinIndex, ownerSecret, password, isPrivate: !!isPrivate
    });
  }

  // ── Friends ─────────────────────────────────────────────────────────
  friendList() { this._send({ type: 'friend_list' }); }
  friendRequest(name) { this._send({ type: 'friend_request', name }); }
  friendAccept(name) { this._send({ type: 'friend_accept', name }); }
  friendDecline(name) { this._send({ type: 'friend_decline', name }); }
  friendRemove(name) { this._send({ type: 'friend_remove', name }); }

  registerRoom(name, seed, gameMode, maxPlayers, playerName, ownerSecret, password) {
    this._send({
      type: 'register_room',
      name, seed, gameMode, maxPlayers, playerName, ownerSecret, password
    });
  }

  joinRoom(roomName, playerName, cgUsername, skinIndex, ownerSecret, password) {
    this._lastJoinInfo = { isNew: false, room: roomName, playerName, cgUsername, skinIndex, ownerSecret, password };
    this._send({
      type: 'join',
      room: roomName, playerName, cgUsername, skinIndex, ownerSecret, password
    });
  }

  leaveRoom() {
    this._send({ type: 'leave' });
    this.roomName = null;
    this._lastJoinInfo = null;
  }

  sendAuth(playerName, password, mode) {
    this._send({ type: 'auth', playerName, password, mode });
  }

  sendBlockUpdate(x, y, z, block) {
    this._send({ type: 'block_update', x: x | 0, y: y | 0, z: z | 0, block: block | 0 });
  }

  listRooms() {
    this._send({ type: 'list_rooms' });
  }

  sendPosition(x, y, z, yaw, crouching, armor) {
    this._send({ type: 'position', x, y, z, yaw, crouching: !!crouching, armor: armor || null });
  }

  sendChat(text) {
    this._send({ type: 'chat', text });
  }

  sendCommand(text) {
    this._send({ type: 'command', text });
  }

  sendMobSpawn(id, type, x, y, z) {
    this._send({ type: 'mob_spawn', id, type, x, y, z });
  }

  sendMobPosition(id, x, y, z, yaw) {
    this._send({ type: 'mob_position', id, x, y, z, yaw });
  }

  sendMobDamage(id, hp) {
    this._send({ type: 'mob_damage', id, hp });
  }

  sendMobDeath(id) {
    this._send({ type: 'mob_death', id });
  }

  // ── Dev panel ────────────────────────────────────────────────────────
  devListAccounts() { this._send({ type: 'dev_list_accounts' }); }
  devGetAccount(target) { this._send({ type: 'dev_get_account', target }); }
  devSetTag(target, tag) { this._send({ type: 'dev_set_tag', target, tag }); }
  devSetRole(target, role) { this._send({ type: 'dev_set_role', target, role }); }
  devDeleteAccount(target) { this._send({ type: 'dev_delete_account', target }); }

  // Queue a callback for when connection completes — safe to call from multiple places
  onConnectedOnce(cb) {
    if (this.connected) { cb(); return; }
    this._connectedCallbacks.push(cb);
  }

  isInRoom() {
    return this.connected && this.roomName !== null;
  }
}

// Singleton
export const network = new Network();
