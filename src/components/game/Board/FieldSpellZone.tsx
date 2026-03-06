import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../Card";
import { FieldZoneMenu } from "./FieldZoneMenu";
import { useFieldZone } from "./hooks/useFieldZone";
import { SummonEffect, ExplosionEffect } from "./FieldCardEffects";

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

  const prevCardIdRef = useRef<string | undefined>(card?.card?.id ?? card?.id);
  const [showSummon, setShowSummon] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);

  const cardId = card?.card?.id ?? card?.id;

  useEffect(() => {
    const prevId = prevCardIdRef.current;
    const currId = cardId;

    if (!prevId && currId) setShowSummon(true);
    else if (prevId && !currId) setShowExplosion(true);

    prevCardIdRef.current = currId;
  }, [cardId]);

  useEffect(() => {
    if (showSummon) {
      const t = setTimeout(() => setShowSummon(false), 900);
      return () => clearTimeout(t);
    }
  }, [showSummon]);

  useEffect(() => {
    if (showExplosion) {
      const t = setTimeout(() => setShowExplosion(false), 750);
      return () => clearTimeout(t);
    }
  }, [showExplosion]);

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
        w-14 h-20 sm:w-24 sm:h-32 border-2 mt-0 sm:mt-1 rounded-lg flex items-center justify-center relative transition-all duration-300 overflow-hidden sm:overflow-visible
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

      {showSummon && <SummonEffect isOpponent={isOpponent} />}
      {showExplosion && <ExplosionEffect />}

      {!card ? (
        isInteractable && (
          <div
            className={`absolute inset-0 ${theme.pulse} ${isFocused ? "animate-pulse" : ""} rounded-lg`}
          />
        )
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div
            key={cardId}
            className="transition-all duration-500 relative scale-[0.55] sm:scale-100 origin-top-left"
            initial={{ scale: 0.1, opacity: 0, filter: "brightness(4)" }}
            animate={{ scale: 1, opacity: 1, filter: "brightness(1)" }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 450, damping: 22 }}
          >
            <Card card={card} size="xs" isFaceDown={true} />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
