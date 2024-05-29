import { Link } from "react-router-dom"

import congo from "../assets/congo.gif"

const Successful = () => {
    

  return (
    <div>
    <div className="border text-center rounded-lg p-5 w-1/2 shadow-lg h-[300px] shadow-green-500/60 mx-auto my-20">
      <h1 className='text-3xl font-bold text-green-500'>Registration Successful</h1>
      <p className='text-lg text-gray-500'>You have successfully registered for our program</p>
      <p className='text-sm text-gray-500'>We have sent you the test link on your email</p>
      <p><Link to='/student' className='text-sky-600 hover:text-green-700 transition-colors duration-300'>Go to Your Dashboard</Link></p>
      <img src={congo} className='w-[40%] items-center mx-auto'/>
    </div>
  </div>
  )
}

export default Successful
