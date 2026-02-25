import{j as f}from"./jsx-runtime-u17CrQMm.js";import{r as k}from"./iframe-CD7bA76q.js";import{B as w,s as n}from"./mockBattle-Bv8Wz_6u.js";import{u as m}from"./BattleStore-ACFz61IO.js";import{u as b}from"./HandStore-DbUarlEx.js";import{u as h}from"./NavigationStore-2ELGCCum.js";import{B as C}from"./BattleStore-T2x42JYO.js";import{b as d}from"./loggingUtils-DeIXD9E4.js";import"./preload-helper-PPVm8Dsz.js";import"./keyUtils-D7xRxCLK.js";import"./index-JPVsj-18.js";import"./index-uqY1PiBg.js";import"./sword-BW0TyRi5.js";import"./createLucideIcon-DSd_fdSH.js";import"./BattleEventStore-ByTNv7X1.js";import"./middleware-DUDzcTzn.js";import"./index-DotQKZGK.js";import"./proxy-BDPQ_Hmg.js";import"./AbandonBattleModal-Bl_S5T87.js";import"./index-Bf8h-nmA.js";import"./opponent-DQWsul6B.js";import"./index-C23FsJDt.js";import"./FieldZone-BObv1E7n.js";import"./FieldZoneMenu-rkshEd8Y.js";import"./index-DEWakLrC.js";import"./ActiveFieldIndicator-DVhZfHVi.js";import"./BoardGutter-DlKMyWl7.js";import"./BoardSide-DuvSfawh.js";import"./BattleAnimation-qd2FLVp_.js";import"./BattleAnimationOverlay-DVae-v6O.js";const u=e=>new Promise(a=>setTimeout(a,e)),t={player:{id:1,name:"marcelo",hp:8e3,hand:[],field:[{card:{id:24,name:"Íbis Mensageiro Vanguarda",attackPower:1700,defensePower:1900,imageUrl:"images/exemplo_monstro_raro.jpg",description:"Suporte",type:"Íbis",element:"wind",attribute:"monster",stars:1,modifiers:[]},position:"attack",canAttack:!0}],spells:[],graveyard:[],canSummon:!1,deckCount:35},opponent:{id:5,name:"Darius Blackflare",hp:8e3,field:[{card:{id:24,name:"Íbis Mensageiro Vanguarda",attackPower:1200,defensePower:1900,imageUrl:"images/exemplo_monstro_raro.jpg",description:"Suporte",type:"Íbis",element:"wind",attribute:"monster",monsterRarity:"COMUM",stars:1,modifiers:[]},position:"attack",canAttack:!1}],spells:[],graveyard:[],handCount:2,deckCount:40},turn:3,currentTurnOwner:"player"},S=async({canvas:e,userEvent:a})=>{const c=await e.findByTestId("field-zone-player-0");await a.click(c),await u(500);const p=await e.findByRole("button",{name:/declarar ataque/i});await a.click(p),await u(500);const l=await e.findByTestId("field-zone-opponent-0");await a.click(l)},A=(e,a)=>c=>{const p=m(o=>o.initBattle),l=m(o=>o.clearBattle),B=m(o=>o.setEvent),{setVisible:y,setIsHidden:_}=b.getState(),[g,T]=k.useState(!0);return k.useEffect(()=>{h.getState().navigateTo("BATTLE"),l();const o=n.startMockBattle,E=d.attack;return n.startMockBattle=async r=>(console.log("🚀 [Mock] startMockBattle interceptado"),{success:!0,battleState:r}),d.attack=async(r,M)=>(console.log(`⚔️ [Mock] Ataque: ${r} vs ${M}`),await u(500),a||{success:!0,message:"Ataque realizado"}),(async()=>{try{const r=await n.startMockBattle(e);p(r.battleState),B(C.INITIAL),y(!0),_(!0),T(!1)}catch(r){console.error("Erro no mock bootstrap:",r)}})(),()=>{n.startMockBattle=o,d.attack=E}},[e,a]),g?f.jsx("div",{style:{color:"#fff",padding:"20px"},children:"Simulando Batalha..."}):f.jsx(c,{})},st={title:"Battle/AttackSimulation",component:w,parameters:{layout:"fullscreen"}},s={decorators:[A(t,{success:!0,result:"victory",state:{...t,opponent:{...t.opponent,hp:7500,field:[]}},damage:500})],play:S},i={decorators:[A({...t,opponent:{...t.opponent,field:[{...t.opponent.field[0],card:{...t.opponent.field[0].card,attackPower:2500}}]}},{success:!0,result:"defeat",state:{...t,player:{...t.player,hp:7200,field:[]}},damage:800})],play:S};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  decorators: [withBattleMock(BASE_MOCK_STATE, {
    success: true,
    result: "victory",
    state: {
      ...BASE_MOCK_STATE,
      opponent: {
        ...BASE_MOCK_STATE.opponent,
        hp: 7500,
        field: []
      }
    },
    damage: 500
  })],
  play: playAttackSequence
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  decorators: [withBattleMock({
    ...BASE_MOCK_STATE,
    opponent: {
      ...BASE_MOCK_STATE.opponent,
      field: [{
        ...BASE_MOCK_STATE.opponent.field[0],
        card: {
          ...BASE_MOCK_STATE.opponent.field[0].card,
          attackPower: 2500
        }
      }]
    }
  }, {
    success: true,
    result: "defeat",
    state: {
      ...BASE_MOCK_STATE,
      player: {
        ...BASE_MOCK_STATE.player,
        hp: 7200,
        field: []
      }
    },
    damage: 800
  })],
  play: playAttackSequence
}`,...i.parameters?.docs?.source}}};const it=["AttackVsAttack_Wins","AttackVsAttack_Loses"];export{i as AttackVsAttack_Loses,s as AttackVsAttack_Wins,it as __namedExportsOrder,st as default};
