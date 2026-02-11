import type { BoardSideProps } from "../../../../core/domain/GameBoard";
import { useBattleStore } from "../../../../store/BattleStore";
import { getBoardSideAttributes } from "../../../../utils/boardUtils";
import { useBattleEventStore } from "../../../../store/BattleEventStore";

export const useBoardSideContent = ({
    isOpponent
}: BoardSideProps) => {
    const { event } = useBattleStore();
    const { selectedFieldIndex } = useBattleEventStore();

    const attributes = getBoardSideAttributes(event, isOpponent);
    const rawField = useBattleStore((state) =>
        isOpponent ? state.opponent?.field : state.player?.field
    ) || [];

    const normalizedField = Array.from({ length: 5 }, (_, i) => rawField[i] ?? null);

    return {
        attributes,
        normalizedField,
        selectedFieldIndex,
    }
}
