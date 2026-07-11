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

    this._reconnectTimer = null;
    this._reconnectDelay = 1000;
    this._intentionalClose = false;
    this._lastJoinInfo = null; // stored for auto-rejoin after reconnect
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
      this._reconnectDelay = 1000;
      console.log('[Net] Connected to', url);
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
      if (this.onConnected) { const cb = this.onConnected; this.onConnected = null; cb(); }
    };

    this.ws.onmessage = (event) => {
      let msg;
      try { msg = JSON.parse(event.data); } catch { return; }
      this._handleMessage(msg);
    };

    this.ws.onclose = () => {
      const wasConnected = this.connected;
      this.connected = false;
      this.ws = null;
      console.log('[Net] Disconnected');

      if (wasConnected && !this._intentionalClose) {
        if (this.onDisconnect) this.onDisconnect();
        this._scheduleReconnect();
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
  }

  _scheduleReconnect() {
    if (this._intentionalClose || !this.serverUrl) return;
    this._reconnectTimer = setTimeout(() => {
      console.log('[Net] Reconnecting...');
      this.connect(this.serverUrl);
    }, this._reconnectDelay);
    this._reconnectDelay = Math.min(this._reconnectDelay * 1.5, 10000);
  }

  _send(msg) {
    if (this.ws && this.ws.readyState === 1) {
      this.ws.send(JSON.stringify(msg));
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
    }
  }

  // ── Public API ──────────────────────────────────────────────────────

  createRoom(name, seed, gameMode, maxPlayers, playerName, cgUsername, skinIndex, ownerSecret, password) {
    this._lastJoinInfo = { isNew: true, room: name, seed, gameMode, maxPlayers, playerName, cgUsername, skinIndex, ownerSecret, password };
    this._send({
      type: 'create_room',
      name, seed, gameMode, maxPlayers, playerName, cgUsername, skinIndex, ownerSecret, password
    });
  }

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

  isInRoom() {
    return this.connected && this.roomName !== null;
  }
}

// Singleton
export const network = new Network();
