import { useNavigate } from "react-router-dom";
import AuthLayout from "../../shared/components/auth/AuthLayout";
import LoginForm from "../../shared/components/auth/LoginForm";
import { useAdminAuthStore } from "../store/adminAuthStore";
import { authService } from "../../shared/lib/authService";
import api from "../../shared/lib/apiClient";
import customToast from "../../shared/lib/toast";
import { loginSchema } from "../../user/validation/loginValidation";
import { validateForm } from "../../user/validation/validateForm";
import { USER_ROLES } from "../../shared/constants/config";

/**
 * Admin Login Page
 */
const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { setAdmin } = useAdminAuthStore();

  const handleAdminLogin = async (formData) => {
    try {
      const response = await authService.login(formData, api);

      // Validate admin role
      if (response.user?.role !== USER_ROLES.ADMIN) {
        customToast.error("Insufficient permissions. Admin access required.");
        throw new Error("Not an admin");
      }

      customToast.success("Admin Login Successful");
      setAdmin(response.user);

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Admin login failed:", error);
      if (error?.message && error.message !== "Not an admin") {
        customToast.error(error.message);
      }
      throw error;
    }
  };

  return (
    <AuthLayout
      title="Admin Portal"
      subtitle="Please login with your admin credentials to access the dashboard."
      tagline={
        <>
          Manage users, subscriptions,
          <br />
          and analytics with PayBack
          <br />
          Fitness Admin Portal.
        </>
      }
    >
      <LoginForm
        onSubmit={handleAdminLogin}
        showSignupLink={false}
        showForgotPassword={false}
        validationSchema={loginSchema}
        validateForm={validateForm}
      />
    </AuthLayout>
  );
};

export default AdminLoginPage;
