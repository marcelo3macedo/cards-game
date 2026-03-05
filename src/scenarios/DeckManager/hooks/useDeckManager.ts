import { useState, useEffect, useMemo } from "react";
import { deckService, type DeckResponse } from "../../../services/deckService";
import { packageService, type UserPackage } from "../../../services/packageService";
import { useBattleStore } from "../../../store/BattleStore";

export const useDeck = (onOpenPackage: () => void) => {
  const [data, setData] = useState<DeckResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("TODOS");
  const [sortBy, setSortBy] = useState("NAME");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState<"library" | "packages">("library");
  const [viewingCard, setViewingCard] = useState<any>(null);
  const [localDeck, setLocalDeck] = useState<any[]>([]);
  const [fullInventory, setFullInventory] = useState<any[]>([]);

  const [packages, setPackages] = useState<UserPackage[]>([]);
  const [openingPackage, setOpeningPackage] = useState(false);

  const loadDeck = async () => {
    try {
      setLoading(true);
      const result = await deckService.getDeckData();
      setData(result);

      const initialDeckCards = result.mainDeck.map(item => ({
        ...item.card,
        instanceId: item.id,
      }));

      const libraryCards = result.library.map(item => ({
        ...item.card,
        instanceId: item.id,
      }));

      setFullInventory([...initialDeckCards, ...libraryCards]);
      setLocalDeck(initialDeckCards);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadPackages = async () => {
    try {
      const pkgs = await packageService.getPackages();
      setPackages(pkgs);
    } catch {
      // silent fail — packages are optional
    }
  };

  useEffect(() => {
    loadDeck();
    loadPackages();
  }, []);

  const filteredCollection = useMemo(() => {
    return fullInventory
      .filter(card => {
        const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === "TODOS" || card.attribute === filterType;
        // Track individual copies by instanceId
        const isAlreadyInDeck = localDeck.some(ld => ld.instanceId === card.instanceId);
        return matchesSearch && matchesType && !isAlreadyInDeck;
      })
      .sort((a, b) => {
        if (sortBy === "ATK") return b.attackPower - a.attackPower;
        return a.name.localeCompare(b.name);
      });
  }, [fullInventory, searchTerm, filterType, sortBy, localDeck]);

  const addToDeck = (card: any) => {
    if (localDeck.length >= 45) return;
    setLocalDeck(prev => [...prev, card]);
  };

  const removeFromDeck = (instanceId: any) => {
    setLocalDeck(prev => prev.filter(card => card.instanceId !== instanceId));
  };

  const saveDeck = async () => {
    if (localDeck.length < 35 || localDeck.length > 45) return;
    setSaving(true);
    setError(null);
    try {
      const cardIds = localDeck.map(card => card.id);
      await deckService.updateDeck(cardIds);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const openPackage = async (pkg: UserPackage) => {
    setOpeningPackage(true);
    setError(null);
    try {
      const result = await packageService.openPackage(pkg.id);
      useBattleStore.getState().setResult({
        history: null,
        villain: null,
        package: result.package,
      });
      setPackages(prev => prev.filter(p => p.id !== pkg.id));
      onOpenPackage();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setOpeningPackage(false);
    }
  };

  const deckStats = useMemo(() => ({
    monsters: localDeck.filter(c => c.attribute === "monster").length,
    spells: localDeck.filter(c => c.attribute === "spell").length,
    traps: localDeck.filter(c => c.attribute === "trap").length,
  }), [localDeck]);

  const deckValid = localDeck.length >= 35 && localDeck.length <= 45;

  return {
    loading,
    error,
    saving,
    localDeck,
    filteredCollection,
    viewingCard,
    searchTerm,
    filterType,
    sortBy,
    viewMode,
    activeTab,
    packages,
    openingPackage,
    deckStats,
    deckValid,
    data,

    setSearchTerm,
    setFilterType,
    setSortBy,
    setViewMode,
    setActiveTab,
    setViewingCard,

    addToDeck,
    removeFromDeck,
    saveDeck,
    openPackage,
    refresh: loadDeck,
  };
};
