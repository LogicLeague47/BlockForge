// Mold Kingdom: 40 levels across 2 worlds. W1 (1-20): tutorials + Mold King. W2 (21-40): Mushroom Hollow + Mushroom King.
function S(x,y,w,h,kind){return {x,y,w,h,kind:kind||'counter'};}
function M(x,y,w,h){return {x,y,w,h,hp:2};}
function P(x,y){return {x,y,taken:false};}
function E(type,x,y){return {type,x,y};}
function G(x,y,text){return {x,y,text};}
function N(type,x,y,text){return {type,x,y,text};}
function RNG(seed){ let a=seed>>>0; return function(){ a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }

const L1 = {
  name:'1 · The Countertop', sub:'learn to paint, little crumb',
  W:3400, H:620, start:{x:80,y:300}, checkpoint:{x:1900,y:300}, jams:['berry'], dash:false, dark:false,
  solids:[
    S(-100,480,900,140), S(900,480,120,140),
    S(1120,480,600,140), S(1120,380,140,20), S(1400,320,160,20), S(1700,380,120,20),
    S(1840,480,700,140), S(2100,360,140,20),
    S(2540,480,200,140),
    S(2740,480,800,140), S(2900,340,140,20),
  ],
  moldWalls:[ M(2540,340,40,140) ],
  sprinkles:[ P(950,420),P(1180,340),P(1470,280),P(2150,320),P(2650,400),P(2950,300) ],
  enemies:[ E('crawler',1300,440), E('crawler',2000,440) ],
  npcs:[ N('pretzel',620,480,'Baby! Drag your MOUSE to paint jam bridges! It costs jam — walk into me any time for a full refill + fresh hearts!') ],
  signs:[
    G(150,400,'Hi PIP! Drag MOUSE to paint a bridge! — Splat'),
    G(1050,400,'Press 1 for strawberry. Gap too wide? PAINT IT!'),
    G(2500,400,'Grey wall = MOLD. Hold E / right-click to ERASE!'),
  ],
  hint:'Paint over the gap! Collect ✨ for jam.'
};

const L2 = {
  name:'2 · Soda Swamp', sub:'mint goes BOING',
  W:3600, H:620, start:{x:80,y:300}, checkpoint:{x:2050,y:300}, jams:['berry','mint'], dash:true, dark:false, soda:true,
  solids:[
    S(-100,480,600,140), S(700,420,180,20), S(1000,480,300,140),
    S(1420,480,120,140), S(1660,420,180,20), S(1960,480,320,140),
    S(2400,380,160,20), S(2680,440,160,20), S(2960,480,700,140),
  ],
  moldWalls:[ M(1240,380,40,100) ],
  sprinkles:[ P(760,380),P(1500,420),P(1750,380),P(2470,340),P(2750,400),P(3100,420),P(3300,420) ],
  enemies:[ E('crawler',1100,440), E('bat',1800,250), E('gulper',2100,440), E('bat',2600,240), E('crawler',3100,440) ],
  npcs:[ N('berryBlue',2170,360,'Psst… Razz and I hide where the mint bounces highest! Stomp EVERYTHING — combos earn bonus jam!') ],
  signs:[
    G(120,400,'SHIFT = DASH! Auntie Pretzel upgraded your legs.'),
    G(650,380,'Press 2 for MINT — it BOUNCES! Paint + bounce high!'),
    G(2350,340,'Bats hate stomps. Jump ON them!'),
  ],
  hint:'Mint paint bounces you. Dash with SHIFT!'
};

const L3 = {
  name:'3 · The Fridge Dark', sub:'sticky choco + spooky leftovers',
  W:3800, H:620, start:{x:80,y:300}, checkpoint:{x:2400,y:300}, jams:['berry','mint','choco'], dash:true, dark:true,
  solids:[
    S(-100,480,500,140), S(500,400,160,20), S(760,330,160,20), S(1040,480,320,140),
    S(1480,480,140,140), S(1740,400,160,20), S(2020,330,160,20), S(2300,480,300,140),
    S(2720,480,120,140), S(2960,400,180,20), S(2960,480,900,140),
  ],
  moldWalls:[ M(1360,380,120,100), M(2600,380,120,100) ],
  sprinkles:[ P(560,360),P(820,290),P(1800,360),P(2100,290),P(2450,420),P(3040,360),P(3300,420) ],
  enemies:[ E('bat',900,200), E('crawler',1150,440), E('gulper',2400,440), E('bat',2850,220), E('crawler',3200,440) ],
  npcs:[ N('berryRed',3040,400,'Brrr! Choco walls are STICKY — hold TOWARD them and press UP to climb! Your paint glows here, trust the jam!') ],
  signs:[
    G(120,400,'Brrr… press 3 for CHOCO — climb STICKY walls!'),
    G(1350,440,'Erase grey mold with E to open the way!'),
    G(2700,440,'Your paint GLOWS here. Trust the jam.'),
  ],
  hint:'Choco paint is sticky — hold toward it to climb!'
};

function genLevel(n){
  const R=RNG(n*7919+13);
  const wdef = n<=7 ? {w:'Countertop',sub:'crumbs & courage',dark:false,soda:false,foes:['crawler']}
    : n<=11 ? {w:'Soda Swamp',sub:'fizz & bounce',dark:false,soda:true,foes:['crawler','gulper','bat']}
    : n<=15 ? {w:'Fridge Dark',sub:'leftovers lurk',dark:true,soda:false,foes:['bat','crawler','gulper']}
    : n<=19 ? {w:'Mold Maze',sub:'the grey closes in',dark:R()<0.5,soda:false,foes:['crawler','bat','gulper','crawler']}
    : {w:'Mushroom Hollow',sub:'spores & caps',dark:true,soda:false,foes:['shroom','shroom','bat','crawler']};
  const diff=Math.min(1,(n-3)/14);
  const W=3400+Math.floor(R()*700);
  const solids=[S(-100,480,600,140)], sprinkles=[], enemies=[], moldWalls=[], signs=[], npcs=[];
  const floats=[];
  let cx=500, y=480;
  let platI=0;
  while(cx < W-620){
    const gap=70+R()*(110+70*diff);
    const w=200+R()*220;
    y=Math.max(250,Math.min(480, y+(R()-0.5)*(160+130*diff)));
    cx+=gap;
    const thick=y>430;
    const top=thick?480:y;
    const pw=thick?w:Math.max(150,w*0.55);
    solids.push(thick?S(cx,480,pw,140):S(cx,y,pw,22));
    if(!thick && R()<0.5) floats.push({x:cx,y});
    // sprinkles arc over the gap + on the platform
    sprinkles.push(P(cx-gap/2,top-70));
    if(R()<0.5) sprinkles.push(P(cx+pw/2,top-50));
    // enemies on roomy thick platforms
    if(thick && pw>260){
      const cnt=R()<0.35+diff*0.5 ? (R()<diff?2:1) : 0;
      for(let i=0;i<cnt;i++) enemies.push(E(wdef.foes[Math.floor(R()*wdef.foes.length)], cx+60+R()*(pw-120), top-40));
    } else if(!thick && R()<diff*0.5){
      enemies.push(E('bat',cx+pw/2,top-160));
    }
    // mold wall to scrub or hop (jump clears 84px)
    if(thick && pw>300 && R()<(wdef.w==='Mold Maze'?0.45:0.28)){
      moldWalls.push(M(cx+pw*0.4,top-84,36,84));
    }
    platI++; cx+=pw;
  }
  solids.push(S(cx,480,W-cx+400,140));
  const exitX=W-280;
  // signs with world flavor
  const pool={
    'Countertop':['Crumbs stick together, baby!','Paint less, jump more… or the other way.','Splat believes in you! Probably.'],
    'Soda Swamp':['Do NOT drink the river. Again.','Mint + high gap = shortcut!','Gulpers gulp. You stomp. Circle of life.'],
    'Fridge Dark':['Stay out of the leftover fog…','Something moved. It was cheese.','Shhh. The Bleu sees all.'],
    'Mold Maze':['The Grey is thick here. Scrub it!','His heart beats below. Keep going!','Erase. Bounce. Climb. BRAVE!'],
    'Mushroom Hollow':['The caps are bouncy. The King is not.','Spore rain soon. Keep moving!','The Mold King was the SMALL brother…','Sage Shroom sees all. Say hi!']
  }[wdef.w];
  signs.push(G(300,400,pool[Math.floor(R()*pool.length)]));
  signs.push(G(Math.floor(W/2),400,pool[Math.floor(R()*pool.length)]));
  // secret Berry + sprinkle stash on a high float every 4th level
  if(n%4===0 && floats.length){
    const f=floats[Math.floor(R()*floats.length)];
    npcs.push(N(R()<0.5?'berryBlue':'berryRed',f.x+60,f.y,'You found our secret stash! Take the ✨, hero crumb! The King fears paint!'));
    sprinkles.push(P(f.x+20,f.y-40),P(f.x+60,f.y-50),P(f.x+100,f.y-40));
  }
  // pretzel check-in (stands on the checkpoint pad — guaranteed ground)
  const cpx=Math.floor(W/2)+50;
  if(n===10||n===15) npcs.push(N('pretzel',cpx,372,'Halfway there, baby! …well, not HALF. You look strong! Full jam, fresh hearts — GO!'));
  // Sage Shroom greets you at the gates of World 2 (and halfway through it)
  if(n===21) npcs.push(N('sage',cpx,372,'Young crumb… I am Sage Shroom. The Mushroom King: size of a house, temper of a toddler. Stomp his minions, dodge the rain, crown the tired King! Take jam!'));
  if(n===30) npcs.push(N('sage',cpx,372,'Halfway through the Hollow, little crumb! The Throne is close. His rain is fear, his crown is soup. Take jam — finish it!'));
  return {
    name:n+' · '+wdef.w, sub:wdef.sub,
    W, H:620, start:{x:80,y:300}, checkpoint:{x:Math.floor(W/2)+50,y:300},
    jams:['berry','mint','choco'], dash:true, dark:wdef.dark, soda:wdef.soda,
    solids, moldWalls, sprinkles, enemies, npcs, signs,
    hint: wdef.dark?'Darkness! Your paint glows — trust it.':(wdef.soda?'Fizz up! Mint bounces over soda gaps.':'Paint BRAVE, little crumb!')
  };
}

const BOSS = {
  name:'20 · The Mold Heart', sub:'KING MOLD awaits 👑',
  W:3200, H:620, start:{x:80,y:300}, checkpoint:{x:2000,y:300}, jams:['berry','mint','choco'], dash:true, dark:false, boss:true,
  bossName:'KING MOLD', bossKing:'mold',
  solids:[
    S(-100,480,700,140), S(800,420,180,20), S(1100,480,400,140),
    S(1620,420,200,20), S(1940,480,1400,140),
  ],
  moldWalls:[ M(1500,380,120,100) ],
  sprinkles:[ P(860,380),P(1700,380),P(2100,420),P(2400,420) ],
  enemies:[ E('crawler',1200,440), E('bat',1750,240) ],
  npcs:[ N('pretzel',1980,480,"That's HIM, baby… KING MOLD. Stomp him when he's TIRED after a slam — 5 times! Paint mid-fight! GO!") ],
  signs:[ G(150,400,'This is it, Pip. Paint BRAVE. — Splat 💦') ],
  hint:'Stomp the KING when he is tired after a SLAM! 5 hits!',
  bossArena:{x:2150,y:200,w:1000,h:280}
};

const L10 = {
  name:'10 · Soda Swamp', sub:'the GREAT MOLD wakes',
  W:3600, H:620, start:{x:80,y:300}, checkpoint:{x:1150,y:300},
  jams:['berry','mint','choco'], dash:true, dark:false, soda:true,
  solids:[
    S(-100,480,600,140), S(700,420,180,20), S(1000,480,600,140),
    S(1600,480,900,140), S(2600,480,1000,140),
  ],
  moldWalls:[],
  sprinkles:[ P(760,380),P(1200,420),P(1400,420),P(1800,420),P(2000,420),P(2200,420),P(2800,420),P(3000,420) ],
  enemies:[ E('crawler',1150,440), E('bat',2000,250) ],
  npcs:[ N('pretzel',1150,480,'The GREAT MOLD ahead feeds on spores! Stomp 20 of them — they come 2 at a time — and it CRUMBLES! Full jam, baby!') ],
  signs:[ G(1650,400,'Stomp the spores! 20 total! Watch the 👁 counter!') ],
  hint:'Stomp 20 gate spores to crumble the GREAT MOLD!',
  sporeGate:{x:2500,w:100,top:180,total:20,batch:2,spawnX:[1950,2250],nearX:1500}
};

const SHROOMKING = {
  name:'40 · The Mushroom Throne', sub:'the MUSHROOM KING awaits 🍄',
  W:3200, H:620, start:{x:80,y:300}, checkpoint:{x:2000,y:300},
  jams:['berry','mint','choco'], dash:true, dark:true, boss:true,
  bossName:'MUSHROOM KING', bossKing:'shroom',
  solids:[
    S(-100,480,700,140), S(800,420,180,20), S(1100,480,400,140),
    S(1620,420,200,20), S(1940,480,1400,140),
  ],
  moldWalls:[ M(1500,380,120,100) ],
  sprinkles:[ P(860,380),P(1700,380),P(2100,420),P(2400,420),P(2700,420) ],
  enemies:[ E('shroom',1200,440), E('bat',1750,240) ],
  npcs:[ N('sage',1980,480,"That's HIM… the Mold King's BIG brother. 6 stomps when he's TIRED — and when he roars, SPORE RAIN falls! Keep moving, little crumb!") ],
  signs:[ G(150,400,'Bigger crown. Bigger temper. Same plan: paint BRAVE. — Splat 💦') ],
  hint:'Dodge the SPORE RAIN! Stomp the tired KING 6 times!',
  bossArena:{x:2150,y:200,w:1000,h:280}
};

const __gen=[];
for(let n=4;n<=19;n++){ if(n===10) continue; __gen.push(genLevel(n)); }
__gen.splice(6,0,L10); // gen order 4,5,6,7,8,9,11… → slot 10 back in place
const __gen2=[];
for(let n=21;n<=39;n++) __gen2.push(genLevel(n)); // World 2: Mushroom Hollow (19 levels)
window.STALE_LEVELS = [L1,L2,L3].concat(__gen,[BOSS],__gen2,[SHROOMKING]); // 40 levels total
// World 1 = levels 1-20 (Mold King), World 2 = 21-25 (Mushroom King)
STALE_LEVELS.forEach((L,i)=>{ if(L.world===undefined) L.world=(i<20)?1:2; });
