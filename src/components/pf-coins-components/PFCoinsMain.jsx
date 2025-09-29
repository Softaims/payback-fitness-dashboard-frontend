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

  return (
    <div className="min-h-screen bg-[#0B0F0D] p-6">
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
      <PurchasePFCoinsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default PFCoinsMain;
