import { useState, useRef, useEffect } from "react";
import { AlertCircle, ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { otpSchema } from "../validation/otpValidation";
import { validateForm } from "../validation/validateForm";
import api from "../lib/apiClient";
import { useUserStore } from "../store/userStore";
import customToast from "../lib/toast";
const EmailVerificationPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const userEmail = location.state?.email;

  // Redirect to signup if no email is provided
  useEffect(() => {
    if (!userEmail) {
      navigate("/signup");
    }
  }, [userEmail, navigate]);

  // Auto-focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0] && userEmail) {
      inputRefs.current[0].focus();
    }
  }, [userEmail]);

  // Cooldown timer for resend
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    // Only allow numeric input - extract digits only
    const pastedDigits = pastedText.replace(/\D/g, "").slice(0, 6);
    
    if (pastedDigits.length > 0) {
      const newOtp = ["", "", "", "", "", ""];
      pastedDigits.split("").forEach((digit, i) => {
        // Validate each digit is numeric (additional safety check)
        if (i < 6 && /^\d$/.test(digit)) {
          newOtp[i] = digit;
        }
      });
      setOtp(newOtp);

      // Clear error when user pastes (same validation logic as handleInputChange)
      const newErrors = { ...errors };
      delete newErrors.otp;
      for (let i = 0; i < 6; i++) {
        delete newErrors[`otp_${i}`];
      }
      setErrors(newErrors);

      // Focus the next empty field or last field
      const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
      const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
      setTimeout(() => {
        inputRefs.current[focusIndex]?.focus();
      }, 0);
    }
  };

  const handleInputChange = (index, value) => {
    // Handle paste event (when pasted content comes through onChange on mobile)
    if (value.length > 1) {
      // Only allow numeric input - extract digits only (same validation as original)
      const pastedDigits = value.replace(/\D/g, "").slice(0, 6);
      if (pastedDigits.length > 0) {
        const newOtp = ["", "", "", "", "", ""];
        pastedDigits.split("").forEach((digit, i) => {
          // Validate each digit is numeric (same validation logic as original)
          if (i < 6 && /^\d$/.test(digit)) {
            newOtp[i] = digit;
          }
        });
        setOtp(newOtp);

        // Clear error when user pastes (same validation logic as handleInputChange)
        const newErrors = { ...errors };
        delete newErrors.otp;
        for (let i = 0; i < 6; i++) {
          delete newErrors[`otp_${i}`];
        }
        setErrors(newErrors);

        // Focus the next empty field or last field
        const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
        const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
        setTimeout(() => {
          inputRefs.current[focusIndex]?.focus();
        }, 0);
      }
      return;
    }

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
      // Call the OTP verification API
      const response = await api.post(
        "/api/auth/verify-otp",
        {
          email: userEmail,
          token: otpString,
        },
        {
          isProtected: false,
        }
      );
      customToast.success("Email verified successfully");
      setTimeout(() => {
        setUser({ ...response?.data?.user, not_onboarded: true });
        localStorage.setItem("access_token", response?.data?.session?.access_token);
        localStorage.setItem("refresh_token", response?.data?.session?.refresh_token);
        // Redirect to referral code page
        navigate("/onboarding-referral-code");
      }, 2000);
    } catch (error) {
      console.error("OTP verification failed:", error);

      if (error?.message) {
        customToast.error(error.message);
      } else {
        customToast.error("Invalid verification code. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0 || !userEmail) return;

    setResendCooldown(30); // 30 seconds cooldown
    setOtp(["", "", "", "", "", ""]);
    setErrors({});

    // Focus first input
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    try {
      const response = await api.post(
        "/api/auth/resend-otp",
        {
          email: userEmail,
          type: "signup",
        },
        {
          isProtected: false,
        }
      );

      console.log("OTP resent successfully:", response);
    } catch (error) {
      console.error("Failed to resend OTP:", error);

      // Handle API errors
      if (error?.message) {
        setErrors({ general: error.message });
      } else if (error?.error) {
        setErrors({ general: error.error });
      } else {
        setErrors({ general: "Failed to resend OTP. Please try again." });
      }
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Go Back Link - Fixed to top left */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10">
        <button onClick={() => navigate("/signup")} className="inline-flex items-center text-[#4BEEA2] hover:text-green-400 transition-colors">
          <ChevronLeft className="w-7 h-7 mr-2" />
          <p className="text-[#ffffff]">Go Back</p>
        </button>
      </div>

      {/* Central Content */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="text-center">
            {/* Title */}
            <h1 className="text-white text-3xl font-bold mb-4">Email Verification</h1>

            {/* Instructions */}
            <p className="text-white text-sm mb-2">We have sent you a verification code to your email address</p>

            {/* Email Address */}
            <p className="text-white text-sm font-semibold mb-8">{userEmail}</p>

            {/* General Error Display */}
            {errors.general && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {errors.general}
                </div>
              </div>
            )}

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
                      onPaste={handlePaste}
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
                    Resend Code
                  </button>
                )}
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                disabled={loading || otp.some((digit) => digit === "")}
                className={`w-full font-bold py-3 px-4 rounded-[30px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                  loading || otp.some((digit) => digit === "") ? "bg-[#6d6262ff] cursor-not-allowed" : "bg-[#4BEEA2] cursor-pointer hover:bg-[#3dd48a]"
                }`}
              >
                {loading ? "Verifying..." : "Verify"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
