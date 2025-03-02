// src/components/CountdownTimer.js
import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ endTime }) => {
  const calculateTimeLeft = () => {
    const difference = endTime - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="timer">
      {timeLeft.hours !== undefined ? (
        <span>{`${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`}</span>
      ) : (
        <span>00:00:00</span>
      )}
    </div>
  );
};

export default CountdownTimer;
