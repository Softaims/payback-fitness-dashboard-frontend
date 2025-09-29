import { useEffect } from "react";
import { usePFCoinsStore } from "../../store/pfCoinsStore";
import PFCoinsStats from "./PFCoinsStats";
import PurchaseHistoryTable from "./PurchaseHistoryTable";

const PFCoinsMain = () => {
  const { fetchPurchaseHistory, purchaseHistory, purchaseHistoryLoading } = usePFCoinsStore();

  useEffect(() => {
    fetchPurchaseHistory(1, 10);
  }, [fetchPurchaseHistory]);

  const calculateStats = () => {
    const rows = purchaseHistory?.rows || [];
    const totalPurchased = rows.filter((item) => item.status === "completed").reduce((sum, item) => sum + parseInt(item.amount), 0);
    const availableCoins = totalPurchased;
    return { availableCoins, totalPurchased };
  };

  const { availableCoins, totalPurchased } = calculateStats();

  return (
    <div className="min-h-screen bg-[#0B0F0D] p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">PF Coins</h1>
      </div>

      {/* Stats Section */}
      <PFCoinsStats availableCoins={availableCoins} totalPurchased={totalPurchased} loading={purchaseHistoryLoading} />

      {/* Purchase History Section */}
      <PurchaseHistoryTable />
    </div>
  );
};

export default PFCoinsMain;
