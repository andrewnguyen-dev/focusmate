import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const DEFAULT_POMODORO_TIME = 25 * 60;
const DEFAULT_SHORT_BREAK_TIME = 5 * 60;
const DEFAULT_LONG_BREAK_TIME = 10 * 60;

const getTimeFromStorage = (key: string, defaultValue: number) => {
  const storedValue = localStorage.getItem(key);
  return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
}

export const getPomodoroTime = () => getTimeFromStorage("pomodoroTime", DEFAULT_POMODORO_TIME);
export const getShortBreakTime = () => getTimeFromStorage("shortBreakTime", DEFAULT_SHORT_BREAK_TIME);
export const getLongBreakTime = () => getTimeFromStorage("longBreakTime", DEFAULT_LONG_BREAK_TIME);