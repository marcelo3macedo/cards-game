import { useState, useEffect } from "react";
import type { UseHandNavigationProps } from "../../../../core/domain/Hand";
import { ActionKey, getActionFromKey } from "../../../../utils/keyUtils";
import { useBattleEventStore } from "../../../../store/BattleEventStore";
import { useBattleStore } from "../../../../store/BattleStore";
import { BattleEvent } from "../../../../core/domain/BattleStore";

export const useHandNavigation = ({ cards, isHidden, onSelect }: UseHandNavigationProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { setSelectedCard, setSelectedOrigin, setSelectedFieldArea } = useBattleEventStore();
  const { setEvent } = useBattleStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isHidden || !cards || cards.length === 0) return;

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

  const selectCardHandler = ({ card, isMagic }: any) => {
    const event = isMagic ? BattleEvent.SELECTING_EFFECT : BattleEvent.SELECTING_POSITION;
    console.log(isMagic);
    setSelectedCard(card);
    setEvent(event);
    setSelectedOrigin("hand");
    setSelectedFieldArea(isMagic ? "MAGIC": "MONSTER");

    onSelect();
  }

  return {
    selectedIndex,
    setSelectedIndex,
    selectCardHandler
  };
};
