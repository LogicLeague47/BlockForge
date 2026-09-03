window.STALE_Settings = {
  data: { master:80, music:60, sfx:90, shake:true, particles:true, timer:true, flash:false, mode:'chill', controls:'auto', seenIntro:false, unlocked:1, sprinklesTotal:0 },
  load(){
    try{ const s = JSON.parse(localStorage.getItem('stale_settings')||'{}'); Object.assign(this.data, s); }catch(e){}
    return this.data;
  },
  save(){ try{ localStorage.setItem('stale_settings', JSON.stringify(this.data)); }catch(e){} }
};
STALE_Settings.load();
