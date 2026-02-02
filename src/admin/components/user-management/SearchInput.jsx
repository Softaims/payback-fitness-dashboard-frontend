import PropTypes from "prop-types";
import { Search } from "lucide-react";

/**
 * SearchInput Component
 * Reusable search input with icon for admin pages
 *
 * @param {string} value - Current search value
 * @param {function} onChange - Callback when search value changes
 * @param {string} placeholder - Placeholder text
 * @param {string} className - Additional CSS classes
 */
const SearchInput = ({
  value = "",
  onChange,
  placeholder = "Search...",
  className = "",
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-[#FFFFFF]/50" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-3 bg-[#1a2e23] border border-[#FFFFFF]/10 rounded-lg text-white placeholder-[#FFFFFF]/50 focus:outline-none focus:border-[#4BEEA2] focus:ring-1 focus:ring-[#4BEEA2] transition-all duration-200"
      />
    </div>
  );
};

SearchInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default SearchInput;
