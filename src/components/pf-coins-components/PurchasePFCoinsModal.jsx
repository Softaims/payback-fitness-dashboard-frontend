import { useState } from "react";
import { X, AlertCircle } from "lucide-react";
import { purchaseCoinsSchema } from "../../validation/purchaseCoinsValidation";
import { validateForm } from "../../validation/validateForm";
import api from "../../lib/apiClient";
import customToast from "../../lib/toast";

const PurchasePFCoinsModal = ({ isOpen, onClose }) => {
  const [coinAmount, setCoinAmount] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setCoinAmount(e.target.value);
    setErrors({ ...errors, coinAmount: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const formData = { coinAmount };
    const fieldErrors = validateForm(purchaseCoinsSchema, formData);

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(
        "/api/coin/topup/checkout",
        {
          amountUsd: parseInt(coinAmount),
        },
        {
          isProtected: true,
        }
      );

      // Redirect to checkout URL
      window.location.href = response?.data?.checkoutUrl;
    } catch (error) {
      console.error("Purchase failed:", error);
      if (error?.message) {
        customToast.error(error.message);
      } else {
        customToast.error("Failed to initiate purchase. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setCoinAmount("");
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/30 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0B0F0D] rounded-xl p-6 w-full max-w-lg relative">
        <button onClick={handleClose} className="cursor-pointer absolute top-4 right-4 text-[#ffffff]/50 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-white mb-2">Purchase PF Points</h2>
        <p className="text-[#ffffff]/50 text-sm mb-6">Enter the number of PF Points that you wanted to purchase.</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-20">
            <label className="block text-white text-sm font-medium mb-2">PF Points</label>
            <div className="relative">
              <input
                type="number"
                value={coinAmount}
                onChange={handleInputChange}
                placeholder="Enter Number of PF Points"
                className={`w-full bg-[#ffffff]/7 rounded-[30px] px-4 py-3 text-white placeholder-[#ffffff]/50 placeholder:text-sm focus:outline-none transition-colors
  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
    errors.coinAmount ? "border border-red-500 focus:border-red-500" : "border border-[#ffffff]/10 focus:border-[#4BEEA2]"
  }`}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                {errors.coinAmount && <AlertCircle className="w-4 h-4 text-red-500" />}
                <span className="text-[#ffffff]/50 text-sm">PF Points</span>
              </div>
            </div>
            {errors.coinAmount && (
              <div className="mt-2 flex items-center text-red-500 text-xs">
                <AlertCircle className="w-3 h-3 mr-1" />
                {errors.coinAmount}
              </div>
            )}
          </div>
          <div className=" flex space-x-3">
            <button
              type="submit"
              disabled={loading}
              className={`cursor-pointer w-40 font-semibold py-3 px-4 rounded-[30px] transition-colors ${
                loading ? "bg-[#6d6262ff] cursor-not-allowed" : "bg-[#4BEEA2] text-black hover:bg-[#3DD084]"
              }`}
            >
              {loading ? "Purchasing..." : "Purchase"}
            </button>
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="cursor-pointer w-40 bg-[#ffffff]/10 text-[#ffffff]/70 font-semibold py-3 px-4 rounded-[30px] hover:bg-[#ffffff]/20 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchasePFCoinsModal;
