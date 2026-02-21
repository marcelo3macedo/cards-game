import type { Meta, StoryObj } from '@storybook/react';
import BattleScenario from '../..';
import { useBattleStore } from '../../../../store/BattleStore';
import { useHandStore } from '../../../../store/HandStore';
import { useEffect, useState } from 'react';
import { startMockBattle } from '../../../../services/mockBattle';
import { BattleEvent } from '../../../../core/domain/BattleStore';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
        canAttack: true
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
                attackPower: 1200,
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
    handCount: 2,
    deckCount: 40
  },
  turn: 3,
  currentTurnOwner: "player"
};

const playAttackSequence = async ({ canvas, userEvent }: any) => {
  const playerMonster = await canvas.findByTestId("field-zone-player-0");
  await userEvent.click(playerMonster);

  await sleep(1000);

  const buttonAttack = await canvas.findByRole("button", {
    name: /declarar ataque/i,
  });
  await userEvent.click(buttonAttack);

  await sleep(1000);

  const opponentMonster = await canvas.findByTestId("field-zone-opponent-0");
  await userEvent.click(opponentMonster);
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
  title: 'Battle/AttackSimulation',
  component: BattleScenario,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof BattleScenario>;

export const AttackVsAttack_Wins: Story = {
  decorators: [withBattleMock(BASE_MOCK_STATE)],
  play: playAttackSequence,
};

export const AttackVsAttack_Loses: Story = {
  decorators: [withBattleMock({
    ...BASE_MOCK_STATE,
    opponent: {
      ...BASE_MOCK_STATE.opponent,
      field: [{ ...BASE_MOCK_STATE.opponent.field[0], card: { ...BASE_MOCK_STATE.opponent.field[0].card, attackPower: 2500 } }]
    }
  })],
  play: playAttackSequence,
};

export const AttackVsAttack_Draw: Story = {
  decorators: [withBattleMock({
    ...BASE_MOCK_STATE,
    opponent: {
      ...BASE_MOCK_STATE.opponent,
      field: [{ ...BASE_MOCK_STATE.opponent.field[0], card: { ...BASE_MOCK_STATE.opponent.field[0].card, attackPower: 1700 } }]
    }
  })],
  play: playAttackSequence,
};

export const AttackVsDefense_Wins: Story = {
  decorators: [withBattleMock({
    ...BASE_MOCK_STATE,
    opponent: {
      ...BASE_MOCK_STATE.opponent,
      field: [{
        ...BASE_MOCK_STATE.opponent.field[0],
        position: "defense",
        card: { ...BASE_MOCK_STATE.opponent.field[0].card, defensePower: 1000 }
      }]
    }
  })],
  play: playAttackSequence,
};

export const AttackVsDefense_Loses: Story = {
  decorators: [withBattleMock({
    ...BASE_MOCK_STATE,
    opponent: {
      ...BASE_MOCK_STATE.opponent,
      field: [{
        ...BASE_MOCK_STATE.opponent.field[0],
        position: "defense",
        card: { ...BASE_MOCK_STATE.opponent.field[0].card, defensePower: 3000 }
      }]
    }
  })],
  play: playAttackSequence,
};

export const AttackVsDefense_Draw: Story = {
  decorators: [withBattleMock({
    ...BASE_MOCK_STATE,
    opponent: {
      ...BASE_MOCK_STATE.opponent,
      field: [{
        ...BASE_MOCK_STATE.opponent.field[0],
        position: "defense",
        card: { ...BASE_MOCK_STATE.opponent.field[0].card, defensePower: 1700 }
      }]
    }
  })],
  play: playAttackSequence,
};
