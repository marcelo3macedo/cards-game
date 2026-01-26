import React from 'react';
import { MonsterCard, BaseCard } from '../../../core/domain/Card';
import { getAttributeIcon } from '../../../core/utils/CardIcon';

interface CardProps {
  card: BaseCard;
  size?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({ card, size = 'md' }) => {
  const isMonster = card instanceof MonsterCard;
  const cardStyle = card.getStyle();

  return (
    <div className={`
      ${cardStyle}
      ${size === 'md' ? 'w-72 h-120 p-3' : 'w-48 h-72 p-2'}
      rounded-sm border-4 shadow-2xl flex flex-col relative
      transition-transform hover:scale-105 cursor-pointer select-none
    `}>
      <div className="flex justify-between items-center bg-white/20 px-2 py-1 rounded-sm mb-1 border border-black/10">
        <span className="font-black uppercase italic text-xs truncate">{card.name}</span>
        <img 
          src={getAttributeIcon(card.typeIcon)} 
          alt={card.typeIcon} 
          className="w-5 h-5 drop-shadow-md object-contain rounded-2xl" 
        />
      </div>

      {isMonster && (
        <div className="flex justify-end gap-0.5 mb-1 px-1">
          {Array.from({ length: (card as MonsterCard).stars }).map((_, i) => (
            <span key={i} className="text-xs drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]">⭐</span>
          ))}
        </div>
      )}

      <div className="flex-1 bg-zinc-900 border-2 border-black/40 overflow-hidden shadow-inner">
        <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
      </div>

      <div className="mt-2 bg-[#D9CCB9] p-2 border border-black/30 min-h-[80px] text-zinc-900">
        <p className="text-[9px] leading-tight font-medium italic pb-2">
          {card.description}
        </p>

        {isMonster && (
          <div className="mt-auto pt-1 border-t border-black/20 flex justify-end gap-3 font-mono font-bold text-[10px]">
            <span>ATK/{(card as MonsterCard).atk}</span>
            <span>DEF/{(card as MonsterCard).def}</span>
          </div>
        )}
      </div>
    </div>
  );
};