import { useVillainStore } from "../../store/VillainStore";
import { getImageUrl } from "../../utils/imageUtils";
import { useStartBattle } from "./hooks/useStartBattle";

export default function MatchmakingScenario({ onBattleStarted, onBack }: any) {
  const selectedVillain = useVillainStore((state) => state.selectedVillain);
  const { startBattle, loading, error } = useStartBattle();

  const handleStart = async () => {
    const initialState = await startBattle();
    if (initialState) {
      onBattleStarted(initialState);
    }
  };

  if (!selectedVillain) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>Nenhum oponente selecionado.</p>
        <button onClick={onBack} className="text-blue-500">Voltar</button>
      </div>
    );
  }

  return (
    <div
      className="px-4 sm:p-8 flex flex-col items-center justify-center bg-black text-white"
      style={{ minHeight: "100dvh" }}
    >
      <h2 className="text-xl sm:text-3xl font-bold mb-6 sm:mb-10 border-b-2 border-yugi-gold pb-2 uppercase tracking-widest text-center">
        Duelo Confirmado
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-12 max-w-5xl w-full bg-zinc-900/50 p-5 sm:p-10 rounded-xl border border-zinc-800">
        <div className="relative group shrink-0">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-yugi-gold rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative w-44 h-56 sm:w-64 sm:h-80 bg-zinc-800 rounded-lg overflow-hidden border-2 border-zinc-700">
            <img
              src={getImageUrl(selectedVillain.profilePictureUrl)}
              alt={selectedVillain.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 space-y-3 sm:space-y-4 text-center md:text-left">
          <div>
            <span className="text-yugi-gold text-xs sm:text-sm font-bold tracking-tighter uppercase">
              Oponente Nível {selectedVillain.level}
            </span>
            <h3 className="text-3xl sm:text-5xl font-black text-white italic">{selectedVillain.name}</h3>
          </div>

          <p className="text-zinc-400 text-sm sm:text-lg leading-relaxed italic">
            "{selectedVillain.description}"
          </p>

          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded mb-4 text-sm">
              ⚠️ {error}
            </div>
          )}

          <div className="pt-4 sm:pt-6">
            <button
              onClick={handleStart}
              disabled={loading}
              style={{ touchAction: "manipulation" }}
              className={`w-full md:w-auto px-12 py-4 font-bold rounded-full transform transition active:scale-95
                ${loading
                  ? "bg-zinc-700 cursor-not-allowed opacity-70"
                  : "bg-red-700 hover:bg-red-600 hover:scale-110 shadow-[0_0_20px_rgba(185,28,28,0.4)]"
                } text-white`}
            >
              {loading ? "GERANDO DUELO..." : "INICIAR BATALHA"}
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={onBack}
        style={{ touchAction: "manipulation" }}
        className="mt-8 sm:mt-12 text-zinc-500 hover:text-white active:text-white transition-colors flex items-center gap-2 py-2"
      >
        <span>←</span> Desistir e Voltar
      </button>
    </div>
  );
}
