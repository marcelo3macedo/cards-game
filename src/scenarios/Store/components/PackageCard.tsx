import { Lock, Package, Coins } from "lucide-react";
import type { StorePackageItem } from "../../../services/storeService";

interface PackageCardProps {
  pkg: StorePackageItem;
  userLevel: number;
  userCoins: number;
  onClick: () => void;
}

export function PackageCard({ pkg, userLevel, userCoins, onClick }: PackageCardProps) {
  const isLocked = userLevel < pkg.requiredLevel;
  const canAfford = userCoins >= pkg.price;

  if (isLocked) {
    return (
      <div className="relative bg-zinc-900/40 border border-white/5 rounded-2xl p-4 sm:p-6 opacity-50 grayscale cursor-not-allowed">
        <div className="absolute inset-0 flex items-center justify-center z-10 rounded-2xl bg-black/60">
          <div className="text-center">
            <Lock size={28} className="text-red-500 mx-auto mb-1" />
            <p className="text-red-400 text-xs font-black uppercase tracking-widest">
              Nível {pkg.requiredLevel}
            </p>
          </div>
        </div>
        <PackageCardContent pkg={pkg} canAfford={false} />
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={!canAfford}
      className={`
        w-full text-left relative bg-zinc-900/60 border rounded-2xl p-4 sm:p-6 transition-all
        ${canAfford
          ? "border-yellow-500/20 hover:border-yellow-500/60 hover:-translate-y-1 cursor-pointer hover:shadow-[0_0_30px_rgba(234,179,8,0.15)]"
          : "border-white/5 opacity-60 cursor-not-allowed"
        }
      `}
    >
      {!canAfford && (
        <div className="absolute top-3 right-3 bg-red-900/80 text-red-400 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
          Sem moedas
        </div>
      )}
      <PackageCardContent pkg={pkg} canAfford={canAfford} />
    </button>
  );
}

function PackageCardContent({ pkg, canAfford }: { pkg: StorePackageItem; canAfford: boolean }) {
  return (
    <>
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-yellow-500/10 border border-yellow-500/30 rounded-xl flex items-center justify-center">
          <Package size={22} className="text-yellow-500" />
        </div>
        <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest border border-white/10 px-2 py-1 rounded-full">
          LV {pkg.requiredLevel}+
        </span>
      </div>

      <h3 className="text-white font-black text-base sm:text-lg uppercase italic leading-tight mb-1">
        {pkg.name}
      </h3>
      <p className="text-zinc-500 text-xs leading-relaxed mb-4 sm:mb-5">{pkg.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Coins size={14} className={canAfford ? "text-yellow-500" : "text-zinc-600"} />
          <span className={`font-black text-lg ${canAfford ? "text-yellow-400" : "text-zinc-500"}`}>
            {pkg.price}
          </span>
        </div>
        <span className="text-zinc-600 text-xs font-bold">{pkg.cardCount} cartas</span>
      </div>
    </>
  );
}
