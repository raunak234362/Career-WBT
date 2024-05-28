import { useEffect, useState } from "react";
import AddQuestion from "./AddQuestion";

const CardContest = () => {
  const [showQuestion, setShowQuestion] = useState({});
  const [showSetQuestion, setShowSetQuestion] = useState(false);
  const [contests, setContests] = useState([]);

  const fetchContests = async () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("access")}`
    );
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://wbt-quizcave.onrender.com/api/v1/admin/contest/all`,
        requestOptions
      );
      const data = await response.json();
      setContests(data?.data);
      console.log(data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchContests();
  }, []);

  const formatDateTime = (dateTimeString) => {
    const date = dateTimeString.split("T")[0];
    const time = dateTimeString.split("T")[1].substring(0, 5);
    return `${date} | T:${time}`;
  };

  const toggleQues = (contestId) => {
    setShowQuestion({ ...showQuestion, [contestId]: !showQuestion[contestId] });
  };

  const toggleShowQues = () => {
    setShowSetQuestion(!showSetQuestion);
  };

  return (
    <div>
      <div className="bg-white shadow-lg w-full p-5 rounded-lg mt-5">
        <h1 className=" text-xl text-slate-900 font-bold text-center">
          Contest List
        </h1>
        <div className="overflow-y-auto grid grid-cols-3  sm:grid-cols-3 mt-8 w-full h-96 card-container">
          {contests.map((contest, index) => (
            <div
              key={index}
              className="bg-gray-100 shadow-md rounded-lg p-5 mb-4 w-[90%]"
            >
              <h2 className="text-xl font-bold mb-2">{contest.name}</h2>
              <p>
                <strong>Duration:</strong> {contest.duration}
              </p>
              <p>
                <strong>Start Date:</strong>{" "}
                {formatDateTime(contest.startDate)}
              </p>
              <p>
                <strong>End Date:</strong> {formatDateTime(contest.endDate)}
              </p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => toggleQues(contest._id)}
                  className="mr-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                >
                  Add
                </button>
                {showQuestion[contest._id] && (
                  <AddQuestion
                    toggleQues={() => toggleQues(contest._id)}
                    onCancel={() =>
                      setShowQuestion({ ...showQuestion, [contest._id]: false })
                    }
                    contestId={contest._id}
                  />
                )}
                <button
                  onClick={toggleShowQues}
                  className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                >
                  Show
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardContest;
