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
  solids(ctx,list,cam,t){
    for(const s of list){
      const x=s.x-cam.x, y=s.y-cam.y;
      if(x+s.w<-50||x>1010||y+s.h<-50||y>590) continue;
      let fill='#e8c47a';
      if(s.kind==='soda') fill='#7ce7f4';
      if(s.kind==='spawn') fill='#ffd23f';
      if(s.kind==='gate') fill='#6f7d5f';
      this.rrect(ctx,x,y,s.w,s.h,fill);
      if(s.kind==='gate'){ this.moldEyes(ctx,x,y,s.w,s.h,t||0); return; }
      if(s.kind==='spawn'){ ctx.font='bold 11px cursive'; ctx.fillStyle='#3a2c1c'; ctx.textAlign='center'; ctx.fillText('⭐ SPAWN',x+s.w/2,y+13); continue; }
      ctx.fillStyle='#c8321e';
      for(let sx=s.x+10;sx<s.x+s.w-6;sx+=26){ ctx.fillRect(sx-cam.x, y+4+Math.sin(sx*0.3)*1.5, 4,4); }
    }
  },
  // creepy watching eyes scattered over a moldy rect (world-space x,y top-left)
  moldEyes(ctx,x,y,w,h,t){
    const n=Math.max(2,Math.floor(w*h/1500));
    for(let i=0;i<n;i++){
      const ex=x+12+((i*53)%Math.max(1,w-24)), ey=y+13+((i*37)%Math.max(1,h-24));
      const r=3.5+((i*7)%4);
      ctx.fillStyle='#fff';
      ctx.beginPath(); ctx.ellipse(ex,ey,r+2.2,r+1,0,0,7); ctx.fill();
      ctx.strokeStyle='#3a2c1c'; ctx.lineWidth=1.5; ctx.stroke();
      const px=Math.sin(t*2+i*1.7)*1.6, py=Math.cos(t*1.6+i*2.3)*1.6;
      ctx.fillStyle='#c00';
      ctx.beginPath(); ctx.arc(ex+px,ey+py,Math.max(1.5,r*0.45),0,7); ctx.fill();
      ctx.fillStyle='#fff';
      ctx.beginPath(); ctx.arc(ex+px-0.8,ey+py-0.8,0.8,0,7); ctx.fill();
    }
  },
  mold(ctx,list,cam,t){
    for(const m of list){
      const x=m.x-cam.x,y=m.y-cam.y;
      this.rrect(ctx,x,y,m.w,m.h,'#8d9187');
      this.moldEyes(ctx,x,y,m.w,m.h,t);
      ctx.fillStyle='#fff'; ctx.font='bold 13px cursive'; ctx.fillText('MOLD ✖',x+6,y+18);
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
  // ---- correctly scales about feet-center: translate(c) -> scale -> translate back by the SAME c ----
  aboutFeet(ctx,x,y,w,h,sx,sy){
    const cx=x+w/2, fy=y+h;
    ctx.translate(cx,fy); ctx.scale(sx,sy); ctx.translate(-w/2,-h);
  },
  player(ctx,p,cam,t){
    const x=p.x-cam.x, y=p.y-cam.y, W=p.w, H=p.h;
    ctx.save();
    if(p.inv>0 && Math.floor(t*12)%2===0) ctx.globalAlpha=0.4;
    // shadow (world space, unscaled)
    ctx.fillStyle='rgba(0,0,0,0.15)';
    ctx.beginPath(); ctx.ellipse(x+W/2,y+H+3,13,4,0,0,7); ctx.fill();
    // squash & stretch
    const run=Math.min(1,Math.abs(p.vx)/200);
    let sy=1;
    if(p.dashT>0) sy=0.78;
    else if(p.onGround) sy = p.landT>0 ? 0.74 : 1+0.10*run;
    else sy = p.vy<-100 ? 1.14 : 0.94;
    this.aboutFeet(ctx,x,y,W,H, p.face/Math.sqrt(sy), sy);
    // legs (local space, face +x)
    const swing=(p.onGround&&Math.abs(p.vx)>40)?Math.sin(p.stepT*16)*4:0;
    ctx.fillStyle='#7a4a1f';
    if(p.onGround){ ctx.fillRect(5,H-7,6,7+swing*0.6); ctx.fillRect(19,H-7,6,7-swing*0.6); }
    else { ctx.fillRect(5,H-6,6,6); ctx.fillRect(19,H-6,6,6); }
    // toast body
    this.rrect(ctx,0,0,W,H,'#e8a94e');
    ctx.fillStyle='#8a5a2b'; ctx.fillRect(4,4,6,6); ctx.fillRect(20,10,5,5); ctx.fillRect(8,24,6,5);
    // eyes (blink!)
    if(p.blinkT<0.12){ ctx.fillStyle='#3a2c1c'; ctx.fillRect(6,12,8,2); ctx.fillRect(17,12,8,2); }
    else{
      ctx.fillStyle='#fff'; ctx.fillRect(6,8,8,9); ctx.fillRect(17,8,8,9);
      ctx.fillStyle='#222'; ctx.fillRect(9,11,4,5); ctx.fillRect(20,11,4,5);
    }
    // mouth
    ctx.strokeStyle='#3a2c1c'; ctx.lineWidth=2; ctx.beginPath();
    if(p.inv>0){ ctx.moveTo(10,28); ctx.lineTo(14,26); ctx.lineTo(18,28); ctx.lineTo(22,26); }
    else { ctx.arc(15,26,5,0.15*Math.PI,0.85*Math.PI); }
    ctx.stroke();
    // Splat backpack: jiggly jam blob in currently selected jam color
    const jig=Math.sin(t*7)*1.5, hap=p.splatHappy>0?1+Math.sin(t*20)*0.12:1;
    ctx.save(); ctx.translate(3,9+jig); ctx.scale(hap,hap);
    ctx.fillStyle=STALE_Paint.JAMS[p.jamSel].color;
    ctx.beginPath(); ctx.arc(0,0,9,0,7); ctx.fill(); ctx.strokeStyle='#3a2c1c'; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle='#fff'; ctx.fillRect(-4,-4,3,3); ctx.fillRect(0,-5,2,2);
    ctx.fillStyle='#222'; ctx.fillRect(-4,-1,2.5,3); ctx.fillRect(1,-1,2.5,3);
    ctx.restore();
    // dash streaks
    if(p.dashT>0){
      ctx.strokeStyle='#ffd23f'; ctx.lineWidth=3;
      for(let i=0;i<3;i++){ ctx.beginPath(); ctx.moveTo(-6-i*7,8+i*8); ctx.lineTo(-16-i*7,8+i*8); ctx.stroke(); }
    }
    ctx.restore();
    // paint cursor preview
    if(window._MOUSE && window._STATE==='play'){
      const m=window._MOUSE;
      ctx.strokeStyle='#3a2c1c'; ctx.fillStyle=STALE_Paint.JAMS[p.jamSel].color;
      ctx.beginPath(); ctx.arc(m.x,m.y,8,0,7); ctx.fill(); ctx.stroke();
    }
  },
  enemies(ctx,list,cam,t){
    ctx.textAlign='center';
    for(const e of list){
      const x=e.x-cam.x, y=e.y-cam.y;
      if(x+e.w<-60||x>1020) continue;
      if(e.type==='crawler'){
        const sq=1+Math.sin(t*10+e.ph)*0.08;
        ctx.save(); this.aboutFeet(ctx,x,y,e.w,e.h,1,sq);
        ctx.fillStyle='#7a4a1f';
        const f=Math.sin(t*12+e.ph)>0;
        ctx.fillRect(2,e.h-4,6,5); ctx.fillRect(e.w-8,e.h-4,6,5);
        if(f){ ctx.fillRect(8,e.h-3,5,4); ctx.fillRect(e.w-13,e.h-3,5,4); }
        this.rrect(ctx,0,2,e.w,e.h-4,'#9db38a');
        ctx.fillStyle='#5b6e4e';
        ctx.beginPath(); ctx.arc(9,12,3,0,7); ctx.fill();
        ctx.beginPath(); ctx.arc(e.w-9,17,2.5,0,7); ctx.fill();
        ctx.fillStyle='#fff'; ctx.fillRect(6,4,8,8); ctx.fillRect(e.w-14,4,8,8);
        ctx.fillStyle='#c00'; ctx.fillRect(8,6,4,4); ctx.fillRect(e.w-12,6,4,4);
        ctx.strokeStyle='#3a2c1c'; ctx.lineWidth=2; ctx.beginPath();
        ctx.moveTo(10,e.h-8); ctx.lineTo(e.w-10,e.h-8); ctx.stroke();
        ctx.restore();
      }
      else if(e.type==='bat'){
        const flap=Math.sin(t*14+e.ph);
        const cx=x+e.w/2, cy=y+e.h/2;
        ctx.fillStyle='#5a4a6a';
        ctx.save(); ctx.translate(cx,cy);
        ctx.save(); ctx.rotate(-0.5-flap*0.5); ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(-22,-8); ctx.lineTo(-4,4); ctx.closePath(); ctx.fill(); ctx.restore();
        ctx.save(); ctx.rotate(0.5+flap*0.5); ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(22,-8); ctx.lineTo(4,4); ctx.closePath(); ctx.fill(); ctx.restore();
        ctx.fillStyle='#6a5a7a'; ctx.beginPath(); ctx.arc(0,0,11,0,7); ctx.fill();
        ctx.strokeStyle='#3a2c1c'; ctx.lineWidth=2; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-7,-9); ctx.lineTo(-4,-15); ctx.lineTo(-1,-9); ctx.fillStyle='#6a5a7a'; ctx.fill();
        ctx.beginPath(); ctx.moveTo(1,-9); ctx.lineTo(4,-15); ctx.lineTo(7,-9); ctx.fill();
        ctx.fillStyle='#ff5d5d'; ctx.fillRect(-7,-3,5,5); ctx.fillRect(2,-3,5,5);
        ctx.restore();
      }
      else if(e.type==='gulper'){
        const stretch=e.vy<0?1.12:1;
        ctx.save(); this.aboutFeet(ctx,x,y,e.w,e.h,1,stretch);
        this.rrect(ctx,4,8,e.w-8,e.h-10,'#e14b4b');
        ctx.fillStyle='#fff'; ctx.fillRect(4,20,e.w-8,8);
        ctx.strokeStyle='#2aa'; ctx.lineWidth=5; ctx.beginPath();
        const bob=Math.sin(t*5+e.ph)*3;
        ctx.moveTo(e.w/2,8); ctx.lineTo(e.w/2+6,-6+bob); ctx.stroke();
        ctx.fillStyle='#fff'; ctx.fillRect(10,12,9,9); ctx.fillRect(e.w-19,12,9,9);
        ctx.fillStyle='#222'; ctx.fillRect(12,14,5,5); ctx.fillRect(e.w-17,14,5,5);
        ctx.restore();
      }
      else if(e.type==='spore'){
        ctx.save(); ctx.translate(x+e.w/2,y+e.h/2); ctx.rotate(t*6+e.ph); ctx.scale(1+Math.sin(t*9)*0.06,1+Math.sin(t*9)*0.06);
        ctx.font='18px serif'; ctx.fillText('💩',0,6); ctx.restore();
      }
      else if(e.type==='boss'){ this.boss(ctx,e,x,y,t); }
    }
    ctx.textAlign='center';
  },
  boss(ctx,b,x,y,t){
    const W=b.w, H=b.h;
    // hp bar
    ctx.fillStyle='#3a2c1c'; ctx.fillRect(x-10,y-34,W+20,12);
    ctx.fillStyle='#c8321e'; ctx.fillRect(x-8,y-32,W+16,8);
    ctx.fillStyle='#7bd389'; ctx.fillRect(x-8,y-32,(W+16)*Math.max(0,b.hp)/5,8);
    ctx.fillStyle='#3a2c1c'; ctx.font='bold 13px cursive';
    ctx.fillText('👑 KING MOLD',x+W/2,y-40);
    ctx.save();
    const sy=b.onG?(b.tired>0?0.82:1):1.14;
    this.aboutFeet(ctx,x,y,W,H,1/Math.sqrt(sy),sy);
    // moldy body
    this.rrect(ctx,0,10,W,H-10,'#7d8b6f');
    ctx.fillStyle='#5b6a4e';
    const spots=[[12,26],[W-14,40],[W/2,55],[20,58],[W-24,22]];
    for(const s of spots){ ctx.beginPath(); ctx.arc(s[0],s[1],5+Math.sin(t*3+s[0])*1.5,0,7); ctx.fill(); }
    // arms
    ctx.fillStyle='#7d8b6f'; ctx.strokeStyle='#3a2c1c'; ctx.lineWidth=2;
    const wave=Math.sin(t*6)*6;
    ctx.beginPath(); ctx.arc(-4,40+wave,9,0,7); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(W+4,40-wave,9,0,7); ctx.fill(); ctx.stroke();
    // crown
    ctx.fillStyle='#ffd23f'; ctx.strokeStyle='#3a2c1c'; ctx.lineWidth=3;
    ctx.beginPath();
    ctx.moveTo(12,12); ctx.lineTo(12,-12); ctx.lineTo(26,-2); ctx.lineTo(W/2,-16); ctx.lineTo(W-26,-2); ctx.lineTo(W-12,-12); ctx.lineTo(W-12,12);
    ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle='#c8321e';
    ctx.beginPath(); ctx.arc(W/2,-6,4,0,7); ctx.fill();
    // face
    if(b.tired>0){
      ctx.fillStyle='#222'; ctx.fillRect(20,30,12,4); ctx.fillRect(W-32,30,12,4);
      ctx.strokeStyle='#3a2c1c'; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(W/2,52,8,0,7); ctx.stroke();
      // dizzy stars
      ctx.fillStyle='#ffd23f'; ctx.font='16px serif';
      for(let i=0;i<3;i++){ const a=t*4+i*2.1; ctx.fillText('⭐',W/2+Math.cos(a)*34-8,14+Math.sin(a)*10); }
      ctx.fillStyle='#c8321e'; ctx.font='bold 14px cursive'; ctx.fillText('TIRED! STOMP!',W/2,H+16);
    } else {
      ctx.fillStyle='#fff'; ctx.fillRect(18,28,16,14); ctx.fillRect(W-34,28,16,14);
      ctx.fillStyle='#c00'; ctx.fillRect(24,32,7,7); ctx.fillRect(W-31,32,7,7);
      ctx.strokeStyle='#3a2c1c'; ctx.lineWidth=3; ctx.beginPath();
      ctx.moveTo(16,24); ctx.lineTo(36,30); ctx.moveTo(W-16,24); ctx.lineTo(W-36,30); ctx.stroke();
      ctx.fillStyle='#3a2c1c';
      ctx.fillRect(28,52,8,8); ctx.fillRect(40,52,8,8); ctx.fillRect(52,52,8,8);
    }
    if((b.inv||0)>0){ ctx.globalAlpha=0.45; ctx.fillStyle='#fff'; ctx.fillRect(0,0,W,H); ctx.globalAlpha=1; }
    ctx.restore();
  },
  npcs(ctx,list,cam,t,P){
    for(const n of list){
      const fx=n.x-cam.x, fy=n.y-cam.y;
      if(fx<-60||fx>1020) continue;
      ctx.save();
      if(n.type==='pretzel'){
        const sway=Math.sin(t*2+n.t)*2;
        ctx.fillStyle='#8a5a2b'; ctx.strokeStyle='#3a2c1c'; ctx.lineWidth=3;
        ctx.fillRect(fx-4,fy-8,8,8); // feet
        for(let i=0;i<3;i++){
          ctx.beginPath(); ctx.arc(fx+((i%2)?4:-4),fy-16-i*13,9,0,7); ctx.fill(); ctx.stroke();
        }
        ctx.fillStyle='#fff'; ctx.fillRect(fx-6,fy-52,7,8); ctx.fillRect(fx+1,fy-52,7,8);
        ctx.fillStyle='#222'; ctx.fillRect(fx-4,fy-50,3,4); ctx.fillRect(fx+3,fy-50,3,4);
        // waving arm
        ctx.strokeStyle='#8a5a2b'; ctx.lineWidth=5; ctx.beginPath();
        ctx.moveTo(fx+8,fy-30); ctx.lineTo(fx+20,fy-44+sway*3); ctx.stroke();
        ctx.font='bold 11px cursive'; ctx.fillStyle='#3a2c1c'; ctx.textAlign='center';
        ctx.fillText('AUNTIE PRETZEL',fx,fy-62);
      } else {
        const col=n.type==='berryBlue'?'#4b7de1':'#e14b7d';
        const bnc=Math.abs(Math.sin(t*3+n.t))*6;
        ctx.fillStyle='rgba(0,0,0,0.12)';
        ctx.beginPath(); ctx.ellipse(fx,fy+2,12,3.5,0,0,7); ctx.fill();
        ctx.fillStyle=col; ctx.strokeStyle='#3a2c1c'; ctx.lineWidth=3;
        ctx.beginPath(); ctx.arc(fx,fy-14-bnc,13,0,7); ctx.fill(); ctx.stroke();
        ctx.fillStyle='#2e9e4b';
        ctx.beginPath(); ctx.moveTo(fx,fy-27-bnc); ctx.lineTo(fx+8,fy-34-bnc); ctx.lineTo(fx,fy-38-bnc); ctx.closePath(); ctx.fill();
        ctx.fillStyle='#fff'; ctx.fillRect(fx-7,fy-19-bnc,6,7); ctx.fillRect(fx+1,fy-19-bnc,6,7);
        ctx.fillStyle='#222'; ctx.fillRect(fx-5,fy-17-bnc,3,4); ctx.fillRect(fx+3,fy-17-bnc,3,4);
        ctx.strokeStyle='#3a2c1c'; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(fx,fy-10-bnc,4,0.2,Math.PI-0.2); ctx.stroke();
      }
      // "!" when player near and ungreeted
      if(!n.talked && Math.abs(P.x-n.x)<110 && Math.abs(P.y-n.y)<110){
        ctx.font='bold 22px cursive'; ctx.fillStyle='#c8321e';
        ctx.fillText('!',fx+18,fy-56+Math.sin(t*6)*3);
      }
      ctx.restore();
    }
    ctx.textAlign='center';
  },
  floats(ctx,list,cam){
    for(const f of list){
      const a=Math.max(0,1-f.t/f.life);
      ctx.globalAlpha=a;
      ctx.font='bold 17px "Comic Sans MS",cursive'; ctx.textAlign='center';
      ctx.lineWidth=4; ctx.strokeStyle='#3a2c1c';
      const y=f.y-cam.y-f.t*46;
      ctx.strokeText(f.txt,f.x-cam.x,y);
      ctx.fillStyle=f.c||'#ffd23f'; ctx.fillText(f.txt,f.x-cam.x,y);
      ctx.globalAlpha=1;
    }
  },
  exitDoor(ctx,ex,cam,t){
    const x=ex.x-cam.x,y=ex.y-cam.y;
    // glow pulse
    ctx.save(); ctx.globalAlpha=0.22+0.13*Math.sin(t*4); ctx.fillStyle='#7bd389';
    ctx.beginPath(); ctx.ellipse(x+25,y+35,46,54,0,0,7); ctx.fill(); ctx.restore();
    this.rrect(ctx,x,y,ex.w||50,ex.h||70,'#7bd389');
    ctx.font='30px serif'; ctx.fillText('🚪',x+25,y+42);
    ctx.font='bold 12px cursive'; ctx.fillStyle='#3a2c1c'; ctx.fillText('EXIT ↓',x+25,y+66+Math.sin(t*4)*2);
  }
};
