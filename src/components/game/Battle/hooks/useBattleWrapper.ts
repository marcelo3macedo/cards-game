import { useBattleEventStore } from "../../../../store/BattleEventStore";

export const useBattleWrapper = () => {
    const { battleData, clearBattleData } = useBattleEventStore();
    const handleBattleComplete = () => {
        clearBattleData();
    };

    return {
        battleData,
        handleBattleComplete
    }
}
