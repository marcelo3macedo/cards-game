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
    hand: [
      {
        id: 23,
        name: "Cura/Dano Variável",
        description: "Efeito de teste para magia de HP.",
        imageUrl: "/images/cards/1846_Íbis_Mensageiro_Vanguarda_1770041959408.jpg",
        attribute: "magic",
        effectScript: "HEAL_SPELL",
        effectValue: { points: 500, target: "player" },
        createdAt: null,
        updatedAt: null
      },
      {
        id: 24,
        name: "Íbis Mensageiro Vanguarda",
        description: "Monstro de suporte.",
        imageUrl: "/images/cards/1846_Íbis_Mensageiro_Vanguarda_1770041959408.jpg",
        type: "Íbis de Thoth",
        element: "wind",
        attribute: "monster",
        stars: 1,
        attackPower: 1700,
        defensePower: 1900,
        effectScript: null,
        effectValue: null,
        createdAt: null,
        updatedAt: null
      }
    ],
    field: [],
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

const createMockBattleState = (points: number, target: 'player' | 'opponent') => {
  const newState = JSON.parse(JSON.stringify(BASE_MOCK_STATE));
  newState.player.hand[0].effectValue = { points, target };
  newState.player.spells = [newState.player.hand[0]];
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
  }, [initBattle, setEvent, setVisible, setIsHidden]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#1a1a1a',
        color: '#fff',
        fontFamily: 'sans-serif'
      }}>
        Iniciando duelo de teste...
      </div>
    );
  }

  return <Story />;
};

const meta: Meta<typeof BattleScenario> = {
  title: 'Game/BattleScenario/HealSpellVariations',
  component: BattleScenario,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onBack: () => console.log('Back pressed'),
    onEnd: () => console.log('Battle ended'),
  },
};

export default meta;
type Story = StoryObj<typeof BattleScenario>;

export const HealPlayer: Story = {
  name: '1. Heal Player (+500)',
  decorators: [withBattleMock(createMockBattleState(500, 'player'))],
};

export const DamagePlayer: Story = {
  name: '2. Damage Player (-500)',
  decorators: [withBattleMock(createMockBattleState(-500, 'player'))],
};

export const HealOpponent: Story = {
  name: '3. Heal Opponent (+500)',
  decorators: [withBattleMock(createMockBattleState(500, 'opponent'))],
};

export const DamageOpponent: Story = {
  name: '4. Damage Opponent (-500)',
  decorators: [withBattleMock(createMockBattleState(-500, 'opponent'))],
};
