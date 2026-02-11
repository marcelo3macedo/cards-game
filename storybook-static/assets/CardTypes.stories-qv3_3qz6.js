import{E as c,a as u,M as i,T as p,b as l,C as g}from"./index-CK7_MADk.js";import{e as q}from"./exemplo_legendaria-DxHYjB_J.js";import{e as m}from"./exemplo_comum-Kgn1VGfG.js";import"./jsx-runtime-u17CrQMm.js";import"./iframe-Dxz4Iu-O.js";import"./preload-helper-PPVm8Dsz.js";import"./sword-tIX24kzi.js";import"./createLucideIcon-SZYWXtx4.js";import"./star-CBuiB-me.js";const d=""+new URL("exemplo_magica-wsZbUOK7.jpg",import.meta.url).href,G={title:"Game/Card/Types",component:g},a={args:{card:new i("1","Patrulheiro Gárgula de Gelo","Emmissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados. Sua presença inspira coragem, e o eco de seu grito de gelo ressoa nas muralhas, formando escudos de pedra que refutam qualquer ataque.",q,"ice",2500,2100,7,"LEGENDARIO")}},e={args:{card:new i("2","Guarda de Pedra","Um soldado incansável esculpido nas montanhas antigas. Sua lealdade é tão imutável quanto a rocha de que é feito, servindo como a primeira linha de defesa contra hordas invasoras.",m,"earth",1200,2e3,4,"COMUM")}},r={args:{card:new i("2","Guarda de Pedra","Um soldado incansável esculpido nas montanhas antigas. Sua lealdade é tão imutável quanto a rocha de que é feito, servindo como a primeira linha de defesa contra hordas invasoras.",m,"earth",1200,2e3,4,"RARO")}},o={args:{card:new u("2","Pote da Ganância","Compre 2 cartas.","MAGICA",d,"spell")}},s={args:{card:new l("4","Cova dos Desalmados","Quando um monstro inimigo declarar um ataque: enterre as intenções do oponente, destruindo o monstro atacante e removendo-o do jogo por este turno.","ARMADILHA",d,"trap")}},n={args:{card:new c("5","Lâmina de Plasma","Equipe apenas em um monstro do tipo Guerreiro. O monstro equipado ganha 500 pontos de ATK e pode atacar duas vezes durante a mesma fase de batalha.","EQUIPAMENTO",d,"fire")}},t={args:{card:new p("6","Cidadela Flutuante",'Enquanto esta carta estiver ativa, todos os monstros com atributo "Vento" ganham 300 de ATK/DEF e não podem ser destruídos por efeitos de cartas mágicas.',"TERRENO",d,"wind")}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    card: new MonsterCard("1", "Patrulheiro Gárgula de Gelo", "Emmissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados. Sua presença inspira coragem, e o eco de seu grito de gelo ressoa nas muralhas, formando escudos de pedra que refutam qualquer ataque.", exemplo_legendaria, "ice", 2500, 2100, 7, "LEGENDARIO")
  }
}`,...a.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    card: new MonsterCard("2", "Guarda de Pedra", "Um soldado incansável esculpido nas montanhas antigas. Sua lealdade é tão imutável quanto a rocha de que é feito, servindo como a primeira linha de defesa contra hordas invasoras.", exemplo_comum, "earth", 1200, 2000, 4, "COMUM")
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    card: new MonsterCard("2", "Guarda de Pedra", "Um soldado incansável esculpido nas montanhas antigas. Sua lealdade é tão imutável quanto a rocha de que é feito, servindo como a primeira linha de defesa contra hordas invasoras.", exemplo_comum, "earth", 1200, 2000, 4, "RARO")
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    card: new MagicCard("2", "Pote da Ganância", "Compre 2 cartas.", "MAGICA", exemplo_magica, "spell")
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    card: new TrapCard("4", "Cova dos Desalmados", "Quando um monstro inimigo declarar um ataque: enterre as intenções do oponente, destruindo o monstro atacante e removendo-o do jogo por este turno.", "ARMADILHA", exemplo_magica, "trap")
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    card: new EquipCard("5", "Lâmina de Plasma", "Equipe apenas em um monstro do tipo Guerreiro. O monstro equipado ganha 500 pontos de ATK e pode atacar duas vezes durante a mesma fase de batalha.", "EQUIPAMENTO", exemplo_magica, "fire")
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    card: new TerrainCard("6", "Cidadela Flutuante", 'Enquanto esta carta estiver ativa, todos os monstros com atributo "Vento" ganham 300 de ATK/DEF e não podem ser destruídos por efeitos de cartas mágicas.', "TERRENO", exemplo_magica, "wind")
  }
}`,...t.parameters?.docs?.source}}};const R=["MonsterLegendary","MonsterCommon","MonsterRare","Magic","Trap","Equipment","Terrain"];export{n as Equipment,o as Magic,e as MonsterCommon,a as MonsterLegendary,r as MonsterRare,t as Terrain,s as Trap,R as __namedExportsOrder,G as default};
