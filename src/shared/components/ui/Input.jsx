import { forwardRef, useState } from "react";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

/**
 * Reusable Input component matching PayBack Fitness theme
 * Supports types: text, email, password, number, tel
 */
const Input = forwardRef(
  (
    {
      label,
      type = "text",
      name,
      value,
      onChange,
      placeholder,
      error,
      icon: Icon,
      disabled = false,
      required = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === "password";
    const inputType = isPasswordType && showPassword ? "text" : type;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-white text-sm font-medium mb-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-full px-4 py-3 bg-[#FFFFFF]/7 border rounded-[30px] text-xs text-[#ffffff]/50 placeholder:text-xs placeholder:text-[#FFFFFF]/50 focus:outline-none focus:ring-2 transition-colors ${
              error
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-[#FFFFFF]/7 focus:ring-[#4BEEA2] focus:border-[#4BEEA2]"
            } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
            {...props}
          />

          {/* Right Icon - Error, Password Toggle, or Custom Icon */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            {isPasswordType ? (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="cursor-pointer w-4 h-4 text-[#4BEEA2]" />
                ) : (
                  <Eye className="cursor-pointer w-4 h-4 text-[#4BEEA2]" />
                )}
              </button>
            ) : error ? (
              <AlertCircle className="w-4 h-4 text-red-500" />
            ) : Icon ? (
              <Icon className="w-4 h-4 text-[#ffffff]/50" />
            ) : null}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-2 flex items-center text-red-500 text-xs">
            <AlertCircle className="w-3 h-3 mr-1" />
            {error}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
