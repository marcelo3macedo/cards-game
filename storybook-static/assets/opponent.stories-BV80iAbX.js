import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as d}from"./iframe-Dxz4Iu-O.js";import{m as p}from"./proxy-BCZisOYc.js";import"./preload-helper-PPVm8Dsz.js";const c=({count:t})=>{const n=Array.from({length:t});return e.jsx("div",{className:"flex justify-center -space-x-12 pt-4",children:n.map((m,r)=>{const l=(r-(t-1)/2)*5,i=Math.abs(r-(t-1)/2)*4;return e.jsxs(p.div,{initial:{y:-100,opacity:0},animate:{y:i,rotate:l,opacity:1},transition:{delay:r*.05},className:"w-24 h-36 bg-gradient-to-br from-red-900 to-black border-2 border-red-950 rounded-lg shadow-2xl flex items-center justify-center relative overflow-hidden group",children:[e.jsx("div",{className:"absolute inset-1 border border-red-800/30 rounded-sm"}),e.jsx("div",{className:"w-16 h-24 bg-red-950/20 rounded-full blur-xl absolute"}),e.jsx("span",{className:"text-red-900/40 font-black text-2xl rotate-90 select-none",children:"DUEL"})]},r)})})};c.__docgenInfo={description:"",methods:[],displayName:"OpponentHand",props:{count:{required:!0,tsType:{name:"number"},description:""}}};const h={title:"Game/OpponentHand",component:c,parameters:{layout:"centered"},decorators:[t=>e.jsx("div",{className:"bg-zinc-950 w-[800px] h-[400px] flex flex-col items-center justify-start p-10 overflow-hidden border border-zinc-800 rounded-xl",children:e.jsx(t,{})})]},s={render:()=>{const[t,n]=d.useState(5);return e.jsxs("div",{className:"flex flex-col items-center gap-20 w-full",children:[e.jsx("div",{className:"w-full flex justify-center",children:e.jsx(c,{count:t})}),e.jsxs("div",{className:"flex flex-col items-center gap-4 bg-zinc-900/50 p-6 rounded-2xl border border-white/5",children:[e.jsxs("p",{className:"text-white font-black text-sm uppercase tracking-widest",children:["Cartas na Mão: ",e.jsx("span",{className:"text-red-500",children:t})]}),e.jsxs("div",{className:"flex gap-4",children:[e.jsx("button",{onClick:()=>n(Math.max(0,t-1)),className:"px-6 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-all active:scale-90 font-bold",children:"- Remover"}),e.jsx("button",{onClick:()=>n(t+1),className:"px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-all active:scale-90 font-bold shadow-[0_0_15px_rgba(220,38,38,0.3)]",children:"+ Adicionar"})]}),e.jsx("button",{onClick:()=>n(0),className:"text-zinc-500 text-xs hover:underline",children:"Limpar Mão"})]})]})}},a={args:{count:7}},o={args:{count:0}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    count: 7
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    count: 0
  }
}`,...o.parameters?.docs?.source}}};const g=["Interactive","FullHand","EmptyHand"];export{o as EmptyHand,a as FullHand,s as Interactive,g as __namedExportsOrder,h as default};
