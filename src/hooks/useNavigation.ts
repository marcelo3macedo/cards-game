import { useCallback, useState } from "react";
import { MonsterCard } from "../core/domain/Card";
import exemplo_legendaria from "@/assets/images/exemplo_legendaria.jpg";
import { authService } from "../services/authService";

export type ScenarioType =
  | "WELCOME" | "MATCHMAKING" | "BATTLE" | "BATTLE_RESULT"
  | "REWARDS" | "PROFILE" | "MAINMENU" | "DECKMANAGER" | "TUTORIAL";

interface BattleOutcome {
  status: "victory" | "defeat";
  opponentName: string;
  opponentImage: string;
  opponentMessage: string;
  rating: number;
}

export const useNavigation = () => {
  const [currentScenario, setCurrentScenario] = useState<ScenarioType>("MAINMENU");
  const [lastBattleOutcome, setLastBattleOutcome] = useState<BattleOutcome | null>({
    status: "victory",
    opponentName: "Gárgula de Gelo",
    opponentImage: exemplo_legendaria,
    opponentMessage: "Seu baralho de fogo foi mais quente que meu gelo eterno... desta vez.",
    rating: 4,
  });

  const [mockedRewards] = useState<MonsterCard[]>([
    new MonsterCard("reward-1", "Dragão de Cristal", "Um dragão reluzente...", exemplo_legendaria, "light", 2800, 2400, 8, "LENDARIO"),
    new MonsterCard("reward-2", "Guerreiro de Elite", "Especialista em combate...", exemplo_legendaria, "earth", 1900, 1200, 4, "RARO"),
  ]);

  const navigateTo = (scenario: ScenarioType) => setCurrentScenario(scenario);

  const checkUserStatus = useCallback(() => {
    if (authService.isAuthenticated()) {
      navigateTo("MAINMENU");
    } else {
      navigateTo("PROFILE");
    }
  }, [navigateTo]);

  const handleStartGame = () => {
    checkUserStatus();
  };

  const handleBattleEnd = (outcome: BattleOutcome) => {
    setLastBattleOutcome(outcome);
    navigateTo("BATTLE_RESULT");
  };

  return {
    currentScenario,
    lastBattleOutcome,
    mockedRewards,
    navigateTo,
    handleStartGame,
    handleBattleEnd
  };
};
