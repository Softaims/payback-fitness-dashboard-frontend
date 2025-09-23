import { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { resetPasswordSchema } from "../../validation/resetPasswordValidation";
import { validateForm } from "../../validation/validateForm";
import api from "../../lib/apiClient";
import customToast from "../../lib/toast";

const ResetPasswordStep1 = ({ onNext }) => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    const fieldErrors = validateForm(resetPasswordSchema, formData);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      await api.post(
        "/api/auth/set-new-password",
        {
          newPassword: formData.newPassword,
        },
        {
          isProtected: false,
        }
      );
      customToast.success("Password reset successfully! You can now login with your new password.");
      onNext();
    } catch (error) {
      console.error("Failed to reset password:", error);
      if (error?.message) {
        customToast.error(error.message);
      } else {
        customToast.error("Failed to reset password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      {/* Reset Password Icon */}
      <div className="mb-6">
        <img src="/images/resetPassword.png" alt="Reset Password" className="w-20 h-20 mx-auto" />
      </div>

      {/* Title */}
      <h1 className="text-white text-3xl font-bold mb-4">Reset Password</h1>

      {/* Instructions */}
      <p className="text-[#ffffff]/50 text-sm mb-8">Enter your new password to access your account.</p>

      {/* Reset Password Form */}
      <form onSubmit={handleSubmit}>
        {/* New Password Field */}
        <div className="mb-6">
          <label className="block text-white text-sm font-medium mb-2 text-left">New Password</label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              placeholder="Enter new password"
              className={`w-full px-4 py-3 bg-[#FFFFFF]/7 border rounded-lg text-xs text-[#ffffff]/50 placeholder:text-xs placeholder:text-[#FFFFFF]/50 focus:outline-none focus:ring-2 ${
                errors.newPassword ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-[#FFFFFF]/7 focus:ring-[#4BEEA2] focus:border-[#4BEEA2]"
              }`}
            />
            <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {showNewPassword ? <EyeOff className="cursor-pointer w-4 h-4 text-[#4BEEA2]" /> : <Eye className="cursor-pointer w-4 h-4 text-[#4BEEA2]" />}
            </button>
          </div>
          {errors.newPassword && (
            <div className="mt-2 flex items-center text-red-500 text-xs">
              <AlertCircle className="w-3 h-3 mr-1" />
              {errors.newPassword}
            </div>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="mb-6">
          <label className="block text-white text-sm font-medium mb-2 text-left">Re-Enter New Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Re-enter new password"
              className={`w-full px-4 py-3 bg-[#FFFFFF]/7 border rounded-lg text-xs text-[#ffffff]/50 placeholder:text-xs placeholder:text-[#FFFFFF]/50 focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-[#FFFFFF]/7 focus:ring-[#4BEEA2] focus:border-[#4BEEA2]"
              }`}
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {showConfirmPassword ? <EyeOff className="cursor-pointer w-4 h-4 text-[#4BEEA2]" /> : <Eye className="cursor-pointer w-4 h-4 text-[#4BEEA2]" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <div className="mt-2 flex items-center text-red-500 text-xs">
              <AlertCircle className="w-3 h-3 mr-1" />
              {errors.confirmPassword}
            </div>
          )}
        </div>

        {/* General Error Message */}
        {errors.general && (
          <div className="mb-6 flex items-center justify-center text-red-500 text-xs">
            <AlertCircle className="w-3 h-3 mr-1" />
            {errors.general}
          </div>
        )}

        {/* Continue Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full font-bold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 bg-[#4BEEA2] ${
            loading ? "cursor-not-allowed" : "cursor-pointer hover:bg-[#3dd48a]"
          }`}
        >
          {loading ? "Resetting..." : "Continue"}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordStep1;
