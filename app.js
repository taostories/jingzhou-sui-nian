const app = document.getElementById('app');
const screen = document.getElementById('screen');
const progress = document.getElementById('progress');
const acts = story.acts;
// Break at sentence boundaries without deleting or rewriting source text.
function textPages(text, limit=58){
  const sentences=text.match(/[^。！？；]+[。！？；]?/g)||[text];
  const pages=[];
  for(const sentence of sentences){
    if(pages.length&&pages[pages.length-1].length+sentence.length<=limit) pages[pages.length-1]+=sentence;
    else pages.push(sentence);
  }
  return pages;
}
function dialoguePages(rows){return rows.flatMap(([speaker,text,cue])=>textPages(text).map((part,i)=>[speaker,part,i===0?cue:'']));}
const endings = story.endings.flatMap(text=>textPages(text,110).map(text=>({text})));
let phase = 'cover', act = 0, line = 0, endPage = 0;
let raf = null, runnerCleanup = null;
function sceneArt(){
  const burning=act===2&&phase!=='dialogue';
  const filename=phase==='opening'?'cover':phase==='farewell'||phase==='note'?'farewell':burning?'redcliff-fire':acts[act].scene;
  return `<div class="scene-art ${burning?'fire':''}" aria-hidden="true"><div class="sun"></div><div class="mount"></div><div class="river"></div><div class="boat"></div>${artImage(filename)}</div>`;
}
function artImage(name){
  const file={cover:'market',farewell:'ending'}[name]||name;
  return `<img class="scene-image" src="./assets/${file}.webp?v=art-1" alt="" onerror="this.style.display='none'">`;
}
function updateProgress(){
  if(phase==='cover'){progress.innerHTML='建安十三年 · 荆州';return;}
  if(phase==='opening'){progress.textContent='序章 · 荆州旧梦';return;}
  if(phase==='ending'){progress.textContent='尾声 · 文脉绵延';return;}
  progress.innerHTML=`<span>第 ${Math.min(act+1,4)} / 4 幕</span><span class="dots">${acts.map((_,i)=>`<span class="dot ${i<=act?'on':''}"></span>`).join('')}</span>`;
}
function chapterHead(){
  if(phase==='opening')return '<div class="chapter-head"><div><div class="kicker">建安十三年 · 荆州</div><h2>开场背景</h2></div></div>';
  const leaving=phase==='farewell'||phase==='note';
  return `<div class="chapter-head"><div><div class="kicker">${leaving?'第四幕之后 · 江风拂岸':`第 ${['一','二','三','四'][act]} 幕 · ${acts[act].period}`}</div><h2>${leaving?(phase==='note'?'此后岁年':'渡口道别'):acts[act].title}</h2></div>${leaving?'':`<div class="chapter-desc">${acts[act].game}</div>`}</div>`;
}
function render(){
  if(raf) cancelAnimationFrame(raf); raf=null;
  if(runnerCleanup){runnerCleanup();runnerCleanup=null;}
  app.dataset.scene = phase==='cover'?'cover':phase==='ending'?'ending':['farewell','note'].includes(phase)?'farewell':acts[act].scene;
  app.dataset.mode = ['opening','dialogue','after','farewell','note'].includes(phase)?'dialogue':phase;
  updateProgress();
  if(phase==='cover') return renderCover();
  if(['opening','dialogue','after','farewell','note'].includes(phase)) return renderDialogue();
  if(phase==='game') return renderGame();
  if(phase==='fact') return renderFact();
  if(phase==='ending') return renderEnding();
}
function renderCover(){
  screen.innerHTML=`<div class="hero fade"><div><div class="eyebrow">一江 · 一城 · 四段岁年</div><h1 class="title"><img class="cover-title-art" src="./assets/title-jingzhou.webp?v=title-1" alt="荆州岁年" width="1882" height="810"></h1><p class="subtitle">从江陵街市到江南乡野，随阿荆走过战火，见证荆楚文脉随人延续。</p><div class="cta"><button class="primary" id="start">启程入史 →</button><span class="tiny">线性历史互动故事</span></div></div><div class="visual" aria-hidden="true"><div class="sun"></div><div class="mount"></div><div class="river"></div><div class="boat"></div><div class="caption">建安十三年 · 荆州</div></div></div>`;
  document.getElementById('start').onclick=()=>{resetGames();phase='opening';act=0;line=0;render();};
  screen.querySelector('.visual').insertAdjacentHTML('beforeend',artImage('cover'));
}
function renderDialogue(){
  const rows=phase==='opening'?story.opening.map(text=>['序章',text,'']):phase==='dialogue'?acts[act].lines:phase==='after'?acts[act].after:phase==='farewell'?story.farewell:[['剧情定局',story.note,'']];
  const group=dialoguePages(phase==='dialogue'?[...rows,...(acts[act].gameIntro||[])]:rows);
  const [speaker,text,cue]=group[line];
  const character={阿荆:act<3?'ajing':'ajing-later',江伯:'jiangbo'}[speaker];
  const portrait=character?`${character}-avatar.webp`:speaker==='旅人'?'traveler.webp':null;
  screen.innerHTML=`<section class="chapter dialogue-page">${chapterHead()}<div class="scene dialogue-scene">${sceneArt()}<div class="dialogue-panel"><div class="dialogue-meta"><div class="portrait"><img src="./assets/${portrait||'ajing.webp'}" alt="" onload="this.nextElementSibling.style.opacity='0'" onerror="this.style.display='none'"><span>${speaker.slice(0,1)}</span></div><div class="speaker">${speaker}</div><span class="hint">${line+1} / ${group.length}</span></div><div class="dialogue"><p class="line">${text}</p></div><div class="scene-footer"><button class="primary" id="next">继续 →</button></div></div></div></section>`;
  if(character) screen.querySelector('.dialogue-scene').insertAdjacentHTML('afterbegin',`<img class="character-art" src="./assets/${character}.webp" alt="${speaker}" onerror="this.style.display='none'">`);
  if(!portrait) screen.querySelector('.portrait').remove();
  if(phase==='dialogue'&&line===group.length-1) document.getElementById('next').textContent=['去寻物 →','前往渡口 →','辨认船阵 →','整理舆图 →'][act];
  if(cue){const annotation=document.createElement('span');annotation.className='delivery-cue';annotation.textContent=cue;screen.querySelector('.speaker').append(annotation);}
  document.getElementById('next').onclick=()=>{
    line++;
    if(line>=group.length){
      line=0;
      if(phase==='opening')phase='dialogue';
      else if(phase==='dialogue')phase='game';
      else if(phase==='after')phase='fact';
      else if(phase==='farewell')phase='note';
      else phase='fact';
    }
    render();
  };
}
function renderGame(){
  if(act===0) return renderMarket();
  if(act===1) return renderShore();
  if(act===2) return renderPuzzle();
  renderMatch();
}
function gameShell(board,side){screen.innerHTML=`<section class="chapter game-chapter">${chapterHead()}<div class="game"><div class="gameboard">${board}</div><aside class="sidecard">${side}</aside></div></section>`;}
function finishGame(){phase=acts[act].after.length?'after':'farewell';line=0;render();}
function renderFact(){
  screen.innerHTML=`<section class="chapter fade">${chapterHead()}<div class="scene">${sceneArt()}<div class="kicker">史料卡片</div><p class="line">${acts[act].fact}</p><div class="scene-footer"><span class="hint">史事有据 · 岁月有声</span><button class="primary" id="fact-next">${act===3?'走向尾声':'进入下一幕'} →</button></div></div></section>`;
  document.getElementById('fact-next').onclick=()=>{if(act===3){phase='ending';endPage=0;}else{act++;phase='dialogue';line=0;}render();};
  if(acts[act].mood){const mood=document.createElement('p');mood.className='mood-note';mood.textContent='阿荆心境 · '+acts[act].mood;screen.querySelector('.scene-footer').before(mood);}
}
function renderEnding(){
  const body=endings[endPage].text;
  screen.innerHTML=`<section class="end fade"><div class="eyebrow">尾声 · ${endPage+1} / ${endings.length}</div><p>${body}</p>${endPage===endings.length-1?'<div class="mark">——《荆州岁年》终</div>':''}<div style="margin-top:36px"><button class="primary" id="end-next">${endPage===endings.length-1?'重温岁年':'继续'} →</button></div></section>`;
  document.getElementById('end-next').onclick=()=>{if(endPage===endings.length-1){phase='cover';act=0;line=0;endPage=0;resetGames();}else endPage++;render();};
  screen.insertAdjacentHTML('afterbegin',`<div class="ending-art" aria-hidden="true">${artImage('ending')}</div>`);
}
render();
