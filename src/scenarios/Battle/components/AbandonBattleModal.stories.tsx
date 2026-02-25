import type { Meta, StoryObj } from "@storybook/react";
import { AbandonBattleModal } from "./AbandonBattleModal";

const meta: Meta<typeof AbandonBattleModal> = {
  title: "Game/AbandonBattleModal",
  component: AbandonBattleModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onConfirm: { action: "confirmed" },
  },
};

export default meta;
type Story = StoryObj<typeof AbandonBattleModal>;

export const Default: Story = {
  args: {
    onConfirm: () => console.log("Batalha abandonada!"),
  },
};

export const InGameContext: Story = {
  decorators: [
    (Story) => (
      <div className="bg-zinc-950 p-20 rounded-lg border border-zinc-800">
        <Story />
      </div>
    ),
  ],
  args: {
    onConfirm: () => alert("Você fugiu!"),
  },
};
