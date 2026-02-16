import { Shield, Sword } from "lucide-react";
import type { BaseCard, MonsterCard } from "../../../../core/domain/Card";

export const renderCardInfo = (card: BaseCard, size: string, isMonster: boolean) => {
  const isSmall = size === "sm";
  const isExtraSmall = size === "xs";
  const isBig = size === "lg";

  if (!isMonster && !isBig) return;

  return (
    <div
      className={`
      bg-[#D9CCB9] border border-black/30 text-zinc-900
      ${isExtraSmall ? "mt-0.5 p-0.5 min-h-0" : "mt-2 p-2"}
      ${isSmall ? "min-h-0" : !isExtraSmall ? "min-h-20" : ""}
    `}
    >
      {!isSmall && !isExtraSmall && (
        <p className="text-[9px] leading-tight font-medium italic pb-2">{card.description}</p>
      )}

      {isMonster && (
        <div
          className={`
          mt-auto pt-1 border-t border-black/20 flex justify-end font-mono font-bold
          ${isExtraSmall ? "text-[7px] gap-1.5 border-none pt-0 items-center" : ""}
          ${isSmall ? "text-[8px] gap-1 border-none" : !isExtraSmall ? "text-[10px] gap-3" : ""}
        `}
        >
          <div className="flex items-center gap-0.5">
            {isExtraSmall || isSmall ? (
              <Sword size={isExtraSmall ? 10 : 14} className="text-red-500 mx-1" />
            ) : (
              <span>ATK/</span>
            )}
            <span className={`${isSmall ? "text-[10px]" : isExtraSmall ? "text-[8px]" : ""}`}>
              {(card as MonsterCard).atk}
            </span>
          </div>

          <div className="flex items-center gap-0.5">
            {isExtraSmall || isSmall ? (
              <Shield size={isExtraSmall ? 10 : 14} className="text-blue-500 mx-1" />
            ) : (
              <span>DEF/</span>
            )}
            <span className={`${isSmall ? "text-[10px]" : isExtraSmall ? "text-[8px]" : ""}`}>
              {(card as MonsterCard).def}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
