/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import CardContest from './CardContest'
import { BASE_URL } from '../../constants'

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
        `${BASE_URL}/api/v1/contest/all`,
        requestOptions
      )
      const data = await response.json()
      setContests(data?.data)
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
    <div className='flex flex-col items-center w-full p-5 bg-white'>
      

  
      <div className="w-full p-5 mt-5 bg-gray-100 rounded-xl">
      <h1 className='text-2xl font-bold text-center '>Test List</h1>
      <div className="flex flex-row flex-wrap justify-center mt-5">
      {contests?.map((contest,index)=>(
        <div
        key={index}
        className='w-1/3 p-5 mt-4 mb-4 rounded-lg shadow-lg'
      >
        <CardContest contestId={contest._id}/>
        
      </div>
      ))}
      {
          console.log(contests)
        }
      </div>
     
      </div>
      
    </div>
  )
}

export default Contest
