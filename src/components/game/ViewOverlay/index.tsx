import React from "react";
import { Card } from "../Card";
import { useViewOverlay } from "./hooks/useViewOverlay";

export const ViewOverlay: React.FC<any> = () => {
  const { onClose, viewCard } = useViewOverlay();

  if (!viewCard) return;

  return (
    <div
      className="absolute inset-0 z-[100] flex flex-col items-center justify-center animate-in fade-in duration-300 backdrop-blur-sm bg-black/60"
      onClick={onClose}
    >
      <div
        className="relative scale-110 drop-shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <Card card={viewCard} size="lg" />
      </div>

      <div className="mt-12 flex flex-col items-center gap-4">
        <button
          onClick={onClose}
          className="px-8 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-[0.2em] transition-all rounded-sm backdrop-blur-md"
        >
          Fechar Visualização
        </button>

        <span className="text-[9px] text-zinc-400 uppercase tracking-widest opacity-50">
          [ ESC ou Clique fora para sair ]
        </span>
      </div>
    </div>
  );
};
