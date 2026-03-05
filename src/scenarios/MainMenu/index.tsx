import type { Villain } from "../../store/VillainStore";
import { getImageUrl } from "../../utils/imageUtils";
import { getRankName } from "../../utils/rankUtils";
import { VillainCard } from "./components/VillainCard";
import { useMainMenu } from "./hooks/useMainMenu";

export default function MainMenuScenario({
  onSelectOpponent,
  onViewDeck,
  onViewTips,
  onViewStore,
}: any) {
  const { user, villains, loading, handleLogout, setSelectedVillain } = useMainMenu();
  const handleChooseOpponent = (villain: Villain) => {
    setSelectedVillain(villain);
    onSelectOpponent();
  };

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

      <div className="flex flex-1 min-h-0 overflow-hidden">
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
            onClick={onViewStore}
            className="w-full py-4 px-6 text-zinc-500 font-bold text-left hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest text-xs"
          >
            Loja
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
        <main className="flex-1 p-10 overflow-y-auto custom-scrollbar bg-black/10">
          <div className="max-w-4xl mx-auto">
            <header className="mb-10">
              <h1 className="text-4xl font-black italic uppercase tracking-tighter">
                Escolha seu Destino
              </h1>
              <p className="text-zinc-500">
                Selecione um oponente para iniciar o duelo, {user?.name}.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {villains.map((villain) => (
                <VillainCard
                  key={villain.id}
                  villain={villain}
                  userLevel={user?.level || 0}
                  onSelect={handleChooseOpponent}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
