import { useCallback, useState } from "react";
import { authService } from "../services/authService";

export type ScenarioType =
  | "WELCOME" | "MATCHMAKING" | "BATTLE" | "BATTLE_RESULT"
  | "REWARDS" | "PROFILE" | "MAINMENU" | "DECKMANAGER" | "TUTORIAL";

export const useNavigation = () => {
  const [currentScenario, setCurrentScenario] = useState<ScenarioType>("BATTLE");
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

  const handleBattleEnd = () => {
    navigateTo("BATTLE_RESULT");
  };

  return {
    currentScenario,
    navigateTo,
    handleStartGame,
    handleBattleEnd
  };
};
