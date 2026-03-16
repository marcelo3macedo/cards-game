import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import BattleScenario from '../..';
import { useBattleStore } from '../../../../store/BattleStore';
import { useHandStore } from '../../../../store/HandStore';
import { useNavigationStore } from '../../../../store/NavigationStore';
import { useUIStore } from '../../../../store/UIStore';
import { BattleEvent } from '../../../../core/domain/BattleStore';

import { startMockBattle as mockBattleModule } from '../../../../services/mockBattle';
import { battleService } from '../../../../services/battleService';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const EQUIP_CARD = {
    id: 99,
    name: "Armadura Solar de Rá",
    description: "Equipa um monstro com a força do sol. +500 ATK / +200 DEF.",
    imageUrl: "images/exemplo_monstro_raro.jpg",
    attribute: "equip",
    effectScript: "EQUIP_SPELL",
    effectValue: { atk: 500, def: 200 },
    createdAt: null,
    updatedAt: null,
};

const MONSTER_CARD = {
    id: 24,
    name: "Íbis Mensageiro Vanguarda",
    attackPower: 1700,
    defensePower: 1900,
    imageUrl: "images/exemplo_monstro_raro.jpg",
    description: "Monstro de suporte.",
    type: "Íbis de Thoth",
    element: "wind",
    attribute: "monster",
    monsterRarity: "RARO",
    stars: 1,
    modifiers: [],
};

const BASE_MOCK_STATE = {
    player: {
        id: 1,
        name: "marcelo",
        hp: 8000,
        hand: [EQUIP_CARD],
        field: [
            {
                card: MONSTER_CARD,
                position: "attack",
                canAttack: true,
            }
        ],
        spells: [],
        graveyard: [],
        canSummon: false,
        deckCount: 35,
    },
    opponent: {
        id: 5,
        name: "Darius Blackflare",
        hp: 8000,
        field: [],
        spells: [],
        graveyard: [],
        handCount: 2,
        deckCount: 40,
    },
    turn: 2,
    currentTurnOwner: "player",
};

const buildEquippedState = (atkBonus: number, defBonus: number) => {
    const newState = JSON.parse(JSON.stringify(BASE_MOCK_STATE));
    const monster = newState.player.field[0].card;

    monster.attackPower += atkBonus;
    monster.defensePower += defBonus;
    monster.modifiers = [
        {
            source: EQUIP_CARD.id,
            sourceName: EQUIP_CARD.name,
            atk: atkBonus,
            def: defBonus,
        }
    ];

    newState.player.hand = [];
    newState.player.spells = [];
    newState.player.graveyard = [EQUIP_CARD];

    return newState;
};

// --- Play sequence: hand card → Ativar → select monster field zone ---

const playEquipSequence = async ({ canvas, userEvent }: any) => {
    const equipHandCard = await canvas.findByTestId("hand-card-0");
    await userEvent.click(equipHandCard);
    await sleep(400);

    const activateButton = await canvas.findByRole("button", { name: /ativar/i });
    await userEvent.click(activateButton);
    await sleep(500);

    const playerMonster = await canvas.findByTestId("field-zone-player-0");
    await userEvent.click(playerMonster);
};

// --- Decorator ---

const withEquipMock = (mockData: any, equippedState: any) => (Story: any) => {
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
        const originalActivate = battleService.activateCard;
        const originalConfirm = battleService.confirmSelection;

        // @ts-ignore
        mockBattleModule.startMockBattle = async (data: any) => {
            return { success: true, battleState: data };
        };

        battleService.activateCard = async (_cardIndex: number, _origin: string) => {
            console.log("🔮 [Mock] activateCard — retornando WAITING_SELECTION");
            await sleep(300);
            return {
                status: "WAITING_SELECTION",
                waitingSelection: {
                    targetType: "field",
                    allowedElements: [],
                    message: "Escolha um monstro para equipar.",
                },
            } as any;
        };

        battleService.confirmSelection = async (_fieldIndex: number) => {
            console.log("⚔️ [Mock] confirmSelection — equipando monstro");
            await sleep(300);
            return equippedState as any;
        };

        const bootstrap = async () => {
            try {
                // @ts-ignore
                const savedState = await mockBattleModule.startMockBattle(mockData);
                initBattle(savedState.battleState);
                setEvent(BattleEvent.INITIAL);
                setVisible(true);
                setIsHidden(false);
                useUIStore.getState().setTutorialSeen();
                setLoading(false);
            } catch (e) {
                console.error("Erro no mock bootstrap:", e);
            }
        };

        bootstrap();

        return () => {
            // @ts-ignore
            mockBattleModule.startMockBattle = originalStart;
            battleService.activateCard = originalActivate;
            battleService.confirmSelection = originalConfirm;
        };
    }, []);

    if (loading) return <div style={{ color: '#fff', padding: '20px' }}>Simulando Batalha...</div>;

    return <Story />;
};

// --- Meta ---

export default {
    title: 'Battle/EquipCardSimulation',
    component: BattleScenario,
    parameters: { layout: 'fullscreen' },
    args: { skipIntro: true },
} as Meta;

// --- Stories ---

export const EquipAtkDef: StoryObj = {
    name: 'Equip +500 ATK / +200 DEF',
    decorators: [withEquipMock(BASE_MOCK_STATE, buildEquippedState(500, 200))],
    play: playEquipSequence,
};

export const EquipOnlyAtk: StoryObj = {
    name: 'Equip +800 ATK only',
    decorators: [withEquipMock(
        BASE_MOCK_STATE,
        buildEquippedState(800, 0)
    )],
    play: playEquipSequence,
};

export const EquipHighBuff: StoryObj = {
    name: 'Equip massive +2000 ATK / +1500 DEF',
    decorators: [withEquipMock(
        BASE_MOCK_STATE,
        buildEquippedState(2000, 1500)
    )],
    play: playEquipSequence,
};

export const EquipStatic: StoryObj = {
    name: 'Equip static',
    decorators: [withEquipMock(
        BASE_MOCK_STATE,
        buildEquippedState(200, 150)
    )]
};
