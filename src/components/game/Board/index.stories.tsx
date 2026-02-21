import type { Meta, StoryObj } from "@storybook/react";
import { MonsterCard } from "../../../core/domain/Card";
import { GameBoard } from ".";
import { useBattleStore } from "../../../store/BattleStore";
import { useEffect } from "react";
import { BattleEvent } from "../../../core/domain/BattleStore";

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
  position: "attack",
  canAttack: true
}

const meta: Meta<typeof GameBoard> = {
  title: "Game/GameBoard",
  component: GameBoard,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "dark" },
  },
  decorators: [
    (Story) => (
      <div className="bg-zinc-950 min-h-screen flex items-center justify-center p-10">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GameBoard>;

export const EmptyBoard: Story = {
  render: () => {
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

    return <GameBoard />;
  },
};

export const PlayerTurn: Story = {
  render: () => {
    const initBattle = useBattleStore((s) => s.initBattle);
    const setEvent = useBattleStore((s) => s.setEvent);

    useEffect(() => {
      initBattle({
        player: { field: [ cardData ] },
        opponent: { field: [ cardData ] },
        turn: 3,
        currentTurnOwner: "player"
      });

      setEvent(BattleEvent.INITIAL);
    }, []);

    return <GameBoard />;
  },
};

export const SelectingAttackTarget: Story = {
  render: () => {
    const initBattle = useBattleStore((s) => s.initBattle);
    const setEvent = useBattleStore((s) => s.setEvent);

    useEffect(() => {
      initBattle({
        player: { field: [ cardData ] },
        opponent: { field: [ cardData ] },
        turn: 3,
        currentTurnOwner: "player"
      });

      setEvent(BattleEvent.SELECTING_TARGET);
    }, []);

    return <GameBoard />;
  },
};
