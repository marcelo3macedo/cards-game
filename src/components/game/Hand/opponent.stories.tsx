import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { OpponentHand } from "./opponent";

const meta: Meta<typeof OpponentHand> = {
  title: "Game/OpponentHand",
  component: OpponentHand,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="bg-zinc-950 w-[800px] h-[400px] flex flex-col items-center justify-start p-10 overflow-hidden border border-zinc-800 rounded-xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof OpponentHand>;

export const Interactive: Story = {
  render: () => {
    const [count, setCount] = useState(5);

    return (
      <div className="flex flex-col items-center gap-20 w-full">
        <div className="w-full flex justify-center">
          <OpponentHand count={count} />
        </div>

        <div className="flex flex-col items-center gap-4 bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
          <p className="text-white font-black text-sm uppercase tracking-widest">
            Cartas na Mão: <span className="text-red-500">{count}</span>
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => setCount(Math.max(0, count - 1))}
              className="px-6 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-all active:scale-90 font-bold"
            >
              - Remover
            </button>
            <button
              onClick={() => setCount(count + 1)}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-all active:scale-90 font-bold shadow-[0_0_15px_rgba(220,38,38,0.3)]"
            >
              + Adicionar
            </button>
          </div>
          <button
            onClick={() => setCount(0)}
            className="text-zinc-500 text-xs hover:underline"
          >
            Limpar Mão
          </button>
        </div>
      </div>
    );
  },
};

export const FullHand: Story = {
  args: {
    count: 7,
  },
};

export const EmptyHand: Story = {
  args: {
    count: 0,
  },
};
