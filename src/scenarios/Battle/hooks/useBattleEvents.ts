import { useEffect, useRef, useState } from "react";
import { battleService } from "../../../services/battleService";
import { useBattleEventStore } from "../../../store/BattleEventStore";
import { useBattleStore } from "../../../store/BattleStore";
import { useHandStore } from "../../../store/HandStore";
import { mapServerCardToEntity } from "../../../utils/cardUtils";
import { villainActionsHandlers } from "../../../services/villainActionsService";
import { BattleEvent } from "../../../core/domain/BattleStore";

const isBattleOver = (state: any) =>
  state?.player?.hp === 0 || state?.opponent?.hp === 0;

export const useBattleEvents = ({ onBack, onEnd }: any) => {
    const { clearBattle, currentTurnOwner, player, opponent, setEvent } = useBattleStore();
    const { setBattleData } = useBattleEventStore();
    const { setVisible, setIsHidden } = useHandStore();

    const [isOpponentPlaying, setIsOpponentPlaying] = useState(false);

    // Guard: prevents handleEndBattle from being called more than once,
    // regardless of how many code paths detect hp === 0 simultaneously.
    const isEndingRef = useRef(false);

    const handleEndBattle = async () => {
      if (isEndingRef.current) return;
      isEndingRef.current = true;
      const results = await battleService.saveBattleHistory();
      useBattleStore.getState().setResult(results);
      onEnd();
    };

    // Safety net: catches hp=0 coming from villain spell/trap effects
    // that update the store without going through handleAttack/handleEndTurn.
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
            console.error("Erro ao comprar carta:", error.message);
        }
    };

    const handleEndTurn = async () => {
        try {
            setIsOpponentPlaying(true);

            const response = await battleService.endTurn();

            await processOpponentActions(response.actions, response.state);

            setIsOpponentPlaying(false);

            useBattleStore.getState().setBattle(response.state);

            if (isBattleOver(response.state)) {
              await handleEndBattle();
              return;
            }

            setIsHidden(false);
            await handleDrawCard();
        } catch (error: any) {
            setIsOpponentPlaying(false);
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

            if (isBattleOver(response.state)) {
              await handleEndBattle();
            }
        } catch (error: any) {
            console.error("Erro ao realizar ataque:", error.message);
        }
    };

    return {
        currentTurnOwner,
        isOpponentPlaying,
        handleAbandon,
        handleEndTurn,
        handleAttack
    };
}
