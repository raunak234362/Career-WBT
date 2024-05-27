/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';

export const ContestContext = createContext();

export const ContestProvider = ({ children }) => {
  const [contestDetails, setContestDetails] = useState({
    title: '',
    description: '',
    termsAndConditions: '',
    duration: '',
    startDate: '',
    endDate: '',
  });

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const storedContestDetails = JSON.parse(localStorage.getItem('contestDetails')) || {};
    const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    setContestDetails(storedContestDetails);
    setQuestions(storedQuestions);
  }, []);

  const handleContestDetailsChange = (e) => {
    setContestDetails({ ...contestDetails, [e.target.name]: e.target.value });
  };

  
  const handleAddQuestion = () => {
    setQuestions(prevQuestions => [
      ...prevQuestions,
      { type: '', question: '', subQuestions: [], answer: '' }
    ]);
  };
  
  const handleQuestionChange = (index, field, value) => {
    setQuestions(prevQuestions => {
      const updatedQuestions = [...prevQuestions];
      // If the field being updated is 'type' and the new value is 'mq', initialize the 'subQuestions' array
      if (field === 'type' && value === 'mq') {
        updatedQuestions[index]['subQuestions'] = [];
      }
      // Update the field value
      updatedQuestions[index][field] = value;
      return updatedQuestions;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save contest details and questions to local storage
    localStorage.setItem('contestDetails', JSON.stringify(contestDetails));
    localStorage.setItem('questions', JSON.stringify(questions));
    // Submit contest details and questions to the server
    console.log('Contest Details:', contestDetails);
    console.log('Questions:', questions);
  };

  const contextValue = {
    contestDetails,
    questions,
    handleContestDetailsChange,
    handleAddQuestion,
    handleQuestionChange,
    handleSubmit,
  };

  return <ContestContext.Provider value={contextValue}>{children}</ContestContext.Provider>;
};
