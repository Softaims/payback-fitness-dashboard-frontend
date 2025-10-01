import { useState } from "react";
import { ChevronLeft, AlertCircle } from "lucide-react";
import { referralCodeSchema } from "../validation/referralCodeValidation";
import { validateForm } from "../validation/validateForm";
import { useNavigate } from "react-router-dom";
import api from "../lib/apiClient";
import customToast from "../lib/toast";

const ReferralCodePage = () => {
  const [referralCode, setReferralCode] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setReferralCode(e.target.value);
    // Clear error when user starts typing
    if (errors.referralCode) {
      setErrors({ ...errors, referralCode: undefined });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const fieldErrors = validateForm(referralCodeSchema, { referralCode });

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      await api.post(
        "/api/referral/claim",
        {
          referralCode: referralCode,
        },
        {
          isProtected: false,
        }
      );

      customToast.success("Referral code claimed successfully!");
      setTimeout(() => {
        navigate("/onboarding-subscription");
      }, 2000);
    } catch (error) {
      console.error("Referral code verification failed:", error);
      if (error?.message) {
        customToast.error(error.message);
      } else {
        customToast.error("Invalid referral code. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    console.log("Skipping referral code");
    // Navigate to subscription page without referral code
    navigate("/onboarding-subscription");
  };

  return (
    <div className="min-h-screen relative">
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
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Referral Code Input Field */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">Referral Code</label>
                <div className="relative">
                  <input
                    type="text"
                    name="referralCode"
                    value={referralCode}
                    onChange={handleInputChange}
                    placeholder="Enter referral code"
                    className={`w-full px-4 py-3 bg-[#FFFFFF]/7 border rounded-lg text-xs text-[#ffffff]/50 placeholder:text-xs placeholder:text-[#FFFFFF]/50 focus:outline-none focus:ring-2 ${
                      errors.referralCode
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-[#FFFFFF]/7 focus:ring-[#4BEEA2] focus:border-[#4BEEA2]"
                    }`}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {errors.referralCode ? <AlertCircle className="w-4 h-4 text-red-500" /> : null}
                  </div>
                </div>
                {errors.referralCode && (
                  <div className="mt-2 flex items-center text-red-500 text-xs">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.referralCode}
                  </div>
                )}
              </div>

              {/* Skip Link */}
              <div className="text-center">
                <button type="button" onClick={handleSkip} className="cursor-pointer text-[#4BEEA2] hover:text-green-400 text-sm font-medium transition-colors">
                  Skip
                </button>
              </div>

              {/* Continue Button */}
              <button
                type="submit"
                disabled={loading || !referralCode.trim()}
                className={`w-full font-bold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 bg-[#4BEEA2] hover:bg-[#3dd48a] ${
                  loading || !referralCode.trim() ? "cursor-not-allowed" : "cursor-pointer"
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
