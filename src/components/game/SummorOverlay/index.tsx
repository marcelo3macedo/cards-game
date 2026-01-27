import React from 'react';
import { Card } from '../Card';
import { ActionButton } from './ActionButton';
import type { SummonOverlayProps } from '../../../core/domain/Summon';
import { useSummonOverlayNavigation } from './hooks/useSummonOverlayNavigation';

export const SummonOverlay: React.FC<SummonOverlayProps> = ({ card, onSummon, onCancel }) => {
  const { options, activeIndex } = useSummonOverlayNavigation({ 
    onSummon,
    onCancel
  });

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