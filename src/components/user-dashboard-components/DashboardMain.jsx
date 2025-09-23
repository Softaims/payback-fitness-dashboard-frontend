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
    </div>
  );
};

export default DashboardMain;
