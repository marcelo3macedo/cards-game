import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Package } from "lucide-react";
import { Card } from "../../components/game/Card";
import { useRewards } from "./hooks/useRewards";
import { useBattleStore } from "../../store/BattleStore";
import type { CardSize } from "../../core/domain/Card";

const SealedPackage = ({
  name,
  cardCount,
  onOpen,
}: {
  name: string;
  cardCount: number;
  onOpen: () => void;
}) => (
  <motion.div
    key="sealed"
    initial={{ opacity: 0, y: 40, scale: 0.85 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, scale: 1.3, y: -300, transition: { duration: 0.45 } }}
    className="flex flex-col items-center gap-8"
  >
    <div className="relative">
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute -inset-8 bg-yellow-500/20 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        animate={{ boxShadow: ["0 0 20px rgba(234,179,8,0.2)", "0 0 50px rgba(234,179,8,0.5)", "0 0 20px rgba(234,179,8,0.2)"] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="relative w-60 h-[360px] bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950 border-2 border-yellow-500/60 rounded-xl overflow-hidden flex flex-col"
      >
        {/* Shimmer sweep */}
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[-15deg] z-10 pointer-events-none"
        />

        {/* Top strip */}
        <div className="relative bg-yellow-500 px-4 py-2 flex items-center justify-between shrink-0">
          <span className="text-black text-[10px] font-black uppercase tracking-widest">
            Recompensa
          </span>
          <span className="bg-black/20 text-black text-[10px] font-black px-2 py-0.5 rounded-full">
            {cardCount} {cardCount === 1 ? "carta" : "cartas"}
          </span>
        </div>

        {/* Tear line */}
        <div className="flex items-center px-3 py-2 shrink-0">
          <div className="flex-1 border-t border-dashed border-yellow-500/40" />
          <span className="mx-2 text-yellow-500/40 text-xs select-none">✂</span>
          <div className="flex-1 border-t border-dashed border-yellow-500/40" />
        </div>

        {/* Center art area */}
        <div className="flex-1 flex flex-col items-center justify-center gap-5 px-4">
          <Package size={52} className="text-yellow-500/50" />

          <p className="text-yellow-400 font-black text-base uppercase italic text-center leading-tight">
            {name}
          </p>

          {/* Stacked card silhouettes */}
          <div className="relative h-20 w-28">
            {Array.from({ length: Math.min(cardCount, 3) }).map((_, i) => (
              <div
                key={i}
                className="absolute w-20 h-28 bg-zinc-700/80 border border-yellow-500/20 rounded"
                style={{
                  left: `${i * 10}px`,
                  top: `${-i * 4}px`,
                  transform: `rotate(${(i - 1) * 6}deg)`,
                  zIndex: i,
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom strip */}
        <div className="bg-zinc-800/80 border-t border-yellow-500/20 px-4 py-2 shrink-0">
          <p className="text-yellow-500/50 text-[9px] font-bold uppercase tracking-widest text-center">
            Duelo de vilão
          </p>
        </div>
      </motion.div>
    </div>

    <motion.button
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      onClick={onOpen}
      className="px-14 py-4 bg-yellow-500 text-black font-black italic text-lg rounded-full hover:bg-yellow-400 transition-colors shadow-[0_0_30px_rgba(234,179,8,0.4)]"
    >
      ABRIR PACOTE
    </motion.button>
  </motion.div>
);

const OpenedCards = ({
  cards,
  onBack,
}: {
  cards: any[];
  onBack: () => void;
}) => {
  const { xTranslate, cardSize, mouseX } = useRewards(cards);
  const cursorY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);
  const smoothY = useSpring(cursorY, { stiffness: 50, damping: 20 });

  return (
    <motion.div
      key="opened"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen w-screen flex flex-col items-center justify-center relative overflow-hidden cursor-none"
    >
      {/* Flash burst on entry */}
      <motion.div
        initial={{ opacity: 0.9, scale: 0.1 }}
        animate={{ opacity: 0, scale: 4 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="fixed inset-0 bg-yellow-300 rounded-full pointer-events-none z-50"
      />

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
            initial={{ opacity: 0, y: 120, rotateY: 180, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
            whileHover={{ y: -30, scale: 1.1, transition: { duration: 0.3 } }}
            transition={{ delay: index * 0.12, type: "spring", stiffness: 100 }}
            className="relative group shrink-0"
          >
            <div className="absolute inset-0 bg-yellow-500/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Card card={card.card} size={cardSize as CardSize} />
          </motion.div>
        ))}
      </motion.div>

      <button
        onClick={onBack}
        className="mt-10 md:mt-16 px-12 py-4 bg-white text-black font-black italic rounded-full hover:bg-yellow-400 hover:scale-110 active:scale-95 transition-all flex items-center gap-2 shadow-2xl z-30 pointer-events-auto"
      >
        CONTINUAR <ArrowRight size={20} />
      </button>

      {/* Custom cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-yellow-500 rounded-full pointer-events-none z-[100] mix-blend-difference"
        style={{ x: mouseX, y: smoothY }}
      />

      <div className="absolute inset-y-0 left-0 w-[15vw] bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-[15vw] bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />
    </motion.div>
  );
};

export const RewardsScenario = ({ onBack }: { onBack: () => void }) => {
  const [isOpened, setIsOpened] = useState(false);
  const { result } = useBattleStore();

  const pkg = result?.package;
  const cards: any[] = pkg?.cardsData ?? [];

  if (!pkg || cards.length === 0) {
    return (
      <div className="h-screen w-screen bg-zinc-950 flex flex-col items-center justify-center">
        <p className="text-zinc-500 mb-4">Nenhuma carta encontrada no pacote.</p>
        <button onClick={onBack} className="text-white underline">
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-zinc-950 flex items-center justify-center relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <SealedPackage
            name={pkg.name}
            cardCount={cards.length}
            onOpen={() => setIsOpened(true)}
          />
        ) : (
          <OpenedCards cards={cards} onBack={onBack} />
        )}
      </AnimatePresence>
    </div>
  );
};
