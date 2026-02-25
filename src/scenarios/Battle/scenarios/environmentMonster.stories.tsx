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
          id: "24",
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
  opponent: { id: 5, name: "Darius", hp: 8000, field: [], spells: [], graveyard: [], handCount: 0, deckCount: 40 },
  environment: { activeField: null },
  turn: 1,
  currentTurnOwner: "player"
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

const createMockWithEnvironment = (atkMod: number, defMod: number, fieldName: string, targetType: string) => {
  const newState = JSON.parse(JSON.stringify(BASE_MOCK_STATE));

  newState.environment.activeField = {
    id: "field-card-1",
    name: fieldName,
    type: "field",
    effects: [
      {
        target: { type: targetType },
        modifiers: { atk: atkMod, def: defMod }
      }
    ]
  };

  const monsterInField = newState.player.field[0].card;
  if (monsterInField.type === targetType || targetType === "monster") {
    monsterInField.modifiers.push({
      id: "env-mod",
      source: fieldName,
      atk: atkMod,
      def: defMod
    });
    monsterInField.attackPower += atkMod;
    monsterInField.defensePower += defMod;
  }

  return newState;
};

const meta: Meta<typeof BattleScenario> = {
  title: 'Game/BattleScenario/EnvironmentModifiers',
  component: BattleScenario,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof BattleScenario>;

export const FieldBuffActive: Story = {
  name: 'Environment: Vale das Névoas (+500 ATK para Íbis)',
  decorators: [
    withBattleMock(
      createMockWithEnvironment(500, 0, "Vale das Névoas", "Íbis de Thoth")
    )
  ],
};

export const FieldDebuffActive: Story = {
  name: 'Environment: Campo Enfraquecedor (-300 ATK/DEF)',
  decorators: [
    withBattleMock(
      createMockWithEnvironment(-300, -300, "Ziggurat de Cinzas", "Íbis de Thoth")
    )
  ],
};

export const FieldMismatch: Story = {
  name: 'Environment: Ativo mas sem efeito (Tipo Diferente)',
  decorators: [
    withBattleMock(
      createMockWithEnvironment(1000, 1000, "Vulcão Ativo", "Dragão")
    )
  ],
};
