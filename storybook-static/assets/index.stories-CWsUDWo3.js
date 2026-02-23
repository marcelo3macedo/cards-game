import{j as a}from"./jsx-runtime-u17CrQMm.js";import{M as m}from"./index-mHFlCYGw.js";import{G as l}from"./index-DBjhgHY_.js";import{u as r}from"./BattleStore-Dt-_ZxQZ.js";import{r as p}from"./iframe-Dm5SVBJu.js";import{B as u}from"./BattleStore-T2x42JYO.js";import"./sword-B4t4mRyy.js";import"./createLucideIcon-CUMascdk.js";import"./imageUtils-CZ9VB9H-.js";import"./ActiveFieldIndicator-DVhZfHVi.js";import"./BattleEventStore-BfrLx-A1.js";import"./middleware-BNMqIGpK.js";import"./loggingUtils-DeIXD9E4.js";import"./BoardGutter-gOAFBqKo.js";import"./BoardSide-D1NUWhyX.js";import"./FieldZoneMenu-BkOcw8G7.js";import"./proxy-CgdA6mOl.js";import"./FieldZone-ClpNw_-w.js";import"./HandStore-Bpl3shuK.js";import"./index-BcUiJg1X.js";import"./preload-helper-PPVm8Dsz.js";const d=new m("1","Patrulheiro Gárgula de Gelo","Emmissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados. Sua presença inspira coragem, e o eco de seu grito de gelo ressoa nas muralhas, formando escudos de pedra que refutam qualquer ataque.","images/exemplo_monstro_raro.jpg","attack","ice",2300,2100,7,"LEGENDARIO"),c={card:d,position:"attack",canAttack:!0},b={title:"Game/GameBoard",component:l,parameters:{layout:"fullscreen",backgrounds:{default:"dark"}},decorators:[t=>a.jsx("div",{className:"bg-zinc-950 min-h-screen flex items-center justify-center p-10",children:a.jsx(t,{})})]},s={render:()=>{const t=r(e=>e.initBattle),n=r(e=>e.setEvent);return p.useEffect(()=>{t({player:{field:[]},opponent:{field:[]},turn:1,currentTurnOwner:"player"}),n(u.INITIAL)},[]),a.jsx(l,{})}},o={render:()=>{const t=r(e=>e.initBattle),n=r(e=>e.setEvent);return p.useEffect(()=>{t({player:{field:[c]},opponent:{field:[c]},turn:3,currentTurnOwner:"player"}),n(u.INITIAL)},[]),a.jsx(l,{})}},i={render:()=>{const t=r(e=>e.initBattle),n=r(e=>e.setEvent);return p.useEffect(()=>{t({player:{field:[c]},opponent:{field:[c]},turn:3,currentTurnOwner:"player"}),n(u.SELECTING_TARGET)},[]),a.jsx(l,{})}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};const h=["EmptyBoard","PlayerTurn","SelectingAttackTarget"];export{s as EmptyBoard,o as PlayerTurn,i as SelectingAttackTarget,h as __namedExportsOrder,b as default};
