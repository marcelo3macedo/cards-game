import { Trash2, Shield, Sword } from "lucide-react";
import { getImageUrl } from "../../../utils/imageUtils";

export const DeckSlot = ({ card, onRemove, onZoom }: any) => {
  const getAttributeColor = (attr: string) => {
    switch (attr?.toLowerCase()) {
      case "monster": return "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]";
      case "spell": return "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]";
      case "trap": return "bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.4)]";
      default: return "bg-zinc-500";
    }
  };

  return (
    <div
      onClick={() => onZoom(card)}
      className="group relative flex items-center gap-3 bg-zinc-900/40 hover:bg-zinc-800/60 p-1.5 rounded-xl border border-white/5 hover:border-blue-500/40 transition-all cursor-pointer overflow-hidden"
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${getAttributeColor(card.attribute)}`} />

      <div className="relative w-10 h-12 rounded-lg overflow-hidden border border-white/10 bg-black flex-shrink-0">
        <img
          src={getImageUrl(card.imageUrl)}
          alt={card.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
        />
        {card.attribute === 'monster' && (
          <div className="absolute bottom-0 right-0 bg-black/70 px-1 text-[7px] font-black text-yellow-500 border-tl border-white/10">
            ★{card.stars}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-black uppercase italic leading-none truncate text-zinc-100 group-hover:text-blue-400 transition-colors">
          {card.name}
        </div>

        <div className="flex items-center gap-2 mt-1">
          {card.attribute === 'monster' ? (
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-0.5 text-[8px] font-bold text-orange-400 uppercase">
                <Sword size={8} /> {card.attackPower}
              </span>
              <span className="flex items-center gap-0.5 text-[8px] font-bold text-blue-400 uppercase">
                <Shield size={8} /> {card.defensePower}
              </span>
            </div>
          ) : (
            <span className={`text-[7px] px-1.5 py-0.5 rounded-md font-black uppercase border border-white/5 bg-white/5 text-zinc-400`}>
              {card.type}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center pr-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(card.instanceId);
          }}
          className="p-2 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
          title="Remover do Deck"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};
