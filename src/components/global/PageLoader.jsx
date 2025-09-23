import React from "react";

const PageLoader = () => {
  return (
    <div className="mb-6">
      <div className="w-16 h-16 mx-auto relative">
        <svg className="w-16 h-16" viewBox="0 0 100 100" style={{ animation: "spin 3s linear infinite" }}>
          <defs>
            <linearGradient id="spinner-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4BEEA2" />
              <stop offset="100%" stopColor="#4BEEA2" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#spinner-gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="20 40"
            strokeDashoffset="0"
          />
        </svg>
      </div>
    </div>
  );
};

export default PageLoader;
