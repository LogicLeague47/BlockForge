window.STALE_Enemies = {
  list:[],
  reset(spawns){
    this.list = spawns.map(s=>({
      type:s.type, x:s.x, y:s.y,
      w:s.type==='gulper'?44:(s.type==='shroom'?30:32), h:s.type==='gulper'?40:(s.type==='shroom'?32:28),
      vx:s.type==='crawler'?70:(s.type==='shroom'?60:0), vy:0, t:Math.random()*5, dead:false, ph:Math.random()*6,
      hp: s.type==='boss'?5:1, hop:1+Math.random()
    }));
    if(window._BOSS){ this.list.push(window._BOSS); window._BOSS=null; }
  },
  update(dt,g){
    const P=STALE_Player;
    for(const e of this.list){
      if(e.dead) continue;
      e.t+=dt; e.ph+=dt;
      if(e.type==='crawler'){
        e.x+=e.vx*dt;
        // turn at edges/walls (sample solids)
        const ahead={x:e.x+(e.vx>0?e.w+4:-4),y:e.y+e.h+6,w:4,h:10};
        let ground=false;
        for(const s of g.solids()){ if(P.overlap(ahead,s)){ground=true;break;} }
        if(!ground) e.vx*=-1;
        if(e.x<20||e.x>g.level.W-40) e.vx*=-1;
        // gravity
        e.vy=(e.vy||0)+1800*dt;
        e.y+=e.vy*dt;
        for(const s of g.solids()){ if(P.overlap(e,s)){ if(e.vy>0){e.y=s.y-e.h;e.vy=0;} } }
      } else if(e.type==='bat'){
        e.baseY=e.baseY||e.y; e.baseX=e.baseX||e.x;
        e.x=e.baseX+Math.sin(e.ph*0.9)*120; e.y=e.baseY+Math.sin(e.ph*2.2)*40;
      } else if(e.type==='gulper'){
        e.vy=(e.vy||0)+2000*dt; e.y+=e.vy*dt;
        for(const s of g.solids()){ if(P.overlap(e,s)){ if(e.vy>0){e.y=s.y-e.h;e.vy=0; if(e.t>1.6){e.vy=-650;e.t=0;STALE_Audio.play('jump');}} } }
      } else if(e.type==='shroom'){
        // mushroom hopper: wanders like a crawler, then BOINGs high
        e.x+=e.vx*dt;
        const ahead={x:e.x+(e.vx>0?e.w+4:-4),y:e.y+e.h+6,w:4,h:10};
        let ground=false;
        for(const s of g.solids()){ if(P.overlap(ahead,s)){ground=true;break;} }
        if(!ground) e.vx*=-1;
        if(e.x<20||e.x>g.level.W-40) e.vx*=-1;
        e.vy=(e.vy||0)+1800*dt;
        e.y+=e.vy*dt;
        let grounded=false;
        for(const s of g.solids()){ if(P.overlap(e,s)){ if(e.vy>0){e.y=s.y-e.h;e.vy=0;grounded=true;} } }
        e.hop-=dt;
        if(grounded && e.hop<=0){ e.vy=-620; e.hop=1.6+Math.random(); }
      } else if(e.type==='spore'){
        e.x+=e.vx*dt; e.y+=e.vy*dt; e.vy+=300*dt;
        // spores land on the world (no more falling through floors)
        for(const s of g.solids()){
          if(P.overlap(e,s)){ if(e.vy>0){ e.y=s.y-e.h; e.vy=0; } if(e.vy===0) e.vx*=Math.max(0,1-3*dt); }
        }
        if(e.t>6 && !e.gate) e.dead=true; // gate spores never fizzle (they must be stomped)
      } else if(e.type==='boss'){
        this.bossUpdate(e,dt,g);
      }
      // interact with player (crawlers, bats AND gulpers are all stompable!)
      if(!e.dead && e.type!=='spore' && e.type!=='boss'){
        if(P.overlap(P,e)){
          const stomp = P.vy>150 && (P.y+P.h)-e.y < 24;
          if(stomp){ e.dead=true; P.vy=-620; g.onStomp(e); }
          else P.hurt(g);
        }
      }
      if(e.type==='spore' && !e.dead && P.overlap(P,e)){ P.hurt(g); e.dead=true; g.onSporeDown(e,true); }
      // spore vs boss bounce-back? stomping spore kills it
      if(e.type==='spore' && !e.dead && P.vy>150 && P.overlap(P,e)){ e.dead=true; P.vy=-500; g.onSporeDown(e); }
    }
    this.list=this.list.filter(e=>!e.dead||e.type==='boss');
  },
  bossUpdate(b,dt,g){
    const P=STALE_Player;
    b.cool=(b.cool||2)-dt;
    // hop toward player
    if(b.onG){
      b.vx=Math.sign(P.x-b.x)*140;
      if(b.cool<=0){ b.vy=-560; b.onG=false; b.cool=1.6+Math.random(); STALE_Audio.play('boss'); g.shake(6); }
    }
    b.vy=(b.vy||0)+1800*dt;
    b.x+= (b.vx||0)*dt; b.y+=b.vy*dt;
    for(const s of g.solids()){ if(STALE_Player.overlap(b,s)){ if(b.vy>0){b.y=s.y-b.h;b.vy=0;
      if(!b.onG){ b.onG=true; b.tired=1.4; g.shake(12); g.spawnPoof(b.x+b.w/2,b.y+b.h,'#555');
        const A=g.level.bossArena;
        if(b.king==='shroom'){
          // Mushroom King: summons 2 hoppers + every 3rd slam calls SPORE RAIN
          for(let i=0;i<2;i++) this.list.push({type:'shroom',x:b.x+b.w/2+(i?40:-40),y:b.y-10,w:30,h:32,vx:(i?130:-130),vy:-320,t:0,dead:false,ph:Math.random()*6,hop:1});
          b.rains=(b.rains||0)+1;
          if(b.rains%3===0 && A){
            for(let i=0;i<6;i++) this.list.push({type:'spore',x:A.x+60+Math.random()*(A.w-120),y:70,w:18,h:18,vx:(Math.random()-0.5)*120,vy:60,t:0,dead:false,ph:Math.random()*6});
            g.toast('☔ SPORE RAIN! Keep moving!');
          }
          if(Math.random()<0.6 && STALE_Paint.eraseStroke()) g.toast('The King composted your jam!!');
        } else {
          // Mold King: classic spore burst + jam eraser
          for(let i=0;i<3;i++) this.list.push({type:'spore',x:b.x+b.w/2,y:b.y,w:18,h:18,vx:(Math.random()-0.5)*360,vy:-350,t:0,dead:false,ph:0});
          if(Math.random()<0.6 && STALE_Paint.eraseStroke()) g.toast('King Mold ERASED your jam!!');
        }
      }
    }}}
    if(b.tired>0){
      b.tired-=dt; b.vx=0;
      // stompable while tired
      if(STALE_Player.overlap(P,b)){
        const stomp=P.vy>100&&(P.y+P.h)-b.y<30;
        if(stomp){ b.hp--; P.vy=-750; STALE_Audio.play('stomp'); g.shake(14); g.spawnPoof(b.x+40,b.y,'#ff0');
          const title=b.title||'KING';
          g.spawnFloat(b.x+b.w/2,b.y-28, b.hp>0?('OUCH! '+b.hp+' left!'):'KING DOWN!','#ffd23f');
          g.toast(b.hp>0?(title+' OUCH! '+b.hp+' left!'):(title+' DOWN!'));
          b.inv=1; if(b.hp<=0){ b.dead=true; g.onBossDown(); } }
        else if((b.inv||0)<=0) P.hurt(g);
      }
    } else if(STALE_Player.overlap(P,b) && (b.inv||0)<=0){ P.hurt(g); }
    b.inv=Math.max(0,(b.inv||0)-dt);
    // clamp arena
    const A=g.level.bossArena; if(A){ if(b.x<A.x)b.x=A.x; if(b.x+b.w>A.x+A.w)b.x=A.x+A.w-b.w; }
  }
};
