import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./index";
import { MonsterCard } from "../../../core/domain/Card";

const meta = {
  title: "Game/Card",
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;

export const FaceUp: StoryObj<typeof meta> = {
  args: {
    card: new MonsterCard(
      "1",
      "Patrulheiro Gárgula de Gelo",
      "Emmissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados. Sua presença inspira coragem, e o eco de seu grito de gelo ressoa nas muralhas, formando escudos de pedra que refutam qualquer ataque.",
      'images/exemplo_monstro_raro.jpg',
      "attack",
      "ice",
      2500,
      2100,
      7,
      "LEGENDARIO",
    ),
    isFaceDown: false,
  },
};

export const FaceDown: StoryObj<typeof meta> = {
  args: {
    card: new MonsterCard(
      "1",
      "Patrulheiro Gárgula de Gelo",
      "Emmissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados. Sua presença inspira coragem, e o eco de seu grito de gelo ressoa nas muralhas, formando escudos de pedra que refutam qualquer ataque.",
      'images/exemplo_monstro_raro.jpg',
      "attack",
      "ice",
      2500,
      2100,
      7,
      "LEGENDARIO",
    ),
    isFaceDown: true,
  },
};
