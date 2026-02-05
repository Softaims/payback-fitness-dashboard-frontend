import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { ChevronDown, Settings, Lock, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAdminAuthStore } from "../../store/adminAuthStore";
import { UserAvatar } from "../dashboard";

/**
 * Profile Dropdown Component
 * Displays admin profile with dropdown menu
 */
const ProfileDropdown = ({ onAccountSettings, onChangePassword }) => {
  const navigate = useNavigate();
  const { admin, clearAdmin } = useAdminAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    clearAdmin();
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_refresh_token");
    navigate("/admin/login");
  };

  const menuItems = [
    {
      icon: Settings,
      label: "Account Settings",
      onClick: () => {
        onAccountSettings();
        setIsOpen(false);
      },
    },
    {
      icon: Lock,
      label: "Change Password",
      onClick: () => {
        onChangePassword();
        setIsOpen(false);
      },
    },
    {
      icon: LogOut,
      label: "Logout",
      onClick: handleLogout,
      className: "text-[#F65E53] hover:bg-[#F65E53]/10",
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#FFFFFF]/5 transition-colors"
      >
        <UserAvatar
          src={admin?.avatar}
          name={admin?.name || admin?.email}
          size="sm"
        />
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-white">
            {admin?.name || "Admin"}
          </p>
          <p className="text-xs text-[#FFFFFF]/50 capitalize">
            {admin?.role || "Admin"}
          </p>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-[#FFFFFF]/50 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[#1a2e23] border border-[#FFFFFF]/10 rounded-xl shadow-xl overflow-hidden z-50">
          {/* Profile Info */}
          <div className="p-4 border-b border-[#FFFFFF]/10">
            <div className="flex items-center gap-3">
              <UserAvatar
                src={admin?.avatar}
                name={admin?.name || admin?.email}
                size="md"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {admin?.name || "Admin"}
                </p>
                <p className="text-xs text-[#FFFFFF]/50 truncate">
                  {admin?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-[#FFFFFF]/5 transition-colors ${
                  item.className || ""
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

ProfileDropdown.propTypes = {
  onAccountSettings: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
};

export default ProfileDropdown;
