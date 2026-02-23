import{E as i,a as m,M as d,T as c,b as p,C as u}from"./index-mHFlCYGw.js";import"./jsx-runtime-u17CrQMm.js";import"./iframe-Dm5SVBJu.js";import"./preload-helper-PPVm8Dsz.js";import"./sword-B4t4mRyy.js";import"./createLucideIcon-CUMascdk.js";import"./imageUtils-CZ9VB9H-.js";const M={title:"Game/Card/Types",component:u},a={args:{card:new d("1","Patrulheiro Gárgula de Gelo","Emmissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados. Sua presença inspira coragem, e o eco de seu grito de gelo ressoa nas muralhas, formando escudos de pedra que refutam qualquer ataque.","images/exemplo_legendaria.jpg","attack","ice",2500,2100,7,"LEGENDARIO")}},e={args:{card:new d("2","Guarda de Pedra","Um soldado incansável esculpido nas montanhas antigas. Sua lealdade é tão imutável quanto a rocha de que é feito, servindo como a primeira linha de defesa contra hordas invasoras.","images/exemplo_comum.jpg","attack","earth",1200,2e3,4,"COMUM")}},r={args:{card:new d("2","Guarda de Pedra","Um soldado incansável esculpido nas montanhas antigas. Sua lealdade é tão imutável quanto a rocha de que é feito, servindo como a primeira linha de defesa contra hordas invasoras.","images/exemplo_monstro_raro.jpg","attack","earth",1200,2e3,4,"RARO")}},o={args:{card:new m("2","Pote da Ganância","Compre 2 cartas.","images/exemplo_magica.jpg","MAGICA","spell")}},s={args:{card:new p("4","Cova dos Desalmados","Quando um monstro inimigo declarar um ataque: enterre as intenções do oponente, destruindo o monstro atacante e removendo-o do jogo por este turno.","images/exemplo_magica.jpg","ARMADILHA","trap")}},t={args:{card:new i("5","Lâmina de Plasma","Equipe apenas em um monstro do tipo Guerreiro. O monstro equipado ganha 500 pontos de ATK e pode atacar duas vezes durante a mesma fase de batalha.","images/exemplo_magica.jpg","EQUIPAMENTO","fire")}},n={args:{card:new c("6","Cidadela Flutuante",'Enquanto esta carta estiver ativa, todos os monstros com atributo "Vento" ganham 300 de ATK/DEF e não podem ser destruídos por efeitos de cartas mágicas.',"images/exemplo_magica.jpg","TERRENO","wind")}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    card: new MonsterCard("1", "Patrulheiro Gárgula de Gelo", "Emmissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados. Sua presença inspira coragem, e o eco de seu grito de gelo ressoa nas muralhas, formando escudos de pedra que refutam qualquer ataque.", 'images/exemplo_legendaria.jpg', "attack", "ice", 2500, 2100, 7, "LEGENDARIO")
  }
}`,...a.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    card: new MonsterCard("2", "Guarda de Pedra", "Um soldado incansável esculpido nas montanhas antigas. Sua lealdade é tão imutável quanto a rocha de que é feito, servindo como a primeira linha de defesa contra hordas invasoras.", "images/exemplo_comum.jpg", "attack", "earth", 1200, 2000, 4, "COMUM")
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    card: new MonsterCard("2", "Guarda de Pedra", "Um soldado incansável esculpido nas montanhas antigas. Sua lealdade é tão imutável quanto a rocha de que é feito, servindo como a primeira linha de defesa contra hordas invasoras.", "images/exemplo_monstro_raro.jpg", "attack", "earth", 1200, 2000, 4, "RARO")
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    card: new MagicCard("2", "Pote da Ganância", "Compre 2 cartas.", 'images/exemplo_magica.jpg', "MAGICA", "spell")
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    card: new TrapCard("4", "Cova dos Desalmados", "Quando um monstro inimigo declarar um ataque: enterre as intenções do oponente, destruindo o monstro atacante e removendo-o do jogo por este turno.", 'images/exemplo_magica.jpg', "ARMADILHA", "trap")
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    card: new EquipCard("5", "Lâmina de Plasma", "Equipe apenas em um monstro do tipo Guerreiro. O monstro equipado ganha 500 pontos de ATK e pode atacar duas vezes durante a mesma fase de batalha.", 'images/exemplo_magica.jpg', "EQUIPAMENTO", "fire")
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    card: new TerrainCard("6", "Cidadela Flutuante", 'Enquanto esta carta estiver ativa, todos os monstros com atributo "Vento" ganham 300 de ATK/DEF e não podem ser destruídos por efeitos de cartas mágicas.', 'images/exemplo_magica.jpg', "TERRENO", "wind")
  }
}`,...n.parameters?.docs?.source}}};const f=["MonsterLegendary","MonsterCommon","MonsterRare","Magic","Trap","Equipment","Terrain"];export{t as Equipment,o as Magic,e as MonsterCommon,a as MonsterLegendary,r as MonsterRare,n as Terrain,s as Trap,f as __namedExportsOrder,M as default};
