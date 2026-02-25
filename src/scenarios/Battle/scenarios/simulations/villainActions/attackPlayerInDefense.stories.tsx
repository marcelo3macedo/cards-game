import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { useBattleStore } from '../../../../../store/BattleStore';
import { useHandStore } from '../../../../../store/HandStore';
import { useNavigationStore } from '../../../../../store/NavigationStore';
import { BattleEvent } from '../../../../../core/domain/BattleStore';

import { battleService } from '../../../../../services/battleService';
import { startMockBattle as mockBattleModule } from '../../../../../services/mockBattle';
import BattleScenario from '../../..';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_CARD = {
    id: 99,
    name: "Carta Comprada",
    description: "Efeito de compra de turno.",
    imageUrl: "images/exemplo_monstro_raro.jpg",
    type: "Guerreiro",
    element: "light",
    attribute: "monster",
    stars: 4,
    attackPower: 2000,
    defensePower: 1000,
    modifiers: [],
};

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
                    attackPower: 1200,
                    defensePower: 1200,
                    modifiers: [],
                    effectScript: null,
                    effectValue: null,
                },
                position: "defense",
                canAttack: true
            }
        ],
        spells: [],
        graveyard: [],
        canSummon: false,
        deckCount: 30
    },
    opponent: {
        id: 5,
        name: "Darius Blackflare",
        hp: 8000,
        field: [],
        spells: [],
        graveyard: [],
        handCount: 5,
        deckCount: 35
    },
    turn: 1,
    currentTurnOwner: "player"
};

const playEndTurnSequence = async ({ canvas, userEvent }: any) => {
    const endTurnBtn = await canvas.findByTestId("button-endturn");
    await userEvent.click(endTurnBtn);
};

const withTurnMock = (mockData: any, endTurnResponse?: any) => (Story: any) => {
    const initBattle = useBattleStore((s) => s.initBattle);
    const clearBattle = useBattleStore((s) => s.clearBattle);
    const setEvent = useBattleStore((s) => s.setEvent);
    const { setVisible, setIsHidden } = useHandStore.getState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        useNavigationStore.getState().navigateTo("BATTLE");
        clearBattle();

        // @ts-ignore
        const originalStart = mockBattleModule.startMockBattle;
        const originalEndTurn = battleService.endTurn;

        // @ts-ignore
        mockBattleModule.startMockBattle = async (data: any) => {
            return { success: true, battleState: data };
        };

        battleService.endTurn = async () => {
            console.log("🔄 [Mock] Finalizando turno do jogador...");
            await sleep(800);

            return endTurnResponse || {
                success: true,
                actions: [
                    { type: 'phaseChange', phase: 'OPPONENT_TURN' },
                    { type: 'phaseChange', phase: 'PLAYER_DRAW_PHASE' },
                    { type: 'draw', card: MOCK_CARD }
                ],
                state: {
                    ...mockData,
                    player: {
                        ...mockData.player,
                        hand: [MOCK_CARD],
                        deckCount: mockData.player.deckCount - 1,
                        canSummon: true
                    },
                    turn: mockData.turn + 1,
                    currentTurnOwner: "player"
                }
            };
        };

        const bootstrap = async () => {
            try {
                // @ts-ignore
                const savedState = await mockBattleModule.startMockBattle(mockData);
                initBattle(savedState.battleState);
                setEvent(BattleEvent.INITIAL);
                setVisible(true);
                setIsHidden(true);
                setLoading(false);
            } catch (e) {
                console.error("Erro no bootstrap:", e);
            }
        };

        bootstrap();

        return () => {
            // @ts-ignore
            mockBattleModule.startMockBattle = originalStart;
            battleService.endTurn = originalEndTurn;
        };
    }, [mockData, endTurnResponse]);

    if (loading) return <div style={{ color: '#fff', padding: '20px' }}>Iniciando Duelo...</div>;

    return <Story />;
};

export default {
    title: 'Battle/VillainActions',
    component: BattleScenario,
    parameters: { layout: 'fullscreen' },
} as Meta;

export const AttackPlayerInDefenseModeAndWins: StoryObj = {
    decorators: [
        withTurnMock(
            BASE_MOCK_STATE,
            {
                actions: [
                    {
                        type: 'handCountUpdated', handCount: 3
                    },
                    {
                        type: 'summon',
                        data: {
                            card: {
                                id: 24,
                                name: "Íbis Mensageiro Vanguarda",
                                description: "Monstro de suporte.",
                                imageUrl: "images/exemplo_monstro_raro.jpg",
                                type: "Íbis de Thoth",
                                element: "wind",
                                attribute: "monster",
                                stars: 1,
                                attackPower: 1900,
                                defensePower: 1900,
                                modifiers: [],
                                effectScript: null,
                                effectValue: null,
                            },
                            position: "attack",
                            canAttack: true,
                            index: 0
                        },
                        handCount: 2
                    },
                    {
                        type: 'attack',
                        data: {
                            attacker: {
                                id: 24,
                                name: "Íbis Mensageiro Vanguarda",
                                description: "Monstro de suporte.",
                                imageUrl: "images/exemplo_monstro_raro.jpg",
                                type: "Íbis de Thoth",
                                element: "wind",
                                attribute: "monster",
                                stars: 1,
                                attackPower: 1900,
                                defensePower: 1900,
                                modifiers: [],
                                effectScript: null,
                                effectValue: null,
                            },
                            target: {
                                id: 24,
                                name: "Íbis Mensageiro Vanguarda",
                                description: "Monstro de suporte.",
                                imageUrl: "images/exemplo_monstro_raro.jpg",
                                type: "Íbis de Thoth",
                                element: "wind",
                                attribute: "monster",
                                stars: 1,
                                attackPower: 1200,
                                defensePower: 1200,
                                modifiers: [],
                                effectScript: null,
                                effectValue: null
                            },
                            position: "defense"
                        }
                    }
                ],
                state: {
                    ...BASE_MOCK_STATE,
                    player: {
                        ...BASE_MOCK_STATE.player,
                        field: []
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
                                    attackPower: 1900,
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
                        handCount: 2,
                        deckCount: 40
                    },
                    currentTurnOwner: "player",
                    turn: 4
                }
            }
        )
    ],
    play: playEndTurnSequence,
};
