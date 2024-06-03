/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { CgAdd } from "react-icons/cg";
import AddQuestion from "./AddQuestion";
import { useEffect, useState } from "react";

const QuestionPage = ({ contestId }) => {
  const [showQuestion, setShowQuestion] = useState({});
  const [showSetQuestion, setShowSetQuestion] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [setFilter, setSetFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sampleData, setSampleData] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupRowIndex, setPopupRowIndex] = useState(-1);

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
        `https://wbt-quizcave.onrender.com/api/v1/admin/contest/${contestId}`,
        requestOptions
      );
      const data = await response.json();
      setShowSetQuestion(data?.data);
      setSampleData([
        {
          id: 1,
          question: "What is React?",
          type: "MCQ",
          set: "A",
          difficulty: "Easy",
        },
        {
          id: 2,
          question: "Explain useState hook.",
          type: "Short Answer",
          set: "B",
          difficulty: "Medium",
        },
        {
          id: 3,
          question: "What is JSX?",
          type: "MCQ",
          set: "A",
          difficulty: "Easy",
        },
        {
          id: 4,
          question: "Describe the virtual DOM.",
          type: "300 words Essay",
          set: "A",
          difficulty: "Hard",
        },
        {
          id: 5,
          question: "How to handle events in React?",
          type: "MCQ",
          set: "B",
          difficulty: "Medium",
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

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
      [index]:!prev[index],
    }));
  }

  const getDifficultyBgColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-400";
      case "Medium":
        return "bg-yellow-200";
      case "Hard":
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
      (difficultyFilter === "" || item.difficulty === difficultyFilter) &&
      (setFilter === "" || item.set === setFilter) &&
      (typeFilter === "" || item.type === typeFilter)
    );
  });

  return (
    <div>
      <div className="flex flex-row gap-10 w-full p-5">
        <div className="flex flex-col w-1/4 gap-3 bg-white shadow-lg p-5 rounded-xl py-20">
          <h1 className="text-2xl text-gray-600 font-bold text-center">
            No. Of Questions in Set-A
          </h1>
        </div>
        <div className="flex flex-col gap-3 w-1/4 bg-white shadow-lg p-5 rounded-xl py-20">
          <h1 className="text-2xl text-gray-600 font-bold text-center">
            No. Of Questions in Set-B
          </h1>
        </div>
        <div className="flex flex-col gap-5 w-1/4 bg-white shadow-lg p-5 items-center rounded-xl py-20">
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
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <select
            value={setFilter}
            onChange={handleFilterChange(setSetFilter)}
            className="p-2 border rounded"
          >
            <option value="">All Sets</option>
            <option value="A">Set-A</option>
            <option value="B">Set-B</option>
          </select>
          <select
            value={typeFilter}
            onChange={handleFilterChange(setTypeFilter)}
            className="p-2 border rounded"
          >
            <option value="">All Types</option>
            <option value="MCQ">Multiple Choice</option>
            <option value="Short Answer">Short Answer</option>
            <option value="300 words Essay">Essay</option>
          </select>
        </div>
        <div className="h-96 table-container overflow-y-auto w-full p-5 rounded-lg">
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
              {filteredData.map((item, index) => (
                <tr key={index} className="bg-gray-100 hover:bg-gray-200">
                  <td className="px-1 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{item.question}</td>
                  <td className="px-4 py-2 border">{item.type}</td>
                  <td className="px-4 py-2 border">{item.set}</td>
                  <td className="my-auto flex items-center justify-center rounded-lg px-2 py-2">
                    <div
                      className={`flex justify-center items-center rounded-lg w-24 h-8 ${getDifficultyBgColor(
                        item.difficulty
                      )}`}
                    >
                      {item.difficulty}
                    </div>
                  </td>
                  <td className="px-1 py-2 border">
                    <div className="flex gap-2 justify-between w-1/2 mx-auto">
                    <button
                      onClick={() => toggleShowQuestion(index)}
                      className="modify-btn w-1/2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Show
                    </button>
                    <button
                      onClick={() => toggleEditQuestion(index)}
                      className="modify-btn w-1/2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Modify
                    </button>
                    </div>
                   
                    {popupRowIndex === index && (
                      <div
                        className={`popup-menu absolute right-52 w-[500px] bg-white rounded-lg shadow-lg p-2 ${
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
                              <option value="a">A</option>
                              <option value="b">B</option>
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
                              onClick={() => toggleEditQuestion(index)}
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
