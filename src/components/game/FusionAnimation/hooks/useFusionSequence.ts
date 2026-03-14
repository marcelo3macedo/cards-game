import { useState, useEffect, useRef } from "react";
import type { BaseCard } from "../../../../core/domain/Card";

export type FusionPhase = "gather" | "merge" | "flash" | "reveal" | "done";

interface UseFusionSequenceProps {
  materialCards: BaseCard[];
  resultCard: BaseCard | null;
  onAnimationEnd: () => void;
}

export const useFusionSequence = ({
  materialCards,
  resultCard,
  onAnimationEnd,
}: UseFusionSequenceProps) => {
  const totalRounds = Math.max(1, materialCards.length - 1);
  const [currentRound, setCurrentRound] = useState(0);
  const [phase, setPhase] = useState<FusionPhase>("gather");
  const onAnimationEndRef = useRef(onAnimationEnd);
  onAnimationEndRef.current = onAnimationEnd;

  const triggerKey = materialCards.map((c) => c.id).join("-");

  useEffect(() => {
    if (!materialCards.length) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Both success and fail run all N rounds so every card pair is shown.
    // Only the final reveal differs: result card (success) vs throw (fail).
    const runRound = (round: number) => {
      setCurrentRound(round);
      setPhase("gather");
      const isLast = round === totalRounds - 1;

      timers.push(
        // Right card starts sliding toward left card
        setTimeout(() => setPhase("merge"), 700),
        // Collision flash
        setTimeout(() => setPhase("flash"), 1300),
        // Flash ends → next round or final reveal
        setTimeout(() => {
          if (isLast) setPhase("reveal");
          else runRound(round + 1);
        }, 1650),
      );

      if (isLast) {
        // Success: hold result card longer; Fail: throw animation is shorter
        timers.push(
          setTimeout(() => {
            setPhase("done");
            onAnimationEndRef.current();
          }, resultCard != null ? 2800 : 2350),
        );
      }
    };

    runRound(0);

    return () => timers.forEach(clearTimeout);
  }, [triggerKey]);

  const isSuccess = resultCard !== null;
  const isLastRound = currentRound === totalRounds - 1;

  return { phase, isSuccess, isLastRound, currentRound, totalRounds };
};
