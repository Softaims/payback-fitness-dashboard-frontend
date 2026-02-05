import { useState } from "react";
import PropTypes from "prop-types";
import { Eye, EyeOff, Check, AlertCircle } from "lucide-react";
import { Modal } from "../dashboard";
import api from "../../../shared/lib/apiClient";
import customToast from "../../../shared/lib/toast";
import { changePasswordSchema } from "../../../user/validation/changePasswordValidation";
import { validateForm } from "../../../user/validation/validateForm";

/**
 * Change Password Modal
 * Allows admin to change their password
 */
const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const fieldErrors = validateForm(changePasswordSchema, {
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    });
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    // Validate old password is provided
    if (!formData.oldPassword) {
      setErrors({ oldPassword: "Old password is required" });
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
          isProtected: true,
        }
      );

      customToast.success("Password changed successfully");
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      onClose();
    } catch (error) {
      console.error("Password change failed:", error);
      customToast.error(error?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setErrors({});
      onClose();
    }
  };

  const passwordsMatch =
    formData.newPassword &&
    formData.confirmPassword &&
    formData.newPassword === formData.confirmPassword;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Change Password"
      subtitle="Update your account password"
    >
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Old Password */}
          <div>
            <label
              htmlFor="oldPassword"
              className="block text-sm font-medium text-white mb-2"
            >
              Old Password
            </label>
            <div className="relative">
              <input
                id="oldPassword"
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                placeholder="Enter old password"
                disabled={loading}
                className={`w-full px-4 py-3 pr-10 bg-[#1a2e23] border rounded-lg text-white placeholder-[#FFFFFF]/50 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.oldPassword
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-[#FFFFFF]/10 focus:ring-[#4BEEA2] focus:border-[#4BEEA2]"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                disabled={loading}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#4BEEA2] disabled:opacity-50"
              >
                {showOldPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.oldPassword && (
              <div className="mt-2 flex items-center text-red-500 text-xs">
                <AlertCircle className="w-3 h-3 mr-1" />
                {errors.oldPassword}
              </div>
            )}
          </div>

          {/* New Password */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-white mb-2"
            >
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                disabled={loading}
                className={`w-full px-4 py-3 pr-10 bg-[#1a2e23] border rounded-lg text-white placeholder-[#FFFFFF]/50 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.newPassword
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-[#FFFFFF]/10 focus:ring-[#4BEEA2] focus:border-[#4BEEA2]"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                disabled={loading}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#4BEEA2] disabled:opacity-50"
              >
                {showNewPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <div className="mt-2 flex items-center text-red-500 text-xs">
                <AlertCircle className="w-3 h-3 mr-1" />
                {errors.newPassword}
              </div>
            )}
          </div>

          {/* Confirm New Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-white mb-2"
            >
              Re-Enter New Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter new password"
                disabled={loading}
                className={`w-full px-4 py-3 pr-10 bg-[#1a2e23] border rounded-lg text-white placeholder-[#FFFFFF]/50 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-[#FFFFFF]/10 focus:ring-[#4BEEA2] focus:border-[#4BEEA2]"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={loading}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#4BEEA2] disabled:opacity-50"
              >
                {passwordsMatch ? (
                  <Check className="w-5 h-5 text-[#4BEEA2]" />
                ) : showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <div className="mt-2 flex items-center text-red-500 text-xs">
                <AlertCircle className="w-3 h-3 mr-1" />
                {errors.confirmPassword}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-[#4BEEA2] text-[#0f1c16] font-semibold rounded-lg hover:bg-[#3dd891] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-transparent border border-[#FFFFFF]/10 text-white font-semibold rounded-lg hover:bg-[#FFFFFF]/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

ChangePasswordModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ChangePasswordModal;
