import React from "react";
import { MonsterCard, type CardProps } from "../../../core/domain/Card";
import { getAttributeIcon } from "../../../core/utils/CardIcon";
import { renderCardInfo } from "./Info";
import { Star } from "lucide-react";
import { getImageUrl } from "../../../utils/imageUtils";

export const Card: React.FC<CardProps> = ({ card, size = "lg", isFaceDown = false }) => {
  const isMonster = card instanceof MonsterCard;
  const cardStyle = card.getStyle();
  const sizeClasses = {
    lg: "w-72 h-120 p-3",
    md: "w-60 h-96 p-2.5",
    sm: "w-48 h-72 p-2",
    xs: "w-28 h-40 p-1 border-2",
  };
  const isExtraSmall = size === "xs";

  if (isFaceDown) {
    return (
      <div
        className={`${sizeClasses[size]} bg-[#633522] rounded-md relative flex items-center justify-center overflow-hidden shadow-2xl border border-[#7c4a35] transition-all`}
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #2d160a 0px, #2d160a 1px, transparent 1px, transparent 10px)`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-black/40" />
        <div className="relative w-1/2 h-1/2 border-2 border-orange-400/40 rounded flex items-center justify-center rotate-45 bg-black/10">
          <span className="text-2xl font-black text-orange-400/60 -rotate-45">?</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-white/5 to-transparent" />
      </div>
    );
  }

  return (
    <div
      className={`
      ${cardStyle}
      ${sizeClasses[size]}
      rounded-sm shadow-2xl flex flex-col relative
      transition-transform hover:z-50 cursor-pointer select-none
    `}
    >
      <div
        className={`
        flex justify-between items-center bg-white/20 rounded-sm border border-black/10
        ${isExtraSmall ? "px-1 py-0 mb-0.5" : "px-2 py-1 mb-1"}
      `}
      >
        <span
          className={`
          font-black uppercase italic truncate
          ${isExtraSmall ? "text-[7px] max-w-[70%]" : size === "sm" ? "text-[11px]" : "text-xs"}
        `}
        >
          {card.name}
        </span>
        <img
          src={getAttributeIcon(card.typeIcon)}
          alt={card.typeIcon}
          className={`${isExtraSmall ? "w-2.5 h-2.5" : "w-5 h-5"} drop-shadow-md rounded-2xl object-contain`}
        />
      </div>

      {isMonster && (
        <div className={`flex justify-end gap-0.5 px-1 ${isExtraSmall ? "mb-0" : "mb-1"}`}>
          {Array.from({ length: (card as MonsterCard).stars }).map((_, i) => (
            <Star
              key={i}
              size={isExtraSmall ? 8 : 12}
              className="text-yellow-500 fill-yellow-400 drop-shadow-[0_0_2px_rgba(0,0,0,0.5)]"
            />
          ))}
        </div>
      )}

      <div className="flex-1 bg-zinc-900 border border-black/40 overflow-hidden shadow-inner">
        <img src={getImageUrl(card.image)} alt={card.name} className="w-full h-full object-cover" />
      </div>

      {renderCardInfo(card, size, isMonster)}
    </div>
  );
};
