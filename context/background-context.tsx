"use client";

import { createContext, useContext, useEffect, useState } from "react";

import bg1 from "../public/images/bg1.jpg";
import { BackgroundType } from "@/lib/types";
import { getBackgroundFromStorage } from "@/lib/utils";

type BackgroundContextType = {
  background: BackgroundType;
  setBackground: (image: BackgroundType) => void;
};

type BackgroundContextProviderProps = {
  children: React.ReactNode;
};

const BackgroundContext = createContext<BackgroundContextType | null>(null);

export const BackgroundContextProvider = ({
  children,
}: BackgroundContextProviderProps) => {
  const [background, setBackground] = useState<BackgroundType>({
    src: bg1.src,
    blurDataURL: bg1.blurDataURL,
  });

  useEffect(() => {
    const storedBackground = getBackgroundFromStorage();
    if (storedBackground) {
      setBackground(storedBackground);
    }
  }, []);

  return (
    <BackgroundContext.Provider value={{ background, setBackground }}>
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackgroundContext = () => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error(
      "useBackgroundContext must be used within a BackgroundContextProvider"
    );
  }
  return context;
};
