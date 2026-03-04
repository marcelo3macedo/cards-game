import { Trash2, Shield, Sword } from "lucide-react";
import { getImageUrl } from "../../../utils/imageUtils";

const ATTR_LEFT: Record<string, string> = {
  monster: "bg-orange-500 shadow-[0_0_6px_rgba(249,115,22,0.5)]",
  spell: "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]",
  trap: "bg-pink-500 shadow-[0_0_6px_rgba(236,72,153,0.5)]",
};

const ATTR_HOVER: Record<string, string> = {
  monster: "hover:border-orange-500/30",
  spell: "hover:border-emerald-500/30",
  trap: "hover:border-pink-500/30",
};

export const DeckSlot = ({ card, onRemove, onZoom }: any) => {
  const attrLeft = ATTR_LEFT[card.attribute] ?? "bg-zinc-500";
  const attrHover = ATTR_HOVER[card.attribute] ?? "hover:border-white/10";

  return (
    <div
      onClick={() => onZoom(card)}
      className={`group relative flex items-center gap-2.5 bg-zinc-900/50 hover:bg-zinc-800/70 p-1.5 pl-3.5 rounded-xl border border-white/5 ${attrHover} transition-all cursor-pointer overflow-hidden`}
    >
      {/* Attribute bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl ${attrLeft}`} />

      {/* Card image */}
      <div className="relative w-9 h-[52px] rounded-lg overflow-hidden border border-white/10 bg-black flex-shrink-0">
        <img
          src={getImageUrl(card.imageUrl)}
          alt={card.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-black uppercase italic leading-none truncate text-zinc-200 group-hover:text-white transition-colors">
          {card.name}
        </div>

        <div className="flex items-center gap-2 mt-1">
          {card.attribute === "monster" ? (
            <>
              <span className="flex items-center gap-0.5 text-[8px] font-bold text-orange-400">
                <Sword size={8} /> {card.attackPower}
              </span>
              <span className="flex items-center gap-0.5 text-[8px] font-bold text-blue-400">
                <Shield size={8} /> {card.defensePower}
              </span>
              <span className="text-[8px] text-yellow-500 font-bold">★{card.stars}</span>
            </>
          ) : (
            <span className="text-[8px] px-1.5 py-0.5 rounded-md font-bold uppercase bg-white/5 border border-white/5 text-zinc-500">
              {card.type}
            </span>
          )}
        </div>
      </div>

      {/* Remove button */}
      <button
        onClick={(e) => { e.stopPropagation(); onRemove(card.instanceId); }}
        className="p-1.5 text-zinc-700 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100 flex-shrink-0 mr-0.5"
        title="Remover do Deck"
      >
        <Trash2 size={13} />
      </button>
    </div>
  );
};
