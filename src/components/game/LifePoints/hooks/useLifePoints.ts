import { useState, useEffect, useRef } from "react";
import { useBattleStore } from "../../../../store/BattleStore";

export function useLifePoints(target: "player" | "opponent") {
  const lp = useBattleStore((state) => state[target].lp);
  const name = useBattleStore((state) => state[target].name);

  const [displayLP, setDisplayLP] = useState(lp);
  const [damagePopup, setDamagePopup] = useState<{ id: number; amount: number } | null>(null);
  const prevValueRef = useRef(lp);

  useEffect(() => {
    if (prevValueRef.current !== lp) {
      const diff = lp - prevValueRef.current;
      setDamagePopup({ id: Date.now(), amount: diff });

      const duration = 800;
      const startValue = prevValueRef.current;
      const startTime = performance.now();

      const update = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        const currentTickValue = Math.floor(startValue + (lp - startValue) * eased);
        setDisplayLP(currentTickValue);

        if (progress < 1) requestAnimationFrame(update);
        else setDisplayLP(lp);
      };

      requestAnimationFrame(update);
      prevValueRef.current = lp;
    }
  }, [lp]);

  return {
    displayLP,
    name,
    damagePopup,
    clearPopup: () => setDamagePopup(null),
  };
}
