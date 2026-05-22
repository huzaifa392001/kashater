import React, { useEffect, useState } from "react";

export default function useCounter(
  initialValue = 0,
  endValue = null,
  forwards = true
) {
  const [counter, setCounter] = useState(initialValue);
  const [isRunning, setIsRunning] = useState(false);

  // console.log(counter);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setCounter((prevCounter) => {
          if (
            (forwards && prevCounter + 1 <= endValue) ||
            (!forwards && prevCounter - 1 >= endValue)
          ) {
            return forwards ? prevCounter + 1 : prevCounter - 1;
          } else {
            clearInterval(interval);
            setIsRunning(false);
            return prevCounter;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, forwards, endValue, counter]);

  useEffect(() => {
    if (endValue !== null && counter === endValue) {
      setIsRunning(false);
    }
  }, [counter, endValue]);

  const startCounter = () => {
    setCounter(initialValue);
    setIsRunning(true);
  };

  const stopCounter = () => {
    setIsRunning(false);
  };

  const restartCounter = () => {
    setCounter(initialValue); // Reset counter to initial value
    setIsRunning(true); // Start the counter again
  };

  return [counter, startCounter, stopCounter, restartCounter];
}

// V2
