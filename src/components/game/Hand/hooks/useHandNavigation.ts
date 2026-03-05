import { useState, useEffect } from "react";
import type { UseHandNavigationProps } from "../../../../core/domain/Hand";
import { ActionKey, getActionFromKey } from "../../../../utils/keyUtils";
import { useBattleEventStore } from "../../../../store/BattleEventStore";
import { useBattleStore } from "../../../../store/BattleStore";
import { useHandStore } from "../../../../store/HandStore";
import { BattleEvent } from "../../../../core/domain/BattleStore";
import { mapServerCardToEntity } from "../../../../utils/cardUtils";
import { battleService } from "../../../../services/battleService";

export const useHandNavigation = ({ cards, isHidden, onSelect }: UseHandNavigationProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { setSelectedCard, setSelectedOrigin, setSelectedFieldArea, setViewCard, viewCard, setFusionCardIndices, clearFusionCardIndices } = useBattleEventStore();
  const { setEvent } = useBattleStore();
  const { focusArea, isFusionMode, fusionCardIndices, setFusionMode, toggleFusionCard, clearFusion, setFusionAnimData } = useHandStore();

  const cancelFusion = () => {
    clearFusion();
    clearFusionCardIndices();
    setEvent(BattleEvent.INITIAL);
  };

  const confirmFusion = async () => {
    if (fusionCardIndices.length === 0) return;

    const lastIdx = fusionCardIndices[fusionCardIndices.length - 1];
    const fallbackCard = cards[lastIdx];

    // Map material cards to entities for the animation
    const materialCards = fusionCardIndices
      .map((i) => mapServerCardToEntity(cards[i]))
      .filter(Boolean);

    let fusionCard: any = null;

    try {
      const result = await battleService.checkFusion(fusionCardIndices);
      fusionCard = result.fusionCard ?? null;
    } catch {
      fusionCard = null;
    }

    // Prepare game state (selectedCard + indices) for after the animation
    if (fusionCard) {
      setSelectedCard(fusionCard);
      setFusionCardIndices(fusionCardIndices);
    } else {
      setSelectedCard(fallbackCard);
      clearFusionCardIndices();
    }

    setSelectedOrigin("hand");
    setSelectedFieldArea("MONSTER");
    clearFusion();
    onSelect();

    // Show fusion animation — the animation component will advance to FUSION_PLACING when done
    const resultEntity = fusionCard ? mapServerCardToEntity(fusionCard) : null;
    setFusionAnimData({ materialCards, resultCard: resultEntity });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (focusArea !== "hand" || isHidden || !cards || cards.length === 0) return;

      const action = getActionFromKey(e.key);

      if (isFusionMode) {
        switch (action) {
          case ActionKey.Escape:
            cancelFusion();
            break;
          case ActionKey.Left:
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 1));
            break;
          case ActionKey.Right:
            setSelectedIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0));
            break;
          case ActionKey.Space:
            toggleFusionCard(selectedIndex);
            break;
          case ActionKey.Enter:
            confirmFusion();
            break;
        }
        return;
      }

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
        case ActionKey.Fusion:
          if (!isHidden) {
            clearFusion();
            clearFusionCardIndices();
            setFusionMode(true);
            setEvent(BattleEvent.FUSION_SELECTING);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cards, selectedIndex, isHidden, focusArea, viewCard, isFusionMode, fusionCardIndices]);

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
