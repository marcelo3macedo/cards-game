import React from 'react';
import { MonsterCard, type CardProps } from '../../../core/domain/Card';
import { getAttributeIcon } from '../../../core/utils/CardIcon';
import { renderCardInfo } from './Info';

export const Card: React.FC<CardProps> = ({ card, size = 'lg' }) => {
  const isMonster = card instanceof MonsterCard;
  const cardStyle = card.getStyle();
  const sizeClasses = {
    lg: 'w-72 h-120 p-3',
    md: 'w-60 h-96 p-2.5',
    sm: 'w-48 h-72 p-2',
    xs: 'w-28 h-40 p-1 border-2',
  };
  const isExtraSmall = size === 'xs';

  return (
    <div className={`
      ${cardStyle}
      ${sizeClasses[size]}
      rounded-sm shadow-2xl flex flex-col relative
      transition-transform hover:z-50 cursor-pointer select-none
    `}>
      <div className={`
        flex justify-between items-center bg-white/20 rounded-sm border border-black/10
        ${isExtraSmall ? 'px-1 py-0 mb-0.5' : 'px-2 py-1 mb-1'}
      `}>
        <span className={`
          font-black uppercase italic truncate
          ${isExtraSmall ? 'text-[7px] max-w-[70%]' : size === 'sm' ? 'text-[11px]' : 'text-xs'}
        `}>
          {card.name}
        </span>
        <img 
          src={getAttributeIcon(card.typeIcon)} 
          alt={card.typeIcon} 
          className={`${isExtraSmall ? 'w-2.5 h-2.5' : 'w-5 h-5'} drop-shadow-md rounded-2xl object-contain`} 
        />
      </div>

      {isMonster && (
        <div className={`flex justify-end gap-0.5 px-1 ${isExtraSmall ? 'mb-0' : 'mb-1'}`}>
          {Array.from({ length: (card as MonsterCard).stars }).map((_, i) => (
            <span key={i} className={`${isExtraSmall ? 'text-[6px]' : 'text-xs'} drop-shadow-sm`}>
              ⭐
            </span>
          ))}
        </div>
      )}

      <div className="flex-1 bg-zinc-900 border border-black/40 overflow-hidden shadow-inner">
        <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
      </div>

      {renderCardInfo(card, size, isMonster)}
    </div>
  );
};