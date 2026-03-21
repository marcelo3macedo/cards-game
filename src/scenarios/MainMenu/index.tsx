import { useState, useMemo, useEffect } from "react";
import type { Villain, Chapter } from "../../store/VillainStore";
import { getImageUrl } from "../../utils/imageUtils";
import { getRankName } from "../../utils/rankUtils";
import { VillainCard } from "./components/VillainCard";
import { useMainMenu } from "./hooks/useMainMenu";
import { useMainMenuKeyboard } from "./hooks/useMainMenuKeyboard";

const STORY_SEEN_KEY = "chapters-story-seen";

function getSeenChapterIds(): number[] {
  try {
    return JSON.parse(localStorage.getItem(STORY_SEEN_KEY) || "[]");
  } catch {
    return [];
  }
}

function markChapterAsSeen(id: number) {
  const seen = getSeenChapterIds();
  if (!seen.includes(id)) {
    localStorage.setItem(STORY_SEEN_KEY, JSON.stringify([...seen, id]));
  }
}

function ChapterStoryModal({ chapter, onClose }: { chapter: Chapter; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-white/5">
          <p className="text-[10px] text-blue-500 font-black uppercase tracking-[0.3em] mb-1">
            Capítulo {chapter.id}
          </p>
          <h2 className="text-xl sm:text-2xl font-black uppercase italic tracking-tight">
            {chapter.name}
          </h2>
        </div>

        {/* Story */}
        <div className="px-6 py-5 max-h-[50vh] overflow-y-auto custom-scrollbar">
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
            {chapter.description}
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-4 border-t border-white/5 flex justify-end">
          <button
            style={{ touchAction: "manipulation" }}
            onClick={onClose}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-widest rounded-lg transition-colors"
          >
            Começar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MainMenuScenario({
  onSelectOpponent,
  onViewDeck,
  onViewTips,
  onViewStore,
  onViewProfile,
}: any) {
  const { user, villains, loading, handleLogout, setSelectedVillain } = useMainMenu();
  const [menuOpen, setMenuOpen] = useState(false);
  const [storyModal, setStoryModal] = useState<Chapter | null>(null);

  const handleChooseOpponent = (villain: Villain) => {
    setSelectedVillain(villain);
    onSelectOpponent();
  };

  const chapters = useMemo(() => {
    const map = new Map<number | null, { chapter: Chapter | null; villains: Villain[] }>();
    for (const villain of villains) {
      const key = villain.chapterId ?? null;
      if (!map.has(key)) map.set(key, { chapter: villain.chapter, villains: [] });
      map.get(key)!.villains.push(villain);
    }
    return [...map.values()].sort(
      (a, b) => (a.chapter?.id ?? 9999) - (b.chapter?.id ?? 9999)
    );
  }, [villains]);

  const unlockedChapters = useMemo(
    () => chapters.filter(({ chapter }) => !chapter || chapter.isUnlocked),
    [chapters]
  );

  // Mostra o modal automaticamente para capítulos novos (ainda não vistos)
  useEffect(() => {
    if (unlockedChapters.length === 0) return;
    const seen = getSeenChapterIds();
    const newChapter = unlockedChapters.find(
      ({ chapter }) => chapter?.description && !seen.includes(chapter.id)
    );
    if (newChapter?.chapter) {
      setStoryModal(newChapter.chapter);
    }
  }, [unlockedChapters]);

  const handleCloseStory = () => {
    if (storyModal) {
      markChapterAsSeen(storyModal.id);
      setStoryModal(null);
    }
  };

  // Lista plana de vilões desbloqueados e acessíveis pelo nível do usuário
  const allVillains = useMemo(
    () => unlockedChapters.flatMap(({ villains: cv }) =>
      cv.filter(v => (user?.level || 0) >= v.level)
    ),
    [unlockedChapters, user?.level]
  );

  const { focusedArea, setFocusedArea, focusedNavIndex, setFocusedNavIndex, focusedVillainIndex, mainRef } =
    useMainMenuKeyboard({
      allVillains,
      handleChooseOpponent,
      navActions: [null, onViewDeck, onViewStore, onViewTips, handleLogout],
      storyModal,
      menuOpen,
    });

  if (loading) {
    return (
      <div className="h-screen w-screen bg-zinc-950 flex items-center justify-center text-blue-500 font-black italic">
        CARREGANDO DUELISTA...
      </div>
    );
  }

  const NAV_ITEMS = [
    { label: "Duelar",           onClick: () => { setFocusedArea("villains"); setMenuOpen(false); } },
    { label: "Meu Baralho (Deck)", onClick: () => { onViewDeck(); setMenuOpen(false); } },
    { label: "Loja",             onClick: () => { onViewStore(); setMenuOpen(false); } },
    { label: "Dicas & Regras",   onClick: () => { onViewTips(); setMenuOpen(false); } },
    { label: "Sair do Jogo",     onClick: handleLogout },
  ];

  const navFocused = (idx: number) => focusedArea === "nav" && focusedNavIndex === idx;

  const navItems = (
    <>
      <label className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em] mb-2">
        Menu Principal
      </label>

      {NAV_ITEMS.map((item, idx) => {
        const isLast = idx === NAV_ITEMS.length - 1;
        const isFocused = navFocused(idx);

        return (
          <button
            key={item.label}
            style={{ touchAction: "manipulation" }}
            onClick={() => {
              setFocusedNavIndex(idx);
              setFocusedArea("nav");
              item.onClick();
            }}
            className={`
              w-full py-4 px-6 font-bold text-left transition-all uppercase tracking-widest text-xs
              ${isLast ? "mt-auto" : ""}
              ${
                isFocused
                  ? "bg-blue-600/20 border-r-4 border-blue-400 text-blue-300"
                  : isLast
                    ? "text-zinc-700 hover:text-red-400 hover:bg-white/5"
                    : idx === 0
                      ? "bg-blue-600/10 border-r-4 border-blue-500 text-blue-400 hover:bg-blue-600/20"
                      : "text-zinc-500 hover:text-white hover:bg-white/5"
              }
            `}
          >
            {item.label}
          </button>
        );
      })}
    </>
  );

  return (
    <div
      className="select-none w-screen bg-zinc-950 flex flex-col overflow-hidden text-white bg-[radial-gradient(circle_at_top_right,_#1e1b4b_0%,#09090b_100%)]"
      style={{ height: "100dvh" }}
    >
      {storyModal && (
        <ChapterStoryModal chapter={storyModal} onClose={handleCloseStory} />
      )}

      {/* Header */}
      <div className="px-4 sm:p-6 py-3 sm:py-4 bg-black/40 border-b border-white/5 backdrop-blur-md flex justify-between items-center shrink-0">
        <button
          style={{ touchAction: "manipulation" }}
          onClick={onViewProfile}
          className="flex items-center gap-3 sm:gap-4 hover:opacity-80 active:opacity-60 transition-opacity rounded-xl"
          aria-label="Ver perfil"
        >
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
          <div className="text-left">
            <h2 className="text-base sm:text-xl font-black italic uppercase tracking-tighter text-blue-400">
              {user?.name || "Duelista Anônimo"}
            </h2>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
              {getRankName(user?.level || 0)}
            </p>
          </div>
        </button>

        {/* Stats — visible only on desktop */}
        <div className="hidden sm:flex gap-8">
          <div className="text-center">
            <p className="text-[10px] text-zinc-500 uppercase font-bold">Moedas</p>
            <p className="text-xl font-black text-yellow-500">{user?.coins ?? 0}</p>
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
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
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

              <div className="flex gap-6 px-1 pb-4 mb-2 border-b border-white/5">
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold">Level</p>
                  <p className={`text-sm font-black ${user?.active ? "text-green-500" : "text-red-500"}`}>
                    {user?.level || 1}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold">Moedas</p>
                  <p className="text-lg font-black text-yellow-500">{user?.coins ?? 0}</p>
                </div>
              </div>

              {navItems}
            </nav>
          </div>
        )}

        <main ref={mainRef} className="flex-1 p-4 sm:p-10 overflow-y-auto custom-scrollbar bg-black/10">
          <div className="max-w-4xl mx-auto">
            <header className="mb-6 sm:mb-10">
              <h1 className="text-2xl sm:text-4xl font-black italic uppercase tracking-tighter">
                Escolha seu Destino
              </h1>
              <p className="text-zinc-500 text-sm sm:text-base">
                Selecione um oponente para iniciar o duelo, {user?.name}.
              </p>
            </header>

            <div className="flex flex-col gap-10 sm:gap-14">
              {unlockedChapters.map(({ chapter, villains: chapterVillains }) => (
                <section key={chapter?.id ?? "uncategorized"}>
                  <div className="mb-4 sm:mb-6 pb-3 border-b border-white/10">
                    <p className="text-[10px] text-blue-500 font-black uppercase tracking-[0.3em] mb-1">
                      {chapter ? `Capítulo ${chapter.id}` : "Sem Capítulo"}
                    </p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="text-lg sm:text-2xl font-black uppercase italic tracking-tight">
                        {chapter?.name ?? "Oponentes"}
                      </h2>
                      {chapter?.description && (
                        <button
                          style={{ touchAction: "manipulation" }}
                          onClick={() => setStoryModal(chapter)}
                          className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-blue-400 border border-white/10 hover:border-blue-500/50 px-3 py-1 rounded-full transition-colors"
                        >
                          Ver história
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {chapterVillains.map((villain) => {
                      const globalIdx = allVillains.indexOf(villain);
                      const isFocused = focusedArea === "villains" && focusedVillainIndex === globalIdx;
                      return (
                        <div
                          key={villain.id}
                          data-villain-idx={globalIdx}
                          className={isFocused ? "ring-2 ring-blue-400 rounded-2xl shadow-[0_0_18px_rgba(59,130,246,0.35)]" : ""}
                        >
                          <VillainCard
                            villain={villain}
                            userLevel={user?.level || 0}
                            onSelect={handleChooseOpponent}
                          />
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
