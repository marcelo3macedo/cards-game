import React, { useState, useRef } from 'react';
import { Card } from '../Card';
import type { BaseCard } from '../../../core/domain/Card';

interface PlayerHandProps {
  cards: BaseCard[];
  onSelect: (card: BaseCard) => void;
  isHidden: boolean;
}

export const PlayerHand: React.FC<PlayerHandProps> = ({ cards, onSelect, isHidden }) => {
  const [offsetX, setOffsetX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { left, width } = containerRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - left) / width - 0.5;
    
    setOffsetX(-mouseX * 300);
  };

  const handleMouseLeave = () => {
    setOffsetX(0);
  };

  return (
    <div 
      className={`
        fixed bottom-6 left-0 w-full flex justify-center transition-all duration-500 z-40
        ${isHidden ? 'opacity-0 translate-y-32 pointer-events-none' : 'opacity-100 translate-y-0'}
      `}
    >
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          transform: `translateX(${offsetX}px)`,
          transition: 'transform 0.2s ease-out'
        }}
        className="
          flex -space-x-24 px-32 py-10
          hover:-space-x-12 transition-[spacing] duration-500 ease-in-out
        "
      >
        {cards.map((card, i) => {
          const midIndex = (cards.length - 1) / 2;
          const rotation = (i - midIndex) * 4;
          const translateY = Math.abs(i - midIndex) * 6;

          return (
            <div 
              key={card.id || i}
              onClick={() => onSelect(card)}
              className="
                relative transition-all duration-300 ease-out
                hover:z-50 hover:-translate-y-16 hover:scale-110 hover:rotate-0!
                group
              "
              style={{ 
                transform: `rotate(${rotation}deg) translateY(${translateY}px)` 
              }}
            >
              <div className="absolute -inset-1 bg-blue-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="scale-75 origin-bottom shadow-2xl">
                <Card card={card} size="sm" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};