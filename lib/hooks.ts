import useSound from "use-sound";
import { backgroundMusicDataType } from "./types";

type VolumeType = {
  musical: number;
  ambient: number;
};

export const useMusicalSounds = (
  volume: VolumeType
): backgroundMusicDataType[] => {
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

  return [
    {
      label: "None",
      play: () => {},
      stop: () => {},
      bgUrl: "/images/none.jpg",
    },
    {
      label: "Calm Piano",
      play: playCalmPiano,
      stop: stopCalmPiano,
      sound: soundCalmPiano,
      bgUrl: "/images/piano.jpg",
    },
    {
      label: "Lofi Chillhop",
      play: playLofiChillhop,
      stop: stopLofiChillhop,
      sound: soundLofiChillhop,
      bgUrl: "/images/lofi.jpg",
    },
    {
      label: "Jazz",
      play: playJazz,
      stop: stopJazz,
      sound: soundJazz,
      bgUrl: "/images/jazz.jpg",
    },
  ];
};

export const useAmbientSounds = (
  volume: VolumeType
): backgroundMusicDataType[] => {
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

  return [
    {
      label: "None",
      play: () => {},
      stop: () => {},
      bgUrl: "/public/images/none.jpg",
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
};
