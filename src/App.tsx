import WelcomeScenario from "./scenarios/Welcome";
import IntroScenario from "./scenarios/Intro";
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
import { useBackgroundMusic } from "./hooks/useBackgroundMusic";
import { MusicControl } from "./components/MusicControl";

function App() {
  const {
    currentScenario,
    navigateTo,
    handleStartGame,
  } = useNavigation();

  const { volume, setVolume } = useBackgroundMusic(currentScenario);

  const scenarios: Record<ScenarioType, React.ReactNode> = {
    WELCOME: <WelcomeScenario onStart={handleStartGame} />,
    INTRO: <IntroScenario onFinish={() => navigateTo("PROFILE")} />,
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
      {currentScenario !== "BATTLE" && (
        <MusicControl volume={volume} setVolume={setVolume} />
      )}
    </div>
  );
}

export default App;
