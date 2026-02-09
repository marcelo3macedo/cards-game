import type { ExtendedGameBoardProps } from "../../../core/domain/GameBoard";
import { BoardGutter } from "./types/BoardGutter";
import { BoardSide } from "./types/BoardSide";

export function GameBoard(props: ExtendedGameBoardProps) {
  const { isBlur, isSelectingTarget, onSelectTarget } = props;

  return (
    <div
      className={`grid grid-cols-[120px_1fr_120px] gap-8 items-center w-full max-w-7xl px-10 transition-all duration-500 ${isBlur ? "blur-xl scale-95 opacity-40" : ""}`}
    >
      <BoardGutter type="opponent" onDraw={props.onDraw} />

      <div className="flex flex-col gap-10">
        <div
          className={`transition-all duration-300 rounded-xl ${isSelectingTarget ? "ring-4 ring-red-500/20 p-4 bg-red-500/5" : "grayscale-[0.3]"}`}
          onClick={() => isSelectingTarget && onSelectTarget(undefined)}
        >
          <BoardSide
            isOpponent
            zones={props.opponentZones}
            isSelectingTarget={isSelectingTarget}
            onSelectTarget={onSelectTarget}
          />
        </div>

        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]" />

        <BoardSide
          zones={props.monsterZones}
          isSelecting={props.isSelecting}
          highlightedIndex={props.highlightedIndex}
          focusedZoneIndex={props.focusedZoneIndex}
          onZoneSelect={props.onZoneSelect}
          onInitiateAttack={props.onInitiateAttack}
          onChangeMode={props.onChangeMode}
        />
      </div>

      <BoardGutter type="player" onDraw={props.onDraw} />
    </div>
  );
}
