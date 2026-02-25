import { motion } from "framer-motion";

interface OpponentHandProps {
  count: number;
}

export const OpponentHand = ({ count }: OpponentHandProps) => {
  const cards = Array.from({ length: count });

  return (
    <div className="flex justify-center -space-x-12 pt-4">
      {cards.map((_, index) => {
        const rotation = (index - (count - 1) / 2) * 5;
        const yOffset = Math.abs(index - (count - 1) / 2) * 4;

        return (
          <motion.div
            key={index}
            initial={{ y: -100, opacity: 0 }}
            animate={{
              y: yOffset,
              rotate: rotation,
              opacity: 1
            }}
            transition={{ delay: index * 0.05 }}
            className="w-24 h-36 bg-gradient-to-br from-red-900 to-black border-2 border-red-950 rounded-lg shadow-2xl flex items-center justify-center relative overflow-hidden group"
          >
            <div className="absolute inset-1 border border-red-800/30 rounded-sm" />
            <div className="w-16 h-24 bg-red-950/20 rounded-full blur-xl absolute" />
            <span className="text-red-900/40 font-black text-2xl rotate-90 select-none">
              DUEL
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};
