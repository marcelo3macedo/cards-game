import { useState, useEffect } from "react";
import { storeService, type StorePackageItem } from "../../../services/storeService";
import { useUserStore } from "../../../store/UserStore";
import { useBattleStore } from "../../../store/BattleStore";

export function useStore(onPackageOpened: () => void) {
  const [storePackages, setStorePackages] = useState<StorePackageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmPackage, setConfirmPackage] = useState<StorePackageItem | null>(null);

  const { user, setUser } = useUserStore();

  useEffect(() => {
    storeService
      .getStorePackages()
      .then(setStorePackages)
      .catch(() => setError("Não foi possível carregar os pacotes."))
      .finally(() => setLoading(false));
  }, []);

  const handleBuy = async (pkg: StorePackageItem) => {
    setBuying(true);
    setError(null);
    try {
      const result = await storeService.buyPackage(pkg.id);
      // Update local user coins
      if (user) setUser({ ...user, coins: user.coins - result.coinsSpent });
      // Inject package into battle store so REWARDS scenario can use it
      useBattleStore.getState().setResult({
        history: null,
        villain: null,
        package: result.package,
      });
      setConfirmPackage(null);
      onPackageOpened();
    } catch (err: any) {
      setError(err.message);
      setConfirmPackage(null);
    } finally {
      setBuying(false);
    }
  };

  return {
    user,
    storePackages,
    loading,
    buying,
    error,
    confirmPackage,
    setConfirmPackage,
    handleBuy,
  };
}
