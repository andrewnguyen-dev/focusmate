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

const SettingBackground = () => {
  const { background, setBackground } = useBackgroundContext();
  const bgList = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10];

  return (
    <div className="flex flex-wrap gap-3 mt-6 mx-auto items-center justify-center">
      {bgList.map((bg: StaticImageData, index: number) => {
        console.log(bg);
        return (
          <div
            key={index}
            className="inline-block rounded-sm overflow-hidden cursor-pointer outline outline-2 outline-cyan-500"
            onClick={() => {
              setBackground(bg);
              localStorage.setItem("background", bg.src);
              if (bg.blurDataURL)
                localStorage.setItem("backgroundBlurDataURL", bg.blurDataURL);
            }}
          >
            <Image
              src={bg}
              alt="background"
              quality={50}
              width={160}
              height={90}
              placeholder="blur"
            />
          </div>
        );
      })}
    </div>
  );
};

export default SettingBackground;
