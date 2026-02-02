import Logo from "../branding/Logo";

/**
 * Shared Authentication Layout for both User and Admin login/signup
 * Provides consistent branding and structure
 */
const AuthLayout = ({
  children,
  title = "Welcome Back",
  subtitle = "To access your account please enter your account details.",
  tagline = (
    <>
      Don't just work out. Get
      <br />
      PayBack! Compete, commit, and
      <br />
      cash out when you crush it.
    </>
  ),
  showTagline = true,
}) => {
  return (
    <div className="min-h-screen flex">
      {/* Left Section - Background Image with Branding */}
      <div className="hidden lg:flex flex-1 relative">
        <img
          src="/images/AuthImage.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.8)" }}
        />
        <div className="relative z-10 p-8 h-full flex flex-col">
          <div className="mt-10 mb-8">
            <Logo size="md" showSubtext={true} />
          </div>
          {showTagline && (
            <div className="mt-auto mb-8">
              <p className="text-white text-2xl font-bold leading-relaxed text-left">{tagline}</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Section - Content Area */}
      <div className="flex-1 flex items-start lg:items-center justify-center px-4 sm:px-6 lg:px-0 pb-8">
        <div className="w-full max-w-md">
          {/* Mobile View Logo */}
          <div className="lg:hidden mt-10 mb-8">
            <Logo size="md" showSubtext={true} className="justify-start" />
          </div>

          {/* Title and Subtitle */}
          <div className="mb-8 text-left">
            <h2 className="text-white text-3xl font-bold mb-2">{title}</h2>
            <p className="text-[#FFFFFF]/50 text-sm">{subtitle}</p>
          </div>

          {/* Content (Forms, etc.) */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
