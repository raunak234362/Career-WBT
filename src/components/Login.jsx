/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import career from '../assets/career.jpg';
import { BASE_URL } from '../constants';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Local state for role selection
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = role === 'admin' 
        ? `${BASE_URL}/api/v1/admin/user/login` 
        : `${BASE_URL}/api/v1/user/login`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to login');
      }

      const responseData = await response.json();
      console.log(responseData);

      if (responseData?.data?.role !== role) {
        setErrorMessage(`Please log in ${responseData?.data?.role} portal`);
        return;
      }

      localStorage.setItem('access', responseData?.data?.accessToken);
      localStorage.setItem('refresh', responseData?.data?.refreshToken);
      localStorage.setItem('userId', userId);

      navigate(role === 'admin' ? '/admin' : '/student');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-1/2'>
        <img src={career} alt='Career' className='object-cover w-full h-full' />
      </div>
      <div className='flex flex-col justify-center md:w-1/2 p-10'>
        <h1 className='text-3xl font-bold text-center mb-8'>Login</h1>
        <form onSubmit={handleLogin}>
          {/* <div className='role-selection mb-6'>
            <label className='mr-4'>
              <input
                type='radio'
                value='admin'
                checked={role === 'admin'}
                onChange={() => setRole('admin')}
                className='mr-2'
              />
              Admin
            </label>
            <label>
              <input
                type='radio'
                value='student'
                checked={role === 'student'}
                onChange={() => setRole('student')}
                className='mr-2'
              />
              Student
            </label>
          </div> */}
          <div className='mb-6'>
            <div className='flex items-center border-b border-gray-300 py-2'>
              <FaUser className='text-gray-500 mr-3' />
              <input
                type='text'
                placeholder='User ID'
                value={userId}
                onChange={e => setUserId(e.target.value)}
                className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
              />
            </div>
          </div>
          <div className='mb-6'>
            <div className='flex items-center border-b border-gray-300 py-2'>
              <RiLockPasswordFill className='text-gray-500 mr-3' />
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
              />
            </div>
          </div>
          {errorMessage && (
            <div className='text-red-500 mb-4'>
              {errorMessage}
            </div>
          )}
          <div className="flex flex-row justify-between">
            
          </div>
          <div className='flex items-center justify-between'>
            <button
              type='submit'
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 w-full'
            >
              Login
            </button>
          </div>
          {role === 'student' && (
            <div className='mt-4'>
              <p className='text-center'>
                Don't have an account? <Link to='/register' className='text-blue-500 hover:text-blue-700 transition-colors duration-300'>Register</Link>

              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
