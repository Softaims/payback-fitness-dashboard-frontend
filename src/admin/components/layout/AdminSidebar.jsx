import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UsersRound,
  ShoppingBag,
  Gift,
  LogOut,
  Shield,
} from "lucide-react";
import { useAdminAuthStore } from "../../store/adminAuthStore";
import { authService } from "../../../shared/lib/authService";
import customToast from "../../../shared/lib/toast";

const SidebarItem = ({ icon: Icon, text, path, isActive, onClick }) => {
  const baseClasses =
    "text-sm flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200";
  const labelClasses = `flex-1 ${isActive ? "font-semibold" : "font-normal"}`;
  const itemClasses = isActive
    ? "bg-[#4BEEA2]/10 text-[#4BEEA2]"
    : "text-[#ffffff]/50 hover:text-white hover:bg-[#FFFFFF]/5";

  return (
    <li>
      <Link
        to={path}
        className={`${baseClasses} ${itemClasses}`}
        onClick={onClick}
      >
        <Icon className="w-5 h-5" />
        <span className={labelClasses}>{text}</span>
      </Link>
    </li>
  );
};

/**
 * Admin Dashboard Sidebar
 */
const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearAdmin } = useAdminAuthStore();

  const isActive = (path) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const handleLogout = () => {
    authService.logout();
    clearAdmin();
    customToast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const navigationLinks = [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "User Management", path: "/admin/users", icon: Users },
    { label: "All Groups", path: "/admin/groups", icon: UsersRound },
    { label: "PF Purchases", path: "/admin/purchases", icon: ShoppingBag },
    { label: "PF Redemption", path: "/admin/redemptions", icon: Gift },
  ];

  return (
    <aside
      className={`fixed md:fixed border-r border-[#ffffff]/10 w-64 h-screen md:top-16 bg-[#0f1c16] flex flex-col z-30 transition-transform duration-300 ease-in-out overflow-y-auto
        ${isOpen ? "translate-x-0 md:translate-x-0" : "-translate-x-full md:translate-x-0"}`}
    >
      {/* Navigation Section */}
      <div className="flex-1 px-4 pt-6 min-h-0 overflow-y-auto">
        <nav className="space-y-1">
          <ul className="space-y-1">
            {navigationLinks.map((link) => (
              <SidebarItem
                key={link.path}
                icon={link.icon}
                text={link.label}
                path={link.path}
                isActive={isActive(link.path)}
                onClick={onClose}
              />
            ))}
          </ul>
        </nav>
      </div>

      {/* Logout */}
      <div className="px-4 pb-8 border-t border-[#ffffff]/10 pt-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
