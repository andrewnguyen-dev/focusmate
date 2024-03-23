import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { TimeContextProvider } from "@/context/time-context";
import { BackgroundContextProvider } from "@/context/background-context";
import { VolumeContextProvider } from "@/context/volume-context";

const archivo = Archivo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Focusmate",
  description: "Pomodoro timer | Focus & Study",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={archivo.className}>
        <BackgroundContextProvider>
          <TimeContextProvider>
            <VolumeContextProvider>{children}</VolumeContextProvider>
          </TimeContextProvider>
        </BackgroundContextProvider>
      </body>
    </html>
  );
}
