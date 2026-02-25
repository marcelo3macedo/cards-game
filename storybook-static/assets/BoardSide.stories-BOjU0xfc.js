import{j as a}from"./jsx-runtime-u17CrQMm.js";import{B as o}from"./BoardSide-C_ZWpl1_.js";import{u as n}from"./BattleStore-dKdnP1B8.js";import{r as i}from"./iframe-DBukG52k.js";import{B as l}from"./BattleStore-T2x42JYO.js";import{u as v}from"./BattleEventStore-CD-7P6fl.js";import{M as S}from"./index-aMVW_cU8.js";import"./FieldZoneMenu-C0iq5ZXx.js";import"./loggingUtils-DeIXD9E4.js";import"./proxy-DCABHE5u.js";import"./sword-ZPukh-T6.js";import"./createLucideIcon-yUaj9tx8.js";import"./FieldZone-C7TQ0a-y.js";import"./HandStore-BptDJQV1.js";import"./middleware-fqqVVZrf.js";import"./index-Cj3AEtG3.js";import"./preload-helper-PPVm8Dsz.js";const I=new S("1","Patrulheiro Gárgula de Gelo","Emmissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados. Sua presença inspira coragem, e o eco de seu grito de gelo ressoa nas muralhas, formando escudos de pedra que refutam qualquer ataque.","images/exemplo_monstro_raro.jpg","attack","ice",2300,2100,7,"LEGENDARIO"),f={card:I,position:"attack"},M={title:"Game/BoardSide",component:o,parameters:{layout:"centered"},decorators:[t=>a.jsx("div",{className:"p-20 bg-zinc-950 min-w-[800px] flex justify-center border border-zinc-800",children:a.jsx(t,{})})]},p={render:t=>{const r=n(e=>e.initBattle),s=n(e=>e.setEvent);return i.useEffect(()=>{r({player:{field:[]},opponent:{field:[]},turn:1,currentTurnOwner:"player"}),s(l.INITIAL)},[]),a.jsx(o,{...t,isOpponent:!1})}},c={render:t=>{const r=n(e=>e.initBattle),s=n(e=>e.setEvent);return i.useEffect(()=>{r({player:{field:[]},opponent:{field:[]},turn:1,currentTurnOwner:"player"}),s(l.INITIAL)},[]),a.jsx(o,{...t,isOpponent:!0})}},d={render:t=>{const r=n(m=>m.initBattle),s=n(m=>m.setEvent),{setSelectedFieldIndex:e,setSelectedFieldArea:B}=v();return i.useEffect(()=>{r({player:{field:[]},opponent:{field:[]},turn:1,currentTurnOwner:"player"}),s(l.SELECTING_POSITION),e(0),B("MONSTER")},[]),a.jsx(o,{...t,isOpponent:!1})}},u={render:t=>{const r=n(e=>e.initBattle),s=n(e=>e.setEvent);return i.useEffect(()=>{r({player:{field:[f]},opponent:{field:[]},turn:1,currentTurnOwner:"player"}),s(l.INITIAL)},[]),a.jsx(o,{...t,isOpponent:!1})}},E={render:t=>{const r=n(e=>e.initBattle),s=n(e=>e.setEvent);return i.useEffect(()=>{r({player:{field:[]},opponent:{field:[f]},turn:1,currentTurnOwner:"player"}),s(l.SELECTING_TARGET)},[]),a.jsx(o,{...t,isOpponent:!0})}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: args => {
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
    return <BoardSide {...args} isOpponent={false} />;
  }
}`,...p.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => {
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
    return <BoardSide {...args} isOpponent={true} />;
  }
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => {
    const initBattle = useBattleStore(s => s.initBattle);
    const setEvent = useBattleStore(s => s.setEvent);
    const {
      setSelectedFieldIndex,
      setSelectedFieldArea
    } = useBattleEventStore();
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
      setEvent(BattleEvent.SELECTING_POSITION);
      setSelectedFieldIndex(0);
      setSelectedFieldArea("MONSTER");
    }, []);
    return <BoardSide {...args} isOpponent={false} />;
  }
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => {
    const initBattle = useBattleStore(s => s.initBattle);
    const setEvent = useBattleStore(s => s.setEvent);
    useEffect(() => {
      initBattle({
        player: {
          field: [cardData]
        },
        opponent: {
          field: []
        },
        turn: 1,
        currentTurnOwner: "player"
      });
      setEvent(BattleEvent.INITIAL);
    }, []);
    return <BoardSide {...args} isOpponent={false} />;
  }
}`,...u.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: args => {
    const initBattle = useBattleStore(s => s.initBattle);
    const setEvent = useBattleStore(s => s.setEvent);
    useEffect(() => {
      initBattle({
        player: {
          field: []
        },
        opponent: {
          field: [cardData]
        },
        turn: 1,
        currentTurnOwner: "player"
      });
      setEvent(BattleEvent.SELECTING_TARGET);
    }, []);
    return <BoardSide {...args} isOpponent={true} />;
  }
}`,...E.parameters?.docs?.source}}};const P=["EventInitial","EventInitialOpponent","EventCardSelectPosition","EventCardOnField","EventSelectTarget"];export{u as EventCardOnField,d as EventCardSelectPosition,p as EventInitial,c as EventInitialOpponent,E as EventSelectTarget,P as __namedExportsOrder,M as default};
