import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Calendar, X } from "lucide-react";

/**
 * DateRangePicker Component
 * Interactive date range selector with dropdown
 *
 * @param {Date|string} startDate - Start date
 * @param {Date|string} endDate - End date
 * @param {Function} onChange - Callback when dates change { startDate, endDate }
 */
const DateRangePicker = ({ startDate, endDate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempStartDate, setTempStartDate] = useState("");
  const [tempEndDate, setTempEndDate] = useState("");
  const dropdownRef = useRef(null);

  // Format date for display
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format date for input (YYYY-MM-DD)
  const formatInputDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  // Initialize temp dates when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTempStartDate(formatInputDate(startDate));
      setTempEndDate(formatInputDate(endDate));
    }
  }, [isOpen, startDate, endDate]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dateRangeText =
    startDate && endDate
      ? `${formatDate(startDate)} - ${formatDate(endDate)}`
      : "All Time";

  const handleApply = () => {
    onChange({
      startDate: tempStartDate || null,
      endDate: tempEndDate || null,
    });
    setIsOpen(false);
  };

  const handleClear = () => {
    setTempStartDate("");
    setTempEndDate("");
    onChange({ startDate: null, endDate: null });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-3 bg-[#1a2e23] border border-[#FFFFFF]/10 rounded-lg hover:border-[#4BEEA2]/30 transition-all duration-200"
      >
        <Calendar className="w-5 h-5 text-[#FFFFFF]/50" />
        <span className="text-sm text-[#FFFFFF]/70 whitespace-nowrap">
          {dateRangeText}
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-[#1a2e23] border border-[#FFFFFF]/10 rounded-lg shadow-lg z-50 p-4">
          <div className="space-y-4">
            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={tempStartDate}
                onChange={(e) => setTempStartDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#0f1c16] border border-[#FFFFFF]/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#4BEEA2] transition-colors"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                End Date
              </label>
              <input
                type="date"
                value={tempEndDate}
                onChange={(e) => setTempEndDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#0f1c16] border border-[#FFFFFF]/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#4BEEA2] transition-colors"
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleClear}
                className="flex-1 px-4 py-2 bg-transparent border border-[#FFFFFF]/10 text-[#FFFFFF]/70 text-sm font-medium rounded-lg hover:bg-[#FFFFFF]/5 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
              <button
                onClick={handleApply}
                className="flex-1 px-4 py-2 bg-[#4BEEA2] text-[#0f1c16] text-sm font-semibold rounded-lg hover:bg-[#3dd891] transition-all duration-200"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

DateRangePicker.propTypes = {
  startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  onChange: PropTypes.func.isRequired,
};

export default DateRangePicker;
