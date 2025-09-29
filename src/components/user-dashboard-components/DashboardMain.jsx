import { Crown } from "lucide-react";

const DashboardMain = () => {
  return (
    <div className="min-h-screen bg-[#0B0F0D] p-6 space-y-6">
      <div className="bg-[#4BEEA2] rounded-2xl text-black">
        <div className="flex flex-col items-center xl:flex-row xl:items-end justify-between gap-8">
          <div className="flex-1 p-8">
            <h1 className="text-3xl xl:text-4xl font-bold mb-4 leading-tight">Start Your Fitness Journey With Your Friends - Download the Mobile App</h1>
            <p className="text-lg mb-6 opacity-90 leading-relaxed">
              Stay accountable, track your workouts, and join your fitness group anytime, anywhere. Available now on iOS and Android.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Google Play Button */}
              <button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center gap-3 transition-colors font-medium">
                <img src="/images/Playstore.png" alt="Google Play" className="w-8 h-8" />
                <div className="flex flex-col items-start">
                  <span className="text-xs uppercase">GET IT ON</span>
                  <span className="text-sm font-semibold">Google Play</span>
                </div>
              </button>

              {/* App Store Button */}
              <button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center gap-3 transition-colors font-medium">
                <img src="/images/Apple.png" alt="App Store" className="w-9 h-9" />
                <div className="flex flex-col items-start">
                  <span className="text-xs">Download On the</span>
                  <span className="text-sm font-semibold">App Store</span>
                </div>
              </button>
            </div>
          </div>

          {/* Right Side - Mobile App Preview */}
          <div>
            <img src="/images/MobileImage.png" alt="Mobile App Preview" className=" rounded-2xl shadow-2xl" />
          </div>
        </div>
      </div>

      {/* Manager Subscription Section */}
      <div>
        <div className=" mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Manage Subscriptions</h2>
        </div>

        {/* Current Plan Card */}
        <div className="bg-[#ffffff]/7 rounded-xl p-8 mb-8">
          {/* Top Section - Plan Details and Price */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-semibold text-white">Current Plan</h3>
              <span className="bg-[#4BEEA2]/10 text-[#4BEEA2] px-3 py-1 rounded-full text-sm font-medium">Monthly</span>
            </div>
            <div className="text-right flex flex-row items-end">
              <div className="text-4xl font-bold text-[#4BEEA2]">$5.00</div>
              <div className="text-[#ffffff]/50 text-sm mb-1.5 ml-1">/Billed Monthly</div>
            </div>
          </div>

          <p className="text-sm text-[#ffffff]/50 mb-4 leading-relaxed">
            Enjoy unlimited access with your monthly plan. Your subscription will automatically renew each month unless you cancel.
          </p>

          <p className="text-sm text-[#ffffff]/50 mb-6">
            Next Subscription Renewal Date: <span className="text-white font-medium">Apr 10, 2025</span>
          </p>

          {/* Horizontal Divider */}
          <div className="border-t border-[#ffffff]/20 mb-6"></div>

          {/* Bottom Section - Action */}
          <div className="flex items-center justify-between">
            <p className="text-[#ffffff]">Renew, cancel or change your subscription Plan</p>
            <button className="bg-[#4BEEA2] hover:bg-[#3DD18A] text-black font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
              <Crown className="w-6 h-6" />
              Manage Subscriptions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
