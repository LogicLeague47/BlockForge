// Voice chat via WebRTC peer-to-peer audio.
// Uses the game's existing WebSocket for signaling (SDP + ICE).

const STATES = { OFF: 0, ON_MUTED: 1, ON_UNMUTED: 2 };

export class VoiceChat {
  constructor(network, username) {
    this.network = network;
    this.username = username || 'Player';
    this.state = STATES.OFF;
    this.localStream = null;
    this.peers = new Map(); // username → RTCPeerConnection
    this._iceBuffer = new Map(); // username → pending ICE candidates
    // Settings panel state
    this._panelOpen = false;
    // HUD indicator
    this._hud = null;
    this._panel = null;

    this._setupHandlers();
    this._createHUD();
    this._createPanel();
  }

  get enabled() { return this.state !== STATES.OFF; }
  get muted() { return this.state === STATES.ON_MUTED; }

  // Show/hide the voice settings panel
  togglePanel() {
    this._panelOpen = !this._panelOpen;
    this._panel.style.display = this._panelOpen ? 'flex' : 'none';
    this._renderPanel();
  }

  setState(newState) {
    const prev = this.state;
    this.state = newState;
    if (newState === STATES.OFF) {
      this._disable();
    } else {
      this._enable(newState === STATES.ON_MUTED);
    }
    this._updateHUD();
    if (this._panelOpen) this._renderPanel();
  }

  async _enable(muted) {
    if (!this.localStream) {
      try {
        this.localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (e) {
        console.error('[Voice] Microphone denied:', e.message);
        this.state = STATES.OFF;
        this._updateHUD();
        if (this._panelOpen) this._renderPanel();
        return;
      }
    }
    this.localStream.getAudioTracks().forEach(t => t.enabled = !muted);
    if (this._registered) return;
    this._registered = true;
    this.network._send({ type: 'voice_join' });
  }

  _disable() {
    if (this.localStream) {
      this.localStream.getTracks().forEach(t => t.stop());
      this.localStream = null;
    }
    for (const pc of this.peers.values()) {
      if (pc._audioEl) pc._audioEl.remove();
      pc.close();
    }
    this.peers.clear();
    this._iceBuffer.clear();
    this._registered = false;
  }

  stop() { this.setState(STATES.OFF); if (this._panelOpen) this.togglePanel(); }

  // Called when a new peer joins with voice enabled
  connectToPeer(username) {
    if (this.state === STATES.OFF || username === this.username || this.peers.has(username)) return;
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        this.network._send({ type: 'voice_ice', target: username, candidate: e.candidate.toJSON() });
      }
    };

