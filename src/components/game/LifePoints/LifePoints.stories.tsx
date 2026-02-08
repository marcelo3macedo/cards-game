import type { Meta, StoryObj } from "@storybook/react";
import { LifePoints } from ".";
import { useBattleStore } from "../../../store/BattleStore";
import { useEffect } from "react";

const meta: Meta<typeof LifePoints> = {
  title: "Game/LifePoints",
  component: LifePoints,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="p-20 bg-zinc-950 w-full min-w-[600px] flex justify-center items-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const InteractiveBattle: StoryObj<typeof LifePoints> = {
  render: () => {
    const { player, opponent, updateHP, initBattle } = useBattleStore();

    useEffect(() => {
      if (!player || !opponent) {
        initBattle({
          player: { id: 1, name: "Yugi", hp: 8000, deckCount: 40, graveyard: [], field: [] },
          opponent: { id: 2, name: "Kaiba", hp: 8000, deckCount: 40, graveyard: [], field: [] },
          turn: 1,
          currentTurnOwner: "player",
        });
      }
    }, []);

    const handleDamage = (target: "player" | "opponent", amount: number) => {
      if (!player || !opponent) return;

      if (target === "player") {
        updateHP(player.hp - amount, opponent.hp);
      } else {
        updateHP(player.hp, opponent.hp - amount);
      }
    };

    return (
      <div className="flex flex-col gap-12 items-center">
        <div className="flex gap-20">
          <div className="flex flex-col gap-4 items-center">
            <LifePoints target="opponent" color="red" align="right" />
            <div className="flex gap-2">
              <button
                onClick={() => handleDamage("opponent", 1000)}
                className="px-4 py-1 bg-red-600 text-xs text-white font-bold rounded hover:bg-red-500 transition-all"
              >
                Dano Oponente
              </button>
              <button
                onClick={() => handleDamage("opponent", -500)}
                className="px-4 py-1 bg-green-600 text-xs text-white font-bold rounded hover:bg-green-500"
              >
                Cura
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 items-center">
            <LifePoints target="player" color="blue" align="left" />
            <div className="flex gap-2">
              <button
                onClick={() => handleDamage("player", 1000)}
                className="px-4 py-1 bg-blue-600 text-xs text-white font-bold rounded hover:bg-blue-500 transition-all"
              >
                Dano Player
              </button>
              <button
                onClick={() => handleDamage("player", -500)}
                className="px-4 py-1 bg-teal-600 text-xs text-white font-bold rounded hover:bg-teal-500"
              >
                Cura
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => updateHP(8000, 8000)}
          className="text-zinc-500 border border-zinc-800 px-4 py-1 rounded text-xs hover:bg-zinc-900"
        >
          Resetar HP (8000)
        </button>
      </div>
    );
  },
};
