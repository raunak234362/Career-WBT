/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import logo from "../../assets/logo.png"
import { BiHome } from "react-icons/bi"

import { MdContentPaste, MdLogout } from "react-icons/md"
import { useState } from "react"
import { BsFileEarmarkSpreadsheet, BsQuestion, BsQuestionCircleFill } from "react-icons/bs"
import { FaRegCaretSquareLeft } from "react-icons/fa"
import { FaMarsStroke } from "react-icons/fa6"




const Sidebar = ({ activeLink, handleNavLinkClick }) => {

  const location = useLocation();
  const { pathname } = location;

  const fetchLogout = async () => {
    const accessToken = sessionStorage.getItem('token')
    sessionStorage.removeItem("access");
    sessionStorage.removeItem("refresh");
    sessionStorage.removeItem("userId");
    Navigate('/')
  }

  return (
    <div className="fixed left-0 flex flex-col justify-between h-screen px-0 py-4 border-r-2 border-green-500 ">
      <div className='navbar-section'>
        <div className="flex justify-center px-2">
          <img src={logo} className="w-60" />
        </div>
        <nav className="space-y-4 mt-11">
          <Link
            to="profile"
            onClick={() => handleNavLinkClick("")}
            className={`flex items-center gap-2 px-5 py-2 transition-colors duration-300 ${pathname === "/profile"
                ? "bg-green-500 text-white"
                : "hover:bg-green-700"
              }`}
          >
            <BiHome className="text-xl" />
            <span>Profile</span>
          </Link>
          <Link
            to="contest"
            onClick={() => handleNavLinkClick("contest")}
            className={`flex items-center gap-2 px-4 py-2 transition-colors duration-300 ${pathname === "contest"
                ? "bg-green-500 text-white"
                : "hover:bg-green-700"
              }`}
          >
            <MdContentPaste className="text-xl" />
            <span>Contest</span>
          </Link>
          {/* <Link
            to="/admin/csv"
            onClick={() => handleNavLinkClick("csv")}
            className={`flex items-center gap-2 px-4 py-2 transition-colors duration-300 ${pathname === "/admin/csv"
                ? "bg-green-500 text-white"
                : "hover:bg-green-700"
              }`}
          >
            <BiHome className="text-xl" />
            <span>CSV</span>
          </Link> */}
          <Link
            to="question"
            onClick={() => handleNavLinkClick("question")}
            className={`flex items-center gap-2 px-4 py-2 transition-colors duration-300 ${pathname === "question"
                ? "bg-green-500 text-white"
                : "hover:bg-green-700"
              }`}
          >
            <BsQuestionCircleFill className="text-xl" />
            <span>Question</span>
          </Link>
          <Link
            to="result"
            onClick={() => handleNavLinkClick("task")}
            className={`flex items-center gap-2 px-4 py-2 transition-colors duration-300 ${pathname === "result"
                ? "bg-green-500 text-white"
                : "hover:bg-green-700"
              }`}
          >
            <BsFileEarmarkSpreadsheet className="text-xl" />
            <span>Result</span>
          </Link>

        </nav>
      </div>
      <div className='px-4 mb-4 profile-logout'>
    
        <div className='flex flex-row items-center gap-4 px-3 py-2 mb-4 rounded-lg hover:bg-red-600 hover:text-white'>
          <MdLogout />
          <button
            onClick={fetchLogout}
            className='w-full text-sm text-center hover:text-white'
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
