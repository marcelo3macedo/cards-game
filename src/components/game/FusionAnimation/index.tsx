import React, { useCallback } from "react";
import { FusionAnimationOverlay } from "./FusionAnimationOverlay";
import { useHandStore } from "../../../store/HandStore";
import { useBattleStore } from "../../../store/BattleStore";
import { BattleEvent } from "../../../core/domain/BattleStore";

export const FusionAnimation: React.FC = () => {
  const { fusionAnimData, clearFusionAnimData, setFocusArea, setVisible } = useHandStore();
  const { setEvent } = useBattleStore();

  const handleAnimationEnd = useCallback(() => {
    clearFusionAnimData();
    setEvent(BattleEvent.FUSION_PLACING);
    setFocusArea("board");
    setVisible(false);
  }, [clearFusionAnimData, setEvent, setFocusArea, setVisible]);

  if (!fusionAnimData) return null;

  return (
    <FusionAnimationOverlay
      materialCards={fusionAnimData.materialCards}
      resultCard={fusionAnimData.resultCard}
      onAnimationEnd={handleAnimationEnd}
    />
  );
};
