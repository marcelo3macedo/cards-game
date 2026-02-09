import { useState, useEffect } from "react";
import type { Mode } from "../../../../core/domain/Summon";
import { ActionKey, getActionFromKey } from "../../../../utils/keyUtils";

export const useSummonOverlayNavigation = ({ onSummon, onCancel }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const options: { mode: Mode; label: string; subLabel: string; isVertical: boolean }[] = [
    { mode: "atk", label: "Invocar", subLabel: "Modo Ataque", isVertical: true },
    { mode: "face-down-atk", label: "Oculto", subLabel: "Modo Ataque", isVertical: true },
    { mode: "def", label: "Invocar", subLabel: "Modo Defesa", isVertical: false },
    { mode: "face-down-def", label: "Oculto", subLabel: "Defesa Oculto", isVertical: false },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const action = getActionFromKey(e.key);

      switch (action) {
        case ActionKey.Left:
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
          break;
        case ActionKey.Right:
          setActiveIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
          break;
        case ActionKey.Enter:
          onSummon(options[activeIndex].mode);
          break;
        case ActionKey.Space:
          onCancel();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, onSummon, onCancel]);

  return {
    activeIndex,
    options,
  };
};
