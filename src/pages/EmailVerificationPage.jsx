import { useState, useRef, useEffect } from "react";
import { AlertCircle, ChevronLeft } from "lucide-react";
import { otpSchema } from "../validation/otpValidation";
import { validateForm } from "../validation/validateForm";

const EmailVerificationPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef([]);

  // Mock email
  const userEmail = "ahmadali123@gmail.com";

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
    if (value && index < 4) {
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
        const pastedDigits = text.replace(/\D/g, "").slice(0, 5);
        const newOtp = ["", "", "", "", ""];
        pastedDigits.split("").forEach((digit, i) => {
          if (i < 5) newOtp[i] = digit;
        });
        setOtp(newOtp);

        // Focus the next empty field or last field
        const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
        const focusIndex = nextEmptyIndex === -1 ? 4 : nextEmptyIndex;
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
      // Handle verification logic here
      console.log("OTP verification attempt:", otpString);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Email verified successfully!");

      // Redirect to referral code page
      window.location.href = "/referral-code";
    } catch (error) {
      console.error("Verification failed:", error);
      setErrors({ otp: "Invalid verification code. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = () => {
    if (resendCooldown > 0) return;

    setResendCooldown(30); // 30 seconds cooldown
    setOtp(["", "", "", "", ""]);
    setErrors({});

    // Focus first input
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    // Handle resend logic here
    console.log("Resending OTP to:", userEmail);
  };
  console.log("error", errors);
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0B0F0D]/90 via-[#0B0F0D] to-[#0B0F0D] relative">
      {/* Go Back Link - Fixed to top left */}
      <div className="absolute top-6 left-6 z-10">
        <a href="/signup" className="inline-flex items-center text-[#4BEEA2] hover:text-green-400 transition-colors">
          <ChevronLeft className="w-7 h-7 mr-2" />
          <p className="text-[#ffffff]">Go Back</p>
        </a>
      </div>

      {/* Central Content */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="text-center">
            {/* Loading Spinner */}
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto relative">
                <svg className="w-16 h-16" viewBox="0 0 100 100" style={{ animation: "spin 3s linear infinite" }}>
                  <defs>
                    <linearGradient id="spinner-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4BEEA2" />
                      <stop offset="100%" stopColor="#4BEEA2" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#spinner-gradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="20 40"
                    strokeDashoffset="0"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-white text-3xl font-bold mb-4">Email Verification</h1>

            {/* Instructions */}
            <p className="text-white text-sm mb-2">We have sent you a verification code to your given email</p>

            {/* Email Address */}
            <p className="text-white text-sm font-medium mb-8">{userEmail}</p>

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
                      className={`w-12 h-12 text-center text-white text-lg font-bold bg-[#FFFFFF]/7 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
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
                className={`w-full font-bold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 bg-[#4BEEA2] ${
                  loading || otp.some((digit) => digit === "") ? "cursor-not-allowed" : "cursor-pointer hover:bg-[#3dd48a]"
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
