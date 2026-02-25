import{j as f}from"./jsx-runtime-u17CrQMm.js";import{r as k}from"./iframe-DlJpJoSd.js";import{B as w,s as n}from"./mockBattle-Kknc-5Vk.js";import{u as m}from"./BattleStore-B3bsQDvF.js";import{u as b}from"./HandStore-C24rNpTV.js";import{u as h}from"./NavigationStore-C8M0VB1b.js";import{B as C}from"./BattleStore-T2x42JYO.js";import{b as d}from"./loggingUtils-DeIXD9E4.js";import"./preload-helper-PPVm8Dsz.js";import"./keyUtils-D7xRxCLK.js";import"./index-DH9WTor7.js";import"./index-DGB_z2we.js";import"./sword-Ds4lbubG.js";import"./createLucideIcon-BZeSKhbf.js";import"./BattleEventStore-DoALTfeG.js";import"./middleware-Cli69yI4.js";import"./index-DafWUxtG.js";import"./proxy-DrU6dVvx.js";import"./AbandonBattleModal-BW3lrgsY.js";import"./index-CceX6wf6.js";import"./opponent-CZvh9YzU.js";import"./index-BRgPO0Xt.js";import"./FieldZone-CvOmnD7i.js";import"./FieldZoneMenu-DcgkamV5.js";import"./index-CDUGeu_T.js";import"./ActiveFieldIndicator-DVhZfHVi.js";import"./BoardGutter-Ca79Fc-W.js";import"./BoardSide-Dxk6nt9c.js";import"./BattleAnimation-C3tQcuRp.js";import"./BattleAnimationOverlay-CpaBt-w8.js";const u=e=>new Promise(a=>setTimeout(a,e)),t={player:{id:1,name:"marcelo",hp:8e3,hand:[],field:[{card:{id:24,name:"Íbis Mensageiro Vanguarda",attackPower:1700,defensePower:1900,imageUrl:"images/exemplo_monstro_raro.jpg",description:"Suporte",type:"Íbis",element:"wind",attribute:"monster",stars:1,modifiers:[]},position:"attack",canAttack:!0}],spells:[],graveyard:[],canSummon:!1,deckCount:35},opponent:{id:5,name:"Darius Blackflare",hp:8e3,field:[{card:{id:24,name:"Íbis Mensageiro Vanguarda",attackPower:1200,defensePower:1900,imageUrl:"images/exemplo_monstro_raro.jpg",description:"Suporte",type:"Íbis",element:"wind",attribute:"monster",monsterRarity:"COMUM",stars:1,modifiers:[]},position:"attack",canAttack:!1}],spells:[],graveyard:[],handCount:2,deckCount:40},turn:3,currentTurnOwner:"player"},S=async({canvas:e,userEvent:a})=>{const c=await e.findByTestId("field-zone-player-0");await a.click(c),await u(500);const p=await e.findByRole("button",{name:/declarar ataque/i});await a.click(p),await u(500);const l=await e.findByTestId("field-zone-opponent-0");await a.click(l)},A=(e,a)=>c=>{const p=m(o=>o.initBattle),l=m(o=>o.clearBattle),B=m(o=>o.setEvent),{setVisible:y,setIsHidden:_}=b.getState(),[g,T]=k.useState(!0);return k.useEffect(()=>{h.getState().navigateTo("BATTLE"),l();const o=n.startMockBattle,E=d.attack;return n.startMockBattle=async r=>(console.log("🚀 [Mock] startMockBattle interceptado"),{success:!0,battleState:r}),d.attack=async(r,M)=>(console.log(`⚔️ [Mock] Ataque: ${r} vs ${M}`),await u(500),a||{success:!0,message:"Ataque realizado"}),(async()=>{try{const r=await n.startMockBattle(e);p(r.battleState),B(C.INITIAL),y(!0),_(!0),T(!1)}catch(r){console.error("Erro no mock bootstrap:",r)}})(),()=>{n.startMockBattle=o,d.attack=E}},[e,a]),g?f.jsx("div",{style:{color:"#fff",padding:"20px"},children:"Simulando Batalha..."}):f.jsx(c,{})},st={title:"Battle/AttackSimulation",component:w,parameters:{layout:"fullscreen"}},s={decorators:[A(t,{success:!0,result:"victory",state:{...t,opponent:{...t.opponent,hp:7500,field:[]}},damage:500})],play:S},i={decorators:[A({...t,opponent:{...t.opponent,field:[{...t.opponent.field[0],card:{...t.opponent.field[0].card,attackPower:2500}}]}},{success:!0,result:"defeat",state:{...t,player:{...t.player,hp:7200,field:[]}},damage:800})],play:S};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
