import type { BoardGutterProps } from "../../../../core/domain/GameBoard";

export const BoardGutter = ({ side, onDraw, deckCount = 40 }: BoardGutterProps) => {
  if (side === "left") {
    return (
      <div className="flex flex-col gap-32 items-center opacity-30">
        <div
          className="w-24 h-32 border-2 border-zinc-800 bg-zinc-900/50 rounded-lg shadow-inner"
          title="Field Zone"
        ></div>
        <div
          className="w-24 h-32 border-2 border-blue-900/20 bg-zinc-900/50 rounded-lg"
          title="Extra Deck"
        ></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="flex flex-col gap-3 opacity-40 scale-90 mb-12">
        <div
          className="w-24 h-32 bg-zinc-800 border-2 border-zinc-700 rounded-lg shadow-inner"
          title="Opponent GY"
        ></div>
        <div
          className="w-24 h-32 bg-orange-950 border-2 border-orange-900 rounded-lg"
          title="Opponent Deck"
        ></div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="w-24 h-32 bg-zinc-800/40 border-2 border-zinc-700 rounded-lg relative flex items-center justify-center">
          <span className="text-[10px] font-bold text-zinc-600">GY</span>
        </div>
        <div
          onClick={onDraw}
          className="w-24 h-32 bg-orange-900 border-2 border-orange-700 rounded-lg shadow-[0_6px_0_#431407] hover:translate-y-1 active:translate-y-1.5 transition-all cursor-pointer flex items-center justify-center group"
        >
          <span className="text-2xl font-bold text-orange-200 opacity-40 group-hover:opacity-100">
            {deckCount}
          </span>
        </div>
      </div>
    </div>
  );
};
