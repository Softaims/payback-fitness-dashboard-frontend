import { useState, useEffect } from "react";
import { X, Check, Lock, ChevronLeft } from "lucide-react";
import customToast from "../../lib/toast";
import api from "../../lib/apiClient";
import { useSubscriptionPlansStore } from "../../store/subscriptionPlansStore";
import Crown from "../../../public/icons/Crown";
const SubscriptionModal = ({ isOpen, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const { plans, plansLoading, fetchSubscriptionPlans } = useSubscriptionPlansStore();

  const features = [
    {
      title: "Join Groups",
      description: "Access all of the groups that you've joined and participate in that joined group",
    },
    {
      title: "Create Your Own Group",
      description: "Now you can create your own group and then invite your all friends to that group",
    },
    {
      title: "Activity Notifications",
      description: "Now you can get notified on every step in your fitness journey with your friends",
    },
    {
      title: "Access Group Progress",
      description: "See how every person in your group is doing",
    },
  ];

  console.log("plan", plans);
  useEffect(() => {
    if (isOpen && !plans) {
      fetchSubscriptionPlans();
    }
  }, [isOpen, fetchSubscriptionPlans, plans]);

  useEffect(() => {
    if (plans?.length > 0 && !selectedPlan) {
      setSelectedPlan(plans[0].id);
    }
  }, [plans, selectedPlan]);

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const handleContinue = async () => {
    if (!selectedPlan) {
      customToast.error("Please select a plan");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(
        "/api/subscription/checkout",
        {
          planId: selectedPlan,
        },
        {
          isProtected: true,
        }
      );
      window.location.href = response?.data?.checkoutUrl;
    } catch (error) {
      console.error("Subscription failed:", error);
      if (error?.message) {
        customToast.error(error.message);
      } else {
        customToast.error("Failed to activate subscription. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/30 flex items-center justify-center z-50 p-0 md:p-4">
      <div className="bg-[#0B0F0D] rounded-none md:rounded-xl max-w-none md:max-w-[90%] w-full max-h-none md:max-h-[95%] overflow-y-auto h-full md:h-auto">
        {/* Header with Back Button (Mobile) and Close Button (Desktop) */}
        <div className="flex justify-between items-center p-4">
          {/* Mobile Back Button */}
          <button onClick={onClose} className="md:hidden inline-flex items-center text-[#4BEEA2] hover:text-green-400 transition-colors">
            <ChevronLeft className="w-7 h-7 mr-2" />
            <p className="text-[#ffffff]">Go Back</p>
          </button>

          {/* Desktop Close Button */}
          <button onClick={onClose} className="hidden md:flex bg-white cursor-pointer w-8 h-8 rounded-full items-center justify-center transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex flex-col lg:flex-row">
          {/* Left Section - Features */}
          <div className="flex-1 p-8">
            <div className="w-full max-w-lg mx-auto lg:mx-0">
              {/* Crown Icon */}
              <div className="mb-3">
                <Crown className="ml-[-10px] w-14 h-14 text-[#4BEEA2]" />
              </div>

              {/* Title */}
              <div className="mb-8">
                <h1 className="text-white text-3xl font-bold mb-2">
                  Experience <span className="text-[#4BEEA2]">Unlimited</span> Features
                </h1>
                <p className="text-[#ffffff]/50 text-sm">Enjoy PayBack Fitness fully with all our app has to offer</p>
              </div>

              {/* Features List */}
              <div>
                <h2 className="text-white text-xl font-bold mb-6">Features Include:</h2>
                <div className="space-y-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-4 h-4 rounded-full bg-[#4BEEA2] flex items-center justify-center mr-3 flex-shrink-0">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <div>
                        <h3 className="text-white text-sm font-medium mb-1">{feature.title}</h3>
                        <p className="text-[#ffffff]/50 text-xs leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Plan Selection */}
          <div className="flex-1 p-8">
            <div className="w-full max-w-md mx-auto lg:mx-0">
              {/* Title */}
              <div className="mb-8 text-left">
                <h2 className="text-white text-3xl font-bold mb-2">Choose Plan</h2>
              </div>

              {/* Plan Selection */}
              <div className="space-y-4 mb-20">
                {plansLoading ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border-2 border-[#FFFFFF]/7 bg-[#FFFFFF]/5 animate-pulse">
                      <div className="h-6 w-20 bg-[#ffffff]/10 rounded mb-2"></div>
                      <div className="h-4 w-24 bg-[#ffffff]/10 rounded"></div>
                    </div>
                    <div className="p-4 rounded-lg border-2 border-[#FFFFFF]/7 bg-[#FFFFFF]/5 animate-pulse">
                      <div className="h-6 w-16 bg-[#ffffff]/10 rounded mb-2"></div>
                      <div className="h-4 w-20 bg-[#ffffff]/10 rounded"></div>
                    </div>
                  </div>
                ) : (
                  plans?.map((plan) => (
                    <div
                      key={plan.id}
                      onClick={() => handlePlanSelect(plan.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedPlan === plan.id ? "border-[#4BEEA2] bg-[#4BEEA2]/10" : "border-[#FFFFFF]/7 bg-[#FFFFFF]/5 hover:border-[#FFFFFF]/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white text-lg font-medium">{plan.name}</h3>
                          <p className="text-[#ffffff]/50 text-sm">
                            <span className="text-2xl text-[#4BEEA2]">
                              ${Math.floor(plan.amount)}
                              <span className="text-2xl">.{(plan.amount % 1).toFixed(2).slice(2)}</span>
                            </span>{" "}
                            <span className="text-xs">/Billed {plan.name}</span>
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedPlan === plan.id ? "border-[#4BEEA2]" : "border-[#ffffff]/50"
                          }`}
                        >
                          {selectedPlan === plan.id && <div className="w-2 h-2 rounded-full bg-[#4BEEA2]"></div>}
                        </div>
                      </div>
                    </div>
                  ))
                )}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
