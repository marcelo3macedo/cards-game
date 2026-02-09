import type { Meta, StoryObj } from "@storybook/react";
import { BoardSide } from "./BoardSide";
import { useBattleStore } from "../../../../store/BattleStore";
import { useEffect } from "react";

const meta: Meta<typeof BoardSide> = {
  title: "Game/BoardSide",
  component: BoardSide,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="p-20 bg-zinc-950 min-w-[800px] flex justify-center border border-zinc-800">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const PlayerSideWithOneMonster: StoryObj<typeof BoardSide> = {
  render: (args) => {
    const initBattle = useBattleStore((s) => s.initBattle);

    useEffect(() => {
      initBattle({
        player: {
          name: "Yugi",
          hp: 8000,
          field: [{ card: { name: "Mago Negro", atk: 2500, def: 2100, level: 7, imageUrl: "https://images.ygoprodeck.com/images/cards/46986414.jpg" }, mode: "attack" }]
        },
        opponent: { name: "Kaiba", hp: 8000, field: [] },
        turn: 1,
        currentTurnOwner: "player"
      });
    }, []);

    return <BoardSide {...args} isOpponent={false} />;
  },
};

export const OpponentSideFullField: StoryObj<typeof BoardSide> = {
  render: (args) => {
    const initBattle = useBattleStore((s) => s.initBattle);

    useEffect(() => {
      const monster = { card: { name: "Blue-Eyes", atk: 3000, def: 2500, imageUrl: "https://images.ygoprodeck.com/images/cards/46986414.jpg" }, mode: "attack" };
      initBattle({
        player: { name: "Yugi", hp: 8000, field: [] },
        opponent: {
          name: "Kaiba",
          hp: 8000,
          field: [monster, monster, monster, monster, monster]
        },
        turn: 1,
        currentTurnOwner: "player"
      });
    }, []);

    return <BoardSide {...args} isOpponent={true} isSelectingTarget={true} />;
  },
};

export const EmptySelectingMode: StoryObj<typeof BoardSide> = {
  render: (args) => {
    const initBattle = useBattleStore((s) => s.initBattle);

    useEffect(() => {
      initBattle({
        player: { name: "Yugi", hp: 8000, field: [] },
        opponent: { name: "Kaiba", hp: 8000, field: [] },
        turn: 1,
        currentTurnOwner: "player"
      });
    }, []);

    return <BoardSide {...args} isSelecting={true} highlightedIndex={2} />;
  },
};
