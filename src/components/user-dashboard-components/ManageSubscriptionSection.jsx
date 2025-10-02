import { useEffect, useState } from "react";
import { useSubscriptionStore } from "../../store/subscriptionStore";
import SubscriptionModal from "./SubscriptionModal";
import api from "../../lib/apiClient";
import customToast from "../../lib/toast";
import Crown from "../../../public/icons/Crown";

const ManageSubscriptionSection = () => {
  const { subscription, subscriptionLoading, fetchCurrentSubscription } = useSubscriptionStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    if (!subscription) {
      fetchCurrentSubscription();
    }
  }, [fetchCurrentSubscription, subscription]);

  const handleSubscribeNow = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleManageSubscription = async () => {
    setPortalLoading(true);
    try {
      const response = await api.post("/api/subscription/portal", {}, { isProtected: true });
      window.location.href = response?.data?.portalUrl;
    } catch (error) {
      console.error("Portal access failed:", error);
      if (error?.message) {
        customToast.error(error.message);
      } else {
        customToast.error("Failed to access subscription portal. Please try again.");
      }
    } finally {
      setPortalLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white mb-4">Manage Subscriptions</h2>
      </div>

      {/* Current Plan Card */}
      <div>
        {subscriptionLoading ? (
          <div className="rounded-xl p-8 mb-8 bg-[#ffffff]/7 animate-pulse">
            {/* Top Section - Plan Details and Price Skeleton */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-6 w-24 bg-[#ffffff]/10 rounded"></div>
                <div className="h-6 w-16 bg-[#ffffff]/10 rounded-full"></div>
              </div>
              <div className="text-right">
                <div className="h-10 w-20 bg-[#ffffff]/10 rounded mb-1"></div>
                <div className="h-4 w-24 bg-[#ffffff]/10 rounded"></div>
              </div>
            </div>

            {/* Description Skeleton */}
            <div className="space-y-2 mb-4">
              <div className="h-4 w-full bg-[#ffffff]/10 rounded"></div>
              <div className="h-4 w-3/4 bg-[#ffffff]/10 rounded"></div>
            </div>

            {/* Renewal Date Skeleton */}
            <div className="h-4 w-2/3 bg-[#ffffff]/10 rounded mb-6"></div>

            {/* Horizontal Divider */}
            <div className="border-t border-[#ffffff]/20 mb-6"></div>

            {/* Bottom Section - Action Skeleton */}
            <div className="flex items-center justify-between">
              <div className="h-4 w-64 bg-[#ffffff]/10 rounded"></div>
              <div className="h-12 w-40 bg-[#ffffff]/10 rounded-lg"></div>
            </div>
          </div>
        ) : subscription?.planName ? (
          <div className="rounded-xl p-8 mb-8 bg-[#ffffff]/7">
            {/* Top Section - Plan Details and Price */}
            <div className="flex flex-col items-start justify-start md:flex-row md:items-start md:justify-between mb-6">
              <div className="flex items-center gap-3 mb-4 md:mb-0">
                <h3 className="text-lg md:text-xl font-semibold text-white">Current Plan</h3>
                <span className="bg-[#4BEEA2]/10 text-[#4BEEA2] px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                  {subscription.planName || "Monthly"}
                </span>
              </div>
              <p className="block md:hidden text-xs text-[#ffffff]/50 mb-4 leading-relaxed">
                {subscription.description ||
                  "Enjoy unlimited access with your monthly plan. Your subscription will automatically renew each month unless you cancel."}
              </p>
              <div className="flex flex-row items-end">
                <div className="text-4xl font-bold text-[#4BEEA2]">${subscription.planAmount || "5.00"}</div>
                <div className="text-[#ffffff]/50 text-xs md:text-sm mb-1 ml-1">/Billed {subscription.planName || "Monthly"}</div>
              </div>
            </div>

            <p className="hidden md:block text-[#ffffff]/50 mb-4 leading-relaxed">
              {subscription.description ||
                "Enjoy unlimited access with your monthly plan. Your subscription will automatically renew each month unless you cancel."}
            </p>

            <div className="mb-6">
              <p className="text-xs md:text-sm text-[#ffffff]/50 mb-2">Next Subscription Renewal Date:</p>
              <p className="text-xs md:text-sm text-white font-medium">
                {subscription.currentPeriodEnd
                  ? new Date(subscription.currentPeriodEnd).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : ""}
              </p>
            </div>

            {/* Horizontal Divider */}
            <div className="border-t border-[#ffffff]/20 mb-6"></div>

            {/* Bottom Section - Action */}
            <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between gap-4">
              <p className="text-xs md:text-sm text-white md:text-[#ffffff]/50">Renew, cancel or change your subscription Plan</p>
              <button
                onClick={handleManageSubscription}
                disabled={portalLoading}
                className={`bg-[#4BEEA2] hover:bg-[#3DD18A] text-black text-xs md:text-sm font-semibold px-3 md:px-6 py-2 md:py-3 rounded-[30px] flex items-center justify-center gap-2 transition-colors md:w-auto ${
                  portalLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer"
                }`}
              >
                <Crown className="font-bold w-6 h-6" />
                {portalLoading ? "Processing..." : "Manage Subscriptions"}
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-xl p-8 mb-8 flex flex-col items-center justify-center py-12">
            <img src="/images/NoSubscription.svg" alt="No Subscription" className="mb-6" />
            <p className="text-white text-md md:text-lg mb-4">No subscription plan added yet!</p>
            <button onClick={handleSubscribeNow} className="cursor-pointer text-[#4BEEA2] text-lg underline hover:text-[#3DD18A] transition-colors">
              Subscribe Now
            </button>
          </div>
        )}
      </div>

      {/* Subscription Modal */}
      <SubscriptionModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default ManageSubscriptionSection;
