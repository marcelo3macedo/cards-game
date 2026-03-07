import { useState, useEffect, useRef } from "react";
import type { UseHandNavigationProps } from "../../../../core/domain/Hand";
import { ActionKey, getActionFromKey } from "../../../../utils/keyUtils";
import { useBattleEventStore } from "../../../../store/BattleEventStore";
import { useBattleStore } from "../../../../store/BattleStore";
import { useHandStore } from "../../../../store/HandStore";
import { BattleEvent } from "../../../../core/domain/BattleStore";
import { mapServerCardToEntity } from "../../../../utils/cardUtils";
import uiSoundSrc from "../../../../assets/sounds/ui_sound.mp3";

export const useHandNavigation = ({ cards, isHidden, onSelect }: UseHandNavigationProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) { isMounted.current = true; return; }
    const audio = new Audio(uiSoundSrc);
    audio.volume = 1.0;
    audio.play().catch(() => {});
  }, [selectedIndex]);
  const { setSelectedCard, setSelectedOrigin, setSelectedFieldArea, setViewCard, viewCard, setFusionCardIndices, clearFusionCardIndices } = useBattleEventStore();
  const { setEvent } = useBattleStore();
  const { focusArea, setFocusArea, setVisible, isFusionMode, fusionCardIndices, setFusionMode, toggleFusionCard, clearFusion, setFusionMaterialCards } = useHandStore();

  const cancelFusion = () => {
    clearFusion();
    clearFusionCardIndices();
    setEvent(BattleEvent.INITIAL);
  };

  const confirmFusion = () => {
    if (fusionCardIndices.length === 0) return;

    // Map material cards to entities — stored for the animation (used later in onSummon)
    const materialEntities = fusionCardIndices
      .map((i) => mapServerCardToEntity(cards[i]))
      .filter(Boolean);
    setFusionMaterialCards(materialEntities);

    // Store indices so SummonOverlay can call summonFusion
    setFusionCardIndices(fusionCardIndices);

    clearFusion();
    setSelectedOrigin("hand");
    setSelectedFieldArea("MONSTER");
    // Advance directly to field selection — API + animation happen after user picks position
    setEvent(BattleEvent.FUSION_PLACING);
    setFocusArea("board");
    setVisible(false);
    onSelect();
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
