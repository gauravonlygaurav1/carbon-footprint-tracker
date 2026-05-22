import { useState } from "react"
import { Button } from "./ui/button"
import navlogo from "@/assets/navlogo.png"
import { NavLink, useNavigate } from "react-router"
import useAuth from "@/Auth/store"

function Navbar() {
  const checkLogin = useAuth((state) => state.checkLogin)
  const user = useAuth((state) => state.user)
  const logout = useAuth((state) => state.logout)
  const navigate = useNavigate()

  const [profileOpen, setProfileOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const linkClass = ({ isActive }: any) =>
    `px-4 py-2 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-green-100 to-green-200 text-green-800 shadow-sm"
        : "text-green-800 hover:bg-green-100/70 hover:text-green-950"
    }`

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-green-50 border-b border-green-200 shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-6 h-16">

        {/* LOGO */}
        <div className="flex items-center gap-8">
        <img src={navlogo} alt="Logo" className="h-14 md:h-16 w-auto" />

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6 font-semibold">
          {checkLogin() ? (
            <>
              <NavLink to="/dashboard" end className={linkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/dashboard/emissionCalculator" className={linkClass}>
                CO₂ Emission
              </NavLink>
              <NavLink to="/dashboard/analytics" className={linkClass}>
                Analytics
              </NavLink>
              <NavLink to="/dashboard/goals" className={linkClass}>
                Goals
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/" className={linkClass}>
                Home
              </NavLink>
              <NavLink to="/about" className={linkClass}>
                About
              </NavLink>
              <NavLink to="/service" className={linkClass}>
                Service
              </NavLink>
            </>
          )}
        </div>
        </div>

        {/* RIGHT SECTION (DESKTOP) */}
        <div className="hidden md:flex items-center gap-4 relative">
          {checkLogin() ? (
            <>
              <button
                onClick={() => setProfileOpen((p) => !p)}
                className="cursor-pointer flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <span className="text-sm">{user?.name}</span>
              </button>

            {/* Dropdown */}
            {profileOpen && (
              <div className=" absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden z-50">

                {/* Header */}
                <div className=" px-4 py-3 bg-gray-50 border-b">
                  <div className=" font-semibold text-gray-800">
                    Your account
                  </div>
                  <div className=" text-sm text-gray-500 truncate">
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
            </>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* HAMBURGER (MOBILE ONLY) */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>
      </div>

          
      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 font-semibold bg-green-50 border-t border-green-200">
          {checkLogin() ? (
            <>
              <NavLink to="/dashboard" onClick={() => setMobileOpen(false)}
                className="text-gray-700 text-left"
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/dashboard/emissionCalculator"
                onClick={() => setMobileOpen(false)}
                className="text-gray-700 text-left"
              >
                CO₂ Emission
              </NavLink>
              <NavLink
                to="/dashboard/analytics"
                onClick={() => setMobileOpen(false)}
                className="text-gray-700 text-left"
              >
                Analytics
              </NavLink>
              <NavLink to="/dashboard/goals" onClick={() => setMobileOpen(false)}
                className="text-gray-700 text-left"
              >
                Goals
              </NavLink>
              <NavLink to="/dashboard/profile"
               onClick={() => setMobileOpen(false)}
               className="text-gray-700 text-left"
               >
                Profiles
              </NavLink>

              <button
                onClick={() => {
                  logout()
                  navigate("/")
                }}
                className="text-red-500 text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/" onClick={() => setMobileOpen(false)}
                className="text-gray-700 text-left">
                Home
              </NavLink>
              <NavLink to="/about" onClick={() => setMobileOpen(false)}
                className="text-gray-700 text-left">
                About
              </NavLink>
              <NavLink to="/service" onClick={() => setMobileOpen(false)}
                className="text-gray-700 text-left">
                Service
              </NavLink>
              <NavLink to="/login" onClick={() => setMobileOpen(false)}
                className="text-green-600 text-left"
              >
                Login
              </NavLink>
              <NavLink to="/contact" onClick={() => setMobileOpen(false)}
                className="text-amber-600  text-left"
              >
                Contact Us
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar