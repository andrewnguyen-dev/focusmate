import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bg1 from "../public/images/bg1.jpg";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeFromStorage = (key: string) => {
  if (typeof window === 'undefined') {
    return null; // Return null if not running in a browser environment
  }
  const storedValue = localStorage.getItem(key);
  return storedValue !== null ? JSON.parse(storedValue) : null;
}

export const setStoredTime = (state: string, setState: React.Dispatch<React.SetStateAction<number>>) => {
  const storedTime = getTimeFromStorage(state);
  if (storedTime) setState(storedTime);
}

export const getBackgroundFromStorage = () => {
  if (typeof window !== "undefined") {
    const src = localStorage.getItem("backgroundSrc");
    const blurDataURL = localStorage.getItem("backgroundBlurDataURL");
    if (src !== null) {
      return {
        src,
        blurDataURL,
      };
    }
  }
  return null;
};


