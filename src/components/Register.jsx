/* eslint-disable no-unused-vars */
import { useState } from 'react'
import Logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useFormContext } from '../hooks/FormContext'

const RegisterStudent = () => {
  const { formData, updateFormData } = useFormContext()
  const [isSameAddress, setIsSameAddress] = useState(false)
  const [profilePic, setProfilePic] = useState(null)
  const [resume, setResume] = useState(null)
  const navigate = useNavigate()

  const handleCheckboxChange = () => {
    setIsSameAddress(!isSameAddress)
  }

  const handleChange = (e, type) => {
    const { id, value } = e.target
    if (type === 'profile') {
      setProfilePic(e.target.files[0])
    } else if (type === 'resume') {
      setResume(e.target.files[0])
    } else {
      updateFormData({ [id]: value })
    }
  }

  const handleDragOver = e => {
    e.preventDefault()
  }

  const handleDrop = (e, fileType) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (fileType === 'profile') {
      setProfilePic(file)
    } else {
      setResume(file)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const userID = `user-${Math.floor(Math.random() * 10000)}`
    const password = `pass-${Math.random().toString(36).substring(2, 8)}`

    localStorage.setItem('userID', userID)
    localStorage.setItem('password', password)

    navigate('/successful')
  }

  return (
    <div>
      <div className='flex flex-col border mx-[20%] my-3 rounded-lg p-4 bg-white shadow-lg shadow-green-500/50'>
        <img
          src={Logo}
          className='w-[20%] justify-center items-center m-auto mb-5'
          alt='Logo'
        />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='Fname'>Student Name</label>
            <div className='flex flex-row w-full gap-3 mt-2'>
              <input
                className='appearance-none border border-gray-300 rounded-lg w-[50%] py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
                type='text'
                value={formData.Fname || ''}
                required
                placeholder='First Name'
                id='Fname'
                onChange={handleChange}
              />
              <input
                className='appearance-none border border-gray-300 rounded-lg w-[50%] py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
                type='text'
                value={formData.Lname || ''}
                required
                placeholder='Last Name'
                id='Lname'
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='mt-3'>
            <label htmlFor='CollegeID'>Student College ID</label>
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
              type='text'
              value={formData.CollegeID || ''}
              required
              placeholder='College ID'
              id='CollegeID'
              onChange={handleChange}
            />
          </div>
          <div className='mt-3'>
            <label htmlFor='email'>Student Email</label>
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
              type='email'
              value={formData.email || ''}
              required
              placeholder='Email'
              id='email'
              onChange={handleChange}
            />
          </div>
          <div className='mt-3'>
            <label htmlFor='contact'>Student Contact Number</label>
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
              type='text'
              value={formData.contact || ''}
              required
              placeholder='Contact Number'
              id='contact'
              onChange={handleChange}
            />
          </div>
          <div className='mt-3'>
            <label htmlFor='year'>Final Semester Marks</label>
            <div className='flex flex-row gap-3'>
              <select
                className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
                value={formData.year || ''}
                required
                id='year'
                onChange={handleChange}
              >
                <option value=''>Select Semester</option>
                <option value='Semester-1'>Semester-1</option>
                <option value='Semester-2'>Semester-2</option>
                <option value='Semester-3'>Semester-3</option>
                <option value='Semester-4'>Semester-4</option>
                <option value='Semester-5'>Semester-5</option>
                <option value='Semester-6'>Semester-6</option>
                <option value='Semester-7'>Semester-7</option>
                <option value='Semester-8'>Semester-8</option>
              </select>
              <input
                className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
                type='text'
                value={formData.marks || ''}
                placeholder='Percentage/CGPA'
                required
                id='marks'
                onChange={handleChange}
              />
              <input
                className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
                type='text'
                value={formData.backlogs || ''}
                placeholder='No. of Backlogs'
                id='backlogs'
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='mt-3'>
            <label htmlFor='address'>Current Address</label>
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
              type='text'
              value={formData.address || ''}
              placeholder='Address'
              required
              id='address'
              onChange={handleChange}
            />
            <div className='flex flex-row gap-2 mt-2'>
              <input
                className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
                type='text'
                value={formData.city || ''}
                placeholder='City'
                required
                id='city'
                onChange={handleChange}
              />
              <input
                className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
                type='text'
                value={formData.state || ''}
                placeholder='State'
                required
                id='state'
                onChange={handleChange}
              />
            </div>
            <div className='flex flex-row gap-2 mt-2'>
              <input
                className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
                type='text'
                value={formData.country || ''}
                placeholder='Country'
                required
                id='country'
                onChange={handleChange}
              />
              <input
                className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
                type='text'
                value={formData.zip || ''}
                placeholder='Zip'
                required
                id='zip'
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='mt-3'>
            <label className='inline-flex items-center'>
              <input
                type='checkbox'
                className='form-checkbox'
                checked={isSameAddress}
                onChange={handleCheckboxChange}
              />
              <span className='ml-2'>
                Current address is the same as present address
              </span>
            </label>
          </div>

          {!isSameAddress && (
            <div className='mt-3'>
              <label
                htmlFor='present-address'
                className='block text-gray-700 font-bold mb-2'
              >
                Present Address
              </label>
              <input
                className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
                type='text'
                value={formData.presentAddress || ''}
                placeholder='Address'
                id='present-address'
                onChange={handleChange}
              />
              <div className='flex flex-row gap-2 mt-2'>
                <input
                  className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
                  type='text'
                  value={formData.presentCity || ''}
                  placeholder='City'
                  id='present-city'
                  onChange={handleChange}
                />
                <input
                  className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
                  type='text'
                  value={formData.presentState || ''}
                  placeholder='State'
                  id='present-state'
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-row gap-2 mt-2'>
                <input
                  className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
                  type='text'
                  value={formData.presentCountry || ''}
                  placeholder='Country'
                  id='present-country'
                  onChange={handleChange}
                />
                <input
                  className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
                  type='text'
                  value={formData.presentZip || ''}
                  placeholder='Zip'
                  id='present-zip'
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          <div className='mt-3'>
            <label htmlFor='profile'>Upload Current Pic</label>
            <div
              className='border bg-white border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
              onDragOver={handleDragOver}
              onDrop={e => handleDrop(e, 'profile')}
            >
              <input
                type='file'
                accept='image/*'
                required
                id='profile'
                onChange={e => handleChange(e, 'profile')}
                style={{ display: 'none' }}
              />
              <label htmlFor='profile' className='cursor-pointer'>
                <p>
                  Drag and drop your profile picture here, or click to select
                  one
                </p>
              </label>
              {profilePic && (
                <img
                  src={URL.createObjectURL(profilePic)}
                  alt='Profile Pic'
                  className='mt-2 w-[20%]'
                />
              )}
            </div>
          </div>
          <div className='mt-3'>
            <label htmlFor='resume'>Upload Your Latest Resume</label>
            <div
              className='border bg-white border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'resume')}
            >
              <input
                type='file'
                required
                id='resume'
                onChange={(e) => handleChange(e, 'resume')}
                style={{ display: 'none' }}
              />
              <label
                htmlFor='resume'
                className='cursor-pointer'
              >
                <p>Drag and drop your resume here, or click to select one</p>
              </label>
             
            </div>
          </div>
          {resume && (
                <p className='mt-2'>Selected file: {resume.name}</p>
              )}

          <button
            type='submit'
            className='bg-green-500 mt-5 w-full text-white px-4 py-2 rounded-md hover:bg-green-600'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterStudent