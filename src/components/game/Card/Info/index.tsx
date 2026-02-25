import { Shield, Sword } from "lucide-react";
import type { BaseCard, MonsterCard } from "../../../../core/domain/Card";

export const renderCardInfo = (card: BaseCard, size: string, isMonster: boolean) => {
  const isSmall = size === "sm";
  const isExtraSmall = size === "xs";
  const isBig = size === "lg";

  if (!isMonster && !isBig) return null;

  const monster = card as MonsterCard;

  const totalModAtk = monster.modifiers?.reduce((acc: number, mod: any) => acc + (mod.atk || 0), 0) || 0;
  const totalModDef = monster.modifiers?.reduce((acc: number, mod: any) => acc + (mod.def || 0), 0) || 0;

  const tooltipContent = monster.modifiers?.length
    ? "Modificadores:\n" + monster.modifiers
        .map((m: any) => `• ${m.source}: ${m.atk > 0 ? '+' : ''}${m.atk} ATK / ${m.def > 0 ? '+' : ''}${m.def} DEF`)
        .join('\n')
    : undefined;

  const getStatusClasses = (modValue: number) => {
    if (modValue > 0) {
      return "text-emerald-600 scale-110";
    }
    if (modValue < 0) {
      return "text-red-600 scale-110";
    }
    return "text-zinc-900";
  };

  return (
    <div
      title={tooltipContent}
      className={`
      bg-[#D9CCB9] border border-black/30 text-zinc-900 transition-all duration-300
      ${isExtraSmall ? "mt-0.5 p-0.5 min-h-0" : "mt-2 p-2"}
      ${isSmall ? "min-h-0" : !isExtraSmall ? "min-h-20" : ""}
      ${monster.modifiers?.length ? "cursor-help bg-[#e2d7c7]" : ""}
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
            {!isExtraSmall && !isSmall && <span>ATK/</span>}
            {(isExtraSmall || isSmall) && <Sword size={isExtraSmall ? 10 : 14} className="text-red-500 mx-1" />}
            <span className={`
              ${isSmall ? "text-[10px]" : isExtraSmall ? "text-[8px]" : ""}
              ${getStatusClasses(totalModAtk)}
              inline-block transition-all
            `}>
              {monster.atk}
            </span>
          </div>
          <div className="flex items-center gap-0.5">
            {!isExtraSmall && !isSmall && <span>DEF/</span>}
            {(isExtraSmall || isSmall) && <Shield size={isExtraSmall ? 10 : 14} className="text-blue-500 mx-1" />}
            <span className={`
              ${isSmall ? "text-[10px]" : isExtraSmall ? "text-[8px]" : ""}
              ${getStatusClasses(totalModDef)}
              inline-block transition-all
            `}>
              {monster.def}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
