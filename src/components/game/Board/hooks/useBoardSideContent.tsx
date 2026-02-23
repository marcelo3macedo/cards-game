import type { BoardSideProps } from "../../../../core/domain/GameBoard";
import { useBattleStore } from "../../../../store/BattleStore";
import { getBoardSideAttributes } from "../../../../utils/boardUtils";
import { useBattleEventStore } from "../../../../store/BattleEventStore";

export const useBoardSideContent = ({
    isOpponent
}: BoardSideProps) => {
    const { event } = useBattleStore();
    const { selectedFieldIndex, selectedFieldArea } = useBattleEventStore();

    const attributes = getBoardSideAttributes(event, isOpponent);
    const rawField = useBattleStore((state) =>
        isOpponent ? state.opponent?.field : state.player?.field
    ) || [];
    const rawFieldSpells = useBattleStore((state) =>
        isOpponent ? state.opponent?.spells : state.player?.spells
    ) || [];

    const normalizedField = Array.from({ length: 5 }, (_, i) => rawField[i] ?? null);
    const normalizedFieldSpells = Array.from({ length: 5 }, (_, i) => rawFieldSpells[i] ?? null);

    return {
        event,
        attributes,
        normalizedField,
        normalizedFieldSpells,
        selectedFieldIndex,
        selectedFieldArea,
    }
}
