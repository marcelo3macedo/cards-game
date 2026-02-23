import{j as o}from"./jsx-runtime-u17CrQMm.js";import{F as d}from"./FieldZoneMenu-BkOcw8G7.js";import"./iframe-Dm5SVBJu.js";import"./preload-helper-PPVm8Dsz.js";import"./BattleStore-T2x42JYO.js";import"./loggingUtils-DeIXD9E4.js";import"./BattleEventStore-BfrLx-A1.js";import"./middleware-BNMqIGpK.js";import"./BattleStore-Dt-_ZxQZ.js";import"./proxy-CgdA6mOl.js";import"./sword-B4t4mRyy.js";import"./createLucideIcon-CUMascdk.js";const A={title:"Game/FieldZoneMenu",component:d,parameters:{layout:"centered",backgrounds:{default:"dark"}},decorators:[c=>o.jsxs("div",{className:"relative w-32 h-44 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center bg-zinc-800",children:[o.jsx("span",{className:"text-zinc-500 text-xs",children:"Card Slot"}),o.jsx(c,{})]})],argTypes:{}},e={args:{mode:"attack",index:0,isOpponent:!1,canAttack:!0}},a={args:{mode:"attack",index:0,isOpponent:!1,canAttack:!1}},r={args:{mode:"face-down-attack",index:1,isOpponent:!1}},n={args:{mode:"defense",index:2,isOpponent:!1}},t={args:{mode:"attack",index:3,isOpponent:!0}},s={args:{mode:"face-down-attack",index:4,isOpponent:!0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    mode: "attack",
    index: 0,
    isOpponent: false,
    canAttack: true
  }
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    mode: "attack",
    index: 0,
    isOpponent: false,
    canAttack: false
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    mode: "face-down-attack",
    index: 1,
    isOpponent: false
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    mode: "defense",
    index: 2,
    isOpponent: false
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    mode: "attack",
    index: 3,
    isOpponent: true
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    mode: "face-down-attack",
    index: 4,
    isOpponent: true
  }
}`,...s.parameters?.docs?.source}}};const D=["PlayerAttackMode","PlayerAttackDisableMode","PlayerFaceDown","PlayerDefenseMode","OpponentCard","OpponentFaceDown"];export{t as OpponentCard,s as OpponentFaceDown,a as PlayerAttackDisableMode,e as PlayerAttackMode,n as PlayerDefenseMode,r as PlayerFaceDown,D as __namedExportsOrder,A as default};
