// Local translations: no network translation service and no changes to game IDs.
const I18n = (() => {
  let language='zh';
  try { if(localStorage.getItem('jingzhou-language')==='en') language='en'; } catch {}
  const pairs = `
荆州岁年|Years in Jingzhou
启程入史|Begin the Journey
序章 · 荆州旧梦|Prologue · Memories of Jingzhou
尾声 · 文脉绵延|Epilogue · A Living Heritage
建安十三年 · 荆州|Jingzhou · 208 CE
开场背景|Prologue
第四幕之后 · 江风拂岸|After Act IV · Beside the River
此后岁年|The Years Ahead
渡口道别|Farewell at the Landing
剧情定局|The Journey Continues
史料卡片|Historical Note
史事有据 · 岁月有声|History remembered through ordinary lives
走向尾声|Enter the Epilogue
进入下一幕|Next Act
阿荆心境 · |A Jing’s reflections · 
——《荆州岁年》终|— Years in Jingzhou · The End
重温岁年|Begin Again
去寻物|Find the Goods
前往渡口|Head to the Landing
辨认船阵|Study the Fleet
整理舆图|Update the Map
江伯|Uncle Jiang
阿荆|A Jing
旅人|Traveler
序章|Prologue
尾声|Epilogue
继续|Continue
江土安宁|Peace along the River
山河骤变|A Homeland in Upheaval
赤壁烽火|Flames at Red Cliffs
荆土分疆|A Divided Jingzhou
建安十三年 · 春|Spring · 208 CE
建安十三年 · 秋|Autumn · 208 CE
建安十三年 · 冬|Winter · 208 CE
建安十四年 · 战后初局|209 CE · After the Battle
风过市集|The Windswept Market
江岸寻路|The Riverside Path
夜江辨阵|Ships in the Night
重识荆州|Reading the New Map
看看提示|Show a Hint
布摊|Cloth Stall
陶摊|Pottery Stall
书摊|Book Stall
掀开布帘|Lift the Cloth
移开竹篮|Move the Basket
揭开麻布|Lift the Hemp Cloth
赭红底，连续菱纹，两边有浅色缘。|Rust-red cloth, repeating diamonds, and pale edges on both sides.
颜色和纹样都要对上，单有红底还不够。|Match both the color and the pattern. Red cloth alone is not enough.
赤底横纹|Red Stripes
朱红布面，横向条纹，浅色布缘。|Scarlet cloth with horizontal stripes and pale edges.
赤底菱纹|Red Diamonds
赭红布面，菱纹相连，浅色布缘。|Rust-red cloth with linked diamonds and pale edges.
青底菱纹|Blue Diamonds
青绿布面，菱纹相连，深色布缘。|Blue-green cloth with linked diamonds and dark edges.
圆腹尖顶，仓身有一个小方口。|A round body, a pointed roof, and a small square opening.
先看顶盖，再找仓身的小方口。|Look at the roof, then find the small square opening in the body.
细颈陶器|Narrow-necked Pot
细长颈口，腹部浑圆，底部平整。|A slender neck, a rounded body, and a flat base.
平盖陶器|Flat-roofed Pot
平顶圆盖，鼓腹短足，仓身没有方口。|A flat round lid, a rounded body, and short feet. No square opening.
尖顶陶器|Pointed-roof Pot
圆锥尖顶，圆腹短足，仓身有小方口。|A pointed roof, a rounded body, short feet, and a small square opening.
字迹纵列，三道深色编绳，末端有一枚红记。|Vertical writing, three dark binding cords, and a red mark at one end.
除了编绳，还要留意简牍末端的小记号。|Check the binding cords and the small mark at the end.
三绳红记|Three Cords, Red Mark
竹片有纵列字迹，三道深色绳，末端有红记。|Vertical writing, three dark cords, and a red mark at the end.
三绳无记|Three Cords, No Mark
竹片有纵列字迹，三道深色绳，末端没有标记。|Vertical writing and three dark cords, but no mark at the end.
两绳红记|Two Cords, Red Mark
竹片有纵列字迹，两道深色绳，末端有红记。|Vertical writing, two dark cords, and a red mark at the end.
织锦|Brocade
陶仓|Pottery Granary
简牍|Bamboo Manuscript
江伯记得：|Uncle Jiang remembers: 
江伯的嘱托|Uncle Jiang’s Description
三样荆楚风物，一样不少。|All three treasures of Jingchu are safe.
再去别的摊位看看。|Try another stall.
带回货物|Return the Goods
翻找遮挡物，查看细节，再收回货物。|Lift the cover, inspect the details, then collect the matching item.
与江伯说的特征都对上了。|Every detail matches Uncle Jiang’s description.
还有一处特征对不上。再对照江伯的嘱托看看。|One detail does not match. Check Uncle Jiang’s description again.
已寻回|found
已收好。| secured. 
穿过辎重|Through the Debris
抵达下游|Down to the Landing
辎重 · 不可推|Debris · Fixed
空筐 · 可推|Basket · Pushable
木板 · 跨沟|Plank · Makes a Bridge
已铺木板|Bridge
岸路|Path
下游|Downstream
渡口|Landing
辎重|Debris
断沟|Water Gap
空筐|Basket
木板|Plank
游戏玩法|How to Play
移动：|Move: 
推空筐：|Push baskets: 
搭桥：|Build a bridge: 
走错了：|Made a mistake? 
方向键或下方箭头，每次走一格；也能点击阿荆上下左右的相邻格。不能斜走或跳格。|Use the keyboard arrows or the buttons below to move one square. You can also click a square directly beside A Jing. No diagonal moves or jumping.
站在筐旁，朝筐的方向走，就会把它向前推一格。只能推、不能拉；筐前方必须有空路，不能推入水沟，也不能一次推两个物件。|Stand beside a basket and move toward it to push it one square. You can push, but not pull. The square beyond must be clear ground. Baskets cannot enter water, and you cannot push two objects together.
木板和空筐一样推。站到木板背后，把它推入紧挨着的蓝色断沟，木板就会变成桥；再从桥上走过去。空筐不能代替木板。|Push the plank like a basket. Stand behind it and push it into the neighboring blue water gap to make a bridge, then walk across. A basket cannot make a bridge.
石块和辎重不能移动。筐推到死角后，可点“撤回一步”；也能“重走本段”，不限次数。|Rocks and debris cannot move. If a basket gets stuck, choose Undo or Restart Section. You can retry as often as you like.
搭桥示意：阿荆 → 木板 → 断沟。向右推一次，木板落沟；再向右走，就能上桥。|Example: A Jing → Plank → Water. Push right once to lay the plank, then move right again to step onto the bridge.
第一步：从起点向右走两格，再向下推开挡路的空筐。|First move: go two squares right from the start, then push the blocking basket down.
第二段：先让上方空筐靠右；木板需要绕路调整方向。卡住时可展开“看看提示”。|Section 2: move the upper basket to the right. You will need to walk around the plank to change its direction. Open Show a Hint if you get stuck.
路已打通|The Way Is Clear
向渡口去|Reach the Landing
这段岸路通了，下游还有一处断沟。|This stretch is clear. Another gap awaits downstream.
江伯的船就在眼前。带好行囊，上船吧。|Uncle Jiang’s boat is just ahead. Gather your belongings and board.
本段目标：走到右侧标有“下游”的格子。先推开挡路空筐，再把木板推入水沟搭桥。|Reach the Downstream square on the right. Move the blocking basket, then push the plank into the water to make a bridge.
本段目标：走到右上角“渡口”。木板要先绕路调整位置，再推入断沟搭桥。|Reach the Landing at the top right. Walk around to reposition the plank, then push it into the water to make a bridge.
撤回一步|Undo
重走本段|Restart Section
正在前往下一段岸路…|Moving to the next section…
已到渡口，正在登船…|Landing reached. Boarding the boat…
方向键、下方箭头或点击相邻格移动。|Move with keyboard arrows, the buttons below, or a neighboring square.
这一步走不通：辎重挡路、前方有物件，或断沟还没搭桥。物件只能推，不能拉；卡住可撤回。|Blocked: debris, another object, or unbridged water is in the way. Objects can only be pushed, not pulled. Use Undo if needed.
只能点击阿荆上下左右紧挨着的一格；不能直接点远处移动。|Click a square directly above, below, left, or right of A Jing. You cannot jump to a distant square.
已退回一步。|Last move undone.
从这一段岸路重新出发。|This section has restarted.
先把窄口的空筐往下推到底，再从它上方绕向木板。|Push the basket in the narrow passage all the way down, then walk above it toward the plank.
先推开上方空筐。木板可以暂时往下移；挪开中间空筐后，从底部绕回，把木板推回沟边。|Move the upper basket aside. Push the plank down temporarily, move the middle basket, then loop around from below to push the plank back toward the gap.
向上|Up
向下|Down
向左|Left
向右|Right
江岸棋盘，用方向键或下方按钮移动|Riverside board. Move with arrow keys or the buttons below.
记住岸线、水纹与船影的连接。|Remember how the shoreline, ripples, and boats connect.
收起参考图|Hide Reference
开始拼合|Start the Puzzle
已摆放|placed
江面渐明|The River Revealed
理清船阵|Piece Together the Fleet
岸线与水纹已接合，江面图景重现。|The shoreline and ripples connect. The river scene is complete.
先选碎片，再选位置；已放碎片可以互换，也可拖拽。|Select a piece, then a square. Swap pieces already on the board, or drag and drop them.
回望江面|View Reference
核对全图|Check Puzzle
一键通关|Auto-complete
已放满，可自行核对，或一键还原正确图并通关。|All pieces are placed. Check your solution, or auto-complete to restore the picture and pass.
将9块碎片全部放入格子后，可使用一键通关。|Place all 9 pieces to unlock Auto-complete.
重新拼合|Start Over
望向江面|Look Out over the River
先找带岸线的边缘碎片，再沿水纹接出中央航道。碎片上的小记号只用于区分，不表示位置。|Start with shoreline pieces, then follow the ripples through the center. Piece labels identify pieces, not their correct positions.
江面战术示意，非精确军阵复原。|An illustrative river scene, not an exact reconstruction of the fleets.
水纹相连，船影归位。|The ripples connect and the ships are in place.
还有接缝不连贯。再看岸线与水纹，调整后核对。|Some edges do not connect. Check the shoreline and ripples, adjust, then try again.
已还原完整江面图，可以继续故事。|The full river scene is restored. Continue the story when ready.
江面示意：上方北岸连舟，下方南岸船阵，中部水纹和小舟|River scene: linked ships by the north bank above, southern boats below, and ripples and small boats in the center.
汉水一带|Han River Area
长江北岸|North Bank
长江南岸|South Bank
汉水来讯|Report from the Han River
襄阳在汉水一带。北方曹军仍驻守此城。|Xiangyang lies near the Han River. Cao Cao’s northern troops still hold the city.
江陵来讯|Report from Jiangling
周瑜攻取长江北岸的江陵。周瑜领的是孙权麾下江东军。|Zhou Yu captured Jiangling on the north bank of the Yangtze. He commands Sun Quan’s army from Jiangdong.
南岸来讯|Report from the South Bank
刘备在江陵以南、长江南岸的公安立营。|Liu Bei has established a camp at Gong’an, south of Jiangling on the Yangtze’s southern bank.
放置城池|Place a City
归属待定|Choose a Ruler
已标|placed
先查看三地消息|Read the Three Reports First
荆州山水示意：汉水从北方流入长江，长江分隔南北两岸|Map of Jingzhou: the Han flows south into the Yangtze, which divides the northern and southern banks.
舆图已明|The Map Is Complete
核对三地消息|Check the Three Reports
沿途归属已记清，可以准备南迁了。|The rulers along the route are recorded. Prepare for the journey south.
选城池，再点地图位置；选中位置后，标记势力。|Select a city, then its location on the map. Select that location and assign its ruler.
收好舆图|Pack the Map
核对舆图|Check Map
重新标记|Reset Map
先用汉水、长江两岸定位，再从消息里找出驻守者。周瑜与孙权的关系是江陵归属的关键。|Locate each city by the Han River and the two banks of the Yangtze. Use the reports to identify its ruler. Zhou Yu’s allegiance to Sun Quan is the key to Jiangling.
方位示意，不按比例；此为战后初局。|Schematic map, not to scale. Shows the initial postwar situation.
在图上选择这座城的位置。|Choose this city’s location on the map.
三地位置与归属，均与消息相合。|All three locations and rulers match the reports.
位置或归属仍有矛盾。重新对照三条消息再核对。|A location or ruler does not match. Read the three reports and check again.
襄阳|Xiangyang
江陵|Jiangling
公安|Gong’an
曹操|Cao Cao
刘备|Liu Bei
孙权|Sun Quan
长江|Yangtze
汉水|Han River
北 ↑|N ↑
音乐来源与授权|Music Credits and License
重试播放背景音乐|Retry Background Music
关闭背景音乐|Turn Music Off
开启背景音乐|Turn Music On
背景音乐|Background Music
音乐鸣谢|Music Credits
依据 |Licensed under 
 授权使用。|.
网页版作了节选、压缩和淡入淡出处理。音乐用于营造氛围。|Edited for the web with excerpts, compression, and fades. Music is used to create atmosphere.
返回故事|Return to the Story
音乐关|Music Off
音乐开|Music On
重试音乐|Retry Music
开启音乐|Play Music
加载中|Loading
章节进度|Chapter Progress
`.trim().split('\n').map(row=>row.split('|'));
  const entries=pairs.sort((a,b)=>b[0].length-a[0].length);
  const dictionary=new Map(entries);
  const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const pattern=new RegExp(entries.map(([zh])=>escape(zh)).join('|'),'g');
  function translate(text){
    if(language!=='en'||!text) return text;
    text=text.replace(/让阿荆走到“(下游|渡口)”格即可过关，不用把所有空筐推到指定位置。/g,(_,place)=>`Reach the ${place==='下游'?'Downstream':'Landing'} square to finish. You do not need to place every basket on a target.`)
      .replace(/第 ([一二三四]) 幕 · /g,(_,n)=>`Act ${'一二三四'.indexOf(n)+1} · `)
      .replace(/第 (\d+) \/ 4 幕/g,'Act $1 / 4')
      .replace(/(\d+)行(\d+)列 /g,'Row $1, column $2: ')
      .replace(/第(\d+)格/g,'Square $1')
      .replace(/，碎片/g,', piece ').replace(/，空位/g,', empty')
      .replace(/选择碎片/g,'Select piece ')
      .replace(/认作(.+)，收回/g,'Collect as $1')
      .replace(/标记(.+)归属/g,'Assign a ruler to $1')
      .replace(/^查看/g,'Inspect ')
      .replace(/(\d+) 步/g,'$1 moves');
    return text.replace(pattern,key=>dictionary.get(key));
  }
  const originals=new WeakMap();
  function apply(root=document.body){
    const visit=node=>{
      if(node.nodeType===3){
        const old=originals.get(node);
        const source=old&&node.nodeValue===old.result?old.source:node.nodeValue;
        const result=translate(source);
        originals.set(node,{source,result});
        if(node.nodeValue!==result)node.nodeValue=result;
      }else if(node.nodeType===1&&!['SCRIPT','STYLE','NOSCRIPT'].includes(node.tagName)){
        for(const attr of ['aria-label','alt','title']){
          const attribute=node.getAttributeNode(attr);
          if(attribute){
            const old=originals.get(attribute),source=old&&attribute.value===old.result?old.source:attribute.value,result=translate(source);
            originals.set(attribute,{source,result});if(attribute.value!==result)attribute.value=result;
          }
        }
        for(const child of node.childNodes)visit(child);
      }
    };
    visit(root);
  }
  function setLanguage(value){
    language=value==='en'?'en':'zh';
    try {localStorage.setItem('jingzhou-language',language);} catch {}
    document.documentElement.lang=language==='en'?'en':'zh-CN';
    document.title=language==='en'?'Years in Jingzhou':'荆州岁年';
    apply();
  }
  document.documentElement.lang=language==='en'?'en':'zh-CN';
  document.title=language==='en'?'Years in Jingzhou':'荆州岁年';
  const observer=new MutationObserver(records=>{
    const roots=new Set();
    for(const r of records){
      if(r.type==='childList')for(const n of r.addedNodes)roots.add(n);
      else roots.add(r.target);
    }
    for(const root of roots)apply(root);
  });
  observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','alt','title']});
  apply();
  return {get language(){return language},translate,apply,setLanguage};
})();
