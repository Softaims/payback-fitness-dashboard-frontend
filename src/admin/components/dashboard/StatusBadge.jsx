import PropTypes from "prop-types";

/**
 * StatusBadge Component
 * Displays status with appropriate color coding
 *
 * @param {string} status - Status value (e.g., 'active', 'expired', 'pending', 'cancelled')
 * @param {string} variant - Visual variant: 'default' | 'outlined'
 * @param {string} size - Badge size: 'sm' | 'md' | 'lg'
 * @param {string} className - Additional CSS classes
 */
const StatusBadge = ({
  status,
  variant = "default",
  size = "md",
  className = "",
}) => {
  const normalizedStatus = status?.toLowerCase() || "unknown";

  const statusStyles = {
    active: {
      bg: "bg-[#4BEEA2]/10",
      text: "text-[#4BEEA2]",
      border: "border-[#4BEEA2]/20",
    },
    expired: {
      bg: "bg-red-500/10",
      text: "text-red-500",
      border: "border-red-500/20",
    },
    pending: {
      bg: "bg-yellow-500/10",
      text: "text-yellow-500",
      border: "border-yellow-500/20",
    },
    cancelled: {
      bg: "bg-[#FFFFFF]/10",
      text: "text-[#FFFFFF]/50",
      border: "border-[#FFFFFF]/20",
    },
    completed: {
      bg: "bg-blue-500/10",
      text: "text-blue-500",
      border: "border-blue-500/20",
    },
    unknown: {
      bg: "bg-[#FFFFFF]/5",
      text: "text-[#FFFFFF]/40",
      border: "border-[#FFFFFF]/10",
    },
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-xs",
    lg: "px-4 py-1.5 text-sm",
  };

  const style = statusStyles[normalizedStatus] || statusStyles.unknown;

  const variantClasses =
    variant === "outlined"
      ? `border ${style.border} ${style.text}`
      : `${style.bg} ${style.text}`;

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap ${sizes[size]} ${variantClasses} ${className}`}
    >
      {status}
    </span>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["default", "outlined"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
};

export default StatusBadge;
