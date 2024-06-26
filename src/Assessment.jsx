/* eslint-disable react/prop-types */
import { useState } from "react";
import { Header } from "./components/Header";
import { AssessmentPage } from "./AssessmentPage";
import { ContestRules } from "./components/ContestRules";

const shuffleQuestions = (questions) => {
  const shuffledQuestions = [...questions];
  let currentIndex = shuffledQuestions.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    const temporaryValue = shuffledQuestions[currentIndex];
    shuffledQuestions[currentIndex] = shuffledQuestions[randomIndex];
    shuffledQuestions[randomIndex] = temporaryValue;
  }

  return shuffledQuestions;
};

export function Assessment({ contest, result, questions }) {

  const [assessmentPage, setAssessmentPage] = useState(false);

  questions = shuffleQuestions(questions);

  return (
    <>
      <Header user={result?.userId} contest={contest?.name} />
      {
        (!assessmentPage) && (
          <div className="h-screen overflow-y-auto my-2 py-2">
            <ContestRules rules={contest?.rules} start={setAssessmentPage} />
          </div>
        )
      }
      {
        (assessmentPage) && (
          <AssessmentPage result={result} contest={contest} questions={questions} />
        )
      }
    </>
  );
}
