import type { Meta, StoryObj } from "@storybook/react";
import { BattleResultScenario } from ".";

const meta: Meta<typeof BattleResultScenario> = {
  title: "Scenarios/BattleResultScenario",
  component: BattleResultScenario,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onSeeRewards: { action: "rewards_clicked" },
    onGoMenu: { action: "menu_clicked" },
    status: {
      control: "select",
      options: ["victory", "defeat"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof BattleResultScenario>;

export const Victory: Story = {
  args: {
    status: "victory",
    opponentName: "Seto Kaiba",
    opponentImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=kaiba",
    opponentMessage: "Inacreditável... Meus dragões foram superados por essa estratégia?",
    rating: 5,
    onSeeRewards: () => {},
    onGoMenu: () => {},
  },
};

export const Defeat: Story = {
  args: {
    status: "defeat",
    opponentName: "Yami Yugi",
    opponentImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=yugi",
    opponentMessage: "Você lutou com honra, mas o Coração das Cartas estava do meu lado hoje.",
    rating: 0,
    onSeeRewards: () => {},
    onGoMenu: () => {},
  },
};

export const LowRatingVictory: Story = {
  args: {
    ...Victory.args,
    rating: 2,
    opponentMessage: "Vencer por pouco não é motivo para orgulho.",
  },
};
