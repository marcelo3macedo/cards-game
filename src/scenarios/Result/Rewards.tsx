import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Card } from "../../components/game/Card";
import { useRewards } from "./hooks/useRewards";
import { useBattleStore } from "../../store/BattleStore";

export const RewardsScenario = ({
  onBack,
}: {
  onBack: () => void;
}) => {
  const { result } = useBattleStore();
  const cards = result?.history?.cardsAcquired || [];
  const { xTranslate, cardSize, mouseX } = useRewards(cards);

  if (cards.length === 0) {
    return (
      <div className="h-screen w-screen bg-zinc-950 flex flex-col items-center justify-center">
        <p className="text-zinc-500 mb-4">Nenhuma carta nova encontrada.</p>
        <button onClick={onBack} className="text-white underline">Voltar</button>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-zinc-950 flex flex-col items-center justify-center relative overflow-hidden cursor-none">
      <div className="absolute top-12 md:top-20 text-3xl md:text-4xl font-black italic text-yellow-500 drop-shadow-[0_0_20px_rgba(234,179,8,0.5)] z-20 pointer-events-none">
        Novas cartas recebidas
      </div>

      <motion.div
        style={{ x: xTranslate }}
        className="flex gap-10 items-center justify-center min-w-max h-[500px] px-[20vw]"
      >
        {cards.map((card: any, index: number) => (
          <motion.div
            key={`${card.id}-${index}`}
            initial={{ opacity: 0, y: 100, rotateY: 180, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
            whileHover={{
              y: -30,
              scale: 1.1,
              z: 50,
              transition: { duration: 0.3 },
            }}
            transition={{
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
            }}
            className="relative group shrink-0"
          >
            <div className="absolute inset-0 bg-yellow-500/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <Card card={card.card} size={cardSize} />
          </motion.div>
        ))}
      </motion.div>

      <button
        onClick={onBack}
        className="mt-10 md:mt-16 px-12 py-4 bg-white text-black font-black italic rounded-full hover:bg-yellow-400 hover:scale-110 active:scale-95 transition-all flex items-center gap-2 shadow-2xl z-30 pointer-events-auto"
      >
        CONTINUAR <ArrowRight size={20} />
      </button>

      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-yellow-500 rounded-full pointer-events-none z-[100] mix-blend-difference"
        style={{ x: mouseX, y: useSpring(useMotionValue(0)) }}
        animate={{ y: typeof window !== "undefined" ? window.innerHeight / 2 : 0 }}
      />

      <div className="absolute inset-y-0 left-0 w-[15vw] bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-[15vw] bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />
    </div>
  );
};
