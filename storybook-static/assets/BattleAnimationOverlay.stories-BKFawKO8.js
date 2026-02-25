import{B as d}from"./BattleAnimationOverlay-CpaBt-w8.js";import{M as t}from"./index-DGB_z2we.js";import"./jsx-runtime-u17CrQMm.js";import"./iframe-DlJpJoSd.js";import"./preload-helper-PPVm8Dsz.js";import"./proxy-DrU6dVvx.js";import"./index-DafWUxtG.js";import"./sword-Ds4lbubG.js";import"./createLucideIcon-BZeSKhbf.js";const q={title:"Game/BattleAnimationOverlay",component:d,parameters:{layout:"fullscreen"}},i=new t("1","Patrulheiro Gárgula de Gelo","Emmissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados. Sua presença inspira coragem, e o eco de seu grito de gelo ressoa nas muralhas, formando escudos de pedra que refutam qualquer ataque.","images/exemplo_monstro_raro.jpg","attack","ice",2500,2100,7,"LEGENDARIO"),r=new t("1","Patrulheiro Gárgula de Gelo","Emmissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados. Sua presença inspira coragem, e o eco de seu grito de gelo ressoa nas muralhas, formando escudos de pedra que refutam qualquer ataque.","images/exemplo_monstro_raro.jpg","attack","ice",2300,2100,7,"LEGENDARIO"),a={args:{attacker:i,defender:r,onAnimationEnd:e=>console.log("Resultado:",e)}},o={args:{attacker:r,defender:r,onAnimationEnd:e=>console.log("Resultado:",e)}},s={args:{attacker:r,defender:i,onAnimationEnd:e=>console.log("Resultado:",e)}},n={args:{attacker:r,defender:void 0,onAnimationEnd:e=>console.log("Resultado:",e)}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    attacker: better,
    defender: lower,
    onAnimationEnd: res => console.log("Resultado:", res)
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    attacker: lower,
    defender: lower,
    onAnimationEnd: res => console.log("Resultado:", res)
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    attacker: lower,
    defender: better,
    onAnimationEnd: res => console.log("Resultado:", res)
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    attacker: lower,
    defender: undefined,
    onAnimationEnd: res => console.log("Resultado:", res)
  }
}`,...n.parameters?.docs?.source}}};const A=["StrikerWins","Draw","StrikerLoses","DirectHit"];export{n as DirectHit,o as Draw,s as StrikerLoses,a as StrikerWins,A as __namedExportsOrder,q as default};
