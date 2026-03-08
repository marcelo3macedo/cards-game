import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useUIStore } from "../../../store/UIStore";

type Page = {
  icon: string;
  title: string;
  body: React.ReactNode;
};

const PAGES: Page[] = [
  {
    icon: "❤️",
    title: "Objetivo",
    body: (
      <div className="space-y-3 text-sm text-zinc-300 leading-relaxed">
        <p>
          Cada jogador começa com <span className="text-white font-semibold">8.000 pontos de vida</span>.
        </p>
        <p>
          O objetivo é reduzir os pontos de vida do seu oponente a <span className="text-red-400 font-semibold">zero</span> antes que ele faça o mesmo com você.
        </p>
      </div>
    ),
  },
  {
    icon: "🔄",
    title: "Rodadas",
    body: (
      <div className="space-y-3 text-sm text-zinc-300 leading-relaxed">
        <p>O jogo é dividido em rodadas alternadas entre você e o oponente.</p>
        <ul className="space-y-2">
          <li className="flex gap-2">
            <span className="text-blue-400 font-bold shrink-0">•</span>
            <span>Em cada rodada você pode invocar <span className="text-white font-semibold">1 monstro</span> no campo.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400 font-bold shrink-0">•</span>
            <span>Cartas de magia e efeito <span className="text-white font-semibold">não têm limite</span> de uso por rodada.</span>
          </li>
        </ul>
        <p className="text-zinc-400 text-xs border-t border-zinc-700 pt-3">
          Clique em <span className="text-white font-medium">Encerrar Turno</span> quando terminar sua jogada para passar a vez ao oponente.
        </p>
      </div>
    ),
  },
  {
    icon: "🛡️",
    title: "Modos de Invocação",
    body: (
      <div className="space-y-3 text-sm text-zinc-300 leading-relaxed">
        <p>Ao invocar um monstro, escolha um dos 4 modos:</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: "Ataque", desc: "Visível, usa ATK" },
            { name: "Defesa", desc: "Visível, usa DEF" },
            { name: "Oculto Ataque", desc: "Oculto, usa ATK" },
            { name: "Oculto Defesa", desc: "Oculto, usa DEF" },
          ].map(({ name, desc }) => (
            <div key={name} className="bg-zinc-800 rounded-lg px-3 py-2 border border-zinc-700">
              <p className="text-white font-semibold text-xs">{name}</p>
              <p className="text-zinc-400 text-[11px]">{desc}</p>
            </div>
          ))}
        </div>
        <p className="text-zinc-400 text-xs">
          Cartas ocultas não revelam seu valor ao oponente até serem atacadas.
        </p>
      </div>
    ),
  },
  {
    icon: "⚔️",
    title: "Sistema de Batalha",
    body: (
      <div className="space-y-3 text-sm text-zinc-300 leading-relaxed">
        <ul className="space-y-2">
          <li className="flex gap-2">
            <span className="text-red-400 font-bold shrink-0">•</span>
            <span>A diferença de pontos entre os monstros é descontada dos <span className="text-white font-semibold">pontos de vida</span> do perdedor.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-400 font-bold shrink-0">•</span>
            <span>Se o oponente não tiver monstros em campo, você pode fazer um <span className="text-white font-semibold">ataque direto</span>.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-yellow-400 font-bold shrink-0">•</span>
            <span>Na <span className="text-white font-semibold">primeira rodada</span> não é possível atacar.</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    icon: "✨",
    title: "Cartas de Efeito",
    body: (
      <div className="space-y-3 text-sm text-zinc-300 leading-relaxed">
        <p>
          Algumas cartas possuem <span className="text-yellow-300 font-semibold">efeitos especiais</span> que alteram as regras do jogo temporária ou permanentemente.
        </p>
        <p>
          Leia a <span className="text-white font-semibold">descrição</span> da carta para entender o que ela faz antes de jogá-la.
        </p>
        <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-400">
          Toque no ícone <span className="text-white font-medium">i</span> de uma carta para ver seus detalhes sem selecioná-la.
        </div>
      </div>
    ),
  },
];

export function BattleTutorial() {
  const { tutorialSeen, setTutorialSeen } = useUIStore();
  const [page, setPage] = useState(0);

  if (tutorialSeen) return null;

  const current = PAGES[page];
  const isLast = page === PAGES.length - 1;

  return (
    <AnimatePresence>
      <motion.div
        key="tutorial-overlay"
        className="fixed inset-0 z-[400] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          key={page}
          className="relative w-full max-w-sm bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.18 }}
        >
          {/* Header */}
          <div className="bg-zinc-800 px-5 py-4 flex items-center gap-3 border-b border-zinc-700">
            <span className="text-2xl">{current.icon}</span>
            <div>
              <p className="text-[10px] tracking-widest uppercase text-zinc-500 font-bold">Como jogar</p>
              <h2 className="text-white font-bold text-base leading-tight">{current.title}</h2>
            </div>
            <div className="ml-auto flex gap-1.5 items-center">
              {PAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`rounded-full transition-all ${
                    i === page
                      ? "w-4 h-1.5 bg-blue-400"
                      : "w-1.5 h-1.5 bg-zinc-600 hover:bg-zinc-500"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="px-5 py-4 min-h-[140px]">
            {current.body}
          </div>

          {/* Footer */}
          <div className="px-5 pb-5 pt-1 flex items-center gap-2">
            <button
              onClick={setTutorialSeen}
              className="text-zinc-500 text-xs hover:text-zinc-400 transition-colors mr-auto"
            >
              Pular tutorial
            </button>
            {page > 0 && (
              <button
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1.5 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 text-sm font-semibold rounded-lg transition-colors"
              >
                ←
              </button>
            )}
            {!isLast ? (
              <button
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Próximo →
              </button>
            ) : (
              <button
                onClick={setTutorialSeen}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Entendido ✓
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
