import { useState } from "react";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import customToast from "../../lib/toast";

const OnboardingSubscriptionPlanSelection = () => {
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const plans = [
    {
      id: "monthly",
      name: "Monthly",
      price: "$5.00",
      billing: "Billed Monthly",
      selected: selectedPlan === "monthly",
    },
    {
      id: "yearly",
      name: "Yearly",
      price: "$50.00",
      billing: "Billed Yearly",
      selected: selectedPlan === "yearly",
    },
  ];

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const handleContinue = async () => {
    setLoading(true);
    try {
      // Simulate API call for subscription
      await new Promise((resolve) => setTimeout(resolve, 1000));
      customToast.success("Subscription activated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Subscription failed:", error);
      customToast.error("Failed to activate subscription. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <div className="flex-1 lg:flex-1 mt-20 flex items-center justify-center lg:justify-start pl-8 lg:pl-20">
      <div className="w-full max-w-md">
        {/* Title */}
        <div className="mb-8 text-left">
          <h2 className="text-white text-3xl font-bold mb-2">Choose Plan</h2>
        </div>

        {/* Plan Selection */}
        <div className="space-y-4 mb-20">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => handlePlanSelect(plan.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                plan.selected ? "border-[#4BEEA2] bg-[#4BEEA2]/10" : "border-[#FFFFFF]/7 bg-[#FFFFFF]/5 hover:border-[#FFFFFF]/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white text-lg font-medium">{plan.name}</h3>
                  <p className="text-[#ffffff]/50 text-sm">
                    {plan.price} /{plan.billing}
                  </p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${plan.selected ? "border-[#4BEEA2]" : "border-[#ffffff]/50"}`}>
                  {plan.selected && <div className="w-2 h-2 rounded-full bg-[#4BEEA2]"></div>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Security Message */}
        <div className="flex items-start mb-8">
          <Lock className="w-7 h-7 text-[#ffffff]/50 mr-2" />
          <p className="text-[#ffffff]/50 text-xs">
            Guaranteed to be safe & secure, ensuring that all transactions are protected with the highest level of security.
          </p>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={loading}
          className={`w-full font-bold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 bg-[#4BEEA2] ${
            loading ? "cursor-not-allowed" : "cursor-pointer hover:bg-[#3dd48a]"
          }`}
        >
          {loading ? "Processing..." : "Continue"}
        </button>

        {/* Skip Link */}
        <div className="text-center mt-4">
          <button onClick={handleSkip} className="text-[#4BEEA2] hover:text-green-400 text-sm font-medium transition-colors">
            Will Subscribe Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSubscriptionPlanSelection;
