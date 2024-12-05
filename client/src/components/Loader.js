"use client";
import { useEffect, useState } from "react";
import "../app/globals.css";

const Loading = () => {
  const words = [" Welcome Buddy  "];
  let i = 0;
  let j = 0;
  let currentWord = "";
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function type() {
      currentWord = words[i];

      if (isDeleting) {
        setDisplayText(currentWord.substring(0, j - 1));
        j--;
        if (j === 0) {
          setIsDeleting(false);
          i++;
          if (i === words.length) {
            i = 0;
          }
        }
      } else {
        setDisplayText(currentWord.substring(0, j + 1));
        j++;
        if (j === currentWord.length) {
          setIsDeleting(true);
        }
      }
      setTimeout(type, 150);
    }

    type();

    return () => clearTimeout(type);
  }, [isDeleting]);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-white dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-black dark:text-white">
        {displayText}
      </h1>
    </div>
  );
};

export default Loading;
