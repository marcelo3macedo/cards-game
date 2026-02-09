import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Shield } from "lucide-react";
import type { ExtendedFieldZoneProps } from "../../../core/domain/FieldZone";
import { Card } from "../Card";
import { FieldZoneMenu } from "./FieldZoneMenu";

export function FieldZone({
  card,
  mode,
  isInteractable,
  isSelected,
  isFocused,
  index,
  onClick,
  onInitiateAttack,
  onChangeMode,
  isOpponent
}: ExtendedFieldZoneProps) {
  const [showMenu, setShowMenu] = useState(false);
  const isFaceDown = mode === "face-down";

  return (
    <div
      onClick={() => {
        if (isInteractable) onClick?.();
        else if (card) setShowMenu(!showMenu);
      }}
      onMouseLeave={() => setShowMenu(false)}
      className={`
        w-24 h-32 border-2 rounded-lg flex items-center justify-center relative transition-all duration-300
        ${card ? "border-solid shadow-lg" : "border-dashed cursor-default"}
        ${!card && isInteractable ? "cursor-pointer border-blue-400/50 bg-blue-900/20" : "border-blue-500/20 bg-zinc-900/80"}
        ${isFocused && !isSelected ? "ring-4 ring-blue-400 border-blue-300 scale-105 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-20" : ""}
        ${isSelected ? "border-yellow-400 border-4 shadow-[0_0_20px_rgba(250,204,21,0.4)] scale-105 z-30" : ""}
      `}
    >
      <AnimatePresence>
        {showMenu && card && (
          <div className={isOpponent ? "rotate-180" : ""}>
            <FieldZoneMenu
              mode={mode}
              index={index}
              onInitiateAttack={onInitiateAttack}
              onChangeMode={onChangeMode}
              onClose={() => setShowMenu(false)}
            />
          </div>
        )}
      </AnimatePresence>

      {!card ? (
        isInteractable && (
          <div
            className={`absolute inset-0 bg-blue-400/10 ${isFocused ? "animate-pulse" : ""} rounded-lg`}
          />
        )
      ) : (
        <div
          className={`transition-all duration-500 relative ${mode === "def" ? "rotate-90 scale-75" : "scale-90"}`}
        >
          <Card card={card} size="xs" isFaceDown={isFaceDown} />

          {mode === "def" && !isFaceDown && (
            <div className="absolute -top-2 -right-2 bg-blue-600 rounded-full p-1 shadow-lg -rotate-90">
              <Shield size={10} className="text-white" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
