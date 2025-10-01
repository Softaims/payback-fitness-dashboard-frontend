import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import ResetPasswordStep1 from "../components/reset-password-component/ResetPasswordStep1";
import ResetPasswordStep2 from "../components/reset-password-component/ResetPasswordStep2";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { clearTokens } from "../lib/tokenUtils";
const ResetPasswordPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleGoBackToLogin = () => {
    clearTokens();
    setUser(null);
    navigate("/login");
  };

  const handleComplete = () => {
    clearTokens();
    setUser(null);
    navigate("/login");
  };
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ResetPasswordStep1 onNext={handleNext} />;
      case 2:
        return <ResetPasswordStep2 onComplete={handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Go Back Link - Fixed to top left */}
      <div className="absolute top-6 left-6 z-10">
        <button onClick={handleGoBackToLogin} className="inline-flex items-center text-[#4BEEA2] hover:text-green-400 transition-colors">
          <ChevronLeft className="w-7 h-7 mr-2" />
          <p className="text-[#ffffff]">Go Back</p>
        </button>
      </div>

      {/* Central Content */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">{renderStep()}</div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
