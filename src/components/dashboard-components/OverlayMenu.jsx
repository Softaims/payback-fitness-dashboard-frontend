import { useLocation, Link } from "react-router-dom";
import { X } from "lucide-react";
import { navigationLinks } from "../../constants/navigation";

const OverlayMenu = ({ isOpen, onClose }) => {
  const location = useLocation();

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Detect if running in a webview (in-app browser from mobile app)
  const isInWebView = () => {
    try {
      // Check for React Native WebView
      if (window.ReactNativeWebView) return true;

      // Check for Android webview interface
      if (window.Android && typeof window.Android !== "undefined") return true;

      // Check user agent for webview indicators
      const userAgent = window.navigator.userAgent || window.navigator.vendor || "";
      const webviewPatterns = [
        /wv/i, // Android webview
        /WebView/i, // Generic webview
      ];

      if (webviewPatterns.some((pattern) => pattern.test(userAgent))) return true;

      // Check if we're in an iframe (often indicates webview)
      try {
        if (window.self !== window.top) return true;
      } catch {
        // If we can't access window.top, we're likely in a webview
        return true;
      }

      return false;
    } catch {
      return false;
    }
  };

  const handleDeepLink = () => {
    onClose(); // Close the menu first

    // If in webview (opened from mobile app), try to go back/close the webview
    if (isInWebView()) {
      // Use window.history.back() to go back to the app (like clicking browser back button)
      // This works reliably in webviews
      try {
        window.history.back();
      } catch (e) {
        // If history.back() fails, try window.close() as fallback
        try {
          window.close();
        } catch {
          // If both fail, at least we closed the menu
          console.log("Could not navigate back from webview");
        }
      }
      return;
    }

    // If in regular browser, use deep link to open the app
    const deepLinkItem = navigationLinks.find((link) => link.isDeepLink);
    if (deepLinkItem && deepLinkItem.deepLinkUrl) {
      // Try to open the app using deep link
      window.location.href = deepLinkItem.deepLinkUrl;
    }
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

          {/* Close Button - triggers deep link to return to app */}
          <button onClick={handleDeepLink} className="text-white hover:text-[#4BEEA2] transition-colors duration-200">
            <X size={24} />
          </button>
        </div>

        {/* Menu Content */}
        <div className="px-6 mt-8">
          <h2 className="text-[#ffffff]/50 text-sm font-medium mb-2">Menu</h2>

          <div className="space-y-1">
            {navigationLinks.map((link) => {
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
