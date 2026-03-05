import WelcomeScenario from "./scenarios/Welcome";
import MatchmakingScenario from "./scenarios/Matchmaking";
import BattleScenario from "./scenarios/Battle";
import ProfileScenario from "./scenarios/Profile";
import MainMenuScenario from "./scenarios/MainMenu";
import DeckManagerScenario from "./scenarios/DeckManager";
import StoreScenario from "./scenarios/Store";
import { BattleResultScenario } from "./scenarios/Result";
import { RewardsScenario } from "./scenarios/Result/Rewards";
import TutorialScenario from "./scenarios/Help";
import { useNavigation, type ScenarioType } from "./hooks/useNavigation";

function App() {
  const {
    currentScenario,
    navigateTo,
    handleStartGame,
  } = useNavigation();

  const scenarios: Record<ScenarioType, React.ReactNode> = {
    WELCOME: <WelcomeScenario onStart={handleStartGame} />,
    PROFILE: <ProfileScenario onConfirm={() => navigateTo("MAINMENU")} />,
    MAINMENU: (
      <MainMenuScenario
        onViewDeck={() => navigateTo("DECKMANAGER")}
        onSelectOpponent={() => navigateTo("MATCHMAKING")}
        onViewTips={() => navigateTo("TUTORIAL")}
        onViewStore={() => navigateTo("STORE")}
      />
    ),
    MATCHMAKING: (
      <MatchmakingScenario
        onBack={() => navigateTo("MAINMENU")}
        onBattleStarted={() => navigateTo("BATTLE")}
      />
    ),
    BATTLE: <BattleScenario
              onBack={() => navigateTo("MAINMENU")}
              onEnd={() => navigateTo("BATTLE_RESULT")} />,
    BATTLE_RESULT:
      <BattleResultScenario
        onSeeRewards={() => navigateTo("REWARDS")}
        onGoMenu={() => navigateTo("MAINMENU")}
      />,
    REWARDS: (
      <RewardsScenario
        onBack={() => navigateTo("MAINMENU")}
      />
    ),
    STORE: (
      <StoreScenario
        onBack={() => navigateTo("MAINMENU")}
        onPackageOpened={() => navigateTo("REWARDS")}
      />
    ),
    DECKMANAGER: <DeckManagerScenario onBack={() => navigateTo("MAINMENU")} onOpenPackage={() => navigateTo("REWARDS")} />,
    TUTORIAL: <TutorialScenario onBack={() => navigateTo("MAINMENU")} />,
  };

  return (
    <div className="game-container">
      {scenarios[currentScenario] || scenarios.WELCOME}
    </div>
  );
}

export default App;
