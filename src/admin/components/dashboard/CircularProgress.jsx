import { useState } from "react";
import PropTypes from "prop-types";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

/**
 * CircularProgress Component using Recharts
 */
const CircularProgress = ({
  appValue = 0,
  webValue = 0,
  size = 200,
  label,
  sublabel,
  className = "",
}) => {
  const data = [
    { name: "Through App", value: appValue, segment: "app" },
    { name: "Through Web", value: webValue, segment: "web" },
  ];

  const COLORS = ["#4BEEA2", "#4BEEA24D"];

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={size * 0.35}
            outerRadius={size * 0.45}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
            cursor="pointer"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} opacity={1} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        {label && (
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-1">{label}</p>
            {sublabel && (
              <p className="text-sm text-[#FFFFFF]/50">{sublabel}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

CircularProgress.propTypes = {
  appValue: PropTypes.number,
  webValue: PropTypes.number,
  size: PropTypes.number,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sublabel: PropTypes.string,
  className: PropTypes.string,
};

export default CircularProgress;
