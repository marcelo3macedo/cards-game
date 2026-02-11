import{j as s}from"./jsx-runtime-u17CrQMm.js";import{M as d}from"./index-CK7_MADk.js";import{P as t}from"./index-B8XJgvMj.js";import{e as c}from"./exemplo_comum-Kgn1VGfG.js";import"./iframe-Dxz4Iu-O.js";import"./preload-helper-PPVm8Dsz.js";import"./sword-tIX24kzi.js";import"./createLucideIcon-SZYWXtx4.js";import"./star-CBuiB-me.js";import"./keyUtils-CoVaxQrz.js";import"./BattleEventStore-BHkVyqAg.js";import"./BattleStore-DJ04qHHZ.js";import"./BattleStore-xuFNDUoX.js";const e=new d("2","Guarda de Pedra","Um soldado incansável esculpido nas montanhas antigas. Sua lealdade é tão imutável quanto a rocha de que é feito, servindo como a primeira linha de defesa contra hordas invasoras.",c,"earth",1200,2e3,4,"COMUM"),o=[e,e,e,e,e],w={title:"Game/PlayerHand",component:t,parameters:{layout:"fullscreen"},argTypes:{onSelect:{action:"card selected"}}},a={args:{cards:o,isHidden:!1},render:n=>s.jsxs("div",{className:"w-full h-screen bg-slate-900 flex items-center justify-center",children:[s.jsx("p",{className:"text-white absolute top-10 text-center",children:"Use as setas ⬅️ ➡️ do teclado e Enter para selecionar"}),s.jsx(t,{...n})]})},r={args:{cards:o,isHidden:!0}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const C=["Default","Hidden"];export{a as Default,r as Hidden,C as __namedExportsOrder,w as default};
