/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import logo from "../../assets/logo.png"
import { BiHome } from "react-icons/bi"

import { MdLogout } from "react-icons/md"
import { useState } from "react"




const Sidebar = ({ activeLink, handleNavLinkClick }) => {

  const location = useLocation();
  const { pathname } = location;

  const fetchLogout = async () => {
    const accessToken = localStorage.getItem('access')
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    Navigate('/')
  }

  return (
    <div className="fixed left-0 flex flex-col justify-between h-screen px-0 py-4 border-green-500 border-r-2 ">
      <div className='navbar-section'>
        <div className="flex justify-center px-2">
          <img src={logo} className="w-60" />
        </div>
        <nav className="space-y-4 mt-11">
          <Link
            to="/admin"
            onClick={() => handleNavLinkClick("")}
            className={`flex items-center gap-2 px-5 py-2 transition-colors duration-300 ${pathname === "/admin"
                ? "bg-green-500 text-white"
                : "hover:bg-green-700"
              }`}
          >
            <BiHome className="text-xl" />
            <span>Profile</span>
          </Link>
          <Link
            to="/admin/contest"
            onClick={() => handleNavLinkClick("project")}
            className={`flex items-center gap-2 px-4 py-2 transition-colors duration-300 ${pathname === "/admin/contest"
                ? "bg-green-500 text-white"
                : "hover:bg-green-700"
              }`}
          >
            <BiHome className="text-xl" />
            <span>Contest</span>
          </Link>
          <Link
            to="/admin/result"
            onClick={() => handleNavLinkClick("task")}
            className={`flex items-center gap-2 px-4 py-2 transition-colors duration-300 ${pathname === "/admin/result"
                ? "bg-green-500 text-white"
                : "hover:bg-green-700"
              }`}
          >
            <BiHome className="text-xl" />
            <span>Result</span>
          </Link>

        </nav>
      </div>
      <div className='profile-logout mb-4 px-4'>
    
        <div className='flex flex-row items-center hover:bg-red-600 hover:text-white py-2 px-3 gap-4 mb-4  rounded-lg'>
          <MdLogout />
          <button
            onClick={fetchLogout}
            className='text-sm  hover:text-white w-full text-center'
          >
            Logout
          </button>
        </div>

      </div>


    </div>
  )
}

export default Sidebar
