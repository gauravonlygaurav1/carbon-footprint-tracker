import { Card, CardContent } from "@/components/ui/card"
import { Car, Utensils, Zap, Plane, Leaf } from "lucide-react"
import useAuth from "@/Auth/store";
import { useEffect, useState } from "react";
import { getDashboardSummary } from "@/services/EmissionService";
import { useNavigate } from "react-router";

function Dashboard() {
  const user = useAuth((state) => state.user);
  const [summary, setSummary] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchSummary = async () => {
      try {
        const data = await getDashboardSummary();
        setSummary(data);
      }
      catch (error) {
        console.log(error);
      }
    }

    fetchSummary();

  }, []);

  const getInsight = () => {

    if (!summary) {
      return "No emission data available yet.";
    }

    const emissions = [
      {
        type: "DRIVING",
        value: summary.drivingEmission,
      },
      {
        type: "FOOD",
        value: summary.foodEmission,
      },
      {
        type: "ELECTRICITY",
        value: summary.electricityEmission,
      },
      {
        type: "FLIGHT",
        value: summary.flightEmission,
      },
    ];

    // Find highest emission activity
    const highest = emissions.reduce((prev, current) =>
      current.value > prev.value ? current : prev
    );

    // If all emissions are 0
    if (highest.value === 0) {
      return "No emission data available yet.";
    }

    switch (highest.type) {

      case "DRIVING":
        return `Driving contributes the highest emissions at ${highest.value} kg CO₂.`;

      case "FOOD":
        return `Food consumption contributes the highest emissions at ${highest.value} kg CO₂.`;

      case "ELECTRICITY":
        return `Electricity usage contributes the highest emissions at ${highest.value} kg CO₂.`;

      case "FLIGHT":
        return `Flight travel contributes the highest emissions at ${highest.value} kg CO₂.`;

      default:
        return "Emission insights are not available.";
    }
  };

  const getSuggestion = () => {

    if (!summary) {
      return "Start tracking your activities to get personalized suggestions.";
    }

    const emissions = [
      {
        type: "DRIVING",
        value: summary.drivingEmission,
      },
      {
        type: "FOOD",
        value: summary.foodEmission,
      },
      {
        type: "ELECTRICITY",
        value: summary.electricityEmission,
      },
      {
        type: "FLIGHT",
        value: summary.flightEmission,
      },
    ];

    // Find highest emission activity
    const highest = emissions.reduce((prev, current) =>
      current.value > prev.value ? current : prev
    );

    // If all emissions are 0
    if (highest.value === 0) {
      return "Start tracking your activities to get personalized suggestions.";
    }

    switch (highest.type) {

      case "DRIVING":
        return "Your driving emissions are highest. Try carpooling, public transport, or EV vehicles.";

      case "FOOD":
        return "Food emissions are high. Reducing red meat consumption can help lower your footprint.";

      case "ELECTRICITY":
        return "Electricity usage is contributing most. Switching off unused appliances can reduce emissions.";

      case "FLIGHT":
        return "Flight emissions are highest. Consider fewer flights or choose economy class when possible.";

      default:
        return "Track more activities to get better sustainability suggestions.";
    }
  };

  return (
    <div className="pt-20 px-6 bg-gradient-to-br from-slate-50 via-emerald-50 to-green-100 min-h-screen">

      {/* Welcome */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1
            className="text-3xl md:text-4xl font-extrabold text-emerald-700 tracking-tight"
            style={{
              textShadow: `
      0px 1px 0px #d1fae5,
      0px 2px 0px #a7f3d0,
      0px 3px 6px rgba(0,0,0,0.15)
    `
            }}
          >
            Hi, {user?.name} 🌿
          </h1>
          <p className="text-slate-500 mt-2 text-lg font-semibold">
            Here's your carbon footprint overview
          </p>
        </div>
        <button
   className="px-6 py-3 rounded-2xl bg-gray-100 border border-emerald-200 
text-emerald-700 font-semibold shadow-md hover:shadow-xl
hover:bg-emerald-100 transition-all duration-300 
cursor-pointer"
          onClick={() => navigate("/dashboard/emissionCalculator")}
        >
          Calculate Emission
        </button>
      </div>

      {/* Total Emission */}
      <Card className="mb-8 shadow-md cursor-pointer hover:-translate-y-1">
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-base mb-2">Total Emissions</p>
            <h2 className="text-3xl font-bold text-green-700">
              {summary?.totalEmission || 0} kg CO₂
            </h2>
          </div>
          <Leaf className="w-10 h-10 text-green-600" />
        </CardContent>
      </Card>

      {/* Activities */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <Card className="hover:shadow-lg bg-gradient-to-br from-emerald-200 to-green-100 *:transition cursor-pointer">
          <CardContent className="p-5 text-center">
            <Car className="mx-auto text-emerald-700 w-8 h-8 mb-3" />
            <h3 className="font-semibold">Driving</h3>
            <p className="text-sm text-gray-500">{summary?.drivingEmission || 0} kg CO₂</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg bg-gradient-to-br from-amber-100 to-orange-50 transition cursor-pointer">
          <CardContent className="p-5 text-center">
            <Utensils className="mx-auto text-amber-700 w-8 h-8 mb-3" />
            <h3 className="font-semibold">Food</h3>
            <p className="text-sm text-gray-500">{summary?.foodEmission || 0} kg CO₂</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg bg-gradient-to-br from-blue-100 to-indigo-50 transition cursor-pointer">
          <CardContent className="p-5 text-center">
            <Zap className="mx-auto text-blue-700 w-8 h-8 mb-3" />
            <h3 className="font-semibold">Electricity</h3>
            <p className="text-sm text-gray-500">{summary?.electricityEmission || 0} kg CO₂</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg bg-gradient-to-br from-pink-100 to-rose-50 transition cursor-pointer">
          <CardContent className="p-5 text-center">
            <Plane className="mx-auto text-pink-700 w-8 h-8 mb-3" />
            <h3 className="font-semibold">Flight</h3>
            <p className="text-sm text-gray-500">{summary?.flightEmission || 0} kg CO₂</p>
          </CardContent>
        </Card>

      </div>

      {/* Insights */}
      <div className="grid  md:grid-cols-2 gap-6 mb-10">

        <Card className="shadow-md ">
          <CardContent className="p-5">
            <h3 className="font-semibold text-lg mb-2 text-green-700">
              Insights
            </h3>
            <p className="text-sm text-gray-600">
              {getInsight()}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-5">
            <h3 className="font-semibold text-lg mb-2 text-green-700">
              Suggestion
            </h3>
            <p className="text-sm text-gray-600">
              {getSuggestion()}
            </p>
          </CardContent>
        </Card>

      </div>

      {/* History */}
      <Card className="shadow-md bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 rounded-3xl ">
        <CardContent className="p-5">
          <h3 className="font-semibold text-lg mb-4 text-green-700">
            Recent Activities
          </h3>

          <div className="space-y-3 text-sm text-gray-600">

            {summary?.recentActivities?.length > 0 ? (

              summary.recentActivities.map(
                (activity: any, index: number) => (

                  <div
                    key={index}
                    className="flex justify-between"
                  >

                    <span>
                      {activity.activityDetails}
                    </span>

                    <span>
                      +{activity.emissionValue} kg CO₂
                    </span>

                  </div>

                ))

            ) : (

              <p>No recent activities found.</p>

            )}

          </div>
        </CardContent>
      </Card>

    </div>
  )
}

export default Dashboard