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
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, setEvent, setSelectedCard]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-[150] flex flex-col items-center justify-center backdrop-blur-sm bg-black/40"
        >
          {/* Brilho de fundo pulsante */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0.3 }}
            transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
            className="absolute w-64 h-96 bg-cyan-500 rounded-full blur-[120px]"
          />

          <motion.div
            initial={{ scale: 0.5, y: 50, opacity: 0, rotateY: -180 }}
            animate={{ scale: 1.2, y: 0, opacity: 1, rotateY: 0 }}
            exit={{ scale: 1.5, opacity: 0, filter: "brightness(2)" }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="relative z-10"
          >
            <div className="relative group">
              {/* Efeito de borda brilhante */}
              <div className="absolute -inset-4 bg-gradient-to-t from-cyan-500 to-blue-400 opacity-50 blur-2xl animate-pulse" />

              <Card card={selectedCard!} />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap"
              >
                <h2 className="text-2xl font-black italic text-white uppercase tracking-[0.3em] drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
                  Efeito Ativado!
                </h2>
              </motion.div>
            </div>
          </motion.div>

          {/* Partículas simples ou flash (opcional) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-white z-[160] pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
