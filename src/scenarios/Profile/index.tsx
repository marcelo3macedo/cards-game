import { useProfileRegistration } from "./hooks/useProfileRegistration";

export default function ProfileScenario({ onConfirm }: { onConfirm: (data: any) => void }) {
  const {
    name, setName,
    gender, setGender,
    selectedAvatarId, setSelectedAvatarId,
    filteredAvatars,
    registerUser,
    isLoading,
    getFullImageUrl
  } = useProfileRegistration(onConfirm);

  const handleConfirm = async () => {
    try {
      const newUser = await registerUser();
      onConfirm(newUser);
    } catch (e) {
    }
  };

  return (
    <div className="h-screen w-screen bg-zinc-950 flex flex-col items-center justify-center p-4 text-white bg-[radial-gradient(circle_at_center,_#1a1a2e_0%,#09090b_100%)]">
      <div className="w-full max-w-3xl bg-zinc-900/80 backdrop-blur-2xl border border-white/10 p-8 rounded-[2rem] shadow-2xl flex flex-col max-h-[90vh]">
        <header className="mb-6">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-blue-500">
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
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-xl font-bold"
            />
          </section>

          {/* GÊNERO (BOY / GIRL) */}
          <section>
            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-500 mb-2 block">
              Estilo de Personagem
            </label>
            <div className="flex gap-4">
              {(["boy", "girl"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    setGender(g);
                    setSelectedAvatarId(null);
                  }}
                  className={`flex-1 py-4 rounded-xl font-black uppercase tracking-widest transition-all border-2 ${
                    gender === g
                    ? "bg-blue-600 border-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                    : "bg-zinc-800/50 border-white/5 text-zinc-600"
                  }`}
                >
                  {g === "boy" ? "Masculino" : "Feminino"}
                </button>
              ))}
            </div>
          </section>

          {/* GALERIA */}
          <section className="flex flex-col gap-3">
            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-500 block">
              Selecione seu Avatar ({filteredAvatars.length} opções)
            </label>

            <div className="h-72 overflow-y-auto pr-2 bg-black/40 rounded-2xl border border-white/10 p-4 shadow-inner">
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                {filteredAvatars.map((avatar) => (
                  <div
                    key={avatar.id}
                    onClick={() => setSelectedAvatarId(avatar.id)}
                    className={`
                      relative aspect-square rounded-xl cursor-pointer transition-all border-2 bg-zinc-800
                      ${selectedAvatarId === avatar.id
                        ? "border-blue-500 scale-105 z-10 shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                        : "border-transparent opacity-60 hover:opacity-100"
                      }
                    `}
                  >
                    <img
                      src={getFullImageUrl(avatar.imageUrl)}
                      alt={avatar.name}
                      className="w-full h-full object-cover rounded-lg p-1"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-8 pt-6 border-t border-white/5">
          <button
            disabled={!name || !selectedAvatarId || isLoading}
            onClick={handleConfirm}
            className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-[0.3em] disabled:opacity-10 transition-all"
          >
            {isLoading ? "Registrando..." : "Acessar Sistema de Duelo"}
          </button>
        </footer>
      </div>
    </div>
  );
}
