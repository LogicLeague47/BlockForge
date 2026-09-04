// Mold Kingdom intro cartoon: ~2 minutes, 8 animated scenes. Vector actors + emoji crowds.
function CS_pip(ctx,x,y,s,t,o){
  o=o||{};
  ctx.save(); ctx.translate(x,y); ctx.scale(s*(o.face||1),s);
  const sw=o.run?Math.sin(t*14)*4:0;
  ctx.fillStyle='#7a4a1f';
  if(o.run){ ctx.fillRect(-10,-8+sw*0.4,6,8); ctx.fillRect(4,-8-sw*0.4,6,8); }
  else { ctx.fillRect(-10,-8,6,8); ctx.fillRect(4,-8,6,8); }
  STALE_Render.rrect(ctx,-15,-46,30,38,'#e8a94e');
  ctx.fillStyle='#8a5a2b'; ctx.fillRect(-11,-42,6,6); ctx.fillRect(5,-36,5,5); ctx.fillRect(-7,-22,6,5);
  if(t%3<0.15){ ctx.fillStyle='#3a2c1c'; ctx.fillRect(-9,-34,8,2); ctx.fillRect(2,-34,8,2); }
  else{ ctx.fillStyle='#fff'; ctx.fillRect(-9,-38,8,9); ctx.fillRect(2,-38,8,9);
    ctx.fillStyle='#222'; ctx.fillRect(-6,-35,4,5); ctx.fillRect(5,-35,4,5); }
  ctx.strokeStyle='#3a2c1c'; ctx.lineWidth=2; ctx.beginPath();
  if(o.sad){ ctx.moveTo(-6,-16); ctx.quadraticCurveTo(0,-20,6,-16); }
  else { ctx.arc(0,-20,5,0.15*Math.PI,0.85*Math.PI); }
  ctx.stroke();
  if(o.pack){ // Splat riding on his back
    const j=Math.sin(t*7)*1.5;
    ctx.fillStyle='#ff5d8f'; ctx.beginPath(); ctx.arc(-13,-38+j,9,0,7); ctx.fill();
    ctx.strokeStyle='#3a2c1c'; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle='#222'; ctx.fillRect(-16,-40+j,2.5,3); ctx.fillRect(-12,-40+j,2.5,3);
  }
  ctx.restore();
}
function CS_splat(ctx,x,y,s,t){
  ctx.save(); ctx.translate(x,y+Math.sin(t*5)*4); ctx.scale(s,s);
  ctx.fillStyle='#ff5d8f'; ctx.strokeStyle='#3a2c1c'; ctx.lineWidth=3;
  ctx.beginPath(); ctx.ellipse(0,-14,16,13,0,0,7); ctx.fill(); ctx.stroke();
  ctx.fillStyle='#fff'; ctx.fillRect(-10,-20,8,9); ctx.fillRect(2,-20,8,9);
  ctx.fillStyle='#222'; ctx.fillRect(-7,-17,4,5); ctx.fillRect(5,-17,4,5);
  ctx.strokeStyle='#3a2c1c'; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(0,-9,5,0.1,Math.PI-0.1); ctx.stroke();
  ctx.restore();
}
function CS_pretzel(ctx,x,y,s,t){
  ctx.save(); ctx.translate(x,y); ctx.scale(s,s);
  ctx.fillStyle='#8a5a2b'; ctx.strokeStyle='#3a2c1c'; ctx.lineWidth=3;
  ctx.fillRect(-5,-8,10,8);
  for(let i=0;i<3;i++){ ctx.beginPath(); ctx.arc((i%2)?5:-5,-16-i*14,10,0,7); ctx.fill(); ctx.stroke(); }
  ctx.fillStyle='#fff'; ctx.fillRect(-8,-54,8,9); ctx.fillRect(2,-54,8,9);
  ctx.fillStyle='#222'; ctx.fillRect(-5,-51,3.5,4.5); ctx.fillRect(5,-51,3.5,4.5);
  ctx.strokeStyle='#8a5a2b'; ctx.lineWidth=5; ctx.beginPath();
  ctx.moveTo(9,-30); ctx.lineTo(22,-44+Math.sin(t*4)*5); ctx.stroke();
  ctx.restore();
}
function CS_king(ctx,x,y,s,t,o){
  o=o||{};
  ctx.save(); ctx.translate(x,y+Math.sin(t*2)*4); ctx.scale(s,s);
  const squash=o.slam?0.85+Math.abs(Math.sin(t*6))*0.1:1;
  ctx.scale(1/Math.sqrt(squash),squash);
  ctx.fillStyle='#7d8b6f'; ctx.strokeStyle='#3a2c1c'; ctx.lineWidth=4;
  STALE_Render.rrect(ctx,-45,-90,90,80,'#7d8b6f');
  ctx.fillStyle='#5b6a4e';
  for(const p of [[-25,-60],[20,-40],[0,-25],[-10,-70]]){ ctx.beginPath(); ctx.arc(p[0],p[1],7+Math.sin(t*3+p[0])*2,0,7); ctx.fill(); }
  // crown
  ctx.fillStyle='#ffd23f'; ctx.strokeStyle='#3a2c1c'; ctx.lineWidth=3;
  ctx.beginPath();
  ctx.moveTo(-33,-88); ctx.lineTo(-33,-116); ctx.lineTo(-19,-104); ctx.lineTo(0,-120); ctx.lineTo(19,-104); ctx.lineTo(33,-116); ctx.lineTo(33,-88);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle='#c8321e'; ctx.beginPath(); ctx.arc(0,-102,5,0,7); ctx.fill();
  // furious face
  ctx.fillStyle='#fff'; ctx.fillRect(-28,-72,18,15); ctx.fillRect(10,-72,18,15);
  ctx.fillStyle='#c00'; ctx.fillRect(-22,-68,8,8); ctx.fillRect(16,-68,8,8);
  ctx.strokeStyle='#3a2c1c'; ctx.lineWidth=3; ctx.beginPath();
  ctx.moveTo(-30,-78); ctx.lineTo(-10,-71); ctx.moveTo(30,-78); ctx.lineTo(10,-71); ctx.stroke();
  ctx.fillStyle='#3a2c1c';
  ctx.fillRect(-16,-44,9,9); ctx.fillRect(-4,-44,9,9); ctx.fillRect(8,-44,9,9);
  ctx.restore();
}

