/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";

const AddQuestion = ({ toggleQues, contestId }) => {
  const [questions, setQuestions] = useState([]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { type: '', question: '', marks: '', options: [], multipleQuestion: [], multipleAnswer: [] }
    ]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    if (field === 'type' && value === 'multiple' && !updatedQuestions[index].multipleQuestion) {
      updatedQuestions[index].multipleQuestion = [];
    }
    setQuestions(updatedQuestions);
  };

  const handleAddSubQuestion = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].multipleQuestion.push('');
    updatedQuestions[questionIndex].multipleAnswer.push([]);
    setQuestions(updatedQuestions);
  };

  const handleSubQuestionChange = (questionIndex, subIndex, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].multipleQuestion[subIndex] = field === 'question' ? value : updatedQuestions[questionIndex].multipleQuestion[subIndex];
    updatedQuestions[questionIndex].multipleAnswer[subIndex] = field === 'answer' ? value : updatedQuestions[questionIndex].multipleAnswer[subIndex];
    setQuestions(updatedQuestions);
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedQuestions = [...questions];
      updatedQuestions[index].questionImage = reader.result;
      setQuestions(updatedQuestions);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
  
    try {
      for (const question of questions) {
        const formdata = {
          question: question.question,
          type: question.type,
          marks: question.marks
        };
  
        if (question.type === "mcq") {
          formdata.options = question.options.join(",");
          formdata.singleAnswer = question.answer;
          formdata.questionImage = question.questionImage;
        } else if (question.type === "multiple") {
          formdata.questionImage = question.questionImage;
          formdata.multipleQuestion = question.multipleQuestion;
          formdata.multipleAnswer = question.multipleAnswer;
        } else {
          formdata.questionImage = question.questionImage;
          formdata.singleAnswer = question.answer;
        }
  
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('access')}`);
        myHeaders.append("Content-Type", "application/json");
  
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(formdata),
          redirect: "follow"
        };
  
        console.log(localStorage.getItem('access'));
  
        const response = await fetch(`https://wbt-quizcave.onrender.com/api/v1/admin/contest/add-question/${contestId}`, requestOptions);
        const data = await response.json();
        setQuestions(data?.data);
        console.log(data);
      }
      toggleQues();
      setQuestions([]);
    } catch (error) {
      console.error(error);
    }
  };
  


  return (
    <div>
      <div className='absolute z-20 top-0 left-0 w-full h-full overflow-y-auto bg-gray-900 bg-opacity-20 flex items-center justify-center'>
        <div className='bg-white w-[70%] mt-4 p-6 rounded-lg shadow-md'>
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
                    onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                  >
                    <option value=''>Select Type</option>
                    <option value='mcq'>MCQ</option>
                    <option value='short'>Short Answer</option>
                    <option value='long'>Long Answer</option>
                    <option value='multiple'>Multiple Answers</option>
                  </select>
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700 font-bold mb-2'>
                    Question:
                  </label>
                  <input
                    type='text'
                    value={question.question}
                    onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                    required
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700 font-bold mb-2'>
                    Marks:
                  </label>
                  <input
                    type='text'
                    value={question.marks}
                    onChange={(e) => handleQuestionChange(index, 'marks', e.target.value)}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                    required
                  />
                </div>
                {question.type === 'long' && (
                  <div className='mb-4'>
                     <div className='mb-4'>
                    <label className='block text-gray-700 font-bold mb-2'>
                      Upload Image:
                    </label>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={(e) => handleImageUpload(e, index)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md'
                      
                    />
                    {question.questionImage && (
                      <div className='mt-2'>
                        <img
                          src={question.questionImage}
                          alt='Uploaded Image'
                          className='max-w-full h-auto'
                        />
                      </div>
                    )}
                  </div>
                    <label className='block text-gray-700 font-bold mb-2'>
                      Answer:
                    </label>
                    <input
                      type='text'
                      value={question.answer}
                      onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md'
                      required
                    />
                  </div>
                )}
                {question.type === 'short' && (
                  
                  <div className='mb-4'>
                     <div className='mb-4'>
                    <label className='block text-gray-700 font-bold mb-2'>
                      Upload Image:
                    </label>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={(e) => handleImageUpload(e, index)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md'
                      
                    />
                    {question.questionImage && (
                      <div className='mt-2'>
                        <img
                          src={question.questionImage}
                          alt='Uploaded Image'
                          className='max-w-full h-auto'
                        />
                      </div>
                    )}
                  </div>
                    <label className='block text-gray-700 font-bold mb-2'>
                      Answer:
                    </label>
                    <input
                      type='text'
                      value={question.answer}
                      onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md'
                      required
                    />
                  </div>
                )}
                {question.type === 'mcq' && (
                  <>
                   <div className='mb-4'>
                    <label className='block text-gray-700 font-bold mb-2'>
                      Upload Image:
                    </label>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={(e) => handleImageUpload(e, index)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md'
                    />
                    {question.questionImage && (
                      <div className='mt-2'>
                        <img
                          src={question.questionImage}
                          alt='Uploaded Image'
                          className='max-w-full h-auto'
                        />
                      </div>
                    )}
                  </div>
                    <div className='mb-4'>
                      <label className='block text-gray-700 font-bold mb-2'>
                        Options:
                      </label>
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className='flex mb-2'>
                          <input
                            type='text'
                            value={option}
                            onChange={(e) =>
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
                        onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md'
                        required
                      />
                    </div>
                  </>
                )}
             
             {question.type === 'multiple' && (
                  <div className='mb-4'>
                     <div className='mb-4'>
                    <label className='block text-gray-700 font-bold mb-2'>
                      Upload Image:
                    </label>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={(e) => handleImageUpload(e, index)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md'
                    />
                    {question.questionImage && (
                      <div className='mt-2'>
                        <img
                          src={question.questionImage}
                          alt='Uploaded Image'
                          className='max-w-full h-auto'
                        />
                      </div>
                    )}
                  </div>

                    <label className='block text-gray-700 font-bold mb-2'>
                      Questions:
                    </label>
                    {question.multipleQuestion.map((multipleQuestion, subIndex) => (
                      <div key={subIndex} className='flex mb-2 flex-col'>
                        <input
                          type='text'
                          value={multipleQuestion}
                          onChange={(e) => handleSubQuestionChange(index, subIndex, 'question', e.target.value)}
                          className='w-full px-3 py-2 border border-gray-300 rounded-md'
                          placeholder={`Question ${subIndex + 1}`}
                          required
                        />
                        <input
                          type='text'
                          value={question?.multipleAnswer[subIndex]}
                          onChange={(e) => handleSubQuestionChange(index, subIndex, 'answer', e.target.value)}
                          className='w-full px-3 mt-4 py-2 border border-gray-300 rounded-md'
                          placeholder='Answer'
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
                  </div>
                )}
              </div>
            ))}
            <div className='flex justify-between'>
              <button
                type='button'
                onClick={toggleQues}
                className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200'
              >
                Cancel
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
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
