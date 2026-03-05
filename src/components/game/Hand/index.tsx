import React from "react";
import { Card } from "../Card";
import type { PlayerHandProps } from "../../../core/domain/PlayerHand";
import { useHandNavigation } from "./hooks/useHandNavigation";
import { MonsterCard } from "../../../core/domain/Card";
import { mapServerCardToEntity } from "../../../utils/cardUtils";
import { useHandStore } from "../../../store/HandStore";

export const PlayerHand: React.FC<PlayerHandProps> = ({ cards, isHidden, onSelect }) => {
  const { selectedIndex, setSelectedIndex, selectCardHandler } = useHandNavigation({
    cards,
    isHidden,
    onSelect
  });
  const { isFusionMode, fusionCardIndices, toggleFusionCard } = useHandStore();

  if (!cards) return null;

  return (
    <div
      className={`
        fixed bottom-0 left-0 w-full flex justify-center transition-all duration-500 z-40
        opacity-100 translate-y-0"
      `}
    >
      {isFusionMode && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-purple-900/90 border border-purple-400/60 text-purple-200 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg backdrop-blur-sm pointer-events-none animate-in fade-in duration-200">
          <span className="text-purple-400">⬡</span>
          MODO FUSÃO — Espaço: selecionar · Enter: confirmar · ESC: cancelar
        </div>
      )}

      <div className="flex -space-x-20 px-32 py-10 items-end">
        {cards.map((base, i) => {
          const isSelected = i === selectedIndex;
          const card = mapServerCardToEntity(base);
          if (!card) return null;

          const midIndex = (cards.length - 1) / 2;
          const rotation = (i - midIndex) * 1;

          const isMonster = card instanceof MonsterCard;
          const isRestrictedMonster = isHidden && isMonster;
          const isFusionSelected = isFusionMode && fusionCardIndices.includes(i);
          const isFusionCount = isFusionSelected ? fusionCardIndices.indexOf(i) + 1 : null;

          return (
            <div
              key={card.id || i}
              data-testid={`hand-card-${i}`}
              onClick={() => {
                if (isFusionMode) {
                  toggleFusionCard(i);
                  return;
                }

                if (isRestrictedMonster) return;

                if (isHidden && !isMonster) {
                  selectCardHandler({ card, isMagic: true });
                  return;
                }

                selectCardHandler({ card, isMagic: !isMonster });
              }}
              onMouseEnter={() => setSelectedIndex(i)}
              style={{
                transform: `rotate(${rotation}deg) translateY(${isSelected ? -28 : 0}px) scale(${isSelected ? 1 : 1})`,
                zIndex: isSelected ? 100 : i,
              }}
              className={`
                relative transition-all duration-300 ease-out
                ${isRestrictedMonster && !isFusionMode ? "opacity-40 cursor-not-allowed filter grayscale-[0.5]" : "cursor-pointer opacity-100"}
              `}
            >
              <div
                className={`
                absolute -inset-1 transition-all duration-300
                ${isFusionSelected
                  ? "ring-2 ring-purple-400 shadow-[0_0_16px_rgba(192,132,252,0.7)]"
                  : isSelected && !isRestrictedMonster
                    ? isFusionMode
                      ? "ring-2 ring-purple-300/50 shadow-[0_0_8px_rgba(192,132,252,0.3)]"
                      : "ring-2 ring-blue-300 shadow-[0_0_12px_rgba(147,197,253,0.45)]"
                    : "ring-0"}
              `}
              />

              <div className="shadow-2xl relative">
                <Card card={card} size="sm" />

                {isFusionSelected && isFusionCount !== null && (
                  <div className="absolute top-1 left-1 z-20 w-5 h-5 rounded-full bg-purple-500 border border-purple-300 flex items-center justify-center text-white text-[9px] font-bold pointer-events-none shadow-lg">
                    {isFusionCount}
                  </div>
                )}

                {isFusionMode && !isFusionSelected && isSelected && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                    <div className="bg-purple-900/60 rounded px-1.5 py-0.5 text-purple-200 text-[8px] font-bold tracking-wider">
                      ESPAÇO
                    </div>
                  </div>
                )}

                {!isFusionMode && (
                  <div className={`absolute top-1 right-1 z-10 w-4 h-4 rounded-full bg-zinc-900/80 border border-white/30 flex items-center justify-center text-white text-[9px] font-bold pointer-events-none transition-opacity duration-200 ${isSelected ? "opacity-100" : "opacity-30"}`}>
                    i
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
