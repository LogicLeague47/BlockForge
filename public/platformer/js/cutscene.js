// Skippable ~2-minute story cartoon. 7 scenes x ~17s = ~119s.
window.STALE_Cutscene = {
  t:0, total:119, sceneI:0, active:false, charI:0,
  scenes:[
    {d:17, cap:'🍞 Long ago, in the Snacklands…', sub:'Everything was delicious. Toast sunrises. Soda rivers. The Berry Bros danced every crumb-day. Drawn by LogicLeague.', bg:'#ffe9a8', emoji:'🌞🍞🧀🍩'},
    {d:17, cap:'🧊 …someone left the FRIDGE OPEN', sub:'A cold grey wind crawled in. “Did YOU leave it open?!” “No, YOU did!” It didn’t matter. The Mold had smelled crumb.', bg:'#cfd8e3', emoji:'🧊👀🦠'},
    {d:17, cap:'🦠 The Fuzzy Legion arrives', sub:'King Mold and General Bleu Cheese spread the Grey. “STALE EVERYTHING!” laughed the King. “No more dancing. No more jam.”', bg:'#9aa092', emoji:'🦠👑🧀⚔️'},
    {d:17, cap:'🗑 Pip gets thrown away', sub:'Pip was just a burnt toast crumb. “Too crunchy,” said the giant. Thrown in the bin… but Pip was still… awake.', bg:'#d8cbb2', emoji:'🍞🗑😢'},
    {d:17, cap:'💦 Splat! A living jam blob', sub:'“OW! My eye!” Splat the jam blob landed on Pip. “Listen crumb — I can be your BACKPACK. Together we JAM-PAINT. It’s forbidden. It’s awesome.”', bg:'#ffc2d4', emoji:'💦🍞🎒✨'},
    {d:17, cap:'🥨 Auntie Pretzel’s warning', sub:'“Take my Mint and Choco, baby. Paint bridges. Bounce high. Climb sticky. Scrub the Mold Hearts. And never… lick General Bleu.” — Auntie Pretzel', bg:'#e8c47a', emoji:'🥨🖌🌿🍫'},
    {d:17, cap:'👑 To the Mold Heart!', sub:'Pip gulps. “I’m literally garbage… but garbage can be BRAVE.” Splat grins: “Now THAT’S the spirit! 1/2/3 to swap jam. DRAG to paint. Let’s UN-STALE the world!”', bg:'#ffb3a8', emoji:'🍞💦👑🔥'},
  ],
  start(){ this.t=0; this.active=true; this.charI=0; },
  skip(){ this.active=false; if(window.STALE_Game) STALE_Game.toMenu(); },
  update(dt){
    if(!this.active) return;
    this.t+=dt;
    document.getElementById('cut-fill').style.width=(100*this.t/this.total)+'%';
    const sc=this.scenes[this.sceneI];
    this.charI=Math.min(sc.sub.length, this.charI+dt*38);
    document.getElementById('cut-cap').textContent=sc.cap;
    document.getElementById('cut-sub').textContent='“'+sc.sub.slice(0,Math.floor(this.charI))+'”';
    if(this.t>=this.durUpTo(this.sceneI+1) && this.sceneI<this.scenes.length-1){ this.sceneI++; this.charI=0; STALE_Audio.play('ui'); }
    if(this.t>=this.total) this.skip();
  },
  durUpTo(n){ let s=0; for(let i=0;i<n&&i<this.scenes.length;i++) s+=this.scenes[i].d; return s; },
  draw(ctx,W,H){
    const sc=this.scenes[this.sceneI];
    ctx.fillStyle=sc.bg; ctx.fillRect(0,0,W,H);
    // doodle border + floating emoji actors
    ctx.font='64px serif'; ctx.textAlign='center';
    const bob=Math.sin(this.t*2)*10;
    ctx.fillText(sc.emoji, W/2, 200+bob);
    // marching mold feet at bottom
    ctx.font='30px serif';
    for(let i=0;i<12;i++){ const x=((i*140+this.t*60)%(W+100))-50; ctx.fillText(i%2?'🦠':'🐾',x,H-60+Math.sin(this.t*5+i)*5); }
    // scene dots
    ctx.font='16px serif';
    let dots=''; for(let i=0;i<this.scenes.length;i++) dots+= i===this.sceneI?'🔴':'⚪';
    ctx.fillStyle='#3a2c1c'; ctx.fillText(dots+'  '+Math.ceil(this.total-this.t)+'s left', W/2, H-24);
  }
};
