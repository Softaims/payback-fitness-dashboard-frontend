import { useEffect, useState } from "react";
import { usePFCoinsStore } from "../../store/pfCoinsStore";
import PFCoinsStats from "./PFCoinsStats";
import PurchaseHistoryTable from "./PurchaseHistoryTable";
import PurchasePFCoinsModal from "./PurchasePFCoinsModal";

const PFCoinsMain = () => {
  const { fetchPurchaseHistory, purchaseHistory } = usePFCoinsStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!purchaseHistory) {
      fetchPurchaseHistory(1, 10);
    }
  }, [fetchPurchaseHistory, purchaseHistory]);

  return (
    <div className="min-h-screen bg-[#0B0F0D] p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">PF Coins</h1>
      </div>

      {/* Stats Section */}
      <PFCoinsStats onPurchaseClick={() => setIsModalOpen(true)} />

      {/* Purchase History Section */}
      <PurchaseHistoryTable />

      {/* Purchase Modal */}
      <PurchasePFCoinsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default PFCoinsMain;
