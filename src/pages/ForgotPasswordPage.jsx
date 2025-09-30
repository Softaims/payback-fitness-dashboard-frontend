import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import ForgotPasswordStep1 from "../components/forgot-password-component/ForgotPasswordStep1";
import ForgotPasswordStep2 from "../components/forgot-password-component/ForgotPasswordStep2";
import { useNavigate } from "react-router-dom";
const ForgotPasswordPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const handleNext = () => {
    if (currentStep === 2) {
      navigate("/reset-password");
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleGoBackToLogin = () => {
    navigate("/login");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ForgotPasswordStep1 onNext={handleNext} userEmail={userEmail} setUserEmail={setUserEmail} />;
      case 2:
        return <ForgotPasswordStep2 userEmail={userEmail} onNext={handleNext} />;
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

export default ForgotPasswordPage;
