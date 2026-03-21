import { useEffect } from "react";
import { useHandStore } from "../../../../store/HandStore";
import { useBattleEventStore } from "../../../../store/BattleEventStore";
import { useBattleStore } from "../../../../store/BattleStore";
import { ActionKey, getActionFromKey } from "../../../../utils/keyUtils";
import { mapServerCardToEntity } from "../../../../utils/cardUtils";
import { BattleEvent } from "../../../../core/domain/BattleStore";
import { battleService } from "../../../../services/battleService";

const FIELD_SIZE = 5;

export function useBoardNavigation({ isOpponent }: { isOpponent: boolean | undefined }) {
  const { focusArea, setFocusArea, setVisible, endTurnFocused, setEndTurnFocused } = useHandStore();
  const { selectedFieldIndex, selectedFieldArea, setSelectedFieldIndex, setSelectedFieldArea, setViewCard, viewCard, selectedCard, selectedAttackerIndex, setIsSelectingTarget, setBattleData } =
    useBattleEventStore();
  const { player, opponent, event, setEvent } = useBattleStore();

  // Opponent side: keyboard target navigation during SELECTING_TARGET
  useEffect(() => {
    if (!isOpponent) return;
    if (event !== BattleEvent.SELECTING_TARGET) return;

    const handleKeyDown = async (e: KeyboardEvent) => {
      const action = getActionFromKey(e.key);

      switch (action) {
        case ActionKey.Left:
          setSelectedFieldIndex(Math.max(0, selectedFieldIndex - 1));
          break;
        case ActionKey.Right:
          setSelectedFieldIndex(Math.min(FIELD_SIZE - 1, selectedFieldIndex + 1));
          break;
        case ActionKey.Enter: {
          try {
            setEvent(BattleEvent.INITIAL);
            setIsSelectingTarget(false);
            const response = await battleService.attack(selectedAttackerIndex, selectedFieldIndex);
            setBattleData({
              attacker: mapServerCardToEntity(player?.field[selectedAttackerIndex]?.card),
              defender: mapServerCardToEntity(opponent?.field[selectedFieldIndex]?.card),
              position: opponent?.field[selectedFieldIndex]?.position,
            });
            await new Promise((resolve) => setTimeout(resolve, 5000));
            useBattleStore.getState().setPlayer(response.state.player);
            useBattleStore.getState().setOpponent(response.state.opponent);
          } catch (error: any) {
            console.error("Erro ao realizar ataque:", error.message);
          }
          break;
        }
        case ActionKey.Escape:
          setEvent(BattleEvent.INITIAL);
          setIsSelectingTarget(false);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpponent, event, selectedFieldIndex, selectedAttackerIndex, opponent, player]);

  useEffect(() => {
    if (isOpponent) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const action = getActionFromKey(e.key);

      // When endTurn button is focused, only Left returns focus to board
      if (endTurnFocused && focusArea === "board") {
        if (action === ActionKey.Left) setEndTurnFocused(false);
        return;
      }

      if (focusArea !== "board") return;
      if (event === BattleEvent.SELECTING_TARGET) return;

      switch (action) {
        case ActionKey.Left:
          setSelectedFieldIndex(Math.max(0, selectedFieldIndex - 1));
          break;
        case ActionKey.Right:
          if (selectedFieldIndex < FIELD_SIZE - 1) {
            setSelectedFieldIndex(selectedFieldIndex + 1);
          } else if (event === BattleEvent.INITIAL) {
            setEndTurnFocused(true);
          }
          break;
        case ActionKey.Up:
          if (selectedFieldArea === "MAGIC") setSelectedFieldArea("MONSTER");
          break;
        case ActionKey.Down:
          if (selectedFieldArea === "MONSTER") {
            setSelectedFieldArea("MAGIC");
          } else if (selectedFieldArea === "MAGIC") {
            setFocusArea("hand");
            setVisible(true);
          }
          break;
        case ActionKey.Space:
        case ActionKey.Enter: {
          if (
            (event === BattleEvent.SELECTING_POSITION || event === BattleEvent.FUSION_PLACING) &&
            selectedFieldArea === "MONSTER"
          ) {
            setEvent(BattleEvent.SELECTING_MODE);
            break;
          }
          // Open field menu for existing card when idle
          if (event === BattleEvent.INITIAL && selectedFieldArea === "MONSTER") {
            const fieldCard = player?.field?.[selectedFieldIndex]?.card;
            if (fieldCard) setEvent(BattleEvent.SELECTING_MODE);
          }
          break;
        }
        case ActionKey.Escape: {
          if (event === BattleEvent.SELECTING_MODE && !selectedCard) {
            setEvent(BattleEvent.INITIAL);
          }
          break;
        }
        case ActionKey.Info: {
          if (viewCard) break;
          if (selectedFieldArea === "MONSTER") {
            const raw = player?.field?.[selectedFieldIndex]?.card;
            if (raw) setViewCard(mapServerCardToEntity(raw));
          } else if (selectedFieldArea === "MAGIC") {
            const raw = player?.spells?.[selectedFieldIndex];
            if (raw) setViewCard(mapServerCardToEntity(raw));
          }
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpponent, focusArea, selectedFieldIndex, selectedFieldArea, viewCard, player, event, selectedCard, endTurnFocused]);
}
