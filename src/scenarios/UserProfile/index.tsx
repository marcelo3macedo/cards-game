import { useEffect, useState } from "react";
import { userService, type UserProfile, type BattleHistoryEntry } from "../../services/userService";
import { getImageUrl } from "../../utils/imageUtils";
import { getRankName } from "../../utils/rankUtils";

function StatusBadge({ status }: { status: "victory" | "lose" }) {
  return (
    <span
      className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
        status === "victory"
          ? "bg-green-500/20 text-green-400 border border-green-500/30"
          : "bg-red-500/20 text-red-400 border border-red-500/30"
      }`}
    >
      {status === "victory" ? "Vitória" : "Derrota"}
    </span>
  );
}

function StarRow({ stars }: { stars: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3].map((n) => (
        <span key={n} className={n <= stars ? "text-yellow-400" : "text-zinc-700"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function UserProfileScenario({ onBack }: { onBack: () => void }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [history, setHistory] = useState<BattleHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [userData, historyData] = await Promise.all([
          userService.getMe(),
          userService.getHistory(),
        ]);
        setUser(userData);
        setHistory(historyData);
      } catch (e: any) {
        setError(e.message || "Erro ao carregar dados");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const victories = history.filter((h) => h.status === "victory").length;
  const losses = history.filter((h) => h.status === "lose").length;

  if (loading) {
    return (
      <div className="h-screen w-screen bg-zinc-950 flex items-center justify-center text-blue-500 font-black italic">
        CARREGANDO PERFIL...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen bg-zinc-950 flex flex-col items-center justify-center gap-4">
        <p className="text-red-400 font-bold">{error}</p>
        <button onClick={onBack} className="text-zinc-500 hover:text-white text-xs uppercase tracking-widest font-black transition-colors">
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div
      className="select-none w-screen bg-zinc-950 flex flex-col overflow-hidden text-white bg-[radial-gradient(circle_at_top_right,_#1e1b4b_0%,#09090b_100%)]"
      style={{ height: "100dvh" }}
    >
      {/* Header */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-black/40 border-b border-white/5 backdrop-blur-md flex items-center gap-3 shrink-0">
        <button
          style={{ touchAction: "manipulation" }}
          onClick={onBack}
          className="text-zinc-500 hover:text-white transition-colors p-1 -ml-1 rounded-lg active:bg-white/10"
          aria-label="Voltar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-base sm:text-lg font-black italic uppercase tracking-tighter">
          Perfil do Duelista
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col gap-6">

          {/* User card */}
          <div className="bg-black/30 border border-white/10 rounded-2xl p-5 sm:p-6 flex items-center gap-4 sm:gap-6">
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-blue-500 overflow-hidden bg-zinc-800">
                <img
                  src={getImageUrl(user?.profile?.imageUrl) || "/placeholder-avatar.jpg"}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-blue-600 text-[10px] font-black px-2 py-0.5 rounded-full border border-zinc-950">
                LV {user?.level ?? 1}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter text-blue-400 truncate">
                {user?.name ?? "Duelista"}
              </h2>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-3">
                {getRankName(user?.level ?? 0)}
              </p>
              <div className="flex gap-4 sm:gap-6 flex-wrap">
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold">Moedas</p>
                  <p className="text-lg font-black text-yellow-400">{user?.coins ?? 0}</p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold">Vitórias</p>
                  <p className="text-lg font-black text-green-400">{victories}</p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold">Derrotas</p>
                  <p className="text-lg font-black text-red-400">{losses}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Battle history */}
          <div>
            <h3 className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em] mb-3">
              Histórico de Batalhas
            </h3>

            {history.length === 0 ? (
              <div className="bg-black/20 border border-white/5 rounded-xl p-8 text-center">
                <p className="text-zinc-600 text-sm font-bold uppercase tracking-widest">Nenhuma batalha registrada</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {history.map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-black/30 border border-white/5 rounded-xl px-4 py-3 flex items-center gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black uppercase italic tracking-tight truncate">
                        {entry.villain?.name ?? "Desconhecido"}
                      </p>
                      <p className="text-[10px] text-zinc-600 font-bold">
                        {new Date(entry.date).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <StarRow stars={entry.stars} />
                    <StatusBadge status={entry.status} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
