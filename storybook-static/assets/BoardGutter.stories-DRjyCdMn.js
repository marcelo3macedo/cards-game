import{j as t}from"./jsx-runtime-u17CrQMm.js";import{B as n}from"./BoardGutter-CoFGuS1R.js";import{u as s}from"./BattleStore-DJ04qHHZ.js";import"./iframe-Dxz4Iu-O.js";import"./preload-helper-PPVm8Dsz.js";const l={title:"Game/BoardGutter",component:n,parameters:{layout:"centered"},decorators:[o=>(s.setState({player:{graveyard:Array(5).fill({}),deckCount:30},opponent:{graveyard:Array(2).fill({}),deckCount:15}}),t.jsx("div",{className:"bg-zinc-950 p-10",children:t.jsx(o,{})}))]},e={args:{type:"player"}},r={args:{type:"opponent"}},a={args:{type:"player"},play:()=>{s.setState({player:{graveyard:[],deckCount:0}})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    type: "player"
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    type: "opponent"
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    type: "player"
  },
  play: () => {
    useBattleStore.setState({
      player: {
        graveyard: [],
        deckCount: 0
      }
    });
  }
}`,...a.parameters?.docs?.source}}};const i=["PlayerWithCards","OpponentWithCards","EmptyDeck"];export{a as EmptyDeck,r as OpponentWithCards,e as PlayerWithCards,i as __namedExportsOrder,l as default};
