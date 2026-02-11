import{j as p}from"./jsx-runtime-u17CrQMm.js";import{F as l}from"./FieldZone-Dak23u1l.js";import{m as g}from"./index-CK7_MADk.js";import"./FieldZoneMenu-BQ333NHy.js";import"./iframe-Dxz4Iu-O.js";import"./preload-helper-PPVm8Dsz.js";import"./battleService-ICuohWDs.js";import"./BattleEventStore-BHkVyqAg.js";import"./BattleStore-DJ04qHHZ.js";import"./proxy-BCZisOYc.js";import"./sword-tIX24kzi.js";import"./createLucideIcon-SZYWXtx4.js";import"./BattleStore-xuFNDUoX.js";import"./index-BCBNK8Q-.js";import"./star-CBuiB-me.js";const e=g({id:"1",name:"Patrulheiro Gárgula de Gelo",description:"Emmissão de sombras geladas...",element:"ice"}),D={title:"Game/FieldZone",component:l,decorators:[u=>p.jsx("div",{className:"p-20 bg-slate-950 min-h-[400px] flex items-center justify-center",children:p.jsx(u,{})})],argTypes:{mode:{control:"select",options:["atk","def","face-down"]},onClick:{action:"clicked"}}},r={args:{card:null,isInteractable:!0,index:0}},a={args:{card:null,isInteractable:!1,index:0}},o={args:{card:e,mode:"atk",index:0,isInteractable:!0}},s={args:{card:e,mode:"def",index:0}},n={args:{card:e,mode:"face-down",index:0}},t={args:{card:e,mode:"atk",isSelected:!0,index:0}},c={args:{card:e,mode:"atk",isFocused:!0,index:0}},d={args:{card:null,mode:"atk",isFocused:!0,index:0}},m={args:{card:e,mode:"atk",isOpponent:!0,index:0}},i={args:{card:e,mode:"face-down",isOpponent:!0,index:0}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    card: null,
    isInteractable: true,
    index: 0
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    card: null,
    isInteractable: false,
    index: 0
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    card: mockMonster,
    mode: "atk",
    index: 0,
    isInteractable: true
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    card: mockMonster,
    mode: "def",
    index: 0
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    card: mockMonster,
    mode: "face-down",
    index: 0
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    card: mockMonster,
    mode: "atk",
    isSelected: true,
    index: 0
  }
}`,...t.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    card: mockMonster,
    mode: "atk",
    isFocused: true,
    index: 0
  }
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    card: null,
    mode: "atk",
    isFocused: true,
    index: 0
  }
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    card: mockMonster,
    mode: "atk",
    isOpponent: true,
    index: 0
  }
}`,...m.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    card: mockMonster,
    mode: "face-down",
    isOpponent: true,
    index: 0
  }
}`,...i.parameters?.docs?.source}}};const G=["Empty","EmptyNotInteractable","AttackMode","DefenseMode","FaceDown","Selected","Focused","FocusedWithoutCard","OpponentCard","OpponentCardHide"];export{o as AttackMode,s as DefenseMode,r as Empty,a as EmptyNotInteractable,n as FaceDown,c as Focused,d as FocusedWithoutCard,m as OpponentCard,i as OpponentCardHide,t as Selected,G as __namedExportsOrder,D as default};
