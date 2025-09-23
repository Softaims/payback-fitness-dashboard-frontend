import { useState, useRef, useEffect } from "react";
import { ChevronLeft, AlertCircle } from "lucide-react";
import { referralCodeSchema } from "../validation/referralCodeValidation";
import { validateForm } from "../validation/validateForm";

const ReferralCodePage = () => {
  const [referralCode, setReferralCode] = useState(["", "", "", "", ""]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  // Auto-focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index, value) => {
    // Only allow single character
    if (value.length > 1) return;

    // Only allow numeric input - ignore non-numeric characters
    if (value && !/^\d$/.test(value)) {
      return;
    }

    const newReferralCode = [...referralCode];
    newReferralCode[index] = value;
    setReferralCode(newReferralCode);

    // Clear error when user starts typing
    if (errors[`referralCode_${index}`] || errors.referralCode) {
      const newErrors = { ...errors };
      delete newErrors[`referralCode_${index}`];
      delete newErrors.referralCode;
      setErrors(newErrors);
    }

    // Auto-focus next input if value is entered
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !referralCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Handle paste
    if (e.key === "v" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then((text) => {
        const pastedDigits = text.replace(/\D/g, "").slice(0, 5);
        const newReferralCode = ["", "", "", "", ""];
        pastedDigits.split("").forEach((digit, i) => {
          if (i < 5) newReferralCode[i] = digit;
        });
        setReferralCode(newReferralCode);

        // Focus the next empty field or last field
        const nextEmptyIndex = newReferralCode.findIndex((digit) => digit === "");
        const focusIndex = nextEmptyIndex === -1 ? 4 : nextEmptyIndex;
        inputRefs.current[focusIndex]?.focus();
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const referralCodeString = referralCode.join("");
    const fieldErrors = validateForm(referralCodeSchema, { referralCode: referralCodeString });

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      // Handle referral code verification logic here
      console.log("Referral code verification attempt:", referralCodeString);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Referral code verified successfully!");
      // Navigate to next page (dashboard or onboarding)
    } catch (error) {
      console.error("Referral code verification failed:", error);
      setErrors({ referralCode: "Invalid referral code. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    console.log("Skipping referral code");
    // Navigate to next page without referral code
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0B0F0D]/90 via-[#0B0F0D] to-[#0B0F0D] relative">
      {/* Go Back Link - Fixed to top left */}
      <div className="absolute top-6 left-6 z-10">
        <a href="/email-verification" className="inline-flex items-center text-[#4BEEA2] hover:text-green-400 transition-colors">
          <ChevronLeft className="w-7 h-7 mr-2" />
          <p className="text-[#ffffff]">Go Back</p>
        </a>
      </div>

      {/* Central Content */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="text-center">
            {/* Referral Code Icon */}
            <div className="mb-6">
              <img src="/images/referralCode.png" alt="Referral Code" className="w-20 h-20 mx-auto" />
            </div>

            {/* Title */}
            <h1 className="text-white text-3xl font-bold mb-4">Referral Code</h1>

            {/* Instructions */}
            <p className="text-[#ffffff]/50 text-sm mb-8">Please enter the referral code if you have any.</p>

            {/* Referral Code Input Form */}
            <form onSubmit={handleSubmit}>
              {/* Referral Code Input Fields */}
              <div className="flex justify-center gap-3 mb-6">
                {referralCode.map((digit, index) => (
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
                        errors[`referralCode_${index}`] || errors.referralCode
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
              {errors.referralCode && (
                <div className="mb-6 flex items-center justify-center text-red-500 text-xs">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.referralCode}
                </div>
              )}

              {/* Skip Link */}
              <div className="mb-8">
                <button type="button" onClick={handleSkip} className="cursor-pointer text-[#4BEEA2] hover:text-green-400 text-sm font-medium transition-colors">
                  Skip
                </button>
              </div>

              {/* Continue Button */}
              <button
                type="submit"
                disabled={loading || referralCode.some((digit) => digit === "")}
                className={`w-full font-bold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 bg-[#4BEEA2] ${
                  loading || referralCode.some((digit) => digit === "") ? "cursor-not-allowed" : "cursor-pointer hover:bg-[#3dd48a]"
                }`}
              >
                {loading ? "Verifying..." : "Continue"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralCodePage;
