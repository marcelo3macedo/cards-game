import type { Meta, StoryObj } from "@storybook/react";
import { SummonOverlay } from "./index";
import { MonsterCard } from "../../../core/domain/Card";
import exemplo_legendaria from "@/assets/images/exemplo_legendaria.jpg";
import exemplo_comum from "@/assets/images/exemplo_comum.jpg";

const meta: Meta<typeof SummonOverlay> = {
  title: "Game/SummonOverlay",
  component: SummonOverlay,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="h-screen w-full bg-zinc-950 relative overflow-hidden">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    onSummon: { action: "summoned" },
    onCancel: { action: "cancelled" },
  },
};

export default meta;
type Story = StoryObj<typeof SummonOverlay>;

const mockMonster = new MonsterCard(
  "1",
  "Patrulheiro Gárgula de Gelo",
  "Emissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados.",
  exemplo_legendaria,
  "ice",
  2500,
  2100,
  7,
  "LEGENDARIO",
);

export const Default: Story = {
  args: {
    card: mockMonster,
  },
};

export const SmallTextCard: Story = {
  args: {
    card: new MonsterCard(
      "2",
      "Goblin Curioso",
      "Um pequeno goblin que adora bisbilhotar baralhos alheios.",
      exemplo_comum,
      "earth",
      1200,
      800,
      3,
      "COMUM",
    ),
  },
};
