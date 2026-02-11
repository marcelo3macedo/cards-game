import{j as o}from"./jsx-runtime-u17CrQMm.js";import{r as y}from"./iframe-Dxz4Iu-O.js";import{u as g}from"./HandStore-DVrh-NSI.js";import{g as x,A as p}from"./keyUtils-CoVaxQrz.js";import{P as v}from"./index-B8XJgvMj.js";import{u}from"./BattleStore-DJ04qHHZ.js";import{A as h}from"./index-BCBNK8Q-.js";import{m as w}from"./proxy-BCZisOYc.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CK7_MADk.js";import"./sword-tIX24kzi.js";import"./createLucideIcon-SZYWXtx4.js";import"./star-CBuiB-me.js";import"./BattleEventStore-BHkVyqAg.js";import"./BattleStore-xuFNDUoX.js";function S(){const{isVisible:e,setVisible:t,toggleVisible:s}=g();return y.useEffect(()=>{const r=c=>{const m=x(c.key);m===p.Down&&t(!1),m===p.Up&&t(!0)},l=c=>{c.clientY>window.innerHeight-100&&t(!0)};return window.addEventListener("keydown",r),window.addEventListener("mousemove",l),()=>{window.removeEventListener("keydown",r),window.removeEventListener("mousemove",l)}},[t]),{isVisible:e,setVisible:t,toggleVisible:s}}const f=()=>{const{isVisible:e,setVisible:t}=S(),{player:s}=u(),r=()=>{t(!1)};return o.jsx("div",{className:"fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none",children:o.jsx(h,{children:e&&o.jsx(w.div,{initial:{y:300,opacity:0},animate:{y:0,opacity:1},exit:{y:300,opacity:0},transition:{type:"spring",stiffness:260,damping:20},className:"pointer-events-auto pb-8",children:o.jsx(v,{cards:s?.hand,onSelect:()=>r(),isHidden:!1})})})})};f.__docgenInfo={description:"",methods:[],displayName:"PlayerHandContainer"};const K={title:"Game/PlayerHandContainer",component:f,parameters:{layout:"fullscreen"},decorators:[e=>o.jsxs("div",{className:"relative h-screen w-full bg-zinc-950 overflow-hidden",children:[o.jsx("div",{className:"absolute inset-0 flex items-center justify-center text-zinc-800 uppercase tracking-widest text-4xl font-bold opacity-20 select-none",children:"Battle Field"}),o.jsx(e,{})]})]},d=e=>{const t=Array.from({length:e},(s,r)=>({id:`card-${r}`,name:`Monster ${r+1}`,atk:1e3+r*200,def:800,type:"monster",image:"https://images.ygoprodeck.com/images/cards/6983839.jpg"}));u.setState({player:{id:1,name:"teste",graveyard:[],hand:t,field:[],hp:8e3,deckCount:0}})},n={play:()=>{d(5)},args:{onSelectCard:e=>console.log("Card selected:",e)}},a={play:()=>{d(10)}},i={play:()=>{d(0)}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  play: () => {
    setupStore(5);
  },
  args: {
    onSelectCard: card => console.log("Card selected:", card)
  }
}`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  play: () => {
    setupStore(10);
  }
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  play: () => {
    setupStore(0);
  }
}`,...i.parameters?.docs?.source}}};const M=["Default","FullHand","Empty"];export{n as Default,i as Empty,a as FullHand,M as __namedExportsOrder,K as default};
