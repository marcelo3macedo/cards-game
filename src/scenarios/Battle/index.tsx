import { useState } from 'react';

// Tipagem estendida para suportar as novas mecânicas
interface Card {
  id: number;
  name: string;
  atk: number;
  def: number;
  description: string;
  type: 'monster' | 'spell' | 'trap';
  attribute: string;
}

export default function BattleScenario({ onEnd }: { onEnd: () => void }) {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [playerDeckCount] = useState(40);
  const [opponentDeckCount] = useState(40);

  const handCards: Card[] = [
    { id: 1, name: "Mago Negro", atk: 2500, def: 2100, description: "O mago definitivo em termos de ataque e defesa.", type: 'monster', attribute: 'TREVAS' },
    { id: 2, name: "Dragão Branco", atk: 3000, def: 2500, description: "Este dragão lendário é uma poderosa máquina de destruição.", type: 'monster', attribute: 'LUZ' },
    { id: 3, name: "Buraco Negro", atk: 0, def: 0, description: "Destrua todos os monstros no campo.", type: 'spell', attribute: 'FEITIÇO' },
  ];

  return (
    <div className="h-screen w-screen bg-zinc-950 flex flex-col items-center justify-center overflow-hidden text-white font-sans select-none bg-[radial-gradient(circle_at_center,_#1a1a2e_0%,#09090b_100%)] relative">
      
      {/* 1. CAMPO DE DUELO (TABULEIRO) */}
      <div className={`transition-all duration-500 ${selectedCard ? 'blur-md scale-95 opacity-50' : 'blur-0 scale-100'}`}>
         {/* ... (Todo o seu código de Grid do Tabuleiro aqui, mantido para não quebrar o layout) */}
         <div className="grid grid-cols-[100px_1fr_100px] gap-4 items-center w-full max-w-6xl px-10">
            {/* O conteúdo do tabuleiro que você já enviou permanece aqui dentro */}
            <div className="flex flex-col gap-32"></div>
            <div className="flex flex-col gap-6">
               <div className="flex flex-col gap-2 scale-90 opacity-40">
                  <div className="grid grid-cols-5 gap-2">{Array(5).fill(null).map((_, i) => <div key={i} className="w-20 h-28 border border-red-900/30 bg-red-900/5 rounded"></div>)}</div>
                  <div className="grid grid-cols-5 gap-2">{Array(5).fill(null).map((_, i) => <div key={i} className="w-20 h-28 border-2 border-red-900/20 bg-zinc-900 rounded-lg"></div>)}</div>
               </div>
               <div className="w-full h-px bg-blue-500/20 shadow-[0_0_10px_blue]"></div>
               <div className="flex flex-col gap-2">
                  <div className="grid grid-cols-5 gap-3">{Array(5).fill(null).map((_, i) => <div key={i} className="w-24 h-32 border-2 border-blue-500/20 bg-zinc-900/80 rounded-lg"></div>)}</div>
                  <div className="grid grid-cols-5 gap-3 px-2">{Array(5).fill(null).map((_, i) => <div key={i} className="w-20 h-28 border border-blue-900/30 bg-zinc-900/40 rounded"></div>)}</div>
               </div>
            </div>
            {/* Lado direito (GY/Deck) */}
            <div className="flex flex-col gap-2">
               <div className="flex flex-col gap-2 opacity-50 mb-20">
                  <div className="w-20 h-28 bg-zinc-800 border border-zinc-700 rounded-md"></div>
                  <div className="w-20 h-28 bg-orange-950 border border-orange-800 rounded-md"></div>
               </div>
               <div className="flex flex-col gap-3">
                  <div className="w-24 h-32 bg-zinc-800/40 border-2 border-zinc-700 rounded-lg"></div>
                  <div className="w-24 h-32 bg-orange-900 border-2 border-orange-700 rounded-lg shadow-[0_5px_0_#431407]"></div>
               </div>
            </div>
         </div>
      </div>

      {/* 2. MÃO DO JOGADOR */}
      <div className={`fixed bottom-4 flex justify-center w-full transition-opacity duration-300 ${selectedCard ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="flex -space-x-12">
          {handCards.map((card, i) => (
            <div 
              key={card.id}
              onClick={() => setSelectedCard(card)}
              style={{ transform: `rotate(${(i - 1) * 6}deg) translateY(${Math.abs(i - 1) * 4}px)` }}
              className="w-32 h-44 bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl cursor-pointer hover:z-50 hover:scale-125 hover:-translate-y-20 transition-all flex flex-col p-2 group"
            >
              <div className="w-full h-24 bg-zinc-800/50 rounded-lg mb-2"></div>
              <div className="text-[10px] font-bold truncate uppercase">{card.name}</div>
              <div className="mt-auto text-[9px] text-blue-400 font-mono italic">ATK {card.atk}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. OVERLAY DE INVOCAÇÃO (NO TOPO DA TELA) */}
      {selectedCard && (
        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
          
          {/* CARTA CENTRALIZADA E GRANDE */}
          <div className="relative group mb-12">
            <div className="absolute -inset-1 bg-blue-500 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition"></div>
            <div className="relative w-80 h-[480px] bg-gradient-to-b from-orange-700 to-orange-950 border-[6px] border-zinc-200 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.8)] p-5 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-black uppercase italic drop-shadow-md">{selectedCard.name}</h2>
                <span className="bg-black/80 px-2 py-1 rounded text-xs text-orange-400 font-bold">{selectedCard.attribute}</span>
              </div>
              
              <div className="flex-1 bg-zinc-900/90 rounded border-2 border-black/50 mb-4 shadow-inner"></div>
              
              <div className="bg-black/40 p-3 rounded border border-white/10 mb-4">
                <p className="text-[10px] italic leading-relaxed text-zinc-300">{selectedCard.desc}</p>
              </div>

              <div className="flex justify-between font-mono text-2xl font-black border-t border-white/20 pt-2 italic tracking-tighter">
                <span>ATK/{selectedCard.atk}</span>
                <span>DEF/{selectedCard.def}</span>
              </div>
            </div>
          </div>

          {/* BOTÕES DE AÇÃO PEQUENOS E MINIMALISTAS */}
          <div className="flex flex-col items-center gap-6 bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/5 shadow-2xl">
            <div className="grid grid-cols-2 gap-3">
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all shadow-lg shadow-blue-900/40">
                Ataque Invocado
              </button>
              <button className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all border border-white/10">
                Ataque Oculto
              </button>
              <button className="px-6 py-2 bg-blue-900/40 hover:bg-blue-900/60 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all border border-blue-500/30">
                Defesa Invocada
              </button>
              <button className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all border border-white/10">
                Defesa Oculta
              </button>
            </div>

            <button 
              onClick={() => setSelectedCard(null)}
              className="text-[9px] font-bold text-zinc-500 hover:text-red-400 uppercase tracking-[0.3em] transition-colors"
            >
              [ Cancelar Invocação ]
            </button>
          </div>
        </div>
      )}

    </div>
  );
}