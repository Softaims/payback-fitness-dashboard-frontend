import { useState } from "react";
import { User, Mail, Eye, EyeOff, AlertCircle, Check } from "lucide-react";
import { signupSchema } from "../validation/signupValidation";
import { validateForm } from "../validation/validateForm";
import api from "../lib/apiClient";
import { useNavigate } from "react-router-dom";
import customToast from "../lib/toast";
const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
    const fieldErrors = validateForm(signupSchema, { ...formData, acceptTerms });
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      await api.post(
        "/api/auth/signup",
        {
          email: formData.email,
          password: formData.password,
          name: formData.name,
        },
        {
          isProtected: false,
        }
      );

      customToast.success("Account created successfully! Please verify your email.");
      setTimeout(() => {
        navigate("/email-verification", { state: { email: formData.email } });
      }, 2000);
    } catch (error) {
      console.error("Signup failed:", error);

      // Show error toast
      if (error?.message) {
        customToast.error(error.message);
      } else {
        customToast.error("Failed to create account.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Background Image with Branding */}
      <div className="hidden lg:flex flex-1 relative">
        <img src="/images/AuthImage.jpg" alt="Background" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.8)" }} />
        <div className="relative z-10 p-8 h-full flex flex-col">
          <div className="mt-10 flex items-center mb-8">
            <img src="/images/PaybackLogo.svg" alt="PayBack Fitness Logo" />
            <div>
              <h1 className="text-2xl font-bold tracking-[0.1em]">
                <span className="text-[#4BEEA2] font-bold">Pay</span>
                <span className="text-white font-bold">Back</span>
              </h1>
              <p className="text-[#FFFFFF]/50 text-sm tracking-[0.8em]">Fitness</p>
            </div>
          </div>
          <div className="mt-auto mb-8">
            <p className="text-white text-2xl font-bold leading-relaxed text-left">
              Don’t just work out. Get
              <br />
              PayBack! Compete, commit, and
              <br />
              cash out when you crush it.
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Signup Form */}
      <div className="flex-1 flex items-start lg:items-center justify-center px-4 sm:px-6 lg:px-0 pb-8">
        <div className="w-full max-w-md">
          {/* Mobile View logo */}
          <div className="lg:hidden mt-10 flex items-center justify-start mb-8">
            <img src="/images/PaybackLogo.svg" alt="PayBack Fitness Logo" />
            <div>
              <h1 className="text-2xl font-bold tracking-[0.1em]">
                <span className="text-[#4BEEA2] font-bold">Pay</span>
                <span className="text-white font-bold">Back</span>
              </h1>
              <p className="text-[#FFFFFF]/50 text-sm tracking-[0.8em]">Fitness</p>
            </div>
          </div>
          {/* Welcome Text */}
          <div className="mb-8 text-left">
            <h2 className="text-white text-3xl font-bold mb-2">Sign Up</h2>
            <p className="text-[#FFFFFF]/50 text-sm">Enter your account details and get started</p>
          </div>

          {/* General Error Display */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-center text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 mr-2" />
                {errors.general}
              </div>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="username"
                  className={`w-full px-4 py-3 bg-[#FFFFFF]/7 border rounded-[30px] text-xs text-[#ffffff]/50 placeholder:text-xs placeholder:text-[#FFFFFF]/50 focus:outline-none focus:ring-2 ${
                    errors.name ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-[#FFFFFF]/7 focus:ring-[#4BEEA2] focus:border-[#4BEEA2]"
                  }`}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  {errors.name ? <AlertCircle className="w-4 h-4 text-red-500" /> : <User className="w-4 h-4 text-[#ffffff]/50" />}
                </div>
              </div>
              {errors.name && (
                <div className="mt-2 flex items-center text-red-500 text-xs">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.name}
                </div>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">Email Address</label>
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

            {/* Password Field */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="********"
                  className={`w-full px-4 py-3 bg-[#FFFFFF]/7 border rounded-[30px] text-[#ffffff]/50 placeholder:text-xs placeholder-[#FFFFFF]/50 focus:outline-none focus:ring-2 ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-[#FFFFFF]/7 focus:ring-[#4BEEA2] focus:border-[#4BEEA2]"
                  }`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  {showPassword ? <EyeOff className="cursor-pointer w-4 h-4 text-[#4BEEA2]" /> : <Eye className="cursor-pointer w-4 h-4 text-[#4BEEA2]" />}
                </button>
              </div>
              {errors.password && (
                <div className="mt-2 flex items-center text-red-500 text-xs">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.password}
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="********"
                  className={`w-full px-4 py-3 bg-[#FFFFFF]/7 border rounded-[30px] text-[#ffffff]/50 placeholder:text-xs placeholder-[#FFFFFF]/50 focus:outline-none focus:ring-2 ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-[#FFFFFF]/7 focus:ring-[#4BEEA2] focus:border-[#4BEEA2]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="cursor-pointer w-4 h-4 text-[#4BEEA2]" />
                  ) : (
                    <Eye className="cursor-pointer w-4 h-4 text-[#4BEEA2]" />
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

            {/* Terms and Conditions Checkbox */}
            <div>
              <label className="flex items-start cursor-pointer">
                <div className="relative flex-shrink-0 w-4 h-4">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="
                      peer w-4 h-4 appearance-none 
                      rounded border-2 border-[#4BEEA2] 
                      bg-[#1a1a1a] 
                      checked:border-[#4BEEA2]
                    "
                  />
                  <svg
                    className="absolute top-0 left-0 w-4 h-4 text-[#4BEEA2] hidden peer-checked:block pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="ml-3 text-[#ffffff]/50 text-xs leading-relaxed">
                  I've read and agrees on the{" "}
                  <a href="#" className="text-[#4BEEA2] hover:text-green-400 transition-colors">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#4BEEA2] hover:text-green-400 transition-colors">
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>
              {errors.acceptTerms && (
                <div className="mt-2 flex items-center text-red-500 text-xs">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.acceptTerms}
                </div>
              )}
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full font-semibold py-3 px-4 rounded-[30px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                loading ? "bg-[#6d6262ff] cursor-not-allowed" : "cursor-pointer  bg-[#4BEEA2] hover:bg-[#3dd48a]"
              }`}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>

            {/* Login Link */}
            <div className="text-center">
              <span className="text-[#ffffff]/50 text-sm">Already have an account? </span>
              <a href="/login" className="text-[#4BEEA2] hover:text-green-400 text-sm font-medium transition-colors">
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
