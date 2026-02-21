import type { Meta, StoryObj } from "@storybook/react";
import { BoardSide } from "./BoardSide";
import { useBattleStore } from "../../../../store/BattleStore";
import { useEffect } from "react";
import { BattleEvent } from "../../../../core/domain/BattleStore";
import { useBattleEventStore } from "../../../../store/BattleEventStore";
import { MonsterCard } from "../../../../core/domain/Card";

const mockMonster = new MonsterCard(
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
);

const cardData = {
  card: mockMonster,
  position: "attack"
}

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

export const EventInitialOpponent: StoryObj<typeof BoardSide> = {
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

    return <BoardSide {...args} isOpponent={true} />;
  },
}

export const EventCardSelectPosition: StoryObj<typeof BoardSide> = {
  render: (args) => {
    const initBattle = useBattleStore((s) => s.initBattle);
    const setEvent = useBattleStore((s) => s.setEvent);
    const { setSelectedFieldIndex, setSelectedFieldArea } = useBattleEventStore();

    useEffect(() => {
      initBattle({
        player: { field: [] },
        opponent: { field: [] },
        turn: 1,
        currentTurnOwner: "player"
      });

      setEvent(BattleEvent.SELECTING_POSITION);
      setSelectedFieldIndex(0);
      setSelectedFieldArea("MONSTER");
    }, []);

    return <BoardSide {...args} isOpponent={false} />;
  },
}

export const EventCardOnField: StoryObj<typeof BoardSide> = {
  render: (args) => {
    const initBattle = useBattleStore((s) => s.initBattle);
    const setEvent = useBattleStore((s) => s.setEvent);

    useEffect(() => {
      initBattle({
        player: { field: [ cardData ] },
        opponent: { field: [] },
        turn: 1,
        currentTurnOwner: "player"
      });

      setEvent(BattleEvent.INITIAL);
    }, []);

    return <BoardSide {...args} isOpponent={false} />;
  },
}

export const EventSelectTarget: StoryObj<typeof BoardSide> = {
  render: (args) => {
    const initBattle = useBattleStore((s) => s.initBattle);
    const setEvent = useBattleStore((s) => s.setEvent);

    useEffect(() => {
      initBattle({
        player: { field: [] },
        opponent: { field: [ cardData ] },
        turn: 1,
        currentTurnOwner: "player"
      });

      setEvent(BattleEvent.SELECTING_TARGET);
    }, []);

    return <BoardSide {...args} isOpponent={true} />;
  },
}
