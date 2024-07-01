/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL, IMG_URL } from '../../constants'

const AdminProfile = () => {
  const [adminData, setAdminData] = useState({})
  const [error, setError] = useState(null)
  const userId = localStorage.getItem('userId')
  const navigate = useNavigate()

  const fetchAdminData = async () => {
    const myHeaders = new Headers()
    myHeaders.append(
      'Authorization',
      `Bearer ${localStorage.getItem('access')}`
    )
    myHeaders.append('Content-Type', 'application/json')
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }

    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/admin/user/`,
        requestOptions
      )
      const data = await response.json()
      setAdminData(data?.data)
      console.log(data?.data)
    } catch (error) {
      setError(error.message)
      console.error(error)
    }
  }

  useEffect(() => {
    if (!userId) {
      navigate('/') // Redirect to login if no userId is found
    } else {
      fetchAdminData()
    }
  }, [userId, navigate])

  if (error) {
    return <div>{error}</div>
  }

  if (!adminData) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex flex-col justify-center w-[90%] mx-auto bg-white rounded-lg shadow-lg p-8'>
      <div className='flex flex-row gap-5 justify-between'>
        <div>
          <p className='text-gray-600 font-bold text-center text-3xl mb-6'>
            {adminData?.designation?.toUpperCase()}
          </p>
          <div className='space-y-2'>
            <div className='flex items-center'>
              <span className='text-gray-600 font-semibold text-xl mr-2'>Email:</span>
              <span className='text-gray-800 text-xl'>{adminData.email}</span>
            </div>
            <div className='flex items-center'>
              <span className='text-gray-600 font-semibold text-xl mr-2'>Phone:</span>
              <span className='text-gray-800 text-xl'>{adminData.phone}</span>
            </div>
            <div className='flex items-center'>
              <span className='text-gray-600 font-semibold text-xl mr-2'>User ID:</span>
              <span className='text-gray-800 text-xl'>{adminData.userId}</span>
            </div>
            <div className='flex items-center'>
              <span className='text-gray-600 font-semibold text-xl mr-2'>Role:</span>
              <span className='text-gray-800 text-xl'>{adminData?.role?.toUpperCase()}</span>
            </div>
          </div>
        </div>
        <div className='div'>
          <div className='flex justify-center mb-6'>
            <img
              src={`${IMG_URL}/${adminData.profilePic}`}
              alt='Profile Pic'
              className='w-32 h-32 rounded-full object-cover'
            />
          </div>
          <h3 className='text-2xl font-bold text-gray-800 text-center mb-2'>
            {adminData?.name?.toUpperCase()}
          </h3>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile
