import { Crown } from "lucide-react";
import { useEffect } from "react";
import { useSubscriptionStore } from "../../store/subscriptionStore";

const ManageSubscriptionSection = () => {
  const { subscription, subscriptionLoading, fetchCurrentSubscription } = useSubscriptionStore();

  useEffect(() => {
    fetchCurrentSubscription();
  }, [fetchCurrentSubscription]);

  console.log("subscription", subscription);

  return (
    <div>
      <div className=" mb-8">
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
        ) : subscription ? (
          <div className="rounded-xl p-8 mb-8 bg-[#ffffff]/7">
            {/* Top Section - Plan Details and Price */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-semibold text-white">Current Plan</h3>
                <span className="bg-[#4BEEA2] text-black px-3 py-1 rounded-full text-sm font-medium">{subscription.planType || "Monthly"}</span>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-[#4BEEA2]">${subscription.price || "5.00"}</div>
                <div className="text-[#ffffff]/50 text-sm">/Billed {subscription.billingCycle || "Monthly"}</div>
              </div>
            </div>

            <p className="text-[#ffffff]/50 mb-4 leading-relaxed">
              {subscription.description ||
                "Enjoy unlimited access with your monthly plan. Your subscription will automatically renew each month unless you cancel."}
            </p>

            <p className="text-[#ffffff]/50 mb-6">
              Next Subscription Renewal Date: <span className="text-white font-medium">{subscription.nextRenewalDate || "Apr 10, 2025"}</span>
            </p>

            {/* Horizontal Divider */}
            <div className="border-t border-[#ffffff]/20 mb-6"></div>

            {/* Bottom Section - Action */}
            <div className="flex items-center justify-between">
              <p className="text-[#ffffff]/50">Renew, cancel or change your subscription Plan</p>
              <button className="bg-[#4BEEA2] hover:bg-[#3DD18A] text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
                <Crown className="w-4 h-4" />
                Manage Subscriptions
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-xl p-8 mb-8 flex flex-col items-center justify-center py-12">
            <img src="/images/NoSubscription.png" alt="No Subscription" className="w-32 h-32 mb-6" />
            <p className="text-white text-lg mb-4">No subscription plan added yet!</p>
            <button className="text-[#4BEEA2] text-lg underline hover:text-[#3DD18A] transition-colors">Subscribe Now</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageSubscriptionSection;
