import type { BoardGutterProps } from "../../../../core/domain/GameBoard";
import { useBattleStore } from "../../../../store/BattleStore";

export const BoardGutter = ({ onDraw, type }: BoardGutterProps) => {
  const { player, opponent } = useBattleStore();
  const selected = type === "player" ? player : opponent;
  const isOpponent = type === "opponent";

  return (
    <div
      className={`flex flex-col h-full w-24 items-center justify-end ${isOpponent ? "rotate-180 mb-10" : "mt-10"}`}
    >
      <div className="flex flex-col gap-3">
        <div className="w-24 h-32 bg-zinc-800/40 border-2 border-zinc-700 rounded-lg relative flex items-center justify-center flex-col">
          <span className="text-[10px] font-bold text-zinc-600 uppercase">Cemitério</span>
          <span className="text-[10px] font-bold text-zinc-600">
            {selected?.graveyard?.length ?? 0}
          </span>
        </div>

        <div
          onClick={!isOpponent ? onDraw : undefined}
          className={`w-24 h-32 bg-orange-900 border-2 border-orange-700 rounded-lg shadow-[0_6px_0_#431407] transition-all flex items-center justify-center group flex-col
            ${!isOpponent ? "hover:translate-y-1 active:translate-y-1.5 cursor-pointer" : "opacity-80"}`}
        >
          <span className="text-sm font-bold text-orange-200 opacity-40 group-hover:opacity-100">
            Baralho
          </span>
          <span className="text-2xl font-bold text-orange-200 opacity-40 group-hover:opacity-100">
            {selected?.deckCount ?? 0}
          </span>
        </div>
      </div>
    </div>
  );
};
