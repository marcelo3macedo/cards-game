import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { useBattleStore } from '../../../store/BattleStore';
import { useHandStore } from '../../../store/HandStore';
import { BattleEvent } from '../../../core/domain/BattleStore';
import BattleScenario from '..';
import { startMockBattle } from '../../../services/mockBattle';

// --- MOCK STATE BASE ---
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
    handCount: 3,
    deckCount: 40
  },
  turn: 1,
  currentTurnOwner: "player"
};

// --- HELPERS PARA MOCKS DINÂMICOS ---

const createMockWithModifiers = (atkMod: number, defMod: number, sourceName: string) => {
  const newState = JSON.parse(JSON.stringify(BASE_MOCK_STATE));
  const card = newState.player.field[0].card;

  card.modifiers = [{ id: "mod-1", source: sourceName, atk: atkMod, def: defMod }];
  card.attackPower += atkMod;
  card.defensePower += defMod;

  return newState;
};

const createDrawTriggerMock = () => {
  const newState = JSON.parse(JSON.stringify(BASE_MOCK_STATE));

  // Adiciona uma carta "Armadilha" no campo do oponente
  newState.opponent.spells = [
    {
      id: "trap-001",
      card: {
        id: 99,
        name: "Sentinela do Abismo",
        description: "Ativa quando o oponente compra uma carta: cause 500 de dano.",
        imageUrl: "/images/cards/trap_example.jpg",
        type: "Trap",
        element: "dark",
        attribute: "spell",
      },
      status: "set" // Virada para baixo, pronta para ativar
    }
  ];
  return newState;
};

// --- DECORATOR PRINCIPAL ---

const withBattleMock = (mockData: any, simulateDrawTrigger = false) => (Story: any) => {
  const initBattle = useBattleStore((s) => s.initBattle);
  const setEvent = useBattleStore((s) => s.setEvent);
  const updateBattle = useBattleStore((s) => s.setBattle); // Supondo que você tenha essa action
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

      // Simulação do Evento de Draw com Trigger do Oponente
      if (simulateDrawTrigger) {
        setTimeout(() => {
          setTimeout(() => {
            const triggeredState = JSON.parse(JSON.stringify(savedState.battleState));

            triggeredState.opponent.spells[0].status = "active";
            triggeredState.player.hp -= 500; // Efeito da carta: dano
            triggeredState.player.deckCount -= 1; // Comprou a carta

            updateBattle(triggeredState);
            console.log("Trigger: Sentinela do Abismo ativada!");
          }, 2000);
        }, 1500);
      }
    };
    bootstrap();
  }, [mockData, simulateDrawTrigger]);

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

export const DrawWithOpponentTrigger: Story = {
  name: 'Draw Phase (Opponent Trap Trigger)',
  decorators: [withBattleMock(createDrawTriggerMock(), true)],
};
