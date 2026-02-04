export default function MatchmakingScenario({ onSelectOpponent, onBack }: any) {
  return (
    <div className="p-8 h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-10 border-b-2 border-yugi-gold pb-2">
        ESCOLHA SEU OPONENTE
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div
          onClick={onSelectOpponent}
          className="bg-zinc-900 border-2 border-zinc-800 hover:border-blue-500 p-6 rounded-lg cursor-pointer transition-all hover:scale-105 group"
        >
          <div className="h-40 bg-zinc-800 rounded mb-4 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-tr from-blue-900 to-zinc-700 opacity-50"></div>
          </div>
          <h3 className="text-xl font-bold group-hover:text-blue-400">Duelista Iniciante</h3>
          <p className="text-zinc-400 text-sm mt-2">Dificuldade: ★☆☆☆☆</p>
        </div>

        <div className="bg-zinc-900 border-2 border-zinc-800 p-6 rounded-lg opacity-50 grayscale cursor-not-allowed">
          <div className="h-40 bg-zinc-800 rounded mb-4"></div>
          <h3 className="text-xl font-bold">Seto Kaiba</h3>
          <p className="text-zinc-400 text-sm mt-2">Dificuldade: ★★★★★</p>
        </div>
      </div>

      <button onClick={onBack} className="mt-12 text-zinc-500 hover:text-white transition-colors">
        ← Voltar ao Menu
      </button>
    </div>
  );
}
