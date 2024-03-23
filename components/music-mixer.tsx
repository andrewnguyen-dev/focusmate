"use client";

import useSound from "use-sound";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useEffect, useState } from "react";
import { Slider } from "./ui/slider";

type backgroundMusicDataType = {
  label: string;
  play: () => void;
  stop: () => void;
};

const MusicMixer = () => {
  const [playCalmPiano, { stop: stopCalmPiano }] = useSound(
    "/sound/calmPiano.mp3",
    { loop: true }
  );
  const [playLofiChillhop, { stop: stopLofiChillhop }] = useSound(
    "/sound/lofiChillhop.mp3",
    { loop: true }
  );
  const [playJazz, { stop: stopJazz }] = useSound("/sound/jazz.mp3", {
    loop: true,
  });

  const [playRain, { stop: stopRain }] = useSound("/sound/rain.mp3", {
    loop: true,
  });

  const [playFireplace, { stop: stopFireplace }] = useSound(
    "/sound/fireplace.mp3",
    { loop: true }
  );

  const [playCoffeeShop, { stop: stopCoffeeShop }] = useSound(
    "/sound/coffeeShop.mp3",
    { loop: true }
  );

  const [playWaterfallNature, { stop: stopWaterfallNature }] = useSound(
    "/sound/waterfallNature.mp3",
    { loop: true }
  );

  const musicalData: backgroundMusicDataType[] = [
    {
      label: "None",
      play: () => {},
      stop: () => {},
    },
    {
      label: "Calm Piano",
      play: playCalmPiano,
      stop: stopCalmPiano,
    },
    {
      label: "Lofi Chillhop",
      play: playLofiChillhop,
      stop: stopLofiChillhop,
    },
    {
      label: "Jazz",
      play: playJazz,
      stop: stopJazz,
    },
  ];

  const ambientData: backgroundMusicDataType[] = [
    {
      label: "None",
      play: () => {},
      stop: () => {},
    },
    {
      label: "Rain",
      play: playRain,
      stop: stopRain,
    },
    {
      label: "Fireplace",
      play: playFireplace,
      stop: stopFireplace,
    },
    {
      label: "Coffee Shop",
      play: playCoffeeShop,
      stop: stopCoffeeShop,
    },
    {
      label: "Waterfall Nature",
      play: playWaterfallNature,
      stop: stopWaterfallNature,
    },
  ];

  const [musical, setMusical] = useState<backgroundMusicDataType>(
    musicalData[0]
  );
  const [ambient, setAmbient] = useState<backgroundMusicDataType>(
    ambientData[0]
  );

  useEffect(() => {
    if (musical) {
      musical.play();
    }
    // Clean up function - stop the current music when the component unmounts
    return () => {
      if (musical) {
        musical.stop();
      }
    };
  }, [musical]);

  useEffect(() => {
    if (ambient) {
      ambient.play();
    }
    // Clean up function - stop the current music when the component unmounts
    return () => {
      if (ambient) {
        ambient.stop();
      }
    };
  }, [ambient]);

  return (
    <>
      <DrawerHeader>
        <DrawerClose>Close</DrawerClose>
        <div className="flex flex-col">
          <DrawerTitle className="text-xl">
            Customize Your Sound Experience
          </DrawerTitle>
          <DrawerDescription>
            Mix and match different musical styles and ambient sounds to create
            your perfect background atmosphere.
          </DrawerDescription>
        </div>
      </DrawerHeader>

      <div id="musical-styles" className="p-4">
        <p className="mb-4 text-lg font-medium capitalize">Musical Styles</p>
        <div className="flex flex-col gap-2">
          {musicalData.map((item, index) => (
            <span
              key={index}
              className="text-white/60 cursor-pointer"
              onClick={() => setMusical(item)}
            >
              {item.label}
            </span>
          ))}
        </div>
        <div data-vaul-no-drag>
          <Slider
            defaultValue={[33]}
            max={100}
            step={1}
            inverted
            className="mt-5 cursor-pointer"
          />
        </div>
      </div>

      <div id="ambient-sounds" className="p-4">
        <p className="mb-4 text-lg font-medium capitalize">Ambient Sounds</p>
        <div className="flex flex-col gap-2">
          {ambientData.map((item, index) => (
            <span
              key={index}
              className="text-white/60 cursor-pointer"
              onClick={() => setAmbient(item)}
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default MusicMixer;
