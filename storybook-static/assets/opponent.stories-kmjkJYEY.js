import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as c}from"./iframe-DlJpJoSd.js";import{O as o}from"./opponent-CZvh9YzU.js";import"./preload-helper-PPVm8Dsz.js";import"./proxy-DrU6dVvx.js";const m={title:"Game/OpponentHand",component:o,parameters:{layout:"centered"},decorators:[t=>e.jsx("div",{className:"bg-zinc-950 w-[800px] h-[400px] flex flex-col items-center justify-start p-10 overflow-hidden border border-zinc-800 rounded-xl",children:e.jsx(t,{})})]},n={render:()=>{const[t,s]=c.useState(5);return e.jsxs("div",{className:"flex flex-col items-center gap-20 w-full",children:[e.jsx("div",{className:"w-full flex justify-center",children:e.jsx(o,{count:t})}),e.jsxs("div",{className:"flex flex-col items-center gap-4 bg-zinc-900/50 p-6 rounded-2xl border border-white/5",children:[e.jsxs("p",{className:"text-white font-black text-sm uppercase tracking-widest",children:["Cartas na Mão: ",e.jsx("span",{className:"text-red-500",children:t})]}),e.jsxs("div",{className:"flex gap-4",children:[e.jsx("button",{onClick:()=>s(Math.max(0,t-1)),className:"px-6 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-all active:scale-90 font-bold",children:"- Remover"}),e.jsx("button",{onClick:()=>s(t+1),className:"px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-all active:scale-90 font-bold shadow-[0_0_15px_rgba(220,38,38,0.3)]",children:"+ Adicionar"})]}),e.jsx("button",{onClick:()=>s(0),className:"text-zinc-500 text-xs hover:underline",children:"Limpar Mão"})]})]})}},a={args:{count:7}},r={args:{count:0}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [count, setCount] = useState(5);
    return <div className="flex flex-col items-center gap-20 w-full">
        <div className="w-full flex justify-center">
          <OpponentHand count={count} />
        </div>

        <div className="flex flex-col items-center gap-4 bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
          <p className="text-white font-black text-sm uppercase tracking-widest">
            Cartas na Mão: <span className="text-red-500">{count}</span>
          </p>
          <div className="flex gap-4">
            <button onClick={() => setCount(Math.max(0, count - 1))} className="px-6 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-all active:scale-90 font-bold">
              - Remover
            </button>
            <button onClick={() => setCount(count + 1)} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-all active:scale-90 font-bold shadow-[0_0_15px_rgba(220,38,38,0.3)]">
              + Adicionar
            </button>
          </div>
          <button onClick={() => setCount(0)} className="text-zinc-500 text-xs hover:underline">
            Limpar Mão
          </button>
        </div>
      </div>;
  }
}`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    count: 7
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    count: 0
  }
}`,...r.parameters?.docs?.source}}};const x=["Interactive","FullHand","EmptyHand"];export{r as EmptyHand,a as FullHand,n as Interactive,x as __namedExportsOrder,m as default};
