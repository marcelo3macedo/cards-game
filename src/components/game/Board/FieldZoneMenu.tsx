import React from "react";
import { motion } from "framer-motion";
import { Sword, RefreshCw, Search, ArrowUpFromLineIcon } from "lucide-react";
import type { ExtendedFieldZoneMenuProps } from "../../../core/domain/FieldZone";
import { useFieldZoneMenu } from "./hooks/useFieldZoneMenu";

export const FieldZoneMenu: React.FC<ExtendedFieldZoneMenuProps> = ({
  card,
  canAttack,
  mode,
  index,
  isOpponent = false,
  isMonster = false,
  onEnd
}) => {
  const {
    onInitiateAttack,
    onChangeMode,
    onInvoke,
    onView,
    onClose
  } = useFieldZoneMenu({ onEnd, card, mode, isMonster });

  const isFaceDown = (mode === "face-down-attack" || mode === "face-down-defense");

  if (isOpponent && isFaceDown) return <></>

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, x: "-50%" }}
      animate={{ opacity: 1, y: -10, x: "-50%" }}
      exit={{ opacity: 0, y: 5, x: "-50%" }}
      className="absolute -top-12 left-1/2 flex gap-1 bg-zinc-900/95 border border-white/20 p-1.5 rounded-xl shadow-2xl z-[100] backdrop-blur-md"
    >
      {!isOpponent && (
        <>
          {mode === "attack" && canAttack && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onInitiateAttack?.(index);
                onClose();
              }}
              className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors group/btn"
              title="Declarar Ataque"
              aria-label="Declarar Ataque"
            >
              <Sword size={18} className="group-hover/btn:scale-110 group-active/btn:scale-90" />
            </button>
          )}

          {isFaceDown ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onInvoke?.(index);
                onClose();
              }}
              className="p-2 hover:bg-yellow-500/20 text-yellow-400 rounded-lg transition-colors group/btn"
              title="Invocação de Virada"
            >
              <ArrowUpFromLineIcon size={18} className="group-hover/btn:scale-110" />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onChangeMode?.(index);
                onClose();
              }}
              className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors group/btn"
              title="Mudar Posição"
            >
              <RefreshCw size={18} className="group-hover/btn:scale-110" />
            </button>
          )}
        </>
      )}


      {!isOpponent || !isFaceDown ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onView?.(index);
            onClose();
          }}
          className="p-2 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition-colors group/btn"
          title="Visualizar Carta"
        >
          <Search size={18} className="group-hover/btn:scale-110" />
        </button>) :
      (<></>)}


      <div className="absolute -bottom-4 left-0 right-0 h-4 bg-transparent" />
    </motion.div>
  );
};
