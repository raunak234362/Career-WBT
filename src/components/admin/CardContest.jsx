/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import AddQuestion from './AddQuestion'
import Service from '../../config/Service'

const CardContest = ({ contestId }) => {
  const [showQuestion, setShowQuestion] = useState({})
  const [showSetQuestion, setShowSetQuestion] = useState('')
  const [showFilledQuestion, setShowFilledQuestion] = useState()

  const fetchContestQuestions = async () => {
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

    // console.log("ssssssssss",contestId)

    // try {
    //   const response = await fetch(
    //     `${BASE_URL}/api/v1/admin/contest/${contestId}`,
    //     requestOptions
    //   )
    //   const data = await response.json()
    //   console.log(data)
    //   setShowSetQuestion(data?.data)
    // } catch (error) {
    //   console.error(error)
    // }
    const response = await Service.getContestById(contestId)
    console.log("response", response)
    setShowSetQuestion(response)
  }

  useEffect(() => {
    fetchContestQuestions()
  }, [])

  const formatDateTime = dateTimeString => {
    const date = dateTimeString?.split('T')[0]
    const time = dateTimeString?.split('T')[1].substring(0, 5)
    return `${date} | T:${time}`
  }

  const toggleQues = contestId => {
    setShowQuestion({ ...showQuestion, [contestId]: !showQuestion[contestId] })
  }

  const toggleShowQues = () => {
    setShowFilledQuestion(!showFilledQuestion)
  }

  return (
    <div>
      <div className='flex flex-col w-full p-5 mt-5 bg-white rounded-lg shadow-lg'>
        <div className='w-full mt-8 overflow-y-auto h-60 card-container'>
          <div className='flex flex-col'>
            <h2 className='mb-2 text-3xl font-bold text-center'>
              {showSetQuestion?.name}
            </h2>
            {
              // console.log(showSetQuestion)
            }
           
            <div className='flex flex-col items-center justify-center mt-5'>
              <p>
                <strong>Duration:</strong> {showSetQuestion?.duration}
              </p>
              <p>
                <strong>Set:</strong> {showSetQuestion?.set}
              </p>
              {/* <p>
                <strong>Passing Marks:</strong> {showSetQuestion?.passingMarks}
              </p> */}
              <p>
                <strong>Start Date:</strong>{' '}
                {formatDateTime(showSetQuestion?.startDate)}
              </p>
              <p>
                <strong>End Date:</strong>{' '}
                {formatDateTime(showSetQuestion?.endDate)}
              </p>
            </div>
          </div>

          <div className='flex flex-row justify-center w-full mt-4'>
            <button
              onClick={() => toggleQues(showSetQuestion?._id)}
              className='w-1/3 h-10 px-4 py-2 mr-2 text-white bg-green-500 rounded-lg hover:bg-green-700'
            >
              Edit
            </button>
            {showQuestion[showSetQuestion?._id] && (
              <AddQuestion
                toggleQues={() => toggleQues(showSetQuestion?._id)}
                onCancel={() =>
                  setShowQuestion({
                    ...showQuestion,
                    [showSetQuestion?._id]: false
                  })
                }
                contestId={showSetQuestion?._id}
              />
            )}
            <button
              onClick={toggleShowQues}
              className='w-1/3 h-10 px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-700'
            >
              Show
            </button>
            {showFilledQuestion && (
              <div className="top-0 h-full mt-10 overflow-y-auto">

              <div className='absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full overflow-y-auto bg-gray-900 bg-opacity-20'>
                <div className='bg-white w-[70%] h-full overflow-y-auto mt-4 p-6 rounded-lg shadow-md'>
                    <div className="flex flex-row justify-between">
                  <h3 className='mb-2 text-lg font-semibold'>Questions:</h3>
                    <button onClick={toggleShowQues} className='p-5 bg-red-300 rounded-lg'>Close</button>
                    </div>
                  {console.log(showSetQuestion)}
                  {showSetQuestion?.questions?.map((question, index) => (
                    <div key={index} className='pb-3 border-b border-gray-300'>
                      <h4 className='mb-1 font-semibold'>
                        {question.question}
                      </h4>
                      <p>
                        <strong>Type:</strong> {question.type}
                      </p>
                      <p>
                        <strong>Marks:</strong> {question.marks}
                      </p>

                      {question.type === 'mcq' && (
                        <div>
                          <p>
                            <strong>Options:</strong>{' '}
                            {question?.mcqOptions?.join(', ')}
                          </p>
                          <p>
                            <strong>Single Answer:</strong>{' '}
                            {question?.answer}
                          </p>
                        </div>
                      )}
                      {question.type === 'image' && (
                        <img
                          src={question?.imageUrl}
                          alt='Question'
                          className='w-32 h-auto mt-2'
                        />
                      )}
                      {question.type === 'multiple' && (
                        <div>
                          <p>
                            <strong>Sub Questions:</strong>
                          </p>
                          <ul>
                            {question?.multipleQuestion.map(
                              (question, subIndex) => (
                                <li key={subIndex}>
                                  {question?.multipleQuestion}
                                  {question?.multipleAnswer}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                      {question.type === 'short' && (
                        <p>
                          <strong>Answer:</strong> {question?.answer}
                        </p>
                      )}
                      {question.type === 'long' && (
                        <p>
                          <strong>Answer:</strong> {question?.answer}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardContest
