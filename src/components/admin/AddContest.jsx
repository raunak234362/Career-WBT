/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react'
import JoditEditor from 'jodit-react'

const AddContest = ({ toggleForm, handleAddContest }) => {
  const [contestDetails, setContestDetails] = useState({
    title: '',
    description: '',
    termsAndConditions: '',
    duration: '',
    startDate: '',
    endDate: '',
    active: false
  })
  const [questions, setQuestions] = useState([])
  const [step, setStep] = useState(1)
  const [contestId, setContestId] = useState(null)

  const handleContestDetailsChange = e => {
    setContestDetails({ ...contestDetails, [e.target.name]: e.target.value })
  }

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { type: '', question: '', subQuestions: [], answer: '' }
    ])
  }

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions]
    if (
      field === 'type' &&
      value === 'mq' &&
      !updatedQuestions[index].subQuestions
    ) {
      updatedQuestions[index].subQuestions = []
    }
    updatedQuestions[index][field] = value
    setQuestions(updatedQuestions)
  }

  const handleAddSubQuestion = questionIndex => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].subQuestions.push({ text: '', answer: '' })
    setQuestions(updatedQuestions)
  }

  const handleSubQuestionChange = (questionIndex, subIndex, field, value) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].subQuestions[subIndex][field] = value
    setQuestions(updatedQuestions)
  }

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      const updatedQuestions = [...questions]
      updatedQuestions[index].imageUrl = reader.result
      setQuestions(updatedQuestions)
    }
    reader.readAsDataURL(file)
  }

  const handleCreateContest = async () => {
    const myHeaders = new Headers()
    myHeaders.append(
      'Authorization',
      `Bearer ${localStorage.getItem('access')}`
    )
    myHeaders.append('Content-Type', 'application/json')

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(contestDetails),
      redirect: 'follow'
    }

    try {
      const response = await fetch(
        'https://wbt-quizcave.onrender.com/api/v1/admin/contest/create',
        requestOptions
      )
      const result = await response.json()
      console.log(result)
      return result.id // Assuming the created contest's ID is returned as `id`
    } catch (error) {
      console.error(error)
      throw new Error('Error creating contest')
    }
  }
  const handleActiveToggle = newValue => {
    setContestDetails({ ...contestDetails, active: newValue })
  }

  const handleAddQuestionToContest = async (contestId, question) => {
    const myHeaders = new Headers()
    myHeaders.append(
      'Authorization',
      `Bearer ${localStorage.getItem('access')}`
    )
    myHeaders.append('Content-Type', 'application/json')

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(question),
      redirect: 'follow'
    }

    try {
      const response = await fetch(
        `https://wbt-quizcave.onrender.com/api/v1/admin/contest/add-question/${contestId}`,
        requestOptions
      )
      const result = await response.json()
      console.log(result)
    } catch (error) {
      console.error(error)
      throw new Error('Error adding question to contest')
    }
  }

  const handleSubmitForm = async e => {
    e.preventDefault()

    try {
      const createdContestId = await handleCreateContest()
      setContestId(createdContestId)

      for (const question of questions) {
        await handleAddQuestionToContest(createdContestId, question)
      }

      handleAddContest({ ...contestDetails, questions })
      toggleForm()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <div className='max-w-full mx-auto p-6 bg-white rounded-md shadow-md'>
        <h1 className='text-3xl font-bold mb-6'>Create a New Contest</h1>
        <div className='absolute z-20 top-0 left-0 w-full h-full overflow-y-auto bg-gray-900 bg-opacity-20 flex items-center justify-center'>
          <div className='bg-white w-[70%]  mt-4 p-6 rounded-lg shadow-md'>
            {step === 1 && (
              <form
                onSubmit={e => {
                  e.preventDefault()
                  setStep(2)
                }}
              >
                <div className='mb-4'>
                  <label className='block text-gray-700 font-bold mb-2'>
                    Title:
                  </label>
                  <input
                    type='text'
                    name='title'
                    value={contestDetails.name}
                    onChange={handleContestDetailsChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                    required
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700 font-bold mb-2'>
                    Description:
                  </label>
                  <JoditEditor
                    value={contestDetails.description}
                    tabIndex={1}
                    onChange={value =>
                      handleContestDetailsChange(
                        { target: { value } },
                        'description'
                      )
                    }
                    className='w-full border border-gray-300 rounded-md'
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700 font-bold mb-2'>
                    Terms & Conditions:
                  </label>
                  <JoditEditor
                    value={contestDetails.rules}
                    tabIndex={1}
                    onChange={value =>
                      handleContestDetailsChange(
                        { target: { value } },
                        'rules'
                      )
                    }
                    className='w-full border border-gray-300 rounded-md'
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700 font-bold mb-2'>
                    Duration (in minutes):
                  </label>
                  <input
                    type='number'
                    name='duration'
                    value={contestDetails.duration}
                    onChange={handleContestDetailsChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                    required
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700 font-bold mb-2'>
                    Start Date:
                  </label>
                  <input
                    type='date'
                    name='startDate'
                    value={contestDetails.startDate}
                    onChange={handleContestDetailsChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                    required
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700 font-bold mb-2'>
                    End Date:
                  </label>
                  <input
                    type='date'
                    name='endDate'
                    value={contestDetails.endDate}
                    onChange={handleContestDetailsChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                    required
                  />
                </div>
                <div className='mb-4 flex flex-row gap-10 items-center'>
                  <label className='block text-gray-700 font-bold mb-2'>
                    Active
                  </label>
                  <button
                    type='button'
                    onClick={() => handleActiveToggle(!contestDetails.active)}
                    className={`w-[20%] px-3 py-2 border border-gray-300 rounded-md ${
                      contestDetails.active
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {contestDetails.active ? 'true' : 'false'}
                  </button>
                </div>

                <div className='flex flex-row gap-3 my-2'>
                  <button
                    type='submit'
                    className='bg-green-500 text-white px-4 py-2 w-[70%] rounded-md hover:bg-green-700 transition duration-200'
                  >
                    Next
                  </button>
                  <button
                    onClick={toggleForm}
                    className='bg-green-500 w-[30%] text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmitForm} className='mt-5'>
                {questions.map((question, index) => (
                  <div key={index} className='mb-6 bg-slate-200 p-5 rounded-lg'>
                    <h2 className='text-xl font-semibold mb-2'>
                      Question {index + 1}
                    </h2>
                    <div className='mb-4'>
                      <label className='block text-gray-700 font-bold mb-2'>
                        Type:
                      </label>
                      <select
                        value={question.type}
                        onChange={e =>
                          handleQuestionChange(index, 'type', e.target.value)
                        }
                        className='w-full px-3 py-2 border border-gray-300 rounded-md'
                      >
                        <option value=''>Select Type</option>
                        <option value='mcq'>MCQ</option>
                        <option value='image'>Question with Image</option>
                        <option value='short'>Short Answer</option>
                        <option value='long'>Long Answer</option>
                        <option value='mq'>Sub Questions</option>
                      </select>
                    </div>
                    <div className='mb-4'>
                      <label className='block text-gray-700 font-bold mb-2'>
                        Question:
                      </label>
                      <input
                        type='text'
                        value={question.question}
                        onChange={e =>
                          handleQuestionChange(
                            index,
                            'question',
                            e.target.value
                          )
                        }
                        className='w-full px-3 py-2 border border-gray-300 rounded-md'
                        required
                      />
                    </div>
                    {question.type === 'long' && (
                      <div className='mb-4'>
                        <label className='block text-gray-700 font-bold mb-2'>
                          Answer:
                        </label>
                        <input
                          type='text'
                          value={question.answer}
                          onChange={e =>
                            handleQuestionChange(
                              index,
                              'answer',
                              e.target.value
                            )
                          }
                          className='w-full px-3 py-2 border border-gray-300 rounded-md'
                          required
                        />
                      </div>
                    )}
                    {question.type === 'short' && (
                      <div className='mb-4'>
                        <label className='block text-gray-700 font-bold mb-2'>
                          Answer:
                        </label>
                        <input
                          type='text'
                          value={question.answer}
                          onChange={e =>
                            handleQuestionChange(
                              index,
                              'answer',
                              e.target.value
                            )
                          }
                          className='w-full px-3 py-2 border border-gray-300 rounded-md'
                          required
                        />
                      </div>
                    )}
                    {question.type === 'mcq' && (
                      <>
                        <div className='mb-4'>
                          <label className='block text-gray-700 font-bold mb-2'>
                            Options:
                          </label>
                          {question.options &&
                            question.options.map((option, optionIndex) => (
                              <div key={optionIndex} className='flex mb-2'>
                                <input
                                  type='text'
                                  value={option}
                                  onChange={e =>
                                    handleQuestionChange(index, 'options', [
                                      ...question.options.slice(0, optionIndex),
                                      e.target.value,
                                      ...question.options.slice(optionIndex + 1)
                                    ])
                                  }
                                  className='w-full px-3 py-2 border border-gray-300 rounded-md'
                                />
                              </div>
                            ))}
                          <button
                            type='button'
                            onClick={() =>
                              handleQuestionChange(index, 'options', [
                                ...(question.options || []),
                                ''
                              ])
                            }
                            className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200'
                          >
                            Add Option
                          </button>
                        </div>
                        <div className='mb-4'>
                          <label className='block text-gray-700 font-bold mb-2'>
                            Answer:
                          </label>
                          <input
                            type='text'
                            value={question.answer}
                            onChange={e =>
                              handleQuestionChange(
                                index,
                                'answer',
                                e.target.value
                              )
                            }
                            className='w-full px-3 py-2 border border-gray-300 rounded-md'
                            required
                          />
                        </div>
                      </>
                    )}
                    {question.type === 'image' && (
                      <div className='mb-4'>
                        <label className='block text-gray-700 font-bold mb-2'>
                          Upload Image:
                        </label>
                        <input
                          type='file'
                          accept='image/*'
                          onChange={e => handleImageUpload(e, index)}
                          className='w-full px-3 py-2 border border-gray-300 rounded-md'
                          required
                        />
                        {question.imageUrl && (
                          <div className='mt-2'>
                            <img
                              src={question.imageUrl}
                              alt='Uploaded Image'
                              className='max-w-full h-auto'
                            />
                          </div>
                        )}
                      </div>
                    )}
                    {question.type === 'mq' && (
                      <>
                        <div className='mb-4'>
                          <label className='block text-gray-700 font-bold mb-2'>
                            Main Question:
                          </label>
                          <input
                            type='text'
                            value={question.mainQuestion || question.question}
                            onChange={e =>
                              handleQuestionChange(
                                index,
                                'mainQuestion',
                                e.target.value
                              )
                            }
                            className='w-full px-3 py-2 border border-gray-300 rounded-md'
                            required
                          />
                        </div>
                        {question.subQuestions.map((subQuestion, subIndex) => (
                          <div key={subIndex} className='mb-4 ml-4'>
                            <label className='block text-gray-700 font-bold mb-2'>
                              Sub Question {subIndex + 1}:
                            </label>
                            <input
                              type='text'
                              value={subQuestion.text}
                              onChange={e =>
                                handleSubQuestionChange(
                                  index,
                                  subIndex,
                                  'text',
                                  e.target.value
                                )
                              }
                              className='w-full px-3 py-2 border border-gray-300 rounded-md'
                              required
                            />
                            <label className='block text-gray-700 font-bold mb-2'>
                              Sub Answer {subIndex + 1}:
                            </label>
                            <input
                              type='text'
                              value={subQuestion.answer}
                              onChange={e =>
                                handleSubQuestionChange(
                                  index,
                                  subIndex,
                                  'answer',
                                  e.target.value
                                )
                              }
                              className='w-full px-3 py-2 border border-gray-300 rounded-md'
                              required
                            />
                          </div>
                        ))}
                        <button
                          type='button'
                          onClick={() => handleAddSubQuestion(index)}
                          className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200'
                        >
                          Add Sub Question
                        </button>
                      </>
                    )}
                  </div>
                ))}
                <div className='flex justify-between'>
                  <button
                    type='button'
                    onClick={() => setStep(1)}
                    className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200'
                  >
                    Back
                  </button>
                  <button
                    type='button'
                    onClick={handleAddQuestion}
                    className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200'
                  >
                    Add Question
                  </button>
                  <button
                    type='submit'
                    className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200'
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddContest
