import { useState, useMemo } from "react";

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

interface Deck {
	id: string;
	name: string;
	cards: Card[];
}

export default function DeckManagerScenario({ onBack }: any) {
	const [viewingCard, setViewingCard] = useState<Card | null>(null);
	const [searchTerm, setSearchTerm] = useState("");

	// ESTADOS DE COLEÇÃO DE DECKS
	const [decks, setDecks] = useState<Deck[]>([
		{ id: "1", name: "Deck Inicial", cards: [] },
	]);
	const [activeDeckId, setActiveDeckId] = useState<string>("1");

	const activeDeck = decks.find((d) => d.id === activeDeckId) || decks[0];

	// COLEÇÃO GERAL (Base de dados)
	const [collection] = useState<Card[]>([
		{
			id: 1,
			name: "Mago Negro",
			atk: 2500,
			def: 2100,
			type: "MONSTRO",
			attribute: "TREVAS",
			level: 7,
			description: "O mago definitivo.",
		},
		{
			id: 2,
			name: "Dragão Branco",
			atk: 3000,
			def: 2500,
			type: "MONSTRO",
			attribute: "LUZ",
			level: 8,
			description: "Poderosa máquina de destruição.",
		},
		{
			id: 3,
			name: "Buraco Negro",
			atk: 0,
			def: 0,
			type: "MAGICA",
			attribute: "FEITIÇO",
			level: 0,
			description: "Destrua tudo.",
		},
	]);

	// FUNÇÕES DE GERENCIAMENTO
	const createNewDeck = () => {
		const name = prompt("Nome da nova coleção:");
		if (!name) return;
		const newDeck: Deck = { id: Date.now().toString(), name, cards: [] };
		setDecks([...decks, newDeck]);
		setActiveDeckId(newDeck.id);
	};

	const deleteDeck = (id: string) => {
		if (decks.length === 1) return alert("Você precisa de pelo menos um deck.");
		if (confirm("Deseja excluir esta coleção?")) {
			const newDecks = decks.filter((d) => d.id !== id);
			setDecks(newDecks);
			setActiveDeckId(newDecks[0].id);
		}
	};

	const addToActiveDeck = (card: Card) => {
		if (activeDeck.cards.length >= 40)
			return alert("Limite de 40 cartas atingido!");

		const updatedDecks = decks.map((d) => {
			if (d.id === activeDeckId) {
				return { ...d, cards: [...d.cards, { ...card, id: Math.random() }] };
			}
			return d;
		});
		setDecks(updatedDecks);
	};

	const removeFromActiveDeck = (instanceId: number) => {
		const updatedDecks = decks.map((d) => {
			if (d.id === activeDeckId) {
				return { ...d, cards: d.cards.filter((c) => c.id !== instanceId) };
			}
			return d;
		});
		setDecks(updatedDecks);
	};

	return (
		<div className="h-screen w-screen bg-zinc-950 flex flex-col text-white overflow-hidden bg-[radial-gradient(circle_at_bottom_left,_#111827_0%,#09090b_100%)]">
			{/* HEADER: GESTÃO DE COLEÇÕES */}
			<header className="p-4 bg-black/60 border-b border-white/10 flex items-center gap-6 backdrop-blur-md">
				<button
					onClick={onBack}
					className="text-zinc-500 hover:text-white transition-colors"
				>
					←
				</button>

				<div className="flex flex-1 items-center gap-4 overflow-x-auto custom-scrollbar pb-2">
					{decks.map((deck) => (
						<div key={deck.id} className="flex items-center group">
							<button
								onClick={() => setActiveDeckId(deck.id)}
								className={`px-4 py-2 rounded-l-lg text-[10px] font-black uppercase tracking-widest transition-all border ${activeDeckId === deck.id ? "bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-900/40" : "bg-zinc-900 border-white/5 text-zinc-500 hover:bg-zinc-800"}`}
							>
								{deck.name} ({deck.cards.length}/40)
							</button>
							<button
								onClick={() => deleteDeck(deck.id)}
								className={`px-2 py-2 rounded-r-lg border-y border-r transition-all ${activeDeckId === deck.id ? "bg-blue-700 border-blue-400 text-white" : "bg-zinc-900 border-white/5 text-zinc-700 hover:text-red-500"}`}
							>
								✕
							</button>
						</div>
					))}
					<button
						onClick={createNewDeck}
						className="px-4 py-2 bg-zinc-800/50 border border-dashed border-zinc-700 rounded-lg text-[10px] font-bold text-zinc-500 hover:border-blue-500 hover:text-blue-500 transition-all"
					>
						+ NOVA COLEÇÃO
					</button>
				</div>
			</header>

			<div className="flex flex-1 overflow-hidden">
				{/* BARRA LATERAL: CARTAS DO DECK ATUAL */}
				<aside className="w-80 bg-black/40 border-r border-white/5 flex flex-col p-4">
					<div className="mb-4">
						<h2 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-1">
							{activeDeck.name}
						</h2>
						<div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
							<div
								className={`h-full transition-all ${activeDeck.cards.length >= 40 ? "bg-red-500 shadow-[0_0_10px_red]" : "bg-blue-500"}`}
								style={{ width: `${(activeDeck.cards.length / 40) * 100}%` }}
							></div>
						</div>
					</div>

					<div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-2">
						{activeDeck.cards.map((card) => (
							<div
								key={card.id}
								className="group flex items-center justify-between bg-zinc-900 p-2 rounded border border-white/5 hover:border-red-500/30 transition-all"
							>
								<span className="text-[10px] font-bold uppercase truncate pr-2 italic">
									{card.name}
								</span>
								<button
									onClick={() => removeFromActiveDeck(card.id)}
									className="text-[9px] font-black text-zinc-600 hover:text-red-500 uppercase"
								>
									Remover
								</button>
							</div>
						))}
						{activeDeck.cards.length === 0 && (
							<div className="mt-10 text-center opacity-20">
								<p className="text-[10px] uppercase font-bold tracking-widest leading-loose">
									Coleção Vazia
									<br />
									Adicione cartas da galeria
								</p>
							</div>
						)}
					</div>
				</aside>

				{/* GALERIA DE CARTAS */}
				<main className="flex-1 p-8 overflow-y-auto custom-scrollbar">
					<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
						{collection.map((card) => (
							<div
								key={card.id}
								className="group bg-zinc-900 border border-white/5 rounded-xl p-3 hover:border-blue-500/50 transition-all relative overflow-hidden"
							>
								<div
									onClick={() => setViewingCard(card)}
									className={`h-24 rounded-lg mb-2 cursor-pointer ${card.type === "MAGICA" ? "bg-teal-900/20" : "bg-orange-900/20"}`}
								></div>
								<h3 className="text-[10px] font-black uppercase truncate mb-3">
									{card.name}
								</h3>

								<button
									disabled={activeDeck.cards.length >= 40}
									onClick={() => addToActiveDeck(card)}
									className={`w-full py-1.5 rounded text-[9px] font-black uppercase tracking-tighter transition-all ${activeDeck.cards.length >= 40 ? "bg-zinc-800 text-zinc-600 cursor-not-allowed" : "bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white"}`}
								>
									{activeDeck.cards.length >= 40
										? "Limite Atingido"
										: "Adicionar"}
								</button>
							</div>
						))}
					</div>
				</main>
			</div>

			{/* MODAL DE DETALHES (ZOOM) - Simplificado para o exemplo */}
			{viewingCard && (
				<div className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-10 backdrop-blur-sm">
					<div className="max-w-md w-full bg-zinc-900 border border-white/10 p-8 rounded-3xl text-center">
						<h2 className="text-3xl font-black uppercase italic text-blue-500 mb-4">
							{viewingCard.name}
						</h2>
						<p className="text-zinc-400 mb-8 italic">
							"{viewingCard.description}"
						</p>
						<div className="flex gap-4">
							<button
								onClick={() => {
									addToActiveDeck(viewingCard);
									setViewingCard(null);
								}}
								disabled={activeDeck.cards.length >= 40}
								className="flex-1 py-4 bg-blue-600 rounded-xl font-black uppercase disabled:opacity-20"
							>
								Adicionar
							</button>
							<button
								onClick={() => setViewingCard(null)}
								className="flex-1 py-4 bg-zinc-800 rounded-xl font-black uppercase"
							>
								Voltar
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
