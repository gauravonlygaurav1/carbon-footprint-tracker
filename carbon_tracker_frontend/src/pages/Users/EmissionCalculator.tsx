import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import bgImage from "@/assets/bg_eco.webp"
import type {EmissionResponse} from "@/models/EmissionResponse"
import {
  calculateDriving,
  calculateElectricity,
  calculateFood,
  calculateFlight,
} from "@/services/EmissionService";
import { Car, Zap, Utensils, Plane } from "lucide-react";


function EmissionCalculator() {

  const [activity, setActivity] = useState("DRIVING")
  const [result, setResult] = useState<EmissionResponse | null>(null)

  const [form, setForm] = useState({
    distance: "",
    vehicleType: "CAR",
    consumption: "",
    foodType: "BEEF",
    weightKg: "",
    source: "",
    destination: "",
    flightType: "ECONOMY"
  })

  const activityDescription = {
  DRIVING: "Track your environmental impact from Driving",
  ELECTRICITY: "Track your electricity carbon emissions",
  FOOD: "Track your food consumption footprint",
  FLIGHT: "Track your flight travel emissions",
}

//  API CALL
  const handleCalculate = async () => {
  try {
    let data: EmissionResponse | null = null;

    if (activity === "DRIVING") {
      data = await calculateDriving({
        distance: Number(form.distance),
        vehicleType: form.vehicleType,
      });
    }

    if (activity === "ELECTRICITY") {
      data = await calculateElectricity({
        consumption: Number(form.consumption),
      });
    }

    if (activity === "FOOD") {
      data = await calculateFood({
        foodType: form.foodType,
        weightKg: Number(form.weightKg),
      });
    }

    if (activity === "FLIGHT") {
      data = await calculateFlight({
        source: form.source,
        destination: form.destination,
        flightType: form.flightType,
      });
    }

    setResult(data);
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="min-h-screen flex mt-6 flex-col items-center p-6 bg-cover bg-center bg-no-repeat"
    style= {{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "70%",
      backgroundPosition: "center -120px",
      
      }}
    >
      

      <div className="flex gap-3 mt-8 mb-6 flex-wrap">
      {/* Activity Tabs */}
        {["DRIVING", "ELECTRICITY", "FOOD", "FLIGHT"].map((item) => (
          <Button
            key={item}
            onClick={() => setActivity(item)}
            className={`cursor-pointer transition-all duration-300 px-6 py-4 
              ${
                activity === item
                  ? "bg-gradient-to-r from-emerald-400 to-green-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-500 text-semibold hover:bg-green-100"
              }`}
          >
            {item}
          </Button>
        ))}
      </div>

      {/* Form */}
      <Card className="mb-6 justify-center items-start max-w-sm shadow-md border-green-200">
        <CardContent className="p-6 space-y-4">
            <div className="flex flex-col items-center mb-2">
            <h1 className="text-gray-500 mt-0 mb-6 text-center">
              {activityDescription[activity as keyof typeof activityDescription]}
            </h1>

           {/* ICON + TITLE */}
            {activity === "DRIVING" && <Car className="w-8 h-8 text-green-600" />}
            {activity === "ELECTRICITY" && <Zap className="w-8 h-8 text-yellow-500" />}
            {activity === "FOOD" && <Utensils className="w-8 h-8 text-orange-500" />}
            {activity === "FLIGHT" && <Plane className="w-8 h-8 text-blue-500" />}

            <h2 className="text-sm font-semibold mt-2 text-gray-700">
            {activity}
            </h2>
            </div>

          {/* DRIVING */}
          {activity === "DRIVING" && (
            <>
              <Input
                placeholder="Distance (km)"
                onChange={(e) =>
                  setForm({ ...form, distance: e.target.value })
                }
              />

              <select
                className="w-full border p-2 rounded"
                onChange={(e) =>
                  setForm({ ...form, vehicleType: e.target.value })
                }
              >
                <option value="CAR">Car</option>
                <option value="BIKE">Bike</option>
                <option value="PETROL_CAR">Petrol Car</option>
                <option value="ELECTRIC_CAR">Electric Car</option>
                <option value="DIESEL_CAR">Diesel Car</option>
                <option value="CNG">CNG</option>
                <option value="E_RICKSHAW">E-Rickshaw</option>
                <option value="BUS"> Bus</option>
                <option value="TRUCK">Truck </option>
              </select>
            </>
          )}

          {/* ELECTRICITY */}
          {activity === "ELECTRICITY" && (
            <Input
              placeholder="Consumption (kWh)"
              onChange={(e) =>
                setForm({ ...form, consumption: e.target.value })
              }
            />
          )}

          {/* FOOD */}
          {activity === "FOOD" && (
            <>
              <select
                className="w-full border p-2 rounded"
                onChange={(e) =>
                  setForm({ ...form, foodType: e.target.value })
                }
              >
                <option value="BEEF">Beef</option>
                <option value="CHICKEN">Chicken</option>
                <option value="FISH">Fish</option>
                <option value="LAMB">Lamb</option>
                <option value="RICE">Rice</option>
                <option value="PIZZA">Pizza</option>
                <option value="BURGER">Burger</option>
                <option value="MOMO">Momos</option>
                <option value="COFFEE">Coffee</option>
              </select>

              <Input
                placeholder="Weight (kg)"
                onChange={(e) =>
                  setForm({ ...form, weightKg: e.target.value })
                }
              />
            </>
          )}

          {/* FLIGHT */}
          {activity === "FLIGHT" && (
            <>
              <Input
                placeholder="Source (e.g. DELHI)"
                onChange={(e) =>
                  setForm({ ...form, source: e.target.value })
                }
              />

              <Input
                placeholder="Destination (e.g. MUMBAI)"
                onChange={(e) =>
                  setForm({ ...form, destination: e.target.value })
                }
              />

              <select
                className="w-full border p-2 rounded"
                onChange={(e) =>
                  setForm({ ...form, flightType: e.target.value })
                }
              >
                <option value="ECONOMY">Economy</option>
                <option value="BUSINESS">Business</option>
              </select>
            </>
          )}

          <Button
      className="w-full cursor-pointer rounded-2xl 
  bg-gradient-to-r from-emerald-700 to-teal-600
  hover:from-emerald-800 hover:to-teal-700
  text-white font-semibold tracking-wide
  shadow-lg hover:shadow-2xl
  transition-all duration-300 hover:-translate-y-0.5
  h-12"
            onClick={handleCalculate}
          >
            Calculate Emission
          </Button>

        </CardContent>
      </Card>
      

      {/* Result */}
      {result && (
  <Card className="mt-1 rounded-3xl border w-full border-green-100 shadow-xl bg-cyan-50 overflow-hidden">

    {/* Result Content */}
    <CardContent className="p-1 text-center">

      {/* Activity Badge
      <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 text-green-700 font-medium text-sm border border-green-200">
        {result.activityType}
      </div> */}

      {/* CO2 Result */}
      <div className="mt-3 items-end justify-center gap-2">

        <p className="text-5xl font-extrabold text-gray-900 tracking-tight">
          {result.co2EmissionKg}{" "} 
          <span className="text-3xl text-gray-500 mb-1">kg  CO₂  emitted
          </span>
        </p>

      </div>

      {/* Divider */}
      <div className="w-64 h-1 bg-green-500 rounded-full mx-auto my-6"></div>

      {/* Message */}
      <div className=" mb-4 bg-cyan-50 rounded-2xl p-0 ">

        <p className="text-lg font-semibold text-gray-500 leading-relaxed">
          {result.message}
        </p>

      </div>

      <div className="bg-gradient-to-r from-green-300 to-emerald-600 p-3 text-white text-center border border-white/20 rounded-t-3xl">

      {/* Extra Insight */}
      <div className="mt-2 mb-2 text-large font-extralight text-indigo-50">

        {result.co2EmissionKg < 50 && (
          <p>
            ✅ Great! Your carbon footprint is relatively low.
          </p>
        )}

        {result.co2EmissionKg >= 50 &&
          result.co2EmissionKg < 200 && (
          <p>⚡ Moderate emissions detected for this activity.</p>
        )}

        {result.co2EmissionKg >= 200 && (
          <p>🚨 High carbon emissions detected. Consider eco-friendly alternatives.</p>
        )}

      </div>
      <div className="flex justify-center mb-1">
        <div className="w-16 h-10 rounded-full bg-white/20 flex items-center justify-center text-3xl shadow-md">
          🌍
        </div>
      </div>
    </div>

    </CardContent>
  </Card>
)}

    </div>
  )
}

export default EmissionCalculator