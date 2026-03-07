import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import StoreScenario from ".";
import { storeService } from "../../services/storeService";
import { useUserStore } from "../../store/UserStore";
import { useBattleStore } from "../../store/BattleStore";
import { useNavigationStore } from "../../store/NavigationStore";
import { RewardsScenario } from "../Result/Rewards";

// ---------------------------------------------------------------------------
// Mock data — catálogo de pacotes
// ---------------------------------------------------------------------------

const MOCK_PACKAGES = [
  {
    id: 1,
    name: "Pacote Iniciante",
    description: "Perfeito para novos duelistas. Contém cartas comuns e algumas surpresas.",
    price: 30,
    requiredLevel: 1,
    cardCount: 3,
    storeId: 1,
  },
  {
    id: 2,
    name: "Pacote Elemental",
    description: "Cartas de atributos variados para equilibrar qualquer estratégia de duelo.",
    price: 60,
    requiredLevel: 3,
    cardCount: 4,
    storeId: 1,
  },
  {
    id: 3,
    name: "Pacote das Sombras",
    description: "Criaturas sombrias e magias obscuras. Apenas os mais corajosos ousam abri-lo.",
    price: 100,
    requiredLevel: 5,
    cardCount: 5,
    storeId: 1,
  },
  {
    id: 4,
    name: "Pacote Lendário",
    description: "O ápice da coleção. Contém cartas raríssimas encontradas apenas nos torneios.",
    price: 200,
    requiredLevel: 8,
    cardCount: 6,
    storeId: 1,
  },
];

const MOCK_BUY_RESPONSE = {
  coinsSpent: 30,
  package: {
    id: 99,
    name: "Pacote Iniciante",
    type: "store",
    storeId: 1,
    cards: [5, 12, 20],
    cardsData: [
      {
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
        cardId: 12,
        card: {
          id: 12,
          name: "Íbis Mensageiro",
          description: "Mensageiro veloz dos deuses, guardião dos portais sagrados.",
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
    ],
  },
};

// ---------------------------------------------------------------------------
// Perfis de usuário
// ---------------------------------------------------------------------------

const USER_RICH = {
  id: 1, name: "Duelista Rico", level: 3, points: 500, coins: 250, active: true,
  profile: { imageUrl: "images/exemplo_monstro_raro.jpg", type: "boy" },
};

const USER_BROKE = {
  id: 2, name: "Sem Moedas", level: 5, points: 200, coins: 20, active: true,
  profile: { imageUrl: "images/exemplo_monstro_raro.jpg", type: "boy" },
};

const USER_LOWLEVEL = {
  id: 3, name: "Novato", level: 1, points: 0, coins: 150, active: true,
  profile: { imageUrl: "images/exemplo_monstro_raro.jpg", type: "girl" },
};

const USER_MAXLEVEL = {
  id: 4, name: "Lendário", level: 10, points: 9999, coins: 500, active: true,
  profile: { imageUrl: "images/exemplo_monstro_raro.jpg", type: "boy" },
};

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------------------
// Decorator
//
// Problema: useEffect dos filhos roda ANTES do pai no React — então useStore
// já chamaria o serviço real antes do mock estar no lugar.
//
// Solução: montar os mocks de forma síncrona no useEffect do decorator e só
// renderizar <Story /> depois (via flag `ready`), garantindo que os mocks
// estejam ativos quando o componente filho montar.
// ---------------------------------------------------------------------------

type Packages = typeof MOCK_PACKAGES | [];

const withStoreMock = (
  user: typeof USER_RICH,
  packages: Packages | null = MOCK_PACKAGES,
  buyError?: string,
  loadDelay = 0,
) =>
  (Story: React.ComponentType) => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
      // Configura usuário no store
      useUserStore.getState().setUser(user as any);

      // Guarda referências originais
      const originalGet = storeService.getStorePackages;
      const originalBuy = storeService.buyPackage;

      // Sobrescreve de forma síncrona — antes de qualquer render filho
      storeService.getStorePackages = async () => {
        if (loadDelay) await sleep(loadDelay);
        if (packages === null) throw new Error("Servidor indisponível");
        return packages as any;
      };

      storeService.buyPackage = async (_id: number) => {
        await sleep(800);
        if (buyError) throw new Error(buyError);
        return MOCK_BUY_RESPONSE;
      };

      // Agora é seguro renderizar o Story
      setReady(true);

      return () => {
        storeService.getStorePackages = originalGet;
        storeService.buyPackage = originalBuy;
        useUserStore.getState().clearUser();
        useBattleStore.getState().clearBattle();
      };
    }, []);

    if (!ready) return <></>;
    return <Story />;
  };

// ---------------------------------------------------------------------------
// Componente para o fluxo completo (loja → abertura de pacote)
// ---------------------------------------------------------------------------

