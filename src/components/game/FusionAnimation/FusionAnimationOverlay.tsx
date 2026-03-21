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

// Card is w-72 (288px). With gap-40 (160px), each card's center is 224px from the flex center.
// To fully overlap, the right card must shift -448px from its natural position.
const MERGE_X = -448;
// For the fail-throw the card starts at -224px relative to the screen-center wrapper.
const LEFT_X = -224;

export const FusionAnimationOverlay: React.FC<FusionAnimationOverlayProps> = ({
  materialCards,
  resultCard,
  onAnimationEnd,
}) => {
  const { phase, isSuccess, isLastRound, currentRound, totalRounds } = useFusionSequence({
    materialCards,
    resultCard,
    onAnimationEnd,
  });

  const isMultiRound = totalRounds > 1;
  const leftCard = materialCards[currentRound];
  const rightCard = materialCards[currentRound + 1];

  // Flash color: purple for success (all rounds), red only on the last fail round,
  // subtle white for intermediate fail rounds (collision energy, no result yet).
  const flashBg = isSuccess
    ? "bg-purple-300"
    : isLastRound
      ? "bg-red-900"
      : "bg-white/20";

  // Glow filter on cards during merge
  const mergeFilter = isSuccess
    ? "brightness(1.6) drop-shadow(0 0 20px rgba(168,85,247,0.8))"
    : isLastRound
      ? "brightness(1.3) drop-shadow(0 0 20px rgba(239,68,68,0.8))"
      : "brightness(1.3) drop-shadow(0 0 20px rgba(255,255,255,0.35))";

  const flashOpacity = isSuccess ? 0.85 : isLastRound ? 0.5 : 0.25;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl overflow-hidden font-sans">

      {/* Round progress dots */}
      {isMultiRound && phase !== "reveal" && phase !== "done" && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-2 z-[350]">
          {Array.from({ length: totalRounds }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i < currentRound
                  ? "bg-purple-400"
                  : i === currentRound
                    ? "bg-white scale-125"
                    : "bg-white/30"
              }`}
            />
          ))}
        </div>
      )}

      {/* Collision flash */}
      <AnimatePresence>
        {phase === "flash" && (
          <motion.div
            key={`flash-${currentRound}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: flashOpacity }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`absolute inset-0 pointer-events-none z-[300] ${flashBg}`}
          />
        )}
      </AnimatePresence>

      {/* ── Cards area: left stays fixed, right approaches ── */}
      <AnimatePresence mode="sync">
        {phase !== "reveal" && phase !== "done" && (
          <motion.div
            key={`round-${currentRound}`}
            className="flex items-center gap-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2 }}
          >
            {/* Left card — fixed anchor, renders on top */}
            <motion.div
              className="relative z-10"
              initial={{
                x: currentRound === 0 ? -300 : 0,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
                filter:
                  currentRound > 0
                    ? "brightness(1.4) drop-shadow(0 0 24px rgba(168,85,247,0.9))"
                    : "brightness(1)",
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-zinc-500 font-bold italic text-xs tracking-widest whitespace-nowrap">
                {currentRound === 0 ? "MATERIAL 1" : "FUSÃO PARCIAL"}
              </div>
              <Card card={leftCard} size="lg" />
            </motion.div>

            {/* Right card — slides left toward the left card during merge */}
            {rightCard && (
              <motion.div
                className="relative"
                initial={{ x: 300, opacity: 0 }}
                animate={{
                  x: phase === "gather" ? 0 : MERGE_X,
                  opacity:
                    phase === "gather"
                      ? 1
                      : phase === "merge"
                        ? 0.75
                        : 0.35,
                  filter:
                    phase === "merge" || phase === "flash"
                      ? mergeFilter
                      : "brightness(1)",
                }}
                transition={{
                  x: {
                    duration: phase === "merge" ? 0.55 : 0.5,
                    ease: "easeIn",
                  },
                  opacity: { duration: 0.4 },
                  filter: { duration: 0.3 },
                }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-zinc-500 font-bold italic text-xs tracking-widest whitespace-nowrap">
                  MATERIAL {currentRound + 2}
                </div>
                <Card card={rightCard} size="lg" />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── REVEAL: failure — left card falls to the left ── */}
      <AnimatePresence>
        {phase === "reveal" && !isSuccess && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[400]">
            <motion.div
              key="fail-throw"
              initial={{ x: LEFT_X, y: 0, opacity: 1, rotate: 0, scale: 1 }}
              animate={{ x: LEFT_X - 650, y: 90, opacity: 0, rotate: -28, scale: 0.75 }}
              transition={{ duration: 0.7, ease: "easeIn" }}
            >
              <Card card={leftCard ?? materialCards[0]} size="lg" />
            </motion.div>
          </div>
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
      </AnimatePresence>
    </div>
  );
};
