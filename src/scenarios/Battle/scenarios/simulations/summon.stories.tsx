import type { Meta, StoryObj } from '@storybook/react';
import BattleScenario from '../..';
import { useBattleStore } from '../../../../store/BattleStore';
import { useHandStore } from '../../../../store/HandStore';
import { useEffect, useState } from 'react';
import { startMockBattle } from '../../../../services/mockBattle';
import { BattleEvent } from '../../../../core/domain/BattleStore';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_CARD = {
    id: 24,
    name: "Íbis Mensageiro Vanguarda",
    description: "Monstro de suporte.",
    imageUrl: "images/exemplo_monstro_raro.jpg",
    type: "Íbis de Thoth",
    element: "wind",
    attribute: "monster",
    stars: 1,
    attackPower: 1200,
    defensePower: 1900,
    modifiers: [],
    effectScript: null,
    effectValue: null,
}
const BASE_MOCK_STATE = {
  player: {
    id: 1,
    name: "marcelo",
    hp: 8000,
    hand: [
      MOCK_CARD, MOCK_CARD
    ],
    field: [ null, null, null, null, null ],
    spells: [ null, null, null, null, null  ],
    graveyard: [],
    deck: [
      MOCK_CARD, MOCK_CARD, MOCK_CARD, MOCK_CARD, MOCK_CARD, MOCK_CARD
    ],
    canSummon: true,
    deckCount: 35
  },
  opponent: {
    id: 5,
    name: "Darius Blackflare",
    hp: 8000,
    hand: [
      MOCK_CARD, MOCK_CARD
    ],
    field: [
      null,
        {
            card: MOCK_CARD,
            position: "attack",
            canAttack: false
        },
        null,
        null,
        null
    ],
    spells: [ null, null, null, null, null  ],
    deck: [
      MOCK_CARD, MOCK_CARD, MOCK_CARD, MOCK_CARD, MOCK_CARD, MOCK_CARD
    ],
    graveyard: [],
    handCount: 2,
    deckCount: 40
  },
  turn: 3,
  currentTurnOwner: "player"
};

const playAttackSequence = async ({ canvas, userEvent }: any) => {

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
      setIsHidden(false);
      setLoading(false);
    };
    bootstrap();
  }, [mockData]);

  if (loading) return <div style={{ color: '#fff', padding: '20px' }}>Carregando cenário...</div>;

  return <Story />;
};

const meta: Meta<typeof BattleScenario> = {
  title: 'Battle/SummonSimulation',
  component: BattleScenario,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof BattleScenario>;

export const AttackVsAttack_Wins: Story = {
  decorators: [withBattleMock(BASE_MOCK_STATE)],
  play: playAttackSequence,
};
