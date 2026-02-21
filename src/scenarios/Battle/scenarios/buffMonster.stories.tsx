import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { useBattleStore } from '../../../store/BattleStore';
import { useHandStore } from '../../../store/HandStore';
import { BattleEvent } from '../../../core/domain/BattleStore';
import BattleScenario from '..';
import { startMockBattle } from '../../../services/mockBattle';

const BASE_MOCK_STATE = {
  player: {
    id: 1,
    name: "marcelo",
    hp: 8000,
    hand: [],
    field: [
      {
        card: {
          id: 24,
          name: "Íbis Mensageiro Vanguarda",
          description: "Monstro de suporte.",
          imageUrl: "images/exemplo_monstro_raro.jpg",
          type: "Íbis de Thoth",
          element: "wind",
          attribute: "monster",
          stars: 1,
          attackPower: 1700,
          defensePower: 1900,
          modifiers: [],
          effectScript: null,
          effectValue: null,
        },
        position: "attack",
        canAttack: false
      }
    ],
    spells: [],
    graveyard: [],
    canSummon: false,
    deckCount: 35
  },
  opponent: {
    id: 5,
    name: "Darius Blackflare",
    hp: 8000,
    field: [],
    spells: [],
    graveyard: [],
    handCount: 0,
    deckCount: 40
  },
  turn: 1,
  currentTurnOwner: "player"
};

const createMockWithModifiers = (atkMod: number, defMod: number, sourceName: string) => {
  const newState = JSON.parse(JSON.stringify(BASE_MOCK_STATE));
  const card = newState.player.field[0].card;

  card.modifiers = [
    {
      id: "mod-1",
      source: sourceName,
      atk: atkMod,
      def: defMod
    }
  ];

  card.attackPower += atkMod;
  card.defensePower += defMod;

  return newState;
};

const withBattleMock = (mockData: any) => (Story: any) => {
  const initBattle = useBattleStore((s) => s.initBattle);
  const setEvent = useBattleStore((s) => s.setEvent);
  const { setVisible, setIsHidden } = useHandStore.getState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const savedState = await startMockBattle(mockData);
      initBattle(savedState.battleState);
      setEvent(BattleEvent.INITIAL);
      setVisible(true);
      setIsHidden(true);
      setLoading(false);
    };
    bootstrap();
  }, [mockData]);

  if (loading) return <div style={{ color: '#fff', padding: '20px' }}>Carregando cenário...</div>;

  return <Story />;
};


const meta: Meta<typeof BattleScenario> = {
  title: 'Game/BattleScenario/CardModifiers',
  component: BattleScenario,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof BattleScenario>;

export const MonsterBuffed: Story = {
  name: 'Monster Buff (+500 ATK/DEF)',
  decorators: [withBattleMock(createMockWithModifiers(500, 500, "Equipamento Místico"))],
};

export const MonsterDebuffed: Story = {
  name: 'Monster Debuff (-300 ATK)',
  decorators: [withBattleMock(createMockWithModifiers(-300, 0, "Grito Enfraquecedor"))],
};

export const MassiveBuff: Story = {
  name: 'Massive Buff (+2000 ATK)',
  decorators: [withBattleMock(createMockWithModifiers(2000, 0, "Fúria de Rá"))],
};
