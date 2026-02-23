import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as d}from"./iframe-Dm5SVBJu.js";import{B as r}from"./BattleAnimation-CknWflHG.js";import{u as m}from"./BattleEventStore-BfrLx-A1.js";import{M as n}from"./index-mHFlCYGw.js";import"./preload-helper-PPVm8Dsz.js";import"./BattleAnimationOverlay-hnDmvNzA.js";import"./proxy-CgdA6mOl.js";import"./index-BcUiJg1X.js";import"./middleware-BNMqIGpK.js";import"./sword-B4t4mRyy.js";import"./createLucideIcon-CUMascdk.js";import"./imageUtils-CZ9VB9H-.js";const A={title:"Game/BattleAnimation",component:r,parameters:{layout:"fullscreen"}},o=new n("1","Patrulheiro Gárgula de Gelo","Emmissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados. Sua presença inspira coragem, e o eco de seu grito de gelo ressoa nas muralhas, formando escudos de pedra que refutam qualquer ataque.","images/exemplo_monstro_raro.jpg","attack","ice",2500,2100,7,"LEGENDARIO"),c=new n("1","Patrulheiro Gárgula de Gelo","Emmissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados. Sua presença inspira coragem, e o eco de seu grito de gelo ressoa nas muralhas, formando escudos de pedra que refutam qualquer ataque.","images/exemplo_monstro_raro.jpg","attack","ice",2300,2100,7,"LEGENDARIO"),a={render:()=>{const{setBattleData:t,battleData:i,clearBattleData:l}=m();return d.useEffect(()=>{t({attacker:o,defender:c});const s=setTimeout(()=>{t({attacker:o,defender:null}),console.log("⚡ Alteração dupla aplicada!")},5e3);return()=>{clearTimeout(s),l()}},[]),e.jsxs("div",{style:{width:"100vw",height:"100vh",background:"#1a1a1a"},children:[e.jsx(r,{}),!i&&e.jsxs("div",{style:{color:"white",padding:"20px"},children:[e.jsx("p",{children:"Animação finalizada: battleData foi limpo pelo onAnimationEnd."}),e.jsx("button",{onClick:()=>window.location.reload(),children:"Reiniciar Story"})]})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    const {
      setBattleData,
      battleData,
      clearBattleData
    } = useBattleEventStore();
    useEffect(() => {
      setBattleData({
        attacker: better,
        defender: lower
      });
      const timer = setTimeout(() => {
        setBattleData({
          attacker: better,
          defender: null
        });
        console.log("⚡ Alteração dupla aplicada!");
      }, 5000);
      return () => {
        clearTimeout(timer);
        clearBattleData();
      };
    }, []);
    return <div style={{
      width: "100vw",
      height: "100vh",
      background: "#1a1a1a"
    }}>
        <BattleAnimation />

        {!battleData && <div style={{
        color: "white",
        padding: "20px"
      }}>
            <p>Animação finalizada: battleData foi limpo pelo onAnimationEnd.</p>
            <button onClick={() => window.location.reload()}>Reiniciar Story</button>
          </div>}
      </div>;
  }
}`,...a.parameters?.docs?.source}}};const k=["BattleCycle"];export{a as BattleCycle,k as __namedExportsOrder,A as default};
