import { useEffect } from "react";
import { useBattleStore } from "../../../../store/BattleStore";
import { useBattleEventStore } from "../../../../store/BattleEventStore";
import { BattleEvent } from "../../../../core/domain/BattleStore";
import { Sword, Shield } from "lucide-react";
import { battleService } from "../../../../services/battleService";

export const useMagicOverlay = () => {
  const { event, setEvent, player, setBattle } = useBattleStore();
  const { selectedCard, setSelectedCard, selectedOrigin } = useBattleEventStore();

  const handleActivate = async () => {
    if (!selectedCard) return;

    setEvent(BattleEvent.ACTIVE_EFFECT);

    const cardIndex = selectedOrigin === "hand"
      ? player?.hand.findIndex((x:any) => x.id == selectedCard.id)
      : player?.spells.findIndex((x:any) => x.id == selectedCard.id);

    const state = await battleService.activateCard(cardIndex, selectedOrigin);
    setBattle(state);
  };

  const handleSetOnField = () => {
    if (!selectedCard) return;

    if (BattleEvent.SELECTING_EFFECT) {
      setEvent(BattleEvent.SELECTING_POSITION);
    }

    closeOverlay();
  };


  const options = [
    {
      label: "Ativar",
      mode: "ACTIVATE",
      icon: <Sword className="w-6 h-6 text-white" />,
      description: "Ativar efeito agora",
      color: "bg-cyan-600",
      action: handleActivate
    },
    {
      label: "Colocar",
      mode: "SET",
      icon: <Shield className="w-6 h-6 text-white" />,
      description: "Baixar no campo",
      color: "bg-zinc-700",
      action: handleSetOnField
    }
  ];

  const closeOverlay = () => {
    setEvent(BattleEvent.INITIAL);
    setSelectedCard(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeOverlay();
    };

    if (event === BattleEvent.SELECTING_EFFECT) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [event]);

  return {
    selectedCard,
    isVisible: event === BattleEvent.SELECTING_EFFECT || event === BattleEvent.ACTIVATING_EFFECT,
    handleActivate,
    handleSetOnField,
    handleCancel: closeOverlay,
    options
  };
};
