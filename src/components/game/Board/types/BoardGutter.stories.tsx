import type { Meta, StoryObj } from "@storybook/react";
import { BoardGutter } from "./BoardGutter";
import { useBattleStore } from "../../../../store/BattleStore";

const meta: Meta<typeof BoardGutter> = {
  title: "Game/BoardGutter",
  component: BoardGutter,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => {
      useBattleStore.setState({
        player: {
          id: 1,
          hp: 3000,
          name: "Test",
          field: [],
          spells: [],
          graveyard: Array(5).fill({}),
          deckCount: 30,
          canSummon: true
        },
        opponent: {
          id: 2,
          hp: 3000,
          name: "Test",
          field: [],
          spells: [],
          graveyard: Array(2).fill({}),
          deckCount: 15,
          canSummon: true
        },
      });
      return (
        <div className="bg-zinc-950 p-10">
          <Story />
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof BoardGutter>;

export const PlayerWithCards: Story = {
  args: { type: "player" },
};

export const OpponentWithCards: Story = {
  args: { type: "opponent" },
};

export const EmptyDeck: Story = {
  args: { type: "player" },
  play: () => {
    useBattleStore.setState({
      player: {
          id: 1,
          hp: 3000,
          name: "Test",
          field: [],
          spells: [],
          graveyard: Array(5).fill({}),
          deckCount: 0,
          canSummon: true
        }
    });
  }
};
