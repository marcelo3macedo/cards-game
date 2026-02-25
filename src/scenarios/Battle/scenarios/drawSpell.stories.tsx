import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { useBattleStore } from '../../../store/BattleStore';
import { useHandStore } from '../../../store/HandStore';
import { BattleEvent } from '../../../core/domain/BattleStore';
import BattleScenario from '..';
import { startMockBattle } from '../../../services/mockBattle';

const card = {
  id: 99,
  name: "Pote da Ganância",
  description: "Compre cartas do seu baralho.",
  imageUrl: "images/exemplo_monstro_raro.jpg",
  attribute: "magic",
  effectScript: "POT_OF_GREED_TYPE",
  effectValue: { value: 2, target: "player" },
  createdAt: null,
  updatedAt: null
}

const BASE_MOCK_STATE = {
  player: {
    id: 1,
    name: "marcelo",
    hp: 8000,
    hand: [
      card
    ],
    deck: [
      card, card, card, card, card
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
    hand: [
      card
    ],
    deck: [
      card, card, card, card, card
    ],
    field: [],
    spells: [],
    graveyard: [],
    handCount: 1,
    deckCount: 40
  },
  turn: 1,
  currentTurnOwner: "player"
};

const createDrawMockState = (value: number, target: 'player' | 'opponent') => {
  const newState = JSON.parse(JSON.stringify(BASE_MOCK_STATE));

  newState.player.hand[0].effectValue = { value, target };

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

  if (loading) return <div style={{ color: "#fff", padding: "20px" }}>Simulando Compra de Cartas...</div>;
  return <Story />;
};

const meta: Meta<typeof BattleScenario> = {
  title: 'Game/BattleScenario/PotOfGreedVariations',
  component: BattleScenario,
  parameters: { layout: 'fullscreen' },
  args: {
    onBack: () => console.log('Back'),
    onEnd: () => console.log('End'),
  },
};

export default meta;
type Story = StoryObj<typeof BattleScenario>;

export const PlayerDrawOne: Story = {
  name: 'Player Draws 1 Card',
  decorators: [withBattleMock(createDrawMockState(1, 'player'))],
};

export const PlayerDrawTwo: Story = {
  name: 'Player Draws 2 Cards (Classic)',
  decorators: [withBattleMock(createDrawMockState(2, 'player'))],
};

export const OpponentDrawOne: Story = {
  name: 'Opponent Draws 1 Card',
  decorators: [withBattleMock(createDrawMockState(1, 'opponent'))],
};

export const OpponentDrawFive: Story = {
  name: 'Opponent Draws 5 Cards (Max)',
  decorators: [withBattleMock(createDrawMockState(5, 'opponent'))],
};
