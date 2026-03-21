import { useState, useEffect, useRef } from "react";
import type { UseHandNavigationProps } from "../../../../core/domain/Hand";
import { ActionKey, getActionFromKey } from "../../../../utils/keyUtils";
import { useBattleEventStore } from "../../../../store/BattleEventStore";
import { useBattleStore } from "../../../../store/BattleStore";
import { useHandStore } from "../../../../store/HandStore";
import { BattleEvent } from "../../../../core/domain/BattleStore";
import { mapServerCardToEntity } from "../../../../utils/cardUtils";
import { MonsterCard } from "../../../../core/domain/Card";
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
  const { setSelectedCard, setSelectedOrigin, setSelectedFieldArea, setViewCard, setSelectedFieldIndex, viewCard, setFusionCardIndices, clearFusionCardIndices } = useBattleEventStore();
  const { player, setEvent } = useBattleStore();
  const { focusArea, setFocusArea, setVisible, isFusionMode, fusionCardIndices, setFusionMode, toggleFusionCard, clearFusion, setFusionMaterialCards, endTurnFocused, setEndTurnFocused } = useHandStore();

  const cancelFusion = () => {
    clearFusion();
    clearFusionCardIndices();
    setEvent(BattleEvent.INITIAL);
  };

  const confirmFusion = () => {
    if (fusionCardIndices.length === 0) return;

    const materialEntities = fusionCardIndices
      .map((i) => mapServerCardToEntity(cards[i]))
      .filter(Boolean);
    setFusionMaterialCards(materialEntities);

    setFusionCardIndices(fusionCardIndices);

    clearFusion();
    setSelectedOrigin("hand");
    setSelectedFieldArea("MONSTER");
    setEvent(BattleEvent.FUSION_PLACING);
    setFocusArea("board");
    setVisible(false);
    onSelect();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const action = getActionFromKey(e.key);

      // When endTurn button is focused, only Left returns focus to hand
      if (endTurnFocused && focusArea === "hand") {
        if (action === ActionKey.Left) setEndTurnFocused(false);
        return;
      }

      if (focusArea !== "hand" || isHidden || !cards || cards.length === 0) return;

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
          if (selectedIndex < cards.length - 1) {
            setSelectedIndex((prev) => prev + 1);
          } else {
            setEndTurnFocused(true);
          }
          break;
        case ActionKey.Enter: {
          const raw = cards[selectedIndex];
          if (!raw) break;
          const card = mapServerCardToEntity(raw);
          if (!card) break;
          const isMonster = card instanceof MonsterCard;
          const isRestrictedMonster = isHidden && isMonster;
          if (isRestrictedMonster) break;
          const isMagic = isHidden && !isMonster ? true : !isMonster;
          const battleEvent = isMagic ? BattleEvent.SELECTING_EFFECT : BattleEvent.SELECTING_POSITION;
          setSelectedCard(card);
          setEvent(battleEvent);
          setSelectedOrigin("hand");
          setSelectedFieldArea(isMagic ? "MAGIC" : "MONSTER");
          setFocusArea("board");
          setVisible(false);
          onSelect();
          const index =
            player?.field?.findIndex(item => item === null) ?? -1;

          const result = index >= 0 ? index : 0;
          setSelectedFieldIndex(result);
          break;
        }
        case ActionKey.Info:
          if (!viewCard && cards[selectedIndex]) {
            setViewCard(mapServerCardToEntity(cards[selectedIndex]));
          }
          break;
        case ActionKey.Space:
        case ActionKey.Fusion:
          if (!isHidden) {
            clearFusion();
            clearFusionCardIndices();
            setFusionMode(true);
            setEvent(BattleEvent.FUSION_SELECTING);
            toggleFusionCard(selectedIndex);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cards, selectedIndex, isHidden, focusArea, viewCard, isFusionMode, fusionCardIndices, endTurnFocused]);

  const selectCardHandler = ({ card, isMagic }: any) => {
    const event = isMagic ? BattleEvent.SELECTING_EFFECT : BattleEvent.SELECTING_POSITION;
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
