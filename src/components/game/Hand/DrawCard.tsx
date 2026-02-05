import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MonsterCard } from "../../../core/domain/Card";
import { Card } from "../Card";

interface DrawCardProps {
  card: MonsterCard | null;
  onComplete: () => void;
}

export const DrawCard: React.FC<DrawCardProps> = ({ card, onComplete }) => {
  return (
    <AnimatePresence>
      {card && (
        <div className="fixed inset-0 z-[1000] pointer-events-none flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{
              x: "40vw",
              y: "40vh",
              scale: 0.2,
              rotateY: 180,
              opacity: 0,
            }}
            animate={{
              x: 0,
              y: 0,
              scale: 1.5,
              rotateY: 0,
              opacity: 1,
            }}
            exit={{
              y: "100vh",
              opacity: 0,
              scale: 0.5,
              transition: { duration: 0.4 },
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.8,
            }}
            onAnimationComplete={() => {
              setTimeout(onComplete, 2000);
            }}
          >
            <div className="relative preserve-3d">
              <Card card={card} size="lg" />

              <div className="absolute inset-0 bg-blue-500/20 blur-[60px] -z-10 animate-pulse" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
