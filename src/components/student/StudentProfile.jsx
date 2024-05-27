/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
// import { useFormContext } from '../../hooks/FormContext';

const StudentProfile = () => {
  const [formData, setFormData] = useState();
  
  
  const fetchStudent = async () => {
    const myHeaders = new Headers();
    myHeaders.append('authorization', `Bearer ${localStorage.getItem('access')}`);
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    await fetch('https://wbt-quizcave.onrender.com/api/v1/user/', requestOptions)
      .then(async (response) => {
        const data = await response.json();
        setFormData(data?.data);
        console.log(data?.data);
      });
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  return (
    <div className="max-full mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-3xl flex font-bold mb-6 items-center justify-center text-center">Profile</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Student Name</h2>
        <p className="text-gray-700">{formData?.name}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Father Name</h2>
        <p className="text-gray-700">{formData?.fatherName}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Mother Name</h2>
        <p className="text-gray-700">{formData?.motherName}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">College ID</h2>
        <p className="text-gray-700">{formData?.studentId}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Email</h2>
        <p className="text-gray-700">{formData?.email}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Contact Number</h2>
        <p className="text-gray-700">{formData?.phone}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Final Semester</h2>
        <p className="text-gray-700">{formData?.currentSemester}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Marks/CGPA</h2>
        <p className="text-gray-700">{formData?.cgpa}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Backlogs</h2>
        <p className="text-gray-700">{formData?.backlog}</p>
      </div>
    </div>
  );
};

export default StudentProfile;