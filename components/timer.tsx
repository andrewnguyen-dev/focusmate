/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useTimeContext } from "@/context/time-context";
import { useEffect, useState } from "react";
import ModeButton from "./mode-button";
import useSound from "use-sound";

const Timer = () => {
  const { pomodoroTime, shortBreakTime, longBreakTime } = useTimeContext();

  const [timeLeft, setTimeLeft] = useState(pomodoroTime);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState("pomodoro");
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const formattedTime = new Date(timeLeft * 1000).toISOString().slice(14, 19); // Convert to ISO string and extract the MM:SS part

  const [playCountdownSound] = useSound("/sound/countdown.mp3");
  const [playEndSound] = useSound("/sound/end.mp3");
  const [playMouseClick] = useSound("/sound/mouseClick.mp3");

  // Manages the countdown of the timer, pausing when reaching 0 and handling session transitions.
  useEffect(() => {
    if (isRunning) {
      if (timeLeft === 5) {
        playCountdownSound();
      }
      if (timeLeft > 0) {
        const interval = setInterval(() => {
          setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
        }, 1000);
        return () => clearInterval(interval);
      }
      if (timeLeft === 0) {
        playEndSound();
        setIsRunning(false);
        handleSessionTransition();
      }
    }
  }, [isRunning, timeLeft]);

  // Updates the timeLeft whenever the sessionType changes or the duration for the current session type is updated.
  useEffect(() => {
    setTimeForNewSession(sessionType)
  }, [sessionType]);

  // Starts a new timer session with the given type and updates the session type and time left accordingly.
  const startSession = (type: string) => {
    setTimeForNewSession(type);
    setSessionType(type);
  };

  const setTimeForNewSession = (type: string) => {
    const time =
      type === "pomodoro"
        ? pomodoroTime
        : type === "short break"
        ? shortBreakTime
        : longBreakTime;
    setTimeLeft(time);
  }

  // Handles transitioning to the next session when the current session ends.
  const handleSessionTransition = () => {
    if (sessionType === "pomodoro") {
      const nextPomodoroCount = pomodoroCount + 1;
      if (nextPomodoroCount < 4) {
        startSession("short break");
        setPomodoroCount(nextPomodoroCount);
      } else {
        startSession("long break");
        setPomodoroCount(0);
      }
    } else {
      startSession("pomodoro");
    }
  };

  const handleResetClick = () => {
    setTimeForNewSession(sessionType)
    setIsRunning(false);
  }

  const handleStartPauseClick = () => {
    setIsRunning(!isRunning);
    playMouseClick();
  }

  // Renders the timer UI with mode buttons for starting different sessions and controls for starting/pausing and resetting the timer.
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-3">
        <ModeButton
          label="pomodoro"
          onClick={() => startSession("pomodoro")}
          sessionType={sessionType}
        />
        <ModeButton
          label="short break"
          onClick={() => startSession("short break")}
          sessionType={sessionType}
        />
        <ModeButton
          label="long break"
          onClick={() => startSession("long break")}
          sessionType={sessionType}
        />
      </div>

      <span className="text-8xl text-gray-50 font-bold ">{formattedTime}</span>

      <div className="flex gap-3 items-center">
        <button
          onClick={() => handleStartPauseClick()}
          className="text-lg py-2 px-6 border-2 border-gray-50 rounded-[16px] font-medium bg-gray-50 text-gray-800 hover:border-gray-700 transition-all ease-in"
        >
          {isRunning ? "pause" : "start"}
        </button>
        <button
          onClick={() => handleResetClick()}
          className="text-lg text-gray-50 py-2 px-6 border-2 border-gray-50 rounded-[16px] hover:bg-gray-50 hover:text-gray-800 transition-all ease-in"
        >
          reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
