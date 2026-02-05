import React from "react";
import { motion } from "framer-motion";
import { Sword, Eye, RefreshCw } from "lucide-react";
import type { FieldZoneMenuProps } from "../../../core/domain/FieldZone";

export const FieldZoneMenu: React.FC<FieldZoneMenuProps> = ({
  mode,
  index,
  onInitiateAttack,
  onChangeMode,
  onClose,
}) => {
  const isFaceDown = mode === "face-down";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, x: "-50%" }}
      animate={{ opacity: 1, y: -10, x: "-50%" }}
      exit={{ opacity: 0, y: 5, x: "-50%" }}
      className="absolute -top-12 left-1/2 flex gap-1 bg-zinc-900/95 border border-white/20 p-1.5 rounded-xl shadow-2xl z-[100] backdrop-blur-md"
    >
      {mode === "atk" && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onInitiateAttack?.(index);
            onClose();
          }}
          className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors group/btn"
          title="Declarar Ataque"
        >
          <Sword size={18} className="group-hover/btn:scale-110 group-active/btn:scale-90" />
        </button>
      )}

      {isFaceDown ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChangeMode?.(index);
            onClose();
          }}
          className="p-2 hover:bg-yellow-500/20 text-yellow-400 rounded-lg transition-colors group/btn"
          title="Invocação de Virada"
        >
          <Eye size={18} className="group-hover/btn:scale-110" />
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
      <div className="absolute -bottom-4 left-0 right-0 h-4 bg-transparent" />
    </motion.div>
  );
};
