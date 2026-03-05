import React, { useCallback } from "react";
import { FusionAnimationOverlay } from "./FusionAnimationOverlay";
import { useHandStore } from "../../../store/HandStore";
import { useBattleStore } from "../../../store/BattleStore";
import { BattleEvent } from "../../../core/domain/BattleStore";

export const FusionAnimation: React.FC = () => {
  const {
    fusionAnimData,
    clearFusionAnimData,
    pendingBattleState,
    clearPendingBattleState,
    setIsHidden,
  } = useHandStore();
  const { setEvent } = useBattleStore();

  const handleAnimationEnd = useCallback(() => {
    clearFusionAnimData();

    if (pendingBattleState) {
      useBattleStore.getState().setBattle(pendingBattleState);
      clearPendingBattleState();
    }

    setIsHidden(true);
    setEvent(BattleEvent.INITIAL);
  }, [fusionAnimData, pendingBattleState]);

  if (!fusionAnimData) return null;

  return (
    <FusionAnimationOverlay
      materialCards={fusionAnimData.materialCards}
      resultCard={fusionAnimData.resultCard}
      onAnimationEnd={handleAnimationEnd}
    />
  );
};
