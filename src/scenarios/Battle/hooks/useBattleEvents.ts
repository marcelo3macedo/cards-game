import { useEffect } from "react";
import { battleService } from "../../../services/battleService";
import { useBattleEventStore } from "../../../store/BattleEventStore";
import { useBattleStore } from "../../../store/BattleStore";
import { useHandStore } from "../../../store/HandStore";
import { mapServerCardToEntity } from "../../../utils/cardUtils";
import { villainActionsHandlers } from "../../../services/villainActionsService";

export const useBattleEvents = ({ onBack, onEnd }: any) => {
    const { clearBattle, currentTurnOwner, player, opponent } = useBattleStore();
    const { setBattleData } = useBattleEventStore();
    const { setVisible, setIsHidden } = useHandStore();

    useEffect(() => {
      if (player?.hp === 0 || opponent?.hp === 0) {
        handleEndBattle();
      }
    }, [player, opponent]);

    const handleAbandon = () => {
        clearBattle();
        onBack();
    };

    const handleDrawCard = async () => {
        try {
            const response = await battleService.onDraw();
            useBattleStore.getState().setBattle(response.state);
            setVisible(true);
        } catch (error: any) {
            console.error("Erro ao encerrar turno:", error.message);
        }
    }

    const handleEndTurn = async () => {
        try {
            const response = await battleService.endTurn();

            await processOpponentActions(response.actions, response.state);

            useBattleStore.getState().setBattle(response.state);

            if (response.state.player.hp === 0 || response.state.opponent.hp === 0) {
              handleEndBattle();
            }

            setIsHidden(false);
            await handleDrawCard();
        } catch (error: any) {
            console.error("Erro ao encerrar turno:", error.message);
        }
    };

    const processOpponentActions = async (actions: any[], state: any) => {
      for (const action of actions) {
        const handler = villainActionsHandlers[action.type];

        if (handler) {
          await handler(action, state, setBattleData);
        } else {
          console.warn("Ação desconhecida:", action.type);
        }
      }
    };

    const handleAttack = async ({ attackerIdx, targetIdx }: any) => {
        try {
            const response = await battleService.attack(attackerIdx, targetIdx);
            setBattleData({
              attacker: mapServerCardToEntity(player?.field[attackerIdx]?.card),
              defender: mapServerCardToEntity(opponent?.field[targetIdx]?.card),
              position: opponent?.field[targetIdx]?.position
            });

            await new Promise(resolve => setTimeout(resolve, 6500));

            useBattleStore.getState().setPlayer(response.state.player);
            useBattleStore.getState().setOpponent(response.state.opponent);

            if (response.state.player.hp === 0 || response.state.opponent.hp === 0) {
              handleEndBattle();
            }
        } catch (error: any) {
            console.error("Erro ao encerrar turno:", error.message);
        }
    }

    const handleEndBattle = async () => {
      const results = await battleService.saveBattleHistory();
      useBattleStore.getState().setResult(results);
      onEnd();
    }

    return {
        currentTurnOwner,
        handleAbandon,
        handleEndTurn,
        handleAttack
    }
}
