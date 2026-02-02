import { useLocation, Link } from "react-router-dom";
import { X } from "lucide-react";
import { navigationLinks } from "../../constants/navigation";

const OverlayMenu = ({ isOpen, onClose }) => {
  const location = useLocation();

  // Check if user is in mobile app web view
  const isInMobileAppWebView = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isAndroidWebView = /wv/i.test(userAgent);
    const isIOSWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(userAgent);
    const hasAppIdentifier = /PaybackFitness|paybackfitness/i.test(userAgent);
    const hasAppWindowProperty = window.ReactNativeWebView || window.webkit?.messageHandlers;

    return isAndroidWebView || isIOSWebView || hasAppIdentifier || hasAppWindowProperty;
  };

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleDeepLink = () => {
    window.location.href = "paybackfitness://signin";

    setTimeout(() => {
      onClose();
    }, 1000);
  };

  // Filter out deeplink items if in mobile app web view
  const filteredNavigationLinks = isInMobileAppWebView() ? navigationLinks.filter((link) => !link.isDeepLink) : navigationLinks;

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

          {/* Close Button - triggers deep link to return to app */}
          <button onClick={onClose} className="text-white hover:text-[#4BEEA2] transition-colors duration-200">
            <X size={24} />
          </button>
        </div>

        {/* Menu Content */}
        <div className="px-6 mt-8">
          <h2 className="text-[#ffffff]/50 text-sm font-medium mb-2">Menu</h2>

          <div className="space-y-1">
            {filteredNavigationLinks.map((link) => {
              const IconComponent = link.icon;
              const active = !link.isExternal && isActive(link.path, link.exact);
              const iconClasses = active ? "text-[#4BEEA2]" : "text-[#ffffff]/50";
              const textClasses = active ? "text-white font-semibold" : "text-[#ffffff]/50 font-normal";

              if (link.isExternal) {
                return (
                  <a
                    key={link.label}
                    href={link.url}
                    target={link.target || "_blank"}
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="w-full flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-[#ffffff]/5"
                  >
                    <span className={iconClasses}>
                      <IconComponent />
                    </span>
                    <span className={`flex-1 text-sm ${textClasses}`}>{link.label}</span>
                  </a>
                );
              }

              // 🔹 Deep Link (mobile app)
              if (link.isDeepLink) {
                return (
                  <button
                    key={link.label}
                    onClick={handleDeepLink}
                    className="w-full flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-[#ffffff]/5"
                  >
                    <span className="text-[#ffffff]/50">
                      <IconComponent />
                    </span>
                    <span className=" text-sm text-[#ffffff]/50">{link.label}</span>
                  </button>
                );
              }

              // 🔹 Internal Panel Route
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={onClose}
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
