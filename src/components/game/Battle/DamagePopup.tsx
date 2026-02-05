import React from "react";
import { motion } from "framer-motion";
import type { DamagePopupProps } from "../../../core/domain/BattleAnimation";

export const DamagePopup: React.FC<DamagePopupProps> = ({ damage, isVisible }) => {
  if (!isVisible || damage === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 0 }}
      animate={{ opacity: 1, scale: 1.2, y: -100 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center z-[250] pointer-events-none"
    >
      <span className="text-8xl font-black italic text-white drop-shadow-[0_0_30px_rgba(255,0,0,1)]">
        -{Math.abs(damage)}
      </span>
    </motion.div>
  );
};
