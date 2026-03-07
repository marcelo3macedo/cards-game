import type { Meta, StoryObj } from "@storybook/react";
import { FusionAnimationOverlay } from "./FusionAnimationOverlay";
import { MonsterCard } from "../../../core/domain/Card";

const meta: Meta<typeof FusionAnimationOverlay> = {
  title: "Game/FusionAnimationOverlay",
  component: FusionAnimationOverlay,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof FusionAnimationOverlay>;

const material1 = new MonsterCard(
  "1",
  "Patrulheiro Gárgula de Gelo",
  "Emissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados.",
  "images/exemplo_comum.jpg",
  "attack",
  "ice",
  1800,
  1400,
  5,
  "RARO",
);

const material2 = new MonsterCard(
  "2",
  "Dragão de Chama Sombria",
  "Nascido das profundezas vulcânicas, este dragão expele chamas negras que consomem tudo em seu caminho.",
  "images/exemplo_monstro_raro.jpg",
  "attack",
  "fire",
  2100,
  1600,
  6,
  "ÉPICO",
);

const resultCard = new MonsterCard(
  "99",
  "Dragão Gárgula Glacial",
  "A fusão entre gelo e fogo produziu uma criatura de poder absoluto — gelo que abrasa e chamas que congelam.",
  "images/exemplo_monstro_raro.jpg",
  "attack",
  "ice",
  3200,
  2600,
  9,
  "LEGENDARIO",
);

export const FusionSuccess: Story = {
  args: {
    materialCards: [material1, material2],
    resultCard,
    onAnimationEnd: () => console.log("Animação finalizada — sucesso"),
  },
};

export const FusionFailed: Story = {
  args: {
    materialCards: [material1, material2],
    resultCard: null,
    onAnimationEnd: () => console.log("Animação finalizada — falhou"),
  },
};

export const SameCard: Story = {
  args: {
    materialCards: [material1, material1],
    resultCard: null,
    onAnimationEnd: () => console.log("Animação finalizada — falhou"),
  },
};
