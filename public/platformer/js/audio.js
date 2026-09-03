window.STALE_Audio = {
  ctx:null, master:null, musicG:null, sfxG:null, musicTimer:null, muted:false,
  // real CC-BY music tracks (Kevin MacLeod, incompetech.com) — see menu credits
  tracks:{ menu:'assets/music/menu.mp3', play:'assets/music/play.mp3', boss:'assets/music/boss.mp3' },
  trackEl:null, desired:'menu', fallbackOn:false,
  init(){
    if(this.ctx){ try{ if(this.ctx.resume) this.ctx.resume(); }catch(e){} this.playTrack(this.desired); return; }
    try{
      this.ctx = new (window.AudioContext||window.webkitAudioContext)();
      try{ if(this.ctx.resume) this.ctx.resume(); }catch(e){}
      this.master = this.ctx.createGain(); this.master.connect(this.ctx.destination);
      this.musicG = this.ctx.createGain(); this.musicG.connect(this.master);
      this.sfxG = this.ctx.createGain(); this.sfxG.connect(this.master);
      this.applyVolumes();
    }catch(e){}
    this.playTrack(this.desired); // first user gesture unlocks audio
  },
  playTrack(name){
    this.desired=name;
    try{
      if(!this.trackEl){
        const A = window.Audio || function(){ throw 0; };
        this.trackEl = new A();
        this.trackEl.loop=true; this.trackEl.preload='auto';
        this.trackEl.onerror=()=>{ this.startProcedural(); }; // missing file? fall back to bleeps
      }
      const src=this.tracks[name];
      if(this.trackEl.dataset.cur!==name && src){
        this.trackEl.dataset.cur=name;
        this.trackEl.src=src;
      }
      this.updateTrackVolume();
      const pr=this.trackEl.play();
      if(pr && pr.catch) pr.catch(()=>{});
    }catch(e){ this.startProcedural(); }
  },
  updateTrackVolume(){
    if(!this.trackEl) return;
    const s = window.STALE_Settings ? STALE_Settings.data : {master:80,music:60};
    this.trackEl.volume = this.muted?0:(s.master/100)*(s.music/100)*0.9;
  },
  applyVolumes(){
    if(this.ctx){
      const s = STALE_Settings.data;
      const m = this.muted?0:s.master/100;
      this.master.gain.value = m;
      this.musicG.gain.value = (s.music/100)*0.5;
      this.sfxG.gain.value = (s.sfx/100)*0.9;
    }
    this.updateTrackVolume();
  },
  tone(freq, dur, type, vol, slide){
    if(!this.ctx) return;
    try{
      const o=this.ctx.createOscillator(), g=this.ctx.createGain();
      o.type=type||'square'; o.frequency.value=freq;
      if(slide) o.frequency.exponentialRampToValueAtTime(Math.max(30,slide), this.ctx.currentTime+dur);
      g.gain.setValueAtTime(vol||0.4, this.ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime+dur);
      o.connect(g); g.connect(this.sfxG); o.start(); o.stop(this.ctx.currentTime+dur);
    }catch(e){}
  },
  play(name){
    if(!this.ctx) return;
    const T=(f,d,t,v,s)=>this.tone(f,d,t,v,s);
    if(name==='jump') T(300,0.18,'square',0.35,700);
    else if(name==='double') T(500,0.15,'square',0.3,900);
    else if(name==='dash') T(900,0.2,'sawtooth',0.3,200);
    else if(name==='paint') T(700,0.06,'sine',0.2,900);
    else if(name==='erase') T(400,0.12,'sawtooth',0.25,100);
    else if(name==='pickup') {T(880,0.1,'sine',0.35); setTimeout(()=>T(1320,0.15,'sine',0.35),70);}
    else if(name==='stomp') T(200,0.2,'square',0.4,60);
    else if(name==='hurt') T(160,0.3,'sawtooth',0.4,60);
    else if(name==='ui') T(600,0.08,'square',0.25,800);
    else if(name==='win') {[523,659,784,1046].forEach((f,i)=>setTimeout(()=>T(f,0.25,'square',0.35),i*130));}
    else if(name==='bounce') T(250,0.25,'sine',0.4,900);
    else if(name==='boss') T(90,0.5,'sawtooth',0.5,40);
    else if(name==='door') {[392,523,659].forEach((f,i)=>setTimeout(()=>T(f,0.2,'triangle',0.35),i*100));}
  },
  startMusic(){ this.playTrack('play'); }, // legacy entry: gameplay track
  startProcedural(){
    if(!this.ctx || this.musicTimer || this.fallbackOn) return;
    this.fallbackOn=true;
    const notes=[262,294,330,392,440,392,330,294];
    let i=0;
    this.musicTimer=setInterval(()=>{
      if(STALE_Settings.data.music===0||this.muted) return;
      try{
        const o=this.ctx.createOscillator(),g=this.ctx.createGain();
        o.type='triangle'; o.frequency.value=notes[i%notes.length];
        g.gain.setValueAtTime(0.25,this.ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001,this.ctx.currentTime+0.3);
        o.connect(g);g.connect(this.musicG);o.start();o.stop(this.ctx.currentTime+0.3);
      }catch(e){}
      i++;
    },340);
  },
  stopMusic(){ clearInterval(this.musicTimer); this.musicTimer=null; try{ if(this.trackEl) this.trackEl.pause(); }catch(e){} }
};
