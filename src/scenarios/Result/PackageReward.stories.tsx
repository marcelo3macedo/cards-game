import type { Meta, StoryObj } from "@storybook/react";
import { useEffect } from "react";
import { BattleResultScenario } from ".";
import { RewardsScenario } from "./Rewards";
import { useBattleStore } from "../../store/BattleStore";
import { useNavigationStore } from "../../store/NavigationStore";

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const MOCK_CARDS_DATA = [
  {
    id: 101,
    cardId: 5,
    card: {
      id: 5,
      name: "Dragão das Chamas",
      description: "Um dragão ancestral que domina as chamas eternas do submundo.",
      imageUrl: "images/exemplo_monstro_raro.jpg",
      attribute: "monster",
      element: "fire",
      type: "Dragão",
      monsterRarity: "RARO",
      stars: 7,
      attackPower: 2400,
      defensePower: 1400,
      modifiers: [],
    },
  },
  {
    id: 102,
    cardId: 12,
    card: {
      id: 12,
      name: "Íbis Mensageiro",
      description: "Mensageiro veloz dos deuses, guarda dos portais sagrados.",
      imageUrl: "images/exemplo_monstro_raro.jpg",
      attribute: "monster",
      element: "wind",
      type: "Íbis",
      monsterRarity: "COMUM",
      stars: 4,
      attackPower: 1700,
      defensePower: 1900,
      modifiers: [],
    },
  },
  {
    id: 103,
    cardId: 20,
    card: {
      id: 20,
      name: "Feitiço da Cura",
      description: "Restaura 1000 pontos de vida do portador.",
      imageUrl: "images/exemplo_monstro_raro.jpg",
      attribute: "spell",
      element: "light",
      type: "Cura",
      effectScript: "HEAL_SPELL",
      effectValue: 1000,
    },
  },
  {
    id: 104,
    cardId: 33,
    card: {
      id: 33,
      name: "Armadilha Relâmpago",
      description: "Anula o ataque de um monstro inimigo e causa 500 de dano.",
      imageUrl: "images/exemplo_monstro_raro.jpg",
      attribute: "trap",
      element: "dark",
      type: "Armadilha",
      effectScript: "ATTACK_NEGATION",
      effectValue: 500,
    },
  },
  {
    id: 105,
    cardId: 47,
    card: {
      id: 47,
      name: "Lorde das Trevas",
      description: "Uma entidade sombria que devora a luz de todos os reinos.",
      imageUrl: "images/exemplo_monstro_raro.jpg",
      attribute: "monster",
      element: "dark",
      type: "Demônio",
      monsterRarity: "LEGENDARIO",
      stars: 10,
      attackPower: 3200,
      defensePower: 2800,
      modifiers: [],
    },
  },
];

const MOCK_VILLAIN = {
  name: "Darius Blackflare",
  profilePictureUrl: "images/exemplo_monstro_raro.jpg",
  angerQuote: "Impossível... Como você pôde me derrotar?! Isso não acabou!",
  happyQuote: "Hahaha! Você nunca me vencerá, jovem tolo. Desista agora!",
};

const MOCK_PACKAGE = {
  id: 1,
  name: "Recompensa de Duelo",
  type: "villain",
  villainId: 5,
  cards: MOCK_CARDS_DATA.map((c) => c.cardId),
  cardsData: MOCK_CARDS_DATA,
};

const MOCK_RESULT_VICTORY = {
  history: { status: "victory", stars: 2, packageId: 1 },
  villain: MOCK_VILLAIN,
  package: MOCK_PACKAGE,
};

const MOCK_RESULT_DEFEAT = {
  history: { status: "lose", stars: 0, packageId: null },
  villain: MOCK_VILLAIN,
  package: null,
};

// ---------------------------------------------------------------------------
// Decorators — inject mock result into the battle store
// ---------------------------------------------------------------------------

const withVictoryResult = (Story: React.ComponentType) => {
  useEffect(() => {
    useBattleStore.getState().setResult(MOCK_RESULT_VICTORY);
    return () => useBattleStore.getState().clearBattle();
  }, []);
  return <Story />;
};

const withDefeatResult = (Story: React.ComponentType) => {
  useEffect(() => {
    useBattleStore.getState().setResult(MOCK_RESULT_DEFEAT);
    return () => useBattleStore.getState().clearBattle();
  }, []);
  return <Story />;
};

// ---------------------------------------------------------------------------
// Full flow component — navigates from result → rewards
// ---------------------------------------------------------------------------

const FullFlowScene = () => {
  const currentScenario = useNavigationStore((s) => s.currentScenario);

  useEffect(() => {
    useBattleStore.getState().setResult(MOCK_RESULT_VICTORY);
    useNavigationStore.getState().navigateTo("BATTLE_RESULT");
    return () => {
      useBattleStore.getState().clearBattle();
    };
  }, []);

  if (currentScenario === "REWARDS") {
    return (
      <RewardsScenario
        onBack={() => useNavigationStore.getState().navigateTo("BATTLE_RESULT")}
      />
    );
  }

  return (
    <BattleResultScenario
      onSeeRewards={() => useNavigationStore.getState().navigateTo("REWARDS")}
      onGoMenu={() => console.log("[story] voltar ao menu")}
    />
  );
};

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

export default {
  title: "Scenarios/Result/PackageReward",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/** Tela de resultado após uma vitória. Exibe o botão "ABRIR PACOTE". */
export const VictoryScreen: StoryObj = {
  name: "1 — Tela de Vitória",
  decorators: [withVictoryResult],
  render: () => (
    <BattleResultScenario
      onSeeRewards={() => console.log("[story] abrir pacote")}
      onGoMenu={() => console.log("[story] voltar ao menu")}
    />
  ),
};

/** Tela de resultado após uma derrota. Não exibe o pacote. */
export const DefeatScreen: StoryObj = {
  name: "2 — Tela de Derrota",
  decorators: [withDefeatResult],
  render: () => (
    <BattleResultScenario
      onSeeRewards={() => {}}
      onGoMenu={() => console.log("[story] voltar ao menu")}
    />
  ),
};

/**
 * Pacote fechado aguardando ser aberto.
 * Exibe o visual selado com shimmer e o botão "ABRIR PACOTE".
 */
export const PackageSealed: StoryObj = {
  name: "3 — Pacote Selado",
  decorators: [withVictoryResult],
  render: () => <RewardsScenario onBack={() => console.log("[story] continuar")} />,
};

/**
 * Clica automaticamente em "ABRIR PACOTE" e revela as cartas com animação.
 */
export const PackageOpening: StoryObj = {
  name: "4 — Abrindo o Pacote",
  decorators: [withVictoryResult],
  render: () => <RewardsScenario onBack={() => console.log("[story] continuar")} />,
  play: async ({ canvas, userEvent }) => {
    const btn = await canvas.findByRole("button", { name: /abrir pacote/i });
    await userEvent.click(btn);
  },
};

/**
 * Fluxo interativo completo:
 * Vitória → Tela de resultado → Clique "ABRIR PACOTE" → Pacote selado → Abrir → Cartas reveladas.
 */
export const FullFlow: StoryObj = {
  name: "5 — Fluxo Completo (interativo)",
  render: () => <FullFlowScene />,
};
