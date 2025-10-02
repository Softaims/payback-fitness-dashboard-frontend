import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentFailurePage = () => {
  const navigate = useNavigate();

  const handleGoToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        {/* Failure Icon */}
        <div className="mb-8">
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

        {/* Title */}
        <h1 className="text-white text-3xl font-bold mb-4">Payment Failed!</h1>

        {/* Description */}
        <p className="text-[#ffffff]/50 text-sm mb-8 leading-relaxed">
          We're sorry, but your payment could not be processed. This could be due to insufficient funds, an expired card, or a temporary issue. Please try again
          or contact support if the problem persists.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Go to Home Button */}
          <button
            onClick={handleGoToHome}
            className="w-full font-bold py-3 px-4 rounded-[30px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 bg-[#4BEEA2] cursor-pointer hover:bg-[#3dd48a]"
          >
            Go To My Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailurePage;
