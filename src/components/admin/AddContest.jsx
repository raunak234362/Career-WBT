import { useContext, useState } from 'react'
import { ContestContext } from '../../hooks/ContestContext'

const AddContest = () => {
  const {
    contestDetails,
    questions,
    handleContestDetailsChange,
    handleAddQuestion,
    handleQuestionChange,
    handleSubQuestionChange,
    handleAddSubQuestion,
    handleImageUpload,
    handleSubmit
  } = useContext(ContestContext)
  const [step, setStep] = useState(1)



  return (
    <div>
      <div className='max-w-full mx-auto p-6 bg-white rounded-md shadow-md'>
        <h1 className='text-3xl font-bold mb-6'>Create a New Contest</h1>
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
                value={contestDetails.title}
                onChange={handleContestDetailsChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Description:
              </label>
              <input
                type='text'
                name='description'
                value={contestDetails.description}
                onChange={handleContestDetailsChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Terms & Conditions:
              </label>
              <input
                type='text'
                name='termcondtion'
                value={contestDetails.termcondtion}
                onChange={handleContestDetailsChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md'
              />
              {/* Terms and Condition will show as the list */}
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
            <button
              type='submit'
              className='bg-green-500 w-full text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200'
            >
              Next
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit}>
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
                      handleQuestionChange(index, 'question', e.target.value)
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
                        handleQuestionChange(index, 'answer', e.target.value)
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
                        handleQuestionChange(index, 'answer', e.target.value)
                      }
                      className='w-full px-3 py-2 border border-gray-300 rounded-md'
                      required
                    />
                  </div>
                )}
                {question.type === 'image' && (
                  <>
                    <div className='mb-4'>
                      <label className='block text-gray-700 font-bold mb-2'>
                        Image:
                      </label>
                      <input
                        type='file'
                        accept='image/*'
                        onChange={e => handleImageUpload(e, index)} // Call handleImageUpload function on file change
                        className='w-full px-3 py-2 border border-gray-300 rounded-md'
                        required
                      />
                      <div className='mb-4'>
                        <label className='block text-gray-700 font-bold mb-2'>
                          Answer:
                        </label>
                        <input
                          type='text'
                          value={question.answer}
                          onChange={e =>
                            handleQuestionChange(index, 'answer', e.target.value)
                          }
                          className='w-full px-3 py-2 border border-gray-300 rounded-md'
                          required
                        />
                      </div>
                    </div>
                    {question.imageUrl && (
                      <div className='mb-4'>
                        <img
                          src={question.imageUrl}
                          alt='Uploaded Image'
                          className='max-w-full h-auto'
                        />
                      </div>
                    )}
                  </>
                )}
                {question.type === 'mcq' && (
                  <>
                    <div className='mb-4'>
                      <label className='block text-gray-700 font-bold mb-2'>
                        Options:
                      </label>
                      {question.options.map((option, optionIndex) => (
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
                            ...question.options,
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
                          handleQuestionChange(index, 'answer', e.target.value)
                        }
                        className='w-full px-3 py-2 border border-gray-300 rounded-md'
                        required
                      />
                    </div>
                  </>
                )}
                {question.type === 'mq' && (
  <>
    <div className='mb-4'>
      <label className='block text-gray-700 font-bold mb-2'>
        Sub-Questions:
      </label>
      {question.subQuestions.map((subQuestion, subIndex) => (
        <div key={subIndex} className='mb-2'>
          <input
            type='text'
            value={subQuestion.text}
            onChange={e =>
              handleSubQuestionChange(index, subIndex, 'text', e.target.value)
            }
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
          />
          <input
            type='text'
            value={subQuestion.answer}
            onChange={e =>
              handleSubQuestionChange(index, subIndex, 'answer', e.target.value)
            }
            className='w-full px-3 py-2 border border-gray-300 rounded-md mt-2'
            placeholder='Answer'
          />
        </div>
      ))}
      <button
        type='button'
        onClick={() =>
          handleAddSubQuestion(index)
        }
        className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200'
      >
        Add Sub-Question
      </button>
    </div>
  </>
)}

              </div>
            ))}
            <div className='flex w-full gap-5'>
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
                Save Contest
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  )
}

export default AddContest
