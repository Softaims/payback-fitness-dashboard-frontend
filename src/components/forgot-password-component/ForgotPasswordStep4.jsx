import { Check } from "lucide-react";

const ForgotPasswordStep4 = ({ onComplete }) => {
  const handleLoginNow = () => {
    onComplete();
  };

  return (
    <div className="text-center">
      {/* Success Icon */}
      <div className="mb-8">
        <div className="w-24 h-24 mx-auto relative">
          {/* Outer glow rings */}
          <div className="absolute inset-0 rounded-full border-4 border-[#4BEEA2]/30 animate-pulse"></div>
          <div className="absolute inset-2 rounded-full border-2 border-[#4BEEA2]/50 animate-pulse" style={{ animationDelay: "0.5s" }}></div>

          {/* Main circle */}
          <div className="absolute inset-4 rounded-full bg-[#4BEEA2] flex items-center justify-center">
            <Check className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-white text-3xl font-bold mb-4">Password Changed!</h1>

      {/* Description */}
      <p className="text-[#ffffff]/50 text-sm mb-8 leading-relaxed">You have successfully update your password now you can access your account</p>

      {/* Login Now Button */}
      <button
        onClick={handleLoginNow}
        className="w-full font-bold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 bg-[#4BEEA2] cursor-pointer hover:bg-[#3dd48a]"
      >
        Login Now
      </button>
    </div>
  );
};

export default ForgotPasswordStep4;
