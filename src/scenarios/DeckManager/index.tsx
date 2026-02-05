import { Save } from "lucide-react";
import { useDeck } from "./hooks/useDeckManager";
import { CollectionFilters } from "./components/CollectionFilters";
import { CardLibraryItem } from "./components/CardLibraryItem";
import { DeckSlot } from "./components/DeckSlot";
import { Details } from "./components/Details";

export default function DeckManagerScenario({ onBack }: any) {
  const {
    loading, localDeck, filteredCollection,
    viewingCard, setViewingCard,
    searchTerm, setSearchTerm,
    filterType, setFilterType,
    sortBy, setSortBy,
    addToDeck, removeFromDeck, saveDeck
  } = useDeck();

  if (loading) return <div className="h-screen flex items-center justify-center bg-zinc-950 text-white font-bold italic">CARREGANDO SISTEMA...</div>;

  return (
    <div className="h-screen w-screen bg-zinc-950 flex flex-col text-white overflow-hidden font-sans">
      <header className="h-16 border-b border-white/5 bg-zinc-900/50 backdrop-blur-xl flex items-center justify-between px-6 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-full transition-colors">←</button>
          <h1 className="font-black italic tracking-tighter text-xl text-blue-500">DECK BUILDER</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-[10px] font-bold text-zinc-500 uppercase">Capacidade</p>
            <p className={`text-lg font-black leading-none ${localDeck.length === 40 ? "text-green-500" : "text-yellow-500"}`}>
              {localDeck.length} / 40
            </p>
          </div>

          <button
            onClick={saveDeck}
            disabled={localDeck.length !== 40}
            className={`flex items-center gap-2 px-8 py-2.5 rounded-lg font-black italic transition-all shadow-lg
              ${localDeck.length === 40
                ? "bg-blue-600 hover:bg-blue-500 shadow-blue-600/20 active:scale-95"
                : "bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50"}`}
          >
            <Save size={18} /> SALVAR
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <section className="flex-1 flex flex-col border-r border-white/5 bg-zinc-900/10">
          <div className="p-3 bg-white/5 border-b border-white/5 text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
            Sua Biblioteca
          </div>
          <CollectionFilters
            searchTerm={searchTerm} setSearchTerm={setSearchTerm}
            sortBy={sortBy} setSortBy={setSortBy}
            filterType={filterType} setFilterType={setFilterType}
          />
          <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
            {filteredCollection.map(card => (
              <CardLibraryItem
                key={card.id}
                card={card}
                onAdd={addToDeck}
                onZoom={setViewingCard}
                localDeck={localDeck}
              />
            ))}
          </div>
        </section>

        <section className="flex-1 flex flex-col bg-black/40">
          <div className="p-3 border-b border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-500 italic">
            Deck Atual
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-1.5 custom-scrollbar">
            {localDeck.map(card => (
              <DeckSlot
                key={card.instanceId}
                card={card}
                onRemove={removeFromDeck}
                onZoom={setViewingCard}
              />
            ))}
            {localDeck.length === 0 && (
              <div className="h-full flex items-center justify-center text-zinc-600 italic text-sm">
                Seu deck está vazio. Adicione cartas da coleção.
              </div>
            )}
          </div>
        </section>
      </div>

      <Details
        viewingCard={viewingCard}
        setViewingCard={setViewingCard}
      />
    </div>
  );
}
