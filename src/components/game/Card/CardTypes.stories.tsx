import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./index";
import {
  MonsterCard,
  MagicCard,
  TrapCard,
  EquipCard,
  TerrainCard,
} from "../../../core/domain/Card";

const meta = {
  title: "Game/Card/Types",
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;

export const MonsterLegendary: StoryObj<typeof meta> = {
  args: {
    card: new MonsterCard(
      "1",
      "Patrulheiro Gárgula de Gelo",
      "Emmissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados. Sua presença inspira coragem, e o eco de seu grito de gelo ressoa nas muralhas, formando escudos de pedra que refutam qualquer ataque.",
      'images/exemplo_legendaria.jpg',
      "attack",
      "ice",
      2500,
      2100,
      7,
      "LEGENDARIO",
    ),
    size: "lg"
  },
};

export const MonsterCommon: StoryObj<typeof meta> = {
  args: {
    card: new MonsterCard(
      "2",
      "Guarda de Pedra",
      "Um soldado incansável esculpido nas montanhas antigas. Sua lealdade é tão imutável quanto a rocha de que é feito, servindo como a primeira linha de defesa contra hordas invasoras.",
      "images/exemplo_comum.jpg",
      "attack",
      "earth",
      1200,
      2000,
      4,
      "COMUM",
    ),
    size: "lg"
  },
};

export const MonsterRare: StoryObj<typeof meta> = {
  args: {
    card: new MonsterCard(
      "2",
      "Guarda de Pedra",
      "Um soldado incansável esculpido nas montanhas antigas. Sua lealdade é tão imutável quanto a rocha de que é feito, servindo como a primeira linha de defesa contra hordas invasoras.",
      "images/exemplo_monstro_raro.jpg",
      "attack",
      "earth",
      1200,
      2000,
      4,
      "RARO",
    ),
    size: "lg"
  },
};

export const Magic: StoryObj<typeof meta> = {
  args: {
    card: new MagicCard(
      "2",
      "Pote da Ganância",
      "Compre 2 cartas.",
      'images/exemplo_magica.jpg',
      "MAGICA",
      "spell",
    ),
    size: "lg"
  },
};

export const Trap: StoryObj<typeof meta> = {
  args: {
    card: new TrapCard(
      "4",
      "Cova dos Desalmados",
      "Quando um monstro inimigo declarar um ataque: enterre as intenções do oponente, destruindo o monstro atacante e removendo-o do jogo por este turno.",
      'images/exemplo_magica.jpg',
      "ARMADILHA",
      "trap",
    ),
    size: "lg"
  },
};

export const Equipment: StoryObj<typeof meta> = {
  args: {
    card: new EquipCard(
      "5",
      "Lâmina de Plasma",
      "Equipe apenas em um monstro do tipo Guerreiro. O monstro equipado ganha 500 pontos de ATK e pode atacar duas vezes durante a mesma fase de batalha.",
      'images/exemplo_magica.jpg',
      "EQUIPAMENTO",
      "fire",
    ),
    size: "lg"
  },
};

export const Terrain: StoryObj<typeof meta> = {
  args: {
    card: new TerrainCard(
      "6",
      "Cidadela Flutuante",
      'Enquanto esta carta estiver ativa, todos os monstros com atributo "Vento" ganham 300 de ATK/DEF e não podem ser destruídos por efeitos de cartas mágicas.',
      'images/exemplo_magica.jpg',
      "TERRENO",
      "wind",
    ),
    size: "lg"
  },
};
