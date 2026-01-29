import { useState, useEffect } from "react";
import type { UseHandNavigationProps } from "../../../../core/domain/Hand";

export const useHandNavigation = ({ cards, isHidden, onSelect }: UseHandNavigationProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isHidden || cards.length === 0) return;

      switch (e.key) {
        case "ArrowLeft":
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 1));
          break;
        case "ArrowRight":
          setSelectedIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0));
          break;
        case "Enter":
          if (cards[selectedIndex]) {
            onSelect(cards[selectedIndex]);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cards, selectedIndex, isHidden, onSelect]);

  return {
    selectedIndex,
    setSelectedIndex,
  };
};
