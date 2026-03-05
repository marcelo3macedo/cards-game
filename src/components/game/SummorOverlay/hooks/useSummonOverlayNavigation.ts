import { useState, useEffect } from "react";
import type { Mode } from "../../../../core/domain/Summon";
import { ActionKey, getActionFromKey } from "../../../../utils/keyUtils";
import { useBattleEventStore } from "../../../../store/BattleEventStore";
import { useBattleStore } from "../../../../store/BattleStore";
import { BattleEvent } from "../../../../core/domain/BattleStore";
import { useHandStore } from "../../../../store/HandStore";
import { battleService } from "../../../../services/battleService";
import { withContextLogging } from "../../../../utils/loggingUtils";

export const useSummonOverlayNavigation = () => {
  const log = withContextLogging('useSummonOverlayNavigation');
  const [activeIndex, setActiveIndex] = useState(0);
  const { selectedCard, setSelectedCard, selectedFieldIndex, fusionCardIndices, clearFusionCardIndices } = useBattleEventStore();
  const { player, event, setEvent } = useBattleStore();
  const { setVisible, setIsHidden } = useHandStore();

  const options: { mode: Mode; label: string; subLabel: string; isVertical: boolean }[] = [
    { mode: "attack", label: "Invocar", subLabel: "Modo Ataque", isVertical: true },
    { mode: "face-down-attack", label: "Oculto", subLabel: "Modo Ataque", isVertical: true },
    { mode: "defense", label: "Invocar", subLabel: "Modo Defesa", isVertical: false },
    { mode: "face-down-defense", label: "Oculto", subLabel: "Defesa Oculto", isVertical: false },
  ];

  const onSummon = async (mode: string) => {
    try {
      if (fusionCardIndices.length > 0) {
        const response = await battleService.summonFusion(fusionCardIndices, mode, selectedFieldIndex);
        useBattleStore.getState().setBattle(response.state);
        clearFusionCardIndices();
      } else {
        const handIndex = player?.hand.findIndex((c:any) => Number(c.id) === Number(selectedCard.id));
        if (handIndex === -1) return;
        const response = await battleService.summonCard(handIndex, mode, selectedFieldIndex);
        useBattleStore.getState().setBattle(response.state);
      }

      setSelectedCard(null);
      setIsHidden(true);
      setEvent(BattleEvent.INITIAL);
    } catch (error: any) {
      console.error(error.message);
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
