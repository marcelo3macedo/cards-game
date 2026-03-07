import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../Card";
import type { BaseCard } from "../../../core/domain/Card";
import { useFusionSequence } from "./hooks/useFusionSequence";

interface FusionAnimationOverlayProps {
  materialCards: BaseCard[];
  resultCard: BaseCard | null;
  onAnimationEnd: () => void;
}

export const FusionAnimationOverlay: React.FC<FusionAnimationOverlayProps> = ({
  materialCards,
  resultCard,
  onAnimationEnd,
}) => {
  const { phase, isSuccess } = useFusionSequence({ materialCards, resultCard, onAnimationEnd });

  const card1 = materialCards[0];
  const card2 = materialCards[1] ?? materialCards[0];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl overflow-hidden font-sans">

      {/* Flash overlay */}
      <AnimatePresence>
        {phase === "flash" && (
          <motion.div
            key="flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: isSuccess ? 0.85 : 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 pointer-events-none z-[300] ${isSuccess ? "bg-purple-300" : "bg-red-900"}`}
          />
        )}
      </AnimatePresence>

      {/* Energy particles ring (merge phase) */}
      <AnimatePresence>
        {(phase === "merge" || phase === "flash") && (
          <motion.div
            key="ring"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 0.7, scale: 1.6 }}
            exit={{ opacity: 0, scale: 2.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`absolute w-64 h-64 rounded-full border-4 ${isSuccess ? "border-purple-400 shadow-[0_0_80px_40px_rgba(168,85,247,0.35)]" : "border-red-500 shadow-[0_0_60px_30px_rgba(239,68,68,0.3)]"} pointer-events-none`}
          />
        )}
      </AnimatePresence>

      {/* ── REVEAL: success — result card ── */}
      <AnimatePresence>
        {phase === "reveal" && isSuccess && resultCard && (
          <motion.div
            key="result"
            initial={{ scale: 0, opacity: 0, rotate: -15 }}
            animate={{ scale: 1.15, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="flex flex-col items-center gap-6 z-[400]"
          >
            <div className="text-purple-300 font-black italic tracking-[0.3em] text-sm animate-pulse">
              FUSÃO BEM-SUCEDIDA
            </div>
            <div className="shadow-[0_0_80px_rgba(168,85,247,0.6)]">
              <Card card={resultCard} size="lg" />
            </div>
            <div className="text-white/80 font-bold text-xl tracking-wide">
              {resultCard.name}
            </div>
          </motion.div>
        )}

        {/* ── REVEAL: failure — throw card1 out ── */}
        {phase === "reveal" && !isSuccess && (
          <motion.div
            key="fail-throw"
            initial={{ x: 80, opacity: 0.6, scale: 0.85, rotate: 0 }}
            animate={{ x: -700, y: -250, opacity: 0, scale: 0.6, rotate: -40 }}
            transition={{ duration: 0.7, ease: "easeIn" }}
            className="z-[400]"
          >
            <Card card={card1} size="lg" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Material cards (hidden during reveal) ── */}
      <AnimatePresence>
        {phase !== "reveal" && phase !== "done" && (
          <motion.div
            key="materials"
            className="flex items-center gap-32 relative"
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            {/* Card 1 */}
            <motion.div
              initial={{ x: -320, opacity: 0 }}
              animate={{
                x: phase === "gather" ? 0 : phase === "merge" ? 80 : 80,
                opacity: phase === "gather" ? 1 : phase === "merge" ? 0.6 : 0,
                scale: phase === "merge" ? 0.85 : 1,
                filter: phase === "merge"
                  ? isSuccess
                    ? "brightness(1.6) drop-shadow(0 0 20px rgba(168,85,247,0.8))"
                    : "brightness(1.3) drop-shadow(0 0 20px rgba(239,68,68,0.8))"
                  : "brightness(1)",
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative"
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-zinc-500 font-bold italic text-xs tracking-widest whitespace-nowrap">
                MATERIAL 1
              </div>
              <Card card={card1} size="lg" />
            </motion.div>

            {/* Center symbol */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: phase === "gather" ? 0 : phase === "merge" ? 0.9 : 0,
                scale: phase === "merge" ? 1.2 : 0,
                rotate: phase === "merge" ? [0, 180, 360] : 0,
              }}
              transition={{ duration: 0.6 }}
              className={`absolute left-1/2 -translate-x-1/2 text-5xl font-black select-none z-10 ${isSuccess ? "text-purple-400" : "text-red-500"}`}
            >
              ⬡
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ x: 320, opacity: 0 }}
              animate={{
                x: phase === "gather" ? 0 : phase === "merge" ? -80 : -80,
                opacity: phase === "gather" ? 1 : phase === "merge" ? 0.6 : 0,
                scale: phase === "merge" ? 0.85 : 1,
                filter: phase === "merge"
                  ? isSuccess
                    ? "brightness(1.6) drop-shadow(0 0 20px rgba(168,85,247,0.8))"
                    : "brightness(1.3) drop-shadow(0 0 20px rgba(239,68,68,0.8))"
                  : "brightness(1)",
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative"
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-zinc-500 font-bold italic text-xs tracking-widest whitespace-nowrap">
                MATERIAL 2
              </div>
              <Card card={card2} size="lg" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          50%  { transform: scale(1.3); opacity: 0.3; }
          100% { transform: scale(1);   opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};
