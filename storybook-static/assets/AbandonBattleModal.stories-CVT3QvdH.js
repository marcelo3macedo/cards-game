import{j as a}from"./jsx-runtime-u17CrQMm.js";import{A as n}from"./AbandonBattleModal-1wzYa91Q.js";import"./iframe-Dm5SVBJu.js";import"./preload-helper-PPVm8Dsz.js";import"./createLucideIcon-CUMascdk.js";const i={title:"Game/AbandonBattleModal",component:n,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{onConfirm:{action:"confirmed"}}},o={args:{onConfirm:()=>console.log("Batalha abandonada!")}},r={decorators:[e=>a.jsx("div",{className:"bg-zinc-950 p-20 rounded-lg border border-zinc-800",children:a.jsx(e,{})})],args:{onConfirm:()=>alert("Você fugiu!")}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    onConfirm: () => console.log("Batalha abandonada!")
  }
}`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <div className="bg-zinc-950 p-20 rounded-lg border border-zinc-800">
        <Story />
      </div>],
  args: {
    onConfirm: () => alert("Você fugiu!")
  }
}`,...r.parameters?.docs?.source}}};const l=["Default","InGameContext"];export{o as Default,r as InGameContext,l as __namedExportsOrder,i as default};
