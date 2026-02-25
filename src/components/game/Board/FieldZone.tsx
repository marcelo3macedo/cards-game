import { AnimatePresence } from "framer-motion";
import { Shield } from "lucide-react";
import { Card } from "../Card";
import { FieldZoneMenu } from "./FieldZoneMenu";
import { useFieldZone } from "./hooks/useFieldZone";

export function FieldZone({
  index,
  cardData,
  isInteractable,
  isSelected,
  isFocused,
  isOpponent,
  isMonster
}: any) {
  const { card, position } = cardData || {};
  const {
    showMenu, setShowMenu, isFaceDown, onClick, onFocusCard
  } = useFieldZone({ position, isMonster, isInteractable });

  const themeColors = isOpponent
    ? {
        border: "border-blue-500/20",
        bg: "bg-zinc-900/80",
        interact: "border-red-400/50 bg-red-900/20",
        ring: "ring-red-500 border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
      }
    : {
        border: "border-blue-500/20",
        bg: "bg-zinc-900/80",
        interact: "border-blue-400/50 bg-blue-900/20",
        ring: "ring-blue-400 border-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
      };

  return (
    <div
      onClick={() => { onClick(index) }}
      onMouseEnter={() => onFocusCard(index)}
      onMouseLeave={() => setShowMenu(false)}
      className={`
        w-24 h-32 border-2 rounded-lg flex items-center justify-center relative transition-all duration-300
        ${card ? "border-solid shadow-lg" : "border-dashed cursor-default"}
        ${!card && isInteractable ? themeColors.interact : `${themeColors.border} ${themeColors.bg}`}
        ${isFocused && !isSelected && !isOpponent ? `ring-4 ${themeColors.ring} scale-105 z-20` : ""}
        ${isSelected ? "border-yellow-400 border-4 shadow-[0_0_20px_rgba(250,204,21,0.4)] scale-105 z-30" : ""}
      `}
      data-testid={`field-zone-${isOpponent ? 'opponent' : 'player'}-${index}`}
    >
      <AnimatePresence>
        {showMenu && card && (
          <FieldZoneMenu
            card={card}
            mode={position}
            canAttack={cardData?.canAttack}
            index={index}
            isOpponent={isOpponent}
            isMonster={isMonster}
            onEnd={() => { setShowMenu(false) }}
          />
        )}
      </AnimatePresence>

      {!card ? (
        isInteractable && (
          <div
            className={`absolute inset-0 ${isOpponent ? 'bg-red-400/10' : 'bg-blue-400/10'} ${isFocused ? "animate-pulse" : ""} rounded-lg`}
          />
        )
      ) : (
        <div
          className={`transition-all duration-500 relative ${cardData?.position === "defense" || cardData?.position === "face-down-defense" ? "rotate-90 scale-75" : "scale-90"}`}
        >
          <Card card={card} size="xs" isFaceDown={isFaceDown} />

          {(card?.mode === "defense" || card?.mode === "face-down-defense") && !isFaceDown && (
            <div className={`absolute -top-2 -right-2 ${isOpponent ? 'bg-red-600' : 'bg-blue-600'} rounded-full p-1 shadow-lg -rotate-90`}>
              <Shield size={10} className="text-white" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
