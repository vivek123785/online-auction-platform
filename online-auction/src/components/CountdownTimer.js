// src/components/CountdownTimer.js
import React, { useState, useEffect } from "react";
import "../styles/CountdownTimer.css"; // Ensure you have a CSS file for styling

const CountdownTimer = ({ endTime }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = new Date(endTime) - now;

    if (difference <= 0) {
      return null; // Timer has ended
    }

    return {
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
      minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0"),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!timeLeft) return;

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (!newTimeLeft) {
        clearInterval(timer); // Stop countdown when time reaches zero
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, timeLeft]);

  return (
    <div className="countdown-timer">
      {timeLeft ? (
        <span>{`${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`}</span>
      ) : (
        <span className="ended">Auction Ended</span>
      )}
    </div>
  );
};

export default CountdownTimer;
