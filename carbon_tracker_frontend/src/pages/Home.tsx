
import {Button} from '@/components/ui/button'
import bg_environment from "@/assets/bg_environment.jpg"
import Nature_illustration from "@/assets/Nature_illustration.png"
import { NavLink } from 'react-router';
import { Leaf } from "lucide-react"



function Home() {
  return (
    <div className="relative w-full overflow-hidden">

      {/*Background Image */}
      <section className="relative min-h-screen flex items-center justify-center text-center">
      <div className="absolute inset-0 -z-10">
        <img
          src={bg_environment}
          alt="environment background"
          className="w-full h-full object-cover opacity-13"/>
      </div>

      {/* HERO */}
      
      <div className="relative z-10 max-w-2xl flex flex-col items-center px-4">

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-700 to-lime-600 bg-clip-text text-transparent drop-shadow-md mb-3">
          Carbon Footprint Tracker
        </h1>

        {/* Description */}
        <p className="text-base md:text-lg text-gray-700 mb-6">
          Track your CO₂ emissions, understand your impact, and move toward a greener future.
        </p>
        {/* Illustration */}
        <div className="w-60 h-60 md:w-72 md:h-72 mb-6">
          <img
            src={Nature_illustration}
            alt="environment illustration"
            className="w-full h-full object-contain drop-shadow-xl animate-breathe"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <NavLink to={"/login"}>
          <Button className=" cursor-pointer bg-green-600 hover:bg-green-700 hover:border hover:border-green-900">
            <Leaf className="w-4 h-4" />
            Login
          </Button>
          </NavLink>
          <NavLink to={"/signup"}>
          <Button variant="secondary" className="cursor-pointer hover:bg-amber-100 hover:border hover:border-amber-400">
            Sign Up
          </Button>
          </NavLink>
        </div>
      </div>
      </section>
    {/* FEATURES SECTION */}
    <div className="py-16 bg-white text-center">
  <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-10">
    Track Your Impact
  </h2>

  <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto px-6">

    <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
      🚗
      <h3 className="font-semibold mt-3">Driving</h3>
      <p className="text-sm text-gray-600">
        Calculate emissions from your daily travel.
      </p>
    </div>

    <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
      ⚡
      <h3 className="font-semibold mt-3">Electricity</h3>
      <p className="text-sm text-gray-600">
        Monitor your household energy usage.
      </p>
    </div>

    <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
      🍽️
      <h3 className="font-semibold mt-3">Food</h3>
      <p className="text-sm text-gray-600">
        Track diet-related carbon emissions.
      </p>
    </div>
    </div>
    </div>
    {/*HOW It WORKS*/}
    <div className="py-16 bg-green-50 text-center">
  <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-10">
    How It Works
  </h2>

  <div className="flex flex-col md:flex-row justify-center gap-8">

    <div>
      <h3 className="font-semibold">1. Add Activities</h3>
      <p className="text-sm text-gray-600">Enter your daily actions</p>
    </div>

    <div>
      <h3 className="font-semibold">2. Calculate</h3>
      <p className="text-sm text-gray-600">We estimate your emissions</p>
    </div>

    <div>
      <h3 className="font-semibold">3. Improve</h3>
      <p className="text-sm text-gray-600">Reduce your carbon footprint</p>
    </div>
    </div>
    </div>
    {/* Why Choose Us */}
    <div className="py-16 bg-white text-center">
    <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-10">
        Why Choose Us
    </h2>

    <p className="max-w-2xl mx-auto text-gray-700">
        We provide simple tools, real insights, and actionable steps to help you live a more sustainable life.
    </p>
    </div>
    {/* Final CTA */}
    <div className="py-16 bg-green-900 text-center text-white">
    <h2 className="text-2xl md:text-3xl font-bold mb-4">
        Start Tracking Today
    </h2>

    <p className="mb-6">
        Join us and make a positive impact on the planet.
    </p>

    <NavLink to={"/signup"}>
    <button className="cursor-pointer bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-100 transition  ">
        Get Started
    </button>
    </NavLink>
    </div>
    </div>
  );
  
}

export default Home
