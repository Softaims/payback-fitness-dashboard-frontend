import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/**
 * GroupProgressChart Component
 * Displays group workout progress as a multi-line chart
 * Shows percentage of members who completed 0, 1, 2, 3+ workouts per day
 */
const GroupProgressChart = ({ data, maxWorkouts = 3 }) => {
  // Generate colors for workout lines
  const workoutColors = [
    "#EF4444", // Red for 0 workouts
    "#F59E0B", // Orange for 1 workout
    "#10B981", // Green for 2 workouts
    "#4BEEA2", // Bright green for 3+ workouts
  ];

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-[#FFFFFF]/50">
        No progress data available
      </div>
    );
  }

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1a2e23] border border-[#FFFFFF]/10 rounded-lg p-3 shadow-lg">
          <p className="text-white font-semibold mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p
              key={`item-${index}`}
              className="text-sm"
              style={{ color: entry.color }}
            >
              {entry.name}: {entry.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#FFFFFF10" />
        <XAxis
          dataKey="day"
          stroke="#FFFFFF50"
          tick={{ fill: "#FFFFFF70", fontSize: 12 }}
        />
        <YAxis
          stroke="#FFFFFF50"
          tick={{ fill: "#FFFFFF70", fontSize: 12 }}
          domain={[0, 100]}
          ticks={[0, 20, 40, 60, 80, 100]}
          tickFormatter={value => `${value}%`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ paddingTop: "20px" }}
          iconType="circle"
          formatter={value => (
            <span className="text-[#FFFFFF]/70 text-sm">{value}</span>
          )}
        />

        {/* Render lines for each workout count */}
        {Array.from({ length: maxWorkouts + 1 }, (_, i) => (
          <Line
            key={i}
            type="monotone"
            dataKey={`${i} Workout`}
            stroke={workoutColors[i] || workoutColors[workoutColors.length - 1]}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

GroupProgressChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string.isRequired,
    }),
  ).isRequired,
  maxWorkouts: PropTypes.number,
};

export default GroupProgressChart;
