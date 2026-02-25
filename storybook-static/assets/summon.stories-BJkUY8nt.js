import{j as M}from"./jsx-runtime-u17CrQMm.js";import{r as A}from"./iframe-CD7bA76q.js";import{B as O,s as d}from"./mockBattle-Bv8Wz_6u.js";import{u as y}from"./BattleStore-ACFz61IO.js";import{u as K}from"./HandStore-DbUarlEx.js";import{u as D}from"./NavigationStore-2ELGCCum.js";import{B as q}from"./BattleStore-T2x42JYO.js";import{b as w}from"./loggingUtils-DeIXD9E4.js";import"./preload-helper-PPVm8Dsz.js";import"./keyUtils-D7xRxCLK.js";import"./index-JPVsj-18.js";import"./index-uqY1PiBg.js";import"./sword-BW0TyRi5.js";import"./createLucideIcon-DSd_fdSH.js";import"./BattleEventStore-ByTNv7X1.js";import"./middleware-DUDzcTzn.js";import"./index-DotQKZGK.js";import"./proxy-BDPQ_Hmg.js";import"./AbandonBattleModal-Bl_S5T87.js";import"./index-Bf8h-nmA.js";import"./opponent-DQWsul6B.js";import"./index-C23FsJDt.js";import"./FieldZone-BObv1E7n.js";import"./FieldZoneMenu-rkshEd8Y.js";import"./index-DEWakLrC.js";import"./ActiveFieldIndicator-DVhZfHVi.js";import"./BoardGutter-DlKMyWl7.js";import"./BoardSide-DuvSfawh.js";import"./BattleAnimation-qd2FLVp_.js";import"./BattleAnimationOverlay-DVae-v6O.js";const n=e=>new Promise(a=>setTimeout(a,e)),i={id:24,name:"Íbis Mensageiro Vanguarda",description:"Monstro de suporte.",imageUrl:"images/exemplo_monstro_raro.jpg",type:"Íbis de Thoth",element:"wind",attribute:"monster",stars:1,attackPower:1200,defensePower:1900,modifiers:[]},t={player:{id:1,name:"marcelo",hp:8e3,hand:[i],field:[null,null,null,null,null],spells:[null,null,null,null,null],graveyard:[],canSummon:!0,deckCount:35},opponent:{id:5,name:"Darius Blackflare",hp:8e3,handCount:2,field:[null,null,null,null,null],spells:[],graveyard:[],deckCount:40},turn:3,currentTurnOwner:"player"},x=async({canvas:e,userEvent:a})=>{const o=await e.findByTestId("hand-card-0");await a.click(o),await n(1e3);const s=await e.findByTestId("field-zone-player-0");await a.click(s),await n(1e3);const r=await e.findByTestId("summon-card-attack");await a.click(r),await n(1e3)},F=async({canvas:e,userEvent:a})=>{const o=await e.findByTestId("hand-card-0");await a.click(o),await n(1e3);const s=await e.findByTestId("field-zone-player-0");await a.click(s),await n(1e3);const r=await e.findByTestId("summon-card-defense");await a.click(r),await n(1e3)},j=async({canvas:e,userEvent:a})=>{const o=await e.findByTestId("hand-card-0");await a.click(o),await n(1e3);const s=await e.findByTestId("field-zone-player-0");await a.click(s),await n(1e3);const r=await e.findByTestId("summon-card-face-down-attack");await a.click(r),await n(1e3)},v=async({canvas:e,userEvent:a})=>{const o=await e.findByTestId("hand-card-0");await a.click(o),await n(1e3);const s=await e.findByTestId("field-zone-player-0");await a.click(s),await n(1e3);const r=await e.findByTestId("summon-card-face-down-defense");await a.click(r),await n(1e3)},f=(e,a)=>o=>{const s=y(l=>l.initBattle),r=y(l=>l.clearBattle),_=y(l=>l.setEvent),{setVisible:k,setIsHidden:C}=K.getState(),[g,h]=A.useState(!0);return A.useEffect(()=>{D.getState().navigateTo("BATTLE"),r();const l=d.startMockBattle,E=w.summonCard;return d.startMockBattle=async c=>(console.log("🚀 [Mock] startMockBattle interceptado"),{success:!0,battleState:c}),w.summonCard=async(c,B,T)=>(console.log(`✨ [Mock] Invocando carta ${c} na zona ${B} em modo ${T}`),await n(600),a||{success:!0,message:"Invocação bem sucedida",state:{...e,player:{...e.player,hand:e.player.hand.slice(1),field:e.player.field.map((I,b)=>b===B?{card:i,position:T}:I)}}}),(async()=>{try{const c=await d.startMockBattle(e);s(c.battleState),_(q.INITIAL),k(!0),C(!1),h(!1)}catch(c){console.error("Erro no mock bootstrap:",c)}})(),()=>{d.startMockBattle=l,w.summonCard=E}},[e,a]),g?M.jsx("div",{style:{color:"#fff",padding:"20px"},children:"Simulando Invocação..."}):M.jsx(o,{})},fe={title:"Battle/SummonSimulation",component:O,parameters:{layout:"fullscreen"}},u={decorators:[f(t,{success:!0,message:"Invocação bem sucedida",state:{...t,player:{...t.player,hand:[],field:[{card:i,position:"attack"},null,null,null,null]}}})],play:x},m={decorators:[f(t,{success:!0,message:"Invocação bem sucedida",state:{...t,player:{...t.player,hand:[],field:[{card:i,position:"defense"},null,null,null,null]}}})],play:F},p={decorators:[f(t,{success:!0,message:"Invocação bem sucedida",state:{...t,player:{...t.player,hand:[],field:[{card:i,position:"face-down-attack"},null,null,null,null]}}})],play:j},S={decorators:[f(t,{success:!0,message:"Invocação bem sucedida",state:{...t,player:{...t.player,hand:[],field:[{card:i,position:"face-down-defense"},null,null,null,null]}}})],play:v};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  decorators: [withSummonMock(BASE_MOCK_STATE, {
    success: true,
    message: "Invocação bem sucedida",
    state: {
      ...BASE_MOCK_STATE,
      player: {
        ...BASE_MOCK_STATE.player,
        hand: [],
        field: [{
          card: MOCK_CARD,
          position: "attack"
        }, null, null, null, null]
      }
    }
  })],
  play: playSummonSequence
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  decorators: [withSummonMock(BASE_MOCK_STATE, {
    success: true,
    message: "Invocação bem sucedida",
    state: {
      ...BASE_MOCK_STATE,
      player: {
        ...BASE_MOCK_STATE.player,
        hand: [],
        field: [{
          card: MOCK_CARD,
          position: "defense"
        }, null, null, null, null]
      }
    }
  })],
  play: playSummonDefenseSequence
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  decorators: [withSummonMock(BASE_MOCK_STATE, {
    success: true,
    message: "Invocação bem sucedida",
    state: {
      ...BASE_MOCK_STATE,
      player: {
        ...BASE_MOCK_STATE.player,
        hand: [],
        field: [{
          card: MOCK_CARD,
          position: "face-down-attack"
        }, null, null, null, null]
      }
    }
  })],
  play: playSummonFaceDownSequence
}`,...p.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  decorators: [withSummonMock(BASE_MOCK_STATE, {
    success: true,
    message: "Invocação bem sucedida",
    state: {
      ...BASE_MOCK_STATE,
      player: {
        ...BASE_MOCK_STATE.player,
        hand: [],
        field: [{
          card: MOCK_CARD,
          position: "face-down-defense"
        }, null, null, null, null]
      }
    }
  })],
  play: playSummonFaceDownDefenseSequence
}`,...S.parameters?.docs?.source}}};const ye=["SuccessfulAttackModeSummon","SuccessfulDefenseModeSummon","SuccessfulFaceDownAttackModeSummon","SuccessfulFaceDownDefenseModeSummon"];export{u as SuccessfulAttackModeSummon,m as SuccessfulDefenseModeSummon,p as SuccessfulFaceDownAttackModeSummon,S as SuccessfulFaceDownDefenseModeSummon,ye as __namedExportsOrder,fe as default};
