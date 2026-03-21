import { useProfileRegistration } from "./hooks/useProfileRegistration";
import { useProfileKeyboard } from "./hooks/useProfileKeyboard";
import { playClickSound } from "../../utils/soundUtils";

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
    playClickSound();
    try {
      const newUser = await registerUser();
      onConfirm(newUser);
    } catch (e) {
    }
  };

  const { focusedSection, setFocusedSection, focusedAvatarIndex, nameInputRef, gridRef } =
    useProfileKeyboard({
      name, gender, setGender, setSelectedAvatarId,
      filteredAvatars, handleConfirm, isLoading,
    });

  const sectionLabel = (idx: number, text: string) => (
    <label
      className={`text-[10px] uppercase font-black tracking-[0.2em] mb-2 block cursor-pointer transition-colors ${
        focusedSection === idx ? "text-blue-400" : "text-zinc-500"
      }`}
      onClick={() => setFocusedSection(idx)}
    >
      {focusedSection === idx && <span className="mr-1 text-blue-400">▶</span>}
      {text}
    </label>
  );

  return (
    <div
      className="w-screen bg-zinc-950 flex flex-col items-center justify-center sm:p-4 text-white bg-[radial-gradient(circle_at_center,_#1a1a2e_0%,#09090b_100%)]"
      style={{ minHeight: "100dvh" }}
    >
      <div className="w-full max-w-3xl bg-zinc-900/80 backdrop-blur-2xl border-y sm:border border-white/10 p-4 sm:p-8 sm:rounded-[2rem] shadow-2xl flex flex-col h-[100dvh] sm:h-auto sm:max-h-[90vh]">
        <header className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-3xl font-black italic uppercase tracking-tighter text-blue-500">
            Registro de Duelista
          </h2>
          <div className="h-1 w-20 bg-blue-600 mt-2"></div>
        </header>

        <div className="space-y-4 sm:space-y-6 flex flex-col flex-1 min-h-0 sm:overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
          {/* NOME */}
          <section onClick={() => setFocusedSection(0)}>
            {sectionLabel(0, "Identificação")}
            <input
              ref={nameInputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setFocusedSection(0)}
              placeholder="Digite seu Nome de Duelista..."
              className={`w-full bg-white/5 border p-3 sm:p-4 rounded-xl focus:outline-none transition-all text-base sm:text-xl font-bold ${
                focusedSection === 0 ? "border-blue-500" : "border-white/10"
              }`}
            />
          </section>

          {/* GÊNERO */}
          <section>
            {sectionLabel(1, "Estilo de Personagem")}
            <div className="flex gap-3 sm:gap-4">
              {(["boy", "girl"] as const).map((g) => (
                <button
                  key={g}
                  style={{ touchAction: "manipulation" }}
                  onClick={() => {
                    playClickSound();
                    setGender(g);
                    setSelectedAvatarId(null);
                    setFocusedSection(1);
                  }}
                  className={`flex-1 py-3 sm:py-4 rounded-xl font-black uppercase tracking-widest transition-all border-2 text-sm sm:text-base ${
                    gender === g
                      ? "bg-blue-600 border-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                      : "bg-zinc-800/50 border-white/5 text-zinc-600"
                  }`}
                >
                  {g === "boy" ? "Masculino" : "Feminino"}
                </button>
              ))}
            </div>
            {focusedSection === 1 && (
              <p className="text-[10px] text-zinc-600 mt-1 text-center">← → para alternar</p>
            )}
          </section>

          {/* GALERIA */}
          <section className="flex flex-col gap-3 flex-1 min-h-0">
            {sectionLabel(2, `Selecione seu Avatar (${filteredAvatars.length} opções)`)}

            <div
              className={`flex-1 min-h-0 overflow-y-auto pr-1 sm:pr-2 sm:h-72 bg-black/40 rounded-2xl border p-3 sm:p-4 shadow-inner transition-colors ${
                focusedSection === 2 ? "border-blue-500/50" : "border-white/10"
              }`}
            >
              <div
                ref={gridRef}
                className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
              >
                {filteredAvatars.map((avatar, idx) => (
                  <div
                    key={avatar.id}
                    data-avatar-idx={idx}
                    style={{ touchAction: "manipulation" }}
                    onClick={() => {
                      playClickSound();
                      setSelectedAvatarId(avatar.id);
                      setFocusedSection(2);
                    }}
                    className={`
                      relative aspect-square rounded-xl cursor-pointer transition-all border-2 bg-zinc-800
                      ${selectedAvatarId === avatar.id
                        ? "border-blue-500 scale-105 z-10 shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                        : focusedSection === 2 && idx === focusedAvatarIndex
                          ? "border-white/40 opacity-90"
                          : "border-transparent opacity-60 hover:opacity-100 active:opacity-100"
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

        <footer className="mt-4 sm:mt-8 pt-4 sm:pt-6 border-t border-white/5" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
          <button
            disabled={!name || !selectedAvatarId || isLoading}
            style={{ touchAction: "manipulation" }}
            onClick={handleConfirm}
            className="w-full py-4 sm:py-5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-[0.3em] disabled:opacity-10 transition-all text-sm sm:text-base"
          >
            {isLoading ? "Registrando..." : "Acessar Sistema de Duelo"}
          </button>
          <p className="text-center text-[10px] text-zinc-700 mt-2 tracking-widest uppercase">
            Enter · confirmar &nbsp;·&nbsp; Esc · voltar &nbsp;·&nbsp; ↑↓←→ · navegar
          </p>
        </footer>
      </div>
    </div>
  );
}
