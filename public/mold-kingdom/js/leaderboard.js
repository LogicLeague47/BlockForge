window.STALE_Board = {
  key:'stale_board_v1',
  entries:[],
  load(){
    try{ this.entries = JSON.parse(localStorage.getItem(this.key)||'null') || this.seed(); }
    catch(e){ this.entries = this.seed(); }
    return this.entries;
  },
  seed(){
    return [
      {name:'DEV', level:'Mold Heart', time:490.2, deaths:3, spr:20},
      {name:'SPL', level:'Soda Swamp', time:150.5, deaths:5, spr:8},
      {name:'MOM', level:'Countertop', time:90.0, deaths:9, spr:4},
    ];
  },
  save(){ try{ localStorage.setItem(this.key, JSON.stringify(this.entries)); }catch(e){} },
  add(e){ this.entries.push(e); this.entries.sort((a,b)=>a.time-b.time); this.entries=this.entries.slice(0,12); this.save(); },
  clear(){ this.entries=this.seed(); this.save(); },
  fmt(t){ const m=Math.floor(t/60), s=(t%60); return m+':'+(s<10?'0':'')+s.toFixed(1); }
};
STALE_Board.load();
