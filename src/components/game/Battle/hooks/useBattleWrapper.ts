import { useBattleEventStore } from "../../../../store/BattleEventStore";
import { useCallback } from "react";

export const useBattleWrapper = () => {
    const { battleData, clearBattleData } = useBattleEventStore();

    const handleBattleComplete = useCallback(() => {
        clearBattleData();
    }, [clearBattleData]);

    return {
        battleData,
        handleBattleComplete
    }
}
