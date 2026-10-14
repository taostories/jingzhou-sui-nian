/* Pure rules shared by the webpage and the level checks. */
const GameRules = (() => {
  const routeLevels = [
    {
      name:'穿过辎重', hint:'先把窄口的空筐往下推到底，再从它上方绕向木板。',
      rows:['#########','#@......#','###$#####','#...B~.G#','#...#####','#########']
    },
    {
      name:'抵达下游', hint:'先推开上方空筐。木板可以暂时往下移；挪开中间空筐后，从底部绕回，把木板推回沟边。',
      rows:['##########','#@..$.#.G#','##.#..#..#','####$.#..#','#....B~..#','###.#.#..#','#.....#..#','##########']
    }
  ];
  function startRoute(index) {
    const rows=routeLevels[index].rows, width=rows[0].length;
    const state={player:0,crates:[],board:null,bridges:[],steps:0};
    rows.join('').split('').forEach((c,i)=>{if(c==='@')state.player=i;if(c==='$')state.crates.push(i);if(c==='B')state.board=i;});
    return state;
  }
  function moveRoute(index,state,dx,dy) {
    if(Math.abs(dx)+Math.abs(dy)!==1)return null;
    const rows=routeLevels[index].rows,w=rows[0].length,h=rows.length;
    function neighbor(p){const x=p%w+dx,y=Math.floor(p/w)+dy;return x<0||x>=w||y<0||y>=h?-1:y*w+x;}
    const terrain=p=>p<0?'#':rows[Math.floor(p/w)][p%w];
    const next=neighbor(state.player), kind=terrain(next);
    if(kind==='#'||(kind==='~'&&!state.bridges.includes(next)))return null;
    const s={...state,crates:[...state.crates],bridges:[...state.bridges],steps:state.steps+1};
    if(s.crates.includes(next)||s.board===next){
      const beyond=neighbor(next),tile=terrain(beyond);
      if(tile==='#'||s.crates.includes(beyond)||s.board===beyond)return null;
      if(s.board===next){
        if(tile==='~'&&!s.bridges.includes(beyond)){s.bridges.push(beyond);s.board=null;}
        else s.board=beyond;
      } else {
        if(tile==='~'&&!s.bridges.includes(beyond))return null;
        s.crates[s.crates.indexOf(next)]=beyond;
      }
    }
    s.player=next;
    return s;
  }
  function routeWon(index,state){const rows=routeLevels[index].rows;return rows.join('')[state.player]==='G';}
  function placePiece(slots,piece,target){
    if(!Number.isInteger(piece)||piece<0||piece>8||!Number.isInteger(target)||target<0||target>8)return slots;
    const result=[...slots],from=result.indexOf(piece),old=result[target];
    result[target]=piece;
    if(from>=0&&from!==target)result[from]=old;
    return result;
  }
  function puzzleWon(slots){return slots.length===9&&slots.every((p,i)=>p===i);}
  const cities=[{id:'xiangyang',name:'襄阳',force:'曹操'},{id:'jiangling',name:'江陵',force:'孙权'},{id:'gongan',name:'公安',force:'刘备'}];
  function mapWon(slots,forces){return cities.every((c,i)=>slots[i]===c.id&&forces[i]===c.force);}
  return {routeLevels,startRoute,moveRoute,routeWon,placePiece,puzzleWon,cities,mapWon};
})();
if(typeof module!=='undefined')module.exports=GameRules;
