
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
      summary?.drivingEmission,
      summary?.foodEmission,
      summary?.electricityEmission,
      summary?.flightEmission
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
    //Bar Chart Data
    const chartData = [
    { name: "Driving", emission: summary?.drivingEmission || 0},
    { name: "Flight", emission: summary?.flightEmission || 0 },
    { name: "Electricity", emission: summary?.electricityEmission || 0 },
    { name: "Food", emission: summary?.foodEmission || 0 }
  ];
  

  return (

    <div className="bg-white rounded-2xl shadow-md p-5 h-full">

      <h2 className="text-xl font-semibold mb-4 text-green-700">
        Smart Insights
      </h2>

      <div className="space-y-4 text-gray-600">

        <p>{getInsight()}</p>

        <p>
          🌍 Reducing high emission activities
          can improve your eco score.
        </p>

        {/* Bar Chart */}
        <div className="mt-6">

          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Emission Breakdown
          </h3>

          <div className="h-64">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={chartData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="emission"
                  fill="#0f766e"
                  radius={[10, 10, 0, 0]}
                  barSize={40}
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
