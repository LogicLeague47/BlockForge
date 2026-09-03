// 4 hand-designed levels. World coords: y down. Ground ~ y=480.
function S(x,y,w,h,kind){return {x,y,w,h,kind:kind||'counter'};}
function M(x,y,w,h){return {x,y,w,h,hp:2};}
function P(x,y){return {x,y,taken:false};}
function E(type,x,y){return {type,x,y};}
function G(x,y,text){return {x,y,text};}

window.STALE_LEVELS = [
{
  name:'1 · The Countertop', sub:'learn to paint, little crumb',
  W:3400, H:620, start:{x:80,y:300}, checkpoint:{x:1900,y:300}, jams:['berry'], dash:false, dark:false,
  solids:[
    S(-100,480,900,140), S(900,480,120,140), // first gap to paint!
    S(1120,480,600,140), S(1120,380,140,20), S(1400,320,160,20), S(1700,380,120,20),
    S(1840,480,700,140), S(2100,360,140,20),
    S(2540,480,200,140), // wall gap
    S(2740,480,800,140), S(2900,340,140,20),
  ],
  moldWalls:[ M(2540,340,40,140) ],
  sprinkles:[ P(950,420),P(1180,340),P(1470,280),P(2150,320),P(2650,400),P(2950,300) ],
  enemies:[ E('crawler',1300,440), E('crawler',2000,440) ],
  signs:[
    G(150,400,'Hi PIP! Drag MOUSE to paint a bridge! — Splat'),
    G(1050,400,'Press 1 for strawberry. Gap too wide? PAINT IT!'),
    G(2500,400,'Grey wall = MOLD. Hold E / right-click to ERASE!'),
  ],
  hint:'Paint over the gap! Collect ✨ for jam.'
},
{
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
  signs:[
    G(120,400,'SHIFT = DASH! Auntie Pretzel upgraded your legs.'),
    G(650,380,'Press 2 for MINT — it BOUNCES! Paint + bounce high!'),
    G(2350,340,'Bats hate stomps. Jump ON them!'),
  ],
  hint:'Mint paint bounces you. Dash with SHIFT!'
},
{
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
  signs:[
    G(120,400,'Brrr… press 3 for CHOCO — climb STICKY walls!'),
    G(1350,440,'Erase grey mold with E to open the way!'),
    G(2700,440,'Your paint GLOWS here. Trust the jam.'),
  ],
  hint:'Choco paint is sticky — hold toward it to climb!'
},
{
  name:'4 · The Mold Heart', sub:'KING MOLD awaits 👑',
  W:3200, H:620, start:{x:80,y:300}, checkpoint:{x:2000,y:300}, jams:['berry','mint','choco'], dash:true, dark:false, boss:true,
  solids:[
    S(-100,480,700,140), S(800,420,180,20), S(1100,480,400,140),
    S(1620,420,200,20), S(1940,480,1400,140),
  ],
  moldWalls:[ M(1500,380,120,100) ],
  sprinkles:[ P(860,380),P(1700,380),P(2100,420),P(2400,420) ],
  enemies:[ E('crawler',1200,440), E('bat',1750,240) ],
  signs:[ G(150,400,'This is it, Pip. Paint BRAVE. — Splat 💦') ],
  hint:'Stomp the KING when he is tired after a SLAM! 5 hits!',
  bossArena:{x:2150,y:200,w:1000,h:280}
}
];
