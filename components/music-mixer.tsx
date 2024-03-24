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
import { useAmbientSounds, useMusicalSounds } from "@/lib/hooks";
import { IconX } from "@tabler/icons-react";

const MusicMixer = () => {
  const { volume, setVolume, prevMusicalRef, prevAmbientRef } =
    useVolumeContext();

  const musicalData: backgroundMusicDataType[] = useMusicalSounds(volume);
  const ambientData: backgroundMusicDataType[] = useAmbientSounds(volume);

  const [musical, setMusical] = useState<backgroundMusicDataType>(
    prevMusicalRef.current || musicalData[0]
  );
  const [ambient, setAmbient] = useState<backgroundMusicDataType>(
    prevAmbientRef.current || ambientData[0]
  );

  // Utility function to manage changing tracks and volume updates
  const manageTrack = (
    track: backgroundMusicDataType,
    prevTrackRef: React.MutableRefObject<backgroundMusicDataType | undefined>,
    volume: number
  ) => {
    // Set volume if the track exists
    track.sound?.volume(volume / 100);

    // Play new track and stop the previous one if it's different
    if (prevTrackRef.current !== track) {
      track.play?.();
      prevTrackRef.current?.stop?.();
      prevTrackRef.current = track; // Update the ref to current track
    }
  };

  // Use the function in useEffect hooks
  useEffect(() => {
    manageTrack(musical, prevMusicalRef, volume.musical);
  }, [musical, volume.musical, prevMusicalRef]);

  useEffect(() => {
    manageTrack(ambient, prevAmbientRef, volume.ambient);
  }, [ambient, volume.ambient, prevAmbientRef]);

  return (
    <>
        <DrawerClose className="flex justify-end"><IconX size={20} stroke={2} className="opacity-60"/></DrawerClose>
      <DrawerHeader>
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
          <div className="flex flex-wrap gap-3 w-full">
            {musicalData.map((item, index) => (
              <span
                key={index}
                className="flex items-center justify-center text-gray-200 cursor-pointer w-[140px] h-[40px] rounded-lg"
                onClick={() => setMusical(item)}
                style={{ backgroundImage: `url(${item.bgUrl})`, backgroundSize: 'cover' }}
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
              onValueChange={(value) => {
                setVolume({ ...volume, musical: value[0] });
                console.log({ ...volume, musical: value[0] });
              }}
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
