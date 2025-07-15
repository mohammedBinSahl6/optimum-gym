// hooks/useTypewriter.ts
import { useState, useEffect } from "react";

export const useTypewriter = (text: string, speed = 20) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText(""); // Reset when text changes
    let i = -1;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  return displayedText;
};
