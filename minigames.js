let play;
function resetGames(){
  play={market:{area:0,opened:[false,false,false],found:[],choice:null,message:''},
    route:{level:0,state:GameRules.startRoute(0),history:[],message:''},
    fleet:{slots:Array(9).fill(null),selected:null,reference:true,started:false,history:[],message:'',won:false},
    map:{slots:Array(3).fill(null),forces:Array(3).fill(null),selected:null,active:0,history:[],message:'',won:false}};
}
resetGames();
const marketAreas=[
  {name:'布摊',cover:'掀开布帘',target:'织锦',clue:'赭红底，连续菱纹，两边有浅色缘。',hint:'颜色和纹样都要对上，单有红底还不够。',answer:1,
    items:[['赤底横纹','朱红布面，横向条纹，浅色布缘。','cloth-stripe'],['赤底菱纹','赭红布面，菱纹相连，浅色布缘。','cloth-diamond'],['青底菱纹','青绿布面，菱纹相连，深色布缘。','cloth-blue']]},
  {name:'陶摊',cover:'移开竹篮',target:'陶仓',clue:'圆腹尖顶，仓身有一个小方口。',hint:'先看顶盖，再找仓身的小方口。',answer:2,
    items:[['细颈陶器','细长颈口，腹部浑圆，底部平整。','pot-neck'],['平盖陶器','平顶圆盖，鼓腹短足，仓身没有方口。','pot-flat'],['尖顶陶器','圆锥尖顶，圆腹短足，仓身有小方口。','pot-granary']]},
  {name:'书摊',cover:'揭开麻布',target:'简牍',clue:'字迹纵列，三道深色编绳，末端有一枚红记。',hint:'除了编绳，还要留意简牍末端的小记号。',answer:0,
    items:[['三绳红记','竹片有纵列字迹，三道深色绳，末端有红记。','bamboo-mark'],['三绳无记','竹片有纵列字迹，三道深色绳，末端没有标记。','bamboo-plain'],['两绳红记','竹片有纵列字迹，两道深色绳，末端有红记。','bamboo-two']]}
];
function objectDrawing(kind){
  return `<img class="object-art" src="./assets/${kind}.webp?v=items-1" alt="" width="512" height="512" draggable="false">`;
}
function hintBox(text){return `<details class="game-hint"><summary>看看提示</summary><p>${text}</p></details>`;}
function gameMessage(text){return `<p class="game-feedback" role="status">${text||' '}</p>`;}
function bindContinue(){const button=document.getElementById('game-continue');if(button)button.onclick=finishGame;}
function renderMarket(){
  const s=play.market,a=marketAreas[s.area],done=s.found.includes(s.area),all=s.found.length===3;
  const tabs=marketAreas.map((v,i)=>`<button class="area-tab ${s.area===i?'active':''}" data-area="${i}" aria-pressed="${s.area===i}">${v.name}${s.found.includes(i)?' ✓':''}</button>`).join('');
  const objects=a.items.map(([name,desc,kind],i)=>`<button class="object-option ${s.choice===i?'selected':''}" data-object="${i}" ${done?'disabled':''} aria-label="查看${name}" aria-pressed="${s.choice===i}">${objectDrawing(kind)}<span>${name}</span></button>`).join('');
  const board=`<div class="game-title">风过市集 <span>${s.found.length} / 3 已寻回</span></div><p class="mobile-objective">江伯记得：${a.clue}</p><div class="area-tabs">${tabs}</div><div class="search-scene area-${s.area}"><div class="search-shelf">${s.opened[s.area]?objects:`<button class="search-cover" id="uncover"><img class="cover-art" src="./assets/${['cover-cloth','cover-basket','cover-hemp'][s.area]}.webp?v=items-1" alt="" draggable="false"><strong>${a.cover} <span aria-hidden="true">↗</span></strong></button>`}</div></div>${s.choice!==null&&!done?`<div class="object-inspect">${objectDrawing(a.items[s.choice][2])}<div><p>${a.items[s.choice][1]}</p><button class="primary" id="collect">认作${a.target}，收回</button></div></div>`:''}${done?`<div class="game-success">${a.target}已收好。${all?'三样荆楚风物，一样不少。':'再去别的摊位看看。'}</div>`:''}`;
  gameShell(board,`<h3>江伯的嘱托</h3><p class="clue-quote">${a.clue}</p>${gameMessage(s.message)}${hintBox(a.hint)}${all?'<button class="primary" id="game-continue">带回货物 →</button>':'<p class="game-note">翻找遮挡物，查看细节，再收回货物。</p>'}`);
  screen.querySelectorAll('[data-area]').forEach(b=>b.onclick=()=>{s.area=Number(b.dataset.area);s.choice=null;s.message='';renderMarket();});
  const uncover=document.getElementById('uncover');if(uncover)uncover.onclick=()=>{s.opened[s.area]=true;renderMarket();};
  screen.querySelectorAll('[data-object]').forEach(b=>b.onclick=()=>{s.choice=Number(b.dataset.object);s.message='';renderMarket();});
  const collect=document.getElementById('collect');if(collect)collect.onclick=()=>{
    if(s.choice===a.answer){s.found.push(s.area);s.message='与江伯说的特征都对上了。';s.choice=null;}
    else{s.message='还有一处特征对不上。再对照江伯的嘱托看看。';s.choice=null;}
    renderMarket();
  };bindContinue();
}
function renderShore(){
  if(runnerCleanup){runnerCleanup();runnerCleanup=null;}
  const s=play.route,level=GameRules.routeLevels[s.level],w=level.rows[0].length,won=GameRules.routeWon(s.level,s.state);
  const tiles=level.rows.join('').split('').map((tile,i)=>{
    const player=i===s.state.player,crate=s.state.crates.includes(i),board=i===s.state.board,bridge=s.state.bridges.includes(i);
    let kind=tile==='#'?'wall':tile==='~'?'water':tile==='G'?'exit':'ground';
    if(bridge)kind='bridge';if(crate)kind='crate';if(board)kind='plank';
    const names={wall:'辎重',water:'断沟',exit:s.level===0?'下游':'渡口',ground:'岸路',bridge:'已铺木板',crate:'空筐',plank:'木板'};
    return `<button class="route-cell ${kind} ${player?'is-player':''}" data-cell="${i}" aria-label="${Math.floor(i/w)+1}行${i%w+1}列 ${player?'阿荆':names[kind]}" ${won||kind==='wall'?'disabled':''}>${player?'<span class="route-person"><img src="./assets/ajing-avatar.webp" alt="" draggable="false"></span>':kind==='exit'?'<span>'+names[kind]+'</span>':''}</button>`;
  }).join('');
  gameShell(`<div class="game-title">江岸寻路 <span>${s.level+1} / 2 · ${level.name}</span></div><p class="mobile-objective">推开空筐，把木板推入断沟。</p><div class="route-grid" id="route-grid" tabindex="0" aria-label="江岸棋盘，用方向键或下方按钮移动" style="--cols:${w};--rows:${level.rows.length}">${tiles}</div><div class="route-legend"><span><img src="./assets/ajing-avatar.webp" alt="">阿荆</span><span><img src="./assets/route-crate.webp" alt="">空筐 · 可推</span><span><img src="./assets/route-plank.webp" alt="">木板 · 跨沟</span><span><img src="./assets/route-debris.webp" alt="">辎重 · 不可推</span></div><div class="route-controls"><div class="dpad"><button data-move="0,-1" aria-label="向上">↑</button><button data-move="-1,0" aria-label="向左">←</button><button data-move="0,1" aria-label="向下">↓</button><button data-move="1,0" aria-label="向右">→</button></div><span>${s.state.steps} 步</span></div>`,
    `<h3>${won?'路已打通':'向渡口去'}</h3><p>${won?(s.level===0?'这段岸路通了，下游还有一处断沟。':'江伯的船就在眼前。带好行囊，上船吧。'):'推开空筐，把木板推入断沟，走到岸路尽头。'}</p>${gameMessage(s.message)}<div class="tool-row"><button class="secondary" id="route-undo" ${s.history.length?'':'disabled'}>撤回一步</button><button class="secondary" id="route-reset">重走本段</button></div>${hintBox(level.hint)}${won?`<button class="primary" id="route-next">${s.level===0?'继续沿岸 →':'登船 →'}</button>`:'<p class="game-note">方向键、下方箭头或点击相邻格移动。</p>'}`);
  const redraw=()=>{renderShore();document.getElementById('route-grid').focus({preventScroll:true});};
  function move(dx,dy){if(won)return;const next=GameRules.moveRoute(s.level,s.state,dx,dy);if(next){s.history.push(s.state);s.state=next;s.message='';redraw();}else{document.querySelector('.game-feedback').textContent='此处走不通。空筐只能推，断沟需要木板。';}}
  screen.querySelectorAll('[data-move]').forEach(b=>b.onclick=()=>move(...b.dataset.move.split(',').map(Number)));
  screen.querySelectorAll('[data-cell]').forEach(b=>b.onclick=()=>{const n=Number(b.dataset.cell),dx=n%w-s.state.player%w,dy=Math.floor(n/w)-Math.floor(s.state.player/w);if(Math.abs(dx)+Math.abs(dy)===1)move(dx,dy);else document.querySelector('.game-feedback').textContent='先走到相邻的一格。';});
  document.getElementById('route-undo').onclick=()=>{if(s.history.length){s.state=s.history.pop();s.message='已退回一步。';redraw();}};
  document.getElementById('route-reset').onclick=()=>{s.state=GameRules.startRoute(s.level);s.history=[];s.message='从这一段岸路重新出发。';redraw();};
  const next=document.getElementById('route-next');if(next)next.onclick=()=>{if(s.level===1)finishGame();else{s.level++;s.state=GameRules.startRoute(s.level);s.history=[];s.message='';redraw();}};
  const arrows={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]};
  const key=e=>{if(arrows[e.key]&&!e.altKey&&!e.ctrlKey&&!e.metaKey){e.preventDefault();if(!e.repeat)move(...arrows[e.key]);}};
  window.addEventListener('keydown',key);runnerCleanup=()=>window.removeEventListener('keydown',key);
}
const fleetOrder=[7,2,5,0,8,3,6,1,4];
const fleetMarks=['丁','辛','乙','己','壬','丙','庚','甲','戊'];
function fleetStyle(piece){return `background-position:${(piece%3)*50}% ${Math.floor(piece/3)*50}%`;}
function renderPuzzle(){
  const s=play.fleet,used=s.slots.filter(p=>p!==null),full=used.length===9;
  const tiles=s.slots.map((piece,i)=>`<button class="fleet-cell ${piece!==null?'has-piece':''} ${s.selected===piece&&piece!==null?'selected':''}" data-slot="${i}" style="${piece!==null?fleetStyle(piece):''}" ${s.won?'disabled':''} ${piece!==null?`draggable="true" data-drag-piece="${piece}"`:''} aria-label="第${i+1}格${piece!==null?'，碎片'+fleetMarks[piece]:'，空位'}">${piece===null?'<span>＋</span>':''}</button>`).join('');
  const tray=fleetOrder.filter(p=>!used.includes(p)).map(p=>`<button class="fleet-cell has-piece ${s.selected===p?'selected':''}" data-piece="${p}" data-drag-piece="${p}" draggable="true" style="${fleetStyle(p)}" aria-label="选择碎片${fleetMarks[p]}"><span class="piece-mark">${fleetMarks[p]}</span></button>`).join('');
  const reference=s.reference?`<div class="fleet-observe"><div class="fleet-whole" role="img" aria-label="江面示意：上方北岸连舟，下方南岸船阵，中部水纹和小舟"></div><p>记住岸线、水纹与船影的连接。</p><button class="primary" id="fleet-hide">${s.started?'收起参考图':'开始拼合'} →</button></div>`:'';
  gameShell(`<div class="game-title">夜江辨阵 <span>${used.length} / 9 已摆放</span></div>${reference||`<div class="fleet-nine">${tiles}</div><div class="fleet-nine-tray">${tray}</div>`}`,
    `<h3>${s.won?'江面渐明':'理清船阵'}</h3><p>${s.won?'岸线与水纹已接合，江面图景重现。':'先选碎片，再选位置；已放碎片可以互换，也可拖拽。'}</p>${gameMessage(s.message)}<div class="tool-row"><button class="secondary" id="fleet-look" ${s.reference?'disabled':''}>回望江面</button><button class="secondary" id="fleet-undo" ${!s.history.length||s.won||s.reference?'disabled':''}>撤回一步</button></div>${!s.reference&&!s.won?`<button class="primary" id="fleet-check" ${full?'':'disabled'}>核对全图</button><button class="text-button" id="fleet-reset">重新拼合</button>`:''}${s.won?'<button class="primary" id="game-continue">望向江面 →</button>':hintBox('先找带岸线的边缘碎片，再沿水纹接出中央航道。碎片上的小记号只用于区分，不表示位置。')}<p class="game-note">江面战术示意，非精确军阵复原。</p>`);
  const hide=document.getElementById('fleet-hide');if(hide)hide.onclick=()=>{s.reference=false;s.started=true;renderPuzzle();};
  document.getElementById('fleet-look').onclick=()=>{s.reference=true;renderPuzzle();};
  const drop=(piece,slot)=>{if(s.won||!Number.isInteger(piece)||piece<0||piece>8)return;s.history.push([...s.slots]);s.slots=GameRules.placePiece(s.slots,piece,slot);s.selected=null;s.message='';renderPuzzle();};
  screen.querySelectorAll('[data-piece]').forEach(b=>b.onclick=()=>{s.selected=Number(b.dataset.piece);renderPuzzle();});
  screen.querySelectorAll('[data-slot]').forEach(b=>{
    const index=Number(b.dataset.slot);
    b.onclick=()=>{if(s.selected!==null)drop(s.selected,index);else if(s.slots[index]!==null){s.selected=s.slots[index];renderPuzzle();}};
    b.ondragover=e=>e.preventDefault();b.ondrop=e=>{e.preventDefault();const value=e.dataTransfer.getData('text/plain');if(/^[0-8]$/.test(value))drop(Number(value),index);};
  });
  screen.querySelectorAll('[data-drag-piece]').forEach(b=>b.ondragstart=e=>e.dataTransfer.setData('text/plain',b.dataset.dragPiece));
  document.getElementById('fleet-undo').onclick=()=>{if(s.history.length){s.slots=s.history.pop();s.selected=null;s.message='';renderPuzzle();}};
  const check=document.getElementById('fleet-check');if(check)check.onclick=()=>{s.won=GameRules.puzzleWon(s.slots);s.message=s.won?'水纹相连，船影归位。':'还有接缝不连贯。再看岸线与水纹，调整后核对。';renderPuzzle();};
  const reset=document.getElementById('fleet-reset');if(reset)reset.onclick=()=>{s.history.push([...s.slots]);s.slots=Array(9).fill(null);s.selected=null;s.message='';renderPuzzle();};bindContinue();
}
const mapPlaces=['汉水一带','长江北岸','长江南岸'];
const mapClues=[['汉水来讯','襄阳在汉水一带。北方曹军仍驻守此城。'],['江陵来讯','周瑜攻取长江北岸的江陵。周瑜领的是孙权麾下江东军。'],['南岸来讯','刘备在江陵以南、长江南岸的公安立营。']];
function renderMatch(){
  const s=play.map,cityName=id=>GameRules.cities.find(c=>c.id===id)?.name||'放置城池';
  const save=()=>s.history.push({slots:[...s.slots],forces:[...s.forces],active:s.active});
  const slots=mapPlaces.map((place,i)=>`<button class="map-site site-${i} ${s.active===i?'active':''}" data-map-site="${i}" ${s.won?'disabled':''}><span>${place}</span><strong>${cityName(s.slots[i])}</strong><em>${s.forces[i]||'归属待定'}</em></button>`).join('');
  const cities=GameRules.cities.map(c=>`<button class="city-token ${s.selected===c.id?'selected':''}" data-map-city="${c.id}" aria-pressed="${s.selected===c.id}" draggable="true" ${s.won?'disabled':''}>${c.name}${s.slots.includes(c.id)?' · 已标':''}</button>`).join('');
  const forces=['曹操','刘备','孙权'].map(f=>`<button class="force-token ${s.forces[s.active]===f?'selected':''}" data-map-force="${f}" aria-pressed="${s.forces[s.active]===f}" ${s.won||!s.slots[s.active]?'disabled':''}>${f}</button>`).join('');
  const complete=s.slots.every(Boolean)&&s.forces.every(Boolean);
  gameShell(`<div class="game-title">重识荆州 <span>建安十四年 · 战后初局</span></div><a class="mobile-objective" href="#map-clues">先查看三地消息 ↓</a><div class="inference-map"><svg viewBox="0 0 600 470" preserveAspectRatio="none" aria-hidden="true"><path class="map-land" d="M0 0H600V470H0Z"/><path class="map-river" d="M0 290Q120 255 220 284T415 298T600 342"/><path class="map-river han" d="M330 0Q280 100 345 177T440 300"/><g class="map-mountains"><path d="M40 85l28-45 26 45m5 15 30-60 33 60M420 80l30-48 26 48m15 16 27-52 34 52M70 415l30-42 30 42"/></g><text x="32" y="264">长江</text><text x="359" y="100">汉水</text><text x="550" y="38">北 ↑</text></svg>${slots}</div><div class="city-tray">${cities}</div><div class="force-editor"><p>标记${s.slots[s.active]?cityName(s.slots[s.active]):mapPlaces[s.active]}归属</p><div class="force-tray">${forces}</div></div>`,
    `<h3>${s.won?'舆图已明':'核对三地消息'}</h3><p>${s.won?'沿途归属已记清，可以准备南迁了。':'选城池，再点地图位置；选中位置后，标记势力。'}</p><div class="map-clues" id="map-clues">${mapClues.map(([title,body])=>`<details><summary>${title}</summary><p>${body}</p></details>`).join('')}</div>${gameMessage(s.message)}${s.won?'<button class="primary" id="game-continue">收好舆图 →</button>':`<button class="primary" id="map-check" ${complete?'':'disabled'}>核对舆图</button><div class="tool-row"><button class="secondary" id="map-undo" ${s.history.length?'':'disabled'}>撤回一步</button><button class="secondary" id="map-reset">重新标记</button></div>${hintBox('先用汉水、长江两岸定位，再从消息里找出驻守者。周瑜与孙权的关系是江陵归属的关键。')}`}<p class="game-note">方位示意，不按比例；此为战后初局。</p>`);
  const place=(id,index)=>{if(s.won||!GameRules.cities.some(c=>c.id===id))return;save();const from=s.slots.indexOf(id);if(from!==index){if(from>=0){s.slots[from]=s.slots[index];s.forces[from]=null;}s.slots[index]=id;s.forces[index]=null;}s.active=index;s.selected=null;s.message='';renderMatch();};
  screen.querySelectorAll('[data-map-city]').forEach(b=>{b.onclick=()=>{s.selected=b.dataset.mapCity;s.message='在图上选择这座城的位置。';renderMatch();};b.ondragstart=e=>e.dataTransfer.setData('text/plain',b.dataset.mapCity);});
  screen.querySelectorAll('[data-map-site]').forEach(b=>{const i=Number(b.dataset.mapSite);b.onclick=()=>{if(s.selected)place(s.selected,i);else{s.active=i;renderMatch();}};b.ondragover=e=>e.preventDefault();b.ondrop=e=>{e.preventDefault();place(e.dataTransfer.getData('text/plain'),i);};});
  screen.querySelectorAll('[data-map-force]').forEach(b=>b.onclick=()=>{if(!s.slots[s.active]||s.won)return;save();s.forces[s.active]=b.dataset.mapForce;s.message='';renderMatch();});
  const check=document.getElementById('map-check');if(check)check.onclick=()=>{s.won=GameRules.mapWon(s.slots,s.forces);s.message=s.won?'三地位置与归属，均与消息相合。':'位置或归属仍有矛盾。重新对照三条消息再核对。';renderMatch();};
  const undo=document.getElementById('map-undo');if(undo)undo.onclick=()=>{if(s.history.length){Object.assign(s,s.history.pop());s.selected=null;s.message='';renderMatch();}};
  const reset=document.getElementById('map-reset');if(reset)reset.onclick=()=>{save();s.slots=Array(3).fill(null);s.forces=Array(3).fill(null);s.selected=null;s.message='';renderMatch();};bindContinue();
}
