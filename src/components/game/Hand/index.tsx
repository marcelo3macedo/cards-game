import React, { useRef, useEffect } from "react";
import { Card } from "../Card";
import type { PlayerHandProps } from "../../../core/domain/PlayerHand";
import { useHandNavigation } from "./hooks/useHandNavigation";
import { MonsterCard } from "../../../core/domain/Card";
import { mapServerCardToEntity } from "../../../utils/cardUtils";
import { useHandStore } from "../../../store/HandStore";
import { useIsMobile } from "../../../hooks/useIsMobile";

export const PlayerHand: React.FC<PlayerHandProps> = ({ cards, isHidden, onSelect }) => {
  const { selectedIndex, setSelectedIndex, selectCardHandler } = useHandNavigation({
    cards,
    isHidden,
    onSelect
  });
  const { isFusionMode, fusionCardIndices, toggleFusionCard } = useHandStore();
  const isMobile = useIsMobile();
  const cardSize = isMobile ? "xs" : "sm";

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!isMobile) return;
    const el = cardRefs.current[selectedIndex];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [selectedIndex, isMobile]);

  if (!cards) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    const threshold = 40;
    if (delta > threshold) {
      setSelectedIndex((prev) => Math.min(prev + 1, cards.length - 1));
    } else if (delta < -threshold) {
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    }
    touchStartX.current = null;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center transition-all duration-500 z-40">
      {isFusionMode && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-purple-900/90 border border-purple-400/60 text-purple-200 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg backdrop-blur-sm pointer-events-none animate-in fade-in duration-200">
          <span className="text-purple-400">⬡</span>
          MODO FUSÃO — Espaço: selecionar · Enter: confirmar · ESC: cancelar
        </div>
      )}

      <div
        ref={scrollContainerRef}
        onTouchStart={isMobile ? handleTouchStart : undefined}
        onTouchEnd={isMobile ? handleTouchEnd : undefined}
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
          const isSelected = i === selectedIndex;
          const card = mapServerCardToEntity(base);
          if (!card) return null;

          const isMonster = card instanceof MonsterCard;
          const isRestrictedMonster = isHidden && isMonster;
          const isFusionSelected = isFusionMode && fusionCardIndices.includes(i);
          const isFusionCount = isFusionSelected ? fusionCardIndices.indexOf(i) + 1 : null;

          return (
            <div
              key={card.id || i}
              ref={(el) => { cardRefs.current[i] = el; }}
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
              onMouseEnter={() => !isMobile && setSelectedIndex(i)}
              style={{
                transform: `translateY(${isSelected ? -20 : 0}px)`,
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
                  ? "ring-2 ring-purple-400 shadow-[0_0_16px_rgba(192,132,252,0.7)]"
                  : isSelected && !isRestrictedMonster
                    ? isFusionMode
                      ? "ring-2 ring-purple-300/50 shadow-[0_0_8px_rgba(192,132,252,0.3)]"
                      : "ring-2 ring-blue-300 shadow-[0_0_12px_rgba(147,197,253,0.45)]"
                    : "ring-0"}
              `}
              />

              <div className="shadow-2xl relative">
                <Card card={card} size={cardSize} />

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
