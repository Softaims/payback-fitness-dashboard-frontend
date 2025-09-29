import DashboardLayout from "../components/dashboard-components/DashboardLayout";

const ManageSubscriptionsPage = () => {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#0B0F0D] p-6">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-white mb-8">Manage Subscriptions</h1>

          {/* Current Plan Card */}
          <div className="bg-[#1A1A1A] rounded-2xl p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              {/* Left Side - Plan Details */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-xl font-semibold text-white">Current Plan</h2>
                  <span className="bg-[#4BEEA2] text-black px-3 py-1 rounded-full text-sm font-medium">Monthly</span>
                </div>

                <p className="text-gray-400 mb-6 leading-relaxed">
                  Enjoy unlimited access with your monthly plan. Your subscription will automatically renew each month unless you cancel.
                </p>

                <p className="text-gray-400 mb-2">
                  Next Subscription Renewal Date: <span className="text-white font-medium">Apr 10, 2025</span>
                </p>

                <p className="text-gray-400 text-sm">Renew, cancel or change your subscription Plan</p>
              </div>

              {/* Right Side - Price and Action */}
              <div className="flex flex-col items-end gap-6">
                <div className="text-right">
                  <div className="text-4xl font-bold text-[#4BEEA2]">$5.00</div>
                  <div className="text-gray-400 text-sm">/Billed Monthly</div>
                </div>

                <button className="bg-[#4BEEA2] hover:bg-[#3DD18A] text-black font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L3 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 00.372 1.364l.23.132-.23.132a1 1 0 00.992 1.736L17 7.723V8a1 1 0 102 0V6a.996.996 0 00-.52-.878l-1.734-.99a1 1 0 00-1.364.372z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Manage Subscriptions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageSubscriptionsPage;
