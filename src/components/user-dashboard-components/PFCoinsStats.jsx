import { DollarSign, FileText } from "lucide-react";

const PFCoinsStats = ({ availableCoins = 0, totalPurchased = 0, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Want More PF Coins Banner */}
        <div className="overflow-hidden rounded-xl bg-[#4BEEA2] flex flex-row items-end lg:col-span-2">
          <div className="p-4 relative overflow-hidden">
            <div className="z-10 max-w-md">
              <div className="h-6 bg-white/20 rounded mb-2 animate-pulse"></div>
              <div className="h-4 bg-white/20 rounded mb-4 animate-pulse"></div>
              <div className="h-10 bg-black/20 rounded-lg animate-pulse"></div>
            </div>
          </div>
          <div>
            <img src="/images/PFCoins.png" alt="PayBack Fitness Logo" />
          </div>
        </div>

        {/* Available Coins Skeleton */}
        <div className="bg-[#ffffff]/7 rounded-xl p-6">
          <div className="flex flex-col justify-between h-40">
            <div className="p-1 border-1 border-[#ffffff]/50 rounded-full w-fit">
              <DollarSign className="w-6 h-6 text-[#ffffff]/50" />
            </div>
            <div>
              <div className="h-8 bg-[#ffffff]/10 rounded mb-2 animate-pulse"></div>
              <div className="h-4 bg-[#ffffff]/10 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Total Purchased Skeleton */}
        <div className="bg-[#ffffff]/7 rounded-xl p-6">
          <div className="flex flex-col justify-between h-40">
            <div className="p-1 border-1 border-[#ffffff]/50 rounded-full w-fit">
              <FileText className="w-6 h-6 text-[#ffffff]/50" />
            </div>
            <div>
              <div className="h-8 bg-[#ffffff]/10 rounded mb-2 animate-pulse"></div>
              <div className="h-4 bg-[#ffffff]/10 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
      {/* Want More PF Coins Banner */}
      <div className="overflow-hidden rounded-xl bg-[#4BEEA2] flex flex-row items-end lg:col-span-2">
        <div className="p-4 relative overflow-hidden">
          <div className="z-10 max-w-md">
            <h2 className="text-xl font-bold mb-2">Want more PF Coins?</h2>
            <p className="text-sm mb-4">Use purchased coins to join groups and create new challenges</p>
            <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">Buy PF Coins</button>
          </div>
        </div>
        <div>
          <img src="/images/PFCoins.png" alt="PayBack Fitness Logo" />
        </div>
      </div>

      {/* Available PF Coins */}
      <div className="bg-[#ffffff]/7 rounded-xl p-6">
        <div className="flex flex-col justify-between h-40">
          <div className="p-1 border-1 border-[#ffffff]/50 rounded-full w-fit">
            <DollarSign className="w-6 h-6 text-[#ffffff]/50" />
          </div>
          <div>
            <div>
              <span className="text-3xl font-bold text-[#4BEEA2]">{availableCoins}</span>
              <span className="text-sm ml-1 text-white">PF</span>
            </div>
            <p className="text-[#ffffff]/50 text-sm">Available PF Coins</p>
          </div>
        </div>
      </div>

      {/* Total Purchased PF Coins */}
      <div className="bg-[#ffffff]/7 rounded-xl p-6">
        <div className="flex flex-col justify-between h-40">
          <div className="p-1 border-1 border-[#ffffff]/50 rounded-full w-fit">
            <FileText className="w-6 h-6 text-[#ffffff]/50" />
          </div>
          <div>
            <div>
              <span className="text-3xl font-bold text-[#4BEEA2]">{totalPurchased}</span>
              <span className="text-sm text-white ml-1">PF</span>
            </div>
            <p className="text-[#ffffff]/50 text-sm">Total Purchased PF Coins</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PFCoinsStats;