    pc.ontrack = (e) => {
      const audio = document.createElement('audio');
      audio.srcObject = e.streams[0];
      audio.autoplay = true;
      audio.volume = 0.8;
      document.body.appendChild(audio);
      pc._audioEl = audio;
    };

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === 'disconnected' || pc.connectionState === 'failed') {
        this._removePeer(username);
      }
    };

    this.localStream.getTracks().forEach(t => pc.addTrack(t, this.localStream));
    this.peers.set(username, pc);

    pc.createOffer().then(offer => {
      pc.setLocalDescription(offer);
      this.network._send({ type: 'voice_offer', target: username, sdp: offer.sdp });
    });
  }

  async handleOffer(username, sdp) {
    if (this.state === STATES.OFF) return;
    const pc = this._getOrCreatePC(username);
    await pc.setRemoteDescription(new RTCSessionDescription({ type: 'offer', sdp }));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    this.network._send({ type: 'voice_answer', target: username, sdp: answer.sdp });
  }

  async handleAnswer(username, sdp) {
    const pc = this.peers.get(username);
    if (!pc) return;
    await pc.setRemoteDescription(new RTCSessionDescription({ type: 'answer', sdp }));
    const buf = this._iceBuffer.get(username);
    if (buf) {
      for (const c of buf) {
        try { await pc.addIceCandidate(new RTCIceCandidate(c)); } catch (_) {}
      }
      this._iceBuffer.delete(username);
    }
  }

  async handleIce(username, candidate) {
    const pc = this.peers.get(username);
    if (!pc) {
      if (!this._iceBuffer.has(username)) this._iceBuffer.set(username, []);
      this._iceBuffer.get(username).push(candidate);
      return;
    }
    if (pc.remoteDescription && pc.remoteDescription.type) {
      try { await pc.addIceCandidate(new RTCIceCandidate(candidate)); } catch (_) {}
    }
  }

  _removePeer(username) {
    const pc = this.peers.get(username);
    if (pc) {
      if (pc._audioEl) pc._audioEl.remove();
      pc.close();
      this.peers.delete(username);
    }
    this._iceBuffer.delete(username);
  }

  _getOrCreatePC(username) {
    let pc = this.peers.get(username);
    if (pc) return pc;

    pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        this.network._send({ type: 'voice_ice', target: username, candidate: e.candidate.toJSON() });
      }
    };

    pc.ontrack = (e) => {
      const audio = document.createElement('audio');
      audio.srcObject = e.streams[0];
      audio.autoplay = true;
      audio.volume = 0.8;
      document.body.appendChild(audio);
      pc._audioEl = audio;
    };

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === 'disconnected' || pc.connectionState === 'failed') {
        this._removePeer(username);
      }
    };

    this.localStream.getTracks().forEach(t => pc.addTrack(t, this.localStream));
    this.peers.set(username, pc);
    return pc;
  }

  _createHUD() {
    this._hud = document.createElement('div');
    this._hud.id = 'voice-hud';
    this._hud.style.cssText = 'position:fixed;bottom:48px;left:50%;transform:translateX(-50%);z-index:999;pointer-events:none;font:bold 14px monospace;color:#fff;background:rgba(0,0,0,0.6);padding:4px 12px;border-radius:4px;display:none;text-align:center;';
    this._hud.innerHTML = '';
    document.body.appendChild(this._hud);
  }

  _updateHUD() {
    if (!this._hud) return;
    const labels = {
      [STATES.OFF]: ['Voice Off', '#888'],
      [STATES.ON_MUTED]: ['Mic Muted', '#fa0'],
      [STATES.ON_UNMUTED]: ['Voice On', '#5f5'],
    };
    const [text, color] = labels[this.state];
    this._hud.textContent = this.peers.size > 0 ? `${text} (${this.peers.size})` : text;
    this._hud.style.color = color;
    this._hud.style.display = this.state === STATES.OFF && this.peers.size === 0 ? 'none' : 'block';
    this._hud.style.opacity = '1';
    clearTimeout(this._hud._hideTimer);
    this._hud._hideTimer = setTimeout(() => {
      if (this._hud) this._hud.style.opacity = '0.3';
    }, 3000);
  }

  _createPanel() {
    this._panel = document.createElement('div');
    this._panel.id = 'voice-panel';
    this._panel.style.cssText = 'display:none;position:fixed;inset:0;z-index:200;background:rgba(0,0,0,0.5);align-items:center;justify-content:center;backdrop-filter:blur(2px);';
    this._panel.innerHTML = `
      <div style="background:linear-gradient(180deg,#2a3a5b 0%,#1a2a4b 50%,#0a1a3b 100%);border:2px solid #5af;border-radius:10px;padding:24px 32px;min-width:260px;text-align:center;box-shadow:0 0 30px rgba(0,0,0,0.7);">
        <div style="font:700 18px sans-serif;color:#fff;margin-bottom:16px;">Voice Chat</div>
        <div id="voice-panel-body"></div>
      </div>
    `;
    document.body.appendChild(this._panel);
    // Close on backdrop click
    this._panel.addEventListener('click', (e) => {
      if (e.target === this._panel) this.togglePanel();
    });
  }

  _renderPanel() {
    const body = this._panel.querySelector('#voice-panel-body');
    if (!body) return;
    const peerNames = [...this.peers.keys()];
    const peerHtml = peerNames.length
      ? `<div style="font:12px sans-serif;color:#aac;margin:8px 0;">Connected: ${peerNames.join(', ')}</div>`
      : '<div style="font:12px sans-serif;color:#888;margin:8px 0;">No players nearby</div>';

    const stateLabels = {
      [STATES.OFF]: { btn: 'Enable Microphone', color: '#888' },
      [STATES.ON_MUTED]: { btn: 'Unmute Microphone', color: '#fa0' },
      [STATES.ON_UNMUTED]: { btn: 'Mute Microphone', color: '#5f5' },
    };
    const s = stateLabels[this.state];

    body.innerHTML = `
      <div style="font:13px sans-serif;color:${s.color};margin-bottom:12px;">${s.btn.replace('Enable Microphone', 'Voice: Off').replace('Unmute Microphone', 'Mic: Muted').replace('Mute Microphone', 'Mic: Active')}</div>
      <button id="vp-toggle" style="display:block;width:100%;padding:10px;font:700 13px sans-serif;background:linear-gradient(180deg,#3a6b9b 0%,#2a5b8b 50%,#1a4b7b 100%);border:1px solid #5af;border-radius:6px;color:#fff;cursor:pointer;margin-bottom:8px;">${s.btn}</button>
      <button id="vp-close" style="display:block;width:100%;padding:8px;font:13px sans-serif;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:6px;color:#ccc;cursor:pointer;">Close</button>
      ${peerHtml}
    `;

    body.querySelector('#vp-toggle').addEventListener('click', () => {
      if (this.state === STATES.OFF) this.setState(STATES.ON_MUTED);
      else if (this.state === STATES.ON_MUTED) this.setState(STATES.ON_UNMUTED);
      else this.setState(STATES.OFF);
    });
    body.querySelector('#vp-close').addEventListener('click', () => this.togglePanel());
  }

  _setupHandlers() {
    const net = this.network;
    const handlers = {
      voice_offer: (msg) => this.handleOffer(msg.from || msg.target, msg.sdp),
      voice_answer: (msg) => this.handleAnswer(msg.from || msg.target, msg.sdp),
      voice_ice: (msg) => this.handleIce(msg.from || msg.target, msg.candidate),
    };

    const orig = net._handleMessage.bind(net);
    net._handleMessage = (msg) => {
      if (handlers[msg.type] && this.state !== STATES.OFF) {
        handlers[msg.type](msg);
        return;
      }
      if (msg.type === 'voice_join_ack') {
        if (msg.peers) {
          for (const p of msg.peers) {
            if (p !== this.username) this.connectToPeer(p);
          }
        }
        return;
      }
      if (msg.type === 'voice_peer_join') {
        if (msg.name !== this.username) this.connectToPeer(msg.name);
        return;
      }
      if (msg.type === 'voice_peer_leave') {
        this._removePeer(msg.name);
        return;
      }
      orig(msg);
    };
  }
}
