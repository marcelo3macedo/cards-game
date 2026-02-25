import{j as a}from"./jsx-runtime-u17CrQMm.js";import{M as m}from"./index-DGB_z2we.js";import{G as l}from"./index-CDUGeu_T.js";import{u as r}from"./BattleStore-B3bsQDvF.js";import{r as p}from"./iframe-DlJpJoSd.js";import{B as u}from"./BattleStore-T2x42JYO.js";import"./sword-Ds4lbubG.js";import"./createLucideIcon-BZeSKhbf.js";import"./ActiveFieldIndicator-DVhZfHVi.js";import"./BattleEventStore-DoALTfeG.js";import"./middleware-Cli69yI4.js";import"./loggingUtils-DeIXD9E4.js";import"./BoardGutter-Ca79Fc-W.js";import"./BoardSide-Dxk6nt9c.js";import"./FieldZoneMenu-DcgkamV5.js";import"./proxy-DrU6dVvx.js";import"./FieldZone-CvOmnD7i.js";import"./HandStore-C24rNpTV.js";import"./index-DafWUxtG.js";import"./preload-helper-PPVm8Dsz.js";const d=new m("1","Patrulheiro Gárgula de Gelo","Emmissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados. Sua presença inspira coragem, e o eco de seu grito de gelo ressoa nas muralhas, formando escudos de pedra que refutam qualquer ataque.","images/exemplo_monstro_raro.jpg","attack","ice",2300,2100,7,"LEGENDARIO"),c={card:d,position:"attack",canAttack:!0},_={title:"Game/GameBoard",component:l,parameters:{layout:"fullscreen",backgrounds:{default:"dark"}},decorators:[t=>a.jsx("div",{className:"bg-zinc-950 min-h-screen flex items-center justify-center p-10",children:a.jsx(t,{})})]},s={render:()=>{const t=r(e=>e.initBattle),n=r(e=>e.setEvent);return p.useEffect(()=>{t({player:{field:[]},opponent:{field:[]},turn:1,currentTurnOwner:"player"}),n(u.INITIAL)},[]),a.jsx(l,{})}},o={render:()=>{const t=r(e=>e.initBattle),n=r(e=>e.setEvent);return p.useEffect(()=>{t({player:{field:[c]},opponent:{field:[c]},turn:3,currentTurnOwner:"player"}),n(u.INITIAL)},[]),a.jsx(l,{})}},i={render:()=>{const t=r(e=>e.initBattle),n=r(e=>e.setEvent);return p.useEffect(()=>{t({player:{field:[c]},opponent:{field:[c]},turn:3,currentTurnOwner:"player"}),n(u.SELECTING_TARGET)},[]),a.jsx(l,{})}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
