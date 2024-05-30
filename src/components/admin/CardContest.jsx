/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import AddQuestion from './AddQuestion'
import parse from 'html-react-parser'

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

    console.log(contestId)

    try {
      const response = await fetch(
        `https://wbt-quizcave.onrender.com/api/v1/admin/contest/${contestId}`,
        requestOptions
      )
      const data = await response.json()
      console.log(data?.data)
      setShowSetQuestion(data?.data)
    } catch (error) {
      console.error(error)
    }
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
      <div className='bg-white flex flex-col shadow-lg w-full p-5 rounded-lg mt-5'>
        <div className='overflow-y-auto mt-8 w-full h-60 card-container'>
          <div className='flex flex-col'>
            <h2 className='text-xl font-bold mb-2 text-center'>
              {showSetQuestion?.name}
            </h2>
            {
              console.log(showSetQuestion)
            }
            {
              showSetQuestion && (
                <h3 className=' text-lg text-center'>{parse(showSetQuestion?.description)}</h3>
              )
            }
            <div className='flex flex-col mt-5 items-center justify-center'>
              <p>
                <strong>Duration:</strong> {showSetQuestion?.duration}
              </p>
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

          <div className='flex flex-row mt-4 justify-center'>
            <button
              onClick={() => toggleQues(showSetQuestion?._id)}
              className='mr-2 bg-green-500 text-white py-2 px-4 h-10 rounded-lg hover:bg-green-700'
            >
              Add
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
              className='bg-green-500 text-white  px-4 py-2 h-10 rounded-lg hover:bg-green-700'
            >
              Show
            </button>
            {showFilledQuestion && (
              <div className="h-full mt-10 top-0  overflow-y-auto">

              <div className='absolute z-20 top-0 left-0 w-full h-full overflow-y-auto bg-gray-900 bg-opacity-20 flex items-center justify-center'>
                <div className='bg-white w-[70%] h-full overflow-y-auto mt-4 p-6 rounded-lg shadow-md mt-4'>
                    <div className="flex flex-row justify-between">
                  <h3 className='text-lg font-semibold mb-2'>Questions:</h3>
                    <button onClick={toggleShowQues} className='bg-red-300 rounded-lg p-5'>Close</button>
                    </div>
                  {console.log(showSetQuestion)}
                  {showSetQuestion?.questions?.map((question, index) => (
                    <div key={index} className='border-b border-gray-300 pb-3'>
                      <h4 className='font-semibold mb-1'>
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
                          className='mt-2 w-32 h-auto'
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
