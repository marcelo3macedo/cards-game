import type React from "react";
import { BattleAnimationOverlay } from "./BattleAnimationOverlay";
import { useBattleWrapper } from "./hooks/useBattleWrapper";

export const BattleAnimation: React.FC<any> = () => {
  const { battleData, handleBattleComplete } = useBattleWrapper();

  if (!battleData) return;

  return (
    <BattleAnimationOverlay
      attacker={battleData.attacker}
      defender={battleData.defender}
      onAnimationEnd={handleBattleComplete}
    />
  );
};
