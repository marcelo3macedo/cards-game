import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../Card';
import type { BaseCard } from '../../../core/domain/Card';

interface PlayerHandProps {
  cards: BaseCard[];
  onSelect: (card: BaseCard) => void;
  isHidden: boolean;
}

export const PlayerHand: React.FC<PlayerHandProps> = ({ cards, onSelect, isHidden }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isHidden) return;

      switch (e.key) {
        case 'ArrowLeft':
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 1));
          break;
        case 'ArrowRight':
          setSelectedIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0));
          break;
        case 'Enter':
          if (cards[selectedIndex]) onSelect(cards[selectedIndex]);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cards, selectedIndex, isHidden, onSelect]);

  return (
    <div 
      className={`
        fixed bottom-6 left-0 w-full flex justify-center transition-all duration-500 z-40
        ${isHidden ? 'opacity-0 translate-y-32 pointer-events-none' : 'opacity-100 translate-y-0'}
      `}
    >
      <div 
        ref={containerRef}
        className="flex -space-x-16 px-32 py-10"
      >
        {cards.map((card, i) => {
          const isSelected = i === selectedIndex;

          return (
            <div 
              key={card.id || i}
              onClick={() => {
                setSelectedIndex(i);
                onSelect(card);
              }}
              onMouseEnter={() => setSelectedIndex(i)}
              className={`
                relative transition-all duration-300 ease-out cursor-pointer
                ${isSelected ? 'z-50 -translate-y-12 scale-110' : 'z-10 translate-y-0 scale-90'}
              `}
            >
              <div className={`
                absolute -inset-1  transition-all duration-300
                ${isSelected ? 'ring-4 ring-slate-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]' : 'ring-0'}
              `} />
              
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