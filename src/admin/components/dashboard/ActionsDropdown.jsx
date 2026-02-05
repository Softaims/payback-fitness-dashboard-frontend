import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { MoreVertical } from "lucide-react";

/**
 * ActionsDropdown Component
 * Generic dropdown menu for row actions in tables
 *
 * @param {Array} actions - Array of action objects
 *   Each action should have: { icon: Component, label: string, onClick: function }
 */
const ActionsDropdown = ({ actions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      // Small delay to ensure dropdown is rendered
      setTimeout(() => {
        menuRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      }, 10);
    }
  }, [isOpen]);

  const handleActionClick = (action) => {
    action.onClick();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-[#FFFFFF]/5 rounded-lg transition-colors"
        aria-label="Actions"
      >
        <MoreVertical className="w-5 h-5 text-[#FFFFFF]/70" />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-48 bg-[#1a2e23] border border-[#FFFFFF]/10 rounded-lg shadow-xl z-50 overflow-hidden"
        >
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={() => handleActionClick(action)}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-[#FFFFFF]/5 transition-colors first:rounded-t-lg last:rounded-b-lg"
              >
                <Icon className="w-4 h-4" />
                <span>{action.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

ActionsDropdown.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.elementType.isRequired,
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    })
  ).isRequired,
};

export default ActionsDropdown;
