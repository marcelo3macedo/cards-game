import exemploLendaria from "../../assets/images/exemplo_legendaria.jpg";
import exemploMonstroRaro from "../../assets/images/exemplo_monstro_raro.jpg";
import exemploMagica from "../../assets/images/exemplo_magica.jpg";
import { playClickSound } from "../../utils/soundUtils";

export default function WelcomeScenario({ onStart }: { onStart: () => void }) {
  return (
    <div
      className="relative flex flex-col items-center justify-center select-none overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-zinc-950 to-black"
      style={{ minHeight: "100dvh" }}
      onClick={() => { playClickSound(); onStart(); }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={exemploLendaria}
          alt=""
          className="absolute -left-8 top-[10%] w-36 sm:w-72 rotate-[-18deg] opacity-20 rounded-lg blur-[1px]"
        />
        <img
          src={exemploMonstroRaro}
          alt=""
          className="absolute -right-6 top-[15%] w-32 sm:w-72 rotate-[15deg] opacity-20 rounded-lg blur-[1px]"
        />
        <img
          src={exemploMagica}
          alt=""
          className="absolute left-1/2 -translate-x-1/2 bottom-[8%] w-28 sm:w-72 rotate-[6deg] opacity-15 rounded-lg blur-[1px]"
        />
      </div>

      <div className="absolute top-1/3 -translate-y-1/2 w-72 h-32 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <h1
          className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-600 tracking-tighter uppercase italic leading-tight"
        >
          Rei dos Duelos
        </h1>

        <button
          onClick={(e) => { e.stopPropagation(); playClickSound(); onStart(); }}
          style={{ touchAction: "manipulation" }}
          className="group relative px-10 py-4 font-bold text-white transition-all duration-300 active:scale-95"
        >
          <div className="absolute inset-0 bg-blue-600 skew-x-[-16deg] group-hover:bg-blue-500 group-active:bg-blue-700 transition-all rounded-sm" />
          <span className="relative uppercase tracking-widest text-base">Iniciar Duelo</span>
        </button>

        <p className="text-zinc-500 text-sm animate-pulse mt-2">
          Toque em qualquer lugar para começar
        </p>
      </div>

      {/* Bottom safe area spacer */}
      <div className="pb-safe" style={{ paddingBottom: "env(safe-area-inset-bottom)" }} />
    </div>
  );
}
