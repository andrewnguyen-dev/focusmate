"use client";

import { createContext, useContext, useState } from "react";

import bg1 from "../public/bg1.jpg";
import { getBackgroundFromStorage } from "@/lib/utils";
import { BackgroundType } from "@/lib/types";


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
  const storedBackground = getBackgroundFromStorage();
  const [background, setBackground] = useState<BackgroundType>(
    storedBackground || {
      src: bg1.src,
      blurDataURL: bg1.blurDataURL,
    }
  );

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
