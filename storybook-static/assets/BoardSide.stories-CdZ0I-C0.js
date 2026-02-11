import{j as a}from"./jsx-runtime-u17CrQMm.js";import{B as o}from"./BoardSide-6b1-hu3K.js";import{u as n}from"./BattleStore-DJ04qHHZ.js";import{r as i}from"./iframe-Dxz4Iu-O.js";import{B as c}from"./BattleStore-xuFNDUoX.js";import{m as B}from"./index-CK7_MADk.js";import"./FieldZone-Dak23u1l.js";import"./FieldZoneMenu-BQ333NHy.js";import"./battleService-ICuohWDs.js";import"./BattleEventStore-BHkVyqAg.js";import"./proxy-BCZisOYc.js";import"./sword-tIX24kzi.js";import"./createLucideIcon-SZYWXtx4.js";import"./index-BCBNK8Q-.js";import"./preload-helper-PPVm8Dsz.js";import"./star-CBuiB-me.js";const v=B({id:27,name:"Íbis Mensageiro Divino",description:"Voo silencioso atravessa os véus do amanhecer, trazendo decretos sagrados dos desígnios celestiais. Suas penas cintilam com escrita etérea, enquanto cada clac de asas ecoa a verdade que transcende as eras, guiando almas perdidas ao caminho da redenção.",imageUrl:"/images/cards/1848_Íbis_Mensageiro_Divino_1770041838597.jpg",mode:"atk",element:"wind",attribute:"monster",stars:1,attackPower:2600,defensePower:2700}),S=B({id:27,name:"Íbis Mensageiro Divino",description:"Voo silencioso atravessa os véus do amanhecer, trazendo decretos sagrados dos desígnios celestiais. Suas penas cintilam com escrita etérea, enquanto cada clac de asas ecoa a verdade que transcende as eras, guiando almas perdidas ao caminho da redenção.",imageUrl:"/images/cards/1848_Íbis_Mensageiro_Divino_1770041838597.jpg",mode:"def",element:"wind",attribute:"monster",stars:1,attackPower:2600,defensePower:2700}),b={title:"Game/BoardSide",component:o,parameters:{layout:"centered"},decorators:[t=>a.jsx("div",{className:"p-20 bg-zinc-950 min-w-[800px] flex justify-center border border-zinc-800",children:a.jsx(t,{})})]},d={render:t=>{const r=n(e=>e.initBattle),s=n(e=>e.setEvent);return i.useEffect(()=>{r({player:{field:[]},opponent:{field:[]},turn:1,currentTurnOwner:"player"}),s(c.INITIAL)},[]),a.jsx(o,{...t,isOpponent:!1})}},p={render:t=>{const r=n(e=>e.initBattle),s=n(e=>e.setEvent);return i.useEffect(()=>{r({player:{field:[]},opponent:{field:[]},turn:1,currentTurnOwner:"player"}),s(c.SELECTING_POSITION)},[]),a.jsx(o,{...t,isOpponent:!1})}},l={render:t=>{const r=n(e=>e.initBattle),s=n(e=>e.setEvent);return i.useEffect(()=>{r({player:{field:[]},opponent:{field:[]},turn:1,currentTurnOwner:"opponent"}),s(c.SELECTING_POSITION)},[]),a.jsx(o,{...t,isOpponent:!0})}},u={render:t=>{const r=n(e=>e.initBattle),s=n(e=>e.setEvent);return i.useEffect(()=>{r({player:{field:[v]},opponent:{field:[]},turn:1,currentTurnOwner:"player"}),s(c.INITIAL)},[]),a.jsx(o,{...t,isOpponent:!1})}},m={render:t=>{const r=n(e=>e.initBattle),s=n(e=>e.setEvent);return i.useEffect(()=>{r({player:{field:[S]},opponent:{field:[]},turn:1,currentTurnOwner:"player"}),s(c.INITIAL)},[]),a.jsx(o,{...t,isOpponent:!1})}},f={render:t=>{const r=n(e=>e.initBattle),s=n(e=>e.setEvent);return i.useEffect(()=>{r({player:{field:[]},opponent:{field:[v]},turn:1,currentTurnOwner:"opponent"}),s(c.INITIAL)},[]),a.jsx(o,{...t,isOpponent:!0})}},E={render:t=>{const r=n(e=>e.initBattle),s=n(e=>e.setEvent);return i.useEffect(()=>{r({player:{field:[]},opponent:{field:[S]},turn:1,currentTurnOwner:"opponent"}),s(c.INITIAL)},[]),a.jsx(o,{...t,isOpponent:!0})}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
      setEvent(BattleEvent.SELECTING_POSITION);
    }, []);
    return <BoardSide {...args} isOpponent={false} />;
  }
}`,...p.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
        currentTurnOwner: "opponent"
      });
      setEvent(BattleEvent.SELECTING_POSITION);
    }, []);
    return <BoardSide {...args} isOpponent={true} />;
  }
}`,...l.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => {
    const initBattle = useBattleStore(s => s.initBattle);
    const setEvent = useBattleStore(s => s.setEvent);
    useEffect(() => {
      initBattle({
        player: {
          field: [mockMonsterInAttackMode]
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
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: args => {
    const initBattle = useBattleStore(s => s.initBattle);
    const setEvent = useBattleStore(s => s.setEvent);
    useEffect(() => {
      initBattle({
        player: {
          field: [mockMonsterInDefenseMode]
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
}`,...m.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: args => {
    const initBattle = useBattleStore(s => s.initBattle);
    const setEvent = useBattleStore(s => s.setEvent);
    useEffect(() => {
      initBattle({
        player: {
          field: []
        },
        opponent: {
          field: [mockMonsterInAttackMode]
        },
        turn: 1,
        currentTurnOwner: "opponent"
      });
      setEvent(BattleEvent.INITIAL);
    }, []);
    return <BoardSide {...args} isOpponent={true} />;
  }
}`,...f.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: args => {
    const initBattle = useBattleStore(s => s.initBattle);
    const setEvent = useBattleStore(s => s.setEvent);
    useEffect(() => {
      initBattle({
        player: {
          field: []
        },
        opponent: {
          field: [mockMonsterInDefenseMode]
        },
        turn: 1,
        currentTurnOwner: "opponent"
      });
      setEvent(BattleEvent.INITIAL);
    }, []);
    return <BoardSide {...args} isOpponent={true} />;
  }
}`,...E.parameters?.docs?.source}}};const C=["EventInitial","EventCardSelected","OpponentOnCardSelected","PlayerSideAttackMode","PlayerSideDefenseMode","OpponentSideAttackMode","OpponentSideDefenseMode"];export{p as EventCardSelected,d as EventInitial,l as OpponentOnCardSelected,f as OpponentSideAttackMode,E as OpponentSideDefenseMode,u as PlayerSideAttackMode,m as PlayerSideDefenseMode,C as __namedExportsOrder,b as default};
