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
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 pointer-events-none select-none flex flex-col items-end gap-2 group">
      <span className="text-[8px] uppercase tracking-[0.3em] text-white/20 rotate-180 [writing-mode:vertical-lr] mb-2 mr-4">
        Environment System
      </span>

      <div className={`
        flex items-center gap-4 px-6 py-4 mt-12 rounded-l-3xl border-l border-y transition-all duration-700
        ${theme.bg} ${theme.border} ${theme.shadow}
        ${isActive ? "translate-x-0" : "translate-x-4 opacity-80"}
        backdrop-blur-xl
      `}>

        <div className="flex flex-col items-end">
          <span className="text-[9px] font-medium text-white/40 uppercase tracking-widest mb-1">
            Campo Ativo
          </span>
          <span className={`text-lg font-black uppercase tracking-tighter transition-colors duration-500 ${theme.text}`}>
            {fieldName}
          </span>
        </div>

        <div className="relative flex h-3 w-3">
          {isActive && (
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-40 ${theme.dot}`}></span>
          )}
          <span className={`relative inline-flex rounded-full h-3 w-3 border border-white/20 transition-colors duration-500 ${theme.dot}`}></span>
        </div>
      </div>

      <div className={`
        h-20 w-[3px] mr-0 transition-all duration-1000 rounded-l-full
        ${theme.glow}
      `} />
    </div>
  );
}
