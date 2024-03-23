"use client";

import React, { createContext, useState } from "react";

type VolumeContextProvider = {
  children: React.ReactNode;
};

type VolumeType = {
  musical: number;
  ambient: number;
};

type VolumeContextType = {
  volume: VolumeType;
  setVolume: React.Dispatch<React.SetStateAction<VolumeType>>;
};

const VolumeContext = createContext<VolumeContextType | null>(null);

export const VolumeContextProvider = ({ children }: VolumeContextProvider) => {
  const [volume, setVolume] = useState<VolumeType>({
    musical: 60,
    ambient: 60,
  });

  return (
    <VolumeContext.Provider value={{ volume, setVolume }}>
      {children}
    </VolumeContext.Provider>
  );
};

export const useVolumeContext = () => {
  const context = React.useContext(VolumeContext);
  if (!context) {
    throw new Error(
      "useVolumeContext must be used within a VolumeContextProvider"
    );
  }
  return context;
};
