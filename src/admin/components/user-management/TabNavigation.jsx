import PropTypes from "prop-types";

/**
 * TabNavigation Component
 * Reusable tab navigation for switching between different views
 *
 * @param {Array} tabs - Array of tab objects with {key, label, icon}
 * @param {string} activeTab - Currently active tab key
 * @param {function} onTabChange - Callback when tab changes
 * @param {string} className - Additional CSS classes
 */
const TabNavigation = ({ tabs, activeTab, onTabChange, className = "" }) => {
  return (
    <div className={`border-b border-[#FFFFFF]/10 ${className}`}>
      <nav className="flex gap-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`flex items-center gap-2 px-1 py-4 text-sm font-medium border-b-2 transition-all duration-200 ${
                isActive
                  ? "border-[#4BEEA2] text-[#4BEEA2]"
                  : "border-transparent text-[#FFFFFF]/50 hover:text-white hover:border-[#FFFFFF]/20"
              }`}
            >
              {Icon && <Icon className="w-5 h-5" />}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

TabNavigation.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.elementType,
    }),
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default TabNavigation;
