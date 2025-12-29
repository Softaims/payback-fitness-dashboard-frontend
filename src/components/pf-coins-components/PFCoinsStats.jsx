import { DollarSign, FileText } from "lucide-react";
import { useUserStore } from "../../store/userStore";
import { usePFCoinsStore } from "../../store/pfCoinsStore";
import Dollar from "../../../public/icons/Dollar";
import List from "../../../public/icons/List";
const PFCoinsStats = ({ onPurchaseClick }) => {
  const { user } = useUserStore();
  const { purchaseHistoryLoading, purchaseHistory } = usePFCoinsStore();
  if (purchaseHistoryLoading) {
    return (
      <div className="mb-8">
        {/* Mobile Layout Skeleton (below lg) */}
        <div className="lg:hidden">
          {/* Want More PF Points Banner - Full width */}
          <div className="overflow-hidden rounded-xl bg-gradient-to-r from-[#4BEEA2] to-[#1EA264] flex flex-row items-end mb-6">
            <div className="p-4 relative overflow-hidden">
              <div className="z-10 max-w-md">
                <h2 className="text-xl font-bold mb-2">Want more PF Points?</h2>
                <p className="text-sm mb-4">Use purchased PF Points to join groups and create new challenges</p>
                <div className="h-10 bg-black/20 rounded-lg animate-pulse"></div>
              </div>
            </div>
            <div>
              <img src="/images/PFCoins.svg" className="w-[300px] h-[200px]" alt="PayBack Fitness Logo" />
            </div>
          </div>

          {/* PF Points Stats Skeleton - Side by side (50% each) */}
          <div className="grid grid-cols-2 gap-4">
            {/* Available Coins Skeleton */}
            <div className="bg-[#ffffff]/7 rounded-xl p-6">
              <div className="flex flex-col justify-between h-30">
                <Dollar className="text-[#ffffff]/50 w-8 h-8" />

                <div>
                  <div className="h-8 bg-[#ffffff]/10 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 bg-[#ffffff]/10 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Total Purchased Skeleton */}
            <div className="bg-[#ffffff]/7 rounded-xl p-6">
              <div className="flex flex-col justify-between h-30">
                <List className="text-[#ffffff]/50 w-8 h-8" />

                <div>
                  <div className="h-8 bg-[#ffffff]/10 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 bg-[#ffffff]/10 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout Skeleton (lg and above) - Original layout */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
          {/* Want More PF Points Banner */}
          <div className="overflow-hidden rounded-xl bg-gradient-to-r from-[#4BEEA2] to-[#1EA264] flex flex-row items-end lg:col-span-2">
            <div className="p-4 relative overflow-hidden">
              <div className="z-10 max-w-md">
                <h2 className="text-xl font-bold mb-2">Want more PF Points?</h2>
                <p className="text-sm mb-4">Use purchased PF Points to join groups and create new challenges</p>
                <div className="h-10 bg-black/20 rounded-lg animate-pulse"></div>
              </div>
            </div>
            <div>
              <img src="/images/PFCoins.svg" className="w-[300px] h-[200px]" alt="PayBack Fitness Logo" />
            </div>
          </div>

          {/* Available Coins Skeleton */}
          <div className="bg-[#ffffff]/7 rounded-xl p-6">
            <div className="flex flex-col justify-between h-30">
              <Dollar className="text-[#ffffff]/50 w-8 h-8" />

              <div>
                <div className="h-8 bg-[#ffffff]/10 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-[#ffffff]/10 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Total Purchased Skeleton */}
          <div className="bg-[#ffffff]/7 rounded-xl p-6">
            <div className="flex flex-col justify-between h-30">
              <List className="text-[#ffffff]/50 w-8 h-8" />

              <div>
                <div className="h-8 bg-[#ffffff]/10 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-[#ffffff]/10 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      {/* Mobile Layout (below lg) */}
      <div className="lg:hidden">
        {/* Want More PF Points Banner - Full width */}
        <div className="overflow-hidden rounded-xl bg-gradient-to-r from-[#4BEEA2] to-[#1EA264] flex flex-row items-end mb-6">
          <div className="p-4 relative overflow-hidden">
            <div className="z-10 max-w-md">
              <h2 className="text-md md:text-xl font-bold mb-2">Want more PF Points?</h2>
              <p className="text-sm mb-4">Use purchased PF Points to join groups and create new challenges</p>
              <button onClick={onPurchaseClick} className="cursor-pointer bg-black text-white px-6 py-3 rounded-[30px] font-semibold">
                Buy PF Points
              </button>
            </div>
          </div>
          <div>
            <img src="/images/PFCoins.svg" className="w-[300px] h-[200px]" alt="PayBack Fitness Logo" />
          </div>
        </div>

        {/* PF Points Stats - Side by side (50% each) */}
        <div className="grid grid-cols-2 gap-4">
          {/* Available PF Points */}
          <div className="bg-[#ffffff]/7 rounded-xl p-3">
            <div className="flex flex-col justify-between h-30">
              <Dollar className="text-[#ffffff]/50 w-8 h-8" />

              <div>
                <div>
                  <span className="text-3xl font-bold text-[#4BEEA2]">{user?.pfCoinBalance}</span>
                  <span className="text-sm ml-1 text-white">PF</span>
                </div>
                <p className="text-[#ffffff]/50 text-xs md:text-sm">Available PF Points</p>
              </div>
            </div>
          </div>

          {/* Total Purchased PF Points */}
          <div className="bg-[#ffffff]/7 rounded-xl p-3">
            <div className="flex flex-col justify-between h-30">
              <List className="text-[#ffffff]/50 w-8 h-8" />

              <div>
                <div>
                  <span className="text-3xl font-bold text-[#4BEEA2]">{purchaseHistory?.totalPurchasedCoins}</span>
                  <span className="text-sm text-white ml-1">PF</span>
                </div>
                <p className="text-[#ffffff]/50 text-xs md:text-sm">Total Purchased Points</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout (lg and above) - Original layout */}
      <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
        {/* Want More PF Points Banner */}
        <div className="overflow-hidden rounded-xl bg-gradient-to-r from-[#4BEEA2] to-[#1EA264] flex flex-row items-end lg:col-span-2">
          <div className="p-4 relative overflow-hidden">
            <div className="z-10 max-w-md">
              <h2 className="text-md md:text-xl font-bold mb-2">Want more PF Points?</h2>
              <p className="text-sm mb-4">Use purchased PF Points to join groups and create new challenges</p>
              <button onClick={onPurchaseClick} className="cursor-pointer bg-black text-white px-6 py-3 rounded-[30px] font-semibold">
                Buy PF Points
              </button>
            </div>
          </div>
          <div>
            <img src="/images/PFCoins.svg" className="w-[300px] h-[200px]" alt="PayBack Fitness Logo" />
          </div>
        </div>

        {/* Available PF Points */}
        <div className="bg-[#ffffff]/7 rounded-xl p-6">
          <div className="flex flex-col justify-between h-30">
            <Dollar className="text-[#ffffff]/50 w-8 h-8" />

            <div>
              <div>
                <span className="text-3xl font-bold text-[#4BEEA2]">{user?.pfCoinBalance}</span>
                <span className="text-sm ml-1 text-white">PF</span>
              </div>
              <p className="text-[#ffffff]/50 text-sm">Available PF Points</p>
            </div>
          </div>
        </div>

        {/* Total Purchased PF Points */}
        <div className="bg-[#ffffff]/7 rounded-xl p-6">
          <div className="flex flex-col justify-between h-30">
            <List className="text-[#ffffff]/50 w-8 h-8" />

            <div>
              <div>
                <span className="text-3xl font-bold text-[#4BEEA2]">{purchaseHistory?.totalPurchasedCoins}</span>
                <span className="text-sm text-white ml-1">PF</span>
              </div>
              <p className="text-[#ffffff]/50 text-sm">Total Purchased PF Points</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PFCoinsStats;
