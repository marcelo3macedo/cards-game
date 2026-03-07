import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayerHandContainer } from "../../components/game/Hand/container";
import { AbandonBattleModal } from "./components/AbandonBattleModal";
import { SummonOverlay } from "../../components/game/SummorOverlay";
import { EndTurnAction } from "./components/EndTurnAction";
import { OpponentHandContainer } from "../../components/game/Hand/opponentContainer";
import { EnemyLifePoints } from "./components/EnemyLifePoints";
import { useBattleEvents } from "./hooks/useBattleEvents";
import { InvokingCardMessage } from "./components/InvokingCardMessage";
import { UserLifePoints } from "./components/UserLifePoints";
import { TargetSelectMessage } from "./components/TargetSelectMessage";
import { GameBoard } from "../../components/game/Board";
import { ViewOverlay } from "../../components/game/ViewOverlay";
import { BattleAnimation } from "../../components/game/Battle/BattleAnimation";
import { MagicOverlay } from "../../components/game/MagicOverlay";
import { EffectCardOverlay } from "../../components/game/EffectCardOverlay";
import { FusionAnimation } from "../../components/game/FusionAnimation";
import { useVillainStore } from "../../store/VillainStore";

export default function BattleScenario({ onBack, onEnd }: any) {
  const { currentTurnOwner, isOpponentPlaying, handleAbandon, handleEndTurn } = useBattleEvents({ onBack, onEnd });
  const selectedVillain = useVillainStore((s) => s.selectedVillain);
  const [revealing, setRevealing] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setRevealing(false), 3200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="h-screen w-screen bg-zinc-950 flex flex-col items-center justify-center overflow-hidden text-white font-sans select-none relative bg-[radial-gradient(circle_at_center,_#1a1a2e_0%,#09090b_100%)]">
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('/grid-pattern.svg')] bg-center [mask-image:radial-gradient(white,transparent)]"></div>

      <div className="actions">
        <AbandonBattleModal onConfirm={handleAbandon} />
        <EndTurnAction
          handleEndTurn={handleEndTurn}
          currentTurnOwner={currentTurnOwner}
          isOpponentPlaying={isOpponentPlaying}
        />
      </div>
      <div className="life-points">
        <EnemyLifePoints />
        <UserLifePoints />
      </div>
      <div className="hand-deck">
        <OpponentHandContainer />
        <PlayerHandContainer />
      </div>
      <div className="messages">
        <InvokingCardMessage />
        <TargetSelectMessage />
      </div>
      <div className="effects">
        <SummonOverlay />
        <MagicOverlay />
        <ViewOverlay />
        <BattleAnimation />
        <FusionAnimation />
        <EffectCardOverlay />
      </div>
      <div className="board">
        <GameBoard />
      </div>

      <AnimatePresence>
        {revealing && (
          <motion.div
            key="reveal"
            className="fixed inset-0 z-[500] overflow-hidden pointer-events-none"
            exit={{}}
          >
            {/* Top panel */}
            <motion.div
              className="absolute inset-x-0 top-0 h-1/2 bg-zinc-950 flex items-end justify-center pb-2 overflow-hidden"
              initial={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            >
              <motion.div
                className="relative z-10 text-center mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <p className="text-[10px] tracking-[0.5em] uppercase text-red-400 font-bold mb-1">Oponente</p>
                <h2 className="text-4xl font-black italic uppercase text-white tracking-tighter drop-shadow-lg">
                  {selectedVillain?.name ?? "???"}
                </h2>
              </motion.div>
            </motion.div>

            {/* Bottom panel */}
            <motion.div
              className="absolute inset-x-0 bottom-0 h-1/2 bg-zinc-950 flex items-start justify-center pt-2"
              initial={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            >
              <motion.div
                className="relative z-10 text-center mt-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <p className="text-[10px] tracking-[0.5em] uppercase text-blue-400 font-bold mb-1">Prepare-se</p>
                <p className="text-2xl font-black italic uppercase text-zinc-300 tracking-widest">DUELO!</p>
              </motion.div>
            </motion.div>

            {/* Center line flash */}
            <motion.div
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-white"
              initial={{ scaleX: 0, opacity: 1 }}
              animate={{ scaleX: 1, opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
