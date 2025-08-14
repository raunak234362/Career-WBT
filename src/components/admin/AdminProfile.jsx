/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Service from '../../config/Service'
import { set } from 'react-hook-form'
const AdminProfile = () => {
  const [adminData, setAdminData] = useState({})
  const [error, setError] = useState(null)
  const userId = localStorage.getItem('userId')
  const navigate = useNavigate()
  const fetchAdminData = async () => {
    const myHeaders = new Headers()
    myHeaders.append(
      'Authorization',
      `Bearer ${sessionStorage.getItem('token')}`
    )
    myHeaders.append('Content-Type', 'application/json')
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }
    const response = await Service.getCurrentUser();
    console.log("Response from getCurrentUser:", response);
    setAdminData(response)
  }

  useEffect(() => {
      fetchAdminData()
  }, [userId, navigate])

  if (error) {
    return <div>{error}</div>
  }


  return (
    <div className='flex flex-col justify-center w-[90%] mx-auto bg-white rounded-lg shadow-lg p-8'>
      <div className='flex flex-row justify-between gap-5'>
        <div>
          <p className='mb-6 text-3xl font-bold text-center text-gray-600'>
            {adminData?.designation?.toUpperCase()}
          </p>
          <div className='space-y-2'>
            <div className='flex items-center'>
              <span className='mr-2 text-xl font-semibold text-gray-600'>Email:</span>
              <span className='text-xl text-gray-800'>{adminData?.email}</span>
            </div>
            <div className='flex items-center'>
              <span className='mr-2 text-xl font-semibold text-gray-600'>Phone:</span>
              <span className='text-xl text-gray-800'>{adminData?.phone}</span>
            </div>
            <div className='flex items-center'>
              <span className='mr-2 text-xl font-semibold text-gray-600'>User ID:</span>
              <span className='text-xl text-gray-800'>{adminData?.userId}</span>
            </div>
            <div className='flex items-center'>
              <span className='mr-2 text-xl font-semibold text-gray-600'>Role:</span>
              <span className='text-xl text-gray-800'>{adminData?.role?.toUpperCase()}</span>
            </div>
          </div>
        </div>
        <div className='div'>
          <div className='flex justify-center mb-6'>
            <img
              src={`${import.meta.env.VITE_IMG_URL}/${adminData?.profilePic}`}
              alt='Profile Pic'
              className='object-cover w-32 h-32 rounded-full'
            />
          </div>
          <h3 className='mb-2 text-2xl font-bold text-center text-gray-800'>
            {adminData?.name?.toUpperCase()}
          </h3>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile
