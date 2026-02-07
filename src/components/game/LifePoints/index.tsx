import { motion, AnimatePresence } from "framer-motion";
import { useLifePoints } from "./hooks/useLifePoints";
import type { LifePointsProps } from "../../../core/domain/LifePoints";

export const LifePoints = ({ target, color, align = "left" }: LifePointsProps) => {
  const { name, damagePopup, clearPopup, displayLP } = useLifePoints(target);
  const isRedTheme = color === "red";

  return (
    <div className={`relative flex flex-col ${align === "right" ? "items-end" : "items-start"}`}>
      <AnimatePresence>
        {damagePopup && (
          <motion.div
            key={damagePopup.id}
            initial={{ opacity: 0, scale: 0.5, y: 0 }}
            animate={{ opacity: 1, scale: 1.2, y: -60 }}
            exit={{ opacity: 0, scale: 1.8, y: -100 }}
            onAnimationComplete={clearPopup}
            className={`absolute font-black text-4xl z-30 drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] ${
              damagePopup.amount > 0 ? "text-green-400" : "text-red-500"
            }`}
          >
            {damagePopup.amount > 0 ? `+${damagePopup.amount}` : damagePopup.amount}
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`bg-black/80 border-2 p-4 rounded-xl backdrop-blur-xl min-w-[200px] transition-all duration-300
        ${isRedTheme ? "border-red-600/50 shadow-[0_0_20px_rgba(220,38,38,0.2)]" : "border-blue-600/50 shadow-[0_0_20px_rgba(37,99,235,0.2)]"}`}
      >
        <p
          className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isRedTheme ? "text-red-400" : "text-blue-400"}`}
        >
          {name}
        </p>

        <div className="flex items-baseline gap-2">
          <span className="text-zinc-500 text-sm font-black">LP</span>
          <motion.span className="text-5xl font-black italic text-white tabular-nums tracking-tighter">
            {displayLP}
          </motion.span>
        </div>
      </div>
    </div>
  );
};
