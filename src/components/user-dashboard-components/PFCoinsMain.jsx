import { useEffect, useState } from "react";
import { usePFCoinsStore } from "../../store/pfCoinsStore";
import PFCoinsStats from "./PFCoinsStats";
import PurchaseHistoryTable from "./PurchaseHistoryTable";
import PurchasePFCoinsModal from "./PurchasePFCoinsModal";

const PFCoinsMain = () => {
  const { fetchPurchaseHistory, purchaseHistory, purchaseHistoryLoading } = usePFCoinsStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handlePurchase = (amount) => {
    // TODO: Implement purchase logic
    console.log(`Purchasing ${amount} PF Coins`);
    // After successful purchase, refresh the data
    fetchPurchaseHistory(1, 10);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">PF Coins</h1>
      </div>

      {/* Stats Section */}
      <PFCoinsStats
        availableCoins={availableCoins}
        totalPurchased={totalPurchased}
        loading={purchaseHistoryLoading}
        onPurchaseClick={() => setIsModalOpen(true)}
      />

      {/* Purchase History Section */}
      <PurchaseHistoryTable />

      {/* Purchase Modal */}
      <PurchasePFCoinsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onPurchase={handlePurchase} />
    </div>
  );
};

export default PFCoinsMain;
