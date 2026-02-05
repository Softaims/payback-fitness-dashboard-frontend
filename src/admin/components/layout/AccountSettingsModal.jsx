import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { User, Mail, Upload, X, AlertCircle } from "lucide-react";
import { useAdminAuthStore } from "../../store/adminAuthStore";
import { Modal, UserAvatar } from "../dashboard";
import api from "../../../shared/lib/apiClient";
import customToast from "../../../shared/lib/toast";
import { profileSchema } from "../../../user/validation/profileValidation";
import { validateForm } from "../../../user/validation/validateForm";

/**
 * Account Settings Modal
 * Allows admin to update profile name and avatar
 */
const AccountSettingsModal = ({ isOpen, onClose }) => {
  const { admin, setAdmin } = useAdminAuthStore();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: admin?.name || "",
    email: admin?.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 800KB as per Figma)
    const maxSize = 800 * 1024; // 800KB
    if (file.size > maxSize) {
      customToast.error("File size must be less than 800KB");
      return;
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      customToast.error("Only JPG, PNG, and GIF files are allowed");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const fieldErrors = validateForm(profileSchema, { name: formData.name });
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    try {
      // Create FormData for multipart/form-data
      const submitData = new FormData();
      submitData.append("name", formData.name);
      if (selectedFile) {
        submitData.append("avatar", selectedFile);
      }

      const response = await api.patch("/api/user/profile", submitData, {
        isProtected: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setAdmin(response?.data);
      customToast.success("Profile updated successfully");
      handleRemoveFile();
      onClose();
    } catch (error) {
      console.error("Profile update failed:", error);
      customToast.error(error?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({ name: admin?.name || "", email: admin?.email || "" });
      setErrors({});
      handleRemoveFile();
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Account Settings"
      subtitle="Update your profile information"
    >
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Avatar Upload Section */}
          <div>
            <label className="block text-sm font-medium text-white mb-3">
              Profile Picture
            </label>
            <div className="flex items-center gap-4">
              <UserAvatar
                src={previewUrl || admin?.avatar}
                name={admin?.name || admin?.email}
                size="lg"
              />
              <div className="flex-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                {!selectedFile ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-[#FFFFFF]/10 text-white rounded-lg hover:bg-[#FFFFFF]/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Upload className="w-4 h-4" />
                    <span className="text-sm">Upload Photo</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X className="w-4 h-4" />
                    <span className="text-sm">Remove Photo</span>
                  </button>
                )}
                <p className="text-xs text-[#FFFFFF]/50 mt-2">
                  JPG, GIF or PNG. Max size of 800K
                </p>
              </div>
            </div>
          </div>

          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white mb-2"
            >
              Name
            </label>
            <div className="relative">
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                disabled={loading}
                className={`w-full px-4 py-3 pr-10 bg-[#1a2e23] border rounded-lg text-white placeholder-[#FFFFFF]/50 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-[#FFFFFF]/10 focus:ring-[#4BEEA2] focus:border-[#4BEEA2]"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              />
              <User className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#FFFFFF]/50" />
            </div>
            {errors.name && (
              <div className="mt-2 flex items-center text-red-500 text-xs">
                <AlertCircle className="w-3 h-3 mr-1" />
                {errors.name}
              </div>
            )}
          </div>

          {/* Email Input (Disabled) */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full px-4 py-3 pr-10 bg-[#1a2e23] border border-[#FFFFFF]/10 rounded-lg text-[#FFFFFF]/50 cursor-not-allowed"
              />
              <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#FFFFFF]/50" />
            </div>
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

AccountSettingsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AccountSettingsModal;
