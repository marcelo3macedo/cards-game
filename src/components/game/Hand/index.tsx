import React from "react";
import { Card } from "../Card";
import type { PlayerHandProps } from "../../../core/domain/PlayerHand";
import { useHandNavigation } from "./hooks/useHandNavigation";
import { mapServerCardToEntity } from "../../../utils/cardUtils";
import { MonsterCard } from "../../../core/domain/Card";

export const PlayerHand: React.FC<PlayerHandProps> = ({ cards, isHidden, onSelect }) => {
  const { selectedIndex, setSelectedIndex, selectCardHandler } = useHandNavigation({
    cards,
    isHidden,
    onSelect
  });

  if (!cards) return null;

  return (
    <div
      className={`
        fixed bottom-6 left-0 w-full flex justify-center transition-all duration-500 z-40
        opacity-100 translate-y-0"
      `}
    >
      <div className="flex -space-x-20 px-32 py-10 items-end">
        {cards.map((base, i) => {
          const isSelected = i === selectedIndex;
          const card = mapServerCardToEntity(base);
          if (!card) return null;

          const midIndex = (cards.length - 1) / 2;
          const rotation = (i - midIndex) * 1;

          const isMonster = card instanceof MonsterCard;
          const isRestrictedMonster = isHidden && isMonster;

          return (
            <div
              key={card.id || i}
              onClick={() => {
                if (isRestrictedMonster) return;

                if (isHidden && !isMonster) {
                  selectCardHandler({ card, isMagic: true });
                  return;
                }

                selectCardHandler({ card });
              }}
              onMouseEnter={() => setSelectedIndex(i)}
              style={{
                transform: `rotate(${rotation}deg) translateY(${isSelected ? -48 : 0}px) scale(${isSelected ? 1.1 : 1})`,
                zIndex: isSelected ? 100 : i,
              }}
              className={`
                relative transition-all duration-300 ease-out
                ${isRestrictedMonster ? "opacity-40 cursor-not-allowed filter grayscale-[0.5]" : "cursor-pointer opacity-100"}
              `}
            >
              <div
                className={`
                absolute -inset-1 transition-all duration-300
                ${isSelected && !isRestrictedMonster ? "ring-4 ring-slate-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]" : "ring-0"}
              `}
              />

              <div className="shadow-2xl">
                <Card card={card} size="sm" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
