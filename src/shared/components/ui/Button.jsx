import { forwardRef } from "react";

/**
 * Reusable Button component matching PayBack Fitness theme
 * Supports variants: primary, secondary, outline, danger
 */
const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      disabled = false,
      loading = false,
      className = "",
      type = "button",
      onClick,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "font-semibold rounded-[30px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900";

    const variants = {
      primary: disabled || loading
        ? "bg-[#6d6262ff] cursor-not-allowed"
        : "bg-[#4BEEA2] hover:bg-[#3dd48a] focus:ring-green-500 cursor-pointer",
      secondary: disabled || loading
        ? "bg-[#FFFFFF]/10 cursor-not-allowed text-[#FFFFFF]/30"
        : "bg-[#FFFFFF]/7 hover:bg-[#FFFFFF]/10 text-white focus:ring-[#FFFFFF]/20 cursor-pointer",
      outline: disabled || loading
        ? "border border-[#FFFFFF]/20 text-[#FFFFFF]/30 cursor-not-allowed"
        : "border border-[#4BEEA2] text-[#4BEEA2] hover:bg-[#4BEEA2]/10 focus:ring-green-500 cursor-pointer",
      danger: disabled || loading
        ? "bg-red-500/50 cursor-not-allowed"
        : "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500 cursor-pointer",
    };

    const sizes = {
      sm: "py-2 px-4 text-sm",
      md: "py-3 px-4 text-base",
      lg: "py-4 px-6 text-lg",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        onClick={onClick}
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {children}
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
