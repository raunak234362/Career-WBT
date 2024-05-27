/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';

export const ContestContext = createContext();

export const ContestProvider = ({ children }) => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    const storedContests = JSON.parse(localStorage.getItem('contests')) || [];
    setContests(storedContests);
  }, []);

  const handleContestDetailsChange = (e, index) => {
    setContests(prevContests => {
      const updatedContests = [...prevContests];
      updatedContests[index] = {
        ...updatedContests[index],
        [e.target.name]: e.target.value,
      };
      return updatedContests;
    });
  };

  const handleAddContest = (newContest) => {
    setContests(prevContests => [...prevContests, newContest]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('contests', JSON.stringify(contests));
    console.log('Contests:', contests);
  };

  const contextValue = {
    contests,
    handleContestDetailsChange,
    handleAddContest,
    handleSubmit,
  };

  return <ContestContext.Provider value={contextValue}>{children}</ContestContext.Provider>;
};
