import { Plus, Sparkles, Sword, Shield } from "lucide-react";
import { getImageUrl } from "../../../utils/imageUtils";

const ATTR_COLORS: Record<string, string> = {
  monster: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  spell: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  trap: "bg-pink-500/20 text-pink-300 border-pink-500/30",
};

interface Props {
  card: any;
  onAdd: (card: any) => void;
  onZoom: (card: any) => void;
  viewMode: "grid" | "list";
}

export const CardLibraryItem = ({ card, onAdd, onZoom, viewMode }: Props) => {
  const attrColor = ATTR_COLORS[card.attribute] ?? "bg-zinc-500/20 text-zinc-300 border-zinc-500/30";

  if (viewMode === "grid") {
    return (
      <div
        className="group relative rounded-xl overflow-hidden border border-white/8 bg-zinc-900 hover:border-blue-500/50 transition-all cursor-pointer select-none"
        onClick={() => onZoom(card)}
      >
        {/* Card image — 3:4 ratio */}
        <div className="aspect-[3/4] relative overflow-hidden bg-zinc-800">
          {card.imageUrl ? (
            <img
              src={getImageUrl(card.imageUrl)}
              alt={card.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Sparkles size={24} className="opacity-10" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Attribute badge */}
          <div className={`absolute top-1.5 left-1.5 text-[8px] font-black px-1.5 py-0.5 rounded-full border ${attrColor}`}>
            {card.attribute === "monster" ? "MON" : card.attribute === "spell" ? "MAG" : "ARM"}
          </div>

          {/* Monster stars */}
          {card.attribute === "monster" && (
            <div className="absolute top-1.5 right-1.5 bg-black/70 text-yellow-400 text-[8px] font-black px-1 py-0.5 rounded">
              ★{card.stars}
            </div>
          )}

          {/* Add button overlay */}
          <button
            onClick={(e) => { e.stopPropagation(); onAdd(card); }}
            className="absolute bottom-2 right-2 w-7 h-7 flex items-center justify-center bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all active:scale-90"
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Footer */}
        <div className="p-2 bg-zinc-900">
          <p className="text-[9px] font-black uppercase italic leading-tight truncate text-zinc-200 group-hover:text-blue-300 transition-colors">
            {card.name}
          </p>
          {card.attribute === "monster" && (
            <div className="flex items-center gap-2 mt-0.5">
              <span className="flex items-center gap-0.5 text-[8px] font-bold text-orange-400">
                <Sword size={7} /> {card.attackPower}
              </span>
              <span className="flex items-center gap-0.5 text-[8px] font-bold text-blue-400">
                <Shield size={7} /> {card.defensePower}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // List mode
  return (
    <div
      onClick={() => onZoom(card)}
      className="group flex items-center gap-3 p-2.5 rounded-xl border border-white/5 bg-zinc-900/50 hover:border-blue-500/40 hover:bg-zinc-800/60 transition-all cursor-pointer"
    >
      <div className="w-10 h-14 rounded-lg overflow-hidden border border-white/10 bg-zinc-800 flex-shrink-0">
        {card.imageUrl ? (
          <img src={getImageUrl(card.imageUrl)} alt={card.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Sparkles size={14} className="opacity-20" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-[11px] font-black uppercase italic leading-none truncate group-hover:text-blue-300 transition-colors">
          {card.name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-[8px] px-1.5 py-0.5 rounded-full border font-bold ${attrColor}`}>
            {card.attribute}
          </span>
          {card.attribute === "monster" && (
            <span className="text-[8px] text-zinc-500 font-bold">
              {card.attackPower}/{card.defensePower}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onAdd(card); }}
        className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 flex-shrink-0 active:scale-90 transition-all"
      >
        <Plus size={13} />
      </button>
    </div>
  );
};
