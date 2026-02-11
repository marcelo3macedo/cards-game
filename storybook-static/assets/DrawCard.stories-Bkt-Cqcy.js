import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as i}from"./iframe-Dxz4Iu-O.js";import{C as m,M as l}from"./index-CK7_MADk.js";import{A as u}from"./index-BCBNK8Q-.js";import{m as s}from"./proxy-BCZisOYc.js";import{e as d}from"./exemplo_comum-Kgn1VGfG.js";import"./preload-helper-PPVm8Dsz.js";import"./sword-tIX24kzi.js";import"./createLucideIcon-SZYWXtx4.js";import"./star-CBuiB-me.js";const o=({card:t,onComplete:a})=>e.jsx(u,{children:t&&e.jsxs("div",{className:"fixed inset-0 z-[1000] pointer-events-none flex items-center justify-center",children:[e.jsx(s.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"absolute inset-0 bg-black/40 backdrop-blur-sm"}),e.jsx(s.div,{initial:{x:"40vw",y:"40vh",scale:.2,rotateY:180,opacity:0},animate:{x:0,y:0,scale:1.5,rotateY:0,opacity:1},exit:{y:"100vh",opacity:0,scale:.5,transition:{duration:.4}},transition:{type:"spring",stiffness:260,damping:20,duration:.8},onAnimationComplete:()=>{setTimeout(a,2e3)},children:e.jsxs("div",{className:"relative preserve-3d",children:[e.jsx(m,{card:t,size:"lg"}),e.jsx("div",{className:"absolute inset-0 bg-blue-500/20 blur-[60px] -z-10 animate-pulse"})]})})]})});o.__docgenInfo={description:"",methods:[],displayName:"DrawCard",props:{card:{required:!0,tsType:{name:"union",raw:"MonsterCard | null",elements:[{name:"MonsterCard"},{name:"null"}]},description:""},onComplete:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const M={title:"Game/Animations/DrawCard",component:o,parameters:{layout:"fullscreen"}},p=new l("2","Guarda de Pedra","Um soldado incansável esculpido nas montanhas antigas. Sua lealdade é tão imutável quanto a rocha de que é feito, servindo como a primeira linha de defesa contra hordas invasoras.",d,"earth",1200,2e3,4,"COMUM"),n={render:()=>{const[t,a]=i.useState(null);return e.jsxs("div",{className:"w-full h-screen bg-zinc-950 flex flex-col items-center justify-center gap-8",children:[e.jsx("button",{onClick:()=>a(p),className:"px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg transition-colors pointer-events-auto z-[900]",children:"Puxar Carta (Draw)"}),e.jsx("p",{className:"text-zinc-500 text-sm",children:"A animação encerra automaticamente 2s após o término do movimento."}),e.jsx(o,{card:t,onComplete:()=>a(null)})]})}},r={render:()=>{const[t,a]=i.useState(null),c=new l("2","Guarda de Pedra","Um soldado incansável esculpido nas montanhas antigas. Sua lealdade é tão imutável quanto a rocha de que é feito, servindo como a primeira linha de defesa contra hordas invasoras.",d,"earth",1200,2e3,4,"COMUM");return e.jsxs("div",{className:"w-full h-screen bg-zinc-950 flex items-center justify-center",children:[e.jsx("button",{onClick:()=>a(c),className:"px-6 py-3 bg-slate-600 text-white font-bold rounded-lg pointer-events-auto z-[1001]",children:"Draw Common Card"}),e.jsx(o,{card:t,onComplete:()=>a(null)})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [card, setCard] = useState<MonsterCard | null>(null);
    return <div className="w-full h-screen bg-zinc-950 flex flex-col items-center justify-center gap-8">
        <button onClick={() => setCard(mockMonster)} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg transition-colors pointer-events-auto z-[900]">
          Puxar Carta (Draw)
        </button>

        <p className="text-zinc-500 text-sm">
          A animação encerra automaticamente 2s após o término do movimento.
        </p>

        <DrawCard card={card} onComplete={() => setCard(null)} />
      </div>;
  }
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [card, setCard] = useState<MonsterCard | null>(null);
    const commonMonster = new MonsterCard("2", "Guarda de Pedra", "Um soldado incansável esculpido nas montanhas antigas. Sua lealdade é tão imutável quanto a rocha de que é feito, servindo como a primeira linha de defesa contra hordas invasoras.", exemplo_comum, "earth", 1200, 2000, 4, "COMUM");
    return <div className="w-full h-screen bg-zinc-950 flex items-center justify-center">
        <button onClick={() => setCard(commonMonster)} className="px-6 py-3 bg-slate-600 text-white font-bold rounded-lg pointer-events-auto z-[1001]">
          Draw Common Card
        </button>
        <DrawCard card={card} onComplete={() => setCard(null)} />
      </div>;
  }
}`,...r.parameters?.docs?.source}}};const N=["InteractiveDraw","CommonRarityDraw"];export{r as CommonRarityDraw,n as InteractiveDraw,N as __namedExportsOrder,M as default};
