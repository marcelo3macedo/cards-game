import { useState, useEffect } from "react";
import type { Mode } from "../../../../core/domain/Summon";
import { ActionKey, getActionFromKey } from "../../../../utils/keyUtils";
import { useBattleEventStore } from "../../../../store/BattleEventStore";
import { useBattleStore } from "../../../../store/BattleStore";
import { BattleEvent } from "../../../../core/domain/BattleStore";
import { useHandStore } from "../../../../store/HandStore";
import { battleService } from "../../../../services/battleService";

export const useSummonOverlayNavigation = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { selectedCard, setSelectedCard } = useBattleEventStore();
  const { player, event, setEvent } = useBattleStore();
  const { setVisible, setIsHidden } = useHandStore();

  const options: { mode: Mode; label: string; subLabel: string; isVertical: boolean }[] = [
    { mode: "atk", label: "Invocar", subLabel: "Modo Ataque", isVertical: true },
    { mode: "face-down-atk", label: "Oculto", subLabel: "Modo Ataque", isVertical: true },
    { mode: "def", label: "Invocar", subLabel: "Modo Defesa", isVertical: false },
    { mode: "face-down-def", label: "Oculto", subLabel: "Defesa Oculto", isVertical: false },
  ];

  const onSummon = async (mode: string) => {
    try {
      const handIndex = player?.hand.findIndex((c:any) => Number(c.id) === Number(selectedCard.id));
      if (handIndex === -1) return;

      const position = mode.includes("def") ? "defense" : "attack"
      const newState = await battleService.summonCard(handIndex, position);

      useBattleStore.getState().setBattle(newState);

      setSelectedCard(null);
      setIsHidden(true);
      setEvent(BattleEvent.INITIAL);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const onCancel = () => {
    setSelectedCard(null);
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
    onSummon,
    onCancel
  };
};
