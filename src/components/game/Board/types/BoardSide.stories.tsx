import type { Meta, StoryObj } from "@storybook/react";
import { BoardSide } from "./BoardSide";
import { useBattleStore } from "../../../../store/BattleStore";
import { useEffect } from "react";
import { BattleEvent } from "../../../../core/domain/BattleStore";
import { mockMonsterInAttackMode, mockMonsterInDefenseMode } from "../../../../utils/mockUtils";

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

export const EventInitial: StoryObj<typeof BoardSide> = {
  render: (args) => {
    const initBattle = useBattleStore((s) => s.initBattle);
    const setEvent = useBattleStore((s) => s.setEvent);

    useEffect(() => {
      initBattle({
        player: { field: [] },
        opponent: { field: [] },
        turn: 1,
        currentTurnOwner: "player"
      });

      setEvent(BattleEvent.INITIAL);
    }, []);

    return <BoardSide {...args} isOpponent={false} />;
  },
}

export const EventCardSelected: StoryObj<typeof BoardSide> = {
  render: (args) => {
    const initBattle = useBattleStore((s) => s.initBattle);
    const setEvent = useBattleStore((s) => s.setEvent);

    useEffect(() => {
      initBattle({
        player: { field: [] },
        opponent: { field: [] },
        turn: 1,
        currentTurnOwner: "player"
      });

      setEvent(BattleEvent.SELECTING_POSITION);
    }, []);

    return <BoardSide {...args} isOpponent={false} />;
  },
}

export const OpponentOnCardSelected: StoryObj<typeof BoardSide> = {
  render: (args) => {
    const initBattle = useBattleStore((s) => s.initBattle);
    const setEvent = useBattleStore((s) => s.setEvent);

    useEffect(() => {
      initBattle({
        player: { field: [] },
        opponent: { field: [] },
        turn: 1,
        currentTurnOwner: "opponent"
      });

      setEvent(BattleEvent.SELECTING_POSITION);
    }, []);

    return <BoardSide {...args} isOpponent={true} />;
  },
}

export const PlayerSideAttackMode: StoryObj<typeof BoardSide> = {
  render: (args) => {
    const initBattle = useBattleStore((s) => s.initBattle);
    const setEvent = useBattleStore((s) => s.setEvent);

    useEffect(() => {
      initBattle({
        player: {
          field: [ mockMonsterInAttackMode ]
        },
        opponent: { field: [] },
        turn: 1,
        currentTurnOwner: "player"
      });

      setEvent(BattleEvent.INITIAL);
    }, []);

    return <BoardSide {...args} isOpponent={false} />;
  },
};

export const PlayerSideDefenseMode: StoryObj<typeof BoardSide> = {
  render: (args) => {
    const initBattle = useBattleStore((s) => s.initBattle);
    const setEvent = useBattleStore((s) => s.setEvent);

    useEffect(() => {
      initBattle({
        player: {
          field: [ mockMonsterInDefenseMode ]
        },
        opponent: { field: [] },
        turn: 1,
        currentTurnOwner: "player"
      });

      setEvent(BattleEvent.INITIAL);
    }, []);

    return <BoardSide {...args} isOpponent={false} />;
  },
};

export const OpponentSideAttackMode: StoryObj<typeof BoardSide> = {
  render: (args) => {
    const initBattle = useBattleStore((s) => s.initBattle);
    const setEvent = useBattleStore((s) => s.setEvent);

    useEffect(() => {
      initBattle({
        player: {
          field: []
        },
        opponent: { field: [ mockMonsterInAttackMode ] },
        turn: 1,
        currentTurnOwner: "opponent"
      });

      setEvent(BattleEvent.INITIAL);
    }, []);

    return <BoardSide {...args} isOpponent={true} />;
  },
};

export const OpponentSideDefenseMode: StoryObj<typeof BoardSide> = {
  render: (args) => {
    const initBattle = useBattleStore((s) => s.initBattle);
    const setEvent = useBattleStore((s) => s.setEvent);

    useEffect(() => {
      initBattle({
        player: {
          field: []
        },
        opponent: { field: [ mockMonsterInDefenseMode ] },
        turn: 1,
        currentTurnOwner: "opponent"
      });

      setEvent(BattleEvent.INITIAL);
    }, []);

    return <BoardSide {...args} isOpponent={true} />;
  },
};
