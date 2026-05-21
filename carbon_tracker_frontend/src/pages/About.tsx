import { motion } from "framer-motion"
import { Leaf, Globe, BarChart3 } from "lucide-react"

function About() {

  const GLASS_CARD =
    "bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20"

  const goTo = (path: string) => {
    console.log(path)
    // later you can use navigate("/contact")
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-white to-emerald-100 dark:from-gray-950 dark:via-gray-900 dark:to-green-950 ">
      <div className="pt-28 px-6 max-w-6xl mx-auto text-center">

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold text-green-700 mb-4"
      >
      <div className=" h-10 flex justify-center mb-1 text-5xl">
        About Us 🌍
      </div>
      </motion.h1>

      <p className="text-green-700 font-semibold dark:text-gray-300 mb-10 max-w-2xl mx-auto">
        Our mission is to help individuals understand and reduce their carbon footprint through simple tracking and actionable insights.
      </p>

      {/* Features Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-14">

        {/* Card 1 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white rounded-xl shadow-md"
        >
          <Leaf className="mx-auto text-green-600 mb-3" />
          <h3 className="font-semibold mb-2">Eco Friendly</h3>
          <p className="text-sm text-gray-600">
            Designed to promote sustainable habits and awareness.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white rounded-xl shadow-md"
        >
          <BarChart3 className="mx-auto text-green-600 mb-3" />
          <h3 className="font-semibold mb-2">Data Insights</h3>
          <p className="text-sm text-gray-600">
            Track emissions and visualize your environmental impact.
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white rounded-xl shadow-md"
        >
          <Globe className="mx-auto text-green-600 mb-3" />
          <h3 className="font-semibold mb-2">Global Impact</h3>
          <p className="text-sm text-gray-600">
            Small actions lead to a bigger global change.
          </p>
        </motion.div>
      </div>

      {/* Extra Detailed Section */}
      <div className="space-y-6 text-left">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Mission */}
          <div className={`${GLASS_CARD} p-6`}>
            <h3 className="font-semibold text-xl mb-3 text-green-700">
              Our Mission
            </h3>

            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              CarbonTracker is a comprehensive carbon footprint tracking dashboard designed to help individuals and organizations monitor, understand, and reduce their CO₂ emissions.
            </p>

            <p className="text-sm text-gray-700 dark:text-gray-300">
              By providing real-time calculations, detailed analytics, and personalized insights, we empower users to make informed environmental decisions.
            </p>
          </div>

          {/* Features */}
          <div className={`${GLASS_CARD} p-6`}>
            <h3 className="font-semibold text-xl mb-3 text-green-700">
              Features
            </h3>

            <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">

              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Real-time carbon footprint calculator
              </li>

              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Detailed analytics and visualizations
              </li>

              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Historical tracking and trends
              </li>

              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Export reports and data
              </li>

              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Dark mode support
              </li>

            </ul>
          </div>

          {/* How It Works */}
          <div className={`${GLASS_CARD} p-6`}>
            <h3 className="font-semibold text-xl mb-3 text-green-700">
              How It Works
            </h3>

            <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">

              <div>
                <div className="font-medium mb-1">
                  1. Calculate Emissions
                </div>

                <p>
                  Enter activities like driving, electricity usage, food consumption, and flights.
                </p>
              </div>

              <div>
                <div className="font-medium mb-1">
                  2. Track Progress
                </div>

                <p>
                  Save your emission history and analyze trends over time.
                </p>
              </div>

              <div>
                <div className="font-medium mb-1">
                  3. Improve Sustainability
                </div>

                <p>
                  Discover areas where you can reduce your carbon footprint.
                </p>
              </div>

            </div>
          </div>

          {/* Contact */}
          <div className={`${GLASS_CARD} p-6`}>
            <h3 className="font-semibold text-xl mb-3 text-green-700">
              Contact & Support
            </h3>

            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p><strong>Email:</strong> support@carbontracker.com</p>
              <p><strong>Website:</strong> www.carbontracker.com</p>
              <p><strong>Version:</strong> 1.0.0</p>
            </div>

            <button
              onClick={() => goTo("contact")}
              className="mt-5 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            >
              Get in Touch
            </button>
          </div>

        </div>
      </div>
    </div>
    </div>
  )
}

export default About