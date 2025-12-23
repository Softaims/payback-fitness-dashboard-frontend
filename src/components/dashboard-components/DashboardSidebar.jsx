import { Link, useLocation } from "react-router-dom";
import { navigationLinks, bottomNavigationLinks } from "../../constants/navigation";
import { useUserStore } from "../../store/userStore";
import { clearTokens } from "../../lib/tokenUtils";
import customToast from "../../lib/toast";

const SidebarItem = ({ icon: Icon, text, path, url, isExternal, target, isActive, onClick }) => {
  const baseClasses = "text-xs flex items-center gap-1 px-4 py-2 rounded-md transition-colors duration-200";
  const labelClasses = `flex-1 ${isActive ? "font-semibold" : "font-normal"}`;
  const itemClasses = isActive ? "text-white" : "text-[#ffffff]/50 hover:text-[#ffffff]/60";
  const iconClasses = isActive ? "text-[#4BEEA2]" : "text-[#ffffff]/50";

  if (isExternal) {
    return (
      <li>
        <a href={url} target={target || "_blank"} rel="noopener noreferrer" className={`${baseClasses} ${itemClasses}`} onClick={onClick}>
          <span className={iconClasses}>
            <Icon />
          </span>
          <span className={labelClasses}>{text}</span>
        </a>
      </li>
    );
  }

  return (
    <li>
      <Link to={path} className={`${baseClasses} ${itemClasses}`} onClick={onClick}>
        <span className={iconClasses}>
          <Icon />
        </span>
        <span className={labelClasses}>{text}</span>
      </Link>
    </li>
  );
};

const DashboardSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
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
    window.location.href = "/login";
  };

  return (
    <>
      <aside
        className={`fixed md:fixed border-r-1 border-[#ffffff]/7 w-64 h-screen md:top-16 bg-[#0f1c16] flex flex-col z-30 transition-transform duration-300 ease-in-out overflow-y-auto
        ${isOpen ? "translate-x-0 md:translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Menu Section */}
        <div className="mt-8 flex-1 px-2 pt-6 min-h-0 overflow-y-auto">
          <h3 className="text-[#ffffff]/50 text-xs font-semibold uppercase tracking-wider mb-4 px-4">Menu</h3>
          <nav className="space-y-1">
            <ul className="space-y-1">
              {navigationLinks
                .filter((link) => !link.isDeepLink)
                .map((link) => (
                  <SidebarItem
                    key={link.path}
                    icon={link.icon}
                    text={link.label}
                    path={link.path}
                    isActive={isActive(link.path, link.exact)}
                    onClick={onClose}
                  />
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
