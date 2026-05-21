import EmissionPieChart from "@/components/analytics/EmissionPieChart";
import InsightsCard from "@/components/analytics/InsightsCard";
import SummaryCards from "@/components/analytics/SummaryCards";
import {getWeeklyAnalytics, getDashboardSummary, getGoalProgress } from "@/services/EmissionService";
import { useEffect, useState } from "react";
import WeeklyLineChart from "@/components/analytics/WeeklyLineChart";

function Analytics() {

  const [summary, setSummary] = useState<any>(null);
  const [weeklyData, setWeeklyData] = useState<any>(null);
  const [goal, setGoal] = useState<any>(null)


  useEffect(() => {

    const fetchSummary = async () => {

      try {

        const data = await getDashboardSummary();
        setSummary(data);

        const weekly = await getWeeklyAnalytics();
        setWeeklyData(weekly);

        const goalProgress = await getGoalProgress()
        setGoal(goalProgress)

      }
      catch (error) {

        console.log(error);
      }
    }

    fetchSummary();

  }, []);


  return (

  <div className="pt-20 px-6 min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-100">

    {/* Page Title */}
    <div className="mb-8">

      <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-green-500 bg-clip-text text-transparent tracking-tight">
        Analytics Dashboard
      </h1>

      <p className="text-slate-500 mt-3 text-lg">
        Track and analyze your carbon emissions
      </p>

    </div>

    {/* Top Stats Cards */}
    <SummaryCards summary={summary} goal={goal} />

    {/* Bottom Section */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* Pie Chart */}
      <div className="bg-white shadow-md rounded-2xl p-6">

        <h2 className="text-xl font-semibold mb-6 text-green-700">
          Emission Breakdown
        </h2>

        {summary && (
          <EmissionPieChart summary={summary} />
        )}

      </div>

      {/* Insights */}
      <InsightsCard summary={summary} />
    </div>
        
     <WeeklyLineChart data={weeklyData || []} />


  </div>
);
}

export default Analytics;
