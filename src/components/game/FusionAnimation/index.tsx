import React, { useCallback, useEffect } from "react";
import { FusionAnimationOverlay } from "./FusionAnimationOverlay";
import { useHandStore } from "../../../store/HandStore";
import { useBattleStore } from "../../../store/BattleStore";
import { useBattleEventStore } from "../../../store/BattleEventStore";
import { BattleEvent } from "../../../core/domain/BattleStore";

export const FusionAnimation: React.FC = () => {
  const {
    fusionAnimData,
    clearFusionAnimData,
    pendingBattleState,
    clearPendingBattleState,
    setIsHidden,
    setFocusArea,
  } = useHandStore();
  const { setEvent } = useBattleStore();
  const { setSelectedFieldArea } = useBattleEventStore();

  const handleAnimationEnd = useCallback(() => {
    const wasSuccess = fusionAnimData?.resultCard != null;

    clearFusionAnimData();

    if (pendingBattleState) {
      useBattleStore.getState().setBattle(pendingBattleState);
      clearPendingBattleState();
    }

    setIsHidden(true);

    if (wasSuccess) {
      setFocusArea("board");
      setSelectedFieldArea("MONSTER");
      setEvent(BattleEvent.SELECTING_MODE);
    } else {
      setEvent(BattleEvent.INITIAL);
    }
  }, [fusionAnimData, pendingBattleState]);

  // Block all keyboard input while the animation is playing
  useEffect(() => {
    if (!fusionAnimData) return;
    const block = (e: KeyboardEvent) => { e.stopImmediatePropagation(); e.preventDefault(); };
    window.addEventListener("keydown", block, { capture: true });
    return () => window.removeEventListener("keydown", block, { capture: true });
  }, [!!fusionAnimData]);

  if (!fusionAnimData) return null;

  return (
    <FusionAnimationOverlay
      materialCards={fusionAnimData.materialCards}
      resultCard={fusionAnimData.resultCard}
      onAnimationEnd={handleAnimationEnd}
    />
  );
};
