import { useState, useEffect } from "react";
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
  const [phase, setPhase] = useState<FusionPhase>("gather");

  const triggerKey = materialCards.map((c) => c.id).join("-");

  useEffect(() => {
    if (!materialCards.length) return;

    setPhase("gather");

    const timers = [
      setTimeout(() => setPhase("merge"),  900),
      setTimeout(() => setPhase("flash"),  2000),
      setTimeout(() => setPhase("reveal"), 2600),
      setTimeout(() => {
        setPhase("done");
        onAnimationEnd();
      }, 3600),
    ];

    return () => timers.forEach(clearTimeout);
  }, [triggerKey]);

  const isSuccess = resultCard !== null;

  return { phase, isSuccess };
};
