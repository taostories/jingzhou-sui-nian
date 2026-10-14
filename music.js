// One persistent player: dialogue, games and history cards never recreate it.
(() => {
  const audio = document.getElementById('background-music');
  const toggle = document.getElementById('music-toggle');
  const credits = document.getElementById('music-credits');
  let enabled = true, unlocked = false, track = 'river-flute', current = '', status = 'idle', fade;
  try { enabled = localStorage.getItem('jingzhou-music') !== 'off'; } catch {}
  const levels = {'shenyang': .24, 'river-flute': .7};
  function paint(){
    const label = !enabled ? '音乐关' : status === 'error' ? '重试音乐' : !unlocked ? '开启音乐' : status === 'loading' ? '加载中' : '音乐开';
    toggle.textContent = '♪ ' + label;
    toggle.setAttribute('aria-pressed', String(enabled && unlocked && status === 'playing'));
    toggle.setAttribute('aria-label', status === 'error' ? '重试播放背景音乐' : enabled && unlocked ? '关闭背景音乐' : '开启背景音乐');
    toggle.title = `${track === 'shenyang' ? 'Shenyang' : 'River Flute'} · Kevin MacLeod`;
  }
  function stop(){
    clearInterval(fade);
    audio.pause();
    status = 'idle';
    paint();
  }
  function play(){
    if(!enabled || !unlocked || document.hidden) return;
    if(current !== track){
      clearInterval(fade);
      audio.pause();
      audio.src = `./assets/audio/${track}.mp3?v=music-1`;
      current = track;
      audio.volume = 0;
    }
    if(!audio.paused){paint();return;}
    status = 'loading';
    paint();
    audio.play().catch(error => {
      // A source change can cancel an earlier play promise without failing playback.
      if(error.name === 'AbortError') return;
      status = error.name === 'NotAllowedError' ? 'idle' : 'error';
      if(error.name === 'NotAllowedError') unlocked = false;
      paint();
    });
  }
  audio.addEventListener('playing', () => {
    status = 'playing';
    const level = levels[current];
    clearInterval(fade);
    fade = setInterval(() => {
      audio.volume = Math.min(level, audio.volume + .02);
      if(audio.volume >= level) clearInterval(fade);
    }, 80);
    paint();
  });
  audio.addEventListener('waiting', () => {if(enabled){status='loading';paint();}});
  audio.addEventListener('error', () => {status='error';paint();});
  toggle.addEventListener('click', () => {
    if(status === 'error') {audio.load();enabled=true;}
    else if(!unlocked) enabled = true;
    else enabled = !enabled;
    unlocked = true;
    try {localStorage.setItem('jingzhou-music',enabled ? 'on' : 'off');} catch {}
    if(enabled) play(); else stop();
  });
  // A real click/keyboard activation unlocks audio; no autoplay download at entry.
  document.getElementById('app').addEventListener('click', () => {
    if(!enabled || unlocked) return;
    unlocked = true;
    play();
  }, true);
  document.addEventListener('visibilitychange', () => {
    if(document.hidden) stop(); else play();
  });
  document.getElementById('music-info').addEventListener('click', () => credits.showModal());
  document.getElementById('music-close').addEventListener('click', () => credits.close());
  window.setStoryMusic = (phase, act) => {
    track = act === 0 && ['dialogue','game','after','fact'].includes(phase) ? 'shenyang' : 'river-flute';
    if(enabled && unlocked) play(); else paint();
  };
  paint();
})();
