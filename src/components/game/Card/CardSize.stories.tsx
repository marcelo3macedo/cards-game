import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./index";
import { MonsterCard } from "../../../core/domain/Card";

const meta = {
  title: "Game/Card/Sizes",
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;

const card = new MonsterCard(
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
)

export const Large: StoryObj<typeof meta> = {
  args: {
    card,
    size: "lg",
  },
};

export const Medium: StoryObj<typeof meta> = {
  args: {
    card,
    size: "md",
  },
};

export const Small: StoryObj<typeof meta> = {
  args: {
    card,
    size: "sm",
  },
};

export const ExtraSmall: StoryObj<typeof meta> = {
  args: {
    card,
    size: "xs",
  },
};
