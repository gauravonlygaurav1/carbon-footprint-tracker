import React, { useState } from 'react'
import { Button } from './ui/button'
import navlogo from "@/assets/navlogo.png"
import { NavLink, useNavigate } from 'react-router'
import useAuth from '@/Auth/store'

function Navbar() {
  const checkLogin = useAuth((state) => state.checkLogin)
  const user = useAuth((state) => state.user)
  const logout = useAuth((state) => state.logout)
  const navigate = useNavigate()

  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 h-16 backdrop-blur-md bg-green-50 border-b border-green-200 shadow-sm">

      {/* LOGGED IN*/}
      {checkLogin() ? (
        <div className="flex items-center justify-between w-full">

          {/* LEFT */}
          <div className="flex items-center gap-6">
            <img src={navlogo} alt="Logo" className="h-16 w-auto" />

            <div className="flex gap-6 text-base font-semibold">
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl transition-all duration-300
   ${isActive
                    ? "bg-gradient-to-r from-green-100 to-green-200 text-green-800 shadow-sm"
                    : "text-green-800 hover:bg-green-100/70 hover:text-green-950"
                  }`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/dashboard/emissionCalculator"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl transition-all duration-300
   ${isActive
                    ? "bg-gradient-to-r from-green-100 to-green-200 text-green-800 shadow-sm"
                    : "text-green-800 hover:bg-green-100/70 hover:text-green-950"
                  }`
                }
              >
                CO₂ Emission
              </NavLink>

              <NavLink
                to="/dashboard/analytics"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl transition-all duration-300
   ${isActive
                    ? "bg-gradient-to-r from-green-100 to-green-200 text-green-800 shadow-sm"
                    : "text-green-800 hover:bg-green-100/70 hover:text-green-950"
                  }`
                }
              >
                Analytics
              </NavLink>

              <NavLink
                to="/dashboard/goals"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl transition-all duration-300
   ${isActive
                    ? "bg-gradient-to-r from-green-100 to-green-200 text-green-800 shadow-sm"
                    : "text-green-800 hover:bg-green-100/70 hover:text-green-950"
                  }`
                }
              >
                Goals
              </NavLink>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4 relative">

            {/* Avatar Button */}
            <button
              onClick={() => setProfileOpen(p => !p)}
              className="cursor-pointer flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-full shadow-sm border border-transparent hover:border-emerald-300"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-sky-500 flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0) || "U"}
              </div>

              <span className="hidden sm:block text-sm">
                {user?.name || "Account"}
              </span>
            </button>

            {/* Dropdown */}
            {profileOpen && (
              <div className=" absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden z-50">

                {/* Header */}
                <div className=" px-4 py-3 bg-gray-50 border-b">
                  <div className="font-semibold text-gray-800">
                    Your account
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {user?.email || "No email set"}
                  </div>
                </div>

                {/* Menu */}
                <div className="cursor-pointer py-2 text-sm">
                  <button
                    onClick={() => { navigate("/dashboard"); setProfileOpen(false) }}
                    className="cursor-pointer w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    My Dashboard
                  </button>

                  <button
                    onClick={() => { navigate("/dashboard/profile"); setProfileOpen(false) }}
                    className="cursor-pointer w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </button>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center px-4 py-3 border-t">

                  <button
                    onClick={() => setProfileOpen(false)}
                    className="cursor-pointer px-3 py-1 rounded-full border text-sm hover:bg-gray-100"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => { logout(); navigate("/") }}
                    className="cursor-pointer px-3 py-1 rounded-full bg-red-500 text-white text-sm hover:bg-red-600"
                  >
                    Logout
                  </button>

                </div>
              </div>
            )}

          </div>
        </div>
      ) : (

        /* LOGGED OUT */
        <div className="flex items-center justify-between w-full">

          {/* LEFT */}
          <div className="flex items-center gap-6">
            <img src={navlogo} alt="Logo" className="h-16 w-auto" />

            <div className="flex gap-6 text-base font-semibold">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-green-700" : "text-gray-700 hover:text-green-600"
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "text-green-700" : "text-gray-700 hover:text-green-600"
                }
              >
                About
              </NavLink>

              <NavLink
                to="/service"
                className={({ isActive }) =>
                  isActive ? "text-green-700" : "text-gray-700 hover:text-green-600"
                }
              >
                Service
              </NavLink>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex gap-4 items-center">
            <NavLink to="/login">
              <Button className="cursor-pointer bg-green-400 hover:bg-green-700 text-sm">
                Login
              </Button>
            </NavLink>

            <NavLink to="/contact">
              <Button variant="outline" className="cursor-pointer hover:bg-amber-50 hover:border hover:border-amber-400 text-sm">
                Contact Us
              </Button>
            </NavLink>
          </div>

        </div>
      )}

    </nav>
  )
}

export default Navbar