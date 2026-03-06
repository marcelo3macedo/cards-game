import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield } from "lucide-react";
import { Card } from "../Card";
import { FieldZoneMenu } from "./FieldZoneMenu";
import { useFieldZone } from "./hooks/useFieldZone";
import { SummonEffect, ExplosionEffect } from "./FieldCardEffects";

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

  const prevCardIdRef = useRef<string | undefined>(card?.id);
  const [showSummon, setShowSummon] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);

  useEffect(() => {
    const prevId = prevCardIdRef.current;
    const currId = card?.id;

    if (!prevId && currId) setShowSummon(true);
    else if (prevId && !currId) setShowExplosion(true);

    prevCardIdRef.current = currId;
  }, [card?.id]);

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

  const isDefense = cardData?.position === "defense" || cardData?.position === "face-down-defense";
  const hasAttacked = card && cardData?.canAttack === false;

  return (
    <div
      onClick={() => { onClick(index) }}
      onMouseEnter={() => onFocusCard(index)}
      onMouseLeave={() => setShowMenu(false)}
      className={`
        w-14 h-20 sm:w-24 sm:h-32 border-2 rounded-lg flex items-center justify-center relative transition-all duration-300 overflow-visible
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
            className={`absolute inset-0 ${isOpponent ? 'bg-red-400/10' : 'bg-blue-400/10'} ${isFocused ? "animate-pulse" : ""} rounded-lg`}
          />
        )
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div
            key={card.id}
            className={`relative ${isDefense ? "rotate-90 scale-[0.45] sm:scale-75 origin-center sm:origin-top-left" : "scale-[0.55] sm:scale-90 origin-center sm:origin-top-left"}`}
            initial={{ scale: 0.1, opacity: 0, filter: "brightness(4)" }}
            animate={{
              scale: 1,
              opacity: hasAttacked ? 0.45 : 1,
              filter: hasAttacked ? "brightness(0.6) grayscale(0.5)" : "brightness(1)",
            }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 450, damping: 22 }}
          >
            <Card card={card} size="xs" isFaceDown={isFaceDown} />

            {(card?.mode === "defense" || card?.mode === "face-down-defense") && !isFaceDown && (
              <div className={`absolute -top-2 -right-2 ${isOpponent ? 'bg-red-600' : 'bg-blue-600'} rounded-full p-1 shadow-lg -rotate-90`}>
                <Shield size={10} className="text-white" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
