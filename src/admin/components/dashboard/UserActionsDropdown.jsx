import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { MoreVertical, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * UserActionsDropdown Component
 * Dropdown menu for user actions in the table
 *
 * @param {string} userId - User ID
 */
const UserActionsDropdown = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleViewDetail = () => {
    navigate(`/admin/users/${userId}`);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-[#FFFFFF]/5 rounded-lg transition-colors"
        aria-label="User actions"
      >
        <MoreVertical className="w-5 h-5 text-[#FFFFFF]/70" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#1a2e23] border border-[#FFFFFF]/10 rounded-lg shadow-lg z-10">
          <button
            onClick={handleViewDetail}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-[#FFFFFF]/5 transition-colors first:rounded-t-lg last:rounded-b-lg"
          >
            <Eye className="w-4 h-4" />
            <span>View Detail</span>
          </button>
        </div>
      )}
    </div>
  );
};

UserActionsDropdown.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserActionsDropdown;
