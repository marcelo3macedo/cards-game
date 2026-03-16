import { useState, useEffect, useRef } from "react";

export type EquipPhase = "gather" | "merge" | "flash" | "reveal" | "done";

interface UseEquipSequenceProps {
  triggerKey: string;
  onAnimationEnd: () => void;
}

export const useEquipSequence = ({ triggerKey, onAnimationEnd }: UseEquipSequenceProps) => {
  const [phase, setPhase] = useState<EquipPhase>("gather");
  const onEndRef = useRef(onAnimationEnd);
  onEndRef.current = onAnimationEnd;

  useEffect(() => {
    if (!triggerKey) return;

    setPhase("gather");
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(
      setTimeout(() => setPhase("merge"), 600),
      setTimeout(() => setPhase("flash"), 1100),
      setTimeout(() => setPhase("reveal"), 1450),
      setTimeout(() => {
        setPhase("done");
        onEndRef.current();
      }, 2600),
    );

    return () => timers.forEach(clearTimeout);
  }, [triggerKey]);

  return { phase };
};
