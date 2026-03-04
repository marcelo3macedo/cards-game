import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Coins, X } from "lucide-react";
import { useStore } from "./hooks/useStore";
import { PackageCard } from "./components/PackageCard";
import type { StorePackageItem } from "../../services/storeService";
import seller from "../../assets/images/seller.jpg"

const SELLER_QUOTE = "Bem-vindo, duelista! Tenho os melhores pacotes do reino. Escolha com sabedoria!";

interface StoreScenarioProps {
  onBack: () => void;
  onPackageOpened: () => void;
}

export default function StoreScenario({ onBack, onPackageOpened }: StoreScenarioProps) {
  const {
    user,
    storePackages,
    loading,
    buying,
    error,
    confirmPackage,
    setConfirmPackage,
    handleBuy,
  } = useStore(onPackageOpened);

  return (
    <div className="h-screen w-screen bg-zinc-950 flex flex-col overflow-hidden text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-white/5 backdrop-blur-md shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Voltar
        </button>
        <h1 className="text-xl font-black italic uppercase tracking-tighter text-yellow-400">
          Loja
        </h1>
        <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 px-4 py-2 rounded-full">
          <Coins size={16} className="text-yellow-500" />
          <span className="text-yellow-400 font-black text-lg">{user?.coins ?? 0}</span>
          <span className="text-yellow-600 text-xs font-bold uppercase">moedas</span>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Seller panel */}
        <div className="w-64 shrink-0 relative flex flex-col overflow-hidden border-r border-white/5">
          <img
            src={seller}
            alt="Vendedor"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

          {/* Speech bubble */}
          <div className="relative m-4 mt-6">
            <div className="bg-white text-zinc-900 rounded-2xl rounded-tl-none px-4 py-3 text-xs font-medium leading-relaxed shadow-xl">
              {SELLER_QUOTE}
            </div>
            <div className="w-3 h-3 bg-white absolute -left-1.5 top-3 rotate-45" />
          </div>

          {/* Coins display */}
          <div className="relative mt-auto p-5 bg-black/70 backdrop-blur-sm border-t border-white/10">
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold mb-1">
              Suas Moedas
            </p>
            <div className="flex items-center gap-2">
              <Coins size={20} className="text-yellow-500" />
              <span className="text-yellow-400 font-black text-2xl">{user?.coins ?? 0}</span>
            </div>
            <p className="text-zinc-600 text-[9px] mt-1 uppercase">
              +50 moedas por vitória em duelo
            </p>
          </div>
        </div>

        {/* Packages panel */}
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter">
                Pacotes Disponíveis
              </h2>
              <p className="text-zinc-500 text-sm mt-1">
                Compre pacotes para receber cartas aleatórias.
              </p>
            </div>

            {error && (
              <div className="mb-6 px-4 py-3 bg-red-900/30 border border-red-500/30 rounded-xl text-red-400 text-sm font-bold">
                {error}
              </div>
            )}

            {loading ? (
              <div className="text-zinc-600 font-black italic animate-pulse text-center py-20">
                Carregando pacotes...
              </div>
            ) : storePackages.length === 0 ? (
              <p className="text-zinc-600 text-center py-20">Nenhum pacote disponível no momento.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {storePackages.map((pkg) => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    userLevel={user?.level ?? 0}
                    userCoins={user?.coins ?? 0}
                    onClick={() => setConfirmPackage(pkg)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirm modal */}
      <AnimatePresence>
        {confirmPackage && (
          <ConfirmModal
            pkg={confirmPackage}
            buying={buying}
            onConfirm={() => handleBuy(confirmPackage)}
            onCancel={() => setConfirmPackage(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ConfirmModal({
  pkg,
  buying,
  onConfirm,
  onCancel,
}: {
  pkg: StorePackageItem;
  buying: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.85, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 20 }}
        className="bg-zinc-900 border border-white/10 rounded-2xl p-8 max-w-sm w-full shadow-2xl"
      >
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-black uppercase italic text-white">{pkg.name}</h3>
          <button onClick={onCancel} className="text-zinc-600 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <p className="text-zinc-400 text-sm mb-6 leading-relaxed">{pkg.description}</p>

        <div className="flex justify-between text-sm mb-8">
          <div>
            <p className="text-zinc-600 text-xs uppercase font-bold mb-0.5">Cartas</p>
            <p className="text-white font-black">{pkg.cardCount}</p>
          </div>
          <div className="text-right">
            <p className="text-zinc-600 text-xs uppercase font-bold mb-0.5">Custo</p>
            <div className="flex items-center gap-1.5 justify-end">
              <Coins size={14} className="text-yellow-500" />
              <p className="text-yellow-400 font-black text-lg">{pkg.price}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={buying}
            className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-bold text-zinc-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={buying}
            className="flex-1 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-black rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100"
          >
            {buying ? "Comprando..." : "Confirmar"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
