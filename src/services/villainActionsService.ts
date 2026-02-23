import { BattleEvent } from "../core/domain/BattleStore";
import { useBattleEventStore } from "../store/BattleEventStore";
import { useBattleStore } from "../store/BattleStore";
import { mapServerCardToEntity } from "../utils/cardUtils";

export const villainActionsHandlers: Record<string, (action: any, state: any, setBattleData: any) => Promise<void>> = {
    handCountUpdated: async (action) => {
        const { opponent, setOpponent } = useBattleStore.getState();
        const newOpponent = {
            ...opponent,
            handCount: action.handCount,
        } as any;

        setOpponent(newOpponent);
        await new Promise(resolve => setTimeout(resolve, 1000));
    },
    summon: async (action) => {
        const { opponent, setOpponent } = useBattleStore.getState();
        if (!opponent) return;

        const newField = [...(opponent.field || [])];

        const index = action.data.index || 0;
        newField[index] = action.data;

        const newOpponent = {
            ...opponent,
            field: newField,
            handCount: action.handCount,
        };

        setOpponent(newOpponent);

        await new Promise(resolve => setTimeout(resolve, 1000));
    },
    attack: async (action) => {
        const { setBattleData } = useBattleEventStore.getState();
        const { attacker, target, position } = action.data;
        if (!target) {
            setBattleData({
                attacker: mapServerCardToEntity(attacker),
                defender: null
            });
        } else {
            setBattleData({
                attacker: mapServerCardToEntity(attacker),
                defender: mapServerCardToEntity(target),
                position
            });
        }

        await new Promise(resolve => setTimeout(resolve, 5500));
    },
    changePosition: async (action) => {
        const { opponent, setOpponent } = useBattleStore.getState();
        if (!opponent || !opponent.field) return;

        const { index, position } = action;
        const newField = [...opponent.field];

        if (newField[index]) {
            newField[index] = {
                ...newField[index],
                position: position
            };

            const newOpponent = {
                ...opponent,
                field: newField,
            };

            setOpponent(newOpponent);
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
    },
    activate: async (action) => {
        const { opponent, setEvent, setOpponent, setBattle } = useBattleStore.getState();
        const { setSelectedCard } = useBattleEventStore.getState();

        const newOpponent = {
            ...opponent,
            handCount: action.handCount,
        } as any;

        setOpponent(newOpponent);

        const activatingCard = mapServerCardToEntity(action.card);
        setSelectedCard(activatingCard);
        setEvent(BattleEvent.ACTIVE_EFFECT);

        await new Promise(resolve => setTimeout(resolve, 2000));

        setBattle(action.newState);
    },
    set: async (action) => {
        const { opponent, setOpponent } = useBattleStore.getState();
        if (!opponent) return;

        const newSpells = [...(opponent.spells || [])];

        const index = action.data.index || 0;
        newSpells[index] = action.data.card;

        const newOpponent = {
            ...opponent,
            spells: newSpells,
            handCount: action.data.handCount,
        };

        setOpponent(newOpponent);

        await new Promise(resolve => setTimeout(resolve, 1000));
    },
    reveal: async (action) => {
        const { player, setPlayer } = useBattleStore.getState();
        if (!player || !player.field) return;

        const fieldIndex = action.targetIdx;

        if (player.field[fieldIndex]) {
            const newField = [...player.field];
            const cardSlot = { ...newField[fieldIndex] };

            if (cardSlot.position && cardSlot.position.includes('face-down-')) {
                cardSlot.position = cardSlot.position.replace('face-down-', '');
            }

            newField[fieldIndex] = cardSlot;

            const newPlayerState = {
                ...player,
                field: newField
            };

            setPlayer(newPlayerState);
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}
