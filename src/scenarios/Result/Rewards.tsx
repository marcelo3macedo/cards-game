import { motion } from 'framer-motion';
import { MonsterCard } from '../../core/domain/Card';
import { ArrowRight } from 'lucide-react';
import { Card } from '../../components/game/Card';

export const RewardsScenario = ({ cards, onBack }: { cards: MonsterCard[], onBack: () => void }) => {
  return (
    <div className="h-screen w-screen bg-zinc-950 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-20 text-4xl font-black italic text-yellow-500 drop-shadow-glow">NEW CARDS ACQUIRED</div>

      <div className="flex gap-8 mt-12">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 100, rotateY: 180 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ delay: index * 0.2, type: 'spring' }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-yellow-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <Card card={card} size="lg" />
          </motion.div>
        ))}
      </div>

      <button 
        onClick={onBack}
        className="mt-20 px-12 py-4 bg-white text-black font-black italic rounded-full hover:bg-zinc-200 transition-colors flex items-center gap-2"
      >
        CONTINUAR <ArrowRight size={20} />
      </button>
    </div>
  );
};