import{j as S}from"./jsx-runtime-u17CrQMm.js";import{B as M,s as y}from"./mockBattle-BAfC1Kux.js";import{u}from"./BattleStore-Dt-_ZxQZ.js";import{u as C}from"./HandStore-Bpl3shuK.js";import{r as _}from"./iframe-Dm5SVBJu.js";import{B as O}from"./BattleStore-T2x42JYO.js";import"./keyUtils-CoVaxQrz.js";import"./index-B66kUrLA.js";import"./index-mHFlCYGw.js";import"./sword-B4t4mRyy.js";import"./createLucideIcon-CUMascdk.js";import"./imageUtils-CZ9VB9H-.js";import"./BattleEventStore-BfrLx-A1.js";import"./middleware-BNMqIGpK.js";import"./index-BcUiJg1X.js";import"./proxy-CgdA6mOl.js";import"./AbandonBattleModal-1wzYa91Q.js";import"./index-DMUaVgyo.js";import"./loggingUtils-DeIXD9E4.js";import"./opponent-otKdYHDF.js";import"./index-B7Yk0Gby.js";import"./FieldZone-ClpNw_-w.js";import"./FieldZoneMenu-BkOcw8G7.js";import"./index-DBjhgHY_.js";import"./ActiveFieldIndicator-DVhZfHVi.js";import"./BoardGutter-gOAFBqKo.js";import"./BoardSide-D1NUWhyX.js";import"./BattleAnimation-CknWflHG.js";import"./BattleAnimationOverlay-hnDmvNzA.js";import"./preload-helper-PPVm8Dsz.js";const T=t=>new Promise(o=>setTimeout(o,t)),e={player:{id:1,name:"marcelo",hp:8e3,hand:[],field:[{card:{id:24,name:"Íbis Mensageiro Vanguarda",description:"Monstro de suporte.",imageUrl:"images/exemplo_monstro_raro.jpg",type:"Íbis de Thoth",element:"wind",attribute:"monster",stars:1,attackPower:1700,defensePower:1900,modifiers:[],effectScript:null,effectValue:null},position:"attack",canAttack:!0}],spells:[],graveyard:[],canSummon:!1,deckCount:35},opponent:{id:5,name:"Darius Blackflare",hp:8e3,field:[{card:{id:24,name:"Íbis Mensageiro Vanguarda",description:"Monstro de suporte.",imageUrl:"images/exemplo_monstro_raro.jpg",type:"Íbis de Thoth",element:"wind",attribute:"monster",stars:1,attackPower:1200,defensePower:1900,modifiers:[],effectScript:null,effectValue:null},position:"attack",canAttack:!1}],spells:[],graveyard:[],handCount:2,deckCount:40},turn:3,currentTurnOwner:"player"},n=async({canvas:t,userEvent:o})=>{const m=await t.findByTestId("field-zone-player-0");await o.click(m),await T(1e3);const f=await t.findByRole("button",{name:/declarar ataque/i});await o.click(f),await T(1e3);const A=await t.findByTestId("field-zone-opponent-0");await o.click(A)},a=t=>o=>{const m=u(r=>r.initBattle),f=u(r=>r.setEvent),{setVisible:A,setIsHidden:k}=C.getState(),[E,B]=_.useState(!0);return _.useEffect(()=>{(async()=>{const w=await y(t);m(w.battleState),f(O.INITIAL),A(!0),k(!0),B(!1)})()},[t]),E?S.jsx("div",{style:{color:"#fff",padding:"20px"},children:"Carregando cenário..."}):S.jsx(o,{})},ne={title:"Battle/AttackSimulation",component:M,parameters:{layout:"fullscreen"}},s={decorators:[a(e)],play:n},p={decorators:[a({...e,opponent:{...e.opponent,field:[{...e.opponent.field[0],card:{...e.opponent.field[0].card,attackPower:2500}}]}})],play:n},c={decorators:[a({...e,opponent:{...e.opponent,field:[{...e.opponent.field[0],card:{...e.opponent.field[0].card,attackPower:1700}}]}})],play:n},i={decorators:[a({...e,opponent:{...e.opponent,field:[{...e.opponent.field[0],position:"defense",card:{...e.opponent.field[0].card,defensePower:1e3}}]}})],play:n},d={decorators:[a({...e,opponent:{...e.opponent,field:[{...e.opponent.field[0],position:"defense",card:{...e.opponent.field[0].card,defensePower:3e3}}]}})],play:n},l={decorators:[a({...e,opponent:{...e.opponent,field:[{...e.opponent.field[0],position:"defense",card:{...e.opponent.field[0].card,defensePower:1700}}]}})],play:n};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  decorators: [withBattleMock(BASE_MOCK_STATE)],
  play: playAttackSequence
}`,...s.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
  })],
  play: playAttackSequence
}`,...p.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  decorators: [withBattleMock({
    ...BASE_MOCK_STATE,
    opponent: {
      ...BASE_MOCK_STATE.opponent,
      field: [{
        ...BASE_MOCK_STATE.opponent.field[0],
        card: {
          ...BASE_MOCK_STATE.opponent.field[0].card,
          attackPower: 1700
        }
      }]
    }
  })],
  play: playAttackSequence
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  decorators: [withBattleMock({
    ...BASE_MOCK_STATE,
    opponent: {
      ...BASE_MOCK_STATE.opponent,
      field: [{
        ...BASE_MOCK_STATE.opponent.field[0],
        position: "defense",
        card: {
          ...BASE_MOCK_STATE.opponent.field[0].card,
          defensePower: 1000
        }
      }]
    }
  })],
  play: playAttackSequence
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  decorators: [withBattleMock({
    ...BASE_MOCK_STATE,
    opponent: {
      ...BASE_MOCK_STATE.opponent,
      field: [{
        ...BASE_MOCK_STATE.opponent.field[0],
        position: "defense",
        card: {
          ...BASE_MOCK_STATE.opponent.field[0].card,
          defensePower: 3000
        }
      }]
    }
  })],
  play: playAttackSequence
}`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  decorators: [withBattleMock({
    ...BASE_MOCK_STATE,
    opponent: {
      ...BASE_MOCK_STATE.opponent,
      field: [{
        ...BASE_MOCK_STATE.opponent.field[0],
        position: "defense",
        card: {
          ...BASE_MOCK_STATE.opponent.field[0].card,
          defensePower: 1700
        }
      }]
    }
  })],
  play: playAttackSequence
}`,...l.parameters?.docs?.source}}};const ae=["AttackVsAttack_Wins","AttackVsAttack_Loses","AttackVsAttack_Draw","AttackVsDefense_Wins","AttackVsDefense_Loses","AttackVsDefense_Draw"];export{c as AttackVsAttack_Draw,p as AttackVsAttack_Loses,s as AttackVsAttack_Wins,l as AttackVsDefense_Draw,d as AttackVsDefense_Loses,i as AttackVsDefense_Wins,ae as __namedExportsOrder,ne as default};
