import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Check, Lock, ChevronLeft } from "lucide-react";
import customToast from "../../../shared/lib/toast";
import api from "../../../shared/lib/apiClient";
import { useSubscriptionPlansStore } from "../../store/subscriptionPlansStore";
import Crown from "../../../../public/icons/Crown";

const SubscriptionModal = ({ isOpen, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const { plans, plansLoading, fetchSubscriptionPlans } = useSubscriptionPlansStore();

  const features = [
    { title: "Unlock Access to a joined group" },
    { title: "Establish your exclusive group" },
    { title: "Real-time user activity notifications" },
    { title: "Seamless tracking of team member's progress" },
  ];

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
      const response = await api.post("/api/subscription/checkout", { planId: selectedPlan }, { isProtected: true });
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

  const ContinueButton = () => (
    <button
      onClick={handleContinue}
      disabled={loading}
      className={`w-full font-semibold py-3 px-4 rounded-[30px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
        loading ? "bg-[#6d6262ff] cursor-not-allowed" : "bg-[#4BEEA2] cursor-pointer hover:bg-[#3dd48a]"
      }`}
    >
      {loading ? "Processing..." : "Continue"}
    </button>
  );

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/85 md:bg-white/30 md:backdrop-blur-sm md:flex md:items-center md:justify-center md:p-4">
      {/*
        Mobile  → full-screen card: flex-col  [sticky header | scrollable body | sticky footer]
        Desktop → centered card:    max-w / max-h, content scrolls inside if needed
      */}
      <div className="h-full w-full flex flex-col bg-[#0B0F0D] md:rounded-xl md:max-w-[90%] md:max-h-[95%] relative">
        {/* ── Mobile sticky header ── */}
        <div className="flex-none flex md:hidden items-center justify-between px-6 py-4 bg-[#0B0F0D] border-b border-white/5 sticky top-0 z-50">
          <button onClick={onClose} className="inline-flex items-center text-[#4BEEA2] hover:text-green-400 transition-colors">
            <ChevronLeft className="w-6 h-6 mr-1" />
            <span className="text-white font-medium">Go Back</span>
          </button>
        </div>

        {/* ── Desktop close button ── */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 hidden md:flex bg-white cursor-pointer w-8 h-8 rounded-full items-center justify-center transition-colors z-50"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ── Scrollable content area ──
             min-h-0 is required so a flex child can actually shrink & scroll */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="flex flex-col md:flex-row md:justify-center md:pt-16">
            {/* Left – Features */}
            <div className="p-6 md:p-8">
              <div className="mx-auto lg:mx-0">
                {/* Crown Icon */}
                <div className="mb-3">
                  <Crown className="ml-[-10px] w-14 h-14 text-[#4BEEA2]" />
                </div>

                {/* Title */}
                <div className="mb-8">
                  <h1 className="text-white text-3xl font-bold mb-2">
                    Experience <span className="text-[#4BEEA2]">Unlimited</span> Features
                  </h1>
                  <p className="text-white/50 text-sm">Enjoy PayBack Fitness fully with all our app has to offer</p>
                </div>

                {/* Features list */}
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
                          {feature.description && <p className="text-white/50 text-xs leading-relaxed">{feature.description}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right – Plan selection */}
            <div className="p-6 md:p-8 pb-6">
              <div className="w-full max-w-md mx-auto lg:mx-0">
                {/* Title */}
                <div className="mb-8 text-left">
                  <h2 className="text-white text-3xl font-bold mb-2">Choose Plan</h2>
                </div>

                {/* Plans */}
                <div className="space-y-4 mb-8">
                  {plansLoading ? (
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg border-2 border-white/5 bg-white/5 animate-pulse">
                        <div className="h-6 w-20 bg-white/10 rounded mb-2" />
                        <div className="h-4 w-24 bg-white/10 rounded" />
                      </div>
                      <div className="p-4 rounded-lg border-2 border-white/5 bg-white/5 animate-pulse">
                        <div className="h-6 w-16 bg-white/10 rounded mb-2" />
                        <div className="h-4 w-20 bg-white/10 rounded" />
                      </div>
                    </div>
                  ) : (
                    plans?.map((plan) => (
                      <div
                        key={plan.id}
                        onClick={() => handlePlanSelect(plan.id)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedPlan === plan.id ? "border-[#4BEEA2] bg-[#4BEEA2]/10" : "border-white/10 bg-white/5 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-white text-lg font-medium">{plan.name}</h3>
                            <p className="text-white/50 text-sm">
                              <span className="text-2xl text-[#4BEEA2]">
                                ${Math.floor(plan.amount)}
                                <span className="text-2xl">.{(plan.amount % 1).toFixed(2).slice(2)}</span>
                              </span>{" "}
                              <span className="text-xs">/Billed {plan.name}</span>
                            </p>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              selectedPlan === plan.id ? "border-[#4BEEA2]" : "border-white/50"
                            }`}
                          >
                            {selectedPlan === plan.id && <div className="w-2 h-2 rounded-full bg-[#4BEEA2]" />}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Security message */}
                <div className="flex items-start mb-8">
                  <Lock className="w-7 h-7 text-white/50 mr-2 flex-shrink-0" />
                  <p className="text-white/50 text-xs">
                    Guaranteed to be safe & secure, ensuring that all transactions are protected with the highest level of security.
                  </p>
                </div>

                {/* Continue button – desktop only (mobile gets the sticky footer below) */}
                <div className="hidden md:block">
                  <ContinueButton />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile sticky footer with Continue button ──
             Always visible at the bottom; user never needs to scroll to find it */}
        <div className="flex-none md:hidden px-6 py-4 bg-[#0B0F0D] border-t border-white/5">
          <ContinueButton />
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default SubscriptionModal;
