import { Save, Loader2, Package, BookOpen, AlertCircle, CheckCircle2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useDeck } from "./hooks/useDeckManager";
import { CollectionFilters } from "./components/CollectionFilters";
import { CardLibraryItem } from "./components/CardLibraryItem";
import { DeckSlot } from "./components/DeckSlot";
import { Details } from "./components/Details";
import { PackageItem } from "./components/PackageItem";

const MIN_DECK = 35;
const MAX_DECK = 45;

function DeckCapacity({ count }: { count: number }) {
  const pct = Math.min(Math.max((count / MAX_DECK) * 100, 0), 100);
  const isValid = count >= MIN_DECK && count <= MAX_DECK;
  const color = isValid ? "bg-green-500" : count > MAX_DECK ? "bg-red-500" : "bg-yellow-500";
  const textColor = isValid ? "text-green-400" : count > MAX_DECK ? "text-red-400" : "text-yellow-400";

  return (
    <div className="flex items-center gap-3">
      <div className="text-right">
        <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
          Deck · mín {MIN_DECK} / máx {MAX_DECK}
        </p>
        <p className={`text-lg font-black leading-none ${textColor}`}>
          {count}<span className="text-zinc-600 text-sm">/{MAX_DECK}</span>
        </p>
      </div>
      <div className="w-20 h-1.5 bg-zinc-800 rounded-full overflow-hidden relative">
        {/* Min threshold marker */}
        <div
          className="absolute top-0 bottom-0 w-px bg-zinc-600 z-10"
          style={{ left: `${(MIN_DECK / MAX_DECK) * 100}%` }}
        />
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}

export default function DeckManagerScenario({ onBack, onOpenPackage }: any) {
  const {
    loading, error, saving,
    localDeck, filteredCollection,
    viewingCard, setViewingCard,
    searchTerm, setSearchTerm,
    filterType, setFilterType,
    sortBy, setSortBy,
    viewMode, setViewMode,
    activeTab, setActiveTab,
    packages, openingPackage,
    deckStats, deckValid,
    addToDeck, removeFromDeck, saveDeck, openPackage,
  } = useDeck(onOpenPackage);

  const [mobileView, setMobileView] = useState<"collection" | "deck">("collection");

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-zinc-950 text-white gap-3">
        <Loader2 size={20} className="animate-spin text-blue-500" />
        <span className="font-black italic text-zinc-400 tracking-widest uppercase text-sm">Carregando...</span>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-zinc-950 flex flex-col text-white overflow-hidden">
      {/* ── Header ── */}
      <header className="h-14 border-b border-white/5 bg-zinc-900/60 backdrop-blur-xl flex items-center justify-between px-5 z-10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-400 hover:text-white"
          >
            ←
          </button>
          <div>
            <h1 className="font-black italic tracking-tighter text-base text-blue-400 leading-none">DECK BUILDER</h1>
            <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest leading-none mt-0.5">
              Gerenciar baralho
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:block">
            <DeckCapacity count={localDeck.length} />
          </div>

          <button
            onClick={saveDeck}
            disabled={!deckValid || saving}
            className={`flex items-center gap-2 px-2 sm:px-5 py-2 rounded-xl font-black italic text-sm transition-all
              ${deckValid && !saving
                ? "bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20 active:scale-95"
                : "bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50"}`}
          >
            {saving
              ? <Loader2 size={15} className="animate-spin" />
              : deckValid ? <CheckCircle2 size={15} /> : <Save size={15} />}
            <span className="hidden sm:inline">{saving ? "SALVANDO" : "SALVAR"}</span>
          </button>
        </div>
      </header>

      {/* ── Error banner ── */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-red-950/60 border-b border-red-500/30 px-5 py-2 flex items-center gap-2 text-red-400 text-[11px] font-bold"
          >
            <AlertCircle size={13} /> {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden flex-col sm:flex-row">

        {/* ── Mobile tab switcher ── */}
        <div className="sm:hidden flex border-b border-white/5 bg-zinc-900/40 flex-shrink-0">
          <button
            onClick={() => setMobileView("collection")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[11px] font-black uppercase tracking-widest border-b-2 transition-all ${
              mobileView === "collection" ? "border-blue-500 text-blue-400" : "border-transparent text-zinc-500"
            }`}
          >
            <BookOpen size={13} /> Coleção
          </button>
          <button
            onClick={() => setMobileView("deck")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[11px] font-black uppercase tracking-widest border-b-2 transition-all ${
              mobileView === "deck" ? "border-blue-500 text-blue-400" : "border-transparent text-zinc-500"
            }`}
          >
            Deck <span className={`text-[10px] font-black ${deckValid ? "text-green-400" : "text-zinc-500"}`}>({localDeck.length})</span>
          </button>
        </div>

        {/* ── Left panel: Library + Packages ── */}
        <section className={`flex-col border-r border-white/5 sm:w-[55%] ${mobileView === "collection" ? "flex flex-1" : "hidden sm:flex"}`}>

          {/* Tabs */}
          <div className="flex border-b border-white/5 bg-zinc-900/30 flex-shrink-0">
            <button
              onClick={() => setActiveTab("library")}
              className={`flex items-center gap-2 px-5 py-3 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 ${
                activeTab === "library"
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <BookOpen size={13} /> Coleção
            </button>
            <button
              onClick={() => setActiveTab("packages")}
              className={`flex items-center gap-2 px-5 py-3 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 ${
                activeTab === "packages"
                  ? "border-yellow-500 text-yellow-400"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Package size={13} /> Pacotes
              {packages.length > 0 && (
                <span className="bg-yellow-500 text-black text-[8px] font-black px-1.5 py-0.5 rounded-full min-w-[16px] text-center">
                  {packages.length}
                </span>
              )}
            </button>
          </div>

          {/* Library tab */}
          {activeTab === "library" && (
            <>
              <CollectionFilters
                searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                sortBy={sortBy} setSortBy={setSortBy}
                filterType={filterType} setFilterType={setFilterType}
                viewMode={viewMode} setViewMode={setViewMode}
                total={filteredCollection.length}
              />
              <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
                {filteredCollection.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-600 text-xs italic gap-2">
                    <BookOpen size={28} className="opacity-20" />
                    {searchTerm || filterType !== "TODOS"
                      ? "Nenhuma carta encontrada."
                      : "Todas as cartas estão no deck."}
                  </div>
                ) : viewMode === "grid" ? (
                  <div className="grid grid-cols-3 gap-2">
                    {filteredCollection.map(card => (
                      <CardLibraryItem
                        key={card.instanceId ?? card.id}
                        card={card}
                        onAdd={addToDeck}
                        onZoom={setViewingCard}
                        viewMode="grid"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    {filteredCollection.map(card => (
                      <CardLibraryItem
                        key={card.instanceId ?? card.id}
                        card={card}
                        onAdd={addToDeck}
                        onZoom={setViewingCard}
                        viewMode="list"
                      />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* Packages tab */}
          {activeTab === "packages" && (
            <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
              {packages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-600 gap-3 pt-16">
                  <Package size={36} className="opacity-20" />
                  <p className="text-[11px] font-bold italic text-center">
                    Nenhum pacote disponível.<br />
                    <span className="text-zinc-700">Vença batalhas ou compre na loja!</span>
                  </p>
                </div>
              ) : (
                <AnimatePresence>
                  {packages.map(pkg => (
                    <PackageItem
                      key={pkg.id}
                      pkg={pkg}
                      onOpen={openPackage}
                      opening={openingPackage}
                    />
                  ))}
                </AnimatePresence>
              )}
            </div>
          )}
        </section>

        {/* ── Right panel: Current Deck ── */}
        <section className={`flex-col bg-black/30 sm:w-[45%] ${mobileView === "deck" ? "flex flex-1" : "hidden sm:flex"}`}>
          {/* Deck header with stats */}
          <div className="px-4 py-3 border-b border-white/5 bg-zinc-900/20 flex-shrink-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 italic">Deck Atual</span>
              <span className={`text-[10px] font-black ${deckValid ? "text-green-400" : "text-zinc-600"}`}>
                {localDeck.length} cartas
              </span>
            </div>
            {/* Type breakdown */}
            <div className="flex gap-3">
              <span className="text-[9px] font-bold text-orange-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />
                {deckStats.monsters} Mon
              </span>
              <span className="text-[9px] font-bold text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                {deckStats.spells} Mag
              </span>
              <span className="text-[9px] font-bold text-pink-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 inline-block" />
                {deckStats.traps} Arm
              </span>
            </div>
          </div>

          {/* Deck list */}
          <div className="flex-1 overflow-y-auto p-2.5 space-y-1 custom-scrollbar">
            {localDeck.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-zinc-600 gap-2">
                <BookOpen size={28} className="opacity-20" />
                <p className="text-xs italic">Deck vazio — adicione cartas.</p>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {localDeck.map(card => (
                  <motion.div
                    key={card.instanceId}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.15 }}
                  >
                    <DeckSlot
                      card={card}
                      onRemove={removeFromDeck}
                      onZoom={setViewingCard}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Deck footer tip */}
          {!deckValid && localDeck.length > 0 && (
            <div className="px-4 py-2 border-t border-white/5 bg-zinc-900/30 flex-shrink-0">
              <p className="text-[9px] text-zinc-600 font-bold text-center">
                {localDeck.length < MIN_DECK
                  ? `Adicione mais ${MIN_DECK - localDeck.length} ${localDeck.length === MIN_DECK - 1 ? "carta" : "cartas"} para salvar`
                  : `Remova ${localDeck.length - MAX_DECK} ${localDeck.length === MAX_DECK + 1 ? "carta" : "cartas"} para salvar`}
              </p>
            </div>
          )}
        </section>
      </div>

      <Details viewingCard={viewingCard} setViewingCard={setViewingCard} />
    </div>
  );
}
