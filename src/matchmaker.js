// Matchmaker — Firebase Realtime Database for auto-connect + matchmaking.
//
// How it works:
//   1. Player clicks "Find Match" → enters matchmaking queue
//   2. Firebase watches the queue — when 2 players are waiting, it pairs them
//   3. One becomes host, one becomes joiner
//   4. Firebase relays SDP offer/answer between them (signaling)
//   5. WebRTC connection established — game data flows P2P
//
// Firebase Realtime Database structure:
//   /matchmaking/queue/     — list of players waiting for a match
//   /matchmaking/rooms/{id} — active room with offer/answer exchange
//   /matchmaking/games/{id} — game state for reconnect

import { p2pNetwork } from './p2p-network.js';

const ICE_SERVERS = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
  { urls: 'stun:stun2.l.google.com:19302' },
  { urls: 'stun:stun3.l.google.com:19302' },
  { urls: 'stun:stun4.l.google.com:19302' },
];

function b64(o) { try { return btoa(JSON.stringify(o)); } catch (e) { return ''; } }
function unb64(s) { try { return JSON.parse(atob(s)); } catch (e) { return null; } }

function waitICE(pc) {
  return new Promise((resolve) => {
    if (pc.iceGatheringState === 'complete') { resolve(); return; }
    pc.onicegatheringstatechange = () => {
      if (pc.iceGatheringState === 'complete') resolve();
    };
    setTimeout(resolve, 3000);
  });
}

// Firebase SDK (loaded dynamically)
let _fb = null;  // firebase app
let _fbDB = null; // firebase database
let _fbReady = false;

export class Matchmaker {
  constructor() {
    this._queueRef = null;
    this._roomRef = null;
    this._matched = false;
    this._gameType = null; // 'chess' or 'base'
    this._onMatch = null;
    this._onError = null;
    this._cleanup = [];
  }

