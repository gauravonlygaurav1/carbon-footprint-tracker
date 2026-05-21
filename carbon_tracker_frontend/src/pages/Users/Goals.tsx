import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  createGoal,
  getGoalProgress
} from "@/services/EmissionService"

import { useEffect, useState } from "react"

function Goals() {

  const [goal, setGoal] = useState<any>(null)
  const [targetEmission, setTargetEmission] = useState("")

  // FETCH GOAL
  const fetchGoal = async () => {

    try {

      const data = await getGoalProgress()
      setGoal(data)

    }
    catch (err) {

      console.log(err)
    }
  }

  useEffect(() => {

    fetchGoal()

  }, [])

  // SAVE GOAL
  const handleGoalSubmit = async () => {

    try {

      const data = await createGoal({
        targetEmission: Number(targetEmission)
      })

      setGoal(data)

      setTargetEmission("")

    }
    catch (err) {

      console.log(err)
    }
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 pt-20 px-6">

      {/* PAGE HEADER */}
      <div className="mb-6">

        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-emerald-500 bg-clip-text text-transparent">
          Carbon Goals
        </h1>

        <p className="text-slate-500 mt-3 text-lg">
          Track your monthly carbon emission target
        </p>

      </div>

      {/* MAIN SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 mb-3">

        {/* LEFT SECTION */}
        <div className="lg:col-span-1 ">

          <Card className="shadow-md rounded-2xl border-0 ">

            <CardContent className="p-6">

              <div className="space-y-5">

                {/* CARD TITLE */}
                <div>

                  <h2 className="text-xl font-semibold text-gray-800">
                    Set Monthly Goal
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Define your target carbon emission limit
                  </p>

                </div>

                {/* INPUT */}
                <Input
                  placeholder="Enter monthly CO₂ goal"
                  value={targetEmission}
                  onChange={(e) =>
                    setTargetEmission(e.target.value)
                  }
                  className="h-11"
                />

                {/* BUTTON */}
                <Button
                  className="w-full cursor-pointer bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-800 hover:to-teal-700 shadow-lg hover:shadow-2xl transition-all duration-300 h-11 rounded-xl text-white"
                  onClick={handleGoalSubmit}
                >
                  Create Goal
                </Button>

              </div>

            </CardContent>

          </Card>

        </div>

        {/* RIGHT SECTION */}
        <div className="lg:col-span-2">

          <div className="bg-white shadow-md rounded-2xl p-6 h-full">

            {/* HEADER */}
            <div className="mb-6">

              <h2 className="text-xl font-semibold text-gray-800">
                Goal Overview
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Monitor your current emission performance
              </p>

            </div>

            {/* CONTENT */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              {/* PROGRESS */}
              <div className="bg-gradient-to-br from-green-100 to-emerald-50 border border-green-100 shadow-sm rounded-2xl p-5">

                <p className="text-sm text-gray-500 mb-2">
                  Progress
                </p>

                <h2 className="text-3xl font-bold text-green-700">
                  {goal?.progressPercentage || 0}%
                </h2>

              </div>

              {/* REMAINING */}
              <div className="bg-gradient-to-br from-blue-100 to-indigo-50 border border-blue-100 shadow-sm rounded-2xl p-5">

                <p className="text-sm text-gray-500 mb-2">
                  Remaining Budget
                </p>

                <h2 className="text-3xl font-bold text-blue-700">

                  {goal
                    ? (
                      goal.targetEmission -
                      goal.currentEmission
                    ).toFixed(2)
                    : 0} kg

                </h2>

              </div>

              {/* STATUS */}
              <div className="bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200 shadow-sm rounded-2xl p-5">

                <p className="text-sm text-gray-500 mb-3">
                  Status
                </p>

                <span
                  className={`px-4 py-2 rounded-full text-white text-sm font-medium

          ${goal?.status === "Excellent"
                      ? "bg-emerald-500"

                      : goal?.status === "Warning"
                        ? "bg-amber-500"

                        : "bg-rose-600"
                    }
          `}
                >

                  {goal?.status || "N/A"}

                </span>

              </div>

            </div>


          </div>

        </div>

      </div>

      {/* GOAL DETAILS */}
      {goal && (

        <Card className="shadow-md rounded-2xl">

          <CardContent className="p-6">

            {/* Progress */}
            <div className="mb-6">

              <div className="flex justify-between mb-2">

                <p className="font-medium text-gray-700">
                  Goal Progress
                </p>

                <p className="text-sm font-bold text-gray-500">
                  {goal.progressPercentage}%
                </p>

              </div>

              <div className="w-full bg-slate-200 h-4 rounded-full overflow-hidden shadow-inner">

                <div
                  className={`h-4 rounded-full transition-all duration-500
                  
                  ${goal.status === "Excellent"
                      ? "bg-emerald-500"

                      : goal.status === "Warning"
                        ? "bg-amber-500"

                        : "bg-rose-600"
                    }
                  
                  `}
                  style={{
                    width: `${goal.progressPercentage}%`
                  }}
                />

              </div>

            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">

              <div className="bg-green-50 p-4 rounded-xl">

                <p className="text-sm text-gray-500">
                  Target Emission
                </p>

                <h2 className="text-2xl font-bold text-green-700">
                  {goal.targetEmission} kg
                </h2>

              </div>

              <div className="bg-blue-50 p-4 rounded-xl">

                <p className="text-sm text-gray-500">
                  Current Emission
                </p>

                <h2 className="text-2xl font-bold text-blue-700">
                  {goal.currentEmission} kg
                </h2>

              </div>

            </div>

            {/* Suggestions */}
            <div className="mb-6">

              <div className="bg-gradient-to-r from-slate-100 to-slate-50 rounded-2xl p-5 shadow-md border border-slate-200">

                <h2 className="text-lg font-semibold text-slate-800 mb-2">
                  Suggestions
                </h2>

                <p className="text-sm leading-relaxed text-slate-600">

                  {goal.status === "Excellent"
                    ? "Excellent progress! You're maintaining a sustainable carbon footprint this month."

                    : goal.status === "Warning"
                      ? "You're approaching your monthly limit. Try reducing high-emission activities."

                      : "You are nearing your monthly carbon limit. Reduce high-emission activities to remain on track."
                  }

                </p>

              </div>

            </div>

            {/* Goal Insights */}
            <div className="bg-gradient-to-br from-slate-500 via-slate-600 to-emerald-700 rounded-2xl p-6 shadow-lg border border-white/20 backdrop-blur-sm">

              <h2 className="text-lg font-semibold text-emerald-100 mb-2">
                Goal Insights
              </h2>

              <p className="text-white font-light">
                {goal.suggestion}
              </p>

            </div>

          </CardContent>

        </Card>

      )}

    </div>
  )
}

export default Goals