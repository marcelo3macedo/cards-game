import { useEffect, useState, useRef } from 'react';
import { useBattleStore } from '../../../store/BattleStore';
import { useHandStore } from '../../../store/HandStore';
import type { MonsterCard } from '../../../core/domain/Card';
import { mapHand, mapServerCardToEntity } from '../../../utils/cardUtils';
import type { FieldSlot } from '../index copy';
import { battleService } from '../../../services/battleService';

export const useBattleActions = () => {
  const { player, opponent, currentTurnOwner, clearBattle } = useBattleStore();
  const { cards, setCards, setVisible: setHandVisible, addCard, removeCard } = useHandStore();

  // Estados de Controle de Batalha e Campo
  const [attackerIndex, setAttackerIndex] = useState<number | null>(null);
  const [isSelectingTarget, setIsSelectingTarget] = useState(false);
  const [battleData, setBattleData] = useState<{ attacker: MonsterCard; defender?: MonsterCard } | null>(null);
  const [selectedCard, setSelectedCard] = useState<MonsterCard | null>(null);
  const [isSelectingZone, setIsSelectingZone] = useState(false);
  const [focusedZoneIndex, setFocusedZoneIndex] = useState(0);
  const [drawingCard, setDrawingCard] = useState<MonsterCard | null>(null);
  const [pendingSummon, setPendingSummon] = useState<{ index: number } | null>(null);

  const [monsterZones, setMonsterZones] = useState<FieldSlot[]>(Array(5).fill(null).map(() => ({ card: null, mode: "atk" })));
  const [opponentZones, setOpponentZones] = useState<FieldSlot[]>(Array(5).fill(null).map(() => ({ card: null, mode: "atk" })));

  // Trava para evitar execuções duplicadas do efeito de compra
  const isDistributing = useRef(false);

  // 1. Sincronização da Mão (Efeito de pegar cartas uma por vez)
  /*useEffect(() => {
    if (!player?.hand || isDistributing.current) return;

    const serverEntities = mapHand(player.hand);
    const serverIds = new Set(serverEntities.map(c => c.id));
    const localIds = new Set(cards.map(c => c.id));

    // Remove o que não existe mais no servidor
    const toRemove = cards.filter(c => !serverIds.has(c.id));
    toRemove.forEach(c => removeCard(c.id));

    // Filtra apenas as que são realmente novas
    const newCards = serverEntities.filter(c => !localIds.has(c.id));

    if (newCards.length > 0) {
      isDistributing.current = true;

      const distribute = async () => {
        for (const card of newCards) {
          // Verifica se já não foi adicionada por outro processo
          addCard(card);
          await new Promise(resolve => setTimeout(resolve, 600));
        }
        isDistributing.current = false;
      };

      distribute();
    }
  }, [player?.hand]);*/

  // 2. Funções de Ação
  const handleDrawCard = async () => {
    // Substitua pela sua chamada real de API
    const newState = await drawCard();
    if (newState) {
      const hand = newState.player.hand;
      const lastCard = mapHand([hand[hand.length - 1]])[0];
      setDrawingCard(lastCard);
    }
  };

  const finalizeDraw = () => {
    if (drawingCard) {
      addCard(drawingCard);
      setDrawingCard(null);
    }
  };

  const handleZoneClick = (index: number) => {
    if (!selectedCard || monsterZones[index].card) return;
    setPendingSummon({ index });
  };

  const handleInitiateAttack = (index: number) => {
    setAttackerIndex(index);
    setIsSelectingTarget(true);
  };

  const handleSelectTarget = async (targetIndex?: number) => {
    if (attackerIndex === null) return;
    // Lógica de ataque...
    setIsSelectingTarget(false);
  };

  const handleChangeMode = async (index: number) => {
    // Lógica de mudar posição (ATK/DEF)
  };

  const handleHandSelect = (card: MonsterCard) => {
    setSelectedCard(card);
    setIsSelectingZone(true);
    setHandVisible(false);
  };

  const executeSummon = async (mode: string) => {
    if (!selectedCard || pendingSummon === null) return;

    const updatedZones = [...monsterZones];
    updatedZones[pendingSummon.index] = {
      card: selectedCard,
      mode: mode.includes("def") ? "def" : "atk",
    };

    try {
      const handIndex = player?.hand.findIndex(c => Number(c.id) === Number(selectedCard.id));
      if (handIndex === -1) return;

      const position = mode.includes("def") ? "defense" : "attack"
      const response = await battleService.summonCard(handIndex, position);

      useBattleStore.getState().setBattle(response.state);
      setMonsterZones(updatedZones);
      useHandStore.getState().removeCard(selectedCard.id);

      setSelectedCard(null);
      setIsSelectingZone(false);
      setPendingSummon(null);

    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleBattleComplete = (result: string) => {
    setBattleData(null);
    setAttackerIndex(null);
  };

  const handleEndTurn = async () => {
    try {
      const response = await battleService.endTurn();

      await processOpponentActions(response.actions);

      useBattleStore.getState().setBattle(response.state);

      const newPlayerZones = syncField(response.state.player.field);
      const newOpponentZones = syncField(response.state.opponent.field);

      setMonsterZones(newPlayerZones);
      setOpponentZones(newOpponentZones);

      console.log("Ações do Oponente:", response.logs);
    } catch (error: any) {
      console.error("Erro ao encerrar turno:", error.message);
    }
  };

  const processOpponentActions = async (actions: any[]) => {
    for (const action of actions) {
      switch (action.type) {
        case 'summon':
          console.log(`Oponente invocou: ${action.data.monster.name}`);
          break;

        case 'attack':
          const { attacker, target } = action.data;
          if (!target) {
            console.log(`${attacker?.name || "Monstro"} atacou diretamente!`);
            setBattleData({
              attacker: mapServerCardToEntity(attacker),
              defender: null
            });
          } else {
            console.log(`${attacker.name} atacou ${target.name}`);
            setBattleData({
              attacker: mapServerCardToEntity(attacker),
              defender: mapServerCardToEntity(target)
            });
          }
          break;

        default:
          console.log("Ação desconhecida:", action.type);
      }

      await new Promise(resolve => setTimeout(resolve, 1500));

      setBattleData(null);
    }
  };

  const syncField = (serverField: any[]) => {
    const slots: FieldSlot[] = Array(5).fill(null).map(() => ({ card: null, mode: "atk" }));

    serverField.forEach((slot: any, i: number) => {
      const index = typeof slot.position === 'number' ? slot.position : i;

      const mode = (slot.position === "defense" || slot.mode === "def") ? "def" : "atk";

      if (index >= 0 && index < 5) {
        slots[index] = {
          card: mapServerCardToEntity(slot.card),
          mode: mode
        };
      }
    });

    return slots;
  };

  return {
    // Estados para o GameBoard
    monsterZones,
    opponentZones,
    battleData,
    isSelectingZone,
    isSelectingTarget,
    pendingSummon,
    focusedZoneIndex,
    drawingCard,
    currentTurnOwner,
    selectedCard,

    // Funções para o GameBoard
    handleZoneClick,
    handleInitiateAttack,
    handleSelectTarget,
    handleChangeMode,
    handleDrawCard,
    handleEndTurn,

    // Funções para o PlayerHand / Controle
    handleHandSelect,
    finalizeDraw,
    setSelectedCard,
    setIsSelectingZone,
    clearBattle,
    executeSummon,
    setPendingSummon,
    handleBattleComplete
  };
};
