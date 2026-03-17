import { useState } from "react";
import { withContextLogging } from "../../../../utils/loggingUtils"
import { useBattleStore } from "../../../../store/BattleStore";
import { useBattleEventStore } from "../../../../store/BattleEventStore";
import { useHandStore } from "../../../../store/HandStore";
import { BattleEvent } from "../../../../core/domain/BattleStore";
import { battleService } from "../../../../services/battleService";
import { mapServerCardToEntity } from "../../../../utils/cardUtils";

export const useFieldZone = ({ position, isMonster, isInteractable }: any) => {
    const { event, setEvent, player, opponent } = useBattleStore();
    const { setSelectedFieldIndex, setSelectedTargetIndex, setSelectedFieldArea, selectedAttackerIndex, setBattleData, setSelectedCard } = useBattleEventStore();
    const log = withContextLogging('useFieldZone');

    const handleAttack = async ({ attackerIdx, targetIdx }: any) => {
        try {
            setEvent(BattleEvent.INITIAL);
            const response = await battleService.attack(attackerIdx, targetIdx);
            setBattleData({
                attacker: mapServerCardToEntity(player?.field[attackerIdx]?.card),
                defender: mapServerCardToEntity(opponent?.field[targetIdx]?.card),
                position: opponent?.field[targetIdx]?.position
            });
            await new Promise(resolve => setTimeout(resolve, 5000));
            useBattleStore.getState().setPlayer(response.state.player);
            useBattleStore.getState().setOpponent(response.state.opponent);
        } catch (error: any) {
            console.error("Erro ao realizar ataque:", error.message);
        }
    };

    const [showMenu, setShowMenu] = useState(false);
    const isFaceDown = (position === "face-down-attack" || position === "face-down-defense");

    const onClick = async (index: number) => {
        if (event === BattleEvent.SELECTING_TARGET) {
            setSelectedTargetIndex(index);

            await handleAttack({
                attackerIdx: selectedAttackerIndex,
                targetIdx: index
            });

            setEvent(BattleEvent.INITIAL);
            return;
        }

        if (event === BattleEvent.EQUIP_TARGETING) {
            try {
                const { selectedCard } = useBattleEventStore.getState();
                const monsterCard = player?.field[index]?.card;

                const newState = await battleService.confirmSelection(index);

                const magicEntity = mapServerCardToEntity(selectedCard);
                const monsterEntity = mapServerCardToEntity(monsterCard);

                if (magicEntity && monsterEntity) {
                    const { setEquipAnimData, setPendingBattleState } = useHandStore.getState();
                    const newMosterCard = newState.player?.field[index]?.card;
                    setPendingBattleState(newState);
                    setEquipAnimData({ magicCard: magicEntity, monsterCard: monsterEntity, newMosterCard });
                } else {
                    useBattleStore.getState().setBattle(newState);
                    setEvent(BattleEvent.EQUIP_TARGETING);
                }
                setSelectedCard(null);
                useBattleEventStore.getState().setEquipTargetInfo(null);
            } catch (error: any) {
                console.error("Erro ao equipar:", error.message);
                setEvent(BattleEvent.INITIAL);
            }
            return;
        }

        setShowMenu(!showMenu);
        setEvent(BattleEvent.SELECTING_MODE);
        setSelectedFieldIndex(index);
    }

    const onFocusCard = (index: number) => {
        if (!isInteractable) return;

        const area = isMonster ? "MONSTER" : "MAGIC";
        setSelectedFieldIndex(index);
        setSelectedFieldArea(area);
    }

    return {
        showMenu,
        setShowMenu,
        isFaceDown,
        onClick: log(onClick),
        onFocusCard: log(onFocusCard),
    }
}
