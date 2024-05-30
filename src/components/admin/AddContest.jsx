/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import JoditEditor from 'jodit-react';

const AddContest = ({ toggleForm, handleAddContest }) => {
  const [contestDetails, setContestDetails] = useState({
    name: '',
    description: '',
    rules: '',
    duration: '',
    startDate: '',
    passingMarks:'',
    endDate: '',
    active: false
  });
  const[contestId,setContestId]=useState('')

  const handleActiveToggle = newValue => {
    setContestDetails({ ...contestDetails, active: newValue });
  };

  

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${localStorage.getItem('access')}`
    );
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(contestDetails),
      redirect: 'follow'
    };
    
    try {
      const response = await fetch(
        'https://wbt-quizcave.onrender.com/api/v1/admin/contest/create',
        requestOptions
      );
      
      const data = await response.json();
      console.log(data);
        setContestId(data?.data?._id);
       localStorage.setItem('contestId', contestId);
       localStorage.setItem('access', data?.data?.accessToken);
       localStorage.setItem('refresh', data?.data?.refreshToken);
      toggleForm();
      handleAddContest(data);
    } catch (error) {
      console.error(error);
      throw new Error('Error creating contest');
    }
  };
  return (
    <div>
      <div className='max-w-full mx-auto p-6 bg-white rounded-md shadow-md'>
        <h1 className='text-3xl font-bold mb-6'>Create a New Contest</h1>
        <div className='absolute z-20 top-0 left-0 w-full h-full overflow-y-auto bg-gray-900 bg-opacity-20 flex items-center justify-center'>
          <div className='bg-white w-[70%] h-full overflow-y-auto  mt-4 p-6 rounded-lg shadow-md'>
            <form
              onSubmit={handleSubmitForm}
            >
              <h1 className='text-3xl font-bold text-center'>
                Add Contest
              </h1>
              <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                  Title:
                </label>
                <input
                  type='text'
                  name='name'
                  value={contestDetails.name}
                  onChange={e => setContestDetails({ ...contestDetails, name: e.target.value })}
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
                  onChange={value => setContestDetails({ ...contestDetails, description: value })}
                  className='w-full border border-gray-300 rounded-md'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                  Instructions:
                </label>
                <JoditEditor
                  value={contestDetails.rules}
                  tabIndex={1}
                  onChange={value => setContestDetails({ ...contestDetails, rules: value })}
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
                  onChange={e => setContestDetails({ ...contestDetails, duration: e.target.value })}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md'
                  required
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                  Passing Marks
                </label>
                <input
                  type='text'
                  name='passingMarks'
                  value={contestDetails.passingMarks}
                  onChange={e => setContestDetails({ ...contestDetails, passingMarks: e.target.value })}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md'
                  required
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                  Start Date:
                </label>
                <input
                  type='datetime-local'
                  name='startDate'
                  value={contestDetails.startDate}
                  onChange={e => setContestDetails({ ...contestDetails, startDate: e.target.value })}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md'
                  required
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                  End Date:
                </label>
                <input
                  type='datetime-local'
                  name='endDate'
                  value={contestDetails.endDate}
                  onChange={e => setContestDetails({ ...contestDetails, endDate: e.target.value })}
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
                  Submit
                </button>
                <button
                  onClick={toggleForm}
                  className='bg-green-500 w-[30%] text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200'
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContest;
