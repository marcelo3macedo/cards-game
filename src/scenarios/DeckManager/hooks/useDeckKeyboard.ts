import { useState, useEffect } from "react";
import { ActionKey, getActionFromKey } from "../../../utils/keyUtils";

interface UseDeckKeyboardProps {
  viewingCard: any;
  setViewingCard: (card: any) => void;
  activeTab: "library" | "packages";
  setActiveTab: (updater: ((t: "library" | "packages") => "library" | "packages") | "library" | "packages") => void;
  filteredCollection: any[];
  packages: any[];
  localDeck: any[];
  viewMode: "grid" | "list";
  openingPackage: boolean;
  addToDeck: (card: any) => void;
  removeFromDeck: (instanceId: any) => void;
  openPackage: (pkg: any) => void;
  onBack: () => void;
}

export function useDeckKeyboard({
  viewingCard,
  setViewingCard,
  activeTab,
  setActiveTab,
  filteredCollection,
  packages,
  localDeck,
  viewMode,
  openingPackage,
  addToDeck,
  removeFromDeck,
  openPackage,
  onBack,
}: UseDeckKeyboardProps) {
  const [focusedColIdx, setFocusedColIdx] = useState(0);
  const [focusedDeckIdx, setFocusedDeckIdx] = useState(0);
  const [focusedPanel, setFocusedPanel] = useState<"collection" | "deck">("collection");

  // Reset collection index when tab or filters change
  useEffect(() => {
    setFocusedColIdx(0);
  }, [activeTab, filteredCollection.length, packages.length]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      // Detail overlay open — Esc closes it
      if (viewingCard) {
        if (e.key === "Escape") { e.preventDefault(); setViewingCard(null); }
        return;
      }

      // Tab: switch library/packages tabs (when in collection panel)
      if (e.key === "Tab") {
        e.preventDefault();
        if (focusedPanel === "collection") {
          setActiveTab(t => t === "library" ? "packages" : "library");
        } else {
          setFocusedPanel("collection");
        }
        return;
      }

      const action = getActionFromKey(e.key);
      if (!action) return;

      if (action === ActionKey.Escape) { e.preventDefault(); onBack(); return; }

      // ── Collection panel ────────────────────────────────────────────────
      if (focusedPanel === "collection") {
        const items = activeTab === "library" ? filteredCollection : packages;
        const len = items.length;
        const cols = activeTab === "library" && viewMode === "grid" ? 3 : 1;

        if (action === ActionKey.Left) {
          e.preventDefault();
          setFocusedColIdx(i => Math.max(0, i - 1));
        } else if (action === ActionKey.Right) {
          e.preventDefault();
          if (focusedColIdx === len - 1) setFocusedPanel("deck");
          else setFocusedColIdx(i => Math.min(len - 1, i + 1));
        } else if (action === ActionKey.Up) {
          e.preventDefault();
          setFocusedColIdx(i => Math.max(0, i - cols));
        } else if (action === ActionKey.Down) {
          e.preventDefault();
          setFocusedColIdx(i => Math.min(len - 1, i + cols));
        } else if (action === ActionKey.Enter) {
          e.preventDefault();
          if (activeTab === "library") {
            const card = filteredCollection[focusedColIdx];
            if (card) addToDeck(card);
          } else {
            const pkg = packages[focusedColIdx];
            if (pkg && !openingPackage) openPackage(pkg);
          }
        }
        return;
      }

      // ── Deck panel ──────────────────────────────────────────────────────
      if (focusedPanel === "deck") {
        const len = localDeck.length;
        if (action === ActionKey.Up) {
          e.preventDefault();
          setFocusedDeckIdx(i => Math.max(0, i - 1));
        } else if (action === ActionKey.Down) {
          e.preventDefault();
          setFocusedDeckIdx(i => Math.min(len - 1, i + 1));
        } else if (action === ActionKey.Left) {
          e.preventDefault();
          setFocusedPanel("collection");
        } else if (action === ActionKey.Enter) {
          e.preventDefault();
          const card = localDeck[focusedDeckIdx];
          if (card) removeFromDeck(card.instanceId);
        }
      }
    };

    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [
    viewingCard, focusedPanel, focusedColIdx, focusedDeckIdx,
    activeTab, filteredCollection, packages, localDeck,
    viewMode, openingPackage,
    addToDeck, removeFromDeck, openPackage, setActiveTab, setViewingCard, onBack,
  ]);

  return { focusedPanel, focusedColIdx, focusedDeckIdx };
}
