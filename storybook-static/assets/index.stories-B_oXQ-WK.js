import{j as a}from"./jsx-runtime-u17CrQMm.js";import{M as m}from"./index-aMVW_cU8.js";import{G as l}from"./index-DF4dACa2.js";import{u as r}from"./BattleStore-dKdnP1B8.js";import{r as p}from"./iframe-DBukG52k.js";import{B as u}from"./BattleStore-T2x42JYO.js";import"./sword-ZPukh-T6.js";import"./createLucideIcon-yUaj9tx8.js";import"./ActiveFieldIndicator-DVhZfHVi.js";import"./BattleEventStore-CD-7P6fl.js";import"./middleware-fqqVVZrf.js";import"./loggingUtils-DeIXD9E4.js";import"./BoardGutter-CdfEe-7v.js";import"./BoardSide-C_ZWpl1_.js";import"./FieldZoneMenu-C0iq5ZXx.js";import"./proxy-DCABHE5u.js";import"./FieldZone-C7TQ0a-y.js";import"./HandStore-BptDJQV1.js";import"./index-Cj3AEtG3.js";import"./preload-helper-PPVm8Dsz.js";const d=new m("1","Patrulheiro Gárgula de Gelo","Emmissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados. Sua presença inspira coragem, e o eco de seu grito de gelo ressoa nas muralhas, formando escudos de pedra que refutam qualquer ataque.","images/exemplo_monstro_raro.jpg","attack","ice",2300,2100,7,"LEGENDARIO"),c={card:d,position:"attack",canAttack:!0},_={title:"Game/GameBoard",component:l,parameters:{layout:"fullscreen",backgrounds:{default:"dark"}},decorators:[t=>a.jsx("div",{className:"bg-zinc-950 min-h-screen flex items-center justify-center p-10",children:a.jsx(t,{})})]},s={render:()=>{const t=r(e=>e.initBattle),n=r(e=>e.setEvent);return p.useEffect(()=>{t({player:{field:[]},opponent:{field:[]},turn:1,currentTurnOwner:"player"}),n(u.INITIAL)},[]),a.jsx(l,{})}},o={render:()=>{const t=r(e=>e.initBattle),n=r(e=>e.setEvent);return p.useEffect(()=>{t({player:{field:[c]},opponent:{field:[c]},turn:3,currentTurnOwner:"player"}),n(u.INITIAL)},[]),a.jsx(l,{})}},i={render:()=>{const t=r(e=>e.initBattle),n=r(e=>e.setEvent);return p.useEffect(()=>{t({player:{field:[c]},opponent:{field:[c]},turn:3,currentTurnOwner:"player"}),n(u.SELECTING_TARGET)},[]),a.jsx(l,{})}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => {
    const initBattle = useBattleStore(s => s.initBattle);
    const setEvent = useBattleStore(s => s.setEvent);
    useEffect(() => {
      initBattle({
        player: {
          field: []
        },
        opponent: {
          field: []
        },
        turn: 1,
        currentTurnOwner: "player"
      });
      setEvent(BattleEvent.INITIAL);
    }, []);
    return <GameBoard />;
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => {
    const initBattle = useBattleStore(s => s.initBattle);
    const setEvent = useBattleStore(s => s.setEvent);
    useEffect(() => {
      initBattle({
        player: {
          field: [cardData]
        },
        opponent: {
          field: [cardData]
        },
        turn: 3,
        currentTurnOwner: "player"
      });
      setEvent(BattleEvent.INITIAL);
    }, []);
    return <GameBoard />;
  }
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => {
    const initBattle = useBattleStore(s => s.initBattle);
    const setEvent = useBattleStore(s => s.setEvent);
    useEffect(() => {
      initBattle({
        player: {
          field: [cardData]
        },
        opponent: {
          field: [cardData]
        },
        turn: 3,
        currentTurnOwner: "player"
      });
      setEvent(BattleEvent.SELECTING_TARGET);
    }, []);
    return <GameBoard />;
  }
}`,...i.parameters?.docs?.source}}};const b=["EmptyBoard","PlayerTurn","SelectingAttackTarget"];export{s as EmptyBoard,o as PlayerTurn,i as SelectingAttackTarget,b as __namedExportsOrder,_ as default};
