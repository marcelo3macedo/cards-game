import type { Meta, StoryObj } from "@storybook/react";
import { FieldZone } from "./FieldZone";
import { MonsterCard } from "../../../core/domain/Card";

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

const cardDefenseData = {
  card: mockMonster,
  position: "defense"
}

const cardFaceDownData = {
  card: mockMonster,
  position: "face-down-attack"
}

const cardFaceDownDefenseData = {
  card: mockMonster,
  position: "face-down-defense"
}

const meta: Meta<typeof FieldZone> = {
  title: "Game/FieldZone",
  component: FieldZone,
  decorators: [
    (Story) => (
      <div className="p-20 bg-slate-950 min-h-[400px] flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    mode: {
      control: "select",
      options: ["atk", "def", "face-down"],
    },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof FieldZone>;

export const Empty: Story = {
  args: {
    cardData: null,
    isInteractable: true,
    isSelected: false,
    isFocused: false,
    isOpponent: false,
    isMonster: false,
    index: 0,
  },
};

export const EmptyNotInteractable: Story = {
  args: {
    cardData: null,
    isInteractable: true,
    isSelected: false,
    isFocused: false,
    isOpponent: false,
    isMonster: false,
    index: 0,
  },
};

export const AttackMode: Story = {
  args: {
    cardData,
    isInteractable: true,
    isSelected: false,
    isFocused: false,
    isOpponent: false,
    isMonster: false,
    index: 0,
  },
};

export const DefenseMode: Story = {
  args: {
    cardData: cardDefenseData,
    isInteractable: true,
    isSelected: false,
    isFocused: false,
    isOpponent: false,
    isMonster: false,
    index: 0,
  },
};

export const FaceDown: Story = {
  args: {
    cardData: cardFaceDownData,
    isInteractable: true,
    isSelected: false,
    isFocused: false,
    isOpponent: false,
    isMonster: false,
    index: 0,
  },
};

export const FaceDownDefense: Story = {
  args: {
    cardData: cardFaceDownDefenseData,
    isInteractable: true,
    isSelected: false,
    isFocused: false,
    isOpponent: false,
    isMonster: false,
    index: 0,
  },
};

export const Selected: Story = {
  args: {
    cardData,
    isInteractable: true,
    isSelected: true,
    isFocused: false,
    isOpponent: false,
    isMonster: false,
    index: 0,
  },
};

export const Focused: Story = {
  args: {
    cardData,
    isInteractable: true,
    isSelected: false,
    isFocused: true,
    isOpponent: false,
    isMonster: false,
    index: 0,
  },
};

export const FocusedWithoutCard: Story = {
  args: {
    cardData: null,
    isInteractable: true,
    isSelected: false,
    isFocused: true,
    isOpponent: false,
    isMonster: false,
    index: 0,
  },
};

export const OpponentCard: Story = {
  args: {
    cardData,
    isInteractable: true,
    isSelected: false,
    isFocused: true,
    isOpponent: true,
    isMonster: true,
    index: 0,
  },
};

export const OpponentCardHide: Story = {
  args: {
    cardData: cardFaceDownData,
    isInteractable: true,
    isSelected: false,
    isFocused: false,
    isOpponent: true,
    isMonster: false,
    index: 0,
  },
};
