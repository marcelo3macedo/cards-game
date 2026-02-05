import { useState, useEffect, useMemo } from "react";
import { deckService, type DeckResponse } from "../../../services/deckService";

export const useDeck = () => {
  const [data, setData] = useState<DeckResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("TODOS");
  const [sortBy, setSortBy] = useState("NAME");
  const [viewingCard, setViewingCard] = useState<any>(null);
  const [localDeck, setLocalDeck] = useState<any[]>([]);
  const [fullInventory, setFullInventory] = useState<any[]>([]);

  const loadDeck = async () => {
    try {
      setLoading(true);
      const result = await deckService.getDeckData();
      setData(result);

      // Mapeamos as cartas do Deck e da Library para um único inventário total
      const initialDeckCards = result.mainDeck.map(item => ({
        ...item.card,
        instanceId: item.id // ID vindo do banco
      }));

      const libraryCards = result.library.map(item => item.card);

      // O inventário total é a soma do que está no deck com o que está na biblioteca
      setFullInventory([...initialDeckCards, ...libraryCards]);

      // Inicializa o deck local
      setLocalDeck(initialDeckCards);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDeck();
  }, []);

 const filteredCollection = useMemo(() => {
    return fullInventory
      .filter(card => {
        const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === "TODOS" || card.attribute === filterType;

        // Verificamos se esta carta específica (pelo ID único da carta) já está no deck local
        // Se estiver, ela "some" da biblioteca
        const isAlreadyInDeck = localDeck.some(ld => Number(ld.id) === Number(card.id));

        return matchesSearch && matchesType && !isAlreadyInDeck;
      })
      .sort((a, b) => {
        if (sortBy === "ATK") return b.attackPower - a.attackPower;
        return a.name.localeCompare(b.name);
      });

  }, [fullInventory, searchTerm, filterType, sortBy, localDeck]);

  // Ações
  const addToDeck = (card: any) => {
    if (localDeck.length >= 40) return alert("Limite de 40 cartas atingido!");

    // Adicionamos ao deck local.
    // O useMemo 'filteredCollection' vai detectar essa mudança e remover da lista da esquerda.
    setLocalDeck(prev => [...prev, { ...card, instanceId: Math.random() }]);
  };

  const removeFromDeck = (instanceId: any) => {
    // Removemos do deck local.
    // O useMemo vai detectar que o ID da carta não está mais no deck e ela reaparecerá na esquerda.
    setLocalDeck(prev => prev.filter(card => card.instanceId !== instanceId));
  };

  const saveDeck = async () => {
    if (localDeck.length !== 40) return alert("O deck deve ter exatamente 40 cartas!");

    try {
      // Extrai apenas os IDs das cartas para enviar à API
      const cardIds = localDeck.map(c => c.id);
      //await deckService.updateDeck(cardIds);
      alert("Deck salvo com sucesso!");
      //refresh();
    } catch (err: any) {
      alert("Erro ao salvar: " + err.message);
    }
  };

  return {
    // Dados e Estados
    data,
    loading,
    error,
    localDeck,
    filteredCollection,
    viewingCard,
    searchTerm,
    filterType,
    sortBy,

    // Setters de UI
    setSearchTerm,
    setFilterType,
    setSortBy,
    setViewingCard,

    // Funções de Negócio
    addToDeck,
    removeFromDeck,
    saveDeck,
    refresh: loadDeck
  };
};
