import { useState, useEffect } from "react";
import AddContest from "./AddContest";
import { CgAdd } from "react-icons/cg";
import AddQuestion from "./AddQuestion";

const Contest = () => {
  const [showForm, setShowForm] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [contests, setContests] = useState([]);

  useEffect(() => {
    fetchContests();
  }, []);

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
        `https://wbt-quizcave.onrender.com/api/v1/admin/contest/all`,
        requestOptions
      )
      const data = await response.json()
      setContests(data?.data)
      console.log(data?.data)
    } catch (error) {
      console.error(error)
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const toggleQues = () => {
    setShowQuestion(!showQuestion);
  };

  return (
    <div className="flex flex-col items-center bg-white p-5">
      <div className="flex flex-row gap-5 w-full">
      <div className="flex flex-col justify-center bg-white rounded-lg w-full md:w-[30%] shadow-lg p-5">
        <div className="flex justify-center p-5">
          <CgAdd className="flex justify-center text-2xl text-black" />
        </div>
        <h3 className="text-xl font-semibold pt-5 text-gray-800 text-center">
          Create Contest
        </h3>
        <button
          onClick={toggleForm}
          className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700"
        >
          Create
        </button>
      </div>
      <div className="flex flex-col justify-center bg-white rounded-lg w-full md:w-[30%] shadow-lg p-5">
        <div className="flex justify-center p-5">
          <CgAdd className="flex justify-center text-2xl text-black" />
        </div>
        <h3 className="text-xl font-semibold pt-5 text-gray-800 text-center">
          Add Questions
        </h3>
        <button
          onClick={toggleQues}
          className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700"
        >
          Add
        </button>
      </div>
      </div>
      {showQuestion && <AddQuestion toggleQues={toggleQues}/>}
     
      {showForm && <AddContest toggleForm={toggleForm} />}

      <div className="overflow-y-auto mt-8 w-full h-80 table-container">
        <table className="w-full table-auto border-collapse text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-2 py-2">S.No</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Duration</th>
              <th className="px-4 py-2">Start Date</th>
              <th className="px-4 py-2">End Date</th>
              <th className="px-2 py-2">Option</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest, index) => (
              <tr key={index}>
                <td className="px-2 py-2">{index + 1}</td>
                <td className="px-4 py-2">{contest.name}</td>
                <td className="px-4 py-2">{contest.duration}</td>
                <td className="px-4 py-2">{contest.startDate}</td>
                <td className="px-4 py-2">{contest.endDate}</td>
                <td className="px-2 py-2">Open</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contest;
