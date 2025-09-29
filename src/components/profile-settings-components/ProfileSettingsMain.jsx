import { useState } from "react";
import { User, Mail, Eye, EyeOff, Trash2, Check } from "lucide-react";
import { useUserStore } from "../../store/userStore";
import customToast from "../../lib/toast";

const ProfileSettingsMain = () => {
  const { user } = useUserStore();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Profile form state
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Implement profile update API call
      console.log("Updating profile:", profileData);
      customToast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update failed:", error);
      customToast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      customToast.error("New passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // TODO: Implement password update API call
      console.log("Updating password");
      customToast.success("Password updated successfully!");
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      console.error("Password update failed:", error);
      customToast.error("Failed to update password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion
    customToast.error("Account deletion is not implemented yet");
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
                      className="w-full px-4 py-3 bg-[#FFFFFF]/7 border border-[#FFFFFF]/7 rounded-lg text-xs text-[#ffffff]/50 placeholder:text-xs placeholder:text-[#FFFFFF]/50 focus:outline-none focus:ring-2 focus:ring-[#4BEEA2] focus:border-[#4BEEA2] transition-colors"
                    />
                    <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#ffffff]/50" size={16} />
                  </div>
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
                  disabled={loading}
                  className={`w-full bg-[#4BEEA2] text-black py-3 px-4 rounded-lg transition-colors ${
                    loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#3DD084]"
                  }`}
                >
                  {loading ? "Updating..." : "Update Profile"}
                </button>
              </div>
            </form>
          </div>

          {/* Change Password Sub-section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Change Password</h3>
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              {/* Old Password - Full width */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Old Password</label>
                  <div className="relative">
                    <input
                      type={showOldPassword ? "text" : "password"}
                      disabled
                      name="oldPassword"
                      value={passwordData.oldPassword}
                      onChange={handlePasswordChange}
                      placeholder="********"
                      className="w-full px-4 py-3 bg-[#FFFFFF]/7 border border-[#FFFFFF]/7 rounded-lg text-xs text-[#ffffff]/50 placeholder:text-xs placeholder:text-[#FFFFFF]/50 focus:outline-none focus:ring-2 focus:ring-[#4BEEA2] focus:border-[#4BEEA2] transition-colors"
                    />
                    <button type="button" onClick={() => setShowOldPassword(!showOldPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {showOldPassword ? <EyeOff className="text-[#4BEEA2]" size={16} /> : <Eye className="text-[#4BEEA2]" size={16} />}
                    </button>
                  </div>
                </div>
              </div>
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
                      className="w-full px-4 py-3 bg-[#FFFFFF]/7 border border-[#FFFFFF]/7 rounded-lg text-xs text-[#ffffff]/50 placeholder:text-xs placeholder:text-[#FFFFFF]/50 focus:outline-none focus:ring-2 focus:ring-[#4BEEA2] focus:border-[#4BEEA2] transition-colors"
                    />
                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {showNewPassword ? <EyeOff className="text-[#4BEEA2]" size={16} /> : <Eye className="text-[#4BEEA2]" size={16} />}
                    </button>
                  </div>
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
                      className="w-full px-4 py-3 bg-[#FFFFFF]/7 border border-[#FFFFFF]/7 rounded-lg text-xs text-[#ffffff]/50 placeholder:text-xs placeholder:text-[#FFFFFF]/50 focus:outline-none focus:ring-2 focus:ring-[#4BEEA2] focus:border-[#4BEEA2] transition-colors"
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
                </div>
              </div>

              {/* Update Password Button */}
              <div className="md:w-1/4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-[#4BEEA2] text-black font-semibold py-3 px-4 rounded-lg transition-colors ${
                    loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#3DD084]"
                  }`}
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsMain;
