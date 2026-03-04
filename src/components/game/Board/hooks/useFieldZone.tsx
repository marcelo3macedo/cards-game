import { useState } from "react";
import { withContextLogging } from "../../../../utils/loggingUtils"
import { useBattleStore } from "../../../../store/BattleStore";
import { useBattleEventStore } from "../../../../store/BattleEventStore";
import { BattleEvent } from "../../../../core/domain/BattleStore";
import { battleService } from "../../../../services/battleService";
import { mapServerCardToEntity } from "../../../../utils/cardUtils";

export const useFieldZone = ({ position, isMonster, isInteractable }: any) => {
    const { event, setEvent, player, opponent } = useBattleStore();
    const { setSelectedFieldIndex, setSelectedTargetIndex, setSelectedFieldArea, selectedAttackerIndex, setBattleData } = useBattleEventStore();
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
