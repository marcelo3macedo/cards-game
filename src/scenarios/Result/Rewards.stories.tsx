import type { Meta, StoryObj } from "@storybook/react";
import { MonsterCard } from "../../core/domain/Card";
import exemplo_legendaria from "@/assets/images/exemplo_legendaria.jpg";
import { RewardsScenario } from "./Rewards";

const createMockCard = (id: string, name: string, rarity: "COMUM" | "RARO") =>
  new MonsterCard(
    id,
    name,
    "Um dragão reluzente...",
    exemplo_legendaria,
    "light",
    2800,
    2400,
    8,
    rarity,
  );

const meta: Meta<typeof RewardsScenario> = {
  title: "Scenarios/RewardsScenario",
  component: RewardsScenario,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof RewardsScenario>;

export const SingleCard: Story = {
  args: {
    cards: [createMockCard("1", "Guerreiro do Destino", "RARO")],
    onBack: () => alert("Voltando ao menu..."),
  },
};

export const TripleRewards: Story = {
  args: {
    cards: [
      createMockCard("1", "Dragão de Cinzas", "RARO"),
      createMockCard("2", "Soldado de Elite", "COMUM"),
      createMockCard("3", "Mago Ancião", "RARO"),
    ],
    onBack: () => {},
  },
};

export const FullHandRewards: Story = {
  args: {
    cards: [
      createMockCard("1", "Carta 1", "COMUM"),
      createMockCard("2", "Carta 2", "COMUM"),
      createMockCard("3", "Carta 3", "RARO"),
      createMockCard("4", "Carta 4", "COMUM"),
      createMockCard("5", "Carta 5", "RARO"),
    ],
    onBack: () => {},
  },
};
