const AppDownloadSection = () => {
  return (
    <div className="bg-[#4BEEA2] rounded-2xl text-black">
      <div className="flex flex-col items-center xl:flex-row xl:items-end justify-between gap-8">
        <div className="flex-1 p-6">
          <h1 className="text-3xl xl:text-4xl font-bold mb-2 leading-tight">
            Get PayBack for Your <br /> Workouts
          </h1>
          <p className="text-lg mb-6 font-semibold opacity-90 leading-relaxed">
            Log your progress, join fitness challenges, and earn real rewards. Available now on iOS and Android.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Google Play Button */}
            <button className="bg-black cursor-pointer text-white px-6 py-3 rounded-lg flex items-center gap-3 transition-colors font-medium">
              <img src="/images/Playstore.svg" alt="Google Play" className="w-8 h-8" />
              <div className="flex flex-col items-start">
                <span className="text-[11px] uppercase">GET IT ON</span>
                <span className="text-lg font-semibold">Google Play</span>
              </div>
            </button>

            {/* App Store Button */}
            <button className="bg-black cursor-pointer text-white px-6 py-3 rounded-lg flex items-center gap-3 transition-colors font-medium">
              <img src="/images/Apple.svg" alt="App Store" className="w-9 h-9" />
              <div className="flex flex-col items-start">
                <span className="text-[11px]">Download On the</span>
                <span className="text-lg font-semibold">App Store</span>
              </div>
            </button>
          </div>
        </div>

        {/* Right Side - Mobile App Preview */}
        <div>
          <img src="/images/MobileImage.svg" alt="Mobile App Preview" className="xl:mr-10 rounded-2xl shadow-2xl" />
        </div>
      </div>
    </div>
  );
};

export default AppDownloadSection;
