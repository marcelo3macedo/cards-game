import{j as d}from"./jsx-runtime-u17CrQMm.js";import{r as l}from"./iframe-DBukG52k.js";import{u as p}from"./BattleStore-dKdnP1B8.js";import{u as _}from"./HandStore-BptDJQV1.js";import{u as w}from"./NavigationStore-DBBjTAGW.js";import{B as C}from"./BattleStore-T2x42JYO.js";import{b as c}from"./loggingUtils-DeIXD9E4.js";import{B as k,s as n}from"./mockBattle-CYjJGTfH.js";import"./preload-helper-PPVm8Dsz.js";import"./middleware-fqqVVZrf.js";import"./keyUtils-D7xRxCLK.js";import"./index-Bb5ro92g.js";import"./index-aMVW_cU8.js";import"./sword-ZPukh-T6.js";import"./createLucideIcon-yUaj9tx8.js";import"./BattleEventStore-CD-7P6fl.js";import"./index-Cj3AEtG3.js";import"./proxy-DCABHE5u.js";import"./AbandonBattleModal-B9PmODzs.js";import"./index-EtGsicMB.js";import"./opponent-BJmpHAuR.js";import"./index-WfwvYLNt.js";import"./FieldZone-C7TQ0a-y.js";import"./FieldZoneMenu-C0iq5ZXx.js";import"./index-DF4dACa2.js";import"./ActiveFieldIndicator-DVhZfHVi.js";import"./BoardGutter-CdfEe-7v.js";import"./BoardSide-C_ZWpl1_.js";import"./BattleAnimation-YhyJU8iz.js";import"./BattleAnimationOverlay--uRsKr2s.js";const B=e=>new Promise(r=>setTimeout(r,e)),u={id:99,name:"Carta Comprada",description:"Efeito de compra de turno.",imageUrl:"images/exemplo_monstro_raro.jpg",type:"Guerreiro",element:"light",attribute:"monster",stars:4,attackPower:2e3,defensePower:1e3,modifiers:[]},o={player:{id:1,name:"marcelo",hp:8e3,hand:[],field:[{card:{id:24,name:"Íbis Mensageiro Vanguarda",description:"Monstro de suporte.",imageUrl:"images/exemplo_monstro_raro.jpg",type:"Íbis de Thoth",element:"wind",attribute:"monster",stars:1,attackPower:1200,defensePower:1200,modifiers:[],effectScript:null,effectValue:null},position:"defense",canAttack:!0}],spells:[],graveyard:[],canSummon:!1,deckCount:30},opponent:{id:5,name:"Darius Blackflare",hp:8e3,field:[{card:{id:24,name:"Íbis Mensageiro Vanguarda",description:"Monstro de suporte.",imageUrl:"images/exemplo_monstro_raro.jpg",type:"Íbis de Thoth",element:"wind",attribute:"monster",stars:1,attackPower:1200,defensePower:1200,modifiers:[],effectScript:null,effectValue:null},position:"attack",canAttack:!0}],spells:[],graveyard:[],handCount:5,deckCount:35},turn:1,currentTurnOwner:"player"},M=async({canvas:e,userEvent:r})=>{const s=await e.findByTestId("button-endturn");await r.click(s)},b=(e,r)=>s=>{const m=p(t=>t.initBattle),f=p(t=>t.clearBattle),g=p(t=>t.setEvent),{setVisible:y,setIsHidden:S}=_.getState(),[T,h]=l.useState(!0);return l.useEffect(()=>{w.getState().navigateTo("BATTLE"),f();const t=n.startMockBattle,E=c.endTurn;return n.startMockBattle=async a=>({success:!0,battleState:a}),c.endTurn=async()=>(console.log("🔄 [Mock] Finalizando turno do jogador..."),await B(800),r||{success:!0,actions:[{type:"phaseChange",phase:"OPPONENT_TURN"},{type:"phaseChange",phase:"PLAYER_DRAW_PHASE"},{type:"draw",card:u}],state:{...e,player:{...e.player,hand:[u],deckCount:e.player.deckCount-1,canSummon:!0},turn:e.turn+1,currentTurnOwner:"player"}}),(async()=>{try{const a=await n.startMockBattle(e);m(a.battleState),g(C.INITIAL),y(!0),S(!0),h(!1)}catch(a){console.error("Erro no bootstrap:",a)}})(),()=>{n.startMockBattle=t,c.endTurn=E}},[e,r]),T?d.jsx("div",{style:{color:"#fff",padding:"20px"},children:"Iniciando Duelo..."}):d.jsx(s,{})},ne={title:"Battle/VillainActions",component:k,parameters:{layout:"fullscreen"}},i={decorators:[b(o,{actions:[{type:"handCountUpdated",handCount:4},{type:"activate",card:{id:"field-card-1",name:"Raigeki",description:"Limpa o campo inimigo",imageUrl:"images/exemplo_magica.jpg",attribute:"spell",effectScript:"field",effectValue:[]},handCount:2,newState:{...o,opponent:{id:5,name:"Darius Blackflare",hp:8e3,field:[{card:{id:24,name:"Íbis Mensageiro Vanguarda",description:"Monstro de suporte.",imageUrl:"images/exemplo_monstro_raro.jpg",type:"Íbis de Thoth",element:"wind",attribute:"monster",stars:1,attackPower:1900,defensePower:1900,modifiers:[],effectScript:null,effectValue:null},position:"attack",canAttack:!0}],spells:[],graveyard:[],handCount:2,deckCount:40},currentTurnOwner:"player",turn:4,environment:{activeField:{id:"field-card-1",name:"Vale das Névoas",type:"field"}}}}],state:{...o,player:{...o.player,field:[]},opponent:{...o.opponent},currentTurnOwner:"player",turn:4}})],play:M};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  decorators: [withTurnMock(BASE_MOCK_STATE, {
    actions: [{
      type: 'handCountUpdated',
      handCount: 4
    }, {
      type: "activate",
      card: {
        id: "field-card-1",
        name: "Raigeki",
        description: "Limpa o campo inimigo",
        imageUrl: "images/exemplo_magica.jpg",
        attribute: "spell",
        effectScript: "field",
        effectValue: []
      },
      handCount: 2,
      newState: {
        ...BASE_MOCK_STATE,
        opponent: {
          id: 5,
          name: "Darius Blackflare",
          hp: 8000,
          field: [{
            card: {
              id: 24,
              name: "Íbis Mensageiro Vanguarda",
              description: "Monstro de suporte.",
              imageUrl: "images/exemplo_monstro_raro.jpg",
              type: "Íbis de Thoth",
              element: "wind",
              attribute: "monster",
              stars: 1,
              attackPower: 1900,
              defensePower: 1900,
              modifiers: [],
              effectScript: null,
              effectValue: null
            },
            position: "attack",
            canAttack: true
          }],
          spells: [],
          graveyard: [],
          handCount: 2,
          deckCount: 40
        },
        currentTurnOwner: "player",
        turn: 4,
        environment: {
          activeField: {
            id: "field-card-1",
            name: "Vale das Névoas",
            type: "field"
          }
        }
      }
    }],
    state: {
      ...BASE_MOCK_STATE,
      player: {
        ...BASE_MOCK_STATE.player,
        field: []
      },
      opponent: {
        ...BASE_MOCK_STATE.opponent
      },
      currentTurnOwner: "player",
      turn: 4
    }
  })],
  play: playEndTurnSequence
}`,...i.parameters?.docs?.source}}};const ie=["MagicCardEffect"];export{i as MagicCardEffect,ie as __namedExportsOrder,ne as default};
