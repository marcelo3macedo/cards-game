import { motion, AnimatePresence } from 'framer-motion';
import type { MonsterCard } from '../../../core/domain/Card';
import { useHandStore } from '../../../store/HandStore';
import { useHandController } from './hooks/useHandController';
import { PlayerHand } from '.';

interface PlayerHandContainerProps {
  onSelectCard: (card: MonsterCard) => void;
}

export const PlayerHandContainer = ({ onSelectCard }: PlayerHandContainerProps) => {
  const { cards } = useHandStore();
  const { isVisible } = useHandController();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="pointer-events-auto pb-8"
          >
            <PlayerHand 
              cards={cards} 
              onSelect={(card) => onSelectCard(card as MonsterCard)}
              isHidden={false}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};