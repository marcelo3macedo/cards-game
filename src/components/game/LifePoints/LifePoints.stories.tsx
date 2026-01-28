import type { Meta, StoryObj } from '@storybook/react';
import { LifePoints } from '.';
import { useBattleStore } from '../../../store/BattleStore';

const meta: Meta<typeof LifePoints> = {
  title: 'Game/LifePoints',
  component: LifePoints,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div className="p-20 bg-zinc-950 w-[500px]">{Story()}</div>],
};

export default meta;

export const RedPlayer: StoryObj<typeof LifePoints> = {
  render: () => {
    const damageOpponent = useBattleStore(s => s.damageOpponent);
    return (
      <div className="flex flex-col gap-6 items-center">
        <LifePoints target="opponent" color="red" align="right" />
        <button 
          onClick={() => damageOpponent(1000)}
          className="px-6 py-2 bg-red-600 text-white font-bold rounded-full hover:bg-red-500 transition-all"
        >
          Aplicar 1000 de Dano
        </button>
        <button 
            onClick={() => damageOpponent(-200)}
            className="px-6 py-2 bg-green-600 text-white font-bold rounded-full hover:bg-green-500"
          >
            Cura (+200)
          </button>
      </div>
    );
  }
};

export const BluePlayer: StoryObj<typeof LifePoints> = {
  render: () => {
    const damagePlayer = useBattleStore(s => s.damagePlayer);
    return (
      <div className="flex flex-col gap-6 items-center">
        <LifePoints target="player" color="blue" align="right" />
        <button 
          onClick={() => damagePlayer(1000)}
          className="px-6 py-2 bg-red-600 text-white font-bold rounded-full hover:bg-red-500 transition-all"
        >
          Aplicar 1000 de Dano
        </button>
        <button 
            onClick={() => damagePlayer(-200)}
            className="px-6 py-2 bg-green-600 text-white font-bold rounded-full hover:bg-green-500"
          >
            Cura (+200)
          </button>
      </div>
    );
  }
};