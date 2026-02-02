import PropTypes from "prop-types";

/**
 * ProgressBar Component
 * Horizontal progress bar with label and percentage
 *
 * @param {string} label - Label text
 * @param {number} percentage - Percentage value (0-100)
 * @param {string} color - Bar color (CSS color)
 * @param {string} height - Bar height (e.g., 'h-2', 'h-3')
 * @param {boolean} showPercentage - Whether to show percentage text
 * @param {string} className - Additional CSS classes
 */
const ProgressBar = ({
  label,
  percentage = 0,
  color = "#4BEEA2",
  height = "h-2",
  showPercentage = true,
  className = "",
}) => {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-white font-medium">{label}</span>
        {showPercentage && (
          <span className="text-sm font-semibold" style={{ color }}>
            {clampedPercentage}%
          </span>
        )}
      </div>

      <div className={`w-full bg-[#FFFFFF]/5 rounded-full overflow-hidden ${height}`}>
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${clampedPercentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  label: PropTypes.string.isRequired,
  percentage: PropTypes.number,
  color: PropTypes.string,
  height: PropTypes.string,
  showPercentage: PropTypes.bool,
  className: PropTypes.string,
};

export default ProgressBar;
