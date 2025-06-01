"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";

const BarGraph = ({
  data,
  color = "#10b981",
  xKey,
  yKey,
  title = "Graph Title",
}) => {
  const capitalizeFirstLetter = (string) => {
    if (typeof string !== "string" || string.length === 0) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-medium text-gray-600 mb-1">
            {`${capitalizeFirstLetter(xKey)}: ${capitalizeFirstLetter(label)}`}
          </p>
          <p className="text-lg font-semibold" style={{ color }}>
            {`₹${payload[0].value.toLocaleString()}`}
          </p>
        </div>
      );
    }
    return null;
  };

  // Generate color variations for bars
  const getBarColor = (index) => {
    const opacity = 0.7 + (index * 0.3) / data.length;
    return `${color}${Math.floor(opacity * 255)
      .toString(16)
      .padStart(2, "0")}`;
  };

  if (!data || data.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center">
          <div className="text-gray-400 text-lg mb-2">📊</div>
          <p className="text-gray-500 text-sm">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
        <div
          className="h-1 w-16 rounded-full"
          style={{ backgroundColor: color }}
        ></div>
      </div>

      {/* Chart */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              strokeOpacity={0.5}
            />
            <XAxis
              dataKey={xKey}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#6b7280",
                fontSize: "12px",
                fontWeight: "500",
              }}
              tickFormatter={(tick) => capitalizeFirstLetter(tick)}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#6b7280",
                fontSize: "12px",
                fontWeight: "500",
              }}
              tickFormatter={(tick) => `₹${tick.toLocaleString()}`}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey={yKey} radius={[4, 4, 0, 0]} fill={color}>
              {Array.isArray(data) &&
                data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index % 2 === 0 ? color : `${color}CC`}
                  />
                ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Stats */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Categories:{" "}
            <span className="font-medium text-gray-700">{data.length}</span>
          </span>
          <span className="text-gray-500">
            Highest:{" "}
            <span className="font-medium" style={{ color }}>
              ₹
              {Array.isArray(data) &&
                Math.max(...data.map((item) => item[yKey])).toLocaleString()}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BarGraph;
