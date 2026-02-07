import { useEffect, useState, useRef } from 'react';
import { useBattleStore } from '../../../store/BattleStore';
import { useHandStore } from '../../../store/HandStore';
import type { MonsterCard } from '../../../core/domain/Card';
import { mapHand } from '../../../utils/cardUtils';
import type { FieldSlot } from '../index copy';

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
  useEffect(() => {
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
  }, [player?.hand]);

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

  const executeSummon = (mode: string) => {
    if (!selectedCard || pendingSummon === null) return;

    const updatedZones = [...monsterZones];
    updatedZones[pendingSummon.index] = {
      card: selectedCard,
      mode: mode.includes("def") ? "def" : "atk",
    };

    setMonsterZones(updatedZones);
    useHandStore.getState().removeCard(selectedCard.id);

    setSelectedCard(null);
    setIsSelectingZone(false);
    setHandVisible(false);
  };

  const handleBattleComplete = (result: string) => {
    setBattleData(null);
    setAttackerIndex(null);
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