window.STALE_Cutscene = {
  t:0, total:120, sceneI:0, active:false, charI:0,
  scenes:[
    {d:14, cap:'🍞 Long ago, in the Snacklands…',
     sub:'Everything was delicious. Toast sunrises. Soda rivers. The Berry Bros danced every single crumb-day. Drawn by LogicLeague.'},
    {d:14, cap:'🧊 …someone left the FRIDGE OPEN',
     sub:'A cold grey wind crawled in. “Did YOU leave it open?!” “No, YOU did!” Too late. The Mold had smelled crumb.'},
    {d:22, cap:'🦠 The Fuzzy Legion… and THEIR KING',
     sub:'Towering. Crowned. Reeking of old fridge. KING MOLD: “I am what freshness fears. No more dancing. No more jam. STALE… EVERYTHING!”'},
    {d:14, cap:'🗑 Pip gets thrown away',
     sub:'Pip was just a burnt toast crumb. “Too crunchy,” said the giant. Tossed in the bin… but Pip was still… awake.'},
    {d:14, cap:'💦 Splat! A living jam blob',
     sub:'“OW! My eye!” Splat the jam blob landed on Pip. “Listen crumb — I can be your BACKPACK. Together we JAM-PAINT. Forbidden. Awesome.”'},
    {d:16, cap:'🥨 Auntie Pretzel’s training',
     sub:'“Watch, baby!” Strawberry holds you. Mint goes BOING. Choco sticks — climb it! “Now scrub that mold, baby! Paint BRAVE!”'},
    {d:12, cap:'👑 To the Mold Heart!',
     sub:'Pip gulps. “I’m literally garbage… but garbage can be BRAVE.” Forty lands to cross. Two Kings to stomp. “Let’s UN-STALE the world!”'},
    {d:14, cap:'🍞 Mold Kingdom',
     sub:'A LogicLeague doodle-adventure. Paint platforms. Stomp Fuzzies. Befriend snacks. See you at PLAY!'},
  ],
  start(){ this.t=0; this.active=true; this.charI=0; this.sceneI=0; },
  skip(){ this.active=false; if(window.STALE_Game) STALE_Game.toMenu(); },
  update(dt){
    if(!this.active) return;
    this.t+=dt;
    const f=document.getElementById('cut-fill'); if(f) f.style.width=(100*this.t/this.total)+'%';
    const sc=this.scenes[this.sceneI];
    this.charI=Math.min(sc.sub.length, this.charI+dt*38);
    document.getElementById('cut-cap').textContent=sc.cap;
    document.getElementById('cut-sub').textContent='“'+sc.sub.slice(0,Math.floor(this.charI))+'”';
    if(this.t>=this.durUpTo(this.sceneI+1) && this.sceneI<this.scenes.length-1){ this.sceneI++; this.charI=0; STALE_Audio.play('ui'); }
    if(this.t>=this.total) this.skip();
  },
  durUpTo(n){ let s=0; for(let i=0;i<n&&i<this.scenes.length;i++) s+=this.scenes[i].d; return s; },
  draw(ctx,W,H){
    const i=this.sceneI, st=this.t-this.durUpTo(i), sc=this.scenes[i];
    ctx.textAlign='center';
    if(i===0){ // paradise
      ctx.fillStyle='#ffe9a8'; ctx.fillRect(0,0,W,H);
      ctx.save(); ctx.translate(830,110); ctx.rotate(st*0.3);
      ctx.strokeStyle='#f0a832'; ctx.lineWidth=8;
      for(let k=0;k<8;k++){ ctx.rotate(Math.PI/4); ctx.beginPath(); ctx.moveTo(0,34); ctx.lineTo(0,58); ctx.stroke(); }
      ctx.fillStyle='#ffd23f'; ctx.beginPath(); ctx.arc(0,0,30,0,7); ctx.fill(); ctx.restore();
      ctx.fillStyle='#7bd389'; ctx.fillRect(0,380,W,160);
      const dancing=['🍩','🧀','🫐','🍓'];
      dancing.forEach((e,k)=>{ ctx.font='52px serif'; ctx.fillText(e, 250+k*150, 340-Math.abs(Math.sin(st*4+k))*26); });
      CS_pip(ctx,180,372,1.4,st,{pack:false,run:false});
      CS_splat(ctx,790,372,1.4,st);
      ctx.font='bold 20px cursive'; ctx.fillStyle='#3a2c1c';
      ctx.fillText('☀ the Snacklands ☀',W/2,60);
    } else if(i===1){ // fridge open
      ctx.fillStyle='#cfd8e3'; ctx.fillRect(0,0,W,H);
      const open=Math.min(1,st/2);
      ctx.fillStyle='#8d99a8'; ctx.fillRect(80,80,220,360);
      ctx.fillStyle='#141c28'; ctx.fillRect(100,100,180,320);
      ctx.save(); ctx.translate(100,100); ctx.rotate(-open*1.8);
      ctx.fillStyle='#e8edf3'; ctx.fillRect(0,0,180,320);
      ctx.fillStyle='#9fb3c8'; for(let s=0;s<3;s++) ctx.fillRect(10,40+s*90,160,14);
      ctx.restore();
      ctx.font='40px serif';
      ctx.fillText('🧀',150,200); ctx.fillText('🥛',200,300); ctx.fillText('🍩',140,360);
      // grey wind + scared foods
      ctx.save(); ctx.globalAlpha=Math.min(0.85,st/4);
      ctx.fillStyle='#8d9187';
      for(let k=0;k<14;k++){ const x=W-((st*90+k*173)%(W+100)); ctx.beginPath(); ctx.arc(x,120+((k*67)%300),22,0,7); ctx.fill(); }
      ctx.restore();
      CS_pip(ctx,620,402,1.5,st,{pack:false,sad:true});
      ctx.font='46px serif'; ctx.fillText('😱',700,332+Math.sin(st*8)*4);
      ctx.fillText('😱',540,332+Math.cos(st*8)*4);
    } else if(i===2){ // KING REVEAL
      const jin=Math.min(1,st/3);
      ctx.fillStyle='#2b2b33'; ctx.fillRect(0,0,W,H);
      ctx.save(); ctx.globalAlpha=0.25+0.1*Math.sin(st*7);
      ctx.fillStyle='#8d9187'; ctx.fillRect(0,400,W,140); ctx.restore();
      ctx.font='30px serif';
      for(let k=0;k<8;k++){ const x=((k*150-st*70)%(W+120))-60; ctx.fillText('🦠',x,440+Math.sin(st*5+k)*6); }
      // king rises huge
      const ky=560-200*jin;
      ctx.save(); ctx.shadowColor='#c8321e'; ctx.shadowBlur=30;
      CS_king(ctx,W/2,ky,2.6,st,{slam:st>4});
      ctx.restore();
      if(st>3.2){
        const pop=Math.min(1,(st-3.2)*3);
        ctx.save(); ctx.translate(W/2,120); ctx.scale(pop,pop);
        ctx.fillStyle='#c8321e'; ctx.strokeStyle='#fff'; ctx.lineWidth=4;
        ctx.beginPath(); ctx.rect(-190,-34,380,52); ctx.fill(); ctx.stroke();
        ctx.fillStyle='#fff'; ctx.font='bold 30px cursive'; ctx.fillText('👑 KING MOLD 👑',0,2);
        ctx.restore();
      }
    } else if(i===3){ // binned
      ctx.fillStyle='#d8cbb2'; ctx.fillRect(0,0,W,H);
      ctx.fillStyle='#8a7a5a'; ctx.fillRect(0,440,W,100);
      // bin
      ctx.fillStyle='#5a6a7a'; ctx.strokeStyle='#3a2c1c'; ctx.lineWidth=4;
      ctx.beginPath(); ctx.moveTo(620,260); ctx.lineTo(660,420); ctx.lineTo(820,420); ctx.lineTo(860,260); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.font='bold 26px cursive'; ctx.fillStyle='#fff'; ctx.fillText('BIN',740,360);
      // pip arcs in: parabola over first 3s, then sad inside
      const k=Math.min(1,st/3);
      if(k<1){ const px=200+460*k, py=340-260*Math.sin(k*Math.PI); CS_pip(ctx,px,py,1.5,st,{sad:true}); }
      else { CS_pip(ctx,740,320+Math.sin(st*2)*3,1.5,st,{sad:true});
        if(Math.floor(st*1.5)%4===0){ ctx.font='20px serif'; ctx.fillText('💧',770,280); } }
      ctx.font='bold 22px cursive'; ctx.fillStyle='#3a2c1c';
      ctx.fillText('“too crunchy…”',W/2,120+Math.sin(st)*3);
    } else if(i===4){ // splat meets pip
      ctx.fillStyle='#ffc2d4'; ctx.fillRect(0,0,W,H);
      ctx.fillStyle='#c98da5'; ctx.fillRect(0,400,W,140);
      CS_pip(ctx,420,412,1.6,st,{sad:st<5,pack:st>=7});
      const k=Math.min(1,st/5);
      if(st<7){ const sy=100+230*k; CS_splat(ctx,420+Math.sin(st*3)*10,sy,1.5,st); }
      if(st>=7 && st<9){ // fusion flash
        ctx.save(); ctx.globalAlpha=(9-st)/2; ctx.fillStyle='#fff'; ctx.fillRect(0,0,W,H); ctx.restore();
        ctx.font='bold 30px cursive'; ctx.fillStyle='#c8321e'; ctx.fillText('JAM-PACK *FUSION!*',W/2,140);
      }
      if(st>=9){ CS_pip(ctx,420+Math.sin(st*2)*30,412-Math.abs(Math.sin(st*3))*30,1.6,st,{pack:true,run:true});
        ctx.font='bold 24px cursive'; ctx.fillStyle='#3a2c1c'; ctx.fillText('“FORBIDDEN. AWESOME.”',W/2,120); }
    } else if(i===5){ // pretzel training
      ctx.fillStyle='#e8c47a'; ctx.fillRect(0,0,W,H);
      CS_pretzel(ctx,170,412,1.5,st);
      // strokes draw themselves with time
      const drawStroke=(pts,col)=>{ ctx.strokeStyle=col; ctx.lineWidth=14; ctx.lineCap='round'; ctx.beginPath();
        const n=Math.max(2,Math.floor(pts.length*Math.min(1,st/9)));
        pts.slice(0,n).forEach((p,j)=>{ j?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]); }); ctx.stroke(); };
      drawStroke([[330,320],[430,320],[530,320]],'#ff5d8f');
      drawStroke([[560,320],[640,260],[720,320]],'#2ee6a8');
      drawStroke([[750,320],[750,220]],'#8a5a2b');
      if(st>6){ CS_pip(ctx,330+Math.min(1,(st-6)/6)*420,320-Math.abs(Math.sin(st*5))*40*(st>8?1:0),1.3,st,{pack:true,run:true}); }
      ctx.font='bold 22px cursive'; ctx.fillStyle='#3a2c1c';
      const tips=['🍓 holds you','🌿 goes BOING','🍫 sticks — CLIMB!'];
      ctx.fillText(tips[Math.min(2,Math.floor(st/4))],W/2,110);
    } else if(i===6){ // march
      ctx.fillStyle='#3a2b3d'; ctx.fillRect(0,0,W,H);
      // looming heart
      const beat=1+Math.sin(st*5)*0.08;
      ctx.save(); ctx.translate(W/2,120); ctx.scale(beat,beat);
      ctx.fillStyle='#c8321e'; ctx.beginPath(); ctx.arc(-18,0,26,0,7); ctx.arc(18,0,26,0,7); ctx.fill();
      ctx.beginPath(); ctx.moveTo(-40,12); ctx.lineTo(0,52); ctx.lineTo(40,12); ctx.closePath(); ctx.fill();
      ctx.restore();
      ctx.fillStyle='#241a28'; ctx.fillRect(0,400,W,140);
      CS_pip(ctx,200+st*30,412,1.5,st,{pack:true,run:true,face:1});
      const army=['🦠','🦇','🥤','🦠','🦇'];
      army.forEach((e,k)=>{ ctx.font='34px serif'; ctx.fillText(e,120+st*30-k*70,412); });
      ctx.font='bold 22px cursive'; ctx.fillStyle='#ffd23f';
      ctx.fillText('40 lands. 2 Kings. Paint BRAVE.',W/2,60);
    } else { // title drop
      ctx.fillStyle='#14100b'; ctx.fillRect(0,0,W,H);
      const pop=Math.min(1,st/1.5);
      ctx.save(); ctx.translate(W/2,215); ctx.scale(pop,pop); ctx.rotate(-0.06);
      ctx.font='900 30px "Comic Sans MS",cursive'; ctx.textAlign='center';
      ctx.fillStyle='#f5e9c9';
      ctx.font='900 62px "Comic Sans MS",cursive';
      ctx.fillStyle='#c8321e'; ctx.strokeStyle='#ffd23f'; ctx.lineWidth=3;
      ctx.strokeText('MOLD KINGDOM',0,0); ctx.fillText('MOLD KINGDOM',0,0);
      ctx.restore();
      CS_pip(ctx,W/2-120,382,1.6,st,{pack:true});
      CS_splat(ctx,W/2+120,392,1.3,st);
      ctx.font='bold 24px cursive'; ctx.fillStyle='#ffd23f';
      ctx.fillText('A LogicLeague doodle-adventure',W/2,330);
    }
    // scene dots + countdown (top so the subtitle bar never covers them)
    ctx.font='16px serif'; ctx.fillStyle='#3a2c1c';
    if(i===2||i===6||i===7) ctx.fillStyle='#f5e9c9';
    let dots=''; for(let k=0;k<this.scenes.length;k++) dots+= k===i?'🔴':'⚪';
    ctx.fillText(dots+'  '+Math.ceil(this.total-this.t)+'s · mash a key to skip', W/2, 24);
  }
};
