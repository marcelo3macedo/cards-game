import type { Meta, StoryObj } from "@storybook/react";
import { MonsterCard } from "../../../core/domain/Card";
import { PlayerHand } from ".";

const card = new MonsterCard(
  "1",
  "Patrulheiro Gárgula de Gelo",
  "Emmissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados. Sua presença inspira coragem, e o eco de seu grito de gelo ressoa nas muralhas, formando escudos de pedra que refutam qualquer ataque.",
  'images/exemplo_comum.jpg',
  "attack",
  "ice",
  2500,
  2100,
  7,
  "LEGENDARIO",
);

const mockCards = [card, card, card, card, card];

const meta: Meta<typeof PlayerHand> = {
  title: "Game/PlayerHand",
  component: PlayerHand,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onSelect: { action: "card selected" },
  },
};

export default meta;
type Story = StoryObj<typeof PlayerHand>;

export const Default: Story = {
  args: {
    cards: mockCards,
    isHidden: false,
  },
  render: (args) => (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center">
      <p className="text-white absolute top-10 text-center">
        Use as setas ⬅️ ➡️ do teclado e Enter para selecionar
      </p>
      <PlayerHand {...args} />
    </div>
  ),
};

export const Hidden: Story = {
  args: {
    cards: mockCards,
    isHidden: true,
  },
};
