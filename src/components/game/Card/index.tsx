import React from 'react';
import { MonsterCard, BaseCard } from '../../../core/domain/Card';
import { getAttributeIcon } from '../../../core/utils/CardIcon';
import { renderCardInfo } from './Info';

interface CardProps {
  card: BaseCard;
  size?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({ card, size = 'lg' }) => {
  const isMonster = card instanceof MonsterCard;
  const cardStyle = card.getStyle();
  const sizeClasses = {
    lg: 'w-72 h-120 p-3',
    md: 'w-60 h-96 p-2.5',
    sm: 'w-48 h-72 p-2',
  };

  return (
    <div className={`
      ${cardStyle}
      ${sizeClasses[size]}
      rounded-sm border-4 shadow-2xl flex flex-col relative
      transition-transform hover:scale-105 cursor-pointer select-none
    `}>
      <div className="flex justify-between items-center bg-white/20 px-2 py-1 rounded-sm mb-1 border border-black/10">
        <span className={`
          font-black uppercase italic truncate
          ${size === 'sm' ? 'text-[11px] leading-tight max-w-[80%]' : 'text-xs'}
        `}>
          {card.name}
        </span>
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

      {renderCardInfo(card, size, isMonster)}
    </div>
  );
};