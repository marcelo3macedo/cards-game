import { getImageUrl } from "../../utils/imageUtils";
import { getRankName } from "../../utils/rankUtils";
import { useMainMenu } from "./hooks/useMainMenu";

export default function MainMenuScenario({
  onSelectOpponent,
  onViewDeck,
  onViewTips,
}: any) {
  const { user, loading, handleLogout } = useMainMenu();

  if (loading) {
    return (
      <div className="h-screen w-screen bg-zinc-950 flex items-center justify-center text-blue-500 font-black italic">
        CARREGANDO DUELISTA...
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-zinc-950 flex flex-col overflow-hidden text-white bg-[radial-gradient(circle_at_top_right,_#1e1b4b_0%,#09090b_100%)]">

      <div className="p-6 bg-black/40 border-b border-white/5 backdrop-blur-md flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-blue-500 overflow-hidden bg-zinc-800">
              <img
                src={getImageUrl(user?.profile?.imageUrl) || "/placeholder-avatar.jpg"}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-blue-600 text-[10px] font-black px-2 py-0.5 rounded-full border border-zinc-950">
              LV {user?.level || 1}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-black italic uppercase tracking-tighter text-blue-400">
              {user?.name || "Duelista Anônimo"}
            </h2>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
              {getRankName(user?.level || 0)}
            </p>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="text-center">
            <p className="text-[10px] text-zinc-500 uppercase font-bold">Pontos</p>
            <p className="text-xl font-black text-yellow-500">{user?.points || 0}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-zinc-500 uppercase font-bold">Status</p>
            <p className={`text-sm font-black ${user?.active ? "text-green-500" : "text-red-500"}`}>
              {user?.active ? "ONLINE" : "OFFLINE"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        <nav className="w-64 bg-black/20 border-r border-white/5 p-6 flex flex-col gap-3">
          <label className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em] mb-2">
            Menu Principal
          </label>

          <button className="w-full py-4 px-6 bg-blue-600/10 border-r-4 border-blue-500 text-blue-400 font-bold text-left hover:bg-blue-600/20 transition-all uppercase tracking-widest text-xs">
            Duelar
          </button>

          <button
            onClick={onViewDeck}
            className="w-full py-4 px-6 text-zinc-500 font-bold text-left hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest text-xs"
          >
            Meu Baralho (Deck)
          </button>

          <button
            onClick={onViewTips}
            className="w-full py-4 px-6 text-zinc-500 font-bold text-left hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest text-xs"
          >
            Dicas & Regras
          </button>

          <div className="mt-auto">
            <button
              onClick={handleLogout}
              className="w-full py-3 text-zinc-700 hover:text-red-400 text-[10px] font-black uppercase tracking-widest transition-colors"
            >
              Sair do Jogo
            </button>
          </div>
        </nav>

        <main className="flex-1 p-10 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <header className="mb-10">
              <h1 className="text-4xl font-black italic uppercase tracking-tighter">
                Escolha seu Destino
              </h1>
              <p className="text-zinc-500">
                Selecione um oponente para iniciar o duelo, {user?.name}.
              </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div
                onClick={onSelectOpponent}
                className="group relative bg-zinc-900/50 border border-white/5 rounded-2xl p-6 cursor-pointer hover:border-blue-500/50 transition-all hover:translate-y-[-4px]"
              >
                <div className="h-48 bg-zinc-800 rounded-xl mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-60"></div>
                </div>
                <h3 className="text-2xl font-black uppercase italic group-hover:text-blue-400 transition-colors">
                  Duelista Iniciante
                </h3>
                <p className="text-zinc-500 text-xs mt-3">
                  Teste seu deck atual de nível {user?.level}.
                </p>
              </div>

              <div className="opacity-40 grayscale bg-zinc-900/50 border border-white/5 rounded-2xl p-6 cursor-not-allowed relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <span className="bg-black/80 px-4 py-2 border border-white/10 text-[10px] font-bold tracking-[0.3em] uppercase">
                    Requer Nível 10
                  </span>
                </div>
                <div className="h-48 bg-zinc-800 rounded-xl mb-4"></div>
                <h3 className="text-2xl font-black uppercase italic">Seto Kaiba</h3>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
