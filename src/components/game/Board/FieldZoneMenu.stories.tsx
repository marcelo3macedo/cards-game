import type { Meta, StoryObj } from "@storybook/react";
import { FieldZoneMenu } from "./FieldZoneMenu";

const meta: Meta<typeof FieldZoneMenu> = {
  title: "Game/FieldZoneMenu",
  component: FieldZoneMenu,
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark" },
  },
  decorators: [
    (Story) => (
      <div className="relative w-32 h-44 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center bg-zinc-800">
        <span className="text-zinc-500 text-xs">Card Slot</span>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FieldZoneMenu>;

export const PlayerAttackMode: Story = {
  args: {
    mode: "attack",
    index: 0,
    isOpponent: false,
    canAttack: true
  },
};

export const PlayerAttackDisableMode: Story = {
  args: {
    mode: "attack",
    index: 0,
    isOpponent: false,
    canAttack: false
  },
};

export const PlayerFaceDown: Story = {
  args: {
    mode: "face-down-attack",
    index: 1,
    isOpponent: false,
  },
};

export const PlayerDefenseMode: Story = {
  args: {
    mode: "defense",
    index: 2,
    isOpponent: false,
  },
};

export const OpponentCard: Story = {
  args: {
    mode: "attack",
    index: 3,
    isOpponent: true,
  },
};

export const OpponentFaceDown: Story = {
  args: {
    mode: "face-down-attack",
    index: 4,
    isOpponent: true,
  },
};
