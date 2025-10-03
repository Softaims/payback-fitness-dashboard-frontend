import { useLocation, Link } from "react-router-dom";
import { X } from "lucide-react";
import { navigationLinks } from "../../constants/navigation";
import customToast from "../../lib/toast";

const OverlayMenu = ({ isOpen, onClose }) => {
  const location = useLocation();

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  if (!isOpen) return null;

  return (
    <div className="h-[100vh] min-h-screen fixed inset-0 z-200 bg-black/85 backdrop-blur-sm">
      <div className="h-full w-full relative">
        {/* Header with Logo and Close Button */}
        <div className="flex items-center justify-between p-6">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <img src="/images/PaybackLogo.svg" alt="PayBack Fitness Logo" />
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-[#4BEEA2] font-bold text-lg tracking-[0.1em]">Pay</span>
                <span className="text-white font-bold text-lg tracking-[0.1em]">Back</span>
              </div>
              <span className="text-[#ffffff]/50 text-xs tracking-[0.6em]">Fitness</span>
            </div>
          </div>

          {/* Close Button */}
          <button onClick={onClose} className="text-white hover:text-[#4BEEA2] transition-colors duration-200">
            <X size={24} />
          </button>
        </div>

        {/* Menu Content */}
        <div className="px-6 mt-8">
          <h2 className="text-[#ffffff]/50 text-sm font-medium mb-2">Menu</h2>

          <div className="space-y-1">
            {navigationLinks.map((link) => {
              const IconComponent = link.icon;
              const active = isActive(link.path, link.exact);
              const iconClasses = active ? "text-[#4BEEA2]" : "text-[#ffffff]/50";
              const textClasses = active ? "text-white font-semibold" : "text-[#ffffff]/50 font-normal";

              const handleClick = (e) => {
                e.preventDefault();
                window.location.href = "paybackfitness://signin";
                onClose();
                setTimeout(() => {
                  customToast.error("Mobile app not found. Make sure you have the PayBack Fitness app installed.");
                }, 1000);
              };

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={link.isDeepLink ? handleClick : onClose}
                  className="w-full flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-[#ffffff]/5"
                >
                  <span className={iconClasses}>
                    <IconComponent />
                  </span>
                  <span className={`flex-1 text-sm ${textClasses}`}>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverlayMenu;
