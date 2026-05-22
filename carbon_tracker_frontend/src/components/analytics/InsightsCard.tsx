import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

function InsightsCard({ summary }: any) {

  const getInsight = () => {
    const max = Math.max(
      summary?.drivingEmission || 0,
      summary?.foodEmission || 0,
      summary?.electricityEmission || 0,
      summary?.flightEmission || 0
    );

    if (max === summary?.drivingEmission) {
      return "🚗 Driving contributes the highest emissions.";
    }

    if (max === summary?.flightEmission) {
      return "✈️ Flight travel is your largest contributor.";
    }

    if (max === summary?.electricityEmission) {
      return "⚡ Electricity usage is increasing.";
    }

    return "🌱 Food consumption contributes significantly.";
  };

  const chartData = [
    { name: "Driving", emission: summary?.drivingEmission || 0 },
    { name: "Flight", emission: summary?.flightEmission || 0 },
    { name: "Electricity", emission: summary?.electricityEmission || 0 },
    { name: "Food", emission: summary?.foodEmission || 0 }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-3 sm:p-5 h-full w-full">

      {/* Title */}
      <h2 className="text-lg sm:text-xl font-semibold mb-3 text-green-700">
        Smart Insights
      </h2>

      <div className="space-y-3 sm:space-y-4 text-gray-600 text-sm sm:text-base">

        <p>{getInsight()}</p>

        <p>
          🌍 Reducing high emission activities can improve your eco score.
        </p>

        {/* Chart Section */}
        <div className="mt-4 sm:mt-6">

          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Emission Breakdown
          </h3>

          {/* Responsive Chart Height */}
          <div className="h-[220px] sm:h-[260px] md:h-64 w-full">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              >

                <CartesianGrid strokeDasharray="3 3" opacity={0.4} />

                {/* X Axis - mobile friendly */}
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  angle={-30}
                  textAnchor="end"
                  interval={0}
                  height={50}
                />

                {/* Y Axis - compact */}
                <YAxis tick={{ fontSize: 12 }} width={35} />

                <Tooltip />

                <Bar
                  dataKey="emission"
                  fill="#0f766e"
                  radius={[8, 8, 0, 0]}
                  barSize={window.innerWidth < 640 ? 20 : 40}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>
    </div>
  );
}

export default InsightsCard;