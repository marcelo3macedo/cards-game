import { useState } from "react";
import { withContextLogging } from "../../../../utils/loggingUtils"
import { useBattleStore } from "../../../../store/BattleStore";
import { useBattleEventStore } from "../../../../store/BattleEventStore";
import { BattleEvent } from "../../../../core/domain/BattleStore";

export const useFieldZone = ({ card }: any) => {
    const { setEvent } = useBattleStore();
    const { setSelectedFieldIndex } = useBattleEventStore();
    const log = withContextLogging('useFieldZone');

    const [showMenu, setShowMenu] = useState(false);
    const isFaceDown = card?.mode === "face-down";

    const onClick = () => {
        setEvent(BattleEvent.SELECTING_MODE);
        setSelectedFieldIndex(0);
    }

    const onFocusCard = (index: number) => {
        setSelectedFieldIndex(index);
    }

    return {
        showMenu,
        setShowMenu,
        isFaceDown,
        onClick: log(onClick),
        onFocusCard: log(onFocusCard),
    }
}
