import { BattleEvent, type BoardSideAttributes } from "../core/domain/BattleStore";

export function getBoardSideAttributes(event:string | null, isOpponent: boolean | undefined) : BoardSideAttributes {
    if (event === BattleEvent.INITIAL) {
        return {
            isInteractable: false,
            isSelected: false,
            isFocused: false,
        }
    }

    if (event === BattleEvent.SELECTING_POSITION) {
        return {
            isInteractable: !isOpponent ? true : false,
            isSelected: false,
            isFocused: true,
        }
    }

    return {
        isInteractable: false,
        isSelected: false,
        isFocused: false,
    }
}
