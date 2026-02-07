import { useState } from "react";
import { AlertTriangle, LogOut, X } from "lucide-react";

interface AbandonProps {
  onConfirm: () => void;
}

export function AbandonBattleModal({ onConfirm }: AbandonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-2 bg-zinc-900/50 hover:bg-red-950/40 border border-zinc-800 hover:border-red-500/50 px-4 py-2 rounded-lg transition-all duration-300"
      >
        <LogOut size={16} className="text-zinc-500 group-hover:text-red-500" />
        <span className="text-xs font-bold text-zinc-400 group-hover:text-red-400 uppercase tracking-widest">
          Abandonar
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative bg-zinc-900 border-2 border-red-900/50 p-8 rounded-2xl max-w-sm w-full shadow-[0_0_50px_rgba(153,27,27,0.3)] animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mb-4 border border-red-500/30">
                <AlertTriangle className="text-red-500" size={32} />
              </div>

              <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2">
                Desistir do Duelo?
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                Esta ação será contada como uma derrota automática. Tem certeza que deseja fugir da batalha?
              </p>

              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-bold rounded-xl transition-colors"
                >
                  CONTINUAR
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 px-4 py-3 bg-red-700 hover:bg-red-600 text-white text-sm font-bold rounded-xl shadow-[0_4px_15px_rgba(185,28,28,0.4)] transition-all active:scale-95"
                >
                  ABANDONAR
                </button>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
