// Warm only the upcoming scene, one low-priority request at a time.
const warmScene = (() => {
  const loaded = new Set();
  let pending = [], active = false, timer;
  const portraits = ['ajing', 'ajing-avatar', 'jiangbo', 'jiangbo-avatar'];
  const gameArt = [
    ['cover-cloth','cover-basket','cover-hemp','cloth-diamond','cloth-blue','cloth-stripe','pot-flat','pot-granary','pot-neck','bamboo-mark','bamboo-plain','bamboo-two'],
    ['route-ground','route-water','route-debris','route-crate','route-plank','route-dock'],
    ['fleet','redcliff-fire'],
    ['afterwar-map','ending']
  ];
  function pump(){
    if(active || !pending.length) return;
    const name = pending.shift();
    if(loaded.has(name)){pump();return;}
    active = true;
    const img = new Image();
    img.fetchPriority = 'low';
    img.decoding = 'async';
    const done = success => {
      if(success) loaded.add(name);
      active = false;
      pump();
    };
    img.onload = () => done(true);
    img.onerror = () => done(false);
    const version=['ending-life','ending-legacy'].includes(name)?'ending-art-3':'fast-1';
    img.src = `./assets/${name}.webp?v=${version}`;
  }
  return (phase, act, page) => {
    if(typeof Image === 'undefined' || navigator.connection?.saveData) return;
    clearTimeout(timer);
    pending = []; // Drop obsolete queued scenes after navigation or restart.
    let next = [];
    if(phase === 'cover') next = ['market'];
    else if(phase === 'opening') next = portraits;
    else if(phase === 'dialogue') next = [...(act < 3 ? portraits : ['ajing-later','ajing-later-avatar','jiangbo','jiangbo-avatar']), ...gameArt[act]];
    else if(phase === 'game') next = act === 2 ? ['redcliff-fire'] : act === 3 ? ['ending'] : [];
    else if(phase === 'after' || phase === 'fact') next = act < 3 ? [[ 'shore','redcliff','afterwar'][act], ...(act === 2 ? ['ajing-later','ajing-later-avatar'] : [])] : ['ending-life'];
    else if(phase === 'farewell' || phase === 'note') next = ['ending-life'];
    else if(phase === 'ending' && page < 4) next = ['ending-legacy'];
    timer = setTimeout(() => {
      // Let the current scene's visible images finish before speculative work.
      const visible = [...document.images].filter(img => !img.complete);
      if(document.readyState !== 'complete' || visible.length){
        warmScene(phase, act, page);
        return;
      }
      pending = next.filter(name => !loaded.has(name));
      pump();
    }, 800);
  };
})();
