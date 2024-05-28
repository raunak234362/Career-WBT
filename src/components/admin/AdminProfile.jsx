/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminProfile = () => {
  const [adminData, setAdminData] = useState({});
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const fetchAdminData = async () => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${localStorage.getItem('access')}`);
    myHeaders.append('Content-Type', 'application/json')
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    try {
      const response = await fetch(`https://wbt-quizcave.onrender.com/api/v1/admin/user/`, requestOptions);
      const data = await response.json();
      setAdminData(data?.data);
      console.log(data?.data);
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    if (!userId) {
      navigate('/login'); // Redirect to login if no userId is found
    } else {
      fetchAdminData();
    }
  }, [userId, navigate]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!adminData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center bg-white p-5">
      <div className="flex flex-col justify-center bg-white rounded-lg w-full md:w-[30%] shadow-lg p-5">
        <img
          src={`https://wbt-quizcave.onrender.com/${adminData.profilePic}`}
          alt="Profile Pic"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold pt-5 text-gray-800 text-center">
          {adminData.name}
        </h3>
        <p className="text-center text-gray-600">{adminData.designation}</p>
        <div className="mt-4">
          <p><strong>Email:</strong> {adminData.email}</p>
          <p><strong>Phone:</strong> {adminData.phone}</p>
          <p><strong>User ID:</strong> {adminData.userId}</p>
          <p><strong>Role:</strong> {adminData.role}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
