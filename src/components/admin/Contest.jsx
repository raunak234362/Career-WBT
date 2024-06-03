/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { CgAdd } from 'react-icons/cg'
import AddContest from './AddContest'
import AddQuestion from './AddQuestion'
import CardContest from './CardContest'

const Contest = () => {
  const [showForm, setShowForm] = useState(false)
  const [showQuestion, setShowQuestion] = useState(false)
  const [showSetQuestion, setShowSetQuestion] = useState(false)
  const [contests, setContests] = useState([])

  const fetchContests = async () => {
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
        `https://wbt-quizcave.onrender.com/api/v1/admin/contest/all`,
        requestOptions
      )
      const data = await response.json()
      setContests(data?.data)
      console.log(data?.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchContests()
  }, [])

  const toggleForm = () => {
    setShowForm(!showForm)
  }
  
  

  const formatDateTime = dateTimeString => {
    const date = dateTimeString.split('T')[0]
    const time = dateTimeString.split('T')[1].substring(0, 5)
    return `${date} | T:${time}`
  }

  const toggleQues = () => {
    setShowQuestion(!showQuestion)
  }

  const toggleShowQues = () => {
    setShowSetQuestion(!showSetQuestion)
  }

  const handleAddContest = newContest => {
    setContests([...contests, newContest])
  }

  return (
    <div className='flex flex-col items-center w-full bg-white p-5'>
      <div className='flex flex-row gap-5 w-full'>
        <div className='flex flex-col justify-center bg-white rounded-lg w-full md:w-[30%] shadow-lg p-5'>
          <div className='flex justify-center p-5'>
            <CgAdd className='flex justify-center text-2xl text-black' />
          </div>
          <h3 className='text-xl font-semibold pt-5 text-gray-800 text-center'>
            Create Contest
          </h3>
          <button
            onClick={toggleForm}
            className='mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700'
          >
            Create
          </button>
        </div>
      </div>

      {showForm && <AddContest toggleForm={toggleForm} />}
      <div className="bg-gray-100 w-full p-5 rounded-xl mt-5">
      <h1 className=' text-2xl font-bold text-center '>Contest List</h1>
      <div className="flex  flex-row flex-wrap justify-center mt-5">
      {contests.map((contest,index)=>(
        <div
        key={index}
        className='mt-4 rounded-lg w-1/3 shadow-lg p-5 mb-4'
      >
        <CardContest contestId={contest._id}/>

      </div>
      ))}
      </div>
     
      </div>
      
    </div>
  )
}

export default Contest
