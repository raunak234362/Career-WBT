/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

export const Counterdown = ({ duration, onCountdownEnd }) => {
    const [timeLeft, setTimeLeft] = useState(duration * 60);

    useEffect(() => {
      if (timeLeft <= 0) {
        onCountdownEnd();
        return;
      }
  
      const intervalId = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, [timeLeft, onCountdownEnd]);
  
    const formatTime = (time) => {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = time % 60;
      return { hours, minutes, seconds };
    };
  
    const { hours, minutes, seconds } = formatTime(timeLeft);
  
    const isLessThanTwoMinutes = timeLeft < 120;
  
    return (
      <div className={`countdown font-mono text-2xl p-4 rounded-lg ${isLessThanTwoMinutes ? 'bg-red-600 text-white' : 'bg-gray-800 text-green-300'}`}>
        <span className={`${isLessThanTwoMinutes ? 'animate-pulse' : ''}`} style={{ "--value": hours }}>{hours.toString().padStart(2, '0')}</span>:
        <span className={`${isLessThanTwoMinutes ? 'animate-pulse' : ''}`} style={{ "--value": minutes }}>{minutes.toString().padStart(2, '0')}</span>:
        <span className={`${isLessThanTwoMinutes ? 'animate-pulse' : ''}`} style={{ "--value": seconds }}>{seconds.toString().padStart(2, '0')}</span>
      </div>
    );
};
