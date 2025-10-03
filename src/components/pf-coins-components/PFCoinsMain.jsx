import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { usePFCoinsStore } from "../../store/pfCoinsStore";
import PFCoinsStats from "./PFCoinsStats";
import PurchaseHistoryTable from "./PurchaseHistoryTable";
import PurchasePFCoinsModal from "./PurchasePFCoinsModal";
import PurchaseResultModal from "./PurchaseResultModal";

const PFCoinsMain = () => {
  const { fetchPurchaseHistory, purchaseHistory } = usePFCoinsStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract success status and amount from URL params
  const successParam = searchParams.get("success");
  const amountParam = searchParams.get("amount");
  const isSuccess = successParam === "true";
  const isFailure = successParam === "false";
  const amount = amountParam ? parseInt(amountParam) : null;
  const showResultModal = (isSuccess || isFailure) && amount;

  useEffect(() => {
    if (!purchaseHistory) {
      fetchPurchaseHistory(1, 10);
    }
  }, [fetchPurchaseHistory, purchaseHistory]);

  useEffect(() => {
    // Clear URL params after showing the modal to avoid re-triggering on refresh
    if (showResultModal) {
      setTimeout(() => {
        setSearchParams({});
      }, 5000);
    }
  }, [showResultModal, setSearchParams]);

  return (
    <div className="min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">PF Coins</h1>
      </div>

      {/* Stats Section */}
      <PFCoinsStats onPurchaseClick={() => setIsModalOpen(true)} />

      {/* Purchase History Section */}
      <h2 className="text-xl font-bold text-white mb-6">Coin Purchase History</h2>
      <PurchaseHistoryTable />

      {/* Purchase Modal */}
      <PurchasePFCoinsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Purchase Result Modal */}
      <PurchaseResultModal isOpen={showResultModal} onClose={() => setSearchParams({})} isSuccess={isSuccess} amount={amount} />
    </div>
  );
};

export default PFCoinsMain;
