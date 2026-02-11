import type { Meta, StoryObj } from "@storybook/react";
import { PlayerHandContainer } from "./container";
import { useBattleStore } from "../../../store/BattleStore";

const meta: Meta<typeof PlayerHandContainer> = {
  title: "Game/PlayerHandContainer",
  component: PlayerHandContainer,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="relative h-screen w-full bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-zinc-800 uppercase tracking-widest text-4xl font-bold opacity-20 select-none">
          Battle Field
        </div>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PlayerHandContainer>;

const setupStore = (numCards: number) => {
  const mockCards = Array.from({ length: numCards }, (_, i) => ({
    id: `card-${i}`,
    name: `Monster ${i + 1}`,
    atk: 1000 + i * 200,
    def: 800,
    type: "monster",
    image: "https://images.ygoprodeck.com/images/cards/6983839.jpg"
  }));

  useBattleStore.setState({
    player: {
      id: 1,
      name: "teste",
      graveyard: [],
      hand: mockCards,
      field: [],
      hp: 8000,
      deckCount: 0,
    }
  });
};

export const Default: Story = {
  play: () => {
    setupStore(5);
  },
  args: {
    onSelectCard: (card) => console.log("Card selected:", card),
  },
};

export const FullHand: Story = {
  play: () => {
    setupStore(10);
  },
};

export const Empty: Story = {
  play: () => {
    setupStore(0);
  },
};
