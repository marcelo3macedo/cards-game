import React, { useCallback, useEffect } from "react";
import { EquipAnimationOverlay } from "./EquipAnimationOverlay";
import { useHandStore } from "../../../store/HandStore";
import { useBattleStore } from "../../../store/BattleStore";
import { BattleEvent } from "../../../core/domain/BattleStore";
import { useBattleEventStore } from "../../../store/BattleEventStore";

export const EquipAnimation: React.FC = () => {
  const {
    equipAnimData,
    clearEquipAnimData,
    pendingBattleState,
    clearPendingBattleState,
  } = useHandStore();
  const { setEvent } = useBattleStore();
  const { setIsSelectingTarget } = useBattleEventStore();

  const handleAnimationEnd = useCallback(() => {
    clearEquipAnimData();

    if (pendingBattleState) {
      useBattleStore.getState().setBattle(pendingBattleState);
      clearPendingBattleState();
    }

    setEvent(BattleEvent.INITIAL);
    setIsSelectingTarget(false);
  }, [equipAnimData, pendingBattleState]);

  useEffect(() => {
    if (!equipAnimData) return;
    const block = (e: KeyboardEvent) => {
      e.stopImmediatePropagation();
      e.preventDefault();
    };
    window.addEventListener("keydown", block, { capture: true });
    return () => window.removeEventListener("keydown", block, { capture: true });
  }, [!!equipAnimData]);

  if (!equipAnimData) return null;

  return (
    <EquipAnimationOverlay
      magicCard={equipAnimData.magicCard}
      monsterCard={equipAnimData.monsterCard}
      newMosterCard={equipAnimData.newMosterCard}
      onAnimationEnd={handleAnimationEnd}
    />
  );
};
