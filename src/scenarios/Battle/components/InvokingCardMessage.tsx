import { BattleEvent } from "../../../core/domain/BattleStore";
import { useBattleStore } from "../../../store/BattleStore";

export function InvokingCardMessage() {
    const { event } = useBattleStore();
    if (event !== BattleEvent.SELECTING_POSITION) return;

    return (
        <div className="absolute bottom-40 left-1/2 -translate-x-1/2 bg-blue-600/90 text-white px-8 py-3 rounded-full animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.5)] z-50 border border-blue-400">
          Escolha um local no campo para invocar ou pressione{" "}
          <span className="font-bold bg-black/30 px-2 py-0.5 rounded">ESC</span>
        </div>
    )
}
