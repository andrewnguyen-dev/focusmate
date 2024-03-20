"use client";

import { createContext, useContext, useState } from "react";

import bg1 from "../public/bg1.jpg";
import { StaticImageData } from "next/image";

type BackgroundContextType = {
  background: StaticImageData;
  setBackground: (image: StaticImageData) => void;
};

type BackgroundContextProviderProps = {
  children: React.ReactNode;
};

const BackgroundContext = createContext<BackgroundContextType | null>(null);

export const BackgroundContextProvider = ({
  children,
}: BackgroundContextProviderProps) => {
  const [background, setBackground] = useState<StaticImageData>(bg1);

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