const StoreWithRewardsFlow = ({ user }: { user: typeof USER_RICH }) => {
  const [ready, setReady] = useState(false);
  const currentScenario = useNavigationStore((s) => s.currentScenario);

  useEffect(() => {
    useUserStore.getState().setUser(user as any);
    useNavigationStore.getState().navigateTo("STORE");

    const originalGet = storeService.getStorePackages;
    const originalBuy = storeService.buyPackage;

    storeService.getStorePackages = async () => MOCK_PACKAGES as any;
    storeService.buyPackage = async () => {
      await sleep(800);
      return MOCK_BUY_RESPONSE;
    };

    setReady(true);

    return () => {
      storeService.getStorePackages = originalGet;
      storeService.buyPackage = originalBuy;
      useUserStore.getState().clearUser();
      useBattleStore.getState().clearBattle();
    };
  }, []);

  if (!ready) return null;

  if (currentScenario === "REWARDS") {
    return (
      <RewardsScenario
        onBack={() => useNavigationStore.getState().navigateTo("STORE")}
      />
    );
  }

  return (
    <StoreScenario
      onBack={() => useNavigationStore.getState().navigateTo("MAINMENU")}
      onPackageOpened={() => useNavigationStore.getState().navigateTo("REWARDS")}
    />
  );
};

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

export default {
  title: "Scenarios/Store",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/** Catálogo normal — nível 3, 250 moedas. Pacotes 1 e 2 disponíveis, 3 e 4 bloqueados por nível. */
export const DefaultCatalog: StoryObj = {
  name: "1 — Catálogo Padrão",
  decorators: [withStoreMock(USER_RICH)],
  render: () => (
    <StoreScenario
      onBack={() => console.log("[story] voltar")}
      onPackageOpened={() => console.log("[story] pacote aberto")}
    />
  ),
};

/** Usuário nível 1 — apenas o Pacote Iniciante desbloqueado, demais com cadeado. */
export const LowLevelUser: StoryObj = {
  name: "2 — Usuário Nível Baixo",
  decorators: [withStoreMock(USER_LOWLEVEL)],
  render: () => (
    <StoreScenario
      onBack={() => console.log("[story] voltar")}
      onPackageOpened={() => console.log("[story] pacote aberto")}
    />
  ),
};

/** Nível 10, 500 moedas — todos os pacotes desbloqueados e acessíveis. */
export const AllUnlocked: StoryObj = {
  name: "3 — Tudo Desbloqueado",
  decorators: [withStoreMock(USER_MAXLEVEL)],
  render: () => (
    <StoreScenario
      onBack={() => console.log("[story] voltar")}
      onPackageOpened={() => console.log("[story] pacote aberto")}
    />
  ),
};

/** Nível 5, apenas 20 moedas — pacotes desbloqueados por nível mas sem saldo. */
export const InsufficientCoins: StoryObj = {
  name: "4 — Moedas Insuficientes",
  decorators: [withStoreMock(USER_BROKE)],
  render: () => (
    <StoreScenario
      onBack={() => console.log("[story] voltar")}
      onPackageOpened={() => console.log("[story] pacote aberto")}
    />
  ),
};

/** Delay de 3s na resposta — exibe o estado de carregamento. */
export const LoadingState: StoryObj = {
  name: "5 — Carregando Pacotes",
  decorators: [withStoreMock(USER_RICH, MOCK_PACKAGES, undefined, 3000)],
  render: () => (
    <StoreScenario
      onBack={() => console.log("[story] voltar")}
      onPackageOpened={() => console.log("[story] pacote aberto")}
    />
  ),
};

/** API lança erro ao carregar — exibe a mensagem de falha no painel. */
export const ApiError: StoryObj = {
  name: "6 — Erro ao Carregar",
  decorators: [withStoreMock(USER_RICH, null)],
  render: () => (
    <StoreScenario
      onBack={() => console.log("[story] voltar")}
      onPackageOpened={() => console.log("[story] pacote aberto")}
    />
  ),
};

/** Nenhum pacote cadastrado na loja. */
export const EmptyStore: StoryObj = {
  name: "7 — Loja Vazia",
  decorators: [withStoreMock(USER_RICH, [])],
  render: () => (
    <StoreScenario
      onBack={() => console.log("[story] voltar")}
      onPackageOpened={() => console.log("[story] pacote aberto")}
    />
  ),
};

/** play() clica no Pacote Iniciante e abre o modal de confirmação. */
export const ConfirmModalOpen: StoryObj = {
  name: "8 — Modal de Confirmação",
  decorators: [withStoreMock(USER_RICH)],
  render: () => (
    <StoreScenario
      onBack={() => console.log("[story] voltar")}
      onPackageOpened={() => console.log("[story] pacote aberto")}
    />
  ),
  play: async ({ canvas, userEvent }:any) => {
    const card = await canvas.findByText(/pacote iniciante/i);
    await userEvent.click(card);
  },
};

/** play() abre o modal e confirma — API retorna erro, mensagem aparece na tela. */
export const BuyError: StoryObj = {
  name: "9 — Erro na Compra",
  decorators: [withStoreMock(USER_RICH, MOCK_PACKAGES, "Moedas insuficientes no servidor")],
  render: () => (
    <StoreScenario
      onBack={() => console.log("[story] voltar")}
      onPackageOpened={() => console.log("[story] pacote aberto")}
    />
  ),
  play: async ({ canvas, userEvent }:any) => {
    const card = await canvas.findByText(/pacote iniciante/i);
    await userEvent.click(card);
    const confirm = await canvas.findByRole("button", { name: /confirmar/i });
    await userEvent.click(confirm);
  },
};

/**
 * Fluxo completo interativo:
 * Loja → seleciona pacote → confirma compra → tela de abertura de pacote.
 */
export const FullBuyFlow: StoryObj = {
  name: "10 — Fluxo Completo (interativo)",
  render: () => <StoreWithRewardsFlow user={USER_RICH} />,
};
