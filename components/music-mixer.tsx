/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import useSound from "use-sound";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useEffect, useRef, useState } from "react";
import { Slider } from "./ui/slider";
import { useVolumeContext } from "@/context/volume-context";
import { backgroundMusicDataType } from "@/lib/types";

const MusicMixer = () => {
  const { volume, setVolume, prevMusicalRef, prevAmbientRef } =
    useVolumeContext();

  const [playCalmPiano, { stop: stopCalmPiano, sound: soundCalmPiano }] =
    useSound("/sound/calmPiano.mp3", {
      loop: true,
      volume: volume.musical / 100,
    });

  const [
    playLofiChillhop,
    { stop: stopLofiChillhop, sound: soundLofiChillhop },
  ] = useSound("/sound/lofiChillhop.mp3", {
    loop: true,
    volume: volume.musical / 100,
  });

  const [playJazz, { stop: stopJazz, sound: soundJazz }] = useSound(
    "/sound/jazz.mp3",
    { loop: true, volume: volume.musical / 100 }
  );

  const [playRain, { stop: stopRain, sound: soundRain }] = useSound(
    "/sound/rain.mp3",
    { loop: true, volume: volume.ambient / 100 }
  );

  const [playFireplace, { stop: stopFireplace, sound: soundFireplace }] =
    useSound("/sound/fireplace.mp3", {
      loop: true,
      volume: volume.ambient / 100,
    });

  const [playCoffeeShop, { stop: stopCoffeeShop, sound: soundCoffeeShop }] =
    useSound("/sound/coffeeShop.mp3", {
      loop: true,
      volume: volume.ambient / 100,
    });
  const [
    playWaterfallNature,
    { stop: stopWaterfallNature, sound: soundWaterfallNature },
  ] = useSound("/sound/waterfallNature.mp3", {
    loop: true,
    volume: volume.ambient / 100,
  });

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
      sound: soundCalmPiano,
    },
    {
      label: "Lofi Chillhop",
      play: playLofiChillhop,
      stop: stopLofiChillhop,
      sound: soundLofiChillhop,
    },
    {
      label: "Jazz",
      play: playJazz,
      stop: stopJazz,
      sound: soundJazz,
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
      sound: soundRain,
    },
    {
      label: "Fireplace",
      play: playFireplace,
      stop: stopFireplace,
      sound: soundFireplace,
    },
    {
      label: "Coffee Shop",
      play: playCoffeeShop,
      stop: stopCoffeeShop,
      sound: soundCoffeeShop,
    },
    {
      label: "Waterfall Nature",
      play: playWaterfallNature,
      stop: stopWaterfallNature,
      sound: soundWaterfallNature,
    },
  ];

  const [musical, setMusical] = useState<backgroundMusicDataType>(
    prevMusicalRef.current || musicalData[0]
  );
  const [ambient, setAmbient] = useState<backgroundMusicDataType>(
    prevAmbientRef.current || ambientData[0]
  );

  useEffect(() => {
    if (prevMusicalRef.current !== musical) {
      if (musical) {
        musical.sound?.volume(volume.musical / 100);
        musical.play();
      }
      if (prevMusicalRef.current) {
        prevMusicalRef.current.stop();
      }
      prevMusicalRef.current = musical;
    }
  }, [musical]);

  useEffect(() => {
    if (prevAmbientRef.current !== ambient) {
      if (ambient) {
        ambient.sound?.volume(volume.ambient / 100);
        ambient.play();
      }
      if (prevAmbientRef.current) {
        prevAmbientRef.current.stop();
      }
      prevAmbientRef.current = ambient;
    }
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
        <div className="flex justify-between">
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
          <div data-vaul-no-drag className="relative">
            <Slider
              defaultValue={[volume.musical]}
              max={100}
              step={1}
              className="h-32 w-8 cursor-pointer"
              orientation="vertical"
              onValueChange={(value) =>
                setVolume({ ...volume, musical: value[0] })
              }
            />
            <span className="text-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              {volume.musical}
            </span>
          </div>
        </div>
      </div>

      <div id="ambient-sounds" className="p-4">
        <p className="mb-4 text-lg font-medium capitalize">Ambient Sounds</p>
        <div className="flex justify-between">
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
          <div data-vaul-no-drag className="relative">
            <Slider
              defaultValue={[volume.ambient]}
              max={100}
              step={1}
              className="h-32 w-8 cursor-pointer"
              orientation="vertical"
              onValueChange={(value) =>
                setVolume({ ...volume, ambient: value[0] })
              }
            />
            <span className="text-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              {volume.ambient}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicMixer;
