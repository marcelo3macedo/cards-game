import React, { useRef } from "react";
import { Card } from "../Card";
import type { PlayerHandProps } from "../../../core/domain/PlayerHand";
import { useHandNavigation } from "./hooks/useHandNavigation";
import { useHandTouch } from "./hooks/useHandTouch";
import { MonsterCard } from "../../../core/domain/Card";
import { mapServerCardToEntity } from "../../../utils/cardUtils";
import { useHandStore } from "../../../store/HandStore";
import { useIsMobile } from "../../../hooks/useIsMobile";

export const PlayerHand: React.FC<PlayerHandProps> = ({ cards, isHidden, onSelect, canSummon = true }) => {
  const { selectedIndex, setSelectedIndex, selectCardHandler } = useHandNavigation({
    cards,
    isHidden,
    onSelect
  });
  const { isFusionMode, fusionCardIndices, toggleFusionCard, focusArea } = useHandStore();
  const isMobile = useIsMobile();
  const cardSize = isMobile ? "xs" : "sm";

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { handleTouchStart, handleContainerTouchStart, handleTouchEnd, handleTouchMove, longPressTriggered } = useHandTouch({
    cards,
    isMobile,
    selectedIndex,
    setSelectedIndex,
    isFusionMode,
    toggleFusionCard,
    cardRefs,
  });

  if (!cards) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center transition-all duration-500 z-40">
      {isFusionMode && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-purple-900/90 border border-purple-400/60 text-purple-200 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg backdrop-blur-sm pointer-events-none animate-in fade-in duration-200">
          <span className="text-purple-400">⬡</span>
          {isMobile
            ? "MODO FUSÃO — Segure carta: selecionar · Toque: cancelar"
            : "MODO FUSÃO — Espaço: selecionar · Enter: confirmar · ESC: cancelar"}
        </div>
      )}

      <div
        ref={scrollContainerRef}
        onTouchStart={isMobile ? handleContainerTouchStart : undefined}
        onTouchEnd={isMobile ? handleTouchEnd : undefined}
        onTouchMove={isMobile ? handleTouchMove : undefined}
        className={`
          flex items-end py-3 sm:py-6
          ${isMobile
            ? "overflow-x-auto w-full gap-1.5 px-3 scroll-smooth"
            : "gap-2 px-4 justify-center"
          }
        `}
        style={{ scrollbarWidth: "none" }}
      >
        {cards.map((base, i) => {
          const isSelected = i === selectedIndex && focusArea === "hand";
          const card = mapServerCardToEntity(base);
          if (!card) return null;

          const isMonster = card instanceof MonsterCard;
          const isRestrictedMonster = isHidden && isMonster;
          const showSummonLimit = !canSummon && isMonster && !isFusionMode;
          const isFusionSelected = isFusionMode && fusionCardIndices.includes(i);
          const isFusionCount = isFusionSelected ? fusionCardIndices.indexOf(i) + 1 : null;

          return (
            <div
              key={card.id || i}
              ref={(el) => { cardRefs.current[i] = el; }}
              data-testid={`hand-card-${i}`}
              onClick={() => {
                if (longPressTriggered.current) return;

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
              onTouchStart={isMobile ? (e) => { e.stopPropagation(); handleTouchStart(e, i); } : undefined}
              onMouseEnter={() => !isMobile && setSelectedIndex(i)}
              style={{
                transform: `translateY(${isSelected && !isMobile ? -20 : 0}px)`,
                zIndex: isSelected ? 100 : i,
                flexShrink: 0,
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
                  ? "ring-4 ring-purple-400 shadow-[0_0_16px_rgba(192,132,252,0.7)]"
                  : isSelected && !isRestrictedMonster
                    ? isFusionMode
                      ? "ring-4 ring-purple-300/50 shadow-[0_0_8px_rgba(192,132,252,0.3)]"
                      : "ring-4 ring-blue-300 shadow-[0_0_12px_rgba(147,197,253,0.45)]"
                    : "ring-0"}
              `}
              />

              <div className="shadow-2xl relative">
                <Card card={card} size={cardSize} />

                {showSummonLimit && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/80 rounded px-2 py-1.5 text-center">
                      <p className="text-zinc-300 text-[8px] font-bold leading-tight">Você já invocou</p>
                      <p className="text-zinc-300 text-[8px] font-bold leading-tight">nessa rodada</p>
                    </div>
                  </div>
                )}

                {isFusionSelected && isFusionCount !== null && (
                  <div className="absolute top-1 left-1 z-20 w-5 h-5 rounded-full bg-purple-500 border border-purple-300 flex items-center justify-center text-white text-[9px] font-bold pointer-events-none shadow-lg">
                    {isFusionCount}
                  </div>
                )}

                {isFusionMode && !isFusionSelected && isSelected && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                    <div className="bg-purple-900/60 rounded px-1.5 py-0.5 text-purple-200 text-[8px] font-bold tracking-wider">
                      {isMobile ? "SEGURE" : "ESPAÇO"}
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
