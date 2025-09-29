import { useState } from "react";
import { User, Mail, Eye, EyeOff, Trash2, Check, AlertCircle } from "lucide-react";
import { useUserStore } from "../../store/userStore";
import customToast from "../../lib/toast";
import api from "../../lib/apiClient";
import { changePasswordSchema } from "../../validation/changePasswordValidation";
import { profileSchema } from "../../validation/profileValidation";
import { validateForm } from "../../validation/validateForm";
import ConfirmationModal from "../global/ConfirmationModal";
const ProfileSettingsMain = () => {
  const { user, setUser } = useUserStore();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [deleteAccountLoading, setDeleteAccountLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({});
  const [profileErrors, setProfileErrors] = useState({});

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
    setProfileErrors({ ...profileErrors, [e.target.name]: undefined });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
    setPasswordErrors({ ...passwordErrors, [e.target.name]: undefined });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileErrors({});

    const fieldErrors = validateForm(profileSchema, profileData);
    if (Object.keys(fieldErrors).length > 0) {
      setProfileErrors(fieldErrors);
      return;
    }

    setProfileLoading(true);

    try {
      const response = await api.patch(
        "/api/user/profile",
        {
          name: profileData.name,
        },
        {
          isProtected: true,
        }
      );
      setUser(response?.data);
      customToast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update failed:", error);
      if (error?.message) {
        customToast.error(error.message);
      } else {
        customToast.error("Failed to update profile. Please try again.");
      }
    } finally {
      setProfileLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPasswordErrors({});

    const fieldErrors = validateForm(changePasswordSchema, passwordData);
    if (Object.keys(fieldErrors).length > 0) {
      setPasswordErrors(fieldErrors);
      return;
    }

    setPasswordLoading(true);

    try {
      await api.post(
        "/api/auth/set-new-password",
        {
          newPassword: passwordData.newPassword,
        },
        {
          isProtected: true,
        }
      );

      customToast.success("Password updated successfully!");
      setPasswordData({ newPassword: "", confirmPassword: "" });
    } catch (error) {
      console.error("Password update failed:", error);
      if (error?.message) {
        customToast.error(error.message);
      } else {
        customToast.error("Failed to update password. Please try again.");
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteAccountConfirm = async () => {
    setDeleteAccountLoading(true);
    try {
      await api.delete("/api/user/account", {
        isProtected: true,
      });

      customToast.success("Account deleted successfully!");
      window.location.href = "/login";
    } catch (error) {
      console.error("Account deletion failed:", error);
      if (error?.message) {
        customToast.error(error.message);
      } else {
        customToast.error("Failed to delete account. Please try again.");
      }
    } finally {
      setDeleteAccountLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F0D] p-6">
      <div className="space-y-8">
        {/* Delete Account Section */}
        <div className="bg-[#ffffff]/7 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Delete Account</h2>
          <p className="text-[#ffffff]/50 text-sm mb-6 leading-relaxed">
            Deleting your account will permanently remove your profile and all data. Any remaining PF Coins will be forfeited and cannot be recovered. If you
            have an active subscription or are part of a group, your account will only be deleted after those are completed.
          </p>
          <button onClick={handleDeleteAccount} className="flex items-center gap-2  text-[#F65E53] rounded-lg transition-colors">
            <Trash2 size={18} className="text-[#F65E53]" />
            Delete Account
          </button>
        </div>

        {/* Profile Section */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-2">Profile</h2>
          <p className="text-[#ffffff]/70 text-sm mb-8">Here you can edit your profile details</p>

          {/* Edit Profile Sub-section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-6">Edit Profile</h3>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              {/* Name and Email in same row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      placeholder="username"
                      className={`w-full px-4 py-3 bg-[#FFFFFF]/7 border rounded-lg text-xs text-[#ffffff]/50 placeholder:text-xs placeholder:text-[#FFFFFF]/50 focus:outline-none focus:ring-2 transition-colors ${
                        profileErrors.name
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-[#FFFFFF]/7 focus:ring-[#4BEEA2] focus:border-[#4BEEA2]"
                      }`}
                    />
                    <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ffffff]/50" size={16} />
                  </div>
                  {profileErrors.name && (
                    <div className="mt-2 flex items-center text-red-500 text-xs">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {profileErrors.name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      disabled
                      value={profileData.email}
                      onChange={handleProfileChange}
                      placeholder="example@gmail.com"
                      className="w-full px-4 py-3 bg-[#FFFFFF]/7 border border-[#FFFFFF]/7 rounded-lg text-xs text-[#ffffff]/50 placeholder:text-xs placeholder:text-[#FFFFFF]/50 focus:outline-none focus:ring-2 focus:ring-[#4BEEA2] focus:border-[#4BEEA2] transition-colors"
                    />
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ffffff]/50" size={16} />
                  </div>
                </div>
              </div>

              {/* Update Profile Button */}
              <div className="md:w-1/4">
                <button
                  type="submit"
                  disabled={profileLoading}
                  className={`w-full bg-[#4BEEA2] text-black py-3 px-4 rounded-lg transition-colors ${
                    profileLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#3DD084]"
                  }`}
                >
                  {profileLoading ? "Updating..." : "Update Profile"}
                </button>
              </div>
            </form>
          </div>

          {/* Change Password Sub-section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Change Password</h3>
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              {/* New Password and Confirm Password in same row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="********"
                      className={`w-full px-4 py-3 bg-[#FFFFFF]/7 border rounded-lg text-xs text-[#ffffff]/50 placeholder:text-xs placeholder:text-[#FFFFFF]/50 focus:outline-none focus:ring-2 transition-colors ${
                        passwordErrors.newPassword
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-[#FFFFFF]/7 focus:ring-[#4BEEA2] focus:border-[#4BEEA2]"
                      }`}
                    />
                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {showNewPassword ? <EyeOff className="text-[#4BEEA2]" size={16} /> : <Eye className="text-[#4BEEA2]" size={16} />}
                    </button>
                  </div>
                  {passwordErrors.newPassword && (
                    <div className="mt-2 flex items-center text-red-500 text-xs">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {passwordErrors.newPassword}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Re-Enter New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="********"
                      className={`w-full px-4 py-3 bg-[#FFFFFF]/7 border rounded-lg text-xs text-[#ffffff]/50 placeholder:text-xs placeholder:text-[#FFFFFF]/50 focus:outline-none focus:ring-2 transition-colors ${
                        passwordErrors.confirmPassword
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-[#FFFFFF]/7 focus:ring-[#4BEEA2] focus:border-[#4BEEA2]"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {passwordData.confirmPassword && passwordData.newPassword === passwordData.confirmPassword ? (
                        <Check className="text-[#4BEEA2]" size={16} />
                      ) : showConfirmPassword ? (
                        <EyeOff className="text-[#4BEEA2]" size={16} />
                      ) : (
                        <Eye className="text-[#4BEEA2]" size={16} />
                      )}
                    </button>
                  </div>
                  {passwordErrors.confirmPassword && (
                    <div className="mt-2 flex items-center text-red-500 text-xs">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {passwordErrors.confirmPassword}
                    </div>
                  )}
                </div>
              </div>

              {/* Update Password Button */}
              <div className="md:w-1/4">
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className={`w-full bg-[#4BEEA2] text-black py-3 px-4 rounded-lg transition-colors ${
                    passwordLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#3DD084]"
                  }`}
                >
                  {passwordLoading ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAccountConfirm}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone. All your data, PF Coins, and subscriptions will be permanently lost."
        confirmText="Delete Account"
        cancelText="Cancel"
        confirmButtonColor="bg-red-600 hover:bg-red-700"
        loading={deleteAccountLoading}
      />
    </div>
  );
};

export default ProfileSettingsMain;
