/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { Assessment } from "../../Assessment";

const CardContest = ({ contestId }) => {
  const [showQuestion, setShowQuestion] = useState({});
  const [showSetQuestion, setShowSetQuestion] = useState("");
  const [showFilledQuestion, setShowFilledQuestion] = useState(false);
  const [attempt, setAttempt] = useState(false);
  const [contest, setContest] = useState({});
  const [result, setResult] = useState({});

  const fetchContestQuestions = async () => {
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
        `https://wbt-quizcave.onrender.com/api/v1/contest/${contestId}`,
        requestOptions
      );
      const data = await response.json();
      setShowSetQuestion(data?.data);
      // handleAttempt();
    } catch (error) {
      console.error(error);
    }
  };

  // const registerStudentContest = async () => {
  //   const myHeaders = new Headers();
  //   myHeaders.append(
  //     "Authorization",
  //     `Bearer ${localStorage.getItem("access")}`
  //   );
  //   myHeaders.append("Content-Type", "application/json");
  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   };
  //   try {
  //     const response = await fetch(
  //       `https://wbt-quizcave.onrender.com/api/v1/contest/register/${contestId}`,
  //       requestOptions
  //     );
  //     if (!response.ok) {
  //       throw new Error("Failed to register for the contest");
  //     }
  //     const data = await response.json();
  //     console.log(data?.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    fetchContestQuestions();
  }, []);

  const formatDateTime = (dateTimeString) => {
    const date = dateTimeString?.split("T")[0];
    const time = dateTimeString?.split("T")[1].substring(0, 5);
    return ` ${time}`;
  };

  const toggleQues = (contestId) => {
    setShowQuestion({ ...showQuestion, [contestId]: !showQuestion[contestId] });
  };

  const toggleShowQues = () => {
    setShowFilledQuestion(!showFilledQuestion);
  };

  const handleAttempt = async (e) => {
    e.preventDefault();
    const myHeader = new Headers();
    myHeader.append(
      "Authorization",
      `Bearer ${localStorage.getItem("access")}`
    );

    myHeader.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeader,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://wbt-quizcave.onrender.com/api/v1/contest/attempt/${contestId}`,
        requestOptions
      );
      const data = await response.json();
      if (data?.success) {
        setResult(data?.data?.result);
        setContest(data?.data?.contest);
        setAttempt(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (attempt) {
    return (
      <>
        <div className="w-screen h-screen absolute top-0 left-0 z-50 bg-white ">
           <Assessment contest={contest} result={result} />
        </div>
      </>
    );
  } else {
    return (
      <div>
        <div className="bg-white flex flex-col shadow-lg w-full p-5 rounded-lg mt-5">
          <div className="overflow-y-auto mt-8 w-full h-60 card-container">
            <div className="flex flex-col">
              <h2 className="text-xl font-bold mb-2 text-center">
                {showSetQuestion?.name}
              </h2>
              <div className="flex flex-col mt-5 items-center justify-center">
                <p>
                  <strong>Duration:</strong> {showSetQuestion?.duration}
                </p>
                <p>
                  <strong>Start Time:</strong>{" "}
                  {formatDateTime(showSetQuestion?.startDate)}
                </p>
                <p>
                  <strong>End Time:</strong>{" "}
                  {formatDateTime(showSetQuestion?.endDate)}
                </p>
              </div>
            </div>

            <div className="flex flex-row mt-4 justify-center">
              {/* <button
                onClick={registerStudentContest}
                className="mr-2 bg-green-500 text-white py-2 px-4 h-10 rounded-lg hover:bg-green-700"
              >
                Register
              </button> */}

              <button
                onClick={handleAttempt}
                className="bg-green-500 text-white px-4 py-2 h-10 rounded-lg hover:bg-green-700"
              >
                Attempt
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CardContest;
