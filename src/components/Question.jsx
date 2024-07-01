/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Watermark } from "@hirohe/react-watermark";
import { BASE_URL, IMG_URL } from "../constants";

export const Question = ({
  Question,
  number,
  setNext,
  result,
  appeared,
  questionImage,
}) => {
  const [answered, setAnswered] = useState(false);
  const [answer, setAnswer] = useState(
    Question.type === "multiple"
      ? Array.from(Question?.multipleQuestion?.length).fill("")
      : []
  );

  // console.log(Question);

  const handleSubmit = async () => {
    const myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");
    myHeader.append(
      "Authorization",
      `Bearer ${localStorage.getItem("access")}`
    );

    const raw = JSON.stringify({
      answer: answer,
      question: Question?._id,
    });

    console.log(Question?._id);

    const requestOptions = {
      method: "POST",
      headers: myHeader,
      body: raw,
      redirect: "follow",
    };

    // setNext((prev) => prev + 1);
    // appeared((prev) => {
    //   prev[number - 1] = answered;
    //   return [...prev];
    // });

    const response = await fetch(
      `${BASE_URL}/api/v1/result/add-answer/${result._id}`,
      requestOptions
    );
    const data = await response.json();
    if (data.success === true) {
      setNext((prev) => prev + 1);
      appeared((prev) => {
        prev[number - 1] = answered;
        return [...prev];
      });
    } else {
      setNext((prev) => prev + 1);
    }
    setAnswered(false);
    setAnswer([]);
  };

  return (
    <>
      <Watermark
        text="Whiteboard Technologies"
        diagonal
        opacity={0.3}
        fontSize={20}
        gutter={10}
      >
        <div className="w-full border-2 border-green-800 bg-green-200 bg-opacity-60 text-green-700 m-3 rounded-lg font-semibold px-5 mx-auto py-2">
          Please note: Once you proceed to the next question, you cannot return
          to the previous one, so please attempt carefully.
        </div>
        <div className="h-[78vh] w-full">
          <div className="h-fit w-full">
            {Question?.question && (
              <>
                <div className="text-black font-semibold text-xl flex flex-row justify-between select-none">
                  <span>{`${number}) ${Question?.question}`}</span>
                  <span className="text-red-500 font-medium font-mono text-lg">
                    {Question.difficult === "easy"
                      ? "1"
                      : Question.difficult === "medium"
                      ? "3"
                      : "5"}{" "}
                    marks
                  </span>
                </div>
              </>
            )}
            {Question?.questionImage && (
              <img
                src={`${IMG_URL}/${Question?.questionImage}`}
                alt="Question"
                className="mx-10 h-96"
              />
            )}
            {Question?.type === "short" && (
              <>
                <input
                  type="text"
                  placeholder="Answer"
                  onChange={(e) => {
                    e.preventDefault();
                    setAnswered(true);
                    setAnswer([e.target.value]);
                  }}
                  className="border-2 border-gray-300 rounded-lg p-2 w-1/3 my-5"
                />
              </>
            )}
            {Question?.type === "numerical" && (
              <>
                <input
                  type="number"
                  placeholder="Answer"
                  onChange={(e) => {
                    e.preventDefault();
                    setAnswered(true);
                    setAnswer([e.target.value]);
                  }}
                  className="border-2 border-gray-300 rounded-lg p-2 w-1/3 my-5"
                />
              </>
            )}
            {Question?.type === "long" && (
              <>
                <textarea
                  placeholder="Answer"
                  onChange={(e) => {
                    e.preventDefault();
                    setAnswered(true);
                    setAnswer([e.target.value]);
                  }}
                  className="border-2 border-gray-300 rounded-lg p-2 w-1/3 h-1/3 my-5 mx-10"
                />
              </>
            )}
            {Question?.type === "multiple" && (
              <>
                {Question?.multipleQuestion?.map((option, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-center ml-0 w-full mx-10"
                  >
                    <label
                      htmlFor={index}
                      className="text-lg font-semibold w-1/4 text-center select-none"
                    >{`${index + 1}) ${option}`}</label>
                    <input
                      type="text"
                      placeholder={`Answer for ${option}`}
                      onChange={(e) => {
                        e.preventDefault();
                        setAnswered(true);
                        setAnswer((prev) => {
                          prev[index] = e.target.value;
                          return prev;
                        });
                      }}
                      className="border-2 w-1/2 border-gray-300 rounded-lg p-2 my-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                ))}
              </>
            )}
            {Question.type === "mcq" && (
              <>
                <div className="flex flex-col mx-10 my-4">
                  {Question.mcqOptions.map((option, index) => (
                    <div
                      key={index}
                      className="flex flex-row w-1/3 items-center justify-center select-none"
                    >
                      <input
                        type="radio"
                        name="mcq"
                        onClick={() => {
                          setAnswered(true);
                          setAnswer([option]);
                        }}
                        id={index}
                        className="w-5 h-5 mx-4"
                      />
                      <label
                        htmlFor={index}
                        className="text-lg text-left font-semibold w-full"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div>
            <button
              type="button"
              className="bg-gray-400 text-black font-bold p-2 rounded-lg m-5 w-32 hover:border-black hover:bg-white border-2"
              onClick={() => setNext((prev) => prev + 1)}
            >
              Next
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white font-bold p-2 rounded-lg m-5 w-32 border-2 hover:border-blue-500 hover:text-blue-700 hover:bg-white"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Save & Next
            </button>
          </div>
        </div>
      </Watermark>
    </>
  );
};
