import { useEffect, useRef, useState } from "react";
import type { Villain, Chapter } from "../../../store/VillainStore";
import { ActionKey, getActionFromKey } from "../../../utils/keyUtils";

interface Options {
  allVillains: Villain[];
  handleChooseOpponent: (v: Villain) => void;
  // ações do nav por índice: [1]=Baralho, [2]=Loja, [3]=Dicas, [4]=Sair
  navActions: Array<(() => void) | null>;
  storyModal: Chapter | null;
  menuOpen: boolean;
}

export function useMainMenuKeyboard({
  allVillains,
  handleChooseOpponent,
  navActions,
  storyModal,
  menuOpen,
}: Options) {
  const [focusedArea, setFocusedArea] = useState<"nav" | "villains">("villains");
  const [focusedNavIndex, setFocusedNavIndex] = useState(0);
  const [focusedVillainIndex, setFocusedVillainIndex] = useState(0);
  const mainRef = useRef<HTMLElement>(null);

  // Rola o card focado para a área visível
  useEffect(() => {
    if (focusedArea !== "villains" || !mainRef.current) return;
    const items = mainRef.current.querySelectorAll("[data-villain-idx]");
    items[focusedVillainIndex]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [focusedArea, focusedVillainIndex]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (storyModal || menuOpen) return;

      const action = getActionFromKey(e.key);
      if (!action) return;

      // =========================
      // NAV
      // =========================
      if (focusedArea === "nav") {
        const len = navActions.length;

        if (action === ActionKey.Up) {
          e.preventDefault();
          setFocusedNavIndex(i => (i - 1 + len) % len);
        }
        else if (action === ActionKey.Down) {
          e.preventDefault();
          setFocusedNavIndex(i => (i + 1) % len);
        }
        else if (action === ActionKey.Right) {
          e.preventDefault();
          setFocusedArea("villains");
        }
        else if (action === ActionKey.Escape) {
          e.preventDefault();
          setFocusedArea("villains");
        }
        else if (action === ActionKey.Enter) {
          e.preventDefault();
          if (focusedNavIndex === 0) {
            setFocusedArea("villains"); // Duelar
          } else {
            navActions[focusedNavIndex]?.();
          }
        }

        return;
      }

      // =========================
      // VILLAINS
      // =========================
      if (focusedArea === "villains") {
        const len = allVillains.length;

        if (action === ActionKey.Left) {
          e.preventDefault();
          if (focusedVillainIndex === 0) {
            setFocusedArea("nav");
          } else {
            setFocusedVillainIndex(i => i - 1);
          }
        }
        else if (action === ActionKey.Up) {
          e.preventDefault();
          setFocusedVillainIndex(i => Math.max(0, i - 1));
        }
        else if (action === ActionKey.Right || action === ActionKey.Down) {
          e.preventDefault();
          setFocusedVillainIndex(i => Math.min(len - 1, i + 1));
        }
        else if (action === ActionKey.Enter) {
          e.preventDefault();
          const v = allVillains[focusedVillainIndex];
          if (v) handleChooseOpponent(v);
        }
        else if (action === ActionKey.Escape) {
          e.preventDefault();
          setFocusedArea("nav");
        }
      }
    };

    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [
    focusedArea,
    focusedNavIndex,
    focusedVillainIndex,
    allVillains,
    storyModal,
    menuOpen,
    navActions,
    handleChooseOpponent
  ]);

  return { focusedArea, setFocusedArea, focusedNavIndex, setFocusedNavIndex, focusedVillainIndex, mainRef };
}
