/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Header = ({ toggleSidebar }) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const navigate = useNavigate()

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen)
  }

  return (
    <div className='flex sticky top-0 z-10 justify-between backdrop-blur-sm items-center bg-white p-4'>
     
      <h1 className='text-2xl text-black'>
        Admin Dashboard
      </h1>
    </div>
  )
}

export default Header
