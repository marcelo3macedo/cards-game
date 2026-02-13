import { useState } from "react";
import { withContextLogging } from "../../../../utils/loggingUtils"
import { useBattleStore } from "../../../../store/BattleStore";
import { useBattleEventStore } from "../../../../store/BattleEventStore";
import { BattleEvent } from "../../../../core/domain/BattleStore";
import { useBattleEvents } from "../../../../scenarios/Battle/hooks/useBattleEvents";

export const useFieldZone = ({ card }: any) => {
    const { event, setEvent } = useBattleStore();
    const { setSelectedFieldIndex, setSelectedTargetIndex, selectedAttackerIndex } = useBattleEventStore();
    const { handleAttack } = useBattleEvents({});
    const log = withContextLogging('useFieldZone');

    const [showMenu, setShowMenu] = useState(false);
    const isFaceDown = card?.mode === "face-down";

    const onClick = async (index: number) => {
        if (event === BattleEvent.SELECTING_TARGET) {
            setSelectedTargetIndex(index);

            await handleAttack({
                attackerIdx: selectedAttackerIndex,
                targetIdx: index
            });

            setEvent(BattleEvent.INITIAL);
            return;
        }

        setShowMenu(!showMenu);
        setEvent(BattleEvent.SELECTING_MODE);
        setSelectedFieldIndex(index);
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
