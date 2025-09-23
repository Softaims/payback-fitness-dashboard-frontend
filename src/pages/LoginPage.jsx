import React, { useState } from "react";
import { Mail, Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", { email, password, rememberMe });
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

      {/* Right Section - Login Form */}
      <div className="flex-1 lg:flex-1 bg-gradient-to-r from-[#0B0F0D]/90 via-[#0B0F0D] to-[#0B0F0D] flex items-center justify-center lg:justify-left pl-8 lg:pl-20">
        <div className="w-full max-w-md">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  className="w-full px-4 py-3 bg-[#FFFFFF]/7 border-[#FFFFFF]/7 rounded-lg text-xs text-[#ffffff]/50 placeholder:text-xs placeholder:text-[#FFFFFF]/50 focus:outline-none focus:ring-2 focus:ring-[#4BEEA2] focus:border-[#4BEEA2]"
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Mail className="w-4 h-4 text-[#ffffff]/50" />
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="w-full px-4 py-3 bg-[#FFFFFF]/7 border-[#FFFFFF]/7 rounded-lg text-[#ffffff]/50 placeholder:text-xs placeholder-[#FFFFFF]/50 focus:outline-none focus:ring-2 focus:ring-[#4BEEA2] focus:border-[#4BEEA2]"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {showPassword ? <EyeOff className="cursor-pointer w-4 h-4 text-[#4BEEA2]" /> : <Eye className="cursor-pointer w-4 h-4 text-[#4BEEA2]" />}
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="
      peer w-4 h-4 appearance-none 
      rounded border-2 border-[#4BEEA2] 
      bg-[#1a1a1a] 
      checked:border-[#4BEEA2]
      relative
    "
                />
                <svg
                  className="absolute w-3 h-3 text-[#4BEEA2] hidden peer-checked:block pointer-events-none ml-[2px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>

                <span className="ml-2 text-[#ffffff]/50 text-xs">Remember Me</span>
              </label>

              <a href="#" className="text-[#4BEEA2] text-sm hover:text-green-400 transition-colors">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="cursor-pointer w-full bg-[#4BEEA2] font-bold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Login
            </button>

            {/* Sign Up Link */}
            <div className="text-center">
              <span className="text-white text-sm">Don't have an account? </span>
              <a href="#" className="text-[#4BEEA2] hover:text-green-400 text-sm font-medium transition-colors">
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
