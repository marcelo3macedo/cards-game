import{j as s}from"./jsx-runtime-u17CrQMm.js";import{F as d}from"./FieldZoneMenu-BQ333NHy.js";import"./iframe-Dxz4Iu-O.js";import"./preload-helper-PPVm8Dsz.js";import"./battleService-ICuohWDs.js";import"./BattleEventStore-BHkVyqAg.js";import"./BattleStore-DJ04qHHZ.js";import"./proxy-BCZisOYc.js";import"./sword-tIX24kzi.js";import"./createLucideIcon-SZYWXtx4.js";const w={title:"Game/FieldZoneMenu",component:d,parameters:{layout:"centered",backgrounds:{default:"dark"}},decorators:[t=>s.jsxs("div",{className:"relative w-32 h-44 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center bg-zinc-800",children:[s.jsx("span",{className:"text-zinc-500 text-xs",children:"Card Slot"}),s.jsx(t,{})]})],argTypes:{onInitiateAttack:{action:"attack_initiated"},onChangeMode:{action:"mode_changed"},onView:{action:"view_card"},onClose:{action:"menu_closed"}}},e={args:{mode:"atk",index:0,isOpponent:!1}},n={args:{mode:"face-down",index:1,isOpponent:!1}},r={args:{mode:"def",index:2,isOpponent:!1}},a={args:{mode:"atk",index:3,isOpponent:!0}},o={args:{mode:"face-down",index:4,isOpponent:!0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    mode: "atk",
    index: 0,
    isOpponent: false
  }
}`,...e.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    mode: "face-down",
    index: 1,
    isOpponent: false
  }
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    mode: "def",
    index: 2,
    isOpponent: false
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    mode: "atk",
    index: 3,
    isOpponent: true
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    mode: "face-down",
    index: 4,
    isOpponent: true
  }
}`,...o.parameters?.docs?.source}}};const k=["PlayerAttackMode","PlayerFaceDown","PlayerDefenseMode","OpponentCard","OpponentFaceDown"];export{a as OpponentCard,o as OpponentFaceDown,e as PlayerAttackMode,r as PlayerDefenseMode,n as PlayerFaceDown,k as __namedExportsOrder,w as default};
