import{j as p}from"./jsx-runtime-u17CrQMm.js";import{r as c}from"./iframe-DBukG52k.js";import{u as i}from"./BattleStore-dKdnP1B8.js";import{u as T}from"./HandStore-BptDJQV1.js";import{u as S}from"./NavigationStore-DBBjTAGW.js";import{B as _}from"./BattleStore-T2x42JYO.js";import{b as d}from"./loggingUtils-DeIXD9E4.js";import{B as M,s as o}from"./mockBattle-CYjJGTfH.js";import"./preload-helper-PPVm8Dsz.js";import"./middleware-fqqVVZrf.js";import"./keyUtils-D7xRxCLK.js";import"./index-Bb5ro92g.js";import"./index-aMVW_cU8.js";import"./sword-ZPukh-T6.js";import"./createLucideIcon-yUaj9tx8.js";import"./BattleEventStore-CD-7P6fl.js";import"./index-Cj3AEtG3.js";import"./proxy-DCABHE5u.js";import"./AbandonBattleModal-B9PmODzs.js";import"./index-EtGsicMB.js";import"./opponent-BJmpHAuR.js";import"./index-WfwvYLNt.js";import"./FieldZone-C7TQ0a-y.js";import"./FieldZoneMenu-C0iq5ZXx.js";import"./index-DF4dACa2.js";import"./ActiveFieldIndicator-DVhZfHVi.js";import"./BoardGutter-CdfEe-7v.js";import"./BoardSide-C_ZWpl1_.js";import"./BattleAnimation-YhyJU8iz.js";import"./BattleAnimationOverlay--uRsKr2s.js";const P=e=>new Promise(r=>setTimeout(r,e)),u={id:99,name:"Carta Comprada",description:"Efeito de compra de turno.",imageUrl:"images/exemplo_monstro_raro.jpg",type:"Guerreiro",element:"light",attribute:"monster",stars:4,attackPower:2e3,defensePower:1e3,modifiers:[]},l={player:{id:1,name:"marcelo",hp:8e3,hand:[],field:[{card:{id:24,name:"Íbis Mensageiro Vanguarda",description:"Monstro de suporte.",imageUrl:"images/exemplo_monstro_raro.jpg",type:"Íbis de Thoth",element:"wind",attribute:"monster",stars:1,attackPower:1200,defensePower:1900,modifiers:[],effectScript:null,effectValue:null},position:"attack",canAttack:!0}],spells:[],graveyard:[],canSummon:!1,deckCount:30},opponent:{id:5,name:"Darius Blackflare",hp:8e3,field:[],spells:[],graveyard:[],handCount:5,deckCount:35},turn:1,currentTurnOwner:"player"},A=async({canvas:e,userEvent:r})=>{const s=await e.findByTestId("button-endturn");await r.click(s)},B=(e,r)=>s=>{const m=i(t=>t.initBattle),f=i(t=>t.clearBattle),g=i(t=>t.setEvent),{setVisible:y,setIsHidden:h}=T.getState(),[k,w]=c.useState(!0);return c.useEffect(()=>{S.getState().navigateTo("BATTLE"),f();const t=o.startMockBattle,b=d.endTurn;return o.startMockBattle=async a=>({success:!0,battleState:a}),d.endTurn=async()=>(console.log("🔄 [Mock] Finalizando turno do jogador..."),await P(800),r||{success:!0,actions:[{type:"phaseChange",phase:"OPPONENT_TURN"},{type:"phaseChange",phase:"PLAYER_DRAW_PHASE"},{type:"draw",card:u}],state:{...e,player:{...e.player,hand:[u],deckCount:e.player.deckCount-1,canSummon:!0},turn:e.turn+1,currentTurnOwner:"player"}}),(async()=>{try{const a=await o.startMockBattle(e);m(a.battleState),g(_.INITIAL),y(!0),h(!0),w(!1)}catch(a){console.error("Erro no bootstrap:",a)}})(),()=>{o.startMockBattle=t,d.endTurn=b}},[e,r]),k?p.jsx("div",{style:{color:"#fff",padding:"20px"},children:"Iniciando Duelo..."}):p.jsx(s,{})},ne={title:"Battle/VillainActions",component:M,parameters:{layout:"fullscreen"}},n={decorators:[B(l,{actions:[{type:"handCountUpdated",handCount:3},{type:"summon",data:{card:{id:24,name:"Íbis Mensageiro Vanguarda",description:"Monstro de suporte.",imageUrl:"images/exemplo_monstro_raro.jpg",type:"Íbis de Thoth",element:"wind",attribute:"monster",stars:1,attackPower:1900,defensePower:1900,modifiers:[],effectScript:null,effectValue:null},position:"attack",canAttack:!0,index:0},handCount:2},{type:"attack",data:{attacker:{id:24,name:"Íbis Mensageiro Vanguarda",description:"Monstro de suporte.",imageUrl:"images/exemplo_monstro_raro.jpg",type:"Íbis de Thoth",element:"wind",attribute:"monster",stars:1,attackPower:1900,defensePower:1900,modifiers:[],effectScript:null,effectValue:null},target:{id:24,name:"Íbis Mensageiro Vanguarda",description:"Monstro de suporte.",imageUrl:"images/exemplo_monstro_raro.jpg",type:"Íbis de Thoth",element:"wind",attribute:"monster",stars:1,attackPower:1200,defensePower:1900,modifiers:[],effectScript:null,effectValue:null}}}],state:{...l,player:{...l.player,hp:7300,field:[]},opponent:{id:5,name:"Darius Blackflare",hp:8e3,field:[{card:{id:24,name:"Íbis Mensageiro Vanguarda",description:"Monstro de suporte.",imageUrl:"images/exemplo_monstro_raro.jpg",type:"Íbis de Thoth",element:"wind",attribute:"monster",stars:1,attackPower:1900,defensePower:1900,modifiers:[],effectScript:null,effectValue:null},position:"attack",canAttack:!0}],spells:[],graveyard:[],handCount:2,deckCount:40},currentTurnOwner:"player",turn:4}})],play:A};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  decorators: [withTurnMock(BASE_MOCK_STATE, {
    actions: [{
      type: 'handCountUpdated',
      handCount: 3
    }, {
      type: 'summon',
      data: {
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
        canAttack: true,
        index: 0
      },
      handCount: 2
    }, {
      type: 'attack',
      data: {
        attacker: {
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
        target: {
          id: 24,
          name: "Íbis Mensageiro Vanguarda",
          description: "Monstro de suporte.",
          imageUrl: "images/exemplo_monstro_raro.jpg",
          type: "Íbis de Thoth",
          element: "wind",
          attribute: "monster",
          stars: 1,
          attackPower: 1200,
          defensePower: 1900,
          modifiers: [],
          effectScript: null,
          effectValue: null
        }
      }
    }],
    state: {
      ...BASE_MOCK_STATE,
      player: {
        ...BASE_MOCK_STATE.player,
        hp: 7300,
        field: []
      },
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
      turn: 4
    }
  })],
  play: playEndTurnSequence
}`,...n.parameters?.docs?.source}}};const se=["AttackPlayerInAttackModeAndWins"];export{n as AttackPlayerInAttackModeAndWins,se as __namedExportsOrder,ne as default};
