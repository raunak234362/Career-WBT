import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Contest from "./Contest";
import AdminProfile from "./AdminProfile";
import QuestionPage from "./QuestionPage";
import Result from "./Result";

const StdCareerLayout = () => {
  const [activeLink, setActiveLink] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  const handleNavLinkClick = (link) => {
    setActiveLink(link);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className='relative flex flex-col h-screen min-h-screen overflow-y-hidden md:flex-row'>
    {/* Sidebar */}
    <div
      className={`fixed inset-0 z-0 bg-black bg-opacity-50 transition-opacity duration-300 md:hidden ${
        showSidebar ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={toggleSidebar}
    ></div>
    <div
      className={`fixed inset-y-0 left-0 z-50 w-52 transform bg-white shadow-lg transition-transform duration-300 md:relative md:translate-x-0 md:shadow-none ${
        showSidebar ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div onClick={e => e.stopPropagation()}>
        <Sidebar
          activeLink={activeLink}
          handleNavLinkClick={handleNavLinkClick}
        >
          <nav className='p-4'>
            <Link to='/' onClick={() => handleNavLinkClick('/')}>
              Profile
            </Link>
            <Link
              to='/admin/Contest'
              onClick={() => handleNavLinkClick('contest')}
            >
              Contest
            </Link>
            <Link
              to='/admin/result'
              onClick={() => handleNavLinkClick('result')}
            >
              Result
            </Link>
          </nav>
        </Sidebar>
      </div>
    </div>

    {/* Main Content */}
    <div className='flex-1 overflow-y-auto'>
      {/* Header with Toggler Button */}
      <div className='flex items-center justify-between p-2 mb-4 border-b rounded-lg shadow-md bg-white/70 border-neutral-700/80'>
        <Header activeLink={activeLink} />
        <button
          className='text-gray-600 md:hidden hover:text-gray-800 focus:outline-none'
          onClick={toggleSidebar}
        >
          {showSidebar ? (
            <FaTimes className='text-2xl' />
          ) : (
            <FaBars className='text-2xl' />
          )}
        </button>
      </div>

      {/* Content */}
      <div className='flex-1 h-auto pb-20 rounded-lg'>
    
    <Outlet/>
      </div>
      
    </div>
  </div>
  );
}

export default StdCareerLayout;
