import type { Meta, StoryObj } from "@storybook/react";
import { MonsterCard } from "../../../core/domain/Card";
import { GameBoard } from ".";
import exemplo_comum from "@/assets/images/exemplo_comum.jpg";

const mockMonster = new MonsterCard(
  "1",
  "Patrulheiro Gárgula de Gelo",
  "Emmissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados. Sua presença inspira coragem, e o eco de seu grito de gelo ressoa nas muralhas, formando escudos de pedra que refutam qualquer ataque.",
  exemplo_comum,
  "ice",
  2500,
  2100,
  7,
  "LEGENDARIO",
);
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
  args: {
    monsterZones: Array(5).fill({ card: null, mode: "atk" }),
    opponentZones: Array(5).fill({ card: null, mode: "atk" }),
    isBlur: false,
    isSelecting: false,
    isSelectingTarget: false,
  },
};

export const PlayerTurn: Story = {
  args: {
    monsterZones: [
      { card: mockMonster, mode: "atk" },
      { card: mockMonster, mode: "def" },
      { card: null, mode: "atk" },
      { card: null, mode: "atk" },
      { card: null, mode: "atk" },
    ],
    opponentZones: [
      { card: mockMonster, mode: "face-down" },
      { card: null, mode: "atk" },
      { card: null, mode: "atk" },
      { card: null, mode: "atk" },
      { card: null, mode: "atk" },
    ],
    isSelecting: true,
    focusedZoneIndex: 2,
  },
};

export const SelectingAttackTarget: Story = {
  args: {
    monsterZones: [
      { card: mockMonster, mode: "atk" },
      { card: null, mode: "atk" },
      { card: null, mode: "atk" },
      { card: null, mode: "atk" },
      { card: null, mode: "atk" },
    ],
    opponentZones: [
      { card: mockMonster, mode: "atk" },
      { card: mockMonster, mode: "def" },
      { card: null, mode: "atk" },
      { card: null, mode: "atk" },
      { card: null, mode: "atk" },
    ],
    isSelectingTarget: true,
    highlightedIndex: 0,
  },
};

export const Blurred: Story = {
  args: {
    ...PlayerTurn.args,
    isBlur: true,
  },
};
