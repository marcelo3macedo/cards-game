import { useEffect, useState } from "react";
import { PlayerHand } from "../../components/game/Hand";
import { MonsterCard } from "../../core/domain/Card";
import { GameBoard } from "../../components/game/Board";
import exemplo_legendaria from "@/assets/images/exemplo_legendaria.jpg";
import { SummonOverlay } from "../../components/game/SummorOverlay";
import { LifePoints } from "../../components/game/LifePoints";
import { PlayerHandContainer } from "../../components/game/Hand/container";
import { useHandStore } from "../../store/HandStore";
import { DrawCard } from "../../components/game/Hand/DrawCard";
import { BattleAnimationOverlay } from "../../components/game/Battle/BattleAnimationOverlay";

export interface FieldSlot {
  card: MonsterCard | null;
  mode: "atk" | "def" | "face-down";
}

export default function BattleScenario() {
  const [attackerIndex, setAttackerIndex] = useState<number | null>(null);
  const [isSelectingTarget, setIsSelectingTarget] = useState(false);
  const [battleData, setBattleData] = useState<{
    attacker: MonsterCard;
    defender?: MonsterCard;
  } | null>(null);
  const { setCards, setVisible: setHandVisible, addCard } = useHandStore();
  const [selectedCard, setSelectedCard] = useState<MonsterCard | null>(null);
  const [isSelectingZone, setIsSelectingZone] = useState(false);
  const [focusedZoneIndex, setFocusedZoneIndex] = useState(0);
  const [drawingCard, setDrawingCard] = useState<MonsterCard | null>(null);
  const [pendingSummon, setPendingSummon] = useState<{ index: number; mode?: string } | null>(null);
  const [monsterZones, setMonsterZones] = useState<FieldSlot[]>(
    Array(5)
      .fill(null)
      .map(() => ({ card: null, mode: "atk" })),
  );
  const [opponentZones, setOpponentZones] = useState<FieldSlot[]>(
    Array(5)
      .fill(null)
      .map((_, i) => ({
        card:
          i === 2
            ? new MonsterCard(
                "opp-1",
                "Dragão Negro",
                "...",
                exemplo_legendaria,
                "dark",
                2400,
                2000,
                7,
                "RARO",
              )
            : null,
        mode: "atk",
      })),
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCard(null);
        setIsSelectingZone(false);
        setPendingSummon(null);
      }

      if (isSelectingZone && !pendingSummon) {
        switch (e.key) {
          case "ArrowLeft":
            setFocusedZoneIndex((prev) => (prev > 0 ? prev - 1 : monsterZones.length - 1));
            break;
          case "ArrowRight":
            setFocusedZoneIndex((prev) => (prev < monsterZones.length - 1 ? prev + 1 : 0));
            break;
          case "Enter":
            handleZoneClick(focusedZoneIndex);
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSelectingZone, pendingSummon, monsterZones, focusedZoneIndex]);

  useEffect(() => {
    setCards([
      new MonsterCard(
        "1",
        "Patrulheiro Gárgula de Gelo",
        "Emmissão de sombras geladas...",
        exemplo_legendaria,
        "ice",
        2500,
        2100,
        7,
        "LEGENDARIO",
      ),
      new MonsterCard(
        "2",
        "Patrulheiro Gárgula de Gelo",
        "Emmissão de sombras geladas...",
        exemplo_legendaria,
        "ice",
        2500,
        2100,
        7,
        "LEGENDARIO",
      ),
      new MonsterCard(
        "3",
        "Patrulheiro Gárgula de Gelo",
        "Emmissão de sombras geladas...",
        exemplo_legendaria,
        "ice",
        2500,
        2100,
        7,
        "LEGENDARIO",
      ),
    ]);
  }, []);

  const handleDrawCard = () => {
    const newCard = new MonsterCard(
      "1",
      "Patrulheiro Gárgula de Gelo",
      "Emmissão de sombras geladas...",
      exemplo_legendaria,
      "ice",
      2500,
      2100,
      7,
      "LEGENDARIO",
    );
    setDrawingCard(newCard);
  };

  const handleInitiateAttack = (index: number) => {
    setAttackerIndex(index);
    setIsSelectingTarget(true);
  };

  const handleSelectTarget = (targetIndex?: number) => {
    if (attackerIndex === null) return;

    const attackerCard = monsterZones[attackerIndex].card!;
    const defenderSlot = targetIndex !== undefined ? opponentZones[targetIndex] : null;

    setBattleData({
      attacker: attackerCard,
      defender: defenderSlot?.card ? defenderSlot.card : undefined, // Se não houver carta no slot, é direto
    });

    setIsSelectingTarget(false);
  };

  const handleBattleComplete = (result: string) => {
    console.log("Resultado da Batalha:", result);
    // TODO: Aqui você chamaria a store de LifePoints para subtrair o dano
    setBattleData(null);
    setAttackerIndex(null);
  };

  const handleChangeMode = (index: number) => {
    const updated = [...monsterZones];
    const currentMode = updated[index].mode;

    if (currentMode === "face-down") {
      updated[index].mode = "atk"; // Flip summon
    } else {
      updated[index].mode = currentMode === "atk" ? "def" : "atk";
    }
    setMonsterZones(updated);
  };

  const finalizeDraw = () => {
    if (drawingCard) {
      addCard(drawingCard);
      setDrawingCard(null);
    }
  };

  const handleHandSelect = (card: MonsterCard) => {
    setSelectedCard(card);
    setIsSelectingZone(true);
    setHandVisible(false); // Esconde a mão pela store
  };

  const handleZoneClick = (index: number) => {
    // Só permite clicar se houver uma carta selecionada e a zona estiver vazia
    if (!selectedCard || monsterZones[index].card) return;
    setPendingSummon({ index });
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

  return (
    <div className="h-screen w-screen bg-zinc-950 flex flex-col items-center justify-center overflow-hidden text-white font-sans select-none relative bg-[radial-gradient(circle_at_center,_#1a1a2e_0%,#09090b_100%)]">
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('/grid-pattern.svg')] bg-center [mask-image:radial-gradient(white,transparent)]"></div>

      <div className="absolute right-10 top-5 flex flex-col gap-2">
        <LifePoints target="opponent" color="red" align="right" />
        <div className="flex gap-2 justify-end">
          <span className="bg-zinc-800/80 px-2 py-1 rounded text-[10px] text-zinc-400 border border-white/5">
            DECK: 40
          </span>
          <span className="bg-zinc-800/80 px-2 py-1 rounded text-[10px] text-zinc-400 border border-white/5">
            HAND: 5
          </span>
        </div>
      </div>

      <GameBoard
        monsterZones={monsterZones}
        opponentZones={opponentZones}
        isBlur={!!battleData} // Desfoca o fundo durante a animação de batalha
        isSelecting={isSelectingZone}
        isSelectingTarget={isSelectingTarget}
        onZoneSelect={handleZoneClick}
        onInitiateAttack={handleInitiateAttack}
        onSelectTarget={handleSelectTarget}
        onChangeMode={handleChangeMode}
        highlightedIndex={pendingSummon?.index}
        focusedZoneIndex={focusedZoneIndex}
        onDraw={handleDrawCard}
      />

      {battleData && (
        <BattleAnimationOverlay
          attacker={battleData.attacker}
          defender={battleData.defender}
          onAnimationEnd={handleBattleComplete}
        />
      )}

      {isSelectingTarget && (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 bg-red-600/90 text-white px-10 py-4 rounded-full animate-bounce shadow-[0_0_30px_rgba(220,38,38,0.5)] z-50 border-2 border-white/20 font-black italic">
          SELECIONE O ALVO PARA ATACAR
        </div>
      )}

      <PlayerHandContainer onSelectCard={handleHandSelect} />

      {pendingSummon !== null && selectedCard && (
        <SummonOverlay
          card={selectedCard}
          onSummon={executeSummon}
          onCancel={() => setPendingSummon(null)}
        />
      )}

      <DrawCard card={drawingCard} onComplete={finalizeDraw} />

      {isSelectingZone && !pendingSummon && (
        <div className="absolute bottom-40 left-1/2 -translate-x-1/2 bg-blue-600/90 text-white px-8 py-3 rounded-full animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.5)] z-50 border border-blue-400">
          Escolha um local no campo para invocar ou pressione{" "}
          <span className="font-bold bg-black/30 px-2 py-0.5 rounded">ESC</span>
        </div>
      )}

      <div className="absolute left-10 top-1/2 -translate-y-1/2">
        <LifePoints target="player" color="blue" align="left" />
      </div>
    </div>
  );
}
