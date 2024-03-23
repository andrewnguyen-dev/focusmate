
export type BackgroundType = {
  src: string;
  blurDataURL?: string | null;
};

export type backgroundMusicDataType = {
  label: string;
  play: () => void;
  stop: () => void;
  sound?: Howl | null;
};