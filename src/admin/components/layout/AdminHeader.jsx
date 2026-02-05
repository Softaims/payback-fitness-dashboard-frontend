import { useState } from "react";
import { Menu } from "lucide-react";
import Logo from "../../../shared/components/branding/Logo";
import ProfileDropdown from "./ProfileDropdown";
import AccountSettingsModal from "./AccountSettingsModal";
import ChangePasswordModal from "./ChangePasswordModal";

/**
 * Admin Dashboard Header
 */
const AdminHeader = ({ onMenuClick }) => {
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#0f1c16] border-b border-[#FFFFFF]/10 z-40">
        <div className="h-full flex items-center justify-between px-4">
          {/* Left - Logo and Menu Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="md:hidden text-white hover:text-[#4BEEA2] transition-colors p-2"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:block">
              <Logo size="sm" showSubtext={false} />
            </div>
            <div className="md:hidden block">
              <span className="text-[#4BEEA2] font-bold text-xl">
                Admin Portal
              </span>
            </div>
          </div>

          {/* Right - Profile Dropdown */}
          <div className="flex items-center gap-4">
            <ProfileDropdown
              onAccountSettings={() => setIsAccountSettingsOpen(true)}
              onChangePassword={() => setIsChangePasswordOpen(true)}
            />
          </div>
        </div>
      </header>

      {/* Modals */}
      <AccountSettingsModal
        isOpen={isAccountSettingsOpen}
        onClose={() => setIsAccountSettingsOpen(false)}
      />
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />
    </>
  );
};

export default AdminHeader;
