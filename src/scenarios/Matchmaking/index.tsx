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
    <div className="p-8 h-screen flex flex-col items-center justify-center bg-black text-white">
      <h2 className="text-3xl font-bold mb-10 border-b-2 border-yugi-gold pb-2 uppercase tracking-widest">
        Duelo Confirmado
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl w-full bg-zinc-900/50 p-10 rounded-xl border border-zinc-800">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-yugi-gold rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative w-64 h-80 bg-zinc-800 rounded-lg overflow-hidden border-2 border-zinc-700">
            <img
              src={getImageUrl(selectedVillain.profilePictureUrl)}
              alt={selectedVillain.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 space-y-4 text-center md:text-left">
          <div>
            <span className="text-yugi-gold text-sm font-bold tracking-tighter uppercase">Oponente Nível {selectedVillain.level}</span>
            <h3 className="text-5xl font-black text-white italic">{selectedVillain.name}</h3>
          </div>

          <p className="text-zinc-400 text-lg leading-relaxed italic">
            "{selectedVillain.description}"
          </p>

          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded mb-4 text-sm">
              ⚠️ {error}
            </div>
          )}

          <div className="pt-6">
            <button
              onClick={handleStart}
              disabled={loading}
              className={`w-full md:w-auto px-12 py-4 font-bold rounded-full transform transition
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

      <button onClick={onBack} className="mt-12 text-zinc-500 hover:text-white transition-colors flex items-center gap-2">
        <span>←</span> Desistir e Voltar
      </button>
    </div>
  );
}
