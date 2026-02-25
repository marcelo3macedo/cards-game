import{j as f}from"./jsx-runtime-u17CrQMm.js";import{F as D}from"./FieldZone-C7TQ0a-y.js";import{M as F}from"./index-aMVW_cU8.js";import"./FieldZoneMenu-C0iq5ZXx.js";import"./iframe-DBukG52k.js";import"./preload-helper-PPVm8Dsz.js";import"./BattleStore-T2x42JYO.js";import"./loggingUtils-DeIXD9E4.js";import"./BattleEventStore-CD-7P6fl.js";import"./middleware-fqqVVZrf.js";import"./BattleStore-dKdnP1B8.js";import"./proxy-DCABHE5u.js";import"./sword-ZPukh-T6.js";import"./createLucideIcon-yUaj9tx8.js";import"./HandStore-BptDJQV1.js";import"./index-Cj3AEtG3.js";const p=new F("1","Patrulheiro Gárgula de Gelo","Emmissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados. Sua presença inspira coragem, e o eco de seu grito de gelo ressoa nas muralhas, formando escudos de pedra que refutam qualquer ataque.","images/exemplo_monstro_raro.jpg","attack","ice",2300,2100,7,"LEGENDARIO"),u={card:p,position:"attack"},S={card:p,position:"defense"},m={card:p,position:"face-down-attack"},x={card:p,position:"face-down-defense"},A={title:"Game/FieldZone",component:D,decorators:[g=>f.jsx("div",{className:"p-20 bg-slate-950 min-h-[400px] flex items-center justify-center",children:f.jsx(g,{})})],argTypes:{mode:{control:"select",options:["atk","def","face-down"]},onClick:{action:"clicked"}}},e={args:{cardData:null,isInteractable:!0,isSelected:!1,isFocused:!1,isOpponent:!1,isMonster:!1,index:0}},s={args:{cardData:null,isInteractable:!0,isSelected:!1,isFocused:!1,isOpponent:!1,isMonster:!1,index:0}},a={args:{cardData:u,isInteractable:!0,isSelected:!1,isFocused:!1,isOpponent:!1,isMonster:!1,index:0}},r={args:{cardData:S,isInteractable:!0,isSelected:!1,isFocused:!1,isOpponent:!1,isMonster:!1,index:0}},n={args:{cardData:m,isInteractable:!0,isSelected:!1,isFocused:!1,isOpponent:!1,isMonster:!1,index:0}},t={args:{cardData:x,isInteractable:!0,isSelected:!1,isFocused:!1,isOpponent:!1,isMonster:!1,index:0}},o={args:{cardData:u,isInteractable:!0,isSelected:!0,isFocused:!1,isOpponent:!1,isMonster:!1,index:0}},c={args:{cardData:u,isInteractable:!0,isSelected:!1,isFocused:!0,isOpponent:!1,isMonster:!1,index:0}},i={args:{cardData:null,isInteractable:!0,isSelected:!1,isFocused:!0,isOpponent:!1,isMonster:!1,index:0}},d={args:{cardData:u,isInteractable:!0,isSelected:!1,isFocused:!0,isOpponent:!0,isMonster:!0,index:0}},l={args:{cardData:m,isInteractable:!0,isSelected:!1,isFocused:!1,isOpponent:!0,isMonster:!1,index:0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    cardData: null,
    isInteractable: true,
    isSelected: false,
    isFocused: false,
    isOpponent: false,
    isMonster: false,
    index: 0
  }
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    cardData: null,
    isInteractable: true,
    isSelected: false,
    isFocused: false,
    isOpponent: false,
    isMonster: false,
    index: 0
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    cardData,
    isInteractable: true,
    isSelected: false,
    isFocused: false,
    isOpponent: false,
    isMonster: false,
    index: 0
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    cardData: cardDefenseData,
    isInteractable: true,
    isSelected: false,
    isFocused: false,
    isOpponent: false,
    isMonster: false,
    index: 0
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    cardData: cardFaceDownData,
    isInteractable: true,
    isSelected: false,
    isFocused: false,
    isOpponent: false,
    isMonster: false,
    index: 0
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    cardData: cardFaceDownDefenseData,
    isInteractable: true,
    isSelected: false,
    isFocused: false,
    isOpponent: false,
    isMonster: false,
    index: 0
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    cardData,
    isInteractable: true,
    isSelected: true,
    isFocused: false,
    isOpponent: false,
    isMonster: false,
    index: 0
  }
}`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    cardData,
    isInteractable: true,
    isSelected: false,
    isFocused: true,
    isOpponent: false,
    isMonster: false,
    index: 0
  }
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    cardData: null,
    isInteractable: true,
    isSelected: false,
    isFocused: true,
    isOpponent: false,
    isMonster: false,
    index: 0
  }
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    cardData,
    isInteractable: true,
    isSelected: false,
    isFocused: true,
    isOpponent: true,
    isMonster: true,
    index: 0
  }
}`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    cardData: cardFaceDownData,
    isInteractable: true,
    isSelected: false,
    isFocused: false,
    isOpponent: true,
    isMonster: false,
    index: 0
  }
}`,...l.parameters?.docs?.source}}};const H=["Empty","EmptyNotInteractable","AttackMode","DefenseMode","FaceDown","FaceDownDefense","Selected","Focused","FocusedWithoutCard","OpponentCard","OpponentCardHide"];export{a as AttackMode,r as DefenseMode,e as Empty,s as EmptyNotInteractable,n as FaceDown,t as FaceDownDefense,c as Focused,i as FocusedWithoutCard,d as OpponentCard,l as OpponentCardHide,o as Selected,H as __namedExportsOrder,A as default};
