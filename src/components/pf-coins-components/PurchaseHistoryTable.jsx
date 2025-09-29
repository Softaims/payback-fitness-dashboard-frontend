import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePFCoinsStore } from "../../store/pfCoinsStore";

const PurchaseHistoryTable = () => {
  const { purchaseHistory, purchaseHistoryLoading, fetchPurchaseHistory } = usePFCoinsStore();

  // Extract data from response
  const rows = purchaseHistory?.rows || [];
  const total = purchaseHistory?.total || 0;
  const page = purchaseHistory?.page || 1;
  const limit = purchaseHistory?.limit || 10;
  const totalPages = purchaseHistory?.totalPages || 0;

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = page - 1; i <= page + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePageChange = (newPage) => {
    fetchPurchaseHistory(newPage, limit);
  };

  if (purchaseHistoryLoading) {
    return (
      <div className="bg-[#2A2A2A] rounded-xl p-6">
        {/* Table Skeleton */}
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
              {Array.from({ length: limit }).map((_, index) => (
                <tr key={index} className="border-b border-[#ffffff]/5">
                  <td className="py-3 px-4">
                    <div className="h-4 bg-[#ffffff]/10 rounded animate-pulse"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 bg-[#ffffff]/10 rounded animate-pulse"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 bg-[#ffffff]/10 rounded animate-pulse"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 bg-[#ffffff]/10 rounded animate-pulse"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-6 w-16 bg-[#ffffff]/10 rounded-xl animate-pulse"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (!purchaseHistory || rows.length === 0) {
    return (
      <div className="bg-[#2A2A2A] rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Coin Purchase History</h2>
        <div className="text-center py-12">
          <div className="text-[#ffffff]/30 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <p className="text-white text-lg mb-2">No purchase history found</p>
          <p className="text-[#ffffff]/50">You haven't made any PF coin purchases yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#2A2A2A] rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-6">Coin Purchase History</h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-sm border-b border-[#ffffff]/7">
              <th className="text-left text-[#ffffff]/50 py-3 px-4">Sr #</th>
              <th className="text-left text-[#ffffff]/50 py-3 px-4">Number Of Coins</th>
              <th className="text-left text-[#ffffff]/50 py-3 px-4">Purchasing Date</th>
              <th className="text-left text-[#ffffff]/50 py-3 px-4">Purchasing Time</th>
              <th className="text-left text-[#ffffff]/50 py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item, index) => (
              <tr key={index} className="text-sm border-b border-[#ffffff]/5">
                <td className="py-3 px-4 text-white">{(page - 1) * limit + index + 1}</td>
                <td className="py-3 px-4 text-white">{item.amount}PF</td>
                <td className="py-3 px-4 text-white">{item.date}</td>
                <td className="py-3 px-4 text-white">{item.time}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-2 rounded-xl text-sm ${
                      item.status === "completed" ? "text-[#2DD084] bg-[#2DD084]/10" : "text-[#F65E53] bg-[#F65E53]/10"
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
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="flex items-center text-[#ffffff]/50 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>

          <div className="flex items-center space-x-2">
            {generatePageNumbers().map((pageNum, index) => (
              <button
                key={index}
                onClick={() => typeof pageNum === "number" && handlePageChange(pageNum)}
                disabled={pageNum === "..."}
                className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                  pageNum === page ? "bg-[#4BEEA2] text-black" : pageNum === "..." ? "text-[#ffffff]/50 cursor-default" : "text-[#ffffff]/50 hover:text-white"
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="flex items-center text-[#ffffff]/50 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PurchaseHistoryTable;
