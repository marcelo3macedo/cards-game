import { useState, useEffect, useMemo } from "react";
import impactHitSrc from "../../../../assets/sounds/impact_hit.mp3";
import type { BattleAnimationOverlayProps } from "../../../../core/domain/BattleAnimation";

export type BattlePhase = "intro" | "confront" | "impact" | "resolve" | "damage";

export const useBattleSequence = ({
  attacker,
  defender,
  position,
  onAnimationEnd,
}: BattleAnimationOverlayProps) => {
  const [phase, setPhase] = useState<BattlePhase>("intro");

  const attackerId = attacker?.id || attacker?.name;
  const defenderId = defender?.id || defender?.name;
  const isDirectAttack = !defender;

  const defenderValue = useMemo(() => {
    if (isDirectAttack) return 0;
    return ["defense", "face-down-defense"].includes(position) ? defender.def : defender.atk;
  }, [isDirectAttack, defender]);

  const damageDiff = ["defense", "face-down-defense"].includes(position)
    ? 0
    : attacker?.atk - defenderValue;

  useEffect(() => {
    if (!attackerId) return;

    setPhase("intro");

    const timers = [
      setTimeout(() => setPhase("confront"), 1000),
      setTimeout(() => {
        setPhase("impact");
        const hit = new Audio(impactHitSrc);
        hit.volume = 1.0;
        hit.play().catch(() => {});
      }, 2500),
      setTimeout(() => setPhase("resolve"), 3500),
      setTimeout(() => setPhase("damage"), 3500),
      setTimeout(() => {
        const result = isDirectAttack
          ? "direct_hit"
          : damageDiff > 0
            ? "attacker_wins"
            : damageDiff < 0
              ? "defender_wins"
              : "draw";
        onAnimationEnd(result);
      }, 5000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [attackerId, defenderId]);

  return {
    phase,
    isDirectAttack,
    defenderValue,
    damageDiff,
  };
};
