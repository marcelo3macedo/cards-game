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
  argTypes: {
    onInitiateAttack: { action: "attack_initiated" },
    onChangeMode: { action: "mode_changed" },
    onView: { action: "view_card" },
    onClose: { action: "menu_closed" },
  },
};

export default meta;
type Story = StoryObj<typeof FieldZoneMenu>;

export const PlayerAttackMode: Story = {
  args: {
    mode: "atk",
    index: 0,
    isOpponent: false,
  },
};

export const PlayerFaceDown: Story = {
  args: {
    mode: "face-down",
    index: 1,
    isOpponent: false,
  },
};

export const PlayerDefenseMode: Story = {
  args: {
    mode: "def",
    index: 2,
    isOpponent: false,
  },
};

export const OpponentCard: Story = {
  args: {
    mode: "atk",
    index: 3,
    isOpponent: true,
  },
};

export const OpponentFaceDown: Story = {
  args: {
    mode: "face-down",
    index: 4,
    isOpponent: true,
  },
};
