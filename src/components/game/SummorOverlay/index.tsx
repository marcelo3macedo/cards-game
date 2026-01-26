import React from 'react';
import { Card } from '../Card';
import { MonsterCard } from '../../../core/domain/Card';
import { ActionButton } from './ActionButton';

interface SummonOverlayProps {
  card: MonsterCard;
  onSummon: (mode: 'atk' | 'def' | 'face-down-atk' | 'face-down-def') => void;
  onCancel: () => void;
}

export const SummonOverlay: React.FC<SummonOverlayProps> = ({ card, onSummon, onCancel }) => {
  return (
    <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300 backdrop-blur-md bg-black/80">      
      <div className="mb-10 shadow-[0_0_80px_rgba(0,0,0,0.6)] scale-110">
        <Card card={card} />
      </div>

      <div className="flex flex-col items-center gap-8 w-full max-w-2xl px-6">
        <div className="grid grid-cols-4 gap-4 w-full">
          <ActionButton 
            mode="atk" 
            label="Invocar" 
            subLabel="Modo Ataque" 
            isVertical={true}
            onSummon={onSummon}
          />
          <ActionButton 
            mode="face-down-atk" 
            label="Oculto" 
            subLabel="Modo Ataque" 
            isVertical={true} 
            onSummon={onSummon}
          />
          <ActionButton 
            mode="def" 
            label="Invocar" 
            subLabel="Modo Defesa" 
            isVertical={false} 
            onSummon={onSummon}
          />
          <ActionButton 
            mode="face-down-def" 
            label="Oculto" 
            subLabel="Defesa Oculto" 
            isVertical={false} 
            onSummon={onSummon}
          />
        </div>

        <button 
          onClick={onCancel}
          className="text-[10px] font-bold text-zinc-500 hover:text-red-400 uppercase tracking-[0.4em] transition-colors py-2"
        >
          [ Cancelar Invocação ]
        </button>
      </div>
    </div>
  );
};