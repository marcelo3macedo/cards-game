import{j as s}from"./jsx-runtime-u17CrQMm.js";import{M as c}from"./index-uqY1PiBg.js";import{P as t}from"./index-JPVsj-18.js";import"./iframe-CD7bA76q.js";import"./preload-helper-PPVm8Dsz.js";import"./sword-BW0TyRi5.js";import"./createLucideIcon-DSd_fdSH.js";import"./keyUtils-D7xRxCLK.js";import"./BattleEventStore-ByTNv7X1.js";import"./middleware-DUDzcTzn.js";import"./BattleStore-ACFz61IO.js";import"./BattleStore-T2x42JYO.js";const e=new c("1","Patrulheiro Gárgula de Gelo","Emmissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados. Sua presença inspira coragem, e o eco de seu grito de gelo ressoa nas muralhas, formando escudos de pedra que refutam qualquer ataque.","images/exemplo_comum.jpg","attack","ice",2500,2100,7,"LEGENDARIO"),o=[e,e,e,e,e],y={title:"Game/PlayerHand",component:t,parameters:{layout:"fullscreen"},argTypes:{onSelect:{action:"card selected"}}},a={args:{cards:o,isHidden:!1},render:n=>s.jsxs("div",{className:"w-full h-screen bg-slate-900 flex items-center justify-center",children:[s.jsx("p",{className:"text-white absolute top-10 text-center",children:"Use as setas ⬅️ ➡️ do teclado e Enter para selecionar"}),s.jsx(t,{...n})]})},r={args:{cards:o,isHidden:!0}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    cards: mockCards,
    isHidden: false
  },
  render: args => <div className="w-full h-screen bg-slate-900 flex items-center justify-center">
      <p className="text-white absolute top-10 text-center">
        Use as setas ⬅️ ➡️ do teclado e Enter para selecionar
      </p>
      <PlayerHand {...args} />
    </div>
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    cards: mockCards,
    isHidden: true
  }
}`,...r.parameters?.docs?.source}}};const E=["Default","Hidden"];export{a as Default,r as Hidden,E as __namedExportsOrder,y as default};
