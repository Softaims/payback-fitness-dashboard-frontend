import { DollarSign, FileText, ChevronLeft, ChevronRight } from "lucide-react";

const PFCoinsMain = () => {
  const purchaseHistory = [
    { sr: "01", coins: "100PF", date: "Apr 10, 2024", time: "09:20 AM", status: "Completed" },
    { sr: "02", coins: "70PF", date: "Apr 10, 2024", time: "09:20 AM", status: "Declined" },
    { sr: "03", coins: "82PF", date: "Apr 10, 2024", time: "09:20 AM", status: "Completed" },
    { sr: "04", coins: "30PF", date: "Apr 10, 2024", time: "09:20 AM", status: "Completed" },
    { sr: "05", coins: "120PF", date: "Apr 10, 2024", time: "09:20 AM", status: "Completed" },
    { sr: "06", coins: "100PF", date: "Apr 10, 2024", time: "09:20 AM", status: "Completed" },
    { sr: "07", coins: "70PF", date: "Apr 10, 2024", time: "09:20 AM", status: "Completed" },
    { sr: "08", coins: "82PF", date: "Apr 10, 2024", time: "09:20 AM", status: "Completed" },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F0D] p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">PF Coins</h1>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Want More PF Coins Banner  */}
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

        {/* Total Purchased Coins */}
        <div className="bg-[#ffffff]/7 rounded-xl p-6">
          <div className="flex flex-col justify-between h-40">
            <div className="p-1 border-1 border-[#ffffff]/50 rounded-full w-fit">
              <DollarSign className="w-6 h-6 text-[#ffffff]/50" />
            </div>
            <div>
              <div>
                <span className="text-3xl font-bold text-[#4BEEA2]">200</span>
                <span className="text-sm ml-1 text-white">PF</span>
              </div>
              <p className="text-[#ffffff]/50 text-sm">Available PF Coins</p>
            </div>
          </div>
        </div>

        {/* Total Purchased Coins */}
        <div className="bg-[#ffffff]/7 rounded-xl p-6">
          <div className="flex flex-col justify-between h-40">
            <div className="p-1 border-1 border-[#ffffff]/50 rounded-full w-fit">
              <FileText className="w-6 h-6 text-[#ffffff]/50" />
            </div>
            <div>
              <div>
                <span className="text-3xl font-bold text-[#4BEEA2]">200</span>
                <span className="text-sm text-white ml-1">PF</span>
              </div>
              <p className="text-[#ffffff]/50 text-sm">Total Purchased PF Coins</p>
            </div>
          </div>
        </div>
      </div>

      {/* Coin Purchase History Section */}
      <div className="bg-[#2A2A2A] rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Coin Purchase History</h2>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#ffffff]/7">
                <th className="text-left text-[#ffffff]/50 py-3 px-4">Sr #</th>
                <th className="text-left text-[#ffffff]/50 py-3 px-4">Number Of Coins</th>
                <th className="text-left text-[#ffffff]/50 py-3 px-4">Purchasing Date</th>
                <th className="text-left text-[#ffffff]/50 py-3 px-4">Purchasing Time</th>
                <th className="text-left text-[#ffffff]/50 py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {purchaseHistory.map((item, index) => (
                <tr key={index} className="border-b border-[#ffffff]/5">
                  <td className="py-3 px-4 text-white">{item.sr}</td>
                  <td className="py-3 px-4 text-white">{item.coins}</td>
                  <td className="py-3 px-4 text-white">{item.date}</td>
                  <td className="py-3 px-4 text-white">{item.time}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-xl text-sm ${
                        item.status === "Completed" ? "text-[#2DD084] bg-[#2DD084]/10" : "text-[#F65E53] bg-[#F65E53]/10"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <button className="flex items-center text-[#ffffff]/50 hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>

          <div className="flex items-center space-x-2">
            <button className="w-8 h-8 bg-[#4BEEA2] text-black rounded text-sm font-medium">1</button>
            <button className="w-8 h-8 text-[#ffffff]/50 hover:text-white rounded text-sm">2</button>
            <button className="w-8 h-8 text-[#ffffff]/50 hover:text-white rounded text-sm">3</button>
            <span className="text-[#ffffff]/50">...</span>
            <button className="w-8 h-8 text-[#ffffff]/50 hover:text-white rounded text-sm">9</button>
            <button className="w-8 h-8 text-[#ffffff]/50 hover:text-white rounded text-sm">10</button>
          </div>

          <button className="flex items-center text-[#ffffff]/50 hover:text-white transition-colors">
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PFCoinsMain;
