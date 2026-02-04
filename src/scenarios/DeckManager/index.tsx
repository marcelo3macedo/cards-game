import { useState, useMemo } from "react";
import { Search, ArrowUpDown, Trash2, Save, Plus, X, Shield, Sword, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Card {
  id: number;
  name: string;
  atk: number;
  def: number;
  type: "MONSTRO" | "MAGICA" | "ARMADILHA";
  attribute: string;
  description: string;
  level: number;
}

interface UserCollection {
  cardId: number;
  quantity: number;
}

interface Deck {
  id: string;
  name: string;
  cards: Card[];
}

export default function DeckManagerScenario({ onBack }: any) {
  const [viewingCard, setViewingCard] = useState<Card | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("TODOS");
  const [sortBy, setSortBy] = useState<"ATK" | "NAME">("NAME");

  // MOCKS (IDs ajustados para incluir Armadilha)
  const [userInventory] = useState<UserCollection[]>([
    { cardId: 1, quantity: 3 },
    { cardId: 2, quantity: 2 },
    { cardId: 3, quantity: 1 },
    { cardId: 4, quantity: 5 },
    { cardId: 5, quantity: 3 },
  ]);

  const [gameDatabase] = useState<Card[]>([
    {
      id: 1,
      name: "Mago Negro",
      atk: 2500,
      def: 2100,
      type: "MONSTRO",
      attribute: "TREVAS",
      level: 7,
      description: "O mago definitivo em termos de ataque e defesa.",
    },
    {
      id: 2,
      name: "Dragão Branco",
      atk: 3000,
      def: 2500,
      type: "MONSTRO",
      attribute: "LUZ",
      level: 8,
      description: "Este lendário dragão é uma poderosa máquina de destruição.",
    },
    {
      id: 3,
      name: "Buraco Negro",
      atk: 0,
      def: 0,
      type: "MAGICA",
      attribute: "FEITIÇO",
      level: 0,
      description: "Destrua todos os monstros no campo.",
    },
    {
      id: 4,
      name: "Gárgula de Gelo",
      atk: 2200,
      def: 1800,
      type: "MONSTRO",
      attribute: "ÁGUA",
      level: 6,
      description: "Um guardião das cavernas geladas.",
    },
    {
      id: 5,
      name: "Força Espelho",
      atk: 0,
      def: 0,
      type: "ARMADILHA",
      attribute: "ARMADILHA",
      level: 0,
      description:
        "Quando um monstro do oponente declarar um ataque: destrua todos os monstros em posição de ataque do oponente.",
    },
  ]);

  const [decks, setDecks] = useState<Deck[]>([{ id: "1", name: "Meu Deck Principal", cards: [] }]);
  const [activeDeckId, setActiveDeckId] = useState<string>("1");
  const activeDeck = decks.find((d) => d.id === activeDeckId) || decks[0];

  // LÓGICA DE FILTRO
  const filteredCollection = useMemo(() => {
    return gameDatabase
      .filter((card) => {
        const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === "TODOS" || card.type === filterType;
        return matchesSearch && matchesType;
      })
      .sort((a, b) => (sortBy === "ATK" ? b.atk - a.atk : a.name.localeCompare(b.name)));
  }, [searchTerm, filterType, sortBy, gameDatabase]);

  const addToDeck = (card: Card) => {
    const owned = userInventory.find((i) => i.cardId === card.id)?.quantity || 0;
    const inDeck = activeDeck.cards.filter((c) => c.id === card.id).length;
    if (activeDeck.cards.length >= 40) return alert("O deck já possui 40 cartas!");
    if (inDeck >= owned) return alert("Você não possui mais cópias desta carta!");

    const updatedDecks = decks.map((d) =>
      d.id === activeDeckId
        ? { ...d, cards: [...d.cards, { ...card, instanceId: Math.random() } as any] }
        : d,
    );
    setDecks(updatedDecks);
  };

  const removeFromDeck = (instanceId: number) => {
    const updatedDecks = decks.map((d) =>
      d.id === activeDeckId
        ? { ...d, cards: d.cards.filter((c: any) => c.instanceId !== instanceId) }
        : d,
    );
    setDecks(updatedDecks);
  };

  // Auxiliar de cores
  const getTypeColor = (type: string) => {
    if (type === "MAGICA") return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
    if (type === "ARMADILHA") return "text-pink-400 bg-pink-400/10 border-pink-400/20";
    return "text-orange-400 bg-orange-400/10 border-orange-400/20";
  };

  return (
    <div className="h-screen w-screen bg-zinc-950 flex flex-col text-white overflow-hidden font-sans">
      {/* HEADER */}
      <header className="h-16 border-b border-white/5 bg-zinc-900/50 backdrop-blur-xl flex items-center justify-between px-6 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            ←
          </button>
          <h1 className="font-black italic tracking-widest text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            DECK BUILDER
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              Capacidade
            </span>
            <span
              className={`text-sm font-black ${activeDeck.cards.length === 40 ? "text-green-500" : "text-yellow-500"}`}
            >
              {activeDeck.cards.length} / 40
            </span>
          </div>
          <button
            onClick={() => {
              if (activeDeck.cards.length === 40) alert("Deck Salvo!");
            }}
            disabled={activeDeck.cards.length !== 40}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-black italic transition-all ${activeDeck.cards.length === 40 ? "bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20" : "bg-zinc-800 text-zinc-500 cursor-not-allowed"}`}
          >
            <Save size={18} /> SALVAR
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* ESQUERDA: COLEÇÃO */}
        <section className="flex-[1.4] flex flex-col border-r border-white/5 bg-zinc-900/20">
          <div className="p-4 bg-black/20 space-y-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                size={16}
              />
              <input
                type="text"
                placeholder="Buscar na coleção..."
                className="w-full bg-zinc-800/50 border border-white/5 rounded-lg py-2 pl-10 pr-4 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-zinc-600"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                onChange={(e) => setFilterType(e.target.value)}
                className="flex-1 bg-zinc-800 border border-white/10 rounded-lg p-2 text-[10px] font-bold uppercase outline-none focus:border-blue-500"
              >
                <option value="TODOS">Todos</option>
                <option value="MONSTRO">Monstros</option>
                <option value="MAGICA">Mágicas</option>
                <option value="ARMADILHA">Armadilhas</option>
              </select>
              <button
                onClick={() => setSortBy(sortBy === "NAME" ? "ATK" : "NAME")}
                className="px-4 bg-zinc-800 border border-white/10 rounded-lg text-[10px] font-bold uppercase flex items-center gap-2 hover:bg-zinc-700"
              >
                <ArrowUpDown size={14} /> {sortBy === "NAME" ? "Nome" : "ATK"}
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-2">
            {filteredCollection.map((card) => {
              const quantity = userInventory.find((i) => i.cardId === card.id)?.quantity || 0;
              return (
                <div
                  key={card.id}
                  onClick={() => setViewingCard(card)}
                  className={`group flex items-center p-3 rounded-xl border cursor-pointer transition-all ${quantity > 0 ? "bg-zinc-900/40 border-white/5 hover:border-blue-500/40 hover:bg-zinc-800/40" : "bg-black/20 border-white/5 opacity-40 grayscale"}`}
                >
                  <div
                    className={`w-12 h-16 rounded border border-white/10 flex items-center justify-center ${card.type === "MAGICA" ? "bg-emerald-950/30" : card.type === "ARMADILHA" ? "bg-pink-950/30" : "bg-orange-950/30"}`}
                  >
                    <Sparkles size={16} className="text-white/20" />
                  </div>
                  <div className="flex-1 ml-4">
                    <h3 className="text-[11px] font-black uppercase italic leading-none mb-1">
                      {card.name}
                    </h3>
                    <div className="flex gap-2 items-center">
                      <span
                        className={`text-[8px] px-1.5 py-0.5 rounded border font-bold ${getTypeColor(card.type)}`}
                      >
                        {card.type}
                      </span>
                      {card.type === "MONSTRO" && (
                        <span className="text-[9px] font-bold text-zinc-500 uppercase">
                          ATK {card.atk} / DEF {card.def}
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    className="flex flex-col items-end gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-[9px] font-black text-zinc-500">POSSUI: {quantity}</span>
                    <button
                      disabled={quantity === 0 || activeDeck.cards.length >= 40}
                      onClick={() => addToDeck(card)}
                      className="bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 p-2 rounded-lg transition-all shadow-lg shadow-blue-600/10"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* DIREITA: DECK ATUAL */}
        <section className="flex-1 flex flex-col bg-black/40 backdrop-blur-sm">
          <div className="p-4 border-b border-white/5 flex justify-between items-center bg-zinc-900/30">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 italic">
              Composição do Deck
            </h2>
            <span className="text-[10px] font-black bg-blue-600/20 text-blue-400 border border-blue-400/20 px-3 py-1 rounded-full">
              {activeDeck.cards.length} / 40
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-1.5">
            {activeDeck.cards.map((card: any) => (
              <div
                key={card.instanceId}
                onClick={() => setViewingCard(card)}
                className="flex items-center justify-between bg-zinc-800/30 p-2 rounded-lg border border-white/5 group hover:border-blue-500/30 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-1 h-6 rounded-full ${card.type === "MONSTRO" ? "bg-orange-500" : card.type === "MAGICA" ? "bg-emerald-500" : "bg-pink-500"}`}
                  />
                  <div>
                    <div className="text-[10px] font-black uppercase italic leading-none mb-1">
                      {card.name}
                    </div>
                    {card.type === "MONSTRO" ? (
                      <div className="text-[8px] font-bold text-zinc-500 uppercase">
                        ⚔️ {card.atk} / 🛡️ {card.def}
                      </div>
                    ) : (
                      <div className="text-[8px] font-bold text-zinc-500 uppercase">
                        {card.type}
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromDeck(card.instanceId);
                  }}
                  className="p-2 text-zinc-600 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* MODAL DE ZOOM (DETALHES) */}
      <AnimatePresence>
        {viewingCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setViewingCard(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden max-w-sm w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Card Visual Top */}
              <div
                className={`h-64 relative flex items-center justify-center ${viewingCard.type === "MAGICA" ? "bg-emerald-900/20" : viewingCard.type === "ARMADILHA" ? "bg-pink-900/20" : "bg-orange-900/20"}`}
              >
                <div className="absolute top-4 right-4 text-xs font-black px-3 py-1 bg-black/40 rounded-full border border-white/10">
                  LVL {viewingCard.level}
                </div>
                <Sparkles size={80} className="text-white/10" />

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-zinc-900 to-transparent">
                  <h2 className="text-2xl font-black uppercase italic leading-none">
                    {viewingCard.name}
                  </h2>
                  <span
                    className={`text-[10px] font-bold uppercase ${getTypeColor(viewingCard.type)} px-2 py-0.5 rounded border inline-block mt-2`}
                  >
                    {viewingCard.type}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-6">
                <p className="text-zinc-400 text-sm italic leading-relaxed">
                  "{viewingCard.description}"
                </p>

                {viewingCard.type === "MONSTRO" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/20 p-3 rounded-xl border border-white/5 flex flex-col items-center">
                      <Sword size={16} className="text-orange-500 mb-1" />
                      <span className="text-[10px] font-bold text-zinc-500 uppercase">Ataque</span>
                      <span className="text-xl font-black">{viewingCard.atk}</span>
                    </div>
                    <div className="bg-black/20 p-3 rounded-xl border border-white/5 flex flex-col items-center">
                      <Shield size={16} className="text-blue-500 mb-1" />
                      <span className="text-[10px] font-bold text-zinc-500 uppercase">Defesa</span>
                      <span className="text-xl font-black">{viewingCard.def}</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setViewingCard(null)}
                  className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                >
                  <X size={18} /> FECHAR DETALHES
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
