/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { createContext, useState, useContext, useEffect } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminData, setAdminData] = useState(null);
  const [role, setRole] = useState('student'); // Default role
  const [error, setError] = useState(null);

  const fetchAdmin = async () => {
    const myHeaders = new Headers();
    myHeaders.append('authorization', `Bearer ${localStorage.getItem('access')}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    try {
      const response = await fetch("https://wbt-quizcave.onrender.com/api/v1/admin/user", requestOptions);
      const data = await response.json();
      if (response.ok && data?.data) {
        setAdminData(data.data);
      } else {
        setError("Failed to fetch admin data");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching the admin data");
    }
  };

  useEffect(() => {
    if (role === 'admin') {
      fetchAdmin();
    }
  }, [role]);

  return (
    <AdminContext.Provider value={{ adminData, role, setRole, error }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
