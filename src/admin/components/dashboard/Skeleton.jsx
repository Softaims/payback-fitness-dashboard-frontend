import PropTypes from "prop-types";

/**
 * Base Skeleton Component
 * Provides animated skeleton loading placeholders
 */

/**
 * Skeleton Box - Base rectangular skeleton
 */
export const SkeletonBox = ({ width = "100%", height = "20px", className = "", rounded = "rounded" }) => (
  <div
    className={`bg-[#FFFFFF]/5 ${rounded} animate-pulse ${className}`}
    style={{ width, height }}
  />
);

SkeletonBox.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
  rounded: PropTypes.string,
};

/**
 * Skeleton Circle - Circular skeleton (for avatars, icons)
 */
export const SkeletonCircle = ({ size = "40px", className = "" }) => (
  <div
    className={`bg-[#FFFFFF]/5 rounded-full animate-pulse ${className}`}
    style={{ width: size, height: size }}
  />
);

SkeletonCircle.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
};

/**
 * Skeleton Text - Text line skeleton with varying widths
 */
export const SkeletonText = ({ width = "100%", height = "14px", lines = 1, gap = "8px", className = "" }) => {
  if (lines === 1) {
    return <SkeletonBox width={width} height={height} className={className} rounded="rounded" />;
  }

  return (
    <div className={`space-y-[${gap}] ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <SkeletonBox
          key={index}
          width={index === lines - 1 ? "80%" : width}
          height={height}
          rounded="rounded"
        />
      ))}
    </div>
  );
};

SkeletonText.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  lines: PropTypes.number,
  gap: PropTypes.string,
  className: PropTypes.string,
};

/**
 * Skeleton Avatar - Avatar skeleton with text
 */
export const SkeletonAvatar = ({ size = "sm", showText = true, textLines = 1 }) => {
  const sizes = {
    sm: "32px",
    md: "48px",
    lg: "64px",
  };

  return (
    <div className="flex items-center gap-3">
      <SkeletonCircle size={sizes[size]} />
      {showText && (
        <div className="flex-1">
          <SkeletonText width="120px" height="14px" lines={textLines} />
        </div>
      )}
    </div>
  );
};

SkeletonAvatar.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  showText: PropTypes.bool,
  textLines: PropTypes.number,
};

/**
 * Skeleton Card - Card-style skeleton
 */
export const SkeletonCard = ({ height = "120px", className = "" }) => (
  <div className={`bg-[#1a2e23] border border-[#FFFFFF]/10 rounded-xl p-6 ${className}`}>
    <div className="space-y-4">
      <SkeletonText width="60%" height="16px" />
      <SkeletonText width="40%" height="32px" />
    </div>
  </div>
);

SkeletonCard.propTypes = {
  height: PropTypes.string,
  className: PropTypes.string,
};

/**
 * Skeleton Table Row - Single table row skeleton
 */
export const SkeletonTableRow = ({ columns = 5 }) => (
  <tr className="border-b border-[#FFFFFF]/5">
    {Array.from({ length: columns }).map((_, index) => (
      <td key={index} className="py-4 px-2 first:pl-0 last:pr-0">
        {index === 0 ? (
          <SkeletonAvatar size="sm" showText={true} />
        ) : (
          <SkeletonText width={index === columns - 1 ? "80px" : "100px"} height="14px" />
        )}
      </td>
    ))}
  </tr>
);

SkeletonTableRow.propTypes = {
  columns: PropTypes.number,
};

/**
 * Skeleton Table - Complete table skeleton
 */
export const SkeletonTable = ({ columns = 5, rows = 5, className = "" }) => (
  <div className={`overflow-x-auto ${className}`}>
    <table className="w-full">
      <thead>
        <tr className="border-b border-[#FFFFFF]/10">
          {Array.from({ length: columns }).map((_, index) => (
            <th key={index} className="text-left pb-3 px-2 first:pl-0 last:pr-0">
              <SkeletonText width="80px" height="14px" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <SkeletonTableRow key={rowIndex} columns={columns} />
        ))}
      </tbody>
    </table>
  </div>
);

SkeletonTable.propTypes = {
  columns: PropTypes.number,
  rows: PropTypes.number,
  className: PropTypes.string,
};

/**
 * Skeleton Stat Card - Dashboard stat card skeleton
 */
export const SkeletonStatCard = () => (
  <div className="bg-[#1a2e23] border border-[#FFFFFF]/10 rounded-xl p-6 hover:border-[#FFFFFF]/20 transition-all duration-200">
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <SkeletonText width="100px" height="14px" />
        <SkeletonCircle size="40px" />
      </div>
      <SkeletonText width="80px" height="36px" />
    </div>
  </div>
);

/**
 * Skeleton Chart - Chart placeholder skeleton
 */
export const SkeletonChart = ({ height = "300px", className = "" }) => (
  <div className={`flex items-end justify-around gap-4 ${className}`} style={{ height }}>
    {Array.from({ length: 7 }).map((_, index) => (
      <SkeletonBox
        key={index}
        width="100%"
        height={`${Math.random() * 60 + 40}%`}
        rounded="rounded-t"
      />
    ))}
  </div>
);

SkeletonChart.propTypes = {
  height: PropTypes.string,
  className: PropTypes.string,
};

/**
 * Skeleton Group Detail - Group detail page skeleton
 */
export const SkeletonGroupDetail = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* Left Panel */}
    <div className="lg:col-span-1">
      <div className="bg-[#1a2e23] border border-[#FFFFFF]/10 rounded-xl p-6">
        <div className="space-y-6">
          {/* Avatar */}
          <div className="flex justify-center">
            <SkeletonCircle size="128px" />
          </div>
          {/* Title */}
          <div className="flex flex-col items-center gap-2">
            <SkeletonText width="150px" height="24px" />
            <SkeletonText width="120px" height="14px" />
          </div>
          {/* Badge */}
          <div className="flex justify-center">
            <SkeletonBox width="80px" height="24px" rounded="rounded-full" />
          </div>
          {/* About */}
          <div className="space-y-2">
            <SkeletonText width="100px" height="14px" />
            <SkeletonText lines={3} height="14px" />
          </div>
          {/* Stats */}
          <div className="space-y-3">
            <SkeletonBox width="100%" height="60px" rounded="rounded-lg" />
            <SkeletonBox width="100%" height="60px" rounded="rounded-lg" />
          </div>
          {/* Creator */}
          <div className="pt-4 space-y-3">
            <SkeletonText width="80px" height="14px" />
            <SkeletonBox width="100%" height="56px" rounded="rounded-lg" />
          </div>
        </div>
      </div>
    </div>

    {/* Right Panel */}
    <div className="lg:col-span-2 space-y-6">
      {/* Chart Card */}
      <div className="bg-[#1a2e23] border border-[#FFFFFF]/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <SkeletonText width="150px" height="20px" />
          <SkeletonBox width="100px" height="36px" rounded="rounded-lg" />
        </div>
        <SkeletonChart height="300px" />
      </div>

      {/* Members Table Card */}
      <div className="bg-[#1a2e23] border border-[#FFFFFF]/10 rounded-xl p-6">
        <SkeletonText width="150px" height="20px" className="mb-6" />
        <SkeletonTable columns={5} rows={5} />
      </div>
    </div>
  </div>
);

/**
 * Skeleton Dashboard - Dashboard page skeleton
 */
export const SkeletonDashboard = () => (
  <div className="space-y-8">
    {/* Header */}
    <div className="flex items-center justify-between">
      <SkeletonText width="200px" height="40px" />
      <SkeletonBox width="150px" height="40px" rounded="rounded-lg" />
    </div>

    {/* Main Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left: 2x2 grid */}
      <div className="grid grid-cols-2 gap-6">
        <SkeletonStatCard />
        <SkeletonStatCard />
        <SkeletonStatCard />
        <SkeletonStatCard />
      </div>

      {/* Right: Subscriptions card */}
      <div className="bg-[#1a2e23] border border-[#FFFFFF]/10 rounded-xl p-6">
        <SkeletonText width="180px" height="18px" className="mb-6" />
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <SkeletonCircle size="200px" />
            <div className="flex gap-6 mt-6">
              <SkeletonText width="120px" height="14px" />
              <SkeletonText width="120px" height="14px" />
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <SkeletonText width="150px" height="14px" />
              <SkeletonBox width="100%" height="8px" rounded="rounded-full" />
            </div>
            <div className="space-y-2">
              <SkeletonText width="150px" height="14px" />
              <SkeletonBox width="100%" height="8px" rounded="rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* History Table */}
    <div className="bg-[#1a2e23] border border-[#FFFFFF]/10 rounded-xl p-6">
      <SkeletonText width="200px" height="24px" className="mb-6" />
      <SkeletonTable columns={7} rows={10} />
    </div>
  </div>
);

/**
 * Skeleton User Detail - User detail page skeleton
 */
export const SkeletonUserDetail = () => (
  <div className="space-y-8">
    {/* User Info Card */}
    <div className="bg-[#1a2e23] border border-[#FFFFFF]/10 rounded-xl p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <SkeletonCircle size="64px" />
          <div className="space-y-2">
            <SkeletonText width="200px" height="24px" />
            <SkeletonText width="180px" height="16px" />
            <SkeletonText width="150px" height="14px" />
          </div>
        </div>
        <SkeletonBox width="160px" height="40px" rounded="rounded-lg" />
      </div>
    </div>

    {/* Tab Navigation */}
    <div className="bg-[#1a2e23] border border-[#FFFFFF]/10 rounded-t-xl">
      <div className="flex gap-6 px-6 pt-4 border-b border-[#FFFFFF]/10">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonBox key={index} width="120px" height="36px" rounded="rounded-t" />
        ))}
      </div>
    </div>

    {/* Tab Content */}
    <div className="bg-[#1a2e23] border border-[#FFFFFF]/10 border-t-0 rounded-b-xl p-6">
      <SkeletonTable columns={5} rows={5} />
    </div>
  </div>
);
