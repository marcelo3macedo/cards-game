import { motion, AnimatePresence } from "framer-motion";
import { useHandController } from "./hooks/useHandController";
import { PlayerHand } from ".";
import { useBattleStore } from "../../../store/BattleStore";

export const PlayerHandContainer = () => {
  const { isVisible, isHidden, setVisible } = useHandController();
  const { player } = useBattleStore();

  const selectCardHandle = () => {
    setVisible(false);
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="pointer-events-auto pb-8"
          >
            <PlayerHand
              cards={player?.hand}
              onSelect={() => selectCardHandle()}
              isHidden={isHidden}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
