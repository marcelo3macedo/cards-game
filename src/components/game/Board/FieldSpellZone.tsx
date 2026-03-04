import { AnimatePresence } from "framer-motion";
import { Card } from "../Card";
import { FieldZoneMenu } from "./FieldZoneMenu";
import { useFieldZone } from "./hooks/useFieldZone";

export function FieldSpellZone({
  index,
  cardData,
  isInteractable,
  isSelected,
  isFocused,
  isOpponent
}: any) {
  const card = cardData;
  const {
    showMenu, setShowMenu, onClick, onFocusCard
  } = useFieldZone({ card, position: card ? "face-down-attack" : null });

  const theme = isOpponent
    ? {
        border: "border-blue-500/20",
        bg: "bg-zinc-900/80",
        interact: "border-red-400/50 bg-red-900/20",
        ring: "ring-red-500 border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)]",
        pulse: "bg-red-400/10"
      }
    : {
        border: "border-blue-500/20",
        bg: "bg-zinc-900/80",
        interact: "border-blue-400/50 bg-blue-900/20",
        ring: "ring-blue-400 border-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.5)]",
        pulse: "bg-blue-400/10"
      };

  return (
    <div
      onClick={() => { onClick(index) }}
      onMouseEnter={() => onFocusCard(index)}
      onMouseLeave={() => setShowMenu(false)}
      className={`
        w-24 h-32 border-2 mt-1 rounded-lg flex items-center justify-center relative transition-all duration-300
        ${card ? "border-solid shadow-lg" : "border-dashed cursor-default"}
        ${!card && isInteractable ? theme.interact : `${theme.border} ${theme.bg}`}
        ${isFocused && !isSelected && !isOpponent ? `ring-4 ${theme.ring} scale-105 z-20` : ""}
        ${isSelected ? "border-yellow-400 border-4 shadow-[0_0_20px_rgba(250,204,21,0.4)] scale-105 z-30" : ""}
      `}
    >
      <AnimatePresence>
        {showMenu && card && (
          <FieldZoneMenu
            card={card}
            mode={"face-down-attack"}
            canAttack={false}
            index={index}
            isOpponent={isOpponent}
            onEnd={() => { setShowMenu(false) }}
          />
        )}
      </AnimatePresence>

      {card && (
        <div className={`absolute top-1 right-1 z-10 w-4 h-4 rounded-full bg-zinc-900/80 border border-white/30 flex items-center justify-center text-white text-[9px] font-bold pointer-events-none transition-opacity duration-200 ${isFocused ? "opacity-100" : "opacity-30"}`}>
          i
        </div>
      )}

      {!card ? (
        isInteractable && (
          <div
            className={`absolute inset-0 ${theme.pulse} ${isFocused ? "animate-pulse" : ""} rounded-lg`}
          />
        )
      ) : (
        <div className="transition-all duration-500 relative">
          <Card card={card} size="xs" isFaceDown={true}  />
        </div>
      )}
    </div>
  );
}
