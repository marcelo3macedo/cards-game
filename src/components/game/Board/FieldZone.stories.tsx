import type { Meta, StoryObj } from "@storybook/react";
import { FieldZone } from "./FieldZone";

const meta: Meta<typeof FieldZone> = {
  title: "Game/FieldZone",
  component: FieldZone,
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark" },
  },
  argTypes: {
    onClick: { action: "clicked" },
    onInitiateAttack: { action: "attack initiated" },
    onChangeMode: { action: "mode changed" },
  },
  decorators: [
    (Story) => (
      <div className="p-10 bg-zinc-950 min-h-[300px] flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FieldZone>;

const mockCard = {
  id: "1",
  name: "Blue-Eyes White Dragon",
  atk: 3000,
  def: 2500,
  image: "https://images.ygoprodeck.com/images/cards/89631139.jpg",
};

export const Empty: Story = {
  args: {
    card: null,
    isInteractable: false,
  },
};

export const EmptyInteractable: Story = {
  args: {
    card: null,
    isInteractable: true,
  },
};

export const AttackMode: Story = {
  args: {
    card: mockCard,
    mode: "atk",
    isInteractable: true,
  },
};

export const DefenseMode: Story = {
  args: {
    card: mockCard,
    mode: "def",
    isInteractable: true,
  },
};

export const FaceDown: Story = {
  args: {
    card: mockCard,
    mode: "face-down",
    isInteractable: true,
  },
};

export const Focused: Story = {
  args: {
    card: mockCard,
    mode: "atk",
    isFocused: true,
  },
};

export const Selected: Story = {
  args: {
    card: mockCard,
    mode: "atk",
    isSelected: true,
  },
};

export const OpponentCard: Story = {
  args: {
    card: mockCard,
    mode: "atk",
    isOpponent: true,
  },
};
