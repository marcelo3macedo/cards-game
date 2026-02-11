import { battleService } from "../../../services/battleService";
import { useBattleStore } from "../../../store/BattleStore";

export const useBattleEvents = ({ onBack }: any) => {
    const { clearBattle, currentTurnOwner } = useBattleStore();

    const handleAbandon = () => {
        clearBattle();
        onBack();
    };

    const handleEndTurn = async () => {
        try {
            const response = await battleService.endTurn();
            //await processOpponentActions(response.actions);

            useBattleStore.getState().setBattle(response.state);

            console.log("Ações do Oponente:", response.logs);
        } catch (error: any) {
            console.error("Erro ao encerrar turno:", error.message);
        }
    };

    return {
        currentTurnOwner,
        handleAbandon,
        handleEndTurn
    }
}
