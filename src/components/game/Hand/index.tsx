import React from "react";
import { Card } from "../Card";
import type { PlayerHandProps } from "../../../core/domain/PlayerHand";
import { useHandNavigation } from "./hooks/useHandNavigation";
import { mapServerCardToEntity } from "../../../utils/cardUtils";

export const PlayerHand: React.FC<PlayerHandProps> = ({ cards, isHidden, onSelect }) => {
  const { selectedIndex, setSelectedIndex, selectCardHandler } = useHandNavigation({
    cards,
    isHidden,
    onSelect
  });

  if (!cards) return;

  return (
    <div
      className={`
        fixed bottom-6 left-0 w-full flex justify-center transition-all duration-500 z-40
        ${isHidden ? "opacity-0 translate-y-32 pointer-events-none" : "opacity-100 translate-y-0"}
      `}
    >
      <div className="flex -space-x-16 px-32 py-10">
        {cards.map((base, i) => {
          const isSelected = i === selectedIndex;
          const card = mapServerCardToEntity(base);
          if (!card) return;

          return (
            <div
              key={card.id || i}
              onClick={() => {
                selectCardHandler(card);
              }}
              onMouseEnter={() => {
                setSelectedIndex(i)
              }}
              className={`
                relative transition-all duration-300 ease-out cursor-pointer
                ${isSelected ? "z-50 -translate-y-12 scale-110" : "z-10 translate-y-0 scale-90"}
              `}
            >
              <div
                className={`
                absolute -inset-1  transition-all duration-300
                ${isSelected ? "ring-4 ring-slate-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]" : "ring-0"}
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
