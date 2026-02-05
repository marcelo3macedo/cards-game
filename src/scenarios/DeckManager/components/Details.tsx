import { motion, AnimatePresence } from "framer-motion";
import { Shield, Sparkles, Sword, X } from "lucide-react";
import { getImageUrl } from "../../../utils/imageUtils";

export const Details = ({ viewingCard, setViewingCard }: any) => {
  const getColors = (attr: string) => {
    switch (attr?.toLowerCase()) {
      case "monster": return "border-orange-500/50 text-orange-400 bg-orange-950/20";
      case "spell": return "border-emerald-500/50 text-emerald-400 bg-emerald-950/20";
      case "trap": return "border-pink-500/50 text-pink-400 bg-pink-950/20";
      default: return "border-zinc-500/50 text-zinc-400 bg-zinc-950/20";
    }
  };

  return (
    <AnimatePresence>
      {viewingCard && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setViewingCard(null)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-80 relative flex items-center justify-center bg-black">
              {viewingCard.imageUrl ? (
                <img
                  src={getImageUrl(viewingCard.imageUrl)}
                  alt={viewingCard.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Sparkles size={80} className="text-white/5" />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-black/40" />

              <div className="absolute top-4 right-4 flex gap-1 bg-black/60 px-2 py-1 rounded-full border border-white/10">
                <span className="text-[10px] font-black tracking-tighter">LVL {viewingCard.stars}</span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-2xl font-black uppercase italic leading-tight drop-shadow-lg">
                  {viewingCard.name}
                </h2>
                <div className="flex gap-2 mt-2">
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${getColors(viewingCard.attribute)}`}>
                        {viewingCard.attribute}
                    </span>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded border border-white/10 bg-white/5 text-zinc-300">
                        {viewingCard.type}
                    </span>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Descrição</span>
                <p className="text-zinc-300 text-sm italic leading-relaxed">
                  {viewingCard.description}
                </p>
              </div>

              {viewingCard.attribute === "monster" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-3 rounded-2xl border border-white/5 flex flex-col items-center group hover:border-orange-500/30 transition-colors">
                    <Sword size={18} className="text-orange-500 mb-1" />
                    <span className="text-[9px] font-bold text-zinc-500 uppercase">Ataque</span>
                    <span className="text-2xl font-black text-orange-500">{viewingCard.attackPower}</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-2xl border border-white/5 flex flex-col items-center group hover:border-blue-500/30 transition-colors">
                    <Shield size={18} className="text-blue-500 mb-1" />
                    <span className="text-[9px] font-bold text-zinc-500 uppercase">Defesa</span>
                    <span className="text-2xl font-black text-blue-500">{viewingCard.defensePower}</span>
                  </div>
                </div>
              )}

              <button
                onClick={() => setViewingCard(null)}
                className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 active:scale-[0.98] rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-white/5"
              >
                <X size={18} /> FECHAR DETALHES
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
