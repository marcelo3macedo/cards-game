import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as d}from"./iframe-CD7bA76q.js";import{B as r}from"./BattleAnimation-qd2FLVp_.js";import{u as c}from"./BattleEventStore-ByTNv7X1.js";import{M as n}from"./index-uqY1PiBg.js";import"./preload-helper-PPVm8Dsz.js";import"./BattleAnimationOverlay-DVae-v6O.js";import"./proxy-BDPQ_Hmg.js";import"./index-DotQKZGK.js";import"./middleware-DUDzcTzn.js";import"./sword-BW0TyRi5.js";import"./createLucideIcon-DSd_fdSH.js";const q={title:"Game/BattleAnimation",component:r,parameters:{layout:"fullscreen"}},o=new n("1","Patrulheiro Gárgula de Gelo","Emmissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados. Sua presença inspira coragem, e o eco de seu grito de gelo ressoa nas muralhas, formando escudos de pedra que refutam qualquer ataque.","images/exemplo_monstro_raro.jpg","attack","ice",2500,2100,7,"LEGENDARIO"),m=new n("1","Patrulheiro Gárgula de Gelo","Emmissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados. Sua presença inspira coragem, e o eco de seu grito de gelo ressoa nas muralhas, formando escudos de pedra que refutam qualquer ataque.","images/exemplo_monstro_raro.jpg","attack","ice",2300,2100,7,"LEGENDARIO"),a={render:()=>{const{setBattleData:t,battleData:i,clearBattleData:l}=c();return d.useEffect(()=>{t({attacker:o,defender:m});const s=setTimeout(()=>{t({attacker:o,defender:null}),console.log("⚡ Alteração dupla aplicada!")},5e3);return()=>{clearTimeout(s),l()}},[]),e.jsxs("div",{style:{width:"100vw",height:"100vh",background:"#1a1a1a"},children:[e.jsx(r,{}),!i&&e.jsxs("div",{style:{color:"white",padding:"20px"},children:[e.jsx("p",{children:"Animação finalizada: battleData foi limpo pelo onAnimationEnd."}),e.jsx("button",{onClick:()=>window.location.reload(),children:"Reiniciar Story"})]})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};const A=["BattleCycle"];export{a as BattleCycle,A as __namedExportsOrder,q as default};
