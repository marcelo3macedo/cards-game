import React from "react";
import { motion } from "framer-motion";
import { Trophy, Home } from "lucide-react";
import { DuelRating } from "../../components/results/DuelRating";

interface BattleResultProps {
  status: "victory" | "defeat";
  opponentName: string;
  opponentImage: string;
  opponentMessage: string;
  rating: number;
  onSeeRewards: () => void;
  onGoMenu: () => void;
}

export const BattleResultContainer: React.FC<BattleResultProps> = ({
  status,
  opponentName,
  opponentImage,
  opponentMessage,
  rating,
  onSeeRewards,
  onGoMenu,
}) => {
  const isVictory = status === "victory";

  return (
    <div className="h-screen w-screen bg-zinc-950 flex items-center justify-center overflow-hidden relative font-sans text-white">
      <div
        className={`absolute inset-0 opacity-20 ${isVictory ? "bg-blue-600" : "bg-red-900"} blur-[120px]`}
      />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="z-10 flex flex-col items-center max-w-4xl w-full px-6"
      >
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className={`text-8xl font-black italic tracking-tighter mb-8 ${isVictory ? "text-blue-500" : "text-red-600"} drop-shadow-2xl`}
        >
          {isVictory ? "VITÓRIA" : "DERROTA"}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full bg-black/40 backdrop-blur-md border border-white/10 p-10 rounded-3xl shadow-2xl">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative">
              <div
                className={`absolute inset-0 rounded-full blur-2xl ${isVictory ? "bg-blue-500/20" : "bg-red-500/20"}`}
              />
              <img
                src={opponentImage}
                alt={opponentName}
                className={`w-48 h-48 rounded-full border-4 object-cover ${isVictory ? "border-blue-500" : "border-red-600 grayscale"}`}
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-zinc-900 px-4 py-1 rounded-full border border-white/10 text-xs font-bold uppercase tracking-widest">
                {opponentName}
              </div>
            </div>

            <p className="text-zinc-400 italic text-lg leading-relaxed mt-4">"{opponentMessage}"</p>
          </div>

          <div className="flex flex-col items-center md:items-start gap-8">
            <div className="space-y-2">
              <span className="text-zinc-500 uppercase tracking-widest text-sm font-bold">
                Avaliação do Duelo
              </span>
              <DuelRating score={isVictory ? rating : 0} />
            </div>

            <div className="w-full h-px bg-white/10" />

            <div className="flex flex-col gap-4 w-full">
              {isVictory && (
                <button
                  onClick={onSeeRewards}
                  className="group flex items-center justify-between bg-blue-600 hover:bg-blue-500 text-white font-black px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                >
                  VER RECOMPENSAS
                  <Trophy className="group-hover:rotate-12 transition-transform" />
                </button>
              )}

              <button
                onClick={onGoMenu}
                className="group flex items-center justify-between bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold px-8 py-4 rounded-xl transition-all"
              >
                VOLTAR AO MENU
                <Home size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
