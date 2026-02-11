import { useState, useEffect } from "react";
import type { UseHandNavigationProps } from "../../../../core/domain/Hand";
import { ActionKey, getActionFromKey } from "../../../../utils/keyUtils";
import { useBattleEventStore } from "../../../../store/BattleEventStore";
import { useBattleStore } from "../../../../store/BattleStore";
import { BattleEvent } from "../../../../core/domain/BattleStore";

export const useHandNavigation = ({ cards, isHidden, onSelect }: UseHandNavigationProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { setSelectedCard } = useBattleEventStore();
  const { setEvent } = useBattleStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isHidden || cards.length === 0) return;

      const action = getActionFromKey(e.key);

      switch (action) {
        case ActionKey.Left:
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 1));
          break;
        case ActionKey.Right:
          setSelectedIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0));
          break;
        case ActionKey.Enter:
          if (cards[selectedIndex]) {
            setSelectedCard(cards[selectedIndex]);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cards, selectedIndex, isHidden]);

  const selectCardHandler = (card: any) => {
    setSelectedCard(card);
    setEvent(BattleEvent.SELECTING_POSITION);
    onSelect();
  }

  return {
    selectedIndex,
    setSelectedIndex,
    selectCardHandler
  };
};
