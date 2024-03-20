"use client";

import { useBackgroundContext } from "@/context/background-context";
import React from "react";

import bg1 from "../public/bg1.jpg";
import bg2 from "../public/bg2.jpg";
import bg3 from "../public/bg3.jpg";
import bg4 from "../public/bg4.jpg";
import bg5 from "../public/bg5.png";
import bg6 from "../public/bg6.png";
import bg7 from "../public/bg7.jpg";
import bg8 from "../public/bg8.jpg";
import bg9 from "../public/bg9.png";
import bg10 from "../public/bg10.jpg";
import Image, { StaticImageData } from "next/image";
import { BackgroundType } from "@/lib/types";
import clsx from "clsx";

const SettingBackground = () => {
  const { background, setBackground } = useBackgroundContext();
  const bgList = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10];

  const handleClick = ({ src, blurDataURL }: BackgroundType) => {
    setBackground({ src, blurDataURL });

    localStorage.setItem("backgroundSrc", src);
    if (blurDataURL) localStorage.setItem("backgroundBlurDataURL", blurDataURL);
  };

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      {bgList.map((bg: StaticImageData, index: number) => {
        return (
          <div
            key={index}
            className={clsx(
              "inline-block rounded-sm overflow-hidden cursor-pointer ",
              {
                "outline outline-2 outline-cyan-400": bg.src === background.src,
              }
            )}
            onClick={() => handleClick(bg)}
          >
            <Image
              src={bg}
              alt="background"
              quality={50}
              width={180}
              height={101.25}
              placeholder="blur"
            />
          </div>
        );
      })}
    </div>
  );
};

export default SettingBackground;
