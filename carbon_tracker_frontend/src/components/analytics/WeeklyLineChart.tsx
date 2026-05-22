import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

function WeeklyLineChart({ data }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-3 sm:p-5 mt-5 w-full">
      
      {/* Title */}
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-green-700">
        Weekly Emission Trend
      </h2>

      {/* Chart Wrapper */}
      <div className="w-full h-[240px] sm:h-[300px] md:h-[350px]">
        
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 20
            }}
          >
            
            <CartesianGrid strokeDasharray="3 3" opacity={0.4} />

            {/* X Axis - Mobile friendly */}
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              interval={0}
              angle={-35}
              textAnchor="end"
              height={50}
            />

            {/* Y Axis - cleaner for mobile */}
            <YAxis
              tick={{ fontSize: 12 }}
              width={35}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="emission"
              stroke="#16a34a"
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default WeeklyLineChart;