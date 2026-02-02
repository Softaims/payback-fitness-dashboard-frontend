import { Menu, Bell, User } from "lucide-react";
import { useAdminAuthStore } from "../../store/adminAuthStore";
import Logo from "../../../shared/components/branding/Logo";

/**
 * Admin Dashboard Header
 */
const AdminHeader = ({ onMenuClick }) => {
  const { admin } = useAdminAuthStore();

  return (
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

        {/* Right - Notifications and Profile */}
        <div className="flex items-center gap-4">
          {/* Admin Profile */}
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 rounded-full bg-[#4BEEA2]/20 flex items-center justify-center">
              <User className="w-4 h-4 text-[#4BEEA2]" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium">
                {admin?.name || admin?.email || "Admin"}
              </p>
              <p className="text-xs text-[#FFFFFF]/50 capitalize">
                {admin?.role || "Admin"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
