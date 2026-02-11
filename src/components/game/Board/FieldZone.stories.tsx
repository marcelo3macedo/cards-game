import type { Meta, StoryObj } from "@storybook/react";
import { FieldZone } from "./FieldZone";
import exemplo_comum from "@/assets/images/exemplo_comum.jpg";
import { mapServerCardToEntity } from "../../../utils/cardUtils";

const mockMonster = mapServerCardToEntity({
  id: "1",
  name: "Patrulheiro Gárgula de Gelo",
  description: "Emmissão de sombras geladas...",
  image: exemplo_comum,
  element: "ice",
  atk: 2500,
  def: 2100,
  level: 7,
  rarity: "LEGENDARIO",
});

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
    card: null,
    isInteractable: true,
    index: 0,
  },
};

export const EmptyNotInteractable: Story = {
  args: {
    card: null,
    isInteractable: false,
    index: 0,
  },
};

export const AttackMode: Story = {
  args: {
    card: mockMonster,
    mode: "atk",
    index: 0,
    isInteractable: true,
  },
};

export const DefenseMode: Story = {
  args: {
    card: mockMonster,
    mode: "def",
    index: 0,
  },
};

export const FaceDown: Story = {
  args: {
    card: mockMonster,
    mode: "face-down",
    index: 0,
  },
};

export const Selected: Story = {
  args: {
    card: mockMonster,
    mode: "atk",
    isSelected: true,
    index: 0,
  },
};

export const Focused: Story = {
  args: {
    card: mockMonster,
    mode: "atk",
    isFocused: true,
    index: 0,
  },
};

export const FocusedWithoutCard: Story = {
  args: {
    card: null,
    mode: "atk",
    isFocused: true,
    index: 0,
  },
};

export const OpponentCard: Story = {
  args: {
    card: mockMonster,
    mode: "atk",
    isOpponent: true,
    index: 0,
  },
};

export const OpponentCardHide: Story = {
  args: {
    card: mockMonster,
    mode: "face-down",
    isOpponent: true,
    index: 0,
  },
};
