import{j as e}from"./jsx-runtime-u17CrQMm.js";import{L as l}from"./index-BRgPO0Xt.js";import{u as d}from"./BattleStore-B3bsQDvF.js";import{r as c}from"./iframe-DlJpJoSd.js";import"./index-DafWUxtG.js";import"./proxy-DrU6dVvx.js";import"./middleware-Cli69yI4.js";import"./preload-helper-PPVm8Dsz.js";const v={title:"Game/LifePoints",component:l,parameters:{layout:"centered"},decorators:[n=>e.jsx("div",{className:"p-20 bg-zinc-950 w-full min-w-[600px] flex justify-center items-center",children:e.jsx(n,{})})]},r={render:()=>{const{player:n,opponent:t,updateHP:o,initBattle:i}=d();c.useEffect(()=>{(!n||!t)&&i({player:{id:1,name:"Yugi",hp:8e3,deckCount:40,graveyard:[],field:[]},opponent:{id:2,name:"Kaiba",hp:8e3,deckCount:40,graveyard:[],field:[]},turn:1,currentTurnOwner:"player"})},[]);const a=(p,s)=>{!n||!t||(p==="player"?o(n.hp-s,t.hp):o(n.hp,t.hp-s))};return e.jsxs("div",{className:"flex flex-col gap-12 items-center",children:[e.jsxs("div",{className:"flex gap-20",children:[e.jsxs("div",{className:"flex flex-col gap-4 items-center",children:[e.jsx(l,{target:"opponent",color:"red",align:"right"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx("button",{onClick:()=>a("opponent",1e3),className:"px-4 py-1 bg-red-600 text-xs text-white font-bold rounded hover:bg-red-500 transition-all",children:"Dano Oponente"}),e.jsx("button",{onClick:()=>a("opponent",-500),className:"px-4 py-1 bg-green-600 text-xs text-white font-bold rounded hover:bg-green-500",children:"Cura"})]})]}),e.jsxs("div",{className:"flex flex-col gap-4 items-center",children:[e.jsx(l,{target:"player",color:"blue",align:"left"}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx("button",{onClick:()=>a("player",1e3),className:"px-4 py-1 bg-blue-600 text-xs text-white font-bold rounded hover:bg-blue-500 transition-all",children:"Dano Player"}),e.jsx("button",{onClick:()=>a("player",-500),className:"px-4 py-1 bg-teal-600 text-xs text-white font-bold rounded hover:bg-teal-500",children:"Cura"})]})]})]}),e.jsx("button",{onClick:()=>o(8e3,8e3),className:"text-zinc-500 border border-zinc-800 px-4 py-1 rounded text-xs hover:bg-zinc-900",children:"Resetar HP (8000)"})]})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const N=["InteractiveBattle"];export{r as InteractiveBattle,N as __namedExportsOrder,v as default};
