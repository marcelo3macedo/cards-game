import type { Meta, StoryObj } from "@storybook/react";
import { BattleAnimationOverlay } from "./BattleAnimationOverlay";
import { MonsterCard } from "../../../core/domain/Card";

const meta: Meta<typeof BattleAnimationOverlay> = {
  title: "Game/BattleAnimationOverlay",
  component: BattleAnimationOverlay,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof BattleAnimationOverlay>;

const better = new MonsterCard(
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
);
const lower = new MonsterCard(
  "1",
  "Patrulheiro Gárgula de Gelo",
  "Emmissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados. Sua presença inspira coragem, e o eco de seu grito de gelo ressoa nas muralhas, formando escudos de pedra que refutam qualquer ataque.",
  'images/exemplo_monstro_raro.jpg',
  "attack",
  "ice",
  2300,
  2100,
  7,
  "LEGENDARIO",
);

export const StrikerWins: Story = {
  args: {
    attacker: better,
    defender: lower,
    onAnimationEnd: (res) => console.log("Resultado:", res),
  },
};

export const Draw: Story = {
  args: {
    attacker: lower,
    defender: lower,
    onAnimationEnd: (res) => console.log("Resultado:", res),
  },
};

export const StrikerLoses: Story = {
  args: {
    attacker: lower,
    defender: better,
    onAnimationEnd: (res) => console.log("Resultado:", res),
  },
};

export const DirectHit: Story = {
  args: {
    attacker: lower,
    defender: null,
    onAnimationEnd: (res) => console.log("Resultado:", res),
  },
};
