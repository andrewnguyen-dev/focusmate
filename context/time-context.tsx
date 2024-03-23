"use client";

const DEFAULT_POMODORO_TIME = 25 * 60;
const DEFAULT_SHORT_BREAK_TIME = 5 * 60;
const DEFAULT_LONG_BREAK_TIME = 10 * 60;

import { createContext, useContext, useEffect, useState } from "react";
import { setStoredTime } from "@/lib/utils";

type TimeContextType = {
  pomodoroTime: number;
  setPomodoroTime: (time: number) => void;
  shortBreakTime: number;
  setShortBreakTime: (time: number) => void;
  longBreakTime: number;
  setLongBreakTime: (time: number) => void;
};

type TimeContextProviderProps = {
  children: React.ReactNode;
};

const TimeContext = createContext<TimeContextType | null>(null);

export const TimeContextProvider = ({ children }: TimeContextProviderProps) => {
  const [pomodoroTime, setPomodoroTime] = useState<number>(
    DEFAULT_POMODORO_TIME
  );
  const [shortBreakTime, setShortBreakTime] = useState<number>(
    DEFAULT_SHORT_BREAK_TIME
  );
  const [longBreakTime, setLongBreakTime] = useState<number>(
    DEFAULT_LONG_BREAK_TIME
  );

  useEffect(() => {
    setStoredTime("pomodoroTime", setPomodoroTime);
    setStoredTime("shortBreakTime", setShortBreakTime);
    setStoredTime("longBreakTime", setLongBreakTime);
  }, []);

  return (
    <TimeContext.Provider
      value={{
        pomodoroTime,
        setPomodoroTime,
        shortBreakTime,
        setShortBreakTime,
        longBreakTime,
        setLongBreakTime,
      }}
    >
      {children}
    </TimeContext.Provider>
  );
};

export const useTimeContext = () => {
  const context = useContext(TimeContext);
  if (!context) {
    throw new Error("useTimeContext must be used within a TimeContextProvider");
  }
  return context;
};
