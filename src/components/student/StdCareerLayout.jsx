import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Link, Route, Routes } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import StudentProfile from "./StudentProfile";
import Contest from "./Contest";
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
    <div className='flex flex-col md:flex-row min-h-screen h-screen overflow-y-hidden relative'>
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
              to='/student/Contest'
              onClick={() => handleNavLinkClick('contest')}
            >
              Contest
            </Link>
            <Link
              to='/student/result'
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
      <div className='flex justify-between items-center bg-white/70 p-2 rounded-lg shadow-md mb-4 border-b border-neutral-700/80'>
        <Header activeLink={activeLink} />
        <button
          className='md:hidden text-gray-600 hover:text-gray-800 focus:outline-none'
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
      <div className='flex-1 rounded-lg h-auto pb-20'>
       
        <Routes>
          <Route path='/' element={<StudentProfile />} />
          <Route path='/contest' element={<Contest />} />
          <Route path='/result' element={<Result />} />
          
        </Routes>
       
      </div>
      
    </div>
  </div>
  );
}

export default StdCareerLayout;
