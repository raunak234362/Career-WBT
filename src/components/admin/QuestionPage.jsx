/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { CgAdd } from "react-icons/cg";
import AddQuestion from "./AddQuestion";
import { useEffect, useState } from "react";

const QuestionPage = () => {
  const [showQuestion, setShowQuestion] = useState({});
  const [showSetQuestion, setShowSetQuestion] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [setFilter, setSetFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sampleData, setSampleData] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupRowIndex, setPopupRowIndex] = useState(-1);
  const [showSetA, setShowSetA] = useState(false);
  const [showSetB, setShowSetB] = useState(false);

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
        `https://wbt-quizcave.onrender.com/api/v1/admin/question/all`,
        requestOptions
      );
      const data = await response.json();
      setSampleData(data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDeleteQuestion = async(index) =>{
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("access")}`
    );
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        `https://wbt-quizcave.onrender.com/api/v1/admin/question/remove/${index}`,
        requestOptions
      );
      const data = await response.json();
      console.log(data)
    }catch(error){
      console.error(error);
    }
  }

  useEffect(() => {
    fetchContestQuestions();
  }, []);

  const toggleEditQuestion = (index) => {
    setPopupRowIndex(index);
    setPopupVisible(!popupVisible);
  };

  const toggleShowQuestion = (index) => {
    setShowQuestion((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getDifficultyBgColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-400";
      case "hard":
        return "bg-red-400";
      default:
        return "";
    }
  };

  const toggleQues = (contestId) => {
    setShowQuestion((prev) => ({
      ...prev,
      [contestId]: !prev[contestId],
    }));
  };

  const handleFilterChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const addQuestions = (newQuestions) => {
    setSampleData((prevData) => [...prevData, ...newQuestions]);
  };

  const filteredData = sampleData.filter((item) => {
    return (
      (difficultyFilter === "" || item.difficult === difficultyFilter) &&
      (setFilter === "" || item.set === setFilter) &&
      (typeFilter === "" || item.type === typeFilter)
    );
  });

  return (
    <div>
      <div className="flex flex-row gap-10 w-full p-5">
        <div
          className="flex flex-col w-1/4 gap-3 bg-white shadow-lg p-5 rounded-xl py-20"
          onMouseOver={() => {
            setShowSetA(true);
            setShowSetB(false);
          }}
          onMouseOut={() => {
            setShowSetA(false);
            setShowSetB(false);
          }}
        >
          <h1 className="text-2xl text-gray-600 font-bold text-center">
            No. Of Questions in Set-A
          </h1>
          <p className="text-3xl font-bold mx-auto text-gray-800">{sampleData?.filter((item) => item.set === "A").length}</p>
          
          <div className={`${showSetA ? "" : "hidden"} w-40 text-lg absolute bg-white p-5 rounded-xl shadow-lg `}>
            <p className="text-green-600">
              Easy:{" "}
              {
                sampleData?.filter(
                  (item) => item.set === "A" && item.difficult === "easy"
                ).length
              }
            </p>
            <p className="text-yellow-600">
              Medium:{" "}
              {
                sampleData?.filter(
                  (item) => item.set === "A" && item.difficult === "medium"
                ).length
              }
            </p>
            <p className="text-red-600">
              Hard:{" "}
              {
                sampleData?.filter(
                  (item) => item.set === "A" && item.difficult === "hard"
                ).length
              }
            </p>
          </div>
          
          
        </div>
        <div
          className="flex flex-col gap-3 w-1/4 bg-white shadow-lg p-5 rounded-xl py-20"
          onMouseOver={() => {
            setShowSetA(false);
            setShowSetB(true);
          }}
          onMouseOut={() => {
            setShowSetA(false);
            setShowSetB(false);
          }}
        >
          <h1 className="text-2xl text-gray-600 font-bold text-center">
            No. Of Questions in Set-B
          </h1>
          <p className="text-3xl font-bold mx-auto text-gray-800">{sampleData?.filter((item) => item.set === "B").length}</p>
          <div className={`${showSetB ? "" : "hidden"}  w-40 text-lg absolute bg-white p-5 rounded-xl shadow-lg`}>
            <p className="text-green-600">
            Easy:{" "}
              {
                sampleData?.filter(
                  (item) => item.set === "B" && item.difficult === "easy"
                ).length
              }
            </p>
            <p className="text-yellow-600">
            Medium:{" "}
              {
                sampleData?.filter(
                  (item) => item.set === "B" && item.difficult === "medium"
                ).length
              }
            </p>
            <p className="text-red-600">
            Hard:{" "}
              {
                sampleData?.filter(
                  (item) => item.set === "B" && item.difficult === "hard"
                ).length
              }
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5 w-1/4 bg-white shadow-lg p-5 items-center rounded-xl py-20">
        <h1 className="text-2xl text-gray-600 font-bold text-center">
           Add New Question
          </h1>
          <CgAdd className="mx-auto text-green-500 text-2xl" />
          <button
            onClick={() => toggleQues(showSetQuestion?._id)}
            className="mr-2 w-1/2 bg-green-500 text-white py-2 px-4 h-10 rounded-lg hover:bg-green-700"
          >
            Add
          </button>
          {showQuestion[showSetQuestion?._id] && (
            <AddQuestion
              toggleQues={() => toggleQues(showSetQuestion?._id)}
              addQuestions={addQuestions}
              contestId={showSetQuestion?._id}
            />
          )}
        </div>
      </div>

      <div className="bg-white p-5 m-5 rounded-xl shadow-xl">
        <div className="flex gap-5 p-5">
          <select
            value={difficultyFilter}
            onChange={handleFilterChange(setDifficultyFilter)}
            className="p-2 border rounded"
          >
            <option value="">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select
            value={setFilter}
            onChange={handleFilterChange(setSetFilter)}
            className="p-2 border rounded"
          >
            <option value="">All Sets</option>
            <option value="A">Technical</option>
            <option value="B">Non-Technical</option>
          </select>
          <select
            value={typeFilter}
            onChange={handleFilterChange(setTypeFilter)}
            className="p-2 border rounded"
          >
            <option value="">All Types</option>
            <option value="mcq">Multiple Choice</option>
            <option value="short">Short Answer</option>
            <option value="long">Long Answer</option>
            <option value="numerical">Numerical</option>
            <option value="multiple">Multiple Answer</option>
          </select>
        </div>
        <div className=" h-[50vh] table-container overflow-y-auto w-full p-5 rounded-lg">
          <table className="w-full table-auto border-collapse text-center rounded-xl">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-1 py-2">S.No</th>
                <th className="px-6 py-2">Question</th>
                <th className="px-2 py-2">Type</th>
                <th className="px-2 py-2">Set</th>
                <th className="px-1 py-2">Difficulty</th>
                <th className="px-1 py-2">Option</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((item, index) => (
                <tr
                  key={index}
                  className="bg-gray-100 text-xl hover:bg-gray-200"
                >
                  <td className="px-1 py-2 w-[5%] border">{index + 1}</td>
                  <td className="px-1 py-2 w-[40%] border text-left">
                    {" "}
                    {item.question.split(" ").slice(0, 30).join(" ")}
                    {item.question.split(" ").length > 30 && "..."}
                  </td>
                  <td className="px-1 py-2 w-[5%] border">{item.type}</td>
                  <td className="px-4 py-2 w-[5%] border">{item.set}</td>
                  <td className="my-auto mx-auto w-[10%] rounded-lg px-2 py-2">
                    <div
                      className={`flex mx-auto justify-center items-center rounded-lg w-24 h-8 ${getDifficultyBgColor(
                        item.difficult
                      )}`}
                    >
                      {item.difficult}
                    </div>
                  </td>
                  <td className="px-1 py-2 w-[10%] border">
                    <div className="flex gap-2 w-full justify-center mx-auto">
                      <button
                        onClick={() => toggleShowQuestion(index)}
                        className="modify-btn w-fit bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
                      >
                        Show
                      </button>
                      <button
                        onClick={() => toggleEditQuestion(index)}
                        className="modify-btn w-fit bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
                      >
                        Modify
                      </button>
                    </div>

                    {popupRowIndex === index && (
                      <div
                        className={`popup-menu absolute overflow-y-auto bottom-10 right-52 w-[500px] bg-white rounded-lg shadow-lg p-2 ${
                          popupVisible ? "visible" : "hidden"
                        }`}
                      >
                        <div className="flex flex-col w-[100%] flew-wrap p-2">
                          <div className="flex w-full flex-col mb-2">
                            <label
                              htmlFor="question"
                              className=" flex text-gray-700 font-bold mb-2"
                            >
                              Question
                            </label>
                            <input
                              type="text"
                              className="'w-[100%] py-2 border border-gray-300 rounded-md'"
                            />
                          </div>
                          <div className="mb-4">
                            <label className="flex text-gray-700 font-bold mb-2">
                              Set:
                            </label>
                            <select
                              // value={question.set}
                              // onChange={(e) =>
                              //   handleQuestionChange(
                              //     index,
                              //     "set",
                              //     e.target.value
                              //   )
                              // }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                              <option value="">Select Set</option>
                              <option value="A">Technical</option>
                              <option value="B">Non-Technical</option>
                            </select>
                          </div>
                          <div className="mb-4">
                            <label className="flex text-gray-700 font-bold mb-2">
                              Difficulty:
                            </label>
                            <select
                              // value={question.difficulty}
                              // onChange={(e) =>
                              //   handleQuestionChange(
                              //     index,
                              //     "difficulty",
                              //     e.target.value
                              //   )
                              // }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                              <option value="">Select Difficulty</option>
                              <option value="easy">Easy</option>
                              <option value="moderate">Moderate</option>
                              <option value="hard">Hard</option>
                            </select>
                          </div>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option value=""></option>
                          </select>
                          <div className="flex w-full flex-col mb-2">
                            <label className=" flex text-gray-700 font-bold mb-2">
                              Answer
                            </label>
                            <input
                              type="text"
                              className="'w-[100%] py-2 border border-gray-300 rounded-md'"
                            />
                          </div>
                          <div className="flex w-full flex-row gap-5">
                            <button
                              onClick={() => toggleEditQuestion(index)}
                              className="modify-btn w-2/3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => fetchDeleteQuestion(item?._id)}
                              className="modify-btn w-1/3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
