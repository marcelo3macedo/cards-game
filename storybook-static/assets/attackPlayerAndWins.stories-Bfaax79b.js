import{j as p}from"./jsx-runtime-u17CrQMm.js";import{r as c}from"./iframe-CD7bA76q.js";import{u as i}from"./BattleStore-ACFz61IO.js";import{u as T}from"./HandStore-DbUarlEx.js";import{u as S}from"./NavigationStore-2ELGCCum.js";import{B as _}from"./BattleStore-T2x42JYO.js";import{b as d}from"./loggingUtils-DeIXD9E4.js";import{B as M,s as o}from"./mockBattle-Bv8Wz_6u.js";import"./preload-helper-PPVm8Dsz.js";import"./middleware-DUDzcTzn.js";import"./keyUtils-D7xRxCLK.js";import"./index-JPVsj-18.js";import"./index-uqY1PiBg.js";import"./sword-BW0TyRi5.js";import"./createLucideIcon-DSd_fdSH.js";import"./BattleEventStore-ByTNv7X1.js";import"./index-DotQKZGK.js";import"./proxy-BDPQ_Hmg.js";import"./AbandonBattleModal-Bl_S5T87.js";import"./index-Bf8h-nmA.js";import"./opponent-DQWsul6B.js";import"./index-C23FsJDt.js";import"./FieldZone-BObv1E7n.js";import"./FieldZoneMenu-rkshEd8Y.js";import"./index-DEWakLrC.js";import"./ActiveFieldIndicator-DVhZfHVi.js";import"./BoardGutter-DlKMyWl7.js";import"./BoardSide-DuvSfawh.js";import"./BattleAnimation-qd2FLVp_.js";import"./BattleAnimationOverlay-DVae-v6O.js";const P=e=>new Promise(r=>setTimeout(r,e)),u={id:99,name:"Carta Comprada",description:"Efeito de compra de turno.",imageUrl:"images/exemplo_monstro_raro.jpg",type:"Guerreiro",element:"light",attribute:"monster",stars:4,attackPower:2e3,defensePower:1e3,modifiers:[]},l={player:{id:1,name:"marcelo",hp:8e3,hand:[],field:[{card:{id:24,name:"Íbis Mensageiro Vanguarda",description:"Monstro de suporte.",imageUrl:"images/exemplo_monstro_raro.jpg",type:"Íbis de Thoth",element:"wind",attribute:"monster",stars:1,attackPower:1200,defensePower:1900,modifiers:[],effectScript:null,effectValue:null},position:"attack",canAttack:!0}],spells:[],graveyard:[],canSummon:!1,deckCount:30},opponent:{id:5,name:"Darius Blackflare",hp:8e3,field:[],spells:[],graveyard:[],handCount:5,deckCount:35},turn:1,currentTurnOwner:"player"},A=async({canvas:e,userEvent:r})=>{const s=await e.findByTestId("button-endturn");await r.click(s)},B=(e,r)=>s=>{const m=i(t=>t.initBattle),f=i(t=>t.clearBattle),g=i(t=>t.setEvent),{setVisible:y,setIsHidden:h}=T.getState(),[k,w]=c.useState(!0);return c.useEffect(()=>{S.getState().navigateTo("BATTLE"),f();const t=o.startMockBattle,b=d.endTurn;return o.startMockBattle=async a=>({success:!0,battleState:a}),d.endTurn=async()=>(console.log("🔄 [Mock] Finalizando turno do jogador..."),await P(800),r||{success:!0,actions:[{type:"phaseChange",phase:"OPPONENT_TURN"},{type:"phaseChange",phase:"PLAYER_DRAW_PHASE"},{type:"draw",card:u}],state:{...e,player:{...e.player,hand:[u],deckCount:e.player.deckCount-1,canSummon:!0},turn:e.turn+1,currentTurnOwner:"player"}}),(async()=>{try{const a=await o.startMockBattle(e);m(a.battleState),g(_.INITIAL),y(!0),h(!0),w(!1)}catch(a){console.error("Erro no bootstrap:",a)}})(),()=>{o.startMockBattle=t,d.endTurn=b}},[e,r]),k?p.jsx("div",{style:{color:"#fff",padding:"20px"},children:"Iniciando Duelo..."}):p.jsx(s,{})},ne={title:"Battle/VillainActions",component:M,parameters:{layout:"fullscreen"}},n={decorators:[B(l,{actions:[{type:"handCountUpdated",handCount:3},{type:"summon",data:{card:{id:24,name:"Íbis Mensageiro Vanguarda",description:"Monstro de suporte.",imageUrl:"images/exemplo_monstro_raro.jpg",type:"Íbis de Thoth",element:"wind",attribute:"monster",stars:1,attackPower:1900,defensePower:1900,modifiers:[],effectScript:null,effectValue:null},position:"attack",canAttack:!0,index:0},handCount:2},{type:"attack",data:{attacker:{id:24,name:"Íbis Mensageiro Vanguarda",description:"Monstro de suporte.",imageUrl:"images/exemplo_monstro_raro.jpg",type:"Íbis de Thoth",element:"wind",attribute:"monster",stars:1,attackPower:1900,defensePower:1900,modifiers:[],effectScript:null,effectValue:null},target:{id:24,name:"Íbis Mensageiro Vanguarda",description:"Monstro de suporte.",imageUrl:"images/exemplo_monstro_raro.jpg",type:"Íbis de Thoth",element:"wind",attribute:"monster",stars:1,attackPower:1200,defensePower:1900,modifiers:[],effectScript:null,effectValue:null}}}],state:{...l,player:{...l.player,hp:7300,field:[]},opponent:{id:5,name:"Darius Blackflare",hp:8e3,field:[{card:{id:24,name:"Íbis Mensageiro Vanguarda",description:"Monstro de suporte.",imageUrl:"images/exemplo_monstro_raro.jpg",type:"Íbis de Thoth",element:"wind",attribute:"monster",stars:1,attackPower:1900,defensePower:1900,modifiers:[],effectScript:null,effectValue:null},position:"attack",canAttack:!0}],spells:[],graveyard:[],handCount:2,deckCount:40},currentTurnOwner:"player",turn:4}})],play:A};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
