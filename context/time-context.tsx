'use client';

import { createContext, useContext, useState } from "react";
import {
  getLongBreakTime,
  getPomodoroTime,
  getShortBreakTime,
} from "@/lib/utils";

type TimeType = number;

type TimeContextType = {
  pomodoroTime: TimeType;
  setPomodoroTime: (time: TimeType) => void;
  shortBreakTime: TimeType;
  setShortBreakTime: (time: TimeType) => void;
  longBreakTime: TimeType;
  setLongBreakTime: (time: TimeType) => void;
};

type TimeContextProviderProps = {
  children: React.ReactNode;
};

const TimeContext = createContext<TimeContextType | null>(null);

export const TimeContextProvider = ({ children }: TimeContextProviderProps) => {
  const storedPomodoroTime = getPomodoroTime();
  const storedShortBreakTime = getShortBreakTime();
  const storedLongBreakTime = getLongBreakTime();

  const [pomodoroTime, setPomodoroTime] = useState<TimeType>(storedPomodoroTime);
  const [shortBreakTime, setShortBreakTime] = useState<TimeType>(storedShortBreakTime);
  const [longBreakTime, setLongBreakTime] = useState<TimeType>(storedLongBreakTime);

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
