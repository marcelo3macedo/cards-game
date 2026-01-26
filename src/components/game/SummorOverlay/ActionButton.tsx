export const ActionButton = ({ 
    mode, 
    label, 
    subLabel, 
    isVertical,
    onSummon
  }: { 
    mode: any, 
    label: string, 
    subLabel: string, 
    isVertical: boolean,
    onSummon: any
  }) => (
    <button 
      onClick={() => onSummon(mode)}
      className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-blue-600/20 border border-white/10 hover:border-blue-500/50 transition-all"
    >
      <div className={`
        w-12 h-16 border-2 border-white/40 rounded-sm bg-zinc-800 transition-transform group-hover:scale-110 group-hover:border-blue-400
        ${!isVertical ? 'rotate-90' : ''}
        ${mode.includes('face-down') ? 'bg-orange-900 border-dashed' : 'bg-zinc-700'}
      `}>
        {mode.includes('face-down') && <div className="w-full h-full flex items-center justify-center text-[8px] opacity-30">🌀</div>}
      </div>
      
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-black uppercase tracking-tighter text-white">{label}</span>
        <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-blue-300">{subLabel}</span>
      </div>
    </button>
  );