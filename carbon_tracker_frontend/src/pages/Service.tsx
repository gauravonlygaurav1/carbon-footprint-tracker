import { motion } from "framer-motion"
import { Car, Zap, Utensils, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import bg_environment from "@/assets/bg_environment.jpg"
import { NavLink } from "react-router"


function Service() {
  return (
    <div className="pt-20 px-6 max-w-6xl mx-auto text-center">

       {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src={bg_environment}
          alt="environment background"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold text-green-700 mb-4"
      >
        Our Services
      </motion.h1>

      <p className="text-gray-700 mb-10 max-w-2xl mx-auto">
        Track and analyze your daily activities to understand your carbon footprint.
      </p>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Driving */}
        <motion.div whileHover={{ scale: 1.05 }} className="p-5 bg-white rounded-xl shadow-md">
          <Car className="mx-auto text-green-600 mb-3" />
          <h3 className="font-semibold">Driving</h3>
          <p className="text-sm text-gray-600">Calculate emissions from travel.</p>
        </motion.div>

        {/* Electricity */}
        <motion.div whileHover={{ scale: 1.05 }} className="p-5 bg-white rounded-xl shadow-md">
          <Zap className="mx-auto text-yellow-500 mb-3" />
          <h3 className="font-semibold">Electricity</h3>
          <p className="text-sm text-gray-600">Track household energy usage.</p>
        </motion.div>

        {/* Food */}
        <motion.div whileHover={{ scale: 1.05 }} className="p-5 bg-white rounded-xl shadow-md">
          <Utensils className="mx-auto text-green-500 mb-3" />
          <h3 className="font-semibold">Food</h3>
          <p className="text-sm text-gray-600">Measure diet-related emissions.</p>
        </motion.div>

        {/* Shopping */}
        <motion.div whileHover={{ scale: 1.05 }} className="p-5 bg-white rounded-xl shadow-md">
          <ShoppingBag className="mx-auto text-purple-500 mb-3" />
          <h3 className="font-semibold">Shopping</h3>
          <p className="text-sm text-gray-600">Analyze product consumption impact.</p>
        </motion.div>

      </div>

      {/* CTA */}
      <NavLink to={"/signup"}>
      <div className="mt-10">
        <Button className="cursor-pointer bg-green-600 hover:bg-green-700">
          Start Tracking
        </Button>
      </div>
      </NavLink>

    </div>
  )
}

export default Service