/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentProfile = () => {
  const [formData, setFormData] = useState('');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const fetchStudent = async () => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${localStorage.getItem('access')}`);
    myHeaders.append('Content-Type', 'application/json');
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    try {
      const response = await fetch(`https://wbt-quizcave.onrender.com/api/v1/user/`, requestOptions);
   
      const data = await response.json();
      setFormData(data?.data);
      console.log(data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!userId) {
      navigate('/'); // Redirect to login if no userId is found
    } else {
      fetchStudent();
    }
  }, [userId, navigate]);

  return (
    <div className="max-full mx-auto p-6 m-5 bg-white rounded-md shadow-md">
      <h1 className="text-3xl flex font-bold mb-6 items-center justify-center text-center">Profile</h1>
      <div className="flex flex-row justify-between">

      </div>
          {/* <div><img src={formData?.profile} alt="image" /></div>
          <div className='flex justify-center mb-6'>
            <img
              src={`https://wbt-quizcave.onrender.com/${formData?.profile}`}
              alt='Profile Pic'
              className='w-32 h-32 rounded-full object-cover'
            />
          </div> */}
        <>
          <div className="mb-4 flex flex-row items-center">
            <h2 className="text-xl font-semibold">Student Name</h2>
            <p className="text-gray-700 text-xl px-5">{formData?.name}</p>
          </div>
          <div className="mb-4 flex flex-row items-center">
            <h2 className="text-xl font-semibold">Father Name</h2>
            <p className="text-gray-700 text-xl px-5">{formData?.fatherName}</p>
          </div>
          <div className="mb-4 flex flex-row items-center">
            <h2 className="text-xl font-semibold">Mother Name</h2>
            <p className="text-gray-700 text-xl px-5">{formData?.motherName}</p>
          </div>
          <div className="mb-4 flex flex-row items-center">
            <h2 className="text-xl font-semibold">College ID</h2>
            <p className="text-gray-700 text-xl px-5">{formData?.studentId}</p>
          </div>
          <div className="mb-4 flex flex-row items-center">
            <h2 className="text-xl font-semibold">Email</h2>
            <p className="text-gray-700 text-xl px-5">{formData?.email}</p>
          </div>
          <div className="mb-4 flex flex-row items-center">
            <h2 className="text-xl font-semibold">Contact Number</h2>
            <p className="text-gray-700 text-xl px-5">{formData?.phone}</p>
          </div>
          <div className="mb-4 flex flex-row items-center">
            <h2 className="text-xl font-semibold">Final Semester</h2>
            <p className="text-gray-700 text-xl px-5">{formData?.currentSemester}</p>
          </div>
          <div className="mb-4 flex flex-row items-center">
            <h2 className="text-xl font-semibold">Marks/CGPA</h2>
            <p className="text-gray-700 text-xl px-5">{formData?.cgpa}</p>
          </div>
          <div className="mb-4 flex flex-row items-center">
            <h2 className="text-xl font-semibold">Backlogs</h2>
            <p className="text-gray-700 text-xl px-5">{formData?.backlog}</p>
          </div>
        </>
 
    </div>
  );
};

export default StudentProfile;
