import { useState } from "react";
import { User, Mail, Eye, EyeOff, AlertCircle, Check } from "lucide-react";
import { signupSchema } from "../validation/signupValidation";
import { validateForm } from "../validation/validateForm";

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
      // Handle signup logic here (without API for now)
      console.log("Signup attempt:", { ...formData, acceptTerms });
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Signup successful!");
    } catch (error) {
      console.error("Signup failed:", error);
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
            <img src="/images/PaybackLogo.png" alt="PayBack Fitness Logo" className="h-14 w-14 mr-3" />
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
              Compete with Your Friends
              <br />
              Group, Stay Accountable & Get
              <br />
              Rewarded
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Signup Form */}
      <div className="flex-1 lg:flex-1 bg-gradient-to-r from-[#0B0F0D]/90 via-[#0B0F0D] to-[#0B0F0D] flex items-center justify-center lg:justify-left pl-8 lg:pl-20">
        <div className="w-full max-w-md">
          {/* Welcome Text */}
          <div className="mb-8 text-left">
            <h2 className="text-white text-3xl font-bold mb-2">Sign Up</h2>
            <p className="text-[#FFFFFF]/50 text-sm">Enter your account details and get started</p>
          </div>

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
                  className={`w-full px-4 py-3 bg-[#FFFFFF]/7 border rounded-lg text-xs text-[#ffffff]/50 placeholder:text-xs placeholder:text-[#FFFFFF]/50 focus:outline-none focus:ring-2 ${
                    errors.name ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-[#FFFFFF]/7 focus:ring-[#4BEEA2] focus:border-[#4BEEA2]"
                  }`}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
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
                  className={`w-full px-4 py-3 bg-[#FFFFFF]/7 border rounded-lg text-xs text-[#ffffff]/50 placeholder:text-xs placeholder:text-[#FFFFFF]/50 focus:outline-none focus:ring-2 ${
                    errors.email ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-[#FFFFFF]/7 focus:ring-[#4BEEA2] focus:border-[#4BEEA2]"
                  }`}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
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
                  className={`w-full px-4 py-3 bg-[#FFFFFF]/7 border rounded-lg text-[#ffffff]/50 placeholder:text-xs placeholder-[#FFFFFF]/50 focus:outline-none focus:ring-2 ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-[#FFFFFF]/7 focus:ring-[#4BEEA2] focus:border-[#4BEEA2]"
                  }`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
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
                  className={`w-full px-4 py-3 bg-[#FFFFFF]/7 border rounded-lg text-[#ffffff]/50 placeholder:text-xs placeholder-[#FFFFFF]/50 focus:outline-none focus:ring-2 ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-[#FFFFFF]/7 focus:ring-[#4BEEA2] focus:border-[#4BEEA2]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
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
              <label className="flex items-center cursor-pointer">
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
              className={`w-full font-bold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                loading ? "bg-gray-500 cursor-not-allowed" : "bg-[#4BEEA2] cursor-pointer hover:bg-[#3dd48a]"
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
