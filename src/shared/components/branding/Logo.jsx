/**
 * PayBack Fitness Logo Component
 * Consistent branding across user and admin panels
 */
const Logo = ({ className = "", showSubtext = true, size = "md" }) => {
  const sizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img src="/images/PaybackLogo.svg" alt="PayBack Fitness Logo" />
      <div>
        <h1 className={`${sizes[size]} font-bold tracking-[0.1em]`}>
          <span className="text-[#4BEEA2] font-bold">Pay</span>
          <span className="text-white font-bold">Back</span>
        </h1>
        {showSubtext && <p className="text-[#FFFFFF]/50 text-sm tracking-[0.8em]">Fitness</p>}
      </div>
    </div>
  );
};

export default Logo;
