import { FIELD_THEMES } from "../../../core/domain/FieldStyles";

interface ActiveField {
  name: string;
  type?: "agua" | "fogo" | "terra";
}

interface ActiveFieldIndicatorProps {
  field?: ActiveField | null;
}

export function ActiveFieldIndicator({ field }: ActiveFieldIndicatorProps) {
  const isActive = !!field;

  const themeKey = field?.type || (isActive ? "agua" : "padrao");
  const theme = FIELD_THEMES[themeKey as keyof typeof FIELD_THEMES] || FIELD_THEMES.padrao;

  const fieldName = field?.name || "Padrão";

  return (
    <div className="fixed right-0 top-1/3 sm:top-1/2 -translate-y-1/2 z-50 pointer-events-none select-none flex flex-col items-end gap-2 group">
      <span className="hidden sm:block text-[8px] uppercase tracking-[0.3em] text-white/20 rotate-180 [writing-mode:vertical-lr] mb-2 mr-4">
        Environment System
      </span>

      <div className={`
        flex items-center gap-2 sm:gap-4 px-2 py-1.5 sm:px-6 sm:py-4 mt-4 sm:mt-12 rounded-l-xl sm:rounded-l-3xl border-l border-y transition-all duration-700
        bg-zinc-950/90 ${theme.border} ${theme.shadow}
        ${isActive ? "translate-x-0" : "translate-x-4 opacity-80"}
        backdrop-blur-xl
      `}>

        <div className="flex flex-col items-end">
          <span className="sm:block text-[6px] sm:text-[9px] font-medium text-white/40 uppercase tracking-widest mb-1">
            Campo Ativo
          </span>
          <span className={`text-[10px] sm:text-lg font-black uppercase tracking-tighter transition-colors duration-500 ${theme.text}`}>
            {fieldName}
          </span>
        </div>

        <div className="relative flex h-2 w-2 sm:h-3 sm:w-3">
          {isActive && (
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-40 ${theme.dot}`}></span>
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 border border-white/20 transition-colors duration-500 ${theme.dot}`}></span>
        </div>
      </div>

      <div className={`
        h-10 sm:h-20 w-[2px] sm:w-[3px] mr-0 transition-all duration-1000 rounded-l-full
        ${theme.glow}
      `} />
    </div>
  );
}
