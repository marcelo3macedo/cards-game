import { useState, useEffect } from "react";
import type { UseHandNavigationProps } from "../../../../core/domain/Hand";
import { ActionKey, getActionFromKey } from "../../../../utils/keyUtils";
import { useBattleEventStore } from "../../../../store/BattleEventStore";
import { useBattleStore } from "../../../../store/BattleStore";
import { useHandStore } from "../../../../store/HandStore";
import { BattleEvent } from "../../../../core/domain/BattleStore";
import { mapServerCardToEntity } from "../../../../utils/cardUtils";

export const useHandNavigation = ({ cards, isHidden, onSelect }: UseHandNavigationProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { setSelectedCard, setSelectedOrigin, setSelectedFieldArea, setViewCard, viewCard } = useBattleEventStore();
  const { setEvent } = useBattleStore();
  const { focusArea } = useHandStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (focusArea !== "hand" || isHidden || !cards || cards.length === 0) return;

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
        case ActionKey.Info:
          if (!viewCard && cards[selectedIndex]) {
            setViewCard(mapServerCardToEntity(cards[selectedIndex]));
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cards, selectedIndex, isHidden, focusArea, viewCard]);

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
