import { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, User, LogOut } from "lucide-react";
import { useUserStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";
import customToast from "../../lib/toast";
import { getUserInitials, getUserDisplayName } from "../../utils/getUserinitials";
import { clearTokens } from "../../lib/tokenUtils";
import ConfirmationModal from "../global/ConfirmationModal";

const DashboardHeader = ({ onMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const dropdownRef = useRef(null);
  const { user, clearUser } = useUserStore();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
    setIsDropdownOpen(false);
  };

  const handleLogoutConfirm = async () => {
    setLogoutLoading(true);
    try {
      clearTokens();
      customToast.success("Successfully logged out!");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
      customToast.error("Logout failed. Please try again.");
    } finally {
      setLogoutLoading(false);
    }
  };

  const handleProfileSettings = () => {
    navigate("/profile-settings");
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="h-16 bg-[#ffffff]/7 flex items-center justify-between px-6 border-b border-[#ffffff]/7">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="cursor-pointer md:hidden text-gray-300 hover:text-white">
          <Menu size={24} />
        </button>

        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <img src="/images/PaybackLogo.svg" alt="PayBack Fitness Logo" />
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-[#4BEEA2] font-bold text-lg">Pay</span>
              <span className="text-white font-bold text-lg">Back</span>
            </div>
            <span className="text-[#ffffff]/50 text-xs tracking-[0.55em]">Fitness</span>
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="relative" ref={dropdownRef}>
        <div className="flex items-center gap-2 cursor-pointer hover:bg-[#ffffff]/10 px-3 py-2 rounded-md transition-colors" onClick={toggleDropdown}>
          <div className="w-8 h-8 bg-[#4BEEA2] rounded-full flex items-center justify-center flex-shrink-0">
            <span className="font-bold text-xs text-black">{getUserInitials(user)}</span>
          </div>
          <span className="text-white text-xs font-medium truncate">{getUserDisplayName(user)}</span>
          <ChevronDown size={16} className="text-[#4BEEA2] flex-shrink-0" />
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-[#323735] rounded-lg shadow-lg border border-[#ffffff]/10 z-50">
            <div className="p-4 border-b border-[#ffffff]/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#4BEEA2] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-xs text-black">{getUserInitials(user)}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-white font-medium text-xs truncate">{getUserDisplayName(user)}</h3>
                  <p className="text-[#ffffff]/50 text-xs break-all">{user?.email}</p>
                </div>
              </div>
            </div>
            <div className="py-2">
              <button
                onClick={handleProfileSettings}
                className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-[#ffffff]/5 transition-colors text-xs"
              >
                <User size={18} className="text-white" />
                <span>Profile Settings</span>
              </button>

              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-[#4BEEA2] hover:bg-[#ffffff]/5 transition-colors text-xs">
                <LogOut size={18} className="text-[#4BEEA2]" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
        title="Confirm Logout"
        message="Are you sure you want to logout? You will need to sign in again to access your account."
        confirmText="Logout"
        cancelText="Cancel"
        confirmButtonColor="bg-red-600 hover:bg-red-700"
        loading={logoutLoading}
      />
    </header>
  );
};

export default DashboardHeader;
