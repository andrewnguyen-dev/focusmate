"use client";

import { backgroundMusicDataType } from "@/lib/types";
import React, { createContext, useRef, useState } from "react";

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
  prevMusicalRef: React.MutableRefObject<backgroundMusicDataType | undefined>;
  prevAmbientRef: React.MutableRefObject<backgroundMusicDataType | undefined>;
};

const VolumeContext = createContext<VolumeContextType | null>(null);

export const VolumeContextProvider = ({ children }: VolumeContextProvider) => {
  const [volume, setVolume] = useState<VolumeType>({
    musical: 60,
    ambient: 60,
  });
  const prevMusicalRef = useRef<backgroundMusicDataType>();
  const prevAmbientRef = useRef<backgroundMusicDataType>();

  return (
    <VolumeContext.Provider value={{ volume, setVolume, prevMusicalRef, prevAmbientRef }}>
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
