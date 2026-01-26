import { useState } from "react";

interface Avatar {
	id: number;
	url: string;
	gender: "male" | "female";
	label: string;
}

export default function ProfileScenario({
	onConfirm,
}: {
	onConfirm: (data: any) => void;
}) {
	const [name, setName] = useState("");
	const [gender, setGender] = useState<"male" | "female">("male");
	const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

	// Gerador de 40 personagens (20 de cada) usando DiceBear para fins de desenvolvimento
	const avatars: Avatar[] = [
		...Array.from({ length: 20 }, (_, i) => ({
			id: i + 1,
			url: `https://api.dicebear.com/7.x/avataaars/svg?seed=Male${i}&mood=happy`,
			gender: "male" as const,
			label: `Duelista M${i + 1}`,
		})),
		...Array.from({ length: 20 }, (_, i) => ({
			id: i + 21,
			url: `https://api.dicebear.com/7.x/avataaars/svg?seed=Female${i}&mood=happy`,
			gender: "female" as const,
			label: `Duelista F${i + 1}`,
		})),
	];

	const filteredAvatars = avatars.filter((a) => a.gender === gender);

	return (
		<div className="h-screen w-screen bg-zinc-950 flex flex-col items-center justify-center p-4 text-white bg-[radial-gradient(circle_at_center,_#1a1a2e_0%,#09090b_100%)]">
			<div className="w-full max-w-3xl bg-zinc-900/80 backdrop-blur-2xl border border-white/10 p-8 rounded-[2rem] shadow-2xl flex flex-col max-h-[90vh]">
				<header className="mb-6">
					<h2 className="text-3xl font-black italic uppercase tracking-tighter text-blue-500 italic">
						Registro de Duelista
					</h2>
					<div className="h-1 w-20 bg-blue-600 mt-2"></div>
				</header>

				<div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
					{/* NOME */}
					<section>
						<label className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-500 mb-2 block">
							Identificação
						</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Digite seu Nome de Duelista..."
							className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-xl font-bold placeholder:text-zinc-700"
						/>
					</section>

					{/* GÊNERO */}
					<section>
						<label className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-500 mb-2 block">
							Estilo de Personagem
						</label>
						<div className="flex gap-4">
							{["male", "female"].map((g) => (
								<button
									key={g}
									onClick={() => {
										setGender(g as "male" | "female");
										setSelectedAvatar(null);
									}}
									className={`flex-1 py-4 rounded-xl font-black uppercase tracking-widest transition-all border-2 ${gender === g ? "bg-blue-600 border-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.4)]" : "bg-zinc-800/50 border-white/5 text-zinc-600"}`}
								>
									{g === "male" ? "Masculino" : "Feminino"}
								</button>
							))}
						</div>
					</section>

					{/* GALERIA COM SCROLL CORRIGIDA */}
					<section className="flex flex-col gap-3">
						<label className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-500 block">
							Selecione seu Avatar ({filteredAvatars.length} opções)
						</label>

						{/* O segredo está no h-fixed + overflow-y-auto + grid-cols definido explicitamente */}
						<div className="h-72 overflow-y-auto pr-2 bg-black/40 rounded-2xl border border-white/10 p-4 shadow-inner">
							<div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
								{filteredAvatars.map((avatar) => (
									<div
										key={avatar.id}
										onClick={() => setSelectedAvatar(avatar.id)}
										className={`
            relative aspect-square rounded-xl cursor-pointer transition-all border-2 
            bg-zinc-800 flex items-center justify-center
            ${
							selectedAvatar === avatar.id
								? "border-blue-500 scale-105 z-10 shadow-[0_0_15px_rgba(59,130,246,0.6)]"
								: "border-transparent opacity-60 hover:opacity-100 hover:scale-105"
						}
          `}
									>
										{/* Imagem com w-full h-full para preencher o slot sem vazar */}
										<img
											src={avatar.url}
											alt={avatar.label}
											className="w-full h-full object-contain p-1 pointer-events-none"
										/>

										{/* Indicador de Seleção */}
										{selectedAvatar === avatar.id && (
											<div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center rounded-lg">
												<div className="bg-blue-600 text-white p-1 rounded-full scale-75 animate-bounce">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5"
														viewBox="0 0 20 20"
														fill="currentColor"
													>
														<path
															fillRule="evenodd"
															d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
															clipRule="evenodd"
														/>
													</svg>
												</div>
											</div>
										)}
									</div>
								))}
							</div>
						</div>
					</section>
				</div>

				{/* FOOTER / CONFIRMAÇÃO */}
				<footer className="mt-8 pt-6 border-t border-white/5">
					<button
						disabled={!name || !selectedAvatar}
						onClick={() =>
							onConfirm({
								name,
								gender,
								avatar: avatars.find((a) => a.id === selectedAvatar),
							})
						}
						className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-[0.3em] shadow-xl disabled:opacity-10 disabled:cursor-not-allowed transition-all active:scale-95"
					>
						Acessar Sistema de Duelo
					</button>
				</footer>
			</div>
		</div>
	);
}
