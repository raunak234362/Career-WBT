/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { CgAdd } from 'react-icons/cg'


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

  const handleAddContest = newContest => {
    setContests([...contests, newContest])
  }

  return (
    <div className='flex flex-col items-center bg-white p-5'>
    


      <div className="bg-white shadow-lg w-full p-5 rounded-lg mt-5">
        <h1 className=' text-xl text-slate-900 font-bold text-center'>Contest List</h1>
      <div className='overflow-y-auto mt-8 w-full h-80 table-container'>
        <table className='w-full table-auto border-collapse text-center'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='px-2 py-2'>S.No</th>
              <th className='px-4 py-2'>Title</th>
              <th className='px-4 py-2'>Duration</th>
              <th className='px-4 py-2'>Start Date</th>
              <th className='px-4 py-2'>End Date</th>
              <th className='px-2 py-2'>Option</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest, index) => (
              <tr key={index}>
                <td className='px-2 py-2'>{index + 1}</td>
                <td className='px-4 py-2'>{contest.name}</td>
                <td className='px-4 py-2'>{contest.duration}</td>
                <td className='px-4 py-2'>
                  {formatDateTime(contest.startDate)}
                </td>
                <td className='px-4 py-2'>{formatDateTime(contest.endDate)}</td>
                <td className='px-3 py-2'>
                
                  <button
                    onClick={toggleShowQues}
                    className='mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700'
                  >
                    Open
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      
    </div>
  )
}

export default Contest
