import type { Meta, StoryObj } from "@storybook/react";
import { SummonOverlay } from "./index";
import { MonsterCard } from "../../../core/domain/Card";

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
  "Emmissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados. Sua presença inspira coragem, e o eco de seu grito de gelo ressoa nas muralhas, formando escudos de pedra que refutam qualquer ataque.",
  'images/exemplo_monstro_raro.jpg',
  "attack",
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
    ),
  },
};