  // Initialize Firebase — call once on page load
  async init() {
    if (_fbReady) return true;
    const cfg = window.FIREBASE_CONFIG;
    if (!cfg || !cfg.apiKey || cfg.apiKey === 'YOUR_API_KEY') {
      console.warn('[Matchmaker] Firebase not configured — matchmaking disabled');
      return false;
    }

    try {
      // Load Firebase SDK from CDN
      await this._loadScript('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
      await this._loadScript('https://www.gstatic.com/firebasejs/10.12.0/firebase-database-compat.js');

      _fb = firebase.initializeApp(cfg);
      _fbDB = firebase.database();
      _fbReady = true;
      console.log('[Matchmaker] Firebase connected');
      return true;
    } catch (e) {
      console.error('[Matchmaker] Firebase init failed:', e);
      return false;
    }
  }

  _loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error('Failed to load: ' + src));
      document.head.appendChild(s);
    });
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  MATCHMAKING — find a random opponent
  // ═══════════════════════════════════════════════════════════════════════

  // Find a match for the given game type
  // Returns a promise that resolves with { roomId, isHost, opponentName, seed, gameMode }
  findMatch(gameType, playerName, opts = {}) {
    return new Promise(async (resolve, reject) => {
      if (!await this.init()) {
        reject(new Error('Firebase not configured. Ask the admin to set up matchmaking.'));
        return;
      }

      this._gameType = gameType;
      this._matched = false;
      this._onMatch = resolve;
      this._onError = reject;

      const seed = opts.seed || Math.floor(Math.random() * 999999) + 1;
      const gameMode = opts.gameMode || 'survival';

      // Join the queue
      const queueRef = _fbDB.ref('matchmaking/queue');
      const playerRef = queueRef.push();
      const playerId = playerRef.key;

      const playerData = {
        name: playerName,
        gameType: gameType,
        seed: seed,
        gameMode: gameMode,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        status: 'waiting',
      };

      this._queueRef = playerRef;
      this._cleanup.push(() => playerRef.remove());

      // Set presence — remove from queue on disconnect
      const onDisconnectRef = playerRef.onDisconnect();
      onDisconnectRef.remove();
      this._cleanup.push(() => onDisconnectRef.cancel());

      await playerRef.set(playerData);
      console.log('[Matchmaker] Joined queue as', playerId);

      // Watch for matches
      const roomRef = _fbDB.ref('matchmaking/rooms');
      this._roomRef = roomRef;

      // Listen for rooms where we are the joiner
      const joinerListener = roomRef.on('child_added', async (snap) => {
        if (this._matched) return;
        const room = snap.val();
        if (!room || room.joinerName !== playerName || room.status !== 'offer') return;

        console.log('[Matchmaker] Matched as joiner with', room.hostName);
        this._matched = true;
        this._cleanupRoom();

        // We're the joiner — receive the host's offer and create an answer
        try {
          const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
          p2pNetwork._pc = pc;
          p2pNetwork.isHost = false;
          p2pNetwork.playerName = playerName;

          pc.oniceconnectionstatechange = () => {
            const state = pc.iceConnectionState;
            if (state === 'failed' || state === 'disconnected' || state === 'closed') {
              p2pNetwork.connected = false;
              p2pNetwork.roomName = null;
              if (p2pNetwork.onDisconnect) p2pNetwork.onDisconnect();
            }
          };

          pc.ondatachannel = (e) => {
            const dc = e.channel;
            dc.binaryType = 'arraybuffer';
            p2pNetwork._hostDC = dc;
            p2pNetwork._setupDC(dc, 'host');

            dc.onopen = () => {
              console.log('[Matchmaker] Connected to host');
              p2pNetwork.connected = true;
              p2pNetwork.roomName = 'p2p_' + room.hostName;
              dc.send(JSON.stringify({ _t: 'handshake', name: playerName }));
              if (p2pNetwork.onConnected) { const cb = p2pNetwork.onConnected; p2pNetwork.onConnected = null; cb(); }
              while (p2pNetwork._connectedCallbacks.length) p2pNetwork._connectedCallbacks.shift()();
            };
            dc.onclose = () => {
              p2pNetwork.connected = false;
              p2pNetwork.roomName = null;
              if (p2pNetwork.onDisconnect) p2pNetwork.onDisconnect();
            };
          };

          // Set remote description (host's offer)
          await pc.setRemoteDescription({ type: 'offer', sdp: room.offerSdp });
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          await waitICE(pc);

          // Send answer back via Firebase
          await snap.ref.update({
            answerSdp: pc.localDescription.sdp,
            status: 'answer',
          });

          // Clean up queue
          playerRef.remove();

          resolve({
            roomId: snap.key,
            isHost: false,
            opponentName: room.hostName,
            seed: room.seed,
            gameMode: room.gameMode,
          });
        } catch (e) {
          console.error('[Matchmaker] Joiner error:', e);
          reject(e);
        }
      });

      this._cleanup.push(() => roomRef.off('child_added', joinerListener));

      // Watch for answers (if we're the host)
      const hostListener = roomRef.on('child_changed', async (snap) => {
        if (this._matched) return;
        const room = snap.val();
        if (!room || room.hostName !== playerName || room.status !== 'answer') return;

        console.log('[Matchmaker] Answer received from', room.joinerName);
        this._matched = true;

        // We're the host — set the remote description (joiner's answer)
        const peerObj = p2pNetwork._pendingOffers.get(room.joinerName);
        if (peerObj) {
          await peerObj.pc.setRemoteDescription({ type: 'answer', sdp: room.answerSdp });
        }

        // Clean up queue
        playerRef.remove();
        snap.ref.update({ status: 'connected' });

        resolve({
          roomId: snap.key,
          isHost: true,
          opponentName: room.joinerName,
          seed: room.seed,
          gameMode: room.gameMode,
        });
      });

      this._cleanup.push(() => roomRef.off('child_changed', hostListener));

      // Now try to find someone in the queue
      const queueListener = queueRef.orderByChild('status').equalTo('waiting').limitToFirst(2).once('value', async (snap) => {
        const players = [];
        snap.forEach((child) => {
          if (child.key !== playerId) {
            players.push({ id: child.key, ...child.val() });
          }
        });

        if (players.length === 0) {
          // No one waiting — we're the first in queue
          console.log('[Matchmaker] No match found — waiting in queue');
          // Update our status
          playerRef.update({ status: 'waiting' });

          // Start polling for new players (every 2s)
          this._pollInterval = setInterval(async () => {
            if (this._matched) { clearInterval(this._pollInterval); return; }
            const qSnap = await queueRef.orderByChild('status').equalTo('waiting').limitToFirst(2).once('value');
            const others = [];
            qSnap.forEach((child) => {
              if (child.key !== playerId) others.push({ id: child.key, ...child.val() });
            });
            if (others.length > 0 && !this._matched) {
              // Found someone! We become the host
              this._matched = true;
              clearInterval(this._pollInterval);
              await this._createHostRoom(playerRef, others[0], seed, gameMode, playerName, resolve, reject);
            }
          }, 2000);
          this._cleanup.push(() => { if (this._pollInterval) clearInterval(this._pollInterval); });
        } else {
          // Found a match! We become the host
          this._matched = true;
          await this._createHostRoom(playerRef, players[0], seed, gameMode, playerName, resolve, reject);
        }
      });
    });
  }

  async _createHostRoom(playerRef, opponent, seed, gameMode, playerName, resolve, reject) {
    try {
      const roomId = playerRef.key;
      const roomRef = _fbDB.ref('matchmaking/rooms/' + roomId);

      // Create RTCPeerConnection + offer
      const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
      const dc = pc.createDataChannel('game', { ordered: true, maxRetransmits: 2 });
      dc.binaryType = 'arraybuffer';

      const peerObj = { pc, dc, name: opponent.name, ready: false };
      p2pNetwork._pendingOffers.set(opponent.name, peerObj);
      p2pNetwork.isHost = true;
      p2pNetwork.playerName = playerName;
      p2pNetwork.roomName = 'p2p_' + playerName;

      p2pNetwork._setupDC(dc, opponent.name);

      dc.onopen = () => {
        console.log('[Matchmaker] Peer connected:', opponent.name);
        p2pNetwork._peers.set(opponent.name, peerObj);
        p2pNetwork._pendingOffers.delete(opponent.name);
        peerObj.ready = true;

        p2pNetwork._sendToPeer(opponent.name, {
          _t: 'joined',
          room: p2pNetwork.roomName,
          seed: seed,
          gameMode: gameMode,
          players: [playerName, opponent.name],
          role: 'player',
          maxPlayers: 16,
        });

        if (p2pNetwork.onPlayerJoin) p2pNetwork.onPlayerJoin(opponent.name, 'player', 0);
        p2pNetwork._broadcastPlayerList();
      };

      dc.onclose = () => {
        p2pNetwork._peers.delete(opponent.name);
        p2pNetwork._pendingOffers.delete(opponent.name);
        if (p2pNetwork.onPlayerLeave) p2pNetwork.onPlayerLeave(opponent.name);
        p2pNetwork._broadcastPlayerList();
      };

      await pc.createOffer();
      await pc.setLocalDescription(pc.localDescription);
      await waitICE(pc);

      // Store offer in Firebase
      await roomRef.set({
        hostName: playerName,
        joinerName: opponent.name,
        offerSdp: pc.localDescription.sdp,
        seed: seed,
        gameMode: gameMode,
        status: 'offer',
        timestamp: firebase.database.ServerValue.TIMESTAMP,
      });

      // Also remove from queue
      playerRef.update({ status: 'matched' });

      console.log('[Matchmaker] Room created, waiting for answer from', opponent.name);
    } catch (e) {
      console.error('[Matchmaker] Host error:', e);
      reject(e);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  CLEANUP
  // ═══════════════════════════════════════════════════════════════════════

  cancel() {
    this._matched = false;
    this._cleanup.forEach((fn) => { try { fn(); } catch (e) {} });
    this._cleanup = [];
    if (this._pollInterval) { clearInterval(this._pollInterval); this._pollInterval = null; }
    this._cleanupRoom();
  }

  _cleanupRoom() {
    if (this._queueRef) { try { this._queueRef.remove(); } catch (e) {} this._queueRef = null; }
  }

  isAvailable() { return _fbReady; }
}

export const matchmaker = new Matchmaker();
