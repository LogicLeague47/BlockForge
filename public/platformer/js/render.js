window.STALE_Render = {
  // wobbly hand-drawn rect
  rrect(ctx,x,y,w,h,fill,stroke){
    const j=()=> (Math.random()-0.5)*2.5;
    ctx.fillStyle=fill;
    ctx.strokeStyle=stroke||'#3a2c1c'; ctx.lineWidth=3; ctx.lineJoin='round';
    ctx.beginPath();
    ctx.moveTo(x+j(),y+j());
    ctx.lineTo(x+w+j(),y+j()); ctx.lineTo(x+w+j(),y+h+j()); ctx.lineTo(x+j(),y+h+j());
    ctx.closePath(); ctx.fill(); ctx.stroke();
  },
  bg(ctx,W,H,t,dark){
    ctx.fillStyle=dark?'#1c2233':'#f7f0d8'; ctx.fillRect(0,0,W,H);
    // paper lines / coffee stains
    ctx.save(); ctx.globalAlpha=0.12; ctx.strokeStyle=dark?'#556':'#b7a67e';
    for(let y=40;y<H;y+=44){ ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
    ctx.restore();
    if(!dark){
      ctx.save(); ctx.globalAlpha=0.15;
      ctx.fillStyle='#c89b5a'; ctx.beginPath(); ctx.ellipse(830,120,60,22,-0.4,0,7); ctx.fill();
      ctx.beginPath(); ctx.ellipse(120,430,40,16,0.3,0,7); ctx.fill(); ctx.restore();
    } else {
      ctx.save();
      for(let i=0;i<40;i++){ const x=(i*173+t*8)%W, y=(i*97)%H; ctx.globalAlpha=0.7; ctx.fillStyle='#fff'; ctx.fillRect(x,y,2,2); }
      ctx.restore();
    }
  },
  solids(ctx,list,cam){
    for(const s of list){
      const x=s.x-cam.x, y=s.y-cam.y;
      if(x+s.w<-50||x>1010||y+s.h<-50||y>590) continue;
      let fill='#e8c47a';
      if(s.kind==='soda') fill='#7ce7f4';
      if(s.kind==='spawn') fill='#ffd23f';
      this.rrect(ctx,x,y,s.w,s.h,fill);
      if(s.kind==='spawn'){ ctx.font='bold 11px cursive'; ctx.fillStyle='#3a2c1c'; ctx.textAlign='center'; ctx.fillText('⭐ SPAWN',x+s.w/2,y+13); ctx.textAlign='center'; return; }
      // sprinkles on top
      ctx.fillStyle='#c8321e';
      for(let sx=s.x+10;sx<s.x+s.w-6;sx+=26){ ctx.fillRect(sx-cam.x, y+4+Math.sin(sx*0.3)*1.5, 4,4); }
    }
  },
  mold(ctx,list,cam,t){
    for(const m of list){
      const x=m.x-cam.x,y=m.y-cam.y;
      this.rrect(ctx,x,y,m.w,m.h,'#8d9187');
      ctx.save(); ctx.fillStyle='#5b5e55';
      for(let i=0;i<m.w*m.h/300;i++){
        const fx=x+((i*37+t*20)%m.w), fy=y+((i*53)%m.h);
        ctx.beginPath(); ctx.arc(fx,fy,4+Math.sin(t*3+i)*1.5,0,7); ctx.fill();
      }
      ctx.fillStyle='#fff'; ctx.font='bold 13px cursive'; ctx.fillText('MOLD ✖',x+6,y+18);
      ctx.restore();
    }
  },
  paint(ctx,g){
    for(const d of STALE_Paint.dabs){
      const c=STALE_Paint.JAMS[d.jam].color;
      ctx.fillStyle=c; ctx.strokeStyle='#3a2c1c'; ctx.lineWidth=2;
      ctx.beginPath(); ctx.arc(d.x-g.cam.x,d.y-g.cam.y,d.r,0,7); ctx.fill(); ctx.stroke();
      ctx.fillStyle='#ffffff88'; ctx.beginPath(); ctx.arc(d.x-g.cam.x-2,d.y-g.cam.y-2,2.5,0,7); ctx.fill();
    }
    if(STALE_Paint.cur){
      ctx.strokeStyle='#3a2c1c'; ctx.setLineDash([6,4]);
      ctx.beginPath();
      STALE_Paint.cur.pts.forEach((p,i)=>{ const x=p.x-g.cam.x,y=p.y-g.cam.y; i?ctx.lineTo(x,y):ctx.moveTo(x,y); });
      ctx.stroke(); ctx.setLineDash([]);
    }
  },
  sprinkles(ctx,list,cam,t){
    for(const s of list){
      if(s.taken) continue;
      const x=s.x-cam.x+Math.sin(t*3+s.x)*2, y=s.y-cam.y+Math.sin(t*4+s.y)*3;
      ctx.font='20px serif'; ctx.fillText('✨',x-10,y+6);
    }
  },
  enemies(ctx,list,cam,t){
    ctx.textAlign='center';
    for(const e of list){
      const x=e.x-cam.x+e.w/2, y=e.y-cam.y;
      if(e.type==='crawler'){ ctx.font='28px serif'; ctx.fillText('🦠',x,y+e.h-2+Math.sin(t*8)*1); }
      else if(e.type==='bat'){ ctx.font='26px serif'; ctx.fillText('🦇',x,y+e.h); }
      else if(e.type==='gulper'){ ctx.font='34px serif'; ctx.fillText('🥤',x,y+e.h); }
      else if(e.type==='spore'){ ctx.font='18px serif'; ctx.fillText('💩',x,y+14); }
      else if(e.type==='boss'){
        ctx.font='84px serif';
        const wob=Math.sin(t*5)*4;
        ctx.fillText('👑',x,y+28+wob);
        ctx.font='64px serif'; ctx.fillText('🦠',x,y+78);
        if(e.tired>0){ ctx.font='bold 14px cursive'; ctx.fillStyle='#c8321e'; ctx.fillText('TIRED! STOMP!',x,y-8); }
        // hp
        ctx.fillStyle='#3a2c1c'; ctx.font='bold 14px cursive';
        ctx.fillText('KING MOLD '+'❤'.repeat(Math.max(0,e.hp)),x,y-24);
      }
      // eyes
      ctx.textAlign='center';
    }
  },
  player(ctx,p,cam,t){
    const x=p.x-cam.x, y=p.y-cam.y;
    ctx.save();
    if(p.inv>0 && Math.floor(t*12)%2===0) ctx.globalAlpha=0.4;
    // shadow
    ctx.fillStyle='#00000022'; ctx.beginPath(); ctx.ellipse(x+15,y+40,14,4,0,0,7); ctx.fill();
    // toast body
    const sq = p.onGround?1+Math.min(0.15,Math.abs(p.vx)/2000):1.08;
    ctx.translate(x+15,y+19); ctx.scale(p.face*sq,1/sq); ctx.translate(-15,-19);
    this.rrect(ctx,x,y,p.w,p.h,'#e8a94e');
    ctx.fillStyle='#8a5a2b'; ctx.fillRect(x+4,y+4,6,6); ctx.fillRect(x+20,y+10,5,5); ctx.fillRect(x+8,y+24,6,5);
    // eyes
    ctx.fillStyle='#fff'; ctx.fillRect(x+6,y+8,8,9); ctx.fillRect(x+17,y+8,8,9);
    ctx.fillStyle='#222'; ctx.fillRect(x+8+(p.face*2),y+11,4,5); ctx.fillRect(x+19+(p.face*2),y+11,4,5);
    // splat backpack
    ctx.fillStyle=STALE_Paint.JAMS[p.jamSel].color;
    ctx.beginPath(); ctx.arc(x+4,y+10+Math.sin(t*6)*1.5,9,0,7); ctx.fill(); ctx.strokeStyle='#3a2c1c'; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle='#fff'; ctx.fillRect(x+1,y+7,3,3); ctx.fillRect(x+5,y+6,2,2);
    ctx.restore();
    // paint cursor preview
    if(window._MOUSE && window._STATE==='play'){
      const m=window._MOUSE;
      ctx.strokeStyle='#3a2c1c'; ctx.fillStyle=STALE_Paint.JAMS[p.jamSel].color;
      ctx.beginPath(); ctx.arc(m.x,m.y,8,0,7); ctx.fill(); ctx.stroke();
    }
  },
  exitDoor(ctx,ex,cam,t){
    const x=ex.x-cam.x,y=ex.y-cam.y;
    this.rrect(ctx,x,y,ex.w||50,ex.h||70,'#7bd389');
    ctx.font='30px serif'; ctx.fillText('🚪',x+25,y+42);
    ctx.font='bold 12px cursive'; ctx.fillStyle='#3a2c1c'; ctx.fillText('EXIT ↓',x+25,y+66+Math.sin(t*4)*2);
  }
};
