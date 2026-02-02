import { ChevronLeft } from "lucide-react";
import OnboardingSubscriptionFeatures from "../components/onboarding-subscription/OnboardingSubscriptionFeatures";
import OnboardingSubscriptionPlanSelection from "../components/onboarding-subscription/OnboardingSubscriptionPlanSelection";
import { useNavigate } from "react-router-dom";
import { useSubscriptionPlansStore } from "../store/subscriptionPlansStore";
import { useEffect } from "react";
const OnboardingSubscriptionPage = () => {
  const navigate = useNavigate();
  const { fetchSubscriptionPlans, plans } = useSubscriptionPlansStore();

  useEffect(() => {
    if (!plans) {
      fetchSubscriptionPlans();
    }
  }, [fetchSubscriptionPlans, plans]);
  const handleGoBack = () => {
    navigate("/onboarding-referral-code");
  };

  return (
    <div className="min-h-screen relative">
      {/* Go Back Link - Fixed to top left */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10">
        <button onClick={handleGoBack} className=" cursor-pointer inline-flex items-center text-[#4BEEA2] hover:text-green-400 transition-colors">
          <ChevronLeft className="w-7 h-7 mr-2" />
          <p className="text-[#ffffff]">Go Back</p>
        </button>
      </div>

      {/* Main Content Container */}
      <div className="min-h-screen flex flex-col md:justify-around md:flex-row">
        {/* Left Section - Features */}
        <OnboardingSubscriptionFeatures />

        {/* Right Section - Plan Selection */}
        <OnboardingSubscriptionPlanSelection />
      </div>
    </div>
  );
};

export default OnboardingSubscriptionPage;
