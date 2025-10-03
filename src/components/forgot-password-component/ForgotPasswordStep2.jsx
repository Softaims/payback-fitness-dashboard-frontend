import { useState, useRef, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { validateForm } from "../../validation/validateForm";
import { otpSchema } from "../../validation/otpValidation";
import api from "../../lib/apiClient";
import customToast from "../../lib/toast";

const ForgotPasswordStep2 = ({ userEmail, onNext }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef([]);
  // Auto-focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Cooldown timer for resend
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleInputChange = (index, value) => {
    // Only allow single character
    if (value.length > 1) return;

    // Only allow numeric input - ignore non-numeric characters
    if (value && !/^\d$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Clear error when user starts typing
    if (errors[`otp_${index}`] || errors.otp) {
      const newErrors = { ...errors };
      delete newErrors[`otp_${index}`];
      delete newErrors.otp;
      setErrors(newErrors);
    }

    // Auto-focus next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Handle paste
    if (e.key === "v" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then((text) => {
        const pastedDigits = text.replace(/\D/g, "").slice(0, 6);
        const newOtp = ["", "", "", "", "", ""];
        pastedDigits.split("").forEach((digit, i) => {
          if (i < 6) newOtp[i] = digit;
        });
        setOtp(newOtp);

        // Focus the next empty field or last field
        const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
        const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
        inputRefs.current[focusIndex]?.focus();
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const otpString = otp.join("");
    const fieldErrors = validateForm(otpSchema, { otp: otpString });

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(
        "/api/auth/verify-forgot-password-otp",
        {
          email: userEmail,
          otp: otpString,
        },
        {
          isProtected: false,
        }
      );
      localStorage.setItem("access_token", response?.data?.session?.access_token);
      localStorage.setItem("refresh_token", response?.data?.session?.refresh_token);

      customToast.success("OTP verified successfully");
      onNext();
    } catch (error) {
      console.error("Verification failed:", error);
      if (error?.message) {
        customToast.error(error.message);
      } else {
        customToast.error("Invalid verification code. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = () => {
    if (resendCooldown > 0) return;

    setResendCooldown(30); // 30 seconds cooldown
    setOtp(["", "", "", "", "", ""]);
    setErrors({});

    // Focus first input
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    // Handle resend logic here
    console.log("Resending OTP to:", userEmail);
  };

  return (
    <div className="text-center">
      {/* Forgot Password Verification Icon */}
      <div className="mb-6">
        <img src="/images/forgotPassword.svg" alt="Forgot Password Verification" className="w-20 h-20 mx-auto" />
      </div>

      {/* Title */}
      <h1 className="text-white text-3xl font-bold mb-4">Forgot Password Verification</h1>

      {/* Instructions */}
      <p className="text-white text-sm mb-2">Enter the verification code sent to your email to reset your password</p>

      {/* Email Address */}
      <p className="text-white text-sm font-semibold mb-8">{userEmail}</p>

      {/* OTP Input Form */}
      <form onSubmit={handleSubmit}>
        {/* OTP Input Fields */}
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <div key={index} className="relative">
              <input
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-12 text-center text-white text-lg font-bold bg-[#FFFFFF]/7 border-2 rounded-[30px] focus:outline-none focus:ring-2 transition-all ${
                  errors[`otp_${index}`] || errors.otp
                    ? "border-red-500 focus:ring-red-500"
                    : digit
                    ? "border-[#4BEEA2] focus:ring-[#4BEEA2]"
                    : "border-[#FFFFFF]/7 focus:ring-[#4BEEA2] focus:border-[#4BEEA2]"
                }`}
              />
            </div>
          ))}
        </div>

        {/* General Error Message */}
        {errors.otp && (
          <div className="mb-6 flex items-center justify-center text-red-500 text-xs">
            <AlertCircle className="w-3 h-3 mr-1" />
            {errors.otp}
          </div>
        )}

        {/* Resend OTP */}
        <div className="mb-8">
          {resendCooldown > 0 ? (
            <span className="text-[#ffffff]/50 text-sm">Resend OTP in {resendCooldown}s</span>
          ) : (
            <button
              type="button"
              onClick={handleResendOTP}
              className="cursor-pointer text-[#4BEEA2] hover:text-green-400 text-sm font-medium transition-colors"
            >
              Resend OTP
            </button>
          )}
        </div>

        {/* Verify Button */}
        <button
          type="submit"
          disabled={loading || otp.some((digit) => digit === "")}
          className={`w-full font-bold py-3 px-4 rounded-[30px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 bg-[#4BEEA2] ${
            loading || otp.some((digit) => digit === "") ? "cursor-not-allowed" : "cursor-pointer hover:bg-[#3dd48a]"
          }`}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordStep2;
