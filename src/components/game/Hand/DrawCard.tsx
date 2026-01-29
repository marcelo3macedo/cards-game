import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MonsterCard } from '../../../core/domain/Card';
import { Card } from '../Card'; // Seu componente de carta existente

interface DrawCardProps {
  card: MonsterCard | null;
  onComplete: () => void;
}

export const DrawCard: React.FC<DrawCardProps> = ({ card, onComplete }) => {
  return (
    <AnimatePresence>
      {card && (
        <div className="fixed inset-0 z-[1000] pointer-events-none flex items-center justify-center">
          {/* Overlay de fundo opcional para focar na carta */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ 
              x: '40vw', // Posição aproximada do Deck (direita)
              y: '40vh', // Posição aproximada do Deck (baixo)
              scale: 0.2,
              rotateY: 180, // Começa virada para baixo
              opacity: 0 
            }}
            animate={{ 
              x: 0, 
              y: 0, 
              scale: 1.5, 
              rotateY: 0, // Vira para cima
              opacity: 1 
            }}
            exit={{ 
              y: '100vh', // Cai para fora da tela (em direção à mão)
              opacity: 0,
              scale: 0.5,
              transition: { duration: 0.4 }
            }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.8 
            }}
            onAnimationComplete={() => {
              // Espera 1 segundo com a carta no centro e depois fecha
              setTimeout(onComplete, 1000);
            }}
          >
            {/* Renderiza a face da carta */}
            <div className="relative preserve-3d">
               <Card card={card} size="lg" />
               
               {/* Brilho atrás da carta puxada */}
               <div className="absolute inset-0 bg-blue-500/20 blur-[60px] -z-10 animate-pulse" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};