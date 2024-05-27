/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import career from '../assets/career.jpg';

const Login = () => {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Hardcoded admin credentials
    const adminUserID = 'admin';
    const adminPassword = '12345678';

    // Fetch stored student credentials from localStorage
    const storedUserID = localStorage.getItem('userID');
    const storedPassword = localStorage.getItem('password');

    if (userID === adminUserID && password === adminPassword) {
      // Navigate to admin dashboard
      navigate('/admin');
    } else if (userID === storedUserID && password === storedPassword) {
      // Navigate to student dashboard
      navigate('/student');
    } else {
      alert('Invalid User ID or Password');
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
          <div className='mb-6'>
            <div className='flex items-center border-b border-gray-300 py-2'>
              <FaUser className='text-gray-500 mr-3' />
              <input
                type='text'
                placeholder='User ID'
                value={userID}
                onChange={(e) => setUserID(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
              />
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <button
              type='submit'
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 w-full'
            >
              Login
            </button>
          </div>
          <div className='mt-5 text-center flex flex-col md:flex-row md:justify-between'>
            <Link to='/forgot-password' className='text-md text-sky-600 hover:text-green-700 transition-colors duration-300'>
              Forgot Password?
            </Link>
            <p className='mt-2 md:mt-0'>
              Don't have an account?{' '}
              <Link to='/register' className='text-sky-600 hover:text-green-700 transition-colors duration-300'>
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
