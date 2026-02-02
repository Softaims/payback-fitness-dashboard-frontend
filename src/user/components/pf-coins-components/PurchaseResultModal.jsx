import { Check, X } from "lucide-react";

const PurchaseResultModal = ({ isOpen, onClose, isSuccess, amount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/30 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0B0F0D] rounded-xl p-8 w-full max-w-md relative text-center">
        {/* Success Icon */}
        {isSuccess ? (
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto relative">
              {/* Outer glow rings */}
              <div className="absolute inset-0 rounded-full border-4 border-[#4BEEA2]/30 animate-pulse"></div>
              <div className="absolute inset-2 rounded-full border-2 border-[#4BEEA2]/50 animate-pulse" style={{ animationDelay: "0.5s" }}></div>

              {/* Main circle */}
              <div className="absolute inset-4 rounded-full bg-[#4BEEA2] flex items-center justify-center">
                <Check className="w-8 h-8 text-black" />
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto relative">
              {/* Outer glow rings */}
              <div className="absolute inset-0 rounded-full border-4 border-red-500/30 animate-pulse"></div>
              <div className="absolute inset-2 rounded-full border-2 border-red-500/50 animate-pulse" style={{ animationDelay: "0.5s" }}></div>

              {/* Main circle */}
              <div className="absolute inset-4 rounded-full bg-red-500 flex items-center justify-center">
                <X className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        )}

        {/* Title */}
        <h1 className="text-white text-3xl font-bold mb-4">{isSuccess ? "PF Points Purchased!" : "Purchase Failed!"}</h1>

        {/* Description */}
        <p className="text-[#ffffff]/70 text-sm mb-8 leading-relaxed">
          {isSuccess
            ? `You just purchased ${amount}PF Points – start using them for groups and challenges.`
            : "We're sorry, but your payment could not be processed. This could be due to insufficient funds, an expired card, or a temporary issue."}
        </p>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full font-bold py-3 px-4 rounded-[30px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 bg-[#4BEEA2] cursor-pointer hover:bg-[#3dd48a]"
        >
          {isSuccess ? "View My PF Points" : "View My PF Points"}
        </button>
      </div>
    </div>
  );
};

export default PurchaseResultModal;
