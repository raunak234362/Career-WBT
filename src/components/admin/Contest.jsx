import { useContext, useState } from "react";
import AddContest from "./AddContest";
import { CgAdd } from "react-icons/cg";
import { ContestContext } from "../../hooks/ContestContext";

const Contest = () => {
  const [showForm, setShowForm] = useState(false);
  const { contests } = useContext(ContestContext);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="flex flex-col items-center bg-white p-5">
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
                <td className="px-4 py-2">{contest.title}</td>
                <td className="px-4 py-2">{contest.duration}</td>
                <td className="px-4 py-2">{contest.startDate}</td>
                <td className="px-4 py-2">{contest.endDate}</td>
                <td className="px-2 py-2">Option</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contest;
