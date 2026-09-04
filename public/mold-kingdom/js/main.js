window._STATE='logo'; window._MOUSE={x:480,y:270,down:false,erase:false};
window.STALE_Game = {
  canvas:null, ctx:null, keys:{}, cam:{x:0,y:0}, parts:[], shakeT:0, shakeM:0,
  levelI:0, level:null, moldWalls:[], sprinkles:[], exit:{x:0,y:410,w:50,h:70},
  state:'logo', stateT:0, toastT:0, dlgT:0, eraseHeld:false, checkpoint:null, paused:false,
  floats:[], npcs:[], cpGiven:false, cutLock:0, _lastJam:'berry', _dashHeld:false,

  init(){
    this.canvas=document.getElementById('game'); this.ctx=this.canvas.getContext('2d');
    this.device={touch:this.detectTouch()};
    STALE_Audio.init();
    this.bindInput(); this.bindUI(); this.applySettingsToUI();
    this.renderLevelDots();
    this.show('screen-logo'); window._STATE='logo'; this.state='logo'; this.stateT=0;
    requestAnimationFrame(t=>this.loop(t));
  },
  show(id){
    document.querySelectorAll('.screen').forEach(s=>s.classList.add('hidden'));
    if(id) document.getElementById(id).classList.remove('hidden');
    document.getElementById('hud').classList.toggle('hidden', !(this.state==='play'));
    this.updateTouchUI();
  },
  toast(msg){ const t=document.getElementById('toast'); t.textContent=msg; t.classList.remove('hidden'); this.toastT=2.2; },
  dialog(who,text,dur){ document.getElementById('dlg-who').textContent=who; document.getElementById('dlg-text').textContent=text; document.getElementById('dialog').classList.remove('hidden'); this.dlgT=dur||4; },

  // ---------- level ----------
  clearKeys(){
    this.keys.left=this.keys.right=this.keys.up=false;
    this.keys.jump=false; this.keys.dash=false;
    this.keys.j1=this.keys.j2=this.keys.j3=false;
    this.eraseHeld=false;
    const te=document.getElementById('t-erase'); if(te) te.classList.remove('on');
  },
  loadLevel(i){
    this.levelI=i; this.level=STALE_LEVELS[i];
    this.clearKeys(); // never carry held buttons/keys into a fresh level
    this.moldWalls=this.level.moldWalls.map(m=>({...m}));
    this.sprinkles=this.level.sprinkles.map(s=>({...s}));
    this.exit={x:this.level.W-220,y:410,w:50,h:70};
    STALE_Player.reset(this.level.start.x,this.level.start.y);
    STALE_Paint.reset();
    this.floats=[];
    this.npcs=(this.level.npcs||[]).map(n=>({type:n.type,x:n.x,y:n.y,text:n.text,talked:false,t:Math.random()*5}));
    // tiny spawn pads: guaranteed safe ground under start + checkpoint
    // (no more spawning mid-air over a gap and instantly falling)
    const pad=(p)=>({x:p.x-50, y:p.y+72, w:130, h:18, kind:'spawn'});
    this.extraSolids=[pad(this.level.start), pad(this.level.checkpoint)];
    this.checkpoint={x:this.level.start.x,y:this.level.start.y};
    this.cpGiven=false; this.roared=false;
    // GREAT MOLD spore gate (Level 10): giant mold wall, crumbles after 20 spore stomps
    this.gate=null;
    if(this.level.sporeGate){
      const sg=this.level.sporeGate;
      this.extraSolids.push({x:sg.x, y:sg.top, w:sg.w, h:480-sg.top, kind:'gate'});
      this.gate={def:sg, total:sg.total, batch:sg.batch, defeated:0, spawned:0, spawnT:1.5, open:false};
    }
    // boss?
    window._BOSS=null;
    if(this.level.boss){
      const shroom=this.level.bossKing==='shroom';
      window._BOSS={type:'boss',x:this.level.W-600,y:300,w:90,h:80,vx:0,vy:0,t:0,dead:false,ph:0,
        hp:shroom?6:5,maxhp:shroom?6:5,king:shroom?'shroom':'mold',title:this.level.bossName||'KING MOLD',cool:2,onG:false,tired:0};
    }
    STALE_Enemies.reset(this.level.enemies);
    this.cam.x=0; this.cam.y=0;
    document.getElementById('hud-level').textContent=this.level.name;
    this.toast(this.level.name+' — '+this.level.hint);
    this.dialog('Splat 💦', this.level.signs[0]?this.level.signs[0].text:this.level.hint, 5);
  },
  solids(){ return this.level.solids.concat(this.extraSolids||[]).concat(this.moldWalls); },
  paintSolids(){ return []; }, // dabs handle their own collision
  spawnPoof(x,y,c){
    if(!STALE_Settings.data.particles && Math.random()<0.7) return;
    for(let i=0;i<8;i++) this.parts.push({x,y,vx:(Math.random()-0.5)*300,vy:-Math.random()*300-50,t:0.6,c:c||'#fff'});
  },
  spawnFloat(x,y,txt,c){ this.floats.push({x,y,txt,c:c||'#ffd23f',t:0,life:1.1}); },
  spawnRing(x,y,c){ this.parts.push({x,y,vx:0,vy:0,ring:true,r:8,vr:340,t:0.4,life:0.4,c:c||'#fff'}); },
  spawnConfetti(x,y,n){
    const cols=['#ff5d8f','#ffd23f','#2ee6a8','#4b7de1','#ffffff'];
    for(let i=0;i<(n||40);i++) this.parts.push({x:x+(Math.random()-0.5)*220,y:y-Math.random()*80,
      vx:(Math.random()-0.5)*380,vy:-Math.random()*430-60,t:1.4+Math.random()*0.8,life:2.2,conf:true,c:cols[i%cols.length],ph:Math.random()*6});
  },
  shake(m){ if(STALE_Settings.data.shake && !STALE_Settings.data.flash) {this.shakeT=0.3; this.shakeM=m||6;} },

  onDeath(){
    STALE_Player.deaths++;
    STALE_Audio.play('hurt'); this.shake(12);
    // falling costs a heart (hurt() already took one for hits)
    if(STALE_Player.y>700) STALE_Player.hearts=Math.max(0,STALE_Player.hearts-1);
    if(STALE_Player.hearts<=0){
      this.toast('Pip got stale! Respawning…');
      STALE_Player.hearts=3;
      STALE_Paint.ink=STALE_Paint.max;
    }
    STALE_Player.x=this.checkpoint.x; STALE_Player.y=this.checkpoint.y;
    STALE_Player.vx=0; STALE_Player.vy=0; STALE_Player.dead=false; STALE_Player.inv=2;
  },
  onSporeDown(e,quiet){
    if(e.counted) return; e.counted=true;
    STALE_Paint.ink=Math.min(100,STALE_Paint.ink+4);
    const gt=this.gate;
    if(gt && !gt.open){
      gt.defeated++;
      this.spawnFloat(e.x+e.w/2, e.y-10, gt.defeated+'/'+gt.total+' 👁', '#ff9ebc');
      if(gt.defeated>=gt.total){
        gt.open=true;
        this.extraSolids=this.extraSolids.filter(s=>s.kind!=='gate');
        this.shake(16);
        for(let i=0;i<24;i++) this.spawnPoof(gt.def.x+Math.random()*gt.def.w, gt.def.top+Math.random()*200, '#8d9187');
        STALE_Audio.play('door');
        this.toast('The GREAT MOLD CRUMBLES! GO GO GO!');
        this.spawnFloat(gt.def.x+50, gt.def.top-20, 'WAY OPEN!', '#7bd389');
      } else if(gt.defeated===Math.floor(gt.total/2)){
        this.toast('Halfway! ' + gt.defeated + '/' + gt.total + ' spores!');
      }
    } else if(!quiet){
      this.spawnFloat(e.x+e.w/2, e.y-10, 'SPLAT!', '#ff9ebc');
    }
  },
  onStomp(e){
    const P=STALE_Player;
    P.combo=(P.comboT>0)?(P.combo||1)+1:1; P.comboT=1.4;
    const bonus=18+(P.combo-1)*6;
    STALE_Paint.ink=Math.min(100,STALE_Paint.ink+bonus);
    P.splatHappy=0.6;
    STALE_Audio.play('stomp'); this.spawnPoof(e.x+e.w/2,e.y+e.h,'#9f9');
    this.spawnRing(e.x+e.w/2,e.y+e.h,'#9f9');
    this.spawnFloat(e.x+e.w/2,e.y-24, P.combo>1?('POW x'+P.combo+'!'):'POW!','#7bd389');
  },
  onBossDown(){
    STALE_Audio.play('win');
    const P=STALE_Player;
    this.spawnConfetti(P.x+P.w/2,P.y-40,60); this.shake(10);
    // mid-game boss (Mold King): celebrate, then march into World 2!
    if(this.levelI<STALE_LEVELS.length-1){
      const li=this.levelI, beaten=this.level.bossName||'KING';
      STALE_Settings.data.unlocked=Math.max(STALE_Settings.data.unlocked,Math.min(STALE_LEVELS.length,li+2));
      STALE_Settings.data.seenIntro=true; STALE_Settings.save();
      this.loadLevel(li+1); this.renderLevelDots();
      this.toast(beaten+' DEFEATED! Onward to '+STALE_LEVELS[li+1].name+'!');
      this.dialog('Splat 💦','We did it!! Did you see that crown FLY? World 2 smells… mushroomy. Stay brave, crumb!',6);
      return;
    }
    // final boss (Mushroom King): the real win screen
    this.state='win'; window._STATE='win';
    const t=P.time, d=P.deaths, s=P.sprGot;
    document.getElementById('final-stats').textContent=`Time ${STALE_Board.fmt(t)} · Deaths ${d} · ✨ ${s}`;
    // hero name: remembered pilot → BlockForge name → PIP
    const bf=this.bfName();
    document.getElementById('name-input').value=(STALE_Settings.data.pilotName||bf||'PIP').toUpperCase().slice(0,12);
    const hint=document.getElementById('bf-hint');
    if(hint) hint.textContent=bf?('🔗 BlockForge hero detected: '+bf.toUpperCase().slice(0,12)+(this.isDevName(bf)?' 👑DEV — all levels open!':'')+' — keep it or type your own!'):'Tip: set a name in BlockForge and we’ll fill it in next time!';
    this.show('screen-name');
    this._pendingScore={level:'Mushroom Hollow',time:t,deaths:d,spr:s};
    STALE_Settings.data.unlocked=STALE_LEVELS.length; STALE_Settings.data.seenIntro=true; STALE_Settings.save();
  },
  levelComplete(){
    STALE_Audio.play('door');
    const li=this.levelI;
    this.spawnConfetti(this.exit.x+25,this.exit.y,50);
    this.spawnRing(this.exit.x+25,this.exit.y+35,'#7bd389');
    STALE_Settings.data.unlocked=Math.max(STALE_Settings.data.unlocked, Math.min(STALE_LEVELS.length,li+2));
    STALE_Settings.data.sprinklesTotal+=STALE_Player.sprGot; STALE_Settings.save();
    this.renderLevelDots();
    if(li>=STALE_LEVELS.length-1){ return; }
    this.toast('Level clear! → '+STALE_LEVELS[li+1].name);
    this.loadLevel(li+1);
  },

  // ---------- BlockForge offshoot identity ----------
  // Your BlockForge hero name (localStorage bf_player_name) is reused here.
  bfName(){
    try{
      return localStorage.getItem('bf_player_name')
        || localStorage.getItem('bf_login_user')
        || localStorage.getItem('bf_cg_username') || '';
    }catch(e){ return ''; }
  },
  // BlockForge convention: the LogicLeague account is the gamedev account.
  isDevName(n){ return (n||'').trim().toLowerCase()==='logicleague'; },
  devUnlock(){
    if(this.isDevName(STALE_Settings.data.pilotName||this.bfName())){
      if(STALE_Settings.data.unlocked<STALE_LEVELS.length){ STALE_Settings.data.unlocked=STALE_LEVELS.length; STALE_Settings.save(); }
      return true;
    }
    return false;
  },
  toMenu(){ this.state='menu'; window._STATE='menu'; this.show('screen-menu'); this.renderLevelDots(); STALE_Audio.playTrack('menu'); },

  // ---------- UI ----------
  renderLevelDots(){
    const dev=this.devUnlock();
    const d=document.getElementById('level-dots'); d.innerHTML='';
    const un=STALE_Settings.data.unlocked;
    let lastW=0;
    STALE_LEVELS.forEach((L,i)=>{
      if(L.world!==lastW){
        lastW=L.world;
        const lab=document.createElement('span');
        lab.className='wdot'; lab.title=L.world===1?'World 1: Mold King':'World 2: Mushroom King';
        lab.textContent=L.world===1?'🍞W1':'🍄W2';
        d.appendChild(lab);
      }
      const s=document.createElement('span');
      s.textContent=i+1; if(i+1>un)s.classList.add('locked'); if(i+1<un)s.classList.add('done');
      s.title=L.name;
      if(i+1<=un) s.onclick=()=>{ STALE_Audio.init(); STALE_Audio.play('ui'); this.startPlay(i); };
      d.appendChild(s);
    });
    const c=document.getElementById('btn-continue');
    if(un>1){ c.classList.remove('hidden'); c.textContent='↻ CONTINUE · Level '+un; } else c.classList.add('hidden');
    const ms=document.querySelector?document.querySelector('.menu-sub'):null;
    if(ms) ms.innerHTML='Mold Kingdom · by <b>LogicLeague</b>'+(dev?' · 👑 <b>DEV MODE</b> — all levels open!':'');
  },
  renderBoard(){
    const el=document.getElementById('board-list'); el.innerHTML='';
    if(!STALE_Board.entries.length) el.innerHTML='<div>No legends yet. Be the first crumb!</div>';
    STALE_Board.entries.forEach((e,i)=>{
      const div=document.createElement('div');
      div.textContent=`${i+1}. ${e.dev?'★DEV ':''}${e.name} — ${e.level} · ${STALE_Board.fmt(e.time)} · 💀${e.deaths} · ✨${e.spr}`;
      el.appendChild(div);
    });
  },
  applySettingsToUI(){
    const s=STALE_Settings.data;
    document.getElementById('s-master').value=s.master; document.getElementById('v-master').textContent=s.master;
    document.getElementById('s-music').value=s.music; document.getElementById('v-music').textContent=s.music;
    document.getElementById('s-sfx').value=s.sfx; document.getElementById('v-sfx').textContent=s.sfx;
    document.getElementById('s-shake').checked=s.shake; document.getElementById('s-particles').checked=s.particles;
    document.getElementById('s-timer').checked=s.timer; document.getElementById('s-flash').checked=s.flash;
    document.getElementById('s-mode').value=s.mode;
    document.getElementById('s-controls').value=s.controls||'auto';
  },
  bindUI(){
    const blur=()=>{ try{ if(document.activeElement && document.activeElement.blur) document.activeElement.blur(); }catch(e){} };
    const click=(id,fn)=>document.getElementById(id).addEventListener('click',()=>{STALE_Audio.init();STALE_Audio.play('ui');blur();fn();});
    click('btn-skip',()=>STALE_Cutscene.skip());
    click('btn-play',()=>this.startPlay(0));
    click('btn-continue',()=>this.startPlay(Math.min(STALE_LEVELS.length-1,STALE_Settings.data.unlocked-1)));
    click('btn-how',()=>{this.state='how';this.show('screen-how');});
    click('btn-how-back',()=>this.toMenu());
    click('btn-settings',()=>{this.state='settings';this.show('screen-settings');});
    click('btn-set-back',()=>{STALE_Settings.save();this.toMenu();});
    click('btn-board',()=>{this.renderBoard();this.state='board';this.show('screen-board');});
    click('btn-back-bf',()=>{ try{ window.location.href='../BlockForge-main/index.html'; }catch(e){} });
    click('btn-board-back',()=>this.toMenu());
    click('btn-board-clear',()=>{STALE_Board.clear();this.renderBoard();});
    click('btn-resume',()=>{this.paused=false;this.state='play';window._STATE='play';this.show(null);document.getElementById('hud').classList.remove('hidden');});
    click('btn-quit',()=>{this.paused=false;this.toMenu();});
    click('btn-mute',()=>{STALE_Audio.muted=!STALE_Audio.muted;document.getElementById('btn-mute').textContent=STALE_Audio.muted?'🔇':'🔊';STALE_Audio.applyVolumes();});
    click('btn-full',()=>{ const el=document.documentElement; if(el.requestFullscreen)el.requestFullscreen(); });
    click('btn-wipe',()=>{localStorage.clear();location.reload();});
    click('btn-name-ok',()=>{
      const n=(document.getElementById('name-input').value||'PIP').toUpperCase().slice(0,12);
      STALE_Settings.data.pilotName=n; STALE_Settings.save();
      const dev=this.isDevName(n);
      STALE_Board.add({name:n,dev:dev,...this._pendingScore});
      if(dev){ STALE_Settings.data.unlocked=STALE_LEVELS.length; STALE_Settings.save(); this.toast('DEV MODE 👑 — all levels open!'); }
      this.toMenu();
    });
    const S=STALE_Settings.data;
    const bind=(id,vid,key)=>document.getElementById(id).addEventListener('input',e=>{S[key]=+e.target.value;document.getElementById(vid).textContent=e.target.value;STALE_Audio.applyVolumes();STALE_Audio.play('ui');STALE_Settings.save();});
    bind('s-master','v-master','master'); bind('s-music','v-music','music'); bind('s-sfx','v-sfx','sfx');
    document.getElementById('s-shake').addEventListener('change',e=>{S.shake=e.target.checked;STALE_Settings.save();});
    document.getElementById('s-particles').addEventListener('change',e=>{S.particles=e.target.checked;STALE_Settings.save();});
    document.getElementById('s-timer').addEventListener('change',e=>{S.timer=e.target.checked;STALE_Settings.save();});
    document.getElementById('s-flash').addEventListener('change',e=>{S.flash=e.target.checked;STALE_Settings.save();});
    document.getElementById('s-mode').addEventListener('change',e=>{S.mode=e.target.value;STALE_Settings.save();this.toast('Mode: '+S.mode);});
    document.getElementById('s-controls').addEventListener('change',e=>{S.controls=e.target.value;STALE_Settings.save();this.updateTouchUI();this.toast('Controls: '+e.target.value);});
    this.bindTouch();
  },
  // ---------- device detect + control mode (for BlockForge branch too: see window.STALE_Device) ----------
  detectTouch(){
    try{
      if('ontouchstart' in window && window.ontouchstart!==undefined) return true;
      if(typeof navigator!=='undefined' && navigator.maxTouchPoints>0) return true;
      if(window.matchMedia && matchMedia('(pointer:coarse)').matches) return true;
    }catch(e){}
    return false;
  },
  touchMode(){
    const c=STALE_Settings.data.controls||'auto';
    if(c==='mobile') return true;
    if(c==='pc') return false;
    return this.device.touch;
  },
  updateTouchUI(){
    const tc=document.getElementById('touch');
    const mob=this.touchMode();
    if(tc) tc.style.display=(mob && this.state==='play' && !this.paused)?'flex':'none';
    // lets CSS move the dialogue box out of the way on touch layouts
    document.getElementById('stage').classList.toggle('touch',mob);
  },
  cycleJam(){
    const jams=(this.level&&this.level.jams)||['berry'];
    const i=jams.indexOf(STALE_Player.jamSel);
    STALE_Player.jamSel=jams[(i+1)%jams.length];
    STALE_Audio.play('ui');
  },
  bindTouch(){
    // touch controls live UNDER the game box (never covering gameplay).
    // Move: ◀ ▶ | jam, erase-toggle, dash, jump. Paint by dragging the canvas.
    const tc=document.createElement('div'); tc.id='touch';
    tc.innerHTML='<div class="tcluster"><button id="t-l">◀</button><button id="t-r">▶</button></div>'+
      '<div class="tcluster"><button id="t-jam" title="swap jam">🍓</button><button id="t-erase" title="erase toggle">🧽</button><button id="t-dash" title="dash">⚡</button><button id="t-j">⤒</button></div>';
    const st=document.getElementById('stage');
    if(st.after) st.after(tc); else st.appendChild(tc);
    const on=(id,down,up)=>{
      const el=document.getElementById(id);
      // mobile browsers fire a synthetic mousedown after touchend — ignore mouse
      // input for a beat after any touch so one tap never triggers twice
      el.addEventListener('touchstart',e=>{e.preventDefault();this._lastTouch=Date.now();STALE_Audio.init();down();},{passive:false});
      el.addEventListener('touchend',e=>{e.preventDefault();this._lastTouch=Date.now();if(up)up();});
      el.addEventListener('touchcancel',()=>{if(up)up();});
      el.addEventListener('pointercancel',()=>{if(up)up();});
      el.addEventListener('mousedown',e=>{if(Date.now()-(this._lastTouch||0)<600)return;e.preventDefault();STALE_Audio.init();down();});
      el.addEventListener('mouseup',e=>{if(Date.now()-(this._lastTouch||0)<600)return;e.preventDefault();if(up)up();});
      el.addEventListener('mouseleave',()=>{if(up)up();});
    };
    on('t-l',()=>this.keys.left=true,()=>this.keys.left=false);
    on('t-r',()=>this.keys.right=true,()=>this.keys.right=false);
    on('t-j',()=>{this.keys.jump=true;this.keys.up=true;},()=>{this.keys.up=false;});
    on('t-dash',()=>{this.keys.dash=true;});
    on('t-jam',()=>{this.cycleJam(); this.syncJamBtn();});
    on('t-erase',()=>{
      this.eraseHeld=!this.eraseHeld;
      document.getElementById('t-erase').classList.toggle('on',this.eraseHeld);
      this.toast(this.eraseHeld?'Erase mode: drag to scrub 🧽':'Paint mode 🖌');
    });
    this.syncJamBtn();
    this.updateTouchUI();
  },
  syncJamBtn(){
    const b=document.getElementById('t-jam'); if(!b) return;
    b.textContent={berry:'🍓',mint:'🌿',choco:'🍫'}[STALE_Player.jamSel]||'🍓';
  },
  startPlay(i){
    STALE_Audio.init();
    this.loadLevel(i||0);
    STALE_Audio.playTrack(this.level.boss?'boss':'play');
    this.state='play'; window._STATE='play'; this.paused=false;
    this.show(null); document.getElementById('hud').classList.remove('hidden');
    this.updateTouchUI();
  },

  bindInput(){
    const k=this.keys;
    const typing=(e)=>e.target && e.target.tagName && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName);
    addEventListener('keydown',e=>{
      if(typing(e)) return; // don't steal keys while typing initials
      STALE_Audio.init();
      if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Space'].includes(e.code)) e.preventDefault();
      if(e.code==='ArrowLeft'||e.code==='KeyA')k.left=true;
      if(e.code==='ArrowRight'||e.code==='KeyD')k.right=true;
      if(e.code==='ArrowUp'||e.code==='KeyW'||e.code==='Space'){k.up=true; if(!e.repeat)k.jump=true;}
      if(e.code==='ShiftLeft'||e.code==='ShiftRight'||e.code==='KeyK')k.dash=true;
      if(e.code==='Digit1')k.j1=true; if(e.code==='Digit2')k.j2=true; if(e.code==='Digit3')k.j3=true;
      if(e.code==='KeyE')this.eraseHeld=true;
      if(e.code==='KeyP'||e.code==='Escape')this.togglePause();
      if(e.code==='KeyM'){STALE_Audio.muted=!STALE_Audio.muted;STALE_Audio.applyVolumes();}
      // boot skipping
      if(this.state==='logo'||this.state==='title'){this.advanceBoot();}
      // intro: mashing ANY game key skips to menu (keys do nothing during the cartoon)
      if(this.state==='cutscene' && (this.cutLock||0)<=0 && (e.code==='KeyS'||e.code==='Enter'||e.code==='Space'||e.code==='ArrowRight'||e.code==='ArrowLeft'||e.code==='KeyA'||e.code==='KeyD'||e.code==='KeyW'||e.code==='ArrowUp'))STALE_Cutscene.skip();
      if(e.repeat)return;
    });
    addEventListener('keyup',e=>{
      if(typing(e)) return;
      if(e.code==='ArrowLeft'||e.code==='KeyA')k.left=false;
      if(e.code==='ArrowRight'||e.code==='KeyD')k.right=false;
      if(e.code==='ArrowUp'||e.code==='KeyW'||e.code==='Space')k.up=false;
      if(e.code==='ShiftLeft'||e.code==='ShiftRight'||e.code==='KeyK')k.dash=false;
      if(e.code==='Digit1')k.j1=false; if(e.code==='Digit2')k.j2=false; if(e.code==='Digit3')k.j3=false;
      if(e.code==='KeyE')this.eraseHeld=false;
    });
    addEventListener('blur',()=>this.clearKeys()); // alt-tab can strand held keys
    const cv=this.canvas;
    const pos=e=>{
      const r=cv.getBoundingClientRect();
      const cx=(e.touches?e.touches[0].clientX:e.clientX), cy=(e.touches?e.touches[0].clientY:e.clientY);
      return {x:(cx-r.left)/r.width*960, y:(cy-r.top)/r.height*540};
    };
    const wpos=(sx,sy)=>({x:sx+this.cam.x, y:sy+this.cam.y});
    cv.addEventListener('mousedown',e=>{
      STALE_Audio.init();
      if(this.state==='logo'||this.state==='title'){this.advanceBoot();return;}
      if(this.state!=='play'||this.paused)return;
      const p=pos(e); window._MOUSE={...p,down:true};
      const w=wpos(p.x,p.y);
      if(e.button===2||this.eraseHeld) STALE_Paint.erase(w.x,w.y,this);
      else if(!STALE_Paint.start(w.x,w.y,STALE_Player.jamSel)) this.toast('Out of jam! Grab ✨ sprinkles!');
    });
    cv.addEventListener('mousemove',e=>{
      const p=pos(e); const w=wpos(p.x,p.y);
      window._MOUSE={...p,down:window._MOUSE.down};
      if(this.state!=='play')return;
      if(e.buttons===2||this.eraseHeld&&e.buttons) STALE_Paint.erase(w.x,w.y,this);
      else if(window._MOUSE.down||e.buttons===1) STALE_Paint.drag(w.x,w.y);
    });
    addEventListener('mouseup',()=>{ window._MOUSE.down=false; STALE_Paint.finish(); });
    cv.addEventListener('contextmenu',e=>e.preventDefault());
    // touch paint / erase (🧽 toggle puts the finger into scrub mode)
    cv.addEventListener('touchstart',e=>{
      if(this.state!=='play')return;
      const p=pos(e);
      e.preventDefault();
      const w=wpos(p.x,p.y);
      window._MOUSE={...p,down:true};
      if(this.eraseHeld) STALE_Paint.erase(w.x,w.y,this);
      else if(!STALE_Paint.start(w.x,w.y,STALE_Player.jamSel)) this.toast('Out of jam! Grab ✨ sprinkles!');
    },{passive:false});
    cv.addEventListener('touchmove',e=>{
      if(this.state!=='play')return;
      e.preventDefault();
      const p=pos(e); const w=wpos(p.x,p.y);
      window._MOUSE={...p,down:true};
      if(this.eraseHeld) STALE_Paint.erase(w.x,w.y,this);
      else STALE_Paint.drag(w.x,w.y);
    },{passive:false});
    cv.addEventListener('touchend',()=>{window._MOUSE.down=false;STALE_Paint.finish();});
    addEventListener('pointerdown',()=>{ if(this.state==='logo'||this.state==='title')this.advanceBoot(); });
  },
  togglePause(){
    if(this.state!=='play')return;
    this.paused=!this.paused;
    if(this.paused){this.show('screen-pause');}else{this.show(null);document.getElementById('hud').classList.remove('hidden');}
  },
  advanceBoot(){
    if(this.state==='logo'){ this.state='title'; window._STATE='title'; this.stateT=0; this.show('screen-title'); }
    else if(this.state==='title'){
      this.state='cutscene'; window._STATE='cutscene'; this.stateT=0;
      this.show('screen-cut'); STALE_Cutscene.sceneI=0; STALE_Cutscene.start();
      this.cutLock=0.8; // same keypress that entered must not instantly skip
    }
  },

  // ---------- loop ----------
  last:0,
  loop(ms){
    requestAnimationFrame(t=>this.loop(t));
    const dt=Math.min(0.033,(ms-this.last)/1000||0.016); this.last=ms;
    const ctx=this.ctx, W=960,H=540, t=ms/1000;
    // state timers
    if(this.state==='logo'){ this.stateT+=dt; if(this.stateT>2.6) this.advanceBoot(); return; }
    if(this.state==='title'){ this.stateT+=dt; if(this.stateT>4) this.advanceBoot(); return; }
    if(this.state==='cutscene'){ this.cutLock=Math.max(0,(this.cutLock||0)-dt); STALE_Cutscene.update(dt); STALE_Cutscene.draw(ctx,W,H); return; }
    if(this.state!=='play'||this.paused){
      if(this.state==='play'&&this.paused) this.drawPlay(ctx,t);
      return;
    }
    this.update(dt); this.drawPlay(ctx,t);
  },
  update(dt){
    const P=STALE_Player;
    P.update(dt,this);
    STALE_Paint.update(dt);
    STALE_Enemies.update(dt,this);
    // camera
    const tx=Math.max(0,Math.min(this.level.W-960, P.x-430));
    this.cam.x+=(tx-this.cam.x)*Math.min(1,dt*6);
    this.cam.y=0;
    // erase keys reset single-frame
    this.keys.j1=false;this.keys.j2=false;this.keys.j3=false;
    if(!this.keys.up) {} // hold
    this.keys.jump=this.keys.jump; // consumed in player
    // sprinkles
    for(const s of this.sprinkles){
      if(!s.taken && Math.hypot(P.x-s.x,P.y-s.y)<34){ s.taken=true; P.sprGot++; P.splatHappy=0.6; STALE_Paint.ink=Math.min(100,STALE_Paint.ink+22); STALE_Audio.play('pickup'); this.spawnPoof(s.x,s.y,'#ffd23f'); this.spawnFloat(s.x,s.y-26,'+JAM','#ff9ebc'); }
    }
    // NPCs: walk up for a chat + gift
    for(const n of this.npcs){
      n.t+=dt;
      if(!n.talked && Math.abs(P.x-n.x)<90 && Math.abs(P.y-n.y)<110 && this.dlgT<=0){
        n.talked=true;
        this.dialog(n.type==='pretzel'?'Auntie Pretzel 🥨':(n.type==='sage'?'Sage Shroom 🍄':(n.type==='berryBlue'?'Blue 🫐':'Razz 🍓')), n.text, 6);
        STALE_Paint.ink=STALE_Paint.max; P.hearts=3; P.splatHappy=1;
        STALE_Audio.play('pickup');
        this.spawnFloat(n.x,n.y-70,'FULL JAM! ❤','#7bd389');
        this.toast('NPC gift: jam refilled + hearts restored!');
      }
    }
    // signs
    for(const g of this.level.signs){
      if(Math.abs(P.x-g.x)<70 && Math.abs(P.y-g.y)<90 && this.dlgT<=0) this.dialog('Splat 💦',g.text,3.5);
    }
    // GREAT MOLD spore gate: 2 at a time, 20 total, only near the arena
    if(this.gate && !this.gate.open){
      const gt=this.gate;
      // safety: a gate spore that somehow falls out of the world still counts (no soft-locks)
      for(const e of STALE_Enemies.list){
        if(e.type==='spore' && e.gate && !e.dead && e.y>800){ e.dead=true; this.onSporeDown(e,true); }
      }
      const alive=STALE_Enemies.list.filter(e=>e.type==='spore' && !e.dead).length;
      gt.spawnT-=dt;
      if(gt.spawned<gt.total && alive<gt.batch && gt.spawnT<=0 && P.x>gt.def.nearX){
        gt.spawnT=0.8;
        while(gt.spawned<gt.total && STALE_Enemies.list.filter(e=>e.type==='spore' && !e.dead).length<gt.batch){
          const sx=gt.def.spawnX[gt.spawned%gt.def.spawnX.length];
          STALE_Enemies.list.push({type:'spore',x:sx,y:250,w:18,h:18,vx:(gt.spawned%2?120:-120),vy:-200,t:0,dead:false,ph:Math.random()*6,gate:true});
          gt.spawned++;
        }
        if(gt.spawned===gt.batch) this.toast('Spores incoming! Stomp them! 👁');
      }
    }
    // checkpoint (fixed safe spot per level — never over a gap)
    if(!this.cpGiven && P.x>this.level.W/2){
      this.checkpoint={x:this.level.checkpoint.x,y:this.level.checkpoint.y};
      this.cpGiven=true; this.toast('Checkpoint! ✨');
    }
    // boss roar when Pip first enters the arena
    if(this.level.boss && !this.roared && P.x>this.level.bossArena.x-350){
      this.roared=true; this.shake(12); STALE_Audio.play('boss');
      this.toast((this.level.bossName||'KING MOLD')+': WHO DARES ENTER?! 👑');
      const b=STALE_Enemies.list.find(e=>e.type==='boss');
      if(b && b.onG){ b.vy=-520; b.onG=false; }
    }
    // exit (boss level locked until KING dead)
    if(P.overlap(P,this.exit)){
      if(this.level.boss && STALE_Enemies.list.some(e=>e.type==='boss'&&!e.dead)){ this.toast('The ROAR holds the door! Kill KING MOLD! 👑'); P.x-=60; }
      else this.levelComplete();
      return;
    }
    // soda death
    if(this.level.soda && P.y>500 && P.onGround===false){}
    // particles + floats
    for(const p of this.parts){ p.t-=dt; p.x+=p.vx*dt; p.y+=p.vy*dt; p.vy+=(p.conf?500:900)*dt; if(p.ring) p.r+=p.vr*dt; }
    this.parts=this.parts.filter(p=>p.t>0);
    for(const f of this.floats) f.t+=dt;
    this.floats=this.floats.filter(f=>f.t<f.life);
    // toast/dialog timers
    this.toastT-=dt; if(this.toastT<=0) document.getElementById('toast').classList.add('hidden');
    this.dlgT-=dt; if(this.dlgT<=0) document.getElementById('dialog').classList.add('hidden');
    // dash key single-press
    if(this.keys.dash) this._dashHeld=true;
    // HUD
    document.getElementById('hearts').textContent='❤'.repeat(Math.max(0,P.hearts))+'🖤'.repeat(Math.max(0,3-P.hearts));
    document.getElementById('jam').style.width=STALE_Paint.ink+'%';
    document.getElementById('jam-label').textContent=`${STALE_Paint.JAMS[P.jamSel].name} ${P.jamSel} (1·2·3)`;
    document.getElementById('spr').textContent='✨ '+P.sprGot;
    document.getElementById('timer').style.display=STALE_Settings.data.timer?'block':'none';
    if(this._lastJam!==P.jamSel){ this._lastJam=P.jamSel; this.syncJamBtn(); }
    document.getElementById('timer').textContent=STALE_Board.fmt(P.time);
  },
  drawPlay(ctx,t){
    const P=STALE_Player;
    ctx.save();
    if(this.shakeT>0){ this.shakeT-=1/60; ctx.translate((Math.random()-0.5)*this.shakeM,(Math.random()-0.5)*this.shakeM); }
    STALE_Render.bg(ctx,960,540,t,this.level.dark);
    // soda
    if(this.level.soda){ ctx.fillStyle='#7ce7f488'; ctx.fillRect(0,500-this.cam.y,960,60); ctx.fillStyle='#2aa'; ctx.font='bold 14px cursive'; ctx.fillText('~~~ SODA (bouncy Mint helps!) ~~~',330,522); }
    STALE_Render.solids(ctx,this.solids(),this.cam,t);
    STALE_Render.mold(ctx,this.moldWalls,this.cam,t);
    STALE_Render.paint(ctx,this);
    STALE_Render.sprinkles(ctx,this.sprinkles,this.cam,t);
    // signs
    ctx.font='22px serif';
    for(const g of this.level.signs){ ctx.fillText('🪧',g.x-this.cam.x,g.y-this.cam.y); }
    STALE_Render.exitDoor(ctx,this.exit,this.cam,t);
    STALE_Render.enemies(ctx,STALE_Enemies.list,this.cam,t);
    // GREAT MOLD counter above the gate
    if(this.gate && !this.gate.open){
      const gx=this.gate.def.x+this.gate.def.w/2-this.cam.x;
      ctx.font='bold 18px "Comic Sans MS",cursive'; ctx.textAlign='center';
      ctx.lineWidth=4; ctx.strokeStyle='#3a2c1c';
      ctx.strokeText('👁 '+this.gate.defeated+'/'+this.gate.total, gx, this.gate.def.top-this.cam.y-12);
      ctx.fillStyle='#ffd23f';
      ctx.fillText('👁 '+this.gate.defeated+'/'+this.gate.total, gx, this.gate.def.top-this.cam.y-12);
    }
    STALE_Render.npcs(ctx,this.npcs,this.cam,t,P);
    STALE_Render.player(ctx,P,this.cam,t);
    STALE_Render.floats(ctx,this.floats,this.cam);
    // particles
    for(const p of this.parts){
      const px=p.x-this.cam.x, py=p.y-this.cam.y;
      if(p.ring){
        const k=1-p.t/p.life;
        ctx.globalAlpha=Math.max(0,p.t/p.life); ctx.strokeStyle=p.c; ctx.lineWidth=3;
        ctx.beginPath(); ctx.arc(px,py,p.r,0,7); ctx.stroke(); ctx.globalAlpha=1; continue;
      }
      if(p.conf){
        ctx.globalAlpha=Math.min(1,p.t); ctx.fillStyle=p.c;
        ctx.fillRect(px+Math.sin(p.t*12+p.ph)*9,py,5,3); ctx.globalAlpha=1; continue;
      }
      ctx.globalAlpha=Math.max(0,p.t*2); ctx.fillStyle=p.c; ctx.fillRect(px,py,4,4); ctx.globalAlpha=1;
    }
    // darkness mask
    if(this.level.dark){
      const gx=P.x-this.cam.x+15, gy=P.y-this.cam.y+19;
      const gr=ctx.createRadialGradient(gx,gy,60,gx,gy,320);
      gr.addColorStop(0,'rgba(0,0,0,0)'); gr.addColorStop(1,'rgba(5,8,20,0.88)');
      ctx.fillStyle=gr; ctx.fillRect(0,0,960,540);
    }
    ctx.restore();
  }
};
addEventListener('load',()=>STALE_Game.init());

// Mobile detector API — reuse this in your BlockForge branch:
//   STALE_Device.isTouch() → true if the device has touch/coarse pointer
//   STALE_Device.mode()   → 'mobile' or 'pc' (respects Settings → Controls switch)
window.STALE_Device = {
  isTouch(){ try{ return !!(STALE_Game.device && STALE_Game.device.touch); }catch(e){ return false; } },
  mode(){ try{ return STALE_Game.touchMode()?'mobile':'pc'; }catch(e){ return 'pc'; } }
};
