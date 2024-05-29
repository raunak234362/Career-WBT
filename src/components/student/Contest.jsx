/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
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
        `https://wbt-quizcave.onrender.com/api/v1/contest/all`,
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


  return (
    <div className='flex flex-col items-center w-full bg-white p-5'>
      

  
      <div className="bg-gray-100 w-full p-5 rounded-xl mt-5">
      <h1 className=' text-2xl font-bold text-center '>Contest List</h1>
      <div className="flex flex-row flex-wrap justify-center mt-5">
      {contests.map((contest,index)=>(
        <div
        key={index}
        className='mt-4 rounded-lg shadow-lg p-5 mb-4 w-1/3'
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
