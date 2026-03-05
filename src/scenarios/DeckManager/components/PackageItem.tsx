import { motion } from "framer-motion";
import { Package, Swords, Store, ChevronRight, Loader2 } from "lucide-react";
import type { UserPackage } from "../../../services/packageService";

interface Props {
  pkg: UserPackage;
  onOpen: (pkg: UserPackage) => void;
  opening: boolean;
}

export const PackageItem = ({ pkg, onOpen, opening }: Props) => {
  const isVillain = pkg.type === "villain";
  const sourceName = isVillain ? pkg.villain?.name : pkg.store?.name;

  const date = new Date(pkg.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex items-center gap-4 p-3 rounded-xl border border-white/5 bg-zinc-900/60 hover:border-yellow-500/30 hover:bg-zinc-800/60 transition-all"
    >
      {/* Icon */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isVillain ? "bg-orange-950/50 border border-orange-500/20" : "bg-blue-950/50 border border-blue-500/20"}`}>
        {isVillain
          ? <Swords size={18} className="text-orange-400" />
          : <Store size={18} className="text-blue-400" />
        }
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-black uppercase italic leading-tight truncate text-zinc-100">
          {pkg.name}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[9px] text-zinc-500 font-medium">{sourceName}</span>
          <span className="text-zinc-700">·</span>
          <span className="text-[9px] font-bold text-yellow-500">
            <Package size={8} className="inline mr-0.5" />
            {pkg.cards.length} {pkg.cards.length === 1 ? "carta" : "cartas"}
          </span>
          <span className="text-zinc-700">·</span>
          <span className="text-[9px] text-zinc-600">{date}</span>
        </div>
      </div>

      {/* Open button */}
      <motion.button
        whileTap={{ scale: 0.93 }}
        disabled={opening}
        onClick={() => onOpen(pkg)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-[10px] font-black uppercase hover:bg-yellow-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
      >
        {opening ? <Loader2 size={12} className="animate-spin" /> : <ChevronRight size={12} />}
        ABRIR
      </motion.button>
    </motion.div>
  );
};
