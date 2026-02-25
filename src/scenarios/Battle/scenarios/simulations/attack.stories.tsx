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
                    attackPower: 1700,
                    defensePower: 1900,
                    imageUrl: "images/exemplo_monstro_raro.jpg",
                    description: "Suporte",
                    type: "Íbis",
                    element: "wind",
                    attribute: "monster",
                    stars: 1,
                    modifiers: [],
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
                    attackPower: 1200,
                    defensePower: 1900,
                    imageUrl: "images/exemplo_monstro_raro.jpg",
                    description: "Suporte",
                    type: "Íbis",
                    element: "wind",
                    attribute: "monster",
                    monsterRarity: "COMUM",
                    stars: 1,
                    modifiers: [],
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
    await sleep(500);
    const buttonAttack = await canvas.findByRole("button", { name: /declarar ataque/i });
    await userEvent.click(buttonAttack);
    await sleep(500);
    const opponentMonster = await canvas.findByTestId("field-zone-opponent-0");
    await userEvent.click(opponentMonster);
};

// --- Decorator com Mock de Start e Attack ---

const withBattleMock = (mockData: any, attackResponse?: any) => (Story: any) => {
    const initBattle = useBattleStore((s) => s.initBattle);
    const clearBattle = useBattleStore((s) => s.clearBattle);
    const setEvent = useBattleStore((s) => s.setEvent);
    const { setVisible, setIsHidden } = useHandStore.getState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        useNavigationStore.getState().navigateTo("BATTLE");
        clearBattle();

        // 1. Guardar originais
        // @ts-ignore
        const originalStart = mockBattleModule.startMockBattle;
        const originalAttack = battleService.attack;

        // 2. Mockar o início da batalha (startMockBattle)
        // @ts-ignore
        mockBattleModule.startMockBattle = async (data: any) => {
            console.log("🚀 [Mock] startMockBattle interceptado");
            return { success: true, battleState: data };
        };

        // 3. Mockar a ação de ataque (battleService.attack)
        battleService.attack = async (attackerId: number, targetId: number) => {
            console.log(`⚔️ [Mock] Ataque: ${attackerId} vs ${targetId}`);
            await sleep(500);

            // Retorna o response customizado ou um padrão de sucesso
            return attackResponse || { success: true, message: "Ataque realizado" };
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
                console.error("Erro no mock bootstrap:", e);
            }
        };

        bootstrap();

        // 4. Cleanup
        return () => {
            // @ts-ignore
            mockBattleModule.startMockBattle = originalStart;
            battleService.attack = originalAttack;
        };
    }, [mockData, attackResponse]);

    if (loading) return <div style={{ color: '#fff', padding: '20px' }}>Simulando Batalha...</div>;

    return <Story />;
};

// --- Stories ---

export default {
    title: 'Battle/AttackSimulation',
    component: BattleScenario,
    parameters: { layout: 'fullscreen' },
} as Meta;

export const AttackVsAttack_Wins: StoryObj = {
    decorators: [withBattleMock(BASE_MOCK_STATE, {
        success: true,
        result: "victory",
        state: {
            ...BASE_MOCK_STATE,
            opponent: {
                ...BASE_MOCK_STATE.opponent,
                hp: 7500,
                field: []
            }
        },
        damage: 500
    })],
    play: playAttackSequence,
};

export const AttackVsAttack_Loses: StoryObj = {
    decorators: [withBattleMock({
        ...BASE_MOCK_STATE,
        opponent: {
            ...BASE_MOCK_STATE.opponent,
            field: [{
                ...BASE_MOCK_STATE.opponent.field[0],
                card: { ...BASE_MOCK_STATE.opponent.field[0].card, attackPower: 2500 }
            }]
        }
    }, {
        success: true,
        result: "defeat",
        state: {
            ...BASE_MOCK_STATE,
            player: {
                ...BASE_MOCK_STATE.player,
                hp: 7200,
                field: []
            }
        },
        damage: 800
    })],
    play: playAttackSequence,
};
