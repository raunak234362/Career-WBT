/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { CgAdd } from 'react-icons/cg'
import AddContest from './AddContest'
import AddQuestion from './AddQuestion'
import CardContest from './CardContest'
import Service from '../../config/Service'

const Contest = () => {
  const [showForm, setShowForm] = useState(false)
  const [showQuestion, setShowQuestion] = useState(false)
  const [showSetQuestion, setShowSetQuestion] = useState(false)
  const [contests, setContests] = useState([])
  // const [questions, setQuestions] = useState([])
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
      const data = await Service.getAllContests()
      setContests(data)
      console.log('Fetched contests:', data)
    } catch (error) {
      console.error('Error fetching contests:', error)
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
    <div className='flex flex-col items-center w-full p-5 bg-white'>
      <div className='flex flex-row w-full gap-5'>
        <div className='flex flex-col justify-center bg-white rounded-lg w-full md:w-[30%] shadow-lg p-5'>
          <div className='flex justify-center p-5'>
            <CgAdd className='flex justify-center text-2xl text-black' />
          </div>
          <h3 className='pt-5 text-xl font-semibold text-center text-gray-800'>
            Create Contest
          </h3>
          <button
            onClick={toggleForm}
            className='inline-block px-4 py-2 mt-4 text-white bg-green-500 rounded-lg hover:bg-green-700'
          >
            Create
          </button>
        </div>
      </div>

      {showForm && <AddContest toggleForm={toggleForm} />}
      <div className="w-full p-5 mt-5 bg-gray-100 rounded-xl">
      <h1 className='text-2xl font-bold text-center '>Contest List</h1>
      <div className="flex flex-row flex-wrap justify-center mt-5">
      {contests?.map((contest,index)=>(
        <div
        key={index}
        className='w-1/3 p-5 mt-4 mb-4 rounded-lg shadow-lg'
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
