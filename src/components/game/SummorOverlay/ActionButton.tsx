export const ActionButton = ({
  mode,
  label,
  subLabel,
  isVertical,
  onSummon,
  isSelected,
}: {
  mode: any;
  label: string;
  subLabel: string;
  isVertical: boolean;
  onSummon: any;
  isSelected?: boolean;
}) => (
  <button
    onClick={() => onSummon(mode)}
    data-testid={`summon-card-${mode}`}
    style={{ touchAction: "manipulation" }}
    className={`
        group flex flex-col items-center gap-1 sm:gap-3 p-2 sm:p-4 rounded-xl transition-all w-full
        ${
          isSelected
            ? "bg-blue-600/30 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] scale-105"
            : "bg-white/5 border-white/10 hover:bg-blue-600/20 hover:border-blue-500/50"
        }
        border
      `}
  >
    <div
      className={`
        w-12 h-16 border-2 rounded-sm transition-all
        ${!isVertical ? "rotate-90" : ""}
        ${mode.includes("face-down") ? "bg-orange-900 border-dashed" : "bg-zinc-700"}
        ${isSelected ? "border-blue-400 scale-110" : "border-white/40 group-hover:scale-110 group-hover:border-blue-400"}
      `}
    >
      {mode.includes("face-down") && (
        <div className="w-full h-full flex items-center justify-center text-[8px] opacity-30">
          🌀
        </div>
      )}
    </div>

    <div className="flex flex-col items-center">
      <span
        className={`
          text-[10px] font-black uppercase tracking-tighter transition-colors
          ${isSelected ? "text-blue-100" : "text-white"}
        `}
      >
        {label}
      </span>
      <span
        className={`
          text-[8px] font-bold uppercase tracking-widest transition-colors
          ${isSelected ? "text-blue-300" : "text-zinc-500 group-hover:text-blue-300"}
        `}
      >
        {subLabel}
      </span>
    </div>
  </button>
);
