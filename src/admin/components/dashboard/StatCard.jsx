import PropTypes from "prop-types";

/**
 * StatCard Component
 * Reusable stat card for displaying metrics in admin dashboard
 *
 * @param {string} title - Card title
 * @param {string|number} value - Main value to display
 * @param {React.Component} icon - Lucide icon component
 * @param {string} variant - Card variant: 'primary' | 'default'
 * @param {string} subtitle - Optional subtitle text
 * @param {string} className - Additional CSS classes
 */
const StatCard = ({
  title,
  value,
  icon: Icon,
  variant = "default",
  subtitle,
  className = "",
}) => {
  const variants = {
    primary: {
      container: "bg-[#4BEEA2] border-[#4BEEA2]",
      title: "text-[#0f1c16]",
      value: "text-[#0f1c16]",
      iconBg: "bg-[#0f1c16]/10",
      iconColor: "text-[#0f1c16]",
      subtitle: "text-[#0f1c16]/70",
    },
    default: {
      container: "bg-[#1a2e23] border-[#FFFFFF]/10 hover:border-[#FFFFFF]/20",
      title: "text-[#FFFFFF]/50",
      value: "text-white",
      iconBg: "bg-[#FFFFFF]/5",
      iconColor: "text-[#FFFFFF]/70",
      subtitle: "text-[#FFFFFF]/40",
    },
  };

  const style = variants[variant];

  return (
    <div
      className={`border rounded-xl p-6 transition-all duration-200 ${style.container} ${className}`}
    >
      {/* Title and Icon in same row */}
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-sm font-medium ${style.title}`}>
          {title}
        </h3>
        <div className={`${style.iconBg} p-3 rounded-lg`}>
          <Icon className={`w-5 h-5 ${style.iconColor}`} />
        </div>
      </div>

      <p className={`text-3xl font-bold mb-1 ${style.value}`}>
        {value}
      </p>

      {subtitle && (
        <p className={`text-xs ${style.subtitle}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.elementType.isRequired,
  variant: PropTypes.oneOf(["primary", "default"]),
  subtitle: PropTypes.string,
  className: PropTypes.string,
};

export default StatCard;
