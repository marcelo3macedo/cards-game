import { useState, useEffect } from "react";
import type { Mode } from "../../../../core/domain/Summon";
import { ActionKey, getActionFromKey } from "../../../../utils/keyUtils";
import { useBattleEventStore } from "../../../../store/BattleEventStore";
import { useBattleStore } from "../../../../store/BattleStore";
import { BattleEvent } from "../../../../core/domain/BattleStore";
import { useHandStore } from "../../../../store/HandStore";
import { battleService } from "../../../../services/battleService";
import { mapServerCardToEntity } from "../../../../utils/cardUtils";
import { withContextLogging } from "../../../../utils/loggingUtils";

export const useSummonOverlayNavigation = () => {
  const log = withContextLogging('useSummonOverlayNavigation');
  const [activeIndex, setActiveIndex] = useState(0);
  const { selectedCard, setSelectedCard, selectedFieldIndex, fusionCardIndices, clearFusionCardIndices } = useBattleEventStore();
  const { player, event, setEvent } = useBattleStore();
  const { setVisible, setIsHidden, fusionMaterialCards, setFusionAnimData, setPendingBattleState } = useHandStore();

  const options: { mode: Mode; label: string; subLabel: string; isVertical: boolean }[] = [
    { mode: "attack", label: "Invocar", subLabel: "Modo Ataque", isVertical: true },
    { mode: "face-down-attack", label: "Oculto", subLabel: "Modo Ataque", isVertical: true },
    { mode: "defense", label: "Invocar", subLabel: "Modo Defesa", isVertical: false },
    { mode: "face-down-defense", label: "Oculto", subLabel: "Defesa Oculto", isVertical: false },
  ];

  const onSummon = async (mode: string) => {
    try {
      if (fusionCardIndices.length > 0) {
        // ── Fusion path ──
        const response = await battleService.summonFusion(fusionCardIndices, mode, selectedFieldIndex);

        const resultEntity = response.wasSuccess
          ? mapServerCardToEntity(response.resultCard)
          : null;

        // Store state to be applied after animation
        setPendingBattleState(response.state);
        clearFusionCardIndices();
        setSelectedCard(null);

        // Hide the SummonOverlay before animation starts
        setEvent(BattleEvent.INITIAL);

        // Trigger fusion animation (FusionAnimation will apply pendingBattleState on complete)
        setFusionAnimData({
          materialCards: fusionMaterialCards,
          resultCard: resultEntity,
        });
      } else {
        // ── Normal summon path ──
        const handIndex = player?.hand?.findIndex(
          (c: any) => Number(c.id) === Number(selectedCard?.id)
        ) ?? -1;

        if (handIndex === -1) {
          console.warn("Card not found in hand, cancelling summon.");
          setEvent(BattleEvent.INITIAL);
          setVisible(true);
          return;
        }

        const response = await battleService.summonCard(handIndex, mode, selectedFieldIndex);
        useBattleStore.getState().setBattle(response.state);

        setSelectedCard(null);
        setIsHidden(true);
        setEvent(BattleEvent.INITIAL);
      }
    } catch (error: any) {
      console.error("Summon error:", error?.message ?? error);
      setEvent(BattleEvent.INITIAL);
      setSelectedCard(null);
    }
  };

  const onCancel = () => {
    setSelectedCard(null);
    clearFusionCardIndices();
    setEvent(BattleEvent.INITIAL);
    setVisible(true);
  };

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
        case ActionKey.Escape:
          onCancel();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, onSummon, onCancel]);

  return {
    activeIndex,
    card: selectedCard,
    options,
    eventType: event,
    onSummon: log(onSummon),
    onCancel: log(onCancel)
  };
};
