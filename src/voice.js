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
    // Saved original _handleMessage for cleanup (Bug #4)
    this._origHandleMessage = null;
    // Voice group state
    this._groupCode = null;
    this._groupMembers = [];
    // Push to Talk state
    this._pttEnabled = false;
    this._pttKeyDown = false;

    this._setupHandlers();
    this._setupPTT();
    this._createHUD();
    this._createPanel();
  }

  get enabled() { return this.state !== STATES.OFF; }
  get muted() { return this.state === STATES.ON_MUTED; }
  get panelOpen() { return this._panelOpen; }

  // Show/hide the voice settings panel — fires events so main.js can unlock/lock pointer
  togglePanel() {
    this._panelOpen = !this._panelOpen;
    this._panel.style.display = this._panelOpen ? 'flex' : 'none';
    this._renderPanel();
    window.dispatchEvent(new CustomEvent('voice-panel-toggle', { detail: { open: this._panelOpen } }));
  }

  closePanel() {
    if (this._panelOpen) this.togglePanel();
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
        console.log('[Voice] Requesting microphone...');
        this.localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('[Voice] Mic granted, tracks:', this.localStream.getAudioTracks().length);
      } catch (e) {
        console.error('[Voice] Microphone denied:', e.message);
        this.state = STATES.OFF;
        this._updateHUD();
        if (this._panelOpen) this._renderPanel();
        return;
      }
    }
    this.localStream.getAudioTracks().forEach(t => t.enabled = !muted);
    if (this._registered) { console.log('[Voice] Already registered, skipping voice_join'); return; }
    this._registered = true;
    console.log('[Voice] Sending voice_join for user:', this.username);
    this.network._send({ type: 'voice_join' });
  }

  _disable() {
    // Notify server we're leaving voice
    if (this._registered) {
      this.network._send({ type: 'voice_leave' });
    }
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

  stop() {
    this.setState(STATES.OFF);
    if (this._panelOpen) this.togglePanel();
    // Bug #4 fix: restore original _handleMessage to prevent wrapper stacking
    if (this._origHandleMessage && this.network) {
      this.network._handleMessage = this._origHandleMessage;
      this._origHandleMessage = null;
    }
    // Clean up PTT key handlers
    if (this._pttKeyHandler) {
      document.removeEventListener('keydown', this._pttKeyHandler);
      document.removeEventListener('keyup', this._pttKeyHandler);
      this._pttKeyHandler = null;
    }
  }

  // Called when we (the joiner) receive voice_join_ack with a peer list.
  // Only the joiner creates offers — this prevents dual-offer glare (Bug #1).
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
      audio.volume = this._getVolume();
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

    // Create and send offer (we are the joiner, so we initiate)
    pc.createOffer().then(offer => {
      return pc.setLocalDescription(offer);
    }).then(() => {
      const sdp = this.peers.get(username)?.localDescription?.sdp;
      this.network._send({ type: 'voice_offer', target: username, sdp });
    }).catch(e => {
      console.error('[Voice] Failed to create offer:', e);
      this._removePeer(username);
    });
  }

  // Called when an existing peer receives voice_peer_join — prepare PC but DON'T create offer.
  // The joiner's offer will arrive via handleOffer. (Bug #1 fix)
  preparePeer(username) {
    if (this.state === STATES.OFF || username === this.username || this.peers.has(username)) return;
    // Just create the PC and add tracks — wait for the joiner's offer
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
      audio.volume = this._getVolume();
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
    // Do NOT create an offer — wait for handleOffer to be called
  }

  async handleOffer(username, sdp) {
    if (this.state === STATES.OFF) return;
    const pc = this._getOrCreatePC(username);
    try {
      await pc.setRemoteDescription(new RTCSessionDescription({ type: 'offer', sdp }));
      // Drain any ICE candidates that arrived before the offer
      const buf = this._iceBuffer.get(username);
      if (buf) {
        for (const c of buf) {
          try { await pc.addIceCandidate(new RTCIceCandidate(c)); } catch (_) {}
        }
        this._iceBuffer.delete(username);
      }
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      this.network._send({ type: 'voice_answer', target: username, sdp: answer.sdp });
    } catch (e) {
      console.error('[Voice] handleOffer failed:', e);
      this._removePeer(username);
    }
  }

  async handleAnswer(username, sdp) {
    const pc = this.peers.get(username);
    if (!pc) return;
    try {
      await pc.setRemoteDescription(new RTCSessionDescription({ type: 'answer', sdp }));
      const buf = this._iceBuffer.get(username);
      if (buf) {
        for (const c of buf) {
          try { await pc.addIceCandidate(new RTCIceCandidate(c)); } catch (_) {}
        }
        this._iceBuffer.delete(username);
      }
    } catch (e) {
      console.error('[Voice] handleAnswer failed:', e);
    }
  }

  async handleIce(username, candidate) {
    const pc = this.peers.get(username);
    if (!pc || !pc.remoteDescription || !pc.remoteDescription.type) {
      if (!this._iceBuffer.has(username)) this._iceBuffer.set(username, []);
      this._iceBuffer.get(username).push(candidate);
      return;
    }
    try { await pc.addIceCandidate(new RTCIceCandidate(candidate)); } catch (_) {}
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

  _getVolume() {
    try { return parseFloat(localStorage.getItem('bf_voice_volume')) || 0.8; } catch { return 0.8; }
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
      audio.volume = this._getVolume();
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
      <div id="voice-panel-box" style="background:#2b2b2b;border:2px solid #444;border-radius:8px;padding:0;min-width:300px;max-width:380px;text-align:center;box-shadow:0 4px 20px rgba(0,0,0,0.7);overflow:hidden;">
        <div style="padding:10px 16px 8px;font:600 15px sans-serif;color:#fff;">Voice Chat</div>
        <div id="voice-tabs" style="display:flex;border-bottom:1px solid #444;">
          <div id="voice-tab-settings" class="voice-tab voice-tab-active">Settings</div>
          <div id="voice-tab-groups" class="voice-tab">Groups</div>
        </div>
        <div id="voice-panel-body" style="padding:12px 16px;min-height:80px;"></div>
        <div id="voice-avatars" style="padding:8px 16px 12px;display:flex;justify-content:center;gap:8px;border-top:1px solid #444;background:#222;"></div>
      </div>
    `;
    document.body.appendChild(this._panel);

    // Tab switching
    this._activeTab = 'settings';
    this._panel.querySelector('#voice-tab-settings').addEventListener('click', () => { this._activeTab = 'settings'; this._renderPanel(); });
    this._panel.querySelector('#voice-tab-groups').addEventListener('click', () => { this._activeTab = 'groups'; this._renderPanel(); });

    // Close on backdrop click
    this._panel.addEventListener('click', (e) => { if (e.target === this._panel) this.togglePanel(); });
    // Escape to close
    this._panel.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.togglePanel(); });
  }

  _renderPanel() {
    // Tab highlight
    const tabSettings = this._panel.querySelector('#voice-tab-settings');
    const tabGroups = this._panel.querySelector('#voice-tab-groups');
    if (tabSettings) tabSettings.className = 'voice-tab' + (this._activeTab === 'settings' ? ' voice-tab-active' : '');
    if (tabGroups) tabGroups.className = 'voice-tab' + (this._activeTab === 'groups' ? ' voice-tab-active' : '');

    if (this._activeTab === 'settings') this._renderSettingsTab();
    else this._renderGroupsTab();
    this._renderAvatars();
  }

  _renderSettingsTab() {
    const body = this._panel.querySelector('#voice-panel-body');
    if (!body) return;
    const isOn = this.state !== STATES.OFF;
    let vol = 0.8;
    try { vol = parseFloat(localStorage.getItem('bf_voice_volume')) || 0.8; } catch {}
    const peerNames = [...this.peers.keys()];

    body.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
        <span style="font:12px sans-serif;color:#aaa;">Microphone</span>
        <button id="vp-mic-toggle" style="padding:4px 14px;font:11px sans-serif;border-radius:4px;border:1px solid ${isOn ? (this.muted ? '#e8a030' : '#4caf50') : '#666'};background:${isOn ? (this.muted ? 'rgba(232,160,48,0.15)' : 'rgba(76,175,80,0.15)') : 'rgba(100,100,100,0.2)'};color:${isOn ? (this.muted ? '#e8a030' : '#4caf50') : '#888'};cursor:pointer;">${!isOn ? 'OFF' : (this.muted ? 'MUTED' : 'ON')}</button>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
        <span style="font:12px sans-serif;color:#aaa;">Voice Chat</span>
        <button id="vp-voice-toggle" style="padding:4px 14px;font:11px sans-serif;border-radius:4px;border:1px solid ${isOn ? '#4caf50' : '#666'};background:${isOn ? 'rgba(76,175,80,0.15)' : 'rgba(100,100,100,0.2)'};color:${isOn ? '#4caf50' : '#888'};cursor:pointer;">${isOn ? 'ENABLED' : 'DISABLED'}</button>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
        <span style="font:12px sans-serif;color:#aaa;">Volume</span>
        <div style="display:flex;align-items:center;gap:8px;">
          <input id="vp-volume" type="range" min="0" max="100" value="${Math.round(vol * 100)}" style="width:90px;cursor:pointer;accent-color:#5af;" />
          <span id="vp-vol-label" style="font:11px monospace;color:#ccc;min-width:30px;text-align:right;">${Math.round(vol * 100)}%</span>
        </div>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
        <span style="font:12px sans-serif;color:#aaa;">Push to Talk (X)</span>
        <button id="vp-ptt" style="padding:4px 14px;font:11px sans-serif;border-radius:4px;border:1px solid ${this._pttEnabled ? '#4caf50' : '#666'};background:${this._pttEnabled ? 'rgba(76,175,80,0.15)' : 'rgba(100,100,100,0.2)'};color:${this._pttEnabled ? '#4caf50' : '#888'};cursor:pointer;">${this._pttEnabled ? 'ON' : 'OFF'}</button>
      </div>
    `;

    // Wire buttons
    body.querySelector('#vp-mic-toggle')?.addEventListener('click', () => {
      if (this.state === STATES.OFF) return;
      this.setState(this.muted ? STATES.ON_UNMUTED : STATES.ON_MUTED);
    });
    body.querySelector('#vp-voice-toggle')?.addEventListener('click', () => {
      if (this.state === STATES.OFF) this.setState(STATES.ON_MUTED);
      else this.setState(STATES.OFF);
    });
    body.querySelector('#vp-volume')?.addEventListener('input', (e) => {
      const v = parseInt(e.target.value) / 100;
      body.querySelector('#vp-vol-label').textContent = Math.round(v * 100) + '%';
      try { localStorage.setItem('bf_voice_volume', String(v)); } catch {}
      for (const pc of this.peers.values()) { if (pc._audioEl) pc._audioEl.volume = v; }
    });
    body.querySelector('#vp-ptt')?.addEventListener('click', () => {
      this._pttEnabled = !this._pttEnabled;
      try { localStorage.setItem('bf_voice_ptt', this._pttEnabled ? '1' : '0'); } catch {}
      if (this._pttEnabled) {
        // When enabling PTT, mute mic until key is held
        this.setState(STATES.ON_MUTED);
      }
      this._renderPanel();
    });
  }

  _renderGroupsTab() {
    const body = this._panel.querySelector('#voice-panel-body');
    if (!body) return;

    body.innerHTML = `
      <div style="font:12px sans-serif;color:#888;margin-bottom:10px;">Join a voice group with friends</div>
      <div style="display:flex;gap:6px;margin-bottom:8px;">
        <button id="vp-group-create" style="flex:1;padding:6px;font:11px sans-serif;border-radius:4px;border:1px solid #5af;background:rgba(80,150,255,0.12);color:#5af;cursor:pointer;">Create Group</button>
        <button id="vp-group-leave" style="flex:1;padding:6px;font:11px sans-serif;border-radius:4px;border:1px solid #f55;background:rgba(255,85,85,0.12);color:#f55;cursor:pointer;">Leave Group</button>
      </div>
      <div style="display:flex;gap:6px;margin-bottom:8px;">
        <input id="vp-group-code" type="text" placeholder="Enter group code..." maxlength="8" spellcheck="false" autocomplete="off" style="flex:1;padding:5px 8px;background:rgba(0,0,0,0.4);color:#fff;border:1px solid #555;border-radius:4px;font:12px monospace;outline:none;" />
        <button id="vp-group-join" style="padding:5px 12px;font:11px sans-serif;border-radius:4px;border:1px solid #5af;background:rgba(80,150,255,0.12);color:#5af;cursor:pointer;">Join</button>
      </div>
      <div id="vp-group-info" style="font:11px monospace;color:#888;text-align:center;"></div>
    `;

    body.querySelector('#vp-group-create')?.addEventListener('click', () => {
      const code = Math.random().toString(36).slice(2, 8).toUpperCase();
      this._groupCode = code;
      this.network._send({ type: 'voice_group_create', code });
      this._updateGroupInfo();
    });
    body.querySelector('#vp-group-leave')?.addEventListener('click', () => {
      this._groupCode = null;
      this.network._send({ type: 'voice_group_leave' });
      this._updateGroupInfo();
    });
    body.querySelector('#vp-group-join')?.addEventListener('click', () => {
      const code = body.querySelector('#vp-group-code')?.value?.trim().toUpperCase();
      if (!code) return;
      this._groupCode = code;
      this.network._send({ type: 'voice_group_join', code });
      this._updateGroupInfo();
    });

    this._updateGroupInfo();
  }

  _updateGroupInfo() {
    const info = this._panel?.querySelector('#vp-group-info');
    if (!info) return;
    if (this._groupCode) {
      const members = this._groupMembers.length > 0
        ? `<div style="margin-top:6px;color:#aaa;">Members: ${this._groupMembers.join(', ')}</div>`
        : '';
      info.innerHTML = `<span style="color:#5af;">Group: ${this._groupCode}</span>${members}`;
    } else {
      info.innerHTML = '<span style="color:#666;">Not in a group</span>';
    }
  }

  _renderAvatars() {
    const container = this._panel.querySelector('#voice-avatars');
    if (!container) return;
    const colors = ['#e53935','#e91e63','#9c27b0','#3f51b5','#03a9f4','#009688','#4caf50','#ff9800','#795548','#607d8b'];
    const peerNames = [...this.peers.keys()];
    const all = [this.username, ...peerNames];
    container.innerHTML = all.map((name) => {
      const initial = (name || '?')[0].toUpperCase();
      const color = colors[Math.abs([...name].reduce((a, c) => a + c.charCodeAt(0), 0)) % colors.length];
      const isMuted = name === this.username && this.muted;
      const isOff = name === this.username && this.state === STATES.OFF;
      const opacity = (isMuted || isOff) ? '0.4' : '1';
      return `<div style="position:relative;width:36px;height:36px;border-radius:50%;background:${color};display:flex;align-items:center;justify-content:center;font:700 14px sans-serif;color:#fff;opacity:${opacity};border:2px solid ${color};box-shadow:0 2px 6px rgba(0,0,0,0.4);" title="${name}">
        ${initial}
        ${isMuted ? '<div style="position:absolute;bottom:-2px;right:-2px;width:14px;height:14px;border-radius:50%;background:#e8a030;display:flex;align-items:center;justify-content:center;font:9px;color:#fff;border:1.5px solid #2b2b2b;">M</div>' : ''}
      </div>`;
    }).join('');
  }

  _setupHandlers() {
    const net = this.network;
    const handlers = {
      voice_offer: (msg) => this.handleOffer(msg.from || msg.target, msg.sdp),
      voice_answer: (msg) => this.handleAnswer(msg.from || msg.target, msg.sdp),
      voice_ice: (msg) => this.handleIce(msg.from || msg.target, msg.candidate),
    };

    // Bug #4 fix: save the original handler so we can restore it on stop()
    // If we already wrapped before (shouldn't happen but safety), use the saved original
    this._origHandleMessage = this._origHandleMessage || net._handleMessage.bind(net);
    const orig = this._origHandleMessage;

    net._handleMessage = (msg) => {
      if (handlers[msg.type] && this.state !== STATES.OFF) {
        handlers[msg.type](msg);
        return;
      }
      if (msg.type === 'voice_join_ack') {
        // Bug #1 fix: only the joiner creates offers — they receive the peer list here
        if (msg.peers) {
          for (const p of msg.peers) {
            if (p !== this.username) this.connectToPeer(p);
          }
        }
        return;
      }
      if (msg.type === 'voice_peer_join') {
        // Bug #1 fix: existing peers just prepare a PC, do NOT create an offer.
        // The joiner's offer will arrive via handleOffer.
        if (msg.name !== this.username) this.preparePeer(msg.name);
        return;
      }
      if (msg.type === 'voice_peer_leave') {
        this._removePeer(msg.name);
        return;
      }
      // Voice group server responses
      if (msg.type === 'voice_group_info') {
        this._groupCode = msg.code;
        this._groupMembers = msg.members || [];
        if (this._panelOpen) this._renderPanel();
        return;
      }
      if (msg.type === 'voice_group_peer_join') {
        if (!this._groupMembers.includes(msg.name)) this._groupMembers.push(msg.name);
        if (this._panelOpen) this._renderPanel();
        return;
      }
      if (msg.type === 'voice_group_peer_leave') {
        this._groupMembers = this._groupMembers.filter(n => n !== msg.name);
        if (this._panelOpen) this._renderPanel();
        return;
      }
      orig(msg);
    };
  }

  _setupPTT() {
    // Restore PTT preference
    try { this._pttEnabled = localStorage.getItem('bf_voice_ptt') === '1'; } catch {}

    this._pttKeyHandler = (e) => {
      if (this.state === STATES.OFF || !this._pttEnabled) return;
      if (e.code === 'KeyX') {
        if (e.type === 'keydown' && !this._pttKeyDown) {
          this._pttKeyDown = true;
          if (this.muted) this.setState(STATES.ON_UNMUTED);
        } else if (e.type === 'keyup') {
          this._pttKeyDown = false;
          if (this.state !== STATES.ON_MUTED) this.setState(STATES.ON_MUTED);
        }
      }
    };
    document.addEventListener('keydown', this._pttKeyHandler);
    document.addEventListener('keyup', this._pttKeyHandler);
  }
}
