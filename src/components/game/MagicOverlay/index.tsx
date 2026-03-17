import React from "react";
import { Card } from "../Card";
import { useMagicOverlay } from "./hooks/useMagicOverlayActions";
import { useIsMobile } from "../../../hooks/useIsMobile";

export const MagicOverlay: React.FC = () => {
  const {
    selectedCard,
    options,
    handleCancel,
    isVisible
  } = useMagicOverlay();
  const isMobile = useIsMobile();

  if (!selectedCard || !isVisible) return null;

  return (
    <div className="absolute inset-0 z-[110] flex items-center justify-center animate-in fade-in zoom-in duration-300 backdrop-blur-xl bg-black/85 px-4 sm:px-0">

      <div className="flex flex-col items-center gap-5 sm:gap-0 w-full max-w-lg sm:max-w-md">

        <div className="shrink-0 shadow-[0_0_80px_rgba(6,182,212,0.3)] sm:mb-12 sm:scale-125 transition-transform">
          <Card card={selectedCard} size={isMobile ? "sm" : "lg"} />
        </div>

        <div className="flex flex-col gap-3 sm:gap-10 w-full sm:px-6">
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2 sm:gap-6 w-full">
            {options.map((opt) => (
              <button
                key={opt.mode}
                style={{ touchAction: "manipulation" }}
                onClick={opt.action}
                className="flex items-center sm:flex-col gap-3 sm:gap-4 p-3 sm:p-6 rounded-xl border border-white/10 transition-all hover:scale-105 active:scale-95 hover:bg-white/5 group"
              >
                <div className={`p-2 sm:p-4 rounded-full ${opt.color} shadow-lg shrink-0 group-hover:shadow-cyan-500/50 transition-all`}>
                  {opt.icon}
                </div>
                <div className="text-left sm:text-center">
                  <span className="block font-bold text-sm sm:text-lg tracking-wider uppercase">{opt.label}</span>
                  <span className="text-[9px] sm:text-[10px] text-zinc-400 uppercase leading-tight">{opt.description}</span>
                </div>
              </button>
            ))}
          </div>

          <button
            style={{ touchAction: "manipulation" }}
            onClick={handleCancel}
            className="group flex items-center justify-center sm:flex-col gap-2 transition-all py-1"
          >
            <span className="text-[10px] font-bold text-zinc-500 group-hover:text-red-400 uppercase tracking-[0.4em] transition-colors">
              [ Voltar ]
            </span>
            <div className="hidden sm:block h-px w-0 group-hover:w-full bg-red-400/50 transition-all duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
