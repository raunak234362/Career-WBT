/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { CgAdd } from "react-icons/cg";
import AddQuestion from "./AddQuestion";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import Service from "../../config/Service";
import { set } from "react-hook-form";

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
  const [formState, setFormState] = useState({
    question: "",
    set: "",
    difficulty: "",
    answer: "",
  });

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

    const response = await Service.getAllQuestions();
    console.log("response", response);
    setSampleData(response);
  };
  
  const fetchQuestionUpdate = async (index) => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("access")}`
    );
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
    };

    // try {
    //   const response = await fetch(
    //     `${BASE_URL}/api/v1/admin/question/update/${index}`,
    //     requestOptions
    //   );
    //   const data = await response.json();
    //   setSampleData(data?.data);
    // } catch (error) {
    //   console.error(error);
    // }
    const response = await Service.updateQuestion(index, formState);
    console.log("response", response);
    setSampleData((prevData) =>
      prevData.map((item, idx) =>
        idx === index ? { ...item, ...formState } : item
      )
    );
  };
  const fetchDeleteQuestion = async (index) => {
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
        `${BASE_URL}/api/v1/admin/question/remove/${index}`,
        requestOptions
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchContestQuestions();
  }, []);

  const toggleEditQuestion = (index) => {
    if (!popupVisible) {
      const question = sampleData[index];
      setFormState({
        question: question.question,
        set: question.set,
        difficulty: question.difficult,
        answer: question.answer,
      });
    }
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

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = () => {
    const updatedData = [...sampleData];
    updatedData[popupRowIndex] = {
      ...updatedData[popupRowIndex],
      question: formState.question,
      set: formState.set,
      difficult: formState.difficulty,
      answer: formState.answer,
    };
    setSampleData(updatedData);
    setPopupVisible(false);
  };

  const addQuestions = (newQuestions) => {
    setSampleData((prevData) => [...prevData, ...newQuestions]);
  };

  const filteredData = sampleData?.filter((item) => {
    return (
      (difficultyFilter === "" || item.difficult === difficultyFilter) &&
      (setFilter === "" || item.set === setFilter) &&
      (typeFilter === "" || item.type === typeFilter)
    );
  });

  return (
    <div>
      <div className="flex flex-row w-full gap-10 p-5">
        <div
          className="flex flex-col w-1/4 gap-3 p-5 py-20 bg-white shadow-lg rounded-xl"
          onMouseOver={() => {
            setShowSetA(true);
            setShowSetB(false);
          }}
          onMouseOut={() => {
            setShowSetA(false);
            setShowSetB(false);
          }}
        >
          <h1 className="text-2xl font-bold text-center text-gray-600">
            No. Of Questions in Set-A
          </h1>
          <p className="mx-auto text-3xl font-bold text-gray-800">
            {sampleData?.filter((item) => item.set === "A").length}
          </p>

          <div
            className={`${
              showSetA ? "" : "hidden"
            } w-40 text-lg absolute bg-white p-5 rounded-xl shadow-lg `}
          >
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
          className="flex flex-col w-1/4 gap-3 p-5 py-20 bg-white shadow-lg rounded-xl"
          onMouseOver={() => {
            setShowSetA(false);
            setShowSetB(true);
          }}
          onMouseOut={() => {
            setShowSetA(false);
            setShowSetB(false);
          }}
        >
          <h1 className="text-2xl font-bold text-center text-gray-600">
            No. Of Questions in Set-B
          </h1>
          <p className="mx-auto text-3xl font-bold text-gray-800">
            {sampleData?.filter((item) => item.set === "B").length}
          </p>
          <div
            className={`${
              showSetB ? "" : "hidden"
            }  w-40 text-lg absolute bg-white p-5 rounded-xl shadow-lg`}
          >
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
        <div className="flex flex-col items-center w-1/4 gap-5 p-5 py-20 bg-white shadow-lg rounded-xl">
          <h1 className="text-2xl font-bold text-center text-gray-600">
            Add New Question
          </h1>
          <CgAdd className="mx-auto text-2xl text-green-500" />
          <button
            onClick={() => toggleQues(showSetQuestion?._id)}
            className="w-1/2 h-10 px-4 py-2 mr-2 text-white bg-green-500 rounded-lg hover:bg-green-700"
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

      <div className="p-5 m-5 bg-white shadow-xl rounded-xl">
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
          <table className="w-full text-center border-collapse table-auto rounded-xl">
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
                  className="text-xl bg-gray-100 hover:bg-gray-200"
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
                    <div className="flex justify-center w-full gap-2 mx-auto">
                      {/* <button
                        onClick={() => toggleShowQuestion(index)}
                        className="px-4 py-2 text-white bg-green-500 rounded modify-btn w-fit hover:bg-green-700"
                      >
                        Show
                      </button> */}
                      <button
                        onClick={() => toggleEditQuestion(index)}
                        className="px-4 py-2 text-white bg-green-500 rounded modify-btn w-fit hover:bg-green-700"
                      >
                        Modify
                      </button>
                    </div>

                    {popupRowIndex === index && (
                      <div
                        className={`popup-menu absolute overflow-y-auto bottom-0 right-52 w-[500px] bg-white rounded-lg shadow-lg p-2 ${
                          popupVisible ? "visible" : "hidden"
                        }`}
                      >
                        <div className="flex flex-col w-[100%] flew-wrap p-2">
                          
                          <div className="flex flex-col w-full mb-2">
                            <label
                              htmlFor="question"
                              className="flex mb-2 font-bold text-gray-700 "
                            >
                              Question
                            </label>
                            <input
                              type="text"
                              name="question"
                              value={formState.question}
                              onChange={handleFormChange}
                              className="w-full py-2 border border-gray-300 rounded-md"
                            />
                          </div>
                          <div className="mb-4">
                            <label className="flex mb-2 font-bold text-gray-700">
                              Set:
                            </label>
                            <select
                              name="set"
                              value={formState.set}
                              onChange={handleFormChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                              <option value="">Select Set</option>
                              <option value="A">Technical</option>
                              <option value="B">Non-Technical</option>
                            </select>
                          </div>
                          <div className="mb-4">
                            <label className="flex mb-2 font-bold text-gray-700">
                              Difficulty:
                            </label>
                            <select
                              name="difficulty"
                              value={formState.difficulty}
                              onChange={handleFormChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                              <option value="">Select Difficulty</option>
                              <option value="easy">Easy</option>
                              <option value="medium">Medium</option>
                              <option value="hard">Hard</option>
                            </select>
                          </div>
                          
                          <div className="flex flex-row w-full gap-5">
                            <button
                              onClick={handleFormSubmit}
                              className="w-2/3 px-4 py-2 font-bold text-white bg-green-500 rounded modify-btn hover:bg-green-700"
                            >
                              Update
                            </button>
                            <button
                              onClick={() =>toggleEditQuestion(item?._id)}
                              className="w-1/3 px-4 py-2 font-bold text-white bg-red-300 rounded modify-btn hover:bg-red-500"
                            >
                              Cancel
                            </button>
                          </div>
                          <button
                            onClick={() => fetchDeleteQuestion(item?._id)}
                            className="w-full px-4 py-2 mt-5 font-bold text-white bg-red-500 rounded modify-btn hover:bg-red-700"
                          >
                            Delete
                          </button>
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
