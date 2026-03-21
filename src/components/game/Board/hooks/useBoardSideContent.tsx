import type { BoardSideProps } from "../../../../core/domain/GameBoard";
import { useBattleStore } from "../../../../store/BattleStore";
import { getBoardSideAttributes } from "../../../../utils/boardUtils";
import { useBattleEventStore } from "../../../../store/BattleEventStore";
import { useHandStore } from "../../../../store/HandStore";
import { useBoardNavigation } from "./useBoardNavigation";
import { BattleEvent } from "../../../../core/domain/BattleStore";

export const useBoardSideContent = ({
    isOpponent
}: BoardSideProps) => {
    const { event } = useBattleStore();
    const { selectedFieldIndex, selectedFieldArea } = useBattleEventStore();
    const { focusArea } = useHandStore();

    useBoardNavigation({ isOpponent });

    const attributes = getBoardSideAttributes(event, isOpponent);
    const rawField = useBattleStore((state) =>
        isOpponent ? state.opponent?.field : state.player?.field
    ) || [];
    const rawFieldSpells = useBattleStore((state) =>
        isOpponent ? state.opponent?.spells : state.player?.spells
    ) || [];

    const normalizedField = Array.from({ length: 5 }, (_, i) => rawField[i] ?? null);
    const normalizedFieldSpells = Array.from({ length: 5 }, (_, i) => rawFieldSpells[i] ?? null);

    const isSelectingTarget = event === BattleEvent.SELECTING_TARGET;
    const boardKeyboardFocused = !isOpponent && focusArea === "board" && !isSelectingTarget;
    const effectiveAttributes = {
        ...attributes,
        isFocused: attributes.isFocused || boardKeyboardFocused,
    };

    return {
        event,
        attributes: effectiveAttributes,
        normalizedField,
        normalizedFieldSpells,
        selectedFieldIndex,
        selectedFieldArea,
    }
}
