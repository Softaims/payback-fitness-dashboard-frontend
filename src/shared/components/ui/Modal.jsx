import { useEffect } from "react";
import { X } from "lucide-react";

/**
 * Reusable Modal component matching PayBack Fitness theme
 */
const Modal = ({ isOpen, onClose, title, children, size = "md", showCloseButton = true, className = "" }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-7xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div
        className={`relative bg-[#1a2e23] border border-[#FFFFFF]/10 rounded-2xl shadow-xl ${sizes[size]} w-full max-h-[90vh] overflow-y-auto ${className}`}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-[#FFFFFF]/10">
            {title && <h3 className="text-xl font-bold text-white">{title}</h3>}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-[#FFFFFF]/50 hover:text-white transition-colors p-1 rounded-lg hover:bg-[#FFFFFF]/5"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
