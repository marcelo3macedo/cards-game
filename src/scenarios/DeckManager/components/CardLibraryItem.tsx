import { Plus, Sparkles } from "lucide-react";
import { getImageUrl } from "../../../utils/imageUtils";

export const CardLibraryItem = ({ card, onAdd, onZoom, localDeck }: any) =>  {
  const copiesInDeck = localDeck.filter((c: any) => c.id === card.id).length;
  const isLimitReached = copiesInDeck >= 3;

  return (
    <div
      onClick={() => onZoom(card)}
      className={`group flex items-center p-3 rounded-xl border transition-all
        ${isLimitReached ? "opacity-50 grayscale bg-black/40" : "bg-zinc-900/40 hover:border-blue-500/40 cursor-pointer"}`}
    >
      <div className="w-12 h-16 rounded overflow-hidden border border-white/10 bg-zinc-800">
        {card.imageUrl ? (
          <img src={getImageUrl(card.imageUrl)} alt={card.name} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full"><Sparkles size={16} className="opacity-20" /></div>
        )}
      </div>
      <div className="flex-1 ml-4">
        <h3 className="text-[11px] font-black uppercase italic leading-none mb-1">{card.name}</h3>
        <span className="text-[8px] px-1.5 py-0.5 rounded border border-white/10 bg-white/5 font-bold text-zinc-400">
          {card.attribute}
        </span>
      </div>
      <button
        disabled={isLimitReached}
        onClick={(e) => { e.stopPropagation(); onAdd(card); }}
        className={`p-2 rounded-lg ${isLimitReached ? "bg-zinc-800" : "bg-blue-600 hover:bg-blue-500"}`}
      >
        <Plus size={14} />
      </button>
    </div>
  )
}
