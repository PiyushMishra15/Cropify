import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AreaGraph = ({
  lineData,
  color = "#3b82f6",
  xKey,
  yKey,
  title = "Graph Title",
}) => {
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-medium text-gray-600 mb-1">{`${xKey}: ${label}`}</p>
          <p className="text-lg font-semibold" style={{ color }}>
            {`₹${payload[0].value.toLocaleString()}`}
          </p>
        </div>
      );
    }
    return null;
  };

  if (!lineData || lineData.length === 0) {
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
          <AreaChart
            data={lineData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0.05} />
              </linearGradient>
            </defs>
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
            <Area
              type="monotone"
              dataKey={yKey}
              stroke={color}
              strokeWidth={3}
              fill={`url(#${gradientId})`}
              dot={{
                fill: color,
                strokeWidth: 2,
                stroke: "#fff",
                r: 4,
              }}
              activeDot={{
                r: 6,
                stroke: color,
                strokeWidth: 2,
                fill: "#fff",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Stats */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Total Data Points:{" "}
            <span className="font-medium text-gray-700">{lineData.length}</span>
          </span>
          <span className="text-gray-500">
            Peak:{" "}
            <span className="font-medium" style={{ color }}>
              ₹
              {Array.isArray(lineData) &&
                Math.max(
                  ...lineData.map((item) => item[yKey])
                ).toLocaleString()}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AreaGraph;
