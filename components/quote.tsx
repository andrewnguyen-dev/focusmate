import { useEffect, useState } from "react";
import { quotes } from "@/lib/data";

const Quote = () => {
  const [randomIndex, setRandomIndex] = useState<number>(0);

  const getRandomIndex = () => Math.floor(Math.random() * quotes.length);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = getRandomIndex();
      setRandomIndex(randomIndex);
    }, 5*60*1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mb-10 space-y-2 h-32">
      <p className="text-gray-100/80 text-3xl text-center font-medium sm:max-w-xl">{quotes[randomIndex].saying}</p>
      <p className="text-gray-100/70 text-md text-center">{quotes[randomIndex].author}</p>
    </div>
  );
};

export default Quote;
