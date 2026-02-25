import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../Card";
import { BattleEvent } from "../../../core/domain/BattleStore";
import { useBattleStore } from "../../../store/BattleStore";
import { useBattleEventStore } from "../../../store/BattleEventStore";

export const EffectCardOverlay: React.FC = () => {
  const { event, setEvent } = useBattleStore();
  const { selectedCard, setSelectedCard } = useBattleEventStore();
  const isVisible = event === BattleEvent.ACTIVE_EFFECT && !!selectedCard;

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setEvent(BattleEvent.INITIAL);
        setSelectedCard(null);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, setEvent, setSelectedCard]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
          className="absolute inset-0 z-[150] flex flex-col items-center justify-center backdrop-blur-md bg-black/70"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.3, scale: 1.5 }}
            className="absolute w-96 h-96 bg-cyan-900 rounded-full blur-[150px]"
          />

          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 20 }}
            animate={{ scale: 1.4, opacity: 1, y: 0 }}
            exit={{ scale: 1.6, opacity: 0, filter: "brightness(2)" }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20
            }}
            className="relative z-10"
          >
            <div className="relative group">
              <div className="absolute -inset-2 bg-cyan-500/30 blur-xl rounded-lg" />

              <Card card={selectedCard!} size="lg" />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2"
              >
                <span className="text-sm font-bold tracking-[0.5em] text-cyan-400 uppercase drop-shadow-sm">
                  Ativando Efeito
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
