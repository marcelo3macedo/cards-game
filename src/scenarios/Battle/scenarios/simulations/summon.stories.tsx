import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import BattleScenario from '../..';
import { useBattleStore } from '../../../../store/BattleStore';
import { useHandStore } from '../../../../store/HandStore';
import { useNavigationStore } from '../../../../store/NavigationStore';
import { BattleEvent } from '../../../../core/domain/BattleStore';

import { startMockBattle as mockBattleModule } from '../../../../services/mockBattle';
import { battleService } from '../../../../services/battleService';

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
};

const BASE_MOCK_STATE = {
    player: {
        id: 1,
        name: "marcelo",
        hp: 8000,
        hand: [MOCK_CARD],
        field: [null, null, null, null, null],
        spells: [null, null, null, null, null],
        graveyard: [],
        canSummon: true,
        deckCount: 35
    },
    opponent: {
        id: 5,
        name: "Darius Blackflare",
        hp: 8000,
        handCount: 2,
        field: [null, null, null, null, null],
        spells: [],
        graveyard: [],
        deckCount: 40
    },
    turn: 3,
    currentTurnOwner: "player"
};

const playSummonSequence = async ({ canvas, userEvent }: any) => {
    const handCard = await canvas.findByTestId("hand-card-0");
    await userEvent.click(handCard);
    await sleep(1000);

    const fieldZone = await canvas.findByTestId("field-zone-player-0");
    await userEvent.click(fieldZone);
    await sleep(1000);

    const summonButton = await canvas.findByTestId("summon-card-attack");
    await userEvent.click(summonButton);
    await sleep(1000);
};

const playSummonDefenseSequence = async ({ canvas, userEvent }: any) => {
    const handCard = await canvas.findByTestId("hand-card-0");
    await userEvent.click(handCard);
    await sleep(1000);

    const fieldZone = await canvas.findByTestId("field-zone-player-0");
    await userEvent.click(fieldZone);
    await sleep(1000);

    const summonButton = await canvas.findByTestId("summon-card-defense");
    await userEvent.click(summonButton);
    await sleep(1000);
};

const playSummonFaceDownSequence = async ({ canvas, userEvent }: any) => {
    const handCard = await canvas.findByTestId("hand-card-0");
    await userEvent.click(handCard);
    await sleep(1000);

    const fieldZone = await canvas.findByTestId("field-zone-player-0");
    await userEvent.click(fieldZone);
    await sleep(1000);

    const summonButton = await canvas.findByTestId("summon-card-face-down-attack");
    await userEvent.click(summonButton);
    await sleep(1000);
};

const playSummonFaceDownDefenseSequence = async ({ canvas, userEvent }: any) => {
    const handCard = await canvas.findByTestId("hand-card-0");
    await userEvent.click(handCard);
    await sleep(1000);

    const fieldZone = await canvas.findByTestId("field-zone-player-0");
    await userEvent.click(fieldZone);
    await sleep(1000);

    const summonButton = await canvas.findByTestId("summon-card-face-down-defense");
    await userEvent.click(summonButton);
    await sleep(1000);
};

const withSummonMock = (mockData: any, summonResponse?: any) => (Story: any) => {
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
        const originalSummon = battleService.summonCard;

        // @ts-ignore
        mockBattleModule.startMockBattle = async (data: any) => {
            console.log("🚀 [Mock] startMockBattle interceptado");
            return { success: true, battleState: data };
        };

        // @ts-ignore
        battleService.summonCard = async (cardId: number, zoneIndex: number, position: string) => {
            console.log(`✨ [Mock] Invocando carta ${cardId} na zona ${zoneIndex} em modo ${position}`);
            await sleep(600);

            return summonResponse || {
                success: true,
                message: "Invocação bem sucedida",
                state: {
                    ...mockData,
                    player: {
                        ...mockData.player,
                        hand: mockData.player.hand.slice(1),
                        field: mockData.player.field.map((f: any, i: number) =>
                            i === zoneIndex ? { card: MOCK_CARD, position } : f
                        )
                    }
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
                setIsHidden(false);
                setLoading(false);
            } catch (e) {
                console.error("Erro no mock bootstrap:", e);
            }
        };

        bootstrap();

        return () => {
            // @ts-ignore
            mockBattleModule.startMockBattle = originalStart;
            battleService.summonCard = originalSummon;
        };
    }, [mockData, summonResponse]);

    if (loading) return <div style={{ color: '#fff', padding: '20px' }}>Simulando Invocação...</div>;

    return <Story />;
};

export default {
    title: 'Battle/SummonSimulation',
    component: BattleScenario,
    parameters: { layout: 'fullscreen' },
} as Meta;

export const SuccessfulAttackModeSummon: StoryObj = {
    decorators: [
      withSummonMock(BASE_MOCK_STATE, {
                success: true,
                message: "Invocação bem sucedida",
                state: {
                    ...BASE_MOCK_STATE,
                    player: {
                        ...BASE_MOCK_STATE.player,
                        hand: [],
                        field: [
                          {
                            card: MOCK_CARD,
                            position: "attack"
                          }, null, null, null, null
                        ]
                    }
                }
            })
    ],
    play: playSummonSequence,
};

export const SuccessfulDefenseModeSummon: StoryObj = {
    decorators: [
      withSummonMock(BASE_MOCK_STATE, {
                success: true,
                message: "Invocação bem sucedida",
                state: {
                    ...BASE_MOCK_STATE,
                    player: {
                        ...BASE_MOCK_STATE.player,
                        hand: [],
                        field: [
                          {
                            card: MOCK_CARD,
                            position: "defense"
                          }, null, null, null, null
                        ]
                    }
                }
            })
    ],
    play: playSummonDefenseSequence,
};

export const SuccessfulFaceDownAttackModeSummon: StoryObj = {
    decorators: [
      withSummonMock(BASE_MOCK_STATE, {
                success: true,
                message: "Invocação bem sucedida",
                state: {
                    ...BASE_MOCK_STATE,
                    player: {
                        ...BASE_MOCK_STATE.player,
                        hand: [],
                        field: [
                          {
                            card: MOCK_CARD,
                            position: "face-down-attack"
                          }, null, null, null, null
                        ]
                    }
                }
            })
    ],
    play: playSummonFaceDownSequence,
};

export const SuccessfulFaceDownDefenseModeSummon: StoryObj = {
    decorators: [
      withSummonMock(BASE_MOCK_STATE, {
                success: true,
                message: "Invocação bem sucedida",
                state: {
                    ...BASE_MOCK_STATE,
                    player: {
                        ...BASE_MOCK_STATE.player,
                        hand: [],
                        field: [
                          {
                            card: MOCK_CARD,
                            position: "face-down-defense"
                          }, null, null, null, null
                        ]
                    }
                }
            })
    ],
    play: playSummonFaceDownDefenseSequence,
};
