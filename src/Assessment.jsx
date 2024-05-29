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

export function Assessment({ contest, result }) {

  const [assessmentPage, setAssessmentPage] = useState(false);

  contest.questions = shuffleQuestions(contest.questions);

  return (
    <>
      <Header user={result?.userId} contest={contest?.name} />
      {
        (!assessmentPage) && (
          <>
            <ContestRules description={contest?.description} rules={contest?.rules} start={setAssessmentPage} />
          </>
        )
      }
      {
        (assessmentPage) && (
          <AssessmentPage result={result} contest={contest}/>
        )
      }
    </>
  );
}
