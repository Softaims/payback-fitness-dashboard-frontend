import PropTypes from "prop-types";

/**
 * GroupStatusBadge Component
 * Displays group status with appropriate styling
 *
 * @param {string} status - Group status (ongoing, upcoming, completed, active, past, deactivated)
 */
const GroupStatusBadge = ({ status }) => {
  const getStatusConfig = () => {
    switch (status?.toLowerCase()) {
      case "ongoing":
      case "upcoming":
      case "active":
        return {
          label: "Active",
          className: "bg-[#4BEEA2]/10 text-[#4BEEA2] border-[#4BEEA2]/20",
        };
      case "completed":
      case "past":
        return {
          label: "Past",
          className: "bg-orange-500/10 text-orange-500 border-orange-500/20",
        };
      case "deactivated":
        return {
          label: "Deactivated",
          className: "bg-red-500/10 text-red-500 border-red-500/20",
        };
      default:
        return {
          label: status || "Unknown",
          className: "bg-[#FFFFFF]/5 text-[#FFFFFF]/50 border-[#FFFFFF]/10",
        };
    }
  };

  const { label, className } = getStatusConfig();

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium border ${className}`}
    >
      {label}
    </span>
  );
};

GroupStatusBadge.propTypes = {
  status: PropTypes.string,
};

export default GroupStatusBadge;
