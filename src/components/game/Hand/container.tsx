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

  if (!player?.hand || player.hand.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="pointer-events-auto"
          >
            <PlayerHand
              cards={player?.hand}
              onSelect={selectCardHandle}
              isHidden={isHidden || !player?.canSummon}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
