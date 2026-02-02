import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { ChevronDown } from "lucide-react";

/**
 * Dropdown Component
 * Reusable dropdown selector
 *
 * @param {Array} options - Array of options: [{value: string, label: string}]
 * @param {string} value - Currently selected value
 * @param {function} onChange - Callback when selection changes
 * @param {string} placeholder - Placeholder text
 * @param {string} size - Dropdown size: 'sm' | 'md' | 'lg'
 * @param {boolean} disabled - Whether dropdown is disabled
 * @param {string} className - Additional CSS classes
 */
const Dropdown = ({
  options = [],
  value,
  onChange,
  placeholder = "Select option",
  size = "md",
  disabled = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base",
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          flex items-center justify-between gap-2
          bg-[#1a2e23] border border-[#FFFFFF]/10
          text-white rounded-lg
          transition-all duration-200
          ${sizes[size]}
          ${
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:border-[#FFFFFF]/20 cursor-pointer"
          }
          ${isOpen ? "border-[#4BEEA2]/50" : ""}
        `}
      >
        <span className="whitespace-nowrap">
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="
            absolute right-0 top-full mt-2
            min-w-full w-max
            bg-[#1a2e23] border border-[#FFFFFF]/10
            rounded-lg shadow-xl
            overflow-hidden
            z-50
            animate-fadeIn
          "
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option)}
              className={`
                w-full text-left px-4 py-2.5
                transition-colors duration-150
                ${
                  option.value === value
                    ? "bg-[#4BEEA2]/10 text-[#4BEEA2]"
                    : "text-white hover:bg-[#FFFFFF]/5"
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Dropdown;
