import { useState } from "react";
import { Mail, AlertCircle } from "lucide-react";
import { forgotPasswordSchema } from "../../validation/forgotPasswordValidation";
import { validateForm } from "../../validation/validateForm";
import api from "../../lib/apiClient";
import customToast from "../../lib/toast";

const ForgotPasswordStep1 = ({ onNext, userEmail, setUserEmail }) => {
  const [formData, setFormData] = useState({
    email: userEmail || "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const fieldErrors = validateForm(forgotPasswordSchema, formData);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      await api.post(
        "/api/auth/forgot-password",
        {
          email: formData.email,
        },
        {
          isProtected: false,
        }
      );

      customToast.success("OTP sent successfully! Please check your email.");
      setUserEmail(formData.email);
      onNext();
    } catch (error) {
      console.error("Failed to send OTP:", error);
      if (error?.message) {
        customToast.error(error.message);
      } else {
        customToast.error("Failed to send OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      {/* Forgot Password Icon */}
      <div className="mb-6">
        <img src="/images/forgotPassword.svg" alt="Forgot Password" className="w-20 h-20 mx-auto" />
      </div>

      {/* Title */}
      <h1 className="text-white text-3xl font-bold mb-4">Forgot Password?</h1>

      {/* Instructions */}
      <p className="text-[#ffffff]/50 text-sm mb-8">No worries, type in your email address and we’ll send you a verification code to reset your password.</p>

      {/* Forgot Password Form */}
      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="mb-6">
          <label className="block text-white text-sm font-medium mb-2 text-left">Email Address</label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="example@gmail.com"
              className={`w-full px-4 py-3 bg-[#FFFFFF]/7 border rounded-[30px] text-xs text-[#ffffff]/50 placeholder:text-xs placeholder:text-[#FFFFFF]/50 focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-[#FFFFFF]/7 focus:ring-[#4BEEA2] focus:border-[#4BEEA2]"
              }`}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              {errors.email ? <AlertCircle className="w-4 h-4 text-red-500" /> : <Mail className="w-4 h-4 text-[#ffffff]/50" />}
            </div>
          </div>
          {errors.email && (
            <div className="mt-2 flex items-center text-red-500 text-xs">
              <AlertCircle className="w-3 h-3 mr-1" />
              {errors.email}
            </div>
          )}
        </div>

        {/* Send OTP Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full font-bold py-3 px-4 rounded-[30px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 bg-[#4BEEA2] ${
            loading ? "cursor-not-allowed" : "cursor-pointer hover:bg-[#3dd48a]"
          }`}
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordStep1;
