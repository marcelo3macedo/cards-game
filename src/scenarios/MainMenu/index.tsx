import { useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

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

  const navItems = (
    <>
      <label className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em] mb-2">
        Menu Principal
      </label>

      <button
        style={{ touchAction: "manipulation" }}
        onClick={() => setMenuOpen(false)}
        className="w-full py-4 px-6 bg-blue-600/10 border-r-4 border-blue-500 text-blue-400 font-bold text-left hover:bg-blue-600/20 transition-all uppercase tracking-widest text-xs"
      >
        Duelar
      </button>

      <button
        style={{ touchAction: "manipulation" }}
        onClick={() => { onViewDeck(); setMenuOpen(false); }}
        className="w-full py-4 px-6 text-zinc-500 font-bold text-left hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest text-xs"
      >
        Meu Baralho (Deck)
      </button>

      <button
        style={{ touchAction: "manipulation" }}
        onClick={() => { onViewStore(); setMenuOpen(false); }}
        className="w-full py-4 px-6 text-zinc-500 font-bold text-left hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest text-xs"
      >
        Loja
      </button>

      <button
        style={{ touchAction: "manipulation" }}
        onClick={() => { onViewTips(); setMenuOpen(false); }}
        className="w-full py-4 px-6 text-zinc-500 font-bold text-left hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest text-xs"
      >
        Dicas & Regras
      </button>

      <div className="mt-auto">
        <button
          style={{ touchAction: "manipulation" }}
          onClick={handleLogout}
          className="w-full py-3 text-zinc-700 hover:text-red-400 text-[10px] font-black uppercase tracking-widest transition-colors"
        >
          Sair do Jogo
        </button>
      </div>
    </>
  );

  return (
    <div
      className="w-screen bg-zinc-950 flex flex-col overflow-hidden text-white bg-[radial-gradient(circle_at_top_right,_#1e1b4b_0%,#09090b_100%)]"
      style={{ height: "100dvh" }}
    >
      {/* Header */}
      <div className="px-4 sm:p-6 py-3 sm:py-4 bg-black/40 border-b border-white/5 backdrop-blur-md flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-blue-500 overflow-hidden bg-zinc-800">
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
            <h2 className="text-base sm:text-xl font-black italic uppercase tracking-tighter text-blue-400">
              {user?.name || "Duelista Anônimo"}
            </h2>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
              {getRankName(user?.level || 0)}
            </p>
          </div>
        </div>

        {/* Stats — visible only on desktop */}
        <div className="hidden sm:flex gap-8">
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

        {/* Hamburger — mobile only */}
        <button
          style={{ touchAction: "manipulation" }}
          onClick={() => setMenuOpen(true)}
          className="sm:hidden flex flex-col gap-1.5 p-2 rounded-lg active:bg-white/10 transition-colors"
          aria-label="Abrir menu"
        >
          <span className="w-6 h-0.5 bg-white/70 rounded-full" />
          <span className="w-6 h-0.5 bg-white/70 rounded-full" />
          <span className="w-4 h-0.5 bg-white/70 rounded-full" />
        </button>
      </div>

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Sidebar — desktop only */}
        <nav className="hidden sm:flex w-64 bg-black/20 border-r border-white/5 p-6 flex-col gap-3">
          {navItems}
        </nav>

        {/* Mobile drawer overlay */}
        {menuOpen && (
          <div className="sm:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            {/* Drawer */}
            <nav className="relative z-10 w-72 max-w-[85vw] h-full bg-zinc-900 border-r border-white/10 p-6 flex flex-col gap-3"
              style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em]">
                  Navegação
                </span>
                <button
                  style={{ touchAction: "manipulation" }}
                  onClick={() => setMenuOpen(false)}
                  className="text-zinc-500 hover:text-white p-1 active:bg-white/10 rounded transition-colors"
                  aria-label="Fechar menu"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Stats inside drawer on mobile */}
              <div className="flex gap-6 px-1 pb-4 mb-2 border-b border-white/5">
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold">Pontos</p>
                  <p className="text-lg font-black text-yellow-500">{user?.points || 0}</p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold">Status</p>
                  <p className={`text-sm font-black ${user?.active ? "text-green-500" : "text-red-500"}`}>
                    {user?.active ? "ONLINE" : "OFFLINE"}
                  </p>
                </div>
              </div>

              {navItems}
            </nav>
          </div>
        )}

        <main className="flex-1 p-4 sm:p-10 overflow-y-auto custom-scrollbar bg-black/10">
          <div className="max-w-4xl mx-auto">
            <header className="mb-6 sm:mb-10">
              <h1 className="text-2xl sm:text-4xl font-black italic uppercase tracking-tighter">
                Escolha seu Destino
              </h1>
              <p className="text-zinc-500 text-sm sm:text-base">
                Selecione um oponente para iniciar o duelo, {user?.name}.
              </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
