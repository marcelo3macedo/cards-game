import{j as e}from"./jsx-runtime-u17CrQMm.js";import{M as g}from"./index-CK7_MADk.js";import{w as k}from"./FieldZoneMenu-BQ333NHy.js";import{B as l}from"./BoardGutter-CoFGuS1R.js";import{B as c}from"./BoardSide-6b1-hu3K.js";import{e as f}from"./exemplo_comum-Kgn1VGfG.js";import"./iframe-Dxz4Iu-O.js";import"./preload-helper-PPVm8Dsz.js";import"./sword-tIX24kzi.js";import"./createLucideIcon-SZYWXtx4.js";import"./star-CBuiB-me.js";import"./battleService-ICuohWDs.js";import"./BattleEventStore-BHkVyqAg.js";import"./BattleStore-DJ04qHHZ.js";import"./proxy-BCZisOYc.js";import"./FieldZone-Dak23u1l.js";import"./BattleStore-xuFNDUoX.js";import"./index-BCBNK8Q-.js";const x=()=>{const n=k("useGameBoard"),o=!1,i=!1,u=()=>{},p=()=>{};return{isBlur:i,isSelectingTarget:o,onDraw:n(u),onSelectTarget:n(p)}};function m(){const{isSelectingTarget:n,onDraw:o}=x();return e.jsxs("div",{className:"grid grid-cols-[120px_1fr_120px] gap-8 items-center w-full max-w-7xl px-10 transition-all duration-500 ",children:[e.jsx(l,{type:"opponent",onDraw:o}),e.jsxs("div",{className:"flex flex-col gap-10",children:[e.jsx("div",{className:"transition-all duration-300 rounded-xl grayscale-[0.3]",onClick:()=>n,children:e.jsx(c,{isOpponent:!0})}),e.jsx("div",{className:"w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]"}),e.jsx(c,{})]}),e.jsx(l,{type:"player",onDraw:o})]})}m.__docgenInfo={description:"",methods:[],displayName:"GameBoard"};const r=new g("1","Patrulheiro Gárgula de Gelo","Emmissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados. Sua presença inspira coragem, e o eco de seu grito de gelo ressoa nas muralhas, formando escudos de pedra que refutam qualquer ataque.",f,"ice",2500,2100,7,"LEGENDARIO"),D={title:"Game/GameBoard",component:m,parameters:{layout:"fullscreen",backgrounds:{default:"dark"}},decorators:[n=>e.jsx("div",{className:"bg-zinc-950 min-h-screen flex items-center justify-center p-10",children:e.jsx(n,{})})]},t={args:{monsterZones:Array(5).fill({card:null,mode:"atk"}),opponentZones:Array(5).fill({card:null,mode:"atk"}),isBlur:!1,isSelecting:!1,isSelectingTarget:!1}},a={args:{monsterZones:[{card:r,mode:"atk"},{card:r,mode:"def"},{card:null,mode:"atk"},{card:null,mode:"atk"},{card:null,mode:"atk"}],opponentZones:[{card:r,mode:"face-down"},{card:null,mode:"atk"},{card:null,mode:"atk"},{card:null,mode:"atk"},{card:null,mode:"atk"}],isSelecting:!0,focusedZoneIndex:2}},s={args:{monsterZones:[{card:r,mode:"atk"},{card:null,mode:"atk"},{card:null,mode:"atk"},{card:null,mode:"atk"},{card:null,mode:"atk"}],opponentZones:[{card:r,mode:"atk"},{card:r,mode:"def"},{card:null,mode:"atk"},{card:null,mode:"atk"},{card:null,mode:"atk"}],isSelectingTarget:!0,highlightedIndex:0}},d={args:{...a.args,isBlur:!0}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    monsterZones: Array(5).fill({
      card: null,
      mode: "atk"
    }),
    opponentZones: Array(5).fill({
      card: null,
      mode: "atk"
    }),
    isBlur: false,
    isSelecting: false,
    isSelectingTarget: false
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    monsterZones: [{
      card: mockMonster,
      mode: "atk"
    }, {
      card: mockMonster,
      mode: "def"
    }, {
      card: null,
      mode: "atk"
    }, {
      card: null,
      mode: "atk"
    }, {
      card: null,
      mode: "atk"
    }],
    opponentZones: [{
      card: mockMonster,
      mode: "face-down"
    }, {
      card: null,
      mode: "atk"
    }, {
      card: null,
      mode: "atk"
    }, {
      card: null,
      mode: "atk"
    }, {
      card: null,
      mode: "atk"
    }],
    isSelecting: true,
    focusedZoneIndex: 2
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    monsterZones: [{
      card: mockMonster,
      mode: "atk"
    }, {
      card: null,
      mode: "atk"
    }, {
      card: null,
      mode: "atk"
    }, {
      card: null,
      mode: "atk"
    }, {
      card: null,
      mode: "atk"
    }],
    opponentZones: [{
      card: mockMonster,
      mode: "atk"
    }, {
      card: mockMonster,
      mode: "def"
    }, {
      card: null,
      mode: "atk"
    }, {
      card: null,
      mode: "atk"
    }, {
      card: null,
      mode: "atk"
    }],
    isSelectingTarget: true,
    highlightedIndex: 0
  }
}`,...s.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    ...PlayerTurn.args,
    isBlur: true
  }
}`,...d.parameters?.docs?.source}}};const P=["EmptyBoard","PlayerTurn","SelectingAttackTarget","Blurred"];export{d as Blurred,t as EmptyBoard,a as PlayerTurn,s as SelectingAttackTarget,P as __namedExportsOrder,D as default};
