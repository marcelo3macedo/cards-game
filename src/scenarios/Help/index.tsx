import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sword, Shield, Trophy, Zap, Info, ChevronRight, X } from 'lucide-react';

interface TutorialTopic {
    id: string;
    title: string;
    icon: React.ReactNode;
    content: React.ReactNode;
    color: string;
}

export default function TutorialScenario({ onBack }: { onBack: () => void }) {
    const [activeTopic, setActiveTopic] = useState<string>('cartas');

    const topics: TutorialTopic[] = [
        {
            id: 'cartas',
            title: 'Tipos de Cartas',
            icon: <Zap size={20} />,
            color: 'text-orange-400',
            content: (
                <div className="space-y-6">
                    <div className="bg-orange-950/20 border border-orange-500/20 p-4 rounded-xl">
                        <h4 className="font-black text-orange-400 uppercase italic mb-2">Monstros (Laranja)</h4>
                        <p className="text-zinc-400 text-sm leading-relaxed">São sua principal força de ataque. Possuem níveis (estrelas) e pontos de ATK/DEF. Podem ser invocados em modo de ataque ou defesa.</p>
                    </div>
                    <div className="bg-emerald-950/20 border border-emerald-500/20 p-4 rounded-xl">
                        <h4 className="font-black text-emerald-400 uppercase italic mb-2">Mágicas (Verde)</h4>
                        <p className="text-zinc-400 text-sm leading-relaxed">Ativadas da sua mão durante o seu turno para conceder bônus, destruir cartas ou comprar mais recursos.</p>
                    </div>
                    <div className="bg-pink-950/20 border border-pink-500/20 p-4 rounded-xl">
                        <h4 className="font-black text-pink-400 uppercase italic mb-2">Armadilhas (Rosa)</h4>
                        <p className="text-zinc-400 text-sm leading-relaxed">Devem ser baixadas no campo primeiro. Podem ser ativadas no turno do oponente para surpreendê-lo e bloquear ataques.</p>
                    </div>
                </div>
            )
        },
        {
            id: 'modos',
            title: 'Posições de Campo',
            icon: <Shield size={20} />,
            color: 'text-blue-400',
            content: (
                <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                        <div className="bg-zinc-800 p-3 rounded-lg"><Sword className="text-red-500" /></div>
                        <div>
                            <h4 className="font-bold text-white">Modo de Ataque (Vertical)</h4>
                            <p className="text-zinc-400 text-xs">Usa os pontos de ATK. Se vencer uma batalha, causa dano aos Life Points (LP) do oponente.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <div className="bg-zinc-800 p-3 rounded-lg rotate-90"><Shield className="text-blue-500" /></div>
                        <div>
                            <h4 className="font-bold text-white">Modo de Defesa (Horizontal)</h4>
                            <p className="text-zinc-400 text-xs">Usa os pontos de DEF. Protege seus LP: se o monstro for destruído em defesa, você não perde pontos de vida.</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'batalha',
            title: 'Como Funciona o Ataque',
            icon: <Sword size={20} />,
            color: 'text-red-500',
            content: (
                <div className="space-y-4 text-sm text-zinc-400">
                    <p className="bg-white/5 p-3 rounded-lg border-l-4 border-red-500">
                        <strong className="text-white">Cálculo de Dano:</strong> Quando seu ATK é maior que o ATK/DEF do alvo.
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-2">
                        <li>Contra Ataque: Dano = Seu ATK - ATK Inimigo.</li>
                        <li>Contra Defesa: Alvo é destruído se Seu ATK {">"} DEF Inimiga (sem dano ao oponente).</li>
                        <li>Ataque Direto: Se o oponente não tem monstros, você ataca os LP dele diretamente com seu ATK total!</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'vitoria',
            title: 'Vitória e Derrota',
            icon: <Trophy size={20} />,
            color: 'text-yellow-500',
            content: (
                <div className="flex flex-col items-center text-center py-6">
                    <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4">
                        <Trophy size={40} className="text-yellow-500" />
                    </div>
                    <h4 className="text-xl font-black italic mb-2 uppercase">Life Points (LP)</h4>
                    <p className="text-zinc-400 max-w-xs">
                        Ambos os jogadores começam com <span className="text-white font-bold">8000 LP</span>. 
                        O primeiro a chegar a <span className="text-red-500 font-bold">0 LP</span> perde o duelo!
                    </p>
                    <div className="mt-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs italic">
                        Dica: Se o baralho de um jogador acabar e ele não puder comprar cartas, ele também perde!
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="h-screen w-screen bg-zinc-950 flex flex-col text-white overflow-hidden font-sans relative">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#1e1b4b_0%,#09090b_100%)] opacity-50" />
            
            <header className="h-20 border-b border-white/5 bg-black/40 backdrop-blur-xl flex items-center justify-between px-10 z-10">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-600 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-black italic tracking-widest">GUIA DE DUELISTA</h1>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em]">Regras e Dicas do Jogo</p>
                    </div>
                </div>
                <button 
                    onClick={onBack}
                    className="group flex items-center gap-2 px-6 py-2 bg-zinc-900 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all font-bold text-xs"
                >
                    VOLTAR AO MENU <X size={16} />
                </button>
            </header>

            <main className="flex-1 flex overflow-hidden z-10">
                {/* Menu Lateral */}
                <aside className="w-80 border-r border-white/5 p-6 flex flex-col gap-3">
                    {topics.map((topic) => (
                        <button
                            key={topic.id}
                            onClick={() => setActiveTopic(topic.id)}
                            className={`flex items-center justify-between p-4 rounded-2xl transition-all ${
                                activeTopic === topic.id 
                                ? 'bg-white text-black shadow-xl scale-105' 
                                : 'bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className={activeTopic === topic.id ? 'text-black' : topic.color}>{topic.icon}</span>
                                <span className="text-sm font-black uppercase italic">{topic.title}</span>
                            </div>
                            <ChevronRight size={16} opacity={activeTopic === topic.id ? 1 : 0} />
                        </button>
                    ))}
                </aside>

                {/* Conteúdo Dinâmico */}
                <section className="flex-1 p-12 overflow-y-auto custom-scrollbar flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTopic}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="max-w-2xl w-full"
                        >
                            <div className="mb-8">
                                <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full mb-4 inline-block`}>
                                    Tópico de Ajuda
                                </span>
                                <h2 className="text-5xl font-black italic uppercase text-white mb-2">
                                    {topics.find(t => t.id === activeTopic)?.title}
                                </h2>
                                <div className="w-20 h-1.5 bg-blue-600 rounded-full" />
                            </div>

                            <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-3xl backdrop-blur-sm">
                                {topics.find(t => t.id === activeTopic)?.content}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </section>
            </main>

            {/* Footer Dica Rápida */}
            <footer className="h-12 bg-blue-600 flex items-center justify-center px-10">
                <div className="flex items-center gap-2 text-white font-bold text-[10px] uppercase tracking-widest">
                    <Info size={14} />
                    <span>Dica: Clique com o botão direito em qualquer carta durante o duelo para ver seus detalhes.</span>
                </div>
            </footer>
        </div>
    );
}