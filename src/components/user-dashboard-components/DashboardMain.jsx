const DashboardMain = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Promotional Banner */}
      <div className="bg-green-500 rounded-lg p-8 text-white">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="flex-1 mb-6 lg:mb-0">
            <h1 className="text-3xl font-bold mb-4">Start Your Fitness Journey With Your Friends - Download the Mobile App</h1>
            <p className="text-lg mb-6 opacity-90">
              Stay accountable, track your workouts, and join your fitness group anytime, anywhere. Available now on iOS and Android.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-black bg-opacity-20 hover:bg-opacity-30 px-6 py-3 rounded-lg flex items-center gap-3 transition-colors">
                <div className="w-6 h-6 bg-white rounded"></div>
                <span className="font-medium">GET IT ON Google Play</span>
              </button>
              <button className="bg-black bg-opacity-20 hover:bg-opacity-30 px-6 py-3 rounded-lg flex items-center gap-3 transition-colors">
                <div className="w-6 h-6 bg-white rounded"></div>
                <span className="font-medium">Download On the App Store</span>
              </button>
            </div>
          </div>

          {/* Mobile App Previews */}
          <div className="flex gap-4">
            <div className="w-32 h-48 bg-gray-800 rounded-2xl p-3">
              <div className="bg-gray-700 rounded-lg h-full p-3 text-xs">
                <h3 className="text-white font-semibold mb-2">Your Weekly Stats</h3>
                <div className="space-y-2 text-gray-300">
                  <div>12 Total Workout Logged</div>
                  <div>60 Mins Total Workouts</div>
                  <div className="bg-green-500 text-white px-2 py-1 rounded text-xs">You are on a streak</div>
                </div>
              </div>
            </div>
            <div className="w-32 h-48 bg-gray-800 rounded-2xl p-3">
              <div className="bg-gray-700 rounded-lg h-full p-3 text-xs">
                <h3 className="text-white font-semibold mb-2">Your Fitness Partner</h3>
                <div className="flex gap-1 mb-2">
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">Details</span>
                  <span className="text-gray-400 px-2 py-1 text-xs">Progress</span>
                  <span className="text-gray-400 px-2 py-1 text-xs">Workouts</span>
                </div>
                <div className="space-y-2 text-gray-300">
                  <div>06/06 Total Workouts</div>
                  <div>120 Mins Workout Time</div>
                  <div className="text-green-400">+20PF Score</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Manage Subscriptions Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Subscriptions</h2>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-gray-600 font-medium">Current Plan</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Monthly</span>
          </div>

          <p className="text-gray-600">Enjoy all features for one month then you have to renew your plan.</p>

          <div className="text-2xl font-bold text-gray-800">$5.00 /Billed Monthly</div>

          <div className="text-gray-600">Next Subscription Renewal Date: Apr 10, 2025</div>

          <div className="pt-4">
            <p className="text-gray-600 mb-4">Renew, cancel or change your subscription Plan.</p>
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Manage Subscritpions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
