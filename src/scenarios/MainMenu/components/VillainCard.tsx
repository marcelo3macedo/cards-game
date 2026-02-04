import { getImageUrl } from "../../../utils/imageUtils";

interface VillainCardProps {
  villain: any;
  userLevel: number;
  onSelect: (villain: any) => void;
}

export function VillainCard({ villain, userLevel, onSelect }: VillainCardProps) {
  const isLocked = userLevel < villain.level;

  if (isLocked) {
    return (
      <div className="opacity-40 grayscale bg-zinc-900/50 border border-white/5 rounded-2xl p-6 cursor-not-allowed relative overflow-hidden h-full">
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="bg-black/90 px-4 py-2 border border-red-500/50 text-center">
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-red-500">Bloqueado</p>
            <p className="text-[9px] text-zinc-400">REQUER NÍVEL {villain.level}</p>
          </div>
        </div>
        <div className="h-56 bg-zinc-800 rounded-xl mb-4" />
        <h3 className="text-xl font-black uppercase italic text-zinc-400">{villain.name}</h3>
      </div>
    );
  }

  return (
    <div
      onClick={() => onSelect(villain)}
      className="group relative bg-zinc-900/50 border border-white/5 rounded-2xl p-6 cursor-pointer hover:border-blue-500/50 transition-all hover:translate-y-[-4px] h-full flex flex-col"
    >
      <div className="h-56 bg-zinc-800 rounded-xl mb-4 overflow-hidden relative">
        <img
          src={getImageUrl(villain.profilePictureUrl)}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          alt={villain.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-60"></div>
        <div className="absolute bottom-2 left-2">
          <span className="bg-blue-600 text-[10px] font-black px-2 py-1 rounded">
            LV {villain.level}
          </span>
        </div>
      </div>

      <h3 className="text-xl font-black uppercase italic group-hover:text-blue-400 transition-colors">
        {villain.name}
      </h3>

      <p className="text-zinc-500 text-xs mt-2 leading-relaxed flex-1">
        {villain.description}
      </p>
    </div>
  );
}
