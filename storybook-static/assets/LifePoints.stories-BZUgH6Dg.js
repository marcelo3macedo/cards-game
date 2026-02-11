import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as c}from"./iframe-Dxz4Iu-O.js";import{u as m}from"./BattleStore-DJ04qHHZ.js";import{A as w}from"./index-BCBNK8Q-.js";import{m as b}from"./proxy-BCZisOYc.js";import"./preload-helper-PPVm8Dsz.js";function k(a){const t=m(p=>p[a]?.hp??8e3),r=m(p=>p[a]?.name??"Carregando..."),[s,n]=c.useState(t),[i,o]=c.useState(null),l=c.useRef(t);return c.useEffect(()=>{if(l.current!==t){const p=t-l.current;o({id:Date.now(),amount:p});const h=800,x=l.current,y=performance.now(),f=v=>{const N=v-y,g=Math.min(N/h,1),j=1-Math.pow(1-g,3),P=Math.floor(x+(t-x)*j);n(P),g<1?requestAnimationFrame(f):n(t)};requestAnimationFrame(f),l.current=t}},[t]),{displayLP:s,name:r,damagePopup:i,clearPopup:()=>o(null)}}const u=({target:a,color:t,align:r="left"})=>{const{name:s,damagePopup:n,clearPopup:i,displayLP:o}=k(a),l=t==="red";return e.jsxs("div",{className:`relative flex flex-col ${r==="right"?"items-end":"items-start"}`,children:[e.jsx(w,{children:n&&e.jsx(b.div,{initial:{opacity:0,scale:.5,y:0},animate:{opacity:1,scale:1.2,y:-60},exit:{opacity:0,scale:1.8,y:-100},onAnimationComplete:i,className:`absolute font-black text-4xl z-30 drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] ${n.amount>0?"text-green-400":"text-red-500"}`,children:n.amount>0?`+${n.amount}`:n.amount},n.id)}),e.jsxs("div",{className:`bg-black/80 border-2 p-4 rounded-xl backdrop-blur-xl min-w-[200px] transition-all duration-300
        ${l?"border-red-600/50 shadow-[0_0_20px_rgba(220,38,38,0.2)]":"border-blue-600/50 shadow-[0_0_20px_rgba(37,99,235,0.2)]"}`,children:[e.jsx("p",{className:`text-[10px] font-black uppercase tracking-widest mb-1 ${l?"text-red-400":"text-blue-400"}`,children:s}),e.jsxs("div",{className:"flex items-baseline gap-2",children:[e.jsx("span",{className:"text-zinc-500 text-sm font-black",children:"LP"}),e.jsx(b.span,{className:"text-5xl font-black italic text-white tabular-nums tracking-tighter",children:o})]})]})]})};u.__docgenInfo={description:"",methods:[],displayName:"LifePoints",props:{target:{required:!0,tsType:{name:"union",raw:'"player" | "opponent"',elements:[{name:"literal",value:'"player"'},{name:"literal",value:'"opponent"'}]},description:""},color:{required:!0,tsType:{name:"union",raw:'"red" | "blue"',elements:[{name:"literal",value:'"red"'},{name:"literal",value:'"blue"'}]},description:""},align:{required:!1,tsType:{name:"union",raw:'"left" | "right"',elements:[{name:"literal",value:'"left"'},{name:"literal",value:'"right"'}]},description:"",defaultValue:{value:'"left"',computed:!1}}}};const B={title:"Game/LifePoints",component:u,parameters:{layout:"centered"},decorators:[a=>e.jsx("div",{className:"p-20 bg-zinc-950 w-full min-w-[600px] flex justify-center items-center",children:e.jsx(a,{})})]},d={render:()=>{const{player:a,opponent:t,updateHP:r,initBattle:s}=m();c.useEffect(()=>{(!a||!t)&&s({player:{id:1,name:"Yugi",hp:8e3,deckCount:40,graveyard:[],field:[]},opponent:{id:2,name:"Kaiba",hp:8e3,deckCount:40,graveyard:[],field:[]},turn:1,currentTurnOwner:"player"})},[]);const n=(i,o)=>{!a||!t||(i==="player"?r(a.hp-o,t.hp):r(a.hp,t.hp-o))};return e.jsxs("div",{className:"flex flex-col gap-12 items-center",children:[e.jsxs("div",{className:"flex gap-20",children:[e.jsxs("div",{className:"flex flex-col gap-4 items-center",children:[e.jsx(u,{target:"opponent",color:"red",align:"right"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx("button",{onClick:()=>n("opponent",1e3),className:"px-4 py-1 bg-red-600 text-xs text-white font-bold rounded hover:bg-red-500 transition-all",children:"Dano Oponente"}),e.jsx("button",{onClick:()=>n("opponent",-500),className:"px-4 py-1 bg-green-600 text-xs text-white font-bold rounded hover:bg-green-500",children:"Cura"})]})]}),e.jsxs("div",{className:"flex flex-col gap-4 items-center",children:[e.jsx(u,{target:"player",color:"blue",align:"left"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx("button",{onClick:()=>n("player",1e3),className:"px-4 py-1 bg-blue-600 text-xs text-white font-bold rounded hover:bg-blue-500 transition-all",children:"Dano Player"}),e.jsx("button",{onClick:()=>n("player",-500),className:"px-4 py-1 bg-teal-600 text-xs text-white font-bold rounded hover:bg-teal-500",children:"Cura"})]})]})]}),e.jsx("button",{onClick:()=>r(8e3,8e3),className:"text-zinc-500 border border-zinc-800 px-4 py-1 rounded text-xs hover:bg-zinc-900",children:"Resetar HP (8000)"})]})}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      player,
      opponent,
      updateHP,
      initBattle
    } = useBattleStore();
    useEffect(() => {
      if (!player || !opponent) {
        initBattle({
          player: {
            id: 1,
            name: "Yugi",
            hp: 8000,
            deckCount: 40,
            graveyard: [],
            field: []
          },
          opponent: {
            id: 2,
            name: "Kaiba",
            hp: 8000,
            deckCount: 40,
            graveyard: [],
            field: []
          },
          turn: 1,
          currentTurnOwner: "player"
        });
      }
    }, []);
    const handleDamage = (target: "player" | "opponent", amount: number) => {
      if (!player || !opponent) return;
      if (target === "player") {
        updateHP(player.hp - amount, opponent.hp);
      } else {
        updateHP(player.hp, opponent.hp - amount);
      }
    };
    return <div className="flex flex-col gap-12 items-center">
        <div className="flex gap-20">
          <div className="flex flex-col gap-4 items-center">
            <LifePoints target="opponent" color="red" align="right" />
            <div className="flex gap-2">
              <button onClick={() => handleDamage("opponent", 1000)} className="px-4 py-1 bg-red-600 text-xs text-white font-bold rounded hover:bg-red-500 transition-all">
                Dano Oponente
              </button>
              <button onClick={() => handleDamage("opponent", -500)} className="px-4 py-1 bg-green-600 text-xs text-white font-bold rounded hover:bg-green-500">
                Cura
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 items-center">
            <LifePoints target="player" color="blue" align="left" />
            <div className="flex gap-2">
              <button onClick={() => handleDamage("player", 1000)} className="px-4 py-1 bg-blue-600 text-xs text-white font-bold rounded hover:bg-blue-500 transition-all">
                Dano Player
              </button>
              <button onClick={() => handleDamage("player", -500)} className="px-4 py-1 bg-teal-600 text-xs text-white font-bold rounded hover:bg-teal-500">
                Cura
              </button>
            </div>
          </div>
        </div>

        <button onClick={() => updateHP(8000, 8000)} className="text-zinc-500 border border-zinc-800 px-4 py-1 rounded text-xs hover:bg-zinc-900">
          Resetar HP (8000)
        </button>
      </div>;
  }
}`,...d.parameters?.docs?.source}}};const H=["InteractiveBattle"];export{d as InteractiveBattle,H as __namedExportsOrder,B as default};
