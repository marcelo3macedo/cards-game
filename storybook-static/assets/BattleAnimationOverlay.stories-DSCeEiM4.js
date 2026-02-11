import{j as e}from"./jsx-runtime-u17CrQMm.js";import{C as g,M as h}from"./index-CK7_MADk.js";import{r as x}from"./iframe-Dxz4Iu-O.js";import{m as w}from"./proxy-BCZisOYc.js";import{A as j}from"./index-BCBNK8Q-.js";import{e as y}from"./exemplo_comum-Kgn1VGfG.js";import"./sword-tIX24kzi.js";import"./createLucideIcon-SZYWXtx4.js";import"./star-CBuiB-me.js";import"./preload-helper-PPVm8Dsz.js";const N=({attacker:t,defender:r,onAnimationEnd:l})=>{const[a,n]=x.useState("intro"),o=!r,s=x.useMemo(()=>o?0:r.mode==="def"?r.def:r.atk,[o,r]),c=t.atk-s;return x.useEffect(()=>{const k=[setTimeout(()=>n("confront"),1e3),setTimeout(()=>n("impact"),2500),setTimeout(()=>n("resolve"),3500),setTimeout(()=>n("damage"),4200),setTimeout(()=>{const _=o?"direct_hit":c>0?"attacker_wins":c<0?"defender_wins":"draw";l(_)},6500)];return()=>k.forEach(clearTimeout)},[c,o,l]),{phase:a,isDirectAttack:o,defenderValue:s,damageDiff:c}},f=({damage:t,isVisible:r})=>!r||t===0?null:e.jsx(w.div,{initial:{opacity:0,scale:.5,y:0},animate:{opacity:1,scale:1.2,y:-100},exit:{opacity:0},className:"absolute inset-0 flex items-center justify-center z-[250] pointer-events-none",children:e.jsxs("span",{className:"text-8xl font-black italic text-white drop-shadow-[0_0_30px_rgba(255,0,0,1)]",children:["-",Math.abs(t)]})});f.__docgenInfo={description:"",methods:[],displayName:"DamagePopup",props:{damage:{required:!0,tsType:{name:"number"},description:""},isVisible:{required:!0,tsType:{name:"boolean"},description:""}}};const v=({attacker:t,defender:r,onAnimationEnd:l})=>{const{phase:a,isDirectAttack:n,defenderValue:o,damageDiff:s}=N({attacker:t,defender:r,onAnimationEnd:l});return e.jsxs("div",{className:"fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl overflow-hidden font-sans",children:[e.jsx(j,{children:a==="impact"&&e.jsx(w.div,{initial:{opacity:0},animate:{opacity:.4},exit:{opacity:0},className:"absolute inset-0 bg-white z-[300] pointer-events-none"})}),e.jsxs("div",{className:"flex items-center gap-24 relative scale-110",children:[e.jsxs("div",{className:"relative",children:[e.jsxs("div",{className:`
            transition-all duration-1000 ease-out transform
            ${a==="intro"?"-translate-x-full opacity-0":"translate-x-0 opacity-100"}
            ${a==="confront"?"translate-x-12 scale-105 z-40":""}
            ${a==="impact"?"translate-x-20 scale-110 z-50":""}
            ${a==="resolve"&&s<0?"scale-0 opacity-0 blur-2xl":""}
            ${a==="damage"&&s<0?"hidden":""}
          `,children:[e.jsx("div",{className:"absolute -top-10 left-1/2 -translate-x-1/2 text-red-500 font-black italic tracking-widest text-xl opacity-50",children:"ATACANTE"}),e.jsx(g,{card:t,size:"lg"}),e.jsx("div",{className:"mt-8 text-center",children:e.jsx("span",{className:`text-5xl font-black italic transition-colors duration-1000 ${s>=0?"text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]":"text-zinc-700"}`,children:t.atk})})]}),e.jsx(f,{damage:s,isVisible:a==="damage"&&s<0})]}),e.jsx("div",{className:`text-6xl font-black italic text-zinc-800 transition-all duration-1000 ${a!=="intro"?"opacity-0 scale-50":"opacity-100"}`,children:"VS"}),e.jsxs("div",{className:"relative",children:[e.jsxs("div",{className:`
            transition-all duration-1000 ease-out transform
            ${a==="intro"?"translate-x-full opacity-0":"translate-x-0 opacity-100"}
            ${a==="confront"?"-translate-x-12":""}
            ${a==="impact"?"animate-shake-heavy":""}
            ${a==="resolve"&&!n&&s>0?"scale-0 opacity-0 blur-2xl":""}
            ${a==="damage"&&!n&&s>0?"hidden":""}
          `,children:[a==="impact"&&e.jsx("div",{className:"absolute inset-0 z-50 flex items-center justify-center overflow-visible",children:e.jsx("div",{className:`w-[250%] h-6 rotate-[35deg] animate-slash-slow ${n?"bg-yellow-400 shadow-[0_0_50px_#fbbf24]":"bg-white shadow-[0_0_40px_#fff]"}`})}),n?e.jsx("div",{className:"flex flex-col items-center",children:e.jsx("div",{className:"absolute -top-10 left-1/2 -translate-x-1/2 w-96 text-center text-orange-500 font-black italic tracking-widest text-xl animate-pulse",children:"ATAQUE DIRETO"})}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"absolute -top-10 left-1/2 -translate-x-1/2 text-blue-500 font-black italic tracking-widest text-xl opacity-50",children:r?.mode==="def"?"DEFENSOR":"ALVO"}),e.jsx(g,{card:r,size:"lg"}),e.jsx("div",{className:"mt-8 text-center",children:e.jsx("span",{className:`text-5xl font-black italic transition-colors duration-1000 ${s<=0?"text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]":"text-zinc-700"}`,children:o})})]})]}),e.jsx(f,{damage:s,isVisible:a==="damage"&&s>0})]})]}),e.jsx("style",{children:`
        @keyframes slash-slow {
          0% { transform: translateX(-120%) rotate(35deg); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(120%) rotate(35deg); opacity: 0; }
        }
        @keyframes shake-heavy {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(-15px, 10px); }
          40% { transform: translate(15px, -10px); }
          60% { transform: translate(-15px, -10px); }
          80% { transform: translate(15px, 10px); }
        }
        .animate-slash-slow { animation: slash-slow 0.7s ease-in-out forwards; }
        .animate-shake-heavy { animation: shake-heavy 0.08s infinite; }
      `})]})};v.__docgenInfo={description:"",methods:[],displayName:"BattleAnimationOverlay",props:{attacker:{required:!0,tsType:{name:"MonsterCard"},description:""},defender:{required:!0,tsType:{name:"union",raw:"MonsterCard | undefined",elements:[{name:"MonsterCard"},{name:"undefined"}]},description:""},onAnimationEnd:{required:!0,tsType:{name:"signature",type:"function",raw:'(result: "attacker_wins" | "defender_wins" | "draw" | "direct_hit") => void',signature:{arguments:[{type:{name:"union",raw:'"attacker_wins" | "defender_wins" | "draw" | "direct_hit"',elements:[{name:"literal",value:'"attacker_wins"'},{name:"literal",value:'"defender_wins"'},{name:"literal",value:'"draw"'},{name:"literal",value:'"direct_hit"'}]},name:"result"}],return:{name:"void"}}},description:""}}};const C={title:"Game/BattleAnimationOverlay",component:v,parameters:{layout:"fullscreen"}},b=new h("1","Patrulheiro Gárgula de Gelo","Emmissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados. Sua presença inspira coragem, e o eco de seu grito de gelo ressoa nas muralhas, formando escudos de pedra que refutam qualquer ataque.",y,"ice",2500,2100,7,"LEGENDARIO"),i=new h("1","Patrulheiro Gárgula de Gelo","Emmissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados. Sua presença inspira coragem, e o eco de seu grito de gelo ressoa nas muralhas, formando escudos de pedra que refutam qualquer ataque.",y,"ice",2300,2100,7,"LEGENDARIO"),d={args:{attacker:b,defender:i,onAnimationEnd:t=>console.log("Resultado:",t)}},m={args:{attacker:i,defender:i,onAnimationEnd:t=>console.log("Resultado:",t)}},u={args:{attacker:i,defender:b,onAnimationEnd:t=>console.log("Resultado:",t)}},p={args:{attacker:i,defender:null,onAnimationEnd:t=>console.log("Resultado:",t)}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    attacker: better,
    defender: lower,
    onAnimationEnd: res => console.log("Resultado:", res)
  }
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    attacker: lower,
    defender: lower,
    onAnimationEnd: res => console.log("Resultado:", res)
  }
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    attacker: lower,
    defender: better,
    onAnimationEnd: res => console.log("Resultado:", res)
  }
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    attacker: lower,
    defender: null,
    onAnimationEnd: res => console.log("Resultado:", res)
  }
}`,...p.parameters?.docs?.source}}};const G=["StrikerWins","Draw","StrikerLoses","DirectHit"];export{p as DirectHit,m as Draw,u as StrikerLoses,d as StrikerWins,G as __namedExportsOrder,C as default};
