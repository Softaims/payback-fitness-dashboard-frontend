import { useState } from "react";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";

/**
 * Reusable Login Form Component
 * Can be customized for User or Admin authentication
 */
const LoginForm = ({
  onSubmit,
  showSignupLink = true,
  showForgotPassword = true,
  signupPath = "/signup",
  forgotPasswordPath = "/forgot-password",
  validationSchema,
  validateForm,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    // Validate if validation schema provided
    if (validationSchema && validateForm) {
      const fieldErrors = validateForm(validationSchema, formData);
      if (Object.keys(fieldErrors).length > 0) {
        setErrors(fieldErrors);
        return;
      }
    }

    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      // Error handling is done in parent
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Field */}
      <Input
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="example@gmail.com"
        error={errors.email}
        icon={Mail}
        required
      />

      {/* Password Field */}
      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="********"
        error={errors.password}
        required
      />

      {/* Forgot Password */}
      {showForgotPassword && (
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={() => navigate(forgotPasswordPath)}
            className="text-[#4BEEA2] text-sm hover:text-green-400 transition-colors cursor-pointer"
          >
            Forgot Password?
          </button>
        </div>
      )}

      {/* Login Button */}
      <Button type="submit" variant="primary" size="md" loading={loading} disabled={loading} className="w-full">
        {loading ? "Logging in..." : "Login"}
      </Button>

      {/* Sign Up Link */}
      {showSignupLink && (
        <div className="text-center">
          <span className="text-white text-sm">Don't have an account? </span>
          <button
            type="button"
            onClick={() => navigate(signupPath)}
            className="text-[#4BEEA2] hover:text-green-400 text-sm font-medium transition-colors cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      )}
    </form>
  );
};

export default LoginForm;
