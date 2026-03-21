import { useState } from "react";
import { withContextLogging } from "../../../../utils/loggingUtils"
import { useBattleStore } from "../../../../store/BattleStore";
import { useBattleEventStore } from "../../../../store/BattleEventStore";
import { useHandStore } from "../../../../store/HandStore";
import { BattleEvent } from "../../../../core/domain/BattleStore";
import { battleService } from "../../../../services/battleService";
import { mapServerCardToEntity } from "../../../../utils/cardUtils";

export const useFieldZone = ({ index, position, isMonster, isInteractable, isOpponent }: any) => {
    const { event, setEvent, player, opponent } = useBattleStore();
    const { setSelectedFieldIndex, setSelectedTargetIndex, setSelectedFieldArea, selectedAttackerIndex, setBattleData, setSelectedCard, selectedFieldIndex, selectedCard } = useBattleEventStore();
    const { setFocusArea } = useHandStore();
    const log = withContextLogging('useFieldZone');

    const handleAttack = async ({ attackerIdx, targetIdx }: any) => {
        try {
            setEvent(BattleEvent.INITIAL);
            const response = await battleService.attack(attackerIdx, targetIdx);
            setBattleData({
                attacker: mapServerCardToEntity(player?.field[attackerIdx]?.card),
                defender: mapServerCardToEntity(opponent?.field[targetIdx]?.card),
                position: opponent?.field[targetIdx]?.position
            });
            await new Promise(resolve => setTimeout(resolve, 5000));
            useBattleStore.getState().setPlayer(response.state.player);
            useBattleStore.getState().setOpponent(response.state.opponent);
        } catch (error: any) {
            console.error("Erro ao realizar ataque:", error.message);
        }
    };

    const [showMenu, setShowMenuState] = useState(false);
    const isFaceDown = (position === "face-down-attack" || position === "face-down-defense");

    const fieldCard = !isOpponent ? player?.field?.[index]?.card : null;
    const isKeyboardMenuOpen =
      !isOpponent &&
      event === BattleEvent.SELECTING_MODE &&
      !selectedCard &&
      selectedFieldIndex === index &&
      !!fieldCard;

    const setShowMenu = (val: boolean) => {
      setShowMenuState(val);
      if (!val) {
        const currentEvent = useBattleStore.getState().event;
        const currentSelectedCard = useBattleEventStore.getState().selectedCard;
        if (currentEvent === BattleEvent.SELECTING_MODE && !currentSelectedCard) {
          setEvent(BattleEvent.INITIAL);
          setFocusArea("board");
        }
      }
    };

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

        if (event === BattleEvent.EQUIP_TARGETING) {
            try {
                const { selectedCard } = useBattleEventStore.getState();
                const monsterCard = player?.field[index]?.card;

                const newState = await battleService.confirmSelection(index);

                const magicEntity = mapServerCardToEntity(selectedCard);
                const monsterEntity = mapServerCardToEntity(monsterCard);

                if (magicEntity && monsterEntity) {
                    const { setEquipAnimData, setPendingBattleState } = useHandStore.getState();
                    const newMosterCard = newState.player?.field[index]?.card;
                    setPendingBattleState(newState);
                    setEquipAnimData({ magicCard: magicEntity, monsterCard: monsterEntity, newMosterCard });
                } else {
                    useBattleStore.getState().setBattle(newState);
                    setEvent(BattleEvent.EQUIP_TARGETING);
                }
                setSelectedCard(null);
                useBattleEventStore.getState().setEquipTargetInfo(null);
            } catch (error: any) {
                console.error("Erro ao equipar:", error.message);
                setEvent(BattleEvent.INITIAL);
            }
            return;
        }

        const isMenuCurrentlyOpen = showMenu || isKeyboardMenuOpen;
        if (isMenuCurrentlyOpen) {
          setShowMenu(false); // closes + resets event via wrapper
        } else {
          setShowMenuState(true);
          setEvent(BattleEvent.SELECTING_MODE);
          setSelectedFieldIndex(index);
        }
    }

    const onFocusCard = (index: number) => {
        if (!isInteractable) return;

        const area = isMonster ? "MONSTER" : "MAGIC";
        setSelectedFieldIndex(index);
        setSelectedFieldArea(area);
    }

    return {
        showMenu: showMenu || isKeyboardMenuOpen,
        setShowMenu,
        isFaceDown,
        onClick: log(onClick),
        onFocusCard: log(onFocusCard),
    }
}
