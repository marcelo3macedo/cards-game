import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../Card";
import type { BaseCard } from "../../../core/domain/Card";
import { useEquipSequence } from "./hooks/useEquipSequence";

interface EquipAnimationOverlayProps {
  magicCard: BaseCard;
  monsterCard: BaseCard;
  newMosterCard: BaseCard;
  onAnimationEnd: () => void;
}

const MERGE_X = -448;

export const EquipAnimationOverlay: React.FC<EquipAnimationOverlayProps> = ({
  magicCard,
  monsterCard,
  newMosterCard,
  onAnimationEnd,
}) => {
  const triggerKey = `${magicCard.id}-${monsterCard.id}`;
  const { phase } = useEquipSequence({ triggerKey, onAnimationEnd });

  const isMerging = phase === "merge" || phase === "flash";

  const mergeFilter =
    "brightness(1.5) drop-shadow(0 0 20px rgba(251,191,36,0.85))";

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl overflow-hidden font-sans">

      <AnimatePresence>
        {phase === "flash" && (
          <motion.div
            key="equip-flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 pointer-events-none z-[300] bg-amber-300"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="sync">
        {phase !== "reveal" && phase !== "done" && (
          <motion.div
            key="cards-area"
            className="flex items-center gap-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="relative z-10"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-zinc-500 font-bold italic text-xs tracking-widest whitespace-nowrap">
                FEITIÇO
              </div>
              <Card card={monsterCard} size="lg" />
            </motion.div>

            <motion.div
              className="relative"
              initial={{ x: 300, opacity: 0 }}
              animate={{
                x: phase === "gather" ? 0 : MERGE_X,
                opacity: phase === "gather" ? 1 : isMerging ? 0.75 : 0.35,
                filter: isMerging ? mergeFilter : "brightness(1)",
              }}
              transition={{
                x: { duration: phase === "merge" ? 0.5 : 0.5, ease: "easeIn" },
                opacity: { duration: 0.4 },
                filter: { duration: 0.3 },
              }}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-zinc-500 font-bold italic text-xs tracking-widest whitespace-nowrap">
                ALVO
              </div>
              <Card card={magicCard} size="lg" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "reveal" && (
          <motion.div
            key="reveal"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            className="flex flex-col items-center gap-6 z-[400]"
          >
            <div className="text-amber-300 font-black italic tracking-[0.3em] text-sm animate-pulse">
              EQUIPADO!
            </div>
            <div className="shadow-[0_0_80px_rgba(251,191,36,0.65)]">
              <Card card={newMosterCard} size="lg" />
            </div>
            <div className="text-white/80 font-bold text-xl tracking-wide">
              {monsterCard.name}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
