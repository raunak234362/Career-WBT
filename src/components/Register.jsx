/* eslint-disable no-unused-vars */
import { useState } from 'react'
import Logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useFormContext } from '../hooks/FormContext'

const RegisterStudent = () => {
  const { formData, updateFormData } = useFormContext()
  const [isSameAddress, setIsSameAddress] = useState(false)
  const [profile, setProfilePic] = useState(null)
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formdata = new FormData();
    Object.keys(formData).forEach((key) => {
      formdata.append(key, formData[key]);
    });
    if (profile) formdata.append("profile", profile);
    if (resume) formdata.append("resume", resume);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer null");
    myHeaders.append("Cookie", document.cookie);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    try {
      const response = await fetch("https://wbt-quizcave.onrender.com/api/v1/user/register", requestOptions);
      const result = await response.json();
      console.log(result);
      navigate('/successful');
    } catch (error) {
      console.error(error);
    }
  };

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
            <label htmlFor='Name'>Student Name</label>
            <div className='flex flex-row w-full gap-3 mt-2'>
              <input
                className='appearance-none border border-gray-300 rounded-lg w-[50%] py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
                type='text'
                value={formData.name || ''}
                required
                placeholder='Name'
                id='name'
                onChange={handleChange}
              />
           </div>
          </div>

          <div className='mt-3'>
            <label htmlFor='CollegeID'>Student ID</label>
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
              type='text'
              value={formData.studentId || ''}
              required
              placeholder='Student ID'
              id='studentId'
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
              value={formData.phone || ''}
              required
              placeholder='Contact Number'
              id='phone'
              onChange={handleChange}
            />
          </div>
          <div className='mt-3'>
            <label htmlFor='contact'>Father Name</label>
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
              type='text'
              value={formData.fatherName || ''}
              required
              placeholder='Father Name'
              id='fatherName'
              onChange={handleChange}
            />
          </div>
          <div className='mt-3'>
            <label htmlFor='contact'>Mother Name</label>
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
              type='text'
              value={formData.motherName || ''}
              required
              placeholder='Mother Name'
              id='motherName'
              onChange={handleChange}
            />
          </div>
          <div className='mt-3'>
            <label htmlFor='contact'>Gender</label>
            <select  className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
              value={formData.gender || ''}
              required
              id='gender'
              onChange={handleChange}>
             <option value=''>Select Gender</option>
             <option value='male'>Male</option>
             <option value='female'>Female</option>
             <option value='other'>Other</option>
            </select>
          </div>
          <div className='mt-3'>
            <label htmlFor='contact'>Date of Birth</label>
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
              type='date'
              value={formData.dob || ''}
              required
              placeholder='Date of Birth'
              id='dob'
              onChange={handleChange}
            />
          </div>
          <div className='mt-3'>
            <label htmlFor='contact'>Branch</label>
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
              type='text'
              value={formData.branch || ''}
              required
              placeholder='Branch'
              id='branch'
              onChange={handleChange}
            />
          </div>
          <div className='mt-3'>
            <label htmlFor='contact'>Course</label>
            <input
              className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
              type='text'
              value={formData.course || ''}
              required
              placeholder='Course'
              id='course'
              onChange={handleChange}
            />
          </div>
          <div className='mt-3'>
            <label htmlFor='year'>Final Semester Marks</label>
            <div className='flex flex-row gap-3'>
              <select
                className='appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 peer'
                value={formData.currentSemester || ''}
                required
                id='currentSemester'
                onChange={handleChange}
              >
                <option value=''>Select Semester</option>
                <option value='1'>Semester-1</option>
                <option value='1'>Semester-1</option>
                <option value='2'>Semester-2</option>
                <option value='3'>Semester-3</option>
                <option value='4'>Semester-4</option>
                <option value='5'>Semester-5</option>
                <option value='6'>Semester-6</option>
                <option value='7'>Semester-7</option>
                <option value='8'>Semester-8</option>
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
              {profile && (
                <img
                  src={URL.createObjectURL(profile)}
                  alt='Profile Pic'
                  className='mt-2 w-[20%] h-[20%] overflow-y-hidden'
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