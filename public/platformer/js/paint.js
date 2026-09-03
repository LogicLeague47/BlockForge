window.STALE_Paint = {
  strokes:[], dabs:[], cur:null, ink:100, max:100,
  JAMS:{ berry:{color:'#ff5d8f',name:'🍓'}, mint:{color:'#2ee6a8',name:'🌿'}, choco:{color:'#8a5a2b',name:'🍫'} },
  reset(){ this.strokes=[]; this.dabs=[]; this.cur=null; this.ink=this.max; },
  inkCost(){ return STALE_Settings.data.mode==='chill'?0.55:1; },
  start(x,y,jam){
    if(this.ink<8) return false;
    this.cur={jam, pts:[{x,y}], len:0};
    STALE_Audio.play('paint');
    return true;
  },
  drag(x,y){
    if(!this.cur) return;
    const l=this.cur.pts[this.cur.pts.length-1];
    const d=Math.hypot(x-l.x,y-l.y);
    if(d<9) return;
    const cost=d*0.09*this.inkCost();
    if(this.ink-cost<0 || this.cur.len>520){ this.finish(); return; }
    this.ink-=cost; this.cur.len+=d;
    this.cur.pts.push({x,y});
    // add dab for collision + render
    this.dabs.push({x,y,r:9,jam:this.cur.jam});
    if(Math.random()<0.5) STALE_Audio.play('paint');
  },
  finish(){
    if(this.cur && this.cur.pts.length>1) this.strokes.push(this.cur);
    this.cur=null;
  },
  erase(x,y,g){
    let changed=false;
    // erase own dabs
    const before=this.dabs.length;
    this.dabs=this.dabs.filter(d=>Math.hypot(d.x-x,d.y-y)>26);
    if(this.dabs.length<before){ changed=true; this.ink=Math.min(this.max,this.ink+6); }
    // erase mold walls
    for(const m of g.moldWalls){
      if(x>m.x-10&&x<m.x+m.w+10&&y>m.y-10&&y<m.y+m.h+10){
        m.hp-=1; changed=true; this.ink=Math.max(0,this.ink-4);
        g.spawnPoof(x,y,'#888');
        if(m.hp<=0){ g.moldWalls=g.moldWalls.filter(z=>z!==m); g.toast('Mold scrubbed! +jam'); this.ink=Math.min(this.max,this.ink+25); STALE_Audio.play('stomp'); }
        break;
      }
    }
    if(changed) STALE_Audio.play('erase');
  },
  eraseStroke(){ // boss erases one of your strokes, lol
    if(this.dabs.length>10){ this.dabs.splice(0, Math.floor(this.dabs.length*0.3)); return true; }
    return false;
  },
  update(dt){
    // No passive regen: jam only refills between rounds (loadLevel reset),
    // via ✨ sprinkles, stomps, and mold-scrubs. Just clamp.
    if(this.ink>this.max) this.ink=this.max;
    if(this.ink<0) this.ink=0;
  }
};
