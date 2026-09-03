window.STALE_Player = {
  x:80,y:300,w:30,h:38, vx:0,vy:0, face:1, onGround:false, coyote:0, buffer:0,
  hearts:3, inv:0, dashCD:0, dashT:0, jamSel:'berry', dead:false,
  sprGot:0, time:0, deaths:0, sticky:false,
  blinkT:2, landT:0, stepT:0, splatHappy:0, combo:0, comboT:0, wasAir:false, dustT:0,
  reset(sx,sy){ this.x=sx;this.y=sy;this.vx=0;this.vy=0;this.hearts=3;this.inv=0;this.dashCD=0;this.dashT=0;this.dead=false;this.sprGot=0;this.time=0; this.jamSel='berry'; this.blinkT=2;this.landT=0;this.stepT=0;this.splatHappy=0;this.combo=0;this.comboT=0;this.wasAir=false;this.dustT=0; },
  hurt(g){
    if(this.inv>0||this.dead) return;
    this.hearts--; this.inv=1.4; STALE_Audio.play('hurt'); g.shake(10);
    this.vy=-500; this.vx=(this.face*-260);
    if(this.hearts<=0){ this.dead=true; g.onDeath(); }
  },
  update(dt, g){
    // NaN guard: a non-finite position would make Pip invisible + immobile
    if(!isFinite(this.x+this.y+this.vx+this.vy)){ this.x=g.checkpoint.x; this.y=g.checkpoint.y; this.vx=0; this.vy=0; }
    const k=g.keys;
    const ACC=2600, MAX=265, GRAV=2300, JUMP=760;
    let move=0;
    if(k.left)move-=1; if(k.right)move+=1;
    if(move!==0) this.face=move;
    // dash
    this.dashCD-=dt; this.inv-=dt; this.coyote-=dt; this.buffer-=dt;
    if(g.level.dash && k.dash && this.dashCD<=0 && this.dashT<=0){
      this.dashT=0.16; this.dashCD=0.9; STALE_Audio.play('dash');
      g.spawnPoof(this.x,this.y,'#ffd23f'); k.dash=false;
    }
    if(this.dashT>0){
      this.dashT-=dt; this.vx=this.face*640; this.vy=0;
    } else {
      if(move!==0) this.vx+=move*ACC*dt;
      else this.vx*=Math.pow(0.0001,dt);
      this.vx=Math.max(-MAX,Math.min(MAX,this.vx));
      this.vy+=GRAV*dt; if(this.vy>1100)this.vy=1100;
    }
    if(k.jump){ this.buffer=0.13; k.jump=false; }
    if(this.onGround) this.coyote=0.11;
    if(this.buffer>0 && this.coyote>0){
      this.vy=-JUMP; this.onGround=false; this.coyote=0; this.buffer=0;
      STALE_Audio.play('jump'); g.spawnPoof(this.x+this.w/2,this.y+this.h,'#fff');
    }
    // variable jump
    if(!k.up && this.vy<-300 && this.dashT<=0) this.vy+=GRAV*2.2*dt;
    // integrate + collide solids
    this.sticky=false;
    const wasGrounded=this.onGround;
    this.moveCollide(dt, g);
    if(!wasGrounded && this.onGround){
      this.landT=0.18;
      g.spawnPoof(this.x+this.w/2,this.y+this.h,'#fff');
      if(g.spawnRing) g.spawnRing(this.x+this.w/2,this.y+this.h,'#fff');
    }
    this.wasAir=!this.onGround;
    // mold burns! side/head contact hurts (standing on top is safe)
    if(this.inv<=0 && !this.dead){
      const touch={x:this.x-2,y:this.y-2,w:this.w+4,h:this.h+4};
      for(const m of g.moldWalls){
        if(this.overlap(touch,m) && (this.y+this.h) > m.y+14){
          this.face = (this.x+this.w/2 < m.x+m.w/2) ? 1 : -1; // face it, hurt() knocks us away
          this.hurt(g);
          break;
        }
      }
    }
    // animation clocks
    this.landT-=dt; this.splatHappy-=dt; this.comboT-=dt;
    if(this.comboT<=0) this.combo=0;
    this.stepT+=dt*(0.4+Math.abs(this.vx)/160);
    this.blinkT-=dt; if(this.blinkT<=0) this.blinkT=2+Math.random()*2.5;
    // run dust puffs
    if(this.onGround && Math.abs(this.vx)>180){
      this.dustT-=dt;
      if(this.dustT<=0){ this.dustT=0.12; g.spawnPoof(this.x+this.w/2-this.face*10,this.y+this.h,'#cbb98f'); }
    } else this.dustT=0;
    this.time+=dt;
    // fall
    if(this.y>760){ this.dead=true; g.onDeath(); }
    // jam select
    if(k.j1)this.jamSel='berry'; if(k.j2&&g.level.jams.includes('mint'))this.jamSel='mint'; if(k.j3&&g.level.jams.includes('choco'))this.jamSel='choco';
  },
  moveCollide(dt,g){
    const solids=g.solids();
    // X
    this.x+=this.vx*dt;
    this.onGround=false;
    let r={x:this.x,y:this.y,w:this.w,h:this.h};
    for(const s of solids.concat(g.paintSolids())){
      if(this.overlap(r,s)){
        if(this.vx>0) this.x=s.x-this.w; else if(this.vx<0) this.x=s.x+s.w;
        this.vx = (s.jam==='mint') ? -this.vx*0.6 : 0;
        r={x:this.x,y:this.y,w:this.w,h:this.h};
      }
    }
    // Y
    this.y+=this.vy*dt;
    r={x:this.x,y:this.y,w:this.w,h:this.h};
    for(const s of solids.concat(g.paintSolids())){
      if(this.overlap(r,s)){
        if(this.vy>0){
          this.y=s.y-this.h;
          if(s.jam==='mint'){ this.vy=-1050; this.onGround=false; STALE_Audio.play('bounce'); g.spawnPoof(this.x+15,s.y,'#7bf'); g.shake(3); }
          else { this.vy=0; this.onGround=true; }
        } else if(this.vy<0){ this.y=s.y+s.h; this.vy=0; }
        r={x:this.x,y:this.y,w:this.w,h:this.h};
      }
    }
    // choco sticky walls: touching side of choco stroke -> slow fall + climb
    if(this.jamTouch(g,'choco') && !this.onGround){
      this.sticky=true;
      if(this.vy>120) this.vy=120;
      const k=g.keys;
      if(k.up) this.vy=-220;
    }
    // paint dab circles collision (thick freeform)
    for(const d of STALE_Paint.dabs){
      const cx=Math.max(this.x,Math.min(d.x,this.x+this.w));
      const cy=Math.max(this.y,Math.min(d.y,this.y+this.h));
      const dx=d.x-cx, dy=d.y-cy;
      if(dx*dx+dy*dy < d.r*d.r){
        // push out upwards preferably
        if(this.vy>=0 && (this.y+this.h)-d.y < 18){
          this.y=d.y-d.r-this.h+6;
          if(d.jam==='mint'){ this.vy=-1050; STALE_Audio.play('bounce'); g.spawnPoof(d.x,d.y,'#7bf'); }
          else { this.vy=0; this.onGround=true; }
        } else if(d.jam==='choco'){ this.sticky=true; if(this.vy>120)this.vy=120; if(g.keys.up)this.vy=-220; }
      }
    }
  },
  jamTouch(g,jam){
    const r={x:this.x-2,y:this.y-2,w:this.w+4,h:this.h+4};
    for(const s of g.paintSolids()){ if(s.jam===jam && this.overlap(r,s)) return true; }
    return false;
  },
  overlap(a,b){ return a.x<b.x+b.w && a.x+a.w>b.x && a.y<b.y+b.h && a.y+a.h>b.y; }
};
