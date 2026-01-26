import { useState } from "react";

export default function MainMenuScenario({
	userData,
	onSelectOpponent,
	onViewDeck,
	onViewTips,
}: any) {
	// Simulando dados de progresso que viriam de um banco ou estado global
	const stats = {
		level: 15,
		wins: 42,
		losses: 12,
		rank: "Duelista de Elite",
	};

	return (
		<div className="h-screen w-screen bg-zinc-950 flex flex-col overflow-hidden text-white bg-[radial-gradient(circle_at_top_right,_#1e1b4b_0%,#09090b_100%)]">
			{/* 1. HEADER: PERFIL DO USUÁRIO (ID CARD) */}
			<div className="p-6 bg-black/40 border-b border-white/5 backdrop-blur-md flex justify-between items-center">
				<div className="flex items-center gap-4">
					<div className="relative">
						<div className="w-16 h-16 rounded-full border-2 border-blue-500 overflow-hidden bg-zinc-800">
							<img
								src={userData?.avatar?.url}
								alt="Avatar"
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="absolute -bottom-1 -right-1 bg-blue-600 text-[10px] font-black px-2 py-0.5 rounded-full border border-zinc-950">
							LV {stats.level}
						</div>
					</div>
					<div>
						<h2 className="text-xl font-black italic uppercase tracking-tighter text-blue-400">
							{userData?.name || "Duelista Anonimo"}
						</h2>
						<p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
							{stats.rank}
						</p>
					</div>
				</div>

				<div className="flex gap-8">
					<div className="text-center">
						<p className="text-[10px] text-zinc-500 uppercase font-bold">
							Vitórias
						</p>
						<p className="text-xl font-black text-green-500">{stats.wins}</p>
					</div>
					<div className="text-center">
						<p className="text-[10px] text-zinc-500 uppercase font-bold">
							Derrotas
						</p>
						<p className="text-xl font-black text-red-500">{stats.losses}</p>
					</div>
				</div>
			</div>

			<div className="flex flex-1">
				{/* 2. MENU LATERAL (NAVEGAÇÃO) */}
				<nav className="w-64 bg-black/20 border-r border-white/5 p-6 flex flex-col gap-3">
					<label className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em] mb-2">
						Menu Principal
					</label>

					<button className="w-full py-4 px-6 bg-blue-600/10 border-r-4 border-blue-500 text-blue-400 font-bold text-left hover:bg-blue-600/20 transition-all uppercase tracking-widest text-xs">
						Duelar
					</button>

					<button
						onClick={onViewDeck}
						className="w-full py-4 px-6 text-zinc-500 font-bold text-left hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest text-xs"
					>
						Meu Baralho (Deck)
					</button>

					<button
						onClick={onViewTips}
						className="w-full py-4 px-6 text-zinc-500 font-bold text-left hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest text-xs"
					>
						Dicas & Regras
					</button>

					<div className="mt-auto">
						<button className="w-full py-3 text-zinc-700 hover:text-red-400 text-[10px] font-black uppercase tracking-widest transition-colors">
							Sair do Jogo
						</button>
					</div>
				</nav>

				{/* 3. CONTEÚDO PRINCIPAL (SELEÇÃO DE OPONENTES) */}
				<main className="flex-1 p-10 overflow-y-auto custom-scrollbar">
					<div className="max-w-4xl mx-auto">
						<header className="mb-10">
							<h1 className="text-4xl font-black italic uppercase tracking-tighter">
								Escolha seu Destino
							</h1>
							<p className="text-zinc-500">
								Selecione um oponente para iniciar o duelo nas sombras.
							</p>
						</header>

						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							{/* Card de Oponente 1 */}
							<div
								onClick={onSelectOpponent}
								className="group relative bg-zinc-900/50 border border-white/5 rounded-2xl p-6 cursor-pointer hover:border-blue-500/50 transition-all hover:translate-y-[-4px]"
							>
								<div className="h-48 bg-zinc-800 rounded-xl mb-4 overflow-hidden relative">
									<div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-60"></div>
									<div className="absolute bottom-4 left-4">
										<span className="bg-blue-600 text-[10px] font-bold px-2 py-1 rounded">
											ESTRUTURAL
										</span>
									</div>
								</div>
								<h3 className="text-2xl font-black uppercase italic group-hover:text-blue-400 transition-colors">
									Duelista Iniciante
								</h3>
								<div className="flex gap-1 mt-2">
									<span className="text-yellow-500 text-xs">★☆☆☆☆</span>
								</div>
								<p className="text-zinc-500 text-xs mt-3">
									Um oponente perfeito para testar novas estratégias e combos
									básicos.
								</p>
							</div>

							{/* Card de Oponente 2 (Bloqueado) */}
							<div className="opacity-40 grayscale bg-zinc-900/50 border border-white/5 rounded-2xl p-6 cursor-not-allowed relative overflow-hidden">
								<div className="absolute inset-0 flex items-center justify-center z-10">
									<span className="bg-black/80 px-4 py-2 border border-white/10 text-[10px] font-bold tracking-[0.3em] uppercase">
										Bloqueado
									</span>
								</div>
								<div className="h-48 bg-zinc-800 rounded-xl mb-4"></div>
								<h3 className="text-2xl font-black uppercase italic">
									Seto Kaiba
								</h3>
								<div className="flex gap-1 mt-2 text-xs">★★★★★</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
