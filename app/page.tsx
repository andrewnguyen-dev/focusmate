"use client";

import Image from "next/image";
import bg1 from "../public/bg1.jpg";
import Header from "@/components/header";
import Timer from "@/components/timer";
import { useEffect } from "react";
import { useBackgroundContext } from "@/context/background-context";

export default function Home() {
  const { background } = useBackgroundContext();

  return (
    <div className="h-screen w-full relative -z-index-10">
      <Image
        alt="Background"
        src="/_next/static/media/bg4.4f703aa6.jpg"
        quality={100}
        fill
        style={{ objectFit: "cover" }}
        placeholder="blur"
        blurDataURL="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbg4.4f703aa6.jpg&w=8&q=70"
      />
      <div className="absolute left-0 top-0 h-screen w-screen flex flex-col">
        <Header />
        <Timer />
      </div>
    </div>
  );
}
