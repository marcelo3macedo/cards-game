import{j as t}from"./jsx-runtime-u17CrQMm.js";import{B as o}from"./BoardGutter-CdfEe-7v.js";import{u as s}from"./BattleStore-dKdnP1B8.js";import"./middleware-fqqVVZrf.js";import"./iframe-DBukG52k.js";import"./preload-helper-PPVm8Dsz.js";const u={title:"Game/BoardGutter",component:o,parameters:{layout:"centered"},decorators:[n=>(s.setState({player:{id:1,hp:3e3,name:"Test",field:[],spells:[],graveyard:Array(5).fill({}),deckCount:30,canSummon:!0},opponent:{id:2,hp:3e3,name:"Test",field:[],spells:[],graveyard:Array(2).fill({}),deckCount:15,canSummon:!0}}),t.jsx("div",{className:"bg-zinc-950 p-10",children:t.jsx(n,{})}))]},e={args:{type:"player"}},r={args:{type:"opponent"}},a={args:{type:"player"},play:()=>{s.setState({player:{id:1,hp:3e3,name:"Test",field:[],spells:[],graveyard:Array(5).fill({}),deckCount:0,canSummon:!0}})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
        id: 1,
        hp: 3000,
        name: "Test",
        field: [],
        spells: [],
        graveyard: Array(5).fill({}),
        deckCount: 0,
        canSummon: true
      }
    });
  }
}`,...a.parameters?.docs?.source}}};const y=["PlayerWithCards","OpponentWithCards","EmptyDeck"];export{a as EmptyDeck,r as OpponentWithCards,e as PlayerWithCards,y as __namedExportsOrder,u as default};
