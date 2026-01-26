import type { BaseCard, MonsterCard } from "../../../../core/domain/Card";

export const renderCardInfo = (card: BaseCard, size: string, isMonster: boolean) => {
  const isSmall = size === "sm";

  return (
    <div className={`
      mt-2 bg-[#D9CCB9] p-2 border border-black/30 text-zinc-900
      ${isSmall ? "min-h-0" : "min-h-20"}
    `}>
      {!isSmall && (
        <p className="text-[9px] leading-tight font-medium italic pb-2">
          {card.description}
        </p>
      )}

      {isMonster && (
        <div className={`
          mt-auto pt-1 border-t border-black/20 flex justify-end font-mono font-bold
          ${isSmall ? "text-[8px] gap-1 border-none" : "text-[10px] gap-3"}
        `}>
          <span className={`${isSmall ? "text-[12px]": ""}`}>ATK/{(card as MonsterCard).atk}</span>
          <span className={`${isSmall ? "text-[12px]": ""}`}>DEF/{(card as MonsterCard).def}</span>
        </div>
      )}
    </div>
  );
};