import React from 'react'
import { useNavigate } from "react-router";

function SummaryCards({ summary, goal }: any) {

  const navigate= useNavigate();

  return (

    <div className="flex gap-6 mb-8 flex-wrap items-start">

      <div className="bg-white rounded-2xl shadow-md p-5 w-full sm:w-78">

        <p className="text-gray-500 text-sm">
          Total Emission
        </p>

        <h2 className="text-2xl font-bold text-green-700">
          {summary?.totalEmission} kg
        </h2>

      </div>

      <div className="bg-white rounded-2xl shadow-md p-5 w-full sm:w-78">

        <p className="text-gray-500 text-sm">
          Eco Score
        </p>

        <h2 className="text-2xl font-bold text-green-700">
          {summary?.ecoScore}/100
        </h2>

      </div>

      <div className="bg-white rounded-4xl shadow-md p-4 w-full sm:w-2xl sm:-mt-32 min-h-55" >

        <h3 className="font-semibold text-xl mb-3 text-green-700">
          Goal Tracker
        </h3>

        <p className="text-gray-600 mb-3">
          Reduce weekly carbon emissions
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-xl h-4 overflow-hidden">

          <div
            className={`h-4 rounded-xl transition-all duration-500
      
      ${goal?.status === "Excellent"
                ? "bg-gradient-to-r from-blue-200 to-blue-300"

                : goal?.status === "Warning"
                  ? "bg-gradient-to-r from-blue-400 to-blue-500"

                  : "bg-gradient-to-r from-blue-600 to-blue-700"
              }
      
      `}
            style={{
              width: `${goal?.progressPercentage || 0}%`
            }}
          />

        </div>

        <p className="text-green-600 mt-3 font-semibold">

          {goal?.progressPercentage || 0}% completed

        </p>


        <button
          onClick={() => navigate("/dashboard/goals")}
          className="cursor-pointer  mt-4 px-4 py-2 rounded-full border border-green-200 
               text-sm bg-blue-300 text-white hover:bg-red-400 transition"
        >
          Track Your Goal
        </button>
        <button
          className="cursor-pointer  mt-4 mx-4 px-4 py-2 rounded-full border border-green-200 
               text-sm hover:bg-green-100 transition"
        >
          View detailed progress
        </button>

      </div>



    </div>
  );
}

export default SummaryCards;
