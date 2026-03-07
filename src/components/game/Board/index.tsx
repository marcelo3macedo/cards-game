import { ActiveFieldIndicator } from "./ActiveFieldIndicator";
import { useGameBoard } from "./hooks/useGameBoard";
import { BoardGutter } from "./types/BoardGutter";
import { BoardSide } from "./types/BoardSide";

export function GameBoard() {
  const { activeField, isSelectingTarget, isBlur, onDraw, onSelectTarget } = useGameBoard();

  return (
    <div
      className={`grid grid-cols-[36px_1fr_36px] sm:grid-cols-[120px_1fr_120px] gap-1 sm:gap-8 items-center w-full max-w-7xl px-0 sm:px-10 transition-all duration-500 ${isBlur ? "blur-xl scale-95 opacity-40" : ""}`}
    >
      <ActiveFieldIndicator field={activeField} />

      <BoardGutter type="opponent" onDraw={onDraw} />

      <div className="flex flex-col gap-10">
        <div
          className={`transition-all duration-300 rounded-xl ${isSelectingTarget ? "ring-4 ring-red-500/20 p-4 bg-red-500/5" : "grayscale-[0.3]"}`}
          onClick={() => isSelectingTarget && onSelectTarget(undefined)}
        >
          <BoardSide isOpponent={true} />
        </div>

        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]" />

        <BoardSide />
      </div>

      <BoardGutter type="player" onDraw={onDraw} />
    </div>
  );
}
