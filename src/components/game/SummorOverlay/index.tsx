import React, { useState, useEffect } from 'react';
import { Card } from '../Card';
import { MonsterCard } from '../../../core/domain/Card';
import { ActionButton } from './ActionButton';

interface SummonOverlayProps {
  card: MonsterCard;
  onSummon: (mode: 'atk' | 'def' | 'face-down-atk' | 'face-down-def') => void;
  onCancel: () => void;
}

type Mode = 'atk' | 'face-down-atk' | 'def' | 'face-down-def';

export const SummonOverlay: React.FC<SummonOverlayProps> = ({ card, onSummon, onCancel }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const options: { mode: Mode; label: string; subLabel: string; isVertical: boolean }[] = [
    { mode: 'atk', label: 'Invocar', subLabel: 'Modo Ataque', isVertical: true },
    { mode: 'face-down-atk', label: 'Oculto', subLabel: 'Modo Ataque', isVertical: true },
    { mode: 'def', label: 'Invocar', subLabel: 'Modo Defesa', isVertical: false },
    { mode: 'face-down-def', label: 'Oculto', subLabel: 'Defesa Oculto', isVertical: false },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
          break;
        case 'ArrowRight':
          setActiveIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
          break;
        case 'Enter':
          onSummon(options[activeIndex].mode);
          break;
        case 'Escape':
          onCancel();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, onSummon, onCancel]);

  return (
    <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300 backdrop-blur-md bg-black/80">      
      <div className="mb-10 shadow-[0_0_80px_rgba(0,0,0,0.6)] scale-110">
        <Card card={card} />
      </div>

      <div className="flex flex-col items-center gap-8 w-full max-w-2xl px-6">
        <div className="grid grid-cols-4 gap-4 w-full">
          {options.map((opt, index) => (
            <div 
              key={opt.mode} 
              className={`transition-all duration-200 ${activeIndex === index ? 'scale-110' : 'scale-100 opacity-50'}`}
            >
              <ActionButton 
                {...opt}
                onSummon={onSummon}
                // Adicione uma prop isSelected no seu ActionButton para o brilho visual
                isSelected={activeIndex === index} 
              />
            </div>
          ))}
        </div>

        <button 
          onClick={onCancel}
          className="text-[10px] font-bold text-zinc-500 hover:text-red-400 uppercase tracking-[0.4em] transition-colors py-2"
        >
          [ ESC para Cancelar ]
        </button>
      </div>
    </div>
  );
};