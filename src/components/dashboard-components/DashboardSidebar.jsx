import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { navigationLinks, bottomNavigationLinks } from "../../constants/navigation";
import { useUserStore } from "../../store/userStore";
import { clearTokens } from "../../lib/tokenUtils";
import customToast from "../../lib/toast";

const SidebarItem = ({ icon: Icon, text, path, isActive, onClick }) => {
  const baseClasses = "text-xs flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200";
  const iconClasses = "text-xl";
  const labelClasses = "flex-1";

  const itemClasses = isActive ? "bg-[#4BEEA2] text-black" : "text-[#ffffff]/50 hover:text-[#ffffff]/60";
  return (
    <li>
      <Link to={path} className={`${baseClasses} ${itemClasses}`} onClick={onClick}>
        <span className={iconClasses}>
          <Icon size={20} />
        </span>
        <span className={labelClasses}>{text}</span>
      </Link>
    </li>
  );
};

const DashboardSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearUser } = useUserStore();

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    // Clear user data and tokens
    clearUser();
    clearTokens();

    // Show logout confirmation
    customToast.success("Successfully logged out!");

    // Navigate to login page
    navigate("/login");
  };

  return (
    <>
      <aside
        className={`fixed md:static border-r-1 border-[#ffffff]/7 w-64 h-screen bg-[#0B0F0D] flex flex-col z-30 transition-transform duration-300 ease-in-out overflow-y-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Menu Section */}
        <div className="flex-1 px-4 pt-6 min-h-0 overflow-y-auto">
          <h3 className="text-[#ffffff]/50 text-xs font-semibold uppercase tracking-wider mb-4 px-4">Menu</h3>
          <nav className="space-y-1">
            <ul className="space-y-1">
              {navigationLinks.map((link) => (
                <SidebarItem key={link.path} icon={link.icon} text={link.label} path={link.path} isActive={isActive(link.path, link.exact)} onClick={onClose} />
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom Links */}
        <div className="px-4 pb-8 border-t border-[#ffffff]/7 mb-10">
          <ul className="space-y-1 pt-4">
            {bottomNavigationLinks.map((link) =>
              link.path === "/logout" ? (
                <SidebarItem
                  key={link.path}
                  icon={link.icon}
                  text={link.label}
                  path={link.path}
                  isActive={isActive(link.path, true)}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                    onClose();
                  }}
                />
              ) : (
                <SidebarItem key={link.path} icon={link.icon} text={link.label} path={link.path} isActive={isActive(link.path, true)} onClick={onClose} />
              )
            )}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
