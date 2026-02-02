import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Pagination Component
 * Reusable pagination controls for tables and lists
 *
 * @param {number} currentPage - Current active page
 * @param {number} totalPages - Total number of pages
 * @param {function} onPageChange - Callback when page changes
 * @param {number} maxVisible - Maximum number of page buttons to show (default: 5)
 * @param {string} className - Additional CSS classes
 */
const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  maxVisible = 5,
  className = "",
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
  const showFirstPage = pageNumbers[0] > 1;
  const showLastPage = pageNumbers[pageNumbers.length - 1] < totalPages;

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a2e23] border border-[#FFFFFF]/10 text-white hover:bg-[#FFFFFF]/5 hover:border-[#FFFFFF]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* First Page */}
      {showFirstPage && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="w-10 h-10 rounded-lg bg-[#1a2e23] border border-[#FFFFFF]/10 text-white hover:bg-[#FFFFFF]/5 hover:border-[#FFFFFF]/20 transition-all duration-200"
          >
            1
          </button>
          {pageNumbers[0] > 2 && (
            <span className="text-[#FFFFFF]/50 px-2">...</span>
          )}
        </>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
            currentPage === page
              ? "bg-[#4BEEA2] text-[#0f1c16] border border-[#4BEEA2]"
              : "bg-[#1a2e23] border border-[#FFFFFF]/10 text-white hover:bg-[#FFFFFF]/5 hover:border-[#FFFFFF]/20"
          }`}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      {/* Last Page */}
      {showLastPage && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className="text-[#FFFFFF]/50 px-2">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="w-10 h-10 rounded-lg bg-[#1a2e23] border border-[#FFFFFF]/10 text-white hover:bg-[#FFFFFF]/5 hover:border-[#FFFFFF]/20 transition-all duration-200"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a2e23] border border-[#FFFFFF]/10 text-white hover:bg-[#FFFFFF]/5 hover:border-[#FFFFFF]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
        aria-label="Next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  maxVisible: PropTypes.number,
  className: PropTypes.string,
};

export default Pagination;
