import type { Meta, StoryObj } from '@storybook/react';
import BattleScenario from '../../..';
import { useBattleStore } from '../../../../../store/BattleStore';
import { useHandStore } from '../../../../../store/HandStore';
import { useEffect, useState } from 'react';
import { battleService } from '../../../../../services/battleService';
import { startMockBattle } from '../../../../../services/mockBattle';
import { BattleEvent } from '../../../../../core/domain/BattleStore';
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
                    attackPower: 1200,
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
        field: [],
        spells: [],
        graveyard: [],
        handCount: 2,
        deckCount: 40
    },
    turn: 3,
    currentTurnOwner: "player"
};

const MOCK_VILLAIN_RESPONSE = {
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
                    defensePower: 1900,
                    modifiers: [],
                    effectScript: null,
                    effectValue: null,
                }
            }
        }
    ],
    state: {
        ...BASE_MOCK_STATE,
        player: {
            ...BASE_MOCK_STATE.player,
            hp: 7300,
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
};

const playEndTurnSequence = async ({ canvas, userEvent }: any) => {
    const endTurnClick = await canvas.findByTestId("button-endturn");
    await userEvent.click(endTurnClick);
};

const withBattleMock = (mockData: any, endTurnResponse?: any) => (Story: any) => {
    const initBattle = useBattleStore((s) => s.initBattle);
    const setEvent = useBattleStore((s) => s.setEvent);
    const { setVisible, setIsHidden } = useHandStore.getState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const originalEndTurn = battleService.endTurn;

        battleService.endTurn = async () => {
            await sleep(1000);
            return endTurnResponse || MOCK_VILLAIN_RESPONSE;
        };

        const bootstrap = async () => {
            const savedState = await startMockBattle(mockData);
            initBattle(savedState.battleState);
            setEvent(BattleEvent.INITIAL);
            setVisible(true);
            setIsHidden(true);
            setLoading(false);
        };

        bootstrap();

        return () => {
            battleService.endTurn = originalEndTurn;
        };
    }, [mockData]);

    if (loading) return <div style={{ color: '#fff', padding: '20px' }}>Carregando cenário...</div>;

    return <Story />;
};

const meta: Meta<typeof BattleScenario> = {
    title: 'Battle/VillainActions',
    component: BattleScenario,
    parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof BattleScenario>;

export const AttackPlayerAndWins: Story = {
    decorators: [withBattleMock(BASE_MOCK_STATE)],
    play: playEndTurnSequence,
};
