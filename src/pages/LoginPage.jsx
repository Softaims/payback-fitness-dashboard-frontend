import { useState } from "react";
import { Mail, Eye, EyeOff, AlertCircle } from "lucide-react";
import { loginSchema } from "../validation/loginValidation";
import { validateForm } from "../validation/validateForm";
import api from "../lib/apiClient";
import { useNavigate } from "react-router-dom";
import customToast from "../lib/toast";
import { useUserStore } from "../store/userStore";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserStore();
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
    const fieldErrors = validateForm(loginSchema, formData);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(
        "/api/auth/signin",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          isProtected: false,
        }
      );
      customToast.success("Login Successful");
      setTimeout(() => {
        setUser(response?.data?.user);
        localStorage.setItem("access_token", response?.data?.session?.access_token);
        localStorage.setItem("refresh_token", response?.data?.session?.refresh_token);
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Login failed:", error);
      if (error?.message) {
        customToast.error(error.message);
      } else {
        customToast.error("Invalid email or password. Please try again.");
      }
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

      {/* Right Section - Login Form */}
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
            <h2 className="text-white text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-[#FFFFFF]/50 text-sm">To access your account please enter your account details.</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-end">
              <a href="/forgot-password" className="text-[#4BEEA2] text-sm hover:text-green-400 transition-colors">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full font-bold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                loading ? "bg-[#4BEEA2]  cursor-not-allowed" : "bg-[#4BEEA2]  cursor-pointer hover:bg-[#3dd48a]"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Sign Up Link */}
            <div className="text-center">
              <span className="text-white text-sm">Don't have an account? </span>
              <a href="/signup" className="text-[#4BEEA2] hover:text-green-400 text-sm font-medium transition-colors">
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
