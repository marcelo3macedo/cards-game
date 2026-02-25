import React from "react";
import { Card } from "../Card";
import { useMagicOverlay } from "./hooks/useMagicOverlayActions";

export const MagicOverlay: React.FC = () => {
  const {
    selectedCard,
    options,
    handleCancel,
    isVisible
  } = useMagicOverlay();

  if (!selectedCard || !isVisible) return null;

  return (
    <div className="absolute inset-0 z-[110] flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300 backdrop-blur-xl bg-black/85">
      <div className="mb-12 shadow-[0_0_100px_rgba(6,182,212,0.3)] scale-125 transition-transform">
        <Card card={selectedCard} size="lg" />
      </div>

      <div className="flex flex-col items-center gap-10 w-full max-w-md px-6">
        <div className="grid grid-cols-2 gap-6 w-full">
          {options.map((opt) => (
            <button
              key={opt.mode}
              onClick={opt.action}
              className={`flex flex-col items-center gap-4 p-6 rounded-xl border border-white/10 transition-all
                hover:scale-110 hover:bg-white/5 group`}
            >
              <div className={`p-4 rounded-full ${opt.color} shadow-lg group-hover:shadow-cyan-500/50 transition-all`}>
                {opt.icon}
              </div>
              <div className="text-center">
                <span className="block font-bold text-lg tracking-wider uppercase">{opt.label}</span>
                <span className="text-[10px] text-zinc-400 uppercase">{opt.description}</span>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={handleCancel}
          className="group flex flex-col items-center gap-2 transition-all"
        >
          <span className="text-[10px] font-bold text-zinc-500 group-hover:text-red-400 uppercase tracking-[0.4em] transition-colors">
            [ ESC para Voltar ]
          </span>
          <div className="h-px w-0 group-hover:w-full bg-red-400/50 transition-all duration-300" />
        </button>
      </div>
    </div>
  );
};
