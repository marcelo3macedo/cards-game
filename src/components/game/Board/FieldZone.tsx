import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sword, Shield, Eye, RefreshCw } from 'lucide-react';
import type { FieldZoneProps } from "../../../core/domain/FieldZone";
import { Card } from "../Card";

// Adicionei 'index' e 'onInitiateAttack' à interface se já não existirem
interface ExtendedFieldZoneProps extends FieldZoneProps {
  index: number;
  onInitiateAttack?: (index: number) => void;
  onChangeMode?: (index: number) => void;
}

export function FieldZone({ 
  card, 
  mode, 
  isInteractable, 
  isSelected, 
  isFocused, 
  index,
  onClick,
  onInitiateAttack,
  onChangeMode
}: ExtendedFieldZoneProps) {
  const [showMenu, setShowMenu] = useState(false);

  const isFaceDown = mode === 'face-down';

  return (
    <div 
      onClick={() => {
        // Se estivermos selecionando um local para invocar
        if (isInteractable) {
          onClick?.();
        } 
        // Se houver uma carta e não estivermos em modo de invocação, abre o menu
        else if (card) {
          setShowMenu(!showMenu);
        }
      }}
      onMouseLeave={() => setShowMenu(false)}
      className={`
        w-24 h-32 border-2 rounded-lg flex items-center justify-center relative transition-all duration-300
        ${card ? 'border-solid shadow-lg' : 'border-dashed cursor-default'}
        
        /* Estilos de Interatividade e Estado */
        ${!card && isInteractable ? 'cursor-pointer border-blue-400/50 bg-blue-900/20' : 'border-blue-500/20 bg-zinc-900/80'}
        ${isFocused && !isSelected ? 'ring-4 ring-blue-400 border-blue-300 scale-105 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-20' : ''}
        ${isSelected ? 'border-yellow-400 border-4 shadow-[0_0_20px_rgba(250,204,21,0.4)] scale-105 z-30' : ''}
      `}
    >
      {/* Menu de Ações (Aparece sobre a carta) */}
      <AnimatePresence>
        {showMenu && card && (
          <motion.div 
            initial={{ opacity: 0, y: 10, x: '-50%' }}
            animate={{ opacity: 1, y: -10, x: '-50%' }}
            exit={{ opacity: 0, y: 5, x: '-50%' }}
            className="absolute -top-12 left-1/2 flex gap-1 bg-zinc-900/95 border border-white/20 p-1.5 rounded-xl shadow-2xl z-[100] backdrop-blur-md"
          >
            {/* Botão de Ataque: Só aparece se a carta estiver em modo de ATAQUE e não estiver virada para baixo */}
            {mode === 'atk' && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onInitiateAttack?.(index); // Inicia o estado de "alvo" no Scenario
                  setShowMenu(false);
                }}
                className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors group/btn"
                title="Declarar Ataque"
              >
                <Sword size={18} className="group-hover/btn:scale-110 group-active/btn:scale-90" />
              </button>
            )}

            {/* Botão de Flip/Invocar (Se estiver face-down) */}
            {isFaceDown && (
              <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onChangeMode?.(index); // Lógica para desvirar
                    setShowMenu(false);
                }}
                className="p-2 hover:bg-yellow-500/20 text-yellow-400 rounded-lg transition-colors group/btn"
                title="Invocação de Virada"
              >
                <Eye size={18} className="group-hover/btn:scale-110" />
              </button>
            )}

            {/* Botão de Mudar Posição (Troca ATK/DEF) */}
            {!isFaceDown && (
              <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onChangeMode?.(index);
                    setShowMenu(false);
                }}
                className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors group/btn"
                title="Mudar Posição"
              >
                <RefreshCw size={18} className="group-hover/btn:scale-110" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Renderização da Carta ou Slot Vazio */}
      {!card ? (
        isInteractable && (
          <div className={`absolute inset-0 bg-blue-400/10 ${isFocused ? 'animate-pulse' : ''} rounded-lg`} />
        )
      ) : (
        <div className={`
          transition-all duration-500 relative
          ${mode === 'def' ? 'rotate-90 scale-75' : 'scale-90'}
          ${isFaceDown ? 'brightness-50' : ''}
        `}>
          {isFaceDown ? (
            <div className="w-20 h-28 bg-orange-950 border-2 border-orange-700 rounded-md flex items-center justify-center overflow-hidden shadow-2xl">
               <div className="w-14 h-18 border border-orange-400/20 rounded flex items-center justify-center opacity-40 rotate-[-15deg]">
                 <span className="text-xl font-bold text-orange-400">?</span>
               </div>
            </div>
          ) : (
            <Card card={card} size="xs" />
          )}
          
          {mode === 'def' && (
            <div className="absolute -top-2 -right-2 bg-blue-600 rounded-full p-1 shadow-lg -rotate-90">
              <Shield size={10} className="text-white" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}