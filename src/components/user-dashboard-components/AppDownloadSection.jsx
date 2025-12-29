const AppDownloadSection = () => {
  return (
    <div className="bg-[#4BEEA2] rounded-2xl text-black">
      <div className="flex flex-col items-center xl:flex-row xl:items-end justify-between gap-8">
        <div className="flex-1 p-6">
          <h1 className="text-2xl md:text-3xl text-center md:text-left xl:text-4xl font-bold mb-2 leading-tight">
            Get PayBack for Your <br /> Workouts
          </h1>
          <p className="text-sm md:text-lg mb-6 font-semibold opacity-90 leading-relaxed">
            Compete with friends in weekly fitness challenges, stay accountable, and earn real rewards while getting fit together!
          </p>
          <div className="flex justify-center md:justify-start flex-row gap-4">
            {/* Google Play Button */}
            <button className="bg-black cursor-pointer text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium">
              <img src="/images/Playstore.svg" alt="Google Play" className="w-4 h-4 md:w-8 md:h-8" />
              <div className="flex flex-col leading-tight">
                <span className="text-[7px] md:text-[11px] uppercase">GET IT ON</span>
                <span className="text-[9px] md:text-lg font-semibold whitespace-nowrap">Google Play</span>
              </div>
            </button>

            <button className="bg-black cursor-pointer text-white px-4 py-2 md:px-6 md:py-3 rounded-lg flex items-center gap-2 md:gap-3 transition-colors font-medium">
              <img src="/images/Apple.svg" alt="App Store" className="w-6 h-6 md:w-8 md:h-8" />
              <div className="flex flex-col items-start">
                <span className="text-[7px] md:text-[12px] uppercase">Download on the</span>
                <span className="text-[9px] md:text-lg font-semibold">App Store</span>
              </div>
            </button>
          </div>
        </div>

        {/* Right Side - Mobile App Preview */}
        <div className="">
          <img src="/images/MobileImage.png" alt="Mobile App Preview" className=" w-[400px] h-[220px] xl:mr-10 rounded-2xl shadow-2xl" />
        </div>
      </div>
    </div>
  );
};

export default AppDownloadSection;
